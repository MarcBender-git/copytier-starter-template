# Feature Prioritization — MoSCoW Templates

MoSCoW priority framework for contractor websites. Determines what ships on day 1 (MVP),
what gets added in Phase 2 (month 2-3), and what never gets built.

---

## Universal MoSCoW (All Niches)

These priorities apply to every contractor website regardless of trade.

### Must Have — Ships at Launch
- Homepage with hero, services overview, testimonials, CTA
- Individual service pages (one per service listed in siteConfig)
- Contact page with form and phone number
- About page with team/company info
- Footer with NAP (Name, Address, Phone) — local SEO anchor
- Mobile responsive design across all breakpoints
- Basic SEO: unique title, meta description, H1, canonical on every page
- HTTPS (automatic via Vercel)
- Click-to-call button visible without scrolling on mobile
- JSON-LD schema: LocalBusiness, Service, BreadcrumbList
- Cookie consent banner (CCPA requirement)
- Privacy policy page
- 404 error page
- XML sitemap + robots.txt

### Should Have — Ships at Launch If Time Allows
- Service area pages (one per city in serviceArea.cities[])
- Reviews / testimonials section on homepage
- FAQ page or FAQ section on homepage
- Open Graph tags for social sharing
- FAQPage JSON-LD schema on FAQ page
- Google Analytics 4 setup
- Trust bar section (rating, years, license, guarantees)

### Could Have — Phase 2 (Month 2-3)
- Blog posts targeting long-tail keywords
- Before/after photo gallery
- Video testimonials
- Online booking widget (if trade supports scheduling)
- Emergency service landing pages
- Google Business Profile integration
- Process/how-it-works page
- Financing information page (high-ticket trades)

### Won't Have — Not in Scope
- Customer portal or account login
- Online payments or invoicing
- Multi-language versions (separate site required)
- eCommerce or product catalog
- AI chatbot
- Auto-rotating carousels
- Real-time inventory or availability
- Job board or careers portal

---

## Niche-Specific Adjustments

What moves between Must/Should/Could for each trade:

| Feature | Plumber | HVAC | Electrician | Roofer | Landscaper | Handyman | Cleaner | GC |
|---------|---------|------|-------------|--------|------------|----------|---------|-----|
| Emergency landing page | **MUST** | **MUST** | Should | Could | Won't | Could | Won't | Won't |
| Financing page | Won't | Should | Won't | **MUST** | Won't | Won't | Won't | **MUST** |
| Before/after gallery | Could | Could | Could | Should | **MUST** | Should | Should | **MUST** |
| Online booking | Won't | Should | Won't | Won't | Should | Should | **MUST** | Won't |
| Service area pages | **MUST** | **MUST** | **MUST** | **MUST** | Should | Should | **MUST** | Should |
| Equipment brands page | Won't | Should | Should | Won't | Won't | Won't | Won't | Won't |
| Maintenance plans page | Won't | Should | Won't | Could | Should | Won't | **MUST** | Won't |
| Insurance claims help | Won't | Won't | Won't | **MUST** | Won't | Won't | Won't | Could |

---

## Phase Definitions

### Phase 1 — MVP (Ships at Launch, Day 1)
Everything in Must Have. Goal: site is live, phone rings, leads come in.
Timeline: 1-2 weeks from Build Brief to go-live.

### Phase 2 — Growth (Month 2-3)
Everything in Should Have that didn't make Phase 1, plus top items from Could Have.
Triggered when: site is live, client confirms business is active, wants to invest in SEO growth.
Common additions: service area pages, blog posts, before/after gallery, booking widget.

### Phase 3 — Optimization (Month 4+)
Remaining Could Have items. Data-driven — add features based on what the analytics show.
Common additions: video testimonials, advanced schema, additional city pages, case studies.

---

## Feature Dependency Map

Some features require other features to be built first:

```
Service area pages
  └── requires: service pages (parent pages for breadcrumbs and internal linking)

FAQPage schema
  └── requires: FAQ section or page (must have content to schema-ify)

Online booking widget
  └── requires: contact page (fallback if booking fails)
  └── requires: GA4 setup (track booking conversion)

Blog posts
  └── requires: XML sitemap (for indexing)
  └── requires: GA4 setup (to measure traffic)

Before/after gallery
  └── requires: real client photos (cannot use stock photos)
  └── requires: image optimization setup (next/image)

Google Analytics 4
  └── requires: Cookie consent banner (must load after consent — CCPA)

Video testimonials
  └── requires: real video footage from client
  └── requires: Next.js video optimization or YouTube embed

AggregateRating schema
  └── requires: at least 1 testimonial in siteConfig.testimonials[]
  └── requires: siteConfig.trust.rating + siteConfig.trust.reviewCount
```

---

## Pre-Launch Checklist

Before any site goes to production, verify these are in place:

**Content:**
- [ ] No placeholder text anywhere (no "Lorem ipsum", no "[COMPANY NAME]")
- [ ] Phone number is correct and clickable
- [ ] Address is correct and matches Google Business Profile
- [ ] License number is correct

**Technical:**
- [ ] pnpm build completes with zero errors
- [ ] No console errors on any page
- [ ] All images load (no broken image icons)
- [ ] Contact form submits and sends email
- [ ] Mobile viewport tested at 375px

**SEO:**
- [ ] Unique title on every page
- [ ] Unique meta description on every page
- [ ] JSON-LD schema on homepage and contact page
- [ ] robots.txt present and not blocking crawlers
- [ ] XML sitemap accessible at /sitemap.xml

**Legal:**
- [ ] Cookie consent banner appears on first visit
- [ ] Privacy policy page exists at /privacy
- [ ] Analytics does NOT load before cookie consent
