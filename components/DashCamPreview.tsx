"use client";

import { useState } from "react";
import { Camera, Gauge, MapPin, ShieldAlert, UserRound } from "lucide-react";
import styles from "./DashCamPreview.module.scss";

type CamId = "front" | "cabin" | "rear";

const CAMS: { id: CamId; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "cabin", label: "Cabin" },
  { id: "rear", label: "Rear" },
];

/** Illustrative clip events, positioned along a 10-minute timeline (0..1). */
const EVENTS = [
  { at: 0.18, time: "07:52:14", label: "Harsh braking", detail: "Clip saved · 52 km/h → 8 km/h", tone: "warn" as const, cam: "front" as CamId },
  { at: 0.46, time: "07:55:03", label: "Phone use", detail: "Driver distraction · cabin camera", tone: "alert" as const, cam: "cabin" as CamId },
  { at: 0.77, time: "07:58:41", label: "Close following", detail: "Short gap to vehicle ahead", tone: "warn" as const, cam: "front" as CamId },
];

/**
 * Coded preview of the Dash Cam & DVR module (in development): a camera view
 * with a recording HUD, camera switcher and a clip timeline with event
 * markers. Illustrative only, labelled "Preview"; theme tokens only.
 */
export default function DashCamPreview() {
  const [cam, setCam] = useState<CamId>("front");
  const [ev, setEv] = useState(0);
  const event = EVENTS[ev];

  const pickEvent = (i: number) => {
    setEv(i);
    setCam(EVENTS[i].cam);
  };

  return (
    <div className={`${styles.wrap} theme-dark-scope`}>
      {/* Camera view */}
      <div className={styles.view} data-cam={cam} role="img" aria-label={`Illustrative ${cam} camera view with ${event.label.toLowerCase()} event`}>
        {cam === "cabin" ? (
          <svg className={styles.scene} viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect className={styles.cabinBg} width="400" height="225" />
            <path className={styles.cabinWindow} d="M40 30 H360 L330 120 H70 Z" />
            <circle className={styles.cabinSeat} cx="140" cy="175" r="58" />
            <rect className={styles.cabinWheel} x="215" y="130" width="120" height="16" rx="8" />
            <circle className={styles.cabinHead} cx="140" cy="118" r="26" />
            <rect className={styles.detectBox} x="104" y="84" width="74" height="70" rx="6" />
          </svg>
        ) : (
          <svg className={styles.scene} viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id="dc-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" className={styles.skyTop} />
                <stop offset="1" className={styles.skyBottom} />
              </linearGradient>
            </defs>
            <rect width="400" height="110" fill="url(#dc-sky)" />
            <rect className={styles.ground} y="108" width="400" height="117" />
            <path className={styles.road} d="M170 108 H230 L400 225 H0 Z" />
            <path className={styles.edge} d="M172 108 L10 225 M228 108 L390 225" />
            <path className={styles.lane} d="M200 112 L200 225" />
            {cam === "front" && (
              <>
                <rect className={styles.car} x="181" y="122" width="38" height="24" rx="5" />
                <rect className={styles.detectBox} x="175" y="116" width="50" height="36" rx="4" />
              </>
            )}
            <path className={styles.horizon} d="M0 108 H400" />
          </svg>
        )}

        {/* HUD */}
        <div className={styles.hudTop}>
          <span className={styles.rec}>
            <i /> REC
          </span>
          <span className={styles.hudTime}>{event.time}</span>
          <span className={styles.preview}>Preview</span>
        </div>
        <div className={styles.hudBottom}>
          <span>
            <Gauge size={12} /> 52 km/h
          </span>
          <span>
            <MapPin size={12} /> 12.9352, 77.6245
          </span>
          <span>
            <UserRound size={12} /> Demo driver A
          </span>
        </div>
        <div className={styles.eventTag} data-tone={event.tone} aria-live="polite">
          <ShieldAlert size={13} />
          <span>
            <b>{event.label}</b>
            <small>{event.detail}</small>
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.cams} role="tablist" aria-label="Camera">
          {CAMS.map((c) => (
            <button key={c.id} type="button" role="tab" aria-selected={cam === c.id} className={styles.camBtn} onClick={() => setCam(c.id)}>
              <Camera size={13} /> {c.label}
            </button>
          ))}
        </div>
        <div className={styles.timeline}>
          <span className={styles.track} aria-hidden="true">
            <span className={styles.played} style={{ width: `${event.at * 100}%` }} />
          </span>
          {EVENTS.map((e, i) => (
            <button
              key={e.time}
              type="button"
              className={styles.marker}
              data-tone={e.tone}
              aria-pressed={ev === i}
              aria-label={`${e.label} at ${e.time}`}
              style={{ left: `${e.at * 100}%` }}
              onClick={() => pickEvent(i)}
            />
          ))}
          <span className={styles.tlStart}>07:50</span>
          <span className={styles.tlEnd}>08:00</span>
        </div>
      </div>
    </div>
  );
}
