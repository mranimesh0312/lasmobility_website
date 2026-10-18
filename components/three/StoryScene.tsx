"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { PALETTE } from "@/lib/palette";
import VehicleModel, { defaultAnimState } from "./VehicleModel";
import StudioLighting from "./StudioLighting";
import CameraRig from "./CameraRig";
import Highway, { ROAD_SPEED } from "./Highway";
import GpsLayer from "./GpsLayer";
import FleetNetwork from "./FleetNetwork";
import Laptop from "./Laptop";
import Effects from "./Effects";
import { CHAPTERS, sceneMix, smoothstep } from "./storyMath";
import { createRuntime, damp, INTRO_SECONDS, type StoryRuntime } from "./storyRuntime";
import { VEHICLE_SPECS, componentPositions } from "./vehicleSpecs";
import { COMPONENTS, HERO_HOTSPOTS } from "@/data/vehicleHotspots";
import { paintById, useExperienceStore, type QualityTier } from "@/stores/experienceStore";
import type { FeatureEntry, ThemeName } from "@/data/featureManifest";
import styles from "./StoryScene.module.scss";

const SPEC = VEHICLE_SPECS.suv;
const NODES = componentPositions("suv");
/** Twin labels drawn to the left of their node so neighbours do not collide. */
const LEFT_LABELS = new Set<string>(["fuel", "doors", "temperature"]);
const BG_DAY = new THREE.Color(PALETTE.studio);
const BG_NIGHT = new THREE.Color(PALETTE.studioNight);
const BG_ROAD = new THREE.Color(PALETTE.studioRoad);

/** First in the tree: advances the shared runtime before any layer reads it. */
function RuntimeDriver({ rt }: { rt: React.MutableRefObject<StoryRuntime> }) {
  useFrame((_, delta) => {
    const r = rt.current;
    const dt = Math.min(delta, 0.05);
    r.busy = false;
    if (r.intro < 1) {
      r.intro = Math.min(1, r.intro + dt / INTRO_SECONDS);
      r.busy = true;
    }
    const target = useExperienceStore.getState().progress * (CHAPTERS - 1);
    const ch = damp(r.ch, target, 5, dt);
    if (Math.abs(ch - target) > 1e-4) r.busy = true;
    r.ch = Math.abs(ch - target) < 1e-4 ? target : ch;
    r.mix = sceneMix(r.ch);
    const yaw = damp(r.yaw, r.yawTarget * r.mix.hero, 6, dt);
    if (Math.abs(yaw - r.yaw) > 1e-5) r.busy = true;
    r.yaw = yaw;
  });
  return null;
}

/** Last in the tree: keeps demand rendering alive only while something moves. */
function FrameDriver({ rt }: { rt: React.MutableRefObject<StoryRuntime> }) {
  const invalidate = useThree((s) => s.invalidate);
  useFrame(() => {
    if (rt.current.busy || useExperienceStore.getState().hazards) invalidate();
  });
  return null;
}

function Atmosphere({ rt }: { rt: React.MutableRefObject<StoryRuntime> }) {
  const scene = useThree((s) => s.scene);
  const lighting = useExperienceStore((s) => s.lighting);
  const bgColor = useMemo(() => BG_DAY.clone(), []);
  const fog = useMemo(() => new THREE.Fog(BG_DAY.clone(), 30, 1000), []);
  // Assigned in a layout effect so the first frame already has them.
  useLayoutEffect(() => {
    scene.background = bgColor;
    scene.fog = fog;
    return () => {
      scene.background = null;
      scene.fog = null;
    };
  }, [scene, bgColor, fog]);
  useFrame(() => {
    const { road, night } = rt.current.mix;
    const bg = bgColor;
    bg.copy(BG_DAY).lerp(BG_NIGHT, Math.max(night, lighting === "night" ? 1 : 0)).lerp(BG_ROAD, road * 0.6);
    fog.color.copy(bg);
    fog.near = 30 - road * 12;
    fog.far = 1000 - road * 870;
  });
  return null;
}

function StudioFloor({ rt, tier }: { rt: React.MutableRefObject<StoryRuntime>; tier: QualityTier }) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(() => {
    const k = rt.current.mix.studio;
    if (group.current) group.current.visible = k > 0.01;
    if (mat.current) mat.current.opacity = k;
  });
  return (
    <group ref={group}>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[30, 64]} />
        {tier === "high" ? (
          <MeshReflectorMaterial
            ref={mat as never}
            transparent
            blur={[300, 80]}
            resolution={768}
            mixBlur={1}
            mixStrength={18}
            roughness={0.9}
            depthScale={1.1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color={PALETTE.studioFloor}
            metalness={0.4}
            mirror={0}
          />
        ) : (
          <meshStandardMaterial ref={mat} transparent color={PALETTE.studioFloor} roughness={0.85} metalness={0.2} />
        )}
      </mesh>
      <ContactShadows position={[0, 0.004, 0]} scale={9} blur={2.4} far={2} opacity={0.75} resolution={tier === "low" ? 256 : 512} frames={tier === "high" ? Infinity : 1} />
    </group>
  );
}

/** DOM overlays anchored to the car (hotspots, telemetry, twin labels). */
function Anchors({ rt, onSelect, focus }: { rt: React.MutableRefObject<StoryRuntime>; onSelect: (id: string | null) => void; focus: string | null }) {
  const hot = useRef<HTMLDivElement[]>([]);
  const tele = useRef<HTMLDivElement[]>([]);
  const twin = useRef<HTMLDivElement[]>([]);

  useFrame(() => {
    const { hero, telemetry, twin: tw } = rt.current.mix;
    const apply = (els: HTMLDivElement[], k: number, interactive: boolean) =>
      els.forEach((el) => {
        if (!el) return;
        el.style.opacity = String(k);
        el.style.pointerEvents = interactive && k > 0.6 ? "auto" : "none";
        el.style.visibility = k < 0.01 ? "hidden" : "visible";
      });
    apply(hot.current, hero, true);
    apply(tele.current, telemetry, false);
    apply(twin.current, tw, false);
  });

  const telemetryCards = [
    { at: [1.2, SPEC.roof + 0.55, 0.4] as const, label: "Speed", value: "62 km/h" },
    { at: [-1.3, SPEC.roof + 0.5, 0.5] as const, label: "Ignition", value: "On · 1 h 12 m" },
    { at: [2.5, 0.95, 1.0] as const, label: "External battery", value: "13.9 V" },
    { at: [-0.9, 0.2, 1.4] as const, label: "Fuel level", value: "64 %" },
    { at: [0.2, SPEC.roof + 0.95, -0.6] as const, label: "GPS fix", value: "14 sats · GSM 4/5" },
  ];

  return (
    <>
      {HERO_HOTSPOTS.map((h, i) => (
        <Html key={h.id} position={NODES[h.id]} center zIndexRange={[20, 0]}>
          <div ref={(el) => void (el && (hot.current[i] = el))} className={styles.hotspotWrap}>
            <button
              type="button"
              className={`${styles.hotspot} ${focus === h.id ? styles.hotspotActive : ""}`}
              aria-pressed={focus === h.id}
              aria-label={`Inspect ${COMPONENTS[h.id].label}`}
              onClick={() => onSelect(focus === h.id ? null : h.id)}
            >
              <span className={styles.hotspotDot} />
            </button>
          </div>
        </Html>
      ))}
      {telemetryCards.map((c, i) => (
        <Html key={c.label} position={c.at as unknown as [number, number, number]} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
          <div ref={(el) => void (el && (tele.current[i] = el))} className={styles.teleCard} style={{ opacity: 0, visibility: "hidden" }}>
            <span className={styles.teleLabel}>{c.label}</span>
            <span className={styles.teleValue}>{c.value}</span>
          </div>
        </Html>
      ))}
      {(Object.keys(NODES) as (keyof typeof NODES)[]).map((id, i) => (
        <Html key={id} position={NODES[id]} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
          <div
            ref={(el) => void (el && (twin.current[i] = el))}
            className={`${styles.twinLabel} ${LEFT_LABELS.has(id) ? styles.twinLabelLeft : ""}`}
            style={{ opacity: 0, visibility: "hidden" }}
          >
            {COMPONENTS[id].label}
          </div>
        </Html>
      ))}
    </>
  );
}

function Vehicle({ rt, focus, onSelect, lowDetail }: { rt: React.MutableRefObject<StoryRuntime>; focus: string | null; onSelect: (id: string | null) => void; lowDetail: boolean }) {
  const group = useRef<THREE.Group>(null);
  const anim = useRef(defaultAnimState());
  const paint = paintById(useExperienceStore((s) => s.paintId));
  const headlights = useExperienceStore((s) => s.headlights);
  const hazards = useExperienceStore((s) => s.hazards);

  useFrame((frame) => {
    const r = rt.current;
    const a = anim.current;
    a.twin = r.mix.twin;
    a.wheelSpeed = (r.mix.road * ROAD_SPEED) / SPEC.wheelRadius;
    // Lamps come on once the car has settled into its presentation pose.
    a.headlights = headlights ? (0.35 + 0.65 * Math.max(r.mix.night, 0.4)) * smoothstep(0.7, 1, r.intro) : 0;
    a.hazards = hazards;
    if (group.current) {
      group.current.rotation.y = r.yaw;
      group.current.position.y = Math.sin(frame.clock.elapsedTime * 9) * 0.006 * r.mix.road;
    }
  });

  return (
    <group ref={group}>
      <VehicleModel variant="suv" paint={paint} anim={anim} lowDetail={lowDetail} />
      <Anchors rt={rt} onSelect={onSelect} focus={focus} />
    </group>
  );
}

const tmpProj = new THREE.Vector3();

/** Reports the selected hotspot's screen position, for the DOM connector line. */
function FocusProjector({ focus, onScreen }: { focus: string | null; onScreen?: (p: { x: number; y: number } | null) => void }) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const last = useRef<string | null>(null);
  useFrame(() => {
    if (!onScreen) return;
    if (!focus) {
      if (last.current) onScreen(null);
      last.current = null;
      return;
    }
    last.current = focus;
    const p = NODES[focus as keyof typeof NODES];
    tmpProj.set(p[0], p[1], p[2]).project(camera);
    onScreen({ x: ((tmpProj.x + 1) / 2) * size.width, y: ((1 - tmpProj.y) / 2) * size.height });
  });
  return null;
}

/** Drag to rotate the car while the hero is on screen. */
function DragRotate({ rt, enabled }: { rt: React.MutableRefObject<StoryRuntime>; enabled: boolean }) {
  const gl = useThree((s) => s.gl);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!enabled) return;
    const el = gl.domElement;
    let startX = 0;
    let startYaw = 0;
    let dragging = false;
    const down = (e: PointerEvent) => {
      if (rt.current.mix.hero < 0.5 || e.pointerType === "touch") return;
      dragging = true;
      startX = e.clientX;
      startYaw = rt.current.yawTarget;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      rt.current.yawTarget = startYaw + ((e.clientX - startX) / el.clientWidth) * Math.PI * 1.6;
      invalidate();
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      el.style.cursor = "";
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl, enabled, rt, invalidate]);
  return null;
}

export interface StorySceneProps {
  tier: QualityTier;
  screens: FeatureEntry[];
  theme: ThemeName;
  interactive: boolean;
  /** Screen position of the selected hotspot (null when none). */
  onFocusScreen?: (p: { x: number; y: number } | null) => void;
}

/** Everything inside the scroll-story canvas. */
export default function StoryScene({ tier, screens, theme, interactive, onFocusScreen }: StorySceneProps) {
  const rt = useRef<StoryRuntime>(createRuntime());
  const lighting = useExperienceStore((s) => s.lighting);
  const zoom = useExperienceStore((s) => s.zoom);
  const focus = useExperienceStore((s) => s.focusHotspot);
  const setFocus = useExperienceStore((s) => s.setFocusHotspot);
  const invalidate = useThree((s) => s.invalidate);
  const focusCam = useMemo(() => HERO_HOTSPOTS.find((h) => h.id === focus)?.camera ?? null, [focus]);

  // Any store change (paint, lights, zoom, focus) needs a frame.
  useEffect(() => useExperienceStore.subscribe(() => invalidate()), [invalidate]);

  // Hotspot framing assumes the car's resting orientation.
  useEffect(() => {
    if (focus) rt.current.yawTarget = 0;
  }, [focus]);

  return (
    <>
      <RuntimeDriver rt={rt} />
      <Atmosphere rt={rt} />
      <StudioLighting mode={lighting} resolution={tier === "high" ? 256 : 128} />
      <CameraRig rt={rt} focus={focusCam} zoom={zoom} parallax={interactive} idle={interactive && tier !== "low"} />
      <FocusProjector focus={focus} onScreen={onFocusScreen} />
      <DragRotate rt={rt} enabled={interactive} />
      <StudioFloor rt={rt} tier={tier} />
      <Highway rt={rt} lowDetail={tier === "low"} />
      <GpsLayer rt={rt} roofY={SPEC.roof} />
      <FleetNetwork rt={rt} mainRoof={SPEC.roof} />
      <Vehicle rt={rt} focus={focus} onSelect={setFocus} lowDetail={tier === "low"} />
      <Laptop rt={rt} features={screens} theme={theme} position={[0.1, 0, 4.2]} faceAz={0.74} />
      <Effects tier={tier} />
      <FrameDriver rt={rt} />
    </>
  );
}
