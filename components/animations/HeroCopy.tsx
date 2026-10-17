import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import styles from "./ScrollStory.module.scss";

/** Hero headline + CTAs, shared by the cinematic, static and server-rendered heroes. */
export default function HeroCopy() {
  return (
    <>
      <p className={styles.badge}>Next-gen fleet intelligence</p>
      <h1 className={styles.heroTitle}>
        AI-powered fleet <span className={styles.accent}>intelligence</span> for modern mobility
      </h1>
      <p className={styles.heroBody}>
        Track vehicles in real time, monitor driver behaviour, control fuel and maintenance costs, and act on AI-driven insights, all from one command platform.
      </p>
      <div className={styles.ctaRow}>
        <Link href="/contact" className={styles.ctaPrimary}>
          <CalendarCheck size={16} /> Book a free demo
        </Link>
        <Link href="/features" className={styles.ctaGhost}>
          Explore platform <ArrowRight size={16} />
        </Link>
      </div>
      <ul className={styles.proof}>
        <li>Live GPS tracking</li>
        <li>Remote immobilize</li>
        <li>Fuel &amp; cold-chain sensors</li>
        <li>Web &amp; mobile</li>
      </ul>
    </>
  );
}
