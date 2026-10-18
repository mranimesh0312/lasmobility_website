"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bus, Navigation, Clock, Bell, Star, LayoutDashboard, FileText, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: Clock,          title: "Shift Schedule Tracking",   description: "Align shuttle movements with shift times. Departure delays and early returns are flagged instantly — no manual monitoring." },
  { icon: Navigation,     title: "Live Route Progress",       description: "See every shuttle's live position and completed stops. Dispatchers get full visibility without calling drivers." },
  { icon: Bell,           title: "Automated Delay Alerts",    description: "Any route running more than 5 minutes late triggers an automatic alert. Resolve issues before employees are impacted." },
  { icon: Star,           title: "Driver Behaviour Scores",   description: "Score every driver on harsh events per trip. Share results monthly to build a culture of safe, on-time driving." },
  { icon: LayoutDashboard,title: "Multi-Branch Dashboard",    description: "View all campuses and branch locations in one dashboard. Compare on-time rates and idle time across the organisation." },
  { icon: FileText,       title: "Monthly Reports",           description: "Auto-generate monthly summaries for HR and operations: trips, distance, cost per route, driver scores, and on-time rates." },
];

const useCases = [
  { title: "IT & BPO Companies",        description: "Manage high-frequency shift transport with live tracking, automated delay alerts, and full trip logs for compliance and HR reporting.", stat: "On-time runs tracked" },
  { title: "Manufacturing Plants",       description: "Coordinate worker shuttles across multiple plant gates and shift changeovers. Geofence alerts confirm arrivals at every entry point.", stat: "Idle time made visible" },
  { title: "Hospitals & Healthcare",     description: "Track staff transport across hospital campuses and residential areas. Ensure night-shift transport arrives safely and on time.", stat: "Live dispatch visibility" },
];

function OnTimeTrendChart() {
  const weeks = ["Wk 1","Wk 2","Wk 3","Wk 4","Wk 5","Wk 6"];
  const vals = [71, 77, 82, 87, 91, 94];
  const minV = 62;
  const maxV = 100;
  const range = maxV - minV;
  const pts = vals.map((v, i) => `${36 + i * 48},${100 - ((v - minV) / range) * 80}`).join(" ");
  const fillPts = `36,100 ${pts} ${36 + 5 * 48},100`;
  return (
    <svg viewBox="0 0 320 130" className="w-full" aria-label="On-time performance trend over 6 weeks" role="img">
      <defs>
        <linearGradient id="corpOnTimeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="var(--violet)"/>
        </linearGradient>
        <linearGradient id="corpFillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="var(--violet)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[70, 80, 90].map(v => {
        const y = 100 - ((v - minV) / range) * 80;
        return (
          <g key={v}>
            <text x="28" y={y + 4} fontSize="8" fill="rgb(var(--white-rgb) / 0.3)" textAnchor="end">{v}%</text>
            <line x1="32" y1={y} x2="310" y2={y} stroke="rgb(var(--white-rgb) / 0.05)" strokeWidth="1"/>
          </g>
        );
      })}
      <polygon points={fillPts} fill="url(#corpFillGrad)"/>
      <polyline points={pts} fill="none" stroke="url(#corpOnTimeGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {vals.map((v, i) => (
        <g key={i}>
          <circle cx={36 + i * 48} cy={100 - ((v - minV) / range) * 80} r="4" fill="var(--violet)"/>
          <text x={36 + i * 48} y={100 - ((v - minV) / range) * 80 - 9} fontSize="8" fill="rgb(var(--violet-rgb) / 0.9)" textAnchor="middle">{v}%</text>
          <text x={36 + i * 48} y="115" fontSize="8" fill="rgb(var(--white-rgb) / 0.3)" textAnchor="middle">{weeks[i]}</text>
        </g>
      ))}
    </svg>
  );
}

export default function CorporateMobilityPage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgb(var(--violet-rgb) / 0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid rgb(var(--violet-rgb) / 0.4)", color: "var(--violet)", background: "rgb(var(--violet-rgb) / 0.1)" }}>
                <Bus className="h-3.5 w-3.5" /> Corporate Mobility
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Reliable shift transport, <span className="gradient-text">zero manual check-ins.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility replaces manual radio check-ins and spreadsheet tracking with live fleet visibility, automated delay alerts, and monthly reports your HR team will actually use.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Shift schedule tracking", "Live route progress", "Automated delay alerts", "Monthly reports"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--violet)" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
                <Link href="/industries" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>All Industries <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgb(var(--violet-rgb) / 0.3)", boxShadow: "0 24px 64px rgb(var(--black-rgb) / 0.45), 0 0 60px rgb(var(--violet-rgb) / 0.08)" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src="/industry-employee-bus.avif" alt="Corporate shuttle fleet tracking" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgb(var(--ink-deep-rgb) / 0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"Tracked", l:"On-time arrivals" }, { v:"Tracked", l:"Idle time" }, { v:"Live", l:"Dispatch visibility" }].map(({ v, l }) => (
                      <div key={l} className="flex-1 rounded-lg px-2.5 py-2 text-center backdrop-blur-md" style={{ background: "rgb(var(--ink-deep-rgb) / 0.7)", border: "1px solid rgb(var(--violet-rgb) / 0.2)" }}>
                        <p className="text-sm font-bold" style={{ color: "var(--violet)" }}>{v}</p>
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
            {[{ v:"Tracked", l:"On-time arrivals" }, { v:"Tracked", l:"Idle time" }, { v:"Live", l:"Dispatch visibility" }, { v:"Automated", l:"Reporting" }].map(({ v, l }, i) => (
              <div key={l} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "var(--violet)" }}>{v}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Performance Analytics" title="On-time performance climbing every week" description="Delay patterns are surfaced automatically. Targeted driver coaching and schedule adjustments drive measurable on-time improvement." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>On-Time Performance — 6 Week Trend</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Fleet-wide on-time departure rate improving from 71% to 94% after deployment</p>
            <div className="rounded-xl p-4" style={{ background: "var(--ink-deep)" }}><OnTimeTrendChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "rgb(var(--violet-rgb) / 0.08)", border: "1px solid rgb(var(--violet-rgb) / 0.2)" }}>
              <p className="text-xs font-semibold" style={{ color: "var(--violet)" }}>Result — On-time rate improved from 71% to 94% in 6 weeks through automated delay detection and driver coaching.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Built for corporate mobility managers" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(c => <FeatureCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Shift transport across every sector" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ title, description, stat }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgb(var(--violet-rgb) / 0.1)" }}><Bus className="h-6 w-6" style={{ color: "var(--violet)" }} /></div>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{description}</p>
                <p className="mt-4 text-xs font-bold" style={{ color: "var(--violet)" }}>{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
