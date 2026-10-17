"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CalendarDays, Fuel, Settings2, Users } from "lucide-react";
import { RENTAL_FLEET } from "@/data/demoData";
import { PAINTS, paintById } from "@/stores/experienceStore";
import { useBookDemo } from "@/context/BookDemoContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./Demos.module.scss";

const VehicleStage = dynamic(() => import("@/components/three/VehicleStage"), { ssr: false, loading: () => <div className={styles.stagePlaceholder} /> });

const DAYS = 14;

/** Rental vehicle discovery with a 3D preview, specs and an availability strip. */
export default function RentalHubDemo() {
  const [id, setId] = useState(RENTAL_FLEET[0].id);
  const [paintId, setPaintId] = useState(RENTAL_FLEET[0].paintId);
  const coarse = useMediaQuery("(pointer: coarse)") ?? false;
  const { open } = useBookDemo();
  const v = RENTAL_FLEET.find((x) => x.id === id)!;
  const today = new Date(2026, 9, 17);

  return (
    <div className={styles.split}>
      <div className={styles.rentalStageWrap}>
        <VehicleStage className={styles.rentalStage} variant={v.variant} paint={paintById(paintId)} label={`3D preview of the ${v.name}`} coarsePointer={coarse} />
        <div className={styles.chips} role="radiogroup" aria-label="Preview colour">
          {PAINTS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={p.id === paintId}
              aria-label={p.label}
              title={p.label}
              className={`${styles.colorDot} ${p.id === paintId ? styles.colorDotActive : ""}`}
              style={{ background: p.color }}
              onClick={() => setPaintId(p.id)}
            />
          ))}
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.rentalList} role="radiogroup" aria-label="Rental vehicles">
          {RENTAL_FLEET.map((x) => (
            <button
              key={x.id}
              type="button"
              role="radio"
              aria-checked={x.id === id}
              className={`${styles.vehicleBtn} ${x.id === id ? styles.vehicleBtnActive : ""}`}
              onClick={() => {
                setId(x.id);
                setPaintId(x.paintId);
              }}
            >
              <span>
                <strong>{x.name}</strong>
                <small>{x.status}</small>
              </span>
            </button>
          ))}
        </div>
        <ul className={styles.specs}>
          <li><Users size={15} /> {v.seats} seats</li>
          <li><Settings2 size={15} /> {v.transmission}</li>
          <li><Fuel size={15} /> {v.fuel}</li>
        </ul>
        <p className={styles.kicker}>
          <CalendarDays size={13} /> Availability, next {DAYS} days
        </p>
        <div className={styles.calendar} role="list" aria-label="Availability calendar">
          {Array.from({ length: DAYS }, (_, i) => {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            const booked = v.booked.includes(i);
            return (
              <span key={i} role="listitem" className={booked ? styles.dayBooked : styles.dayFree} title={`${d.toDateString()}: ${booked ? "booked" : "available"}`}>
                <small>{d.toLocaleDateString("en-GB", { weekday: "narrow" })}</small>
                {d.getDate()}
                <span className="sr-only">{booked ? " booked" : " available"}</span>
              </span>
            );
          })}
        </div>
        <p className={styles.hintText}>Sample fleet. Rental Hub also covers bookings, inspections, corporate accounts, leasing and payments.</p>
        <button type="button" className={styles.primaryBtn} onClick={() => open("home-rental-hub")}>
          Ask about Rental Hub
        </button>
      </div>
    </div>
  );
}
