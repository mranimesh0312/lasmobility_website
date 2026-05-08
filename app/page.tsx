import type { Metadata } from "next";
import {
  Activity,
  BellRing,
  BrainCircuit,
  Fuel,
  Gauge,
  Map,
  Route,
  ShieldAlert,
  Wrench
} from "lucide-react";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import AnimatedCounter from "@/components/AnimatedCounter";
import DashboardMockup from "@/components/DashboardMockup";
import FeatureTabs from "@/components/FeatureTabs";
import ModuleShowcase from "@/components/ModuleShowcase";
import IndustryCarousel from "@/components/IndustryCarousel";

export const metadata: Metadata = {
  title: "AI-Powered Fleet Intelligence for Modern Mobility",
  description:
    "LAS Mobility delivers real-time vehicle tracking, fleet analytics, smart alerts, driver behavior monitoring, and AI-powered operational insights."
};

const metrics = [
  ["Live signals", 24, "/7", "Track every vehicle, trip, and exception as operations unfold."],
  ["Decision speed", 3, "x", "Turn route, utilization, safety, and fuel signals into clear priorities."],
  ["Utilization lift", 18, "%", "Spot idle time, underused vehicles, and operational bottlenecks faster."],
  ["Safety focus", 42, "+", "Monitor overspeeding, harsh driving, and risk patterns across fleets."]
];

const features = [
  { icon: Map, title: "Live Map Dashboard", description: "Monitor current vehicle locations, movement status, routes, stops, and branch-level fleet activity from one command view." },
  { icon: Route, title: "Route History & Trips", description: "Review trip timelines, route replay, stoppages, distance, and exceptions to improve accountability and planning." },
  { icon: ShieldAlert, title: "Driver Behavior", description: "Track overspeeding, harsh braking, harsh acceleration, and driving risk signals that affect safety and costs." },
  { icon: Fuel, title: "Fuel & Idle Analytics", description: "Understand fuel usage trends, idle time, avoidable waste, and efficiency opportunities by vehicle or team." },
  { icon: BellRing, title: "Smart Alerts", description: "Get timely notifications for geofence events, safety issues, device health, route deviations, and operational anomalies." },
  { icon: BrainCircuit, title: "AI Fleet Insights", description: "Use anomaly detection and recommendations to focus attention where action will create measurable impact." }
];

export default function Home() {
  return (
    <>
      <Hero />
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([title, value, suffix, description]) => (
            <div key={title} className="reveal-card hover-lift rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-electric">{title}</p>
              <p className="mt-3 text-3xl font-semibold text-ink">
                <AnimatedCounter value={Number(value)} suffix={String(suffix)} />
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>
      <ModuleShowcase />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Core platform"
            title="Everything fleet teams need to see, control, and improve operations"
            description="LAS Mobility brings tracking, alerts, analytics, driver safety, fuel visibility, and AI guidance into a secure cloud platform built for multi-vehicle and multi-branch operations."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
          <div className="mt-12">
            <FeatureTabs />
          </div>
        </div>
      </section>
      <section className="bg-ink px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            align="left"
            inverse
            eyebrow="AI Intelligence"
            title="Move from monitoring to operational intelligence"
            description="LAS Mobility helps teams identify abnormal patterns, prioritize safety risks, prepare for predictive maintenance, and ask better questions of their fleet data."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: BrainCircuit, title: "Anomaly detection", description: "Surface unusual trips, fuel variance, route behavior, or device signals before they become larger issues." },
              { icon: Gauge, title: "Risk scoring", description: "Rank driver and vehicle risk using safety events, speed behavior, and operational context." },
              { icon: Wrench, title: "Maintenance readiness", description: "Organize usage and health data so teams can prepare for predictive maintenance workflows." },
              { icon: Activity, title: "Recommendations", description: "Convert fleet data into practical next actions for safety, utilization, routing, and cost control." }
            ].map((item) => (
              <FeatureCard key={item.title} {...item} inverse />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Dashboard preview"
            title="Designed for daily fleet command"
            description="Give operations, safety, and management teams a shared view of what is happening now and what needs attention next."
          />
          <div className="mt-12">
            <DashboardMockup />
          </div>
        </div>
      </section>
      <IndustryCarousel />
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Why LAS Mobility"
            title="A practical platform for control, safety, and performance"
            description="LAS Mobility is built around everyday fleet workflows: finding vehicles, reviewing trips, reacting to exceptions, comparing performance, and helping leaders act on trusted data."
          />
        </div>
      </section>
      <CTASection />
    </>
  );
}
