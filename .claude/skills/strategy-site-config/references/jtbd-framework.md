# Jobs-to-Be-Done Framework for Contractor Websites

Every visitor arriving at a contractor website has one of four core jobs to accomplish.
The site's only mission is to help them complete that job as fast as possible.

---

## The 4 Core Jobs

### Job 1: Confirm Service Availability
**"Can you fix my specific problem?"**

What the visitor is thinking:
- "Do you do [specific service]? Not just 'plumbing' — do you fix slab leaks?"
- "I have [brand/model] — will you work on it?"
- "My situation is [unusual] — will you judge me or just help?"

How the site addresses it:
- Individual service pages with specific problem/solution framing
- Service card descriptions that name the exact problems solved
- FAQ sections answering "Do you do X?" questions
- Hero headline that names the niche problem (not just the trade)

siteConfig fields: `services[].name`, `services[].description`, `services[].features[]`, `faqs[]`

---

### Job 2: Confirm Geographic Coverage
**"Do you come to my area?"**

What the visitor is thinking:
- "I'm in [suburb] — do you come this far out?"
- "I've called contractors before who don't serve my neighborhood"
- "Your website says 'Bay Area' but what does that mean exactly?"

How the site addresses it:
- Service area pages per city/neighborhood
- Explicit city list in footer or service area section
- "Serving [City] and surrounding areas" in hero subtext
- LocalBusiness schema with areaServed

siteConfig fields: `serviceArea.cities[]`, `serviceArea.radius`, `serviceArea.primaryCity`, `contact.address`

---

### Job 3: Evaluate Trustworthiness
**"Are you legit? Will you do quality work?"**

What the visitor is thinking:
- "Anyone can build a website — prove you're real"
- "My neighbor got ripped off by a contractor. How do I know you're different?"
- "Are you licensed? Insured? What happens if something goes wrong?"

How the site addresses it:
- License/bond/insurance numbers displayed visibly
- Named Google reviews with star ratings and dates
- Years in business and founder/team photos
- Guarantee language ("We stand behind our work")
- Real photos — job sites, trucks, team — not stock photos

siteConfig fields: `trust.licenseNumber`, `trust.yearsInBusiness`, `trust.rating`, `trust.reviewCount`, `trust.guarantees[]`, `team[]`, `testimonials[]`

---

### Job 4: Make Contact Quickly
**"How do I reach you RIGHT NOW?"**

What the visitor is thinking:
- "I need someone today — can I call right now?"
- "I don't want to fill out a form and wait 3 days"
- "What are your hours? Are you open now?"

How the site addresses it:
- Phone number in header, above fold, visible without scrolling
- Click-to-call sticky bar on mobile (highest converting mobile element)
- Business hours displayed on contact page and in schema
- Form with 4 fields max — name, phone, service, message
- Response time commitment ("We call back within 2 hours")

siteConfig fields: `contact.phone`, `contact.hours`, `contact.responseTime`, `cta.emergency`

---

## JTBD Translation Table

Feature → which job it serves → include?

| Feature | Primary Job | Include? | Notes |
|---------|-------------|----------|-------|
| Individual service pages | Job 1 | YES | Core — one per service |
| Service area pages | Job 2 | YES | Core — one per city |
| Google review widget | Job 3 | YES | Use schema + display |
| Click-to-call sticky bar | Job 4 | YES | Highest mobile CVR element |
| Homepage hero section | All 4 | YES | Must address all 4 jobs |
| Footer NAP | Jobs 2+4 | YES | Required for local SEO |
| JSON-LD schema markup | Jobs 2+3 | YES | Invisible but critical |
| FAQ page | Jobs 1+3 | YES | Answers objections |
| About page | Job 3 | YES | Humanizes the business |
| Contact page | Job 4 | YES | Dedicated conversion page |
| Privacy policy | — | YES | Required for CCPA |
| Cookie consent banner | — | YES | Required for analytics |
| XML sitemap | — | YES | Required for indexing |
| Before/after gallery | Job 3 | PHASE 2 | High trust, expensive to produce |
| Blog / articles | Job 1 | PHASE 2 | Good for SEO, low conversion impact day 1 |
| Video testimonials | Job 3 | PHASE 2 | Highest trust, resource-heavy |
| Online booking widget | Job 4 | CONDITIONAL | Only for planned trades with predictable scheduling |
| Live chat | Job 4 | CONDITIONAL | Only if someone actively monitors it — dead chat hurts CVR |
| Financing page | Job 3 | CONDITIONAL | Include for roofing, HVAC, high-ticket trades |
| Emergency landing pages | Job 4 | CONDITIONAL | Include for 24/7 trades |
| Careers page | — | PHASE 2 | Only after site is live and performing |
| Auto-rotating carousel | — | NO | Kills CTR, hurts LCP, nobody reads slide 2 |
| Customer portal | — | NO | No DIY portal — phone calls convert better |
| Multi-language site | — | NO | Build separate site per language if needed |
| eCommerce / online payment | — | NO | Wrong channel for contractor services |
| Chatbot (AI) | Job 4 | NO | No one trusts bots for emergency service calls |

---

## Niche-Specific JTBD Priority Weights

Which of the 4 jobs matters most varies by trade. Allocate hero section, trust signals, and CTA emphasis accordingly.

| Niche | Job 1 (Service) | Job 2 (Area) | Job 3 (Trust) | Job 4 (Contact) |
|-------|----------------|--------------|---------------|-----------------|
| Plumber | Medium | Low | Medium | **HIGHEST** |
| HVAC | Medium | Low | Medium | **HIGHEST** |
| Electrician | Medium | Low | HIGH | **HIGH** |
| Roofer | HIGH | Low | **HIGH** | Medium |
| Landscaper | **HIGH** | Medium | Medium | Medium |
| Handyman | **HIGH** | Low | Medium | Medium |
| Cleaner | Medium | Medium | **HIGH** | HIGH |
| General Contractor | HIGH | Low | **HIGHEST** | Medium |

**Rationale:**
- Emergency trades (plumber, HVAC): Job 4 dominates — the visitor is in crisis. Big phone number, call now CTA, 24/7 messaging.
- Trust-critical trades (electrician, cleaner, GC): Job 3 dominates — entering someone's home or handling expensive projects. License, insurance, named reviews front and center.
- Scope-heavy trades (roofer, landscaper, GC): Job 1 dominates — visitor needs to know you understand their specific project type before they'll engage.

---

## Value Proposition Formula

**[Specific outcome] + [Speed/convenience qualifier] + [Trust qualifier]**

Structure: "We [specific outcome] [faster/easier/cleaner] — [trust signal]."

### Examples by niche

| Niche | Bad Headline (generic) | Good Headline (JTBD-aligned) |
|-------|----------------------|------------------------------|
| Plumber | "Your Local Plumber" | "Burst Pipe Fixed in 90 Minutes — Licensed, 24/7" |
| HVAC | "Heating and Cooling Services" | "AC Repaired Same Day or You Don't Pay — Serving [City]" |
| Electrician | "Electrical Services in [City]" | "Panel Upgrades & EV Charger Installation — Licensed Master Electrician" |
| Roofer | "Quality Roofing" | "Hail Damage Repaired Before Your Claim Window Closes" |
| Landscaper | "Landscaping & Design" | "Overgrown Yard to Backyard You'll Use — Weekly Maintenance Available" |
| Handyman | "Handyman Services" | "Honey-Do List Finished in One Visit — No Job Too Small" |
| Cleaner | "Cleaning Services" | "Move-Out Clean That Gets Your Deposit Back — 100% Guaranteed" |
| General Contractor | "Home Improvement" | "Kitchen & Bath Remodels — Fixed Price, On Schedule, No Surprises" |

**Formula test:** Can a visitor read your headline and know in 3 seconds exactly what problem you solve, how fast, and why you're safe to hire? If not, rewrite it.
