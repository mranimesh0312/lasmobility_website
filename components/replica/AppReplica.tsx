"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bell, BrainCircuit, Car, CheckCircle2, ChevronsUpDown, FileText, Fuel, Gauge, KeyRound, LayoutDashboard, Lock, MapPin, Menu, Moon, Receipt,
  Route, Search, Send, Sparkles, Sun, Thermometer, Truck, User, Wrench,
} from "lucide-react";
import MotionReveal from "@/components/animations/MotionReveal";
import { useTheme } from "@/context/ThemeContext";
import { AI_PROMPTS, ALERTS, SEVERITY_META, ago } from "@/data/appReplicaData";
import { ReplicaContext, type ReplicaApi, type ScreenId } from "./context";
import { Drawer, cx } from "./ui";
import ScreenSwitch from "./ScreenSwitch";
import s from "./Replica.module.scss";

interface NavItem {
  id: ScreenId;
  label: string;
  icon: LucideIcon;
  path: string;
  badge?: number;
}

/** Menu order and names follow the app's sidebar (rbac_modules + SIDEBAR i18n keys). */
const FLEET_NAV: { group?: string; items: NavItem[] }[] = [
  {
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "dashboard" },
      { id: "ai", label: "AI Insights", icon: BrainCircuit, path: "ai-intelligence/insights" },
    ],
  },
  {
    group: "Vehicles",
    items: [
      { id: "live", label: "Live Tracking", icon: MapPin, path: "vehicles/live-tracking" },
      { id: "vehicles", label: "Vehicles", icon: Car, path: "vehicles" },
      { id: "vehicle", label: "Vehicle Details", icon: Gauge, path: "vehicles/1/details" },
      { id: "trips", label: "Trips", icon: Route, path: "trips/all" },
      { id: "geofence", label: "Geofence", icon: MapPin, path: "geofence" },
    ],
  },
  {
    group: "Operations",
    items: [
      { id: "alerts", label: "Alerts", icon: Bell, path: "alerts", badge: 2 },
      { id: "fuel", label: "Fuel", icon: Fuel, path: "fuel" },
      { id: "temperature", label: "Temperature", icon: Thermometer, path: "temperature-management" },
      { id: "maintenance", label: "Maintenance", icon: Wrench, path: "maintenance/reminders" },
      { id: "drivers", label: "Drivers", icon: User, path: "drivers/scorecard" },
      { id: "expenses", label: "Expenses", icon: Receipt, path: "expenses" },
      { id: "documents", label: "Document Management", icon: FileText, path: "documents" },
      { id: "reports", label: "Reports", icon: FileText, path: "reports" },
    ],
  },
];
const RENTAL_NAV: { group?: string; items: NavItem[] }[] = [
  { items: [{ id: "rental", label: "Rental Overview", icon: KeyRound, path: "rental" }] },
];
const ALL_ITEMS = [...FLEET_NAV, ...RENTAL_NAV].flatMap((g) => g.items);

const QUICK: { id: ScreenId; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "live", label: "Live tracking" },
  { id: "vehicle", label: "Engine control" },
  { id: "alerts", label: "Alerts" },
  { id: "ai", label: "AI insights" },
  { id: "rental", label: "Rental Hub" },
];


/**
 * "Drive the app": an interactive recreation of the LAS Mobility web app with
 * simulated data. Every screen is built here; no product screenshots or
 * customer data are used.
 */
export default function AppReplica() {
  const { theme: siteTheme } = useTheme();
  const [themeOverride, setThemeOverride] = useState<"dark" | "light" | null>(null);
  const theme = themeOverride ?? (siteTheme === "light" ? "light" : "dark");
  const [screen, setScreen] = useState<ScreenId>("dashboard");
  const [vehicleId, setVehicleId] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [product, setProduct] = useState<"fleet" | "rental">("fleet");
  const [productOpen, setProductOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [hit, setHit] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // The simulation clock runs only while the app is on screen and the tab is visible.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    const id = window.setInterval(() => {
      if (visible && !document.hidden) setSeconds((x) => x + 1);
    }, 1000);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, []);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg((m) => (m === msg ? null : m)), 2600);
  }, []);

  const go = useCallback((next: ScreenId, vid?: number) => {
    if (vid) setVehicleId(vid);
    setScreen(next);
    setProduct(next === "rental" ? "rental" : "fleet");
    setBellOpen(false);
    setProductOpen(false);
    contentRef.current?.scrollTo({ top: 0 });
  }, []);

  const api: ReplicaApi = useMemo(
    () => ({ screen, vehicleId, go, seconds, theme, toast, openAi: () => setAiOpen(true) }),
    [screen, vehicleId, go, seconds, theme, toast]
  );

  // "/" focuses module search while the pointer or focus is inside the app.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = root.current;
      if (e.key !== "/" || !el) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select")) return;
      if (!el.matches(":hover") && !el.contains(document.activeElement)) return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hits = query.trim() ? ALL_ITEMS.filter((i) => i.label.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6) : [];
  const nav = product === "fleet" ? FLEET_NAV : RENTAL_NAV;
  const current = ALL_ITEMS.find((i) => i.id === screen);
  const path = screen === "vehicle" ? `vehicles/${vehicleId}/details` : current?.path ?? "dashboard";

  return (
    <section id="platform" className={s.section} aria-labelledby="platform-title">
      <div className={s.container}>
        <MotionReveal className={s.header}>
          <div className={s.headerCopy}>
            <p className={s.eyebrow}>Inside the platform</p>
            <h2 id="platform-title" className={s.title}>
              Drive the LAS Mobility app, right here.
            </h2>
            <p className={s.lede}>
              Click through the same screens your team uses: the dashboard, live map, vehicle control, trips, alerts, fuel, cold chain, reports and AI insights.
            </p>
          </div>
          <div className={s.quickJump} role="group" aria-label="Jump to a screen">
            {QUICK.map((q) => (
              <button key={q.id} type="button" className={s.quickBtn} aria-pressed={screen === q.id} onClick={() => go(q.id)}>
                {q.label}
              </button>
            ))}
          </div>
        </MotionReveal>

        <div className={s.frame} data-theme={theme}>
          <div className={s.chrome} aria-hidden="true">
            <div className={s.dots}>
              <span />
              <span />
              <span />
            </div>
            <div className={s.url}>
              <Lock size={11} /> <b>app.lasmobility.com</b>/{path}
            </div>
          </div>

          <ReplicaContext.Provider value={api}>
            <div ref={root} className={s.app} data-theme={theme}>
              <aside className={cx(s.sidebar, collapsed && s.sidebarCollapsed)} aria-label="App navigation">
                <div className={s.brandRow}>
                  {collapsed ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/brand/icon.png" alt="LAS Mobility" width={30} height={30} className={s.brandIcon} />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={theme === "dark" ? "/brand/logo-dark-tight.png" : "/brand/logo-light-tight.png"} alt="LAS Mobility" width={160} height={31} className={s.brandLogo} />
                  )}
                </div>
                <nav className={s.nav} data-lenis-prevent>
                  {nav.map((g, gi) => (
                    <div key={g.group ?? gi}>
                      {g.group && !collapsed && <p className={s.navGroupLabel}>{g.group}</p>}
                      {g.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            className={cx(s.navItem, screen === item.id && s.navActive)}
                            aria-current={screen === item.id ? "page" : undefined}
                            title={collapsed ? item.label : undefined}
                            onClick={() => go(item.id)}
                          >
                            <Icon size={17} />
                            {!collapsed && <span>{item.label}</span>}
                            {!collapsed && item.badge && <span className={s.navBadge}>{item.badge}</span>}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </nav>
                <div className={s.sidebarFoot}>
                  <button type="button" className={s.navItem} onClick={() => setAiOpen(true)} title={collapsed ? "Ask AI" : undefined}>
                    <Sparkles size={17} />
                    {!collapsed && <span>Ask AI</span>}
                  </button>
                </div>
              </aside>

              <div className={s.main}>
                <div className={s.topbar}>
                  <button type="button" className={s.iconBtn} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={() => setCollapsed((c) => !c)}>
                    <Menu size={17} />
                  </button>
                  <button type="button" className={s.product} aria-haspopup="menu" aria-expanded={productOpen} onClick={() => setProductOpen((o) => !o)}>
                    <span className={s.productIcon}>{product === "fleet" ? <Truck size={15} /> : <KeyRound size={15} />}</span>
                    <span>
                      <strong>{product === "fleet" ? "Fleet Operations" : "Rental Hub"}</strong>
                      <small>{product === "fleet" ? "Telematics & tracking" : "Bookings & rental fleet"}</small>
                    </span>
                    <ChevronsUpDown size={14} />
                  </button>
                  <div className={s.search}>
                    <Search size={14} className={s.searchIcon} />
                    <input
                      ref={searchRef}
                      className={s.searchInput}
                      placeholder="Search modules..."
                      aria-label="Search modules"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setHit(0);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") setHit((h) => Math.min(hits.length - 1, h + 1));
                        if (e.key === "ArrowUp") setHit((h) => Math.max(0, h - 1));
                        if (e.key === "Enter" && hits[hit]) {
                          go(hits[hit].id);
                          setQuery("");
                          e.currentTarget.blur();
                        }
                        if (e.key === "Escape") setQuery("");
                      }}
                    />
                    <span className={s.kbd}>/</span>
                    {hits.length > 0 && (
                      <div className={s.searchResults} role="listbox">
                        {hits.map((h, i) => {
                          const Icon = h.icon;
                          return (
                            <button
                              key={h.id}
                              type="button"
                              role="option"
                              aria-selected={i === hit}
                              data-active={i === hit}
                              className={s.searchHit}
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                go(h.id);
                                setQuery("");
                              }}
                            >
                              <Icon size={15} /> {h.label} <small>/{h.path}</small>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <button type="button" className={s.askAi} onClick={() => setAiOpen(true)}>
                    <Sparkles size={14} /> Ask AI
                  </button>
                  <button type="button" className={s.iconBtn} aria-label={theme === "dark" ? "Switch app to light theme" : "Switch app to dark theme"} onClick={() => setThemeOverride(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </button>
                  <button type="button" className={s.iconBtn} aria-label="Notifications" aria-expanded={bellOpen} onClick={() => setBellOpen((o) => !o)}>
                    <Bell size={17} />
                    <span className={s.dotBadge}>9+</span>
                  </button>
                  <span className={s.avatar} aria-hidden="true">
                    FM
                  </span>

                  {productOpen && (
                    <div className={s.popover} role="menu" style={{ left: 60, right: "auto", width: 280 }}>
                      {(["fleet", "rental"] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          role="menuitem"
                          className={s.searchHit}
                          onClick={() => {
                            go(p === "fleet" ? "dashboard" : "rental");
                          }}
                        >
                          <span className={s.productIcon}>{p === "fleet" ? <Truck size={15} /> : <KeyRound size={15} />}</span>
                          <span>
                            <b>{p === "fleet" ? "Fleet Operations" : "Rental Hub"}</b>
                            <br />
                            <small style={{ marginLeft: 0 }}>{p === "fleet" ? "Telematics & tracking" : "Bookings & rental fleet"}</small>
                          </span>
                          {product === p && <CheckCircle2 size={15} style={{ marginLeft: "auto", color: "var(--brand)" }} />}
                        </button>
                      ))}
                    </div>
                  )}
                  {bellOpen && (
                    <div className={s.popover} role="dialog" aria-label="Recent notifications" data-lenis-prevent>
                      <div className={s.popoverTitle}>
                        Recent notifications
                        <button type="button" className={s.cardAction} onClick={() => go("alerts")}>
                          View all
                        </button>
                      </div>
                      <ul className={s.list}>
                        {ALERTS.slice(0, 6).map((a) => (
                          <li key={a.id}>
                            <button type="button" className={cx(s.listRow, s.listRowBtn)} onClick={() => go("vehicle", Number(a.vehicle.slice(-3)) - 100)}>
                              <span className={s.dot} style={{ "--tag": SEVERITY_META[a.severity].color } as CSSProperties} />
                              <span className={s.listMain}>
                                <strong>
                                  {a.type} · {a.vehicle}
                                </strong>
                                <small>{a.message}</small>
                              </span>
                              <small className={s.muted}>{ago(a.minutesAgo)}</small>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <nav className={s.mobileNav} aria-label="App screens">
                  {ALL_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button key={item.id} type="button" className={s.mobileChip} aria-current={screen === item.id ? "page" : undefined} onClick={() => go(item.id)}>
                        <Icon size={13} /> {item.label}
                      </button>
                    );
                  })}
                </nav>

                <div ref={contentRef} className={s.content} data-lenis-prevent>
                  <ScreenSwitch id={screen} />
                </div>
              </div>

              {aiOpen && <AiDrawer onClose={() => setAiOpen(false)} />}
              {toastMsg && (
                <div className={s.toast} role="status">
                  <CheckCircle2 size={16} color="var(--success)" /> {toastMsg}
                </div>
              )}
            </div>
          </ReplicaContext.Provider>
        </div>
      </div>
    </section>
  );
}

function AiDrawer({ onClose }: { onClose: () => void }) {
  const [chat, setChat] = useState<{ me: boolean; text: string }[]>([
    { me: false, text: "Hi, I'm the LAS Mobility assistant. Ask me about your fleet, or try one of these:" },
  ]);
  const [typing, setTyping] = useState(false);
  const ask = (q: string) => {
    const known = AI_PROMPTS.find((p) => p.q === q);
    setChat((c) => [...c, { me: true, text: q }]);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setChat((c) => [...c, { me: false, text: known?.a ?? "In the full product I answer from your live fleet data. In this demo, try one of the suggested questions." }]);
    }, 900);
  };
  return (
    <Drawer title="Ask AI" onClose={onClose}>
      <div className={s.chat}>
        {chat.map((m, i) => (
          <div key={i} className={cx(s.bubble, m.me && s.bubbleMe)}>
            {m.text}
          </div>
        ))}
        {typing && <div className={s.bubble}>…</div>}
      </div>
      <div style={{ display: "grid", gap: 6, marginTop: 14 }}>
        {AI_PROMPTS.map((p) => (
          <button key={p.q} type="button" className={s.btn} style={{ justifyContent: "flex-start", height: "auto", padding: "8px 10px", whiteSpace: "normal", textAlign: "left" }} onClick={() => ask(p.q)}>
            <Sparkles size={13} /> {p.q}
          </button>
        ))}
      </div>
      <form
        style={{ display: "flex", gap: 6, marginTop: 14 }}
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem("q") as HTMLInputElement;
          if (input.value.trim()) ask(input.value.trim());
          input.value = "";
        }}
      >
        <input name="q" className={s.searchInput} style={{ paddingLeft: 10 }} placeholder="Ask about your fleet" aria-label="Ask about your fleet" />
        <button type="submit" className={cx(s.btn, s.btnPrimary)} aria-label="Send">
          <Send size={14} />
        </button>
      </form>
    </Drawer>
  );
}
