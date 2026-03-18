# Copytier Starter Template

## Project Identity
This is a Copytier contractor website — cloned from the starter template, configured via `src/config/site.config.ts`, and deployed to Vercel. The site.config.ts file is the single source of truth for this client's business data, services, branding, copy, and integrations. Every component reads from it. Every page pulls from it. Never hardcode what should come from config.

## Tech Stack
- **Framework:** Next.js 15 (App Router), TypeScript strict, Tailwind CSS, shadcn/ui
- **Backend:** Supabase (database + storage) — **Deployment:** Vercel
- **Package manager:** pnpm — **Server Components by default,** `'use client'` only when interactivity is needed

## Commands
```
pnpm dev          → start dev server (localhost:3000)
pnpm build        → production build (must pass before any commit)
pnpm lint         → ESLint check
pnpm format       → Prettier format
vercel            → preview deploy (always first)
vercel --prod     → production deploy (only after preview verified)
```

## File Structure
```
src/config/site.config.ts     → THE single source of truth — all client data, copy, colors, services
src/app/                      → Next.js App Router pages and layouts
src/app/actions/              → Server Actions (form submission, email notification)
src/components/ui/            → shadcn/ui base components (Button, Input, Card, Accordion)
src/components/layout/        → Header, Footer, Navigation, Breadcrumbs, StickyMobileCTA
src/components/sections/      → Hero, ServicesGrid, TrustBar, Testimonials, ProcessSteps, FAQ, CTABanner
src/components/forms/         → ContactForm, BookingForm
src/lib/                      → Supabase client, utilities, schema builders, hooks
src/types/                    → TypeScript type definitions (including SiteConfig interface)
src/styles/                   → tokens.css (design tokens), globals.css
public/images/                → Logo, hero, service images, team photos
supabase/migrations/          → Database schema scripts
tests/e2e/                    → Playwright E2E test specs
docs/                         → Client handoff docs, maintenance schedule
```

## The 8-Pack Pipeline Built This Site
This site was built by the Copytier 8-pack skill pipeline. Each layer has specific responsibilities:

- **Pack 1** produced `site.config.ts` from the client's Build Brief
- **Pack 2** produced `tailwind.config.ts` extensions, `src/styles/tokens.css`, font loading in `layout.tsx`
- **Pack 3** produced all routes in `src/app/`, navigation components, page templates, sitemap
- **Pack 4** produced all components in `src/components/`, forms, accessibility layer
- **Pack 5** produced all page copy, `generateMetadata()` per route, JSON-LD schema blocks
- **Pack 6** produced `supabase/migrations/`, Server Actions, email notification, integration embeds
- **Pack 7** applied security headers, CWV optimization, cookie consent, privacy policy
- **Pack 8** ran QA, deployed, configured analytics, generated client docs

When modifying this site, use the corresponding skill for context. Changing copy? Use the content-seo skill. Fixing a component? Use the component-library skill. Adding a page? Use the site-architecture skill.

## Code Rules
- TypeScript strict mode — no `any` types unless absolutely necessary
- Named exports only (except `page.tsx` / `layout.tsx` which Next.js requires as default)
- All colors, spacing, radii as Tailwind theme tokens from `src/styles/tokens.css` — never hardcoded hex values
- Every component pulls defaults from `siteConfig`, accepts optional override props
- Every data fetch must have a loading UI (skeleton) and error UI (fallback message with retry)
- Use `generateStaticParams` for service and area pages (SSG)
- Contact form uses Server Actions — validated client-side AND server-side
- Semantic HTML with proper accessibility (WCAG 2.2 AA): aria-labels, keyboard nav, 4.5:1 contrast, 48px touch targets

## Design Tokens (Three-Layer System)
```
Layer 1 (Primitive):  --color-blue-600: #2563EB       ← Raw values from siteConfig.branding.colors
Layer 2 (Semantic):   --color-primary: var(--color-blue-600)  ← Purpose-assigned
Layer 3 (Component):  --btn-primary-bg: var(--color-primary)  ← Context-specific
```
Components reference Layer 3 tokens ONLY. Never use raw hex values in components. Never reference Layer 1 tokens directly in components.

## SEO Rules
- Title: `[Service] in [City] | [Company Name]` — 50-60 chars
- Meta description: action-oriented with CTA — 150-160 chars
- Every page: unique title, unique meta description, single H1, sequential headings, self-referencing canonical
- JSON-LD schema per page: LocalBusiness (siteConfig.schemaType drives @type), Service, FAQPage, BreadcrumbList
- NAP consistency: Name, Address, Phone identical on every page and matching Google Business Profile

## Frontend Data Handling
- Homepage and service pages: SSG via `generateStaticParams`
- Testimonials: fetched at build time from Supabase (or siteConfig.testimonials.manual for MVP)
- Every async-loaded section: skeleton loading component matching shape of real content
- Contact form states: idle → "Sending..." (disabled) → success with response time → error with retry + phone fallback

## Security & Privacy
- NEVER commit `.env` files, API keys, or secrets
- Security headers in `next.config.js`: CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- `pnpm audit` before every production deploy — zero high/critical vulnerabilities
- Cookie consent banner loads BEFORE any analytics scripts (CCPA requirement)
- Honeypot anti-spam on all forms — NEVER CAPTCHA puzzles

## MCP Usage in This Repo
- Use Context7 for all framework-specific code — fetch docs for Next.js, React, Tailwind, Supabase, shadcn before writing
- Use Playwright to screenshot and verify visual output after building any component or page
- Use Supabase MCP for schema operations — development/staging only, never production

## Never Do
- Never use inline styles — always Tailwind utility classes
- Never use generic fonts (Inter, Arial, Roboto) — use the fonts defined in siteConfig.branding.fonts
- Never skip error handling on Supabase queries — no silent failures
- Never hardcode content that should come from `site.config.ts`
- Never deploy to production without preview deploy first
- Never create service area pages with city-name swaps — each needs unique content
- Never lazy-load the hero/LCP image — use `fetchpriority="high"`
- Never use CAPTCHA — honeypot fields only (kills mobile conversion)
- Never use purple gradients, Space Grotesk, or "tech startup" aesthetics
- Never leave placeholder text in deployed sites — every field must be real client data
