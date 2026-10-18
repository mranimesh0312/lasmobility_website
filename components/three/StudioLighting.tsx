"use client";

import { Environment, Lightformer } from "@react-three/drei";
import type { LightingMode } from "@/stores/experienceStore";
import { PALETTE } from "@/lib/palette";

/**
 * Car-configurator lighting built from Lightformers rendered once into an
 * environment map: an overhead softbox, two long side strips and a teal ring
 * give the paint its reflections without downloading an HDRI. Keyed by mode
 * so switching day/night re-bakes the map (frames=1 renders it only once).
 */
export default function StudioLighting({ mode, resolution = 256 }: { mode: LightingMode; resolution?: number }) {
  const day = mode === "day";
  return (
    <>
      <ambientLight intensity={day ? 0.35 : 0.08} />
      <directionalLight position={[4, 8, 5]} intensity={day ? 1.6 : 0.2} />
      <Environment key={mode} resolution={resolution} frames={1}>
        <color attach="background" args={[day ? PALETTE.studioEnv : PALETTE.studioEnvNight]} />
        <Lightformer form="rect" intensity={day ? 5 : 0.6} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 5, 1]} />
        <Lightformer form="rect" intensity={day ? 5 : 0.5} position={[-7, 1.6, 0]} rotation-y={Math.PI / 2} scale={[14, 0.8, 1]} />
        <Lightformer form="rect" intensity={day ? 5 : 0.5} position={[7, 1.6, 0]} rotation-y={-Math.PI / 2} scale={[14, 0.8, 1]} />
        <Lightformer form="rect" color={PALETTE.accent} intensity={day ? 2.2 : 2.6} position={[0, 0.6, 8]} rotation-y={Math.PI} scale={[16, 0.35, 1]} />
        <Lightformer form="rect" intensity={day ? 1.8 : 0.3} position={[0, 2, -9]} scale={[14, 2, 1]} />
        <Lightformer form="rect" intensity={day ? 1.6 : 0.2} position={[0, 1.4, 9]} rotation-y={Math.PI} scale={[10, 1.2, 1]} />
        <Lightformer form="ring" color={PALETTE.accent} intensity={day ? 0.8 : 1.6} position={[5, 3.5, 6]} scale={2.2} onUpdate={(self) => self.lookAt(0, 0, 0)} />
      </Environment>
    </>
  );
}
