"use client";

import { Bloom, EffectComposer, SMAA, ToneMapping, Vignette } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import type { QualityTier } from "@/stores/experienceStore";

/**
 * Restrained post: bloom only catches emissive lamps (high threshold), a soft
 * vignette, SMAA. Off below the high tier, where the renderer's own MSAA and
 * tone mapping are used instead.
 */
export default function Effects({ tier }: { tier: QualityTier }) {
  if (tier !== "high") return null;
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom mipmapBlur luminanceThreshold={1.05} luminanceSmoothing={0.2} intensity={0.55} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Vignette offset={0.28} darkness={0.55} />
      <SMAA />
    </EffectComposer>
  );
}
