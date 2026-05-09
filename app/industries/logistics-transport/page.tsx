"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Truck, Map, Route, ShieldAlert, BellRing, BarChart3, FileText, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: Map,         title: "Live Fleet Map",          description: "Every truck's position, speed, and status updated every 30 seconds on a live map. No check-in calls needed." },
  { icon: BarChart3,   title: "Route Analytics",         description: "Compare planned vs actual routes. Identify detours, idle hotspots, and underperforming corridors across your network." },
  { icon: ShieldAlert, title: "Driver Safety Scores",    description: "Score every driver on harsh braking, acceleration, and overspeed. Reduce risk before claims are filed." },
  { icon: BellRing,    title: "Geofence Alerts",         description: "Define loading docks, depots, and restricted zones. Get alerted the moment any vehicle enters or exits." },
  { icon: Route,       title: "Planned vs Actual",       description: "Overlay the planned route against the actual GPS path for every trip. Investigate deviations with a single click." },
  { icon: FileText,    title: "Export Reports",          description: "Pull driver reports, trip logs, and fleet-wide summaries in PDF or CSV. Ready for clients, auditors, and finance." },
];

const useCases = [
  { title: "FTL Trucking",            description: "Track long-haul trucks across national highways. Review route history, verify delivery times, and analyse cost per km per corridor.", stat: "↓ 18% idle time" },
  { title: "Regional Distribution",   description: "Coordinate multi-stop distribution runs from central depots to retail points. Live ETAs and stop alerts for every route.", stat: "↑ 22% route efficiency" },
  { title: "Cross-Border Freight",    description: "Monitor vehicles across state and country borders. Full trip history with geofence alerts at every checkpoint and crossing.", stat: "100% trips logged" },
];

function FleetDistanceChart() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const vals = [1240, 1380, 1290, 1450, 1520, 980, 760];
  const maxV = 1700;
  const barW = 28;
  const gap = 44;
  const startX = 36;
  return (
    <svg viewBox="0 0 320 130" className="w-full" aria-label="Fleet-wide distance by day of week" role="img">
      <defs>
        <linearGradient id="logDistGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ECECE" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#0ECECE" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      {[500, 1000, 1500].map(v => {
        const y = 100 - (v / maxV) * 85;
        return (
          <g key={v}>
            <text x="28" y={y + 4} fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="end">{v}</text>
            <line x1="32" y1={y} x2="310" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </g>
        );
      })}
      {vals.map((v, i) => {
        const barH = (v / maxV) * 85;
        const x = startX + i * gap;
        const y = 100 - barH;
        return (
          <g key={i}>
            <rect x={x - barW / 2} y={y} width={barW} height={barH} rx="4" fill="url(#logDistGrad)"/>
            <text x={x} y={y - 4} fontSize="7.5" fill="rgba(14,206,206,0.9)" textAnchor="middle">{Math.round(v / 100) / 10}k</text>
            <text x={x} y="115" fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="middle">{days[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function LogisticsTransportPage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(14,206,206,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>
                <Truck className="h-3.5 w-3.5" /> Logistics & Transport
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Full visibility across <span className="gradient-text">long-haul freight.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility gives logistics and transport operators complete real-time visibility from depot dispatch to final delivery — without manual check-ins or missed updates.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Live fleet map", "Route analytics", "Driver safety scores", "Planned vs actual"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
                <Link href="/industries" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>All Industries <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid var(--border-accent)", boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(14,206,206,0.1)" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src="/industry-truck.avif" alt="Logistics fleet tracking" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"↓18%", l:"Idle time" }, { v:"↑22%", l:"Route efficiency" }, { v:"100%", l:"Trips logged" }].map(({ v, l }) => (
                      <div key={l} className="flex-1 rounded-lg px-2.5 py-2 text-center backdrop-blur-md" style={{ background: "rgba(6,14,26,0.7)", border: "1px solid rgba(14,206,206,0.2)" }}>
                        <p className="text-sm font-bold" style={{ color: "var(--accent-text)" }}>{v}</p>
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
            {[{ v:"↓18%", l:"Idle time" }, { v:"↑22%", l:"Route efficiency" }, { v:"100%", l:"Trips logged" }, { v:"90 days", l:"History retained" }].map(({ v, l }, i) => (
              <div key={l} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "var(--accent-text)" }}>{v}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Fleet Analytics" title="Distance logged across the fleet — every day" description="Track total kilometres driven across your fleet by day of week. Identify peak load days and under-utilised periods for smarter scheduling." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Fleet-Wide Distance — Monday to Sunday</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Total kilometres logged across all vehicles by day of the week</p>
            <div className="rounded-xl p-4" style={{ background: "#060E1A" }}><FleetDistanceChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
              <p className="text-xs font-semibold" style={{ color: "var(--accent-text)" }}>AI Insight — Friday is peak distance day. Weekend underutilisation suggests scheduling opportunities for preventive maintenance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Built for logistics operators" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(c => <FeatureCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Every logistics model, fully tracked" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ title, description, stat }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)" }}><Truck className="h-6 w-6" style={{ color: "var(--accent-text)" }} /></div>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
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
