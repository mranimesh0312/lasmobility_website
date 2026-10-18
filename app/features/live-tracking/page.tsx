import type { Metadata } from "next";
import ModulePage from "@/components/modules/ModulePage";
import { moduleBySlug } from "@/data/liveModules";

export const metadata: Metadata = {
  title: "Live Tracking | LAS Mobility",
  description:
    "Every vehicle on a live map: position, speed, ignition and driver at a glance, with motion events, geofence overlays and trip replay.",
};

export default function LiveTrackingPage() {
  return <ModulePage module={moduleBySlug("live-tracking")} />;
}
