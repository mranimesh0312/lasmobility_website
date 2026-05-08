"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import Chatbot from "@/components/Chatbot";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Chatbot />
    </ThemeProvider>
  );
}
