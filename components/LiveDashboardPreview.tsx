"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  Route,
  AlertTriangle,
  Fuel,
  BatteryCharging,
  TrendingUp,
  TrendingDown,
  BrainCircuit,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const metrics = [
  { icon: Route,          label: "Trips Today",    value: 1284, suffix: "",  trend: "+18%", up: true },
  { icon: AlertTriangle,  label: "Risk Alerts",    value: 42,   suffix: "",  trend: "-8%",  up: false },
  { icon: Fuel,           label: "Fuel Saved",     value: 14,   suffix: "%", trend: "+3%",  up: true },
  { icon: BatteryCharging,label: "Device Health",  value: 98,   suffix: "%", trend: "—",    up: true },
];


export default function LiveDashboardPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const centerY = useSpring(useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]), { stiffness: 50, damping: 18 });
  const centerScale = useSpring(useTransform(scrollYProgress, [0, 0.45, 1], [0.94, 1.04, 0.98]), { stiffness: 50, damping: 18 });
  const leftY = useSpring(useTransform(scrollYProgress, [0, 1], ["12%", "-2%"]), { stiffness: 45, damping: 18 });
  const rightY = useSpring(useTransform(scrollYProgress, [0, 1], ["18%", "-4%"]), { stiffness: 45, damping: 18 });

  return (
    <section ref={sectionRef} className="section-pad overflow-hidden" style={{ background: "var(--bg-deep)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span
            className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}
          >
            Dashboard Preview
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            Designed for daily{" "}
            <span className="gradient-text">fleet command</span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>
            Give operations, safety, and management teams a shared live view of what&apos;s happening and what needs attention next.
          </p>
        </motion.div>

        {/* Parallax image showcase */}
        <div className="relative mt-16 flex items-start justify-center gap-4 lg:gap-6">

          {/* Left flanking image — route history */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="relative hidden w-[28%] shrink-0 overflow-hidden rounded-xl shadow-2xl lg:block"
            style={{
              y: leftY,
              aspectRatio: "16/10",
              border: "1px solid var(--border)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
              marginTop: "5rem",
            }}
          >
            <Image
              src="/dashboard-route.jpeg"
              alt="Route history view on LAS Mobility dashboard"
              fill
              sizes="28vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
            {/* Label badge */}
            <div className="absolute bottom-3 left-3 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md" style={{ background: "rgba(14,206,206,0.22)", border: "1px solid rgba(14,206,206,0.35)" }}>
              Route History
            </div>
          </motion.div>

          {/* Center hero image — main dashboard (center of attraction) */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative z-10 w-full shrink-0 overflow-hidden rounded-2xl lg:w-[46%]"
            style={{
              y: centerY,
              scale: centerScale,
              aspectRatio: "16/10",
              border: "1px solid rgba(14,206,206,0.35)",
              boxShadow: "0 0 0 1px rgba(14,206,206,0.15), 0 32px 80px rgba(0,0,0,0.55), 0 0 60px rgba(14,206,206,0.12)",
            }}
          >
            {/* Glow ring */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl"
              style={{ boxShadow: "inset 0 0 40px rgba(14,206,206,0.08)" }}
            />
            <Image
              src="/dashboard-main.jpeg"
              alt="LAS Mobility main fleet command center dashboard"
              fill
              sizes="(min-width: 1024px) 46vw, 90vw"
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />

            {/* Live badge */}
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md" style={{ background: "rgba(34,197,94,0.22)", border: "1px solid rgba(34,197,94,0.4)" }}>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live · Real-time
            </div>

            {/* Bottom label */}
            <div className="absolute inset-x-0 bottom-0 rounded-b-2xl px-4 py-3" style={{ background: "linear-gradient(to top, rgba(4,9,26,0.85) 0%, transparent 100%)" }}>
              <p className="text-sm font-semibold text-white">Fleet Command Center</p>
              <p className="text-xs" style={{ color: "rgba(14,206,206,0.9)" }}>AI-powered · 1,245 vehicles · Live sync</p>
            </div>
          </motion.div>

          {/* Right flanking image — live map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.35 }}
            className="relative hidden w-[28%] shrink-0 overflow-hidden rounded-xl shadow-2xl lg:block"
            style={{
              y: rightY,
              aspectRatio: "16/10",
              border: "1px solid var(--border)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
              marginTop: "2.5rem",
            }}
          >
            <Image
              src="/dashboard-live.jpeg"
              alt="Live map tracking on LAS Mobility dashboard"
              fill
              sizes="28vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
            {/* Label badge */}
            <div className="absolute bottom-3 right-3 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md" style={{ background: "rgba(14,206,206,0.22)", border: "1px solid rgba(14,206,206,0.35)" }}>
              Live Map
            </div>
          </motion.div>
        </div>

        {/* Metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {metrics.map(({ icon: Icon, label, value, suffix, trend, up }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="flex items-center gap-3 rounded-xl p-4"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)" }}>
                <Icon className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
                <p className="mt-0.5 text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  <AnimatedCounter value={value} suffix={suffix} />
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold shrink-0" style={{ color: up ? "#22C55E" : "#F59E0B" }}>
                {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {trend}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Intelligence strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex items-center gap-3 rounded-xl px-5 py-4"
          style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}
        >
          <BrainCircuit className="h-5 w-5 shrink-0" style={{ color: "var(--accent-text)" }} />
          <p className="text-sm font-bold" style={{ color: "var(--accent-text)" }}>AI Intelligence Active</p>
          <p className="hidden text-xs sm:block" style={{ color: "var(--text-secondary)" }}>
            Anomaly detection running across all 1,284 vehicles · 3 optimization suggestions ready
          </p>
        </motion.div>

      </div>
    </section>
  );
}
