# Sitemap and Robots.txt Generation

## Next.js Metadata API Approach

Use the Next.js built-in `sitemap.ts` and `robots.ts` files in the App Router's `src/app/` directory. This generates `sitemap.xml` and `robots.txt` at build time with full TypeScript support — no external library needed.

---

## sitemap.ts

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl  // e.g., 'https://bestplumbingco.com'
  const now = new Date()

  // ── Static pages ──────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Add FAQ if enabled
  if (siteConfig.features.faq) {
    staticPages.push({
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    })
  }

  // ── Service pages ──────────────────────────────────────────────────────
  const servicePages: MetadataRoute.Sitemap = siteConfig.services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  // ── Service area pages ─────────────────────────────────────────────────
  const areaPages: MetadataRoute.Sitemap = siteConfig.serviceAreas.map((area) => ({
    url: `${baseUrl}/service-areas/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // ── Blog posts (if enabled) ────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = siteConfig.features.blog
    ? (siteConfig.blog?.posts ?? []).map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      }))
    : []

  return [
    ...staticPages,
    ...servicePages,
    ...areaPages,
    ...blogPages,
  ]
}
```

---

## robots.ts

```typescript
// src/app/robots.ts
import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.siteUrl

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Never index API routes
          '/_next/',         // Next.js internals
          '/admin/',         // Admin paths if they exist
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
```

---

## Priority Reference Table

| Page Type | Priority | Change Frequency | Rationale |
|---|---|---|---|
| Homepage | 1.0 | weekly | Most important, updated with offers/news |
| Service pages | 0.9 | monthly | Core revenue pages, content evolves |
| Service area pages | 0.8 | monthly | Local SEO pages, content evolves |
| Contact page | 0.7 | yearly | Stable — hours/phone rarely change |
| About page | 0.7 | yearly | Stable — story rarely changes |
| Blog posts | 0.6 | yearly | Published content, evergreen |
| FAQ page | 0.5 | yearly | Stable reference content |
| Privacy policy | 0.3 | yearly | Required but not indexed for traffic |

---

## Validation Checklist

Before marking sitemap complete:

- [ ] `siteConfig.siteUrl` is set to the production URL (no trailing slash, HTTPS)
- [ ] Homepage URL does NOT have trailing slash (`https://example.com` not `https://example.com/`)
- [ ] Every `siteConfig.services[]` entry appears in sitemap
- [ ] Every `siteConfig.serviceAreas[]` entry appears in sitemap
- [ ] Conditional features (FAQ, blog) only appear if enabled in `siteConfig.features`
- [ ] No `/api/` routes in sitemap
- [ ] `robots.ts` points to correct sitemap URL
- [ ] After deploy: submit sitemap URL to Google Search Console

---

## Testing Sitemap Locally

```bash
# After running dev server:
curl http://localhost:3000/sitemap.xml
curl http://localhost:3000/robots.txt
```

The sitemap should return well-formed XML. The robots.txt should show `Sitemap: https://[domain]/sitemap.xml` with the production URL (not localhost) because it reads from `siteConfig.siteUrl`.

---

## Common Mistakes

**Hardcoding dates instead of `new Date()`** — Hardcoded `lastModified` dates are incorrect and signal to Google that pages are stale. Always use `new Date()` for current timestamp.

**Including API routes in sitemap** — Routes under `/api/` are not pages and should never appear in the sitemap. Disallow them in robots.txt too.

**Missing service area pages** — The most common oversight. Always verify the area page count in the generated sitemap matches `siteConfig.serviceAreas.length`.

**Trailing slash inconsistency** — If your canonical URLs use no trailing slash, the sitemap must also use no trailing slash. Inconsistency creates duplicate content signals.

**Wrong priority values** — All pages having `priority: 1.0` is meaningless and signals to Google that you don't understand the priority system. Use the table above.
