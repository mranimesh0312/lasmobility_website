/**
 * Draws an app-style screen (LAS Mobility shell, graphite or light theme) on a
 * 1280x800 canvas for the 3D laptop. Same look as the homepage app replica;
 * all values are demo values.
 */
import { ROUTES, STATUS_META, VEHICLES, statusCounts, vehiclePosition } from "@/data/appReplicaData";

type Theme = "dark" | "light";
const W = 1280;
const H = 800;

const PAL = {
  dark: { page: "#1F2329", card: "#2B3038", card2: "#363C45", sidebar: "#191C21", line: "rgba(233,236,241,0.10)", t1: "#E9ECF1", t2: "#BAC1CC", t3: "#939BA7", brand: "#6CABAE", map: "#15191E", road: "#2c333c" },
  light: { page: "#F2F5F7", card: "#FFFFFF", card2: "#F8FAFB", sidebar: "#FFFFFF", line: "rgba(15,23,42,0.10)", t1: "#0F172A", t2: "#334155", t3: "#64748B", brand: "#0EA5A8", map: "#E8EDF1", road: "#ffffff" },
};

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function text(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, color: string, weight = 400, align: CanvasTextAlign = "left") {
  ctx.font = `${weight} ${size}px Inter, Arial, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(s, x, y);
}

const MENU = ["Dashboard", "AI Insights", "Live Tracking", "Vehicles", "Vehicle Details", "Trips", "Alerts", "Fuel", "Temperature", "Maintenance", "Reports"];
const ACTIVE: Record<string, string> = { dashboard: "Dashboard", "live-tracking": "Live Tracking", trips: "Trips", "vehicle-details": "Vehicle Details" };
const TITLES: Record<string, [string, string]> = {
  dashboard: ["Dashboard", "Fleet Operations"],
  "live-tracking": ["Live Tracking", "Vehicles"],
  trips: ["All Trips", "Trips"],
  "vehicle-details": ["DEMO-101 · Mini truck 01", "Vehicles / Vehicle Details"],
};

const logoCache = new Map<Theme, Promise<HTMLImageElement>>();

/** The brand logo for a theme (white artwork on dark, navy on light), loaded once. */
export function loadLogo(theme: Theme): Promise<HTMLImageElement> {
  let p = logoCache.get(theme);
  if (!p) {
    p = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = theme === "dark" ? "/brand/logo-dark-tight.png" : "/brand/logo-light-tight.png";
    });
    logoCache.set(theme, p);
  }
  return p;
}

function shell(ctx: CanvasRenderingContext2D, id: string, p: (typeof PAL)["dark"], logo?: HTMLImageElement) {
  ctx.fillStyle = p.page;
  ctx.fillRect(0, 0, W, H);
  // sidebar
  ctx.fillStyle = p.sidebar;
  ctx.fillRect(0, 0, 210, H);
  ctx.fillStyle = p.line;
  ctx.fillRect(210, 0, 1, H);
  if (logo) {
    const h = 32;
    const w = Math.min(176, (logo.width / logo.height) * h);
    ctx.drawImage(logo, 18, 15, w, (w / logo.width) * logo.height);
  } else {
    text(ctx, "LAS MOBILITY", 20, 37, 15, p.t1, 800);
  }
  MENU.forEach((m, i) => {
    const y = 80 + i * 40;
    if (m === ACTIVE[id]) {
      ctx.fillStyle = p.brand + "26";
      rr(ctx, 10, y, 190, 32, 7);
      ctx.fill();
      ctx.fillStyle = p.brand;
      ctx.fillRect(10, y, 3, 32);
    }
    ctx.fillStyle = p.brand;
    rr(ctx, 24, y + 10, 12, 12, 3);
    ctx.fill();
    text(ctx, m, 48, y + 21, 13, m === ACTIVE[id] ? p.t1 : p.t2, m === ACTIVE[id] ? 600 : 400);
  });
  // topbar
  ctx.fillStyle = p.card;
  ctx.fillRect(211, 0, W - 211, 56);
  ctx.fillStyle = p.line;
  ctx.fillRect(211, 56, W - 211, 1);
  ctx.fillStyle = p.page;
  rr(ctx, 520, 12, 380, 32, 8);
  ctx.fill();
  text(ctx, "Search modules...", 545, 33, 13, p.t3);
  ctx.fillStyle = p.brand;
  rr(ctx, 1060, 13, 96, 30, 15);
  ctx.fill();
  text(ctx, "Ask AI", 1108, 33, 12, "#031012", 700, "center");
  ctx.fillStyle = "#475569";
  ctx.beginPath();
  ctx.arc(1230, 28, 15, 0, Math.PI * 2);
  ctx.fill();
  // page header
  const [title, crumbs] = TITLES[id] ?? [id, "LAS Mobility"];
  ctx.fillStyle = p.brand;
  ctx.fillRect(236, 76, 3, 44);
  text(ctx, title, 250, 96, 21, p.t1, 700);
  text(ctx, `${crumbs} / ${title}`, 250, 116, 12, p.t3);
}

function card(ctx: CanvasRenderingContext2D, p: (typeof PAL)["dark"], x: number, y: number, w: number, h: number, title?: string) {
  ctx.fillStyle = p.card;
  rr(ctx, x, y, w, h, 12);
  ctx.fill();
  ctx.strokeStyle = p.line;
  ctx.lineWidth = 1;
  ctx.stroke();
  if (title) text(ctx, title, x + 16, y + 28, 14, p.t1, 700);
}

function kpis(ctx: CanvasRenderingContext2D, p: (typeof PAL)["dark"], y: number, items: [string, string, string][]) {
  const x0 = 236;
  const w = (W - x0 - 24 - (items.length - 1) * 12) / items.length;
  items.forEach(([v, l, c], i) => {
    const x = x0 + i * (w + 12);
    card(ctx, p, x, y, w, 76);
    ctx.fillStyle = c;
    rr(ctx, x, y, 4, 76, 2);
    ctx.fill();
    text(ctx, v, x + 18, y + 36, 22, p.t1, 800);
    text(ctx, l, x + 18, y + 58, 12, p.t2, 600);
  });
}

function mapArea(ctx: CanvasRenderingContext2D, p: (typeof PAL)["dark"], x: number, y: number, w: number, h: number, selected?: number) {
  ctx.save();
  rr(ctx, x, y, w, h, 12);
  ctx.clip();
  ctx.fillStyle = p.map;
  ctx.fillRect(x, y, w, h);
  // synthetic street grid
  ctx.strokeStyle = p.road;
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 26; i++) {
    ctx.beginPath();
    ctx.moveTo(x + ((i * 97) % w), y);
    ctx.lineTo(x + ((i * 61 + 140) % w), y + h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y + ((i * 53) % h));
    ctx.lineTo(x + w, y + ((i * 37 + 90) % h));
    ctx.stroke();
  }
  const all = ROUTES.flat();
  const lng = all.map((c) => c[0]);
  const lat = all.map((c) => c[1]);
  const [minX, maxX, minY, maxY] = [Math.min(...lng), Math.max(...lng), Math.min(...lat), Math.max(...lat)];
  const px = (c: [number, number]) => [x + 30 + ((c[0] - minX) / (maxX - minX)) * (w - 60), y + 30 + (1 - (c[1] - minY) / (maxY - minY)) * (h - 60)];
  ctx.lineWidth = 4;
  ROUTES.forEach((r) => {
    ctx.strokeStyle = p.road === "#ffffff" ? "#c7d2dc" : "#3a434e";
    ctx.beginPath();
    r.forEach((c, i) => {
      const [a, b] = px(c);
      if (i) ctx.lineTo(a, b);
      else ctx.moveTo(a, b);
    });
    ctx.stroke();
  });
  VEHICLES.forEach((v) => {
    const pos = vehiclePosition(v, 40).p;
    const [a, b] = px(pos);
    const sel = v.id === selected;
    ctx.fillStyle = STATUS_META[v.status].color;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(a, b, sel ? 13 : 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (sel) {
      ctx.fillStyle = "rgba(15,18,22,0.9)";
      rr(ctx, a - 36, b - 38, 72, 20, 5);
      ctx.fill();
      text(ctx, v.plate, a, b - 24, 11, "#fff", 700, "center");
    }
  });
  ctx.restore();
}

export function drawAppScreen(canvas: HTMLCanvasElement, id: string, theme: Theme, logo?: HTMLImageElement) {
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const p = PAL[theme];
  shell(ctx, id, p, logo);
  const counts = statusCounts();

  if (id === "dashboard") {
    kpis(ctx, p, 140, [
      ["24", "Total Vehicles", p.brand],
      ["15", "Active Vehicles", "#10B981"],
      ["19,225 km", "Total Distance", "#3B82F6"],
      ["2,240 L", "Fuel Consumed", "#8B5CF6"],
      ["10", "Active Alerts", "#EF4444"],
    ]);
    card(ctx, p, 236, 232, 640, 290, "Live fleet map");
    mapArea(ctx, p, 252, 256, 608, 252);
    card(ctx, p, 888, 232, 368, 290, "Fleet Status");
    let a0 = -Math.PI / 2;
    (Object.keys(counts) as (keyof typeof counts)[]).forEach((k) => {
      const a1 = a0 + (counts[k] / VEHICLES.length) * Math.PI * 2;
      ctx.strokeStyle = STATUS_META[k].color;
      ctx.lineWidth = 22;
      ctx.beginPath();
      ctx.arc(990, 390, 70, a0 + 0.03, a1 - 0.03);
      ctx.stroke();
      a0 = a1;
    });
    text(ctx, "24", 990, 396, 30, p.t1, 800, "center");
    text(ctx, "Vehicles", 990, 416, 12, p.t3, 400, "center");
    (Object.keys(counts) as (keyof typeof counts)[]).forEach((k, i) => {
      ctx.fillStyle = STATUS_META[k].color;
      ctx.beginPath();
      ctx.arc(1092, 340 + i * 30, 5, 0, Math.PI * 2);
      ctx.fill();
      text(ctx, STATUS_META[k].label, 1104, 345 + i * 30, 13, p.t2);
      text(ctx, String(counts[k]), 1236, 345 + i * 30, 13, p.t1, 700, "right");
    });
    card(ctx, p, 236, 534, 1020, 246, "Distance & fuel · 7 days");
    const vals = [2950, 3180, 2860, 3320, 3060, 1840, 1720];
    ctx.beginPath();
    vals.forEach((v, i) => {
      const x = 270 + i * 160;
      const y = 760 - (v / 3500) * 170;
      if (i) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    });
    ctx.strokeStyle = "#18C7CC";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.lineTo(270 + 6 * 160, 760);
    ctx.lineTo(270, 760);
    ctx.fillStyle = "rgba(24,199,204,0.15)";
    ctx.fill();
  } else if (id === "live-tracking") {
    card(ctx, p, 236, 140, 300, 640);
    text(ctx, `All ${VEHICLES.length}   Running ${counts.running}   Idle ${counts.idle}`, 252, 172, 12, p.t2, 600);
    VEHICLES.slice(0, 11).forEach((v, i) => {
      const y = 196 + i * 52;
      if (i === 0) {
        ctx.fillStyle = p.brand + "26";
        rr(ctx, 244, y - 6, 284, 46, 8);
        ctx.fill();
      }
      ctx.fillStyle = STATUS_META[v.status].color;
      ctx.beginPath();
      ctx.arc(262, y + 16, 5, 0, Math.PI * 2);
      ctx.fill();
      text(ctx, v.plate, 278, y + 13, 13, p.t1, 700);
      text(ctx, `${v.area} · ${v.driver}`, 278, y + 31, 11, p.t3);
      text(ctx, `${v.speed} km/h`, 516, y + 20, 12, p.t1, 700, "right");
    });
    mapArea(ctx, p, 548, 140, 708, 640, 1);
    card(ctx, p, 900, 620, 340, 144, "DEMO-101");
    text(ctx, "Mini truck 01 · Running", 916, 674, 12, p.t3);
    [["Speed", "46 km/h"], ["Ignition", "On"], ["Today", "33.6 km"]].forEach(([l, v], i) => {
      text(ctx, l.toUpperCase(), 916 + i * 108, 708, 10, p.t3, 600);
      text(ctx, v, 916 + i * 108, 732, 15, p.t1, 700);
    });
  } else if (id === "trips") {
    card(ctx, p, 236, 140, 640, 300);
    mapArea(ctx, p, 236, 140, 640, 300);
    card(ctx, p, 888, 140, 368, 300, "Trip #4100");
    [["Distance", "18.4 km"], ["Duration", "52 min"], ["Max speed", "71 km/h"], ["Stops", "3"]].forEach(([l, v], i) => {
      const x = 904 + (i % 2) * 170;
      const y = 190 + Math.floor(i / 2) * 80;
      ctx.fillStyle = p.page;
      rr(ctx, x, y, 158, 64, 10);
      ctx.fill();
      text(ctx, l.toUpperCase(), x + 12, y + 24, 10, p.t3, 600);
      text(ctx, v, x + 12, y + 48, 17, p.t1, 700);
    });
    card(ctx, p, 236, 452, 1020, 328);
    ctx.fillStyle = p.card2;
    ctx.fillRect(237, 453, 1018, 40);
    ["TRIP", "VEHICLE", "DRIVER", "START – END", "DISTANCE", "MAX SPEED"].forEach((h, i) => text(ctx, h, 256 + i * 168, 478, 11, p.t3, 700));
    VEHICLES.slice(0, 6).forEach((v, r) => {
      const y = 520 + r * 42;
      [`#${4100 + r}`, v.plate, v.driver, `0${6 + r}:20 – 0${7 + r}:05`, `${(12 + r * 3.4).toFixed(1)} km`, `${58 + r * 4} km/h`].forEach((c, i) => text(ctx, c, 256 + i * 168, y, 13, i === 1 ? p.t1 : p.t2, i === 1 ? 700 : 400));
    });
  } else {
    card(ctx, p, 236, 140, 640, 640);
    mapArea(ctx, p, 236, 140, 640, 640, 1);
    card(ctx, p, 888, 140, 368, 330, "Live status");
    ctx.strokeStyle = p.line;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(980, 290, 70, Math.PI * 0.75, Math.PI * 2.25);
    ctx.stroke();
    ctx.strokeStyle = p.brand;
    ctx.beginPath();
    ctx.arc(980, 290, 70, Math.PI * 0.75, Math.PI * (0.75 + 1.5 * 0.44));
    ctx.stroke();
    text(ctx, "53", 980, 300, 34, p.t1, 800, "center");
    text(ctx, "km/h", 980, 322, 12, p.t3, 400, "center");
    [["Ignition", "On"], ["Satellites", "15"], ["Voltage", "13.2 V"], ["Fuel", "46%"]].forEach(([l, v], i) => {
      text(ctx, l.toUpperCase(), 1080, 230 + i * 50, 10, p.t3, 600);
      text(ctx, v, 1080, 250 + i * 50, 15, p.t1, 700);
    });
    card(ctx, p, 888, 482, 368, 298, "Engine command");
    text(ctx, "Requires confirmation · role-protected", 904, 536, 12, p.t3);
    ctx.fillStyle = "#EF4444";
    rr(ctx, 904, 700, 336, 44, 10);
    ctx.fill();
    text(ctx, "Immobilize", 1072, 728, 15, "#fff", 700, "center");
  }
}
