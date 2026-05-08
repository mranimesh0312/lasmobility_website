"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Zap, BarChart2, Truck, HelpCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const quickActions = [
  { icon: Truck, label: "Track my fleet", message: "How does real-time fleet tracking work?" },
  { icon: BarChart2, label: "View analytics", message: "What analytics and reports are available?" },
  { icon: Zap, label: "AI features", message: "What AI-powered features does LAS Mobility offer?" },
  { icon: HelpCircle, label: "Get pricing", message: "What are your pricing plans?" },
];

const botResponses: Record<string, string> = {
  default:
    "Thanks for reaching out! I'm the LAS Mobility AI assistant. I can help you with fleet tracking, analytics, driver safety, fuel monitoring, and more. What would you like to know?",
  track:
    "LAS Mobility provides real-time GPS tracking with live map dashboards, route history, geofence alerts, and trip analytics — all from one command center. Want to book a live demo?",
  analytics:
    "Our analytics suite covers fleet utilization, driver behavior scoring, fuel efficiency trends, route performance, maintenance schedules, and AI-powered anomaly detection. Reports are available in real-time and scheduled formats.",
  ai: "LAS Mobility's AI engine detects anomalies, scores driver risk, predicts maintenance needs, recommends route optimizations, and surfaces actionable insights to help your team make faster, smarter decisions.",
  pricing:
    "We offer Starter (up to 10 vehicles), Professional (up to 50 vehicles), and Enterprise (unlimited) plans. Each includes real-time tracking, alerts, and core analytics. Book a demo for a custom quote!",
};

function getResponse(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("track") || m.includes("gps") || m.includes("location")) return botResponses.track;
  if (m.includes("analytic") || m.includes("report") || m.includes("data")) return botResponses.analytics;
  if (m.includes("ai") || m.includes("intelligence") || m.includes("smart")) return botResponses.ai;
  if (m.includes("price") || m.includes("pricing") || m.includes("plan") || m.includes("cost")) return botResponses.pricing;
  return botResponses.default;
}

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
}

export default function Chatbot() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "bot", text: "👋 Hi! I'm the LAS Mobility assistant. Ask me anything about fleet management, tracking, analytics, or our platform!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: "bot", text: getResponse(text) }]);
    }, 1200);
  };

  const isGlass = theme === "glass";
  const isDark = theme === "dark" || isGlass;

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
        style={{ background: "var(--accent)", color: "var(--bg-deep)" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Bot className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[9px] font-bold text-white">
            1
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 flex w-[340px] flex-col overflow-hidden rounded-2xl"
            style={{
              background: isGlass ? "rgba(11,22,40,0.75)" : isDark ? "#0B1628" : "#FFFFFF",
              backdropFilter: isGlass ? "blur(24px)" : undefined,
              border: `1px solid var(--border)`,
              boxShadow: "var(--shadow-card)",
              height: "480px",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "var(--accent-glow)" }}>
                <Sparkles className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>LAS AI Assistant</p>
                <p className="flex items-center gap-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online — replies instantly
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto rounded-md p-1 hover:opacity-70" style={{ color: "var(--text-secondary)" }}>
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                    style={
                      msg.from === "user"
                        ? { background: "var(--accent)", color: "var(--bg-deep)", fontWeight: 500 }
                        : { background: "var(--bg-card-hover)", color: "var(--text-primary)", border: "1px solid var(--border)" }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="rounded-2xl px-4 py-3" style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border)" }}>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-2 w-2 rounded-full"
                          style={{ background: "var(--accent)" }}
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick actions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="mb-2 text-xs" style={{ color: "var(--text-muted)" }}>Quick questions</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map(({ icon: Icon, label, message }) => (
                    <button
                      key={label}
                      onClick={() => send(message)}
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition hover:opacity-90"
                      style={{ background: "var(--bg-muted)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent-text)" }} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t px-4 py-3" style={{ borderColor: "var(--border)" }}>
              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{ background: "var(--bg-card-hover)", border: "1px solid var(--border)" }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about fleet management…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-50"
                  style={{ color: "var(--text-primary)" }}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-7 w-7 items-center justify-center rounded-lg transition disabled:opacity-30"
                  style={{ background: "var(--accent)", color: "var(--bg-deep)" }}
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
