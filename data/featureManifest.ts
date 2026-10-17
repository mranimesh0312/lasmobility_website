import manifestJson from "./feature-manifest.json";
import screenshotJson from "./screenshot-manifest.json";

export type ThemeName = "dark" | "light";

export interface Screenshot {
  src: string;
  width: number;
  height: number;
  /** Original file the asset was produced from (audit trail). */
  origin?: string;
  masked?: boolean;
  /** A person has checked the image for personal data. Unreviewed images are never shown. */
  reviewed?: boolean;
  capturedAt?: string;
}

export interface FeatureEntry {
  id: string;
  title: string;
  appRoute: string;
  tier: "user" | "franchise" | "platform";
  sitePath: string;
  app?: "web" | "mobile";
  screenshots: Partial<Record<ThemeName, Screenshot>>;
}

type ShotManifest = Record<string, Partial<Record<ThemeName, Screenshot>>>;
const shots = screenshotJson as ShotManifest;

const reviewedOnly = (entry: Partial<Record<ThemeName, Screenshot>> = {}) =>
  Object.fromEntries(Object.entries(entry).filter(([, s]) => s?.reviewed)) as Partial<Record<ThemeName, Screenshot>>;

export const FEATURES: FeatureEntry[] = manifestJson.features.map((f) => ({
  ...(f as Omit<FeatureEntry, "screenshots">),
  screenshots: reviewedOnly(shots[f.id]),
}));

export const featureById = (id: string) => FEATURES.find((f) => f.id === id);

/**
 * Screenshot for the visitor's theme. Falls back to the other theme only when
 * the matching one has not been captured yet, and reports that so the UI can
 * label it instead of silently mixing themes.
 */
export function screenshotFor(feature: FeatureEntry, theme: ThemeName): { shot: Screenshot | null; themeMatched: boolean } {
  const exact = feature.screenshots[theme];
  if (exact) return { shot: exact, themeMatched: true };
  const other = feature.screenshots[theme === "dark" ? "light" : "dark"];
  return { shot: other ?? null, themeMatched: false };
}

export const hasScreenshot = (f: FeatureEntry) => Boolean(f.screenshots.dark || f.screenshots.light);
