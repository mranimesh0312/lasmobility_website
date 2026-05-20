"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Route,
  ShieldCheck,
  Zap,
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
  id: "route" | "safety";
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  footer: string;
  accent: string;
  glow: string;
  progress?: number;
  pos: CSSProperties;
  entranceDelay: number;
}

const CARDS: SmartCard[] = [
  {
    id: "route",
    icon: Route,
    label: "AI Route Intelligence",
    value: "12% Fuel Optimization",
    sub: "Route LA-204",
    footer: "Real-time route optimization detected",
    accent: "#0ECECE",
    glow: "rgba(14,206,206,0.24)",
    pos: { top: "20%", right: "5%" },
    entranceDelay: 0.48,
  },
  {
    id: "safety",
    icon: ShieldCheck,
    label: "Fleet Safety AI",
    value: "+12% Driver Compliance",
    sub: "Fleet Safety Score",
    footer: "Weekly operational safety improvement",
    accent: "#7DD3FC",
    glow: "rgba(96,165,250,0.20)",
    progress: 86,
    pos: { top: "47%", right: "10%" },
    entranceDelay: 0.62,
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
            background: `${card.accent}18`,
            border: `1px solid ${card.accent}30`,
            boxShadow: hovering ? `0 0 16px ${card.accent}42` : `0 0 10px ${card.accent}18`,
            transition: "box-shadow 0.4s ease",
          }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color: card.accent }} />
        </span>
        <p
          className="flex-1 truncate text-[9.5px] font-semibold uppercase tracking-wider"
          style={{ color: "rgba(218,242,255,0.68)" }}
        >
          {card.label}
        </p>
        <span
          className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full"
          style={{ background: card.accent, boxShadow: `0 0 8px ${card.accent}` }}
        />
      </div>

      <p className="mt-3 text-[16px] font-bold leading-snug text-white">{card.value}</p>
      <p className="mt-1 text-[11px] font-medium leading-tight" style={{ color: "rgba(190,226,255,0.62)" }}>
        {card.sub}
      </p>

      {card.progress !== undefined && (
        <div className="mt-2.5 h-1 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${card.progress}%` }}
            transition={{ delay: card.entranceDelay + 0.45, duration: 1.1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${card.accent}88, ${card.accent})` }}
          />
        </div>
      )}

      <p
        className="mt-3 border-t pt-2 text-[10px] leading-snug"
        style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(210,236,255,0.56)" }}
      >
        {card.footer}
      </p>
    </>
  );
}

function DesktopCard({ card, hovering }: { card: SmartCard; hovering: boolean }) {
  return (
    <motion.div
      className="absolute"
      style={card.pos}
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: card.entranceDelay, duration: 0.55, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ y: -4, scale: 1.015 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          width: "12.25rem",
          borderRadius: "1.125rem",
          padding: "0.8rem",
          background: "rgba(7,15,30,0.45)",
          border: hovering ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.08)",
          boxShadow: hovering
            ? `0 18px 46px rgba(0,0,0,0.38), 0 0 34px ${card.glow}`
            : `0 14px 38px rgba(0,0,0,0.30), 0 0 18px ${card.glow}`,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          transition: "border 0.35s ease, box-shadow 0.35s ease, background 0.35s ease",
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
        background: "rgba(7,15,30,0.55)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: `0 12px 34px rgba(0,0,0,0.32), 0 0 18px ${card.glow}`,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <CardBody card={card} hovering={false} />
    </div>
  );
}

function HeroTelemetryEffects() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.45, duration: 1.1, ease: "easeOut" }}
      aria-hidden="true"
    >
      <div
        className="absolute left-[8%] top-[18%] h-[310px] w-[310px] rounded-full"
        style={{
          border: "1px solid rgba(14,206,206,0.14)",
          background: "radial-gradient(circle, rgba(14,206,206,0.13), transparent 64%)",
          animation: "heroRadar 7s ease-in-out infinite",
        }}
      />
      <div
        className="absolute left-[18%] top-[33%] h-28 w-28 rounded-full"
        style={{
          border: "1px solid rgba(125,211,252,0.16)",
          boxShadow: "0 0 38px rgba(14,206,206,0.18)",
          animation: "heroPulseRing 5.8s ease-in-out infinite",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 480" preserveAspectRatio="none">
        <defs>
          <linearGradient id="heroRouteLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#0ECECE" stopOpacity="0" />
            <stop offset="42%" stopColor="#0ECECE" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.16" />
          </linearGradient>
          <filter id="heroRouteGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M70 316 C158 244 250 298 326 232 C384 181 452 177 552 218"
          fill="none"
          stroke="url(#heroRouteLine)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="8 12"
          filter="url(#heroRouteGlow)"
          className="hero-route-flow"
        />
        <path
          d="M118 360 C196 326 262 354 340 312 C416 270 448 285 536 258"
          fill="none"
          stroke="rgba(125,211,252,0.32)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeDasharray="2 12"
          className="hero-route-flow-slow"
        />
        <circle cx="318" cy="232" r="5" fill="#0ECECE" filter="url(#heroRouteGlow)" className="hero-gps-dot" />
        <circle cx="452" cy="177" r="4" fill="#7DD3FC" filter="url(#heroRouteGlow)" className="hero-gps-dot hero-gps-dot-delay" />
      </svg>
    </motion.div>
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
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 1, mixBlendMode: "lighten" }}
        aria-hidden="true"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,9,26,0.82) 0%, rgba(4,9,26,0.48) 48%, rgba(4,9,26,0.22) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "45%",
          background:
            "linear-gradient(to top, #04091A 0%, #04091A 18%, rgba(4,9,26,0.85) 45%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 72% 45%, rgba(14,206,206,0.16), transparent 34%), radial-gradient(ellipse at 52% 34%, rgba(96,165,250,0.10), transparent 30%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold"
            style={{
              border: "1px solid rgba(14,206,206,0.55)",
              color: "#5DECEC",
              background: "rgba(14,206,206,0.12)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Zap className="h-3.5 w-3.5" />
            Next-Gen Fleet Intelligence
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-6"
          >
            <ThemeLogo width={340} height={77} className="h-16 w-auto sm:h-20" priority />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]"
            style={{ color: "#FFFFFF", textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
          >
            AI-Powered Fleet{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #0ECECE 0%, #5DECEC 50%, #FFFFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 12px rgba(14,206,206,0.6))",
              }}
            >
              Intelligence
            </span>{" "}
            for Modern Mobility
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-5 max-w-lg text-lg font-medium leading-8"
            style={{ color: "rgba(220,240,255,0.92)", textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}
          >
            Track vehicles in real time, monitor driver behavior, optimize fuel usage, and unlock AI-driven operational insights - all from one command platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:brightness-110"
              style={{
                background: "#0ECECE",
                color: "#04091A",
                boxShadow: "0 0 28px rgba(14,206,206,0.55), 0 4px 16px rgba(0,0,0,0.3)",
              }}
            >
              <CalendarCheck className="h-4 w-4" />
              Book a Free Demo
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{
                border: "1px solid rgba(255,255,255,0.28)",
                background: "rgba(255,255,255,0.09)",
                color: "#FFFFFF",
                backdropFilter: "blur(10px)",
              }}
            >
              Explore Platform
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.7 }}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid gap-3 sm:grid-cols-2 lg:hidden"
        >
          {CARDS.map((card) => (
            <MobileCard key={card.id} card={card} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative hidden lg:block"
          style={{ minHeight: "480px" }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 45% 45%, rgba(14,206,206,0.08) 0%, transparent 62%)" }}
          />
          <HeroTelemetryEffects />
          {CARDS.map((card) => (
            <DesktopCard key={card.id} card={card} hovering={hovering} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
