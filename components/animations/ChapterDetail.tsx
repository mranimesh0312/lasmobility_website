import {
  Activity, Battery, Bike, Bus, Car, Container, DoorOpen, Fingerprint, Fuel, Gauge, KeyRound, LayoutDashboard,
  Lock, MapPin, Navigation, Power, Radio, Route, Satellite, ShieldCheck, Sparkles, Thermometer, Truck, Wrench, FileText, Bell,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./ChapterDetail.module.scss";

const STATUS = [
  { key: "running", label: "Running", n: 11 },
  { key: "idle", label: "Idle", n: 4 },
  { key: "stopped", label: "Stopped", n: 6 },
  { key: "offline", label: "Offline", n: 3 },
] as const;
const TOTAL = STATUS.reduce((a, s) => a + s.n, 0);

const CATEGORIES: { icon: LucideIcon; label: string; n: number }[] = [
  { icon: Car, label: "Cars", n: 8 },
  { icon: Truck, label: "Vans", n: 6 },
  { icon: Container, label: "Trucks", n: 4 },
  { icon: Bus, label: "Buses", n: 3 },
  { icon: Bike, label: "2-wheelers", n: 2 },
  { icon: KeyRound, label: "Trailers", n: 1 },
];

function DemoTag() {
  return <span className={styles.demo}>Demo data</span>;
}

function Fleet() {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <b>{TOTAL} vehicles · 3 branches</b>
        <DemoTag />
      </div>
      <ul className={styles.cats}>
        {CATEGORIES.map(({ icon: Icon, label, n }) => (
          <li key={label}>
            <Icon size={15} aria-hidden="true" />
            <span>{label}</span>
            <b>{n}</b>
          </li>
        ))}
      </ul>
      <div className={styles.statusBar} aria-hidden="true">
        {STATUS.map((s) => (
          <i key={s.key} data-status={s.key} style={{ flexGrow: s.n }} />
        ))}
      </div>
      <ul className={styles.legend}>
        {STATUS.map((s) => (
          <li key={s.key} data-status={s.key}>
            <i aria-hidden="true" /> {s.label} <b>{s.n}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Road() {
  const pts = [0, 22, 38, 45, 41, 52, 61, 58, 49, 56, 62];
  const d = pts.map((v, i) => `${i ? "L" : "M"}${(i / (pts.length - 1)) * 300} ${60 - v * 0.85}`).join(" ");
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <b>
          <span className={styles.liveDot} aria-hidden="true" /> DEMO-103 · on trip
        </b>
        <DemoTag />
      </div>
      <dl className={styles.stats4}>
        <div>
          <dt>
            <Gauge size={12} /> Speed
          </dt>
          <dd>62 km/h</dd>
        </div>
        <div>
          <dt>
            <Power size={12} /> Ignition
          </dt>
          <dd>On · 1 h 12 m</dd>
        </div>
        <div>
          <dt>
            <Route size={12} /> Trip
          </dt>
          <dd>38.4 km</dd>
        </div>
        <div>
          <dt>
            <ShieldCheck size={12} /> Driver score
          </dt>
          <dd>92 / 100</dd>
        </div>
      </dl>
      <svg className={styles.spark} viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true">
        <path className={styles.sparkArea} d={`${d} L300 60 L0 60 Z`} />
        <path className={styles.sparkLine} d={d} />
      </svg>
      <p className={styles.caption}>Speed over the last 10 minutes</p>
    </div>
  );
}

function Gps() {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <b>Whitefield depot → Electronic City</b>
        <DemoTag />
      </div>
      <div className={styles.route} aria-hidden="true">
        <span className={styles.routeA}>A</span>
        <span className={styles.routeTrack}>
          <span className={styles.routeDone} style={{ width: "64%" }} />
          <span className={styles.routeVan} style={{ left: "64%" }}>
            <Navigation size={11} />
          </span>
        </span>
        <span className={styles.routeB}>B</span>
      </div>
      <dl className={styles.stats4}>
        <div>
          <dt>ETA</dt>
          <dd>18 min</dd>
        </div>
        <div>
          <dt>
            <Satellite size={12} /> GPS accuracy
          </dt>
          <dd>2.4 m · 14 sats</dd>
        </div>
        <div>
          <dt>
            <MapPin size={12} /> Geofence
          </dt>
          <dd>Left depot 07:42</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd className={styles.ok}>Moving</dd>
        </div>
      </dl>
    </div>
  );
}

function Telemetry() {
  const rows: { t: string; icon: LucideIcon; label: string; value: string; tone?: "warn" }[] = [
    { t: "09:41:06", icon: Gauge, label: "Speed", value: "62 km/h" },
    { t: "09:41:06", icon: Fuel, label: "Fuel level", value: "78 %" },
    { t: "09:41:05", icon: Thermometer, label: "Cargo probe 1", value: "4.2 °C" },
    { t: "09:41:05", icon: Battery, label: "External power", value: "13.9 V" },
    { t: "09:41:04", icon: Radio, label: "GSM signal", value: "4 / 5" },
    { t: "09:40:58", icon: Bell, label: "Overspeed", value: "86 km/h", tone: "warn" },
  ];
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <b>
          <span className={styles.liveDot} aria-hidden="true" /> Live data stream · DEMO-118
        </b>
        <DemoTag />
      </div>
      <ul className={styles.stream}>
        {rows.map(({ t, icon: Icon, label, value, tone }) => (
          <li key={label} data-tone={tone}>
            <time>{t}</time>
            <Icon size={13} aria-hidden="true" />
            <span>{label}</span>
            <b>{value}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Twin() {
  const sensors: { icon: LucideIcon; label: string }[] = [
    { icon: Satellite, label: "GPS unit" },
    { icon: Battery, label: "Battery & power" },
    { icon: Fuel, label: "Fuel sensor" },
    { icon: Lock, label: "Immobilizer" },
    { icon: Fingerprint, label: "Driver ID" },
    { icon: Gauge, label: "Tyre pressure" },
    { icon: Thermometer, label: "Cargo temp" },
    { icon: DoorOpen, label: "Door sensor" },
  ];
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <b>8 connected components</b>
        <DemoTag />
      </div>
      <ul className={styles.sensors}>
        {sensors.map(({ icon: Icon, label }) => (
          <li key={label}>
            <Icon size={14} aria-hidden="true" />
            <span>{label}</span>
            <i aria-hidden="true" />
            <span className={styles.srOnly}>online</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Product() {
  const modules: { icon: LucideIcon; label: string }[] = [
    { icon: MapPin, label: "Live tracking" },
    { icon: Route, label: "Trips & replay" },
    { icon: Bell, label: "Alerts" },
    { icon: Fuel, label: "Fuel" },
    { icon: Thermometer, label: "Temperature" },
    { icon: Wrench, label: "Maintenance" },
    { icon: FileText, label: "Reports" },
    { icon: Sparkles, label: "AI insights" },
  ];
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <b>
          <LayoutDashboard size={14} aria-hidden="true" /> One platform, web and mobile
        </b>
      </div>
      <ul className={styles.modules}>
        {modules.map(({ icon: Icon, label }) => (
          <li key={label}>
            <Icon size={14} aria-hidden="true" /> {label}
          </li>
        ))}
      </ul>
      <p className={styles.caption}>
        <Activity size={12} aria-hidden="true" /> Every reading lands here in real time
      </p>
    </div>
  );
}

/**
 * The fleet data that goes with each story chapter: compact, purposeful and
 * labelled as demo data. Shared by the desktop scroll story and the mobile
 * chapter cards. Theme tokens only.
 */
export default function ChapterDetail({ id }: { id: string }) {
  switch (id) {
    case "fleet":
      return <Fleet />;
    case "road":
      return <Road />;
    case "gps":
      return <Gps />;
    case "telemetry":
      return <Telemetry />;
    case "twin":
      return <Twin />;
    case "product":
      return <Product />;
    default:
      return null;
  }
}

export const hasChapterDetail = (id: string) => ["fleet", "road", "gps", "telemetry", "twin", "product"].includes(id);

