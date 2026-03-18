# Contractor Website Benchmarks

Shared reference data for Pack 5 (content claims), Pack 7 (performance targets),
and Pack 8 (QA standards). All figures are cited — use attributions when writing copy.

---

## Conversion Benchmarks

- Average home services conversion rate: 7.8%; top performers: 11%+ (WordStream)
- Emergency services (plumbing, HVAC, electrical): 12-20% CVR
- Planned services (landscaping, cleaning, roofing): 3-7% CVR
- Phone calls convert 10-15x more revenue than web forms (BrightLocal Local Consumer Review Survey)
- 40% of consumers who call from search make a purchase (Google)
- Conversion drops 4.42% per additional second of load time (Portent Research)
- A 1-second site converts 3x better than a 5-second site (Google/Deloitte Mobile Speed Study)
- 53% of mobile users abandon if page takes > 3 seconds to load (Google)
- Displaying reviews increases conversion up to 270% (Spiegel Research Center)
- Trust signals boost conversion 32% average (Baymard Institute)
- Forms with 4 fields convert 50% better than forms with 7+ fields (HubSpot)
- Adding a guarantee increases conversion by 10-15% (ConversionXL)

---

## Cost Per Lead Benchmarks

Average CPL for home service contractors running Google Ads or local SEO:

| Trade | Average CPL |
|-------|------------|
| Cleaning | $46.99 |
| Landscaping | ~$65 |
| Plumbing | ~$75 |
| Electrical | ~$85 |
| HVAC | ~$95 |
| Handyman | ~$70 |
| General Contractor | ~$150 |
| Roofing | $228.15 |

*Source: WordStream Home Services Benchmark Report 2023/2024*

**Note for Pack 5 copy:** These numbers justify why a professional website beats paying for every lead. A well-optimized organic site earning 50 form submissions/month at $0 CPL vs. $90/lead paid = $4,500/month in savings.

---

## Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor | Pack 7 Target |
|--------|------|------------------|------|---------------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5s – 4.0s | > 4.0s | **< 2.0s** |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1 – 0.25 | > 0.25 | **< 0.05** |
| INP (Interaction to Next Paint) | < 200ms | 200ms – 500ms | > 500ms | **< 150ms** |
| TTFB (Time to First Byte) | < 800ms | 800ms – 1.8s | > 1.8s | **< 200ms** |

*Source: web.dev/vitals — Google's official thresholds*

**Pack 7 targets are stricter than "good" thresholds** — aim for excellent, not just passing.

**LCP element on contractor sites:** Almost always the hero section background image or H1 heading.
- Use `fetchpriority="high"` on hero `<Image>` component
- Never use `loading="lazy"` on the hero image
- Preload critical fonts with `<link rel="preload">`

---

## Mobile Statistics

- 63% of all web traffic comes from mobile devices (Statcounter 2024)
- Emergency "near me" searches: 80%+ from mobile (Google Trends data)
- 48px minimum touch target required for WCAG 2.5.5 compliance
- Sticky click-to-call bar is the highest converting single mobile element on contractor sites
- Mobile users are 5x more likely to abandon tasks if the site isn't optimized for mobile (Google)
- 70% of mobile searches lead to action within one hour (Google)

---

## Trust Signal Impact Tiers

### Tier 1 — Must Have (highest conversion impact)
- Google star rating + review count (displayed prominently in hero or trust bar)
- Phone number clickable and visible above the fold
- License number and bonding/insurance status
- Years in business

### Tier 2 — High Impact (should have at launch)
- Named testimonials with city/neighborhood and specific service
- Before/after photos (especially roofing, landscaping, GC, cleaning)
- Professional certifications (NATE for HVAC, manufacturer certifications)
- Written satisfaction guarantee with specific terms
- Real team photos (founder or crew — not stock photography)

### Tier 3 — Differentiators (Phase 2)
- Video testimonials from real clients
- Project case studies with problem → solution → result structure
- Response time commitment ("We call back within 2 hours")
- Awards or community involvement
- BBB rating or Angi/Thumbtack badge

---

## SEO Benchmarks

| Factor | Target | Impact |
|--------|--------|--------|
| Title tag length | 50-60 chars | Full display in SERP |
| Meta description length | 150-160 chars | Prevents auto-truncation |
| Review count threshold | 50+ reviews | 23% higher local pack ranking (BrightLocal) |
| LocalBusiness schema | Present on all pages | 20-30% CTR increase (Google Search Console) |
| Unique service area content | Per city, not swaps | 3x better ranking vs city-name swap pages |
| Page load speed | < 2.5s LCP | Confirmed ranking factor (Google 2021+) |
| Mobile-first indexing | 100% mobile-ready | Google indexes mobile version first |
| Internal links per page | 3+ contextual links | Distributes PageRank, improves crawlability |

---

## Accessibility Context

- 4,000+ ADA web accessibility lawsuits filed in 2024 (UsableNet ADA report)
- Accessibility overlays (AccessiBe, UserWay) do NOT provide legal protection — documented by NFB and ACB
- WCAG 2.2 AA is the current target standard as of October 2023
- 95.9% of top 1 million homepages have detectable WCAG failures (WebAIM Million Report 2025)
- Most common failures: low contrast (83.6%), missing alt text (55.4%), missing form labels (47.5%)
- California: Unruh Civil Rights Act applies WCAG 2.0 AA to websites serving California residents
- Minimum touch target: 48×48px (WCAG 2.5.5) — critical for emergency service sites on mobile

---

## Review Platform Context

| Platform | Consumer Trust | Contractor Relevance |
|----------|---------------|---------------------|
| Google Business Profile | Highest | Essential — shows in Maps and organic |
| Yelp | High (varies by city) | Important in CA, less so nationally |
| HomeAdvisor / Angi | Medium | Good for lead volume, lower brand trust |
| Thumbtack | Medium | Strong for cleaning, handyman, landscaping |
| BBB | Lower than it used to be | Older demographics still check it |
| Facebook | Medium | Good for community/word-of-mouth |

**Pack 5 guidance:** Feature Google reviews first. Link to Google Business Profile for "See all reviews." Do not embed Yelp widgets — their embed policies are restrictive.
