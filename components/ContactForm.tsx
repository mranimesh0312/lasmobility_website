"use client";

import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, X, ChevronDown, Search } from "lucide-react";
import EmailInput from "@/components/EmailInput";

const countries = [
  { code: "AF", name: "Afghanistan",            dial: "+93" },
  { code: "AL", name: "Albania",                dial: "+355" },
  { code: "DZ", name: "Algeria",                dial: "+213" },
  { code: "AR", name: "Argentina",              dial: "+54" },
  { code: "AU", name: "Australia",              dial: "+61" },
  { code: "AT", name: "Austria",                dial: "+43" },
  { code: "BH", name: "Bahrain",                dial: "+973" },
  { code: "BD", name: "Bangladesh",             dial: "+880" },
  { code: "BE", name: "Belgium",                dial: "+32" },
  { code: "BR", name: "Brazil",                 dial: "+55" },
  { code: "CA", name: "Canada",                 dial: "+1" },
  { code: "CL", name: "Chile",                  dial: "+56" },
  { code: "CN", name: "China",                  dial: "+86" },
  { code: "CO", name: "Colombia",               dial: "+57" },
  { code: "HR", name: "Croatia",                dial: "+385" },
  { code: "CY", name: "Cyprus",                 dial: "+357" },
  { code: "CZ", name: "Czech Republic",         dial: "+420" },
  { code: "DK", name: "Denmark",                dial: "+45" },
  { code: "EG", name: "Egypt",                  dial: "+20" },
  { code: "EE", name: "Estonia",                dial: "+372" },
  { code: "ET", name: "Ethiopia",               dial: "+251" },
  { code: "FI", name: "Finland",                dial: "+358" },
  { code: "FR", name: "France",                 dial: "+33" },
  { code: "GE", name: "Georgia",                dial: "+995" },
  { code: "DE", name: "Germany",                dial: "+49" },
  { code: "GH", name: "Ghana",                  dial: "+233" },
  { code: "GR", name: "Greece",                 dial: "+30" },
  { code: "HK", name: "Hong Kong",              dial: "+852" },
  { code: "HU", name: "Hungary",                dial: "+36" },
  { code: "IN", name: "India",                  dial: "+91" },
  { code: "ID", name: "Indonesia",              dial: "+62" },
  { code: "IR", name: "Iran",                   dial: "+98" },
  { code: "IQ", name: "Iraq",                   dial: "+964" },
  { code: "IE", name: "Ireland",                dial: "+353" },
  { code: "IL", name: "Israel",                 dial: "+972" },
  { code: "IT", name: "Italy",                  dial: "+39" },
  { code: "JP", name: "Japan",                  dial: "+81" },
  { code: "JO", name: "Jordan",                 dial: "+962" },
  { code: "KZ", name: "Kazakhstan",             dial: "+7" },
  { code: "KE", name: "Kenya",                  dial: "+254" },
  { code: "KW", name: "Kuwait",                 dial: "+965" },
  { code: "LB", name: "Lebanon",                dial: "+961" },
  { code: "LY", name: "Libya",                  dial: "+218" },
  { code: "LT", name: "Lithuania",              dial: "+370" },
  { code: "LU", name: "Luxembourg",             dial: "+352" },
  { code: "MY", name: "Malaysia",               dial: "+60" },
  { code: "MV", name: "Maldives",               dial: "+960" },
  { code: "MX", name: "Mexico",                 dial: "+52" },
  { code: "MA", name: "Morocco",                dial: "+212" },
  { code: "MM", name: "Myanmar",                dial: "+95" },
  { code: "NP", name: "Nepal",                  dial: "+977" },
  { code: "NL", name: "Netherlands",            dial: "+31" },
  { code: "NZ", name: "New Zealand",            dial: "+64" },
  { code: "NG", name: "Nigeria",                dial: "+234" },
  { code: "NO", name: "Norway",                 dial: "+47" },
  { code: "OM", name: "Oman",                   dial: "+968" },
  { code: "PK", name: "Pakistan",               dial: "+92" },
  { code: "PH", name: "Philippines",            dial: "+63" },
  { code: "PL", name: "Poland",                 dial: "+48" },
  { code: "PT", name: "Portugal",               dial: "+351" },
  { code: "QA", name: "Qatar",                  dial: "+974" },
  { code: "RO", name: "Romania",                dial: "+40" },
  { code: "RU", name: "Russia",                 dial: "+7" },
  { code: "SA", name: "Saudi Arabia",           dial: "+966" },
  { code: "SG", name: "Singapore",              dial: "+65" },
  { code: "ZA", name: "South Africa",           dial: "+27" },
  { code: "KR", name: "South Korea",            dial: "+82" },
  { code: "ES", name: "Spain",                  dial: "+34" },
  { code: "LK", name: "Sri Lanka",              dial: "+94" },
  { code: "SE", name: "Sweden",                 dial: "+46" },
  { code: "CH", name: "Switzerland",            dial: "+41" },
  { code: "TW", name: "Taiwan",                 dial: "+886" },
  { code: "TZ", name: "Tanzania",               dial: "+255" },
  { code: "TH", name: "Thailand",               dial: "+66" },
  { code: "TN", name: "Tunisia",                dial: "+216" },
  { code: "TR", name: "Turkey",                 dial: "+90" },
  { code: "UG", name: "Uganda",                 dial: "+256" },
  { code: "UA", name: "Ukraine",                dial: "+380" },
  { code: "AE", name: "United Arab Emirates",   dial: "+971" },
  { code: "GB", name: "United Kingdom",         dial: "+44" },
  { code: "US", name: "United States",          dial: "+1" },
  { code: "VN", name: "Vietnam",                dial: "+84" },
  { code: "YE", name: "Yemen",                  dial: "+967" },
  { code: "ZW", name: "Zimbabwe",               dial: "+263" },
];

function flag(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)));
}

const DEFAULT_COUNTRY = countries.find((c) => c.code === "IN")!;

// ── Fleet size options ────────────────────────────────────────────────────────
const fleetSizes = [
  { value: "1",          label: "1 vehicle",          sub: "Solo operator" },
  { value: "2-5",        label: "2 – 5 vehicles",     sub: "Small fleet" },
  { value: "6-10",       label: "6 – 10 vehicles",    sub: "Growing fleet" },
  { value: "11-25",      label: "11 – 25 vehicles",   sub: "Mid-size fleet" },
  { value: "26-50",      label: "26 – 50 vehicles",   sub: "Large fleet" },
  { value: "51-100",     label: "51 – 100 vehicles",  sub: "Enterprise fleet" },
  { value: "101-250",    label: "101 – 250 vehicles",  sub: "Regional fleet" },
  { value: "251-500",    label: "251 – 500 vehicles",  sub: "National fleet" },
  { value: "501-1000",   label: "501 – 1,000 vehicles", sub: "Large enterprise" },
  { value: "1000+",      label: "1,000+ vehicles",    sub: "Mega fleet" },
];

// Inline SVG vehicle icons — one per fleet tier
function VehicleIcon({ value, size = 28 }: { value: string; size?: number }) {
  const s = size;
  const color = "currentColor";
  if (value === "1") return (
    // Motorcycle / bike
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="8"  cy="22" r="5" stroke={color} strokeWidth="2" />
      <circle cx="24" cy="22" r="5" stroke={color} strokeWidth="2" />
      <path d="M8 22 L13 14 L18 14 L22 22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 14 L22 10 L26 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M13 14 L16 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="9" r="1.5" fill={color} />
    </svg>
  );
  if (value === "2-5") return (
    // Small hatchback
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="3" y="16" width="26" height="8" rx="2" stroke={color} strokeWidth="2" />
      <path d="M6 16 L9 10 L22 10 L26 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9"  cy="24" r="3" stroke={color} strokeWidth="2" />
      <circle cx="23" cy="24" r="3" stroke={color} strokeWidth="2" />
      <path d="M10 13 L22 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  if (value === "6-10") return (
    // Sedan
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="2" y="17" width="28" height="7" rx="2" stroke={color} strokeWidth="2" />
      <path d="M5 17 L8 11 L24 11 L27 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.5"  cy="24" r="3" stroke={color} strokeWidth="2" />
      <circle cx="23.5" cy="24" r="3" stroke={color} strokeWidth="2" />
      <path d="M11 14 L21 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 14 L11 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  if (value === "11-25") return (
    // Minivan / MPV
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="2" y="15" width="28" height="9" rx="2" stroke={color} strokeWidth="2" />
      <path d="M4 15 L5 9 L20 9 L28 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8"  cy="24" r="3" stroke={color} strokeWidth="2" />
      <circle cx="24" cy="24" r="3" stroke={color} strokeWidth="2" />
      <line x1="18" y1="9" x2="18" y2="15" stroke={color} strokeWidth="1.5" />
      <path d="M6 12 L17 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  if (value === "26-50") return (
    // Pickup truck
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="14" y="13" width="16" height="11" rx="2" stroke={color} strokeWidth="2" />
      <rect x="2"  y="17" width="14" height="7"  rx="1" stroke={color} strokeWidth="2" />
      <path d="M14 13 L10 13 L10 17 L14 17" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="8"  cy="25" r="3" stroke={color} strokeWidth="2" />
      <circle cx="24" cy="25" r="3" stroke={color} strokeWidth="2" />
      <path d="M16 16 L28 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  if (value === "51-100") return (
    // Box / delivery truck
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="2"  y="10" width="20" height="14" rx="1" stroke={color} strokeWidth="2" />
      <rect x="22" y="16" width="8"  height="8"  rx="1" stroke={color} strokeWidth="2" />
      <path d="M22 16 L19 16 L19 10" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="8"  cy="25" r="3" stroke={color} strokeWidth="2" />
      <circle cx="26" cy="25" r="3" stroke={color} strokeWidth="2" />
      <path d="M5 17 L16 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  if (value === "101-250") return (
    // City bus
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="2" y="9" width="28" height="16" rx="2" stroke={color} strokeWidth="2" />
      <circle cx="8"  cy="26" r="3" stroke={color} strokeWidth="2" />
      <circle cx="24" cy="26" r="3" stroke={color} strokeWidth="2" />
      <line x1="2"  y1="17" x2="30" y2="17" stroke={color} strokeWidth="1.5" />
      <rect x="5"  y="11" width="5" height="4" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="13" y="11" width="5" height="4" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="21" y="11" width="5" height="4" rx="1" stroke={color} strokeWidth="1.5" />
    </svg>
  );
  if (value === "251-500") return (
    // Coach / long-distance bus
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="1" y="10" width="30" height="14" rx="2" stroke={color} strokeWidth="2" />
      <circle cx="7"  cy="25" r="2.5" stroke={color} strokeWidth="2" />
      <circle cx="25" cy="25" r="2.5" stroke={color} strokeWidth="2" />
      <line x1="1"  y1="18" x2="31" y2="18" stroke={color} strokeWidth="1.5" />
      <rect x="4"  y="12" width="4" height="4" rx="0.5" stroke={color} strokeWidth="1.5" />
      <rect x="10" y="12" width="4" height="4" rx="0.5" stroke={color} strokeWidth="1.5" />
      <rect x="16" y="12" width="4" height="4" rx="0.5" stroke={color} strokeWidth="1.5" />
      <rect x="22" y="12" width="4" height="4" rx="0.5" stroke={color} strokeWidth="1.5" />
      <path d="M1 21 L31 21" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
  if (value === "501-1000") return (
    // Semi / articulated truck
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="2"  y="13" width="18" height="11" rx="1" stroke={color} strokeWidth="2" />
      <rect x="20" y="16" width="10" height="8"  rx="1" stroke={color} strokeWidth="2" />
      <path d="M20 16 L20 13 L17 13" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="6"  cy="25" r="2.5" stroke={color} strokeWidth="2" />
      <circle cx="14" cy="25" r="2.5" stroke={color} strokeWidth="2" />
      <circle cx="27" cy="25" r="2.5" stroke={color} strokeWidth="2" />
      <path d="M21 19 L28 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="18" x2="20" y2="18" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
  // 1000+ — fleet grid (trucks side by side)
  return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden>
      {/* Truck 1 */}
      <rect x="1"  y="14" width="13" height="9" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="14" y="17" width="6"  height="6" rx="1" stroke={color} strokeWidth="1.5" />
      <path d="M14 17 L14 14 L12 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="4"  cy="24" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="10" cy="24" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="18" cy="24" r="2" stroke={color} strokeWidth="1.5" />
      {/* + badge */}
      <circle cx="26" cy="10" r="6" fill="var(--accent-text)" opacity="0.2" />
      <text x="26" y="14" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--accent-text)">+</text>
    </svg>
  );
}

export default function ContactForm() {
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedFleet, setSelectedFleet] = useState<typeof fleetSizes[0] | null>(null);
  const [fleetOpen, setFleetOpen] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fleetRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
  );

  useEffect(() => {
    if (dropdownOpen) searchRef.current?.focus();
  }, [dropdownOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setSearch("");
      }
      if (fleetRef.current && !fleetRef.current.contains(e.target as Node)) {
        setFleetOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle = {
    background: "var(--bg-card-hover)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  } as React.CSSProperties;

  function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.target.style.borderColor = "var(--accent)";
  }
  function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.target.style.borderColor = "var(--border)";
  }

  return (
    <>
      <form
        className="rounded-2xl p-7"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
        aria-label="Demo request form"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Full Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" required
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition" style={inputStyle}
              onFocus={focusBorder} onBlur={blurBorder} />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="mb-2 block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Company</label>
            <input id="company" name="company" type="text" placeholder="Company name" required
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition" style={inputStyle}
              onFocus={focusBorder} onBlur={blurBorder} />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Email</label>
            <EmailInput
              id="email"
              name="email"
              required
              placeholder="you@company.com"
              value={emailValue}
              onChange={setEmailValue}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              style={inputStyle}
              onFocus={focusBorder}
              onBlur={blurBorder}
            />
          </div>

          {/* Phone with country dropdown */}
          <div>
            <label className="mb-2 block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Phone</label>
            <div className="flex gap-2">
              {/* Country selector */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex h-full min-h-[46px] items-center gap-1.5 rounded-xl px-3 py-3 text-sm outline-none transition whitespace-nowrap"
                  style={{
                    background: "var(--bg-card-hover)",
                    border: `1px solid ${dropdownOpen ? "var(--accent)" : "var(--border)"}`,
                    color: "var(--text-primary)",
                    minWidth: "110px",
                  }}
                >
                  <span className="text-base leading-none">{flag(selectedCountry.code)}</span>
                  <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{selectedCountry.dial}</span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--text-muted)", transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute left-0 top-full z-50 mt-1 overflow-hidden rounded-xl shadow-2xl"
                    style={{
                      width: "260px",
                      background: "var(--bg-deep)",
                      border: "1px solid var(--border-accent)",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                    }}
                  >
                    {/* Search */}
                    <div className="p-2" style={{ borderBottom: "1px solid var(--border)" }}>
                      <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "var(--bg-card)" }}>
                        <Search className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--text-muted)" }} />
                        <input
                          ref={searchRef}
                          type="text"
                          placeholder="Search country or code…"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="flex-1 bg-transparent text-xs outline-none"
                          style={{ color: "var(--text-primary)" }}
                        />
                      </div>
                    </div>
                    {/* List */}
                    <ul className="max-h-56 overflow-y-auto py-1">
                      {filtered.length === 0 && (
                        <li className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>No results</li>
                      )}
                      {filtered.map((c) => (
                        <li key={c.code + c.dial}>
                          <button
                            type="button"
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition hover:opacity-80"
                            style={{
                              background: selectedCountry.code === c.code && selectedCountry.dial === c.dial ? "var(--accent-glow)" : "transparent",
                              color: "var(--text-primary)",
                            }}
                            onClick={() => {
                              setSelectedCountry(c);
                              setDropdownOpen(false);
                              setSearch("");
                            }}
                          >
                            <span className="text-base leading-none w-6 shrink-0">{flag(c.code)}</span>
                            <span className="flex-1 text-xs truncate" style={{ color: "var(--text-secondary)" }}>{c.name}</span>
                            <span className="text-xs font-bold shrink-0" style={{ color: "var(--accent-text)" }}>{c.dial}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Number input */}
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="00000 00000"
                className="min-w-0 flex-1 rounded-xl px-4 py-3 text-sm outline-none transition"
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
            </div>
          </div>

          {/* Fleet size dropdown */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Fleet Size</label>
            <div className="relative" ref={fleetRef}>
              <button
                type="button"
                onClick={() => setFleetOpen((v) => !v)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm outline-none transition"
                style={{
                  background: "var(--bg-card-hover)",
                  border: `1px solid ${fleetOpen ? "var(--accent)" : "var(--border)"}`,
                  color: "var(--text-primary)",
                }}
              >
                {selectedFleet ? (
                  <>
                    <span style={{ color: "var(--accent-text)" }}>
                      <VehicleIcon value={selectedFleet.value} size={24} />
                    </span>
                    <span className="flex-1 text-left font-medium">{selectedFleet.label}</span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{selectedFleet.sub}</span>
                  </>
                ) : (
                  <span className="flex-1 text-left" style={{ color: "var(--text-muted)" }}>Select fleet size…</span>
                )}
                <ChevronDown
                  className="h-4 w-4 shrink-0"
                  style={{ color: "var(--text-muted)", transform: fleetOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                />
              </button>
              {/* Hidden input to carry value on submit */}
              <input type="hidden" name="fleetSize" value={selectedFleet?.value ?? ""} />

              {fleetOpen && (
                <div
                  className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl"
                  style={{
                    background: "var(--bg-deep)",
                    border: "1px solid var(--border-accent)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                  }}
                >
                  <ul className="py-1">
                    {fleetSizes.map((fs) => (
                      <li key={fs.value}>
                        <button
                          type="button"
                          onClick={() => { setSelectedFleet(fs); setFleetOpen(false); }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:opacity-80"
                          style={{
                            background: selectedFleet?.value === fs.value ? "var(--accent-glow)" : "transparent",
                            color: "var(--text-primary)",
                          }}
                        >
                          <span style={{ color: selectedFleet?.value === fs.value ? "var(--accent-text)" : "var(--text-secondary)" }}>
                            <VehicleIcon value={fs.value} size={26} />
                          </span>
                          <span className="flex-1 text-sm font-semibold">{fs.label}</span>
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>{fs.sub}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label htmlFor="message" className="mb-2 block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Message</label>
            <textarea
              id="message" name="message" rows={5}
              placeholder="Tell us about your fleet size, operating model, and what you'd like to track."
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition resize-none"
              style={inputStyle}
              onFocus={focusBorder} onBlur={blurBorder}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold sm:w-auto"
        >
          <Send className="h-4 w-4" />
          Request Demo
        </button>
        <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
          Your data is private and secure. We&apos;ll respond within one business day.
        </p>
      </form>

      {/* Thank you modal */}
      {submitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
          onClick={() => setSubmitted(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-8 text-center"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-accent)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(14,206,206,0.12)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSubmitted(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 transition hover:opacity-70"
              style={{ background: "var(--bg-deep)", color: "var(--text-muted)" }}
            >
              <X className="h-4 w-4" />
            </button>

            {/* Icon */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(14,206,206,0.12)", border: "1px solid rgba(14,206,206,0.3)" }}>
              <CheckCircle2 className="h-8 w-8" style={{ color: "var(--accent-text)" }} />
            </div>

            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Thank you!</h2>
            <p className="mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
              Your demo request has been received. Our team will reach out within one business day to schedule a personalised walkthrough.
            </p>

            <div className="mt-6 rounded-xl p-4" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
              <p className="text-xs font-semibold" style={{ color: "var(--accent-text)" }}>
                In the meantime, explore our features or check out how LAS Mobility transforms fleet operations.
              </p>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
