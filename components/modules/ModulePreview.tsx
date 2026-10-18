import { ALL_MODULES } from "@/data/liveModules";
import styles from "./ModulePreview.module.scss";

/**
 * Compact, coded version of a module page's hero panel (same data), used as
 * the Features menu preview. Theme tokens only; returns null for links that
 * are not module pages so the caller can fall back to an icon.
 */
export default function ModulePreview({ href }: { href: string }) {
  const m = ALL_MODULES.find((x) => `/features/${x.slug}` === href);
  if (!m) return null;
  const { panel } = m;
  const pts = panel.series.points;
  const values = panel.series.band ? [...pts, ...panel.series.band] : pts;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const W = 220;
  const H = 54;
  const x = (i: number) => 2 + (i / (pts.length - 1)) * (W - 4);
  const y = (v: number) => H - 4 - ((v - min) / (max - min || 1)) * (H - 8);
  const line = pts.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const event = panel.events[panel.events.length - 1];

  return (
    <div className={styles.preview} aria-hidden="true">
      <div className={styles.head}>
        <span className={styles.vehicle}>{panel.vehicle}</span>
        <span className={styles.tag}>{m.status === "soon" ? "Preview" : "Demo"}</span>
      </div>
      <div className={styles.readings}>
        {panel.readings.slice(0, 2).map((r) => (
          <span key={r.label} data-tone={r.tone}>
            <small>{r.label}</small>
            <b>{r.value}</b>
          </span>
        ))}
      </div>
      <svg className={styles.spark} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {panel.series.band && <rect className={styles.band} x={0} width={W} y={y(panel.series.band[1])} height={y(panel.series.band[0]) - y(panel.series.band[1])} />}
        <path className={styles.area} d={`${line} L${x(pts.length - 1)} ${H} L${x(0)} ${H} Z`} />
        <path className={styles.line} d={line} />
      </svg>
      <p className={styles.event} data-tone={event.tone}>
        <time>{event.time}</time> {event.text}
      </p>
    </div>
  );
}
