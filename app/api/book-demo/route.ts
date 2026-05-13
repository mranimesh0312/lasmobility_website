import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

/* ── Rate-limit store (in-memory; swap for Redis/Upstash in multi-instance prod) ── */
const rlMap = new Map<string, { count: number; windowStart: number }>();
const RL_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RL_MAX = 5; // 5 submissions per IP per hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rlMap.get(ip);
  if (!entry || now - entry.windowStart > RL_WINDOW_MS) {
    rlMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RL_MAX) return false;
  entry.count++;
  return true;
}

/* ── Validation schema ── */
const schema = z.object({
  fullName:      z.string().min(2,  "Full name must be at least 2 characters"),
  companyName:   z.string().min(1,  "Company name is required"),
  email:         z.string().email("Please enter a valid email"),
  countryDial:   z.string().default("+91"),
  countryName:   z.string().default(""),
  phone:         z.string().min(6,  "Phone number must be at least 6 digits"),
  fleetSize:     z.string().min(1,  "Please select a fleet size"),
  businessType:  z.string().min(1,  "Please select a business type"),
  preferredDate: z.string().optional().default(""),
  preferredTime: z.string().optional().default(""),
  message:       z.string().optional().default(""),
  sourceUrl:     z.string().optional().default(""),
  website:       z.string().max(0).optional(), // honeypot — must be empty
});

/* ── Email HTML ── */
function adminEmailHtml(d: z.infer<typeof schema>, ts: string): string {
  const phone = `${d.countryDial} ${d.phone}`;
  const country = d.countryName ? `${d.countryName} (${d.countryDial})` : d.countryDial;
  const preferredDemoTime =
    d.preferredDate
      ? `${d.preferredDate}${d.preferredTime ? " at " + d.preferredTime : ""}`
      : "—";

  const rows: [string, string][] = [
    ["Name",               d.fullName],
    ["Email",              d.email],
    ["Phone",              phone],
    ["Country",            country],
    ["Company",            d.companyName],
    ["Fleet Size",         d.fleetSize],
    ["Business Type",      d.businessType],
    ["Preferred Demo Time",preferredDemoTime],
    ["Message",            d.message || "—"],
    ["Source Page",        d.sourceUrl || "—"],
    ["Submitted At",       ts],
  ];

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
  <tr>
    <td style="background:linear-gradient(135deg,#060E1A 0%,#0B1628 100%);padding:28px 32px">
      <p style="margin:0;font-size:22px;font-weight:700;color:#0ECECE;letter-spacing:-0.5px">LAS Mobility</p>
      <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.55)">New Demo Request</p>
    </td>
  </tr>
  <tr>
    <td style="background:#0ECECE1A;border-bottom:1px solid #0ECECE33;padding:12px 32px">
      <p style="margin:0;font-size:13px;font-weight:600;color:#0a9a9a">
        📅 New demo requested by <strong>${d.fullName}</strong> from <strong>${d.companyName}</strong>
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:28px 32px">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        ${rows.map(([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:38%;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top">${label}</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111827;font-weight:500;word-break:break-word">${value}</td>
        </tr>`).join("")}
      </table>
    </td>
  </tr>
  <tr>
    <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb">
      <p style="margin:0;font-size:12px;color:#9ca3af">
        Automated message from LAS Mobility demo request system.
        Reply directly to this email to reach ${d.fullName} at ${d.email}.
      </p>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body></html>`;
}

/* ── POST handler ── */
export async function POST(req: NextRequest) {
  // 1. Rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in an hour." },
      { status: 429 }
    );
  }

  // 2. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // 3. Validate
  const result = schema.safeParse(body);
  if (!result.success) {
    const flat = result.error.flatten();
    const firstError = Object.values(flat.fieldErrors).flat()[0] ?? "Validation error.";
    return NextResponse.json({ error: firstError }, { status: 422 });
  }

  const data = result.data;

  // 4. Honeypot — silently succeed so bots don't learn they were blocked
  if (data.website) {
    return NextResponse.json({ success: true });
  }

  // 5. Send email via Resend
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[book-demo] RESEND_API_KEY not set — skipping email");
    // Still succeed so local dev without env vars doesn't break the form UX
    return NextResponse.json({ success: true });
  }

  const resend = new Resend(apiKey);
  const ts = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "medium",
  });

  try {
    const { error } = await resend.emails.send({
      from:    "LAS Mobility <onboarding@resend.dev>",
      to:      "support@lasmobility.com",
      replyTo: data.email,
      subject: `New Demo Request — ${data.companyName} (${data.fullName})`,
      html:    adminEmailHtml(data, ts),
    });

    if (error) {
      console.error("[book-demo] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send your request. Please try again or email us directly." },
        { status: 500 }
      );
    }

    console.info(`[book-demo] Email sent for ${data.email} at ${ts}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[book-demo] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
