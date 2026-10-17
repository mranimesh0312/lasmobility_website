"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Map as MapLibreMap, Marker, GeoJSONSource, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Crosshair, Pause, Play, RotateCcw } from "lucide-react";
import routesJson from "@/data/demoRoutes.json";
import { DEMO_STOPS, DEMO_VEHICLES, STOP_SECONDS, simulatedSpeed, type DemoVehicle } from "@/data/demoData";
import { useTheme } from "@/context/ThemeContext";
import styles from "./Demos.module.scss";

type LngLat = [number, number];
interface RouteData { distanceM: number; durationS: number; coordinates: LngLat[] }
const ROUTES = routesJson as unknown as Record<DemoVehicle["id"], RouteData>;

const STYLE_URL = { dark: "https://tiles.openfreemap.org/styles/dark", light: "https://tiles.openfreemap.org/styles/positron" };
/** Used when the tile style cannot load: the routes still draw on a plain ground. */
const FALLBACK_STYLE: StyleSpecification = {
  version: 8,
  sources: {},
  layers: [{ id: "bg", type: "background", paint: { "background-color": "#0B1B2D" } }],
};
const SIM_RATE = 14; // simulated seconds per real second
const VEHICLE_IDS = DEMO_VEHICLES.map((v) => v.id);

const R = 6371000;
const toRad = (d: number) => (d * Math.PI) / 180;
function haversine(a: LngLat, b: LngLat) {
  const dLat = toRad(b[1] - a[1]);
  const dLng = toRad(b[0] - a[0]);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[1])) * Math.cos(toRad(b[1])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
function bearing(a: LngLat, b: LngLat) {
  const y = Math.sin(toRad(b[0] - a[0])) * Math.cos(toRad(b[1]));
  const x = Math.cos(toRad(a[1])) * Math.sin(toRad(b[1])) - Math.sin(toRad(a[1])) * Math.cos(toRad(b[1])) * Math.cos(toRad(b[0] - a[0]));
  return (Math.atan2(y, x) * 180) / Math.PI;
}

interface Track { coords: LngLat[]; cum: number[]; total: number }
function buildTrack(coords: LngLat[]): Track {
  const cum = [0];
  for (let i = 1; i < coords.length; i++) cum.push(cum[i - 1] + haversine(coords[i - 1], coords[i]));
  return { coords, cum, total: cum[cum.length - 1] };
}
function pointAt(track: Track, d: number): { p: LngLat; heading: number; index: number } {
  const dist = Math.min(track.total, Math.max(0, d));
  let i = 1;
  while (i < track.cum.length - 1 && track.cum[i] < dist) i++;
  const a = track.coords[i - 1];
  const b = track.coords[i];
  const seg = track.cum[i] - track.cum[i - 1] || 1;
  const t = (dist - track.cum[i - 1]) / seg;
  return { p: [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t], heading: bearing(a, b), index: i };
}

function circlePolygon(center: LngLat, radiusM: number, steps = 64): LngLat[] {
  const out: LngLat[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const dx = (radiusM * Math.cos(a)) / (R * Math.cos(toRad(center[1])));
    const dy = (radiusM * Math.sin(a)) / R;
    out.push([center[0] + (dx * 180) / Math.PI, center[1] + (dy * 180) / Math.PI]);
  }
  return out;
}

/** Where each vehicle starts. Geofence mode starts just before the zone (52% of route 1) so the first crossing comes within seconds. */
const startDistance = (mode: "tracking" | "geofence", i: number, total: number) =>
  mode === "geofence" ? total * (i === 0 ? 0.455 : 0.2 + i * 0.25) : i * 1800;

interface SimState { /** metres actually driven this session (for average speed) */ travelled: number; d: number; dwell: number; stopsDone: number; stopsCount: number; elapsed: number; inside: boolean }
export interface GeofenceAlert { id: number; time: string; plate: string; kind: "entered" | "exited"; zone: string }

const fmtClock = (s: number) => {
  const base = 9 * 3600 + 15 * 60 + s;
  return `${String(Math.floor(base / 3600) % 24).padStart(2, "0")}:${String(Math.floor((base % 3600) / 60)).padStart(2, "0")}`;
};

/**
 * Simulated live tracking on a real map. mode="tracking": select a vehicle,
 * play / pause / restart its journey, read speed, status and trip metrics.
 * mode="geofence": drag the zone (click the map) and resize it; entering or
 * leaving raises an alert.
 */
export default function FleetMapDemo({ mode }: { mode: "tracking" | "geofence" }) {
  const { theme } = useTheme();
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<MapLibreMap | null>(null);
  // isStyleLoaded() can be false inside style.load while tiles load; track readiness explicitly.
  const styleReady = useRef(false);
  const styleTheme = useRef(theme);
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const markers = useRef<Map<string, Marker>>(new Map());
  const raf = useRef<number | null>(null);
  const lastT = useRef<number | null>(null);
  const tracks = useMemo(() => Object.fromEntries(DEMO_VEHICLES.map((v) => [v.id, buildTrack(ROUTES[v.id].coordinates)])) as Record<DemoVehicle["id"], Track>, []);
  const sim = useRef<Record<string, SimState>>(
    Object.fromEntries(
      DEMO_VEHICLES.map((v, i) => [v.id, { travelled: 0, d: startDistance(mode, i, tracks[v.id].total), dwell: 0, stopsDone: 0, stopsCount: 0, elapsed: 0, inside: false }])
    )
  );

  const [selected, setSelected] = useState<DemoVehicle["id"]>("ka-demo-01");
  const [playing, setPlaying] = useState(false);
  const [follow, setFollow] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const [zone, setZone] = useState(() => {
    const t = buildTrack(ROUTES["ka-demo-01"].coordinates);
    return { center: pointAt(t, t.total * 0.52).p, radius: 900, name: "Warehouse zone" };
  });
  const [alerts, setAlerts] = useState<GeofenceAlert[]>([]);
  const alertId = useRef(0);
  const zoneRef = useRef(zone);
  zoneRef.current = zone;
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const followRef = useRef(follow);
  followRef.current = follow;

  const vehicleIds = VEHICLE_IDS;
  const insideZone = (id: DemoVehicle["id"], d: number) => haversine(pointAt(tracks[id], d).p, zoneRef.current.center) <= zoneRef.current.radius;
  // Starting state counts as known: no alert for a vehicle that begins inside the zone.
  const initialised = useRef(false);
  if (!initialised.current) {
    initialised.current = true;
    for (const id of VEHICLE_IDS) {
      const st = sim.current[id];
      st.inside = insideZone(id, st.d);
      st.stopsDone = DEMO_STOPS.filter((f) => f * tracks[id].total < st.d).length;
    }
  }
  const playingRef = useRef(playing);
  playingRef.current = playing;

  const syncLayers = useCallback(() => {
    const m = map.current;
    if (!m || !styleReady.current) return;
    for (const v of DEMO_VEHICLES) {
      const srcId = `route-${v.id}`;
      const sel = v.id === selectedRef.current;
      if (!m.getSource(srcId)) {
        m.addSource(srcId, { type: "geojson", data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: tracks[v.id].coords } } });
        m.addLayer({ id: srcId, type: "line", source: srcId, layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": v.color, "line-width": 3, "line-opacity": 0.35 } });
        m.addSource(`${srcId}-done`, { type: "geojson", data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [] } } });
        m.addLayer({ id: `${srcId}-done`, type: "line", source: `${srcId}-done`, layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": v.color, "line-width": 5 } });
      }
      m.setPaintProperty(srcId, "line-opacity", sel ? 0.5 : 0.22);
      m.setPaintProperty(`${srcId}-done`, "line-opacity", sel ? 1 : 0.55);
    }
    if (mode === "geofence") {
      const poly = { type: "Feature" as const, properties: {}, geometry: { type: "Polygon" as const, coordinates: [circlePolygon(zoneRef.current.center, zoneRef.current.radius)] } };
      const src = m.getSource("zone") as GeoJSONSource | undefined;
      if (src) src.setData(poly);
      else {
        m.addSource("zone", { type: "geojson", data: poly });
        m.addLayer({ id: "zone-fill", type: "fill", source: "zone", paint: { "fill-color": "#18C7CC", "fill-opacity": 0.12 } });
        m.addLayer({ id: "zone-line", type: "line", source: "zone", paint: { "line-color": "#18C7CC", "line-width": 2, "line-dasharray": [2, 1.5] } });
      }
    }
  }, [mode, tracks]);

  const drawVehicles = useCallback(() => {
    const m = map.current;
    if (!m) return;
    for (const id of vehicleIds) {
      const s = sim.current[id];
      const { p, heading, index } = pointAt(tracks[id], s.d);
      const mk = markers.current.get(id);
      mk?.setLngLat(p).setRotation(heading);
      const done = m.getSource(`route-${id}-done`) as GeoJSONSource | undefined;
      done?.setData({ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [...tracks[id].coords.slice(0, index), p] } });
      if (id === selectedRef.current && followRef.current && playingRef.current) m.easeTo({ center: p, duration: 300, essential: false });
    }
  }, [tracks, vehicleIds]);

  // Create the map once.
  useEffect(() => {
    let disposed = false;
    const markerMap = markers.current;
    let instance: MapLibreMap | null = null;
    (async () => {
      try {
        const maplibre = (await import("maplibre-gl")).default;
        if (disposed || !container.current) return;
        const all = Object.values(tracks).flatMap((t) => t.coords);
        const lngs = all.map((c) => c[0]);
        const lats = all.map((c) => c[1]);
        instance = new maplibre.Map({
          container: container.current,
          style: STYLE_URL[themeRef.current],
          bounds: [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
          fitBoundsOptions: { padding: 40 },
          attributionControl: { compact: true },
          cooperativeGestures: true,
        });
        map.current = instance;
        instance.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-right");
        let loaded = false;
        let usingFallback = false;
        instance.on("error", (e) => {
          if (!loaded) {
            loaded = true;
            setMapError("Map tiles could not load; showing routes on a plain background.");
            styleReady.current = false;
            usingFallback = true;
            instance?.setStyle(FALLBACK_STYLE);
          }
          console.warn("[map demo]", e.error?.message ?? e);
        });
        styleTheme.current = themeRef.current;
        instance.on("style.load", () => {
          loaded = true;
          // The site theme may have resolved while this style was loading.
          if (instance && !usingFallback && styleTheme.current !== themeRef.current) {
            styleTheme.current = themeRef.current;
            instance.setStyle(STYLE_URL[themeRef.current]);
            return;
          }
          styleReady.current = true;
          // Compact attribution starts expanded and covers the map on phones.
          container.current?.querySelector(".maplibregl-ctrl-attrib")?.classList.remove("maplibregl-compact-show");
          syncLayers();
          drawVehicles();
        });
        for (const v of DEMO_VEHICLES) {
          // MapLibre positions this element with `transform`; the teardrop rotation
          // lives on a child so it never composes with that translate.
          const el = document.createElement("div");
          el.className = styles.markerHost;
          el.style.setProperty("--marker", v.color);
          const pin = document.createElement("span");
          pin.className = styles.marker;
          el.appendChild(pin);
          el.setAttribute("aria-hidden", "true");
          const mk = new maplibre.Marker({ element: el, rotationAlignment: "map" }).setLngLat(tracks[v.id].coords[0]).addTo(instance);
          el.addEventListener("click", () => setSelected(v.id));
          markerMap.set(v.id, mk);
        }
        if (mode === "geofence") {
          instance.on("click", (e) => {
            setZone((z) => ({ ...z, center: [e.lngLat.lng, e.lngLat.lat] }));
          });
        }
      } catch (err) {
        setMapError("Interactive map is not available in this browser.");
        console.warn("[map demo]", err);
      }
    })();
    return () => {
      disposed = true;
      if (raf.current) cancelAnimationFrame(raf.current);
      markerMap.forEach((m) => m.remove());
      markerMap.clear();
      instance?.remove();
      map.current = null;
    };
    // map is created once; theme changes swap the style below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Theme switch: swap the basemap; layers are re-added on style.load.
  useEffect(() => {
    const m = map.current;
    if (m && !mapError && styleReady.current && styleTheme.current !== theme) {
      styleReady.current = false;
      styleTheme.current = theme;
      m.setStyle(STYLE_URL[theme]);
    }
  }, [theme, mapError]);

  useEffect(() => {
    syncLayers();
    drawVehicles();
  }, [selected, zone, syncLayers, drawVehicles]);

  // Simulation loop, only while playing.
  useEffect(() => {
    if (!playing) {
      lastT.current = null;
      return;
    }
    const step = (now: number) => {
      const dt = lastT.current === null ? 0 : Math.min(0.1, (now - lastT.current) / 1000) * SIM_RATE;
      lastT.current = now;
      for (const id of vehicleIds) {
        const s = sim.current[id];
        const track = tracks[id];
        s.elapsed += dt;
        if (s.dwell > 0) s.dwell = Math.max(0, s.dwell - dt);
        else {
          const step = (simulatedSpeed(s.d) / 3.6) * dt;
          s.d += step;
          s.travelled += step;
          const nextStop = DEMO_STOPS[s.stopsDone];
          if (nextStop !== undefined && s.d >= track.total * nextStop) {
            s.dwell = STOP_SECONDS * SIM_RATE;
            s.stopsDone++;
            s.stopsCount++;
          }
          if (s.d >= track.total) {
            s.d = 0; // loop the demo journey
            s.stopsDone = 0;
          }
        }
        if (mode === "geofence") {
          const inside = haversine(pointAt(track, s.d).p, zoneRef.current.center) <= zoneRef.current.radius;
          if (inside !== s.inside) {
            s.inside = inside;
            const v = DEMO_VEHICLES.find((x) => x.id === id)!;
            const alert: GeofenceAlert = { id: ++alertId.current, time: fmtClock(s.elapsed), plate: v.plate, kind: inside ? "entered" : "exited", zone: zoneRef.current.name };
            setAlerts((a) => [alert, ...a].slice(0, 6));
          }
        }
      }
      drawVehicles();
      setTick((t) => (t + 1) % 1e6);
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [playing, vehicleIds, tracks, mode, drawVehicles]);

  const restart = () => {
    vehicleIds.forEach((id, i) => {
      const d = startDistance(mode, i, tracks[id].total);
      Object.assign(sim.current[id], { travelled: 0, d, dwell: 0, stopsDone: DEMO_STOPS.filter((f) => f * tracks[id].total < d).length, stopsCount: 0, elapsed: 0, inside: insideZone(id, d) });
    });
    setAlerts([]);
    drawVehicles();
    setTick((t) => t + 1);
  };

  const v = DEMO_VEHICLES.find((x) => x.id === selected)!;
  const s = sim.current[selected];
  const track = tracks[selected];
  const speed = s.dwell > 0 || !playing ? 0 : Math.round(simulatedSpeed(s.d));
  const status = !playing ? (s.d > 0 ? "Stopped" : "Parked") : s.dwell > 0 ? "Idle" : "Moving";
  const covered = s.d / 1000;
  const avg = s.elapsed > 0 ? (s.travelled / s.elapsed) * 3.6 : 0;
  const remainingMin = Math.max(0, Math.round(((track.total - s.d) / 1000 / 36) * 60));
  void tick;

  return (
    <div className={styles.mapDemo}>
      <div className={styles.mapWrap}>
        <div ref={container} className={styles.map} aria-label="Map showing simulated vehicle routes in Bengaluru" role="region" />
        {mapError && <p className={styles.mapError}>{mapError}</p>}
        <span className={styles.simBadge}>Simulated data</span>
      </div>

      <div className={styles.mapPanel}>
        <div className={styles.vehicleList} role="radiogroup" aria-label="Vehicles">
          {DEMO_VEHICLES.map((x) => (
            <button
              key={x.id}
              type="button"
              role="radio"
              aria-checked={x.id === selected}
              className={`${styles.vehicleBtn} ${x.id === selected ? styles.vehicleBtnActive : ""}`}
              onClick={() => setSelected(x.id)}
            >
              <span className={styles.swatchDot} style={{ background: x.color }} />
              <span>
                <strong>{x.plate}</strong>
                <small>{x.name}</small>
              </span>
            </button>
          ))}
        </div>

        <div className={styles.controlsRow}>
          <button type="button" className={styles.primaryBtn} onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
            {playing ? <Pause size={16} /> : <Play size={16} />} {playing ? "Pause" : "Play journey"}
          </button>
          <button type="button" className={styles.ghostBtn} onClick={restart}>
            <RotateCcw size={16} /> Restart
          </button>
          {mode === "tracking" && (
            <button type="button" className={styles.ghostBtn} aria-pressed={follow} onClick={() => setFollow((f) => !f)}>
              <Crosshair size={16} /> Follow
            </button>
          )}
        </div>

        <dl className={styles.metrics} aria-live="polite">
          <div><dt>Status</dt><dd><span className={`${styles.status} ${styles[`status${status}`]}`}>{status}</span></dd></div>
          <div><dt>Speed</dt><dd>{speed} km/h</dd></div>
          <div><dt>Ignition</dt><dd>{playing ? "On" : "Off"}</dd></div>
          <div><dt>Distance</dt><dd>{covered.toFixed(1)} / {(track.total / 1000).toFixed(1)} km</dd></div>
          <div><dt>Avg speed</dt><dd>{avg.toFixed(0)} km/h</dd></div>
          <div><dt>Stops</dt><dd>{s.stopsCount}</dd></div>
        </dl>

        {mode === "tracking" ? (
          <div className={styles.detailCard}>
            <h4>{v.name}</h4>
            <p>{v.driver} · ETA {remainingMin} min · last update {playing ? "just now" : "paused"}</p>
          </div>
        ) : (
          <div className={styles.geofenceTools}>
            <label className={styles.rangeLabel}>
              Zone radius <strong>{(zone.radius / 1000).toFixed(1)} km</strong>
              <input type="range" min={300} max={2500} step={100} value={zone.radius} onChange={(e) => setZone((z) => ({ ...z, radius: Number(e.target.value) }))} />
            </label>
            <p className={styles.hintText}>Click the map to move the zone, then play.</p>
            <ul className={styles.alertFeed} aria-live="polite" aria-label="Geofence alerts">
              {alerts.length === 0 && <li className={styles.alertEmpty}>No geofence events yet.</li>}
              {alerts.map((a) => (
                <li key={a.id} className={a.kind === "entered" ? styles.alertIn : styles.alertOut}>
                  <span>{a.time}</span> <strong>{a.plate}</strong> {a.kind} {a.zone}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
