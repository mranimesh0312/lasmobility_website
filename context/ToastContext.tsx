"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue>({
  addToast: () => {},
  removeToast: () => {},
});

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timerRef.current = setTimeout(() => onRemove(toast.id), 4500);
    return () => clearTimeout(timerRef.current);
  }, [toast.id, onRemove]);

  const icon =
    toast.type === "success" ? <CheckCircle2 className="h-5 w-5" style={{ color: "#22C55E" }} /> :
    toast.type === "error"   ? <XCircle      className="h-5 w-5" style={{ color: "#EF4444" }} /> :
                               <Info         className="h-5 w-5" style={{ color: "var(--accent-text)" }} />;

  const border =
    toast.type === "success" ? "rgba(34,197,94,0.35)" :
    toast.type === "error"   ? "rgba(239,68,68,0.35)"  :
                               "var(--border-accent)";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex w-full max-w-sm items-start gap-3 rounded-xl px-4 py-3.5 shadow-2xl"
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${border}`,
        backdropFilter: "blur(12px)",
      }}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <p className="flex-1 text-sm font-medium leading-5" style={{ color: "var(--text-primary)" }}>
        {toast.message}
      </p>
      <button
        onClick={() => onRemove(toast.id)}
        className="mt-0.5 shrink-0 rounded-md p-0.5 transition hover:opacity-60"
        style={{ color: "var(--text-muted)" }}
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

function Toaster({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  return (
    <div
      className="pointer-events-none fixed bottom-5 right-5 z-[200] flex flex-col gap-2.5"
      style={{ width: "min(calc(100vw - 40px), 380px)" }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onRemove={removeToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <Toaster toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
