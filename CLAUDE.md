# Copytier Starter Template

## Project Identity
Copytier builds websites for California home service contractors — plumbers, HVAC techs, electricians, roofers, landscapers, handyman services, cleaners. This repo is a reusable starter template: clone per client, edit `src/config/site.config.ts`, deploy. The audience is homeowners searching for local contractors, often in urgency — they need a phone number in 2 seconds, not a design portfolio. Design philosophy: "successful local business" aesthetic, NOT "tech startup." Professional, trustworthy, conversion-focused. Every design decision serves one goal: make the phone ring.

## Tech Stack
- **Framework:** Next.js 15 (App Router), TypeScript strict, Tailwind CSS, shadcn/ui
- **Backend:** Supabase (database, auth, storage) — **Deployment:** Vercel
- **Package manager:** pnpm — **Server Components by default,** `'use client'` only when interactivity is needed

## Commands
- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint check
- `pnpm format` — Prettier format
- `vercel` — preview deploy (always do this first)
- `vercel --prod` — production deploy (only after preview is verified)

## File Structure
```
src/app/                    → Next.js App Router pages and layouts
src/components/ui/          → shadcn/ui base components
src/components/layout/      → Header, Footer, Navigation
src/components/sections/    → Hero, Services, Testimonials, CTA, FAQ, BeforeAfter
src/components/forms/       → ContactForm, BookingForm
src/config/site.config.ts   → THE single source of truth per client (all copy, colors, services, contact info)
src/lib/                    → Supabase client, utilities, schema builders
src/types/                  → TypeScript type definitions
public/images/              → Logo, hero, service images, team photos
supabase/migrations/        → Database schema scripts
```

## Code Rules
- TypeScript strict mode — no `any` types unless absolutely necessary
- Named exports only (except `page.tsx` / `layout.tsx` which Next.js requires as default)
- All colors, spacing, radii as Tailwind theme tokens derived from site.config — never hardcoded hex values
- Every component pulls defaults from `siteConfig`, accepts optional override props
- Every data fetch must have a loading UI (skeleton) and error UI (fallback message with retry)
- Use `generateStaticParams` for service and area pages (SSG)
- Contact form uses Server Actions — validated client-side AND server-side
- Semantic HTML with proper accessibility attributes (aria-labels on interactive elements)

## Design Rules
- Professional contractor aesthetics — clean, authoritative, trustworthy. Not experimental or avant-garde
- Frontend-design plugin is installed: channel its creativity toward "successful local business" not "tech startup"
- Subtle animations only: fade-ins on scroll, smooth hover states. Nothing dramatic or gimmicky

## SEO Rules
- Title format: `[Service] in [City] | [Company Name]` — 50-60 chars max
- Every page needs: unique title, unique meta description (150-160 chars with CTA), single H1, sequential headings, self-referencing canonical, JSON-LD schema
- Use `site.config.ts` schemaType to drive `LocalBusiness` @type automatically

## MCP Usage
- Always use Context7 for framework-specific code — fetch current docs for Next.js, React, Tailwind, Supabase, shadcn before writing code
- Use Playwright to take screenshots and verify visual output after building
- Never connect Supabase MCP to production databases

## Frontend Data Handling
- Homepage and service pages use SSG (`generateStaticParams`) — testimonials fetched at build time via Supabase
- Every async-loaded section needs a skeleton loading component matching the shape of real content
- Contact form states: idle → "Sending..." on submit → success confirmation with expected response time → error with retry button

## Security
- NEVER commit `.env` files, API keys, or secrets
- Security headers in `next.config.js`: CSP, HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`
- Run `pnpm audit` before every production deploy — zero high/critical vulnerabilities allowed
- Cookie consent banner must load before any analytics scripts fire

## Never Do
- Never use inline styles — always Tailwind classes
- Never use generic fonts (Inter, Arial, Roboto) — choose distinctive, professional typography
- Never skip error handling on Supabase queries — no silent failures, no empty catch blocks
- Never hardcode content that should come from `site.config.ts`
- Never deploy to production without a preview deploy first
- Never create service area pages with just city-name swaps — each needs unique content
- Never lazy-load the hero/LCP image — use `fetchpriority="high"`
- Never use CAPTCHA puzzles — use honeypot fields for anti-spam (kills mobile conversion)
