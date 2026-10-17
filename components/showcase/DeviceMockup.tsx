"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./Showcase.module.scss";

/**
 * Laptop frame in CSS 3D. Tilts towards the pointer (desktop, motion allowed)
 * with a moving specular sheen; the screen content is passed in.
 */
export default function DeviceMockup({ children, kind = "laptop" }: { children: ReactNode; kind?: "laptop" | "phone" }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    ref.current.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
    ref.current.style.setProperty("--sheen", `${(x + 0.5) * 100}%`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={styles.mockupScene} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className={kind === "phone" ? styles.phone : styles.laptop}>
        <div className={styles.screen}>
          {children}
          <span className={styles.sheen} aria-hidden="true" />
        </div>
        {kind === "laptop" && <div className={styles.base} aria-hidden="true" />}
      </div>
    </div>
  );
}
