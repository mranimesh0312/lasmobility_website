"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { BookDemoProvider } from "@/context/BookDemoContext";
import BookDemoModal from "@/components/BookDemoModal";
import Chatbot from "@/components/Chatbot";
import SmoothScroll from "@/components/animations/SmoothScroll";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BookDemoProvider>
          <SmoothScroll />
          {children}
          <BookDemoModal />
          <Chatbot />
        </BookDemoProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
