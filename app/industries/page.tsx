import type { Metadata } from "next";
import { Ambulance, BriefcaseBusiness, Bus, Factory, Landmark, Package, School, Truck } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Industries Served",
  description: "LAS Mobility supports logistics, passenger transport, education, construction, delivery, rental, field service, and enterprise mobility teams."
};

const industries = [
  { icon: Truck, title: "Logistics & Transport", description: "Track long-haul and regional movement, improve route discipline, investigate exceptions, and keep dispatch teams informed." },
  { icon: Package, title: "Last-Mile Delivery", description: "Support high-frequency trips with live location visibility, trip analytics, idle monitoring, and delivery-route accountability." },
  { icon: School, title: "Education Transport", description: "Monitor school bus routes, zone arrivals, safety events, and service consistency for student mobility operations." },
  { icon: Bus, title: "Corporate Mobility", description: "Give employee transport teams better visibility into routes, vehicle status, shift movement, and driver performance." },
  { icon: Factory, title: "Construction & Field Assets", description: "See vehicle and equipment movement across sites, reduce misuse, and improve utilization of high-value assets." },
  { icon: BriefcaseBusiness, title: "Field Service", description: "Coordinate service vehicles, improve response visibility, and review trips for performance and customer commitments." },
  { icon: Landmark, title: "Government & Institutions", description: "Support accountable mobility operations with secure access, reporting, route history, and auditable movement data." },
  { icon: Ambulance, title: "Specialized Fleets", description: "Adapt visibility, geofencing, alerts, and reporting workflows for fleets with safety-critical or time-sensitive operations." }
];

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Industries"
            title="Operational intelligence for fleet-heavy businesses"
            description="LAS Mobility helps organizations that depend on vehicles, drivers, routes, and service commitments manage visibility and performance at scale."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <FeatureCard key={industry.title} {...industry} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-ink px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            inverse
            eyebrow="Configurable workflows"
            title="Use the same trusted platform across many fleet types"
            description="Geofences, alerts, reports, roles, analytics, and AI insights can be shaped around the operating model of each industry without fragmenting fleet visibility."
          />
        </div>
      </section>
      <CTASection />
    </>
  );
}
