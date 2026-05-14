"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, ChevronDown, Search, Send, CheckCircle2, Loader2,
  Calendar, Clock, Building2, Users, Truck,
} from "lucide-react";
import ThemeLogo from "@/components/ThemeLogo";
import { useBookDemo } from "@/context/BookDemoContext";
import { useToast }     from "@/context/ToastContext";

/* ─── Country data ─────────────────────────────────────────────── */
const COUNTRIES = [
  { code:"IN",dial:"+91",  name:"India" },
  { code:"US",dial:"+1",   name:"United States" },
  { code:"GB",dial:"+44",  name:"United Kingdom" },
  { code:"AE",dial:"+971", name:"United Arab Emirates" },
  { code:"SA",dial:"+966", name:"Saudi Arabia" },
  { code:"AU",dial:"+61",  name:"Australia" },
  { code:"SG",dial:"+65",  name:"Singapore" },
  { code:"MY",dial:"+60",  name:"Malaysia" },
  { code:"DE",dial:"+49",  name:"Germany" },
  { code:"FR",dial:"+33",  name:"France" },
  { code:"CA",dial:"+1",   name:"Canada" },
  { code:"BR",dial:"+55",  name:"Brazil" },
  { code:"ZA",dial:"+27",  name:"South Africa" },
  { code:"NG",dial:"+234", name:"Nigeria" },
  { code:"KE",dial:"+254", name:"Kenya" },
  { code:"PK",dial:"+92",  name:"Pakistan" },
  { code:"BD",dial:"+880", name:"Bangladesh" },
  { code:"LK",dial:"+94",  name:"Sri Lanka" },
  { code:"NP",dial:"+977", name:"Nepal" },
  { code:"PH",dial:"+63",  name:"Philippines" },
  { code:"ID",dial:"+62",  name:"Indonesia" },
  { code:"TH",dial:"+66",  name:"Thailand" },
  { code:"VN",dial:"+84",  name:"Vietnam" },
  { code:"JP",dial:"+81",  name:"Japan" },
  { code:"KR",dial:"+82",  name:"South Korea" },
  { code:"CN",dial:"+86",  name:"China" },
  { code:"QA",dial:"+974", name:"Qatar" },
  { code:"KW",dial:"+965", name:"Kuwait" },
  { code:"BH",dial:"+973", name:"Bahrain" },
  { code:"OM",dial:"+968", name:"Oman" },
].sort((a, b) => a.name.localeCompare(b.name));

function flagEmoji(code: string) {
  return code.toUpperCase().replace(/./g, c =>
    String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0))
  );
}

/* ─── Fleet size data ───────────────────────────────────────────── */
const FLEET_SIZES = [
  { value:"1",       label:"1 vehicle",           sub:"Solo operator" },
  { value:"2-5",     label:"2 – 5 vehicles",      sub:"Small fleet" },
  { value:"6-10",    label:"6 – 10 vehicles",      sub:"Growing fleet" },
  { value:"11-25",   label:"11 – 25 vehicles",     sub:"Mid-size fleet" },
  { value:"26-50",   label:"26 – 50 vehicles",     sub:"Large fleet" },
  { value:"51-100",  label:"51 – 100 vehicles",    sub:"Enterprise fleet" },
  { value:"101-250", label:"101 – 250 vehicles",   sub:"Regional fleet" },
  { value:"251-500", label:"251 – 500 vehicles",   sub:"National fleet" },
  { value:"501-1000",label:"501 – 1,000 vehicles", sub:"Large enterprise" },
  { value:"1000+",   label:"1,000+ vehicles",      sub:"Mega fleet" },
];

const BUSINESS_TYPES = [
  "Logistics & Delivery",
  "School Transport",
  "Employee Transport",
  "Enterprise Fleet",
  "Delivery Operations",
  "Field Operations",
  "Construction & Assets",
  "Government Fleet",
  "Other",
];

/* ─── Form state ────────────────────────────────────────────────── */
interface FormState {
  fullName: string;
  companyName: string;
  email: string;
  countryDial: string;
  countryName: string;
  phone: string;
  fleetSize: string;
  businessType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  website: string; // honeypot
}

const EMPTY: FormState = {
  fullName:"", companyName:"", email:"",
  countryDial:"+91", countryName:"India", phone:"",
  fleetSize:"", businessType:"",
  preferredDate:"", preferredTime:"",
  message:"", website:"",
};

/* ─── Validation ────────────────────────────────────────────────── */
function validate(f: FormState): Partial<Record<keyof FormState, string>> {
  const e: Partial<Record<keyof FormState, string>> = {};
  if (!f.fullName.trim() || f.fullName.trim().length < 2)
    e.fullName = "Full name must be at least 2 characters.";
  if (!f.companyName.trim())
    e.companyName = "Company name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Please enter a valid email address.";
  if (!f.phone.trim() || f.phone.replace(/\D/g,"").length < 6)
    e.phone = "Please enter a valid phone number.";
  if (!f.fleetSize)
    e.fleetSize = "Please select your fleet size.";
  if (!f.businessType)
    e.businessType = "Please select your business type.";
  if (f.preferredDate) {
    const d = new Date(f.preferredDate);
    if (d < new Date(new Date().toDateString()))
      e.preferredDate = "Please select a future date.";
  }
  return e;
}

/* ─── Minimum selectable date (today) ──────────────────────────── */
function todayStr() {
  return new Date().toISOString().split("T")[0];
}

/* ─── Main component ────────────────────────────────────────────── */
export default function BookDemoModal() {
  const { isOpen, close, source } = useBookDemo();
  const { addToast } = useToast();

  const [form, setForm]       = useState<FormState>(EMPTY);
  const [errors, setErrors]   = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Country picker state
  const [countryOpen,   setCountryOpen]   = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryRef  = useRef<HTMLDivElement>(null);
  const searchRef   = useRef<HTMLInputElement>(null);

  // Fleet picker state
  const [fleetOpen, setFleetOpen] = useState(false);
  const fleetRef = useRef<HTMLDivElement>(null);

  // Business type state
  const [btOpen, setBtOpen] = useState(false);
  const btRef = useRef<HTMLDivElement>(null);

  const selectedCountry = COUNTRIES.find(c => c.dial === form.countryDial) ?? COUNTRIES.find(c => c.code === "IN")!;
  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.dial.includes(countrySearch)
  );

  // Focus search when country dropdown opens
  useEffect(() => { if (countryOpen) searchRef.current?.focus(); }, [countryOpen]);

  // Close all dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false); setCountrySearch("");
      }
      if (fleetRef.current && !fleetRef.current.contains(e.target as Node)) setFleetOpen(false);
      if (btRef.current && !btRef.current.contains(e.target as Node)) setBtOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) { if (e.key === "Escape") close(); }
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // Reset on open
  useEffect(() => {
    if (isOpen) { setForm(EMPTY); setErrors({}); setSuccess(false); setLoading(false); }
  }, [isOpen]);

  const set = useCallback((k: keyof FormState, v: string) => {
    setForm(prev => ({ ...prev, [k]: v }));
    setErrors(prev => { const n = { ...prev }; delete n[k]; return n; });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sourceUrl: source }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed.");
      setSuccess(true);
      addToast("Demo request sent! We'll be in touch within one business day.", "success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      addToast(msg, "error");
    } finally {
      setLoading(false);
    }
  }

  /* ── Input style helpers ── */
  const inp = (k: keyof FormState) => ({
    className: "w-full rounded-xl px-4 py-3 text-sm outline-none transition",
    style: {
      background: "var(--bg-card-hover)",
      border: `1px solid ${errors[k] ? "#EF4444" : "var(--border)"}`,
      color: "var(--text-primary)",
    } as React.CSSProperties,
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!errors[k]) e.target.style.borderColor = "var(--accent)";
    },
    onBlur:  (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!errors[k]) e.target.style.borderColor = "var(--border)";
    },
  });

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={close}
          />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
            style={{ border: "1px solid var(--border-accent)", maxHeight: "95dvh" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex h-full max-h-[95dvh] flex-col lg:flex-row">

              {/* ── Left info panel ── */}
              <div
                className="relative hidden flex-col justify-between overflow-hidden p-8 lg:flex lg:w-[42%]"
                style={{ background: "linear-gradient(160deg, #060E1A 0%, #0B1628 60%, #0D1F38 100%)" }}
              >
                {/* Grid overlay */}
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
                {/* Glow */}
                <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14,206,206,0.12), transparent)" }} />

                <div className="relative">
                  <ThemeLogo width={160} height={36} className="h-9 w-auto" forceDark />
                  <h2 className="mt-7 text-2xl font-bold leading-snug text-white">
                    See LAS Mobility in action — built for your fleet.
                  </h2>
                  <p className="mt-3 text-sm leading-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                    A 30-minute personalised demo with a fleet intelligence specialist, at no cost or commitment.
                  </p>

                  {/* What to expect */}
                  <div className="mt-7 space-y-3">
                    {[
                      "Live walkthrough of features relevant to your fleet",
                      "Answers to your specific operational questions",
                      "Pricing and onboarding guidance",
                      "No sales pressure — ever",
                    ].map(item => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#0ECECE" }} />
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {[
                      { icon: Truck,      value: "1,000+", label: "Vehicles tracked" },
                      { icon: Building2,  value: "50+",    label: "Countries" },
                      { icon: Users,      value: "200+",   label: "Fleet teams" },
                      { icon: CheckCircle2, value:"99.9%", label: "Uptime SLA" },
                    ].map(({ icon: Icon, value, label }) => (
                      <div key={label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <Icon className="h-4 w-4 mb-1.5" style={{ color: "#0ECECE" }} />
                        <p className="text-base font-bold text-white">{value}</p>
                        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust logos */}
                <div className="relative mt-6 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Trusted by fleet teams at</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                    {["FastTrack","CityExpress","SunTrans","BuildCorp","MetroGuard"].map(n => (
                      <span key={n} className="text-xs font-bold tracking-wide" style={{ color: "rgba(255,255,255,0.25)" }}>{n}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Right form panel ── */}
              <div
                className="flex flex-1 flex-col overflow-y-auto"
                style={{ background: "var(--bg-base)" }}
              >
                {/* Form header */}
                <div className="flex shrink-0 items-center justify-between border-b px-6 py-4" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
                  <div>
                    <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Book a Free Demo</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Fill in the details — we'll handle the rest</p>
                  </div>
                  <button onClick={close} className="rounded-lg p-1.5 transition hover:opacity-60" style={{ background: "var(--bg-deep)", color: "var(--text-muted)" }} aria-label="Close">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Success state */}
                {success ? (
                  <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 py-12 text-center">
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full" style={{ background: "rgba(14,206,206,0.12)", border: "1px solid rgba(14,206,206,0.3)" }}>
                      <CheckCircle2 className="h-10 w-10" style={{ color: "var(--accent-text)" }} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Request received!</h3>
                      <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                        Thanks, <strong>{form.fullName.split(" ")[0]}</strong>! We&apos;ve sent a confirmation to <strong>{form.email}</strong>. Our team will reach out within one business day to confirm your demo.
                      </p>
                    </div>
                    <div className="w-full rounded-xl p-4" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
                      <p className="text-xs font-semibold" style={{ color: "var(--accent-text)" }}>
                        Check your inbox — a confirmation email with next steps is on its way.
                      </p>
                    </div>
                    <button onClick={close} className="btn-primary mt-2 rounded-xl px-8 py-3 text-sm">Done</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex-1 space-y-4 overflow-y-auto px-6 py-5" noValidate>
                    {/* Honeypot */}
                    <input name="website" tabIndex={-1} aria-hidden className="absolute opacity-0 pointer-events-none" autoComplete="off"
                      value={form.website} onChange={e => set("website", e.target.value)} />

                    {/* Row 1: Name + Company */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Full Name <span style={{ color: "#EF4444" }}>*</span></label>
                        <input {...inp("fullName")} type="text" placeholder="Your full name" value={form.fullName} onChange={e => set("fullName", e.target.value)} />
                        {errors.fullName && <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Company Name <span style={{ color: "#EF4444" }}>*</span></label>
                        <input {...inp("companyName")} type="text" placeholder="Your company" value={form.companyName} onChange={e => set("companyName", e.target.value)} />
                        {errors.companyName && <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>{errors.companyName}</p>}
                      </div>
                    </div>

                    {/* Row 2: Email + Phone */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Email Address <span style={{ color: "#EF4444" }}>*</span></label>
                        <input {...inp("email")} type="email" placeholder="you@company.com" value={form.email} onChange={e => set("email", e.target.value)} />
                        {errors.email && <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>{errors.email}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Phone Number <span style={{ color: "#EF4444" }}>*</span></label>
                        <div className="flex gap-2">
                          {/* Country picker */}
                          <div className="relative shrink-0" ref={countryRef}>
                            <button type="button" onClick={() => setCountryOpen(v => !v)}
                              className="flex h-full min-h-[46px] items-center gap-1.5 rounded-xl px-3 text-sm outline-none transition"
                              style={{ background:"var(--bg-card-hover)", border:`1px solid ${countryOpen ? "var(--accent)" : "var(--border)"}`, color:"var(--text-primary)", minWidth:"90px" }}>
                              <span className="text-base leading-none">{flagEmoji(selectedCountry.code)}</span>
                              <span className="text-xs font-semibold" style={{ color:"var(--text-secondary)" }}>{selectedCountry.dial}</span>
                              <ChevronDown className="h-3 w-3 shrink-0" style={{ color:"var(--text-muted)", transform: countryOpen ? "rotate(180deg)" : "none", transition:"transform 0.2s" }} />
                            </button>
                            {countryOpen && (
                              <div className="absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-xl shadow-2xl" style={{ background:"var(--bg-deep)", border:"1px solid var(--border-accent)" }}>
                                <div className="p-2" style={{ borderBottom:"1px solid var(--border)" }}>
                                  <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background:"var(--bg-card)" }}>
                                    <Search className="h-3.5 w-3.5 shrink-0" style={{ color:"var(--text-muted)" }} />
                                    <input ref={searchRef} type="text" placeholder="Search country or code…" value={countrySearch}
                                      onChange={e => setCountrySearch(e.target.value)}
                                      className="flex-1 bg-transparent text-xs outline-none" style={{ color:"var(--text-primary)" }} />
                                  </div>
                                </div>
                                <ul className="max-h-48 overflow-y-auto py-1">
                                  {filteredCountries.map(c => (
                                    <li key={c.code + c.dial}>
                                      <button type="button" onClick={() => { set("countryDial", c.dial); set("countryName", c.name); setCountryOpen(false); setCountrySearch(""); }}
                                        className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition hover:opacity-80"
                                        style={{ background: c.dial === form.countryDial && c.code === selectedCountry.code ? "var(--accent-glow)" : "transparent", color:"var(--text-primary)" }}>
                                        <span className="text-base w-5 shrink-0">{flagEmoji(c.code)}</span>
                                        <span className="flex-1 text-xs truncate" style={{ color:"var(--text-secondary)" }}>{c.name}</span>
                                        <span className="text-xs font-bold shrink-0" style={{ color:"var(--accent-text)" }}>{c.dial}</span>
                                      </button>
                                    </li>
                                  ))}
                                  {filteredCountries.length === 0 && <li className="px-4 py-3 text-xs" style={{ color:"var(--text-muted)" }}>No results</li>}
                                </ul>
                              </div>
                            )}
                          </div>
                          <input {...inp("phone")} type="tel" placeholder="00000 00000" value={form.phone}
                            onChange={e => set("phone", e.target.value)} className="min-w-0 flex-1 rounded-xl px-4 py-3 text-sm outline-none transition" />
                        </div>
                        {errors.phone && <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Row 3: Fleet size */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Fleet Size <span style={{ color: "#EF4444" }}>*</span></label>
                      <div className="relative" ref={fleetRef}>
                        <button type="button" onClick={() => setFleetOpen(v => !v)}
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm outline-none transition"
                          style={{ background:"var(--bg-card-hover)", border:`1px solid ${errors.fleetSize ? "#EF4444" : fleetOpen ? "var(--accent)" : "var(--border)"}`, color:"var(--text-primary)" }}>
                          {form.fleetSize ? (
                            <>
                              <span className="flex-1 text-left font-medium">{FLEET_SIZES.find(f => f.value === form.fleetSize)?.label}</span>
                              <span className="text-xs" style={{ color:"var(--text-muted)" }}>{FLEET_SIZES.find(f => f.value === form.fleetSize)?.sub}</span>
                            </>
                          ) : (
                            <span className="flex-1 text-left" style={{ color:"var(--text-muted)" }}>Select fleet size…</span>
                          )}
                          <ChevronDown className="h-4 w-4 shrink-0" style={{ color:"var(--text-muted)", transform: fleetOpen ? "rotate(180deg)" : "none", transition:"transform 0.2s" }} />
                        </button>
                        {fleetOpen && (
                          <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl" style={{ background:"var(--bg-deep)", border:"1px solid var(--border-accent)", boxShadow:"0 16px 48px rgba(0,0,0,0.5)" }}>
                            <ul className="max-h-52 overflow-y-auto py-1">
                              {FLEET_SIZES.map(fs => (
                                <li key={fs.value}>
                                  <button type="button" onClick={() => { set("fleetSize", fs.value); setFleetOpen(false); }}
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:opacity-80"
                                    style={{ background: form.fleetSize === fs.value ? "var(--accent-glow)" : "transparent", color:"var(--text-primary)" }}>
                                    <span className="flex-1 text-sm font-semibold">{fs.label}</span>
                                    <span className="text-xs" style={{ color:"var(--text-muted)" }}>{fs.sub}</span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      {errors.fleetSize && <p className="mt-1 text-xs" style={{ color:"#EF4444" }}>{errors.fleetSize}</p>}
                    </div>

                    {/* Row 4: Business type */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Business Type <span style={{ color: "#EF4444" }}>*</span></label>
                      <div className="relative" ref={btRef}>
                        <button type="button" onClick={() => setBtOpen(v => !v)}
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm outline-none transition"
                          style={{ background:"var(--bg-card-hover)", border:`1px solid ${errors.businessType ? "#EF4444" : btOpen ? "var(--accent)" : "var(--border)"}`, color:"var(--text-primary)" }}>
                          <span className="flex-1 text-left" style={{ color: form.businessType ? "var(--text-primary)" : "var(--text-muted)" }}>
                            {form.businessType || "Select your business type…"}
                          </span>
                          <ChevronDown className="h-4 w-4 shrink-0" style={{ color:"var(--text-muted)", transform: btOpen ? "rotate(180deg)" : "none", transition:"transform 0.2s" }} />
                        </button>
                        {btOpen && (
                          <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl" style={{ background:"var(--bg-deep)", border:"1px solid var(--border-accent)", boxShadow:"0 16px 48px rgba(0,0,0,0.5)" }}>
                            <ul className="py-1">
                              {BUSINESS_TYPES.map(bt => (
                                <li key={bt}>
                                  <button type="button" onClick={() => { set("businessType", bt); setBtOpen(false); }}
                                    className="flex w-full items-center px-4 py-2.5 text-left text-sm transition hover:opacity-80"
                                    style={{ background: form.businessType === bt ? "var(--accent-glow)" : "transparent", color:"var(--text-primary)" }}>
                                    {bt}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      {errors.businessType && <p className="mt-1 text-xs" style={{ color:"#EF4444" }}>{errors.businessType}</p>}
                    </div>

                    {/* Row 5: Date + Time */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                          <Calendar className="h-3.5 w-3.5" style={{ color:"var(--accent-text)" }} />
                          Preferred Date
                        </label>
                        <input
                          type="date" min={todayStr()}
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
                          style={{ background:"var(--bg-card-hover)", border:`1px solid ${errors.preferredDate ? "#EF4444" : "var(--border)"}`, color:"var(--text-primary)", colorScheme:"dark" }}
                          value={form.preferredDate} onChange={e => set("preferredDate", e.target.value)}
                          onFocus={e => e.target.style.borderColor = "var(--accent)"}
                          onBlur={e => e.target.style.borderColor = errors.preferredDate ? "#EF4444" : "var(--border)"}
                        />
                        {errors.preferredDate && <p className="mt-1 text-xs" style={{ color:"#EF4444" }}>{errors.preferredDate}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                          <Clock className="h-3.5 w-3.5" style={{ color:"var(--accent-text)" }} />
                          Preferred Time
                        </label>
                        <input
                          type="time"
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
                          style={{ background:"var(--bg-card-hover)", border:"1px solid var(--border)", color:"var(--text-primary)", colorScheme:"dark" }}
                          value={form.preferredTime} onChange={e => set("preferredTime", e.target.value)}
                          onFocus={e => e.target.style.borderColor = "var(--accent)"}
                          onBlur={e => e.target.style.borderColor = "var(--border)"}
                        />
                      </div>
                    </div>

                    {/* Row 6: Message */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                        Message / Requirements
                      </label>
                      <textarea
                        rows={3} placeholder="Tell us about your fleet, key challenges, or anything you'd like us to cover in the demo…"
                        className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition"
                        style={{ background:"var(--bg-card-hover)", border:"1px solid var(--border)", color:"var(--text-primary)" }}
                        value={form.message} onChange={e => set("message", e.target.value)}
                        onFocus={e => e.target.style.borderColor = "var(--accent)"}
                        onBlur={e => e.target.style.borderColor = "var(--border)"}
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                      <button type="submit" disabled={loading}
                        className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition">
                        {loading
                          ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                          : <><Send className="h-4 w-4" /> Book My Free Demo</>}
                      </button>
                      <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
                        🔒 Your data is private and secure. We&apos;ll respond within one business day.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Render into a portal so it floats above everything
  if (typeof window === "undefined") return null;
  return createPortal(modal, document.body);
}
