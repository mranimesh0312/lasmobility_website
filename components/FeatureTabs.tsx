"use client";

import { motion } from "framer-motion";
import { BarChart3, BrainCircuit, Fuel, MapPinned, ShieldAlert } from "lucide-react";
import { useState } from "react";

const tabs = [
  {
    label: "Tracking",
    icon: MapPinned,
    title: "Live map operations",
    text: "See every moving vehicle, stop, route, branch, and geofence event in a clean operations dashboard.",
    points: ["Moving vehicle markers", "Route replay", "Geofence entry and exit"]
  },
  {
    label: "Safety",
    icon: ShieldAlert,
    title: "Driver risk visibility",
    text: "Monitor overspeeding, harsh braking, harsh acceleration, and recurring behavior trends before they become costly.",
    points: ["Risk scoring", "Overspeed alerts", "Harsh event trends"]
  },
  {
    label: "Fuel",
    icon: Fuel,
    title: "Fuel and idle intelligence",
    text: "Identify idle waste, unusual consumption patterns, and efficiency opportunities by vehicle, driver, and route.",
    points: ["Idle time analysis", "Fuel variance", "Utilization reports"]
  },
  {
    label: "AI",
    icon: BrainCircuit,
    title: "AI-powered insight layer",
    text: "Turn fleet data into prioritized recommendations, anomaly detection, and natural-language operational summaries.",
    points: ["Anomaly detection", "Fleet summaries", "Operational recommendations"]
  }
];

export default function FeatureTabs() {
  const [active, setActive] = useState(0);
  const current = tabs[active];
  const Icon = current.icon;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-soft">
      <div className="grid gap-2 sm:grid-cols-4">
        {tabs.map((tab, index) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(index)}
              className={`flex items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold transition ${
                active === index ? "bg-ink text-white shadow-soft" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
              }`}
            >
              <TabIcon className="h-4 w-4" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>
      <motion.div
        key={current.label}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-3 grid gap-8 rounded-md bg-slate-50 p-6 lg:grid-cols-[0.8fr_1.2fr] lg:p-8"
      >
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold text-ink">{current.title}</h3>
          <p className="mt-3 leading-7 text-slate-600">{current.text}</p>
        </div>
        <div className="grid gap-3">
          {current.points.map((point, index) => (
            <div key={point} className="hover-lift flex items-center justify-between rounded-md border border-slate-200 bg-white p-4">
              <span className="font-semibold text-ink">{point}</span>
              <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-bold text-emerald-700">0{index + 1}</span>
            </div>
          ))}
          <div className="mt-2 h-28 rounded-md bg-[linear-gradient(90deg,rgba(37,99,235,0.08)_1px,transparent_1px),linear-gradient(rgba(20,184,212,0.1)_1px,transparent_1px)] bg-[length:32px_32px]">
            <div className="h-full rounded-md bg-gradient-to-r from-electric/15 via-cyan/10 to-mint/15" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
