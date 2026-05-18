"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DOMAINS = [
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  "hotmail.com",
  "icloud.com",
  "proton.me",
];

interface EmailInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  autoComplete?: string;
}

export default function EmailInput({
  value,
  onChange,
  placeholder,
  required,
  className,
  style,
  onFocus,
  onBlur,
  id,
  name,
  autoComplete = "email",
}: EmailInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function computeSuggestions(val: string): string[] {
    const at = val.indexOf("@");
    if (at === -1) return [];
    const local = val.slice(0, at);
    const typed = val.slice(at + 1).toLowerCase();
    if (!local) return [];
    return DOMAINS.filter((d) => d.startsWith(typed)).map((d) => `${local}@${d}`);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    onChange(v);
    setSuggestions(computeSuggestions(v));
    setActiveIdx(-1);
  }

  function pick(s: string) {
    onChange(s);
    setSuggestions([]);
    setActiveIdx(-1);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((p) => Math.min(p + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((p) => Math.max(p - 1, 0));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      pick(suggestions[activeIdx]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <input
        ref={inputRef}
        type="email"
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
        style={style}
        autoComplete={autoComplete}
        onFocus={onFocus}
        onBlur={(e) => {
          onBlur?.(e);
          setTimeout(() => setSuggestions([]), 120);
        }}
      />
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
            className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl shadow-2xl"
            style={{
              background: "var(--bg-deep)",
              border: "1px solid var(--border-accent)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            }}
            role="listbox"
            aria-label="Email suggestions"
          >
            {suggestions.map((s, i) => (
              <li key={s} role="option" aria-selected={i === activeIdx}>
                <button
                  type="button"
                  onMouseDown={() => pick(s)}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition hover:opacity-80"
                  style={{
                    background: i === activeIdx ? "var(--accent-glow)" : "transparent",
                    color: "var(--text-primary)",
                  }}
                >
                  <span style={{ color: "var(--text-muted)" }} className="text-xs">@</span>
                  <span className="flex-1 font-medium">{s.split("@")[0]}</span>
                  <span className="text-xs font-semibold" style={{ color: "var(--accent-text)" }}>
                    @{s.split("@")[1]}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
