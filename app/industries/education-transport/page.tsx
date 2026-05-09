"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { School, MapPin, ShieldCheck, Star, Bell, Navigation, ClipboardList, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: MapPin,        title: "Parent Live Tracking",       description: "Parents follow their child's bus in real time on a live map. Automatic alerts at every stop eliminate uncertainty." },
  { icon: Navigation,    title: "School Gate Geofences",      description: "Know the exact moment a bus arrives at or departs from school. Automated alerts to admin and parents — no manual calls." },
  { icon: Star,          title: "Driver Safety Scores",       description: "Score drivers on harsh braking, acceleration, and overspeed. Create a coaching record that proves due diligence." },
  { icon: Bell,          title: "Route Adherence",            description: "Detect route deviations and unscheduled stops in real time. Respond before the situation escalates." },
  { icon: ShieldCheck,   title: "Overspeed Alerts",           description: "Set speed thresholds per zone type — school zones, highways, residential areas. Alerts fire in under 5 seconds." },
  { icon: ClipboardList, title: "Incident Reporting",         description: "Log safety incidents with timestamps, GPS coordinates, and driver details. Audit-ready records generated automatically." },
];

const useCases = [
  { title: "K-12 Schools",              description: "Track school bus fleets with live parent notifications, school gate geofences, and full driver safety scoring for every route every day.", stat: "98% safety compliance" },
  { title: "Universities",              description: "Manage campus shuttle routes and off-site transport. Schedule adherence and overspeed alerts keep student journeys compliant.", stat: "4.9/5 parent rating" },
  { title: "Private Coach Operators",   description: "Run contract school transport with a full digital trail per trip. Route history, safety scores, and incident logs ready for any audit.", stat: "Every route logged" },
];

function SafetyScoreChart() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun"];
  const vals = [64, 70, 76, 82, 88, 94];
  const minV = 55;
  const maxV = 100;
  const range = maxV - minV;
  const barW = 32;
  const gap = 48;
  const startX = 40;
  return (
    <svg viewBox="0 0 320 130" className="w-full" aria-label="School fleet safety score improvement month over month" role="img">
      <defs>
        <linearGradient id="eduSafeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
      {[60, 75, 90].map(v => {
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
            <rect x={x - barW / 2} y={y} width={barW} height={barH} rx="4" fill="url(#eduSafeGrad)"/>
            <text x={x} y={y - 4} fontSize="8" fill="rgba(34,197,94,0.9)" textAnchor="middle">{v}</text>
            <text x={x} y="115" fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="middle">{months[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function EducationTransportPage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(34,197,94,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid rgba(34,197,94,0.4)", color: "#22C55E", background: "rgba(34,197,94,0.1)" }}>
                <School className="h-3.5 w-3.5" /> Education Transport
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Student safety, <span className="gradient-text">proven on every route.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility gives schools and transport operators verifiable safety records, live parent tracking, and geofence alerts — proving duty of care on every single journey.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Parent live tracking", "School gate geofences", "Driver safety scores", "Incident reporting"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#22C55E" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
                <Link href="/industries" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>All Industries <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(34,197,94,0.3)", boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(34,197,94,0.08)" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src="/industry-school-bus.avif" alt="School bus safety tracking" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"98%", l:"Safety compliance" }, { v:"4.9/5", l:"Parent rating" }, { v:"Zero", l:"Tolerance alerts" }].map(({ v, l }) => (
                      <div key={l} className="flex-1 rounded-lg px-2.5 py-2 text-center backdrop-blur-md" style={{ background: "rgba(6,14,26,0.7)", border: "1px solid rgba(34,197,94,0.2)" }}>
                        <p className="text-sm font-bold" style={{ color: "#22C55E" }}>{v}</p>
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
            {[{ v:"98%", l:"Safety compliance" }, { v:"4.9/5", l:"Parent rating" }, { v:"Zero", l:"Tolerance alerts" }, { v:"Every", l:"Route logged" }].map(({ v, l }, i) => (
              <div key={l} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "#22C55E" }}>{v}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Safety Analytics" title="Fleet safety scores improving every month" description="Driver safety scoring creates a continuous improvement cycle — bad habits are caught early, coaching is data-driven, and scores rise." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Average Fleet Safety Score — Monthly</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>School bus fleet composite safety score (0–100) after LAS Mobility driver scoring deployment</p>
            <div className="rounded-xl p-4" style={{ background: "#060E1A" }}><SafetyScoreChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <p className="text-xs font-semibold" style={{ color: "#22C55E" }}>Result — Fleet safety score improved from 64 to 94 in 6 months through data-driven driver coaching.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Built for student transport operators" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(c => <FeatureCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="From primary schools to private coaches" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ title, description, stat }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(34,197,94,0.1)" }}><School className="h-6 w-6" style={{ color: "#22C55E" }} /></div>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{description}</p>
                <p className="mt-4 text-xs font-bold" style={{ color: "#22C55E" }}>{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
