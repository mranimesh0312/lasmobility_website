"use client";

import { useEffect, useState } from "react";
import { Fuel, MapPin, ShieldCheck } from "lucide-react";
import styles from "./ScrollStory.module.scss";

/**
 * Floating "live" product cards around the hero vehicle: what the platform
 * shows for this car right now. Values tick gently; demo plate and zone.
 */
export default function HeroCards() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => !document.hidden && setT((x) => x + 1), 1600);
    return () => window.clearInterval(id);
  }, []);
  const speed = Math.round(54 + 7 * Math.sin(t / 2.2));
  const fuel = 62 - Math.floor(t / 40);

  return (
    <div className={styles.heroCards} aria-hidden="true">
      <div className={`${styles.heroCard} ${styles.heroCardA}`}>
        <span className={styles.liveDot} />
        <div>
          <small>DEMO-101 · Running</small>
          <b>
            {speed} <em>km/h</em>
          </b>
        </div>
      </div>
      <div className={`${styles.heroCard} ${styles.heroCardB}`}>
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
      <div className={`${styles.heroCard} ${styles.heroCardC}`}>
        <span className={styles.heroCardIcon}>
          <MapPin size={15} />
        </span>
        <div>
          <small>Geofence · just now</small>
          <b className={styles.heroCardText}>Entered Whitefield depot</b>
        </div>
      </div>
      <div className={`${styles.heroCard} ${styles.heroCardD}`}>
        <span className={styles.heroCardIcon}>
          <ShieldCheck size={15} />
        </span>
        <div>
          <small>Driver score</small>
          <b>
            92 <em>/ 100</em>
          </b>
        </div>
      </div>
    </div>
  );
}
