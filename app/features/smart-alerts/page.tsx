"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BellRing, Zap, MapPin, Wifi, ShieldAlert, Mail,
  Truck, School, Building2, ArrowRight, CalendarCheck, CheckCircle2,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";

const capabilities = [
  { icon: Zap,        title: "Overspeed Alerts",      description: "Instant notification when a vehicle exceeds the configured speed threshold. Separate limits for highways, city roads, and school zones." },
  { icon: MapPin,     title: "Geofence Entry & Exit",  description: "Draw virtual boundaries on the map and receive alerts the moment a vehicle crosses in or out. Supports circles, polygons, and corridors." },
  { icon: ShieldAlert,title: "Harsh Driving Events",   description: "Receive push notifications for harsh braking, sharp acceleration, and abrupt cornering events above configurable severity thresholds." },
  { icon: Wifi,       title: "Device Offline Alerts",  description: "Know immediately when a GPS device loses connectivity. Distinguish between signal blackspots and potential device tampering." },
  { icon: BellRing,   title: "Ignition On/Off Alerts", description: "Track engine start and stop events in real time. Alert managers when vehicles operate outside approved hours or locations." },
  { icon: Mail,       title: "Multi-Channel Delivery", description: "Alerts delivered via push notification, SMS, email, and WhatsApp. Configure per-alert channel preferences per manager or team." },
];

const stats = [
  { value: "< 5 sec", label: "Alert delivery time" },
  { value: "15+", label: "Configurable alert types" },
  { value: "99.8%", label: "Alert delivery rate" },
  { value: "4 channels", label: "Push · SMS · Email · WhatsApp" },
];

const useCases = [
  { icon: Truck,     industry: "Fleet Dispatch",       description: "Know the moment a vehicle departs a depot, enters a delivery zone, or leaves an authorised area. No calls required — alerts do the work.", stat: "Dispatch visibility increased 3×" },
  { icon: School,    industry: "School Transport",      description: "Parents receive pickup and drop-off notifications automatically. Administrators are alerted if a bus deviates from its approved route.", stat: "Parent app alerts: 4.8/5 satisfaction" },
  { icon: Building2, industry: "Asset Protection",     description: "Receive instant alerts for after-hours ignition, geofence departure, or device disconnect. A second layer of security for high-value vehicles.", stat: "Theft response time cut to < 3 min" },
];

// Alert volume chart
function AlertVolumeChart() {
  const types = [
    { label: "Overspeed",  count: 38, color: "#EF4444" },
    { label: "Geofence",   count: 22, color: "#F59E0B" },
    { label: "Harsh",      count: 17, color: "#8B5CF6" },
    { label: "Device",     count: 8,  color: "#0ECECE" },
    { label: "Ignition",   count: 15, color: "#22C55E" },
  ];
  const total = types.reduce((s, t) => s + t.count, 0);
  return (
    <div className="space-y-3">
      {types.map(({ label, count, color }) => (
        <div key={label} className="flex items-center gap-3">
          <span className="w-20 text-xs shrink-0" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</span>
          <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${(count / total) * 100}%`, background: color, opacity: 0.75 }} />
          </div>
          <span className="w-8 text-right text-xs font-bold" style={{ color }}>{count}</span>
        </div>
      ))}
    </div>
  );
}

// Alert delivery timeline (today)
function AlertTimeline() {
  const alerts = [
    { time: "09:41", type: "Overspeed", vehicle: "TRK-18", color: "#EF4444", resolved: false },
    { time: "09:28", type: "Geofence exit", vehicle: "BUS-07", color: "#F59E0B", resolved: true },
    { time: "09:14", type: "Device offline", vehicle: "VAN-42", color: "#0ECECE", resolved: true },
    { time: "08:52", type: "Harsh brake", vehicle: "CAR-11", color: "#8B5CF6", resolved: true },
  ];
  return (
    <div className="space-y-2">
      {alerts.map(({ time, type, vehicle, color, resolved }) => (
        <div key={time + vehicle} className="flex items-center gap-3 rounded-lg px-3 py-2.5" style={{ background: `${color}0D`, border: `1px solid ${color}28` }}>
          <span className="text-[10px] font-mono shrink-0" style={{ color: "rgba(255,255,255,0.4)" }}>{time}</span>
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
          <span className="flex-1 text-xs font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>{type}</span>
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{vehicle}</span>
          <span className={`text-[10px] font-bold ${resolved ? "text-emerald-400" : "text-red-400"}`}>{resolved ? "Resolved" : "Open"}</span>
        </div>
      ))}
    </div>
  );
}

export default function SmartAlertsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 65% 30%, rgba(14,206,206,0.1), transparent)" }} />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>
                <BellRing className="h-3.5 w-3.5" /> Smart Alerts
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                The right alert. <span className="gradient-text">Right now.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
                LAS Mobility sends instant, actionable notifications for every event that matters — overspeed, geofence breach, harsh driving, or device offline. Delivered in under 5 seconds via push, SMS, email, or WhatsApp.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["15+ alert types", "< 5 sec delivery", "Multi-channel dispatch", "Configurable thresholds"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} /> {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm">
                  <CalendarCheck className="h-4 w-4" /> Book a Demo
                </Link>
                <Link href="/features" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>
                  All Features <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid var(--border-accent)", boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 60px rgba(14,206,206,0.1)" }}>
                <div className="relative h-52 overflow-hidden" style={{ background: "#060E1A" }}>
                  <Image src="/module-alerts.svg" alt="Smart alerts module" fill className="object-cover object-top" priority />
                </div>
                <div className="p-5" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
                  <p className="mb-3 text-xs font-bold" style={{ color: "var(--text-primary)" }}>Today's Alert Feed</p>
                  <AlertTimeline />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            {stats.map(({ value, label }, i) => (
              <div key={label} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "var(--accent-text)" }}>{value}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alert breakdown */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Alert analytics" title="Understand what's generating noise — and what needs action" description="The alerts dashboard shows volume by type, resolution rate, and delivery performance so you can tune thresholds and reduce alert fatigue." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <p className="mb-4 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Alert Volume by Type — This Month</p>
              <div className="rounded-xl p-5" style={{ background: "#060E1A" }}>
                <AlertVolumeChart />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[{ label: "Total alerts", value: "100" }, { label: "Resolved same day", value: "91%" }].map(({ label, value }) => (
                  <div key={label} className="rounded-lg p-3 text-center" style={{ background: "var(--bg-deep)", border: "1px solid var(--border)" }}>
                    <p className="text-lg font-bold" style={{ color: "var(--accent-text)" }}>{value}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <p className="mb-1 text-sm font-bold" style={{ color: "var(--text-primary)" }}>Delivery Channels</p>
              <p className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>Configure per-alert and per-manager</p>
              {[
                { channel: "Push Notification", reach: "100%", color: "#0ECECE" },
                { channel: "SMS",               reach: "92%",  color: "#22C55E" },
                { channel: "Email",             reach: "88%",  color: "#F59E0B" },
                { channel: "WhatsApp",          reach: "76%",  color: "#8B5CF6" },
              ].map(({ channel, reach, color }) => (
                <div key={channel} className="mb-3 flex items-center justify-between rounded-lg px-4 py-3" style={{ background: `${color}0D`, border: `1px solid ${color}28` }}>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{channel}</span>
                  <span className="text-sm font-bold" style={{ color }}>{reach} delivered</span>
                </div>
              ))}
              <div className="mt-4 rounded-lg p-3" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
                <p className="text-xs font-semibold" style={{ color: "var(--accent-text)" }}>
                  Escalation rules — unacknowledged alerts auto-escalate to the next manager tier after a configurable timeout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Capabilities" title="Every alert type your fleet needs" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => <FeatureCard key={cap.title} {...cap} />)}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Use cases" title="Alerts that change how your team operates" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {useCases.map(({ icon: Icon, industry, description, stat }) => (
              <div key={industry} className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)" }}>
                  <Icon className="h-6 w-6" style={{ color: "var(--accent-text)" }} />
                </div>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>{industry}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{description}</p>
                <p className="mt-4 text-xs font-bold" style={{ color: "var(--accent-text)" }}>{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
