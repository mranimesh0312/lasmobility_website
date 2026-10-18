"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Fuel, MapPin } from "lucide-react";
import styles from "./ScrollStory.module.scss";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * Live product cards around the hero vehicle: what the platform shows for
 * this car right now. Three at most, entering once after the car settles;
 * values tick gently. Demo plate, zone and values, labelled as such.
 */
export default function HeroCards() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => !document.hidden && setT((x) => x + 1), 1600);
    return () => window.clearInterval(id);
  }, []);
  const speed = Math.round(58 + 5 * Math.sin(t / 2.2));
  const fuel = 78 - Math.floor(t / 40);

  return (
    <div className={styles.heroCards} aria-hidden="true">
      <div className={`${styles.heroCard} ${styles.heroCardA}`} style={delay(0.95)}>
        <span className={styles.heroCardTag}>Demo</span>
        <span className={styles.liveDot} />
        <div>
          <small>DEMO-101 · Moving · GPS 2.4 m</small>
          <b>
            {speed} <em>km/h</em>
          </b>
        </div>
      </div>
      <div className={`${styles.heroCard} ${styles.heroCardB}`} style={delay(1.05)}>
        <span className={styles.heroCardIcon}>
          <Fuel size={15} />
        </span>
        <div>
          <small>Fuel level</small>
          <b>{fuel}%</b>
          <span className={styles.heroMeter}>
            <span style={{ width: `${fuel}%` }} />
          </span>
        </div>
      </div>
      <div className={`${styles.heroCard} ${styles.heroCardC}`} style={delay(1.15)}>
        <span className={styles.heroCardIcon}>
          <MapPin size={15} />
        </span>
        <div>
          <small>Geofence · ETA 18 min</small>
          <b className={styles.heroCardText}>Entered Whitefield depot</b>
        </div>
      </div>
    </div>
  );
}
