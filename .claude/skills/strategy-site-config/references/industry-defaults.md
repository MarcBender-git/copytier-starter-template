# Industry Defaults Reference — Out-of-Niche Configuration Guide

This file provides per-industry default configurations for out-of-niche builds.
When `siteConfig.niche` is set to `'custom'`, Pack 1 reads this file to populate the
`industry` section of `site.config.ts`.

These are **starting defaults** — the industry research skill/process refines them with
real competitive data, but this file provides the baseline so builds can start immediately.

---

## 1. Industry Type Selection

Match the client's business to the most specific `IndustryType`:

| Business Category | `industry.type` | When to Use |
|---|---|---|
| Engineering firm, consulting firm, law firm, accounting firm, architecture firm | `professional-service` | B2B firms selling expertise, credentials, and outcomes |
| Marketing agency, design studio, PR firm, branding agency, web development shop | `agency` | Creative services firms, portfolio-forward, results-driven |
| Restaurant, bar, cafe, bakery, food truck, catering | `restaurant` | Food & beverage establishments with dine-in, takeout, or catering |
| Online store, retail shop, D2C brand | `ecommerce` | Product-based businesses selling goods (physical or digital) |
| Medical practice, dental office, chiropractic, therapy, veterinary | `healthcare` | Licensed healthcare providers and medical practices |
| Charity, foundation, advocacy group, community org | `nonprofit` | Mission-driven organizations funded by donations/grants |
| Anything that doesn't fit the above | `custom` | Fully custom — all fields must be manually configured |

---

## 2. Schema.org Type Selection

Every industry maps to specific Schema.org types. Select the most specific available type.

| Industry | Primary Schema Type | Alternate Types | Notes |
|---|---|---|---|
| Engineering firm | `ProfessionalService` | `Organization` | No specific engineering subtype exists |
| Consulting firm | `ProfessionalService` | `Organization` | |
| Law firm | `LegalService` | `Attorney` | Use Attorney for solo practitioners |
| Accounting firm | `AccountingService` | `ProfessionalService` | |
| Architecture firm | `ProfessionalService` | `Organization` | |
| Marketing agency | `ProfessionalService` | `Organization` | MarketingAgency is proposed but not official |
| Design studio | `ProfessionalService` | `Organization` | |
| PR firm | `ProfessionalService` | `Organization` | |
| Restaurant | `Restaurant` | `FoodEstablishment` | Rich results for menus available |
| Bar | `BarOrPub` | `FoodEstablishment` | |
| Cafe / Bakery | `CafeOrCoffeeShop` / `Bakery` | `FoodEstablishment` | |
| Medical practice | `MedicalBusiness` | `Physician`, `Dentist` | Use specific subtype when available |
| Dental office | `Dentist` | `MedicalBusiness` | |
| Chiropractic | `Chiropractor` | `MedicalBusiness` | |
| Veterinary | `VeterinaryCare` | `MedicalBusiness` | |
| Therapy / counseling | `ProfessionalService` | `MedicalBusiness` | |
| Real estate agent | `RealEstateAgent` | `ProfessionalService` | |
| Retail store (general) | `Store` | `LocalBusiness` | |
| Clothing store | `ClothingStore` | `Store` | |
| Electronics store | `ElectronicsStore` | `Store` | |
| Nonprofit / NGO | `NGO` | `NonprofitOrganization` | |
| General B2B | `ProfessionalService` | `Organization` | ProfessionalService is safer than Organization |

---

## 3. Conversion Configuration Defaults

### Primary Action by Industry

| Industry Type | `primaryAction` | `showPhoneInHeader` | `showEmergencyBanner` | Typical Form Fields |
|---|---|---|---|---|
| `professional-service` | `meeting` | Sometimes (local) / No (national) | `false` | name, email, company, phone, projectType, message |
| `agency` | `meeting` | `false` | `false` | name, email, company, budget, projectType, message |
| `restaurant` | `booking` | `true` | `false` | name, email, phone, date, time, partySize, specialRequests |
| `ecommerce` | `purchase` | `false` | `false` | N/A (product pages have add-to-cart) |
| `healthcare` | `form` or `phone` | `true` | `false` | name, email, phone, insuranceProvider, reasonForVisit, preferredDate |
| `nonprofit` | `form` | `false` | `false` | name, email, donationAmount, message |

### CTA Text Defaults

| Industry Type | Primary CTA Text | Secondary CTA Text |
|---|---|---|
| `professional-service` | "Request a Consultation" | "View Our Projects" |
| `agency` | "Start a Project" | "See Our Work" |
| `restaurant` | "Make a Reservation" | "View Our Menu" |
| `ecommerce` | "Shop Now" | "View Collection" |
| `healthcare` | "Book an Appointment" | "Meet Our Providers" |
| `nonprofit` | "Donate Now" | "Learn About Our Mission" |

---

## 4. Design Style Defaults

| Industry Type | Default `designStyle` | Typography Character | Primary Color Direction |
|---|---|---|---|
| `professional-service` | `professional-clean` | Authoritative sans or serif heading + clean body | Deep blues, dark grays, muted greens |
| `agency` | `bold-creative` | Strong display heading + modern body | Brand-driven — wider palette permitted |
| `restaurant` | `warm-inviting` | Warm serif or rounded heading + readable body | Warm tones — deep reds, olive, amber |
| `ecommerce` | `professional-clean` | Clean, modern heading + highly readable body | Brand-driven, high-contrast CTA |
| `healthcare` | `warm-inviting` | Clean, approachable heading + readable body | Clean blues, soft greens, warm whites |
| `nonprofit` | `warm-inviting` | Approachable heading + readable body | Earth tones, mission-aligned colors |

---

## 5. Trust Signal Mapping

### Tier 1 (Above the fold — first impression)

| Industry Type | Default Tier 1 Trust Signals |
|---|---|
| `professional-service` | Client logos, key certifications, years in business, primary CTA |
| `agency` | Portfolio preview, notable client names, results metrics, primary CTA |
| `restaurant` | Hours, location, reservation CTA, rating |
| `ecommerce` | Product imagery, pricing, star ratings, add-to-cart CTA |
| `healthcare` | Provider credentials, insurance accepted, appointment CTA, rating |
| `nonprofit` | Mission statement, impact headline metric, donate/volunteer CTA |

### Tier 2 (First scroll — builds credibility)

| Industry Type | Default Tier 2 Trust Signals |
|---|---|
| `professional-service` | Case studies with results, team credentials, industry memberships, project portfolio |
| `agency` | Detailed case studies, process breakdown, testimonials from named decision-makers |
| `restaurant` | Menu, ambiance photos, chef story, press mentions |
| `ecommerce` | Customer reviews, product details, shipping/return policies, brand story |
| `healthcare` | Provider bios, patient testimonials, insurance list, office photos |
| `nonprofit` | Programs/initiatives, impact data, volunteer stories, financials/transparency |

### Tier 3 (Deeper on page — differentiators)

| Industry Type | Default Tier 3 Trust Signals |
|---|---|
| `professional-service` | Thought leadership, whitepapers, speaking engagements, patents, community involvement |
| `agency` | Blog/thought leadership, awards, conference talks, partner logos |
| `restaurant` | Events, private dining, catering info, sustainability practices |
| `ecommerce` | Blog/how-to content, loyalty program, sustainability, media mentions |
| `healthcare` | Research publications, community outreach, continuing education, facility certifications |
| `nonprofit` | Annual reports, board members, partner organizations, press coverage |

---

## 6. Homepage Section Flow Defaults

These define the `industry.homepageSections` array for each industry type.

### Professional Service (B2B)
```
['hero', 'clientLogos', 'services', 'caseStudy', 'team', 'process', 'cta', 'testimonials', 'faq']
```

### Agency / Creative
```
['hero', 'resultMetrics', 'portfolio', 'services', 'process', 'team', 'testimonials', 'blogPreview', 'cta']
```

### Restaurant / Hospitality
```
['hero', 'menuHighlights', 'about', 'gallery', 'locationHours', 'reviews', 'reservationCTA']
```

### E-commerce / Retail
```
['hero', 'categories', 'bestSellers', 'socialProof', 'brandStory', 'newsletterSignup']
```

### Healthcare / Medical
```
['hero', 'services', 'credentials', 'providerProfiles', 'testimonials', 'faq', 'contactCTA']
```

### Nonprofit
```
['hero', 'missionImpact', 'programs', 'impactData', 'stories', 'getInvolved', 'donateCTA']
```

---

## 7. SEO Configuration Defaults

| Industry Type | `titleFormat` | `localSEO` | `serviceAreaPages` |
|---|---|---|---|
| `professional-service` (local) | `[Page] \| [Company] — [City]` | `true` | `false` |
| `professional-service` (national) | `[Page] \| [Company] — [Tagline]` | `false` | `false` |
| `agency` | `[Page] \| [Company]` | `false` | `false` |
| `restaurant` | `[Restaurant] — [Cuisine] in [City]` | `true` | `false` |
| `ecommerce` | `[Product/Page] \| [Brand]` | `false` | `false` |
| `healthcare` (local) | `[Service] \| [Practice] — [City]` | `true` | `false` |
| `nonprofit` | `[Page] \| [Organization]` | `false` | `false` |

**Note:** `serviceAreaPages` is `false` for all non-home-service industries by default. Only set to `true` if the business explicitly covers named geographic areas (rare outside home services).

---

## 8. Conversion Benchmarks by Industry

Use these benchmarks to set realistic `successMetrics` in site.config.ts.

| Industry Type | Avg. Conversion Rate | Primary CTA | Sales Cycle | Mobile vs. Desktop |
|---|---|---|---|---|
| Emergency home services (core) | 12–20% mobile | Phone call | Minutes–hours | 70–80% mobile |
| Planned home services | 6–12% desktop | Form / booking | Days–weeks | 50–60% mobile |
| B2B Professional Services | 1.5–4% | Form / meeting | Weeks–months | 30–40% mobile |
| Marketing Agency / Creative | 2–5% | Form / meeting | Weeks | 40–50% mobile |
| Healthcare / Medical | 3–5% | Form / phone | Days–weeks | 55–65% mobile |
| Restaurant / Hospitality | 5–10% | Reservation / order | Minutes | 65–75% mobile |
| E-commerce / Retail | 2–4% | Purchase | Minutes–days | 55–70% mobile |
| SaaS / Technology | 1–3% | Demo / trial | Weeks–months | 30–40% mobile |
| Real Estate | 2–5% | Form / phone | Weeks–months | 50–60% mobile |
| Education / Training | 3–6% | Enrollment / form | Days–weeks | 45–55% mobile |
| Nonprofit | 3–8% | Donation / volunteer | Variable | 50–60% mobile |

---

## 9. Feature Flag Defaults by Industry

When `niche === 'custom'`, adjust the `features` section based on industry type:

| Feature | professional-service | agency | restaurant | ecommerce | healthcare | nonprofit |
|---|---|---|---|---|---|---|
| `blog` | `true` (thought leadership) | `true` (content marketing) | `false` | `true` (SEO/content) | `true` (patient education) | `true` (stories/updates) |
| `faqPage` | `true` | `false` | `false` | `true` | `true` | `true` |
| `galleryPage` | `true` (project portfolio) | `true` (portfolio) | `true` (ambiance) | `false` | `true` (facility) | `true` (impact photos) |
| `caseStudies` | `true` | `true` | `false` | `false` | `false` | `true` (impact stories) |
| `stickyMobileCTA` | `true` | `false` | `true` | `true` | `true` | `true` |
| `emergencyBanner` | `false` | `false` | `false` | `false` | `false` | `false` |
| `cookieConsent` | `true` | `true` | `true` | `true` | `true` | `true` |
| `honeypotField` | `true` | `true` | `true` | `true` | `true` | `true` |

---

## 10. How Skills Use the Industry Layer

### Pack 1 (Strategy & Site Config)
- Reads Build Brief → detects industry → selects `IndustryType`
- Populates entire `industry` section using these defaults + brief-specific data
- Sets `niche` to `'custom'`

### Pack 2 (Design System)
- Reads `industry.designStyle` → applies matching color psychology, typography rules
- Falls back to contractor defaults if `industry` section is absent

### Pack 3 (Site Architecture)
- Reads `industry.homepageSections` → scaffolds homepage in that order
- Reads `industry.seo.serviceAreaPages` → conditionally creates/skips service area routes
- Reads `industry.conversion.showPhoneInHeader` → adjusts header layout

### Pack 4 (Component Library)
- Reads `industry.conversion.primaryAction` → builds appropriate CTA components
- Reads `industry.conversion.showEmergencyBanner` → conditionally includes emergency banner
- Reads `industry.conversion.formFields` → builds the contact form with correct fields

### Pack 5 (Content & SEO)
- Reads `industry.type` → selects copy tone and headline formula
- Reads `industry.seo.titleFormat` → generates title tags per format
- Reads `industry.schemaType` → uses correct schema.org type in JSON-LD
- Reads `industry.trustSignals` → weaves appropriate trust elements into copy

### Pack 6 (Backend & Integrations)
- Reads `industry.conversion.formFields` → creates matching Supabase schema columns
- Reads `industry.conversion.primaryAction` → adjusts Server Action response handling

### Pack 7 (Security & Performance)
- No industry-specific overrides — security and performance rules are universal

### Pack 8 (QA & Launch)
- Reads `industry.type` → adjusts E2E test assertions (e.g., doesn't check for license number on B2B sites)
- Reads `industry.seo` → validates title format matches the configured pattern
