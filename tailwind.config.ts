import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      // Site-wide content width (every section uses max-w-7xl). Wider than
      // Tailwind's 1280px so large screens are used rather than left empty.
      maxWidth: {
        "7xl": "100rem",
      },
      colors: {
        // Brand
        // Every colour resolves to a CSS custom property in app/globals.css
        // (the app's softened graphite palette), so utilities follow the theme.
        teal: {
          50:  "var(--slate-50)",
          100: "var(--slate-200)",
          200: "var(--accent-text)",
          300: "var(--accent-text)",
          400: "var(--accent-hover)",
          500: "rgb(var(--accent-rgb) / <alpha-value>)",
          600: "var(--accent-mid)",
          700: "var(--accent-strong)",
          800: "var(--accent-strong)",
          900: "var(--surface-1)",
        },
        navy: {
          50:  "var(--slate-50)",
          100: "var(--slate-200)",
          200: "var(--slate-400)",
          300: "var(--slate-500)",
          400: "var(--slate-600)",
          500: "var(--slate-700)",
          600: "rgb(var(--surface-3-rgb) / <alpha-value>)",
          700: "rgb(var(--surface-2-rgb) / <alpha-value>)",
          800: "rgb(var(--surface-1-rgb) / <alpha-value>)",
          900: "rgb(var(--surface-0-rgb) / <alpha-value>)",
          950: "rgb(var(--stage-rgb) / <alpha-value>)",
        },
        // Tailwind's stock hues re-pointed at the muted tokens, so a stray
        // utility (text-amber-400, bg-emerald-400...) cannot bring neon back.
        emerald: { 300: "var(--success-light)", 400: "var(--success)", 500: "var(--success)", 600: "var(--success)", 700: "var(--success)" },
        green: { 400: "var(--success)", 500: "var(--success)", 600: "var(--success)" },
        red: { 300: "var(--danger-light)", 400: "var(--danger-light)", 500: "var(--danger)", 600: "var(--danger)" },
        amber: {
          50: "color-mix(in srgb, var(--warning) 12%, transparent)",
          200: "var(--warning-light)",
          300: "var(--warning-light)",
          400: "var(--warning)",
          500: "var(--warning)",
          900: "color-mix(in srgb, var(--warning) 55%, black)",
        },
        cyan: { DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)", 300: "var(--accent-text)", 400: "var(--accent-hover)", 500: "var(--accent)" },
        sky: { 300: "var(--accent-text)", 400: "var(--accent-hover)" },
        slate: {
          50: "var(--slate-50)", 100: "var(--slate-200)", 200: "var(--slate-200)", 300: "var(--slate-400)",
          400: "var(--slate-400)", 500: "var(--slate-500)", 600: "var(--slate-600)", 700: "var(--slate-700)", 900: "var(--slate-900)",
        },
        // Aliases
        ink: "rgb(var(--surface-1-rgb) / <alpha-value>)",
        mint: "var(--accent-hover)",
        electric: "var(--accent-strong)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "grid-dark":
          "linear-gradient(rgb(var(--mist-rgb) / 0.035) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--mist-rgb) / 0.035) 1px, transparent 1px)",
        "grid-light":
          "linear-gradient(rgb(var(--ink-rgb) / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--ink-rgb) / 0.06) 1px, transparent 1px)",
        "hero-gradient":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgb(var(--accent-rgb) / 0.06), transparent), linear-gradient(180deg, var(--surface-0) 0%, var(--surface-1) 60%)",
        "teal-glow":
          "radial-gradient(circle, rgb(var(--accent-rgb) / 0.1) 0%, transparent 70%)",
      },
      boxShadow: {
        soft:     "0 8px 40px rgb(var(--ink-rgb) / 0.08)",
        card:     "0 24px 64px rgb(var(--black-rgb) / 0.4)",
        glow:     "0 0 40px rgb(var(--accent-rgb) / 0.125)",
        "glow-sm":"0 0 20px rgb(var(--accent-rgb) / 0.09)",
        "inner-glow": "inset 0 1px 0 rgb(var(--white-rgb) / 0.06)",
      },
      animation: {
        "fade-in":      "fadeIn 0.5s ease both",
        "slide-up":     "slideUp 0.6s ease both",
        "pulse-slow":   "pulse 3s ease-in-out infinite",
        "float":        "float 6s ease-in-out infinite",
        "float-delay":  "float 7s ease-in-out infinite 1.5s",
        "route-move":   "routeMove 10s linear infinite",
        "scan":         "scan 4s ease-in-out infinite",
        "shimmer":      "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn:    { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp:   { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        float:     { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        routeMove: { to: { strokeDashoffset: "-200" } },
        scan:      { "0%,100%": { transform: "translateY(-100%)", opacity: "0" }, "40%,60%": { opacity: "0.7" }, "50%": { transform: "translateY(100%)" } },
        shimmer:   { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
    },
  },
  plugins: [],
};

export default config;
