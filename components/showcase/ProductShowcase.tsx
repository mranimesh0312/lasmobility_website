"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import DeviceMockup from "./DeviceMockup";
import ScreenshotViewer from "./ScreenshotViewer";
import MotionReveal from "@/components/animations/MotionReveal";
import { FEATURES, hasScreenshot } from "@/data/featureManifest";
import { FEATURE_COPY } from "@/data/featureCopy";
import styles from "./Showcase.module.scss";

/** Showcase order: the modules people ask about first. Mobile has its own surface. */
const ORDER = [
  "dashboard", "live-tracking", "trips", "vehicle-details", "immobilization", "geofencing", "fuel",
  "temperature", "driver-identification", "maintenance", "expenses", "reports", "alerts", "documents",
  "rental-hub", "subscriptions", "franchise",
];

/**
 * "Inside the platform": pick a module, see the real app screen in a device
 * frame with a floating panel describing what it does.
 */
export default function ProductShowcase() {
  const features = ORDER.map((id) => FEATURES.find((f) => f.id === id)).filter((f): f is (typeof FEATURES)[number] => Boolean(f));
  const [activeId, setActiveId] = useState(features.find(hasScreenshot)?.id ?? features[0].id);
  const active = features.find((f) => f.id === activeId) ?? features[0];
  const copy = FEATURE_COPY[active.id];
  const captured = features.filter(hasScreenshot).length;

  return (
    <section id="platform" className={styles.section} aria-labelledby="platform-title">
      <div className={styles.container}>
        <MotionReveal className={styles.header}>
          <p className={styles.eyebrow}>Inside the platform</p>
          <h2 id="platform-title" className={styles.title}>
            The real LAS Mobility app, module by module.
          </h2>
          <p className={styles.lede}>
            Select a module to see the actual screen. {captured < features.length && `${captured} of ${features.length} screens captured so far; the rest are marked as pending.`}
          </p>
        </MotionReveal>

        <div className={styles.showcase}>
          <div className={styles.tabs} role="tablist" aria-label="Platform modules" aria-orientation="vertical">
            {features.map((f) => (
              <button
                key={f.id}
                id={`tab-${f.id}`}
                type="button"
                role="tab"
                aria-selected={f.id === active.id}
                aria-controls="platform-panel"
                tabIndex={f.id === active.id ? 0 : -1}
                className={`${styles.tab} ${f.id === active.id ? styles.tabActive : ""}`}
                onClick={() => setActiveId(f.id)}
                onKeyDown={(e) => {
                  const i = features.findIndex((x) => x.id === f.id);
                  const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? i + 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? i - 1 : null;
                  if (next === null) return;
                  e.preventDefault();
                  const target = features[(next + features.length) % features.length];
                  setActiveId(target.id);
                  document.getElementById(`tab-${target.id}`)?.focus();
                }}
              >
                <span>{f.title}</span>
                {!hasScreenshot(f) && <span className={styles.tabPending}>pending</span>}
              </button>
            ))}
          </div>

          <div id="platform-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} className={styles.stagePanel}>
            <DeviceMockup>
              <ScreenshotViewer feature={active} />
            </DeviceMockup>
            {copy && (
              <aside className={styles.floating}>
                <h3>{active.title}</h3>
                <p>{copy.summary}</p>
                <ul>
                  {copy.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Link href={active.sitePath} className={styles.floatingLink}>
                  Learn more <ArrowUpRight size={14} />
                </Link>
              </aside>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
