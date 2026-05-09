"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Factory, MapPin, Bell, Clock, BarChart3, ShieldAlert, LayoutDashboard, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: MapPin,         title: "Site Geofencing",              description: "Define boundaries for every construction site. Know the moment equipment enters, exits, or operates outside approved zones." },
  { icon: Bell,           title: "After-Hours Ignition Alerts",  description: "Any asset started after hours triggers an instant alert. Catch unauthorised use before equipment leaves the site." },
  { icon: Clock,          title: "Idle Time Monitoring",         description: "Track how long each asset idles with engine running. Reduce fuel waste and flag operator behaviour that inflates costs." },
  { icon: BarChart3,      title: "Asset Utilisation Reports",    description: "See what percentage of time each asset is active, idle, or inactive. Redeploy underused equipment before it becomes a liability." },
  { icon: ShieldAlert,    title: "Device Tamper Alerts",         description: "Detect attempts to disconnect or interfere with tracking devices. Alerts fire in real time to protect your asset data." },
  { icon: LayoutDashboard,title: "Multi-Site Dashboard",         description: "Manage assets across multiple construction sites from one dashboard. Filter by site, asset class, or status at any time." },
];

const useCases = [
  { title: "Road & Infrastructure",    description: "Track excavators, compactors, and vehicles across extended road project corridors. Geofence active work zones and alert on any boundary breach.", stat: "↓ 27% asset idle time" },
  { title: "Building Construction",    description: "Monitor cranes, concrete mixers, and site vehicles across multi-storey builds. After-hours ignition alerts protect high-value plant equipment.", stat: "↑ 19% utilisation" },
  { title: "Mining & Quarrying",       description: "Track heavy haulage, loaders, and drilling equipment across large mine sites. Multi-site view lets ops managers compare utilisation across pits.", stat: "After-hours alerts" },
];

function UtilisationBreakdownChart() {
  const segments = [
    { label: "Active",       pct: 62, color: "#EF4444" },
    { label: "Idle",         pct: 21, color: "rgba(239,68,68,0.5)" },
    { label: "Maintenance",  pct: 10, color: "rgba(239,68,68,0.3)" },
    { label: "Off-site",     pct:  7, color: "rgba(239,68,68,0.15)" },
  ];
  const maxPct = 100;
  const barMaxW = 210;
  const labelW = 70;
  const rowH = 20;
  const gap = 8;
  return (
    <svg viewBox="0 0 320 125" className="w-full" aria-label="Asset utilisation breakdown horizontal bars" role="img">
      <defs>
        <linearGradient id="constActiveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#EF4444"/>
        </linearGradient>
      </defs>
      {segments.map((s, i) => {
        const y = 10 + i * (rowH + gap);
        const w = (s.pct / maxPct) * barMaxW;
        return (
          <g key={s.label}>
            <text x={labelW - 4} y={y + rowH / 2 + 4} fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="end">{s.label}</text>
            <rect x={labelW} y={y} width={w} height={rowH} rx="4" fill={s.label === "Active" ? "url(#constActiveGrad)" : s.color}/>
            <text x={labelW + w + 6} y={y + rowH / 2 + 4} fontSize="9" fill={i === 0 ? "rgba(239,68,68,0.9)" : "rgba(255,255,255,0.4)"}>{s.pct}%</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function ConstructionAssetsPage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(239,68,68,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid rgba(239,68,68,0.4)", color: "#EF4444", background: "rgba(239,68,68,0.1)" }}>
                <Factory className="h-3.5 w-3.5" /> Construction & Assets
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Track every asset <span className="gradient-text">across every site.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility gives construction and heavy asset operators real-time visibility across all sites — with after-hours alerts, idle time tracking, and utilisation reports for every piece of equipment.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Site geofencing", "After-hours alerts", "Idle time monitoring", "Multi-site dashboard"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#EF4444" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
                <Link href="/industries" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>All Industries <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(239,68,68,0.3)", boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(239,68,68,0.08)" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src="/industry-construction.avif" alt="Construction asset tracking" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"↓27%", l:"Asset idle time" }, { v:"After-hours", l:"Ignition alerts" }, { v:"↑19%", l:"Utilisation" }].map(({ v, l }) => (
                      <div key={l} className="flex-1 rounded-lg px-2.5 py-2 text-center backdrop-blur-md" style={{ background: "rgba(6,14,26,0.7)", border: "1px solid rgba(239,68,68,0.2)" }}>
                        <p className="text-sm font-bold" style={{ color: "#EF4444" }}>{v}</p>
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
            {[{ v:"↓27%", l:"Asset idle time" }, { v:"After-hours", l:"Ignition alerts" }, { v:"Multi-site", l:"Dashboard view" }, { v:"↑19%", l:"Utilisation" }].map(({ v, l }, i) => (
              <div key={l} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "#EF4444" }}>{v}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Asset Analytics" title="Know exactly where your assets go" description="Break down every asset's time into active, idle, maintenance, and off-site states. Redeploy underutilised equipment before it costs you." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Asset Utilisation Breakdown — Fleet Average</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Percentage of total time each asset category spends in each state</p>
            <div className="rounded-xl p-4" style={{ background: "#060E1A" }}><UtilisationBreakdownChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <p className="text-xs font-semibold" style={{ color: "#EF4444" }}>Insight — 21% idle time represents immediate reduction opportunity. Idle reduction of 10% would save approx. ₹4.2L/month in fuel across a 20-vehicle fleet.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Built for heavy asset operators" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(c => <FeatureCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Every construction vertical, tracked" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ title, description, stat }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(239,68,68,0.1)" }}><Factory className="h-6 w-6" style={{ color: "#EF4444" }} /></div>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{description}</p>
                <p className="mt-4 text-xs font-bold" style={{ color: "#EF4444" }}>{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
