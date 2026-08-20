# Oryndel Marketing Site

Single-page marketing site for Oryndel — AI phone-answering agents for septic
pumping, portable toilet rental, and dumpster/roll-off rental businesses.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (scroll + hover animations)

## Run locally
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Deploy
1. Push this repo to GitHub.
2. Import the repo in Vercel — it auto-detects Next.js, no config needed.
3. Point oryndel.com at Vercel via Cloudflare DNS (CNAME to cname.vercel-dns.com,
   or use Vercel's nameservers if you want Vercel to manage DNS instead).

## What's wired up vs. what's a stub
- The demo-request form (`components/FinalCTA.tsx`) now POSTs to a real
  server route: `app/api/demo-request/route.ts`. See **Security** below for
  how it's locked down and what you need to configure before it's live.
- No analytics (PostHog), error tracking (Sentry), or auth (Clerk) are wired
  in — per the brief, none of that is required for a static marketing page.
  Add PostHog's snippet to `app/layout.tsx` when you're ready to track traffic.

## Security — demo request form
The form is built so the browser never talks to Supabase directly:

```
Browser → POST /api/demo-request → (server) → Supabase
```

1. **Set up Supabase**: run `supabase/schema.sql` once in the Supabase SQL
   editor. It creates the `demo_requests` table with Row Level Security
   enabled and **no policies** — meaning the public anon key can't read or
   write it at all. Only the service role key can, and that key only ever
   lives on the server.
2. **Set secrets in Vercel, not in the repo**: copy `.env.example` →
   `.env.local` for local dev (already gitignored). In production, add the
   same variables under Project → Settings → Environment Variables in
   Vercel. `SUPABASE_SERVICE_ROLE_KEY` must never be prefixed with
   `NEXT_PUBLIC_` — that prefix is what tells Next.js to ship a variable to
   the browser bundle, and this key must never end up there.
3. **What the API route does on every request** (`app/api/demo-request/route.ts`):
   - Rate-limits by IP (5 submissions / 10 min) via Upstash Redis, if
     configured — cheap to add since Upstash is already in your stack.
   - Checks a honeypot field (`website`) that's invisible and untabbable
     for real visitors; bots that fill it get a fake success response
     instead of a useful error, so they don't learn to route around it.
   - Re-validates business name, trade, and phone server-side — the
     browser's `required` attributes are a UX nicety, not a security
     control, since anyone can hit the endpoint directly with curl.
   - Only after all of that does it write to Supabase using the service
     role key.
4. **If you'd rather not stand up Supabase yet**: the route logs the
   submission to the server console and still returns success, so the form
   works end-to-end without it. Swap the Supabase block for a webhook call
   to Zapier/Make when you're ready — same pattern applies: call it from
   the server route, never from the client.
5. **Transport security**: Vercel serves everything over HTTPS by default.
   In Cloudflare, keep the proxy (orange cloud) on for oryndel.com and set
   SSL/TLS mode to **Full (strict)** so the Cloudflare↔Vercel leg is
   encrypted too, not just the visitor↔Cloudflare leg.
- The favicon (`app/icon.png`) and Apple touch icon (`app/apple-icon.png`)
  were generated as a bronze "O" monogram from your wordmark's font — swap
  these for your real logo mark whenever you have a standalone icon version.
- `public/oryndel-wordmark.png` holds your uploaded logo for reference; the
  live nav/footer logo is real text (Inter, extrabold, tight tracking), not
  an image, so it stays crisp and can pick up hover states.

## Editing copy or pricing
All section copy lives directly in each component under `components/`.
Pricing numbers live in `components/Pricing.tsx` (`tiers` array).
