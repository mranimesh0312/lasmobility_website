"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { screenshotFor, type FeatureEntry } from "@/data/featureManifest";
import { useTheme } from "@/context/ThemeContext";
import { drawAppScreen, loadLogo } from "@/components/three/drawAppScreen";
import styles from "./Showcase.module.scss";

/**
 * Shows a feature's real screenshot in the visitor's site theme, cross-fading
 * between features, with an accessible zoom dialog. With no reviewed capture
 * it shows the app-style screen drawn by drawAppScreen.
 */
export default function ScreenshotViewer({ feature, priority = false, sizes = "(min-width: 1024px) 60vw, 100vw" }: { feature: FeatureEntry; priority?: boolean; sizes?: string }) {
  const { theme } = useTheme();
  const { shot, themeMatched } = screenshotFor(feature, theme);
  const [zoomed, setZoomed] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className={styles.viewer}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={`${feature.id}-${shot?.src ?? "pending"}`}
          className={styles.viewerFrame}
          initial={{ opacity: 0, scale: reduced ? 1 : 1.015 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.45, ease: "easeOut" }}
        >
          {shot ? (
            <>
              <Image
                src={shot.src}
                alt={`${feature.title} screen in the LAS Mobility app`}
                width={shot.width}
                height={shot.height}
                sizes={sizes}
                priority={priority}
                className={styles.shot}
              />
              <button type="button" className={styles.zoomBtn} onClick={() => setZoomed(true)} aria-label={`Enlarge ${feature.title} screenshot`}>
                <Maximize2 size={15} />
              </button>
              {!themeMatched && <span className={styles.themeNote}>{theme === "dark" ? "Light" : "Dark"} theme capture</span>}
            </>
          ) : (
            <DrawnScreen id={feature.id} title={feature.title} theme={theme} />
          )}
        </motion.div>
      </AnimatePresence>
      {zoomed && shot && <Lightbox src={shot.src} width={shot.width} height={shot.height} title={feature.title} onClose={() => setZoomed(false)} />}
    </div>
  );
}

function DrawnScreen({ id, title, theme }: { id: string; title: string; theme: "dark" | "light" }) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    const draw = (logo?: HTMLImageElement) => {
      if (cancelled) return;
      const c = document.createElement("canvas");
      drawAppScreen(c, id, theme, logo);
      setSrc(c.toDataURL("image/webp", 0.9));
    };
    draw();
    loadLogo(theme).then(draw).catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [id, theme]);
  // eslint-disable-next-line @next/next/no-img-element
  return src ? <img src={src} alt={`${title} screen in the LAS Mobility app`} width={1280} height={800} className={styles.shot} /> : <div className={styles.shot} style={{ aspectRatio: "16 / 10" }} />;
}

function Lightbox({ src, width, height, title, onClose }: { src: string; width: number; height: number; title: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previous = useRef<HTMLElement | null>(null);
  const onKey = useCallback((e: KeyboardEvent) => e.key === "Escape" && onClose(), [onClose]);

  useEffect(() => {
    previous.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous.current?.focus();
    };
  }, [onKey]);

  return (
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`${title} screenshot`} onClick={onClose} data-lenis-prevent>
      <button ref={closeRef} type="button" className={styles.lightboxClose} onClick={onClose} aria-label="Close">
        <X size={18} />
      </button>
      <Image src={src} alt={`${title} screen in the LAS Mobility app`} width={width} height={height} className={styles.lightboxImg} sizes="96vw" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}
