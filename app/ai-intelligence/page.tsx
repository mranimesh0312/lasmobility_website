"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BrainCircuit, ChartNoAxesCombined, Gauge, MessageSquareText,
  ShieldCheck, Sparkles, Wrench, Route, BarChart3, TrendingDown,
  CheckCircle2, ArrowRight, CalendarCheck,
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import LiveDashboardPreview from "@/components/LiveDashboardPreview";

const aiFeatures = [
  { icon: ShieldCheck,         title: "Driver Risk Scoring",          description: "Combine overspeeding, harsh braking, acceleration patterns, and event frequency into practical, actionable risk indicators." },
  { icon: BrainCircuit,        title: "Fleet Anomaly Detection",      description: "Detect unusual fuel variance, route deviation, idle spikes, connectivity gaps, or vehicle behavior that deserves immediate attention." },
  { icon: Gauge,               title: "Fuel Efficiency Insights",     description: "Highlight the vehicles, routes, and driving behaviors most likely to affect fuel efficiency and avoidable operational cost." },
  { icon: Wrench,              title: "Predictive Maintenance",       description: "Prepare fleets for maintenance intelligence by organizing usage, activity, device health, and performance signals." },
  { icon: MessageSquareText,   title: "Natural Language Insights",    description: "Ask questions about fleet trends, safety events, utilization, and exceptions in plain business language and get instant answers." },
  { icon: ChartNoAxesCombined, title: "Operational Recommendations", description: "Prioritize actions that can improve safety, reduce idle time, optimize utilization, and strengthen route discipline." },
];

function AccuracyChart() {
  const weeks = ["W1","W2","W3","W4","W5","W6","W7","W8"];
  const vals = [62, 69, 74, 79, 83, 87, 91, 94];
  const maxV = 100;
  const pts = vals.map((v,i) => `${36+i*38},${90-(v/maxV)*70}`).join(" ");
  return (
    <svg viewBox="0 0 340 120" className="w-full" aria-label="AI prediction accuracy over time">
      {[0,50,100].map(v => { const y = 90-(v/maxV)*70; return <g key={v}><text x="28" y={y+4} fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="end">{v}%</text><line x1="32" y1={y} x2="330" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/></g>; })}
      <polyline points={pts} fill="none" stroke="url(#aiGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {vals.map((v,i) => <g key={i}><circle cx={36+i*38} cy={90-(v/maxV)*70} r="3.5" fill="#8B5CF6"/><text x={36+i*38} y={90-(v/maxV)*70-8} fontSize="7.5" fill="rgba(139,92,246,0.85)" textAnchor="middle">{v}%</text><text x={36+i*38} y="106" fontSize="7.5" fill="rgba(255,255,255,0.3)" textAnchor="middle">{weeks[i]}</text></g>)}
      <defs><linearGradient id="aiGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5"/><stop offset="100%" stopColor="#0ECECE"/></linearGradient></defs>
    </svg>
  );
}

export default function AIIntelligencePage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 70% 20%, rgba(139,92,246,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid rgba(139,92,246,0.4)", color: "#8B5CF6", background: "rgba(139,92,246,0.1)" }}>
            <BrainCircuit className="h-3.5 w-3.5" /> AI Intelligence
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--text-primary)" }}>
            The intelligence layer for <span className="gradient-text">modern fleet operations</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
            LAS Mobility positions AI where it matters most — surfacing risks, explaining patterns, detecting anomalies, and helping operations teams choose the next best action.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
            <Link href="/features" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>Explore Features <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            {[{ v:"94%", l:"AI prediction accuracy at 8 weeks" }, { v:"6", l:"AI capability modules" }, { v:"Real-time", l:"Anomaly detection" }, { v:"Plain language", l:"Natural language insights" }].map(({v,l},i) => (
              <div key={l} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "#8B5CF6" }}>{v}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From dashboards to decisions */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid rgba(139,92,246,0.3)" }}>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(139,92,246,0.12)" }}>
                <Sparkles className="h-6 w-6" style={{ color: "#8B5CF6" }} />
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>From dashboards to decisions</h2>
                <p className="mt-2 leading-7" style={{ color: "var(--text-secondary)" }}>
                  Fleet teams already collect thousands of signals. LAS Mobility converts those signals into focused insight, so managers can see what changed, why it matters, and what to review next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Six AI capabilities in one platform" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiFeatures.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* Route Intelligence */}
      <section id="route" className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid rgba(139,92,246,0.4)", color: "#8B5CF6", background: "rgba(139,92,246,0.1)" }}>
                <Route className="h-3.5 w-3.5" /> Route Intelligence
              </span>
              <h2 className="mt-4 text-3xl font-bold" style={{ color: "var(--text-primary)" }}>AI that builds better routes every week</h2>
              <p className="mt-4 leading-7" style={{ color: "var(--text-secondary)" }}>
                Route Intelligence analyses historical traffic patterns, stop sequences, and vehicle capacity to suggest optimised routes before dispatch — not after. The more trips it analyses, the more accurate it gets.
              </p>
              <ul className="mt-6 space-y-3">
                {["Multi-stop AI sequencing with traffic awareness", "Planned vs actual deviation scoring per trip", "Dead mileage identification and elimination", "Fuel consumption pattern analysis per route"].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#8B5CF6" }} /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/features/route-optimization" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-70" style={{ color: "#8B5CF6" }}>
                See Route Optimisation feature <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid rgba(139,92,246,0.2)" }}>
              <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>AI prediction accuracy — improving week on week</p>
              <p className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>Route efficiency prediction vs actual outcome</p>
              <div className="rounded-xl p-4" style={{ background: "#060E1A" }}><AccuracyChart /></div>
              <div className="mt-4 rounded-lg p-3" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
                <p className="text-xs font-semibold" style={{ color: "#8B5CF6" }}>94% accuracy by week 8 — improves as the model learns your routes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Intelligence */}
      <section id="drivers" className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Driver Intelligence" title="AI-powered driver risk scoring" description="LAS Mobility builds a composite risk profile for every driver — combining event frequency, severity, and improvement trend — updated after every trip." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Risk Score", desc: "Each driver gets a 0–100 score combining harsh events, overspeed frequency, and improvement trend.", color: "#22C55E" },
              { icon: TrendingDown, title: "Trend Analysis", desc: "Compare a driver's current week score against their rolling 30-day average to spot improvement or decline.", color: "#F59E0B" },
              { icon: MessageSquareText, title: "Coaching Prompts", desc: "AI surfaces the specific behaviours driving poor scores so managers can have targeted coaching conversations.", color: "#8B5CF6" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${color}18`, border: `1px solid ${color}35` }}>
                  <Icon className="h-5 w-5" style={{ color }} />
                </span>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/features/driver-safety" className="inline-flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-70" style={{ color: "#8B5CF6" }}>
              Explore Driver Safety feature <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Fleet Analytics */}
      <section id="analytics" className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Fleet Analytics" title="Predictive performance intelligence" description="LAS Mobility goes beyond reporting. The analytics layer identifies patterns that predict future problems — giving operations teams a head start on cost, safety, and utilisation." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BarChart3,    title: "Utilisation Trends",    desc: "See which vehicles are over- or under-utilised before the imbalance costs money.", color: "var(--accent-text)" },
              { icon: Gauge,        title: "Fuel Anomaly Flags",    desc: "Surface unexpected fuel consumption spikes that may indicate theft, idling, or mechanical issues.", color: "#F59E0B" },
              { icon: BrainCircuit, title: "Anomaly Detection",     desc: "AI flags unusual patterns across routes, stops, and device connectivity before they become incidents.", color: "#8B5CF6" },
              { icon: Wrench,       title: "Maintenance Signals",   desc: "Usage patterns and mileage data help predict which vehicles need servicing before breakdowns occur.", color: "#EF4444" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow)" }}>
                  <Icon className="h-4.5 w-4.5" style={{ color }} />
                </span>
                <h3 className="mt-3 text-sm font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="mt-1.5 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible AI note */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Responsible intelligence"
            title="AI that supports operational judgment"
            description="LAS Mobility is designed to make fleet teams faster and better informed, with human decision-makers staying in control of safety, compliance, maintenance, and business action."
          />
        </div>
      </section>

      <LiveDashboardPreview />
      <CTASection />
    </>
  );
}
