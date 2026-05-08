import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#08111f",
        navy: "#0b1728",
        cyan: "#14b8d4",
        electric: "#2563eb",
        mint: "#20c997",
        lime: "#95d11f"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 22px 70px rgba(8, 17, 31, 0.12)",
        glow: "0 20px 80px rgba(20, 184, 212, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
