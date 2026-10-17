"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  AlertOctagon, BadgeCheck, Bell, BellOff, BrainCircuit, CalendarCheck, Car, CheckCircle2, Download, FileSpreadsheet, FileText, Fuel, Gauge, KeyRound,
  Lightbulb, Plus, Receipt, ShieldAlert, Sparkles, Thermometer, TrendingDown, User, Wallet, Wrench,
} from "lucide-react";
import {
  AI_INSIGHTS, ALERTS, ALERT_RULES, DRIVERS, FUEL_EVENTS, REPORT_CATALOG, RENTAL_BOOKINGS, RENTAL_VEHICLES, SERVICES, SEVERITY_META, TEMP_SENSORS, TRIPS,
  ago, dailySeries, inr, type ReplicaAlert,
} from "@/data/appReplicaData";
import { fuelSeries, temperatureSeries } from "@/data/demoData";
import { FEATURE_COPY } from "@/data/featureCopy";
import { useReplica, type ScreenId } from "../context";
import { AreaChart, Bar, Bars, Card, DataGrid, Donut, Drawer, Kpi, PageHeader, Tag, cx, type Column } from "../ui";
import s from "../Replica.module.scss";

// ======================= Alerts =======================
export function AlertsScreen() {
  const { go, toast } = useReplica();
  const [tab, setTab] = useState<"all" | "sos" | "dismissed" | "rules">("all");
  const [acked, setAcked] = useState<Set<number>>(new Set());
  const [dismissed, setDismissed] = useState<Set<number>>(new Set([12]));
  const [ruleOpen, setRuleOpen] = useState(false);
  const [rules, setRules] = useState(ALERT_RULES);

  const rows = ALERTS.filter((a) => (tab === "dismissed" ? dismissed.has(a.id) : !dismissed.has(a.id) && (tab !== "sos" || a.sos)));
  const columns: Column<ReplicaAlert>[] = [
    { key: "sev", header: "Severity", render: (a) => <Tag color={SEVERITY_META[a.severity].color} dot>{SEVERITY_META[a.severity].label}</Tag>, sort: (a) => ["critical", "high", "medium", "low"].indexOf(a.severity) },
    { key: "type", header: "Alert", render: (a) => <b>{a.type}</b>, sort: (a) => a.type, search: (a) => a.type },
    { key: "veh", header: "Vehicle", render: (a) => <button type="button" className={s.link} onClick={() => go("vehicle", Number(a.vehicle.slice(-3)) - 100)}>{a.vehicle}</button>, search: (a) => a.vehicle },
    { key: "msg", header: "Message", render: (a) => <span style={{ whiteSpace: "normal", display: "block", minWidth: 220 }}>{a.message}</span>, search: (a) => a.message },
    { key: "time", header: "Time", render: (a) => <span className={s.muted}>{ago(a.minutesAgo)}</span>, sort: (a) => a.minutesAgo },
    {
      key: "act",
      header: "Actions",
      render: (a) =>
        dismissed.has(a.id) ? (
          <button type="button" className={s.btn} onClick={() => setDismissed((d) => new Set(Array.from(d).filter((x) => x !== a.id)))}>Restore</button>
        ) : (
          <span style={{ display: "flex", gap: 6 }}>
            <button type="button" className={s.btn} disabled={acked.has(a.id)} onClick={() => { setAcked((x) => new Set(x).add(a.id)); toast(`${a.type} on ${a.vehicle} acknowledged`); }}>
              {acked.has(a.id) ? <><CheckCircle2 size={13} /> Acknowledged</> : "Acknowledge"}
            </button>
            <button type="button" className={s.btn} aria-label="Dismiss" onClick={() => setDismissed((d) => new Set(d).add(a.id))}><BellOff size={13} /></button>
          </span>
        ),
    },
  ];

  return (
    <>
      <PageHeader title="Alerts" crumbs="Alerts">
        <button type="button" className={s.btn} onClick={() => { setAcked(new Set(ALERTS.map((a) => a.id))); toast("All alerts marked as read"); }}>
          <CheckCircle2 size={14} /> Mark all read
        </button>
        <button type="button" className={cx(s.btn, s.btnPrimary)} onClick={() => setRuleOpen(true)}>
          <Plus size={14} /> New rule
        </button>
      </PageHeader>
      <div className={s.kpis} style={{ "--kpi-cols": 4 } as CSSProperties}>
        <Kpi icon={Bell} value={ALERTS.length - acked.size - dismissed.size > 0 ? ALERTS.length - acked.size - dismissed.size : 0} label="Unread" color="#06B6D4" />
        <Kpi icon={AlertOctagon} value={ALERTS.filter((a) => a.severity === "critical").length} label="Critical" sub="SOS / panic" color="#EF4444" onClick={() => setTab("sos")} />
        <Kpi icon={ShieldAlert} value={rules.filter((r) => r.active).length} label="Active rules" color="#10B981" onClick={() => setTab("rules")} />
        <Kpi icon={BellOff} value={dismissed.size} label="Dismissed" color="#94A3B8" onClick={() => setTab("dismissed")} />
      </div>
      <div className={s.tabs} role="tablist">
        {(["all", "sos", "dismissed", "rules"] as const).map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>
            {t === "all" ? "All alerts" : t === "sos" ? "SOS alerts" : t === "dismissed" ? "Dismissed" : "Alert rules"}
          </button>
        ))}
      </div>
      {tab === "rules" ? (
        <div className={s.gridCard}>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr><th>Rule</th><th>Type</th><th>Threshold</th><th>Vehicles</th><th>Notify</th><th>Active</th></tr>
              </thead>
              <tbody>
                {rules.map((r, i) => (
                  <tr key={r.name}>
                    <td><b>{r.name}</b></td>
                    <td>{r.type}</td>
                    <td className={s.num}>{r.threshold}</td>
                    <td>{r.vehicles}</td>
                    <td><span style={{ display: "flex", gap: 4 }}>{r.channels.map((c) => <Tag key={c} color="#6CABAE">{c}</Tag>)}</span></td>
                    <td>
                      <button type="button" role="switch" aria-checked={r.active} aria-label={`${r.name} active`} className={s.btn} onClick={() => setRules((rs) => rs.map((x, j) => (j === i ? { ...x, active: !x.active } : x)))}>
                        {r.active ? "On" : "Off"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <DataGrid rows={rows} columns={columns} rowKey={(a) => a.id} placeholder="Search alerts" pageSize={7} />
      )}
      {ruleOpen && (
        <Drawer title="New alert rule" onClose={() => setRuleOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              setRules((rs) => [...rs, { name: String(f.get("name") || "Overspeed alert"), type: String(f.get("type")), threshold: String(f.get("threshold") || "80 km/h"), vehicles: "All vehicles", channels: ["Push"], active: true }]);
              setRuleOpen(false);
              setTab("rules");
              toast("Rule saved");
            }}
          >
            <div className={s.field}><label htmlFor="rn">Rule name</label><input id="rn" name="name" placeholder="e.g. Overspeed Alert" /></div>
            <div className={s.field}>
              <label htmlFor="rt">Alert type</label>
              <select id="rt" name="type">{["Overspeed", "Idling", "Geofence", "Temperature", "Fuel", "Power cut", "Harsh braking"].map((t) => <option key={t}>{t}</option>)}</select>
            </div>
            <div className={s.field}><label htmlFor="th">Threshold</label><input id="th" name="threshold" placeholder="80 km/h" /></div>
            <div className={s.field}><label>Notify</label><span className={s.chips}>{["Email", "Push", "SMS"].map((c) => <Tag key={c} color="#6CABAE">{c}</Tag>)}</span></div>
            <button type="submit" className={cx(s.btn, s.btnPrimary)} style={{ width: "100%", justifyContent: "center", height: 38 }}>Save rule</button>
          </form>
        </Drawer>
      )}
    </>
  );
}

// ======================= Fuel =======================
export function FuelScreen() {
  const series = fuelSeries();
  const week = dailySeries(7);
  return (
    <>
      <PageHeader title="Fuel Overview" crumbs="Fuel Management" />
      <div className={s.kpis} style={{ "--kpi-cols": 4 } as CSSProperties}>
        <Kpi icon={Fuel} value={`${week.reduce((a, d) => a + d.fuel, 0).toLocaleString("en-IN")} L`} label="Consumed, 7 days" color="#8B5CF6" />
        <Kpi icon={Gauge} value="8.9 km/L" label="Fleet efficiency" sub="+0.4 vs last week" color="#10B981" />
        <Kpi icon={Fuel} value={FUEL_EVENTS.filter((e) => e.kind === "Refuel").length} label="Refuels today" color="#3B82F6" />
        <Kpi icon={TrendingDown} value={`${FUEL_EVENTS.filter((e) => e.kind === "Drain").reduce((a, e) => a + e.litres, 0)} L`} label="Suspected drains" sub="2 incidents" color="#EF4444" />
      </div>
      <div className={s.grid}>
        <Card icon={Fuel} title="Fuel level · DEMO-102" sub="Last 24 hours, refuel at 11:00" className={s.span8}>
          <AreaChart labels={series.map((p) => p.t)} series={[{ name: "Level", color: "#8B5CF6", values: series.map((p) => p.v) }]} unit="%" height={220} />
        </Card>
        <Card icon={Gauge} title="Daily consumption" sub="Litres, 7 days" className={s.span4}>
          <Bars data={week.map((d) => ({ label: d.label.slice(0, 2), value: d.fuel }))} color="#8B5CF6" unit=" L" height={210} />
        </Card>
        <div className={s.span12}>
          <div className={s.gridCard}>
            <div className={s.gridToolbar}><b>Fuel events</b><span className={s.muted}>Refuel and drain detection</span></div>
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead><tr><th>Time</th><th>Vehicle</th><th>Event</th><th>Litres</th><th>Location</th></tr></thead>
                <tbody>
                  {FUEL_EVENTS.map((e) => (
                    <tr key={e.time + e.vehicle}>
                      <td className={s.num}>{e.time}</td>
                      <td><b>{e.vehicle}</b></td>
                      <td><Tag color={e.kind === "Refuel" ? "#10B981" : "#EF4444"} dot>{e.kind}</Tag></td>
                      <td className={s.num}>{e.kind === "Drain" ? "−" : "+"}{e.litres} L</td>
                      <td>{e.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ======================= Temperature =======================
export function TemperatureScreen() {
  const series = temperatureSeries();
  return (
    <>
      <PageHeader title="Temperature Overview" crumbs="Temperature Management" />
      <div className={s.kpis} style={{ "--kpi-cols": 4 } as CSSProperties}>
        <Kpi icon={Thermometer} value={TEMP_SENSORS.length} label="Sensors online" color="#06B6D4" />
        <Kpi icon={CheckCircle2} value={TEMP_SENSORS.filter((t) => t.current <= t.max).length} label="In range" color="#10B981" />
        <Kpi icon={AlertOctagon} value={TEMP_SENSORS.filter((t) => t.current > t.max).length} label="Out of range" color="#EF4444" />
        <Kpi icon={Thermometer} value="4.6 °C" label="Average cargo temp" sub="Target 2–8 °C" color="#8B5CF6" />
      </div>
      <div className={s.grid}>
        <Card icon={Thermometer} title="Cargo temperature · DEMO-106 probe 1" sub="Shaded band = allowed 2–8 °C" className={s.span8}>
          <AreaChart labels={series.map((p) => p.t)} series={[{ name: "Temperature", color: "#06B6D4", values: series.map((p) => p.v) }]} unit=" °C" band={[2, 8]} height={230} />
        </Card>
        <Card icon={Thermometer} title="Sensors" sub="Current reading" className={s.span4}>
          <ul className={s.list}>
            {TEMP_SENSORS.map((t) => (
              <li key={t.vehicle + t.probe} className={s.listRow}>
                <div className={s.listMain}>
                  <strong>{t.vehicle}</strong>
                  <small>{t.probe} · {t.min}–{t.max} °C</small>
                </div>
                <Tag color={t.current > t.max ? "#EF4444" : "#10B981"} dot>{t.current} °C</Tag>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

// ======================= Maintenance =======================
export function MaintenanceScreen() {
  const { toast } = useReplica();
  const [done, setDone] = useState<Set<string>>(new Set());
  const color = (st: string) => (st === "Overdue" ? "#EF4444" : st === "Due soon" ? "#F59E0B" : "#06B6D4");
  return (
    <>
      <PageHeader title="Service Reminders" crumbs="Maintenance" />
      <div className={s.kpis} style={{ "--kpi-cols": 4 } as CSSProperties}>
        <Kpi icon={Wrench} value={SERVICES.length - done.size} label="Open reminders" color="#06B6D4" />
        <Kpi icon={AlertOctagon} value={SERVICES.filter((x) => x.status === "Overdue" && !done.has(x.vehicle + x.task)).length} label="Overdue" color="#EF4444" />
        <Kpi icon={CalendarCheck} value={SERVICES.filter((x) => x.status === "Due soon").length} label="Due in 7 days" color="#F59E0B" />
        <Kpi icon={Wallet} value={inr(SERVICES.reduce((a, x) => a + x.cost, 0))} label="Estimated cost" color="#8B5CF6" />
      </div>
      <div className={s.gridCard}>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead><tr><th>Vehicle</th><th>Service</th><th>Due</th><th>Progress</th><th>Estimate</th><th>Status</th><th /></tr></thead>
            <tbody>
              {SERVICES.map((x) => {
                const key = x.vehicle + x.task;
                const closed = done.has(key);
                return (
                  <tr key={key} style={{ opacity: closed ? 0.55 : 1 }}>
                    <td><b>{x.vehicle}</b></td>
                    <td>{x.task}</td>
                    <td>{x.due}</td>
                    <td style={{ minWidth: 120 }}><Bar value={x.progress} color={color(x.status)} /></td>
                    <td className={s.num}>{inr(x.cost)}</td>
                    <td><Tag color={closed ? "#10B981" : color(x.status)} dot>{closed ? "Completed" : x.status}</Tag></td>
                    <td>
                      <button type="button" className={s.btn} disabled={closed} onClick={() => { setDone((d) => new Set(d).add(key)); toast(`${x.task} on ${x.vehicle} closed out`); }}>
                        Mark done
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ======================= Drivers =======================
export function DriversScreen() {
  const columns: Column<(typeof DRIVERS)[number]>[] = [
    { key: "name", header: "Driver", render: (d) => <b>{d.name}</b>, sort: (d) => d.name, search: (d) => d.name },
    { key: "ib", header: "iButton", render: (d) => <span className={s.num}>{d.ibutton}</span>, search: (d) => d.ibutton },
    { key: "veh", header: "Vehicle", render: (d) => d.vehicle, search: (d) => d.vehicle },
    {
      key: "score",
      header: "Score",
      render: (d) => (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Bar value={d.score / 100} color={d.score >= 85 ? "#10B981" : d.score >= 70 ? "#F59E0B" : "#EF4444"} />
          <b className={s.num}>{d.score}</b>
        </span>
      ),
      sort: (d) => d.score,
    },
    { key: "km", header: "Distance", render: (d) => <span className={s.num}>{d.distanceKm.toLocaleString("en-IN")} km</span>, sort: (d) => d.distanceKm },
    { key: "os", header: "Overspeed", render: (d) => d.overspeed, sort: (d) => d.overspeed },
    { key: "harsh", header: "Harsh events", render: (d) => d.harsh, sort: (d) => d.harsh },
    { key: "idle", header: "Idling", render: (d) => <span className={s.num}>{d.idleMin} min</span>, sort: (d) => d.idleMin },
  ];
  const avg = Math.round(DRIVERS.reduce((a, d) => a + d.score, 0) / DRIVERS.length);
  return (
    <>
      <PageHeader title="Driver Scorecard" crumbs="Drivers" />
      <div className={s.kpis} style={{ "--kpi-cols": 4 } as CSSProperties}>
        <Kpi icon={User} value={DRIVERS.length} label="Active drivers" sub="Identified by iButton" />
        <Kpi icon={BadgeCheck} value={avg} label="Average score" color="#10B981" />
        <Kpi icon={Gauge} value={DRIVERS.reduce((a, d) => a + d.overspeed, 0)} label="Overspeed events" color="#F59E0B" />
        <Kpi icon={KeyRound} value={DRIVERS.reduce((a, d) => a + d.harsh, 0)} label="Harsh events" color="#EF4444" />
      </div>
      <DataGrid rows={DRIVERS} columns={columns} rowKey={(d) => d.name} placeholder="Search drivers" />
    </>
  );
}

// ======================= Reports =======================
export function ReportsScreen() {
  const { toast } = useReplica();
  const [report, setReport] = useState("Trip summary");
  const [period, setPeriod] = useState<"today" | "7d" | "30d">("today");
  const [q, setQ] = useState("");
  const mult = period === "today" ? 1 : period === "7d" ? 6.4 : 27;
  const category = REPORT_CATALOG.find((c) => c.reports.includes(report))?.category ?? "";
  const rows = TRIPS.slice(0, 10).map((t, i) => ({
    ...t,
    trips: Math.round((1 + (t.id % 4)) * mult),
    distance: +(t.distanceKm * 2.6 * mult).toFixed(1),
    driving: Math.round(t.durationMin * 2.4 * mult),
    idle: Math.round((8 + (i * 7) % 30) * mult),
  }));
  const total = (k: "trips" | "distance" | "driving" | "idle") => rows.reduce((a, r) => a + r[k], 0);
  const hm = (m: number) => `${Math.floor(m / 60)} h ${String(Math.round(m % 60)).padStart(2, "0")} m`;

  return (
    <>
      <PageHeader title="Standard Reports" crumbs="Reports">
        <button type="button" className={s.btn} onClick={() => toast(`${report}.pdf exported`)}><FileText size={14} /> PDF</button>
        <button type="button" className={s.btn} onClick={() => toast(`${report}.xlsx exported`)}><FileSpreadsheet size={14} /> Excel</button>
        <button type="button" className={cx(s.btn, s.btnPrimary)} onClick={() => toast(`${report} scheduled every Monday 08:00 by email`)}><CalendarCheck size={14} /> Schedule</button>
      </PageHeader>
      <div className={s.reportLayout}>
        <aside className={s.reportNav}>
          <label className={s.gridSearch} style={{ maxWidth: "none", margin: "4px 4px 8px" }}>
            <FileText size={14} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a report" aria-label="Find a report" />
          </label>
          <div className={s.reportNavList} data-lenis-prevent>
            {REPORT_CATALOG.map((c) => {
              const items = c.reports.filter((r) => r.toLowerCase().includes(q.toLowerCase()));
              if (!items.length) return null;
              return (
                <div key={c.category}>
                  <p className={s.navGroupLabel} style={{ margin: "10px 10px 4px" }}>{c.category}</p>
                  {items.map((r) => (
                    <button key={r} type="button" className={s.reportBtn} aria-pressed={report === r} onClick={() => setReport(r)}>
                      <FileText size={14} /> {r}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </aside>

        <div style={{ display: "grid", gap: 14, minWidth: 0, alignContent: "start" }}>
          <div className={s.card} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p className={s.cardSub} style={{ margin: 0, textTransform: "uppercase", letterSpacing: ".08em" }}>{category}</p>
              <h4 className={s.cardTitle} style={{ fontSize: 17 }}>{report}</h4>
            </div>
            <div className={s.segmented} role="group" aria-label="Report period">
              {(["today", "7d", "30d"] as const).map((p) => (
                <button key={p} type="button" aria-pressed={period === p} onClick={() => setPeriod(p)}>
                  {p === "today" ? "Today" : p === "7d" ? "7 days" : "30 days"}
                </button>
              ))}
            </div>
            <span className={s.tag} style={{ "--tag": "var(--brand)" } as CSSProperties}>All vehicles</span>
          </div>

          <div className={s.kpis}>
            <Kpi icon={Car} value={rows.length} label="Vehicles" />
            <Kpi icon={CalendarCheck} value={total("trips")} label="Trips" color="#3B82F6" />
            <Kpi icon={Gauge} value={`${Math.round(total("distance")).toLocaleString("en-IN")} km`} label="Distance" color="#10B981" />
            <Kpi icon={Fuel} value={hm(total("idle"))} label="Idling" color="#F59E0B" />
          </div>

          <div className={s.gridCard}>
            <div className={s.gridToolbar}>
              <b>Preview</b>
              <span className={s.muted}>{rows.length} rows · generated just now</span>
              <button type="button" className={s.btn} style={{ marginLeft: "auto" }} onClick={() => toast(`${report}.xlsx exported`)}>
                <Download size={14} /> Export
              </button>
            </div>
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr><th>Vehicle</th><th>Driver</th><th>Trips</th><th>Distance</th><th>Driving time</th><th>Idling</th><th>Max speed</th></tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td><b>{r.vehicle}</b></td>
                      <td>{r.driver}</td>
                      <td className={s.num}>{r.trips}</td>
                      <td className={s.num}>{r.distance.toLocaleString("en-IN")} km</td>
                      <td className={s.num}>{hm(r.driving)}</td>
                      <td className={s.num}>{hm(r.idle)}</td>
                      <td className={s.num} style={{ color: r.maxSpeed > 80 ? "#EF4444" : undefined }}>{r.maxSpeed} km/h</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2}><b>Total</b></td>
                    <td className={s.num}><b>{total("trips")}</b></td>
                    <td className={s.num}><b>{Math.round(total("distance")).toLocaleString("en-IN")} km</b></td>
                    <td className={s.num}><b>{hm(total("driving"))}</b></td>
                    <td className={s.num}><b>{hm(total("idle"))}</b></td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ======================= AI Insights =======================
const TONE: Record<string, string> = { danger: "#EF4444", warning: "#F59E0B", info: "#06B6D4", success: "#10B981" };
const ACTION_TARGET: Record<string, ScreenId> = {
  "Open fuel events": "fuel",
  "View scorecard": "drivers",
  "Review fleet size": "vehicles",
  "Schedule service": "maintenance",
  "Create idle rule": "alerts",
};

export function AiScreen() {
  const { go, openAi } = useReplica();
  return (
    <>
      <PageHeader title="AI Insights" crumbs="AI Intelligence">
        <button type="button" className={cx(s.btn, s.btnPrimary)} onClick={openAi}><Sparkles size={14} /> Ask AI</button>
      </PageHeader>
      <div className={s.kpis} style={{ "--kpi-cols": 4 } as CSSProperties}>
        <Kpi icon={AlertOctagon} value="3" label="Anomalies this week" color="#EF4444" />
        <Kpi icon={ShieldAlert} value="2" label="High-risk drivers" color="#F59E0B" />
        <Kpi icon={Car} value="71%" label="Fleet utilisation" color="#06B6D4" />
        <Kpi icon={Lightbulb} value={inr(18400)} label="Savings identified" sub="per month" color="#10B981" />
      </div>
      <div className={s.grid}>
        <div className={s.span8} style={{ display: "grid", gap: 12 }}>
          {AI_INSIGHTS.map((i) => (
            <article key={i.title} className={s.insight} style={{ "--tag": TONE[i.tone] } as CSSProperties}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Tag color={TONE[i.tone]}>{i.kind}</Tag>
                <h5>{i.title}</h5>
              </div>
              <p>{i.body}</p>
              <div>
                <button type="button" className={s.link} onClick={() => go(ACTION_TARGET[i.action] ?? "dashboard")}>{i.action} →</button>
              </div>
            </article>
          ))}
        </div>
        <Card icon={BrainCircuit} title="Risk mix" sub="Drivers by risk band" className={s.span4}>
          <Donut
            center={{ value: DRIVERS.length, label: "Drivers" }}
            parts={[
              { label: "Low risk", value: DRIVERS.filter((d) => d.score >= 85).length, color: "#10B981" },
              { label: "Medium", value: DRIVERS.filter((d) => d.score >= 70 && d.score < 85).length, color: "#F59E0B" },
              { label: "High", value: DRIVERS.filter((d) => d.score < 70).length, color: "#EF4444" },
            ]}
            size={140}
          />
        </Card>
      </div>
    </>
  );
}

// ======================= Rental Hub =======================
export function RentalScreen() {
  const { toast } = useReplica();
  const statusColor: Record<string, string> = { Available: "#10B981", "On rent": "#3B82F6", Reserved: "#8B5CF6", "On hold": "#F59E0B", Leased: "#06B6D4" };
  const counts = useMemo(() => RENTAL_VEHICLES.reduce<Record<string, number>>((a, v) => ((a[v.status] = (a[v.status] ?? 0) + 1), a), {}), []);
  return (
    <>
      <PageHeader title="Rental & Leasing Overview" crumbs="Rental Hub">
        <button type="button" className={cx(s.btn, s.btnPrimary)} onClick={() => toast("New booking started")}><Plus size={14} /> New booking</button>
      </PageHeader>
      <div className={s.kpis} style={{ "--kpi-cols": 5 } as CSSProperties}>
        <Kpi icon={Car} value="64%" label="Fleet utilisation" sub="30 days" />
        <Kpi icon={KeyRound} value={counts["On rent"] ?? 0} label="On rent now" sub="0 overdue" color="#3B82F6" />
        <Kpi icon={CalendarCheck} value={counts.Reserved ?? 0} label="Reserved" sub="2 pickups today" color="#8B5CF6" />
        <Kpi icon={Receipt} value={inr(486200)} label="Charged this month" color="#10B981" />
        <Kpi icon={Wallet} value={inr(452900)} label="Collected this month" color="#06B6D4" />
      </div>
      <div className={s.grid}>
        <Card icon={CalendarCheck} title="Today" sub="Pickups and returns" className={s.span5}>
          <ul className={s.list}>
            {RENTAL_BOOKINGS.map((b) => (
              <li key={b.ref} className={s.listRow}>
                <div className={s.listMain}>
                  <strong>{b.vehicle}</strong>
                  <small>{b.customer} · {b.ref}</small>
                </div>
                <span className={s.num}>{b.pickup}</span>
                <Tag color={b.kind === "Pickup" ? "#8B5CF6" : "#3B82F6"}>{b.kind}</Tag>
              </li>
            ))}
          </ul>
        </Card>
        <div className={s.span7}>
          <div className={s.gridCard}>
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead><tr><th>Registration</th><th>Make / Model</th><th>Category</th><th>Daily rate</th><th>Rental status</th></tr></thead>
                <tbody>
                  {RENTAL_VEHICLES.map((v) => (
                    <tr key={v.plate}>
                      <td><b style={{ color: "var(--brand)" }}>{v.plate}</b></td>
                      <td>{v.make} {v.model}</td>
                      <td>{v.category}</td>
                      <td className={s.num}>{inr(v.rate)}</td>
                      <td><Tag color={statusColor[v.status]}>{v.status}</Tag></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ======================= Module overview (menu items without a full screen) =======================
const OVERVIEW: Partial<Record<ScreenId, { title: string; crumbs: string; copyKey: string; icon: typeof Fuel }>> = {
  geofence: { title: "Geofence Management", crumbs: "Geofence", copyKey: "geofencing", icon: Gauge },
  documents: { title: "Document Registry", crumbs: "Document Management", copyKey: "documents", icon: FileText },
  expenses: { title: "Expenses Overview", crumbs: "Expenses", copyKey: "expenses", icon: Receipt },
};

export function ModuleOverviewScreen({ id }: { id: ScreenId }) {
  const meta = OVERVIEW[id]!;
  const copy = FEATURE_COPY[meta.copyKey];
  const Icon = meta.icon;
  return (
    <>
      <PageHeader title={meta.title} crumbs={meta.crumbs} />
      <div className={s.card}>
        <div className={s.moduleIntro}>
          <span className={s.kpiIcon} style={{ width: 48, height: 48 }}><Icon size={22} /></span>
          <h4 className={s.pageTitle} style={{ fontSize: 22 }}>{meta.title}</h4>
          <p style={{ margin: 0, color: "var(--t2)", fontSize: 15, lineHeight: 1.6 }}>{copy.summary}</p>
          <ul className={s.list}>
            {copy.points.map((p) => (
              <li key={p} className={s.listRow}><CheckCircle2 size={16} color="#10B981" /> {p}</li>
            ))}
          </ul>
          <p className={s.muted} style={{ margin: 0 }}>This module is part of the full platform. Book a demo to see it with your own data.</p>
        </div>
      </div>
    </>
  );
}
