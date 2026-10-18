"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { StoryRuntime } from "./storyRuntime";
import { PALETTE } from "@/lib/palette";

const SATELLITES: [number, number, number][] = [
  [-9, 15, -7],
  [6, 17, -10],
  [13, 14, 5],
];

/**
 * GPS chapter: a planned route ribbon drawn ahead of the car, satellite
 * links and a position-fix pulse above the roof. Driven by mix.gps.
 */
export default function GpsLayer({ rt, roofY }: { rt: MutableRefObject<StoryRuntime>; roofY: number }) {
  const group = useRef<THREE.Group>(null);
  const route = useRef<THREE.Mesh>(null);
  const rings = useRef<(THREE.Mesh | null)[]>([]);

  const { routeGeo, indexCount, linkGeo, satGeo, ringGeo, mats } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-26, 0.03, 0),
      new THREE.Vector3(-8, 0.03, 0),
      new THREE.Vector3(10, 0.03, 0),
      new THREE.Vector3(26, 0.03, -2.5),
      new THREE.Vector3(40, 0.03, -12),
      new THREE.Vector3(52, 0.03, -28),
    ]);
    const routeGeo = new THREE.TubeGeometry(curve, 240, 0.09, 6, false);
    const pts: number[] = [];
    for (const s of SATELLITES) pts.push(s[0], s[1], s[2], 0, roofY + 0.2, 0);
    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return {
      routeGeo,
      indexCount: routeGeo.index!.count,
      linkGeo,
      satGeo: new THREE.BoxGeometry(0.9, 0.35, 0.35),
      ringGeo: new THREE.RingGeometry(0.55, 0.62, 48),
      mats: {
        route: new THREE.MeshStandardMaterial({ color: PALETTE.accent, emissive: PALETTE.accent, emissiveIntensity: 1.6, transparent: true }),
        link: new THREE.LineDashedMaterial({ color: PALETTE.accentText, dashSize: 0.5, gapSize: 0.35, transparent: true }),
        sat: new THREE.MeshStandardMaterial({ color: "#C7CDD4", metalness: 0.8, roughness: 0.3, emissive: PALETTE.accent, emissiveIntensity: 0.4, transparent: true }),
        rings: [0, 1, 2].map(
          () => new THREE.MeshBasicMaterial({ color: PALETTE.accentText, transparent: true, side: THREE.DoubleSide, depthWrite: false })
        ),
      },
    };
  }, [roofY]);

  useEffect(() => {
    return () => {
      [routeGeo, linkGeo, satGeo, ringGeo].forEach((g) => g.dispose());
      [mats.route, mats.link, mats.sat, ...mats.rings].forEach((m) => m.dispose());
    };
  }, [routeGeo, linkGeo, satGeo, ringGeo, mats]);

  const linkLine = useMemo(() => {
    const l = new THREE.LineSegments(linkGeo, mats.link);
    l.computeLineDistances();
    return l;
  }, [linkGeo, mats.link]);

  useFrame((frame) => {
    const r = rt.current;
    const g = group.current;
    if (!g) return;
    const k = r.mix.gps;
    g.visible = k > 0.005;
    if (!g.visible) return;
    r.busy = true;
    mats.route.opacity = k;
    mats.link.opacity = 0.7 * k;
    mats.sat.opacity = k;
    // Draw the route progressively as the chapter fades in.
    routeGeo.setDrawRange(0, Math.floor((indexCount * Math.min(1, k * 1.2)) / 3) * 3);
    const t = frame.clock.elapsedTime;
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      const phase = (t * 0.6 + i / 3) % 1;
      ring.scale.setScalar(0.6 + phase * 3.2);
      mats.rings[i].opacity = (1 - phase) * 0.8 * k;
    });
  });

  return (
    <group ref={group} visible={false}>
      <mesh ref={route} geometry={routeGeo} material={mats.route} />
      <primitive object={linkLine} />
      {SATELLITES.map((p, i) => (
        <group key={i} position={p} rotation={[0.3, i, 0.2]}>
          <mesh geometry={satGeo} material={mats.sat} />
          <mesh material={mats.sat} position={[0, 0, 0]} scale={[3.2, 0.04, 0.9]}>
            <boxGeometry />
          </mesh>
        </group>
      ))}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(m) => {
            rings.current[i] = m;
          }}
          geometry={ringGeo}
          material={mats.rings[i]}
          position={[0, roofY + 0.25, 0]}
          rotation-x={-Math.PI / 2}
        />
      ))}
    </group>
  );
}
