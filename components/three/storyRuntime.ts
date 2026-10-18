import { sceneMix, type SceneMix } from "./storyMath";

/**
 * Mutable per-frame state shared by the story layers. Written once per frame
 * by the runtime driver, read by every other useFrame in the scene, so no
 * React re-render happens while scrolling.
 */
export interface StoryRuntime {
  /** Smoothed chapter float. */
  ch: number;
  mix: SceneMix;
  /** Set by any layer that still has motion to finish; keeps demand rendering alive. */
  busy: boolean;
  /** Hero drag rotation, radians. */
  yaw: number;
  yawTarget: number;
  /** Opening sequence, 0..1 over INTRO_SECONDS after mount. */
  intro: number;
}

/** The whole opening (camera settle, headlights on) stays under 1.5 s. */
export const INTRO_SECONDS = 1.3;

/** Ease-out cubic of the intro, for anything that settles into place. */
export const introEase = (rt: StoryRuntime) => 1 - Math.pow(1 - rt.intro, 3);

export const createRuntime = (): StoryRuntime => ({ ch: 0, mix: sceneMix(0), busy: true, yaw: 0, yawTarget: 0, intro: 0 });

/** Frame-rate independent exponential damping. */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-lambda * dt));
