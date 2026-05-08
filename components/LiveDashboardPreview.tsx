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
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll progress tracked over the full tall container
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Center image: starts zoomed in (1.45) and pulls back to 1.0
  const centerScale = useSpring(
    useTransform(scrollYProgress, [0, 0.65], [1.45, 1.0]),
    { stiffness: 55, damping: 22 }
  );

  // Side images: start more zoomed, pull back slightly later
  const sideScale = useSpring(
    useTransform(scrollYProgress, [0.05, 0.7], [1.3, 1.0]),
    { stiffness: 50, damping: 22 }
  );

  // Side images vertical parallax
  const leftY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["18%", "-8%"]),
    { stiffness: 45, damping: 20 }
  );
  const rightY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["26%", "-10%"]),
    { stiffness: 45, damping: 20 }
  );

  // Rounded corners relax as we zoom out (tight crop → framed screenshot)
  const centerRadius = useTransform(scrollYProgress, [0, 0.65], [32, 16]);

  // Overlay fades out as zoom completes
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.45, 0]);

  // Metrics & bottom content fade in after zoom is mostly done
  const bottomOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const bottomY = useTransform(scrollYProgress, [0.55, 0.85], [40, 0]);

  return (
    <>
      {/* ── Tall scroll container — pins the sticky section ── */}
      <div ref={scrollRef} style={{ height: "300vh", position: "relative", background: "var(--bg-deep)" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

          {/* Section header — always visible at top */}
          <div className="relative z-20 mx-auto max-w-7xl px-4 pt-16 text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
              <p className="mt-3 text-base" style={{ color: "var(--text-secondary)" }}>
                Give operations, safety, and management teams a shared live view of what&apos;s happening.
              </p>
            </motion.div>
          </div>

          {/* ── Image triptych — sticky zoom-out ── */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-4 px-4 pb-8 lg:gap-6 lg:px-8"
            style={{ top: "160px" }}
          >
            {/* Left — route history */}
            <motion.div
              className="relative hidden w-[26%] shrink-0 overflow-hidden lg:block"
              style={{
                y: leftY,
                scale: sideScale,
                aspectRatio: "16/10",
                borderRadius: 14,
                border: "1px solid var(--border)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
                marginBottom: "3rem",
                transformOrigin: "center bottom",
              }}
            >
              <Image
                src="/dashboard-route.jpeg"
                alt="Route history view"
                fill
                sizes="26vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0" style={{ borderRadius: 14, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }} />
              <div className="absolute bottom-3 left-3 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md"
                style={{ background: "rgba(14,206,206,0.22)", border: "1px solid rgba(14,206,206,0.35)" }}>
                Route History
              </div>
            </motion.div>

            {/* Center — main dashboard (hero/zoom-out focal point) */}
            <motion.div
              className="relative z-10 w-full shrink-0 overflow-hidden lg:w-[48%]"
              style={{
                scale: centerScale,
                borderRadius: centerRadius,
                aspectRatio: "16/10",
                border: "1px solid rgba(14,206,206,0.4)",
                boxShadow: "0 0 0 1px rgba(14,206,206,0.15), 0 40px 100px rgba(0,0,0,0.65), 0 0 80px rgba(14,206,206,0.14)",
                transformOrigin: "center bottom",
              }}
            >
              <Image
                src="/dashboard-main.jpeg"
                alt="LAS Mobility fleet command center dashboard"
                fill
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="object-cover object-top"
                priority
              />

              {/* Dark overlay that fades out as zoom completes */}
              <motion.div
                className="absolute inset-0"
                style={{ opacity: overlayOpacity, background: "rgba(4,9,26,0.6)", borderRadius: "inherit" }}
              />

              {/* Inner glow ring */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ borderRadius: "inherit", boxShadow: "inset 0 0 60px rgba(14,206,206,0.08)" }} />

              {/* Live badge */}
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
                style={{ background: "rgba(34,197,94,0.22)", border: "1px solid rgba(34,197,94,0.4)" }}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live · Real-time
              </div>

              {/* Bottom caption */}
              <div className="absolute inset-x-0 bottom-0 px-4 py-3"
                style={{ background: "linear-gradient(to top, rgba(4,9,26,0.88) 0%, transparent 100%)", borderBottomLeftRadius: "inherit", borderBottomRightRadius: "inherit" }}>
                <p className="text-sm font-semibold text-white">Fleet Command Center</p>
                <p className="text-xs" style={{ color: "rgba(14,206,206,0.9)" }}>AI-powered · 1,245 vehicles · Live sync</p>
              </div>
            </motion.div>

            {/* Right — live map */}
            <motion.div
              className="relative hidden w-[26%] shrink-0 overflow-hidden lg:block"
              style={{
                y: rightY,
                scale: sideScale,
                aspectRatio: "16/10",
                borderRadius: 14,
                border: "1px solid var(--border)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
                transformOrigin: "center bottom",
              }}
            >
              <Image
                src="/dashboard-live.jpeg"
                alt="Live map tracking view"
                fill
                sizes="26vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0" style={{ borderRadius: 14, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }} />
              <div className="absolute bottom-3 right-3 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md"
                style={{ background: "rgba(14,206,206,0.22)", border: "1px solid rgba(14,206,206,0.35)" }}>
                Live Map
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── Metrics + AI strip — below the sticky scroll zone ── */}
      <div style={{ background: "var(--bg-deep)" }}>
        <motion.div
          style={{ opacity: bottomOpacity, y: bottomY }}
          className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {metrics.map(({ icon: Icon, label, value, suffix, trend, up }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i }}
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
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl px-5 py-4"
            style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
            <BrainCircuit className="h-5 w-5 shrink-0" style={{ color: "var(--accent-text)" }} />
            <p className="text-sm font-bold" style={{ color: "var(--accent-text)" }}>AI Intelligence Active</p>
            <p className="hidden text-xs sm:block" style={{ color: "var(--text-secondary)" }}>
              Anomaly detection running across all 1,284 vehicles · 3 optimization suggestions ready
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
