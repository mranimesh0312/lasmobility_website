"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Truck, Map, Route, ShieldAlert, BellRing, BarChart3, FileText, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: Map,        title: "Live Fleet Map",           description: "See every truck's position, speed, and status on a live map updated every 30 seconds. No calls to drivers required." },
  { icon: Route,      title: "Route Deviation Alerts",   description: "Receive instant alerts when a vehicle strays from the planned route or makes an unauthorised stop." },
  { icon: BarChart3,  title: "Cost-per-km Tracking",     description: "Measure fuel, idle time, and distance per route. Identify the vehicles and routes driving up operational cost." },
  { icon: ShieldAlert,title: "Driver Safety Scores",      description: "Score every driver on harsh braking, acceleration, and overspeed. Reduce incident risk before claims are made." },
  { icon: FileText,   title: "Proof of Delivery Reports", description: "Auto-generate exportable trip reports with timestamps, stop durations, and route maps for every delivery." },
  { icon: BellRing,   title: "Exception Alerts",          description: "Get notified for overspeed, long idle, geofence breach, and device offline — all in under 5 seconds." },
];

const useCases = [
  { title: "Full Truckload (FTL)", description: "Track long-haul trucks across highways. Review route history, investigate deviations, and verify delivery times without calling drivers.", stat: "40% faster dispatch response" },
  { title: "Last-Mile Delivery",   description: "Sequence stops for efficiency. Know exactly where every van is, with live ETAs and stoppage detection for every delivery run.", stat: "20% more drops per day" },
  { title: "Multi-Branch Ops",     description: "Centralise visibility across depots and branches. Compare route efficiency, driver scores, and cost per km across regions.", stat: "↑ 18% fleet utilisation" },
];

function CostTrendChart() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun"];
  const cost = [38, 35, 31, 28, 25, 22];
  const maxV = 42;
  const pts = cost.map((v,i) => `${36 + i*48},${100 - (v/maxV)*80}`).join(" ");
  return (
    <svg viewBox="0 0 320 130" className="w-full" aria-label="Cost per km trend">
      {[0,20,40].map(v => { const y = 100-(v/maxV)*80; return <g key={v}><text x="28" y={y+4} fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="end">₹{v}</text><line x1="32" y1={y} x2="312" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/></g>; })}
      <polyline points={pts} fill="none" stroke="url(#costGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {cost.map((v,i) => <g key={i}><circle cx={36+i*48} cy={100-(v/maxV)*80} r="4" fill="#0ECECE"/><text x={36+i*48} y={100-(v/maxV)*80-9} fontSize="8" fill="rgba(14,206,206,0.85)" textAnchor="middle">₹{v}</text><text x={36+i*48} y="115" fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="middle">{months[i]}</text></g>)}
      <defs><linearGradient id="costGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#EF4444" stopOpacity="0.6"/><stop offset="100%" stopColor="#0ECECE"/></linearGradient></defs>
    </svg>
  );
}

export default function LogisticsDeliveryPage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(14,206,206,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>
                <Truck className="h-3.5 w-3.5" /> Logistics & Delivery
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Every truck. <span className="gradient-text">Every trip. Fully visible.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility gives logistics and delivery operators complete real-time visibility — from depot dispatch to proof of delivery — without manual check-ins or guesswork.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Live GPS tracking", "Route deviation alerts", "Cost per km analytics", "Auto trip reports"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
                <Link href="/solutions" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>All Solutions <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid var(--border-accent)", boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(14,206,206,0.1)" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src="/industry-truck.avif" alt="Logistics fleet tracking" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"↓ 22%", l:"Cost per delivery" }, { v:"40%", l:"Faster dispatch" }, { v:"100%", l:"Trips logged" }].map(({v,l}) => (
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
            {[{ v:"↓ 22%", l:"Cost per delivery" }, { v:"↑ 18%", l:"Fleet utilisation" }, { v:"40%", l:"Faster dispatch response" }, { v:"90 days", l:"Trip history retained" }].map(({v,l},i) => (
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
          <SectionHeader eyebrow="Analytics" title="Cost per km — tracked and falling" description="Every trip contributes to fleet-wide cost analytics. LAS Mobility surfaces the routes, vehicles, and behaviours inflating operational cost." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Cost per km — 6 Month Trend</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Fleet-average cost per kilometre after route optimisation deployment</p>
            <div className="rounded-xl p-4" style={{ background: "#060E1A" }}><CostTrendChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
              <p className="text-xs font-semibold" style={{ color: "var(--accent-text)" }}>AI Insight — Fleets using route optimisation see cost reductions compound over the first 6 months as the AI learns traffic and stop patterns.</p>
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
          <SectionHeader eyebrow="Use cases" title="Logistics intelligence that scales" />
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
