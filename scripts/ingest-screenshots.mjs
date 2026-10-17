// Converts uploaded app screenshots in screenshots-inbox/<theme>/<feature-id>.*
// into optimized WebP assets and records them in data/screenshot-manifest.json.
//
//   node scripts/ingest-screenshots.mjs [--mask=<feature>:<theme>:x,y,w,h[;x,y,w,h]]...
//
// --mask blurs regions (source pixels) for anything personal that slipped into
// a screenshot. New entries are written with "reviewed": false and are not shown
// on the site until a person has checked them and flipped the flag.
import sharp from "sharp";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const inbox = path.join(root, "screenshots-inbox");
const manifestPath = path.join(root, "data", "screenshot-manifest.json");
const { features } = JSON.parse(await readFile(path.join(root, "data", "feature-manifest.json"), "utf8"));
const known = new Set(features.map((f) => f.id));
const MAX_WIDTH = 2400;

const masks = {};
for (const arg of process.argv.slice(2).filter((a) => a.startsWith("--mask="))) {
  const [feature, theme, rects] = arg.slice(7).split(":");
  masks[`${feature}:${theme}`] = rects.split(";").map((r) => r.split(",").map(Number));
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8").catch(() => "{}"));
const done = [];
const ignored = [];

for (const theme of ["dark", "light"]) {
  const dir = path.join(inbox, theme);
  const files = await readdir(dir).catch(() => []);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const id = path.basename(file, path.extname(file));
    if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) continue;
    if (!known.has(id)) { ignored.push(`${theme}/${file} (unknown feature id)`); continue; }

    const input = await readFile(path.join(dir, file));
    const meta = await sharp(input).metadata();
    const overlays = [];
    for (const [left, top, width, height] of masks[`${id}:${theme}`] ?? []) {
      const patch = await sharp(input)
        .extract({ left, top, width: Math.min(width, meta.width - left), height: Math.min(height, meta.height - top) })
        .blur(10)
        .toBuffer();
      overlays.push({ input: patch, left, top });
    }
    const masked = overlays.length ? await sharp(input).composite(overlays).png().toBuffer() : input;
    const pipeline = sharp(masked).resize({ width: Math.min(meta.width, MAX_WIDTH), withoutEnlargement: true });
    const rel = `/product-screenshots/${theme}/${id}.webp`;
    const abs = path.join(root, "public", rel);
    await mkdir(path.dirname(abs), { recursive: true });
    const info = await pipeline.webp({ quality: 86, effort: 5 }).toFile(abs);

    const previous = manifest[id]?.[theme];
    manifest[id] = {
      ...(manifest[id] ?? {}),
      [theme]: {
        src: rel,
        width: info.width,
        height: info.height,
        origin: `screenshots-inbox/${theme}/${file}`,
        masked: overlays.length > 0,
        // Re-ingesting an identical upload keeps an earlier review.
        reviewed: previous?.origin === `screenshots-inbox/${theme}/${file}` && !overlays.length ? previous.reviewed ?? false : false,
        capturedAt: new Date().toISOString(),
      },
    };
    done.push(`${theme}/${id} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
  }
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`ingested ${done.length}:\n  ${done.join("\n  ") || "-"}`);
if (ignored.length) console.log(`ignored:\n  ${ignored.join("\n  ")}`);
