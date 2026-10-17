"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { COMPONENTS } from "@/data/vehicleHotspots";
import type { ComponentId } from "@/components/three/vehicleSpecs";
import { paintById } from "@/stores/experienceStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./Demos.module.scss";

const VehicleStage = dynamic(() => import("@/components/three/VehicleStage"), { ssr: false, loading: () => <div className={styles.stagePlaceholder} /> });

const ORDER: ComponentId[] = ["gps", "telematics", "battery", "fuel", "immobilizer", "driverId", "temperature", "tpms", "doors"];

/** Digital twin: click a component on the x-ray vehicle (or in the list) to inspect it. */
export default function TwinDemo() {
  const [active, setActive] = useState<ComponentId>("gps");
  const coarse = useMediaQuery("(pointer: coarse)") ?? false;
  const info = COMPONENTS[active];

  return (
    <div className={styles.split}>
      <VehicleStage
        className={styles.twinStage}
        paint={paintById("graphite")}
        twin={1}
        highlight={active}
        onComponentSelect={setActive}
        label="Digital twin of a vehicle with selectable telematics components"
        cameraPosition={[5.4, 3.2, 6]}
        coarsePointer={coarse}
      />
      <div className={styles.card}>
        <div className={styles.chips} role="radiogroup" aria-label="Vehicle components">
          {ORDER.map((id) => (
            <button key={id} type="button" role="radio" aria-checked={id === active} className={`${styles.chip} ${id === active ? styles.chipActive : ""}`} onClick={() => setActive(id)}>
              {COMPONENTS[id].label}
            </button>
          ))}
        </div>
        <h4 className={styles.cardTitle}>{info.label}</h4>
        <p className={styles.bodyText}>{info.summary}</p>
        <dl className={styles.metrics}>
          {info.readings.map((r) => (
            <div key={r.label}>
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.hintText}>Sample values{info.deviceDependent ? " · availability depends on the installed device and vehicle" : ""}.</p>
      </div>
    </div>
  );
}
