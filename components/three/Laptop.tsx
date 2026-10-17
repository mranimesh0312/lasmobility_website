"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { StoryRuntime } from "./storyRuntime";
import { useScreenTextures } from "./useScreenTextures";
import type { FeatureEntry, ThemeName } from "@/data/featureManifest";

const W = 1.7;
const D = 1.12;
const SCREEN_W = 1.58;
const SCREEN_H = 0.99;
const LID_H = 1.08;

interface Props {
  rt: MutableRefObject<StoryRuntime>;
  features: FeatureEntry[];
  theme: ThemeName;
  position: [number, number, number];
  /** Camera azimuth the screen should face. */
  faceAz: number;
}

/**
 * Laptop that rises out of the stage, opens, and cycles real product
 * screenshots (cross-faded) as the product chapter scrolls.
 */
export default function Laptop({ rt, features, theme, position, faceAz }: Props) {
  const root = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const textures = useScreenTextures(features, theme, SCREEN_W / SCREEN_H);

  const mats = useMemo(
    () => ({
      shell: new THREE.MeshStandardMaterial({ color: "#A7ADB4", metalness: 0.92, roughness: 0.32, transparent: true }),
      deck: new THREE.MeshStandardMaterial({ color: "#1A1D21", metalness: 0.2, roughness: 0.6, transparent: true }),
      bezel: new THREE.MeshPhysicalMaterial({ color: "#050607", roughness: 0.08, clearcoat: 1, transparent: true }),
      a: new THREE.MeshBasicMaterial({ toneMapped: false, transparent: true }),
      b: new THREE.MeshBasicMaterial({ toneMapped: false, transparent: true }),
    }),
    []
  );
  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);

  useFrame(() => {
    const r = rt.current;
    const k = r.mix.laptop;
    const g = root.current;
    if (!g || !lid.current) return;
    g.visible = k > 0.005;
    if (!g.visible) return;
    g.position.y = position[1] - (1 - k) * 0.7;
    for (const m of [mats.shell, mats.deck, mats.bezel]) m.opacity = k;
    // closed (+90deg, folded forward onto the deck) -> open (~18deg past vertical)
    lid.current.rotation.x = Math.PI / 2 - Math.min(1, k * 1.15) * (Math.PI / 2 + 0.32);

    const n = textures.length;
    if (n) {
      const pos = r.mix.screens * n;
      const i = Math.min(n - 1, Math.floor(pos));
      const frac = pos - i;
      const fade = i < n - 1 ? THREE.MathUtils.smoothstep(frac, 0.86, 1) : 0;
      if (mats.a.map !== textures[i]) {
        mats.a.map = textures[i];
        mats.a.needsUpdate = true;
      }
      const next = textures[Math.min(n - 1, i + 1)];
      if (mats.b.map !== next) {
        mats.b.map = next;
        mats.b.needsUpdate = true;
      }
      mats.a.opacity = k * (1 - fade);
      mats.b.opacity = k * fade;
    }
    r.busy = r.busy || (k > 0 && k < 1);
  });

  return (
    <group ref={root} position={position} rotation={[0, Math.PI / 2 - faceAz, 0]} visible={false}>
      <RoundedBox args={[W, 0.05, D]} radius={0.022} smoothness={4} material={mats.shell} position={[0, 0.025, 0]} />
      <mesh material={mats.deck} position={[0, 0.0505, -0.12]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[W * 0.86, D * 0.46]} />
      </mesh>
      <mesh material={mats.deck} position={[0, 0.0505, 0.3]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[W * 0.32, D * 0.24]} />
      </mesh>
      {/* hinge at the back edge */}
      <group ref={lid} position={[0, 0.05, -D / 2 + 0.01]}>
        <RoundedBox args={[W, LID_H, 0.032]} radius={0.02} smoothness={4} material={mats.shell} position={[0, LID_H / 2, -0.016]} />
        <mesh material={mats.bezel} position={[0, LID_H / 2, 0.0015]}>
          <planeGeometry args={[W - 0.03, LID_H - 0.03]} />
        </mesh>
        <mesh material={mats.a} position={[0, LID_H / 2 + 0.01, 0.003]}>
          <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        </mesh>
        <mesh material={mats.b} position={[0, LID_H / 2 + 0.01, 0.004]}>
          <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        </mesh>
      </group>
    </group>
  );
}
