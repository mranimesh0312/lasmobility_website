"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cameraAt, type CameraKey } from "./storyMath";
import { damp, type StoryRuntime } from "./storyRuntime";

interface Props {
  rt: MutableRefObject<StoryRuntime>;
  /** Camera framing for a selected hero hotspot. */
  focus: CameraKey | null;
  zoom: number;
  /** Subtle pointer parallax (desktop, motion allowed). */
  parallax: boolean;
}

const tmpTarget = new THREE.Vector3();
const tmpPos = new THREE.Vector3();

/**
 * Drives the camera from the story timeline: spherical keyframes around a
 * target, a hotspot override near the top of the page, zoom, and a little
 * mouse parallax. Everything is damped so scroll jumps never cut.
 */
export default function CameraRig({ rt, focus, zoom, parallax }: Props) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const pointer = useThree((s) => s.pointer);
  const size = useThree((s) => s.size);
  // Keys are framed for ~16:10. Narrower stages pull back so the car keeps
  // clear of the copy column and the screen edges.
  const aspectPullback = Math.min(1.35, Math.max(1, 1.6 / (size.width / Math.max(1, size.height))));
  const look = useRef(new THREE.Vector3(0, 0.8, 0));
  const sph = useRef({ az: 0.72, el: 0.16, r: 8.4, fov: 30, focusMix: 0 });
  const initialised = useRef(false);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const r = rt.current;
    const key = cameraAt(r.ch);
    const hero = r.mix.hero;
    const s = sph.current;

    s.focusMix = damp(s.focusMix, focus && hero > 0.5 ? 1 : 0, 4, dt);
    const f = focus ?? key;
    const m = s.focusMix;
    const az = key.az + (f.az - key.az) * m + (parallax ? pointer.x * 0.06 * hero : 0);
    const el = key.el + (f.el - key.el) * m + (parallax ? pointer.y * 0.035 * hero : 0);
    const rad = (key.r + (f.r - key.r) * m) * (1 + (zoom - 1) * hero) * aspectPullback;
    const fov = key.fov + (f.fov - key.fov) * m;
    tmpTarget.set(
      key.target[0] + (f.target[0] - key.target[0]) * m,
      key.target[1] + (f.target[1] - key.target[1]) * m,
      key.target[2] + (f.target[2] - key.target[2]) * m
    );

    if (!initialised.current) {
      Object.assign(s, { az, el, r: rad, fov });
      look.current.copy(tmpTarget);
      initialised.current = true;
    }

    const before = s.az + s.el + s.r + look.current.x + look.current.y + look.current.z;
    s.az = damp(s.az, az, 3.2, dt);
    s.el = damp(s.el, el, 3.2, dt);
    s.r = damp(s.r, rad, 3.2, dt);
    s.fov = damp(s.fov, fov, 3.2, dt);
    look.current.x = damp(look.current.x, tmpTarget.x, 3.2, dt);
    look.current.y = damp(look.current.y, tmpTarget.y, 3.2, dt);
    look.current.z = damp(look.current.z, tmpTarget.z, 3.2, dt);
    const after = s.az + s.el + s.r + look.current.x + look.current.y + look.current.z;
    if (Math.abs(after - before) > 1e-4) r.busy = true;

    tmpPos.set(Math.cos(s.az) * Math.cos(s.el), Math.sin(s.el), Math.sin(s.az) * Math.cos(s.el)).multiplyScalar(s.r).add(look.current);
    camera.position.copy(tmpPos);
    camera.lookAt(look.current);
    if (Math.abs(camera.fov - s.fov) > 0.01) {
      camera.fov = s.fov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
