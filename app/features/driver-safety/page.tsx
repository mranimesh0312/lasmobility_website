import type { Metadata } from "next";
import ModulePage from "@/components/modules/ModulePage";
import { moduleBySlug } from "@/data/liveModules";

export const metadata: Metadata = {
  title: "Driver Safety | LAS Mobility",
  description:
    "Harsh braking, acceleration, cornering and overspeed detection with driver safety scores, benchmarks and real-time alerts.",
};

export default function DriverSafetyPage() {
  return <ModulePage module={moduleBySlug("driver-safety")} />;
}
