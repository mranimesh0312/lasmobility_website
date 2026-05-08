import type { Metadata } from "next";
import { Bus, Building2, CarFront, Factory, PackageCheck, School, Truck } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Fleet Management Solutions",
  description: "LAS Mobility solutions for fleet owners, logistics companies, school buses, employee transport, construction fleets, delivery fleets, and rental fleets."
};

const solutions = [
  { icon: Truck, title: "Fleet Owners", description: "Centralize vehicle tracking, utilization, alerts, reports, branch performance, and driver accountability in one operating view." },
  { icon: PackageCheck, title: "Logistics Companies", description: "Improve dispatch visibility, route reliability, customer communication, delivery timelines, and exception handling." },
  { icon: School, title: "School Bus Operators", description: "Monitor route adherence, geofence arrivals, driver behavior, and safety alerts for student transport operations." },
  { icon: Bus, title: "Employee Transport", description: "Coordinate pickups, vehicle movement, route history, safety events, and service consistency across shift-based transport." },
  { icon: Building2, title: "Construction Fleets", description: "Track assets across project sites, reduce idle time, monitor utilization, and control movement between restricted zones." },
  { icon: Factory, title: "Delivery Fleets", description: "Support faster dispatch decisions, trip analytics, location visibility, and alerts for dense city and regional delivery networks." },
  { icon: CarFront, title: "Rental Fleets", description: "Improve vehicle visibility, utilization, device health, misuse detection, and operational readiness across rental inventory." }
];

export default function SolutionsPage() {
  return (
    <>
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Solutions"
            title="Fleet intelligence shaped around real operating models"
            description="Different fleets face different pressure: safety, delivery reliability, asset utilization, field accountability, or customer service. LAS Mobility gives each team a clear way to manage the work."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <FeatureCard key={solution.title} {...solution} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-ink px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            inverse
            eyebrow="Shared outcomes"
            title="Visibility, control, safety, and performance"
            description="From owner-managed fleets to distributed enterprise operations, LAS Mobility helps teams reduce blind spots, respond faster, and make better decisions from fleet data."
          />
        </div>
      </section>
      <CTASection />
    </>
  );
}
