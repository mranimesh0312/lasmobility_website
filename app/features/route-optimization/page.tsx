"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Route, TrendingDown, Clock, Navigation, BarChart3, BrainCircuit,
  Truck, PackageCheck, Building2, ArrowRight, CalendarCheck, CheckCircle2,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: Navigation,   title: "Multi-Stop Optimisation",  description: "Automatically reorder stops to minimise total distance and travel time. The AI considers traffic windows, vehicle capacity, and delivery time slots." },
  { icon: TrendingDown, title: "Dead Mileage Reduction",   description: "Identify and eliminate empty return legs, overlapping routes, and inefficient vehicle assignments that inflate your per-delivery cost." },
  { icon: Clock,        title: "Live ETA Predictions",     description: "Real-time ETAs for every stop, updated as the vehicle moves. Customer-facing or internal — configurable by route type and fleet policy." },
  { icon: BarChart3,    title: "Route Efficiency Scoring", description: "Every route is scored against the optimal. Managers see which routes are running above planned cost and why, with actionable recommendations." },
  { icon: BrainCircuit, title: "AI Route Suggestions",     description: "The AI analyses historical traffic, fuel consumption, and stoppage patterns to suggest route adjustments before dispatch — not after." },
  { icon: Route,        title: "Planned vs Actual Comparison", description: "After each trip, compare the planned optimised route against what actually happened. Deviation analysis highlights recurring inefficiencies." },
];

const stats = [
  { value: "−24%", label: "Avg distance saved per route" },
  { value: "−18%", label: "Avg idle time reduction" },
  { value: "38 min", label: "Avg time saved per trip" },
  { value: "Real-time", label: "ETA updates as you drive" },
];

const useCases = [
  { icon: PackageCheck, industry: "Last-Mile Delivery",     description: "Sequence dozens of drops in the optimal order. Re-optimise mid-route when new orders arrive or stops change, reducing cost per parcel.", stat: "Cost per delivery reduced by 22%" },
  { icon: Truck,        industry: "Freight Distribution",   description: "Plan multi-depot, multi-vehicle dispatch with vehicle capacity constraints. Ensure every truck leaves full and follows the shortest viable route.", stat: "Fleet utilisation up 18%" },
  { icon: Building2,    industry: "Field Service",          description: "Dispatch technicians to the nearest open ticket, accounting for travel time and skill match. Fit more service calls into every working day.", stat: "20% more calls completed per day" },
];

// Before / after comparison chart
function BeforeAfterChart() {
  const metrics = [
    { label: "Distance",  before: 148, after: 112, unit: "km",  color: "#0ECECE" },
    { label: "Fuel",      before: 14.8, after: 10.6, unit: "L", color: "#22C55E" },
    { label: "Time",      before: 210, after: 172, unit: "min", color: "#F59E0B" },
  ];
  return (
    <div className="space-y-5">
      {metrics.map(({ label, before, after, unit, color }) => {
        const pct = Math.round(((before - after) / before) * 100);
        const max = before * 1.05;
        return (
          <div key={label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>{label}</span>
              <span className="text-xs font-bold" style={{ color: "#22C55E" }}>↓ {pct}% saved</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-12 text-right text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Before</span>
                <div className="flex-1 h-4 rounded overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="h-full rounded" style={{ width: `${(before / max) * 100}%`, background: "rgba(239,68,68,0.45)" }} />
                </div>
                <span className="w-16 text-[10px] font-mono" style={{ color: "rgba(239,68,68,0.8)" }}>{before} {unit}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-right text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>After</span>
                <div className="flex-1 h-4 rounded overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="h-full rounded" style={{ width: `${(after / max) * 100}%`, background: color, opacity: 0.75 }} />
                </div>
                <span className="w-16 text-[10px] font-mono" style={{ color }}>{after} {unit}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Weekly savings trend
function SavingsTrend() {
  const weeks = ["W1", "W2", "W3", "W4", "W5", "W6"];
  const savings = [8, 14, 19, 22, 24, 26]; // % saved each week
  const maxS = 30;
  return (
    <svg viewBox="0 0 300 120" className="w-full" aria-label="Weekly route savings trend">
      {[0, 15, 30].map((v) => {
        const y = 95 - (v / maxS) * 80;
        return <g key={v}>
          <text x="22" y={y + 4} fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="end">{v}%</text>
          <line x1="26" y1={y} x2="290" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </g>;
      })}
      <polyline
        points={savings.map((v, i) => `${38 + i * 48},${95 - (v / maxS) * 80}`).join(" ")}
        fill="none" stroke="url(#saveGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {savings.map((v, i) => (
        <g key={i}>
          <circle cx={38 + i * 48} cy={95 - (v / maxS) * 80} r="4" fill="#0ECECE" />
          <text x={38 + i * 48} y={95 - (v / maxS) * 80 - 8} fontSize="8" fill="rgba(14,206,206,0.8)" textAnchor="middle">{v}%</text>
          <text x={38 + i * 48} y="109" fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="middle">{weeks[i]}</text>
        </g>
      ))}
      <defs>
        <linearGradient id="saveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ECECE" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function RouteOptimizationPage() {
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
                <Route className="h-3.5 w-3.5" /> Route Optimisation
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Less distance. <span className="gradient-text">More deliveries.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility's AI analyses traffic patterns, stop sequences, and vehicle capacity to build the most efficient route before your drivers leave — and adapts in real time when conditions change.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Multi-stop AI ordering", "Live ETA updates", "Dead mileage elimination", "Planned vs actual analysis"].map((item) => (
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
                <div className="relative h-52 overflow-hidden" style={{ background: "#060E1A" }}>
                  <Image src="/module-optimization.svg" alt="Route optimisation module" fill className="object-cover object-top" priority />
                </div>
                <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "#060E1A", borderTop: "1px solid var(--border)" }}>
                  <Image src="/dashboard-route.jpeg" alt="Route optimisation dashboard" fill className="object-cover object-top" />
                  <div className="absolute inset-x-0 bottom-0 h-16" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.9), transparent)" }} />
                  <div className="absolute bottom-3 right-3 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md" style={{ background: "rgba(34,197,94,0.2)", border: "1px solid rgba(34,197,94,0.4)" }}>
                    ↓ 24% distance saved
                  </div>
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
          <SectionHeader eyebrow="Results" title="Route optimisation that compounds over time" description="The more trips LAS Mobility analyses, the better its AI gets at predicting the optimal sequence, traffic windows, and vehicle match for your specific routes." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Before vs After Optimisation</p>
              <p className="mt-1 mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Avg savings per route — 50-stop delivery run</p>
              <div className="rounded-xl p-4" style={{ background: "#060E1A" }}>
                <BeforeAfterChart />
              </div>
              <div className="mt-4 rounded-lg p-3" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}>
                <p className="text-xs font-semibold" style={{ color: "#22C55E" }}>Optimised stop sequence: Depot → 3 → 1 → 4 → 2 → HQ</p>
                <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>AI reordered stops to eliminate backtracking and cut road time</p>
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Savings Improvement — 6 Weeks</p>
              <p className="mt-1 mb-5 text-xs" style={{ color: "var(--text-muted)" }}>% distance saved vs unoptimised baseline, week by week</p>
              <div className="rounded-xl p-4" style={{ background: "#060E1A" }}>
                <SavingsTrend />
              </div>
              <div className="mt-4 rounded-lg p-3" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
                <p className="text-xs font-semibold" style={{ color: "var(--accent-text)" }}>
                  AI Insight — optimisation accuracy improves as the model learns your specific traffic and stop patterns over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Full-spectrum route intelligence" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => <FeatureCard key={cap.title} {...cap} />)}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Every km saved goes straight to margin" />
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
