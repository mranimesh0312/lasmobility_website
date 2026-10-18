"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, CalendarCheck, ChevronsRight, X } from "lucide-react";
import HeroCopy from "./HeroCopy";
import ChapterDetail, { hasChapterDetail } from "./ChapterDetail";
import HeroControls from "./HeroControls";
import MotionReveal from "./MotionReveal";
import ScreenshotViewer from "@/components/showcase/ScreenshotViewer";
import DeviceMockup from "@/components/showcase/DeviceMockup";
import { CTA_COPY, STORY_CHAPTERS, STORY_SCREEN_IDS } from "@/data/storyChapters";
import { featureById, type FeatureEntry } from "@/data/featureManifest";
import { COMPONENTS, HERO_HOTSPOTS } from "@/data/vehicleHotspots";
import type { ComponentId } from "@/components/three/vehicleSpecs";
import { paintById, useExperienceStore } from "@/stores/experienceStore";
import { useBookDemo } from "@/context/BookDemoContext";
import styles from "./StoryStatic.module.scss";

const VehicleStage = dynamic(() => import("@/components/three/VehicleStage"), { ssr: false });

/** Illustrative demo readings for the swipeable telemetry rail. */
const TELEMETRY: { label: string; value: string; status?: "ok" | "warn" }[] = [
  { label: "Vehicle status", value: "Moving", status: "ok" },
  { label: "Speed", value: "62 km/h" },
  { label: "GPS accuracy", value: "2.4 m" },
  { label: "Ignition", value: "On", status: "ok" },
  { label: "Fuel level", value: "78 %" },
  { label: "Cargo temperature", value: "4.2 °C" },
  { label: "Driver score", value: "92 / 100" },
  { label: "ETA", value: "18 min" },
  { label: "Device health", value: "Online", status: "ok" },
];

/** Bottom sheet with one telematics component's details. */
function SensorSheet({ id, onClose }: { id: ComponentId; onClose: () => void }) {
  const info = COMPONENTS[id];
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);
  return (
    <>
      <div className={styles.sheetScrim} onClick={onClose} aria-hidden="true" />
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-labelledby="sensor-sheet-title">
        <span className={styles.sheetGrip} aria-hidden="true" />
        <button ref={close} type="button" className={styles.sheetClose} aria-label="Close" onClick={onClose}>
          <X size={18} />
        </button>
        <p className={styles.eyebrow}>Telematics component</p>
        <h3 id="sensor-sheet-title" className={styles.sheetTitle}>
          {info.label}
        </h3>
        <p className={styles.sheetBody}>{info.summary}</p>
        <dl className={styles.readings}>
          {info.readings.map((r) => (
            <div key={r.label}>
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.sample}>Illustrative demo values{info.deviceDependent ? " · depends on the installed device" : ""}</p>
      </div>
    </>
  );
}

/**
 * Story for phones, tablets and reduced-motion visitors: no pinning or
 * scroll-scrubbing. Headline and CTA first, then a touch-activated 3D
 * vehicle with sensor chips (bottom-sheet details), a swipeable telemetry
 * rail, chapters as cards on a route timeline, and a snapping carousel of
 * real product screens.
 */
export default function StoryStatic({ webgl }: { webgl: boolean }) {
  const paint = paintById(useExperienceStore((s) => s.paintId));
  const lighting = useExperienceStore((s) => s.lighting);
  const headlights = useExperienceStore((s) => s.headlights);
  const hazards = useExperienceStore((s) => s.hazards);
  const { open } = useBookDemo();
  const screens = STORY_SCREEN_IDS.map((id) => featureById(id)).filter(Boolean) as FeatureEntry[];
  const [sensor, setSensor] = useState<ComponentId | null>(null);
  const closeSensor = useCallback(() => setSensor(null), []);
  const [screen, setScreen] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  // Track which product screen is centred in the carousel.
  useEffect(() => {
    const el = carousel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setScreen(Number((e.target as HTMLElement).dataset.index))),
      { root: el, threshold: 0.6 }
    );
    Array.from(el.children).forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const showScreen = (i: number) => {
    const el = carousel.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (el && target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <section className={`${styles.static} theme-dark-scope`} aria-label="LAS Mobility platform story">
      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <HeroCopy />
        </div>
        {webgl && (
          <div className={styles.heroStageWrap}>
            <VehicleStage
              className={styles.heroStage}
              paint={paint}
              lighting={lighting}
              headlights={headlights}
              hazards={hazards}
              highlight={sensor}
              label="Interactive 3D vehicle"
              coarsePointer
            />
            <HeroControls showZoom={false} />
          </div>
        )}
        <div className={styles.sensors}>
          <p className={styles.railHead}>
            <span>Sensors in this vehicle</span>
          </p>
          <ul className={styles.chips}>
            {HERO_HOTSPOTS.map((h) => (
              <li key={h.id}>
                <button type="button" className={styles.chip} aria-haspopup="dialog" onClick={() => setSensor(h.id)}>
                  {COMPONENTS[h.id].label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.telemetry}>
        <p className={styles.railHead}>
          <span>Live telemetry · demo vehicle</span>
          <span className={styles.swipe} aria-hidden="true">
            Swipe to explore <ChevronsRight size={14} />
          </span>
        </p>
        <ul className={styles.teleRail} aria-label="Illustrative telemetry readings">
          {TELEMETRY.map((t) => (
            <li key={t.label} className={styles.teleCard}>
              <span className={styles.teleLabel}>{t.label}</span>
              <span className={styles.teleValue}>
                {t.status && <span className={styles.statusDot} data-status={t.status} aria-hidden="true" />}
                {t.value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ol className={styles.chapters}>
        {STORY_CHAPTERS.filter((c) => c.id !== "screens").map((c, i) => {
          const Icon = c.icon;
          return (
            <MotionReveal key={c.id} as="li" className={styles.chapter} y={16}>
              <span className={styles.node} aria-hidden="true">
                <Icon size={14} />
              </span>
              <p className={styles.eyebrow}>
                {String(i + 1).padStart(2, "0")} · {c.eyebrow}
              </p>
              <h2 className={styles.title}>{c.title}</h2>
              <p className={styles.body}>{c.body}</p>
              <ChapterDetail id={c.id} />
              {c.points && !hasChapterDetail(c.id) && (
                <ul className={styles.points}>
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </MotionReveal>
          );
        })}
      </ol>

      <div className={styles.screensBlock}>
        <div className={styles.screensHead}>
          <p className={styles.eyebrow}>Inside LAS Mobility</p>
          <h2 className={styles.title}>Dashboards, live maps, trips and vehicle control.</h2>
        </div>
        <div ref={carousel} className={styles.screens} aria-label="Product screens">
          {screens.map((f, n) => (
            <figure key={f.id} className={styles.screen} data-index={n} aria-label={`${n + 1} of ${screens.length}: ${f.title}`}>
              <DeviceMockup>
                <ScreenshotViewer feature={f} sizes="(min-width: 768px) 70vw, 88vw" />
              </DeviceMockup>
              <figcaption>{f.title}</figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.dots} role="group" aria-label="Choose a screen">
          {screens.map((f, n) => (
            <button
              key={f.id}
              type="button"
              className={styles.dot}
              aria-label={`Show ${f.title}`}
              aria-current={screen === n ? "true" : undefined}
              onClick={() => showScreen(n)}
            />
          ))}
        </div>
      </div>

      <MotionReveal className={styles.cta}>
        <p className={styles.eyebrow}>{CTA_COPY.eyebrow}</p>
        <h2 className={styles.ctaTitle}>{CTA_COPY.title}</h2>
        <p className={styles.body}>{CTA_COPY.body}</p>
        <div className={styles.ctaRow}>
          <button type="button" className={styles.ctaBtn} onClick={() => open("home-story-cta")}>
            <CalendarCheck size={16} /> Book a free demo
          </button>
          <a href="#platform" className={styles.ctaGhost}>
            Explore platform <ArrowRight size={16} />
          </a>
        </div>
      </MotionReveal>

      {sensor && <SensorSheet id={sensor} onClose={closeSensor} />}
    </section>
  );
}
