"use client";

import { Bell, ChevronLeft, Clock, Gauge, KeyRound, MapPin, Navigation, Power, Route, Search } from "lucide-react";
import { ALERTS, ROUTES, STATUS_META, TRIPS, VEHICLES, statusCounts, type LiveStatus } from "@/data/appReplicaData";
import styles from "./PhoneAppScreen.module.scss";

export type PhoneScreenId = "live" | "fleet" | "routes";

/** SVG path for one demo route, normalised into a w x h box. */
function routePath(route: number, w: number, h: number, pad = 18) {
  const pts = ROUTES[route % ROUTES.length];
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const k = Math.min((w - pad * 2) / (x1 - x0 || 1), (h - pad * 2) / (y1 - y0 || 1));
  const ox = (w - (x1 - x0) * k) / 2;
  const oy = (h - (y1 - y0) * k) / 2;
  const map = (p: number[]) => [ox + (p[0] - x0) * k, h - (oy + (p[1] - y0) * k)];
  const step = Math.max(1, Math.floor(pts.length / 80));
  const sampled = pts.filter((_, i) => i % step === 0).concat([pts[pts.length - 1]]).map(map);
  return { d: sampled.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" "), start: sampled[0], end: sampled[sampled.length - 1], mid: sampled[Math.floor(sampled.length * 0.62)] };
}

/** Quiet street grid behind the map views. */
function MapBackdrop() {
  return (
    <svg className={styles.mapBg} viewBox="0 0 240 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path d="M-10 70 C60 60 120 90 250 60 M-10 160 C80 150 150 190 250 170 M-10 240 C70 230 160 260 250 235 M50 -10 C60 80 40 180 70 310 M150 -10 C140 100 170 200 160 310" />
      <path className={styles.mapMinor} d="M-10 115 L250 105 M-10 205 L250 215 M100 -10 L95 310 M200 -10 L205 310 M20 -10 L15 310" />
    </svg>
  );
}

function Status({ status }: { status: LiveStatus }) {
  return (
    <span className={styles.status} data-status={status}>
      {STATUS_META[status].label}
    </span>
  );
}

function LiveScreen() {
  // The bottom sheet covers the lower half, so the route is fitted above it.
  const r = routePath(0, 240, 170, 28);
  const v = VEHICLES.find((x) => x.status === "running") ?? VEHICLES[0];
  return (
    <>
      <MapBackdrop />
      <svg className={styles.mapLayer} viewBox="0 0 240 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className={styles.route} d={r.d} />
        <circle className={styles.dotStopped} cx={r.start[0]} cy={r.start[1]} r={5} />
        <circle className={styles.dotIdle} cx={r.end[0]} cy={r.end[1]} r={5} />
        <circle className={styles.pulse} cx={r.mid[0]} cy={r.mid[1]} r={12} />
        <circle className={styles.dotRunning} cx={r.mid[0]} cy={r.mid[1]} r={6} />
      </svg>
      <div className={styles.topSearch}>
        <Search size={12} /> Search vehicle
      </div>
      <div className={styles.sheet}>
        <span className={styles.grip} aria-hidden="true" />
        <div className={styles.rowBetween}>
          <b className={styles.plate}>{v.plate}</b>
          <Status status={v.status} />
        </div>
        <p className={styles.muted}>
          <MapPin size={10} /> {v.area} · {v.driver}
        </p>
        <div className={styles.tiles3}>
          <span>
            <small>Speed</small>
            <b>{v.speed} km/h</b>
          </span>
          <span>
            <small>Ignition</small>
            <b>{v.ignition ? "On" : "Off"}</b>
          </span>
          <span>
            <small>Fuel</small>
            <b>{v.fuelPct}%</b>
          </span>
        </div>
        <div className={styles.actions}>
          <span className={styles.actionPrimary}>
            <Navigation size={11} /> Live
          </span>
          <span className={styles.action}>
            <Route size={11} /> History
          </span>
          <span className={styles.action}>
            <Power size={11} />
          </span>
        </div>
      </div>
    </>
  );
}

function FleetScreen() {
  const c = statusCounts();
  const total = VEHICLES.length;
  const order: LiveStatus[] = ["running", "idle", "stopped", "offline"];
  let acc = 0;
  return (
    <div className={styles.page}>
      <div className={styles.rowBetween}>
        <span>
          <small className={styles.muted}>Fleet Operations</small>
          <b className={styles.h}>Overview</b>
        </span>
        <span className={styles.bell}>
          <Bell size={14} />
          <i />
        </span>
      </div>
      <div className={styles.ringCard}>
        <svg viewBox="0 0 42 42" className={styles.ring} aria-hidden="true">
          <circle className={styles.ringTrack} cx="21" cy="21" r="15.9" />
          {order.map((s) => {
            const len = (c[s] / total) * 100;
            const el = <circle key={s} className={styles.ringSeg} data-status={s} cx="21" cy="21" r="15.9" strokeDasharray={`${len} ${100 - len}`} strokeDashoffset={25 - acc} />;
            acc += len;
            return el;
          })}
        </svg>
        <span className={styles.ringLabel}>
          <b>{total}</b>
          <small>vehicles</small>
        </span>
        <ul className={styles.legend}>
          {order.map((s) => (
            <li key={s} data-status={s}>
              <i /> {STATUS_META[s].label} <b>{c[s]}</b>
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.section}>Recent alerts</p>
      <ul className={styles.alerts}>
        {ALERTS.slice(0, 4).map((a) => (
          <li key={a.id} data-sev={a.severity}>
            <i />
            <span>
              <b>{a.type}</b>
              <small>
                {a.vehicle} · {a.minutesAgo} min ago
              </small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoutesScreen() {
  const t = TRIPS[2];
  const r = routePath(t.route, 240, 150, 16);
  return (
    <div className={styles.page}>
      <div className={styles.rowStart}>
        <ChevronLeft size={14} />
        <span>
          <b className={styles.h}>{t.vehicle}</b>
          <small className={styles.muted}>
            Trip #{t.id} · {t.start}–{t.end}
          </small>
        </span>
      </div>
      <div className={styles.routeMap}>
        <MapBackdrop />
        <svg className={styles.mapLayer} viewBox="0 0 240 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path className={styles.route} d={r.d} />
          <circle className={styles.dotRunning} cx={r.start[0]} cy={r.start[1]} r={5} />
          <circle className={styles.dotStopped} cx={r.end[0]} cy={r.end[1]} r={5} />
        </svg>
      </div>
      <div className={styles.tiles3}>
        <span>
          <small>Distance</small>
          <b>{t.distanceKm} km</b>
        </span>
        <span>
          <small>Duration</small>
          <b>{t.durationMin} min</b>
        </span>
        <span>
          <small>Max speed</small>
          <b>{t.maxSpeed}</b>
        </span>
      </div>
      <ol className={styles.timeline}>
        <li>
          <KeyRound size={10} />
          <span>
            <b>Ignition on · {t.from}</b>
            <small>{t.start}</small>
          </span>
        </li>
        <li>
          <Clock size={10} />
          <span>
            <b>Stopped {Math.max(1, t.stops)} × · 6 min</b>
            <small>Stoppages over 5 min</small>
          </span>
        </li>
        <li>
          <Gauge size={10} />
          <span>
            <b>Arrived · {t.to}</b>
            <small>{t.end}</small>
          </span>
        </li>
      </ol>
    </div>
  );
}

/**
 * Coded LAS Mobility mobile-app screens for the phone mockups: drawn from the
 * same demo data as the web replica and coloured only with theme tokens, so
 * they follow the site theme instead of showing a fixed screenshot.
 */
export default function PhoneAppScreen({ id, label }: { id: PhoneScreenId; label: string }) {
  return (
    <div className={styles.screen} role="img" aria-label={`LAS Mobility mobile app: ${label}`}>
      <div className={styles.appBar}>
        <b>{label}</b>
      </div>
      <div className={styles.body}>
        {id === "live" && <LiveScreen />}
        {id === "fleet" && <FleetScreen />}
        {id === "routes" && <RoutesScreen />}
      </div>
    </div>
  );
}
