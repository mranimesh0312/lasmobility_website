"use client";

import { motion } from "framer-motion";
import {
  Truck, AlertTriangle, Fuel, BatteryCharging, BrainCircuit,
  Route, TrendingUp, TrendingDown, Activity, Zap,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const vehicles = [
  { id: "TRK-18", driver: "Rahul S.", status: "Moving",  speed: "62 km/h", fuel: 78, left: "18%", top: "28%" },
  { id: "BUS-07", driver: "Meera P.", status: "Moving",  speed: "48 km/h", fuel: 54, left: "61%", top: "36%" },
  { id: "VAN-42", driver: "Arun K.", status: "Idle",    speed: "0 km/h",   fuel: 34, left: "76%", top: "68%" },
  { id: "CAR-11", driver: "Priya R.", status: "Moving",  speed: "55 km/h", fuel: 89, left: "38%", top: "63%" },
];

const metrics = [
  { icon: Route,         label: "Trips Today",    value: 1284, suffix: "",  trend: "+18%", up: true },
  { icon: AlertTriangle, label: "Risk Alerts",    value: 42,   suffix: "",  trend: "-8%",  up: false },
  { icon: Fuel,          label: "Fuel Saved",     value: 14,   suffix: "%", trend: "+3%",  up: true },
  { icon: BatteryCharging,label: "Device Health", value: 98,   suffix: "%", trend: "—",    up: true },
];

export default function LiveDashboardPreview() {
  return (
    <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>
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

        {/* Dashboard UI */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-12 overflow-hidden rounded-2xl"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
        >
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow)" }}>
                <Activity className="h-4 w-4" style={{ color: "var(--accent-text)" }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>LAS Mobility Command Center</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Live tracking · Alerts · AI insights</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: "rgba(34,197,94,0.1)", color: "#22C55E" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live fleet sync · Updated now
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.5fr_0.9fr]">
            {/* Map panel */}
            <div
              className="relative min-h-[380px] border-r"
              style={{
                background: "linear-gradient(135deg, #060E1A 0%, #0B1628 60%, #0D2040 100%)",
                borderColor: "var(--border)",
              }}
            >
              <div className="absolute inset-0 bg-grid opacity-30" />

              {/* SVG routes */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 680 430" fill="none" aria-hidden="true">
                <path className="map-line" d="M52 344C116 244 194 264 265 232C353 192 367 102 462 102C540 102 584 160 630 87" stroke="#0ECECE" strokeWidth="4.5" strokeLinecap="round" opacity="0.9" />
                <path d="M70 120C159 94 224 116 286 151C383 207 467 242 610 210" stroke="rgba(14,206,206,0.25)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M117 382C205 350 292 326 370 332C461 338 529 300 618 321" stroke="rgba(34,197,94,0.2)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>

              {/* Vehicle markers */}
              {vehicles.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: v.left, top: v.top }}
                >
                  <div
                    className="marker-pulse flex h-10 w-10 items-center justify-center rounded-full"
                    style={{
                      background: v.status === "Idle" ? "#F59E0B" : "var(--accent)",
                      boxShadow: `0 0 16px ${v.status === "Idle" ? "#F59E0B60" : "var(--accent-glow)"}`,
                    }}
                  >
                    <Truck className="h-4 w-4 text-white" />
                  </div>
                  <div
                    className="mt-1 rounded px-1.5 py-0.5 text-center text-[9px] font-bold"
                    style={{ background: "rgba(248,250,252,0.95)", color: "#0B1628" }}
                  >
                    {v.id}
                  </div>
                </motion.div>
              ))}

              {/* AI alert card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-4 left-4 w-72 rounded-xl p-3.5"
                style={{ background: "rgba(248,250,252,0.97)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-violet-500" />
                  <p className="text-xs font-bold text-slate-800">AI Action Recommended</p>
                </div>
                <p className="mt-1 text-[11px] leading-5 text-slate-600">Reassign VAN-42 (currently idle on Route 12) to reduce fleet idle time by 14%.</p>
              </motion.div>
            </div>

            {/* Metrics panel */}
            <div className="grid gap-0 divide-y divide-[var(--border)]">
              {metrics.map(({ icon: Icon, label, value, suffix, trend, up }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 px-5 py-4"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)" }}>
                    <Icon className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
                    <p className="mt-0.5 text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                      <AnimatedCounter value={value} suffix={suffix} />
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: up ? "#22C55E" : "#F59E0B" }}>
                    {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {trend}
                  </div>
                </motion.div>
              ))}

              {/* AI cell */}
              <div className="p-5" style={{ background: "var(--accent-glow)" }}>
                <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--accent-text)" }}>
                  <BrainCircuit className="h-4 w-4" />
                  AI Intelligence Active
                </div>
                <p className="mt-1.5 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>
                  Anomaly detection running across all 1,284 vehicles. 3 optimization suggestions ready.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
