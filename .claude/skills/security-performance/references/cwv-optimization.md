# Core Web Vitals Optimization Reference

## The Three Metrics That Matter

Google uses Core Web Vitals as a ranking factor. More importantly, they directly
correlate with lead conversion rates. A slow contractor site loses leads to the
competitor who answers in 2 seconds.

| Metric | What It Measures | Good | Needs Work | Poor |
|--------|-----------------|------|-----------|------|
| LCP — Largest Contentful Paint | How long until main content is visible | < 2.5s | 2.5–4.0s | > 4.0s |
| CLS — Cumulative Layout Shift | How much the layout jumps around | < 0.1 | 0.1–0.25 | > 0.25 |
| INP — Interaction to Next Paint | How fast the page responds to clicks | < 200ms | 200–500ms | > 500ms |

**Secondary metrics (not Core Web Vitals but still important):**
- FCP (First Contentful Paint) — should be < 1.8s
- TTFB (Time to First Byte) — should be < 800ms
- FID (deprecated, replaced by INP)

---

## LCP Deep Dive

### What Is the LCP Element?

The LCP element is the largest visible image or text block in the viewport at
page load time. On contractor sites it is almost always:
1. The hero background image, OR
2. The hero `<h1>` text (on text-heavy heros without images)

**Find your LCP element:** Open Chrome DevTools → Performance tab → record page
load → look for the "LCP" annotation in the timeline.

### LCP Fix Patterns

**Pattern 1: Hero image is LCP — ensure priority loading**
```tsx
// CORRECT
<Image
  src="/images/hero-plumber-san-jose.webp"
  alt="Licensed plumber serving San Jose"
  fill
  priority              // ← critical: removes lazy loading, adds fetchpriority="high"
  sizes="100vw"
  className="object-cover"
/>

// WRONG — lazy loads the LCP element
<Image
  src="/images/hero.jpg"
  alt="Hero"
  fill
  // no priority prop = lazy loaded = slow LCP
/>
```

**Pattern 2: Hero image too large**
```
Target file size by viewport:
  Mobile (375px):   WebP, 75KB max
  Tablet (768px):   WebP, 150KB max
  Desktop (1280px): WebP, 200KB max
```

Use `sizes` prop to serve correctly sized images:
```tsx
<Image
  src="/images/hero.webp"
  alt="..."
  fill
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 100vw"
/>
```

**Pattern 3: Server response time too slow**
Vercel Edge Network serves static assets from the CDN edge. If TTFB > 800ms,
the likely cause is a blocking data fetch in the page component. Check:
- Is the homepage fetching from Supabase on every request (ISR) vs. build time (SSG)?
- Is there a waterfall of sequential awaits at the top of the page?

Fix: Move data fetching to build time. Homepage content rarely changes.

**Pattern 4: Render-blocking resources above the fold**
Check the Opportunities section in PageSpeed Insights. Common culprits:
- External CSS stylesheets (should not exist — use Tailwind instead)
- Google Fonts `<link>` tags (replace with `next/font`)
- Third-party scripts in `<head>` without `async` or `defer`

---

## CLS Deep Dive

### What Causes Layout Shift?

Layout shift happens when an element moves AFTER it has already been painted.
CLS score = sum of (impact fraction × distance fraction) for all shifts.

**Top causes on contractor sites:**

| Cause | CLS Impact | Fix |
|-------|-----------|-----|
| Images without dimensions | High | Add `width`/`height` to all `<Image>` |
| Font swap (FOUT) | Medium | Use `next/font` with `display: swap` + fallback metrics |
| Cookie consent banner that pushes content down | High | Use `position: fixed` not relative |
| Late-loading testimonials changing height | Medium | Use skeleton loaders with fixed height |
| Google Maps iframe with no reserved space | Medium | Set explicit `height` on wrapper div |
| Dynamic content injected by JS after paint | Variable | Reserve space with min-height |

### CLS Fix Patterns

**Pattern 1: Reserve space for all images**
```tsx
// Static image with known dimensions
<Image src="/images/team.jpg" alt="..." width={600} height={400} />

// Fill container (parent must have defined height)
<div className="relative h-[400px] w-full">
  <Image src="..." alt="..." fill className="object-cover" />
</div>
```

**Pattern 2: Font FOUT prevention**
```tsx
// next/font automatically calculates fallback metrics
const body = Lato({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true, // ← minimizes CLS from font swap
  variable: '--font-body',
})
```

**Pattern 3: Fixed-position cookie banner**
```tsx
// Cookie banner MUST NOT push content down
<div className="fixed bottom-0 left-0 right-0 z-50 ...">
  {/* cookie consent content */}
</div>
```

**Pattern 4: Skeleton loaders with exact dimensions**
```tsx
// Skeleton must match the EXACT dimensions of the real content
function TestimonialSkeleton() {
  return (
    <div className="h-[240px] w-full rounded-lg bg-gray-200 animate-pulse" />
    // ↑ 240px matches the real TestimonialCard height
  )
}
```

---

## INP Deep Dive

INP replaced FID in 2024. It measures the time from user interaction (click, tap,
keypress) to the next frame being painted. Bad INP makes the site feel laggy.

### What Causes Poor INP on Contractor Sites?

- **Contact form submission** — synchronous validation that blocks the main thread
- **Mobile menu animation** — JS-driven transitions instead of CSS
- **Scroll-triggered animations** — recalculating positions on every scroll event
- **Large event handlers** — handlers that do too much before yielding to the browser

### INP Fix Patterns

**Pattern 1: Defer non-critical work in event handlers**
```tsx
// Instead of doing everything synchronously:
async function handleSubmit(data: FormData) {
  setIsSubmitting(true)     // update UI immediately
  await submitToServer(data) // defer heavy work
}
```

**Pattern 2: CSS transitions for menu animations**
```css
/* CORRECT — GPU-accelerated, no JS involvement */
.menu { transform: translateX(-100%); transition: transform 200ms ease; }
.menu.open { transform: translateX(0); }

/* WRONG — causes layout recalculation */
.menu { left: -100%; transition: left 200ms ease; }
```

**Pattern 3: Debounce scroll handlers**
```tsx
// Scroll animations should use Intersection Observer, not scroll events
const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
```

---

## Image Optimization Checklist

Run this checklist for every image on the site.

### Before Production

```bash
# Find all raw <img> tags (should return 0)
grep -rn "<img " src/ --include="*.tsx" --include="*.jsx" --include="*.ts"

# Find images not using next/image import
grep -rn "from 'next/image'" src/ --include="*.tsx"
```

### Image Format Requirements

| Image Type | Format | Max Size | Notes |
|-----------|--------|----------|-------|
| Hero / banner | WebP | 200KB desktop, 75KB mobile | Use `sizes` for responsive delivery |
| Service cards | WebP | 50KB | 400×300px typical |
| Team photos | WebP | 80KB | Square, 400×400px |
| Logo | SVG preferred, WebP fallback | 20KB | SVG scales without quality loss |
| OG images | JPEG (broad compatibility) | 150KB | 1200×630px exactly |
| Testimonial avatars | WebP | 20KB | 80×80px, circular via CSS |

### Converting Images

```bash
# Convert JPEG/PNG to WebP (requires cwebp)
cwebp -q 80 input.jpg -o output.webp

# Batch convert in public/images/
for f in public/images/*.jpg; do cwebp -q 80 "$f" -o "${f%.jpg}.webp"; done

# Generate responsive sizes
# 375px, 768px, 1280px, 1920px
```

### Descriptive Filenames for SEO

```
# WRONG
img1.jpg, hero-copy.png, IMG_8372.jpg

# CORRECT
plumber-san-jose-water-heater-replacement.webp
hvac-technician-air-conditioning-repair-sacramento.webp
electrician-panel-upgrade-los-angeles.webp
```

---

## Font Loading Reference

### next/font Implementation

```tsx
// src/app/layout.tsx
import { Montserrat, Lato } from 'next/font/google'

const heading = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',                  // shows fallback while loading, swaps when ready
  variable: '--font-heading',
  adjustFontFallback: true,         // reduces CLS from font swap
})

const body = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-body',
  adjustFontFallback: true,
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  )
}
```

```css
/* src/styles/globals.css */
.font-heading { font-family: var(--font-heading), system-ui, sans-serif; }
.font-body    { font-family: var(--font-body), system-ui, sans-serif; }
```

### Font Display Strategy

| Scenario | display value | Why |
|----------|--------------|-----|
| Body text (Lato, etc.) | `swap` | Visible text immediately, acceptable swap |
| Heading font | `swap` | Headings are visible by default, swap is fine |
| Icon font (if used) | `block` | Icons are meaningless without font, brief block acceptable |
| Decorative font | `optional` | If it doesn't load, not a problem |

### Forbidden Font Loading Patterns

```html
<!-- FORBIDDEN — blocks rendering -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat" />

<!-- FORBIDDEN — same problem via CSS -->
<style>@import url('https://fonts.googleapis.com/css2?family=Montserrat');</style>

<!-- FORBIDDEN — GDPR issue for EU visitors + render blocking -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

---

## Bundle Analysis

### Setup

```js
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)
```

```bash
# Install
pnpm add -D @next/bundle-analyzer

# Run
ANALYZE=true pnpm build
# Opens interactive treemap in browser
```

### Reading the Bundle Analyzer

- **First chunk (entry):** Should be < 50KB. Contains React, Next.js runtime.
- **Page chunks:** Should be < 100KB each. Contains page-specific code.
- **Shared chunks:** Code used by multiple pages — efficient.
- **Large rectangles to investigate:** Any single module > 20KB.

### Common Large Modules to Replace

| Heavy Module | Size | Replacement | Savings |
|-------------|------|-------------|---------|
| moment.js | 231KB | date-fns (tree-shakeable) | ~200KB |
| lodash | 70KB | lodash-es or native JS | ~60KB |
| react-icons (all) | 150KB+ | Import individual icons | ~140KB |
| @phosphor-icons/react | 200KB+ | Import individual icons | ~180KB |
| full heroicons | 30KB | Import by name | ~20KB |
| axios | 13KB | fetch() | 13KB |

### Dynamic Import for Below-Fold Sections

```tsx
// src/app/page.tsx
import dynamic from 'next/dynamic'
import { Hero } from '@/components/sections/Hero'         // NOT dynamic — LCP element
import { TrustBar } from '@/components/sections/TrustBar' // NOT dynamic — above fold

const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => m.Testimonials))
const FAQ          = dynamic(() => import('@/components/sections/FAQ').then(m => m.FAQ))
const CTABanner    = dynamic(() => import('@/components/sections/CTABanner').then(m => m.CTABanner))
```

---

## Caching Strategy

### Static Assets (handled by Vercel automatically)

```
/_next/static/   → Cache-Control: public, max-age=31536000, immutable
/images/         → Cache-Control: public, max-age=86400 (1 day, not immutable)
/fonts/          → Cache-Control: public, max-age=31536000, immutable
```

**Note:** Next.js content-hashes static assets, so `max-age=31536000, immutable`
is safe — when the file changes, the URL changes.

### Page Caching (ISR)

```tsx
// Service pages — full SSG (never stale)
// src/app/services/[slug]/page.tsx
export const revalidate = false  // or just omit

// Testimonials page (may get new reviews)
export const revalidate = 86400  // re-generate every 24 hours

// Blog (if present)
export const revalidate = 3600   // re-generate every hour
```

### Vercel Edge Config (optional, advanced)

For client sites needing real-time config changes (emergency phone number update,
holiday hours) without a redeploy, use Vercel Edge Config:

```tsx
import { get } from '@vercel/edge-config'
const emergencyPhone = await get('emergencyPhone')
```

This is rarely needed for contractor sites but worth knowing for urgent situations.

---

## Performance Budget

Define these limits before Pack 7. Every item is a pass/fail gate for Pack 8.

| Metric | Budget | Measurement |
|--------|--------|-------------|
| LCP (mobile) | < 2.5s | PageSpeed Insights, field data |
| CLS | < 0.1 | PageSpeed Insights |
| INP | < 200ms | PageSpeed Insights |
| Total page weight (mobile) | < 500KB transferred | Chrome DevTools Network |
| Initial JS | < 100KB per page | Bundle analyzer |
| Hero image | < 200KB | File size in public/images/ |
| Total images on homepage | < 1MB | Chrome DevTools Network |
| Font files | < 100KB total | Chrome DevTools Network, filter by font |
| Build time | < 60s | `pnpm build` terminal output |
