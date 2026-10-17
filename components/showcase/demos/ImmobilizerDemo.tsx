"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, LockOpen, ShieldAlert, Wifi, WifiOff } from "lucide-react";
import styles from "./Demos.module.scss";

type Engine = "mobilized" | "immobilized";
type Step = "idle" | "queued" | "sent" | "acknowledged";

const STEPS: { key: Exclude<Step, "idle">; label: string; detail: string }[] = [
  { key: "queued", label: "Command queued", detail: "Saved with who requested it and why" },
  { key: "sent", label: "Sent to device", detail: "Delivered over GPRS by the command service" },
  { key: "acknowledged", label: "Acknowledged", detail: "Device confirmed the relay state" },
];

/**
 * UI-only simulation of the immobilization flow (queued -> sent -> ack),
 * including the real rule that commands are blocked while the device is
 * offline. It is not connected to any vehicle.
 */
export default function ImmobilizerDemo() {
  const [engine, setEngine] = useState<Engine>("mobilized");
  const [online, setOnline] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [reason, setReason] = useState("Unauthorised use");
  const [step, setStep] = useState<Step>("idle");
  const [log, setLog] = useState<string[]>([]);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const target: Engine = engine === "mobilized" ? "immobilized" : "mobilized";
  const busy = step !== "idle" && step !== "acknowledged";

  const send = () => {
    setConfirming(false);
    setStep("queued");
    const verb = target === "immobilized" ? "Immobilize" : "Mobilize";
    setLog((l) => [`${verb} requested · ${reason}`, ...l].slice(0, 5));
    timers.current.push(
      window.setTimeout(() => setStep("sent"), 1100),
      window.setTimeout(() => {
        setStep("acknowledged");
        setEngine(target);
        setLog((l) => [`${verb} acknowledged by device`, ...l].slice(0, 5));
      }, 2600)
    );
  };

  return (
    <div className={styles.split}>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div>
            <p className={styles.kicker}>Vehicle</p>
            <h4 className={styles.cardTitle}>DEMO-01 · Delivery van</h4>
          </div>
          <span className={styles.simBadgeInline}>Simulation</span>
        </div>

        <div className={styles.engineState} data-state={engine}>
          {engine === "mobilized" ? <LockOpen size={28} /> : <Lock size={28} />}
          <div>
            <strong>{engine === "mobilized" ? "Mobilized" : "Immobilized"}</strong>
            <span>Engine command state</span>
          </div>
        </div>

        <div className={styles.controlsRow}>
          <button type="button" className={styles.ghostBtn} aria-pressed={!online} onClick={() => setOnline((o) => !o)}>
            {online ? <Wifi size={16} /> : <WifiOff size={16} />} Device {online ? "online" : "offline"}
          </button>
        </div>

        <button
          type="button"
          className={target === "immobilized" ? styles.dangerBtn : styles.primaryBtn}
          disabled={!online || busy}
          onClick={() => setConfirming(true)}
        >
          {target === "immobilized" ? <Lock size={16} /> : <LockOpen size={16} />}
          {target === "immobilized" ? "Immobilize" : "Mobilize"}
        </button>
        {!online && (
          <p className={styles.warnText}>
            <ShieldAlert size={14} /> Vehicle is offline. Commands cannot be sent while the device is offline.
          </p>
        )}

        {confirming && (
          <div className={styles.confirm} role="alertdialog" aria-labelledby="immob-confirm-title">
            <p id="immob-confirm-title" className={styles.confirmTitle}>
              {target === "immobilized" ? "Immobilize DEMO-01?" : "Mobilize DEMO-01?"}
            </p>
            <label className={styles.fieldLabel}>
              Reason
              <select value={reason} onChange={(e) => setReason(e.target.value)} className={styles.select}>
                <option>Unauthorised use</option>
                <option>Theft recovery</option>
                <option>Overdue rental return</option>
                <option>Maintenance hold</option>
              </select>
            </label>
            <div className={styles.controlsRow}>
              <button type="button" className={target === "immobilized" ? styles.dangerBtn : styles.primaryBtn} onClick={send}>
                Confirm
              </button>
              <button type="button" className={styles.ghostBtn} onClick={() => setConfirming(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.card}>
        <p className={styles.kicker}>Command status</p>
        <ol className={styles.steps}>
          {STEPS.map((s, i) => {
            const reached = step !== "idle" && STEPS.findIndex((x) => x.key === step) >= i;
            return (
              <li key={s.key} className={reached ? styles.stepDone : ""} aria-current={step === s.key ? "step" : undefined}>
                <span className={styles.stepDot} />
                <div>
                  <strong>{s.label}</strong>
                  <span>{s.detail}</span>
                </div>
              </li>
            );
          })}
        </ol>
        <p className={styles.kicker}>Audit log</p>
        <ul className={styles.log} aria-live="polite">
          {log.length === 0 && <li className={styles.alertEmpty}>No commands yet.</li>}
          {log.map((l, i) => (
            <li key={`${l}-${i}`}>{l}</li>
          ))}
        </ul>
        <p className={styles.hintText}>On the real platform this action needs a role permission and is audited.</p>
      </div>
    </div>
  );
}
