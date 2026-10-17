"use client";

import { useEffect, useRef, useState } from "react";
import type { TimePoint } from "@/data/demoData";
import styles from "./Demos.module.scss";

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(600);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(240, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

const PAD = { top: 16, right: 12, bottom: 26, left: 40 };

interface LineChartProps {
  data: TimePoint[];
  title: string;
  unit: string;
  yMin: number;
  yMax: number;
  /** Shaded acceptable range, e.g. 2–8 °C. */
  band?: [number, number];
  height?: number;
  eventLabels?: Partial<Record<NonNullable<TimePoint["event"]>, string>>;
}

/** Single-series line with crosshair tooltip and event markers. */
export function LineChart({ data, title, unit, yMin, yMax, band, height = 220, eventLabels = {} }: LineChartProps) {
  const { ref, width } = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const w = width - PAD.left - PAD.right;
  const h = height - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (i / (data.length - 1)) * w;
  const y = (v: number) => PAD.top + (1 - (v - yMin) / (yMax - yMin)) * h;
  const path = data.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join("");
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((k) => yMin + k * (yMax - yMin));
  const labelEvery = Math.ceil(data.length / (width < 480 ? 4 : 7));

  const pick = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    const i = Math.round(((clientX - r.left - PAD.left) / w) * (data.length - 1));
    setHover(Math.min(data.length - 1, Math.max(0, i)));
  };

  const hp = hover !== null ? data[hover] : null;
  return (
    <figure className={styles.chart}>
      <figcaption className={styles.chartTitle}>{title}</figcaption>
      <div
        ref={ref}
        className={styles.chartArea}
        onPointerMove={(e) => pick(e.clientX)}
        onPointerLeave={() => setHover(null)}
        tabIndex={0}
        role="img"
        aria-label={`${title}. Use left and right arrow keys to read values.`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setHover((v) => Math.min(data.length - 1, (v ?? -1) + 1));
          if (e.key === "ArrowLeft") setHover((v) => Math.max(0, (v ?? 1) - 1));
        }}
        onBlur={() => setHover(null)}
      >
        <svg width={width} height={height} className={styles.svg} aria-hidden="true">
          {band && <rect x={PAD.left} width={w} y={y(band[1])} height={y(band[0]) - y(band[1])} className={styles.band} />}
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={PAD.left + w} y1={y(t)} y2={y(t)} className={styles.grid} />
              <text x={PAD.left - 8} y={y(t)} className={styles.axisLabel} textAnchor="end" dominantBaseline="middle">
                {Math.round(t)}
              </text>
            </g>
          ))}
          {data.map((p, i) =>
            i % labelEvery === 0 ? (
              <text key={p.t} x={x(i)} y={height - 6} className={styles.axisLabel} textAnchor="middle">
                {p.t}
              </text>
            ) : null
          )}
          <path d={path} className={styles.line} />
          {data.map((p, i) =>
            p.event ? (
              <circle key={`e${i}`} cx={x(i)} cy={y(p.v)} r={5} className={p.event === "refuel" ? styles.markGood : styles.markBad} />
            ) : null
          )}
          {hp && (
            <g>
              <line x1={x(hover!)} x2={x(hover!)} y1={PAD.top} y2={PAD.top + h} className={styles.crosshair} />
              <circle cx={x(hover!)} cy={y(hp.v)} r={4.5} className={styles.hoverDot} />
            </g>
          )}
        </svg>
        {hp && (
          <div className={styles.tooltip} style={{ left: Math.min(width - 150, Math.max(0, x(hover!) - 70)), top: 4 }}>
            <span className={styles.tooltipLabel}>{hp.t}</span>
            <strong>
              {hp.v} {unit}
            </strong>
            {hp.event && eventLabels[hp.event] && <span className={styles.tooltipEvent}>{eventLabels[hp.event]}</span>}
          </div>
        )}
      </div>
      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th>Time</th>
            <th>{unit}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.t}>
              <td>{p.t}</td>
              <td>
                {p.v}
                {p.event ? ` (${eventLabels[p.event] ?? p.event})` : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

/** Single-series column chart with per-bar hover. */
export function BarChart({ data, title, unit, height = 220 }: { data: { label: string; value: number }[]; title: string; unit: string; height?: number }) {
  const { ref, width } = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const w = width - PAD.left - PAD.right;
  const h = height - PAD.top - PAD.bottom;
  const max = Math.ceil(Math.max(...data.map((d) => d.value)) / 250) * 250 || 1;
  const slot = w / data.length;
  const barW = Math.max(3, Math.min(28, slot - 2));
  const y = (v: number) => PAD.top + (1 - v / max) * h;
  const ticks = [0, 0.5, 1].map((k) => k * max);
  const labelEvery = Math.ceil(data.length / (width < 480 ? 4 : 8));
  const r = Math.min(4, barW / 2);

  return (
    <figure className={styles.chart}>
      <figcaption className={styles.chartTitle}>{title}</figcaption>
      <div ref={ref} className={styles.chartArea} onPointerLeave={() => setHover(null)}>
        <svg width={width} height={height} className={styles.svg} role="img" aria-label={title}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={PAD.left + w} y1={y(t)} y2={y(t)} className={styles.grid} />
              <text x={PAD.left - 8} y={y(t)} className={styles.axisLabel} textAnchor="end" dominantBaseline="middle">
                {t}
              </text>
            </g>
          ))}
          {data.map((d, i) => {
            const bx = PAD.left + i * slot + (slot - barW) / 2;
            const by = y(d.value);
            const bh = PAD.top + h - by;
            // rounded data-end, square on the baseline
            const path = `M${bx},${by + bh}V${by + r}Q${bx},${by} ${bx + r},${by}H${bx + barW - r}Q${bx + barW},${by} ${bx + barW},${by + r}V${by + bh}Z`;
            return (
              <g key={d.label}>
                <rect x={PAD.left + i * slot} y={PAD.top} width={slot} height={h} fill="transparent" onPointerEnter={() => setHover(i)} />
                <path d={path} className={hover === i ? styles.barActive : styles.bar} pointerEvents="none" />
                {i % labelEvery === 0 && (
                  <text x={bx + barW / 2} y={height - 6} className={styles.axisLabel} textAnchor="middle">
                    {d.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        {hover !== null && (
          <div className={styles.tooltip} style={{ left: Math.min(width - 150, Math.max(0, PAD.left + hover * slot - 60)), top: 4 }}>
            <span className={styles.tooltipLabel}>{data[hover].label}</span>
            <strong>
              {data[hover].value.toLocaleString("en-IN")} {unit}
            </strong>
          </div>
        )}
      </div>
      <table className="sr-only">
        <caption>{title}</caption>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}>
              <td>{d.label}</td>
              <td>
                {d.value} {unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
