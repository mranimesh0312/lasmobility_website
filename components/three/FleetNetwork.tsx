"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { smoothstep } from "./storyMath";
import type { StoryRuntime } from "./storyRuntime";
import { PALETTE } from "@/lib/palette";
import styles from "./StoryScene.module.scss";

/** One part of a holographic vehicle: a box, or a wheel (axle along Z). */
type Part = { box: [number, number, number]; at: [number, number, number]; rotZ?: number } | { wheel: number; at: [number, number, number]; w?: number };

/** Simple silhouettes, facing +X, standing on y = 0. Metres. */
const SHAPES: Record<string, { parts: Part[]; roof: number }> = {
  car: {
    roof: 1.5,
    parts: [
      { box: [4.2, 0.7, 1.8], at: [0, 0.62, 0] },
      { box: [2.2, 0.56, 1.6], at: [-0.25, 1.24, 0] },
      ...[1.35, -1.35].flatMap((x) => [0.92, -0.92].map((z) => ({ wheel: 0.33, at: [x, 0.33, z] as [number, number, number] }))),
    ],
  },
  van: {
    roof: 2.3,
    parts: [
      { box: [5, 1.85, 2], at: [0, 1.28, 0] },
      { box: [0.9, 0.9, 1.9], at: [2.75, 0.8, 0] },
      ...[1.75, -1.6].flatMap((x) => [1, -1].map((z) => ({ wheel: 0.37, at: [x, 0.37, z] as [number, number, number] }))),
    ],
  },
  truck: {
    roof: 2.95,
    parts: [
      { box: [2.1, 2.3, 2.3], at: [3.4, 1.5, 0] },
      { box: [6.2, 2.6, 2.4], at: [-0.95, 1.75, 0] },
      ...[3.5, 0.6, -2.6].flatMap((x) => [1.12, -1.12].map((z) => ({ wheel: 0.46, at: [x, 0.46, z] as [number, number, number] }))),
    ],
  },
  bus: {
    roof: 3.0,
    parts: [
      { box: [9.4, 2.55, 2.5], at: [0, 1.7, 0] },
      { box: [8.6, 0.5, 2.52], at: [0.1, 2.25, 0] },
      ...[3.4, -3.0].flatMap((x) => [1.2, -1.2].map((z) => ({ wheel: 0.5, at: [x, 0.5, z] as [number, number, number] }))),
    ],
  },
  bike: {
    roof: 1.65,
    parts: [
      { box: [1.6, 0.42, 0.34], at: [0, 0.72, 0] },
      { box: [0.42, 0.72, 0.42], at: [-0.12, 1.28, 0] },
      { wheel: 0.33, at: [0.68, 0.33, 0], w: 0.12 },
      { wheel: 0.33, at: [-0.68, 0.33, 0], w: 0.12 },
    ],
  },
  equipment: {
    roof: 3.1,
    parts: [
      { box: [3.1, 1.1, 2.3], at: [0, 0.85, 0] },
      { box: [1.4, 1.2, 1.5], at: [-0.5, 1.95, 0.2] },
      { box: [0.36, 2.6, 0.36], at: [1.55, 1.8, -0.5], rotZ: -0.55 },
      { box: [3.3, 0.5, 0.6], at: [0, 0.25, 1.05] },
      { box: [3.3, 0.5, 0.6], at: [0, 0.25, -1.05] },
    ],
  },
};

/** The fleet around the main car: shape, position (x, z), heading and live tag. */
const FLEET = [
  { shape: "van", at: [-7.2, -5.2], yaw: 0.35, tag: "VAN-07 · 41 km/h" },
  { shape: "truck", at: [-10.2, 3.8], yaw: -0.25, tag: "TRK-12 · 54 km/h" },
  { shape: "bus", at: [1.5, -9.6], yaw: 0.12, tag: "BUS-03 · at stop" },
  { shape: "car", at: [6.4, -6.4], yaw: 0.5, tag: "CAR-21 · idle" },
  { shape: "bike", at: [6.8, 4.4], yaw: -0.7, tag: "2W-05 · 28 km/h" },
  { shape: "equipment", at: [-3.6, 9.2], yaw: 0.2, tag: "EQP-02 · engine on" },
] as const;

const HUB: [number, number, number] = [0, 8.2, 0];

/**
 * Fleet chapter: holographic vehicles of every category materialise around
 * the main car one after another, each linked by an IoT beam to the LAS cloud
 * hub above, with data pulses travelling both ways. Driven by mix.fleet, so it
 * plays forwards and backwards with the scroll.
 */
export default function FleetNetwork({ rt, mainRoof }: { rt: MutableRefObject<StoryRuntime>; mainRoof: number }) {
  const root = useRef<THREE.Group>(null);
  const units = useRef<(THREE.Group | null)[]>([]);
  const scans = useRef<(THREE.Mesh | null)[]>([]);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  const tags = useRef<(HTMLDivElement | null)[]>([]);
  const hub = useRef<THREE.Group>(null);
  const hubTag = useRef<HTMLDivElement>(null);

  const res = useMemo(() => {
    const box = new THREE.BoxGeometry(1, 1, 1);
    const edges = new THREE.EdgesGeometry(box);
    const wheel = new THREE.CylinderGeometry(1, 1, 1, 20);
    const wheelEdges = new THREE.EdgesGeometry(wheel, 30);
    const ring = new THREE.RingGeometry(0.9, 1, 64);
    const pulse = new THREE.SphereGeometry(0.11, 12, 10);
    // One material set per vehicle so each can fade in on its own.
    const perUnit = FLEET.map(() => ({
      fill: new THREE.MeshBasicMaterial({ color: PALETTE.accent, transparent: true, opacity: 0, depthWrite: false }),
      edge: new THREE.LineBasicMaterial({ color: PALETTE.accentText, transparent: true, opacity: 0 }),
      scan: new THREE.MeshBasicMaterial({ color: PALETTE.accentText, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }),
      beam: new THREE.MeshBasicMaterial({ color: PALETTE.accent, transparent: true, opacity: 0, depthWrite: false }),
      pulse: new THREE.MeshBasicMaterial({ color: PALETTE.white, transparent: true, opacity: 0 }),
    }));
    const links = [...FLEET.map((f) => ({ from: [f.at[0], SHAPES[f.shape].roof + 0.15, f.at[1]] as const })), { from: [0, mainRoof + 0.2, 0] as const }].map(({ from }) => {
      const a = new THREE.Vector3(from[0], from[1], from[2]);
      const b = new THREE.Vector3(...HUB);
      const mid = a.clone().lerp(b, 0.5).add(new THREE.Vector3(0, 1.6, 0));
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      return { curve, geo: new THREE.TubeGeometry(curve, 40, 0.025, 5, false) };
    });
    const mainMats = {
      beam: new THREE.MeshBasicMaterial({ color: PALETTE.accent, transparent: true, opacity: 0, depthWrite: false }),
      pulse: new THREE.MeshBasicMaterial({ color: PALETTE.white, transparent: true, opacity: 0 }),
    };
    const hubMats = {
      core: new THREE.MeshBasicMaterial({ color: PALETTE.accent, wireframe: true, transparent: true, opacity: 0 }),
      ring: new THREE.MeshBasicMaterial({ color: PALETTE.accentText, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }),
      glow: new THREE.MeshBasicMaterial({ color: PALETTE.accent, transparent: true, opacity: 0, depthWrite: false }),
    };
    const hubGeo = {
      core: new THREE.IcosahedronGeometry(0.75, 1),
      ring: new THREE.TorusGeometry(1.35, 0.03, 8, 64),
      glow: new THREE.SphereGeometry(1.1, 24, 16),
    };
    return { box, edges, wheel, wheelEdges, ring, pulse, perUnit, links, mainMats, hubMats, hubGeo };
  }, [mainRoof]);

  useEffect(
    () => () => {
      [res.box, res.edges, res.wheel, res.wheelEdges, res.ring, res.pulse, ...res.links.map((l) => l.geo), ...Object.values(res.hubGeo)].forEach((g) => g.dispose());
      [...res.perUnit.flatMap((m) => Object.values(m)), ...Object.values(res.mainMats), ...Object.values(res.hubMats)].forEach((m) => m.dispose());
    },
    [res]
  );

  useFrame((frame) => {
    const r = rt.current;
    const f = r.mix.fleet;
    const g = root.current;
    if (!g) return;
    g.visible = f > 0.005;
    const hideTags = f < 0.35;
    if (!g.visible) {
      tags.current.forEach((el) => el && (el.style.opacity = "0"));
      if (hubTag.current) hubTag.current.style.opacity = "0";
      return;
    }
    r.busy = true; // pulses move continuously while the chapter is on screen
    const t = frame.clock.elapsedTime;

    FLEET.forEach((_, i) => {
      // Staggered arrival: each vehicle rises out of the floor after the last.
      const a = smoothstep(0.08 + i * 0.09, 0.4 + i * 0.09, f);
      const m = res.perUnit[i];
      const u = units.current[i];
      if (u) {
        u.scale.set(1, Math.max(0.001, a), 1);
        u.visible = a > 0.002;
      }
      m.fill.opacity = 0.1 * a;
      m.edge.opacity = 0.85 * a;
      const scan = scans.current[i];
      if (scan) {
        const s = 1.5 + a * 4;
        scan.scale.set(s, s, 1);
        m.scan.opacity = a * (1 - a) * 2.4;
      }
      // Beam lights up once the vehicle has landed.
      const link = smoothstep(0.55, 1, a);
      m.beam.opacity = 0.55 * link;
      const p = pulses.current[i];
      if (p) {
        // Alternate directions: telemetry up, commands down.
        const k = ((t * 0.32 + i * 0.17) % 1 + 1) % 1;
        p.position.copy(res.links[i].curve.getPoint(i % 2 ? 1 - k : k));
        m.pulse.opacity = link;
      }
      const tag = tags.current[i];
      if (tag) tag.style.opacity = hideTags ? "0" : String(link);
    });

    // Main vehicle's own link and the hub.
    const mainLink = smoothstep(0.1, 0.4, f);
    res.mainMats.beam.opacity = 0.7 * mainLink;
    res.mainMats.pulse.opacity = mainLink;
    const mp = pulses.current[FLEET.length];
    if (mp) mp.position.copy(res.links[FLEET.length].curve.getPoint((t * 0.4) % 1));
    const h = hub.current;
    const hv = smoothstep(0.05, 0.35, f);
    if (h) {
      h.rotation.y = t * 0.3;
      h.scale.setScalar(0.6 + 0.4 * hv);
    }
    res.hubMats.core.opacity = 0.9 * hv;
    res.hubMats.ring.opacity = 0.7 * hv;
    res.hubMats.glow.opacity = 0.1 * hv * (0.8 + 0.2 * Math.sin(t * 2));
    if (hubTag.current) hubTag.current.style.opacity = hideTags ? "0" : String(hv);
  });

  return (
    <group ref={root} visible={false}>
      {FLEET.map((v, i) => {
        const shape = SHAPES[v.shape];
        const m = res.perUnit[i];
        return (
          <group key={v.tag} position={[v.at[0], 0, v.at[1]]}>
            <mesh ref={(el) => void (scans.current[i] = el)} geometry={res.ring} material={m.scan} rotation-x={-Math.PI / 2} position-y={0.03} />
            <group ref={(el) => void (units.current[i] = el)} rotation-y={v.yaw}>
              {shape.parts.map((p, n) =>
                "box" in p ? (
                  <group key={n} position={p.at} rotation-z={p.rotZ ?? 0} scale={p.box}>
                    <mesh geometry={res.box} material={m.fill} />
                    <lineSegments geometry={res.edges} material={m.edge} />
                  </group>
                ) : (
                  <group key={n} position={p.at} rotation-x={Math.PI / 2} scale={[p.wheel, p.w ?? 0.26, p.wheel]}>
                    <mesh geometry={res.wheel} material={m.fill} />
                    <lineSegments geometry={res.wheelEdges} material={m.edge} />
                  </group>
                )
              )}
            </group>
            <Html position={[0, shape.roof + 0.7, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
              <div ref={(el) => void (tags.current[i] = el)} className={styles.fleetTag} style={{ opacity: 0 }}>
                <i aria-hidden="true" /> {v.tag}
              </div>
            </Html>
          </group>
        );
      })}

      {/* IoT links: one per vehicle plus the main car, with a travelling data pulse each. */}
      {res.links.map((l, i) => (
        <group key={i}>
          <mesh geometry={l.geo} material={i < FLEET.length ? res.perUnit[i].beam : res.mainMats.beam} />
          <mesh ref={(el) => void (pulses.current[i] = el)} geometry={res.pulse} material={i < FLEET.length ? res.perUnit[i].pulse : res.mainMats.pulse} />
        </group>
      ))}

      {/* LAS cloud hub */}
      <group position={HUB}>
        <group ref={hub}>
          <mesh geometry={res.hubGeo.core} material={res.hubMats.core} />
          <mesh geometry={res.hubGeo.ring} material={res.hubMats.ring} rotation-x={Math.PI / 2} />
          <mesh geometry={res.hubGeo.ring} material={res.hubMats.ring} rotation-x={Math.PI / 2.6} rotation-y={0.6} />
        </group>
        <mesh geometry={res.hubGeo.glow} material={res.hubMats.glow} />
        <Html position={[0, 1.9, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
          <div ref={hubTag} className={styles.hubTag} style={{ opacity: 0 }}>
            LAS Mobility cloud · 24 vehicles
          </div>
        </Html>
      </group>
    </group>
  );
}
