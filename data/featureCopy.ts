/** Marketing copy per platform module, kept to what the app actually ships. */
export const FEATURE_COPY: Record<string, { summary: string; points: string[] }> = {
  dashboard: {
    summary: "A configurable command view of the whole fleet: status, distance, fuel, alerts and utilisation.",
    points: ["Arrange and customise widgets", "Filter by user and date range", "Live fleet map and alert feed"],
  },
  "live-tracking": {
    summary: "Every vehicle on one live map, with status, speed, ignition and last update.",
    points: ["Running / idle / stopped / offline counts", "Search by registration", "Jump to live view or history"],
  },
  vehicles: {
    summary: "The fleet register: vehicles, devices, groups and subscriptions in one grid.",
    points: ["Vehicle groups", "Device assignment", "Bulk setup"],
  },
  "vehicle-details": {
    summary: "One workspace per vehicle with live status, position, driver and engine commands.",
    points: ["Live and history modes", "Connection and GPS quality", "Driver assignment"],
  },
  trips: {
    summary: "Automatic trip detection with route replay, stops and distance for any period.",
    points: ["Playback with speed control", "Stoppages and alerts on the timeline", "Travel, distance and stop totals"],
  },
  routes: {
    summary: "Saved routes and route analytics for recurring journeys.",
    points: ["Planned versus actual", "Route-level reporting"],
  },
  telemetry: {
    summary: "Live sensor readings per vehicle as they arrive from the device.",
    points: ["Ignition, speed, voltage", "GPS satellites and GSM signal", "OBD and TPMS where supported"],
  },
  geofencing: {
    summary: "Draw zones, assign them to vehicles and get alerted on entry and exit.",
    points: ["Bulk upload", "Assignment by vehicle", "Geofence alert log"],
  },
  immobilization: {
    summary: "Remote mobilize and immobilize, sent to the device and tracked to acknowledgement.",
    points: ["Command status tracking", "Blocked while the device is offline", "Role-based permission"],
  },
  fuel: {
    summary: "Fuel level over time with refuel and drain events, efficiency analytics and reports.",
    points: ["Refuel and drain detection", "Consumption analytics", "Fuel reports"],
  },
  temperature: {
    summary: "Cold-chain monitoring from temperature probes with thresholds and alerts.",
    points: ["Per-sensor history", "Out-of-range alerts", "Temperature analytics"],
  },
  "driver-identification": {
    summary: "Drivers identified by iButton, with scorecards and performance per driver.",
    points: ["iButton driver IDs", "Driver scorecard", "Driver performance"],
  },
  maintenance: {
    summary: "Service schedules, work orders and service history for every vehicle.",
    points: ["Due by date or odometer", "Service history analytics", "Close-out with costs"],
  },
  expenses: {
    summary: "Operating expenses recorded per vehicle with spend analytics.",
    points: ["Expense records", "Spend overview", "Category analytics"],
  },
  reports: {
    summary: "Standard, custom and scheduled reports exported to PDF and Excel.",
    points: ["Report templates", "Custom report builder", "Scheduled email delivery"],
  },
  alerts: {
    summary: "Overspeed, geofence, fuel, power and SOS alerts in one stream.",
    points: ["SOS alerts", "Dismissed history", "Configurable rules"],
  },
  documents: {
    summary: "Vehicle and driver documents with expiry tracking and compliance health.",
    points: ["Registry and upload", "Renewal alerts", "Compliance analytics"],
  },
  "rental-hub": {
    summary: "Rental and leasing operations: vehicles, bookings, customers, inspections and payments.",
    points: ["Booking calendar", "Corporate accounts and leasing", "Inspections and fines"],
  },
  subscriptions: {
    summary: "Per-vehicle subscriptions with plans, invoices and approvals.",
    points: ["Plans and invoices", "Approval workflows", "Subscription history"],
  },
  franchise: {
    summary: "Multi-tenant franchise management with white-label branding and scoped access.",
    points: ["Partners and tenants", "Role-based access control", "Impersonation audit"],
  },
  "mobile-app": {
    summary: "The LAS Mobility mobile app for tracking and alerts on the move.",
    points: ["Live tracking", "Alerts", "Vehicle status"],
  },
};
