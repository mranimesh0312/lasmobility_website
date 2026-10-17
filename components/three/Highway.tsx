"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { StoryRuntime } from "./storyRuntime";

const DASH_GAP = 12;
const DASHES = 36;
const POST_GAP = 34;
const POSTS = 14;
const SPAN = DASHES * DASH_GAP;
/** Road speed, m/s. Wheel speed is derived from it so they agree. */
export const ROAD_SPEED = 24;

/**
 * Dusk highway the car "drives" on: asphalt, scrolling lane dashes, edge
 * lines, guardrails, lamp posts and a low skyline. The car stays still and
 * the world moves, which keeps the camera maths simple.
 */
export default function Highway({ rt, lowDetail }: { rt: MutableRefObject<StoryRuntime>; lowDetail: boolean }) {
  const group = useRef<THREE.Group>(null);
  const dashes = useRef<THREE.InstancedMesh>(null);
  const posts = useRef<THREE.InstancedMesh>(null);
  const heads = useRef<THREE.InstancedMesh>(null);
  const offset = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const mats = useMemo(
    () => ({
      asphalt: new THREE.MeshStandardMaterial({ color: "#15181C", roughness: 0.92, metalness: 0, transparent: true }),
      shoulder: new THREE.MeshStandardMaterial({ color: "#0D0F12", roughness: 1, transparent: true }),
      paint: new THREE.MeshStandardMaterial({ color: "#D8DCE0", roughness: 0.6, emissive: "#3A3F44", transparent: true }),
      rail: new THREE.MeshStandardMaterial({ color: "#8A9098", metalness: 0.9, roughness: 0.4, transparent: true }),
      post: new THREE.MeshStandardMaterial({ color: "#4B5057", metalness: 0.7, roughness: 0.5, transparent: true }),
      lamp: new THREE.MeshStandardMaterial({ color: "#FFE2B0", emissive: "#FFC870", emissiveIntensity: 3, transparent: true }),
      skyline: new THREE.MeshStandardMaterial({ color: "#0B1220", emissive: "#10233A", emissiveIntensity: 0.6, roughness: 1, transparent: true }),
    }),
    []
  );

  const skyline = useMemo(() => {
    const rnd = (i: number) => (Math.sin(i * 12.9898) * 43758.5453) % 1;
    return Array.from({ length: lowDetail ? 18 : 40 }, (_, i) => {
      const h = 6 + Math.abs(rnd(i)) * 34;
      return { x: -180 + i * (360 / (lowDetail ? 18 : 40)), z: -90 - Math.abs(rnd(i + 7)) * 50, w: 8 + Math.abs(rnd(i + 3)) * 14, h };
    });
  }, [lowDetail]);

  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);

  useFrame((_, delta) => {
    const r = rt.current;
    const road = r.mix.road;
    const g = group.current;
    if (!g) return;
    g.visible = road > 0.005;
    if (!g.visible) return;
    for (const m of Object.values(mats)) m.opacity = road;
    r.busy = true;

    offset.current = (offset.current + ROAD_SPEED * Math.min(delta, 0.05) * road) % SPAN;
    const o = offset.current;
    if (dashes.current) {
      for (let i = 0; i < DASHES; i++) {
        const x = ((i * DASH_GAP - o) % SPAN + SPAN) % SPAN - SPAN / 2;
        dummy.position.set(x, 0.012, -1.9);
        dummy.updateMatrix();
        dashes.current.setMatrixAt(i, dummy.matrix);
      }
      dashes.current.instanceMatrix.needsUpdate = true;
    }
    // From the high GPS camera the posts would cut across the copy.
    const postsVisible = r.mix.gps < 0.15;
    if (posts.current) posts.current.visible = postsVisible;
    if (heads.current) heads.current.visible = postsVisible;
    if (posts.current && heads.current && postsVisible) {
      const pSpan = POSTS * POST_GAP;
      for (let i = 0; i < POSTS * 2; i++) {
        const k = i % POSTS;
        const side = i < POSTS ? 1 : -1;
        const x = ((k * POST_GAP + (side < 0 ? POST_GAP / 2 : 0) - o) % pSpan + pSpan) % pSpan - pSpan / 2;
        dummy.position.set(x, 4, side * 8.6);
        dummy.updateMatrix();
        posts.current.setMatrixAt(i, dummy.matrix);
        dummy.position.set(x, 8.05, side * 7.6);
        dummy.updateMatrix();
        heads.current.setMatrixAt(i, dummy.matrix);
      }
      posts.current.instanceMatrix.needsUpdate = true;
      heads.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group} visible={false}>
      <mesh material={mats.asphalt} rotation-x={-Math.PI / 2} position={[0, 0.002, 0]} receiveShadow>
        <planeGeometry args={[SPAN, 15]} />
      </mesh>
      <mesh material={mats.shoulder} rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <planeGeometry args={[SPAN, 260]} />
      </mesh>
      {[7.2, -7.2].map((z) => (
        <mesh key={z} material={mats.paint} rotation-x={-Math.PI / 2} position={[0, 0.011, z]}>
          <planeGeometry args={[SPAN, 0.16]} />
        </mesh>
      ))}
      <instancedMesh ref={dashes} args={[undefined, undefined, DASHES]} material={mats.paint} rotation-x={0}>
        <boxGeometry args={[4, 0.004, 0.14]} />
      </instancedMesh>
      {[8.1, -8.1].map((z) => (
        <mesh key={`rail-${z}`} material={mats.rail} position={[0, 0.62, z]}>
          <boxGeometry args={[SPAN, 0.28, 0.06]} />
        </mesh>
      ))}
      <instancedMesh ref={posts} args={[undefined, undefined, POSTS * 2]} material={mats.post}>
        <cylinderGeometry args={[0.07, 0.1, 8, 8]} />
      </instancedMesh>
      <instancedMesh ref={heads} args={[undefined, undefined, POSTS * 2]} material={mats.lamp}>
        <boxGeometry args={[0.7, 0.12, 0.3]} />
      </instancedMesh>
      {skyline.map((b, i) => (
        <mesh key={i} material={mats.skyline} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, 8]} />
        </mesh>
      ))}
    </group>
  );
}
