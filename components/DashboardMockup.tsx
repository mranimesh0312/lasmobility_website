"use client";

import { motion } from "framer-motion";
import { AlertTriangle, BatteryCharging, BrainCircuit, Fuel, MapPin, Route, Truck } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const markers = [
  { id: "TRK-18", left: "18%", top: "28%", color: "bg-cyan" },
  { id: "BUS-07", left: "61%", top: "36%", color: "bg-mint" },
  { id: "VAN-42", left: "76%", top: "68%", color: "bg-electric" },
  { id: "CAR-11", left: "38%", top: "63%", color: "bg-cyan" }
];

export default function DashboardMockup() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#071426] p-4 shadow-glow">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="text-sm font-semibold text-white">LAS Mobility Command Center</p>
          <p className="text-xs text-slate-400">Live tracking, alerts, AI insights</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
          <span className="h-2 w-2 rounded-full bg-mint" />
          Live fleet sync
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.45fr_0.9fr]">
        <div className="relative min-h-[390px] overflow-hidden rounded-md border border-white/10 bg-[#0b2239]">
          <div className="absolute inset-0 bg-grid opacity-80" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 680 430" fill="none" aria-hidden="true">
            <path className="map-line route-glow" d="M52 344C116 244 194 264 265 232C353 192 367 102 462 102C540 102 584 160 630 87" stroke="#22D3EE" strokeWidth="5" strokeLinecap="round" />
            <path d="M70 120C159 94 224 116 286 151C383 207 467 242 610 210" stroke="#2DD4BF" strokeWidth="3" strokeLinecap="round" opacity="0.62" />
            <path d="M117 382C205 350 292 326 370 332C461 338 529 300 618 321" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" opacity="0.56" />
          </svg>
          {markers.map((marker, index) => (
            <motion.div
              key={marker.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + index * 0.16, duration: 0.45 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: marker.left, top: marker.top }}
            >
              <div className={`vehicle-marker flex h-11 w-11 items-center justify-center rounded-full ${marker.color} text-white ring-8 ring-white/10`}>
                <Truck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="mt-2 rounded bg-white/92 px-2 py-1 text-[10px] font-bold text-ink shadow-soft">{marker.id}</div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-4 left-4 right-4 rounded-md border border-white/10 bg-white/95 p-4 shadow-soft sm:right-auto sm:w-72"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-electric" aria-hidden="true" />
              <p className="text-sm font-semibold text-ink">Route deviation prevented</p>
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-600">AI flagged a late turn near Depot Zone 4 and notified dispatch.</p>
          </motion.div>
        </div>
        <div className="grid gap-3">
          {[
            { icon: Route, label: "Trips today", value: 1284, suffix: "", detail: "+18% route adherence" },
            { icon: AlertTriangle, label: "Risk alerts", value: 42, suffix: "", detail: "12 require review" },
            { icon: Fuel, label: "Fuel saved", value: 14, suffix: "%", detail: "idle reduction trend" },
            { icon: BatteryCharging, label: "Device health", value: 98, suffix: "%", detail: "fresh telemetry" }
          ].map((item) => {
            const MetricIcon = item.icon;
            return (
            <div key={item.label} className="hover-lift rounded-md border border-white/10 bg-white/[0.055] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan/10 text-cyan">
                  <MetricIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <BrainCircuit className="h-4 w-4 text-mint" aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-medium text-slate-400">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                <AnimatedCounter value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-1 text-xs text-mint">{item.detail}</p>
            </div>
          );
          })}
        </div>
      </div>
    </div>
  );
}
