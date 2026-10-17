"use client";

import { useEffect, useState } from "react";
import type { QualityTier } from "@/stores/experienceStore";

export interface DeviceCapabilities {
  /** null until probed on the client. */
  webgl: boolean | null;
  tier: QualityTier;
  coarsePointer: boolean;
  renderer: string;
}

const SOFTWARE_RENDERERS = /swiftshader|llvmpipe|software|basic render/i;

function probe(): DeviceCapabilities {
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  let renderer = "";
  let webgl = false;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (gl) {
      webgl = true;
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      renderer = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    webgl = false;
  }

  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const narrow = window.innerWidth < 768;

  let tier: QualityTier = "high";
  if (!webgl || SOFTWARE_RENDERERS.test(renderer) || cores <= 2 || memory <= 2) tier = "low";
  else if (coarsePointer || narrow || cores <= 4 || memory <= 4) tier = "medium";

  // Manual override for QA and support: ?quality=low|medium|high
  const forced = new URLSearchParams(window.location.search).get("quality");
  if (webgl && (forced === "low" || forced === "medium" || forced === "high")) tier = forced;

  return { webgl, tier, coarsePointer, renderer };
}

/**
 * GPU-aware quality tier. `high` gets postprocessing, reflections and DPR up
 * to 2; `medium` bloom-free with DPR 1.5; `low` (software GL, weak devices)
 * renders a minimal scene at DPR 1. PerformanceMonitor can lower it further.
 */
export function useDeviceQuality(): DeviceCapabilities {
  const [caps, setCaps] = useState<DeviceCapabilities>({
    webgl: null,
    tier: "medium",
    coarsePointer: false,
    renderer: "",
  });

  useEffect(() => {
    setCaps(probe());
  }, []);

  return caps;
}

export const DPR_BY_TIER: Record<QualityTier, [number, number]> = {
  low: [1, 1],
  medium: [1, 1.5],
  high: [1, 2],
};
