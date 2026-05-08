import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        teal: {
          50:  "#F0FEFE",
          100: "#CCFAFA",
          200: "#99F5F5",
          300: "#5DECEC",
          400: "#22D9D9",
          500: "#0ECECE",
          600: "#0AABAB",
          700: "#088888",
          800: "#066565",
          900: "#044444",
        },
        navy: {
          50:  "#EEF4FF",
          100: "#D8E8FF",
          200: "#B4CCEE",
          300: "#7499C4",
          400: "#4A6D9A",
          500: "#2A4770",
          600: "#1E3050",
          700: "#162035",
          800: "#0B1628",
          900: "#060E1A",
          950: "#030810",
        },
        // Aliases
        ink: "#0B1628",
        cyan: "#0ECECE",
        mint: "#22D9D9",
        electric: "#0AABAB",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "grid-dark":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "grid-light":
          "linear-gradient(rgba(11,22,40,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(11,22,40,0.06) 1px, transparent 1px)",
        "hero-gradient":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(14,206,206,0.18), transparent), linear-gradient(180deg, #060E1A 0%, #0B1628 60%, #0B1628 100%)",
        "teal-glow":
          "radial-gradient(circle, rgba(14,206,206,0.3) 0%, transparent 70%)",
      },
      boxShadow: {
        soft:     "0 8px 40px rgba(11,22,40,0.08)",
        card:     "0 24px 64px rgba(0,0,0,0.4)",
        glow:     "0 0 40px rgba(14,206,206,0.25)",
        "glow-sm":"0 0 20px rgba(14,206,206,0.18)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.08)",
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
