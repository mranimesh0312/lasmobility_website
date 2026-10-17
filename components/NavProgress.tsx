"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Instant feedback for page navigation: a thin bar along the top of the
 * window starts the moment an internal link is clicked and completes when the
 * new route renders. Without it, a slow route (first compile in dev, a slow
 * network in production) looks like the click did nothing.
 */
export default function NavProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [width, setWidth] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  // Start on clicks that will change the route.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page (incl. #hash links)
      setState("loading");
      setWidth(12);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Creep towards 90% while waiting.
  useEffect(() => {
    if (state !== "loading") return;
    timer.current = window.setInterval(() => setWidth((w) => Math.min(90, w + (90 - w) * 0.12)), 200);
    return () => window.clearInterval(timer.current);
  }, [state]);

  // The new route has rendered: finish and fade out.
  useEffect(() => {
    setState((s) => (s === "loading" ? "done" : s));
  }, [pathname]);

  useEffect(() => {
    if (state !== "done") return;
    setWidth(100);
    const id = window.setTimeout(() => {
      setState("idle");
      setWidth(0);
    }, 350);
    return () => window.clearTimeout(id);
  }, [state]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2147483647,
        height: 3,
        width: `${width}%`,
        opacity: state === "idle" ? 0 : 1,
        background: "linear-gradient(90deg, #0ECECE, #22D9D9)",
        boxShadow: "0 0 10px rgba(14,206,206,0.7)",
        transition: "width 0.2s ease, opacity 0.3s ease",
        pointerEvents: "none",
      }}
    />
  );
}
