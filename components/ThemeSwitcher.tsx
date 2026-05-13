"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

/**
 * Premium light / dark toggle switch.
 * Clicking it slides the knob and swaps Sun ↔ Moon icons.
 */
export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={toggle}
      className="relative flex h-8 w-[3.25rem] shrink-0 items-center rounded-full p-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #162035 0%, #1E2E45 100%)"
          : "linear-gradient(135deg, #E4EEF8 0%, #D0E5F5 100%)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(11,22,40,0.12)"}`,
        boxShadow: isDark
          ? "0 0 12px rgba(14,206,206,0.15), inset 0 1px 0 rgba(255,255,255,0.04)"
          : "0 0 8px rgba(10,171,171,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
        transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      {/* Sun icon — left side */}
      <span
        className="absolute left-[5px] flex items-center justify-center"
        style={{
          opacity: isDark ? 0.3 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <Sun
          className="h-3 w-3"
          style={{ color: isDark ? "var(--text-muted)" : "#0AABAB" }}
        />
      </span>

      {/* Moon icon — right side */}
      <span
        className="absolute right-[5px] flex items-center justify-center"
        style={{
          opacity: isDark ? 1 : 0.3,
          transition: "opacity 0.3s ease",
        }}
      >
        <Moon
          className="h-3 w-3"
          style={{ color: isDark ? "#22D9D9" : "var(--text-muted)" }}
        />
      </span>

      {/* Sliding knob */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32, mass: 0.8 }}
        className="relative z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full shadow-md"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #0ECECE 0%, #0AABAB 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)",
          marginLeft: isDark ? "auto" : 0,
          boxShadow: isDark
            ? "0 2px 8px rgba(14,206,206,0.5)"
            : "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        {isDark ? (
          <Moon className="h-2.5 w-2.5" style={{ color: "#060E1A" }} />
        ) : (
          <Sun className="h-2.5 w-2.5" style={{ color: "#0AABAB" }} />
        )}
      </motion.span>
    </button>
  );
}
