"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { useBookDemo } from "@/context/BookDemoContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

let activeLenis: Lenis | null = null;

/** Smooth-scroll to an element or offset through Lenis when it is active. */
export function scrollToTarget(target: HTMLElement | number, duration = 1.4) {
  // Elements land just below the sticky header, not underneath it.
  const offset = typeof target === "number" ? 0 : -(document.getElementById("site-header")?.offsetHeight ?? 0);
  if (activeLenis) activeLenis.scrollTo(target, { duration, offset });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
}

/**
 * Site-wide Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger
 * and the 3D story read the same position. In-page anchors glide; route
 * changes start at the top. Off with reduced motion. Touch keeps native
 * scrolling (Lenis does not smooth touch by default). Modals, the chatbot and
 * any [data-lenis-prevent] element scroll natively.
 */
export default function SmoothScroll() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const { isOpen } = useBookDemo();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: { offset: -96 },
      prevent: (node) => Boolean(node.closest("[data-lenis-prevent], [role='dialog'], [aria-modal='true']")),
    });
    activeLenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      activeLenis = null;
    };
  }, [reduced]);

  // New page: start at the top (unless linking to an anchor) and re-measure triggers.
  useEffect(() => {
    if (!window.location.hash) activeLenis?.scrollTo(0, { immediate: true, force: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => window.clearTimeout(id);
  }, [pathname]);

  // The Book Demo modal locks body scroll; pause Lenis with it.
  useEffect(() => {
    if (!activeLenis) return;
    if (isOpen) activeLenis.stop();
    else activeLenis.start();
  }, [isOpen]);

  return null;
}
