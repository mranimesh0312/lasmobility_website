"use client";

import { useEffect, useRef } from "react";
import type { GeoJSONSource, Map as MapLibreMap, Marker, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { STATUS_META, type LiveStatus, type LngLat } from "@/data/appReplicaData";
import s from "./Replica.module.scss";
import { PALETTE } from "@/lib/palette";

const STYLE_URL = { dark: "https://tiles.openfreemap.org/styles/dark", light: "https://tiles.openfreemap.org/styles/positron" };
const FALLBACK: StyleSpecification = { version: 8, sources: {}, layers: [{ id: "bg", type: "background", paint: { "background-color": "#1b2027" } }] };

export interface MapPoint {
  id: number;
  label: string;
  status: LiveStatus;
  p: LngLat;
  heading: number;
}

const ARROW = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2 20 21 12 16.5 4 21z"/></svg>`;

/**
 * MapLibre map with one HTML marker per vehicle. Markers are created once per
 * id and then only moved, so a 1 s simulation tick costs no React work here.
 */
export default function ReplicaMap({
  points,
  selected,
  onSelect,
  route,
  theme,
  follow = false,
  center = [77.6, 12.97],
  zoom = 11.2,
}: {
  points: MapPoint[];
  selected?: number | null;
  onSelect?: (id: number) => void;
  route?: LngLat[] | null;
  theme: "dark" | "light";
  follow?: boolean;
  center?: LngLat;
  zoom?: number;
}) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<MapLibreMap | null>(null);
  const markers = useRef(new Map<number, { m: Marker; el: HTMLDivElement }>());
  const ready = useRef(false);
  const latest = useRef({ points, selected, route, onSelect });
  latest.current = { points, selected, route, onSelect };
  const mod = useRef<typeof import("maplibre-gl") | null>(null);

  const sync = () => {
    const m = map.current;
    const lib = mod.current;
    if (!m || !lib) return;
    const { points: pts, selected: sel } = latest.current;
    const seen = new Set<number>();
    for (const pt of pts) {
      seen.add(pt.id);
      let entry = markers.current.get(pt.id);
      if (!entry) {
        const el = document.createElement("div");
        el.className = s.marker;
        el.innerHTML = `<span class="${s.markerLabel}"></span><span class="${s.markerBody}">${ARROW}<i></i></span>`;
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          latest.current.onSelect?.(pt.id);
        });
        entry = { el, m: new lib.Marker({ element: el, anchor: "center" }).setLngLat(pt.p).addTo(m) };
        markers.current.set(pt.id, entry);
      }
      entry.m.setLngLat(pt.p);
      entry.el.style.setProperty("--m", STATUS_META[pt.status].color);
      entry.el.classList.toggle(s.markerSelected, pt.id === sel);
      entry.el.classList.toggle(s.markerParked, pt.status !== "running");
      entry.el.style.zIndex = pt.id === sel ? "5" : "1";
      const label = entry.el.firstElementChild as HTMLElement;
      label.textContent = pt.label;
      label.style.display = pt.id === sel ? "block" : "none";
      const arrow = entry.el.querySelector("svg") as SVGElement | null;
      if (arrow) arrow.style.transform = `rotate(${pt.status === "running" ? pt.heading : 0}deg)`;
      entry.el.setAttribute("aria-label", `${pt.label}, ${STATUS_META[pt.status].label}`);
    }
    markers.current.forEach((entry, id) => {
      if (!seen.has(id)) {
        entry.m.remove();
        markers.current.delete(id);
      }
    });
    if (ready.current) {
      const src = m.getSource("route") as GeoJSONSource | undefined;
      const coords = latest.current.route ?? [];
      src?.setData({ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: coords } });
    }
  };

  useEffect(() => {
    let cancelled = false;
    let instance: MapLibreMap | null = null;
    import("maplibre-gl").then((lib) => {
      if (cancelled || !box.current) return;
      mod.current = lib;
      try {
        instance = new lib.Map({
          container: box.current,
          style: STYLE_URL[theme],
          center,
          zoom,
          attributionControl: { compact: true },
          cooperativeGestures: true,
        });
      } catch {
        return; // no WebGL: the box keeps its plain background
      }
      map.current = instance;
      instance.addControl(new lib.NavigationControl({ showCompass: false }), "top-right");
      instance.on("error", () => {
        if (!instance!.isStyleLoaded()) instance!.setStyle(FALLBACK);
      });
      instance.on("load", () => {
        ready.current = true;
        instance!.addSource("route", { type: "geojson", data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [] } } });
        instance!.addLayer({ id: "route-casing", type: "line", source: "route", paint: { "line-color": "#000", "line-width": 7, "line-opacity": 0.25 }, layout: { "line-cap": "round", "line-join": "round" } });
        instance!.addLayer({ id: "route", type: "line", source: "route", paint: { "line-color": PALETTE.accent, "line-width": 4 }, layout: { "line-cap": "round", "line-join": "round" } });
        sync();
      });
      sync();
    });
    return () => {
      cancelled = true;
      ready.current = false;
      markers.current.forEach((e) => e.m.remove());
      markers.current.clear();
      instance?.remove();
      map.current = null;
    };
    // The map is rebuilt only when the theme changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(sync);

  // Fly to a newly selected vehicle; follow keeps it centred on every tick.
  const lastSel = useRef<number | null | undefined>(undefined);
  useEffect(() => {
    const m = map.current;
    const pt = points.find((p) => p.id === selected);
    if (!m || !pt) return;
    if (lastSel.current !== selected) {
      m.flyTo({ center: pt.p, zoom: Math.max(m.getZoom(), 13.5), duration: 900 });
      lastSel.current = selected;
    } else if (follow) {
      m.easeTo({ center: pt.p, duration: 900 });
    }
  }, [points, selected, follow]);

  // Fit a newly shown route.
  useEffect(() => {
    const m = map.current;
    const lib = mod.current;
    if (!m || !lib || !route?.length) return;
    const b = new lib.LngLatBounds(route[0], route[0]);
    route.forEach((c) => b.extend(c));
    m.fitBounds(b, { padding: 50, duration: 800 });
  }, [route]);

  // No data-lenis-prevent: with cooperative gestures the wheel keeps scrolling
  // the page, and Ctrl/⌘ + wheel zooms the map.
  return <div ref={box} className={s.map} />;
}
