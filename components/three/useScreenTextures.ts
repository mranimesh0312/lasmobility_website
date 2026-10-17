"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { invalidateScenes } from "./SceneCanvas";
import { screenshotFor, type FeatureEntry, type ThemeName } from "@/data/featureManifest";
import { drawAppScreen, loadLogo } from "./drawAppScreen";

/** App-style screen drawn on a canvas (see drawAppScreen). */
function appScreen(id: string, theme: ThemeName) {
  const canvas = document.createElement("canvas");
  drawAppScreen(canvas, id, theme);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Cover-fit a texture of aspect `imgAspect` onto a screen of aspect `screenAspect`. */
function coverFit(tex: THREE.Texture, imgAspect: number, screenAspect: number) {
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  if (imgAspect > screenAspect) {
    tex.repeat.set(screenAspect / imgAspect, 1);
    tex.offset.set(0, 0);
  } else {
    tex.repeat.set(1, imgAspect / screenAspect);
    tex.offset.set(0, 1 - imgAspect / screenAspect); // keep the top of the UI
  }
}

/**
 * One texture per feature for the theme: the app-style canvas screen, or a
 * reviewed screenshot when one exists (loaded lazily, swapped in place).
 */
export function useScreenTextures(features: FeatureEntry[], theme: ThemeName, screenAspect: number) {
  const textures = useMemo(
    () =>
      features.map((f) => {
        const t = appScreen(f.id, theme);
        coverFit(t, 1.6, screenAspect);
        return t;
      }),
    [features, theme, screenAspect]
  );

  useEffect(() => {
    const loader = new THREE.ImageLoader();
    let cancelled = false;
    // Redraw the canvas screens with the brand logo once it has loaded.
    loadLogo(theme)
      .then((logo) => {
        if (cancelled) return;
        features.forEach((f, i) => {
          const tex = textures[i];
          if (!(tex.image instanceof HTMLCanvasElement)) return; // a real screenshot replaced it
          drawAppScreen(tex.image, f.id, theme, logo);
          tex.needsUpdate = true;
        });
        invalidateScenes();
      })
      .catch(() => {});
    features.forEach((f, i) => {
      const { shot } = screenshotFor(f, theme);
      if (!shot) return;
      loader.load(shot.src, (img) => {
        if (cancelled) return;
        const tex = textures[i];
        tex.image = img;
        coverFit(tex, img.width / img.height, screenAspect);
        tex.needsUpdate = true;
      });
    });
    return () => {
      cancelled = true;
      textures.forEach((t) => t.dispose());
    };
  }, [features, theme, textures, screenAspect]);

  return textures;
}
