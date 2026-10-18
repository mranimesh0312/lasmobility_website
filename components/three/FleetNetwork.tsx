"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { smoothstep } from "./storyMath";
import type { StoryRuntime } from "./storyRuntime";
import { PALETTE } from "@/lib/palette";
import styles from "./StoryScene.module.scss";

type Status = "running" | "idle" | "stopped";
type Kind = "car" | "van" | "truck" | "bus";

/** Ellipse loop (x, z) with optional reversed direction (for the opposite lane). */
const ellipse = (rx: number, rz: number, reverse = false, n = 16): [number, number][] => {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return [Math.cos(a) * rx, Math.sin(a) * rz] as [number, number];
  });
  return reverse ? pts.reverse() : pts;
};

/**
 * Closed road loops on the ground (x, z), metres. Nothing crosses: an inner
 * one-way ring, a two-way outer ring (two concentric lanes in opposite
 * directions), a two-way highway behind both rings, and a depot loop inside
 * the inner ring. With equal speeds per lane, vehicles never meet.
 */
const ROADS: [number, number][][] = [
  ellipse(13, 10),
  ellipse(21, 16),
  ellipse(24.5, 19.5, true),
  // highway: out along z = -27, back along z = -31
  [[-44, -27], [-15, -27], [15, -27], [44, -27], [47, -29], [44, -31], [15, -31], [-15, -31], [-44, -31], [-47, -29]],
  // depot loop
  ellipse(2.7, 2.1).map(([x, z]) => [x - 6.2, z + 3.2] as [number, number]),
];

/** The fleet: road, start position along it, laps per second, status, body. Same speed per lane, evenly spaced. */
const FLEET: { road: number; at: number; speed: number; status: Status; kind: Kind; tag?: string }[] = [
  { road: 0, at: 0.0, speed: 0.026, status: "running", kind: "car", tag: "CAR-21 · 46 km/h" },
  { road: 0, at: 0.34, speed: 0.026, status: "running", kind: "van" },
  { road: 0, at: 0.67, speed: 0.026, status: "running", kind: "car" },
  { road: 1, at: 0.1, speed: 0.016, status: "running", kind: "truck", tag: "TRK-12 · 54 km/h" },
  { road: 1, at: 0.43, speed: 0.016, status: "running", kind: "car" },
  { road: 1, at: 0.76, speed: 0.016, status: "running", kind: "van", tag: "VAN-07 · 41 km/h" },
  { road: 2, at: 0.2, speed: 0.014, status: "running", kind: "bus", tag: "BUS-03 · 32 km/h" },
  { road: 2, at: 0.53, speed: 0.014, status: "running", kind: "car" },
  { road: 2, at: 0.86, speed: 0.014, status: "running", kind: "van" },
  { road: 3, at: 0.05, speed: 0.01, status: "running", kind: "truck" },
  { road: 3, at: 0.38, speed: 0.01, status: "running", kind: "van" },
  { road: 3, at: 0.7, speed: 0.01, status: "running", kind: "car" },
  { road: 4, at: 0.05, speed: 0, status: "idle", kind: "van", tag: "VAN-11 · idle 12 min" },
  { road: 4, at: 0.55, speed: 0, status: "stopped", kind: "car" },
];

type P = [number, number];

/**
 * Vehicle skeletons, drawn from real side profiles (x: rear -> front,
 * y: height, metres): body outlines extruded across the width, window and
 * panel lines on both sides, and wheels. Rendered as glowing edges over a
 * faint fill, so they read as vehicles, not boxes.
 */
const SKELETONS: Record<Kind, { width: number; bodies: P[][]; windows: P[][]; lines: P[][]; wheels: { x: number; r: number }[] }> = {
  car: {
    width: 1.8,
    bodies: [[[-2.1, 0.32], [-2.15, 0.72], [-1.95, 0.9], [-1.25, 0.95], [-0.8, 1.38], [0.3, 1.42], [0.95, 0.98], [1.95, 0.84], [2.15, 0.62], [2.12, 0.32]]],
    windows: [[[-0.72, 0.99], [-0.68, 1.31], [0.25, 1.35], [0.82, 1.0]]],
    lines: [[[-0.18, 0.99], [-0.18, 1.33]], [[-0.18, 0.38], [-0.18, 0.97]], [[0.9, 0.38], [0.9, 0.97]]],
    wheels: [{ x: 1.35, r: 0.34 }, { x: -1.35, r: 0.34 }],
  },
  van: {
    width: 2,
    bodies: [[[-2.5, 0.35], [-2.5, 2.1], [1.05, 2.1], [2.15, 1.15], [2.5, 1.0], [2.5, 0.35]]],
    windows: [[[1.15, 1.95], [1.95, 1.2], [1.2, 1.2]], [[-0.6, 1.3], [-0.6, 1.85], [0.85, 1.85], [0.85, 1.3]]],
    lines: [[[0.0, 0.42], [0.0, 1.25]], [[1.05, 0.42], [1.05, 2.05]]],
    wheels: [{ x: 1.75, r: 0.37 }, { x: -1.6, r: 0.37 }],
  },
  truck: {
    width: 2.4,
    bodies: [
      [[-3.7, 0.75], [-3.7, 3.0], [1.45, 3.0], [1.45, 0.75]],
      [[1.65, 0.5], [1.65, 2.7], [3.0, 2.7], [3.65, 1.7], [3.7, 0.5]],
    ],
    windows: [[[1.85, 1.75], [1.85, 2.45], [2.95, 2.45], [3.45, 1.75]]],
    lines: [-2.4, -1.1, 0.2].map((x) => [[x, 0.8], [x, 2.95]] as P[]),
    wheels: [{ x: 3.0, r: 0.48 }, { x: 0.2, r: 0.48 }, { x: -1.2, r: 0.48 }, { x: -2.6, r: 0.48 }],
  },
  bus: {
    width: 2.5,
    bodies: [[[-4.8, 0.4], [-4.8, 2.95], [4.45, 2.95], [4.8, 2.55], [4.8, 0.4]]],
    windows: [[[-4.4, 1.55], [-4.4, 2.55], [4.5, 2.55], [4.5, 1.55]], [[3.6, 0.45], [3.6, 1.45], [4.3, 1.45], [4.3, 0.45]]],
    lines: [-3.3, -2.2, -1.1, 0, 1.1, 2.2, 3.3].map((x) => [[x, 1.55], [x, 2.55]] as P[]),
    wheels: [{ x: 3.3, r: 0.5 }, { x: -3.0, r: 0.5 }],
  },
};

/** Roof height per kind (for beacons, tags and data packets). */
const ROOF: Record<Kind, number> = Object.fromEntries(
  (Object.keys(SKELETONS) as Kind[]).map((k) => [k, Math.max(...SKELETONS[k].bodies.flat().map((p) => p[1]))])
) as Record<Kind, number>;

function buildSkeleton(kind: Kind) {
  const sk = SKELETONS[kind];
  const half = sk.width / 2;
  const seg: number[] = [];
  const loop = (pts: P[], z: number, closed: boolean) => {
    const n = closed ? pts.length : pts.length - 1;
    for (let i = 0; i < n; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      seg.push(a[0], a[1], z, b[0], b[1], z);
    }
  };
  const fills = sk.bodies.map((pts) => {
    const geo = new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y))), { depth: sk.width, bevelEnabled: false });
    geo.translate(0, 0, -half);
    const edges = new THREE.EdgesGeometry(geo, 20);
    const arr = edges.attributes.position.array as Float32Array;
    for (let i = 0; i < arr.length; i++) seg.push(arr[i]);
    edges.dispose();
    return geo;
  });
  for (const z of [half + 0.01, -half - 0.01]) {
    sk.windows.forEach((w) => loop(w, z, true));
    sk.lines.forEach((l) => loop(l, z, false));
    for (const { x, r } of sk.wheels) {
      const circle: P[] = Array.from({ length: 20 }, (_, i) => [x + Math.cos((i / 20) * Math.PI * 2) * r, r + Math.sin((i / 20) * Math.PI * 2) * r]);
      loop(circle, z + Math.sign(z) * 0.01, true);
      loop([[x - r * 0.45, r], [x + r * 0.45, r]], z + Math.sign(z) * 0.01, false);
    }
  }
  const lines = new THREE.BufferGeometry();
  lines.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
  const fill = mergeGeometries(fills) ?? fills[0];
  if (fill !== fills[0]) fills.forEach((g) => g.dispose());
  const front = Math.max(...sk.bodies.flat().map((p) => p[0]));
  const rear = Math.min(...sk.bodies.flat().map((p) => p[0]));
  return { fill, lines, front, rear, half };
}

const HUB: [number, number, number] = [-2, 11, -2];
const DEPOT: [number, number] = [-6.2, 3.2];
const STATUS_COLOR: Record<Status, string> = { running: PALETTE.success, idle: PALETTE.warning, stopped: PALETTE.danger };

/** Flat road ribbon along a closed curve, so roads read as crisp asphalt from above. */
function ribbon(curve: THREE.Curve<THREE.Vector3>, width: number, segs: number) {
  const pos: number[] = [];
  const idx: number[] = [];
  const p = new THREE.Vector3();
  const t = new THREE.Vector3();
  for (let i = 0; i <= segs; i++) {
    curve.getPointAt((i / segs) % 1, p);
    curve.getTangentAt((i / segs) % 1, t);
    const nx = -t.z;
    const nz = t.x;
    const k = Math.hypot(nx, nz) || 1;
    pos.push(p.x + (nx / k) * width * 0.5, 0, p.z + (nz / k) * width * 0.5, p.x - (nx / k) * width * 0.5, 0, p.z - (nz / k) * width * 0.5);
    if (i < segs) {
      const a = i * 2;
      idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();
const bez = new THREE.QuadraticBezierCurve3(new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3());

/**
 * Fleet chapter: a live digital city. Roads draw themselves on the floor,
 * the fleet drives them continuously (idle and stopped vehicles wait in the
 * depot geofence), every vehicle pings its GPS position and streams data
 * packets up to the LAS cloud hub. Driven by mix.fleet, so it draws in and
 * out in both scroll directions.
 */
export default function FleetNetwork({ rt }: { rt: MutableRefObject<StoryRuntime>; mainRoof?: number }) {
  const root = useRef<THREE.Group>(null);
  const units = useRef<(THREE.Group | null)[]>([]);
  const pings = useRef<(THREE.Mesh | null)[]>([]);
  const packets = useRef<(THREE.Mesh | null)[]>([]);
  const tagEls = useRef<(HTMLDivElement | null)[]>([]);
  const hub = useRef<THREE.Group>(null);
  // Simple traffic: each vehicle's position along its road and a 0..1 speed factor.
  const prog = useRef(FLEET.map((v) => v.at));
  const pace = useRef(FLEET.map(() => 1));
  const pos = useMemo(() => FLEET.map(() => new THREE.Vector3()), []);
  const dir = useMemo(() => FLEET.map(() => new THREE.Vector3()), []);
  const hubTag = useRef<HTMLDivElement>(null);
  const zoneTag = useRef<HTMLDivElement>(null);

  const res = useMemo(() => {
    const curves = ROADS.map((pts) => new THREE.CatmullRomCurve3(pts.map(([x, z]) => new THREE.Vector3(x, 0, z)), true, "centripetal"));
    const roadGeo = curves.map((c) => ribbon(c, 2.6, 360));
    const laneGeo = curves.map((c) => ribbon(c, 0.14, 360));
    const skeletons = Object.fromEntries((Object.keys(SKELETONS) as Kind[]).map((k) => [k, buildSkeleton(k)])) as Record<Kind, ReturnType<typeof buildSkeleton>>;
    const box = new THREE.BoxGeometry(1, 1, 1);
    const ring = new THREE.RingGeometry(0.96, 1, 64);
    const packet = new THREE.SphereGeometry(0.22, 10, 8);
    const disc = new THREE.CircleGeometry(4, 64);
    const zoneRing = new THREE.RingGeometry(3.88, 4, 96);
    const fade = (m: THREE.Material) => Object.assign(m, { transparent: true, opacity: 0 });
    const mats = {
      road: fade(new THREE.MeshStandardMaterial({ color: PALETTE.studioRoad, roughness: 0.9, metalness: 0.1, side: THREE.DoubleSide })),
      lane: fade(new THREE.MeshBasicMaterial({ color: PALETTE.accent, depthWrite: false, side: THREE.DoubleSide })),
      // Skeleton vehicles: glowing outline over a faint translucent body.
      skLine: fade(new THREE.LineBasicMaterial({ color: PALETTE.accentText })),
      skFill: fade(new THREE.MeshBasicMaterial({ color: PALETTE.accent, depthWrite: false, side: THREE.DoubleSide })),
      head: fade(new THREE.MeshBasicMaterial({ color: PALETTE.white })),
      beacon: {
        running: fade(new THREE.MeshBasicMaterial({ color: STATUS_COLOR.running })),
        idle: fade(new THREE.MeshBasicMaterial({ color: STATUS_COLOR.idle })),
        stopped: fade(new THREE.MeshBasicMaterial({ color: STATUS_COLOR.stopped })),
      } as Record<Status, THREE.MeshBasicMaterial>,
      ping: FLEET.map((v) => fade(new THREE.MeshBasicMaterial({ color: STATUS_COLOR[v.status], side: THREE.DoubleSide, depthWrite: false }))),
      packet: fade(new THREE.MeshBasicMaterial({ color: PALETTE.accentText })),
      zone: fade(new THREE.MeshBasicMaterial({ color: PALETTE.warning, depthWrite: false })),
      zoneEdge: fade(new THREE.MeshBasicMaterial({ color: PALETTE.warning, side: THREE.DoubleSide, depthWrite: false })),
      hubCore: fade(new THREE.MeshBasicMaterial({ color: PALETTE.accent, wireframe: true })),
      hubRing: fade(new THREE.MeshBasicMaterial({ color: PALETTE.accentText, side: THREE.DoubleSide, depthWrite: false })),
      hubGlow: fade(new THREE.MeshBasicMaterial({ color: PALETTE.accent, depthWrite: false })),
    };
    const hubGeo = { core: new THREE.IcosahedronGeometry(1.1, 1), ring: new THREE.TorusGeometry(1.9, 0.04, 8, 72), glow: new THREE.SphereGeometry(1.7, 24, 16) };
    return { curves, roadGeo, laneGeo, box, ring, packet, disc, zoneRing, skeletons, mats, hubGeo };
  }, []);

  useEffect(
    () => () => {
      [...res.roadGeo, ...res.laneGeo, res.box, res.ring, res.packet, res.disc, res.zoneRing, ...Object.values(res.hubGeo)].forEach((g) => g.dispose());
      Object.values(res.skeletons).forEach((k) => (k.fill.dispose(), k.lines.dispose()));
      const m = res.mats;
      [m.road, m.lane, m.skLine, m.skFill, m.head, ...Object.values(m.beacon), ...m.ping, m.packet, m.zone, m.zoneEdge, m.hubCore, m.hubRing, m.hubGlow].forEach((x) => x.dispose());
    },
    [res]
  );

  useFrame((frame, delta) => {
    const r = rt.current;
    const f = r.mix.fleet;
    const g = root.current;
    if (!g) return;
    g.visible = f > 0.005;
    const tagsOn = f > 0.6;
    if (!g.visible) {
      tagEls.current.forEach((el) => el && (el.style.opacity = "0"));
      [hubTag.current, zoneTag.current].forEach((el) => el && (el.style.opacity = "0"));
      return;
    }
    r.busy = true; // the fleet keeps driving while this chapter is on screen
    const t = frame.clock.elapsedTime;
    const m = res.mats;

    // Roads draw themselves in, then the fleet appears on them.
    const draw = smoothstep(0.02, 0.5, f);
    [res.roadGeo, res.laneGeo].forEach((set) =>
      set.forEach((geo, i) => geo.setDrawRange(0, Math.floor(geo.index!.count * Math.max(0, Math.min(1, draw * 1.15 - i * 0.05)))))
    );
    m.road.opacity = 0.95 * draw;
    m.lane.opacity = 0.55 * draw;
    const show = smoothstep(0.35, 0.75, f);
    [m.skLine, m.head, ...Object.values(m.beacon)].forEach((x) => (x.opacity = show));
    m.skFill.opacity = 0.09 * show;
    m.packet.opacity = 0.9 * smoothstep(0.55, 0.9, f);
    m.zone.opacity = 0.07 * draw;
    m.zoneEdge.opacity = 0.6 * draw;

    // Traffic: place everyone, then each moving vehicle checks its own lane
    // ahead and eases to a stop behind anything in the way. If two vehicles
    // block each other at a crossing, the lower index goes first.
    const dt = Math.min(delta, 0.05);
    FLEET.forEach((v, i) => {
      const u = ((prog.current[i] % 1) + 1) % 1;
      res.curves[v.road].getPointAt(u, pos[i]);
      res.curves[v.road].getTangentAt(u, dir[i]);
    });
    const halfLen = FLEET.map((v) => ((res.skeletons[v.kind].front - res.skeletons[v.kind].rear) / 2) * 0.9);
    const blockedBy = FLEET.map((v, i) => {
      if (v.speed === 0) return -1;
      let hit = -1;
      let best = Infinity;
      FLEET.forEach((_, j) => {
        if (j === i) return;
        const dx = pos[j].x - pos[i].x;
        const dz = pos[j].z - pos[i].z;
        const ahead = dx * dir[i].x + dz * dir[i].z;
        const lateral = Math.abs(dx * dir[i].z - dz * dir[i].x);
        if (ahead > 0 && ahead < halfLen[i] + halfLen[j] + 2.4 && lateral < 2.3 && ahead < best) {
          best = ahead;
          hit = j;
        }
      });
      return hit;
    });
    blockedBy.forEach((j, i) => {
      if (j >= 0 && blockedBy[j] === i && i < j) blockedBy[i] = -1;
    });

    FLEET.forEach((v, i) => {
      const target = blockedBy[i] >= 0 ? 0 : 1;
      pace.current[i] += (target - pace.current[i]) * Math.min(1, dt * 5);
      prog.current[i] += v.speed * pace.current[i] * dt;
      tmpA.copy(pos[i]);
      tmpB.copy(dir[i]);
      const unit = units.current[i];
      if (unit) {
        unit.position.set(tmpA.x, 0, tmpA.z);
        unit.rotation.y = Math.atan2(-tmpB.z, tmpB.x);
      }
      // GPS ping ripple under each vehicle.
      const ph = (t * 0.6 + i * 0.29) % 1;
      const ping = pings.current[i];
      if (ping) {
        ping.position.set(tmpA.x, 0.05, tmpA.z);
        const s = 1.6 + ph * 2.4;
        ping.scale.set(s, s, 1);
      }
      m.ping[i].opacity = (1 - ph) * 0.45 * show;
      // Data packet rising from the vehicle to the cloud hub.
      const pk = packets.current[i];
      if (pk) {
        const q = (t * 0.42 + i * 0.137) % 1;
        bez.v0.set(tmpA.x, ROOF[v.kind] * 0.9 + 0.3, tmpA.z);
        bez.v1.set(tmpA.x * 0.6 + HUB[0] * 0.4, HUB[1] * 0.75, tmpA.z * 0.6 + HUB[2] * 0.4);
        bez.v2.set(...HUB);
        bez.getPoint(q * q * (3 - 2 * q), pk.position);
        pk.scale.setScalar(1 - q * 0.6);
      }
      const tag = tagEls.current[i];
      if (tag) tag.style.opacity = tagsOn ? String(smoothstep(0.6, 0.85, f)) : "0";
    });

    const h = hub.current;
    const hv = smoothstep(0.1, 0.45, f);
    if (h) {
      h.rotation.y = t * 0.35;
      h.scale.setScalar(0.6 + 0.4 * hv);
    }
    m.hubCore.opacity = 0.9 * hv;
    m.hubRing.opacity = 0.7 * hv;
    m.hubGlow.opacity = 0.12 * hv * (0.8 + 0.2 * Math.sin(t * 2.2));
    if (hubTag.current) hubTag.current.style.opacity = String(hv);
    if (zoneTag.current) zoneTag.current.style.opacity = tagsOn ? String(draw) : "0";
  });

  return (
    <group ref={root} visible={false}>
      {/* Roads (flattened tubes) with a glowing centre line */}
      {res.roadGeo.map((geo, i) => (
        <group key={i}>
          <mesh geometry={geo} material={res.mats.road} position-y={0.02} receiveShadow />
          <mesh geometry={res.laneGeo[i]} material={res.mats.lane} position-y={0.03} />
        </group>
      ))}

      {/* Depot geofence */}
      <group position={[DEPOT[0], 0.04, DEPOT[1]]} rotation-x={-Math.PI / 2}>
        <mesh geometry={res.disc} material={res.mats.zone} />
        <mesh geometry={res.zoneRing} material={res.mats.zoneEdge} />
      </group>
      <Html position={[DEPOT[0], 0.5, DEPOT[1] + 4.8]} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
        <div ref={zoneTag} className={styles.zoneTag} style={{ opacity: 0 }}>
          Geofence · Whitefield depot
        </div>
      </Html>

      {/* Fleet */}
      {FLEET.map((v, i) => {
        const sk = res.skeletons[v.kind];
        const roof = ROOF[v.kind];
        return (
          <group key={i}>
            <group ref={(el) => void (units.current[i] = el)} scale={0.9}>
              <mesh geometry={sk.fill} material={res.mats.skFill} />
              <lineSegments geometry={sk.lines} material={res.mats.skLine} />
              {/* headlights */}
              {[1, -1].map((side) => (
                <mesh key={side} geometry={res.box} material={res.mats.head} position={[sk.front + 0.02, 0.7, side * (sk.half - 0.3)]} scale={[0.05, 0.12, 0.3]} />
              ))}
              {/* status beacon */}
              <mesh geometry={res.box} material={res.mats.beacon[v.status]} position={[0, roof + 0.1, 0]} scale={[0.42, 0.14, 0.42]} />
              {v.tag && (
                <Html position={[0, roof + 1.4, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
                  <div ref={(el) => void (tagEls.current[i] = el)} className={styles.fleetTag} data-status={v.status} style={{ opacity: 0 }}>
                    <i aria-hidden="true" /> {v.tag}
                  </div>
                </Html>
              )}
            </group>
            <mesh ref={(el) => void (pings.current[i] = el)} geometry={res.ring} material={res.mats.ping[i]} rotation-x={-Math.PI / 2} />
            <mesh ref={(el) => void (packets.current[i] = el)} geometry={res.packet} material={res.mats.packet} />
          </group>
        );
      })}

      {/* LAS cloud hub */}
      <group position={HUB}>
        <group ref={hub}>
          <mesh geometry={res.hubGeo.core} material={res.mats.hubCore} />
          <mesh geometry={res.hubGeo.ring} material={res.mats.hubRing} rotation-x={Math.PI / 2} />
          <mesh geometry={res.hubGeo.ring} material={res.mats.hubRing} rotation-x={Math.PI / 2.6} rotation-y={0.6} />
        </group>
        <mesh geometry={res.hubGeo.glow} material={res.mats.hubGlow} />
        <Html position={[0, 2.8, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
          <div ref={hubTag} className={styles.hubTag} style={{ opacity: 0 }}>
            LAS Mobility cloud · live data from 24 vehicles
          </div>
        </Html>
      </group>
    </group>
  );
}
