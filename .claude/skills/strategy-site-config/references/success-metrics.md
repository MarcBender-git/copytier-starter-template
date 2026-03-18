# Success Metrics — Contractor Website KPIs

Benchmarks, GA4 event names, niche-adjusted targets, and measurement setup.
Reference these when setting up Pack 8 analytics and reporting to clients.

---

## 8 Core Metrics — Standard Targets

| Metric | Target (month 3+) | How Measured | GA4 Event |
|--------|------------------|--------------|-----------|
| Monthly form submissions | 50+ | GA4 conversion | `form_submit` |
| Monthly phone clicks | 100+ | GA4 event | `phone_click` |
| Organic search traffic | 500+ sessions | GA4 acquisition | — |
| Mobile LCP | < 2.5s | CrUX / PageSpeed | — |
| Homepage bounce rate | < 50% | GA4 engagement | — |
| Form completion rate | > 30% of form_start | GA4 funnel | `form_start` → `form_submit` |
| Avg session duration | > 1:30 | GA4 engagement | — |
| Pages per session | > 2.0 | GA4 engagement | — |

---

## GA4 Event Definitions

All events must be implemented in Pack 6. These are the standard names — do not invent alternatives.

| Event Name | When it Fires | Parameters |
|------------|--------------|------------|
| `form_start` | User focuses first form field | `form_id: 'contact'` |
| `form_submit` | Server Action returns success | `form_id: 'contact'`, `service: string` |
| `phone_click` | Any `tel:` link clicked | `location: 'header' \| 'hero' \| 'mobile_bar' \| 'footer'` |
| `cta_click` | Any primary CTA button clicked | `cta_text: string`, `section: string` |
| `page_scroll_depth` | User scrolls 25%, 50%, 75%, 90% | `depth: number` |
| `service_click` | Service card clicked | `service_slug: string` |
| `area_click` | Service area link clicked | `city: string` |

**Implementation pattern (Pack 6):**
```typescript
// Null guard required — gtag may not be loaded yet
if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
  window.gtag('event', 'phone_click', { location: 'mobile_bar' })
}
```

---

## Niche-Adjusted Targets

Emergency trades need faster ramp, higher phone volume. Planned trades need more form submissions.

### Emergency Trades (Plumber, HVAC, Electrician)
| Metric | Month 1 Target | Month 3 Target |
|--------|---------------|---------------|
| Monthly phone clicks | 30+ | 80+ |
| Monthly form submissions | 10+ | 25+ |
| Form completion rate | > 25% | > 35% |
| Organic traffic | 150+ | 400+ |
| LCP | < 2.5s | < 2.0s |

### Planned Trades (Landscaper, Cleaner, Handyman)
| Metric | Month 1 Target | Month 3 Target |
|--------|---------------|---------------|
| Monthly phone clicks | 20+ | 50+ |
| Monthly form submissions | 20+ | 60+ |
| Form completion rate | > 30% | > 40% |
| Organic traffic | 200+ | 600+ |
| LCP | < 2.5s | < 2.5s |

### High-Ticket Trades (Roofer, General Contractor)
| Metric | Month 1 Target | Month 3 Target |
|--------|---------------|---------------|
| Monthly phone clicks | 15+ | 40+ |
| Monthly form submissions | 15+ | 40+ |
| Form completion rate | > 20% | > 30% |
| Organic traffic | 100+ | 300+ |
| Avg session duration | > 2:00 | > 2:30 |

---

## Industry Benchmarks (Reference Data)

### Conversion Rates
- Home services average CVR: 7.8%; top performers: 11%+
- Emergency services (plumber, HVAC, electrical): 12-20% CVR
- Planned services (landscaping, cleaning, roofing): 3-7% CVR
- Phone calls convert 10-15x more revenue than web forms (BrightLocal)
- 40% of consumers who call from search make a purchase (Google)

### Cost Per Lead by Trade
| Trade | Average CPL |
|-------|------------|
| Cleaning | $46.99 |
| Landscaping | ~$65 |
| Plumbing | ~$75 |
| Electrical | ~$85 |
| HVAC | ~$95 |
| General Contractor | ~$150 |
| Roofing | $228.15 |

*Source: WordStream Home Services Benchmark Report*

### Trust & Social Proof Impact
- Displaying reviews increases conversion up to 270% (Spiegel Research Center)
- Trust signals boost conversion 32% average (Baymard Institute)
- 50+ reviews = 23% higher local pack ranking (BrightLocal)
- LocalBusiness schema increases CTR 20-30% (Google Search Console data)

### Load Speed Impact
- Conversion drops 4.42% per additional second of load time (Portent)
- 1-second site converts 3x better than a 5-second site (Google/Deloitte)
- 53% of mobile users abandon if page takes > 3 seconds (Google)

### Mobile Traffic
- 63% of web traffic from mobile (Statcounter 2024)
- Emergency "near me" searches: 80%+ mobile
- Sticky click-to-call is highest converting single mobile element

---

## Core Web Vitals Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|------------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5s – 4.0s | > 4.0s |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1 – 0.25 | > 0.25 |
| INP (Interaction to Next Paint) | < 200ms | 200ms – 500ms | > 500ms |

**LCP element on contractor sites:** Almost always the hero section background image or heading.
Use `fetchpriority="high"` on hero images. Never lazy-load the LCP element.

---

## How to Report to Clients

Monthly report format (send at month-end):

```
Subject: [Company Name] Website — [Month] Performance Report

LEADS THIS MONTH
• Form submissions: XX (target: 50+) ✅/⚠️
• Phone call clicks: XX (target: 100+) ✅/⚠️

TRAFFIC
• Organic sessions: XX (+/-XX% vs last month)
• Top pages: homepage, [service], [service], [city], [city]

SITE HEALTH
• Mobile LCP: X.Xs ✅/⚠️
• No errors in console ✅/⚠️

NEXT MONTH
• [1 planned improvement]
```

Keep it short. Clients care about leads, not bounce rates.
