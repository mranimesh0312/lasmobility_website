/**
 * Pure timeline maths for the scroll story. Progress 0..1 maps to a chapter
 * float 0..CHAPTERS-1; every scene layer derives its state from that number,
 * so scrolling backwards replays exactly in reverse.
 */
export const CHAPTERS = 9;

export const smoothstep = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/** Fade in around `center - 0.5`, hold, fade out around `center + 0.5`. */
export const bump = (x: number, start: number, end: number, ramp = 0.45) =>
  smoothstep(start - ramp, start, x) * (1 - smoothstep(end, end + ramp, x));

export interface CameraKey {
  /** Azimuth around the target, radians from +X towards +Z. */
  az: number;
  /** Elevation, radians above the horizon. */
  el: number;
  r: number;
  target: [number, number, number];
  fov: number;
}

/** One key per chapter. The car sits at the origin facing +X. */
export const CAMERA_KEYS: CameraKey[] = [
  // Hero target sits 2.2 m to the camera's left of the car (right vector is
  // (sin az, 0, -cos az)), which puts the car in the right half beside the copy.
  { az: 0.72, el: 0.12, r: 12, target: [-1.45, 0.85, 1.65], fov: 30 }, // 0 hero
  { az: 2.55, el: 0.18, r: 9.6, target: [-0.78, 0.8, -1.16], fov: 30 }, // 1 orbit to rear three-quarter
  { az: 1.57, el: 0.08, r: 11, target: [-1.6, 0.9, 0], fov: 28 }, // 2 highway side tracking
  { az: 1.15, el: 0.98, r: 18, target: [4, 0, -1], fov: 34 }, // 3 GPS, high
  { az: 0.95, el: 0.28, r: 10.5, target: [-1.95, 1.0, 1.4], fov: 30 }, // 4 telemetry
  { az: 0.5, el: 0.4, r: 9.8, target: [1.25, 0.85, -2.3], fov: 30 }, // 5 digital twin
  { az: 0.82, el: 0.2, r: 4.8, target: [-0.56, 0.62, 4.81], fov: 32 }, // 6 laptop reveal
  { az: 0.66, el: 0.14, r: 4.1, target: [-0.39, 0.66, 4.83], fov: 32 }, // 7 product screens
  { az: 0.9, el: 0.12, r: 13, target: [-0.2, -0.55, 0], fov: 28 }, // 8 CTA wide, car high above the copy
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Camera for a chapter float; holds on each key, eases between them. */
export function cameraAt(ch: number): CameraKey {
  const i = Math.min(CAMERA_KEYS.length - 2, Math.max(0, Math.floor(ch)));
  const frac = Math.min(1, Math.max(0, ch - i));
  const t = smoothstep(0.18, 0.82, frac);
  const a = CAMERA_KEYS[i];
  const b = CAMERA_KEYS[i + 1];
  return {
    az: lerp(a.az, b.az, t),
    el: lerp(a.el, b.el, t),
    r: lerp(a.r, b.r, t),
    target: [lerp(a.target[0], b.target[0], t), lerp(a.target[1], b.target[1], t), lerp(a.target[2], b.target[2], t)],
    fov: lerp(a.fov, b.fov, t),
  };
}

export interface SceneMix {
  studio: number;
  road: number;
  gps: number;
  telemetry: number;
  twin: number;
  laptop: number;
  night: number;
  /** 0..1 progress through the product-screens chapter. */
  screens: number;
  /** Hero interaction (drag, hotspots) is only live near the top. */
  hero: number;
}

export function sceneMix(ch: number): SceneMix {
  const road = smoothstep(1.35, 1.95, ch) * (1 - smoothstep(5.3, 5.85, ch));
  return {
    road,
    studio: 1 - road,
    gps: bump(ch, 2.75, 3.55),
    telemetry: bump(ch, 3.75, 4.35, 0.35),
    twin: bump(ch, 4.75, 5.45),
    laptop: smoothstep(5.45, 6.1, ch) * (1 - smoothstep(7.55, 7.95, ch)),
    night: Math.max(road * 0.7, smoothstep(7.5, 8, ch)),
    screens: Math.min(1, Math.max(0, (ch - 6.45) / 1.15)),
    hero: 1 - smoothstep(0.08, 0.4, ch),
  };
}

/** Opacity for chapter `i`'s copy. */
export const copyOpacity = (ch: number, i: number) => {
  if (i === 0) return 1 - smoothstep(0.12, 0.42, ch);
  if (i === CHAPTERS - 1) return smoothstep(7.55, 7.95, ch);
  return bump(ch, i - 0.22, i + 0.22, 0.25);
};
