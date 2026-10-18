"use client";

import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import ThreeErrorBoundary from "./ThreeErrorBoundary";
import WebGLFallback from "./WebGLFallback";
import { DPR_BY_TIER, useDeviceQuality } from "@/hooks/useDeviceQuality";
import { useExperienceStore, type QualityTier } from "@/stores/experienceStore";

const LOWER: Record<QualityTier, QualityTier> = { high: "medium", medium: "low", low: "low" };

/** Exposes R3F's invalidate() to code outside the Canvas (scroll handlers). */
export const sceneInvalidators = new Set<() => void>();
export const invalidateScenes = () => sceneInvalidators.forEach((fn) => fn());

function InvalidateBridge({ visible }: { visible: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    sceneInvalidators.add(invalidate);
    return () => {
      sceneInvalidators.delete(invalidate);
    };
  }, [invalidate]);
  // Coming back on screen (or to the tab) after a resize leaves a cleared
  // drawing buffer; a demand canvas must be asked for a fresh frame.
  useEffect(() => {
    if (visible) invalidate();
  }, [visible, invalidate]);
  return null;
}

/**
 * Mounted inside Suspense, so it runs once lazy content (environment map,
 * screen textures) has resolved. Without it a demand canvas whose last
 * requested frame came before the content arrived stays blank.
 */
function ReadyKick() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    let n = 0;
    let id = 0;
    const tick = () => {
      invalidate();
      if (++n < 30) id = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(id);
  }, [invalidate]);
  return null;
}

interface SceneCanvasProps {
  children: ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov: number };
  /** Keep rendering every frame while visible (animated scenes). Otherwise on demand. */
  continuous?: boolean;
  label: string;
  /** Force a tier (e.g. smaller secondary scenes). */
  maxTier?: QualityTier;
  onTier?: (tier: QualityTier) => void;
}

/**
 * Canvas wrapper shared by every 3D surface:
 * - demand rendering by default, paused entirely while offscreen
 * - device-aware DPR, stepped down by PerformanceMonitor when frames drop
 * - WebGL-unavailable and runtime-error fallbacks
 */
export default function SceneCanvas({ children, className, camera, continuous = false, label, maxTier, onTier }: SceneCanvasProps) {
  const caps = useDeviceQuality();
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [tier, setTier] = useState<QualityTier>("medium");
  const setQuality = useExperienceStore((s) => s.setQuality);

  useEffect(() => {
    if (caps.webgl === null) return;
    const order: QualityTier[] = ["low", "medium", "high"];
    const t = maxTier && order.indexOf(maxTier) < order.indexOf(caps.tier) ? maxTier : caps.tier;
    setTier(t);
  }, [caps.webgl, caps.tier, maxTier]);

  useEffect(() => {
    onTier?.(tier);
    if (!maxTier) setQuality(tier);
  }, [tier, onTier, maxTier, setQuality]);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    const onVis = () => setVisible(document.visibilityState === "visible" && el.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  if (caps.webgl === false) {
    return (
      <div ref={wrapper} className={className} style={{ position: "relative" }}>
        <WebGLFallback />
      </div>
    );
  }

  return (
    <div ref={wrapper} className={className} style={{ position: "relative" }} aria-label={label} role="img">
      {caps.webgl && (
        <ThreeErrorBoundary fallback={<WebGLFallback message="The 3D scene could not start on this device." />}>
          <Canvas
            frameloop={!visible ? "never" : continuous ? "always" : "demand"}
            dpr={DPR_BY_TIER[tier]}
            camera={camera ?? { position: [6, 1.6, 6], fov: 32 }}
            gl={{
              antialias: tier !== "high",
              powerPreference: tier === "low" ? "low-power" : "high-performance",
              alpha: false,
              stencil: false,
            }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1;
              gl.outputColorSpace = THREE.SRGBColorSpace;
            }}
          >
            {/* R3F disposes the renderer and forces context loss on unmount. */}
            <InvalidateBridge visible={visible} />
            <PerformanceMonitor onDecline={() => setTier((t) => LOWER[t])} flipflops={2} />
            <AdaptiveDpr pixelated={false} />
            <Suspense fallback={null}>
              {children}
              <ReadyKick />
            </Suspense>
          </Canvas>
        </ThreeErrorBoundary>
      )}
    </div>
  );
}
