"use client";

import { useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { VEHICLE_SPECS, componentPositions, type ComponentId, type VehicleSpec, type VehicleVariant } from "./vehicleSpecs";

/** Per-frame animation inputs, written by whoever drives the scene. */
export interface VehicleAnimState {
  /** 0 = painted vehicle, 1 = x-ray digital twin. */
  twin: number;
  /** Wheel angular speed, rad/s. */
  wheelSpeed: number;
  /** 0..1 headlight intensity. */
  headlights: number;
  hazards: boolean;
}

export const defaultAnimState = (): VehicleAnimState => ({ twin: 0, wheelSpeed: 0, headlights: 1, hazards: false });

interface VehicleModelProps {
  variant?: VehicleVariant;
  paint: { color: string; metalness: number; roughness: number };
  anim?: MutableRefObject<VehicleAnimState>;
  /** Highlighted twin component (twin demo). */
  highlight?: ComponentId | null;
  onComponentSelect?: (id: ComponentId) => void;
  /** Lower geometric detail for low-tier devices. */
  lowDetail?: boolean;
}

const TWIN_COLOR = new THREE.Color("#18C7CC"); // $palette-cyan

function archArc(shape: THREE.Shape, cx: number, cy: number, r: number, y: number) {
  const a = Math.asin(THREE.MathUtils.clamp((y - cy) / r, -1, 1));
  shape.absarc(cx, cy, r, Math.PI - a, a, true);
}

function lowerBodyShape(s: VehicleSpec) {
  const hx = s.length / 2;
  const wb = s.wheelbase / 2;
  const ar = s.wheelRadius + 0.12;
  const shape = new THREE.Shape();
  shape.moveTo(-hx + 0.12, s.sill);
  archArc(shape, -wb, s.wheelRadius, ar, s.sill);
  archArc(shape, wb, s.wheelRadius, ar, s.sill);
  shape.lineTo(hx - 0.14, s.sill);
  shape.quadraticCurveTo(hx + 0.02, s.sill, hx + 0.02, s.sill + 0.18);
  shape.lineTo(hx + 0.02, s.nose);
  shape.quadraticCurveTo(hx + 0.01, s.hoodFront, hx - 0.2, s.hoodFront);
  shape.quadraticCurveTo(hx * 0.45, s.hoodFront + (s.belt - s.hoodFront) * 0.95, s.windshieldBaseX, s.belt);
  shape.lineTo(s.rearGlassBottomX + 0.02, s.belt + 0.02);
  if (s.tailTop > s.belt + 0.3) {
    // Van: the body carries on up to the roof at the rear doors.
    shape.lineTo(-hx + 0.05, s.tailTop);
  } else {
    shape.quadraticCurveTo(-hx + 0.25, s.tailTop + 0.01, -hx + 0.06, s.tailTop);
  }
  shape.quadraticCurveTo(-hx - 0.02, s.tailTop - 0.02, -hx - 0.02, s.tailTop - 0.14);
  shape.lineTo(-hx - 0.02, s.sill + 0.16);
  shape.quadraticCurveTo(-hx - 0.02, s.sill, -hx + 0.12, s.sill);
  return shape;
}

function cabinCurves(s: VehicleSpec) {
  const windshield = new THREE.QuadraticBezierCurve(
    new THREE.Vector2(s.windshieldBaseX + 0.04, s.belt - 0.03),
    new THREE.Vector2(s.windshieldBaseX - (s.windshieldBaseX - s.windshieldTopX) * 0.32, s.belt + (s.roof - s.belt) * 0.78),
    new THREE.Vector2(s.windshieldTopX, s.roof)
  );
  const roof = new THREE.QuadraticBezierCurve(
    new THREE.Vector2(s.windshieldTopX, s.roof),
    new THREE.Vector2((s.windshieldTopX + s.roofEndX) / 2, s.roof + 0.05),
    new THREE.Vector2(s.roofEndX, s.roof - 0.03)
  );
  const rear = new THREE.QuadraticBezierCurve(
    new THREE.Vector2(s.roofEndX, s.roof - 0.03),
    new THREE.Vector2(s.rearGlassBottomX + 0.06, s.roof - 0.12),
    new THREE.Vector2(s.rearGlassBottomX, s.belt - 0.03)
  );
  return { windshield, roof, rear };
}

function cabinShape(s: VehicleSpec) {
  const { windshield, roof, rear } = cabinCurves(s);
  const pts = [...windshield.getPoints(16), ...roof.getPoints(20).slice(1), ...rear.getPoints(12).slice(1)];
  return new THREE.Shape(pts);
}

function roofShape(s: VehicleSpec) {
  const { roof } = cabinCurves(s);
  const top: THREE.Vector2[] = [];
  const bottom: THREE.Vector2[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = 0.04 + (i / 24) * 0.92;
    const p = roof.getPoint(t);
    top.push(new THREE.Vector2(p.x, p.y + 0.018));
    bottom.push(new THREE.Vector2(p.x, p.y - 0.045));
  }
  return new THREE.Shape([...top, ...bottom.reverse()]);
}

/** Extrude a side profile across the vehicle width with soft shoulders. */
function extrudeSide(shape: THREE.Shape, width: number, bevel: number, segments: number, curveSegments: number) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.01, width - bevel * 2),
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel * 0.38,
    bevelSegments: segments,
    curveSegments,
  });
  geo.translate(0, 0, -(width - bevel * 2) / 2);
  // Smooth the bevel rings but keep the flat side panels perfectly flat:
  // averaged normals on long cap triangles streak the paint reflections.
  const smooth = toCreasedNormals(geo, Math.PI / 3.2);
  geo.dispose();
  smooth.computeBoundingBox();
  const zMax = smooth.boundingBox!.max.z;
  const zMin = smooth.boundingBox!.min.z;
  const pos = smooth.attributes.position;
  const nor = smooth.attributes.normal;
  for (let i = 0; i < pos.count; i++) {
    const z = pos.getZ(i);
    if (Math.abs(z - zMax) < 1e-4) nor.setXYZ(i, 0, 0, 1);
    else if (Math.abs(z - zMin) < 1e-4) nor.setXYZ(i, 0, 0, -1);
  }
  nor.needsUpdate = true;
  return smooth;
}

function tireGeometry(r: number, width: number, rimR: number, segments: number) {
  const h = width / 2;
  const pts = [
    new THREE.Vector2(rimR, -h * 0.92),
    new THREE.Vector2(rimR + (r - rimR) * 0.45, -h),
    new THREE.Vector2(r - 0.03, -h * 0.96),
    new THREE.Vector2(r - 0.006, -h * 0.72),
    new THREE.Vector2(r, -h * 0.35),
    new THREE.Vector2(r, h * 0.35),
    new THREE.Vector2(r - 0.006, h * 0.72),
    new THREE.Vector2(r - 0.03, h * 0.96),
    new THREE.Vector2(rimR + (r - rimR) * 0.45, h),
    new THREE.Vector2(rimR, h * 0.92),
  ];
  const geo = new THREE.LatheGeometry(pts, segments);
  geo.rotateX(Math.PI / 2); // axle along Z
  return geo;
}

interface Materials {
  paint: THREE.MeshPhysicalMaterial;
  glass: THREE.MeshPhysicalMaterial;
  trim: THREE.MeshStandardMaterial;
  cladding: THREE.MeshStandardMaterial;
  chrome: THREE.MeshStandardMaterial;
  tire: THREE.MeshStandardMaterial;
  rim: THREE.MeshStandardMaterial;
  disc: THREE.MeshStandardMaterial;
  caliper: THREE.MeshStandardMaterial;
  headlight: THREE.MeshStandardMaterial;
  drl: THREE.MeshStandardMaterial;
  tail: THREE.MeshStandardMaterial;
  indicator: THREE.MeshStandardMaterial;
  twinLines: THREE.LineBasicMaterial;
  node: THREE.MeshStandardMaterial;
  nodeActive: THREE.MeshStandardMaterial;
}

function createMaterials(): Materials {
  return {
    paint: new THREE.MeshPhysicalMaterial({ clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 1.25 }),
    glass: new THREE.MeshPhysicalMaterial({
      color: "#0A0F15", metalness: 0.1, roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0.02,
      envMapIntensity: 1.6, transparent: true, opacity: 0.94,
    }),
    trim: new THREE.MeshStandardMaterial({ color: "#0C0E11", metalness: 0.4, roughness: 0.35 }),
    cladding: new THREE.MeshStandardMaterial({ color: "#16181B", metalness: 0, roughness: 0.82 }),
    chrome: new THREE.MeshStandardMaterial({ color: "#D9DEE4", metalness: 1, roughness: 0.12 }),
    tire: new THREE.MeshStandardMaterial({ color: "#121314", metalness: 0, roughness: 0.88 }),
    rim: new THREE.MeshStandardMaterial({ color: "#B9BEC5", metalness: 1, roughness: 0.22 }),
    disc: new THREE.MeshStandardMaterial({ color: "#5A5E63", metalness: 0.9, roughness: 0.42 }),
    caliper: new THREE.MeshStandardMaterial({ color: "#0EA5A8", metalness: 0.3, roughness: 0.35 }), // $palette-cyan-600
    headlight: new THREE.MeshStandardMaterial({ color: "#F4F8FF", emissive: "#EAF4FF", emissiveIntensity: 4, roughness: 0.1 }),
    drl: new THREE.MeshStandardMaterial({ color: "#E8FBFF", emissive: "#CFF7FA", emissiveIntensity: 3, roughness: 0.1 }),
    tail: new THREE.MeshStandardMaterial({ color: "#5A0A0E", emissive: "#FF2433", emissiveIntensity: 2.4, roughness: 0.2 }),
    indicator: new THREE.MeshStandardMaterial({ color: "#3A2606", emissive: "#FFA51F", emissiveIntensity: 0, roughness: 0.2 }),
    twinLines: new THREE.LineBasicMaterial({ color: TWIN_COLOR, transparent: true, opacity: 0, depthWrite: false }),
    node: new THREE.MeshStandardMaterial({ color: "#0B1B2D", emissive: TWIN_COLOR, emissiveIntensity: 1.2, transparent: true, opacity: 0 }),
    nodeActive: new THREE.MeshStandardMaterial({ color: "#0B1B2D", emissive: "#67E8F9", emissiveIntensity: 4, transparent: true, opacity: 0 }),
  };
}

function Wheel({ spec, side, front, mats, segments, spinRef }: {
  spec: VehicleSpec;
  side: 1 | -1;
  front: boolean;
  mats: Materials;
  segments: number;
  spinRef: (g: THREE.Group | null) => void;
}) {
  const r = spec.wheelRadius;
  const rimR = r * 0.66;
  const geos = useMemo(() => {
    const spokes = new THREE.BoxGeometry(rimR * 0.92, 0.045, 0.03);
    spokes.translate(rimR * 0.46, 0, 0);
    return {
      tire: tireGeometry(r, 0.25, rimR, segments),
      barrel: new THREE.CylinderGeometry(rimR, rimR, 0.21, segments, 1, true).rotateX(Math.PI / 2),
      face: new THREE.CylinderGeometry(rimR * 0.98, rimR * 0.98, 0.012, segments).rotateX(Math.PI / 2),
      lip: new THREE.TorusGeometry(rimR, 0.012, 8, segments),
      hub: new THREE.CylinderGeometry(rimR * 0.2, rimR * 0.22, 0.05, 24).rotateX(Math.PI / 2),
      spoke: spokes,
      disc: new THREE.CylinderGeometry(rimR * 0.8, rimR * 0.8, 0.024, 40).rotateX(Math.PI / 2),
      caliper: new THREE.BoxGeometry(0.1, 0.16, 0.06),
    };
  }, [r, rimR, segments]);

  useEffect(() => () => Object.values(geos).forEach((g) => g.dispose()), [geos]);

  const x = (front ? 1 : -1) * (spec.wheelbase / 2);
  const z = side * (spec.width / 2 - 0.15);
  return (
    <group position={[x, r, z]} rotation={[0, side === 1 ? 0 : Math.PI, 0]}>
      {/* caliper does not spin */}
      <mesh geometry={geos.caliper} material={mats.caliper} position={[front ? -rimR * 0.55 : rimR * 0.55, rimR * 0.35, 0.02]} />
      <group ref={spinRef}>
        <mesh geometry={geos.tire} material={mats.tire} castShadow />
        <mesh geometry={geos.barrel} material={mats.disc} />
        <mesh geometry={geos.disc} material={mats.disc} position={[0, 0, -0.02]} />
        <mesh geometry={geos.lip} material={mats.rim} position={[0, 0, 0.1]} />
        <mesh geometry={geos.hub} material={mats.rim} position={[0, 0, 0.1]} />
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={i} geometry={geos.spoke} material={mats.rim} position={[0, 0, 0.095]} rotation={[0, 0, (i / 6) * Math.PI * 2]} />
        ))}
      </group>
    </group>
  );
}

/**
 * Procedural, physically based vehicle used until a licensed production GLB
 * is supplied (see docs/3D-EXPERIENCE.md). Clearcoat paint, tinted glass,
 * lathe-profile tyres, alloy wheels and emissive lighting; an x-ray "digital
 * twin" mode reveals where the telematics components live.
 */
export default function VehicleModel({ variant = "suv", paint, anim, highlight = null, onComponentSelect, lowDetail = false }: VehicleModelProps) {
  const spec = VEHICLE_SPECS[variant];
  const mats = useMemo(createMaterials, []);
  const localAnim = useRef<VehicleAnimState>(defaultAnimState());
  const state = anim ?? localAnim;
  const wheels = useRef<(THREE.Group | null)[]>([]);
  const twinWasOn = useRef(false);
  const segments = lowDetail ? 32 : 64;

  const geos = useMemo(() => {
    const cabinWidth = spec.width * (variant === "van" ? 0.92 : 0.84);
    const body = extrudeSide(lowerBodyShape(spec), spec.width, 0.16, lowDetail ? 4 : 8, lowDetail ? 16 : 36);
    const cabin = extrudeSide(cabinShape(spec), cabinWidth, 0.12, lowDetail ? 3 : 6, 12);
    const roof = extrudeSide(roofShape(spec), cabinWidth - 0.08, 0.05, 3, 12);
    return {
      body,
      cabin,
      roof,
      bodyEdges: new THREE.EdgesGeometry(body, 28),
      cabinEdges: new THREE.EdgesGeometry(cabin, 28),
      archTrim: new THREE.TorusGeometry(spec.wheelRadius + 0.1, 0.035, 8, 40, Math.PI),
      node: new THREE.SphereGeometry(0.07, 20, 16),
      halo: new THREE.RingGeometry(0.1, 0.13, 32),
      cabinWidth,
    };
  }, [spec, variant, lowDetail]);

  useEffect(
    () => () => {
      Object.values(geos).forEach((g) => typeof g === "object" && "dispose" in g && g.dispose());
    },
    [geos]
  );
  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);

  useEffect(() => {
    mats.paint.color.set(paint.color);
    mats.paint.metalness = paint.metalness;
    mats.paint.roughness = paint.roughness;
  }, [mats, paint.color, paint.metalness, paint.roughness]);

  useFrame((frame, delta) => {
    const s = state.current;
    const dt = Math.min(delta, 0.05);
    for (const w of wheels.current) if (w) w.rotation.z -= s.wheelSpeed * dt;

    const blinkOn = s.hazards && Math.floor(frame.clock.elapsedTime * 1.6) % 2 === 0;
    mats.indicator.emissiveIntensity = blinkOn ? 5 : 0;
    mats.headlight.emissiveIntensity = 0.4 + 4.2 * s.headlights;
    mats.drl.emissiveIntensity = 1 + 2.4 * s.headlights;

    // Twin mode: fade the painted shell, reveal edges and components.
    const twin = s.twin;
    const twinOn = twin > 0.001;
    if (twinOn !== twinWasOn.current) {
      twinWasOn.current = twinOn;
      for (const m of [mats.paint, mats.trim, mats.cladding]) {
        m.transparent = twinOn;
        m.needsUpdate = true;
      }
    }
    mats.paint.opacity = 1 - 0.86 * twin;
    mats.trim.opacity = 1 - 0.8 * twin;
    mats.cladding.opacity = 1 - 0.8 * twin;
    mats.paint.depthWrite = twin < 0.5;
    mats.glass.opacity = 0.94 - 0.8 * twin;
    mats.twinLines.opacity = 0.85 * twin;
    mats.node.opacity = twin;
    mats.nodeActive.opacity = twin;
    mats.node.emissiveIntensity = 1 + 0.6 * Math.sin(frame.clock.elapsedTime * 3);
  });

  const hx = spec.length / 2;
  const W = spec.width;
  const headY = spec.nose + (spec.hoodFront - spec.nose) * 0.35;
  const nodes = componentPositions(variant);

  return (
    <group>
      <mesh geometry={geos.body} material={mats.paint} castShadow />
      <mesh geometry={geos.cabin} material={mats.glass} />
      {variant !== "van" && <mesh geometry={geos.roof} material={mats.paint} position={[0, 0.004, 0]} castShadow />}

      {/* x-ray outline for the digital twin */}
      <lineSegments geometry={geos.bodyEdges} material={mats.twinLines} />
      <lineSegments geometry={geos.cabinEdges} material={mats.twinLines} />

      {/* front: grille, headlights, light bar, indicators */}
      <mesh material={mats.trim} position={[hx + 0.012, spec.sill + 0.3, 0]}>
        <boxGeometry args={[0.03, 0.2, W * 0.46]} />
      </mesh>
      {[1, -1].map((side) => (
        <group key={`front-${side}`}>
          <mesh material={mats.headlight} position={[hx + 0.005, headY, side * (W / 2 - 0.3)]} rotation={[0, side * 0.12, 0]}>
            <boxGeometry args={[0.035, 0.06, 0.42]} />
          </mesh>
          <mesh material={mats.indicator} position={[hx - 0.03, headY - 0.07, side * (W / 2 - 0.14)]}>
            <boxGeometry args={[0.04, 0.03, 0.14]} />
          </mesh>
          <mesh material={mats.indicator} position={[-hx - 0.015, spec.tailTop - 0.2, side * (W / 2 - 0.12)]}>
            <boxGeometry args={[0.03, 0.04, 0.16]} />
          </mesh>
          {/* mirrors */}
          <group position={[spec.windshieldBaseX - 0.08, spec.belt + 0.07, side * (W / 2 + 0.04)]}>
            <mesh material={mats.paint} castShadow>
              <boxGeometry args={[0.16, 0.1, 0.18]} />
            </mesh>
            <mesh material={mats.trim} position={[0.02, -0.07, -side * 0.06]}>
              <boxGeometry args={[0.06, 0.05, 0.08]} />
            </mesh>
          </group>
          {/* door handles + shut lines */}
          {[0.32, -0.72].map((dx) => (
            <mesh key={dx} material={mats.chrome} position={[dx, spec.belt - 0.12, side * (W / 2 + 0.002)]}>
              <boxGeometry args={[0.14, 0.022, 0.012]} />
            </mesh>
          ))}
          {[spec.windshieldBaseX - 0.1, -0.2, variant === "van" ? -1.5 : -1.2].map((dx) => (
            <mesh key={`seam-${dx}`} material={mats.trim} position={[dx, (spec.belt + spec.sill) / 2 + 0.04, side * (W / 2 + 0.001)]}>
              <boxGeometry args={[0.006, spec.belt - spec.sill - 0.12, 0.004]} />
            </mesh>
          ))}
          {/* sill cladding + arch trim */}
          <mesh material={mats.cladding} position={[0, spec.sill + 0.06, side * (W / 2 + 0.003)]}>
            <boxGeometry args={[spec.wheelbase - (spec.wheelRadius + 0.12) * 2 - 0.04, 0.12, 0.012]} />
          </mesh>
          {[1, -1].map((fr) => (
            <mesh
              key={`arch-${fr}`}
              geometry={geos.archTrim}
              material={mats.cladding}
              position={[fr * (spec.wheelbase / 2), spec.wheelRadius, side * (W / 2 - 0.01)]}
            />
          ))}
          {spec.roofRails && (
            <mesh material={mats.trim} position={[(spec.windshieldTopX + spec.roofEndX) / 2, spec.roof + 0.05, side * (geos.cabinWidth / 2 - 0.12)]}>
              <boxGeometry args={[Math.abs(spec.windshieldTopX - spec.roofEndX) * 0.86, 0.03, 0.035]} />
            </mesh>
          )}
        </group>
      ))}
      <mesh material={mats.drl} position={[hx + 0.012, headY + 0.045, 0]}>
        <boxGeometry args={[0.02, 0.012, W * 0.5]} />
      </mesh>

      {/* rear light bar */}
      <mesh material={mats.tail} position={[-hx - 0.024, spec.tailTop - (variant === "van" ? 0.9 : 0.1), 0]}>
        <boxGeometry args={[0.02, 0.05, W * 0.84]} />
      </mesh>

      {[1, -1].flatMap((side) =>
        [true, false].map((front) => (
          <Wheel
            key={`${side}-${front}`}
            spec={spec}
            side={side as 1 | -1}
            front={front}
            mats={mats}
            segments={segments}
            spinRef={(g) => {
              wheels.current[(side === 1 ? 0 : 2) + (front ? 0 : 1)] = g;
            }}
          />
        ))
      )}

      {/* telematics components, visible in twin mode */}
      {(Object.entries(nodes) as [ComponentId, [number, number, number]][]).map(([id, p]) => (
        <group key={id} position={p}>
          <mesh
            geometry={geos.node}
            material={highlight === id ? mats.nodeActive : mats.node}
            onClick={
              onComponentSelect
                ? (e) => {
                    e.stopPropagation();
                    onComponentSelect(id);
                  }
                : undefined
            }
            onPointerOver={onComponentSelect ? () => (document.body.style.cursor = "pointer") : undefined}
            onPointerOut={onComponentSelect ? () => (document.body.style.cursor = "") : undefined}
          />
        </group>
      ))}
    </group>
  );
}
