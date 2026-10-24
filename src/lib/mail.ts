import nodemailer, { type Transporter } from "nodemailer";
import { business } from "@/data/business";
import { headline, summaryLines, typeLabels, type EnquiryInput } from "@/lib/enquiry";

export function getTransporter(): Transporter | null {
  const user = process.env.GMAIL_USER ?? process.env.SMTP_USER;
  const pass = process.env.GMAIL_APP_PASSWORD ?? process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST;
  if (host) {
    return nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: user && pass ? { user, pass } : undefined,
    });
  }
  if (user && pass) {
    return nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  }
  return null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function table(lines: Array<[string, string]>): string {
  const rows = lines
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#666;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;font-weight:600;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;font-size:15px">${rows}</table>`;
}

function plain(lines: Array<[string, string]>): string {
  return lines.map(([label, value]) => `${label}: ${value}`).join("\n");
}

function wrap(title: string, body: string): string {
  return `<div style="font-family:Arial,sans-serif;color:#101010;max-width:560px"><div style="border-top:6px solid #e5242a;padding-top:14px"><h2 style="margin:0 0 14px;font-size:20px">${escapeHtml(title)}</h2>${body}</div></div>`;
}

export async function sendEnquiryEmails(
  transporter: Transporter,
  input: EnquiryInput,
): Promise<{ copySent: boolean }> {
  const from = process.env.GMAIL_USER ?? process.env.SMTP_USER ?? business.email;
  const owner = process.env.ENQUIRY_TO ?? business.email;
  const lines = summaryLines(input);
  const digits = input.phone.replace(/\D/g, "");

  await transporter.sendMail({
    from: `"${business.name} website" <${from}>`,
    to: owner,
    replyTo: input.email || undefined,
    subject: `[${typeLabels[input.type]}] ${headline(input)} · ${input.name}`,
    text: `${plain(lines)}\n\nChat with the customer: https://wa.me/${digits}`,
    html: wrap(
      `New ${typeLabels[input.type].toLowerCase()}`,
      `${table(lines)}<p style="margin-top:18px"><a href="https://wa.me/${digits}" style="background:#e5242a;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:700">Chat on WhatsApp</a></p>`,
    ),
  });

  if (input.email === "") return { copySent: false };

  try {
    const intro = `Hello ${input.name}, thank you for contacting ${business.name}. Here is a copy of what you sent us.`;
    const outro = `We will reply on WhatsApp or by phone. Prices change every day, so we confirm today's price and availability directly. You can also reach us on ${business.phones[0].display} or visit ${business.address.line1}, ${business.address.line2}.`;
    await transporter.sendMail({
      from: `"${business.name}" <${from}>`,
      to: input.email,
      replyTo: owner,
      subject: `We received your ${typeLabels[input.type].toLowerCase()} · ${business.name}`,
      text: `${intro}\n\n${plain(lines)}\n\n${outro}`,
      html: wrap(
        "We received your enquiry",
        `<p>${escapeHtml(intro)}</p>${table(lines)}<p style="margin-top:18px;color:#444">${escapeHtml(outro)}</p>`,
      ),
    });
    return { copySent: true };
  } catch (error) {
    console.error("Could not send the sender copy", error);
    return { copySent: false };
  }
}
