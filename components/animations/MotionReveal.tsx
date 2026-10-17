"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px (ignored with reduced motion). */
  y?: number;
  as?: "div" | "section" | "article" | "li";
}

/** Scroll-triggered fade/rise used across sections. Reduced motion: fade only. */
export default function MotionReveal({ children, className, delay = 0, y = 28, as = "div" }: MotionRevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduced ? 0.2 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
