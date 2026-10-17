# Product screenshot inbox

Drop real LAS Mobility app screenshots here, then run `npm run screenshots:ingest`.

- `dark/<feature-id>.png|jpg|webp`: app in the **Dark** (graphite) theme
- `light/<feature-id>.png|jpg|webp`: app in the **Light** (white) theme
- Do not use the Navy, Black, Midnight or Amber themes.

Feature ids (from `data/feature-manifest.json`):
`dashboard`, `live-tracking`, `vehicles`, `vehicle-details`, `trips`, `routes`,
`telemetry`, `geofencing`, `immobilization`, `maintenance`, `expenses`, `reports`,
`alerts`, `documents`, `fuel`, `temperature`, `driver-identification`,
`rental-hub`, `franchise`, `subscriptions`, `mobile-app`.

Ingest converts each file to WebP in `public/product-screenshots/<theme>/` and
records it in `data/screenshot-manifest.json` with `"reviewed": false`. Check every
image for personal data (names, phone numbers, emails, customer records, exact
coordinates, white-label partner logos) before setting `"reviewed": true`. Unreviewed
images are not shown on the site.

Files in this folder are git-ignored; only the processed WebP files are committed.
