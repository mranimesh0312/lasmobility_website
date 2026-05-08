import { BusFront, CarFront, Truck } from "lucide-react";

const vehicles = [
  { icon: Truck, top: "14%", delay: "0s", duration: "18s", size: "h-7 w-7", tone: "text-cyan" },
  { icon: BusFront, top: "31%", delay: "-6s", duration: "22s", size: "h-8 w-8", tone: "text-mint" },
  { icon: CarFront, top: "68%", delay: "-11s", duration: "20s", size: "h-6 w-6", tone: "text-sky-300" }
];

export default function FleetMotionBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-x-0 top-0 h-full w-full opacity-55" viewBox="0 0 1440 760" fill="none">
        <path className="map-line route-glow" d="M-60 182C142 82 296 161 450 129C632 90 743 242 936 183C1122 127 1250 92 1500 145" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />
        <path className="moving-route route-glow" d="M-40 482C141 392 286 428 464 362C637 298 769 395 948 329C1133 260 1266 286 1490 214" stroke="#2DD4BF" strokeWidth="3" strokeLinecap="round" />
        <path d="M-80 632C138 555 324 606 503 530C686 452 801 540 984 465C1148 398 1309 423 1500 351" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      </svg>
      {vehicles.map((vehicle, index) => {
        const Icon = vehicle.icon;
        return (
          <div
            key={index}
            className="moving-vehicle absolute left-[-90px] flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-white shadow-glow backdrop-blur"
            style={{ top: vehicle.top, animationDelay: vehicle.delay, animationDuration: vehicle.duration }}
          >
            <Icon className={`${vehicle.size} ${vehicle.tone}`} />
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          </div>
        );
      })}
      <div className="scan-line absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
    </div>
  );
}
