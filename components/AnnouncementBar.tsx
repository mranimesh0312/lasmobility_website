"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";

const STORAGE_KEY = "las_announcement_dismissed_v2";

const MESSAGES = [
  "AI-Enabled Fleet Intelligence Platform for Smarter Mobility Operations",
  "Real-Time GPS Vehicle Monitoring — Track Every Asset, Anywhere",
  "Smart Fleet Safety Analytics — Reduce Risk Across Your Fleet",
  "Predictive Maintenance Intelligence — Act Before Breakdowns Happen",
  "AI-Powered Route Optimization — Cut Costs, Improve Delivery Times",
  "IoT Sensor Monitoring Platform — Full Vehicle Health Visibility",
  "Enterprise Fleet Command Center — One Platform, Every Insight",
  "Driver Risk Intelligence System — Score, Improve, and Protect",
  "Advanced Fuel Monitoring Analytics — Eliminate Waste, Boost Efficiency",
];

const ROTATE_INTERVAL = 4000; // ms per message

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false); // start hidden to avoid SSR flicker
  const [index, setIndex] = useState(0);

  // Check localStorage on mount
  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  // Rotate messages
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="announcement-bar"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <div
            className="relative"
            style={{
              background:
                "linear-gradient(90deg, rgba(14,206,206,0.07) 0%, rgba(14,206,206,0.14) 50%, rgba(14,206,206,0.07) 100%)",
              borderBottom: "1px solid rgba(14,206,206,0.18)",
            }}
            role="banner"
            aria-label="Platform announcement"
          >
            {/* Shimmer sweep */}
            <motion.div
              className="pointer-events-none absolute inset-y-0 w-40 opacity-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(14,206,206,0.7), transparent)",
              }}
              animate={{ x: ["-100%", "800%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
            />

            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6 lg:px-8">
              {/* NEW badge */}
              <span
                className="hidden shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider sm:flex"
                style={{
                  border: "1px solid rgba(14,206,206,0.45)",
                  color: "var(--accent-text)",
                  background: "rgba(14,206,206,0.1)",
                }}
              >
                <Zap className="h-2.5 w-2.5" />
                NEW
              </span>

              {/* Rotating message — desktop */}
              <div className="relative hidden flex-1 overflow-hidden sm:flex" style={{ height: "1.25rem" }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={index}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.38, ease: "easeOut" }}
                    className="absolute inset-0 text-center text-xs font-semibold tracking-wide"
                    style={{ color: "var(--accent-text)" }}
                  >
                    {MESSAGES[index]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Mobile: marquee of all messages */}
              <div className="relative flex flex-1 overflow-hidden sm:hidden" style={{ height: "1.1rem" }}>
                <motion.p
                  className="absolute whitespace-nowrap text-xs font-semibold tracking-wide"
                  style={{ color: "var(--accent-text)" }}
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                >
                  {MESSAGES.join("  •  ")}
                </motion.p>
              </div>

              {/* Book Demo CTA — desktop only */}
              <a
                href="/contact"
                className="hidden shrink-0 items-center gap-1 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider transition hover:opacity-80 sm:flex"
                style={{
                  background: "rgba(14,206,206,0.15)",
                  color: "var(--accent-text)",
                  border: "1px solid rgba(14,206,206,0.3)",
                }}
              >
                Book Demo →
              </a>

              {/* Dismiss button */}
              <button
                onClick={dismiss}
                className="shrink-0 rounded-full p-1 opacity-50 transition hover:opacity-100"
                style={{ color: "var(--accent-text)" }}
                aria-label="Dismiss announcement"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
