import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Thermometer, Bell, BarChart3, FileText, Wifi,
  ShieldCheck, Clock, Truck, FlaskConical, Package,
  ArrowRight, CalendarCheck, CheckCircle2,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

export const metadata: Metadata = {
  title: "Temperature Monitoring | LAS Mobility",
  description:
    "Real-time cold chain visibility for pharmaceutical, food, and perishable cargo. Live temperature tracking, threshold alerts, and compliance-ready logs.",
};

const capabilities = [
  {
    icon: Thermometer,
    title: "Live Temperature Readings",
    description:
      "Monitor compartment temperature in real time from the dashboard or mobile app. Multi-zone support for vehicles carrying mixed cargo at different setpoints.",
  },
  {
    icon: Bell,
    title: "Instant Threshold Alerts",
    description:
      "Receive immediate SMS, email, or in-app notifications the moment temperature exceeds your defined safe range — before cargo is compromised.",
  },
  {
    icon: BarChart3,
    title: "Historical Temperature Logs",
    description:
      "Access minute-by-minute temperature history for any trip or time period. Exportable for audit trails, insurance claims, and regulatory compliance.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Reporting",
    description:
      "Generate automated reports aligned with FSSAI, GDP, and cold chain standards. Prove chain-of-custody with timestamped temperature records.",
  },
  {
    icon: Wifi,
    title: "Sensor Integration",
    description:
      "Compatible with leading temperature sensor hardware. Plug-and-play setup with LAS GPS devices — no separate gateway hardware required.",
  },
  {
    icon: Clock,
    title: "Breach Duration Tracking",
    description:
      "Record exactly how long temperature remained outside the safe zone. Critical for assessing product viability and filing accurate incident reports.",
  },
];

const useCases = [
  {
    icon: FlaskConical,
    industry: "Pharmaceuticals",
    description:
      "Maintain 2–8°C cold chain for vaccines, biologics, and temperature-sensitive medicines from warehouse to clinic.",
    stat: "99.9% cold chain integrity",
  },
  {
    icon: Package,
    industry: "Food & Dairy",
    description:
      "Track perishable goods, dairy, meat, and frozen products across distribution routes with automated excursion alerts.",
    stat: "Reduce spoilage by up to 30%",
  },
  {
    icon: Truck,
    industry: "Logistics & 3PL",
    description:
      "Offer temperature-controlled transport as a premium service with verifiable data your customers can trust.",
    stat: "Client SLA documentation ready",
  },
];

const stats = [
  { value: "±0.5°C", label: "Sensor accuracy" },
  { value: "<5 sec", label: "Alert response time" },
  { value: "2 zones", label: "Per vehicle (expandable)" },
  { value: "90 days", label: "Log retention" },
];

export default function TemperatureMonitoringPage() {
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
              "radial-gradient(ellipse 55% 45% at 60% 30%, rgba(14,206,206,0.1), transparent)",
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
                  <Thermometer className="h-3.5 w-3.5" />
                  Temperature Monitoring
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
                Cold chain visibility,{" "}
                <span className="gradient-text">always on</span>
              </h1>
              <p
                className="mt-5 max-w-lg text-lg leading-8"
                style={{ color: "var(--text-secondary)" }}
              >
                Know the temperature inside every compartment, in real time.
                LAS Mobility integrates with in-vehicle sensors to give you
                live readings, breach alerts, and compliance-ready logs — all
                in the same platform you use for GPS tracking.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Multi-zone monitoring",
                  "Instant breach alerts",
                  "Compliance-ready logs",
                  "Sensor agnostic",
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
                  boxShadow: "0 24px 64px rgba(0,0,0,0.4), 0 0 60px rgba(14,206,206,0.1)",
                }}
              >
                <div className="relative h-64 overflow-hidden" style={{ background: "#060E1A" }}>
                  <Image
                    src="/module-temperature.svg"
                    alt="Temperature monitoring dashboard"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                    Live Cold Chain View
                  </p>
                  <p className="mt-1 text-xs leading-5" style={{ color: "var(--text-muted)" }}>
                    Zone A: −2°C &nbsp;·&nbsp; Zone B: +4°C &nbsp;·&nbsp; All within range
                  </p>
                  <div
                    className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.3)",
                    }}
                  >
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">
                      All zones within safe range
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
            className="grid grid-cols-2 divide-x divide-y lg:grid-cols-4 lg:divide-y-0"
            style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="px-8 py-10 text-center" style={{ borderColor: "var(--border)" }}>
                <p className="text-3xl font-bold" style={{ color: "var(--accent-text)" }}>
                  {value}
                </p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                  {label}
                </p>
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
            title="Everything you need for cold chain compliance"
            description="From live sensor readings to breach documentation, LAS Mobility covers the full temperature monitoring workflow — without adding separate software."
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
          <SectionHeader
            eyebrow="How it works"
            title="Sensor to dashboard in seconds"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Sensor installed",
                body: "Temperature probe fitted inside the cargo compartment. Connects to existing LAS GPS device via RS232/1-Wire.",
              },
              {
                step: "02",
                title: "Data transmitted",
                body: "Readings sent to the cloud every 30 seconds alongside GPS position and vehicle telemetry.",
              },
              {
                step: "03",
                title: "Dashboard updates",
                body: "Temperature appears on your fleet dashboard alongside live map — no separate portal needed.",
              },
              {
                step: "04",
                title: "Alerts & reports",
                body: "Breach notifications dispatched in under 5 seconds. Full logs auto-generated for compliance.",
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                className="rounded-xl p-6"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="text-4xl font-bold"
                  style={{ color: "var(--accent-text)", opacity: 0.35 }}
                >
                  {step}
                </span>
                <h3
                  className="mt-3 text-base font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
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
            title="Built for industries where temperature is non-negotiable"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ icon: Icon, industry, description, stat }) => (
              <div
                key={industry}
                className="rounded-xl p-6"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-card)",
                }}
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
                <p
                  className="mt-4 text-xs font-bold"
                  style={{ color: "var(--accent-text)" }}
                >
                  {stat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── File report preview ── */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-accent)",
            }}
          >
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  Auto-Generated Compliance Report
                </span>
              </div>
              <span
                className="rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{
                  background: "rgba(34,197,94,0.1)",
                  color: "#22C55E",
                  border: "1px solid rgba(34,197,94,0.3)",
                }}
              >
                PDF / Excel
              </span>
            </div>
            <div className="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0" style={{ borderColor: "var(--border)" }}>
              {[
                { label: "Route", value: "Mumbai → Pune Cold Run" },
                { label: "Vehicle", value: "MH-04-TK-7842" },
                { label: "Zone A avg temp", value: "−1.8 °C" },
                { label: "Zone B avg temp", value: "+3.6 °C" },
                { label: "Breaches", value: "0 recorded" },
                { label: "Compliance status", value: "✓ GDP Compliant" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{label}</span>
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
