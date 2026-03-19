-- =============================================================================
-- Copytier Contractor Website — Database Migration
-- Pack 6: Backend, Data & Integrations
-- =============================================================================
-- Run via: supabase db push  OR  supabase migration up
-- After running: use Supabase MCP generate_typescript_types to sync types
-- =============================================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- =============================================================================
-- TABLE: contact_submissions
-- Every lead that comes through the contact form lands here.
-- This is the most important table — it's the business's lifeline.
-- =============================================================================
create table if not exists public.contact_submissions (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  -- Contact info
  name            text not null check (char_length(name) >= 2 and char_length(name) <= 100),
  email           text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone           text not null check (char_length(phone) >= 10),

  -- Request details
  service_needed  text,
  message         text check (char_length(message) <= 2000),
  is_emergency    boolean not null default false,

  -- Tracking
  source_page     text,                  -- Which page the form was submitted from
  honeypot_value  text,                  -- Should always be empty; non-empty = bot
  ip_hash         text,                  -- SHA-256 hash of IP for rate limiting (not PII)

  -- CRM / status tracking (for phase 2)
  status          text not null default 'new'
                    check (status in ('new', 'contacted', 'quoted', 'booked', 'closed', 'spam')),
  notes           text,                  -- Internal notes from contractor
  responded_at    timestamptz
);

-- Index for dashboard queries (most recent leads first)
create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

-- Index for status filtering in phase 2 CRM view
create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

-- Enable Row Level Security
alter table public.contact_submissions enable row level security;

-- POLICY: Anyone can insert (public form submission — no auth required)
create policy "Public can submit contact forms"
  on public.contact_submissions
  for insert
  to anon
  with check (
    -- Block obvious bots: honeypot must be empty
    honeypot_value = '' or honeypot_value is null
  );

-- POLICY: Only authenticated admin users can read submissions
create policy "Authenticated users can read submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (true);

-- POLICY: Only authenticated users can update status/notes
create policy "Authenticated users can update submissions"
  on public.contact_submissions
  for update
  to authenticated
  using (true)
  with check (true);


-- =============================================================================
-- TABLE: services
-- Mirrors siteConfig.services[] — enables dynamic service page management
-- in phase 2. For MVP, site.config.ts is the source of truth.
-- =============================================================================
create table if not exists public.services (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  slug            text not null unique,
  title           text not null,
  short_desc      text,
  full_desc       text,
  icon_name       text,                  -- Lucide icon name
  image_path      text,                  -- Supabase storage path
  is_featured     boolean not null default false,
  sort_order      int not null default 0,
  is_active       boolean not null default true,

  -- SEO overrides (if null, generated from title + siteConfig)
  meta_title      text,
  meta_desc       text
);

create index if not exists services_slug_idx on public.services (slug);
create index if not exists services_sort_order_idx on public.services (sort_order, is_active);

alter table public.services enable row level security;

-- Public can read active services
create policy "Public can read active services"
  on public.services
  for select
  to anon
  using (is_active = true);

-- Authenticated users can manage services
create policy "Authenticated users can manage services"
  on public.services
  for all
  to authenticated
  using (true)
  with check (true);

-- Auto-update updated_at on row change
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger services_updated_at
  before update on public.services
  for each row execute procedure public.handle_updated_at();


-- =============================================================================
-- TABLE: testimonials
-- Mirrors siteConfig.testimonials.manual[] — enables CMS-managed reviews
-- in phase 2. For MVP, site.config.ts is the source of truth.
-- =============================================================================
create table if not exists public.testimonials (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  author_name     text not null,
  author_location text,                  -- e.g. "San Jose, CA"
  rating          smallint not null default 5 check (rating between 1 and 5),
  review_text     text not null check (char_length(review_text) >= 20),
  service_used    text,                  -- e.g. "Water Heater Installation"

  -- Source tracking
  source          text not null default 'manual'
                    check (source in ('manual', 'google', 'yelp', 'facebook', 'angi')),
  external_id     text,                  -- Review ID from source platform
  review_url      text,                  -- Link to original review

  -- Display control
  is_featured     boolean not null default false,
  is_active       boolean not null default true,
  sort_order      int not null default 0,
  photo_url       text                   -- Optional reviewer photo
);

create index if not exists testimonials_is_active_idx on public.testimonials (is_active, is_featured, sort_order);

alter table public.testimonials enable row level security;

create policy "Public can read active testimonials"
  on public.testimonials
  for select
  to anon
  using (is_active = true);

create policy "Authenticated users can manage testimonials"
  on public.testimonials
  for all
  to authenticated
  using (true)
  with check (true);

create trigger testimonials_updated_at
  before update on public.testimonials
  for each row execute procedure public.handle_updated_at();


-- =============================================================================
-- SEED DATA (optional — remove for production runs)
-- Uncomment if you want placeholder data for dev/staging
-- =============================================================================

-- insert into public.testimonials (author_name, author_location, rating, review_text, service_used, is_featured)
-- values
--   ('Maria G.', 'San Jose, CA', 5, 'Called at 7am with a burst pipe emergency. They were here by 8:15. Professional, fast, and fair price. Highly recommend!', 'Emergency Plumbing', true),
--   ('David K.', 'Santa Clara, CA', 5, 'Water heater gave out on a Friday night. They came Saturday morning, had it replaced by noon. Clean work, no mess left behind.', 'Water Heater Replacement', true),
--   ('Jennifer L.', 'Sunnyvale, CA', 5, 'Third time using them. Always reliable, always honest about what actually needs fixing. Rare to find that anymore.', 'Drain Cleaning', false);
