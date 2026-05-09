"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, MapPin, Navigation, Clock, FileText, Star, BarChart3, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: MapPin,    title: "Live Technician Positions",    description: "See every field engineer's real-time location on a live map. Know who is available, on-site, or en route instantly." },
  { icon: Navigation,title: "Nearest Vehicle Dispatch",     description: "Assign each new service call to the closest available technician. Reduce drive time and close more tickets per day." },
  { icon: Clock,     title: "Customer Site Geofences",      description: "Auto-log arrival and departure at every customer location. Verify site visits without manual reporting or check-in calls." },
  { icon: BarChart3, title: "Visit Duration Tracking",      description: "Measure time spent on-site per job. Identify jobs running over and technicians who need additional support or training." },
  { icon: FileText,  title: "Trip Mileage for Billing",     description: "Export verified mileage per technician per day for accurate billing, expense claims, and payroll calculations." },
  { icon: Star,      title: "Safety Scoring",               description: "Score field technicians on harsh driving events. Reduce incident risk across your mobile workforce with monthly reviews." },
];

const useCases = [
  { title: "HVAC & Plumbing",      description: "Dispatch technicians to emergency and scheduled jobs with nearest-vehicle logic. Auto-log every site visit with GPS timestamps.", stat: "30% more calls/day" },
  { title: "IT Field Support",     description: "Track field engineers across large service zones. Visit duration logging builds a verifiable record for SLA compliance and billing.", stat: "↓ 25% response time" },
  { title: "Utilities & Maintenance", description: "Manage inspection and maintenance crews across distributed infrastructure. Geofence every site for automatic arrival confirmation.", stat: "100% visits logged" },
];

function ResponseTimeChart() {
  const weeks = ["Wk 1","Wk 2","Wk 3","Wk 4","Wk 5","Wk 6"];
  const vals = [48, 42, 37, 32, 27, 22];
  const minV = 16;
  const maxV = 56;
  const range = maxV - minV;
  const pts = vals.map((v, i) => `${36 + i * 48},${100 - ((v - minV) / range) * 80}`).join(" ");
  const fillPts = `36,100 ${pts} ${36 + 5 * 48},100`;
  return (
    <svg viewBox="0 0 320 130" className="w-full" aria-label="Average response time trend dropping over 6 weeks" role="img">
      <defs>
        <linearGradient id="fsRespGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ECECE"/>
          <stop offset="100%" stopColor="#0ECECE" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="fsFillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ECECE" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#0ECECE" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[20, 30, 40, 50].map(v => {
        const y = 100 - ((v - minV) / range) * 80;
        return (
          <g key={v}>
            <text x="28" y={y + 4} fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="end">{v}m</text>
            <line x1="32" y1={y} x2="310" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </g>
        );
      })}
      <polygon points={fillPts} fill="url(#fsFillGrad)"/>
      <polyline points={pts} fill="none" stroke="url(#fsRespGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {vals.map((v, i) => (
        <g key={i}>
          <circle cx={36 + i * 48} cy={100 - ((v - minV) / range) * 80} r="4" fill="#0ECECE"/>
          <text x={36 + i * 48} y={100 - ((v - minV) / range) * 80 - 9} fontSize="8" fill="rgba(14,206,206,0.9)" textAnchor="middle">{v}m</text>
          <text x={36 + i * 48} y="115" fontSize="8" fill="rgba(255,255,255,0.3)" textAnchor="middle">{weeks[i]}</text>
        </g>
      ))}
    </svg>
  );
}

export default function FieldServicePage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(14,206,206,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>
                <Wrench className="h-3.5 w-3.5" /> Field Service
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Dispatch faster. <span className="gradient-text">Close more tickets.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility gives field service managers a live map of every technician, nearest-vehicle dispatch, and GPS-verified visit logging — so your team closes more calls every day.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Live technician positions", "Nearest vehicle dispatch", "Visit duration tracking", "Trip mileage for billing"].map(item => (
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
                  <Image src="/industry-car-rental.avif" alt="Field service technician dispatch" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"30%", l:"More calls/day" }, { v:"↓25%", l:"Response time" }, { v:"Live", l:"Map dispatch" }].map(({ v, l }) => (
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
            {[{ v:"30%", l:"More calls per day" }, { v:"↓25%", l:"Response time" }, { v:"100%", l:"Visits logged" }, { v:"Live", l:"Map dispatch" }].map(({ v, l }, i) => (
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
          <SectionHeader eyebrow="Service Analytics" title="Response time cut in half in 6 weeks" description="Nearest-vehicle dispatch eliminates the guesswork. Shorter response times mean more tickets closed and higher customer satisfaction." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Average Response Time — 6 Week Trend</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Average minutes from job assignment to technician on-site (48 min → 22 min)</p>
            <div className="rounded-xl p-4" style={{ background: "#060E1A" }}><ResponseTimeChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
              <p className="text-xs font-semibold" style={{ color: "var(--accent-text)" }}>Result — Average response time dropped from 48 to 22 minutes in 6 weeks through nearest-vehicle dispatch.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Built for field service managers" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(c => <FeatureCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Every field service vertical, covered" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ title, description, stat }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)" }}><Wrench className="h-6 w-6" style={{ color: "var(--accent-text)" }} /></div>
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
