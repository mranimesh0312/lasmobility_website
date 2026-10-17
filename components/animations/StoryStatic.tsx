"use client";

import dynamic from "next/dynamic";
import { CalendarCheck } from "lucide-react";
import HeroCopy from "./HeroCopy";
import HeroControls from "./HeroControls";
import MotionReveal from "./MotionReveal";
import ScreenshotViewer from "@/components/showcase/ScreenshotViewer";
import DeviceMockup from "@/components/showcase/DeviceMockup";
import { CTA_COPY, STORY_CHAPTERS, STORY_SCREEN_IDS } from "@/data/storyChapters";
import { featureById, type FeatureEntry } from "@/data/featureManifest";
import { paintById, useExperienceStore } from "@/stores/experienceStore";
import { useBookDemo } from "@/context/BookDemoContext";
import styles from "./StoryStatic.module.scss";

const VehicleStage = dynamic(() => import("@/components/three/VehicleStage"), { ssr: false });

/**
 * Story for phones, tablets and reduced-motion visitors: no pinning or
 * scroll-scrubbing. A touch-friendly 3D vehicle (when WebGL is usable), then
 * the chapters as plain, readable sections.
 */
export default function StoryStatic({ webgl }: { webgl: boolean }) {
  const paint = paintById(useExperienceStore((s) => s.paintId));
  const lighting = useExperienceStore((s) => s.lighting);
  const headlights = useExperienceStore((s) => s.headlights);
  const hazards = useExperienceStore((s) => s.hazards);
  const { open } = useBookDemo();
  const screens = STORY_SCREEN_IDS.map((id) => featureById(id)).filter(Boolean) as FeatureEntry[];

  return (
    <section className={styles.static} aria-label="LAS Mobility platform story">
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
              label="Interactive 3D vehicle"
              coarsePointer
            />
            <HeroControls showZoom={false} />
          </div>
        )}
      </div>

      <div className={styles.chapters}>
        {STORY_CHAPTERS.map((c) => {
          const Icon = c.icon;
          return (
            <MotionReveal key={c.id} as="article" className={styles.chapter}>
              <p className={styles.eyebrow}>
                <Icon size={14} /> {c.eyebrow}
              </p>
              <h2 className={styles.title}>{c.title}</h2>
              <p className={styles.body}>{c.body}</p>
              {c.points && (
                <ul className={styles.points}>
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
              {c.id === "screens" && (
                <div className={styles.screens}>
                  {screens.map((f) => (
                    <figure key={f.id} className={styles.screen}>
                      <DeviceMockup>
                        <ScreenshotViewer feature={f} sizes="100vw" />
                      </DeviceMockup>
                      <figcaption>{f.title}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </MotionReveal>
          );
        })}
        <MotionReveal className={styles.cta}>
          <p className={styles.eyebrow}>{CTA_COPY.eyebrow}</p>
          <h2 className={styles.title}>{CTA_COPY.title}</h2>
          <p className={styles.body}>{CTA_COPY.body}</p>
          <button type="button" className={styles.ctaBtn} onClick={() => open("home-story-cta")}>
            <CalendarCheck size={16} /> Book a demo
          </button>
        </MotionReveal>
      </div>
    </section>
  );
}
