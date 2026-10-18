import type { Metadata } from "next";
import ModulePage from "@/components/modules/ModulePage";
import { moduleBySlug } from "@/data/liveModules";

export const metadata: Metadata = {
  title: "Temperature Monitoring | LAS Mobility",
  description:
    "Live cargo temperature, threshold breach alerts with duration and location, and exportable cold chain history for every vehicle.",
};

export default function TemperatureMonitoringPage() {
  return <ModulePage module={moduleBySlug("temperature-monitoring")} />;
}
