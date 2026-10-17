"use client";

import { useId, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { STATUS_META, type LiveStatus } from "@/data/appReplicaData";
import s from "./Replica.module.scss";

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
const accent = (color?: string) => (color ? ({ "--kpi-accent": color } as CSSProperties) : undefined);

export function PageHeader({ title, crumbs, children }: { title: string; crumbs: string; children?: ReactNode }) {
  return (
    <div className={s.pageHeader}>
      <div className={s.pageTitleWrap}>
        <h3 className={s.pageTitle}>{title}</h3>
        <p className={s.crumbs}>
          <span>{crumbs}</span> / <b>{title}</b>
        </p>
      </div>
      {children && <div className={s.actions}>{children}</div>}
    </div>
  );
}

export function Kpi({ icon: Icon, value, label, sub, color, onClick }: { icon: LucideIcon; value: ReactNode; label: string; sub?: ReactNode; color?: string; onClick?: () => void }) {
  const body = (
    <>
      <span className={s.kpiIcon}>
        <Icon size={18} />
      </span>
      <span style={{ minWidth: 0 }}>
        <span className={s.kpiValue}>{value}</span>
        <span className={s.kpiLabel}>{label}</span>
        {sub && <span className={s.kpiSub}>{sub}</span>}
      </span>
    </>
  );
  return onClick ? (
    <button type="button" className={s.kpi} style={accent(color)} onClick={onClick}>
      {body}
    </button>
  ) : (
    <div className={s.kpi} style={accent(color)}>
      {body}
    </div>
  );
}

export function Card({ icon: Icon, title, sub, action, className, children }: { icon?: LucideIcon; title: string; sub?: string; action?: { label: string; onClick: () => void }; className?: string; children: ReactNode }) {
  return (
    <section className={cx(s.card, className)}>
      <div className={s.cardHead}>
        {Icon && (
          <span className={s.cardIcon}>
            <Icon size={16} />
          </span>
        )}
        <div style={{ minWidth: 0 }}>
          <h4 className={s.cardTitle}>{title}</h4>
          {sub && <p className={s.cardSub}>{sub}</p>}
        </div>
        {action && (
          <button type="button" className={s.cardAction} onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

export function Tag({ color, children, dot }: { color: string; children: ReactNode; dot?: boolean }) {
  return (
    <span className={s.tag} style={{ "--tag": color } as CSSProperties}>
      {dot && <span className={s.dot} />}
      {children}
    </span>
  );
}

export function StatusTag({ status }: { status: LiveStatus }) {
  const m = STATUS_META[status];
  return (
    <Tag color={m.color} dot>
      {m.label}
    </Tag>
  );
}

export function StatusDot({ status, pulse }: { status: LiveStatus; pulse?: boolean }) {
  return <span className={cx(s.dot, pulse && status === "running" && s.pulse)} style={{ "--tag": STATUS_META[status].color } as CSSProperties} />;
}

export function Bar({ value, color }: { value: number; color?: string }) {
  return (
    <div className={s.bar} style={{ "--bar": color } as CSSProperties}>
      <span style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
    </div>
  );
}

// ---------- data grid ----------
export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  sort?: (row: T) => number | string;
  search?: (row: T) => string;
}

export function DataGrid<T>({
  rows,
  columns,
  rowKey,
  onRowClick,
  toolbar,
  placeholder = "Search",
  pageSize = 8,
}: {
  rows: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  toolbar?: ReactNode;
  placeholder?: string;
  pageSize?: number;
}) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = needle
      ? rows.filter((r) => columns.some((c) => (c.search ? c.search(r) : "").toLowerCase().includes(needle)))
      : rows;
    if (sort) {
      const col = columns.find((c) => c.key === sort.key);
      if (col?.sort) out = [...out].sort((a, b) => (col.sort!(a) > col.sort!(b) ? 1 : col.sort!(a) < col.sort!(b) ? -1 : 0) * sort.dir);
    }
    return out;
  }, [rows, columns, q, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages - 1);
  const visible = filtered.slice(current * pageSize, current * pageSize + pageSize);

  return (
    <div className={s.gridCard}>
      <div className={s.gridToolbar}>
        <label className={s.gridSearch}>
          <Search size={14} />
          <input
            value={q}
            placeholder={placeholder}
            aria-label={placeholder}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(0);
            }}
          />
        </label>
        {toolbar}
      </div>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} aria-sort={sort?.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : undefined}>
                  {c.sort ? (
                    <button
                      type="button"
                      className={s.sortBtn}
                      onClick={() => setSort((p) => (p?.key === c.key ? (p.dir === 1 ? { key: c.key, dir: -1 } : null) : { key: c.key, dir: 1 }))}
                    >
                      {c.header}
                      {sort?.key === c.key && (sort.dir === 1 ? <ArrowUp size={11} /> : <ArrowDown size={11} />)}
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr
                key={rowKey(r)}
                data-clickable={onRowClick ? "true" : undefined}
                onClick={onRowClick ? () => onRowClick(r) : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={onRowClick ? (e) => e.key === "Enter" && onRowClick(r) : undefined}
              >
                {columns.map((c) => (
                  <td key={c.key}>{c.render(r)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && <p className={s.empty}>No records match “{q}”.</p>}
      </div>
      <div className={s.gridFoot}>
        <span>
          {filtered.length === 0 ? 0 : current * pageSize + 1}–{Math.min(filtered.length, (current + 1) * pageSize)} of {filtered.length}
        </span>
        <span style={{ display: "flex", gap: 6 }}>
          <button type="button" className={s.iconBtn} aria-label="Previous page" disabled={current === 0} onClick={() => setPage(current - 1)}>
            <ChevronLeft size={15} />
          </button>
          <button type="button" className={s.iconBtn} aria-label="Next page" disabled={current >= pages - 1} onClick={() => setPage(current + 1)}>
            <ChevronRight size={15} />
          </button>
        </span>
      </div>
    </div>
  );
}

// ---------- charts ----------
export function Donut({ parts, size = 150, center }: { parts: { label: string; value: number; color: string }[]; size?: number; center: { value: ReactNode; label: string } }) {
  const total = parts.reduce((a, p) => a + p.value, 0) || 1;
  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
      <div className={s.gauge} style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${center.label}: ${parts.map((p) => `${p.label} ${p.value}`).join(", ")}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line-soft)" strokeWidth={16} />
          {parts.map((p) => {
            const len = (p.value / total) * c;
            const el = (
              <circle
                key={p.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={p.color}
                strokeWidth={16}
                strokeDasharray={`${Math.max(0, len - 2)} ${c}`}
                strokeDashoffset={-acc}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            );
            acc += len;
            return el;
          })}
        </svg>
        <div className={s.gaugeValue}>
          <b style={{ fontSize: 24 }}>{center.value}</b>
          <small>{center.label}</small>
        </div>
      </div>
      <ul className={s.list} style={{ flex: 1, minWidth: 130 }}>
        {parts.map((p) => (
          <li key={p.label} className={s.listRow} style={{ padding: "6px 0" }}>
            <span className={s.dot} style={{ "--tag": p.color } as CSSProperties} />
            <span style={{ flex: 1, color: "var(--t2)" }}>{p.label}</span>
            <b className={s.num}>{p.value}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface Series {
  name: string;
  color: string;
  values: number[];
}

/** Area/line chart in the app's echarts style, with a hover crosshair. */
export function AreaChart({ labels, series, height = 200, unit = "", band }: { labels: string[]; series: Series[]; height?: number; unit?: string; band?: [number, number] }) {
  const id = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const W = 640;
  const H = height;
  const pad = { l: 40, r: 10, t: 12, b: 24 };
  const all = series.flatMap((x) => x.values).concat(band ?? []);
  const max = Math.max(...all) * 1.1;
  const min = Math.min(0, ...all);
  const x = (i: number) => pad.l + (i / Math.max(1, labels.length - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min || 1)) * (H - pad.t - pad.b);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => min + t * (max - min));
  const step = Math.ceil(labels.length / 7);
  const fmt = (v: number) => (Math.abs(v) >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k` : `${Math.round(v * 10) / 10}`);

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" role="img" aria-label={series.map((sr) => sr.name).join(", ")} onMouseLeave={() => setHover(null)}>
        <defs>
          {series.map((sr, k) => (
            <linearGradient key={sr.name} id={`${id}-${k}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={sr.color} stopOpacity="0.32" />
              <stop offset="1" stopColor={sr.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--line-soft)" />
            <text x={pad.l - 6} y={y(t) + 3} textAnchor="end" fontSize="10" fill="var(--t3)">
              {fmt(t)}
            </text>
          </g>
        ))}
        {band && <rect x={pad.l} width={W - pad.l - pad.r} y={y(band[1])} height={y(band[0]) - y(band[1])} fill="var(--ok)" opacity="0.08" />}
        {series.map((sr, k) => {
          const line = sr.values.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join("");
          return (
            <g key={sr.name}>
              <path d={`${line}L${x(sr.values.length - 1)},${y(min)}L${x(0)},${y(min)}Z`} fill={`url(#${id}-${k})`} />
              <path d={line} fill="none" stroke={sr.color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </g>
          );
        })}
        {labels.map((l, i) =>
          i % step === 0 ? (
            <text key={l + i} x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="var(--t3)">
              {l}
            </text>
          ) : null
        )}
        {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={H - pad.b} stroke="var(--t3)" strokeDasharray="3 3" />}
        {labels.map((l, i) => (
          <rect key={`h${i}`} x={x(i) - (W - pad.l - pad.r) / labels.length / 2} y={0} width={(W - pad.l - pad.r) / labels.length} height={H} fill="transparent" onMouseEnter={() => setHover(i)} />
        ))}
      </svg>
      {hover !== null && (
        <div
          style={{
            position: "absolute",
            top: 6,
            left: `${(x(hover) / W) * 100}%`,
            transform: `translateX(${hover > labels.length / 2 ? "-105%" : "5%"})`,
            padding: "6px 9px",
            borderRadius: 8,
            background: "var(--card-2)",
            border: "1px solid var(--line)",
            fontSize: 11,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 8px 20px rgba(0,0,0,.3)",
          }}
        >
          <b style={{ display: "block", marginBottom: 2 }}>{labels[hover]}</b>
          {series.map((sr) => (
            <span key={sr.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className={s.dot} style={{ "--tag": sr.color } as CSSProperties} /> {sr.name}: <b className={s.num}>{sr.values[hover].toLocaleString("en-IN")}{unit}</b>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function Bars({ data, color = "var(--brand)", height = 160, unit = "" }: { data: { label: string; value: number }[]; color?: string; height?: number; unit?: string }) {
  const max = Math.max(...data.map((d) => d.value)) || 1;
  const step = Math.ceil(data.length / 8);
  return (
    <div role="img" aria-label={data.map((d) => `${d.label} ${d.value}${unit}`).join(", ")} style={{ display: "flex", alignItems: "flex-end", gap: 3, height, paddingTop: 6 }}>
      {data.map((d, i) => (
        <div key={d.label + i} title={`${d.label}: ${d.value}${unit}`} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ width: "100%", maxWidth: 26, height: `${(d.value / max) * 82}%`, borderRadius: "4px 4px 0 0", background: color, opacity: 0.85 }} />
          <span style={{ fontSize: 9.5, color: "var(--t3)", visibility: i % step === 0 ? "visible" : "hidden" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Gauge({ value, max, label, color = "var(--brand)", size = 170 }: { value: number; max: number; label: string; color?: string; size?: number }) {
  const r = size / 2 - 14;
  const arc = Math.PI * 1.5 * r;
  const frac = Math.min(1, value / max);
  return (
    <div className={s.gauge} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line-soft)" strokeWidth="12" strokeDasharray={`${arc} 999`} strokeLinecap="round" transform={`rotate(135 ${size / 2} ${size / 2})`} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={`${arc * frac} 999`}
          strokeLinecap="round"
          transform={`rotate(135 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dasharray .6s ease" }}
        />
      </svg>
      <div className={s.gaugeValue}>
        <b>{value}</b>
        <small>{label}</small>
      </div>
    </div>
  );
}

// ---------- overlays ----------
export function Modal({ title, body, confirm, danger, onConfirm, onClose }: { title: string; body: ReactNode; confirm: string; danger?: boolean; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className={s.scrim} role="presentation" onClick={onClose}>
      <div className={s.modal} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <h4>{title}</h4>
        <p>{body}</p>
        <div className={s.actions} style={{ justifyContent: "flex-end" }}>
          <button type="button" className={s.btn} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={cx(s.btn, danger ? s.btnDanger : s.btnPrimary)} onClick={onConfirm} autoFocus>
            {confirm}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Drawer({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <>
      <div className={s.scrim} style={{ background: "rgba(0,0,0,.35)" }} onClick={onClose} role="presentation" />
      <aside className={s.drawer} role="dialog" aria-modal="true" aria-label={title}>
        <div className={s.drawerHead}>
          <h4>{title}</h4>
          <button type="button" className={s.iconBtn} aria-label="Close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className={s.drawerBody} data-lenis-prevent>
          {children}
        </div>
      </aside>
    </>
  );
}
