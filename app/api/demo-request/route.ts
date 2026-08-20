import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// --- Server-only clients -----------------------------------------------
// SUPABASE_SERVICE_ROLE_KEY and Upstash credentials are read from
// environment variables that are NEVER prefixed with NEXT_PUBLIC_, so
// Next.js will not bundle them into client-side JS. They only exist in
// this server-side route.

const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;

const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        }),
        // 5 submissions per IP per 10 minutes — generous for a real
        // visitor, useless for a bot hammering the endpoint.
        limiter: Ratelimit.slidingWindow(5, "10 m"),
      })
    : null;

const TRADE_VALUES = new Set(["septic", "porta-potty", "dumpster", "multiple"]);
const PHONE_RE = /^[0-9+()\-.\s]{7,20}$/;

export async function POST(req: NextRequest) {
  // 1. Rate limit by IP before touching the DB or doing any real work.
  if (ratelimit) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Try again in a few minutes." },
        { status: 429 }
      );
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { business, trade, phone, website } = body as Record<string, unknown>;

  // 2. Honeypot — a hidden field real users never fill in. If it has a
  // value, silently pretend success so the bot doesn't learn to adapt.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // 3. Server-side validation — never trust the client, even though the
  // form has its own `required` attributes.
  if (typeof business !== "string" || business.trim().length < 2 || business.length > 200) {
    return NextResponse.json({ error: "Enter a valid business name." }, { status: 400 });
  }
  if (typeof trade !== "string" || !TRADE_VALUES.has(trade)) {
    return NextResponse.json({ error: "Select a valid trade." }, { status: 400 });
  }
  if (typeof phone !== "string" || !PHONE_RE.test(phone.trim())) {
    return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
  }

  const record = {
    business_name: business.trim(),
    trade,
    phone: phone.trim(),
    source: "site_final_cta",
    created_at: new Date().toISOString(),
  };

  // 4. Write server-side with the service role key (RLS-bypassing, so it
  // must never leave this route). If Supabase isn't configured yet, fail
  // loudly in server logs but don't 500 the user — log and accept, or
  // swap this block for your webhook of choice (Zapier/Make) instead.
  if (supabase) {
    const { error } = await supabase.from("demo_requests").insert(record);
    if (error) {
      console.error("Supabase insert failed:", error.message);
      return NextResponse.json(
        { error: "Something went wrong on our end. Try again shortly." },
        { status: 500 }
      );
    }
  } else {
    console.warn("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — demo request not persisted:", record);
  }

  return NextResponse.json({ ok: true });
}
