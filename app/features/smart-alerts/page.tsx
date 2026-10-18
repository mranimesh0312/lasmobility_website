import type { Metadata } from "next";
import ModulePage from "@/components/modules/ModulePage";
import { moduleBySlug } from "@/data/liveModules";

export const metadata: Metadata = {
  title: "Smart Alerts | LAS Mobility",
  description:
    "Configurable alerts for overspeed, geofence entry and exit, harsh driving, ignition and device offline, delivered to the right team.",
};

export default function SmartAlertsPage() {
  return <ModulePage module={moduleBySlug("smart-alerts")} />;
}
