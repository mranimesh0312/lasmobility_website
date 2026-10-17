// Captures REAL screenshots of the LAS Mobility fleet app for the website, in
// both the app's dark and light themes, masks personal data, and writes WebP
// assets + data/screenshot-manifest.json.
//
// Requirements: the Angular app (and its Go backend) running and reachable,
// and an AUTHORIZED DEMO account. Credentials are read from the environment
// only; never commit them.
//
//   FLEET_APP_URL=http://localhost:4200 \
//   FLEET_DEMO_EMAIL=... FLEET_DEMO_PASSWORD=... FLEET_DEMO_VEHICLE_ID=3 \
//   node scripts/capture-app-screenshots.mjs [--only=dashboard,trips] [--themes=dark,light]
//
// Optional: FLEET_FRANCHISE_EMAIL/PASSWORD (Rental Hub, Subscriptions),
// FLEET_PLATFORM_EMAIL/PASSWORD (Franchise management), FLEET_MOBILE_URL
// (fleet-mobile dev server, e.g. http://localhost:8100), CHROME_PATH.
//
// Masking is automatic but not infallible: every new capture is written with
// "reviewed": false. Look at each image before publishing it.
import { chromium } from "playwright-core";
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, "").split("=")));
const only = args.only ? new Set(args.only.split(",")) : null;
const themes = (args.themes ?? "dark,light").split(",");

const env = process.env;
const APP_URL = (env.FLEET_APP_URL ?? "http://localhost:4200").replace(/\/$/, "");
const MOBILE_URL = env.FLEET_MOBILE_URL?.replace(/\/$/, "");
const CHROME = env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ACCOUNTS = {
  user: { email: env.FLEET_DEMO_EMAIL, password: env.FLEET_DEMO_PASSWORD },
  franchise: { email: env.FLEET_FRANCHISE_EMAIL, password: env.FLEET_FRANCHISE_PASSWORD },
  platform: { email: env.FLEET_PLATFORM_EMAIL, password: env.FLEET_PLATFORM_PASSWORD },
};

// Blurred by CSS: identity chrome and grid columns that carry personal data.
const MASK_CSS = `
  app-header .user-name, app-header .user-info, app-header nz-avatar, .shell__header nz-avatar,
  .shell__header .user-name, [class*="user-menu"] [class*="name"],
  [col-id*="email"] .ag-cell-value, [col-id*="phone"] .ag-cell-value, [col-id*="mobile"] .ag-cell-value,
  [col-id*="driver"] .ag-cell-value, [col-id*="customer"] .ag-cell-value, [col-id*="contact"] .ag-cell-value,
  [col-id*="address"] .ag-cell-value, [col-id*="imei"] .ag-cell-value, [col-id*="owner"] .ag-cell-value,
  [col-id*="lat"] .ag-cell-value, [col-id*="lng"] .ag-cell-value, [col-id*="location"] .ag-cell-value,
  nz-avatar, .ant-avatar, .logo-partner
  { filter: blur(6px) !important; }
  /* account-state noise, not product: subscription lapse bar */
  .subscription-lapse-bar, vite-error-overlay { display: none !important; }
`;

// The app stores the theme on the ACCOUNT (ui_preferences.appearance.theme)
// and re-applies it after /auth/me, overriding localStorage. Rewrite it in the
// responses this browser receives so the requested theme is painted; nothing
// is written to the account.
function forceTheme(node, theme) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach((n) => forceTheme(n, theme));
  if ("ui_preferences" in node || ("email" in node && "account_type" in node)) {
    const prefs = node.ui_preferences && typeof node.ui_preferences === "object" ? node.ui_preferences : {};
    node.ui_preferences = { ...prefs, appearance: { ...(prefs.appearance ?? {}), theme } };
  }
  for (const v of Object.values(node)) forceTheme(v, theme);
}

// Read-only guarantee: every API write except the login itself is aborted,
// so a capture can never change data (or preferences) in the target system.
async function guardAndTheme(ctx, theme) {
  await ctx.route(/\/api\//, async (route) => {
    const req = route.request();
    const url = req.url();
    const isLogin = /\/auth\/(login|verify-otp|refresh)/.test(url);
    if (req.method() !== "GET" && !isLogin) return route.abort();
    if (!/\/auth\/(me|login|refresh)/.test(url)) return route.continue();
    const res = await route.fetch();
    let body = await res.text();
    try {
      const json = JSON.parse(body);
      forceTheme(json, theme);
      body = JSON.stringify(json);
    } catch { /* not JSON: pass through */ }
    const headers = { ...res.headers() };
    delete headers["content-length"];
    delete headers["content-encoding"];
    await route.fulfill({ status: res.status(), headers, body });
  });
}

// Skeletons/spinners still on screen mean the data has not arrived yet.
async function waitForSettled(page) {
  await page
    .waitForFunction(
      () => !document.querySelector("app-skeleton, .ant-skeleton-active, .ant-spin-spinning, .skeleton, [class*='skeleton--']"),
      null,
      { timeout: 30000, polling: 500 }
    )
    .catch(() => {});
}

// Replaced in text nodes: emails, phone numbers, coordinate pairs.
function scrubText() {
  const patterns = [
    /[\w.+-]+@[\w-]+\.[\w.]+/g,
    /\+?\d[\d\s-]{8,}\d/g,
    /-?\d{1,3}\.\d{4,},\s*-?\d{1,3}\.\d{4,}/g,
  ];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    let t = node.nodeValue;
    for (const p of patterns) t = t.replace(p, (m) => "\u2022".repeat(Math.min(m.length, 12)));
    if (t !== node.nodeValue) node.nodeValue = t;
  }
}

const manifestPath = path.join(root, "data", "screenshot-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8").catch(() => "{}"));
const { features } = JSON.parse(await readFile(path.join(root, "data", "feature-manifest.json"), "utf8"));

const report = { captured: [], skipped: [] };
let vehicleId = null;
const browser = await chromium.launch({ executablePath: CHROME });

async function signIn(page, account, mobile) {
  const base = mobile ? MOBILE_URL : APP_URL;
  await page.goto(`${base}/login`, { waitUntil: "domcontentloaded", timeout: 60000 });
  if (mobile) {
    await page.fill("input[name=identifier]", account.email);
    await page.fill("input[name=password]", account.password);
    await page.click("button[type=submit]");
    await page.waitForTimeout(6000);
  } else {
    await page.fill('input[formcontrolname="identifier"]', account.email);
    await page.fill('input[formcontrolname="password"]', account.password);
    // .btn-signin locally, .btn-primary on the current production build
    await page.click('form button[type="submit"]');
    await page.waitForURL("**/dashboard", { timeout: 45000 });
    await page.waitForTimeout(4000); // RBAC role data loads after the redirect
  }
}

// Read-only lookup of the first vehicle the demo account can see, used for the
// per-vehicle screens when FLEET_DEMO_VEHICLE_ID is not given.
async function discoverVehicleId(page) {
  return page.evaluate(async () => {
    const token = sessionStorage.getItem("fleet_token") || localStorage.getItem("fleet_token");
    const res = await fetch("/api/v1/vehicles?pageNum=1&pageSize=1", { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return null;
    const body = await res.json();
    const data = body?.data ?? body;
    const rows = Array.isArray(data) ? data : data?.data ?? data?.vehicles ?? [];
    return rows[0]?.id ? String(rows[0].id) : null;
  });
}

for (const theme of themes) {
  const sessions = new Map();
  for (const f of features) {
    if (only && !only.has(f.id)) continue;
    const mobile = f.app === "mobile";
    // Franchise screens are tried with the user account when no franchise
    // login is configured; a redirect to /no-access is reported as a skip.
    const account = ACCOUNTS[f.tier]?.email || f.tier !== "franchise" ? ACCOUNTS[f.tier] : ACCOUNTS.user;
    const why =
      !account?.email || !account?.password ? `no ${f.tier} demo credentials in env` :
      mobile && !MOBILE_URL ? "FLEET_MOBILE_URL not set" : null;
    if (why) { report.skipped.push(`${f.id} (${theme}): ${why}`); continue; }

    const key = `${f.tier}:${mobile}`;
    let page = sessions.get(key);
    try {
      if (!page) {
        const ctx = await browser.newContext(
          mobile
            ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true }
            : { viewport: { width: 1600, height: 960 }, deviceScaleFactor: 1.5 }
        );
        await ctx.addInitScript((t) => localStorage.setItem("las_mobility_theme", t), theme);
        await guardAndTheme(ctx, theme);
        page = await ctx.newPage();
        try {
          await signIn(page, account, mobile);
        } catch (err) {
          // Never retry a failed login per feature: that hammers the auth
          // endpoint (rate limits / lockout). Stop the whole run instead.
          await page.screenshot({ path: path.join(root, "capture-login-failure.png") }).catch(() => {});
          console.error(`Sign-in failed for ${f.tier}${mobile ? " (mobile)" : ""}: ${err.message.split("\n")[0]}`);
          console.error("See capture-login-failure.png. Aborting.");
          await browser.close();
          process.exit(1);
        }
        sessions.set(key, page);
      }
      if (f.appRoute.includes(":vehicleId") && !vehicleId) {
        vehicleId = env.FLEET_DEMO_VEHICLE_ID ?? (await discoverVehicleId(page));
        if (!vehicleId) throw new Error("no vehicle visible to the demo account (set FLEET_DEMO_VEHICLE_ID)");
      }
      const route = f.appRoute.replace(":vehicleId", vehicleId ?? "");
      await page.goto(`${mobile ? MOBILE_URL : APP_URL}${route}`, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForSelector(f.waitFor, { timeout: 30000 });
      await waitForSettled(page);
      await page.waitForTimeout(3000); // chart animations, map tiles
      if (/\/no-access|\/login/.test(page.url())) throw new Error(`redirected to ${page.url()}`);
      await page.addStyleTag({ content: MASK_CSS });
      await page.evaluate(scrubText);
      await page.waitForTimeout(300);

      const png = await page.screenshot({ type: "png" });
      const img = sharp(png);
      const meta = await img.metadata();
      const rel = `/product-screenshots/${theme}/${f.id}.webp`;
      const abs = path.join(root, "public", rel);
      await mkdir(path.dirname(abs), { recursive: true });
      await img.webp({ quality: 86, effort: 5 }).toFile(abs);
      manifest[f.id] = {
        ...(manifest[f.id] ?? {}),
        [theme]: { src: rel, width: meta.width, height: meta.height, origin: `${mobile ? "fleet-mobile" : "fleet-app"}${route}`, masked: true, reviewed: false, capturedAt: new Date().toISOString() },
      };
      report.captured.push(`${f.id} (${theme})`);
    } catch (err) {
      report.skipped.push(`${f.id} (${theme}): ${err.message.split("\n")[0]}`);
    }
  }
  for (const p of sessions.values()) await p.context().close();
}

await browser.close();
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`captured ${report.captured.length}:`, report.captured.join(", ") || "-");
console.log(`skipped ${report.skipped.length}:\n  ` + (report.skipped.join("\n  ") || "-"));
if (report.captured.length) console.log('\nReview every new image, then set "reviewed": true in data/screenshot-manifest.json.');
