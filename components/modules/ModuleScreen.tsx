"use client";

import DeviceMockup from "@/components/showcase/DeviceMockup";
import ReplicaScreen from "@/components/replica/ReplicaScreen";
import type { ScreenId } from "@/components/replica/context";

/** The module's coded, theme-aware app screen in the laptop frame. */
export default function ModuleScreen({ screen }: { screen: ScreenId }) {
  return (
    <DeviceMockup>
      <ReplicaScreen screen={screen} />
    </DeviceMockup>
  );
}
