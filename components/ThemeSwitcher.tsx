"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Layers } from "lucide-react";
import { useTheme, type Theme } from "@/context/ThemeContext";
import { useState } from "react";

const themes: { id: Theme; icon: typeof Sun; label: string }[] = [
  { id: "light", icon: Sun,    label: "Light" },
  { id: "dark",  icon: Moon,   label: "Dark"  },
  { id: "glass", icon: Layers, label: "Glass" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const current = themes.find((t) => t.id === theme) ?? themes[1];
  const Icon = current.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border transition hover:opacity-80"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
        aria-label="Switch theme"
        title={`Theme: ${current.label}`}
      >
        <Icon className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-11 z-50 min-w-[130px] overflow-hidden rounded-xl p-1"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
                backdropFilter: "blur(20px)",
              }}
            >
              {themes.map(({ id, icon: TIcon, label }) => (
                <button
                  key={id}
                  onClick={() => { setTheme(id); setOpen(false); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition"
                  style={{
                    background: theme === id ? "var(--accent-glow)" : "transparent",
                    color: theme === id ? "var(--accent-text)" : "var(--text-secondary)",
                  }}
                >
                  <TIcon className="h-3.5 w-3.5" />
                  {label}
                  {theme === id && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
