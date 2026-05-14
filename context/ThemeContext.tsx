"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "dark", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("las-theme");
    const resolved: Theme = stored === "light" ? "light" : "dark";
    setThemeState(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
    setMounted(true);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("las-theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  // Render children always — the inline <script> in layout.tsx has already
  // set the correct data-theme on <html> before any paint, so there is no flicker.
  return (
    <ThemeContext.Provider value={{ theme: mounted ? theme : "dark", setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
