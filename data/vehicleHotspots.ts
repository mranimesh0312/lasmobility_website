import { componentPositions, type ComponentId } from "@/components/three/vehicleSpecs";
import type { CameraKey } from "@/components/three/storyMath";

export interface ComponentInfo {
  id: ComponentId;
  label: string;
  summary: string;
  /** What the platform reports for this component (sample values, clearly labelled in UI). */
  readings: { label: string; value: string }[];
  /** True when the reading depends on the installed device/sensor. */
  deviceDependent?: boolean;
}

/**
 * Only signals the LAS Mobility backend actually stores (see
 * backend/internal/models/models.go: telemetry_data / live status).
 */
export const COMPONENTS: Record<ComponentId, ComponentInfo> = {
  gps: {
    id: "gps",
    label: "GPS telematics unit",
    summary: "Position, heading and speed streamed from the installed tracker (Teltonika supported), with satellite count and GSM signal.",
    readings: [
      { label: "Satellites", value: "14" },
      { label: "GSM signal", value: "4 / 5" },
      { label: "Heading", value: "NE 42°" },
    ],
  },
  telematics: {
    id: "telematics",
    label: "Ignition & odometer",
    summary: "Ignition state, movement and odometer feed trips, idling and utilisation reports.",
    readings: [
      { label: "Ignition", value: "On" },
      { label: "Movement", value: "Moving" },
      { label: "Odometer", value: "48,210 km" },
    ],
  },
  battery: {
    id: "battery",
    label: "Battery & power",
    summary: "External (vehicle) and internal (device) battery voltage, with power-cut alerts.",
    readings: [
      { label: "External", value: "13.9 V" },
      { label: "Device battery", value: "4.1 V" },
    ],
  },
  fuel: {
    id: "fuel",
    label: "Fuel level sensor",
    summary: "Fuel level over time with refuel and drain event detection in Fuel Management.",
    readings: [
      { label: "Level", value: "64 %" },
      { label: "Last refuel", value: "2 days ago" },
    ],
    deviceDependent: true,
  },
  immobilizer: {
    id: "immobilizer",
    label: "Immobilizer relay",
    summary: "Remote mobilize / immobilize commands, queued and acknowledged by the device. Blocked while the device is offline.",
    readings: [
      { label: "Engine", value: "Mobilized" },
      { label: "Command", value: "Acknowledged" },
    ],
    deviceDependent: true,
  },
  driverId: {
    id: "driverId",
    label: "Driver identification",
    summary: "Drivers identify themselves with an iButton key, so every trip, score and alert is attributed to the right person.",
    readings: [
      { label: "Driver", value: "Assigned · iButton" },
      { label: "Shift", value: "06:00–14:00" },
    ],
    deviceDependent: true,
  },
  tpms: {
    id: "tpms",
    label: "Tyre pressure (TPMS)",
    summary: "Tyre pressure data where the vehicle or device reports TPMS.",
    readings: [
      { label: "Front left", value: "34 psi" },
      { label: "Front right", value: "33 psi" },
    ],
    deviceDependent: true,
  },
  temperature: {
    id: "temperature",
    label: "Temperature probes",
    summary: "Cargo temperature from Dallas sensors for cold-chain monitoring and alerts.",
    readings: [
      { label: "Probe 1", value: "3.8 °C" },
      { label: "Range", value: "2–8 °C" },
    ],
    deviceDependent: true,
  },
  doors: {
    id: "doors",
    label: "Door status",
    summary: "Door open / unlock states from vehicles whose CAN data exposes them.",
    readings: [
      { label: "Front left", value: "Closed" },
      { label: "Rear doors", value: "Locked" },
    ],
    deviceDependent: true,
  },
};

export interface HeroHotspot {
  id: ComponentId;
  camera: CameraKey;
}

/**
 * Camera framing for a hotspot, derived from where the component sits: the
 * target is shifted along the camera's left so the component lands between
 * the hero copy (left) and the inspector panel (right).
 */
function focusCamera(id: ComponentId, az: number, el: number, r: number): CameraKey {
  const [x, y, z] = componentPositions("suv")[id];
  // Metres to the camera's left (right vector is (sin az, 0, -cos az)): the
  // component lands right of centre, clear of the inspector panel on the left.
  const shift = 1.15;
  return { az, el, r, target: [x - Math.sin(az) * shift, y, z + Math.cos(az) * shift], fov: 30 };
}

/**
 * Hero hotspots and the camera framing each one gets when selected: a gentle
 * push-in (the whole car stays readable), not a close-up.
 */
export const HERO_HOTSPOTS: HeroHotspot[] = [
  { id: "gps", camera: focusCamera("gps", 0.9, 0.42, 9.6) },
  { id: "battery", camera: focusCamera("battery", 0.45, 0.32, 9.4) },
  { id: "immobilizer", camera: focusCamera("immobilizer", 1.2, 0.26, 9.2) },
  { id: "fuel", camera: focusCamera("fuel", 2.1, 0.2, 9.6) },
  { id: "driverId", camera: focusCamera("driverId", 1.0, 0.36, 9.0) },
  { id: "temperature", camera: focusCamera("temperature", 2.6, 0.28, 9.8) },
  { id: "tpms", camera: focusCamera("tpms", 1.05, 0.14, 8.8) },
  { id: "doors", camera: focusCamera("doors", 1.4, 0.22, 9.2) },
];
