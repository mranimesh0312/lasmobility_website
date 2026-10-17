import { create } from "zustand";

export type LightingMode = "day" | "night";
export type QualityTier = "low" | "medium" | "high";

export interface PaintOption {
  id: string;
  label: string;
  color: string;
  metalness: number;
  roughness: number;
}

/** Paint finishes offered in the hero configurator. */
export const PAINTS: PaintOption[] = [
  { id: "silver", label: "Lunar Silver", color: "#AEB4BC", metalness: 0.85, roughness: 0.24 },
  { id: "glacier", label: "Glacier White", color: "#E9ECEF", metalness: 0.15, roughness: 0.32 },
  { id: "graphite", label: "Graphite", color: "#2B3038", metalness: 0.7, roughness: 0.28 },
  { id: "obsidian", label: "Obsidian Black", color: "#0B0D10", metalness: 0.55, roughness: 0.22 },
  { id: "teal", label: "LAS Teal", color: "#0EA5A8", metalness: 0.65, roughness: 0.26 },
  { id: "crimson", label: "Crimson", color: "#8E1B22", metalness: 0.6, roughness: 0.27 },
];

interface ExperienceState {
  /** Scroll-story progress, 0..1. Written by ScrollTrigger, read inside useFrame. */
  progress: number;
  /** Number of story chapters, so 3D code can map progress -> chapter float. */
  chapterCount: number;
  paintId: string;
  lighting: LightingMode;
  headlights: boolean;
  hazards: boolean;
  /** Hero hotspot the camera is focused on, if any. */
  focusHotspot: string | null;
  /** Hero zoom multiplier on camera distance (clamped 0.78..1.25). */
  zoom: number;
  quality: QualityTier;
  setProgress: (p: number) => void;
  setChapterCount: (n: number) => void;
  setPaint: (id: string) => void;
  setLighting: (m: LightingMode) => void;
  toggleHeadlights: () => void;
  toggleHazards: () => void;
  setFocusHotspot: (id: string | null) => void;
  nudgeZoom: (delta: number) => void;
  setQuality: (q: QualityTier) => void;
}

const clampZoom = (z: number) => Math.min(1.25, Math.max(0.78, z));

export const useExperienceStore = create<ExperienceState>((set) => ({
  progress: 0,
  chapterCount: 9,
  paintId: "graphite",
  lighting: "day",
  headlights: true,
  hazards: false,
  focusHotspot: null,
  zoom: 1,
  quality: "medium",
  setProgress: (progress) => set({ progress }),
  setChapterCount: (chapterCount) => set({ chapterCount }),
  setPaint: (paintId) => set({ paintId }),
  setLighting: (lighting) => set({ lighting }),
  toggleHeadlights: () => set((s) => ({ headlights: !s.headlights })),
  toggleHazards: () => set((s) => ({ hazards: !s.hazards })),
  setFocusHotspot: (focusHotspot) => set({ focusHotspot }),
  nudgeZoom: (delta) => set((s) => ({ zoom: clampZoom(s.zoom + delta) })),
  setQuality: (quality) => set({ quality }),
}));

export const paintById = (id: string) => PAINTS.find((p) => p.id === id) ?? PAINTS[0];
