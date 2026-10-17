"use client";

import { Lightbulb, Minus, Moon, Plus, RotateCcw, Sun, TriangleAlert } from "lucide-react";
import { PAINTS, useExperienceStore } from "@/stores/experienceStore";
import styles from "./ScrollStory.module.scss";

/** Paint, lighting, lamps and zoom for the hero vehicle. */
export default function HeroControls({ showZoom = true }: { showZoom?: boolean }) {
  const { paintId, lighting, headlights, hazards, zoom, setPaint, setLighting, toggleHeadlights, toggleHazards, nudgeZoom, setFocusHotspot } =
    useExperienceStore();

  return (
    <div className={styles.controls} role="group" aria-label="Vehicle configurator">
      <div className={styles.swatches} role="radiogroup" aria-label="Paint">
        {PAINTS.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={paintId === p.id}
            aria-label={p.label}
            title={p.label}
            className={`${styles.swatch} ${paintId === p.id ? styles.swatchActive : ""}`}
            style={{ background: p.color }}
            onClick={() => setPaint(p.id)}
          />
        ))}
      </div>
      <span className={styles.divider} aria-hidden="true" />
      <button
        type="button"
        className={styles.iconBtn}
        aria-label={lighting === "day" ? "Switch to night lighting" : "Switch to day lighting"}
        title={lighting === "day" ? "Night" : "Day"}
        onClick={() => setLighting(lighting === "day" ? "night" : "day")}
      >
        {lighting === "day" ? <Moon size={16} /> : <Sun size={16} />}
      </button>
      <button type="button" className={styles.iconBtn} aria-pressed={headlights} aria-label="Headlights" title="Headlights" onClick={toggleHeadlights}>
        <Lightbulb size={16} />
      </button>
      <button type="button" className={styles.iconBtn} aria-pressed={hazards} aria-label="Hazard indicators" title="Indicators" onClick={toggleHazards}>
        <TriangleAlert size={16} />
      </button>
      {showZoom && (
        <>
          <span className={styles.divider} aria-hidden="true" />
          <button type="button" className={styles.iconBtn} aria-label="Zoom in" title="Zoom in" disabled={zoom <= 0.78} onClick={() => nudgeZoom(-0.1)}>
            <Plus size={16} />
          </button>
          <button type="button" className={styles.iconBtn} aria-label="Zoom out" title="Zoom out" disabled={zoom >= 1.25} onClick={() => nudgeZoom(0.1)}>
            <Minus size={16} />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Reset view"
            title="Reset view"
            onClick={() => {
              setFocusHotspot(null);
              nudgeZoom(1 - zoom);
            }}
          >
            <RotateCcw size={16} />
          </button>
        </>
      )}
    </div>
  );
}
