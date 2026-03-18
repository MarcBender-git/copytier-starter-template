# URL Conventions for Contractor Websites

## Core Rules

1. **Lowercase only** — never uppercase letters in any URL segment
2. **Hyphens, not underscores** — `water-heater-repair` not `water_heater_repair`
3. **No trailing slashes** — `/services/plumbing` not `/services/plumbing/`
4. **No special characters** — no `&`, `?`, `#`, `%`, or spaces in slugs
5. **No file extensions** — no `.html`, `.php`, `.asp`
6. **Stable slugs** — once published, never change a slug (breaks inbound links and rankings)
7. **Slugs pre-defined in siteConfig** — never generate from display names at runtime

---

## URL Hierarchy

```
/                                   Homepage
/services/                          (no index page — 301 → homepage if hit)
/services/[serviceSlug]             Individual service
/service-areas/                     (no index page — 301 → homepage if hit)
/service-areas/[areaSlug]           Individual service area
/contact                            Contact page
/about                              About page
/faq                                FAQ (if enabled)
/privacy                            Privacy policy
/blog                               Blog index (if enabled)
/blog/[postSlug]                    Blog post (if enabled)
```

**No `/services/` or `/service-areas/` index pages.** These category URLs have no SEO value for a contractor site and create thin-content issues. Redirect them to homepage if they are hit.

---

## Slug Generation Rules

### From Service Names

| Service Display Name | Correct Slug | Wrong |
|---|---|---|
| Water Heater Installation | `water-heater-installation` | `waterHeaterInstallation` |
| AC Repair & Maintenance | `ac-repair-maintenance` | `ac-repair-&-maintenance` |
| 24/7 Emergency Plumbing | `emergency-plumbing` | `24-7-emergency-plumbing` |
| HVAC – Heating & Cooling | `hvac-heating-cooling` | `hvac---heating---cooling` |
| Drain Cleaning | `drain-cleaning` | `drain_cleaning` |

Strip leading numbers and symbols (e.g., "24/7") — these make awkward slugs and the content covers it.

### From City/Area Names

| City Display Name | Correct Slug | Wrong |
|---|---|---|
| San José | `san-jose` | `san-josé` |
| Los Angeles | `los-angeles` | `losangeles` |
| El Cajon | `el-cajon` | `el_cajon` |
| St. Helena | `st-helena` | `st.-helena` |
| North Hollywood | `north-hollywood` | `northhollywood` |

Normalize accented characters to ASCII. Remove periods from abbreviations.

### slugify() Utility

```typescript
// src/lib/slugify.ts
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')                    // Decompose accented chars
    .replace(/[\u0300-\u036f]/g, '')     // Strip diacritics (é → e)
    .trim()
    .replace(/[^\w\s-]/g, '')            // Strip special chars (keep word, space, hyphen)
    .replace(/[\s_]+/g, '-')             // Spaces and underscores → hyphen
    .replace(/^-+|-+$/g, '')             // Trim leading/trailing hyphens
    .replace(/-{2,}/g, '-')              // Collapse multiple hyphens
}
```

**This function is for generating slugs at setup time only.** Pre-computed slugs are stored in `siteConfig.services[].slug` and `siteConfig.serviceAreas[].slug`. The function should not run in production route resolution.

---

## Canonical URL Strategy

Every page must declare a self-referencing canonical in its `generateMetadata` export:

```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const baseUrl = siteConfig.siteUrl  // e.g., "https://bestplumbingco.com"
  return {
    alternates: {
      canonical: `${baseUrl}/services/${params.serviceSlug}`,
    },
  }
}
```

**Homepage canonical:**
```typescript
alternates: { canonical: siteConfig.siteUrl }
// NOT: siteConfig.siteUrl + '/'  — no trailing slash
```

---

## Redirect Rules

Define in `next.config.ts`. Standard redirects for contractor sites:

```typescript
// next.config.ts
async redirects() {
  return [
    // Redirect plural/index category pages to homepage
    { source: '/services', destination: '/', permanent: true },
    { source: '/service-areas', destination: '/', permanent: true },
    // Redirect www to non-www (or vice versa — pick one, stay consistent)
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.domain.com' }],
      destination: 'https://domain.com/:path*',
      permanent: true,
    },
  ]
}
```

---

## SEO URL Length Guidelines

| Page Type | Target Length | Example |
|---|---|---|
| Homepage | n/a | `/` |
| Service page | 30-50 chars | `/services/water-heater-installation` |
| Service area page | 35-55 chars | `/service-areas/los-angeles` |
| Blog post | 40-60 chars | `/blog/how-to-prevent-frozen-pipes` |

Long slugs (>70 chars) are truncated in Google's search results and reduce click-through. If a service name produces a long slug, abbreviate meaningfully: `residential-commercial-hvac-maintenance` → `hvac-maintenance`.

---

## Dynamic Route Params Type

Define in `src/types/site-config.ts` and use in every dynamic page:

```typescript
// src/types/page-props.ts
export type ServicePageProps = {
  params: { serviceSlug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export type AreaPageProps = {
  params: { areaSlug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}
```
