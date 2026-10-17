"use client";

import { createContext, useContext } from "react";

export type ScreenId =
  | "dashboard"
  | "live"
  | "vehicles"
  | "vehicle"
  | "trips"
  | "alerts"
  | "fuel"
  | "temperature"
  | "maintenance"
  | "drivers"
  | "reports"
  | "ai"
  | "rental"
  | "geofence"
  | "documents"
  | "expenses";

export interface ReplicaApi {
  screen: ScreenId;
  /** Vehicle the Vehicle Details screen shows. */
  vehicleId: number;
  go: (screen: ScreenId, vehicleId?: number) => void;
  /** Simulation clock in seconds; advances only while the replica is on screen. */
  seconds: number;
  theme: "dark" | "light";
  toast: (msg: string) => void;
  openAi: () => void;
}

export const ReplicaContext = createContext<ReplicaApi | null>(null);

export function useReplica() {
  const ctx = useContext(ReplicaContext);
  if (!ctx) throw new Error("useReplica must be used inside AppReplica");
  return ctx;
}
