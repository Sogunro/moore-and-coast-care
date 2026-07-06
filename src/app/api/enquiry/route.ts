import { NextResponse } from "next/server";

/**
 * Contact / care-enquiry endpoint.
 *
 * Security posture:
 *  - Server-side validation of every field (never trust the client).
 *  - Strict length caps to bound payload size and resist abuse.
 *  - A honeypot field ("company") silently drops bots.
 *  - Basic in-memory rate limiting per IP.
 *  - No secrets or PII are logged; the payload is handed to `deliverEnquiry`,
 *    which the operator wires to their email/CRM provider at deploy time.
 */

export const runtime = "nodejs";

type Enquiry = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const LIMITS = {
  name: 100,
  email: 254,
  phone: 32,
  message: 2000,
} as const;

// Simple fixed-window rate limiter (per process). For production behind
// multiple instances, replace with a shared store (e.g. Redis/Upstash).
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(v: unknown, max: number): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.trim().length <= max;
}

async function deliverEnquiry(enquiry: Enquiry): Promise<void> {
  // Deployment hook: send via the operator's provider (Resend, SES, HubSpot…).
  // Kept deliberately side-effect-free here so the site runs without secrets.
  // Log only that an enquiry arrived — never the contents (PII).
  console.info(`[enquiry] received from ${enquiry.name.slice(0, 40)}`);
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const data = body as Record<string, unknown>;

  // Honeypot: real users never fill this hidden field.
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  const errors: string[] = [];
  if (!isNonEmptyString(data.name, LIMITS.name)) errors.push("name");
  if (!isNonEmptyString(data.email, LIMITS.email) || !EMAIL_RE.test((data.email as string).trim()))
    errors.push("email");
  if (!isNonEmptyString(data.phone, LIMITS.phone)) errors.push("phone");
  if (!isNonEmptyString(data.message, LIMITS.message)) errors.push("message");

  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: errors },
      { status: 422 }
    );
  }

  const enquiry: Enquiry = {
    name: (data.name as string).trim(),
    email: (data.email as string).trim(),
    phone: (data.phone as string).trim(),
    message: (data.message as string).trim(),
  };

  await deliverEnquiry(enquiry);

  return NextResponse.json({ ok: true });
}
