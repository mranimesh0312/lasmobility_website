"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowRight, CalendarCheck, ChevronDown, ChevronUp, X } from "lucide-react";
import { gsap, ScrollTrigger } from "./gsap";
import { scrollToTarget } from "./SmoothScroll";
import HeroControls from "./HeroControls";
import HeroCopy from "./HeroCopy";
import HeroCards from "./HeroCards";
import { CHAPTERS, copyOpacity } from "@/components/three/storyMath";
import { invalidateScenes } from "@/components/three/SceneCanvas";
import { CTA_COPY, STORY_CHAPTERS, STORY_SCREEN_IDS } from "@/data/storyChapters";
import { COMPONENTS } from "@/data/vehicleHotspots";
import { featureById, type FeatureEntry } from "@/data/featureManifest";
import { useExperienceStore, type QualityTier } from "@/stores/experienceStore";
import { useTheme } from "@/context/ThemeContext";
import { useBookDemo } from "@/context/BookDemoContext";
import styles from "./ScrollStory.module.scss";

const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas"), { ssr: false });
const StoryScene = dynamic(() => import("@/components/three/StoryScene"), { ssr: false });

const CHAPTER_LABELS = ["Intro", "Fleet", "Road", "GPS", "Telemetry", "Twin", "Platform", "Screens", "Demo"];
/** Scroll distance per chapter, as a fraction of the viewport height. */
const STEP_VH = 0.7;

/**
 * Desktop cinematic story: a pinned WebGL stage scrubbed by ScrollTrigger.
 * Scroll progress goes into the experience store; the 3D scene and the copy
 * both derive from it, so reverse scrolling replays exactly backwards.
 */
export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const rail = useRef<HTMLDivElement>(null);
  const navBar = useRef<HTMLDivElement>(null);
  const scrimLeft = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const heroLayer = useRef<HTMLDivElement>(null);
  const scrimRight = useRef<HTMLDivElement>(null);
  const scrimBottom = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const inspector = useRef<HTMLElement>(null);
  const connector = useRef<SVGPathElement>(null);
  const connectorDot = useRef<SVGCircleElement>(null);
  const [tier, setTier] = useState<QualityTier>("medium");
  const [chapter, setChapter] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);
  const focus = useExperienceStore((s) => s.focusHotspot);
  const setFocus = useExperienceStore((s) => s.setFocusHotspot);
  const setProgress = useExperienceStore((s) => s.setProgress);
  const { theme } = useTheme();
  const { open: openDemo } = useBookDemo();

  const screens = useMemo(() => STORY_SCREEN_IDS.map((id) => featureById(id)).filter(Boolean) as FeatureEntry[], []);

  useEffect(() => {
    const el = root.current;
    const pin = stage.current;
    if (!el || !pin) return;
    const ctx = gsap.context(() => {
      triggerRef.current = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${(CHAPTERS - 1) * STEP_VH * window.innerHeight}`,
        pin,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          invalidateScenes();
          const ch = p * (CHAPTERS - 1);
          panels.current.forEach((panel, i) => {
            if (!panel) return;
            const o = copyOpacity(ch, i);
            panel.style.opacity = String(o);
            panel.style.transform = `translate3d(0, ${(1 - o) * 18}px, 0)`;
            panel.style.visibility = o < 0.01 ? "hidden" : "visible";
            panel.toggleAttribute("inert", o < 0.5);
          });
          if (rail.current) rail.current.style.setProperty("--story-progress", String(p));
          if (navBar.current) navBar.current.style.setProperty("--story-progress", String(p));
          // Keep copy legible: the scrim follows the side the copy is on.
          const right = Math.max(...STORY_CHAPTERS.map((c, n) => (c.align === "right" ? copyOpacity(ch, n + 1) : 0)));
          if (scrimLeft.current) scrimLeft.current.style.opacity = String(1 - right);
          if (scrimRight.current) scrimRight.current.style.opacity = String(right);
          if (scrimBottom.current) scrimBottom.current.style.opacity = String(copyOpacity(ch, CHAPTERS - 1));
          if (glow.current) glow.current.style.opacity = String(copyOpacity(ch, 0));
          if (heroLayer.current) {
            const o = copyOpacity(ch, 0);
            heroLayer.current.style.opacity = String(o);
            heroLayer.current.style.visibility = o < 0.01 ? "hidden" : "visible";
            heroLayer.current.toggleAttribute("inert", o < 0.5);
          }
          const nearest = Math.round(ch);
          setChapter((c) => (c === nearest ? c : nearest));
          const s = Math.min(STORY_SCREEN_IDS.length - 1, Math.max(0, Math.floor(((ch - 6.45) / 1.15) * STORY_SCREEN_IDS.length)));
          setScreenIndex((c) => (c === s ? c : s));
        },
      });
    }, el);
    return () => {
      ctx.revert();
      triggerRef.current = null;
      setProgress(0);
    };
  }, [setProgress]);

  // Leaving the hero clears a hotspot selection.
  useEffect(() => {
    if (chapter > 0 && focus) setFocus(null);
  }, [chapter, focus, setFocus]);

  const goTo = (i: number, duration?: number) => {
    const t = triggerRef.current;
    if (!t) return;
    const c = Math.max(0, Math.min(CHAPTERS - 1, i));
    scrollToTarget(t.start + ((t.end - t.start) * c) / (CHAPTERS - 1), duration);
  };

  const skip = () => {
    const t = triggerRef.current;
    const next = root.current?.nextElementSibling;
    if (next instanceof HTMLElement) scrollToTarget(next);
    else if (t) scrollToTarget(t.end + 2);
  };

  // While the dark stage is under the header, ask the header for its dark
  // tone in either site theme (a light bar on the dark stage looks broken).
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;
    const update = () => {
      const headerH = document.getElementById("site-header")?.offsetHeight ?? 0;
      const dark = el.getBoundingClientRect().bottom > headerH;
      if (dark) html.dataset.headerTone = "dark";
      else delete html.dataset.headerTone;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      delete html.dataset.headerTone;
    };
  }, []);

  // The story sits under the header; if the header changes height (e.g. the
  // announcement is dismissed), every scroll position must be re-measured.
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    let first = true;
    const ro = new ResizeObserver(() => {
      if (first) return void (first = false);
      ScrollTrigger.refresh();
    });
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  // When scrolling stops between chapters, settle on the nearest one, so the
  // story never rests on a half-faded frame.
  useEffect(() => {
    const onEnd = () => {
      const t = triggerRef.current;
      if (!t || !t.isActive) return;
      const ch = t.progress * (CHAPTERS - 1);
      const nearest = Math.round(ch);
      if (Math.abs(ch - nearest) > 0.03) goTo(nearest, 0.7);
    };
    ScrollTrigger.addEventListener("scrollEnd", onEnd);
    return () => ScrollTrigger.removeEventListener("scrollEnd", onEnd);
  }, []);

  // Arrow keys, Page Up/Down and Space step one chapter while the story is pinned.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = triggerRef.current;
      if (!t || !t.isActive || e.altKey || e.ctrlKey || e.metaKey) return;
      if ((e.target as HTMLElement).closest("input, textarea, select, [contenteditable], [role='dialog']")) return;
      const ch = Math.round(t.progress * (CHAPTERS - 1));
      const down = e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey);
      const up = e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey);
      if (down && ch < CHAPTERS - 1) {
        e.preventDefault();
        goTo(ch + 1, 0.9);
      } else if (up && ch > 0) {
        e.preventDefault();
        goTo(ch - 1, 0.9);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Draws the connector from the selected hotspot to the inspector panel.
  // Called every rendered frame while a hotspot is selected; writes the DOM directly.
  const onFocusScreen = useCallback((p: { x: number; y: number } | null) => {
    const path = connector.current;
    const dot = connectorDot.current;
    const box = inspector.current;
    const host = stage.current;
    if (!path || !dot || !box || !host || !p) return;
    const hr = host.getBoundingClientRect();
    const br = box.getBoundingClientRect();
    const x0 = br.right - hr.left;
    const y0 = br.top - hr.top + Math.min(56, br.height / 2);
    const mx = x0 + (p.x - x0) * 0.45;
    path.setAttribute("d", `M ${x0} ${y0} L ${mx} ${y0} L ${p.x} ${p.y}`);
    dot.setAttribute("cx", String(p.x));
    dot.setAttribute("cy", String(p.y));
  }, []);

  const focusInfo = focus ? COMPONENTS[focus as keyof typeof COMPONENTS] : null;
  const setPanel = (i: number) => (el: HTMLElement | null) => {
    panels.current[i] = el;
  };

  return (
    <section ref={root} className={`${styles.story} theme-dark-scope`} aria-label="LAS Mobility platform story">
      <div ref={stage} className={`${styles.stage} ${focusInfo && chapter === 0 ? styles.stageFocus : ""}`}>
        <SceneCanvas className={styles.canvas} label="Interactive 3D vehicle" camera={{ position: [6, 1.6, 6], fov: 30 }} onTier={setTier}>
          <StoryScene tier={tier} screens={screens} theme={theme} interactive onFocusScreen={onFocusScreen} />
        </SceneCanvas>
        {/* Opening: the stage lifts out of darkness under a single light sweep. */}
        <div className={styles.introVeil} aria-hidden="true" />
        <div className={styles.lightSweep} aria-hidden="true" />
        <div ref={glow} className={styles.heroGlow} aria-hidden="true" />
        <div ref={scrimLeft} className={styles.scrim} aria-hidden="true" />
        <div ref={scrimRight} className={styles.scrimRight} style={{ opacity: 0 }} aria-hidden="true" />
        <div ref={scrimBottom} className={styles.scrimBottom} style={{ opacity: 0 }} aria-hidden="true" />

        {/* 0: hero */}
        <header ref={setPanel(0)} className={`${styles.panel} ${styles.hero}`}>
          <div className={`${styles.heroCopyWrap} ${focusInfo ? styles.heroCopyHidden : ""}`} aria-hidden={focusInfo ? true : undefined}>
            <HeroCopy />
          </div>
        </header>

        {/* Hero product layer: live cards around the car and the configurator dock. */}
        <div ref={heroLayer} className={styles.heroLayer}>
          {!focusInfo && <HeroCards />}
          <div className={styles.heroDock}>
            <HeroControls />
            <p className={styles.hint}>Drag to rotate · select a hotspot to inspect · illustrative demo values</p>
          </div>
        </div>

        {/* 1..7: chapters */}
        {STORY_CHAPTERS.map((c, idx) => {
          const Icon = c.icon;
          const i = idx + 1;
          return (
            <article
              key={c.id}
              ref={setPanel(i)}
              className={`${styles.panel} ${styles.chapter} ${c.align === "right" ? styles.right : ""}`}
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <p className={styles.eyebrow}>
                <Icon size={14} /> {c.eyebrow}
              </p>
              <h2 className={styles.chapterTitle}>{c.title}</h2>
              <p className={styles.chapterBody}>{c.body}</p>
              {c.points && (
                <ul className={styles.points}>
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
              {c.id === "screens" && (
                <ol className={styles.screenList}>
                  {screens.map((f, n) => (
                    <li key={f.id} className={n === screenIndex ? styles.screenActive : ""}>
                      <span>{f.title}</span>
                    </li>
                  ))}
                </ol>
              )}
            </article>
          );
        })}

        {/* 8: CTA */}
        <div ref={setPanel(CHAPTERS - 1)} className={`${styles.panel} ${styles.cta}`} style={{ opacity: 0, visibility: "hidden" }}>
          <p className={styles.eyebrow}>{CTA_COPY.eyebrow}</p>
          <h2 className={styles.ctaTitle}>{CTA_COPY.title}</h2>
          <p className={styles.chapterBody}>{CTA_COPY.body}</p>
          <div className={`${styles.ctaRow} ${styles.ctaCenter}`}>
            <button type="button" className={styles.ctaPrimary} onClick={() => openDemo("home-story-cta")}>
              <CalendarCheck size={16} /> Book a demo
            </button>
            <a href="#platform" className={styles.ctaGhost}>
              Try the live app <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {focusInfo && chapter === 0 && (
          <svg className={styles.connector} aria-hidden="true">
            <path ref={connector} />
            <circle ref={connectorDot} r="5" />
          </svg>
        )}
        {focusInfo && chapter === 0 && (
          <aside ref={inspector} className={styles.inspector} aria-live="polite" aria-label={`${focusInfo.label} details`}>
            <button type="button" className={styles.inspectorClose} aria-label="Close" onClick={() => setFocus(null)}>
              <X size={16} />
            </button>
            <p className={styles.eyebrow}>Telematics component</p>
            <h3 className={styles.inspectorTitle}>{focusInfo.label}</h3>
            <p className={styles.inspectorBody}>{focusInfo.summary}</p>
            <dl className={styles.readings}>
              {focusInfo.readings.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
            {focusInfo.deviceDependent && <p className={styles.sample}>Depends on the installed device</p>}
          </aside>
        )}

        <div ref={navBar} className={`${styles.storyNav} ${chapter === CHAPTERS - 1 ? styles.storyNavDone : ""}`} inert={chapter === CHAPTERS - 1 ? true : undefined}>
          <span className={styles.storyCount} aria-live="polite">
            <b>{String(chapter + 1).padStart(2, "0")}</b> / {String(CHAPTERS).padStart(2, "0")} · {CHAPTER_LABELS[chapter]}
          </span>
          <span className={styles.storyTrack} aria-hidden="true" />
          <button type="button" className={styles.storyBtn} aria-label="Previous chapter" disabled={chapter === 0} onClick={() => goTo(chapter - 1, 0.9)}>
            <ChevronUp size={16} />
          </button>
          <button type="button" className={styles.storyBtn} aria-label="Next chapter" disabled={chapter === CHAPTERS - 1} onClick={() => goTo(chapter + 1, 0.9)}>
            <ChevronDown size={16} />
          </button>
          <button type="button" className={styles.storySkip} onClick={skip}>
            Skip intro <ArrowDown size={14} />
          </button>
        </div>

        <nav ref={rail} className={styles.rail} aria-label="Story chapters">
          {CHAPTER_LABELS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`${styles.railDot} ${chapter === i ? styles.railActive : ""}`}
              aria-label={`Go to ${label}`}
              aria-current={chapter === i ? "step" : undefined}
              onClick={() => goTo(i)}
            >
              <span className={styles.railLabel}>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
