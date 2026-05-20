"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight, CalendarCheck, CheckCircle2, Zap,
  AlertTriangle, Activity, Shield,
} from "lucide-react";
import ThemeLogo from "@/components/ThemeLogo";

const trustSignals = [
  "Real-time GPS tracking",
  "AI-powered insights",
  "Driver safety scoring",
  "Fuel intelligence",
  "Smart alerts",
  "Route optimization",
];

interface SmartCard {
  id: string;
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  accent: string;
  glow: string;
  live?: boolean;
  progress?: number;
  pos: CSSProperties;
  floatY: number;
  floatDuration: number;
  floatDelay: number;
  entranceDelay: number;
  wide?: boolean;
}

/* Cards arranged in a tight 2×2 cluster on the right side of the column.
   All positioned relative to the right edge so they stay flush right at
   every desktop width, leaving the video fully visible through the left gap. */
const CARDS: SmartCard[] = [
  {
    id: "ai",
    icon: Zap,
    label: "AI Recommendation",
    value: "Optimize Route by 12%",
    sub: "3 vehicles · Route 12",
    accent: "#0ECECE",
    glow: "rgba(14,206,206,0.32)",
    pos: { top: "8%", right: "2%" },
    floatY: 10, floatDuration: 5.0, floatDelay: 0, entranceDelay: 0.5,
    wide: true,
  },
  {
    id: "safety",
    icon: Shield,
    label: "Fleet Safety Score",
    value: "98% Safe Operations",
    sub: "▲ 4 pts this week",
    accent: "#22C55E",
    glow: "rgba(34,197,94,0.32)",
    live: true,
    progress: 98,
    pos: { top: "8%", left: "28%" },
    floatY: 9, floatDuration: 4.4, floatDelay: 0.5, entranceDelay: 0.6,
  },
  {
    id: "maintenance",
    icon: AlertTriangle,
    label: "Predictive Maintenance",
    value: "2 Vehicles Require Inspection",
    sub: "Engine · Tire",
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.30)",
    live: true,
    pos: { top: "54%", left: "28%" },
    floatY: 8, floatDuration: 4.7, floatDelay: 1.0, entranceDelay: 0.8,
  },
  {
    id: "driver",
    icon: Activity,
    label: "Driver Risk Score",
    value: "Low Risk Fleet Status",
    sub: "94.2 avg · 847 drivers",
    accent: "#0ECECE",
    glow: "rgba(14,206,206,0.22)",
    progress: 94,
    pos: { top: "54%", right: "2%" },
    floatY: 9, floatDuration: 4.2, floatDelay: 1.5, entranceDelay: 0.9,
  },
];

function CardBody({ card, hovering }: { card: SmartCard; hovering: boolean }) {
  const Icon = card.icon;
  return (
    <>
      <div className="flex items-center gap-2">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{
            background: `${card.accent}1A`,
            border: `1px solid ${card.accent}38`,
            boxShadow: hovering ? `0 0 10px ${card.accent}55` : "none",
            transition: "box-shadow 0.4s ease",
          }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color: card.accent }} />
        </span>
        <p
          className="flex-1 truncate text-[9.5px] font-semibold uppercase tracking-wider"
          style={{ color: "rgba(190,215,255,0.45)" }}
        >
          {card.label}
        </p>
        {card.live && (
          <span
            className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full"
            style={{ background: card.accent, boxShadow: `0 0 6px ${card.accent}` }}
          />
        )}
      </div>
      <p className="mt-2.5 text-[15px] font-bold leading-snug text-white">
        {card.value}
      </p>
      <p className="mt-1 text-[10px] leading-tight" style={{ color: "rgba(175,205,255,0.5)" }}>
        {card.sub}
      </p>
      {card.progress !== undefined && (
        <div
          className="mt-2.5 h-1 overflow-hidden rounded-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${card.progress}%` }}
            transition={{ delay: card.entranceDelay + 0.5, duration: 1.1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${card.accent}88, ${card.accent})` }}
          />
        </div>
      )}
    </>
  );
}

function DesktopCard({ card, hovering }: { card: SmartCard; hovering: boolean }) {
  return (
    <motion.div
      className="absolute"
      style={card.pos}
      initial={{ opacity: 0, y: 18, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: card.entranceDelay, duration: 0.55, ease: "easeOut" }}
    >
      <motion.div
        animate={
          hovering
            ? { y: [0, -card.floatY, 0] }
            : { y: 0 }
        }
        transition={
          hovering
            ? { duration: card.floatDuration, delay: card.floatDelay, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.6, ease: "easeOut" }
        }
        style={{
          width: card.wide ? "13.5rem" : "11.5rem",
          borderRadius: "1rem",
          padding: "0.875rem",
          background: "rgba(5,10,28,0.88)",
          border: `1px solid ${hovering ? card.accent + "45" : card.accent + "28"}`,
          boxShadow: hovering
            ? `0 8px 32px rgba(0,0,0,0.55), 0 0 36px ${card.glow}`
            : `0 6px 24px rgba(0,0,0,0.45), 0 0 18px ${card.glow.replace("0.32", "0.18").replace("0.30", "0.16").replace("0.22", "0.12")}`,
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          transition: "border 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <CardBody card={card} hovering={hovering} />
      </motion.div>
    </motion.div>
  );
}

function MobileCard({ card }: { card: SmartCard }) {
  return (
    <div
      className="w-full rounded-2xl p-3"
      style={{
        background: "rgba(5,10,28,0.84)",
        border: `1px solid ${card.accent}28`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 18px ${card.glow}`,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      <CardBody card={card} hovering={false} />
    </div>
  );
}

export default function Hero() {
  const [hovering, setHovering] = useState(false);

  return (
    <section
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      style={{ background: "#04091A" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Background video */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 1, mixBlendMode: "lighten" }}
        aria-hidden="true"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Directional scrim */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,9,26,0.74) 0%, rgba(4,9,26,0.40) 52%, rgba(4,9,26,0.12) 100%)",
        }}
      />

      {/* Bottom vignette */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "45%",
          background:
            "linear-gradient(to top, #04091A 0%, #04091A 18%, rgba(4,9,26,0.85) 45%, transparent 100%)",
          mixBlendMode: "normal",
        }}
      />

      {/* Grid */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1fr]">

        {/* LEFT */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold"
            style={{ border: "1px solid rgba(14,206,206,0.55)", color: "#5DECEC", background: "rgba(14,206,206,0.12)", backdropFilter: "blur(10px)" }}
          >
            <Zap className="h-3.5 w-3.5" />
            Next-Gen Fleet Intelligence
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="mt-6">
            <ThemeLogo width={340} height={77} className="h-16 w-auto sm:h-20" priority />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]"
            style={{ color: "#FFFFFF", textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
          >
            AI-Powered Fleet{" "}
            <span style={{ background: "linear-gradient(120deg, #0ECECE 0%, #5DECEC 50%, #FFFFFF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 12px rgba(14,206,206,0.6))" }}>
              Intelligence
            </span>{" "}
            for Modern Mobility
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-5 max-w-lg text-lg font-medium leading-8"
            style={{ color: "rgba(220,240,255,0.92)", textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}
          >
            Track vehicles in real time, monitor driver behavior, optimize fuel usage, and unlock AI-driven operational insights — all from one command platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:brightness-110"
              style={{ background: "#0ECECE", color: "#04091A", boxShadow: "0 0 28px rgba(14,206,206,0.55), 0 4px 16px rgba(0,0,0,0.3)" }}>
              <CalendarCheck className="h-4 w-4" />
              Book a Free Demo
            </Link>
            <Link href="/features" className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{ border: "1px solid rgba(255,255,255,0.28)", background: "rgba(255,255,255,0.09)", color: "#FFFFFF", backdropFilter: "blur(10px)" }}>
              Explore Platform
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3"
          >
            {trustSignals.map((signal) => (
              <div key={signal} className="flex items-center gap-2 text-xs font-semibold" style={{ color: "rgba(200,235,255,0.85)" }}>
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "#0ECECE", filter: "drop-shadow(0 0 4px rgba(14,206,206,0.7))" }} />
                {signal}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — mobile 2×2 grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 gap-3 lg:hidden"
        >
          {CARDS.map((card) => <MobileCard key={card.id} card={card} />)}
        </motion.div>

        {/* RIGHT — desktop floating cards */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="relative hidden lg:block"
          style={{ minHeight: "480px" }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 52% 46%, rgba(14,206,206,0.05) 0%, transparent 68%)" }}
          />
          {CARDS.map((card) => <DesktopCard key={card.id} card={card} hovering={hovering} />)}
        </motion.div>
      </div>
    </section>
  );
}
