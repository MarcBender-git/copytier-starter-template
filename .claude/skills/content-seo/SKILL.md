---
name: content-seo
description: >
  Use when writing or rewriting page copy, headlines, service descriptions, CTAs, microcopy,
  error messages, title tags, meta descriptions, JSON-LD schema markup, FAQ content, or any
  text content for contractor websites. Also use for SEO audits, AEO/GEO optimization,
  and content strategy. Copy and SEO are produced TOGETHER — the headline that converts is
  the H1 that ranks. Reads siteConfig.business, .services[], .niche, .trustSignals,
  .contact, .valueProposition, and Pack 3 page templates.
---

# Pack 5 — Content, Copywriting & SEO

## 1. Overview: Voice + Visibility Engine

Content and SEO are built in a single pass. They are not separate disciplines — they are one thing.

**The H1 that converts IS the H1 that ranks.**

A headline written for the algorithm that reads like a keyword list will not convert. Copy that sounds great but ignores search intent will not rank. Neither serves the contractor. This skill produces copy that does both simultaneously: it speaks to the homeowner with a burst pipe at 11pm AND signals to Google exactly what this page covers.

Every word on a website must earn its place by doing at least one of:
- Reducing anxiety
- Building trust
- Driving a specific action
- Reinforcing a keyword signal

If it doesn't do at least one of those things, cut it.

### Industry Context Awareness

**Check `siteConfig.niche` before writing any copy:**

**Home-service builds (niche ≠ 'custom'):**
The contractor website context is unique: the visitor already has a problem. They're not browsing — they're deciding who to call. Copy that understands this urgency wins.

**Out-of-niche builds (niche = 'custom'):**
Read `siteConfig.industry.type` to set the copy context. Different industries have different visitor mindsets:

| Industry Type | Visitor Mindset | Copy Tone |
|---|---|---|
| `professional-service` | Evaluating expertise, comparing firms, assessing credentials | Authoritative, outcome-focused. Lead with credentials and results, not urgency |
| `agency` | Looking for creative partners, evaluating past work, seeking results | Confident, results-driven. Lead with portfolio outcomes and client impact |
| `restaurant` | Deciding where to eat, checking menu/ambiance/reviews | Warm, sensory, inviting. Lead with atmosphere and food quality |
| `ecommerce` | Shopping, comparing products, checking reviews/prices | Clear, benefit-focused. Lead with product value and social proof |
| `healthcare` | Seeking care, evaluating providers, checking insurance/credentials | Empathetic, reassuring. Lead with patient outcomes and provider credentials |
| `nonprofit` | Evaluating mission alignment, considering involvement/donation | Mission-driven, impact-focused. Lead with stories and measurable impact |

Use `siteConfig.industry.conversion.primaryAction` to determine CTA language patterns.
Use `siteConfig.industry.trustSignals` to determine which trust elements to weave into copy.

---

## 2. Content Build Workflow

### Step 1: Read siteConfig for Business Context

Before writing a single word, internalize these fields:

```
siteConfig.business.name          → used in all copy exactly as spelled
siteConfig.business.city          → primary city for all local targeting
siteConfig.business.serviceAreas  → all cities, used in area pages and geo signals
siteConfig.business.phone         → woven into CTAs, appears ≥ 2× per page
siteConfig.niche                  → drives voice, terminology, trust signals
siteConfig.services[]             → service names, descriptions, features — use EXACTLY these names
siteConfig.trustSignals           → license #, years in business, review count/rating
siteConfig.contact                → address, hours, response time promise
siteConfig.valueProposition       → what differentiates this contractor
siteConfig.testimonials           → real quotes to pull into proof sections
```

Never invent business data. If a required field is missing or empty, write `// TODO: CLIENT TO PROVIDE — [field name]` and continue. Do not fabricate license numbers, years in business, review counts, or testimonials.

### Step 2: Establish Voice Guidelines

Reference `references/voice-guidelines.md` for the niche-specific voice profile.

Every contractor voice lives on this spectrum:
- **Authoritative, not arrogant** — "We've repaired hundreds of [City] furnaces" not "We're the best HVAC company in [City]"
- **Direct, not pushy** — "Call for a free estimate" not "ACT NOW BEFORE IT'S TOO LATE"
- **Human, not corporate** — "We'll show up on time" not "We endeavor to provide timely service delivery"
- **Specific, not vague** — "Licensed, bonded & insured — CA Lic. #1234567" not "Fully certified professionals"

Set the voice profile at the top of the content document. Every writer (human or AI) on this project reads it before drafting.

### Step 3: Generate Per-Page Content

Reference `references/per-page-content-matrix.md` for the full section-by-section spec.

Write each page in this order — this is not optional:

1. **H1 headline** — must contain service + city + one trust signal
2. **Hero subheadline** — expands the promise, 1–2 sentences, max 25 words
3. **Primary CTA** — action verb first, outcome specific
4. **Body sections** following Problem → Solution → Proof arc
5. **Supporting CTAs** — every ~300 words of body copy
6. **FAQ section** — minimum 5 questions, structured for AEO
7. **Trust signals** woven into body copy, not bolted on as a badge section

**Word count targets:**

| Page Type | Target Word Count |
|-----------|------------------|
| Homepage | 800–1,200 visible words |
| Service page | 600–900 words |
| Service area page | 500–750 words (UNIQUE content) |
| About page | 400–600 words |
| Contact page | 200–300 words |
| FAQ standalone | 800–1,200 words |

### Step 4: Generate All SEO Metadata Simultaneously

For every page, produce the following in the same content-writing pass:

```typescript
// Output format for each page — insert into generateMetadata() in page.tsx
export const metadata: Metadata = {
  title: "[Service] in [City] | [Business Name]",           // 50–60 chars
  description: "[CTA verb] [service] in [City]. [USP]. [Trust signal]. Call [phone].",  // 150–160 chars
  openGraph: {
    title: "[Service] in [City] | [Business Name]",
    description: "[Meta description text]",
    url: "https://[domain]/[slug]",
    images: [{ url: "/images/og/[page-slug].jpg", width: 1200, height: 630, alt: "[Service] in [City]" }],
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://[domain]/[slug]"
  },
  robots: { index: true, follow: true }
}
```

Non-negotiable rules:
- Every title tag MUST be unique across the site
- Every meta description MUST be unique — duplicate metas are an immediate ranking penalty
- Canonical always self-references (unless explicitly handling duplicate content situations)
- OG image: 1200×630px minimum, service-relevant imagery, company name overlaid

### Step 5: Generate JSON-LD Schema Per Page Type

Reference `references/schema-templates.md` for complete copy-paste templates.

Required schema by page type:

**Home-service builds (niche ≠ 'custom') — use `siteConfig.schemaType` as the LocalBusiness subtype:**

| Page Type | Required Schema Types |
|-----------|----------------------|
| Homepage | LocalBusiness + AggregateRating (if reviews exist) |
| Service page | LocalBusiness + Service + FAQPage + BreadcrumbList |
| Service area page | LocalBusiness + Service + FAQPage + BreadcrumbList |
| About page | LocalBusiness + BreadcrumbList |
| Contact page | LocalBusiness + BreadcrumbList |
| Standalone FAQ | LocalBusiness + FAQPage |
| Blog post | Article + BreadcrumbList + LocalBusiness |

**Out-of-niche builds (niche = 'custom') — use `siteConfig.industry.schemaType` as the primary type:**

| Page Type | Required Schema Types |
|-----------|----------------------|
| Homepage | `[industry.schemaType]` + AggregateRating (if reviews exist) |
| Service/capability page | `[industry.schemaType]` + Service + FAQPage + BreadcrumbList |
| About page | `[industry.schemaType]` + BreadcrumbList |
| Contact page | `[industry.schemaType]` + BreadcrumbList |
| Portfolio/case study | `[industry.schemaType]` + Article + BreadcrumbList |
| Blog post | Article + BreadcrumbList + `[industry.schemaType]` |

Note: For non-local businesses (`industry.seo.localSEO === false`), use `Organization` as a fallback if `industry.schemaType` doesn't extend `LocalBusiness`. For local businesses, always use `LocalBusiness` or a valid subtype.

Schema is implemented as a typed React component returning `<script type="application/ld+json">`. See schema-templates.md for the exact component pattern. Never leave placeholder values in published schema — invalid JSON-LD provides zero benefit.

### Step 6: Generate FAQ Content Structured for AEO

Reference `references/aeo-geo-optimization.md` for the full strategy.

FAQ content rules:
- **Question:** Written exactly how a homeowner types it — colloquial, specific, includes city or service when natural
- **Answer:** 40–120 words. First sentence IS the answer — no preamble, no "Great question!"
- **Minimum per page:** 5 questions on service pages, 8 on homepage, 5 on area pages
- **Question types to include per service page:** cost, timeline, insurance coverage, brands used, emergency availability, DIY risks, process overview, what to expect during the visit

### Step 7: Quality Checkpoints

Verify all checkpoints before handoff to Pack 6. See Section 8 for the full checklist.

---

## 3. Copywriting Rules

### The Headline Formula

**Check `siteConfig.niche` for the appropriate formula:**

**Home-service builds (niche ≠ 'custom'):**

**[Specific Outcome] + [Speed or Convenience Signal] + [Trust Qualifier]**

```
✓ "Emergency Plumbing in Sacramento — Licensed, Available 24/7"
✓ "Roof Replacement in San Jose | 50-Year Warranty, A+ BBB Rating"
✓ "Same-Day AC Repair in Fresno | 20+ Years Serving the Central Valley"
✗ "Quality Plumbing Services"          ← no outcome, no speed, no trust
✗ "Your Local HVAC Experts"            ← vague, no location, no outcome
✗ "Welcome to Valley Plumbing Co."     ← wastes most valuable SEO real estate
```

The H1 must contain all three elements. If you can only fit two, drop the convenience signal and keep the outcome + trust qualifier.

**Out-of-niche builds (niche = 'custom'):**

The headline formula adapts per `industry.type`:

| Industry Type | Headline Formula | Example |
|---|---|---|
| `professional-service` | **[Outcome] + [Credential] + [Differentiator]** | "Engineering Solutions That Stand the Test of Time — 30 Years, 500+ Projects" |
| `agency` | **[Bold Result Claim] + [Proof Point]** | "We Build Brands That Outperform — $2.3B in Client Revenue Generated" |
| `restaurant` | **[Sensory/Emotional Hook] + [Cuisine/Location]** | "Authentic Italian in the Heart of Sacramento" |
| `healthcare` | **[Patient Outcome] + [Credential] + [Reassurance]** | "Compassionate Family Medicine — Board-Certified, Accepting New Patients" |
| `nonprofit` | **[Mission Statement] + [Impact Metric]** | "Clean Water for Every Community — 1.2M Lives Changed Since 2010" |
| `ecommerce` | **[Product Benefit] + [Social Proof]** | "Premium Outdoor Gear — Trusted by 50,000+ Adventurers" |

The H1 must still contain at least two of: specific outcome, trust qualifier, and differentiator. Never use "Welcome to" as an H1 regardless of industry.

### Reading Level Standard

All body copy must read at Grade 8 or below on the Hemingway scale.

Rules that achieve this automatically:
- Sentences under 20 words preferred; 30 words absolute maximum
- Paragraphs of 2–3 sentences, never more
- No jargon without immediate plain-English definition
- Active voice in 90%+ of sentences
- When in doubt between a simple word and a sophisticated word — use the simple word

### Problem → Solution → Proof Structure

Every service page body follows this arc:

**Problem (50–100 words):** Name the situation the homeowner is in. Use sensory or emotional specificity ("No hot water on a February morning..." or "Water spreading across your hardwood floor..."). Never make the reader feel stupid for having the problem.

**Solution (150–250 words):** What the contractor does, step by step, in plain language. Use numbered steps for any process. Use "you" — never "our customers" or "clients."

**Proof (100–150 words):** Specific, verifiable evidence. Years in business, jobs completed, review rating and count, a real testimonial quote with the reviewer's first name. Vague claims ("we're experienced") do zero work. Numbers do everything.

### CTA Text Rules

Action verb first. Specific outcome second. Never vague.

| Forbidden CTA | Replacement |
|---------------|-------------|
| Submit | Schedule My Free Estimate |
| Contact Us | Call Now — We Answer 24/7 |
| Learn More | See How We Fixed This |
| Get Started | Get Your Free Quote in 60 Seconds |
| Send Message | Send My Service Request |
| Click Here | [The destination described clearly] |
| Book Now (no context) | Book Your Same-Day Service |

### Forbidden Phrases

These patterns appear in generic AI copy. Never write them:

- "Welcome to [Company Name]" (H1 waste)
- "We are the best [service] in [city]" (unprovable, trust-destroying)
- "Quality you can trust" (means nothing)
- "We pride ourselves on..." (self-congratulatory throat-clearing)
- "State-of-the-art equipment" (every contractor claims this)
- "Passion for excellence" (meaningless buzzword)
- "Your satisfaction is our guarantee" (what specifically is guaranteed?)
- "One-stop shop for all your [service] needs"
- "We go above and beyond"
- "Seamless experience"
- "At the end of the day..."
- "Second to none"

Replace with: specific outcomes, specific numbers, specific commitments.

### Microcopy Standards

Microcopy = form labels, button text, error messages, success messages, tooltips, placeholder text, loading states.

**Error messages:** Tell what went wrong AND how to fix it.
- ✗ "Invalid phone number"
- ✓ "Enter a 10-digit US phone number, like (916) 555-0100"

**Success messages:** Confirm what happened, set expectations for what comes next.
- ✗ "Message sent."
- ✓ "Got it, [First Name]. [Owner/team name] will call you back within [response time promise from siteConfig]."

**Form labels:** Descriptive, not generic.
- ✗ "Name" (whose name? Full? First?)
- ✓ "Your Full Name" or separate "First Name" / "Last Name" fields

**Placeholder text:** Give an example of valid input, not a restatement of the label.
- ✗ Phone label: "Phone", Placeholder: "Phone number"
- ✓ Phone label: "Best Phone Number", Placeholder: "(916) 555-0100"

### Trust Copy Integration

Do not create a "trust badges" section and call it done. Weave trust signals into narrative prose:

> "We've been fixing Sacramento homes since 2006 — that's 18 years of showing up on time, doing the work right, and leaving your home cleaner than we found it. We're licensed (CA Lic. #854321), bonded, and insured, and we carry those credentials because they protect YOU, not us."

One paragraph like this outperforms any grid of badge icons. Use both, but the prose comes first.

---

## 4. SEO Rules

### Title Tag Format

**Check `siteConfig.niche` to determine the title format:**

**Home-service builds (niche ≠ 'custom'):**

`[Primary Service] in [City] | [Company Name]`

- **Length:** 50–60 characters exactly (Google truncates at ~60)
- **Separator:** pipe (|) preferred; em dash (—) acceptable
- **Service first** — lead with the keyword, not the brand name
- **City in title** — local ranking signal, non-negotiable
- **Homepage variation:** `[Niche] in [City] | [Company Name]` (e.g., "Plumber in Sacramento | Valley Plumbing Co.")
- **Service area page:** `[Service] in [Area City] | [Company Name]`

**Out-of-niche builds (niche = 'custom'):**

Read `siteConfig.industry.seo.titleFormat` for the title template. Common patterns:

| Industry Type | Title Format | Example |
|---|---|---|
| `professional-service` | `[Page] \| [Company] — [Tagline]` | "Structural Engineering \| Acme Engineers — Building Confidence" |
| `agency` | `[Page] \| [Company]` | "Our Work \| Spark Creative Agency" |
| `restaurant` | `[Restaurant Name] — [Cuisine] in [City]` | "Trattoria Luna — Italian in Sacramento" |
| `healthcare` | `[Service] \| [Practice Name] — [City]` | "Family Medicine \| Valley Health — Fresno" |
| `nonprofit` | `[Page] \| [Organization Name]` | "Our Impact \| Clean Water Initiative" |

- **Length rules remain:** 50–60 characters
- **If `industry.seo.localSEO` is `true`:** City MUST appear in the title
- **If `industry.seo.localSEO` is `false`:** City is optional — use it only if relevant

### Meta Description Format

150–160 characters. Must contain an action CTA verb.

Formula: `[Action verb] [service] in [city]. [USP or trust signal]. [Secondary benefit]. Call [phone] or [action].`

Example: `"Schedule emergency plumbing in Sacramento. Licensed & insured, 24/7 service. Same-day repairs guaranteed. Call (916) 555-0100 for your free estimate."`

Count characters before finalizing. Under 150 wastes the real estate. Over 160 gets cut by Google.

### H1 Rules

- One per page — exactly one, verified programmatically
- Not identical to the title tag — slight variation, secondary keyword opportunity
- Must contain: primary service + location + at least one trust qualifier
- Length: under 65 characters ideal; under 80 acceptable

### Heading Hierarchy

H2s function as the FAQ of the page structure — each answers a question a homeowner would have.

Example H2 sequence for a water heater service page:
```
H1: Water Heater Repair & Installation in Sacramento | Valley Plumbing
H2: Signs Your Water Heater Needs Attention
H2: Repair vs. Replacement: Which Makes Sense for You
H2: Our Water Heater Installation Process
H2: Brands We Install and Service
H2: What's Included in Every Water Heater Job
H2: Frequently Asked Questions About Water Heaters in Sacramento
```

Never skip heading levels (no H1 → H3 without an H2 between them).

### Canonical Tags

Self-referencing canonical on every page, always. The only exceptions:
- Paginated content (canonical points to page 1 or uses `rel="next"/"prev"`)
- Intentional duplicate content being consolidated

### Internal Linking Requirements

Every page must link to at least 2 other relevant pages with descriptive anchor text.

Linking hierarchy:
- Homepage → all major service pages + contact page
- Service pages → related service pages + 2 service area pages + contact
- Service area pages → service pages relevant to that area + contact
- About page → contact page + homepage

Anchor text rules: always descriptive ("water heater installation in Sacramento" not "click here" or "learn more").

---

## 5. AEO/GEO Strategy

Reference `references/aeo-geo-optimization.md` for the full playbook.

**Core principle:** AI search systems (Google AI Overviews, ChatGPT, Perplexity) extract direct answers from structured content. Structure content to make extraction easy and the contractor gets cited by name.

Key tactics in every build:

**1. Direct-Answer FAQ Format**
Question on its own line. Answer opens with the direct answer — not setup, not preamble.
```
Q: How much does it cost to replace a water heater in Sacramento?
A: Most water heater replacements in Sacramento cost $900–$1,800 installed,
   depending on the unit type and any code upgrades needed. Tank water heaters
   run $900–$1,300; tankless systems run $1,400–$2,500+. [Business Name] provides
   itemized estimates before any work begins.
```

**2. Entity Disambiguation**
Every About page must make it clear: who this business is, what they do, where they serve, and their credentials. Search systems need this to build the entity correctly in their knowledge graph.

**3. Natural Language Questions**
Write FAQ questions as a homeowner would speak them — not as a copywriter would write them. Include city name where natural. "How long does a furnace installation take in Fresno?" not "What is the duration of HVAC installation services?"

**4. Service + Geography Pairing**
Every service page includes at least one sentence that naturally pairs the service with the primary city and at least two secondary service areas. This builds geographic topic authority.

---

## 6. Per-Page Content Matrix (Abbreviated)

Full specification in `references/per-page-content-matrix.md`.

### Homepage
**Sections in order:** Hero → Trust Bar → Services Overview → Social Proof (Testimonials) → About Teaser → Service Areas → FAQ → Final CTA

**Non-negotiable elements:**
- H1 with niche + city + trust signal
- Phone number above the fold (mobile)
- 3–6 service cards with specific outcomes described (not just service names)
- Minimum 3 real testimonial quotes with reviewer first name
- License number, years in business, and review rating all visible on page
- 5–8 FAQ items with FAQPage schema
- Final CTA repeating the phone number

### Service Page
**Sections in order:** Hero → What We Fix/Install → Problem Description → Our Process → What's Included → Proof (Testimonials) → Related Services → FAQ → CTA

**Non-negotiable elements:**
- H1 with service name + city
- Numbered process steps (3–6 steps)
- Minimum 2 testimonials relevant to this specific service
- "What's Included" list (8–12 bullets)
- FAQ (6–8 questions) with FAQPage schema
- Price range or "free estimate" CTA (never hide pricing when ranges are known)

### Service Area Page
**Sections in order:** Hero → Local Context → Services Available in [City] → Why We Serve [City] → Testimonials from [City] Customers → FAQ → CTA

**Non-negotiable elements:** Unique content — not a city-name swap. Different FAQ questions. Different local context paragraph. If possible, a testimonial specifically from that city.

### Contact Page
**Sections in order:** Headline → Response Time Promise → Phone as Primary CTA → Contact Form → Alternative Contact Methods (address, map, email if available)

**Non-negotiable elements:**
- Headline promising speed ("Get Help Today — We Call Back Fast")
- Explicit response time promise (pull from `siteConfig.contact.responseTime`)
- Phone number as the primary action — form is secondary
- Form success/error microcopy

### About Page
**Sections in order:** Company Story Headline → Founding Story → Values/Philosophy → Owner Profile → Credentials → Community Involvement

**Non-negotiable elements:**
- Founding year + brief origin story (1–2 paragraphs)
- Owner name and photo (trust multiplier)
- Specific credentials with numbers (license #, bond amount, insurance carrier if shareable)
- Real community involvement (not "we care about our community" — specific local initiatives)

---

## 7. Terminology Glossary

Consistent naming is both a UX and SEO requirement.

At build time, extract service names from `siteConfig.services[]` and use those names **exactly** everywhere: in nav, H1s, body copy, CTAs, schema, and internal link anchor text. Inconsistency confuses users and dilutes keyword signals.

Rules:
- Use the name homeowners use, not the trade term ("water heater" not "DHW appliance system")
- Service area pages: "[City] Plumber" construction preferred over "Plumber Serving [City]"
- Company name: exactly as spelled in `siteConfig.business.name` — no abbreviations, no variations
- Phone format: consistent throughout site — either `(916) 555-0100` or `916-555-0100`, never both

---

## 8. Quality Checkpoints

Run before handing off to Pack 6.

**Copy Quality:**
- [ ] No "Welcome to [Company Name]" anywhere on the site
- [ ] No forbidden phrases violations (check Section 3 list)
- [ ] All CTAs start with action verbs
- [ ] Reading level ≤ Grade 8 (test 3 random body paragraphs)
- [ ] Trust signals (license #, years, reviews) appear on every page
- [ ] Phone number appears ≥ 2× per page
- [ ] All H1s are unique across the site
- [ ] All service names match `siteConfig.services[]` exactly

**SEO:**
- [ ] All title tags unique, 50–60 characters
- [ ] All meta descriptions unique, 150–160 characters, contain CTA verb
- [ ] Every page has exactly one H1
- [ ] Heading hierarchy has no skips (H1→H2→H3, no H1→H3)
- [ ] Internal linking requirements met (≥2 links per page)
- [ ] Self-referencing canonicals on all pages
- [ ] OG tags on all pages (title, description, image, URL, type)

**Schema:**
- [ ] LocalBusiness schema on every page
- [ ] Service schema on all service and service area pages
- [ ] FAQPage schema on every page that has a FAQ section
- [ ] BreadcrumbList schema on all interior pages
- [ ] AggregateRating schema present if review data available in siteConfig
- [ ] Zero placeholder values remaining in any schema JSON-LD

**AEO:**
- [ ] FAQ sections present on homepage, all service pages, all service area pages
- [ ] Every FAQ answer ≤ 120 words
- [ ] Every FAQ answer opens with the direct answer (no preamble)
- [ ] Entity signals present on About page (name, city, state, niche, founding year)

---

## 9. Anti-Patterns

These patterns are endemic in AI-generated contractor copy. Do not reproduce them.

| Anti-Pattern | Why It Fails | Fix |
|---|---|---|
| "Welcome to [Company]" as H1 | Wastes the highest-value SEO real estate on the page | H1 = [Service] in [City] — [Trust signal] |
| Generic superlatives ("best," "top," "leading") | Unprovable, SEO-ignored, trust-destroying | Specific proof: "4.9 stars across 347 Google reviews" |
| Passive voice CTAs ("Estimates are available") | Low urgency, unclear who acts | Active: "Get Your Free Estimate Today" |
| Duplicate meta descriptions | Direct crawl penalty | Every page gets its own unique meta, written fresh |
| Schema with placeholder values | Invalid markup, zero SEO benefit | Never publish schema with `[VARIABLE]` remaining |
| City-swap service area pages | Thin content penalty; Google knows | Unique content per city: different FAQs, local context |
| "Serving all of [County]" as only geo signal | Weak location signal for AI systems | Name every city in body copy and schema serviceArea |
| FAQ without FAQPage schema | Missed AI citation opportunity | Always pair FAQ content with FAQPage JSON-LD |
| Multiple H1s on one page | Dilutes keyword signal, confuses crawlers | One H1 per page, verified with `querySelectorAll('h1')` |
| Price omission | Increases bounce rate from price-sensitive visitors | Include ranges or "free estimate" — never silence |

---

## 10. Handoff: What Pack 6 Receives from Pack 5

Pack 6 (Backend & Integrations) requires these outputs:

1. **All page copy** — finalized, all `[VARIABLE]` placeholders replaced with real siteConfig values, ready to paste into components
2. **`generateMetadata()` exports** — TypeScript function for every route in `src/app/`, import-ready
3. **JSON-LD schema components** — React components returning `<script type="application/ld+json">` for each page type, typed
4. **FAQ data arrays** — typed as `FAQ[]` from `src/types/`, ready for both component rendering and FAQPage schema generation
5. **Image alt text** — descriptive alt text written for every image referenced in page copy (hero, service images, team photos)
6. **Form microcopy** — all labels, placeholder text, helper text, success messages, and error messages for ContactForm and BookingForm
7. **404 page copy** — helpful, on-brand messaging that keeps users on the site and offers a direct path to contact
8. **Email notification copy** — subject line and body for the admin notification email Pack 6 will wire to the Server Action

Deliver form microcopy and email copy as typed objects that can be imported directly into the relevant component or Server Action. Example:

```typescript
// src/content/contact-form.ts
export const contactFormCopy = {
  labels: { name: "Your Full Name", phone: "Best Phone Number", ... },
  placeholders: { phone: "(916) 555-0100", ... },
  success: "Got it, [firstName]. Mike will call you back within 2 hours.",
  errors: { phone: "Enter a 10-digit US phone number, like (916) 555-0100", ... }
}
