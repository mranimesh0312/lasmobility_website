"use client";

import { useState, type ReactElement } from "react";
import dynamic from "next/dynamic";
import type { LucideIcon } from "lucide-react";
import { BarChart3, Car, Cpu, Droplet, Fence, KeyRound, Lock, MapPinned } from "lucide-react";
import MotionReveal from "@/components/animations/MotionReveal";
import { useInView } from "@/hooks/useInView";
import styles from "./demos/Demos.module.scss";
import showcase from "./Showcase.module.scss";

const loading = () => <div className={styles.demoLoading} aria-busy="true">Loading demo…</div>;
const FleetMapDemo = dynamic(() => import("./demos/FleetMapDemo"), { ssr: false, loading });
const ImmobilizerDemo = dynamic(() => import("./demos/ImmobilizerDemo"), { ssr: false, loading });
const TwinDemo = dynamic(() => import("./demos/TwinDemo"), { ssr: false, loading });
const SensorsDemo = dynamic(() => import("./demos/SensorsDemo"), { ssr: false, loading });
const DriverIdDemo = dynamic(() => import("./demos/DriverIdDemo"), { ssr: false, loading });
const RentalHubDemo = dynamic(() => import("./demos/RentalHubDemo"), { ssr: false, loading });
const ReportsDemo = dynamic(() => import("./demos/ReportsDemo"), { ssr: false, loading });

interface Demo {
  id: string;
  label: string;
  icon: LucideIcon;
  blurb: string;
  render: () => ReactElement;
}

const DEMOS: Demo[] = [
  { id: "tracking", label: "Live GPS & trips", icon: MapPinned, blurb: "Pick a vehicle, play its journey and watch speed, status and trip metrics update.", render: () => <FleetMapDemo mode="tracking" /> },
  { id: "geofence", label: "Geofencing", icon: Fence, blurb: "Move and resize the zone, then play: every entry and exit raises an alert.", render: () => <FleetMapDemo mode="geofence" /> },
  { id: "immobilize", label: "Immobilization", icon: Lock, blurb: "Walk through a remote engine command from request to device acknowledgement.", render: () => <ImmobilizerDemo /> },
  { id: "twin", label: "Digital twin", icon: Cpu, blurb: "Select a component on the x-ray vehicle to see what the platform reads from it.", render: () => <TwinDemo /> },
  { id: "sensors", label: "Fuel & temperature", icon: Droplet, blurb: "Refuels, drains and cold-chain excursions, detected and flagged.", render: () => <SensorsDemo /> },
  { id: "driver", label: "Driver ID", icon: KeyRound, blurb: "Identify drivers with iButton keys so every trip has an owner.", render: () => <DriverIdDemo /> },
  { id: "rental", label: "Rental Hub", icon: Car, blurb: "Browse rental vehicles in 3D with specs and availability.", render: () => <RentalHubDemo /> },
  { id: "reports", label: "Reports", icon: BarChart3, blurb: "Period KPIs, distance per day and the fleet's time split by status.", render: () => <ReportsDemo /> },
];

/** "Try the platform": tabbed, lazily mounted interactive demonstrations. */
export default function FeatureDemos() {
  const [active, setActive] = useState(DEMOS[0].id);
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "300px", once: true });
  const demo = DEMOS.find((d) => d.id === active)!;

  return (
    <section id="try-the-platform" className={`${showcase.section} ${styles.demosSection}`} aria-labelledby="demos-title">
      <div className={showcase.container}>
        <MotionReveal className={showcase.header}>
          <p className={showcase.eyebrow}>Try the platform</p>
          <h2 id="demos-title" className={showcase.title}>
            Interactive demos you can drive.
          </h2>
          <p className={showcase.lede}>Hands-on simulations of key LAS Mobility workflows. All data in this section is simulated.</p>
        </MotionReveal>

        <div className={styles.demoTabs} role="tablist" aria-label="Interactive demos">
          {DEMOS.map((d) => {
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                id={`demo-tab-${d.id}`}
                type="button"
                role="tab"
                aria-selected={d.id === active}
                aria-controls="demo-panel"
                tabIndex={d.id === active ? 0 : -1}
                className={`${styles.demoTab} ${d.id === active ? styles.demoTabActive : ""}`}
                onClick={() => setActive(d.id)}
                onKeyDown={(e) => {
                  const i = DEMOS.findIndex((x) => x.id === d.id);
                  const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
                  if (n === null) return;
                  e.preventDefault();
                  const t = DEMOS[(n + DEMOS.length) % DEMOS.length];
                  setActive(t.id);
                  document.getElementById(`demo-tab-${t.id}`)?.focus();
                }}
              >
                <Icon size={16} /> {d.label}
              </button>
            );
          })}
        </div>

        <div ref={ref} id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${demo.id}`} className={styles.demoPanel}>
          <p className={styles.demoBlurb}>{demo.blurb}</p>
          {inView ? <div key={demo.id}>{demo.render()}</div> : loading()}
        </div>
      </div>
    </section>
  );
}
