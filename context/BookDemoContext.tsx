"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface BookDemoContextValue {
  isOpen: boolean;
  open: (source?: string) => void;
  close: () => void;
  source: string;
}

const BookDemoContext = createContext<BookDemoContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
  source: "",
});

export function BookDemoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("");

  const open = useCallback((src?: string) => {
    setSource(src ?? (typeof window !== "undefined" ? window.location.href : ""));
    setIsOpen(true);
    // Prevent body scroll
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  return (
    <BookDemoContext.Provider value={{ isOpen, open, close, source }}>
      {children}
    </BookDemoContext.Provider>
  );
}

export function useBookDemo() {
  return useContext(BookDemoContext);
}
