import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Fingerprint, UserCheck, ShieldAlert, BarChart3, Clock,
  Bell, IdCard, Truck, School, Building2,
  ArrowRight, CalendarCheck, CheckCircle2,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

export const metadata: Metadata = {
  title: "Driver Identification | LAS Mobility",
  description:
    "RFID and iButton driver identification for fleets. Know exactly who is driving each vehicle, every trip — with automatic login, safety scoring, and unauthorized-use alerts.",
};

const capabilities = [
  {
    icon: Fingerprint,
    title: "RFID & iButton Login",
    description:
      "Drivers tap their RFID card or iButton key to identify themselves before every trip. No manual entry, no buddy-punching, no guesswork.",
  },
  {
    icon: UserCheck,
    title: "Per-Driver Trip Attribution",
    description:
      "Every kilometre, every alert, and every safety event is linked to the authenticated driver — not just the vehicle.",
  },
  {
    icon: ShieldAlert,
    title: "Unauthorized Use Alerts",
    description:
      "Instant notification when a vehicle starts without a valid driver identification. Ideal for overnight, weekend, or off-route protection.",
  },
  {
    icon: BarChart3,
    title: "Individual Driver Scorecards",
    description:
      "Build safety and performance profiles per driver across overspeeding, harsh braking, idle time, and compliance.",
  },
  {
    icon: IdCard,
    title: "Licence & Expiry Tracking",
    description:
      "Store licence details and set expiry reminders. Prevent unqualified drivers from operating vehicles through system-level controls.",
  },
  {
    icon: Bell,
    title: "Shift & Schedule Alerts",
    description:
      "Flag trips outside assigned shifts. Know when a vehicle moves before driver clocks in or after shift ends.",
  },
];

const useCases = [
  {
    icon: School,
    industry: "School Transport",
    description:
      "Ensure only verified, licenced drivers operate student buses. Parents and supervisors get confirmed driver identity on every route.",
    stat: "Zero unauthorized driver incidents",
  },
  {
    icon: Building2,
    industry: "Enterprise Fleets",
    description:
      "Hold every driver accountable for their own safety score. Reduce liability and insurance costs with per-driver event records.",
    stat: "30% improvement in safety scores",
  },
  {
    icon: Truck,
    industry: "Rental & Shared Vehicles",
    description:
      "Track exactly who drove each vehicle and when. Assign damage, incidents, and violations to the right individual every time.",
    stat: "Full trip-to-driver traceability",
  },
];

const stats = [
  { value: "< 1 sec", label: "ID authentication time" },
  { value: "100%", label: "Trip attribution rate" },
  { value: "RFID + iButton", label: "Hardware supported" },
  { value: "Instant", label: "Unauthorized use alert" },
];

export default function DriverIdentificationPage() {
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
              "radial-gradient(ellipse 55% 45% at 60% 30%, rgba(34,197,94,0.08), transparent)",
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
                  <Fingerprint className="h-3.5 w-3.5" />
                  Driver Identification
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
                Know who's behind{" "}
                <span className="gradient-text">the wheel</span>
              </h1>
              <p
                className="mt-5 max-w-lg text-lg leading-8"
                style={{ color: "var(--text-secondary)" }}
              >
                Vehicle data is only half the story. LAS Mobility's driver
                identification links every trip, alert, and safety event to
                the authenticated driver via RFID card or iButton — so
                accountability is automatic, not assumed.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "RFID & iButton support",
                  "Unauthorized use alerts",
                  "Per-driver scorecards",
                  "Licence expiry tracking",
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
                    src="/module-driver-id.svg"
                    alt="Driver identification dashboard"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                    Driver Authentication Panel
                  </p>
                  <p className="mt-1 text-xs leading-5" style={{ color: "var(--text-muted)" }}>
                    Rajesh Kumar · DRV-00428 · Safety Score 98 · 142 trips this month
                  </p>
                  <div
                    className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.3)",
                    }}
                  >
                    <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">
                      Driver verified · Shift active
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
            title="Accountability built into every trip"
            description="From authentication hardware to safety scorecards, LAS Mobility makes driver identity a first-class data point across your entire fleet operation."
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
          <SectionHeader eyebrow="How it works" title="From key tap to complete driver record" />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Driver taps key",
                body: "Driver touches their RFID card or iButton to the in-cab reader before starting the vehicle. Authentication takes under 1 second.",
              },
              {
                step: "02",
                title: "Identity confirmed",
                body: "LAS GPS device validates the key against the registered driver database. Unrecognised keys trigger an immediate alert.",
              },
              {
                step: "03",
                title: "Trip linked to driver",
                body: "All GPS data, alerts, and events from this trip are tagged to the authenticated driver in real time.",
              },
              {
                step: "04",
                title: "Scorecard updated",
                body: "Safety events accumulate on the driver's profile. Managers review individual scorecards, trends, and coaching needs.",
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
            title="Fleets where identity changes everything"
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
