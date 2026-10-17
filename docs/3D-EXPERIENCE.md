# 3D experience: architecture and operations

The homepage is a scroll-driven 3D story plus interactive product demos, built
into the existing Next.js App Router site. This document is for developers
maintaining it.

## Stack

| Concern | Library | Notes |
|---|---|---|
| 3D | `three` 0.170, `@react-three/fiber` 9, `@react-three/drei` 10, `@react-three/postprocessing` 3 | R3F v9 is required: the App Router runs Next's vendored React 19, so R3F v8 crashes (`ReactCurrentOwner`). `react`/`react-dom` are declared as 19.1 to match. |
| Scroll | `gsap` + `ScrollTrigger`, `lenis` | Lenis is global (`components/animations/SmoothScroll.tsx`), driven by GSAP's ticker. Off with reduced motion. |
| State | `zustand` (`stores/experienceStore.ts`) | Scroll progress, paint, lighting, lamps, hotspot focus, zoom, quality tier. |
| Reveal animation | `framer-motion` (already in the project) | `components/animations/MotionReveal.tsx`. |
| Maps | `maplibre-gl` + OpenFreeMap tiles | Same engine and tile provider as the fleet app. No API key. |
| Styling | Tailwind (existing) + SCSS modules for new components | New components use the **LAS Mobility app's own SCSS tokens** (see below). |

`react-simple-maps` declares React <= 18 as a peer; `package.json` `overrides`
points it at the project React instead of using `--legacy-peer-deps`.

## Design tokens

`styles/las/_variables.scss` and `styles/las/_mixins.scss` are verbatim copies of
`Fleet_Management_Lasmobility/frontend-angular/src/styles/` (commit `c47f85ad`).
Re-copy them when the app changes; do not edit them here.

`styles/las/_theme-properties.scss` holds the app's CSS custom properties
(`:root`, dark, light), generated from the app's `_themes.scss`. It deliberately
**omits** `--bg-card`, `--text-primary`, `--text-secondary`, `--text-muted`: the
website already owns those names (1,000+ usages, navy palette), so `$color-surface`
and `$color-text-*` resolve to the website values. Emitted globally by
`app/las-tokens.scss`.

## Homepage composition (`app/page.tsx`)

1. `HomeExperience` picks the story for the device:
   - **Cinematic** (`ScrollStory`): >= 1024 px, fine pointer, motion allowed,
     WebGL available and the device is not low tier.
   - **Static** (`StoryStatic`): phones, tablets, reduced motion, weak GPUs. No
     pinning; a tap-to-rotate 3D vehicle and readable chapter sections.
   - The server renders `StageShell` (hero copy, no WebGL) for first paint and SEO.
2. `AppReplica` (`components/replica/`): an interactive recreation of the
   LAS Mobility web app (sidebar menu, product switcher, module search with
   `/`, Ask AI, notifications, theme) with 13 working screens: Dashboard, Live
   Tracking, Vehicles, Vehicle Details (live/history, immobilize flow), Trips
   (replay), Alerts (rules drawer), Fuel, Temperature, Maintenance, Drivers,
   Reports, AI Insights, Rental Hub. Geofence, Documents and Expenses open a
   module overview. Data: `data/appReplicaData.ts` (deterministic demo fleet,
   DEMO-xxx plates, numbered drivers, synthetic Bengaluru routes). Tokens are
   the app's graphite/light theme, scoped to `.app`. No product screenshots.
   `ProductShowcase` and `FeatureDemos` are no longer on the homepage.
3. Existing sections follow unchanged.

## The scroll story

- `components/three/storyMath.ts`: the timeline. Progress 0..1 maps to a
  chapter float 0..8. `CAMERA_KEYS` are spherical (azimuth, elevation, radius
  around a target), so moves orbit the car instead of cutting through it.
  `sceneMix()` derives every layer's weight (studio, road, GPS, telemetry,
  twin, laptop, night) from the chapter float. That is why scrolling backwards
  replays exactly in reverse.
- Copy sits left or right of the stage; camera targets are offset along the
  camera's right vector `(sin az, 0, -cos az)` so the car never sits under text.
- `ScrollStory.tsx` pins the stage for `8 x 0.7 x 100vh` (`STEP_VH`), writes
  progress to the store, fades copy panels and scrims, and calls
  `invalidateScenes()`.
- Navigation: the stage settles on the nearest chapter when scrolling stops
  (`scrollEnd`), Arrow/Page keys and Space step one chapter while pinned, the
  bottom bar shows chapter N/9 with previous/next and "Skip intro", and the
  rail lists every chapter on hover.
- Header: the story sits under the sticky header (`--site-header-h`, published
  by `Navbar`) and sets `<html data-header-tone="dark">` while it is under it,
  so the header uses its dark palette in both site themes. The header never
  hides or changes height while scrolling, because that would shift every
  ScrollTrigger position.
- Hero: `HeroCards` (live cards around the car) and the configurator dock sit in
  their own layer that fades with the hero copy.
- Laptop screens and the static story's screen frames are drawn by
  `components/three/drawAppScreen.ts` (same look as the replica). A reviewed
  real screenshot, if one is added to the manifest, still takes precedence.
- `StoryScene.tsx` composes the layers. `RuntimeDriver` (first child) advances a
  mutable runtime once per frame; `FrameDriver` (last child) requests another
  frame only while something is still moving. Scrolling never re-renders React.

### Rendering budget

- `frameloop="demand"`; frames are requested by scroll, interaction, or a layer
  that is still animating (road, GPS pulses, damping). A static hero idles at 0 fps.
- The canvas switches to `frameloop="never"` when offscreen or the tab is hidden.
- Quality tier (`hooks/useDeviceQuality.ts`): `high` = DPR <= 2, bloom/SMAA/
  vignette, reflective floor; `medium` = DPR <= 1.5, no postprocessing; `low` =
  DPR 1, reduced geometry. `PerformanceMonitor` steps down when frames drop.
  Override for QA: `?quality=low|medium|high`.
- Every 3D component disposes the geometries, materials and textures it creates;
  R3F disposes the renderer and forces context loss on unmount.
- 3D, maps and each demo are separate dynamic chunks, loaded only when needed.

## The vehicle model

`components/three/VehicleModel.tsx` is a **procedural placeholder**: extruded side
profiles with creased normals (so clearcoat reflections stay clean), tinted glass,
lathe-profile tyres, alloy wheels, brake discs, emissive lamps, indicators, plus an
x-ray digital-twin mode with clickable component nodes. Variants: SUV, sedan, van
(`vehicleSpecs.ts`).

### Production asset requirement (open)

A commercially licensed, optimised GLB is still needed for true photorealism.
Requirements:

- Licence that covers web use on lasmobility.com (attach the licence file to the repo).
- glTF 2.0 binary, Draco or Meshopt compressed, KTX2 textures, ideally < 6 MB.
- Separate, named meshes/materials for: body paint (`Paint`), glass, wheels
  (four nodes, for spin), headlights, tail lights, indicators.
- Real-world scale in metres, +X forward, wheels on y = 0.

To integrate: put it in `public/models/`, then replace `<VehicleModel>` in
`StoryScene.tsx` with a `useGLTF` loader that maps the named parts onto the same
`VehicleAnimState` (paint colour, wheel spin, lamp intensity, twin opacity).
`componentPositions()` must be re-measured against the new mesh.

## Product screenshots

Only **real** screenshots of the LAS Mobility app are shown, and only after a
person has reviewed them. Missing screens render a labelled "pending capture" slot.

- `data/feature-manifest.json`: the 21 product screens, with real Angular routes.
- `data/screenshot-manifest.json`: captured assets per theme, `reviewed` flag.
- Themes: **Dark** (graphite) and **Light** only. The site shows the capture that
  matches the visitor's theme.

Two ways to add them:

1. **Upload**: drop files into `screenshots-inbox/dark|light/<feature-id>.png`
   and run `npm run screenshots:ingest` (optionally `--mask=<id>:<theme>:x,y,w,h`).
2. **Capture**: `npm run screenshots:capture` with `FLEET_APP_URL`,
   `FLEET_DEMO_EMAIL`, `FLEET_DEMO_PASSWORD` (and optionally franchise/platform
   accounts, `FLEET_MOBILE_URL`). The run is read-only by construction: every
   non-GET API call except login is aborted. The account's saved theme is
   overridden only inside the capture browser. Known gap: the dashboard
   loads its widgets via POST, so it stays on skeletons under the guard;
   capture that screen by upload.

Then review each image for personal data and set `"reviewed": true`.

## Bundle impact (production build)

Homepage first-load JS: 177 kB. Heavy code is lazy: three.js chunk 166 kB gz
(when a 3D surface mounts), MapLibre 202 kB gz (when a map demo opens),
postprocessing 77 kB gz (high tier only).

## Testing notes

- Headless Chrome uses software WebGL, which maps to the `low` tier and the
  static story; add `?quality=medium` to exercise the cinematic story. Visual
  quality on real GPUs (bloom, reflections, DPR 2) was not checked headlessly.
- Verified with Playwright against `next dev`:
  - cinematic story: all 9 chapters forward and in reverse at 1440, 1280
    (light) and 1024 px; hotspot focus, paint / day-night / headlights /
    hazards / zoom, drag-rotate, chapter-rail navigation;
  - every demo's interaction (play, geofence alert, immobilize flow, twin
    component select, driver ID, rental selection, report period) at 1440 px
    dark and light and at 390 px;
  - no horizontal overflow and no escaping elements at 360, 390, 768, 1024,
    1280, 1440 px in both themes; no page errors;
  - global Lenis + scroll-aware navbar on 5 other pages, route changes land at
    the top, Book Demo modal scrolls internally while the page is locked.
- `next build` passes. `npm run lint` is not configured in this repo (Next
  prompts for setup); a temporary `next/core-web-vitals` run reported no issues
  in the new code (pre-existing `react/no-unescaped-entities` errors remain in
  older pages).
