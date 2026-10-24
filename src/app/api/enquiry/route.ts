import { NextResponse } from "next/server";
import { cleanEnquiry, validateEnquiry } from "@/lib/enquiry";
import { getTransporter, sendEnquiryEmails } from "@/lib/mail";

export const runtime = "nodejs";

const windowMs = 10 * 60 * 1000;
const maxPerWindow = 5;
const hits = new Map<string, number[]>();

function isLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > maxPerWindow;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const record: Record<string, unknown> = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};

  // Honeypot: real visitors never fill this hidden field.
  if (typeof record.website === "string" && record.website !== "") {
    return NextResponse.json({ ok: true, copySent: false });
  }

  const data = cleanEnquiry(record);
  const errors = validateEnquiry(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many enquiries. Please try again in a few minutes." }, { status: 429 });
  }

  const transporter = getTransporter();
  if (!transporter) {
    return NextResponse.json({ ok: false, error: "Email is not set up yet." }, { status: 503 });
  }

  try {
    const { copySent } = await sendEnquiryEmails(transporter, data);
    return NextResponse.json({ ok: true, copySent });
  } catch (error) {
    console.error("Enquiry email failed", error);
    return NextResponse.json({ ok: false, error: "We could not send your enquiry." }, { status: 502 });
  }
}
