/**
 * Colour tokens for places CSS custom properties cannot reach: WebGL
 * materials, canvas drawing, MapLibre paint and HTML email. Values mirror the
 * dark set in app/globals.css (the LAS Mobility app's softened graphite
 * palette); DOM code uses var(--accent) etc. instead. Change both together.
 */
const VALUES = {
  accent: "#6CABAE",
  accentHover: "#81C0C2",
  accentText: "#92D2D5",
  accentMid: "#4F9497",
  accentStrong: "#39787C",
  onAccent: "#031012",
  success: "#69AE8E",
  successLight: "#7BC1A1",
  warning: "#C79B68",
  warningLight: "#D9B98F",
  danger: "#B97771",
  dangerLight: "#C68A84",
  violet: "#887DB5",
  info: "#6988BB",
  infoStrong: "#6B86BA",
  orange: "#CC9072",
  pink: "#B57D98",
  white: "#FFFFFF",
  // Graphite surface ladder (app _themes.scss): chrome -> page -> card -> elevated.
  surface0: "#191C21",
  surface1: "#1F2329",
  surface2: "#2B3038",
  surface3: "#363C45",
  surfaceInput: "#1B1F24",
  ink: "#1F2329",
  inkDeep: "#191C21",
  stage: "#15181C",
  stageRaised: "#2B3038",
  // 3D studio: backgrounds, floor and road, a step darker than the page.
  studio: "#16191D",
  studioNight: "#0D0F12",
  studioRoad: "#181B20",
  studioEnv: "#22262C",
  studioEnvNight: "#0A0C0E",
  studioFloor: "#14171B",
  mist: "#E9ECF1",
  slate50: "#F5F7FA",
  slate200: "#DCE1E7",
  slate400: "#939BA7",
  slate500: "#7A828E",
  slate600: "#5B636E",
  slate700: "#3C434C",
  slate900: "#1F2329",
};

export type PaletteToken = keyof typeof VALUES;
export const PALETTE: Readonly<Record<PaletteToken, string>> = VALUES;

/** `alpha(PALETTE.accent, 0.3)` -> "rgba(108, 171, 174, 0.3)". */
export function alpha(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
