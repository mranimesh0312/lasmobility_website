"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Map, Wifi, Navigation, Activity, BellRing, Shield,
  Truck, School, Building2, ArrowRight, CalendarCheck, CheckCircle2,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: Map,        title: "Live Map View",          description: "See every vehicle's position on an interactive map. Colour-coded markers show running, idle, and stopped states at a glance." },
  { icon: Wifi,       title: "30-Second Updates",      description: "Position, speed, heading, and ignition state refreshed every 30 seconds. No manual refresh required — the dashboard stays current automatically." },
  { icon: Navigation, title: "Vehicle Status Drill-Down", description: "Click any marker to see speed, engine state, driver, last stop, current address, and live telemetry — all in one panel." },
  { icon: Activity,   title: "Ignition & Motion Events", description: "Track every engine start, stop, and movement event in a live timeline. Know instantly when a vehicle leaves a location or goes off-route." },
  { icon: BellRing,   title: "Live Alert Overlay",     description: "Speed violations, geofence breaches, and device disconnections appear as real-time overlays on the map without switching screens." },
  { icon: Shield,     title: "Playback & History",     description: "Replay any vehicle's movement from any date. Scrub through the timeline to review stops, diversions, and route deviations frame by frame." },
];

const stats = [
  { value: "30 sec", label: "Position update interval" },
  { value: "99.9%", label: "Platform uptime SLA" },
  { value: "< 5 m", label: "GPS positional accuracy" },
  { value: "90 days", label: "History retained" },
];

const useCases = [
  { icon: Truck,     industry: "Logistics & Freight",  description: "Track every truck across highway and last-mile routes. Know exactly where each delivery is, in real time, without calling the driver.", stat: "Dispatch response time cut by 40%" },
  { icon: School,    industry: "School Transport",      description: "Show parents and administrators live bus positions. Know the moment a bus reaches or leaves each stop, automatically.", stat: "Parent trust score: 4.9/5" },
  { icon: Building2, industry: "Enterprise Fleet",      description: "Centralise visibility across branches and cities. Operations teams see the full fleet on a single map, regardless of size.", stat: "Full visibility across 1,000+ vehicles" },
];

// Inline SVG chart — vehicle activity over 24h
function ActivityChart() {
  const hours = ["00", "03", "06", "09", "12", "15", "18", "21"];
  const running  = [2, 1, 8, 38, 42, 40, 28, 12];
  const idle     = [1, 0, 3, 6,  8,  6,  4,  3];
  const maxVal = 50;
  const barW = 22, gap = 12, startX = 40;

  return (
    <svg viewBox="0 0 360 160" className="w-full" aria-label="Vehicle activity by hour">
      {/* Y-axis labels */}
      {[0, 25, 50].map((v) => {
        const y = 130 - (v / maxVal) * 110;
        return (
          <g key={v}>
            <text x="30" y={y + 4} fontSize="9" fill="rgba(255,255,255,0.3)" textAnchor="end">{v}</text>
            <line x1="36" y1={y} x2="354" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </g>
        );
      })}
      {hours.map((h, i) => {
        const x = startX + i * (barW + gap);
        const rH = (running[i] / maxVal) * 110;
        const iH = (idle[i] / maxVal) * 110;
        return (
          <g key={h}>
            {/* Running bar */}
            <rect x={x} y={130 - rH} width={barW * 0.6} height={rH} rx="2" fill="url(#runGrad)" opacity="0.9" />
            {/* Idle bar */}
            <rect x={x + barW * 0.6 + 2} y={130 - iH} width={barW * 0.35} height={iH} rx="2" fill="#F59E0B" opacity="0.55" />
            <text x={x + barW * 0.4} y="146" fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="middle">{h}h</text>
          </g>
        );
      })}
      {/* Legend */}
      <rect x="40" y="154" width="10" height="4" rx="1" fill="url(#runGrad)" />
      <text x="54" y="158" fontSize="8" fill="rgba(255,255,255,0.45)">Running</text>
      <rect x="110" y="154" width="10" height="4" rx="1" fill="#F59E0B" opacity="0.6" />
      <text x="124" y="158" fontSize="8" fill="rgba(255,255,255,0.45)">Idle</text>
      <defs>
        <linearGradient id="runGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ECECE" />
          <stop offset="100%" stopColor="rgba(14,206,206,0.3)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function LiveTrackingPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(14,206,206,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>
                <Map className="h-3.5 w-3.5" /> Live Tracking
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Every vehicle. <span className="gradient-text">Right now.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility puts every vehicle on a live map updated every 30 seconds. Know position, speed, ignition state, and driver — without calling anyone.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Live map with 30-sec refresh", "Ignition & motion events", "Geofence overlays", "90-day replay history"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm">
                  <CalendarCheck className="h-4 w-4" /> Book a Demo
                </Link>
                <Link href="/features" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>
                  All Features <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            {/* Dashboard image */}
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid var(--border-accent)", boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(14,206,206,0.12)" }}>
                <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "#060E1A" }}>
                  <Image src="/dashboard-live.jpeg" alt="Live fleet tracking dashboard" fill className="object-cover object-top" priority />
                  <div className="absolute inset-x-0 bottom-0 h-16" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.9), transparent)" }} />
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md" style={{ background: "rgba(34,197,94,0.22)", border: "1px solid rgba(34,197,94,0.4)" }}>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live · Real-time
                  </div>
                </div>
                {/* Module SVG */}
                <div className="relative h-40 overflow-hidden" style={{ background: "#060E1A", borderTop: "1px solid var(--border)" }}>
                  <Image src="/module-tracking.svg" alt="Tracking module" fill className="object-cover object-top" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            {stats.map(({ value, label }, i) => (
              <div key={label} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "var(--accent-text)" }}>{value}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity chart */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Fleet activity" title="See when your fleet is working — and when it isn't" description="The live tracking dashboard aggregates vehicle states across your entire fleet into a single activity view, updated in real time." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Vehicle Activity — Today</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Running vs Idle count by hour</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold" style={{ background: "rgba(34,197,94,0.1)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.3)" }}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live updating
              </div>
            </div>
            <div className="px-2 pt-2" style={{ background: "#060E1A", borderRadius: 12 }}>
              <ActivityChart />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[{ label: "Currently running", value: "42", color: "#0ECECE" }, { label: "Idle", value: "8", color: "#F59E0B" }, { label: "Stopped", value: "3", color: "#EF4444" }].map(({ label, value, color }) => (
                <div key={label} className="rounded-lg p-3 text-center" style={{ background: "var(--bg-deep)", border: "1px solid var(--border)" }}>
                  <p className="text-2xl font-bold" style={{ color }}>{value}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Everything live tracking does for your team" description="From raw GPS to fleet-wide intelligence — live tracking is the foundation every other LAS Mobility feature is built on." />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => <FeatureCard key={cap.title} {...cap} />)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="How it works" title="From device to dashboard in seconds" />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { step: "01", title: "GPS device installed", body: "A LAS GPS device is fitted to the vehicle's OBD port or hardwired to the power supply. Setup takes under 30 minutes." },
              { step: "02", title: "Position transmitted", body: "Device sends location, speed, heading, and ignition state to LAS servers every 30 seconds over 4G/2G cellular." },
              { step: "03", title: "Map updates live", body: "Your fleet dashboard updates the vehicle marker automatically. No page refresh — the map stays current as vehicles move." },
              { step: "04", title: "Alerts & history", body: "Threshold breaches trigger instant notifications. All positions are stored for 90 days of trip replay and analytics." },
            ].map(({ step, title, body }) => (
              <div key={step} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <span className="text-4xl font-bold" style={{ color: "var(--accent-text)", opacity: 0.35 }}>{step}</span>
                <h3 className="mt-3 text-base font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Live tracking across every industry" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ icon: Icon, industry, description, stat }) => (
              <div key={industry} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)" }}>
                  <Icon className="h-6 w-6" style={{ color: "var(--accent-text)" }} />
                </div>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>{industry}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{description}</p>
                <p className="mt-4 text-xs font-bold" style={{ color: "var(--accent-text)" }}>{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
