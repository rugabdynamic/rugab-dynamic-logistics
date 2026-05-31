// Email transport. If SMTP env vars are configured, sends via Nodemailer;
// otherwise logs to the console so local dev never fails on a missing mail server.
// Sending is best-effort and must never break the primary request flow.

import nodemailer from "nodemailer";

interface SendEmailInput {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

function isConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS);
}

let cachedTransport: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter {
  if (cachedTransport) return cachedTransport;
  const port = Number(process.env.SMTP_PORT);
  cachedTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return cachedTransport;
}

export async function sendEmail(input: SendEmailInput): Promise<void> {
  const from = process.env.EMAIL_FROM || process.env.ADMIN_EMAIL || "no-reply@rugabdynamiclogistics.com";

  if (!isConfigured()) {
    console.log(`[email:dev] To: ${input.to} | Subject: ${input.subject}\n${input.text}`);
    return;
  }

  try {
    await getTransport().sendMail({
      from,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html ?? `<p>${input.text.replace(/\n/g, "<br/>")}</p>`,
    });
  } catch (err) {
    console.error("sendEmail failed:", err);
  }
}

export function adminEmail(): string {
  return process.env.ADMIN_EMAIL || "info@rugabdynamiclogistics.com";
}
