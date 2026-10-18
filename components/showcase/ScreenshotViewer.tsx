"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import type { FeatureEntry } from "@/data/featureManifest";
import ReplicaScreen, { screenForFeature } from "@/components/replica/ReplicaScreen";
import styles from "./Showcase.module.scss";

/**
 * Shows a feature's app screen, built from the coded replica (not a
 * screenshot), so it always follows the site theme and palette. Cross-fades
 * between features; the expand button opens an interactive full-size view.
 * `sizes` is accepted for call-site compatibility with the old image viewer.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ScreenshotViewer({ feature, priority = false, sizes }: { feature: FeatureEntry; priority?: boolean; sizes?: string }) {
  const [zoomed, setZoomed] = useState(false);
  const reduced = useReducedMotion();
  const screen = screenForFeature(feature.id);

  return (
    <div className={styles.viewer}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={feature.id}
          className={styles.viewerFrame}
          initial={{ opacity: 0, scale: reduced ? 1 : 1.015 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.36, ease: [0.22, 1, 0.36, 1] }}
        >
          <ReplicaScreen screen={screen} />
          <button type="button" className={styles.zoomBtn} onClick={() => setZoomed(true)} aria-label={`Open ${feature.title} full size`}>
            <Maximize2 size={15} />
          </button>
        </motion.div>
      </AnimatePresence>
      {zoomed && <Lightbox feature={feature} onClose={() => setZoomed(false)} />}
    </div>
  );
}

function Lightbox({ feature, onClose }: { feature: FeatureEntry; onClose: () => void }) {
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
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`${feature.title} in the LAS Mobility app`} onClick={onClose} data-lenis-prevent>
      <button ref={closeRef} type="button" className={styles.lightboxClose} onClick={onClose} aria-label="Close">
        <X size={18} />
      </button>
      <div className={styles.lightboxScreen} onClick={(e) => e.stopPropagation()}>
        <ReplicaScreen screen={screenForFeature(feature.id)} interactive />
      </div>
    </div>
  );
}
