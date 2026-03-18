---
name: site-architecture
description: >
  Use when creating page routes, navigation components, page templates, layouts,
  sitemap generation, or modifying site structure for a contractor website.
  This includes homepage, service pages, service area pages, contact, about, FAQ,
  blog, 404, and all other page types. Also use for Header, Footer, Breadcrumbs,
  and mobile navigation. Runs after Pack 2 (design-system) has produced tokens.
  Reads siteConfig.services[], siteConfig.serviceAreas[], siteConfig.pages[],
  siteConfig.features, and Pack 2 token outputs.
---

# Pack 3: Site Architecture & Page Templates

## Overview

Pack 3 transforms `site.config.ts` data into a complete, deployable route and layout system. It produces no visual UI — that is Pack 4's job. Pack 3's output is **page scaffolds**: correctly routed, properly typed, SEO-ready files that are ready for Pack 4 to fill with components.

### What This Skill Produces

| Output | Location | Purpose |
|---|---|---|
| App Router route files | `src/app/**/page.tsx` | One file per URL |
| Dynamic route params | `generateStaticParams()` | Pre-renders service/area pages |
| Root layout | `src/app/layout.tsx` | Fonts, globals, nav wrappers |
| Header component scaffold | `src/components/layout/Header.tsx` | Desktop + mobile nav |
| Footer component scaffold | `src/components/layout/Footer.tsx` | NAP, links, legal |
| Breadcrumb component | `src/components/layout/Breadcrumbs.tsx` | Structured data + UX |
| 404 page | `src/app/not-found.tsx` | Custom error with CTA |
| sitemap.xml | `src/app/sitemap.ts` | Next.js Metadata API |
| robots.txt | `src/app/robots.ts` | Crawler directives |

Pack 3 uses only `siteConfig` values and Pack 2 token classes. It imports no content strings inline — every heading, paragraph, and phone number comes from `siteConfig` via props or direct import.

---

## Site Architecture Build Workflow

### Step 1: Generate Route Structure

Read `siteConfig.services[]` and `siteConfig.serviceAreas[]`. Generate the complete `src/app/` directory tree before writing any file.

**Standard contractor route structure:**
```
src/app/
├── layout.tsx                          # Root layout — fonts, globals, Header, Footer
├── page.tsx                            # Homepage /
├── not-found.tsx                       # 404 /
├── sitemap.ts                          # /sitemap.xml
├── robots.ts                           # /robots.txt
├── contact/
│   └── page.tsx                        # /contact
├── about/
│   └── page.tsx                        # /about
├── services/
│   └── [serviceSlug]/
│       └── page.tsx                    # /services/[serviceSlug]
├── service-areas/
│   └── [areaSlug]/
│       └── page.tsx                    # /service-areas/[areaSlug]
├── faq/
│   └── page.tsx                        # /faq (if siteConfig.features.faq = true)
└── privacy/
    └── page.tsx                        # /privacy
```

**Conditional routes** — only create if enabled in `siteConfig.features`:
- `/faq` — if `siteConfig.features.faq === true`
- `/blog` and `/blog/[slug]` — if `siteConfig.features.blog === true`
- `/service-areas/[areaSlug]` — if `siteConfig.serviceAreas.length > 0`

Never create empty or placeholder route files. If a feature is off, do not create the route.

### Step 2: Create generateStaticParams

Dynamic routes (`[serviceSlug]` and `[areaSlug]`) require `generateStaticParams` to pre-render at build time. This is critical for SEO — dynamic routes without static params are server-rendered on demand, not indexed reliably.

```typescript
// src/app/services/[serviceSlug]/page.tsx
export async function generateStaticParams() {
  return siteConfig.services.map((service) => ({
    serviceSlug: service.slug,
  }))
}
```

```typescript
// src/app/service-areas/[areaSlug]/page.tsx
export async function generateStaticParams() {
  return siteConfig.serviceAreas.map((area) => ({
    areaSlug: area.slug,
  }))
}
```

Both must include `export const dynamicParams = false` to return 404 for any slug not in `siteConfig`.

### Step 3: Build Navigation Components

See `references/nav-accessibility.md` for full accessibility requirements. Minimum implementation:

**Header (`src/components/layout/Header.tsx`):**
- Logo (links to `/`, `alt` text = `siteConfig.businessName`)
- Desktop nav: horizontal link list with active state, phone number in top-right
- Mobile: hamburger toggle, full-height overlay menu with focus trap
- Sticky on scroll: `position: sticky; top: 0; z-index: 50`
- CTA button ("Get Free Estimate" or `siteConfig.cta.primary`) visible at all viewport widths
- Skip-to-content link as first child of `<body>`

**Footer (`src/components/layout/Footer.tsx`):**
- NAP block: `<address>` element with Name, full Address, Phone as `<a href="tel:...">`
- Service links column
- Quick links column (About, Contact, Privacy, FAQ)
- License number, copyright, BBB/trust badge references
- NAP must be identical to `siteConfig.contact` — no paraphrasing

**Breadcrumbs (`src/components/layout/Breadcrumbs.tsx`):**
- Rendered on all pages except homepage
- Uses `aria-label="Breadcrumb"` and `<nav>` wrapper
- Outputs BreadcrumbList JSON-LD (embedded, not a separate file)
- See `references/nav-accessibility.md` for ARIA pattern

### Step 4: Create Page Templates

Use the templates in `templates/` as starting points. Generate one `page.tsx` per route from the corresponding template. Fill all `[siteConfig.*]` references with actual property paths — do not leave bracket placeholders.

See `references/page-template-specs.md` for per-page section requirements and minimum content rules.

### Step 5: Section Flow Order (The Conversion Sequence)

Section order is not negotiable — it follows established conversion patterns for home service websites. Pack 4 fills each section with components; Pack 3 defines the order by placing section scaffolds in the correct sequence.

**Homepage conversion sequence:**
```
1. Hero              — headline + subheadline + primary CTA + trust bar
2. Trust Bar         — review count, rating, years in business, license
3. Services Grid     — all services, each links to its service page
4. Why Choose Us     — differentiators, credentials, guarantee
5. Testimonials      — 3-star Google reviews minimum, schema-marked
6. Process           — 3-4 step "How It Works" — removes friction
7. Service Area Map  — cities served, visual map or badge grid
8. FAQ               — 4-6 questions with FAQPage schema
9. Final CTA         — restate the offer, emergency services if applicable
```

**Service page conversion sequence:**
```
1. Page Hero         — service-specific headline, CTA, trust signal
2. Service Overview  — what the service includes (H2 + 3-4 paragraphs)
3. Benefits/Why Us   — service-specific benefits (not the generic homepage list)
4. Process           — service-specific steps (not the generic homepage one)
5. Testimonials      — filtered to this service if possible, else all
6. Pricing/FAQ       — service-specific FAQ with FAQPage schema
7. Related Services  — links to other service pages (internal linking)
8. Final CTA         — service-specific offer
```

**Service area page conversion sequence:**
```
1. Page Hero         — "[Service] in [City]" headline, CTA
2. Local Intro       — city-specific paragraph (NEVER just a city-name swap)
3. Services in Area  — what services are available in this location
4. Why Choose Us     — local trust signals (years serving [City], reviews from [City])
5. Local Testimonials — reviews mentioning this city if available
6. FAQ               — location-specific FAQ (response time, service radius)
7. Nearby Areas      — internal links to adjacent service area pages
8. Final CTA         — local urgency
```

### Step 6: Generate sitemap.xml and robots.txt

Use the Next.js Metadata API. See `references/sitemap-generation.md` for the complete implementation.

Key rules:
- Homepage: `priority: 1.0`, `changeFrequency: 'weekly'`
- Service pages: `priority: 0.9`, `changeFrequency: 'monthly'`
- Service area pages: `priority: 0.8`, `changeFrequency: 'monthly'`
- Contact/About: `priority: 0.7`, `changeFrequency: 'yearly'`
- FAQ/Privacy: `priority: 0.5`, `changeFrequency: 'yearly'`
- `robots.ts`: allow all, disallow `/api/`, point to sitemap URL

### Step 7: Verify with Playwright

After scaffolding all routes, use Playwright MCP to:
1. Navigate to `/` — confirm page renders without errors
2. Navigate to a service page — confirm dynamic route resolves
3. Navigate to a service area page — confirm dynamic route resolves
4. Check browser console for missing import errors
5. Screenshot at 375px (mobile) — confirm nav renders
6. Screenshot at 1280px (desktop) — confirm layout structure

---

## URL Convention Rules

Clean, hierarchical, lowercase slugs. See `references/url-conventions.md` for full rules.

**Slug format:** `kebab-case`, no trailing slash, no special characters
```
✓  /services/water-heater-installation
✓  /service-areas/san-jose
✗  /services/Water_Heater_Installation/
✗  /serviceAreas/SanJose
✗  /services/water heater installation
```

**Hierarchy:**
```
/                              # Homepage
/services/[serviceSlug]        # Individual services
/service-areas/[areaSlug]      # Individual service areas
/contact                       # Contact
/about                         # About
/faq                           # FAQ (if enabled)
/privacy                       # Privacy policy
/blog/[slug]                   # Blog (if enabled)
```

**Slug generation from siteConfig:**
```typescript
// utility: src/lib/slugify.ts
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
```

Service and area slugs must be pre-defined in `siteConfig` — do not generate them at runtime. They must be stable for SEO (changing a slug breaks inbound links).

---

## Above-the-Fold Strategy

What users see before scrolling is all that matters for conversion on first landing. Enforce these requirements by placing the correct section components first in each template.

| Page Type | Must Be Visible Before Scroll |
|---|---|
| Homepage | Business name, primary service, phone number, CTA button, one trust signal |
| Service page | Service name as H1, "Call for [Service]" CTA, at minimum one line of why-us |
| Service area page | "[Service] in [City]" as H1, phone number, CTA button |
| Contact page | Headline, contact form (first field visible), phone number |
| About page | Business name, years in business, trust signal, team photo |

**Mobile rule:** Phone number and "Call Now" button must be visible without ANY scrolling on a 375px viewport. This is non-negotiable — it is the highest-converting element on mobile contractor sites.

---

## Navigation Accessibility Requirements

Full requirements in `references/nav-accessibility.md`. Summary:

- All nav items reachable by keyboard (`Tab` forward, `Shift+Tab` back)
- Active/current page indicated with `aria-current="page"`
- Mobile menu: focus trap while open (Tab cycles through menu items only)
- Mobile menu: `Escape` key closes menu and returns focus to trigger button
- Mobile menu button: `aria-expanded`, `aria-controls`, `aria-label`
- Dropdown menus (if used): `role="menu"`, arrow key navigation
- Skip link: `<a href="#main-content">Skip to main content</a>` as first focusable element
- Logo image: `alt={siteConfig.businessName}` — never `alt="logo"`

---

## Grid System

See `references/grid-patterns.md` for full patterns. Summary:

- 12-column conceptual grid, implemented with CSS Grid and Tailwind
- Container max-widths: 640 / 768 / 1024 / 1200px (defined in tailwind.config.ts by Pack 2)
- All section content inside `.container` wrapper
- Standard section pattern: `<section>` → `<div className="container">` → content
- Services grid: 1 col mobile → 2 col sm → 3 col lg
- Testimonials: 1 col mobile → 2 col md → 3 col xl
- Two-column layouts (content + sidebar): 1 col mobile → 8/4 split lg

---

## Quality Checkpoints

Complete every item before Pack 3 handoff:

**Routes**
- [ ] One `page.tsx` exists for every entry in `siteConfig.services[]`
- [ ] One `page.tsx` exists for every entry in `siteConfig.serviceAreas[]`
- [ ] `generateStaticParams` present on both dynamic routes
- [ ] `dynamicParams = false` set on both dynamic routes
- [ ] No route file contains hardcoded content strings (all from siteConfig)

**Navigation**
- [ ] Header renders at 375px without overflow
- [ ] Mobile menu toggle has `aria-expanded` and `aria-controls`
- [ ] Skip-to-content link present as first focusable element
- [ ] Footer NAP matches `siteConfig.contact` exactly
- [ ] All nav links tested by keyboard — no traps outside mobile menu

**SEO Structure**
- [ ] `generateMetadata` present on every `page.tsx`
- [ ] `canonical` URL set in every metadata export
- [ ] Breadcrumbs rendered on all non-homepage pages
- [ ] `sitemap.ts` includes all routes with correct priorities
- [ ] `robots.ts` present and allows all non-API routes

**Conversion Structure**
- [ ] Homepage follows the 9-section conversion sequence
- [ ] Phone number visible above fold on 375px viewport
- [ ] CTA button visible above fold on 375px viewport
- [ ] Each page has a Final CTA section as the last content section (before footer)

**TypeScript**
- [ ] No `any` types in route or layout files
- [ ] All `generateStaticParams` return types are explicit
- [ ] `PageProps` types defined for dynamic routes
- [ ] All siteConfig imports are typed

---

## Anti-Patterns

1. **Never create route files with placeholder content** — If a service or area isn't in `siteConfig`, the route should not exist. Empty pages with "Coming soon" are an SEO liability.

2. **Never generate service area pages as city-name swaps** — `/service-areas/fresno` must have genuinely different content from `/service-areas/stockton`. Same copy with city swapped is thin content and can trigger Google penalties. Pack 5 (Content & SEO) writes the unique content; Pack 3 scaffolds the structure correctly.

3. **Never nest containers** — One `.container` per section. Nesting creates double-padding and breaks grid alignment at all breakpoints.

4. **Never put content strings in page template files** — Every string that appears on the page must trace to `siteConfig` or a component prop. Hardcoded strings in `page.tsx` files are impossible to manage at scale and break the single-source-of-truth principle.

5. **Never skip `generateStaticParams` on dynamic routes** — Without it, service pages render on-demand and may not be crawled reliably. All contractor pages must be statically generated.

6. **Never put the contact form below the fold on the contact page** — The form is the entire point of the contact page. If users have to scroll to see it, conversion drops sharply.

---

## Handoff: What Pack 4 Needs

Pack 4 (Component Library) requires these to be complete and committed:

| Requirement | File/Location | Validation |
|---|---|---|
| All route files scaffolded | `src/app/**/page.tsx` | One per siteConfig entry |
| Section placeholders in place | Each `page.tsx` | Comments mark where components go |
| Layout wrappers established | `src/app/layout.tsx` | Header, Footer, skip link present |
| Component import paths defined | Each page template | Named imports from `@/components/` |
| Breadcrumb component exists | `src/components/layout/Breadcrumbs.tsx` | Used on all non-home pages |
| TypeScript types for page props | `src/types/` | `ServicePageProps`, `AreaPageProps` |
| siteConfig types confirmed | `src/types/site-config.ts` | Services[], Areas[] typed |

Pack 4 will import section components into the exact locations Pack 3 scaffolded. If the import paths or section order change after Pack 3, Pack 4 work is invalidated.

---

## Reference Files

| File | When to Consult |
|---|---|
| `references/url-conventions.md` | Step 1: Naming routes and slugs |
| `references/nav-accessibility.md` | Step 3: Building Header and mobile menu |
| `references/page-template-specs.md` | Step 4: Per-page section requirements |
| `references/section-component-specs.md` | Step 5: Section props and component contracts |
| `references/grid-patterns.md` | Step 5: Layout patterns for each section type |
| `references/sitemap-generation.md` | Step 6: sitemap.ts and robots.ts implementation |
