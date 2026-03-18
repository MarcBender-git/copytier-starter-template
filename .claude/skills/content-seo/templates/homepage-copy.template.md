# Homepage Copy Template
## Niche: Plumber | Example Business: Valley Plumbing Co., Sacramento CA

**How to use:** Replace every `[VARIABLE]` with data from siteConfig. Variables map directly to siteConfig fields. Do not leave any `[VARIABLE]` in published output.

---

## SEO Metadata

```typescript
export const metadata: Metadata = {
  title: "Plumber in [CITY] | [BUSINESS_NAME]",
  // Example: "Plumber in Sacramento | Valley Plumbing Co."
  // Target: 50–60 chars

  description: "Licensed plumber in [CITY] — [BUSINESS_NAME] offers 24/7 emergency plumbing, water heater repair, drain cleaning & more. [REVIEW_RATING]-star rated. Call [PHONE].",
  // Example: "Licensed plumber in Sacramento — Valley Plumbing Co. offers 24/7 emergency plumbing, water heater repair, drain cleaning & more. 4.9-star rated. Call (916) 555-0100."
  // Target: 150–160 chars

  openGraph: {
    title: "Plumber in [CITY] | [BUSINESS_NAME]",
    description: "[same as above]",
    url: "https://[DOMAIN]",
    images: [{ url: "https://[DOMAIN]/images/og/homepage.jpg", width: 1200, height: 630, alt: "[BUSINESS_NAME] plumbing truck in [CITY], CA" }],
    type: "website",
    locale: "en_US",
  },
  alternates: { canonical: "https://[DOMAIN]" }
}
```

---

## Section 1: Hero

### H1
```
Emergency Plumber in [CITY] — Licensed, Available 24/7
```
Character check: ~53 chars with city name. Adjust trust signal if city is longer.

Alternative H1s (pick based on contractor's strongest USP):
```
[CITY] Plumber Since [FOUNDING_YEAR] — [REVIEW_COUNT]+ Five-Star Reviews
Same-Day Plumbing in [CITY] | Licensed & Insured — CA Lic. #[LICENSE_NUMBER]
```

### Subheadline
```
Serving [CITY] and [SERVICE_AREA_2], [SERVICE_AREA_3], and [SERVICE_AREA_4] since [FOUNDING_YEAR].
We answer the phone. We show up on time. We fix it right.
```

### Primary CTA Button
```
Call [PHONE]
```
OR (if form is primary):
```
Schedule My Free Estimate
```

### Hero Supporting Microcopy (below CTA)
```
No trip fee · Free estimates · Licensed & insured
```

### Hero Image Alt Text
```
[BUSINESS_NAME] plumbing service truck parked outside a [CITY], CA home
```

---

## Section 2: Trust Bar

Five items, displayed as iconographic badges:

```
Licensed — CA Lic. #[LICENSE_NUMBER]
Bonded & Insured
Serving [CITY] Since [FOUNDING_YEAR]
[REVIEW_RATING] Stars — [REVIEW_COUNT]+ Google Reviews
[NICHE_CERTIFICATION] Certified  ← only if applicable
```

---

## Section 3: Services Overview

### Section H2
```
[CITY] Plumbing Services — Residential & Commercial
```

### Service Cards

**Card 1: Emergency Plumbing**
```
Heading: Emergency Plumbing Repair
Body: Burst pipe, flooding, or no water at all? We respond to [CITY] plumbing
emergencies within [EMERGENCY_RESPONSE_TIME]. Fully stocked service trucks
mean most emergencies are fixed in one visit.
CTA: Call Now →
Link: /services/emergency-plumbing
```

**Card 2: Water Heater Repair & Replacement**
```
Heading: Water Heater Repair & Installation
Body: No hot water is more than an inconvenience. We diagnose, repair, and replace
water heaters same-day in [CITY]. All major brands. Tank and tankless.
CTA: Get a Free Estimate →
Link: /services/water-heater
```

**Card 3: Drain Cleaning**
```
Heading: Drain Cleaning & Clog Removal
Body: Slow drains, recurring clogs, or a complete backup — we clear it and show you
what caused it. Camera inspection available for persistent drain problems.
CTA: Schedule Service →
Link: /services/drain-cleaning
```

**Card 4: Leak Detection & Repair**
```
Heading: Leak Detection & Pipe Repair
Body: Water bills spiking? Wet spots on the ceiling or floor? We locate leaks without
tearing up walls — and repair them properly, with a warranty.
CTA: Diagnose My Leak →
Link: /services/leak-detection
```

**Card 5: [SERVICE_5_NAME]** ← pull from siteConfig.services[4]
```
Heading: [SERVICE_5_NAME]
Body: [SERVICE_5_DESCRIPTION — 2 sentences, outcome-focused]
CTA: Learn More →
Link: /services/[SERVICE_5_SLUG]
```

**Card 6: [SERVICE_6_NAME]** ← pull from siteConfig.services[5]
```
Heading: [SERVICE_6_NAME]
Body: [SERVICE_6_DESCRIPTION — 2 sentences, outcome-focused]
CTA: Learn More →
Link: /services/[SERVICE_6_SLUG]
```

*Include only as many cards as the client has services in siteConfig.services[].*

---

## Section 4: Social Proof (Testimonials)

### Section H2
```
What [CITY] Homeowners Say About [BUSINESS_NAME]
```

### Review Summary Line
```
[REVIEW_RATING] out of 5 stars · [REVIEW_COUNT]+ verified Google reviews
```

### Testimonial 1 (Emergency/urgency scenario)
```
"Our main line backed up on a Sunday night and [BUSINESS_NAME] had someone at our door
in under an hour. Fixed it completely. Honest about what it would cost before they started.
I won't call anyone else."
— Karen M., [PRIMARY_CITY_NEIGHBORHOOD or CITY]
★★★★★
```

### Testimonial 2 (Water heater / planned service)
```
"I needed my water heater replaced and [OWNER_NAME] came out, gave me options at two
different price points, explained the difference, and installed the new one the same day.
Clean work, left no mess, and the price was exactly what was quoted."
— David R., [SERVICE_AREA_2]
★★★★★
```

### Testimonial 3 (Trust/reliability)
```
"I've used [BUSINESS_NAME] three times now. They show up when they say they will. They
explain what they found and what it costs before touching anything. That's rarer than
it should be."
— Patricia W., [PRIMARY_CITY]
★★★★★
```

### CTA under testimonials
```
Read All [REVIEW_COUNT]+ Reviews on Google →
[link to Google Business Profile reviews — opens in new tab]
```

*Use real testimonials from siteConfig.testimonials[]. The templates above show format and tone only.*

---

## Section 5: About Teaser

### Section H2
```
[CITY]'s Family-Owned Plumber — Serving the Community Since [FOUNDING_YEAR]
```

### Body Copy
```
[BUSINESS_NAME] was started by [OWNER_NAME] in [FOUNDING_YEAR] with a simple idea:
plumbers who show up on time, explain what's wrong, and charge what they quoted.

[OWNER_NAME] grew up in [CITY] and has been working on [PRIMARY_CITY] homes for
[YEARS_IN_BUSINESS] years. When you call [BUSINESS_NAME], you're not calling a
regional franchise — you're calling a neighbor who happens to be an expert plumber.
```

### CTA
```
Read Our Story →
Link: /about
```

---

## Section 6: Service Areas

### Section H2
```
Serving [CITY] and Surrounding Communities
```

### Intro Paragraph
```
From [PRIMARY_CITY] to [SERVICE_AREA_FURTHEST], [BUSINESS_NAME] serves homeowners
and businesses throughout [COUNTY] County and beyond. Same licensed plumbers,
same standards, wherever you are.
```

### City Links (one per line, each linking to its area page)
```
[SERVICE_AREA_1] (/service-areas/[area-1-slug])
[SERVICE_AREA_2] (/service-areas/[area-2-slug])
[SERVICE_AREA_3] (/service-areas/[area-3-slug])
[SERVICE_AREA_4] (/service-areas/[area-4-slug])
[SERVICE_AREA_5] (/service-areas/[area-5-slug])
[+ additional areas from siteConfig.serviceAreas[]]
```

---

## Section 7: FAQ

### Section H2
```
Frequently Asked Questions About [CITY] Plumbing
```

### FAQ 1 — Cost
```
Q: How much does a plumber cost in [CITY]?

A: Most plumbing service calls in [CITY] run $150–$450 for standard repairs like
   drain clogs, minor leaks, or fixture replacements. Larger jobs like water heater
   installation ($900–$1,800) or sewer line repair ($1,500–$4,000+) cost more.
   [BUSINESS_NAME] provides written estimates before any work starts — there are
   no surprise charges. Call [PHONE] for a free assessment.
```

### FAQ 2 — Response time
```
Q: How fast can you get a plumber to my house in [CITY]?

A: For plumbing emergencies in [CITY], [BUSINESS_NAME] responds within
   [EMERGENCY_RESPONSE_TIME], 24 hours a day, 7 days a week. For scheduled
   service calls, we offer same-day and next-day appointments Monday through
   Saturday. Call [PHONE] and we'll tell you our earliest availability.
```

### FAQ 3 — Licensing
```
Q: Is [BUSINESS_NAME] a licensed plumber?

A: Yes. [BUSINESS_NAME] holds California Plumbing License #[LICENSE_NUMBER].
   We're fully bonded and carry [INSURANCE_COVERAGE] in liability insurance.
   All work is performed by licensed journeyman plumbers — not apprentices
   working unsupervised.
```

### FAQ 4 — Emergency availability
```
Q: Do you offer 24-hour emergency plumbing in [CITY]?

A: Yes. [BUSINESS_NAME] provides 24/7 emergency plumbing service throughout
   [CITY] and [SERVICE_AREAS_BRIEF_LIST]. Burst pipes, sewage backups, major
   leaks, and flooding don't wait — and neither do we. Call [PHONE] any time,
   day or night.
```

### FAQ 5 — Permits
```
Q: Do I need a permit for plumbing work in [CITY]?

A: Permits are required for most plumbing installations and significant repairs in
   [CITY] — including water heater replacements, sewer line work, and new
   fixture installations. [BUSINESS_NAME] handles the permitting process for
   all applicable jobs, so you don't have to navigate the city building department
   yourself.
```

### FAQ 6 — What to do in a plumbing emergency
```
Q: What should I do while waiting for an emergency plumber?

A: First, shut off your main water supply valve — it's usually near the water
   meter or where the main line enters your home. This stops active flooding.
   Then call [PHONE]. While you wait, move valuables out of water's path and
   take photos for insurance purposes. Don't use any water fixtures until the
   plumber has assessed the situation.
```

### FAQ 7 — Brands
```
Q: What water heater brands do you install?

A: [BUSINESS_NAME] installs and services [BRAND_1], [BRAND_2], [BRAND_3], and
   most other major brands. We stock common tank water heaters on our service
   trucks for same-day replacements. For tankless systems, we typically order
   within 24 hours. Ask about current manufacturer promotions — we pass rebates
   directly to our customers.
```

### FAQ 8 — Guarantee
```
Q: Do you guarantee your plumbing work?

A: Yes. [BUSINESS_NAME] backs all labor with a [WARRANTY_PERIOD] workmanship
   warranty. If something we repaired fails due to our work within that period,
   we come back and fix it at no additional charge. Parts carry the manufacturer
   warranty, which we help you navigate if needed.
```

---

## Section 8: Final CTA

### Headline
```
Ready to Get Your Plumbing Problem Solved?
```

### Subhead
```
Call [PHONE] — We answer 24/7 for emergencies.
[BUSINESS_HOURS] for scheduled service.
```

### CTA Buttons
```
Primary: Call [PHONE]
Secondary: Schedule My Free Estimate
```

### Supporting Copy
```
Licensed [CITY] plumber. Free estimates. No surprise charges.
CA Lic. #[LICENSE_NUMBER] · [REVIEW_RATING] Stars · [REVIEW_COUNT]+ Reviews
```

---

## Footer NAP (appears in site-wide footer)

```
[BUSINESS_NAME]
[ADDRESS_STREET]
[ADDRESS_CITY], CA [ADDRESS_ZIP]

[PHONE]
[EMAIL]  ← only if siteConfig.business.email exists

[BUSINESS_HOURS]

CA Lic. #[LICENSE_NUMBER]
```

---

## Notes on Variable Replacement

| Variable | siteConfig Field |
|----------|-----------------|
| [BUSINESS_NAME] | `siteConfig.business.name` |
| [CITY] | `siteConfig.business.city` |
| [PHONE] | `siteConfig.business.phone` |
| [DOMAIN] | `siteConfig.domain` |
| [LICENSE_NUMBER] | `siteConfig.trustSignals.licenseNumber` |
| [FOUNDING_YEAR] | `siteConfig.business.foundedYear` |
| [YEARS_IN_BUSINESS] | current year − foundedYear |
| [REVIEW_RATING] | `siteConfig.reviews.rating` |
| [REVIEW_COUNT] | `siteConfig.reviews.count` |
| [OWNER_NAME] | `siteConfig.business.ownerName` |
| [EMERGENCY_RESPONSE_TIME] | `siteConfig.contact.emergencyResponseTime` |
| [WARRANTY_PERIOD] | `siteConfig.trustSignals.warrantyPeriod` |
| [BUSINESS_HOURS] | `siteConfig.contact.hours` |
| [SERVICE_AREA_N] | `siteConfig.serviceAreas[n-1].city` |
