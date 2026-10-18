"use client";

import type { ScreenId } from "./context";
import { DashboardScreen, LiveTrackingScreen, TripsScreen, VehicleDetailScreen, VehiclesScreen } from "./screens/FleetScreens";
import {
  AiScreen, AlertsScreen, DriversScreen, FuelScreen, MaintenanceScreen, ModuleOverviewScreen, RentalScreen, ReportsScreen, TemperatureScreen,
} from "./screens/OpsScreens";

/** One replica screen by id; shared by the full app replica and embedded screens. */
export default function ScreenSwitch({ id }: { id: ScreenId }) {
  switch (id) {
    case "dashboard": return <DashboardScreen />;
    case "live": return <LiveTrackingScreen />;
    case "vehicles": return <VehiclesScreen />;
    case "vehicle": return <VehicleDetailScreen />;
    case "trips": return <TripsScreen />;
    case "alerts": return <AlertsScreen />;
    case "fuel": return <FuelScreen />;
    case "temperature": return <TemperatureScreen />;
    case "maintenance": return <MaintenanceScreen />;
    case "drivers": return <DriversScreen />;
    case "reports": return <ReportsScreen />;
    case "ai": return <AiScreen />;
    case "rental": return <RentalScreen />;
    default: return <ModuleOverviewScreen id={id} />;
  }
}
