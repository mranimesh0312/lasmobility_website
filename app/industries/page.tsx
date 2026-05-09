"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Truck, Package, School, Bus, Factory, Wrench, Landmark, Ambulance,
  CheckCircle2, ArrowRight, CalendarCheck,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";

const industries = [
  {
    id: "logistics",
    icon: Truck,
    title: "Logistics & Transport",
    headline: "Full visibility across long-haul and regional freight",
    description:
      "Track trucks across highways and city routes. Monitor route adherence, investigate deviations, and give dispatch the live intelligence to react before delays become incidents.",
    image: "/industry-truck.avif",
    color: "#0ECECE",
    features: [
      "Live position for every vehicle in transit",
      "Route deviation and off-route alerts",
      "Stoppage analysis with unscheduled stop flags",
      "Trip history with exportable mileage reports",
      "Driver behaviour scoring per trip",
    ],
    stat: { value: "↓ 18%", label: "Avg idle time reduction" },
  },
  {
    id: "delivery",
    icon: Package,
    title: "Last-Mile Delivery",
    headline: "More drops per day, lower cost per parcel",
    description:
      "High-frequency delivery fleets need AI-optimised stop sequences, live ETAs, and instant alerts for unscheduled stops. LAS Mobility turns raw GPS into delivery intelligence.",
    image: "/industry-delivery-van.avif",
    color: "#F59E0B",
    features: [
      "AI multi-stop route optimisation",
      "Real-time ETA updates per stop",
      "Proof-of-delivery trip logging",
      "Dead mileage identification",
      "Cost-per-delivery benchmarking",
    ],
    stat: { value: "20%", label: "More drops per day" },
  },
  {
    id: "education",
    icon: School,
    title: "Education Transport",
    headline: "Student safety backed by real-time data",
    description:
      "School bus operators, university transport, and campus fleets all need accountability that parents and administrators can see. LAS Mobility automates safety visibility for every route.",
    image: "/industry-school-bus.avif",
    color: "#22C55E",
    features: [
      "Live bus tracking for parents and admins",
      "Geofence alerts at school gates",
      "Overspeed and harsh driving notifications",
      "Driver safety score per route",
      "Route deviation instant alerts",
    ],
    stat: { value: "98%", label: "Safety compliance score" },
  },
  {
    id: "corporate",
    icon: Bus,
    title: "Corporate Mobility",
    headline: "Reliable shift transport, tracked end-to-end",
    description:
      "Employee transport teams run dozens of routes across shifts. LAS Mobility gives operators the visibility to confirm pickups, monitor delays, and prevent SLA failures — automatically.",
    image: "/industry-employee-bus.avif",
    color: "#8B5CF6",
    features: [
      "Live route progress per shift vehicle",
      "Automated stoppage and delay logging",
      "Multi-branch fleet oversight in one view",
      "On-time performance tracking per route",
      "Monthly trip summaries per vehicle",
    ],
    stat: { value: "94%", label: "On-time rate" },
  },
  {
    id: "construction",
    icon: Factory,
    title: "Construction & Assets",
    headline: "Track every vehicle and asset across project sites",
    description:
      "Construction fleets span multiple sites with high-value vehicles and machinery. LAS Mobility reduces misuse, controls after-hours movement, and improves asset utilisation across the project.",
    image: "/industry-construction.avif",
    color: "#EF4444",
    features: [
      "After-hours ignition alerts",
      "Site geofence entry and exit tracking",
      "Idle time monitoring and reduction",
      "Asset utilisation reports per site",
      "Device tamper and offline alerts",
    ],
    stat: { value: "↓ 27%", label: "Asset idle time" },
  },
  {
    id: "field-service",
    icon: Wrench,
    title: "Field Service",
    headline: "Dispatch smarter. Complete more service calls.",
    description:
      "Field service teams need fast dispatch and maximum coverage. LAS Mobility maps every technician live so you assign the nearest available resource and verify visit completion automatically.",
    image: "/industry-car-rental.avif",
    color: "#0ECECE",
    features: [
      "Live technician map with nearest dispatch",
      "Geofence arrival at customer sites",
      "Visit duration and dwell time logging",
      "Trip history and mileage for billing",
      "Safety scoring for field drivers",
    ],
    stat: { value: "30%", label: "More service calls/day" },
  },
  {
    id: "government",
    icon: Landmark,
    title: "Government Fleets",
    headline: "Accountable mobility for public sector operations",
    description:
      "Government and institutional fleets require auditable movement data, strict route adherence, and role-based access for different departments. LAS Mobility delivers the compliance layer public sector fleets demand.",
    image: "/industry-mining.avif",
    color: "#F59E0B",
    features: [
      "Role-based access by department",
      "Exportable audit-ready trip reports",
      "Route adherence tracking per vehicle",
      "Secure multi-user dashboard access",
      "Fleet utilisation benchmarking",
    ],
    stat: { value: "100%", label: "Trips automatically logged" },
  },
  {
    id: "specialized",
    icon: Ambulance,
    title: "Specialized Fleets",
    headline: "Critical operations need zero-compromise tracking",
    description:
      "Healthcare, emergency response, and time-sensitive fleets operate under conditions where visibility failures have consequences. LAS Mobility's 99.9% uptime SLA and sub-5-second alerts are built for this.",
    image: "/industry-emergency.avif",
    color: "#EF4444",
    features: [
      "Sub-5-second alert delivery",
      "99.9% platform uptime SLA",
      "Multi-channel alert escalation",
      "Device offline and tamper detection",
      "Custom geofence and threshold rules",
    ],
    stat: { value: "< 5 sec", label: "Alert delivery time" },
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(14,206,206,0.09), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
            style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)", color: "var(--accent-text)" }}
          >
            Industries
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--text-primary)" }}>
            Sector-specific fleet intelligence
            <br />
            <span className="gradient-text">for every industry</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
            LAS Mobility adapts to the operating model of every fleet-heavy sector — from last-mile delivery and school buses to government fleets and emergency response.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm">
              <CalendarCheck className="h-4 w-4" /> Book a Demo
            </Link>
            <Link href="/solutions" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>
              View Solutions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            {[
              { value: "8+",     label: "Industries supported" },
              { value: "50+",    label: "Countries with active fleets" },
              { value: "99.9%",  label: "Platform uptime SLA" },
              { value: "< 5 sec", label: "Alert delivery across all sectors" },
            ].map(({ value, label }, i) => (
              <div key={label} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "var(--accent-text)" }}>{value}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry grid */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Sectors"
            title="Built for your vertical, not a generic template"
            description="Each industry has different pressure points — safety compliance, cost per delivery, asset utilisation, or audit trails. LAS Mobility configures to the rules your sector runs by."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {industries.map(({ id, icon: Icon, title, headline, description, image, color, features, stat }) => (
              <motion.div
                key={id}
                id={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-2xl"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
              >
                {/* Image banner */}
                <div className="relative h-44 overflow-hidden">
                  <Image src={image} alt={title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(6,14,26,0.85) 100%)" }} />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md" style={{ background: `${color}25`, border: `1px solid ${color}45` }}>
                      <Icon className="h-4.5 w-4.5" style={{ color }} />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color }}>
                        {title}
                      </p>
                      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.value} — {stat.label}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold leading-snug" style={{ color: "var(--text-primary)" }}>{headline}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold transition hover:opacity-70"
                    style={{ color }}
                  >
                    Talk to us about {title} <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-industry platform note */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl p-8 sm:p-12" style={{ background: "var(--bg-card)", border: "1px solid var(--border-accent)" }}>
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent-text)" }}>One platform</span>
                <h2 className="mt-3 text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                  Same trusted platform. Configured for your sector.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                  Geofences, alert rules, dashboard views, reports, and AI insights can all be shaped around the workflows of your specific industry — without fragmenting fleet visibility or adopting multiple tools.
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                  {[
                    "Configurable alert thresholds",
                    "Custom geofence zones",
                    "Role-based access controls",
                    "Industry-specific report templates",
                    "Multi-branch and multi-vehicle-type support",
                    "99.9% uptime SLA",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm whitespace-nowrap">
                  <CalendarCheck className="h-4 w-4" /> Book a Demo
                </Link>
                <Link href="/solutions" className="inline-flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-80" style={{ color: "var(--accent-text)" }}>
                  Browse solutions <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
