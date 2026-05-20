import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

const rlMap = new Map<string, { count: number; windowStart: number }>();
const RL_WINDOW_MS = 60 * 60 * 1000;
const RL_MAX = 3;
const CAREER_RECIPIENTS = ["animesh@lasmobility.com", "ashish@lasmobility.com"];
const SUPPORT_EMAIL = "support@lasmobility.com";
const LOGO_CONTENT_ID = "las-mobility-logo";

type GraphRecipient = {
  emailAddress: {
    address: string;
  };
};

type GraphAttachment = {
  "@odata.type": "#microsoft.graph.fileAttachment";
  name: string;
  contentType: string;
  contentBytes: string;
  isInline?: boolean;
  contentId?: string;
};

type ApplicationFields = {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  experience: string;
  currentCompany: string;
  currentLocation: string;
  linkedin: string;
  portfolio: string;
  noticePeriod: string;
  expectedSalary: string;
  coverLetter: string;
  submittedAt: string;
  resumeName: string;
  resumeType: string;
  resumeSize: string;
};

const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const MAX_FILE_BYTES = 5 * 1024 * 1024;

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

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function emailShell(content: string) {
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
              <img src="cid:${LOGO_CONTENT_ID}" width="190" alt="LAS Mobility" style="display:block;max-width:190px;height:auto;" />
              <p style="margin:14px 0 0;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:#67e8f9;font-weight:700;">AI-Powered Fleet Intelligence</p>
            </td>
          </tr>
          ${content}
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;">
              <p style="margin:0;font-size:12px;line-height:20px;color:#64748b;">
                LAS Mobility &bull; Real-time tracking, fleet intelligence, driver safety, and analytics.
                For help, contact <a href="mailto:${SUPPORT_EMAIL}" style="color:#0891b2;text-decoration:none;font-weight:700;">${SUPPORT_EMAIL}</a>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function getInlineLogoAttachment(): Promise<GraphAttachment> {
  const logoPath = path.join(process.cwd(), "public", "brand", "logo-dark.png");
  const logoBuffer = await readFile(logoPath);

  return {
    "@odata.type": "#microsoft.graph.fileAttachment",
    name: "las-mobility-logo.png",
    contentType: "image/png",
    contentBytes: logoBuffer.toString("base64"),
    isInline: true,
    contentId: LOGO_CONTENT_ID,
  };
}

function acknowledgementEmailHtml(fields: ApplicationFields) {
  const candidateName = escapeHtml(fields.fullName);
  const jobTitle = escapeHtml(fields.jobTitle);

  return emailShell(`
    <tr>
      <td style="padding:34px 32px 18px;">
        <h1 style="margin:0;font-size:28px;line-height:36px;color:#06152b;">Thank you for applying to LAS Mobility</h1>
        <p style="margin:16px 0 0;font-size:16px;line-height:26px;color:#475569;">Dear ${candidateName},</p>
        <p style="margin:14px 0 0;font-size:16px;line-height:26px;color:#475569;">
          Thank you for applying for the <strong>${jobTitle}</strong> position at LAS Mobility.
        </p>
        <p style="margin:14px 0 0;font-size:16px;line-height:26px;color:#475569;">
          We have received your application and our team will review your profile. If your experience matches the role requirements, we will get back to you shortly.
        </p>
        <p style="margin:14px 0 0;font-size:16px;line-height:26px;color:#475569;">
          Thank you for your interest in joining LAS Mobility.
        </p>
        <p style="margin:22px 0 0;font-size:16px;line-height:26px;color:#475569;">
          Regards,<br />
          <strong>LAS Mobility Team</strong><br />
          <a href="mailto:${SUPPORT_EMAIL}" style="color:#0891b2;text-decoration:none;font-weight:700;">${SUPPORT_EMAIL}</a>
        </p>
      </td>
    </tr>
  `);
}

function internalEmailHtml(fields: ApplicationFields) {
  const rows = [
    ["Candidate Name", fields.fullName],
    ["Email", fields.email],
    ["Phone", fields.phone],
    ["Position Applied For", fields.jobTitle],
    ["Experience", fields.experience],
    ["Current Company", fields.currentCompany],
    ["Current Location", fields.currentLocation],
    ["LinkedIn Profile", fields.linkedin],
    ["Portfolio / GitHub Link", fields.portfolio],
    ["Notice Period", fields.noticePeriod],
    ["Expected Salary", fields.expectedSalary],
    ["Cover Letter / Message", fields.coverLetter],
    ["Resume File Name", fields.resumeName],
    ["Resume File Type", fields.resumeType],
    ["Resume File Size", fields.resumeSize],
    ["Application Submitted", fields.submittedAt],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return emailShell(`
    <tr>
      <td style="padding:30px 32px 12px;">
        <h1 style="margin:0;font-size:26px;line-height:34px;color:#06152b;">New Career Application Received</h1>
        <p style="margin:12px 0 0;font-size:15px;line-height:24px;color:#475569;">
          A candidate submitted an application through the LAS Mobility careers page. Full details are below.
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
                  <td style="padding:13px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;line-height:22px;font-weight:600;color:#0f172a;word-break:break-word;">${escapeHtml(value).replaceAll("\n", "<br />")}</td>
                </tr>`
            )
            .join("")}
        </table>
        <p style="margin:18px 0 0;font-size:13px;color:#64748b;">
          Resume is attached when available. Reply to this email thread or contact the candidate directly at
          <a href="mailto:${escapeHtml(fields.email)}" style="color:#0891b2;text-decoration:none;font-weight:800;">${escapeHtml(fields.email)}</a>.
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
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
  });

  const payload = await response.json();

  if (!response.ok || !payload.access_token) {
    console.error("[apply] Graph token error:", payload);
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
  attachments?: GraphAttachment[];
}) {
  const fromEmail = process.env.MICROSOFT_GRAPH_FROM_EMAIL || SUPPORT_EMAIL;
  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(fromEmail)}/sendMail`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        subject: params.subject,
        body: {
          contentType: "HTML",
          content: params.html,
        },
        toRecipients: params.to.map<GraphRecipient>((address) => ({
          emailAddress: { address },
        })),
        ...(params.replyTo
          ? {
              replyTo: [
                {
                  emailAddress: {
                    address: params.replyTo,
                  },
                },
              ],
            }
          : {}),
        ...(params.attachments?.length ? { attachments: params.attachments } : {}),
      },
      saveToSentItems: true,
    }),
  });

  if (response.status !== 202) {
    const errorText = await response.text();
    console.error("[apply] Graph sendMail error:", response.status, errorText);
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
      { error: "Too many applications submitted. Please try again in an hour." },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const fullName = getString(formData, "fullName");
  const email = getString(formData, "email");
  const phone = getString(formData, "phone");
  const jobTitle = getString(formData, "jobTitle");
  const linkedin = getString(formData, "linkedin");
  const portfolio = getString(formData, "portfolio");
  const coverLetter = getString(formData, "coverLetter");
  const experience = getString(formData, "experience");
  const currentCompany = getString(formData, "currentCompany");
  const currentLocation = getString(formData, "currentLocation");
  const noticePeriod = getString(formData, "noticePeriod");
  const expectedSalary = getString(formData, "expectedSalary");

  if (!fullName || fullName.length < 2) {
    return NextResponse.json({ error: "Full name is required (min 2 characters)." }, { status: 422 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 422 });
  }
  if (!phone || phone.length < 6) {
    return NextResponse.json({ error: "A valid phone number is required." }, { status: 422 });
  }
  if (!jobTitle) {
    return NextResponse.json({ error: "Job title is required." }, { status: 422 });
  }

  const resumeEntry = formData.get("resume");
  if (!resumeEntry || !(resumeEntry instanceof File)) {
    return NextResponse.json({ error: "A resume file is required." }, { status: 422 });
  }

  const file = resumeEntry as File;

  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { error: "Only PDF, DOC, and DOCX files are accepted." },
      { status: 422 }
    );
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      { error: `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum allowed size is 5 MB.` },
      { status: 422 }
    );
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "medium",
  });

  const fields: ApplicationFields = {
    fullName,
    email,
    phone,
    jobTitle,
    experience,
    currentCompany,
    currentLocation,
    linkedin,
    portfolio,
    noticePeriod,
    expectedSalary,
    coverLetter,
    submittedAt,
    resumeName: file.name,
    resumeType: file.type || "application/octet-stream",
    resumeSize: formatBytes(file.size),
  };

  try {
    const token = await getGraphAccessToken();
    const logoAttachment = await getInlineLogoAttachment();
    const resumeAttachment: GraphAttachment = {
      "@odata.type": "#microsoft.graph.fileAttachment",
      name: file.name,
      contentType: file.type || "application/octet-stream",
      contentBytes: fileBuffer.toString("base64"),
    };

    await Promise.all([
      sendGraphMail({
        token,
        to: [email],
        subject: "Thank you for applying to LAS Mobility",
        html: acknowledgementEmailHtml(fields),
        attachments: [logoAttachment],
      }),
      sendGraphMail({
        token,
        to: CAREER_RECIPIENTS,
        replyTo: email,
        subject: `New Career Application Received - ${jobTitle} - ${fullName}`,
        html: internalEmailHtml(fields),
        attachments: [logoAttachment, resumeAttachment],
      }),
    ]);

    console.info(`[apply] Graph emails sent for ${email} -> ${jobTitle} at ${submittedAt}`);
    return NextResponse.json({
      success: true,
      message: "Thank you for applying. We have received your application and will get back to you shortly.",
    });
  } catch (err) {
    console.error("[apply] Email send failed:", err);
    return NextResponse.json(
      { error: "We could not submit your application right now. Please try again or contact support@lasmobility.com." },
      { status: 500 }
    );
  }
}
