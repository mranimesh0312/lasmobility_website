"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldAlert, Activity, TrendingDown, Award, BellRing, BarChart3,
  Truck, School, Building2, ArrowRight, CalendarCheck, CheckCircle2,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: Activity,    title: "Harsh Event Detection",  description: "Automatically log harsh braking, harsh acceleration, and sharp cornering events with GPS location, speed, and timestamp for every occurrence." },
  { icon: TrendingDown,title: "Overspeeding Monitoring", description: "Detect and record every speed limit violation. Configurable thresholds per vehicle type — cars, trucks, and buses can have different limits." },
  { icon: Award,       title: "Driver Safety Scores",   description: "Each driver receives a composite safety score combining event frequency, severity, and improvement trend. Updated after every trip." },
  { icon: BarChart3,   title: "Fleet Safety Benchmarks", description: "Compare safety scores across drivers, vehicle groups, and branches. Identify outliers and the specific behaviours driving poor scores." },
  { icon: BellRing,    title: "Real-Time Safety Alerts", description: "Managers receive instant notifications for high-severity events — harsh braking above threshold, extreme overspeed, or rollover risk triggers." },
  { icon: ShieldAlert, title: "Coaching & Improvement", description: "Use event reports and score trends to structure driver coaching sessions. Measure improvement over time with before/after comparisons." },
];

const stats = [
  { value: "−35%", label: "Avg harsh event reduction" },
  { value: "0–100", label: "Driver safety score range" },
  { value: "< 10 sec", label: "Event alert delivery" },
  { value: "Every trip", label: "Score automatically updated" },
];

const useCases = [
  { icon: Truck,     industry: "Long-Haul Freight",   description: "Monitor driver behaviour across thousands of kilometres of highway. Catch fatigue-linked harsh braking patterns before they cause incidents.", stat: "Accident rate reduced by 40%" },
  { icon: School,    industry: "School Transport",     description: "Parents and administrators expect zero-compromise safety. Driver scores give fleet managers early warning of behaviour that needs correction.", stat: "Safety compliance score: 98%" },
  { icon: Building2, industry: "Insurance Optimisation", description: "Fleets with documented safety improvement programmes unlock lower insurance premiums. LAS Mobility provides the evidence insurers require.", stat: "Up to 20% insurance reduction" },
];

// Safety score gauge chart (SVG)
function SafetyGauge({ score, label, color }: { score: number; label: string; color: string }) {
  const r = 40, cx = 55, cy = 55;
  const circ = Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg viewBox="0 0 110 70" className="w-full max-w-[130px]" aria-label={`${label} safety score ${score}`}>
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" strokeLinecap="round" />
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`} opacity="0.85" />
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="18" fontWeight="700" fill={color}>{score}</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.45)">{label}</text>
    </svg>
  );
}

// Event trend line
function EventTrendChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const harsh  = [48, 42, 38, 31, 27, 18];
  const speed  = [62, 55, 50, 44, 38, 28];
  const maxV = 70;
  const pts = (arr: number[]) => arr.map((v, i) => `${30 + i * 50},${110 - (v / maxV) * 80}`).join(" ");
  return (
    <svg viewBox="0 0 330 130" className="w-full" aria-label="Safety event trend">
      {[0, 35, 70].map((v) => {
        const y = 110 - (v / maxV) * 80;
        return <g key={v}>
          <text x="22" y={y + 4} fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="end">{v}</text>
          <line x1="26" y1={y} x2="326" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </g>;
      })}
      <polyline points={pts(harsh)} fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={pts(speed)} fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {months.map((m, i) => <text key={m} x={30 + i * 50} y="124" fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="middle">{m}</text>)}
      <rect x="30" y="8" width="10" height="3" rx="1" fill="#EF4444" opacity="0.8" />
      <text x="44" y="12" fontSize="8" fill="rgba(255,255,255,0.45)">Harsh events</text>
      <rect x="120" y="8" width="10" height="3" rx="1" fill="#F59E0B" opacity="0.8" />
      <text x="134" y="12" fontSize="8" fill="rgba(255,255,255,0.45)">Overspeed events</text>
    </svg>
  );
}

export default function DriverSafetyPage() {
  const drivers = [
    { name: "Rajesh K.",  score: 94, color: "#22C55E" },
    { name: "Suresh M.",  score: 78, color: "#F59E0B" },
    { name: "Anita P.",   score: 87, color: "#0ECECE" },
    { name: "Vikram S.",  score: 61, color: "#EF4444" },
  ];
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
                <ShieldAlert className="h-3.5 w-3.5" /> Driver Safety
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Safer drivers. <span className="gradient-text">Lower risk.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility scores every driver on every trip — harsh braking, acceleration, cornering, and overspeed — giving managers the data to coach, recognise, and hold drivers accountable before incidents happen.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Harsh event detection", "0–100 safety scores", "Real-time alerts", "Coaching reports"].map((item) => (
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
                  <Image src="/module-safety.svg" alt="Driver safety module" fill className="object-cover object-top" priority />
                </div>
                <div className="p-5" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
                  <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>Fleet Safety Score — This Week</p>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {drivers.map(({ name, score, color }) => (
                      <div key={name} className="flex flex-col items-center">
                        <SafetyGauge score={score} label={name.split(" ")[0]} color={color} />
                      </div>
                    ))}
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

      {/* Event trend chart */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Trend analysis" title="Safety improvement is measurable" description="Fleets using LAS Mobility driver safety monitoring see consistent reductions in harsh events and overspeeding within 60 days of deployment." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Safety Events — 6 Month Trend</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Fleet-wide harsh events and overspeed incidents per month</p>
              </div>
              <div className="rounded-lg px-3 py-1.5 text-xs font-semibold" style={{ background: "rgba(34,197,94,0.1)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.3)" }}>
                ↓ 63% improvement
              </div>
            </div>
            <div className="rounded-xl p-4" style={{ background: "#060E1A" }}>
              <EventTrendChart />
            </div>
            <div className="mt-4 rounded-lg p-4" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
              <p className="text-xs font-semibold" style={{ color: "var(--accent-text)" }}>
                AI Insight — Harsh events drop fastest in the first 30 days after drivers are informed their trips are scored.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Every dimension of driver safety, tracked" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => <FeatureCard key={cap.title} {...cap} />)}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Safety that protects people and the bottom line" />
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
