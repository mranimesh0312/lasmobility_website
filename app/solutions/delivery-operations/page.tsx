"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PackageCheck, Route, Bell, BarChart3, FileText, Navigation, Gauge, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: Route,      title: "AI Stop Sequencing",           description: "Automatically reorder stops for the shortest path. Every driver starts the day with an optimised sequence, not a printed list." },
  { icon: Navigation, title: "Live ETA Updates",             description: "Customers and dispatchers see real-time ETAs per stop. Traffic-adjusted, dynamically updated throughout the run." },
  { icon: Gauge,      title: "Dead Mileage Detection",       description: "Flag trips where drivers travel significant distances with no stops. Reduce wasted kilometres and unproductive fuel spend." },
  { icon: Bell,       title: "Unscheduled Stop Alerts",      description: "Get notified when a vehicle stops at a location not on the route plan. Investigate immediately, not hours later." },
  { icon: FileText,   title: "Proof-of-Delivery Logging",    description: "Timestamp every delivery stop automatically. Build a complete proof-of-delivery record without any driver app required." },
  { icon: BarChart3,  title: "Cost-per-Delivery Benchmarking", description: "Track cost per drop by route, driver, and vehicle. Surface the delivery runs that are pulling your margins down." },
];

const useCases = [
  { title: "E-Commerce Last Mile",    description: "Sequence hundreds of parcel drops per day across urban zones. Live ETAs, stop alerts, and delivery logs without any driver app friction.", stat: "20% more drops per day" },
  { title: "FMCG Distribution",       description: "Optimise multi-stop trade routes for field sales and distribution vans. Compare planned vs actual for every territory.", stat: "↓ 24% route distance" },
  { title: "Pharmacy Delivery",       description: "Ensure time-sensitive deliveries reach the right address on time. Geofence pharmacies and alert on any deviation or missed stop.", stat: "38 min saved per trip" },
];

function DeliveryCompareChart() {
  const metrics = [
    { label: "Distance (km)", before: 148, after: 112, max: 160, unit: "km" },
    { label: "Time (min)",    before: 210, after: 172, max: 230, unit: "min" },
    { label: "Fuel (L)",      before: 14.8, after: 10.6, max: 18, unit: "L" },
  ];
  const rowH = 28;
  const barMaxW = 200;
  const labelW = 76;
  const gap = 12;
  return (
    <svg viewBox="0 0 320 110" className="w-full" aria-label="Before and after delivery metrics comparison" role="img">
      <defs>
        <linearGradient id="delBeforeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="delAfterGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#EF4444"/>
        </linearGradient>
      </defs>
      <text x={labelW + 2} y="8" fontSize="7" fill="rgba(255,255,255,0.3)">Before</text>
      <text x={labelW + 120} y="8" fontSize="7" fill="rgba(239,68,68,0.9)">After</text>
      {metrics.map((m, i) => {
        const y = 14 + i * (rowH + gap);
        const bw = (m.before / m.max) * barMaxW;
        const aw = (m.after / m.max) * barMaxW;
        return (
          <g key={m.label}>
            <text x={labelW - 4} y={y + rowH / 2 - 2} fontSize="8" fill="rgba(255,255,255,0.4)" textAnchor="end">{m.label}</text>
            <rect x={labelW} y={y} width={bw} height={rowH / 2 - 2} rx="3" fill="url(#delBeforeGrad)"/>
            <text x={labelW + bw + 4} y={y + rowH / 2 - 5} fontSize="8" fill="rgba(255,255,255,0.4)">{m.before}{m.unit}</text>
            <rect x={labelW} y={y + rowH / 2} width={aw} height={rowH / 2 - 2} rx="3" fill="url(#delAfterGrad)"/>
            <text x={labelW + aw + 4} y={y + rowH - 4} fontSize="8" fill="rgba(239,68,68,0.9)">{m.after}{m.unit}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function DeliveryOperationsPage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(239,68,68,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid rgba(239,68,68,0.4)", color: "#EF4444", background: "rgba(239,68,68,0.1)" }}>
                <PackageCheck className="h-3.5 w-3.5" /> Delivery Operations
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                More drops. <span className="gradient-text">Less mileage.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility optimises every delivery run — sequencing stops, cutting dead mileage, and surfacing the cost data that lets you scale profitable delivery operations.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["AI stop sequencing", "Live ETA updates", "Dead mileage detection", "Cost-per-delivery tracking"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#EF4444" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
                <Link href="/solutions" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>All Solutions <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(239,68,68,0.3)", boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(239,68,68,0.08)" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src="/industry-delivery-van.avif" alt="Delivery fleet optimisation" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"20%", l:"More drops/day" }, { v:"↓24%", l:"Route distance" }, { v:"38 min", l:"Saved per trip" }].map(({ v, l }) => (
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
            {[{ v:"20%", l:"More drops per day" }, { v:"↓24%", l:"Route distance" }, { v:"38 min", l:"Saved per trip" }, { v:"Real-time", l:"ETAs per stop" }].map(({ v, l }, i) => (
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
          <SectionHeader eyebrow="Route Analytics" title="Less distance. Less time. Less fuel." description="AI-optimised stop sequencing cuts every measurable delivery metric — distance, time, and fuel — across your entire fleet." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Before vs After — Optimised Route Metrics</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Average per-run metrics for a 12-stop urban delivery route</p>
            <div className="rounded-xl p-4" style={{ background: "#060E1A" }}><DeliveryCompareChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <p className="text-xs font-semibold" style={{ color: "#EF4444" }}>Result — Distance 148→112 km, time 210→172 min, fuel 14.8→10.6 L per route after AI stop sequencing.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Built for high-volume delivery fleets" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(c => <FeatureCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Every delivery model, optimised" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ title, description, stat }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(239,68,68,0.1)" }}><PackageCheck className="h-6 w-6" style={{ color: "#EF4444" }} /></div>
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
