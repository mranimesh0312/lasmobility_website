"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Route, Bell, BarChart3, FileText, Navigation, Gauge, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: Route,      title: "AI Route Optimisation",       description: "Automatically sequence stops for the shortest path. Every driver starts with an optimised run — no manual planning." },
  { icon: Navigation, title: "Live Stop Tracking",          description: "See each delivery van's position, completed stops, and next stop in real time. No calls to drivers required." },
  { icon: Gauge,      title: "Dead Mileage Elimination",    description: "Detect and reduce empty return journeys and excessive between-stop travel that inflates cost per drop." },
  { icon: Bell,       title: "Customer ETA Alerts",         description: "Send customers live ETA updates per stop. Reduce missed deliveries and inbound support calls simultaneously." },
  { icon: FileText,   title: "Proof of Delivery",           description: "Timestamp every stop automatically. Build a verifiable delivery log without requiring driver apps or manual entry." },
  { icon: BarChart3,  title: "Cost Analytics",              description: "Track cost per drop by route, driver, and vehicle. Surface the runs that are pulling down margins." },
];

const useCases = [
  { title: "E-Commerce Couriers",    description: "Handle hundreds of parcel drops per day with AI-sequenced routes, live customer ETAs, and automatic proof-of-delivery logging.", stat: "20% more drops per day" },
  { title: "FMCG Distribution",      description: "Optimise multi-stop trade routes for field vans. Compare planned vs actual and identify territory-level inefficiencies automatically.", stat: "↓ 24% route distance" },
  { title: "Grocery Delivery",       description: "Manage time-window deliveries with live ETA alerts and automatic alerts when a van deviates from the planned sequence.", stat: "38 min saved per trip" },
];

function DeliveryCountChart() {
  const weeks = ["Wk 1","Wk 2","Wk 3","Wk 4","Wk 5","Wk 6"];
  const vals = [120, 136, 151, 163, 178, 192];
  const minV = 100;
  const maxV = 210;
  const range = maxV - minV;
  const pts = vals.map((v, i) => `${36 + i * 48},${100 - ((v - minV) / range) * 80}`).join(" ");
  const fillPts = `36,100 ${pts} ${36 + 5 * 48},100`;
  return (
    <svg viewBox="0 0 320 130" className="w-full" aria-label="Daily delivery count trend over 6 weeks" role="img">
      <defs>
        <linearGradient id="lmDelivGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#F59E0B"/>
        </linearGradient>
        <linearGradient id="lmFillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[120, 150, 180].map(v => {
        const y = 100 - ((v - minV) / range) * 80;
        return (
          <g key={v}>
            <text x="28" y={y + 4} fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="end">{v}</text>
            <line x1="32" y1={y} x2="310" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </g>
        );
      })}
      <polygon points={fillPts} fill="url(#lmFillGrad)"/>
      <polyline points={pts} fill="none" stroke="url(#lmDelivGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {vals.map((v, i) => (
        <g key={i}>
          <circle cx={36 + i * 48} cy={100 - ((v - minV) / range) * 80} r="4" fill="#F59E0B"/>
          <text x={36 + i * 48} y={100 - ((v - minV) / range) * 80 - 9} fontSize="8" fill="rgba(245,158,11,0.9)" textAnchor="middle">{v}</text>
          <text x={36 + i * 48} y="115" fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="middle">{weeks[i]}</text>
        </g>
      ))}
    </svg>
  );
}

export default function LastMileDeliveryPage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(245,158,11,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid rgba(245,158,11,0.4)", color: "#F59E0B", background: "rgba(245,158,11,0.1)" }}>
                <Package className="h-3.5 w-3.5" /> Last-Mile Delivery
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                More parcels. <span className="gradient-text">Lower cost per drop.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility gives last-mile delivery operators AI-optimised routes, live ETAs, and automatic proof-of-delivery logging — without adding complexity to driver workflows.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["AI route optimisation", "Live stop tracking", "Customer ETA alerts", "Cost analytics"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#F59E0B" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
                <Link href="/industries" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>All Industries <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(245,158,11,0.3)", boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(245,158,11,0.08)" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src="/industry-delivery-van.avif" alt="Last mile delivery fleet" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"20%", l:"More drops/day" }, { v:"↓24%", l:"Distance" }, { v:"38 min", l:"Saved per trip" }].map(({ v, l }) => (
                      <div key={l} className="flex-1 rounded-lg px-2.5 py-2 text-center backdrop-blur-md" style={{ background: "rgba(6,14,26,0.7)", border: "1px solid rgba(245,158,11,0.2)" }}>
                        <p className="text-sm font-bold" style={{ color: "#F59E0B" }}>{v}</p>
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
            {[{ v:"20%", l:"More drops per day" }, { v:"↓24%", l:"Distance per route" }, { v:"38 min", l:"Saved per trip" }, { v:"Real-time", l:"ETAs per stop" }].map(({ v, l }, i) => (
              <div key={l} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "#F59E0B" }}>{v}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Delivery Analytics" title="Daily deliveries climbing week over week" description="AI route optimisation compounds over time — more drops per driver, lower cost per delivery, less wasted mileage every week." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Daily Deliveries Completed — 6 Week Trend</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Fleet-average daily deliveries per van after AI route optimisation deployment (120 → 192)</p>
            <div className="rounded-xl p-4" style={{ background: "#060E1A" }}><DeliveryCountChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
              <p className="text-xs font-semibold" style={{ color: "#F59E0B" }}>Result — Daily delivery count increased 60% from 120 to 192 per van in 6 weeks with AI stop sequencing.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Built for high-volume last-mile ops" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(c => <FeatureCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Every last-mile model, covered" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ title, description, stat }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(245,158,11,0.1)" }}><Package className="h-6 w-6" style={{ color: "#F59E0B" }} /></div>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{description}</p>
                <p className="mt-4 text-xs font-bold" style={{ color: "#F59E0B" }}>{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
