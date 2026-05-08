"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Route, AlertTriangle, Fuel, BatteryCharging,
  TrendingUp, TrendingDown, BrainCircuit,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const metrics = [
  { icon: Route,           label: "Trips Today",   value: 1284, suffix: "",  trend: "+18%", up: true  },
  { icon: AlertTriangle,   label: "Risk Alerts",   value: 42,   suffix: "",  trend: "-8%",  up: false },
  { icon: Fuel,            label: "Fuel Saved",    value: 14,   suffix: "%", trend: "+3%",  up: true  },
  { icon: BatteryCharging, label: "Device Health", value: 98,   suffix: "%", trend: "—",    up: true  },
];

const images = [
  {
    id: "route",
    src: "/dashboard-route.jpeg",
    alt: "Route history view",
    label: "Route History",
    labelAlign: "left" as const,
  },
  {
    id: "main",
    src: "/dashboard-main.jpeg",
    alt: "Fleet command center dashboard",
    label: "Fleet Command Center",
    labelAlign: "left" as const,
    badge: true,
  },
  {
    id: "live",
    src: "/dashboard-live.jpeg",
    alt: "Live map tracking",
    label: "Live Map",
    labelAlign: "right" as const,
  },
];

function getScale(id: string, hovered: string | null) {
  if (!hovered) return 1;
  if (id === hovered) return 1.07;
  return 0.96;
}

function getShadow(id: string, hovered: string | null) {
  if (id !== hovered) return undefined;
  if (id === "main") return "0 0 0 1px rgba(14,206,206,0.5), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(14,206,206,0.18)";
  return "0 24px 60px rgba(0,0,0,0.5), 0 0 30px rgba(14,206,206,0.12)";
}

export default function LiveDashboardPreview() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header — always fully visible */}
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

        {/* Image triptych — hover to zoom */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-12 flex items-end justify-center gap-3 lg:gap-4"
        >
          {images.map(({ id, src, alt, label, labelAlign, badge }, idx) => {
            const isCenter = id === "main";
            const scale = getScale(id, hovered);
            const shadow = getShadow(id, hovered);

            return (
              <motion.div
                key={id}
                animate={{ scale, zIndex: hovered === id ? 10 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                onHoverStart={() => setHovered(id)}
                onHoverEnd={() => setHovered(null)}
                className={`relative shrink-0 cursor-pointer overflow-hidden ${
                  isCenter ? "w-full lg:w-[46%]" : "hidden w-[27%] lg:block"
                }`}
                style={{
                  aspectRatio: "16/10",
                  borderRadius: isCenter ? 18 : 14,
                  border: isCenter
                    ? "1px solid rgba(14,206,206,0.35)"
                    : "1px solid var(--border)",
                  boxShadow: shadow ?? (isCenter
                    ? "0 0 0 1px rgba(14,206,206,0.10), 0 24px 64px rgba(0,0,0,0.45)"
                    : "0 16px 48px rgba(0,0,0,0.30)"),
                  marginBottom: isCenter ? 0 : idx === 0 ? "2rem" : "1rem",
                  transformOrigin: isCenter ? "center bottom" : idx === 0 ? "right bottom" : "left bottom",
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes={isCenter ? "(min-width: 1024px) 46vw, 92vw" : "27vw"}
                  className="object-cover object-top transition-transform duration-700"
                  style={{ transform: hovered === id ? "scale(1.04)" : "scale(1)" }}
                  priority={isCenter}
                />

                {/* Inner scrim */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(4,9,26,0.82) 0%, transparent 55%)",
                    borderRadius: "inherit",
                  }}
                />

                {/* Live badge (center only) */}
                {badge && (
                  <div
                    className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
                    style={{ background: "rgba(34,197,94,0.22)", border: "1px solid rgba(34,197,94,0.4)" }}
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live · Real-time
                  </div>
                )}

                {/* Bottom label */}
                <div
                  className={`absolute bottom-3 ${labelAlign === "right" ? "right-3" : "left-3"} rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md`}
                  style={{ background: "rgba(14,206,206,0.20)", border: "1px solid rgba(14,206,206,0.35)" }}
                >
                  {label}
                </div>

                {/* Hover glow ring */}
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  animate={{ opacity: hovered === id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    borderRadius: "inherit",
                    boxShadow: isCenter
                      ? "inset 0 0 0 1.5px rgba(14,206,206,0.5)"
                      : "inset 0 0 0 1px rgba(14,206,206,0.4)",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {metrics.map(({ icon: Icon, label, value, suffix, trend, up }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i }}
              className="flex items-center gap-3 rounded-xl p-4"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)" }}>
                <Icon className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
                <p className="mt-0.5 text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  <AnimatedCounter value={value} suffix={suffix} />
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1 text-xs font-semibold" style={{ color: up ? "#22C55E" : "#F59E0B" }}>
                {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {trend}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* AI strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
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
