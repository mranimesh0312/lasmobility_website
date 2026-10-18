"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

/**
 * Light / dark segmented switch. Same 40px height and 10px radius as the
 * header's Log in and Book a Demo buttons; a highlight slides to the active
 * side. Theme tokens only.
 */
export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative grid h-10 w-[76px] shrink-0 grid-cols-2 items-center rounded-[10px] p-1 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)", outlineColor: "var(--accent)" }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-[7px]"
        initial={false}
        animate={{ left: isDark ? "calc(50%)" : "4px" }}
        transition={{ type: "spring", stiffness: 520, damping: 36 }}
        style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}
      />
      <span className="relative z-10 flex items-center justify-center" aria-hidden="true">
        <Sun className="h-4 w-4 transition-colors duration-200" style={{ color: isDark ? "var(--text-muted)" : "var(--accent-text)" }} />
      </span>
      <span className="relative z-10 flex items-center justify-center" aria-hidden="true">
        <Moon className="h-4 w-4 transition-colors duration-200" style={{ color: isDark ? "var(--accent-text)" : "var(--text-muted)" }} />
      </span>
    </button>
  );
}
