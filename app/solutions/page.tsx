"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Truck, School, UsersRound, Building2, PackageCheck, Zap,
  CheckCircle2, ArrowRight, CalendarCheck,
  Map, ShieldAlert, BellRing, Route, BrainCircuit,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";

const solutions = [
  {
    id: "logistics",
    icon: Truck,
    title: "Logistics & Delivery",
    headline: "Every truck. Every trip. Fully visible.",
    description:
      "From depot dispatch to proof of delivery, LAS Mobility gives logistics operators complete visibility across their fleet. Track live positions, monitor route adherence, and review trip history — without calling drivers.",
    image: "/industry-truck.avif",
    color: "#0ECECE",
    stats: [
      { value: "↓ 22%", label: "Cost per delivery" },
      { value: "↑ 18%", label: "Fleet utilisation" },
      { value: "40%", label: "Faster dispatch response" },
    ],
    features: [
      "Live GPS tracking across all vehicles",
      "Route deviation alerts for unauthorised stops",
      "Trip replay and stoppage analysis",
      "Planned vs actual route comparison",
      "Driver safety scoring per trip",
      "Export reports for client billing",
    ],
  },
  {
    id: "school",
    icon: School,
    title: "School Transport",
    headline: "Student safety you can prove.",
    description:
      "Parents, administrators, and operators all need confidence that every student arrives safely. LAS Mobility delivers live bus tracking, automatic geofence alerts, and driver safety scoring built specifically for education fleets.",
    image: "/industry-school-bus.avif",
    color: "#F59E0B",
    stats: [
      { value: "98%", label: "Safety compliance" },
      { value: "4.9/5", label: "Parent trust score" },
      { value: "< 3 min", label: "Incident response time" },
    ],
    features: [
      "Live bus position for parents and admins",
      "Geofence alerts at every school gate",
      "Overspeed and harsh driving notifications",
      "Driver score card per route",
      "Automatic pickup and drop-off logging",
      "Route deviation alerts in real time",
    ],
  },
  {
    id: "employee",
    icon: UsersRound,
    title: "Employee Transport",
    headline: "Reliable shift transport, tracked end-to-end.",
    description:
      "Corporate transport teams manage dozens of routes across shifts every day. LAS Mobility centralises visibility so operators can confirm pick-ups, monitor delays, and respond to exceptions without manual check-ins.",
    image: "/industry-employee-bus.avif",
    color: "#8B5CF6",
    stats: [
      { value: "94%", label: "On-time rate achieved" },
      { value: "↓ 31%", label: "Unplanned idle time" },
      { value: "3×", label: "Dispatch visibility increase" },
    ],
    features: [
      "Live route progress per shift vehicle",
      "Automated stoppage and delay logging",
      "Driver behaviour scoring per trip",
      "Geofence alerts for office and pickup zones",
      "Multi-branch fleet oversight in one view",
      "Monthly trip summaries per vehicle",
    ],
  },
  {
    id: "enterprise",
    icon: Building2,
    title: "Enterprise Fleet",
    headline: "Centralised control across every branch.",
    description:
      "Large enterprises need fleet visibility that scales across cities, branches, and vehicle types — without losing granularity. LAS Mobility's multi-branch architecture gives operations teams one unified command view.",
    image: "/industry-construction.avif",
    color: "#22C55E",
    stats: [
      { value: "1,000+", label: "Vehicles on one dashboard" },
      { value: "↑ 18%", label: "Fleet utilisation rate" },
      { value: "Role-based", label: "Access controls" },
    ],
    features: [
      "Multi-branch fleet on a single map",
      "Role-based access by branch or team",
      "AI-powered route and efficiency insights",
      "Consolidated reporting across all vehicles",
      "Custom alert rules per vehicle group",
      "Executive dashboards with KPI tracking",
    ],
  },
  {
    id: "delivery",
    icon: PackageCheck,
    title: "Delivery Operations",
    headline: "More drops. Less mileage. Better SLAs.",
    description:
      "High-frequency delivery fleets live and die by on-time performance. LAS Mobility optimises stop sequences, detects idle time, and gives dispatch the live visibility to adjust routes before SLAs are missed.",
    image: "/industry-delivery-van.avif",
    color: "#EF4444",
    stats: [
      { value: "20%", label: "More drops per day" },
      { value: "↓ 24%", label: "Route distance saved" },
      { value: "38 min", label: "Avg time saved per trip" },
    ],
    features: [
      "AI-optimised multi-stop sequencing",
      "Real-time ETA updates per stop",
      "Dead mileage identification and reduction",
      "Unscheduled stop detection",
      "Proof-of-delivery trip logging",
      "Cost per delivery benchmarking",
    ],
  },
  {
    id: "field",
    icon: Zap,
    title: "Field Operations",
    headline: "Dispatch smarter. Track every call.",
    description:
      "Field service teams need fast response and maximum coverage. LAS Mobility puts every technician on a live map so dispatchers assign the nearest available resource, track visit progress, and verify service completion.",
    image: "/industry-car-rental.avif",
    color: "#0ECECE",
    stats: [
      { value: "30%", label: "More service calls per day" },
      { value: "↓ 25%", label: "Response time reduction" },
      { value: "100%", label: "Trips automatically logged" },
    ],
    features: [
      "Live technician positions on a map",
      "Nearest available vehicle dispatch",
      "Geofence arrival at customer sites",
      "Visit duration and dwell time logging",
      "Trip history and mileage for billing",
      "Safety scoring for field drivers",
    ],
  },
];

const keyFeatures = [
  { icon: Map,         label: "Live Tracking",       href: "/features/live-tracking" },
  { icon: Route,       label: "Route Optimisation",  href: "/features/route-optimization" },
  { icon: ShieldAlert, label: "Driver Safety",        href: "/features/driver-safety" },
  { icon: BellRing,    label: "Smart Alerts",         href: "/features/smart-alerts" },
  { icon: BrainCircuit,label: "AI Intelligence",      href: "/ai-intelligence" },
  { icon: Route,       label: "Route Analytics",      href: "/features/route-analytics" },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34,197,94,0.09), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#22C55E" }}
          >
            Solutions
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--text-primary)" }}>
            Fleet intelligence built around
            <br />
            <span style={{ color: "#22C55E" }}>how your fleet operates</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
            Whether you run school buses, delivery vans, or an enterprise fleet across multiple cities — LAS Mobility gives every operator the tools that fit their operating model.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm">
              <CalendarCheck className="h-4 w-4" /> Book a Demo
            </Link>
            <Link href="/features" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>
              Explore Features <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            {[
              { value: "6",      label: "Fleet operating models supported" },
              { value: "1,000+", label: "Vehicles managed on one platform" },
              { value: "↓ 22%",  label: "Avg cost reduction across fleets" },
              { value: "99.9%",  label: "Platform uptime SLA" },
            ].map(({ value, label }, i) => (
              <div key={label} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "#22C55E" }}>{value}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution cards */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          {solutions.map(({ id, icon: Icon, title, headline, description, image, color, stats, features }, idx) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              id={id}
              className="overflow-hidden rounded-2xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
            >
              <div className={`grid items-stretch lg:grid-cols-2 ${idx % 2 !== 0 ? "lg:[direction:rtl]" : ""}`}>
                {/* Image panel */}
                <div className="relative min-h-[260px] overflow-hidden lg:[direction:ltr]" style={{ background: "#060E1A" }}>
                  <Image src={image} alt={title} fill className="object-cover opacity-80" sizes="(max-width:1024px) 100vw, 50vw" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(6,14,26,0.85))" }} />
                  {/* Stats overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3 lg:[direction:ltr]">
                    {stats.map(({ value, label }) => (
                      <div key={label} className="flex-1 rounded-xl px-3 py-2.5 text-center backdrop-blur-md" style={{ background: "rgba(6,14,26,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <p className="text-lg font-bold" style={{ color }}>{value}</p>
                        <p className="text-[10px] leading-tight" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content panel */}
                <div className="flex flex-col justify-center p-8 lg:[direction:ltr]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${color}18`, border: `1px solid ${color}35` }}>
                      <Icon className="h-5 w-5" style={{ color }} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>{title}</span>
                  </div>
                  <h2 className="text-2xl font-bold leading-snug" style={{ color: "var(--text-primary)" }}>{headline}</h2>
                  <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>{description}</p>
                  <ul className="mt-5 grid grid-cols-2 gap-y-2 gap-x-4">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-80"
                      style={{ background: `${color}18`, border: `1px solid ${color}35`, color }}>
                      Get a demo for {title} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Platform features strip */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Platform"
            title="One platform. Every solution."
            description="All six solutions run on the same LAS Mobility platform — so your team never juggles tools as your fleet grows."
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {keyFeatures.map(({ icon: Icon, label, href }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-3 rounded-xl p-4 text-center transition hover:opacity-80"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow)" }}>
                  <Icon className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
                </span>
                <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
