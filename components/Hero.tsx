"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, CalendarCheck, CheckCircle2, Zap,
  Map, Truck, AlertTriangle, Activity, TrendingUp, Fuel,
} from "lucide-react";

const trustSignals = [
  "Real-time GPS tracking",
  "AI-powered insights",
  "Driver safety scoring",
  "Fuel intelligence",
  "Smart alerts",
  "Route optimization",
];

const statsOverlay = [
  { icon: Truck,         label: "Active Vehicles", value: "1,284", color: "#0ECECE" },
  { icon: Activity,      label: "Trips Today",     value: "3,920", color: "#22D9D9" },
  { icon: TrendingUp,    label: "Utilization",     value: "94%",   color: "#22C55E" },
  { icon: AlertTriangle, label: "Risk Alerts",     value: "12",    color: "#F59E0B" },
];

export default function Hero() {
  return (
    /* Hero always stays dark so the video reads well on every page theme */
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28" style={{ background: "#04091A" }}>

      {/* ── Looping background video ── */}
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

      {/* ── Scrim: bottom vignette + left-side darkening for text readability ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            /* left text-area dark wash */
            "linear-gradient(90deg, rgba(4,9,26,0.72) 0%, rgba(4,9,26,0.38) 52%, rgba(4,9,26,0.10) 100%)",
            /* top + bottom fade-in */
            "linear-gradient(180deg, rgba(4,9,26,0.55) 0%, transparent 20%, transparent 70%, rgba(4,9,26,0.65) 100%)",
          ].join(", "),
        }}
      />

      {/* ── Content ── */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1fr]">

        {/* ── LEFT: copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold"
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

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-6"
          >
            <Image
              src="/logo.svg"
              width={340}
              height={77}
              alt="LAS Mobility"
              priority
              className="h-16 w-auto sm:h-20"
            />
          </motion.div>

          {/* Headline — bright white, crisp against video */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]"
            style={{
              color: "#FFFFFF",
              textShadow: "0 2px 24px rgba(0,0,0,0.55)",
            }}
          >
            AI-Powered Fleet{" "}
            <span
              style={{
                /* Cyan-to-white gradient echoes the video's radar glow */
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

          {/* Subheading — high-contrast light on video */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-5 max-w-lg text-lg font-medium leading-8"
            style={{
              color: "rgba(220,240,255,0.92)",
              textShadow: "0 1px 12px rgba(0,0,0,0.5)",
            }}
          >
            Track vehicles in real time, monitor driver behavior, optimize fuel
            usage, and unlock AI-driven operational insights — all from one
            command platform.
          </motion.p>

          {/* CTAs */}
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

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3"
          >
            {trustSignals.map((signal) => (
              <div
                key={signal}
                className="flex items-center gap-2 text-xs font-semibold"
                style={{ color: "rgba(200,235,255,0.85)" }}
              >
                <CheckCircle2
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: "#0ECECE", filter: "drop-shadow(0 0 4px rgba(14,206,206,0.7))" }}
                />
                {signal}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: dashboard mockup ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative"
        >
          <motion.div className="float-anim">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                background: "rgba(8,18,40,0.82)",
                border: "1px solid rgba(14,206,206,0.22)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 60px rgba(14,206,206,0.18)",
                backdropFilter: "blur(18px)",
              }}
            >
              {/* Header bar */}
              <div
                className="flex items-center justify-between border-b px-5 py-3.5"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4" style={{ color: "#0ECECE" }} />
                  <span className="text-sm font-semibold text-white">Fleet Command Center</span>
                </div>
                <div
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{ background: "rgba(34,197,94,0.15)", color: "#4ADE80" }}
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live Sync
                </div>
              </div>

              {/* Map area */}
              <div
                className="relative h-64 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #060E1A 0%, #0B1628 50%, #0D2040 100%)" }}
              >
                <div className="absolute inset-0 bg-grid opacity-40" />
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 260" fill="none" aria-hidden="true">
                  <path className="map-line" d="M40 200 C120 160 200 180 280 140 C360 100 400 80 520 70" stroke="#0ECECE" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
                  <path d="M80 80 C160 60 240 100 320 90 C400 80 460 110 540 100" stroke="rgba(14,206,206,0.3)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M20 140 C100 120 200 150 300 200 C380 240 460 220 540 210" stroke="rgba(34,197,94,0.2)" strokeWidth="2" strokeLinecap="round" />
                </svg>

                {[
                  { x: "20%", y: "30%", id: "TRK-18", color: "#0ECECE" },
                  { x: "54%", y: "45%", id: "BUS-07", color: "#22C55E" },
                  { x: "74%", y: "25%", id: "VAN-42", color: "#F59E0B" },
                  { x: "42%", y: "68%", id: "CAR-11", color: "#0ECECE" },
                ].map((m) => (
                  <div key={m.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: m.x, top: m.y }}>
                    <div
                      className="marker-pulse flex h-9 w-9 items-center justify-center rounded-full"
                      style={{ background: m.color, boxShadow: `0 0 16px ${m.color}80` }}
                    >
                      <Truck className="h-4 w-4 text-white" />
                    </div>
                    <div className="mt-1 rounded px-1.5 py-0.5 text-center text-[9px] font-bold" style={{ background: "rgba(248,250,252,0.95)", color: "#0B1628" }}>
                      {m.id}
                    </div>
                  </div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-3 left-3 rounded-xl px-3 py-2.5"
                  style={{ background: "rgba(248,250,252,0.97)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
                >
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-orange-500" />
                    <p className="text-xs font-bold text-slate-800">Fuel anomaly detected</p>
                  </div>
                  <p className="mt-0.5 text-[10px] text-slate-500">VAN-42 shows unusual consumption</p>
                </motion.div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 divide-x divide-white/[0.07]" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                {statsOverlay.map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="px-3 py-3.5 text-center">
                    <Icon className="mx-auto h-4 w-4" style={{ color }} />
                    <p className="mt-1 text-base font-bold text-white">{value}</p>
                    <p className="text-[10px] leading-tight text-white/50">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI insight floating card */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="float-delay absolute -right-4 top-6 hidden w-52 rounded-xl p-3 sm:block"
            style={{
              background: "rgba(8,18,40,0.88)",
              border: "1px solid rgba(14,206,206,0.35)",
              boxShadow: "0 0 40px rgba(14,206,206,0.2)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center gap-2 text-xs font-bold" style={{ color: "#5DECEC" }}>
              <Zap className="h-3.5 w-3.5" />
              AI Recommendation
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-white/70">
              Reassign 3 vehicles on Route 12 to reduce idle time by 18%.
            </p>
          </motion.div>

          {/* Safety score card */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="absolute -bottom-4 -left-4 hidden w-48 rounded-xl p-3 sm:block"
            style={{
              background: "rgba(8,18,40,0.88)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
              backdropFilter: "blur(16px)",
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Fleet Safety Score</p>
            <div className="mt-1.5 flex items-end gap-1">
              <span className="text-2xl font-bold text-white">87</span>
              <span className="mb-0.5 text-xs font-semibold text-emerald-400">▲ 4 pts this week</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "87%" }}
                transition={{ delay: 1.8, duration: 1 }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #0ECECE, #22D9D9)" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
