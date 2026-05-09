"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Landmark, FileText, ShieldCheck, Route, Gauge, Bell, BarChart3, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: FileText,   title: "Audit-Ready Trip Reports",       description: "Every trip is automatically logged with timestamps, driver ID, route, distance, and stops. Ready for any audit or RTI request instantly." },
  { icon: ShieldCheck,title: "Role-Based Access by Dept",      description: "Department heads see their fleet. Administrators see everything. Granular access control without IT complexity." },
  { icon: Route,      title: "Route Adherence Tracking",       description: "Verify that government vehicles follow approved routes. Flag deviations for review and maintain a complete deviation log." },
  { icon: Gauge,      title: "Fuel Usage Monitoring",          description: "Track fuel consumption per vehicle and route. Identify anomalies that indicate misuse, siphoning, or excessive idle." },
  { icon: Bell,       title: "Device Health Alerts",           description: "Get notified if a tracking device goes offline or shows signs of tampering. Maintain data integrity across the entire fleet." },
  { icon: BarChart3,  title: "Fleet Utilisation Benchmarks",   description: "Compare active utilisation across departments and vehicle classes. Surface underused assets before procurement is requested." },
];

const useCases = [
  { title: "Municipal Fleets",          description: "Track civic vehicles — garbage trucks, water tankers, inspection vehicles — with full trip logs and route adherence for public accountability.", stat: "100% trips logged" },
  { title: "Defence & Security",        description: "Monitor security and patrol vehicles with geofence alerts, route adherence, and device tamper detection across sensitive areas.", stat: "Audit-ready reports" },
  { title: "Public Health Vehicles",    description: "Track ambulances, inspection vehicles, and field health workers. Verify visit coverage and maintain compliance records automatically.", stat: "90 days history" },
];

function ComplianceScoreChart() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun"];
  const vals = [74, 79, 84, 88, 92, 96];
  const minV = 65;
  const maxV = 100;
  const range = maxV - minV;
  const barW = 32;
  const gap = 48;
  const startX = 40;
  return (
    <svg viewBox="0 0 320 130" className="w-full" aria-label="Compliance score improvement over 6 months" role="img">
      <defs>
        <linearGradient id="govCompGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      {[70, 80, 90].map(v => {
        const y = 100 - ((v - minV) / range) * 85;
        return (
          <g key={v}>
            <text x="28" y={y + 4} fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="end">{v}</text>
            <line x1="32" y1={y} x2="310" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </g>
        );
      })}
      {vals.map((v, i) => {
        const barH = ((v - minV) / range) * 85;
        const x = startX + i * gap;
        const y = 100 - barH;
        return (
          <g key={i}>
            <rect x={x - barW / 2} y={y} width={barW} height={barH} rx="4" fill="url(#govCompGrad)"/>
            <text x={x} y={y - 4} fontSize="8" fill="rgba(245,158,11,0.9)" textAnchor="middle">{v}</text>
            <text x={x} y="115" fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="middle">{months[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function GovernmentFleetsPage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(245,158,11,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid rgba(245,158,11,0.4)", color: "#F59E0B", background: "rgba(245,158,11,0.1)" }}>
                <Landmark className="h-3.5 w-3.5" /> Government Fleets
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Accountable mobility <span className="gradient-text">for public sector fleets.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility gives government fleet managers audit-ready trip records, role-based access by department, and route adherence tracking — so every public vehicle is fully accountable.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Audit-ready trip reports", "Role-based access by dept", "Route adherence tracking", "Fleet utilisation benchmarks"].map(item => (
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
                  <Image src="/industry-mining.avif" alt="Government fleet accountability" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"100%", l:"Trips logged" }, { v:"Audit-ready", l:"Reports" }, { v:"90 days", l:"History" }].map(({ v, l }) => (
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
            {[{ v:"100%", l:"Trips logged" }, { v:"Audit-ready", l:"Trip reports" }, { v:"Role-based", l:"Dept access" }, { v:"90 days", l:"History retained" }].map(({ v, l }, i) => (
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
          <SectionHeader eyebrow="Compliance Analytics" title="Compliance score reaching 96% in 6 months" description="Route adherence, device uptime, and trip logging scores combine into a single compliance metric — tracked monthly for every department." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Fleet Compliance Score — Monthly Trend</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Composite compliance score (route adherence + trip logging + device uptime) — 6-month trend</p>
            <div className="rounded-xl p-4" style={{ background: "#060E1A" }}><ComplianceScoreChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
              <p className="text-xs font-semibold" style={{ color: "#F59E0B" }}>Result — Fleet compliance score improved from 74% to 96% in 6 months through automated route adherence monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Built for public sector accountability" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(c => <FeatureCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Accountability across the public sector" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ title, description, stat }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(245,158,11,0.1)" }}><Landmark className="h-6 w-6" style={{ color: "#F59E0B" }} /></div>
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
