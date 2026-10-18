import type { Metadata } from "next";
import ModulePage from "@/components/modules/ModulePage";
import { moduleBySlug } from "@/data/liveModules";

export const metadata: Metadata = {
  title: "Driver Identification | LAS Mobility",
  description:
    "iButton and RFID driver identification: every trip, alert and safety event attributed to the right driver, with unauthorised-use alerts and scorecards.",
};

export default function DriverIdentificationPage() {
  return <ModulePage module={moduleBySlug("driver-identification")} />;
}
