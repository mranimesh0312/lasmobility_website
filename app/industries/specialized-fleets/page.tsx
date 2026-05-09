"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Ambulance, Bell, ShieldAlert, MapPin, Navigation, Radio, BarChart3, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: Bell,       title: "Sub-5-Second Alerts",         description: "Critical alerts — geofence breach, device tamper, overspeed — delivered to operators in under 5 seconds via push, SMS, and WhatsApp." },
  { icon: ShieldAlert,title: "99.9% Uptime SLA",            description: "Platform infrastructure designed for mission-critical operations. SLA-backed uptime ensures you are never flying blind." },
  { icon: Radio,      title: "Multi-Channel Escalation",    description: "Alert sequences escalate automatically across push notification, SMS, WhatsApp, and email until acknowledged." },
  { icon: MapPin,     title: "Device Tamper Detection",     description: "Any attempt to disconnect or interfere with a tracking device triggers an instant high-priority alert to your ops team." },
  { icon: Navigation, title: "Custom Geofence Rules",       description: "Define geofences per vehicle class, time window, and alert severity. Rules for ambulances differ from security vehicles." },
  { icon: BarChart3,  title: "Live Position Feed",          description: "Sub-30-second position refresh for critical vehicles. Real-time feed available via dashboard and API for command centre integration." },
];

const useCases = [
  { title: "Ambulance & EMS",              description: "Track ambulances with sub-5-second alerts, live position feeds, and custom geofence rules for hospital zones and emergency corridors.", stat: "<5 sec alert delivery" },
  { title: "Security & Cash-in-Transit",   description: "Monitor high-value transport with device tamper detection, multi-channel escalation, and 99.9% uptime SLA for zero blind spots.", stat: "99.9% platform uptime" },
  { title: "Cold Chain Emergency",         description: "Track temperature-sensitive vehicles with live position feeds and custom alerts for route deviation or unexpected stops during transit.", stat: "Real-time positions" },
];

function AlertSpeedChart() {
  const channels = [
    { label: "Push",       ms: "<2s",  barPct: 55  },
    { label: "SMS",        ms: "<4s",  barPct: 75  },
    { label: "Email",      ms: "<5s",  barPct: 90  },
    { label: "WhatsApp",   ms: "<5s",  barPct: 90  },
  ];
  const barMaxW = 200;
  const labelW = 62;
  const rowH = 20;
  const gap = 10;
  return (
    <svg viewBox="0 0 320 130" className="w-full" aria-label="Alert delivery speed comparison across channels" role="img">
      <defs>
        <linearGradient id="specAlertGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#EF4444"/>
        </linearGradient>
      </defs>
      <text x={labelW + 2} y="10" fontSize="7.5" fill="rgba(255,255,255,0.35)">Alert delivery speed by channel</text>
      {channels.map((c, i) => {
        const y = 20 + i * (rowH + gap);
        const w = (c.barPct / 100) * barMaxW;
        return (
          <g key={c.label}>
            <text x={labelW - 4} y={y + rowH / 2 + 4} fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="end">{c.label}</text>
            <rect x={labelW} y={y} width={w} height={rowH} rx="4" fill="url(#specAlertGrad)"/>
            <text x={labelW + w + 6} y={y + rowH / 2 + 4} fontSize="9" fill="rgba(239,68,68,0.9)">{c.ms}</text>
          </g>
        );
      })}
      <text x={labelW} y="120" fontSize="7.5" fill="rgba(255,255,255,0.25)">Shorter bar = faster delivery</text>
    </svg>
  );
}

export default function SpecializedFleetsPage() {
  return (
    <>
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(239,68,68,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid rgba(239,68,68,0.4)", color: "#EF4444", background: "rgba(239,68,68,0.1)" }}>
                <Ambulance className="h-3.5 w-3.5" /> Specialized Fleets
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                Critical ops need <span className="gradient-text">zero-compromise tracking.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility delivers sub-5-second alerts, 99.9% uptime, and multi-channel escalation for fleets where every second and every position matters.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["Sub-5-second alerts", "99.9% uptime SLA", "Multi-channel escalation", "Device tamper detection"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#EF4444" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
                <Link href="/industries" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>All Industries <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(239,68,68,0.3)", boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(239,68,68,0.1)" }}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src="/industry-emergency.avif" alt="Specialized fleet critical tracking" fill className="object-cover" priority />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,14,26,0.85), transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {[{ v:"<5 sec", l:"Alert delivery" }, { v:"99.9%", l:"Uptime SLA" }, { v:"Multi-channel", l:"Escalation" }].map(({ v, l }) => (
                      <div key={l} className="flex-1 rounded-lg px-2.5 py-2 text-center backdrop-blur-md" style={{ background: "rgba(6,14,26,0.7)", border: "1px solid rgba(239,68,68,0.2)" }}>
                        <p className="text-sm font-bold" style={{ color: "#EF4444" }}>{v}</p>
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
            {[{ v:"<5 sec", l:"Alert delivery" }, { v:"99.9%", l:"Platform uptime" }, { v:"Multi-channel", l:"Escalation" }, { v:"Real-time", l:"Positions" }].map(({ v, l }, i) => (
              <div key={l} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "#EF4444" }}>{v}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Alert Infrastructure" title="Every channel. Every alert. Under 5 seconds." description="Critical events trigger simultaneous multi-channel alerts. Push notifications, SMS, WhatsApp, and email all deliver within the 5-second SLA." />
          <div className="mt-12 overflow-hidden rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Alert Delivery Speed — By Channel</p>
            <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Average end-to-end alert delivery time from trigger to recipient notification</p>
            <div className="rounded-xl p-4" style={{ background: "#060E1A" }}><AlertSpeedChart /></div>
            <div className="mt-4 rounded-lg p-3" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <p className="text-xs font-semibold" style={{ color: "#EF4444" }}>SLA — Push alerts fire in under 2 seconds. All channels confirmed within 5 seconds of the triggering event.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Built for zero-compromise operations" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(c => <FeatureCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Critical fleets that cannot afford downtime" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ title, description, stat }) => (
              <div key={title} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(239,68,68,0.1)" }}><Ambulance className="h-6 w-6" style={{ color: "#EF4444" }} /></div>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{description}</p>
                <p className="mt-4 text-xs font-bold" style={{ color: "#EF4444" }}>{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
