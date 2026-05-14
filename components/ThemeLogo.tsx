"use client";

import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface ThemeLogoProps {
  /** Rendered width in px (passed to next/image) */
  width?: number;
  /** Rendered height in px (passed to next/image) */
  height?: number;
  /** Extra Tailwind / CSS class applied to both <img> elements */
  className?: string;
  /** Priority-load (set true for above-the-fold logos) */
  priority?: boolean;
  /**
   * Force the dark-background version regardless of active theme.
   * Use this whenever the logo sits on a hardcoded dark panel
   * (e.g. the BookDemoModal left pane).
   */
  forceDark?: boolean;
}

/**
 * Renders theme-aware LAS Mobility logos with a smooth crossfade
 * when the user switches between light and dark mode.
 *
 * Required files in /public:
 *   logo-light.png  →  dark-navy logo on white/light background
 *   logo-dark.png   →  white logo on transparent/dark background
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

  // We render both images stacked; CSS opacity transitions create
  // a smooth crossfade without unmounting either element.
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
      {/* Light logo */}
      <Image
        src="/logo-light.png"
        width={width}
        height={height}
        alt="LAS Mobility"
        className={className}
        priority={priority}
        style={{
          position: "absolute",
          inset: 0,
          opacity: useDark ? 0 : 1,
          transition: "opacity 0.35s ease",
          objectFit: "contain",
        }}
      />
      {/* Dark logo */}
      <Image
        src="/logo-dark.png"
        width={width}
        height={height}
        alt=""
        aria-hidden
        className={className}
        priority={priority}
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
