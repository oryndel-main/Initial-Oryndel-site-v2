-- Run this in the Supabase SQL editor once, before going live.

create table if not exists demo_requests (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  trade text not null,
  phone text not null,
  source text not null default 'site_final_cta',
  created_at timestamptz not null default now()
);

-- Row Level Security ON with NO policies means: nobody can read or write
-- this table through the public API (anon or authenticated key) — only
-- the service_role key can touch it, and that key only ever lives in
-- app/api/demo-request/route.ts on the server. This is what makes it safe
-- for the client-side form to exist at all: the browser never talks to
-- Supabase directly, only to your own /api route.
alter table demo_requests enable row level security;

-- Optional: index for sorting/searching your leads by recency.
create index if not exists demo_requests_created_at_idx
  on demo_requests (created_at desc);
