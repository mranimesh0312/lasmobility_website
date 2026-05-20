import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const rlMap = new Map<string, { count: number; windowStart: number }>();
const RL_WINDOW_MS = 60 * 60 * 1000;
const RL_MAX = 5;

const ADMIN_RECIPIENTS = [
  "animesh@lasmobility.com",
  "lokesh@lasmobility.com",
  "ashish@lasmobility.com"
];

const INSTAGRAM_URL = "https://www.instagram.com/lasmobility?igsh=MWptcjhza25udmgzbw%3D%3D&utm_source=qr";
const LINKEDIN_URL = "https://www.linkedin.com/company/lasmobility/";

type GraphRecipient = {
  emailAddress: {
    address: string;
  };
};

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

const schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Please enter a valid email"),
  countryDial: z.string().default("+91"),
  countryName: z.string().default(""),
  phone: z.string().min(6, "Phone number must be at least 6 digits"),
  fleetSize: z.string().min(1, "Please select a fleet size"),
  businessType: z.string().min(1, "Please select a business type"),
  preferredDate: z.string().optional().default(""),
  preferredTime: z.string().optional().default(""),
  message: z.string().optional().default(""),
  sourceUrl: z.string().optional().default(""),
  website: z.string().optional().default("")
});

type DemoRequest = z.infer<typeof schema>;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function readString(record: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string") {
      return value.trim();
    }
  }
  return "";
}

function normalizeDate(value: string) {
  const trimmed = value.trim();
  const ddmmyyyy = /^(\d{2})-(\d{2})-(\d{4})$/.exec(trimmed);
  if (ddmmyyyy) {
    return `${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`;
  }
  return trimmed;
}

function normalizePayload(body: unknown) {
  const record = asRecord(body);
  return {
    fullName: readString(record, "fullName", "name"),
    companyName: readString(record, "companyName", "company"),
    email: readString(record, "email"),
    countryDial: readString(record, "countryDial") || "+91",
    countryName: readString(record, "countryName"),
    phone: readString(record, "phone").replace(/[^\d+\-\s()]/g, ""),
    fleetSize: readString(record, "fleetSize"),
    businessType: readString(record, "businessType"),
    preferredDate: normalizeDate(readString(record, "preferredDate")),
    preferredTime: readString(record, "preferredTime"),
    message: readString(record, "message"),
    sourceUrl: readString(record, "sourceUrl"),
    website: readString(record, "website")
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPhone(data: DemoRequest) {
  return `${data.countryDial} ${data.phone}`;
}

function formatPreferredDemo(data: DemoRequest) {
  if (!data.preferredDate) return "Not specified";
  return `${data.preferredDate}${data.preferredTime ? ` at ${data.preferredTime}` : ""}`;
}

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://lasmobility.com").replace(/\/$/, "");
}

function emailShell(content: string) {
  const siteUrl = getSiteUrl();
  const logoUrl = `${siteUrl}/brand/logo-dark.png`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f3f7fb;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f3f7fb;padding:28px 14px;">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" role="presentation" style="max-width:640px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 18px 60px rgba(15,23,42,0.12);">
          <tr>
            <td style="background:linear-gradient(135deg,#06152b 0%,#082f49 100%);padding:26px 32px;">
              <img src="${logoUrl}" width="190" alt="LAS Mobility" style="display:block;max-width:190px;height:auto;" />
              <p style="margin:14px 0 0;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:#67e8f9;font-weight:700;">AI-Powered Fleet Intelligence</p>
            </td>
          </tr>
          ${content}
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;">
              <p style="margin:0;font-size:12px;line-height:20px;color:#64748b;">
                LAS Mobility &bull; Real-time tracking, fleet intelligence, driver safety, and analytics.
                For help, contact <a href="mailto:support@lasmobility.com" style="color:#0891b2;text-decoration:none;font-weight:700;">support@lasmobility.com</a>.
              </p>
              <table cellpadding="0" cellspacing="0" role="presentation" style="margin-top:14px;">
                <tr>
                  <td>
                    <a href="${INSTAGRAM_URL}" style="display:inline-block;text-decoration:none;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:9px 12px;color:#0891b2;font-size:12px;font-weight:800;">
                      <span style="font-size:14px;vertical-align:-1px;">&#9673;</span>&nbsp; Instagram
                    </a>
                  </td>
                  <td style="width:10px;"></td>
                  <td>
                    <a href="${LINKEDIN_URL}" style="display:inline-block;text-decoration:none;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:9px 12px;color:#0891b2;font-size:12px;font-weight:800;">
                      <span style="font-size:14px;vertical-align:-1px;">in</span>&nbsp; LinkedIn
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function acknowledgementEmailHtml(data: DemoRequest) {
  const firstName = escapeHtml(data.fullName.trim().split(/\s+/)[0] || data.fullName);
  const company = escapeHtml(data.companyName);

  return emailShell(`
    <tr>
      <td style="padding:34px 32px 18px;">
        <h1 style="margin:0;font-size:28px;line-height:36px;color:#06152b;">Thank you for booking a LAS Mobility demo</h1>
        <p style="margin:16px 0 0;font-size:16px;line-height:26px;color:#475569;">
          Hi ${firstName}, we have received your demo request for <strong>${company}</strong>. Our fleet intelligence team will review your requirements and contact you within one business day.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#ecfeff;border:1px solid #a5f3fc;border-radius:14px;">
          <tr>
            <td style="padding:20px;">
              <p style="margin:0;font-size:14px;font-weight:700;color:#0e7490;">What happens next?</p>
              <ul style="margin:12px 0 0;padding-left:20px;color:#334155;font-size:14px;line-height:24px;">
                <li>We will understand your fleet size, business type, and operating goals.</li>
                <li>We will schedule a personalized walkthrough of relevant LAS Mobility capabilities.</li>
                <li>You will see how live tracking, alerts, analytics, and AI insights fit your operation.</li>
              </ul>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0 32px 34px;">
        <a href="${getSiteUrl()}" style="display:inline-block;background:#06b6d4;color:#06152b;text-decoration:none;font-weight:800;font-size:14px;padding:13px 20px;border-radius:10px;">Visit LAS Mobility</a>
      </td>
    </tr>
  `);
}

function adminEmailHtml(data: DemoRequest, submittedAt: string) {
  const country = data.countryName ? `${data.countryName} (${data.countryDial})` : data.countryDial;
  const rows: [string, string][] = [
    ["Name", data.fullName],
    ["Company", data.companyName],
    ["Email", data.email],
    ["Phone", formatPhone(data)],
    ["Country", country],
    ["Fleet Size", data.fleetSize],
    ["Business Type", data.businessType],
    ["Preferred Demo Time", formatPreferredDemo(data)],
    ["Message", data.message || "Not provided"],
    ["Source Page", data.sourceUrl || "Not captured"],
    ["Submitted At", submittedAt]
  ];

  return emailShell(`
    <tr>
      <td style="padding:30px 32px 12px;">
        <h1 style="margin:0;font-size:26px;line-height:34px;color:#06152b;">New Book Demo Request</h1>
        <p style="margin:12px 0 0;font-size:15px;line-height:24px;color:#475569;">
          A new prospect submitted the LAS Mobility demo form. Full details are below.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 32px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
          ${rows
            .map(
              ([label, value], index) => `
                <tr style="background:${index % 2 === 0 ? "#ffffff" : "#f8fafc"};">
                  <td style="width:34%;padding:13px 16px;border-bottom:1px solid #e2e8f0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:800;color:#64748b;vertical-align:top;">${escapeHtml(label)}</td>
                  <td style="padding:13px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;line-height:22px;font-weight:600;color:#0f172a;word-break:break-word;">${escapeHtml(value)}</td>
                </tr>`
            )
            .join("")}
        </table>
        <p style="margin:18px 0 0;font-size:13px;color:#64748b;">
          Reply to this email thread or contact the client directly at
          <a href="mailto:${escapeHtml(data.email)}" style="color:#0891b2;text-decoration:none;font-weight:800;">${escapeHtml(data.email)}</a>.
        </p>
      </td>
    </tr>
  `);
}

async function getGraphAccessToken() {
  const tenantId = process.env.MICROSOFT_GRAPH_TENANT_ID;
  const clientId = process.env.MICROSOFT_GRAPH_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_GRAPH_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Microsoft Graph email environment variables are not configured.");
  }

  const response = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials"
    })
  });

  const payload = await response.json();

  if (!response.ok || !payload.access_token) {
    console.error("[book-demo] Graph token error:", payload);
    throw new Error("Could not authenticate Microsoft Graph mail client.");
  }

  return payload.access_token as string;
}

async function sendGraphMail(params: {
  token: string;
  subject: string;
  html: string;
  to: string[];
  replyTo?: string;
}) {
  const fromEmail = process.env.MICROSOFT_GRAPH_FROM_EMAIL || "support@lasmobility.com";
  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(fromEmail)}/sendMail`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: {
        subject: params.subject,
        body: {
          contentType: "HTML",
          content: params.html
        },
        toRecipients: params.to.map<GraphRecipient>((address) => ({
          emailAddress: { address }
        })),
        ...(params.replyTo
          ? {
              replyTo: [
                {
                  emailAddress: {
                    address: params.replyTo
                  }
                }
              ]
            }
          : {})
      },
      saveToSentItems: true
    })
  });

  if (response.status !== 202) {
    const errorText = await response.text();
    console.error("[book-demo] Graph sendMail error:", response.status, errorText);
    throw new Error("Microsoft Graph could not send email.");
  }
}

export async function POST(req: NextRequest) {
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

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = schema.safeParse(normalizePayload(body));
  if (!result.success) {
    const flat = result.error.flatten();
    const firstError = Object.values(flat.fieldErrors).flat()[0] ?? "Validation error.";
    console.warn("[book-demo] validation failed:", flat.fieldErrors);
    return NextResponse.json({ error: firstError }, { status: 422 });
  }

  const data = result.data;

  if (data.website) {
    return NextResponse.json({ success: true });
  }

  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "medium"
  });

  try {
    const token = await getGraphAccessToken();

    await Promise.all([
      sendGraphMail({
        token,
        to: [data.email],
        subject: "Your LAS Mobility demo request has been received",
        html: acknowledgementEmailHtml(data)
      }),
      sendGraphMail({
        token,
        to: ADMIN_RECIPIENTS,
        replyTo: data.email,
        subject: `New LAS Mobility Demo Request - ${data.companyName} (${data.fullName})`,
        html: adminEmailHtml(data, submittedAt)
      })
    ]);

    console.info(`[book-demo] Graph emails sent for ${data.email} at ${submittedAt}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[book-demo] Email send failed:", err);

    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({
        success: true,
        warning: "Email service is not configured locally. Request accepted without sending mail."
      });
    }

    return NextResponse.json(
      { error: "Failed to send your request. Please try again or email support@lasmobility.com." },
      { status: 500 }
    );
  }
}
