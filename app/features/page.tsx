import type { Metadata } from "next";
import {
  Activity, BellRing, BrainCircuit, Fuel, Gauge, HeartPulse,
  LockKeyhole, MapPinned, RadioTower, Route, ShieldAlert,
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Fleet Management Features",
  description:
    "Explore LAS Mobility features including live tracking, geofencing, route history, alerts, fuel analytics, driver behavior, reports, and AI insights.",
};

const features = [
  { icon: MapPinned,   title: "Live Tracking",    description: "See vehicle location, status, movement, stops, and route progress with a live dashboard built for dispatch and operations teams." },
  { icon: RadioTower,  title: "GPS Tracking",     description: "Use reliable location data to support accountability, route planning, customer updates, and branch-level oversight." },
  { icon: Route,       title: "Route History",    description: "Replay completed trips, review stoppages, compare planned versus actual movement, and investigate route exceptions." },
  { icon: BellRing,    title: "Alerts",           description: "Configure actionable notifications for overspeeding, geofence entry or exit, device issues, route deviation, and safety events." },
  { icon: Activity,    title: "Geofencing",       description: "Create virtual boundaries around depots, schools, sites, service zones, customer hubs, and restricted areas." },
  { icon: Fuel,        title: "Fuel Analytics",   description: "Identify fuel consumption trends, variance, idle waste, and efficiency opportunities across vehicles and routes." },
  { icon: ShieldAlert, title: "Driver Behavior",  description: "Monitor overspeeding, harsh braking, harsh acceleration, and risk signals that affect safety and vehicle wear." },
  { icon: Gauge,       title: "Reports",          description: "Generate operational reports for trips, utilization, alerts, distance, safety, device health, and vehicle performance." },
  { icon: LockKeyhole, title: "Immobilization",   description: "Support controlled immobilization workflows for authorized teams where compatible hardware and policies are in place." },
  { icon: HeartPulse,  title: "Device Health",    description: "Track GPS device connectivity, signal status, data freshness, and maintenance flags to keep fleet visibility dependable." },
  { icon: BrainCircuit,title: "AI Insights",      description: "Detect anomalies, summarize operational trends, prioritize risks, and recommend where teams should focus next." },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Features"
            title="Fleet visibility and intelligence in one secure platform"
            description="LAS Mobility brings together live tracking, trip analytics, safety monitoring, alerts, reports, and AI-powered insights so teams can run fleet operations with confidence."
          />
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Operational control"
            title="Built for multi-vehicle, multi-branch fleets"
            description="Role-based access, secure cloud architecture, branch-level visibility, and smart notifications help every team see the right information at the right time."
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}
