"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { ArrowRight, CalendarCheck } from "lucide-react";
import styles from "./ScrollStory.module.scss";

const at = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** Document-timeline time the first hero reveal started (ms). */
let introStart: number | null = null;

/**
 * Hero headline + CTAs, shared by the cinematic, static and server-rendered
 * heroes. The opening reveal is CSS only (masked headline, short stagger,
 * done by ~1 s) so it runs from the first paint and needs no JavaScript.
 */
export default function HeroCopy() {
  const root = useRef<HTMLDivElement>(null);

  // The copy is painted by the server shell first and remounted when the 3D
  // story loads. Later mounts resume the reveal where it had got to instead
  // of replaying it.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || typeof document.timeline === "undefined") return;
    const now = Number(document.timeline.currentTime ?? 0);
    if (introStart === null) {
      const anim = el.querySelector("h1")?.getAnimations()[0];
      introStart = anim?.startTime != null ? Number(anim.startTime) : now;
      return;
    }
    el.style.setProperty("--o", `${-(now - introStart) / 1000}s`);
  }, []);

  return (
    <div ref={root} style={{ display: "contents" }}>
      <p className={`${styles.badge} ${styles.introRise}`} style={at(0)}>Next-gen fleet intelligence</p>
      <h1 className={`${styles.heroTitle} ${styles.introMask}`}>
        AI-powered fleet <span className={styles.accent}>intelligence</span> for modern mobility
      </h1>
      <p className={`${styles.heroBody} ${styles.introRise}`} style={at(0.3)}>
        Track vehicles in real time, monitor driver behaviour, control fuel and maintenance costs, and act on AI-driven insights, all from one command platform.
      </p>
      <div className={`${styles.ctaRow} ${styles.introRise}`} style={at(0.42)}>
        <Link href="/contact" className={styles.ctaPrimary}>
          <CalendarCheck size={16} /> Book a free demo
        </Link>
        <Link href="/features" className={styles.ctaGhost}>
          Explore platform <ArrowRight size={16} />
        </Link>
      </div>
      <ul className={`${styles.proof} ${styles.introRise}`} style={at(0.54)}>
        <li>Live GPS tracking</li>
        <li>Remote immobilize</li>
        <li>Fuel &amp; cold-chain sensors</li>
        <li>Web &amp; mobile</li>
      </ul>
    </div>
  );
}
