"use client";

import { motion } from "framer-motion";

const MESSAGE = "AI-Enabled Fleet Intelligence Platform for Smarter Mobility Operations";

export default function AnnouncementBar() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, rgba(14,206,206,0.08) 0%, rgba(14,206,206,0.14) 50%, rgba(14,206,206,0.08) 100%)",
        borderBottom: "1px solid rgba(14,206,206,0.18)",
      }}
      role="banner"
      aria-label="Announcement"
    >
      {/* Shimmer sweep */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 w-32 opacity-25"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(14,206,206,0.6), transparent)",
        }}
        animate={{ x: ["-100%", "600%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2.5 px-4 py-2 sm:px-6 lg:px-8">
        {/* Pulsing dot */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ background: "var(--accent-text)" }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: "var(--accent-text)" }}
          />
        </span>

        {/* Desktop: static centered text */}
        <p
          className="hidden text-center text-xs font-semibold tracking-wide sm:block"
          style={{ color: "var(--accent-text)" }}
        >
          {MESSAGE}
        </p>

        {/* Mobile: marquee */}
        <div className="relative flex overflow-hidden sm:hidden" style={{ width: "calc(100vw - 64px)" }}>
          <motion.p
            className="whitespace-nowrap text-xs font-semibold tracking-wide"
            style={{ color: "var(--accent-text)" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {MESSAGE}&nbsp;&nbsp;•&nbsp;&nbsp;{MESSAGE}&nbsp;&nbsp;•&nbsp;&nbsp;
          </motion.p>
        </div>

        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ background: "var(--accent-text)" }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: "var(--accent-text)" }}
          />
        </span>
      </div>
    </div>
  );
}
