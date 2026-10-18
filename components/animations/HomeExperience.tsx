"use client";

import dynamic from "next/dynamic";
import HeroCopy from "./HeroCopy";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDeviceQuality } from "@/hooks/useDeviceQuality";
import styles from "./ScrollStory.module.scss";

const ScrollStory = dynamic(() => import("./ScrollStory"), { ssr: false, loading: () => <StageShell /> });
const StoryStatic = dynamic(() => import("./StoryStatic"), { ssr: false, loading: () => <StageShell /> });

/** Server-rendered first paint: the hero copy on the dark stage, no WebGL yet. */
function StageShell() {
  return (
    <section className={`${styles.story} theme-dark-scope`} aria-label="LAS Mobility platform story">
      <div className={styles.stage}>
        <div className={styles.scrim} aria-hidden="true" />
        <header className={`${styles.panel} ${styles.hero}`}>
          <HeroCopy />
        </header>
      </div>
    </section>
  );
}

/**
 * Chooses the story for the device: the pinned cinematic WebGL story on
 * large fine-pointer screens with motion allowed (and a usable GPU), the
 * static story everywhere else.
 */
export default function HomeExperience() {
  const desktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const reduced = useReducedMotion();
  const caps = useDeviceQuality();
  const decided = desktop !== null && caps.webgl !== null;
  const cinematic = decided && desktop && !reduced && caps.webgl === true && caps.tier !== "low";

  if (!decided) return <StageShell />;
  return cinematic ? <ScrollStory /> : <StoryStatic webgl={caps.webgl === true} />;
}
