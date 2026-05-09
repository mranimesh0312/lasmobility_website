"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, MapPin, Navigation, Clock, FileText, Star, BarChart3, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: MapPin,    title: "Live Technician Map",        description: "See every field technician's real-time position on a live map. Know who is available, en route, or on-site at a glance." },
  { icon: Navigation,title: "Nearest-Vehicle Dispatch",   description: "Identify and dispatch the closest available technician to each new call. Reduce travel time and improve first-visit resolution." },
  { icon: Zap,       title: "Geofence Customer Sites",    description: "Auto-log arrival and departure at every customer location. Confirm site visits without driver self-reporting." },
  { icon: Clock,     title: "Visit Duration Logging",     description: "Track exactly how long technicians spend on-site. Identify jobs running long and resource allocation gaps." },
  { icon: FileText,  title: "Trip History & Mileage",     description: "Export full trip histories with mileage per technician for billing, compliance, and expense management." },
  { icon: Star,      title: "Safety Scoring",             description: "Score field technicians on harsh driving events per trip. Reduce incident risk across your mobile workforce." },
];

const useCases = [
  { title: "HVAC & Appliance Service",   description: "Dispatch technicians to job sites with live tracking, auto-logged site arrivals, and mileage reports for every engineer.", stat: "30% more service calls/day" },
  { title: "Telecom Field Teams",        description: "Track field engineers across large coverage zones. Nearest-vehicle dispatch cuts response time and maximises daily call volume.", stat: "↓ 25% response time" },
  { title: "Healthcare Home Visits",     description: "Monitor care worker routes and visit durations. Geofence patient addresses to automatically confirm each home visit.", stat: "100% visits logged" },
];

function ServiceCallsTrendChart() {
  const weeks = ["Wk 1","Wk 2","Wk 3","Wk 4","Wk 5","Wk 6"];
  const vals = [18, 20, 21, 23, 25, 26];
  const minV = 14;
  const maxV = 30;
  const range = maxV - minV;
  const pts = vals.map((v, i) => `${36 + i * 48},${100 - ((v - minV) / range) * 80}`).join(" ");
  const fillPts = `36,100 ${pts} ${36 + 5 * 48},100`;
  return (
    <svg viewBox="0 0 320 130" className="w-full" aria-label="Service calls per day trend" role="img">
      <defs>
        <linearGradient id="fieldCallsGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ECECE" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#0ECECE"/>
        </linearGradient>
        <linearGradient id="fieldFillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ECECE" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#0ECECE" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[16, 20, 24, 28].map(v => {
        const y = 100 - ((v - minV) / range) * 80;
        return (
          <g key={v}>
            <text x="28" y={y + 4} fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="end">{v}</text>
            <line x1="32" y1={y} x2="310" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </g>
        );
      })}
      <polygon points={fillPts} fill="url(#fieldFillGrad)"/>
      <polyline points={pts} fill="none" stroke="url(#fieldCallsGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {vals.map((v, i) => (
        <g key={i}>
          <circle cx={36 + i * 48} cy={100 - ((v - minV) / range) * 80} r="4" fill="#0ECECE"/>
          <text x={36 + i * 48} y={100 - ((v - minV) / range) * 80 - 9} fontSize="8" fill="rgba(14,206,206,0.9)" textAnchor="middle">{v}</text>
          <text x={36 + i * 48} y="115" fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="middle">{weeks[i]}</text>
        </g>
      ))}
    </svg>
  );
}

export default function FieldOperationsPage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(14,206,206,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid rgba(14,206,206,0.4)", color: "#0ECECE", background: "rgba(14,206,206,0.1)" }}>
                <Zap className="h-3.5 w-3.5" /> Field Operations
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Dispatch smarter. <span className="gradient-text">Track every call.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility gives field service managers a live map of every technician, nearest-vehicle dispatch, and automatic visit logging — so you close more tickets every day.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Live technician map", "Nearest-vehicle dispatch", "Visit duration logging", "Trip mileage & history"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#0ECECE" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
                <Link href="/solutions" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>All Solutions <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(14,206,206,0.3)", boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(14,206,206,0.1)" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src="/industry-car-rental.avif" alt="Field operations dispatch map" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"30%", l:"More calls/day" }, { v:"↓25%", l:"Response time" }, { v:"100%", l:"Trips logged" }].map(({ v, l }) => (
                      <div key={l} className="flex-1 rounded-lg px-2.5 py-2 text-center backdrop-blur-md" style={{ background: "rgba(6,14,26,0.7)", border: "1px solid rgba(14,206,206,0.2)" }}>
                        <p className="text-sm font-bold" style={{ color: "#0ECECE" }}>{v}</p>
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
            {[{ v:"30%", l:"More service calls/day" }, { v:"↓25%", l:"Response time" }, { v:"100%", l:"Trips logged" }, { v:"Live", l:"Dispatch map" }].map(({ v, l }, i) => (
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
          <SectionHeader eyebrow="Service Analytics" title="More service calls completed every week" description="Track daily call completion rates across your field team. Nearest-vehicle dispatch compounds gains week over week." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Service Calls Completed per Day</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Average daily service calls completed across the field team — 6-week trend</p>
            <div className="rounded-xl p-4" style={{ background: "#060E1A" }}><ServiceCallsTrendChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
              <p className="text-xs font-semibold" style={{ color: "var(--accent-text)" }}>Result — Daily service calls increased from 18 to 26 in 6 weeks through nearest-vehicle dispatch and route optimisation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Built for field service operations" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(c => <FeatureCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Every field service vertical, covered" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ title, description, stat }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)" }}><Zap className="h-6 w-6" style={{ color: "var(--accent-text)" }} /></div>
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
