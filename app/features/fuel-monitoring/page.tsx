import type { Metadata } from "next";
import ModulePage from "@/components/modules/ModulePage";
import { moduleBySlug } from "@/data/liveModules";

export const metadata: Metadata = {
  title: "Fuel Monitoring | LAS Mobility",
  description:
    "Live fuel levels, automatic refuel and drain detection, consumption per km and fuel reports for every vehicle in your fleet.",
};

export default function FuelMonitoringPage() {
  return <ModulePage module={moduleBySlug("fuel-monitoring")} />;
}
