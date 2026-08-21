import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        }),
        limiter: Ratelimit.slidingWindow(5, "10 m"),
      })
    : null;

const TRADE_VALUES = new Set(["septic", "porta-potty", "dumpster", "multiple"]);
const PHONE_RE = /^[0-9+()\-.\s]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  if (ratelimit) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: "Too many requests. Try again in a few minutes." }, { status: 429 });
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { business, trade, country, email, phone, website } = body as Record<string, unknown>;

  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof business !== "string" || business.trim().length < 2 || business.length > 200) {
    return NextResponse.json({ error: "Enter a valid business name." }, { status: 400 });
  }
  if (typeof trade !== "string" || !TRADE_VALUES.has(trade)) {
    return NextResponse.json({ error: "Select a valid trade." }, { status: 400 });
  }
  if (typeof country !== "string" || country.trim().length < 2 || country.length > 100) {
    return NextResponse.json({ error: "Enter a valid country." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (typeof phone !== "string" || !PHONE_RE.test(phone.trim())) {
    return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
  }

  const record = {
    business_name: business.trim(),
    trade,
    country: country.trim(),
    email: email.trim(),
    phone: phone.trim(),
    source: "site_final_cta",
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    const { error } = await supabase.from("demo_requests").insert(record);
    if (error) {
      console.error("Supabase insert failed:", error.message);
      return NextResponse.json({ error: "Something went wrong on our end. Try again shortly." }, { status: 500 });
    }
  } else {
    console.warn("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — demo request not persisted:", record);
  }

  if (resend && process.env.NOTIFY_EMAIL) {
    try {
      await resend.emails.send({
        from: "Oryndel Site <onboarding@resend.dev>",
        to: process.env.NOTIFY_EMAIL,
        subject: `New demo request — ${record.business_name}`,
        text: [
          `Business: ${record.business_name}`,
          `Trade: ${record.trade}`,
          `Country: ${record.country}`,
          `Email: ${record.email}`,
          `Phone: ${record.phone}`,
          `Submitted: ${record.created_at}`,
        ].join("\n"),
      });
    } catch (err) {
      console.error("Resend notification failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
