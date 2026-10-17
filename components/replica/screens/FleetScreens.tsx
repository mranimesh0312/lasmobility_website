"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import {
  Activity, AlertTriangle, ArrowLeft, Bell, CalendarClock, Car, CheckCircle2, Fuel, Gauge as GaugeIcon, History, KeyRound,
  LayoutGrid, Lock, MapPin, Navigation, Pause, Play, Power, Radio, Route, Satellite, Settings2, Share2, Signal, Timer, Truck, Unlock, User, Wrench, Zap,
} from "lucide-react";
import {
  ALERTS, DRIVERS, SERVICES, SEVERITY_META, STATUS_META, TRIPS, VEHICLES, ago, dailySeries, rangeTotals, routeLength, routePoint, statusCounts, vehiclePosition,
  RANGES, ROUTES, type LiveStatus, type RangeKey, type ReplicaVehicle,
} from "@/data/appReplicaData";
import { useReplica } from "../context";
import { AreaChart, Bar, Card, DataGrid, Donut, Gauge, Kpi, Modal, PageHeader, StatusDot, StatusTag, Tag, cx, type Column } from "../ui";
import type { MapPoint } from "../ReplicaMap";
import s from "../Replica.module.scss";

const ReplicaMap = dynamic(() => import("../ReplicaMap"), { ssr: false, loading: () => <div className={s.map} /> });

const liveSpeed = (v: ReplicaVehicle, t: number) => (v.status === "running" ? Math.max(8, Math.round(v.speed + 7 * Math.sin(t / 3 + v.id))) : 0);
const toPoint = (v: ReplicaVehicle, t: number): MapPoint => {
  const { p, heading } = vehiclePosition(v, t);
  return { id: v.id, label: v.plate, status: v.status, p, heading };
};

// ======================= Dashboard =======================
export function DashboardScreen() {
  const { go, seconds, theme, toast } = useReplica();
  const [range, setRange] = useState<RangeKey>("7d");
  const days = RANGES.find((r) => r.key === range)!.days;
  const totals = rangeTotals(days);
  const series = dailySeries(days);
  const counts = statusCounts();
  const active = counts.running + counts.idle;
  const points = useMemo(() => VEHICLES.filter((v) => v.status !== "offline").map((v) => toPoint(v, seconds)), [seconds]);

  return (
    <>
      <PageHeader title="Dashboard" crumbs="Fleet Operations">
        <div className={s.segmented} role="group" aria-label="Date range">
          {RANGES.map((r) => (
            <button key={r.key} type="button" aria-pressed={range === r.key} onClick={() => setRange(r.key)}>
              {r.label}
            </button>
          ))}
        </div>
        <button type="button" className={s.btn} onClick={() => toast("In the app you can drag, resize and add widgets")}>
          <LayoutGrid size={14} /> Customize
        </button>
      </PageHeader>

      <div className={s.kpis}>
        <Kpi icon={Car} value={VEHICLES.length} label="Total Vehicles" sub="22 subscribed" onClick={() => go("vehicles")} />
        <Kpi icon={Activity} value={active} label="Active Vehicles" sub={`${Math.round((active / 22) * 100)}% of subscribed`} color="#10B981" onClick={() => go("live")} />
        <Kpi icon={Route} value={`${totals.distance.toLocaleString("en-IN")} km`} label="Total Distance" sub={RANGES.find((r) => r.key === range)!.label} color="#3B82F6" onClick={() => go("trips")} />
        <Kpi icon={Fuel} value={`${totals.fuel.toLocaleString("en-IN")} L`} label="Fuel Consumed" sub={`${(totals.distance / totals.fuel).toFixed(1)} km/L average`} color="#8B5CF6" onClick={() => go("fuel")} />
        <Kpi icon={Bell} value={ALERTS.filter((a) => a.minutesAgo < 120).length} label="Active Alerts" sub="2 critical" color="#EF4444" onClick={() => go("alerts")} />
        <Kpi icon={Wrench} value={SERVICES.filter((x) => x.status !== "Scheduled").length} label="Maintenance Due" sub="1 overdue" color="#F59E0B" onClick={() => go("maintenance")} />
      </div>

      <div className={s.grid}>
        <Card icon={MapPin} title="Live fleet map" sub={`${points.length} vehicles reporting`} action={{ label: "Open live tracking", onClick: () => go("live") }} className={s.span8}>
          <div className={s.mapBox} style={{ minHeight: 300, height: 300 }}>
            <ReplicaMap points={points} theme={theme} onSelect={(id) => go("vehicle", id)} zoom={10.6} />
          </div>
        </Card>
        <Card icon={Car} title="Fleet Status" sub="Operational state now" className={s.span4}>
          <Donut
            center={{ value: VEHICLES.length, label: "Vehicles" }}
            parts={(Object.keys(STATUS_META) as LiveStatus[]).map((k) => ({ label: STATUS_META[k].label, value: counts[k], color: STATUS_META[k].color }))}
          />
        </Card>
        <Card icon={Route} title="Distance & fuel" sub={`Daily, ${RANGES.find((r) => r.key === range)!.label.toLowerCase()}`} className={s.span8}>
          <AreaChart
            labels={series.map((d) => d.label)}
            series={[
              { name: "Distance (km)", color: "#18C7CC", values: series.map((d) => d.distance) },
              { name: "Fuel (L) x10", color: "#8B5CF6", values: series.map((d) => d.fuel * 10) },
            ]}
            height={210}
          />
        </Card>
        <Card icon={Bell} title="Alerts" sub="Most recent first" action={{ label: "View all", onClick: () => go("alerts") }} className={s.span4}>
          <ul className={s.list}>
            {ALERTS.slice(0, 5).map((a) => (
              <li key={a.id} className={s.listRow}>
                <span className={s.dot} style={{ "--tag": SEVERITY_META[a.severity].color } as CSSProperties} />
                <div className={s.listMain}>
                  <strong>{a.type} · {a.vehicle}</strong>
                  <small>{a.message}</small>
                </div>
                <small className={s.muted}>{ago(a.minutesAgo)}</small>
              </li>
            ))}
          </ul>
        </Card>
        <Card icon={Truck} title="Top vehicles" sub="By distance today" className={s.span6}>
          <ul className={s.list}>
            {[...VEHICLES].sort((a, b) => b.todayKm - a.todayKm).slice(0, 5).map((v, i, arr) => (
              <li key={v.id}>
                <button type="button" className={cx(s.listRow, s.listRowBtn)} onClick={() => go("vehicle", v.id)}>
                  <b className={s.num} style={{ width: 18, color: "var(--t3)" }}>{i + 1}</b>
                  <div className={s.listMain}>
                    <strong>{v.plate}</strong>
                    <small>{v.name} · {v.driver}</small>
                  </div>
                  <div style={{ width: 110 }}>
                    <Bar value={v.todayKm / arr[0].todayKm} />
                  </div>
                  <b className={s.num} style={{ width: 64, textAlign: "right" }}>{v.todayKm} km</b>
                </button>
              </li>
            ))}
          </ul>
        </Card>
        <Card icon={User} title="Driver score" sub="Safety score, this month" action={{ label: "Scorecard", onClick: () => go("drivers") }} className={s.span6}>
          <ul className={s.list}>
            {DRIVERS.slice(0, 5).map((d) => (
              <li key={d.name} className={s.listRow}>
                <div className={s.listMain}>
                  <strong>{d.name}</strong>
                  <small>{d.vehicle} · {d.distanceKm.toLocaleString("en-IN")} km</small>
                </div>
                <div style={{ width: 120 }}>
                  <Bar value={d.score / 100} color={d.score >= 85 ? "#10B981" : d.score >= 70 ? "#F59E0B" : "#EF4444"} />
                </div>
                <b className={s.num} style={{ width: 30, textAlign: "right" }}>{d.score}</b>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

// ======================= Live tracking =======================
const FILTERS: { key: "all" | LiveStatus; label: string; color?: string }[] = [
  { key: "all", label: "All" },
  { key: "running", label: "Running", color: STATUS_META.running.color },
  { key: "idle", label: "Idle", color: STATUS_META.idle.color },
  { key: "stopped", label: "Stopped", color: STATUS_META.stopped.color },
  { key: "offline", label: "Offline", color: STATUS_META.offline.color },
];

export function LiveTrackingScreen() {
  const { go, seconds, theme, toast } = useReplica();
  const [filter, setFilter] = useState<"all" | LiveStatus>("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<number | null>(1);
  const [follow, setFollow] = useState(false);
  const counts = statusCounts();
  const list = VEHICLES.filter((v) => (filter === "all" || v.status === filter) && (v.plate + v.name + v.driver).toLowerCase().includes(q.toLowerCase()));
  const points = useMemo(() => list.map((v) => toPoint(v, seconds)), [list, seconds]);
  const sel = VEHICLES.find((v) => v.id === selected);

  return (
    <>
      <PageHeader title="Live Tracking" crumbs="Vehicles">
        <button type="button" className={s.btn} aria-pressed={follow} onClick={() => setFollow((f) => !f)} disabled={!sel}>
          <Navigation size={14} /> {follow ? "Following" : "Follow"}
        </button>
        <button type="button" className={s.btn} onClick={() => go("geofence")}>
          <MapPin size={14} /> Geofences
        </button>
      </PageHeader>
      <div className={s.mapLayout}>
        <aside className={s.mapPanel}>
          <div className={s.mapPanelHead}>
            <label className={s.gridSearch} style={{ maxWidth: "none" }}>
              <MapPin size={14} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search registration or vehicle" aria-label="Search registration or vehicle" />
            </label>
            <div className={s.chips}>
              {FILTERS.map((f) => (
                <button key={f.key} type="button" className={s.chip} style={{ "--chip": f.color } as CSSProperties} aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
                  {f.label} <b>{f.key === "all" ? VEHICLES.length : counts[f.key]}</b>
                </button>
              ))}
            </div>
          </div>
          <div className={s.mapList} data-lenis-prevent>
            {list.map((v) => (
              <button key={v.id} type="button" className={s.vehRow} aria-pressed={v.id === selected} onClick={() => setSelected(v.id)}>
                <StatusDot status={v.status} pulse />
                <div className={s.listMain}>
                  <strong>{v.plate}</strong>
                  <small>{v.status === "offline" ? `Offline · ${ago(v.lastUpdateMin)}` : `${v.area} · ${v.driver}`}</small>
                </div>
                <b className={s.num} style={{ fontSize: 12 }}>{liveSpeed(v, seconds)} km/h</b>
              </button>
            ))}
            {list.length === 0 && <p className={s.empty}>No vehicles match.</p>}
          </div>
        </aside>
        <div className={s.mapBox}>
          <ReplicaMap points={points} selected={selected} onSelect={setSelected} theme={theme} follow={follow} />
          <div className={s.mapLegend} aria-hidden="true">
            {(Object.keys(STATUS_META) as LiveStatus[]).map((k) => (
              <span key={k}>
                <span className={s.dot} style={{ "--tag": STATUS_META[k].color } as CSSProperties} /> {STATUS_META[k].label}
              </span>
            ))}
          </div>
          {sel && (
            <div className={s.mapOverlay}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className={s.listMain}>
                  <strong style={{ fontSize: 15 }}>{sel.plate}</strong>
                  <small>{sel.name} · {sel.make} {sel.model}</small>
                </div>
                <StatusTag status={sel.status} />
              </div>
              <div className={s.mapStats}>
                <div>
                  <small>Speed</small>
                  <b>{liveSpeed(sel, seconds)} km/h</b>
                </div>
                <div>
                  <small>Ignition</small>
                  <b>{sel.ignition ? "On" : "Off"}</b>
                </div>
                <div>
                  <small>Today</small>
                  <b>{sel.todayKm} km</b>
                </div>
              </div>
              <div className={s.actions}>
                <button type="button" className={cx(s.btn, s.btnPrimary)} onClick={() => go("vehicle", sel.id)}>
                  <Radio size={14} /> Live details
                </button>
                <button type="button" className={s.btn} onClick={() => go("trips")}>
                  <History size={14} /> History
                </button>
                <button type="button" className={s.btn} onClick={() => toast(`Share link for ${sel.plate} copied (expires in 24 h)`)}>
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ======================= Vehicles =======================
export function VehiclesScreen() {
  const { go, seconds } = useReplica();
  const [filter, setFilter] = useState<"all" | LiveStatus>("all");
  const counts = statusCounts();
  const rows = VEHICLES.filter((v) => filter === "all" || v.status === filter);
  const columns: Column<ReplicaVehicle>[] = [
    { key: "plate", header: "Registration", render: (v) => <button type="button" className={s.link} onClick={() => go("vehicle", v.id)}>{v.plate}</button>, sort: (v) => v.plate, search: (v) => v.plate },
    { key: "name", header: "Vehicle", render: (v) => v.name, sort: (v) => v.name, search: (v) => v.name },
    { key: "model", header: "Make / Model", render: (v) => `${v.make} ${v.model}`, search: (v) => `${v.make} ${v.model}` },
    { key: "group", header: "Group", render: (v) => v.group, sort: (v) => v.group, search: (v) => v.group },
    { key: "status", header: "Status", render: (v) => <StatusTag status={v.status} />, sort: (v) => v.status },
    { key: "speed", header: "Speed", render: (v) => <span className={s.num}>{liveSpeed(v, seconds)} km/h</span>, sort: (v) => v.speed },
    { key: "fuel", header: "Fuel", render: (v) => <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Bar value={v.fuelPct / 100} color={v.fuelPct < 25 ? "#EF4444" : undefined} /><span className={s.num}>{v.fuelPct}%</span></span>, sort: (v) => v.fuelPct },
    { key: "odo", header: "Odometer", render: (v) => <span className={s.num}>{v.odometerKm.toLocaleString("en-IN")} km</span>, sort: (v) => v.odometerKm },
    { key: "sub", header: "Subscription", render: (v) => <Tag color={v.subscription === "Active" ? "#10B981" : v.subscription === "Renewal due" ? "#F59E0B" : "#EF4444"}>{v.subscription}</Tag>, sort: (v) => v.subscription },
    { key: "upd", header: "Last update", render: (v) => <span className={s.muted}>{ago(v.lastUpdateMin)}</span>, sort: (v) => v.lastUpdateMin },
  ];
  return (
    <>
      <PageHeader title="Vehicles" crumbs="Vehicles">
        <button type="button" className={cx(s.btn, s.btnPrimary)} onClick={() => go("vehicle", 1)}>
          <Car size={14} /> Open a vehicle
        </button>
      </PageHeader>
      <div className={s.kpis} style={{ "--kpi-cols": 4 } as CSSProperties}>
        <Kpi icon={Car} value={VEHICLES.length} label="Total vehicles" sub="4 groups" />
        <Kpi icon={Activity} value={counts.running} label="Running" color={STATUS_META.running.color} onClick={() => setFilter("running")} />
        <Kpi icon={Timer} value={counts.idle + counts.stopped} label="Idle / stopped" color={STATUS_META.idle.color} onClick={() => setFilter("stopped")} />
        <Kpi icon={Signal} value={counts.offline} label="Offline" sub="No data > 90 min" color={STATUS_META.offline.color} onClick={() => setFilter("offline")} />
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        rowKey={(v) => v.id}
        onRowClick={(v) => go("vehicle", v.id)}
        placeholder="Search vehicles"
        toolbar={
          <div className={s.chips}>
            {FILTERS.map((f) => (
              <button key={f.key} type="button" className={s.chip} style={{ "--chip": f.color } as CSSProperties} aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
                {f.label} <b>{f.key === "all" ? VEHICLES.length : counts[f.key]}</b>
              </button>
            ))}
          </div>
        }
      />
    </>
  );
}

// ======================= Vehicle details =======================
type CommandState = "idle" | "queued" | "sent" | "ack";

export function VehicleDetailScreen() {
  const { vehicleId, go, seconds, theme, toast } = useReplica();
  const v = VEHICLES.find((x) => x.id === vehicleId) ?? VEHICLES[0];
  const [tab, setTab] = useState<"live" | "history">("live");
  const [immobilized, setImmobilized] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [cmd, setCmd] = useState<CommandState>("idle");
  const [replay, setReplay] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setImmobilized(false);
    setCmd("idle");
    setReplay(0);
    setPlaying(false);
  }, [vehicleId]);

  // Command lifecycle as the app shows it: queued -> sent -> acknowledged.
  useEffect(() => {
    if (cmd === "idle" || cmd === "ack") return;
    const id = window.setTimeout(() => {
      if (cmd === "queued") setCmd("sent");
      else {
        setCmd("ack");
        setImmobilized((x) => !x);
        toast(`${v.plate}: device acknowledged the command`);
      }
    }, 1100);
    return () => window.clearTimeout(id);
  }, [cmd, toast, v.plate]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setReplay((r) => (r >= 1 ? (setPlaying(false), 1) : Math.min(1, r + 0.01))), 80);
    return () => window.clearInterval(id);
  }, [playing]);

  const speed = immobilized ? 0 : liveSpeed(v, seconds);
  const effectiveStatus: LiveStatus = immobilized ? "stopped" : v.status;
  const livePoint = { ...toPoint(v, immobilized ? 0 : seconds), status: effectiveStatus };
  const historyPoint = routePoint(v.route, replay);
  const route = ROUTES[v.route % ROUTES.length];
  const travelled = route.slice(0, Math.max(2, Math.round(replay * route.length)));
  const offline = v.status === "offline";

  return (
    <>
      <PageHeader title={`${v.plate} · ${v.name}`} crumbs="Vehicles / Vehicle Details">
        <button type="button" className={s.btn} onClick={() => go("vehicles")}>
          <ArrowLeft size={14} /> Back to vehicles
        </button>
        <select
          className={s.btn}
          value={v.id}
          aria-label="Switch vehicle"
          onChange={(e) => go("vehicle", Number(e.target.value))}
          style={{ paddingRight: 8 }}
        >
          {VEHICLES.map((x) => (
            <option key={x.id} value={x.id}>
              {x.plate}
            </option>
          ))}
        </select>
      </PageHeader>

      <div className={s.tabs} role="tablist">
        <button type="button" role="tab" aria-selected={tab === "live"} onClick={() => setTab("live")}>
          Live
        </button>
        <button type="button" role="tab" aria-selected={tab === "history"} onClick={() => setTab("history")}>
          History
        </button>
      </div>

      <div className={s.detailLayout}>
        <div style={{ display: "grid", gap: 14, minWidth: 0, alignContent: "start" }}>
          <div className={s.mapBox} style={{ height: 380 }}>
            {tab === "live" ? (
              <ReplicaMap points={[livePoint]} selected={v.id} theme={theme} follow center={livePoint.p} zoom={14} />
            ) : (
              <ReplicaMap
                points={[{ id: v.id, label: v.plate, status: "running", p: historyPoint.p, heading: historyPoint.heading }]}
                selected={v.id}
                theme={theme}
                route={travelled}
                center={route[0]}
                zoom={12}
              />
            )}
          </div>
          {tab === "history" ? (
            <Card icon={History} title="Route history" sub="Today">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button type="button" className={cx(s.btn, s.btnPrimary)} onClick={() => (replay >= 1 ? (setReplay(0), setPlaying(true)) : setPlaying((p) => !p))}>
                  {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? "Pause" : "Play replay"}
                </button>
                <input type="range" min={0} max={1000} value={Math.round(replay * 1000)} onChange={(e) => setReplay(Number(e.target.value) / 1000)} aria-label="Replay position" style={{ flex: 1, accentColor: "var(--brand)" }} />
                <b className={s.num}>{((routeLength(v.route) / 1000) * replay).toFixed(1)} km</b>
              </div>
              <dl className={s.facts} style={{ marginTop: 12, gridTemplateColumns: "repeat(4, minmax(0,1fr))" }}>
                <div><dt>Travel time</dt><dd>2 h 41 m</dd></div>
                <div><dt>Distance</dt><dd>{(routeLength(v.route) / 1000).toFixed(1)} km</dd></div>
                <div><dt>Stopped time</dt><dd>48 m</dd></div>
                <div><dt>Stops &gt; 10 min</dt><dd>3</dd></div>
              </dl>
            </Card>
          ) : (
            <Card icon={Settings2} title="Vehicle information">
              <dl className={s.facts} style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
                <div><dt>Make / model</dt><dd>{v.make} {v.model}</dd></div>
                <div><dt>Group</dt><dd>{v.group}</dd></div>
                <div><dt>Driver</dt><dd>{v.driver}</dd></div>
                <div><dt>Odometer</dt><dd>{v.odometerKm.toLocaleString("en-IN")} km</dd></div>
                <div><dt>Location</dt><dd>{v.area}</dd></div>
                <div><dt>Subscription</dt><dd>{v.subscription}</dd></div>
              </dl>
            </Card>
          )}
        </div>

        <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
          <Card icon={GaugeIcon} title="Live status" sub={offline ? `Offline since ${ago(v.lastUpdateMin)}` : "Connected · updated just now"}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Gauge value={speed} max={120} label="km/h" color={speed > 80 ? "#EF4444" : "var(--brand)"} size={150} />
              <dl className={s.facts} style={{ flex: 1, gridTemplateColumns: "1fr" }}>
                <div><dt>Status</dt><dd><StatusTag status={effectiveStatus} /></dd></div>
                <div><dt>Ignition</dt><dd>{v.ignition && !immobilized ? "On" : "Off"}</dd></div>
              </dl>
            </div>
            <dl className={s.facts} style={{ marginTop: 10 }}>
              <div><dt><Satellite size={11} /> Satellites</dt><dd>{v.satellites}</dd></div>
              <div><dt><Signal size={11} /> GSM</dt><dd>{v.gsm}/5</dd></div>
              <div><dt><Zap size={11} /> Ext. voltage</dt><dd>{v.voltage} V</dd></div>
              <div><dt><Fuel size={11} /> Fuel</dt><dd>{v.fuelPct}%</dd></div>
            </dl>
          </Card>

          <Card icon={KeyRound} title="Engine command" sub="Requires confirmation · role-protected">
            <p className={s.muted} style={{ margin: "0 0 12px", lineHeight: 1.5 }}>
              {immobilized ? "Engine is immobilized. The vehicle cannot be started until it is mobilized again." : "Send an immobilize command to cut the engine safely once the vehicle is stationary."}
            </p>
            <button
              type="button"
              className={cx(s.btn, immobilized ? s.btnPrimary : s.btnDanger)}
              style={{ width: "100%", justifyContent: "center", height: 38 }}
              disabled={offline || cmd === "queued" || cmd === "sent"}
              onClick={() => setConfirm(true)}
            >
              {immobilized ? <Unlock size={15} /> : <Lock size={15} />} {immobilized ? "Mobilize" : "Immobilize"}
            </button>
            {offline && <p className={s.muted} style={{ margin: "8px 0 0", fontSize: 12 }}>Blocked while the device is offline.</p>}
            {cmd !== "idle" && (
              <ol className={s.list} style={{ marginTop: 12 }}>
                {(["queued", "sent", "ack"] as const).map((step, i) => {
                  const done = ["queued", "sent", "ack"].indexOf(cmd) >= i;
                  return (
                    <li key={step} className={s.listRow} style={{ padding: "6px 0" }}>
                      {done ? <CheckCircle2 size={15} color="#10B981" /> : <Power size={15} className={s.muted} />}
                      <span style={{ color: done ? "var(--t1)" : "var(--t3)" }}>{step === "queued" ? "Queued" : step === "sent" ? "Sent to device" : "Acknowledged"}</span>
                    </li>
                  );
                })}
              </ol>
            )}
          </Card>

          <Card icon={AlertTriangle} title="Recent alerts" sub={v.plate}>
            <ul className={s.list}>
              {ALERTS.slice(0, 3).map((a) => (
                <li key={a.id} className={s.listRow}>
                  <span className={s.dot} style={{ "--tag": SEVERITY_META[a.severity].color } as CSSProperties} />
                  <div className={s.listMain}>
                    <strong>{a.type}</strong>
                    <small>{ago(a.minutesAgo)}</small>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {confirm && (
        <Modal
          title={immobilized ? `Mobilize ${v.plate}?` : `Immobilize ${v.plate}?`}
          body={immobilized ? "The engine will be allowed to start again." : "The command is sent to the device and applied once the vehicle is stationary."}
          confirm={immobilized ? "Mobilize" : "Immobilize"}
          danger={!immobilized}
          onClose={() => setConfirm(false)}
          onConfirm={() => {
            setConfirm(false);
            setCmd("queued");
          }}
        />
      )}
    </>
  );
}

// ======================= Trips =======================
export function TripsScreen() {
  const { theme } = useReplica();
  const [selected, setSelected] = useState(TRIPS[0].id);
  const [replay, setReplay] = useState(1);
  const [playing, setPlaying] = useState(false);
  const trip = TRIPS.find((t) => t.id === selected) ?? TRIPS[0];
  const route = ROUTES[trip.route % ROUTES.length];

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setReplay((r) => (r >= 1 ? (setPlaying(false), 1) : Math.min(1, r + 0.012))), 70);
    return () => window.clearInterval(id);
  }, [playing]);

  const pos = routePoint(trip.route, Math.min(0.999, replay));
  const columns: Column<(typeof TRIPS)[number]>[] = [
    { key: "id", header: "Trip", render: (t) => <span className={s.num}>#{t.id}</span>, sort: (t) => t.id },
    { key: "veh", header: "Vehicle", render: (t) => <b>{t.vehicle}</b>, sort: (t) => t.vehicle, search: (t) => t.vehicle },
    { key: "drv", header: "Driver", render: (t) => t.driver, search: (t) => t.driver },
    { key: "time", header: "Start – End", render: (t) => <span className={s.num}>{t.start} – {t.end}</span>, sort: (t) => t.start },
    { key: "route", header: "From → To", render: (t) => `${t.from} → ${t.to}`, search: (t) => `${t.from} ${t.to}` },
    { key: "dist", header: "Distance", render: (t) => <span className={s.num}>{t.distanceKm} km</span>, sort: (t) => t.distanceKm },
    { key: "dur", header: "Duration", render: (t) => <span className={s.num}>{t.durationMin} min</span>, sort: (t) => t.durationMin },
    { key: "max", header: "Max speed", render: (t) => <span className={s.num} style={{ color: t.maxSpeed > 80 ? "#EF4444" : undefined }}>{t.maxSpeed} km/h</span>, sort: (t) => t.maxSpeed },
    { key: "stops", header: "Stops", render: (t) => t.stops, sort: (t) => t.stops },
  ];

  return (
    <>
      <PageHeader title="All Trips" crumbs="Trips">
        <span className={s.tag} style={{ "--tag": "var(--brand)" } as CSSProperties}>
          <CalendarClock size={12} /> Today
        </span>
      </PageHeader>
      <div className={s.detailLayout} style={{ marginBottom: 14 }}>
        <div className={s.mapBox} style={{ height: 300 }}>
          <ReplicaMap
            points={[{ id: 1, label: trip.vehicle, status: "running", p: pos.p, heading: pos.heading }]}
            selected={1}
            theme={theme}
            route={route.slice(0, Math.max(2, Math.round(replay * route.length)))}
            center={route[0]}
            zoom={12}
          />
        </div>
        <Card icon={Route} title={`Trip #${trip.id}`} sub={`${trip.vehicle} · ${trip.driver}`}>
          <dl className={s.facts}>
            <div><dt>Distance</dt><dd>{trip.distanceKm} km</dd></div>
            <div><dt>Duration</dt><dd>{trip.durationMin} min</dd></div>
            <div><dt>Max speed</dt><dd>{trip.maxSpeed} km/h</dd></div>
            <div><dt>Stops</dt><dd>{trip.stops}</dd></div>
          </dl>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12 }}>
            <button type="button" className={cx(s.btn, s.btnPrimary)} onClick={() => (replay >= 1 ? (setReplay(0), setPlaying(true)) : setPlaying((p) => !p))}>
              {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? "Pause" : "Replay"}
            </button>
            <input type="range" min={0} max={1000} value={Math.round(replay * 1000)} onChange={(e) => setReplay(Number(e.target.value) / 1000)} aria-label="Replay position" style={{ flex: 1, accentColor: "var(--brand)" }} />
          </div>
        </Card>
      </div>
      <DataGrid
        rows={TRIPS}
        columns={columns}
        rowKey={(t) => t.id}
        onRowClick={(t) => {
          setSelected(t.id);
          setReplay(0);
          setPlaying(true);
        }}
        placeholder="Search trips"
        pageSize={6}
      />
    </>
  );
}
