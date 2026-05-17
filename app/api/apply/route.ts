import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/* ── Rate-limit store (in-memory; swap for Redis/Upstash in multi-instance prod) ── */
const rlMap = new Map<string, { count: number; windowStart: number }>();
const RL_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RL_MAX = 3; // 3 applications per IP per hour

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

/* ── MIME type validation ── */
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

/* ── Admin email HTML ── */
function adminEmailHtml(fields: {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  linkedin: string;
  portfolio: string;
  coverLetter: string;
  submittedAt: string;
}): string {
  const rows: [string, string][] = [
    ["Job Title",   fields.jobTitle],
    ["Name",        fields.fullName],
    ["Email",       fields.email],
    ["Phone",       fields.phone],
    ["LinkedIn",    fields.linkedin  || "—"],
    ["Portfolio",   fields.portfolio || "—"],
    ["Cover Letter",fields.coverLetter ? fields.coverLetter.replace(/\n/g, "<br>") : "—"],
    ["Submitted At",fields.submittedAt],
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
      <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.55)">New Job Application</p>
    </td>
  </tr>
  <tr>
    <td style="background:#0ECECE1A;border-bottom:1px solid #0ECECE33;padding:12px 32px">
      <p style="margin:0;font-size:13px;font-weight:600;color:#0a9a9a">
        New application received from <strong>${fields.fullName}</strong> for <strong>${fields.jobTitle}</strong>
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:28px 32px">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:34%;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top">${label}</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111827;font-weight:500;word-break:break-word">${value}</td>
        </tr>`
          )
          .join("")}
      </table>
    </td>
  </tr>
  <tr>
    <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb">
      <p style="margin:0;font-size:12px;color:#9ca3af">
        Resume attached to this email. Reply directly to reach <strong>${fields.fullName}</strong> at ${fields.email}.
      </p>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body></html>`;
}

/* ── Applicant confirmation email HTML ── */
function confirmationEmailHtml(fields: {
  fullName: string;
  jobTitle: string;
}): string {
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
      <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.55)">Application Confirmation</p>
    </td>
  </tr>
  <tr>
    <td style="padding:32px 32px 24px">
      <h2 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#111827">
        Hi ${fields.fullName}, we received your application!
      </h2>
      <p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.7">
        Thank you for applying for the <strong style="color:#0AABAB">${fields.jobTitle}</strong> role at LAS Mobility.
        We're excited to learn more about you.
      </p>
      <p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.7">
        Our hiring team will review your application and resume carefully.
        We aim to respond to every applicant within <strong>5 business days</strong>.
      </p>
      <p style="margin:0 0 24px;font-size:14px;color:#374151;line-height:1.7">
        In the meantime, feel free to explore more about us at
        <a href="https://lasmobility.com" style="color:#0AABAB;text-decoration:none">lasmobility.com</a>
        or reach out to us at
        <a href="mailto:careers@lasmobility.com" style="color:#0AABAB;text-decoration:none">careers@lasmobility.com</a>
        if you have any questions.
      </p>
      <div style="padding:16px 20px;border-radius:8px;background:#f0fafa;border:1px solid #0AABAB33">
        <p style="margin:0;font-size:13px;font-weight:600;color:#0a9a9a">What happens next?</p>
        <ol style="margin:8px 0 0;padding-left:18px;font-size:13px;color:#374151;line-height:1.8">
          <li>Our team reviews your application and resume</li>
          <li>If you're a strong match, we'll reach out to schedule an initial call</li>
          <li>Technical or role-specific interview rounds</li>
          <li>Offer and onboarding</li>
        </ol>
      </div>
    </td>
  </tr>
  <tr>
    <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb">
      <p style="margin:0;font-size:12px;color:#9ca3af">
        LAS Mobility · Fleet Intelligence Platform ·
        <a href="https://lasmobility.com" style="color:#9ca3af">lasmobility.com</a>
      </p>
      <p style="margin:6px 0 0;font-size:11px;color:#d1d5db">
        You received this email because you applied for a role at LAS Mobility.
        If this was in error, please contact <a href="mailto:careers@lasmobility.com" style="color:#9ca3af">careers@lasmobility.com</a>.
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
  /* 1. Rate limit */
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

  /* 2. Parse multipart form data */
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  /* 3. Extract and validate required text fields */
  const fullName   = (formData.get("fullName")    as string | null)?.trim() ?? "";
  const email      = (formData.get("email")        as string | null)?.trim() ?? "";
  const phone      = (formData.get("phone")        as string | null)?.trim() ?? "";
  const jobTitle   = (formData.get("jobTitle")     as string | null)?.trim() ?? "";
  const linkedin   = (formData.get("linkedin")     as string | null)?.trim() ?? "";
  const portfolio  = (formData.get("portfolio")    as string | null)?.trim() ?? "";
  const coverLetter = (formData.get("coverLetter") as string | null)?.trim() ?? "";

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

  /* 4. Validate resume file */
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

  /* 5. Read file as Buffer */
  const buffer = Buffer.from(await file.arrayBuffer());

  /* 6. Timestamp */
  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "medium",
  });

  /* 7. Send emails via Resend */
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[apply] RESEND_API_KEY not set — skipping email delivery");
    return NextResponse.json({ success: true });
  }

  const resend = new Resend(apiKey);

  try {
    /* 7a. Admin notification email with resume attachment */
    const { error: adminError } = await resend.emails.send({
      from:    "LAS Mobility Careers <onboarding@resend.dev>",
      to:      "support@lasmobility.com",
      replyTo: email,
      subject: `New Application — ${jobTitle} — ${fullName}`,
      html:    adminEmailHtml({ fullName, email, phone, jobTitle, linkedin, portfolio, coverLetter, submittedAt }),
      attachments: [
        {
          filename: file.name,
          content:  buffer,
        },
      ],
    });

    if (adminError) {
      console.error("[apply] Admin email error:", adminError);
      return NextResponse.json(
        { error: "Failed to submit your application. Please try again or email us directly." },
        { status: 500 }
      );
    }

    /* 7b. Confirmation email to applicant */
    const { error: confirmError } = await resend.emails.send({
      from:    "LAS Mobility <onboarding@resend.dev>",
      to:      email,
      subject: `We received your application — ${jobTitle}`,
      html:    confirmationEmailHtml({ fullName, jobTitle }),
    });

    if (confirmError) {
      // Non-fatal — admin email already sent, log and continue
      console.warn("[apply] Applicant confirmation email error:", confirmError);
    }

    console.info(`[apply] Application received: ${email} → ${jobTitle} at ${submittedAt}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[apply] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
