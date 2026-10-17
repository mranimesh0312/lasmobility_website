"use client";

import { useState } from "react";
import { KeyRound, Power, UserCheck, UserX } from "lucide-react";
import { DEMO_DRIVERS } from "@/data/demoData";
import styles from "./Demos.module.scss";

interface TripEvent {
  id: number;
  text: string;
  tone: "good" | "bad";
}

/**
 * Driver identification by iButton: ignition without a key leaves the trip
 * unassigned (and alerts); touching a key attributes the trip to the driver.
 */
export default function DriverIdDemo() {
  const [ignition, setIgnition] = useState(false);
  const [driver, setDriver] = useState<string | null>(null);
  const [events, setEvents] = useState<TripEvent[]>([]);
  const add = (text: string, tone: TripEvent["tone"]) => setEvents((e) => [{ id: Date.now() + Math.random(), text, tone }, ...e].slice(0, 5));

  const toggleIgnition = () => {
    const next = !ignition;
    setIgnition(next);
    if (next && !driver) add("Ignition on without driver ID: unassigned trip alert", "bad");
    if (next && driver) add(`Trip started · ${DEMO_DRIVERS.find((d) => d.id === driver)?.name}`, "good");
    if (!next) {
      add("Ignition off · trip closed", "good");
      setDriver(null);
    }
  };

  const tap = (id: string) => {
    const d = DEMO_DRIVERS.find((x) => x.id === id)!;
    setDriver(id);
    add(`iButton ${d.ibutton} read · ${d.name} identified`, "good");
  };

  const current = DEMO_DRIVERS.find((d) => d.id === driver);
  return (
    <div className={styles.split}>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div>
            <p className={styles.kicker}>
              <KeyRound size={13} /> Driver identification
            </p>
            <h4 className={styles.cardTitle}>DEMO-02 · Service SUV</h4>
          </div>
          <span className={styles.simBadgeInline}>Simulation</span>
        </div>
        <div className={styles.engineState} data-state={current ? "mobilized" : "unknown"}>
          {current ? <UserCheck size={28} /> : <UserX size={28} />}
          <div>
            <strong>{current ? current.name : "No driver identified"}</strong>
            <span>{current ? `iButton ${current.ibutton} · ${current.licence}` : "Touch an iButton key to the reader"}</span>
          </div>
        </div>
        <button type="button" className={ignition ? styles.ghostBtn : styles.primaryBtn} onClick={toggleIgnition} aria-pressed={ignition}>
          <Power size={16} /> Ignition {ignition ? "off" : "on"}
        </button>
        <p className={styles.kicker}>Touch an iButton key</p>
        <div className={styles.chips}>
          {DEMO_DRIVERS.map((d) => (
            <button key={d.id} type="button" className={`${styles.chip} ${driver === d.id ? styles.chipActive : ""}`} onClick={() => tap(d.id)}>
              <KeyRound size={13} /> {d.ibutton}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.card}>
        <p className={styles.kicker}>Trip timeline</p>
        <ul className={styles.log} aria-live="polite">
          {events.length === 0 && <li className={styles.alertEmpty}>Turn the ignition on to start.</li>}
          {events.map((e) => (
            <li key={e.id} className={e.tone === "good" ? styles.alertIn : styles.alertOut}>
              {e.text}
            </li>
          ))}
        </ul>
        <p className={styles.hintText}>Identified trips feed each driver&apos;s scorecard and performance reports.</p>
      </div>
    </div>
  );
}
