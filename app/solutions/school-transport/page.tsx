"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { School, MapPin, ShieldCheck, Star, Bell, Navigation, ClipboardList, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: MapPin,        title: "Live Parent Tracking",      description: "Parents follow their child's bus on a live map in real time. No calls needed — status updates arrive automatically at every stop." },
  { icon: Navigation,    title: "Geofence School Gates",     description: "Auto-alerts fire the moment a bus enters or exits school grounds. Administrators know exactly when students are on-site." },
  { icon: Star,          title: "Driver Safety Scoring",     description: "Score every driver on harsh braking, acceleration, and overspeed events. Coaching decisions backed by data, not guesswork." },
  { icon: Bell,          title: "Route Deviation Alerts",    description: "Get notified instantly when a bus strays from its assigned route — so you can respond before parents even notice." },
  { icon: ShieldCheck,   title: "Overspeed Notifications",   description: "Set speed thresholds per zone. Drivers receive in-cab alerts; fleet managers receive push notifications in under 5 seconds." },
  { icon: ClipboardList, title: "Automated Stop Logging",    description: "Every stop is timestamped and logged automatically. Build an auditable record of every route, every day, without manual entry." },
];

const useCases = [
  { title: "School Bus Operators",     description: "Manage entire fleets of school buses with live tracking, parent apps, and full driver safety scoring to meet duty-of-care obligations.", stat: "Driver behaviour on record" },
  { title: "University Transport",     description: "Track shuttle routes across campus and off-site. Schedule adherence and overspeed alerts keep student transport compliant and reliable.", stat: "Stop arrivals on record" },
  { title: "Private School Networks",  description: "Centralise visibility across multiple campuses. Compare route performance, driver scores, and incident rates in one dashboard.", stat: "Incidents seen live" },
];

function SafetyChart() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun"];
  const vals = [42, 34, 27, 19, 13, 8];
  const maxV = 50;
  const barW = 32;
  const gap = 48;
  const startX = 40;
  return (
    <svg viewBox="0 0 320 130" className="w-full" aria-label="Safety event reduction bar chart" role="img">
      <defs>
        <linearGradient id="schoolSafetyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--warning)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="var(--warning)" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      {[0, 20, 40].map(v => {
        const y = 100 - (v / maxV) * 85;
        return (
          <g key={v}>
            <text x="28" y={y + 4} fontSize="8" fill="rgb(var(--white-rgb) / 0.3)" textAnchor="end">{v}</text>
            <line x1="32" y1={y} x2="310" y2={y} stroke="rgb(var(--white-rgb) / 0.05)" strokeWidth="1"/>
          </g>
        );
      })}
      {vals.map((v, i) => {
        const barH = (v / maxV) * 85;
        const x = startX + i * gap;
        const y = 100 - barH;
        return (
          <g key={i}>
            <rect x={x - barW / 2} y={y} width={barW} height={barH} rx="4" fill="url(#schoolSafetyGrad)"/>
            <text x={x} y={y - 4} fontSize="8" fill="rgb(var(--warning-rgb) / 0.9)" textAnchor="middle">{v}</text>
            <text x={x} y="115" fontSize="8" fill="rgb(var(--white-rgb) / 0.3)" textAnchor="middle">{months[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function SchoolTransportPage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgb(var(--warning-rgb) / 0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid rgb(var(--warning-rgb) / 0.4)", color: "var(--warning)", background: "rgb(var(--warning-rgb) / 0.1)" }}>
                <School className="h-3.5 w-3.5" /> School Transport
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Student safety <span className="gradient-text">you can prove.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility gives school transport operators, parents, and administrators real-time visibility and safety records for every bus, every route, every day.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Live parent tracking", "Geofence school gates", "Driver safety scoring", "Automated stop logging"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--warning)" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
                <Link href="/solutions" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>All Solutions <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgb(var(--warning-rgb) / 0.3)", boxShadow: "0 24px 64px rgb(var(--black-rgb) / 0.45), 0 0 60px rgb(var(--warning-rgb) / 0.08)" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src="/industry-school-bus.avif" alt="School bus fleet tracking" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgb(var(--ink-deep-rgb) / 0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"Scored", l:"Driver safety" }, { v:"Logged", l:"Stop arrivals" }, { v:"Live", l:"Incident view" }].map(({ v, l }) => (
                      <div key={l} className="flex-1 rounded-lg px-2.5 py-2 text-center backdrop-blur-md" style={{ background: "rgb(var(--ink-deep-rgb) / 0.7)", border: "1px solid rgb(var(--warning-rgb) / 0.2)" }}>
                        <p className="text-sm font-bold" style={{ color: "var(--warning)" }}>{v}</p>
                        <p className="text-[10px]" style={{ color: "rgb(var(--white-rgb) / 0.5)" }}>{l}</p>
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
            {[{ v:"Scored", l:"Driver safety" }, { v:"Logged", l:"Stop arrivals" }, { v:"Live", l:"Incident view" }, { v:"Every route", l:"Logged automatically" }].map(({ v, l }, i) => (
              <div key={l} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "var(--warning)" }}>{v}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Safety Analytics" title="Harsh events dropping month over month" description="Every trip is scored. Harsh braking, acceleration, and overspeed incidents are logged, trended, and surfaced for coaching." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Safety Events per Month</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Total harsh driving events fleet-wide — 6-month trend after LAS Mobility deployment</p>
            <div className="rounded-xl p-4" style={{ background: "var(--ink-deep)" }}><SafetyChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "rgb(var(--warning-rgb) / 0.08)", border: "1px solid rgb(var(--warning-rgb) / 0.2)" }}>
              <p className="text-xs font-semibold" style={{ color: "var(--warning)" }}>Result — Harsh events reduced from 42 to 8 in 6 months through driver safety scoring and targeted coaching.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Built for student safety" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(c => <FeatureCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="From primary schools to universities" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ title, description, stat }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgb(var(--warning-rgb) / 0.1)" }}><School className="h-6 w-6" style={{ color: "var(--warning)" }} /></div>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{description}</p>
                <p className="mt-4 text-xs font-bold" style={{ color: "var(--warning)" }}>{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
