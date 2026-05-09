import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Fuel, Bell, BarChart3, ShieldAlert, TrendingDown,
  Gauge, Clock, Truck, Building2, Route,
  ArrowRight, CalendarCheck, CheckCircle2,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

export const metadata: Metadata = {
  title: "Fuel Monitoring | LAS Mobility",
  description:
    "Real-time fuel level tracking, theft detection, refuel event logging, and cost-per-km analytics for every vehicle in your fleet.",
};

const capabilities = [
  {
    icon: Fuel,
    title: "Real-Time Fuel Level",
    description:
      "See live tank levels for every vehicle on the dashboard. Capacitive sensors deliver accurate readings updated with each GPS ping.",
  },
  {
    icon: ShieldAlert,
    title: "Theft & Drain Detection",
    description:
      "Automatic alerts when fuel drops sharply while the vehicle is stationary. Every suspected drain event is timestamped and geo-tagged.",
  },
  {
    icon: BarChart3,
    title: "Consumption Analytics",
    description:
      "Track litres consumed per km, per route, and per driver. Spot inefficient vehicles and driving patterns that are costing you money.",
  },
  {
    icon: Bell,
    title: "Refuel Event Logging",
    description:
      "Every refuel is recorded automatically — quantity added, location, time, and vehicle ID — creating an auditable paper trail.",
  },
  {
    icon: TrendingDown,
    title: "Cost-Per-Km Reporting",
    description:
      "Combine fuel data with trip distance to calculate per-vehicle and fleet-wide fuel costs. Export for finance and operations review.",
  },
  {
    icon: Gauge,
    title: "Idle Fuel Waste Alerts",
    description:
      "Identify vehicles burning fuel while stationary. Quantify idle cost in currency, not just hours, to drive operational change.",
  },
];

const useCases = [
  {
    icon: Truck,
    industry: "Long-Haul Logistics",
    description:
      "Track diesel consumption across hundreds of trucks. Detect theft at remote stops and reconcile pump vouchers against actual fills.",
    stat: "Up to 15% fuel savings reported",
  },
  {
    icon: Building2,
    industry: "Construction & Mining",
    description:
      "Monitor heavy equipment fuel at sites where manual dipping is impractical. Alert supervisors to unauthorized drainage instantly.",
    stat: "Theft incidents reduced by 60%+",
  },
  {
    icon: Route,
    industry: "Multi-Branch Fleets",
    description:
      "Centralize fuel spend visibility across depots, branches, and subsidiaries. Benchmark cost per km by location and vehicle type.",
    stat: "Full fleet fuel P&L in one view",
  },
];

const stats = [
  { value: "±1%", label: "Sensor accuracy" },
  { value: "< 30 sec", label: "Theft alert response" },
  { value: "₹ / km", label: "Cost analytics" },
  { value: "100%", label: "Refuels logged" },
];

export default function FuelMonitoringPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="section-pad relative overflow-hidden"
        style={{ background: "var(--bg-deep)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 60% 30%, rgba(245,158,11,0.08), transparent)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Copy */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    border: "1px solid var(--border-accent)",
                    color: "var(--accent-text)",
                    background: "var(--accent-glow)",
                  }}
                >
                  <Fuel className="h-3.5 w-3.5" />
                  Fuel Monitoring
                </span>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: "rgba(245,158,11,0.12)",
                    border: "1px solid rgba(245,158,11,0.35)",
                    color: "#F59E0B",
                  }}
                >
                  <Clock className="h-3 w-3" /> Coming Soon
                </span>
              </div>

              <h1
                className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
                style={{ color: "var(--text-primary)" }}
              >
                Stop fuel theft.{" "}
                <span className="gradient-text">Start saving.</span>
              </h1>
              <p
                className="mt-5 max-w-lg text-lg leading-8"
                style={{ color: "var(--text-secondary)" }}
              >
                LAS Mobility integrates directly with capacitive tank sensors
                to deliver live fuel levels, automated refuel logs, and theft
                detection — turning your biggest variable cost into a
                measurable, manageable number.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Real-time tank level",
                  "Theft detection alerts",
                  "Refuel auto-logging",
                  "Cost per km reports",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <CheckCircle2
                      className="h-4 w-4 shrink-0"
                      style={{ color: "var(--accent-text)" }}
                    />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm">
                  <CalendarCheck className="h-4 w-4" /> Get Early Access
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                    background: "var(--bg-card)",
                  }}
                >
                  All Features <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-md overflow-hidden rounded-2xl"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-accent)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.4), 0 0 60px rgba(14,206,206,0.08)",
                }}
              >
                <div className="relative h-64 overflow-hidden" style={{ background: "#060E1A" }}>
                  <Image
                    src="/module-fuel.svg"
                    alt="Fuel monitoring dashboard"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                    Fuel Intelligence Dashboard
                  </p>
                  <p className="mt-1 text-xs leading-5" style={{ color: "var(--text-muted)" }}>
                    Live tank levels · Refuel events · Cost per km · Theft alerts
                  </p>
                  <div
                    className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
                    style={{
                      background: "rgba(245,158,11,0.1)",
                      border: "1px solid rgba(245,158,11,0.3)",
                    }}
                  >
                    <Bell className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-xs font-semibold text-amber-400">
                      1 drain event detected — VAN-42, 09:14
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="px-8 py-10 text-center"
                style={{ borderRight: "1px solid var(--border)" }}
              >
                <p className="text-3xl font-bold" style={{ color: "var(--accent-text)" }}>{value}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Capabilities"
            title="Full-spectrum fuel intelligence"
            description="LAS Mobility doesn't just show you fuel levels — it explains consumption, catches theft, and helps you act on every litre saved."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <FeatureCard key={cap.title} {...cap} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="How it works" title="Tank sensor to actionable insight" />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Sensor wired to tank",
                body: "Capacitive fuel level sensor installed in the vehicle tank. Calibrated to your vehicle's geometry for accurate litre readings.",
              },
              {
                step: "02",
                title: "Data flows to device",
                body: "LAS GPS unit reads sensor values every 30 seconds. No separate telematic box needed — single device, all data.",
              },
              {
                step: "03",
                title: "Platform detects events",
                body: "AI engine identifies drain patterns, refuel spikes, and idle waste. Anomalies trigger instant push alerts.",
              },
              {
                step: "04",
                title: "Reports & cost analysis",
                body: "Monthly fuel reports, per-driver consumption, and cost-per-km dashboards are available with one click.",
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                className="rounded-xl p-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <span className="text-4xl font-bold" style={{ color: "var(--accent-text)", opacity: 0.35 }}>
                  {step}
                </span>
                <h3 className="mt-3 text-base font-bold" style={{ color: "var(--text-primary)" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Use cases"
            title="Where fuel monitoring pays for itself"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ icon: Icon, industry, description, stat }) => (
              <div
                key={industry}
                className="rounded-xl p-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "var(--accent-glow)" }}
                >
                  <Icon className="h-6 w-6" style={{ color: "var(--accent-text)" }} />
                </div>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>
                  {industry}
                </h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                  {description}
                </p>
                <p className="mt-4 text-xs font-bold" style={{ color: "var(--accent-text)" }}>
                  {stat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
