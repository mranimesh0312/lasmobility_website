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
 *   /public/brand/logo-light.png  (dark logo for light backgrounds)
 *   /public/brand/logo-dark.png   (light logo for dark backgrounds)
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

  // Graceful fallback: if brand PNG files haven't been added yet, use the SVG
  const [lightErr, setLightErr] = useState(false);
  const [darkErr, setDarkErr]   = useState(false);
  const lightSrc = lightErr ? "/logo.svg" : "/brand/logo-light.png";
  const darkSrc  = darkErr  ? "/logo.svg" : "/brand/logo-dark.png";

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
