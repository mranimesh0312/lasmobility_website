"use client";

import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <form
      className="rounded-2xl p-7"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
      aria-label="Demo request form"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {[
          ["name",      "Full Name",   "Your name",          "text"],
          ["company",   "Company",     "Company name",       "text"],
          ["email",     "Email",       "you@company.com",    "email"],
          ["phone",     "Phone",       "+91 00000 00000",    "tel"],
          ["fleetSize", "Fleet Size",  "Number of vehicles", "text"],
        ].map(([id, label, placeholder, type]) => (
          <div key={id} className={id === "fleetSize" ? "sm:col-span-2" : ""}>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {label}
            </label>
            <input
              id={id}
              name={id}
              type={type}
              placeholder={placeholder}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              style={{
                background: "var(--bg-card-hover)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about your fleet size, operating model, and what you'd like to track."
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
            style={{
              background: "var(--bg-card-hover)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
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
  );
}
