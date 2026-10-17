/**
 * Dimensions (metres) for the procedural vehicle placeholders. The car faces
 * +X, width runs along Z, wheels sit on y = 0.
 */
export type VehicleVariant = "suv" | "sedan" | "van";

export interface VehicleSpec {
  length: number;
  width: number;
  wheelRadius: number;
  wheelbase: number;
  sill: number;
  belt: number;
  hoodFront: number;
  nose: number;
  roof: number;
  windshieldBaseX: number;
  windshieldTopX: number;
  roofEndX: number;
  rearGlassBottomX: number;
  tailTop: number;
  roofRails: boolean;
}

export const VEHICLE_SPECS: Record<VehicleVariant, VehicleSpec> = {
  suv: {
    length: 4.7, width: 1.92, wheelRadius: 0.37, wheelbase: 2.85, sill: 0.36, belt: 1.05,
    hoodFront: 0.9, nose: 0.72, roof: 1.68, windshieldBaseX: 0.95, windshieldTopX: 0.02,
    roofEndX: -1.62, rearGlassBottomX: -2.12, tailTop: 1.04, roofRails: true,
  },
  sedan: {
    length: 4.85, width: 1.86, wheelRadius: 0.34, wheelbase: 2.9, sill: 0.3, belt: 0.92,
    hoodFront: 0.74, nose: 0.58, roof: 1.44, windshieldBaseX: 0.82, windshieldTopX: -0.28,
    roofEndX: -1.12, rearGlassBottomX: -1.82, tailTop: 0.96, roofRails: false,
  },
  van: {
    length: 5.0, width: 2.0, wheelRadius: 0.36, wheelbase: 3.1, sill: 0.38, belt: 1.12,
    hoodFront: 1.0, nose: 0.8, roof: 2.05, windshieldBaseX: 1.5, windshieldTopX: 0.78,
    roofEndX: -2.42, rearGlassBottomX: -2.47, tailTop: 1.98, roofRails: false,
  },
};

export type ComponentId = "gps" | "telematics" | "battery" | "fuel" | "immobilizer" | "driverId" | "tpms" | "temperature" | "doors";

/** Where each telematics component sits inside the vehicle (local coordinates). */
export function componentPositions(v: VehicleVariant): Record<ComponentId, [number, number, number]> {
  const s = VEHICLE_SPECS[v];
  const hx = s.length / 2;
  return {
    gps: [s.windshieldBaseX - 0.15, s.belt + 0.08, 0],
    telematics: [s.windshieldBaseX - 0.45, s.belt - 0.35, 0.35],
    battery: [hx - 0.55, s.hoodFront - 0.25, 0.42],
    fuel: [-s.wheelbase / 2 + 0.55, s.sill + 0.12, -0.2],
    immobilizer: [s.windshieldBaseX - 0.4, s.belt - 0.38, -0.35],
    driverId: [s.windshieldBaseX - 0.62, s.belt - 0.08, 0.42],
    tpms: [s.wheelbase / 2, s.wheelRadius, s.width / 2 - 0.1],
    temperature: [-hx + 0.6, s.belt + 0.1, 0],
    doors: [0.1, s.belt - 0.2, s.width / 2],
  };
}
