"use client";

import Image from "next/image";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeLogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  /**
   * Force the dark-background version regardless of active theme.
   * Use this whenever the logo sits on a hardcoded dark panel
   * (e.g. the BookDemoModal left pane).
   */
  forceDark?: boolean;
}

/**
 * Theme-aware logo that crossfades between:
 *   /public/logo-light.png  (dark-navy text, for light backgrounds)
 *   /public/logo-dark.png   (white text, for dark backgrounds)
 *
 * If either PNG is missing it automatically falls back to /logo.svg
 * so local dev works out of the box before the PNGs are added.
 */
export default function ThemeLogo({
  width = 220,
  height = 50,
  className = "",
  priority = false,
  forceDark = false,
}: ThemeLogoProps) {
  const { theme } = useTheme();
  const useDark = forceDark || theme === "dark";

  // Graceful fallback: if PNG files haven't been added yet, use the SVG
  const [lightErr, setLightErr] = useState(false);
  const [darkErr, setDarkErr]   = useState(false);
  const lightSrc = lightErr ? "/logo.svg" : "/logo-light.png";
  const darkSrc  = darkErr  ? "/logo.svg" : "/logo-dark.png";

  // Both images are rendered simultaneously; CSS opacity crossfades between
  // them when the theme changes — no unmount/remount flicker.
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        width,
        height,
        flexShrink: 0,
      }}
      aria-label="LAS Mobility"
    >
      {/* Light logo — visible in light mode */}
      <Image
        src={lightSrc}
        width={width}
        height={height}
        alt="LAS Mobility"
        className={className}
        priority={priority}
        onError={() => setLightErr(true)}
        style={{
          position: "absolute",
          inset: 0,
          opacity: useDark ? 0 : 1,
          transition: "opacity 0.35s ease",
          objectFit: "contain",
        }}
      />
      {/* Dark logo — visible in dark mode */}
      <Image
        src={darkSrc}
        width={width}
        height={height}
        alt=""
        aria-hidden
        className={className}
        priority={priority}
        onError={() => setDarkErr(true)}
        style={{
          position: "absolute",
          inset: 0,
          opacity: useDark ? 1 : 0,
          transition: "opacity 0.35s ease",
          objectFit: "contain",
        }}
      />
    </span>
  );
}
