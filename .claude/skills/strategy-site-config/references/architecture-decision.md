# Architecture Decision Reference

Stack selection logic, data flow, environment setup, and rendering strategy for Copytier builds.

---

## Next.js vs WordPress Decision Tree

**Default for all new Copytier builds: Next.js (App Router)**

```
New contractor site?
├── Client has existing WordPress site with content?
│   ├── Migrating full site → Next.js (rebuild, migrate content to siteConfig)
│   └── Keeping WordPress for CMS, new front end → Next.js + WP headless (rare)
├── Client needs real-time dynamic content (live inventory, auction prices)?
│   └── Unlikely for contractors → Next.js still correct
└── Client needs a blog they'll update themselves without developer?
    ├── Phase 1 → Static MDX in Next.js (developer-managed)
    └── Phase 2 → Consider Sanity or Contentlayer CMS adapter
```

**Why Next.js over WordPress:**
- Core Web Vitals: Next.js achieves 95+ Lighthouse scores; WordPress averages 45-65 without heavy optimization
- Security: No PHP attack surface, no plugin vulnerabilities, no wp-admin brute force targets
- Deployment: Vercel edge network, zero server maintenance, automatic HTTPS
- Developer experience: TypeScript, Tailwind, component reuse, single source of truth via siteConfig
- Cost: Vercel Hobby/Pro is cheaper than managed WordPress hosting for single sites

---

## Data Flow Diagram

The Build Brief is the only human input. Everything flows from it:

```
Build Brief (human input)
        │
        ▼
Pack 1: Strategy & Site Config
   └── site.config.ts  ← SINGLE SOURCE OF TRUTH
        │
        ├──────────────────────────────────────────┐
        ▼                                          ▼
Pack 2: Design System                    Pack 3: Site Architecture
   ├── tailwind.config.ts                   ├── App Router structure
   ├── tokens.css                           ├── Page templates
   └── globals.css                          └── Navigation components
        │                                          │
        └──────────────┬───────────────────────────┘
                       ▼
              Pack 4: Component Library
                 ├── UI components
                 ├── Section components
                 └── Forms + Server Actions
                       │
                       ▼
              Pack 5: Content & SEO
                 ├── All copy written
                 ├── Metadata + schema
                 └── AEO/GEO content
                       │
                       ▼
              Pack 6: Backend & Integrations
                 ├── Supabase schema
                 ├── Server Actions
                 └── Email pipeline
                       │
                       ▼
              Pack 7: Security & Performance
                 ├── Security headers
                 ├── CWV optimization
                 └── CCPA compliance
                       │
                       ▼
              Pack 8: QA & Launch
                 ├── E2E tests
                 ├── Analytics setup
                 └── Vercel deployment → Live Site
```

---

## Environment Setup

Three environments for every build:

| Environment | How to Access | Purpose |
|-------------|---------------|---------|
| Development | `pnpm dev` → `localhost:3000` | Active development, hot reload |
| Preview | `vercel` → auto-generated URL | Client review, QA testing |
| Production | `vercel --prod` → live domain | Live site, real traffic |

**Rules:**
- Never skip preview — always deploy and verify before production
- Development uses `.env.local` — never committed to git
- Preview/Production env vars set via `vercel env add` — never hardcoded
- Supabase MCP connects to development project only — never production

---

## Rendering Strategy

| Page Type | Strategy | Why |
|-----------|----------|-----|
| Homepage | SSG (Static) | Fastest LCP, content doesn't change hourly |
| Service pages | SSG + `generateStaticParams` | One page per service, pre-rendered at build |
| Service area pages | SSG + `generateStaticParams` | One page per city, pre-rendered at build |
| About page | SSG | Static content |
| Contact page | SSG + Server Action | Page is static; form submits via Server Action |
| FAQ page | SSG | Static content |
| Blog posts (Phase 2) | ISR (60 min revalidate) | Updated occasionally |
| Testimonials | ISR (24 hr revalidate) | Can pull fresh from Google API |
| 404 page | Static | Next.js `not-found.tsx` |

**Never use Client Components for:**
- Sections that only display content (hero, services grid, testimonials, FAQ)
- Anything that doesn't need useState, useEffect, or browser APIs

**Always use Client Components for:**
- ContactForm (useActionState, onSubmit)
- MobileMenu (open/close state)
- Accordion (expand/collapse state)
- Modal/Drawer (visibility state)
- Toast notifications (timer + state)

---

## Database Strategy

**Supabase handles:**
- `leads` table — contact form submissions
- `testimonials` table (Phase 2) — if pulling reviews dynamically
- Storage bucket — client-uploaded photos (Phase 2)

**siteConfig handles (not database):**
- All static content: services, testimonials, team, FAQs, contact info
- All branding: colors, fonts, logo paths
- All SEO data: titles, descriptions, schema fields

**Rule:** If the content changes less than once a month, it lives in siteConfig, not a database.
The database is only for data that changes from user actions (form submissions, new reviews).
