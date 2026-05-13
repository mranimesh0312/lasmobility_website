"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { BookDemoProvider } from "@/context/BookDemoContext";
import BookDemoModal from "@/components/BookDemoModal";
import Chatbot from "@/components/Chatbot";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BookDemoProvider>
          {children}
          <BookDemoModal />
          <Chatbot />
        </BookDemoProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
