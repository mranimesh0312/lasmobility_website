import { BellRing, BrainCircuit, Fuel, HeartPulse, MapPinned, Route } from "lucide-react";

const visuals = [
  {
    icon: MapPinned,
    title: "Live Tracking Map",
    description: "Animated routes, active vehicle markers, zone activity, and movement status."
  },
  {
    icon: Fuel,
    title: "Fuel Analytics",
    description: "Consumption patterns, idle waste, utilization, and efficiency opportunities."
  },
  {
    icon: BrainCircuit,
    title: "AI Insights",
    description: "Anomaly detection, risk summaries, and recommended operational actions."
  },
  {
    icon: HeartPulse,
    title: "Vehicle Health",
    description: "Device status, telemetry freshness, maintenance readiness, and uptime signals."
  }
];

export default function FleetVisualShowcase() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {visuals.map((visual, index) => {
        const Icon = visual.icon;
        return (
          <article key={visual.title} className="reveal-card hover-lift overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="relative h-44 overflow-hidden bg-[#071426]">
              <div className="absolute inset-0 bg-grid opacity-70" />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 180" fill="none" aria-hidden="true">
                <path
                  className={index % 2 === 0 ? "map-line route-glow" : "route-glow"}
                  d="M22 136C92 68 155 96 220 83C309 64 333 33 414 54C466 67 492 43 512 25"
                  stroke={index % 2 === 0 ? "#22D3EE" : "#2DD4BF"}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path d="M58 48C129 74 190 58 243 97C314 149 393 120 476 143" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              </svg>
              <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-cyan ring-1 ring-white/15 backdrop-blur">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="vehicle-marker absolute right-8 top-16 h-4 w-4 rounded-full bg-mint ring-8 ring-mint/15" />
              <div className="absolute bottom-5 left-6 right-6 h-3 rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan to-mint" />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                {index % 2 === 0 ? <Route className="h-4 w-4" aria-hidden="true" /> : <BellRing className="h-4 w-4" aria-hidden="true" />}
                Fleet visual
              </div>
              <h3 className="mt-3 text-lg font-semibold text-ink">{visual.title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{visual.description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
