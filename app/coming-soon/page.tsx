import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Thermometer, Fuel, Fingerprint, Video, Clock, ArrowRight, CalendarCheck, Bell } from "lucide-react";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Coming Soon | LAS Mobility",
  description:
    "Preview next-generation fleet features arriving soon — Temperature Monitoring, Fuel Monitoring, Driver Identification, and Dash Cam & DVR.",
};

const upcoming = [
  {
    icon: Thermometer,
    label: "Temperature Monitoring",
    tagline: "Cold chain visibility, always on",
    desc: "Live compartment temperature readings, multi-zone monitoring, instant breach alerts, and compliance-ready logs — integrated directly into your LAS dashboard without a separate portal.",
    href: "/features/temperature-monitoring",
    image: "/module-temperature.svg",
    highlights: ["±0.5°C sensor accuracy", "< 5 sec breach alert", "GDP-compliant reports", "Multi-zone per vehicle"],
    accent: "#0ECECE",
  },
  {
    icon: Fuel,
    label: "Fuel Monitoring",
    tagline: "Stop fuel theft. Start saving.",
    desc: "Capacitive tank sensors deliver real-time fuel levels, automatic refuel logging, and drain-event detection. Turn your biggest variable cost into a measured, manageable number.",
    href: "/features/fuel-monitoring",
    image: "/module-fuel.svg",
    highlights: ["±1% tank accuracy", "< 30 sec theft alert", "Cost per km reports", "Auto refuel logging"],
    accent: "#F59E0B",
  },
  {
    icon: Fingerprint,
    label: "Driver Identification",
    tagline: "Know who's behind the wheel",
    desc: "RFID cards and iButton keys authenticate drivers in under a second. Every trip, alert, and safety event is linked to the verified driver — making accountability automatic.",
    href: "/features/driver-identification",
    image: "/module-driver-id.svg",
    highlights: ["< 1 sec authentication", "RFID & iButton", "Per-driver scorecards", "Unauthorised use alerts"],
    accent: "#22C55E",
  },
  {
    icon: Video,
    label: "Dash Cam & DVR",
    tagline: "Eyes on every road event",
    desc: "AI-powered dash cams record event-triggered clips, detect distraction and collision risk in real time, and upload footage to the cloud — giving managers visual evidence for every incident.",
    href: "/features/dash-cam-dvr",
    image: "/module-dashcam.svg",
    highlights: ["1080p recording", "AI event detection", "90-day cloud storage", "Up to 4 cameras"],
    accent: "#8B5CF6",
  },
];

export default function ComingSoonPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(245,158,11,0.08), transparent)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.4)", color: "#F59E0B" }}
          >
            <Clock className="h-3.5 w-3.5" /> Coming Soon
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
            The next generation of{" "}
            <span className="gradient-text">fleet intelligence</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
            Four powerful hardware integrations are in development — each bringing a new layer of visibility to your fleet operations. Register your interest and be first to know when they launch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm">
              <CalendarCheck className="h-4 w-4" /> Register Interest
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80"
              style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}
            >
              Current Features <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Feature cards ── */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          {upcoming.map(({ icon: Icon, label, tagline, desc, href, image, highlights, accent }, i) => (
            <div
              key={label}
              className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
            >
              {/* Image side */}
              <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{
                    background: "var(--bg-card)",
                    border: `1px solid ${accent}33`,
                    boxShadow: `0 24px 64px rgba(0,0,0,0.35), 0 0 60px ${accent}12`,
                  }}
                >
                  <div className="relative h-72" style={{ background: "#060E1A" }}>
                    <Image src={image} alt={label} fill className="object-cover object-top" />
                    {/* Coming soon overlay */}
                    <div
                      className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-md"
                      style={{ background: `${accent}22`, border: `1px solid ${accent}55`, color: accent }}
                    >
                      <Clock className="h-3 w-3" /> Coming Soon
                    </div>
                  </div>
                  {/* Highlights strip */}
                  <div className="grid grid-cols-2 divide-x divide-y" style={{ borderTop: `1px solid ${accent}22`, borderColor: `${accent}18` }}>
                    {highlights.map((h) => (
                      <div key={h} className="px-4 py-3">
                        <span className="text-xs font-semibold" style={{ color: accent }}>✓</span>{" "}
                        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Copy side */}
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold"
                  style={{ background: `${accent}15`, border: `1px solid ${accent}35`, color: accent }}
                >
                  <Icon className="h-3.5 w-3.5" /> {label}
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  {tagline}
                </h2>
                <p className="mt-4 text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                  {desc}
                </p>
                <div className="mt-6 flex gap-3">
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
                    style={{ background: `${accent}18`, border: `1px solid ${accent}40`, color: accent }}
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition hover:opacity-80"
                    style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}
                  >
                    <Bell className="h-4 w-4" /> Get notified
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline strip ── */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div
            className="overflow-hidden rounded-2xl p-8"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-accent)" }}
          >
            <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Development Roadmap
            </h3>
            <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              All four features are in active development. Hardware certification and beta testing begin with select fleet partners before general availability.
            </p>
            <div className="mt-6 space-y-4">
              {[
                { phase: "Q3 2025", label: "Beta testing", items: "Temperature Monitoring, Fuel Monitoring" },
                { phase: "Q4 2025", label: "General availability", items: "Temperature Monitoring, Fuel Monitoring" },
                { phase: "Q1 2026", label: "Beta testing", items: "Driver Identification, Dash Cam & DVR" },
                { phase: "Q2 2026", label: "General availability", items: "Full hardware integration suite" },
              ].map(({ phase, label, items }) => (
                <div key={phase} className="flex items-start gap-4">
                  <div
                    className="w-24 shrink-0 rounded-lg px-2 py-1 text-center text-xs font-bold"
                    style={{ background: "var(--accent-glow)", color: "var(--accent-text)", border: "1px solid var(--border-accent)" }}
                  >
                    {phase}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{items}</p>
                  </div>
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
