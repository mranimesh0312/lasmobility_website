"use client";

import { useMemo } from "react";
import { Droplet, Thermometer } from "lucide-react";
import { LineChart } from "./charts";
import { fuelSeries, temperatureSeries } from "@/data/demoData";
import styles from "./Demos.module.scss";

/** Fuel management and temperature monitoring, as the platform charts them. */
export default function SensorsDemo() {
  const fuel = useMemo(fuelSeries, []);
  const temp = useMemo(temperatureSeries, []);
  const refuel = fuel.find((p) => p.event === "refuel");
  const drain = fuel.find((p) => p.event === "drain");
  const excursion = temp.filter((p) => p.event === "excursion");

  return (
    <div className={styles.split}>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div>
            <p className={styles.kicker}>
              <Droplet size={13} /> Fuel management
            </p>
            <h4 className={styles.cardTitle}>Fuel level, last 24 h</h4>
          </div>
          <span className={styles.simBadgeInline}>Sample data</span>
        </div>
        <LineChart data={fuel} title="Fuel level (%)" unit="%" yMin={0} yMax={100} eventLabels={{ refuel: "Refuel detected", drain: "Possible drain" }} />
        <ul className={styles.eventList}>
          {refuel && <li className={styles.alertIn}>{refuel.t} · Refuel detected</li>}
          {drain && <li className={styles.alertOut}>{drain.t} · Sudden drop flagged as possible drain</li>}
        </ul>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div>
            <p className={styles.kicker}>
              <Thermometer size={13} /> Temperature monitoring
            </p>
            <h4 className={styles.cardTitle}>Cargo probe, 2–8 °C range</h4>
          </div>
          <span className={styles.simBadgeInline}>Sample data</span>
        </div>
        <LineChart data={temp} title="Cargo temperature (°C)" unit="°C" yMin={0} yMax={12} band={[2, 8]} eventLabels={{ excursion: "Above range" }} />
        <ul className={styles.eventList}>
          {excursion.length > 0 && (
            <li className={styles.alertOut}>
              {excursion[0].t}–{excursion[excursion.length - 1].t} · Out-of-range alert, peak {Math.max(...excursion.map((p) => p.v))} °C
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
