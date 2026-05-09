"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { UsersRound, Navigation, Clock, FileBarChart, Star, LayoutDashboard, FileText, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: Navigation,     title: "Live Route Progress",      description: "See exactly where every shuttle is, which stops have been completed, and what the ETA is for the next pick-up — live." },
  { icon: Clock,          title: "Shift Schedule Tracking",  description: "Align vehicle movements with shift start and end times. Late dispatches and early returns are flagged automatically." },
  { icon: FileBarChart,   title: "Automated Delay Logging",  description: "Every delay is timestamped and categorised. Build a full audit trail without relying on driver reports." },
  { icon: Star,           title: "Driver Score per Trip",    description: "Score drivers on harsh events, speed compliance, and idle time per trip. Reward top performers with data." },
  { icon: LayoutDashboard,title: "Multi-Branch View",        description: "See all branches on one dashboard. Compare on-time rates, idle time, and cost per trip across locations." },
  { icon: FileText,       title: "Monthly Trip Summaries",   description: "Auto-generated monthly reports covering distance, trips, cost per km, and driver scores — ready to share with HR or finance." },
];

const useCases = [
  { title: "Corporate Shuttle",      description: "Track office pick-up and drop-off routes with live positions, schedule adherence, and automated trip logs for every shift.", stat: "94% on-time rate" },
  { title: "BPO & IT Campuses",      description: "Manage high-frequency night-shift transport with driver safety scoring, delay alerts, and full trip history for compliance.", stat: "↓ 31% idle time" },
  { title: "Manufacturing Plants",   description: "Coordinate worker transport across plant gates and shift changeovers. Geofence alerts confirm arrivals at each entry point.", stat: "↓ 25% operational cost" },
];

function OnTimeChart() {
  const weeks = ["Wk 1","Wk 2","Wk 3","Wk 4","Wk 5","Wk 6"];
  const vals = [72, 78, 83, 87, 91, 94];
  const minV = 60;
  const maxV = 100;
  const range = maxV - minV;
  const pts = vals.map((v, i) => `${36 + i * 48},${100 - ((v - minV) / range) * 80}`).join(" ");
  const fillPts = `36,100 ${pts} ${36 + 5 * 48},100`;
  return (
    <svg viewBox="0 0 320 130" className="w-full" aria-label="On-time rate improvement line chart" role="img">
      <defs>
        <linearGradient id="empOnTimeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="1"/>
        </linearGradient>
        <linearGradient id="empFillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[70, 80, 90].map(v => {
        const y = 100 - ((v - minV) / range) * 80;
        return (
          <g key={v}>
            <text x="28" y={y + 4} fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="end">{v}%</text>
            <line x1="32" y1={y} x2="310" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </g>
        );
      })}
      <polygon points={fillPts} fill="url(#empFillGrad)"/>
      <polyline points={pts} fill="none" stroke="url(#empOnTimeGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {vals.map((v, i) => (
        <g key={i}>
          <circle cx={36 + i * 48} cy={100 - ((v - minV) / range) * 80} r="4" fill="#8B5CF6"/>
          <text x={36 + i * 48} y={100 - ((v - minV) / range) * 80 - 9} fontSize="8" fill="rgba(139,92,246,0.9)" textAnchor="middle">{v}%</text>
          <text x={36 + i * 48} y="115" fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="middle">{weeks[i]}</text>
        </g>
      ))}
    </svg>
  );
}

export default function EmployeeTransportPage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(139,92,246,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid rgba(139,92,246,0.4)", color: "#8B5CF6", background: "rgba(139,92,246,0.1)" }}>
                <UsersRound className="h-3.5 w-3.5" /> Employee Transport
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Shift transport, <span className="gradient-text">tracked end-to-end.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility eliminates manual check-ins and missed shift pick-ups with live tracking, automated reporting, and driver safety scoring across every route.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Live route progress", "Shift schedule tracking", "Driver score per trip", "Monthly trip summaries"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#8B5CF6" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
                <Link href="/solutions" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>All Solutions <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(139,92,246,0.08)" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src="/industry-employee-bus.avif" alt="Employee shuttle fleet tracking" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"94%", l:"On-time rate" }, { v:"↓31%", l:"Idle time" }, { v:"↓25%", l:"Operational cost" }].map(({ v, l }) => (
                      <div key={l} className="flex-1 rounded-lg px-2.5 py-2 text-center backdrop-blur-md" style={{ background: "rgba(6,14,26,0.7)", border: "1px solid rgba(139,92,246,0.2)" }}>
                        <p className="text-sm font-bold" style={{ color: "#8B5CF6" }}>{v}</p>
                        <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            {[{ v:"94%", l:"On-time rate" }, { v:"↓31%", l:"Idle time" }, { v:"3×", l:"Dispatch visibility" }, { v:"↓25%", l:"Operational cost" }].map(({ v, l }, i) => (
              <div key={l} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "#8B5CF6" }}>{v}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Performance Analytics" title="On-time rate climbing week over week" description="Track on-time departure and arrival for every shift route. Identify chronic delays and the routes causing them." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>On-Time Rate — 6 Week Trend</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Fleet-wide on-time departure rate after LAS Mobility deployment (72% → 94%)</p>
            <div className="rounded-xl p-4" style={{ background: "#060E1A" }}><OnTimeChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
              <p className="text-xs font-semibold" style={{ color: "#8B5CF6" }}>Result — On-time rate improved from 72% to 94% in 6 weeks by surfacing delay patterns and enabling targeted driver coaching.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Built for workforce mobility teams" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(c => <FeatureCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Shift transport across every sector" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ title, description, stat }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(139,92,246,0.1)" }}><UsersRound className="h-6 w-6" style={{ color: "#8B5CF6" }} /></div>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{description}</p>
                <p className="mt-4 text-xs font-bold" style={{ color: "#8B5CF6" }}>{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
