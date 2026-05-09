import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Video, BrainCircuit, Cloud, Bell, Play,
  ShieldCheck, Clock, Truck, Building2, Scale,
  ArrowRight, CalendarCheck, CheckCircle2,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

export const metadata: Metadata = {
  title: "Dash Cam & DVR | LAS Mobility",
  description:
    "AI-powered dash cam and DVR integration for fleet vehicles. Event-triggered recording, live camera feed, incident playback, and cloud storage — all in one platform.",
};

const capabilities = [
  {
    icon: Video,
    title: "Live Camera Feed",
    description:
      "View live video from any vehicle camera directly in the LAS dashboard or mobile app. Available on demand without interrupting the driver.",
  },
  {
    icon: Bell,
    title: "Event-Triggered Recording",
    description:
      "Camera saves a 30-second clip around every harsh event — brake, acceleration, collision impact, or geofence violation — automatically.",
  },
  {
    icon: BrainCircuit,
    title: "AI Event Detection",
    description:
      "On-device AI detects distracted driving, lane departure, forward collision risk, and drowsiness — flagging incidents before they escalate.",
  },
  {
    icon: Play,
    title: "Incident Playback",
    description:
      "Review event clips synchronized with GPS position, speed, and telemetry data. Full context for every incident in one view.",
  },
  {
    icon: Cloud,
    title: "Cloud Storage & Retrieval",
    description:
      "All event recordings uploaded automatically to secure cloud storage. Retrieve clips up to 90 days back without physical device access.",
  },
  {
    icon: ShieldCheck,
    title: "Multi-Camera Support",
    description:
      "Front, rear, cabin, and cargo cameras supported. Configure up to 4 channels per vehicle for full 360° incident coverage.",
  },
];

const useCases = [
  {
    icon: Scale,
    industry: "Insurance & Disputes",
    description:
      "Protect your fleet from false claims with timestamped, GPS-tagged video evidence. Disputes resolved in minutes, not months.",
    stat: "Evidence ready in < 2 minutes",
  },
  {
    icon: Building2,
    industry: "Enterprise Safety Programs",
    description:
      "Coach drivers using real incident footage. AI-detected events feed directly into safety scorecards for structured improvement plans.",
    stat: "40% reduction in harsh events",
  },
  {
    icon: Truck,
    industry: "Cargo & Logistics",
    description:
      "Cargo camera monitors load integrity in transit. Tampering, theft, or damage is recorded automatically at the point of occurrence.",
    stat: "Cargo disputes eliminated",
  },
];

const stats = [
  { value: "4 cameras", label: "Per vehicle" },
  { value: "1080p", label: "Recording resolution" },
  { value: "90 days", label: "Cloud retention" },
  { value: "30 sec", label: "Event clip window" },
];

export default function DashCamDVRPage() {
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
              "radial-gradient(ellipse 55% 45% at 60% 30%, rgba(14,206,206,0.09), transparent)",
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
                  <Video className="h-3.5 w-3.5" />
                  Dash Cam &amp; DVR
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
                Eyes on every{" "}
                <span className="gradient-text">road event</span>
              </h1>
              <p
                className="mt-5 max-w-lg text-lg leading-8"
                style={{ color: "var(--text-secondary)" }}
              >
                LAS Mobility integrates dash cam and DVR footage directly into
                the fleet platform. Live feeds, AI-detected incidents, and
                event-triggered clips sit alongside GPS data so managers have
                the full picture — without switching tools.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Live camera access",
                  "AI event detection",
                  "Event-triggered clips",
                  "90-day cloud storage",
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
                    src="/module-dashcam.svg"
                    alt="Dash cam recording dashboard"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                    Live Recording Feed
                  </p>
                  <p className="mt-1 text-xs leading-5" style={{ color: "var(--text-muted)" }}>
                    CAM-F · 1080p · AI Event Detection active · 3 events today
                  </p>
                  <div
                    className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.3)",
                    }}
                  >
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
                    <span className="text-xs font-semibold text-red-400">
                      Recording · Harsh brake clip saved 09:28
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
            title="Complete visual intelligence for your fleet"
            description="Dash Cam & DVR in LAS Mobility isn't a standalone product — it's video intelligence layered on top of GPS, telemetry, and AI to give you the full story of every event."
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
          <SectionHeader eyebrow="How it works" title="Camera to cloud in one connected workflow" />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Camera installed",
                body: "Front, cabin, rear, or cargo cameras mounted and connected to the LAS DVR unit. Plug-and-play with supported camera models.",
              },
              {
                step: "02",
                title: "AI monitors in real time",
                body: "On-device AI engine processes every frame — detecting harsh events, distraction, lane departure, and collision risk continuously.",
              },
              {
                step: "03",
                title: "Event clips saved",
                body: "Triggered clips captured with 15 seconds before and after each event. GPS, speed, and driver ID metadata embedded automatically.",
              },
              {
                step: "04",
                title: "Footage in the cloud",
                body: "Clips uploaded to secure cloud storage within seconds of the event. Accessible in the LAS dashboard — no physical retrieval needed.",
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
            title="When the truth is on camera"
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

      {/* ── AI highlight strip ── */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div
            className="overflow-hidden rounded-2xl p-8 text-center"
            style={{
              background: "var(--accent-glow)",
              border: "1px solid var(--border-accent)",
            }}
          >
            <BrainCircuit className="mx-auto h-10 w-10" style={{ color: "var(--accent-text)" }} />
            <h3 className="mt-4 text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              AI that watches so you don&apos;t have to
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
              LAS Mobility's on-device AI processes video in real time, tagging
              only the moments that matter. No manual review of hours of footage
              — managers see a curated event feed with context already attached.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[
                "Distracted driving",
                "Forward collision warning",
                "Lane departure",
                "Drowsiness detection",
                "Harsh event flagging",
              ].map((label) => (
                <span
                  key={label}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-accent)",
                    color: "var(--accent-text)",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
