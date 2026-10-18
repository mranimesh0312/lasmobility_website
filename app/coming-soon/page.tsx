import type { Metadata } from "next";
import Link from "next/link";
import { Video, Clock, ArrowRight, CalendarCheck, Bell, Check } from "lucide-react";
import CTASection from "@/components/CTASection";
import DashCamPreview from "@/components/DashCamPreview";
import { LIVE_MODULES } from "@/data/liveModules";

export const metadata: Metadata = {
  title: "Coming Soon | LAS Mobility",
  description:
    "Dash Cam & DVR is next on the LAS Mobility roadmap. Fuel Monitoring, Temperature Monitoring and Driver Identification are now live.",
};

const upcoming = [
  {
    icon: Video,
    label: "Dash Cam & DVR",
    tagline: "Eyes on every road event",
    desc: "Dash cam and DVR footage is coming to LAS Mobility. Event-triggered clips will sit next to the trip, alert and driver they belong to, with speed and location on every frame, so incidents are reviewed with the full picture.",
    href: "/features/dash-cam-dvr",
    highlights: ["Event-triggered clips", "Front, cabin & rear cameras", "GPS and speed on every clip", "Footage next to trips & alerts"],
    accent: "var(--violet)",
  },
];

export default function ComingSoonPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 20%, rgb(var(--warning-rgb) / 0.08), transparent)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgb(var(--warning-rgb) / 0.12)", border: "1px solid rgb(var(--warning-rgb) / 0.4)", color: "var(--warning)" }}
          >
            <Clock className="h-3.5 w-3.5" /> Coming Soon
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
            The next generation of{" "}
            <span className="gradient-text">fleet intelligence</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
            Fuel, temperature and driver identification have shipped and are live in the app. Dash Cam &amp; DVR is next. Register your interest and be first to know when it launches.
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
          {upcoming.map(({ icon: Icon, label, tagline, desc, href, highlights, accent }, i) => (
            <div
              key={label}
              className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
            >
              {/* Image side */}
              <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                <DashCamPreview />
                {/* Planned capabilities */}
                <ul className="mt-4 grid grid-cols-2 gap-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                      <Check className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} /> {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Copy side */}
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold"
                  style={{ background: `color-mix(in srgb, ${accent} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${accent} 21%, transparent)`, color: accent }}
                >
                  <Icon className="h-3.5 w-3.5" /> {label}
                </div>
                <span
                  className="ml-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
                  style={{ background: "rgb(var(--warning-rgb) / 0.1)", border: "1px solid rgb(var(--warning-rgb) / 0.3)", color: "var(--warning)" }}
                >
                  <Clock className="h-3 w-3" /> In development
                </span>
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
                    style={{ background: `color-mix(in srgb, ${accent} 9%, transparent)`, border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`, color: accent }}
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

      {/* ── Now live ── */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--success)" }}>
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--success)" }} aria-hidden="true" /> Now live
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Recently launched in the app
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {LIVE_MODULES.map(({ slug, icon: Icon, name, lead, proof }) => (
              <Link
                key={slug}
                href={`/features/${slug}`}
                className="group flex flex-col rounded-2xl p-6 transition hover:-translate-y-0.5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <span className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
                    <Icon className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
                  </span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgb(var(--success-rgb) / 0.12)", color: "var(--success)" }}>
                    Live
                  </span>
                </span>
                <h3 className="mt-4 text-lg font-bold" style={{ color: "var(--text-primary)" }}>{name}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{lead}</p>
                <ul className="mt-4 grid gap-1.5">
                  {proof.slice(0, 3).map((t) => (
                    <li key={t} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                      <Check className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent)" }} /> {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--accent-text)" }}>
                  Explore {name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
