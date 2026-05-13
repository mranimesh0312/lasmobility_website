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
  phone:         z.string().min(6,  "Phone number must be at least 6 digits"),
  fleetSize:     z.string().min(1,  "Please select a fleet size"),
  businessType:  z.string().min(1,  "Please select a business type"),
  preferredDate: z.string().optional().default(""),
  preferredTime: z.string().optional().default(""),
  message:       z.string().optional().default(""),
  sourceUrl:     z.string().optional().default(""),
  website:       z.string().max(0).optional(), // honeypot — must be empty
});

/* ── Email HTML helpers ── */
function adminEmailHtml(d: z.infer<typeof schema>, ts: string): string {
  const rows = [
    ["Full Name",         d.fullName],
    ["Company",           d.companyName],
    ["Email",             d.email],
    ["Phone",             `${d.countryDial} ${d.phone}`],
    ["Fleet Size",        d.fleetSize],
    ["Business Type",     d.businessType],
    ["Preferred Date",    d.preferredDate || "—"],
    ["Preferred Time",    d.preferredTime || "—"],
    ["Message",           d.message || "—"],
    ["Source Page",       d.sourceUrl || "—"],
    ["Submitted At",      ts],
  ];
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#060E1A 0%,#0B1628 100%);padding:28px 32px">
      <p style="margin:0;font-size:22px;font-weight:700;color:#0ECECE;letter-spacing:-0.5px">LAS Mobility</p>
      <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.55)">New Demo Request</p>
    </td>
  </tr>
  <!-- Alert strip -->
  <tr>
    <td style="background:#0ECECE1A;border-bottom:1px solid #0ECECE33;padding:12px 32px">
      <p style="margin:0;font-size:13px;font-weight:600;color:#0a9a9a">
        📅 A new demo has been requested by <strong>${d.fullName}</strong> from <strong>${d.companyName}</strong>
      </p>
    </td>
  </tr>
  <!-- Fields table -->
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
  <!-- Footer -->
  <tr>
    <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb">
      <p style="margin:0;font-size:12px;color:#9ca3af">This is an automated message from the LAS Mobility demo request system. Reply directly to this email to respond to ${d.fullName}.</p>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function userConfirmationHtml(d: z.infer<typeof schema>): string {
  const firstName = d.fullName.split(" ")[0];
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#060E1A 0%,#0B1628 100%);padding:36px 32px;text-align:center">
      <p style="margin:0;font-size:26px;font-weight:700;color:#0ECECE;letter-spacing:-0.5px">LAS Mobility</p>
      <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.5)">AI-Powered Fleet Intelligence</p>
    </td>
  </tr>
  <!-- Confirmation message -->
  <tr>
    <td style="padding:36px 32px 24px">
      <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827">Hi ${firstName}, you&apos;re booked in! 🎉</p>
      <p style="margin:0;font-size:15px;line-height:1.7;color:#4b5563">
        Thanks for requesting a demo of LAS Mobility. We&apos;ve received your details and our team will reach out within <strong>one business day</strong> to confirm your demo session.
      </p>
    </td>
  </tr>
  <!-- What to expect -->
  <tr>
    <td style="padding:0 32px 28px">
      <div style="background:#f0fdf9;border:1px solid #a7f3d0;border-radius:10px;padding:20px 24px">
        <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.5px">What to expect in your demo</p>
        ${["A 30-minute personalised walkthrough of LAS Mobility","Live demonstration of features relevant to your fleet","Q&A with a fleet intelligence specialist","No obligation — entirely free"].map(item => `
        <p style="margin:0 0 8px;font-size:14px;color:#065f46;display:flex;align-items:center">
          <span style="color:#10b981;margin-right:8px;font-size:16px">✓</span> ${item}
        </p>`).join("")}
      </div>
    </td>
  </tr>
  <!-- Your submission summary -->
  <tr>
    <td style="padding:0 32px 28px">
      <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px">Your submission</p>
      ${[["Company",d.companyName],["Fleet Size",d.fleetSize],["Business Type",d.businessType],d.preferredDate ? ["Preferred Date",`${d.preferredDate}${d.preferredTime ? " at " + d.preferredTime : ""}`] : null].filter(Boolean).map(row => {
        const [label, value] = row as [string, string];
        return `<p style="margin:0 0 6px;font-size:13px;color:#374151"><span style="color:#9ca3af">${label}:</span> <strong>${value}</strong></p>`;
      }).join("")}
    </td>
  </tr>
  <!-- CTA -->
  <tr>
    <td style="padding:0 32px 36px;text-align:center">
      <a href="https://lasmobility.com" style="display:inline-block;background:#0ECECE;color:#060E1A;font-size:14px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none">Explore LAS Mobility →</a>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;text-align:center">
      <p style="margin:0 0 4px;font-size:12px;color:#9ca3af">Questions? Email us at <a href="mailto:support@lasmobility.com" style="color:#0ECECE;text-decoration:none">support@lasmobility.com</a></p>
      <p style="margin:0;font-size:12px;color:#9ca3af">© ${new Date().getFullYear()} LAS Mobility. All rights reserved.</p>
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

  // 4. Honeypot
  if (data.website) {
    // Silently succeed — don't let bots know they were caught
    return NextResponse.json({ success: true });
  }

  // 5. Send emails
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[book-demo] RESEND_API_KEY not set — email skipped");
    return NextResponse.json({ success: true });
  }

  const resend = new Resend(apiKey);
  const fromAddress = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const adminEmail  = process.env.ADMIN_EMAIL ?? "support@lasmobility.com";
  const ts = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "medium",
  });

  try {
    const [adminResult, userResult] = await Promise.all([
      resend.emails.send({
        from:    `LAS Mobility <${fromAddress}>`,
        to:      adminEmail,
        replyTo: data.email,
        subject: `New Demo Request — ${data.companyName} (${data.fullName})`,
        html:    adminEmailHtml(data, ts),
      }),
      resend.emails.send({
        from:    `LAS Mobility <${fromAddress}>`,
        to:      data.email,
        subject: `Your LAS Mobility demo is confirmed, ${data.fullName.split(" ")[0]}!`,
        html:    userConfirmationHtml(data),
      }),
    ]);

    if (adminResult.error || userResult.error) {
      const err = adminResult.error ?? userResult.error;
      console.error("[book-demo] Resend error:", err);
      return NextResponse.json({ error: "Failed to send confirmation email. Please try again." }, { status: 500 });
    }

    console.info(`[book-demo] Emails sent for ${data.email} at ${ts}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[book-demo] Unexpected error:", err);
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
