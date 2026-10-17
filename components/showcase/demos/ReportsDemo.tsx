"use client";

import { useMemo, useState } from "react";
import { BarChart } from "./charts";
import { STATUS_BREAKDOWN, reportSeries } from "@/data/demoData";
import styles from "./Demos.module.scss";

/** Reports & analytics: KPI tiles, distance per day and a fleet status split. */
export default function ReportsDemo() {
  const [days, setDays] = useState<7 | 30>(7);
  const series = useMemo(() => reportSeries(days), [days]);
  const total = (k: "distanceKm" | "trips" | "fuelL") => series.reduce((s, d) => s + d[k], 0);
  const km = total("distanceKm");
  const fuel = total("fuelL");

  return (
    <div className={styles.reports}>
      <div className={styles.reportsHead}>
        <div className={styles.segmented} role="radiogroup" aria-label="Period">
          {[7, 30].map((d) => (
            <button key={d} type="button" role="radio" aria-checked={days === d} className={days === d ? styles.segActive : ""} onClick={() => setDays(d as 7 | 30)}>
              Last {d} days
            </button>
          ))}
        </div>
        <span className={styles.simBadgeInline}>Sample data</span>
      </div>
      <div className={styles.kpis}>
        <div className={styles.kpi}><span>Distance</span><strong>{km.toLocaleString("en-IN")} km</strong></div>
        <div className={styles.kpi}><span>Trips</span><strong>{total("trips").toLocaleString("en-IN")}</strong></div>
        <div className={styles.kpi}><span>Fuel used</span><strong>{fuel.toLocaleString("en-IN")} L</strong></div>
        <div className={styles.kpi}><span>Efficiency</span><strong>{(km / fuel).toFixed(1)} km/L</strong></div>
      </div>
      <div className={styles.reportCharts}>
        <div className={styles.card}>
          <BarChart data={series.map((d) => ({ label: d.label, value: d.distanceKm }))} title="Fleet distance per day (km)" unit="km" />
        </div>
        <div className={styles.card}>
          <p className={styles.chartTitle}>Fleet status share of time</p>
          <div className={styles.stackBar} role="img" aria-label={STATUS_BREAKDOWN.map((s) => `${s.label} ${Math.round(s.share * 100)}%`).join(", ")}>
            {STATUS_BREAKDOWN.map((s) => (
              <span key={s.key} style={{ flexGrow: s.share, background: s.color }} title={`${s.label}: ${Math.round(s.share * 100)}%`} />
            ))}
          </div>
          <ul className={styles.legend}>
            {STATUS_BREAKDOWN.map((s) => (
              <li key={s.key}>
                <span className={styles.swatchDot} style={{ background: s.color }} />
                {s.label}
                <strong>{Math.round(s.share * 100)}%</strong>
              </li>
            ))}
          </ul>
          <p className={styles.hintText}>Reports export to PDF and Excel and can be scheduled by email.</p>
        </div>
      </div>
    </div>
  );
}
