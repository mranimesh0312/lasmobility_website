"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Route, History, BarChart3, MapPin, Clock, FileText,
  Truck, Building2, PackageCheck, ArrowRight, CalendarCheck, CheckCircle2,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: History,   title: "Full Trip Replay",        description: "Scrub through any completed trip on the map — second by second. Review exact routes, speeds at each point, and every stop made." },
  { icon: MapPin,    title: "Stoppage Analysis",        description: "Every pause over 2 minutes is logged with location, duration, and vehicle state. Identify unscheduled stops and excessive dwell times instantly." },
  { icon: BarChart3, title: "Distance & Duration Reports", description: "Per-vehicle, per-driver, and fleet-wide distance and time summaries. Filter by date range, branch, or vehicle group." },
  { icon: Clock,     title: "Planned vs Actual",        description: "Compare the intended route against the actual path taken. Deviation percentage, excess mileage, and timeline gaps are calculated automatically." },
  { icon: Route,     title: "Multi-Trip Overview",      description: "View all trips for a vehicle or driver across a day, week, or month in one timeline. Spot patterns across hundreds of trips at once." },
  { icon: FileText,  title: "Export-Ready Reports",     description: "Download trip reports as PDF or Excel. Include maps, stop lists, timestamps, and mileage for client billing, audits, or insurance." },
];

const stats = [
  { value: "90 days", label: "Trip history retained" },
  { value: "100%", label: "Trips automatically logged" },
  { value: "< 2 min", label: "Stop detection threshold" },
  { value: "PDF / XLS", label: "Export formats" },
];

const useCases = [
  { icon: Truck,        industry: "Freight & Logistics",   description: "Verify drivers followed designated routes. Identify stops at unauthorised locations and calculate exact billable kilometres per trip.", stat: "Proof of delivery in every report" },
  { icon: PackageCheck, industry: "Field Service Teams",   description: "Track technician routes to customer sites. Confirm visit durations, travel time between calls, and daily mileage automatically.", stat: "30% reduction in disputed service hours" },
  { icon: Building2,    industry: "Corporate Fleets",      description: "Generate monthly trip summaries per employee vehicle for reimbursement, tax records, and fleet utilisation benchmarking.", stat: "Mileage claims reconciled automatically" },
];

// Trip distance bar chart
function TripChart() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dist = [420, 380, 510, 290, 445, 180, 60];
  const trips = [14, 12, 16, 9, 15, 6, 2];
  const maxD = 550;
  return (
    <svg viewBox="0 0 340 150" className="w-full" aria-label="Daily distance chart">
      {[0, 200, 400].map((v) => {
        const y = 120 - (v / maxD) * 100;
        return (
          <g key={v}>
            <text x="28" y={y + 4} fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="end">{v}</text>
            <line x1="32" y1={y} x2="336" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </g>
        );
      })}
      {days.map((d, i) => {
        const x = 36 + i * 44;
        const h = (dist[i] / maxD) * 100;
        return (
          <g key={d}>
            <rect x={x} y={120 - h} width="28" height={h} rx="3" fill="url(#distGrad)" opacity={i === 5 || i === 6 ? 0.45 : 0.85} />
            <text x={x + 14} y="134" fontSize="8" fill="rgba(255,255,255,0.35)" textAnchor="middle">{d}</text>
            <text x={x + 14} y={120 - h - 4} fontSize="7" fill="rgba(14,206,206,0.7)" textAnchor="middle">{trips[i]}t</text>
          </g>
        );
      })}
      <text x="36" y="146" fontSize="8" fill="rgba(255,255,255,0.3)">Bars = km · Labels = trip count · Weekend shaded</text>
      <defs>
        <linearGradient id="distGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ECECE" />
          <stop offset="100%" stopColor="rgba(14,206,206,0.25)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Stoppage breakdown donut (simplified bars)
function StoppageChart() {
  const items = [
    { label: "Delivery stop",  pct: 48, color: "#0ECECE" },
    { label: "Traffic / wait", pct: 28, color: "#F59E0B" },
    { label: "Fuel stop",      pct: 14, color: "#22C55E" },
    { label: "Unscheduled",    pct: 10, color: "#EF4444" },
  ];
  return (
    <svg viewBox="0 0 300 120" className="w-full" aria-label="Stop type breakdown">
      {items.map(({ label, pct, color }, i) => (
        <g key={label} transform={`translate(0, ${i * 26})`}>
          <text x="0" y="14" fontSize="9" fill="rgba(255,255,255,0.6)">{label}</text>
          <rect x="110" y="4" width="160" height="12" rx="3" fill="rgba(255,255,255,0.05)" />
          <rect x="110" y="4" width={160 * pct / 100} height="12" rx="3" fill={color} opacity="0.75" />
          <text x="276" y="14" fontSize="9" fill={color} textAnchor="end">{pct}%</text>
        </g>
      ))}
    </svg>
  );
}

export default function RouteAnalyticsPage() {
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
                <Route className="h-3.5 w-3.5" /> Route Analytics
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Every trip tells <span className="gradient-text">a story</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility logs every trip automatically — route taken, stops made, distance covered, and time spent. Replay any journey, export any report, and surface the patterns that drive operational decisions.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Trip replay on map", "Stoppage detection", "Planned vs actual", "Export PDF & Excel"].map((item) => (
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
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid var(--border-accent)", boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(14,206,206,0.1)" }}>
                <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "#060E1A" }}>
                  <Image src="/dashboard-route.jpeg" alt="Route analytics dashboard" fill className="object-cover object-top" priority />
                  <div className="absolute inset-x-0 bottom-0 h-16" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.9), transparent)" }} />
                  <div className="absolute bottom-3 left-3 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md" style={{ background: "rgba(14,206,206,0.2)", border: "1px solid rgba(14,206,206,0.35)" }}>Route History</div>
                </div>
                <div className="relative h-36 overflow-hidden" style={{ background: "#060E1A", borderTop: "1px solid var(--border)" }}>
                  <Image src="/module-routes.svg" alt="Route module" fill className="object-cover object-top" />
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

      {/* Charts */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Analytics" title="From raw GPS to operational insight" description="Route Analytics turns thousands of location points into meaningful charts, summaries, and exportable reports your team can act on." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Daily Distance & Trip Count</p>
              <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>This week — all vehicles combined</p>
              <div className="mt-4 rounded-xl p-4" style={{ background: "#060E1A" }}>
                <TripChart />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[{ label: "Total km", value: "2,285" }, { label: "Total trips", value: "74" }, { label: "Avg km/trip", value: "30.9" }].map(({ label, value }) => (
                  <div key={label} className="rounded-lg p-3 text-center" style={{ background: "var(--bg-deep)", border: "1px solid var(--border)" }}>
                    <p className="text-lg font-bold" style={{ color: "var(--accent-text)" }}>{value}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Stop Type Breakdown</p>
              <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>Avg across all vehicles this month</p>
              <div className="mt-6 rounded-xl p-4" style={{ background: "#060E1A" }}>
                <StoppageChart />
              </div>
              <div className="mt-4 rounded-lg p-4" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <p className="text-xs font-semibold" style={{ color: "#EF4444" }}>10% unscheduled stops detected</p>
                <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>3 vehicles account for 70% of unscheduled stops — review route discipline</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Complete trip intelligence, out of the box" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => <FeatureCard key={cap.title} {...cap} />)}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Route analytics that drive real decisions" />
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
