"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, LayoutDashboard, ShieldCheck, Lightbulb, FileText, Bell, BarChart3, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: LayoutDashboard, title: "Multi-Branch Dashboard",    description: "All branches, all vehicles, one screen. Filter by region, branch, or vehicle type. No spreadsheet juggling required." },
  { icon: ShieldCheck,     title: "Role-Based Access",         description: "Branch managers see their fleet. Regional heads see their region. Executives see everything. Granular, auditable permissions." },
  { icon: Lightbulb,       title: "AI Efficiency Insights",    description: "Surface underutilised vehicles, high-idle branches, and inefficient routes automatically — with recommended actions." },
  { icon: FileText,        title: "Consolidated Reports",      description: "Pull fleet-wide reports or drill down to a single branch. Export to PDF or CSV for board decks and finance reviews." },
  { icon: Bell,            title: "Custom Alert Rules",        description: "Set different alert thresholds per branch, vehicle class, or driver group. Enterprise-grade configuration without complexity." },
  { icon: BarChart3,       title: "Executive KPI Dashboard",   description: "Track fleet utilisation, cost per km, safety scores, and compliance across the entire organisation in real time." },
];

const useCases = [
  { title: "National Logistics Groups",        description: "Centralise visibility across 10+ depots. Compare route efficiency, driver scores, and fuel cost by region with drill-down reporting.", stat: "↑ 18% fleet utilisation" },
  { title: "Enterprise Retail",                description: "Manage delivery fleets across distribution centres and stores. Track planned vs actual with automated exception alerts per branch.", stat: "1,000+ vehicles on one view" },
  { title: "Multi-City Transport Operators",   description: "Coordinate passenger or freight fleets across cities. Role-based access ensures each city team sees only what they need.", stat: "90 days history retained" },
];

function UtilisationChart() {
  const branches = ["Delhi","Mumbai","Chennai","Kolkata","Pune","Hyd","Bengaluru"];
  const before = [52, 58, 49, 61, 55, 60, 53];
  const after  = [68, 74, 67, 77, 72, 76, 70];
  const maxV = 90;
  const rowH = 14;
  const startY = 10;
  const labelW = 46;
  return (
    <svg viewBox="0 0 320 130" className="w-full" aria-label="Fleet utilisation improvement by branch" role="img">
      <defs>
        <linearGradient id="entBeforeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0.5"/>
        </linearGradient>
        <linearGradient id="entAfterGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#22C55E"/>
        </linearGradient>
      </defs>
      <text x="56" y="7" fontSize="7" fill="rgba(255,255,255,0.35)" textAnchor="start">Before</text>
      <text x="170" y="7" fontSize="7" fill="rgba(34,197,94,0.9)" textAnchor="start">After</text>
      {branches.map((b, i) => {
        const y = startY + i * (rowH + 2);
        const bw = (before[i] / maxV) * 230;
        const aw = (after[i] / maxV) * 230;
        return (
          <g key={b}>
            <text x={labelW - 2} y={y + rowH / 2 + 3} fontSize="7.5" fill="rgba(255,255,255,0.4)" textAnchor="end">{b}</text>
            <rect x={labelW} y={y} width={bw} height={rowH / 2 - 1} rx="2" fill="url(#entBeforeGrad)"/>
            <text x={labelW + bw + 2} y={y + rowH / 2 - 3} fontSize="7" fill="rgba(255,255,255,0.35)">{before[i]}%</text>
            <rect x={labelW} y={y + rowH / 2} width={aw} height={rowH / 2 - 1} rx="2" fill="url(#entAfterGrad)"/>
            <text x={labelW + aw + 2} y={y + rowH - 2} fontSize="7" fill="rgba(34,197,94,0.9)">{after[i]}%</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function EnterpriseFleetPage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(34,197,94,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid rgba(34,197,94,0.4)", color: "#22C55E", background: "rgba(34,197,94,0.1)" }}>
                <Building2 className="h-3.5 w-3.5" /> Enterprise Fleet
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Centralised control <span className="gradient-text">across every branch.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility gives enterprise fleet operators a single pane of glass across every branch, region, and vehicle type — with role-based access and AI-powered efficiency insights.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Multi-branch dashboard", "Role-based access", "AI efficiency insights", "Executive KPI reports"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#22C55E" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
                <Link href="/solutions" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>All Solutions <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(34,197,94,0.3)", boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(34,197,94,0.08)" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src="/industry-construction.avif" alt="Enterprise fleet management dashboard" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"1,000+", l:"Vehicles on one view" }, { v:"↑18%", l:"Fleet utilisation" }, { v:"90 days", l:"History" }].map(({ v, l }) => (
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
            {[{ v:"1,000+", l:"Vehicles on one view" }, { v:"↑18%", l:"Fleet utilisation" }, { v:"Role-based", l:"Access control" }, { v:"90 days", l:"History retained" }].map(({ v, l }, i) => (
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
          <SectionHeader eyebrow="Fleet Analytics" title="Utilisation up across every branch" description="Before and after LAS Mobility — fleet utilisation improvements tracked per branch, with AI recommendations driving continuous gains." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Fleet Utilisation — Before vs After by Branch</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Average active utilisation percentage across 7 regional branches</p>
            <div className="rounded-xl p-4" style={{ background: "#060E1A" }}><UtilisationChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <p className="text-xs font-semibold" style={{ color: "#22C55E" }}>Result — Average fleet utilisation improved by 18% across all branches within the first quarter of deployment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Enterprise-grade fleet intelligence" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(c => <FeatureCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Scale across regions without losing control" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ title, description, stat }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(34,197,94,0.1)" }}><Building2 className="h-6 w-6" style={{ color: "#22C55E" }} /></div>
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
