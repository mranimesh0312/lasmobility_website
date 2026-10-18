"use client";

import { useEffect, useRef, useState } from "react";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Hand } from "lucide-react";
import SceneCanvas from "./SceneCanvas";
import StudioLighting from "./StudioLighting";
import VehicleModel, { defaultAnimState } from "./VehicleModel";
import type { ComponentId, VehicleVariant } from "./vehicleSpecs";
import type { LightingMode, PaintOption, QualityTier } from "@/stores/experienceStore";
import { PALETTE } from "@/lib/palette";
import styles from "./VehicleStage.module.scss";

interface VehicleStageProps {
  variant?: VehicleVariant;
  paint: Pick<PaintOption, "color" | "metalness" | "roughness">;
  lighting?: LightingMode;
  twin?: number;
  highlight?: ComponentId | null;
  onComponentSelect?: (id: ComponentId) => void;
  headlights?: boolean;
  hazards?: boolean;
  className?: string;
  label: string;
  cameraPosition?: [number, number, number];
  /** On touch screens orbiting must be switched on, so the page still scrolls. */
  coarsePointer?: boolean;
}

function StageContent({ variant, paint, lighting, twin, highlight, onComponentSelect, headlights, hazards, interactive, tier }: Required<
  Pick<VehicleStageProps, "variant" | "paint" | "lighting" | "twin" | "headlights" | "hazards">
> &
  Pick<VehicleStageProps, "highlight" | "onComponentSelect"> & { interactive: boolean; tier: QualityTier }) {
  const anim = useRef(defaultAnimState());
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    anim.current.twin = twin;
    anim.current.headlights = headlights ? (lighting === "night" ? 1 : 0.5) : 0;
    anim.current.hazards = hazards;
    invalidate();
  }, [twin, headlights, hazards, lighting, invalidate]);

  return (
    <>
      <color attach="background" args={[lighting === "night" ? PALETTE.studioNight : PALETTE.studio]} />
      <StudioLighting mode={lighting} resolution={128} />
      <VehicleModel variant={variant} paint={paint} anim={anim} highlight={highlight} onComponentSelect={onComponentSelect} lowDetail={tier === "low"} />
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[14, 48]} />
        <meshStandardMaterial color={PALETTE.studioFloor} roughness={0.85} metalness={0.2} />
      </mesh>
      <ContactShadows position={[0, 0.004, 0]} scale={9} blur={2.4} far={2} opacity={0.75} resolution={256} frames={1} />
      <CameraAim />
      {/* Mounted only when active: OrbitControls sets touch-action:none on the
          canvas even when disabled, which would stop the page scrolling on touch. */}
      {interactive && <OrbitControls
        enablePan={false}
        // wheel zoom would swallow page scrolling over embedded stages
        enableZoom={false}
        minDistance={4.5}
        maxDistance={11}
        minPolarAngle={0.35}
        maxPolarAngle={1.48}
        target={[0, 0.75, 0]}
        enableDamping
        dampingFactor={0.08}
      />}
    </>
  );
}

function CameraAim() {
  const camera = useThree((s) => s.camera);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    camera.lookAt(0, 0.75, 0);
    invalidate();
  }, [camera, invalidate]);
  return null;
}

export default function VehicleStage({
  variant = "suv",
  paint,
  lighting = "day",
  twin = 0,
  highlight = null,
  onComponentSelect,
  headlights = true,
  hazards = false,
  className,
  label,
  cameraPosition = [6.2, 2.1, 6.4],
  coarsePointer = false,
}: VehicleStageProps) {
  const [tier, setTier] = useState<QualityTier>("medium");
  const [touchActive, setTouchActive] = useState(false);
  const interactive = !coarsePointer || touchActive;

  return (
    <div className={`${styles.stage} ${className ?? ""}`}>
      <SceneCanvas className={styles.canvas} label={label} camera={{ position: cameraPosition, fov: 32 }} maxTier="medium" onTier={setTier} continuous={hazards}>
        <StageContent
          variant={variant}
          paint={paint}
          lighting={lighting}
          twin={twin}
          highlight={highlight}
          onComponentSelect={onComponentSelect}
          headlights={headlights}
          hazards={hazards}
          interactive={interactive}
          tier={tier}
        />
      </SceneCanvas>
      {coarsePointer && (
        <button type="button" className={styles.touchToggle} aria-pressed={touchActive} onClick={() => setTouchActive((v) => !v)}>
          <Hand size={14} /> {touchActive ? "Done rotating" : "Tap to rotate"}
        </button>
      )}
    </div>
  );
}
