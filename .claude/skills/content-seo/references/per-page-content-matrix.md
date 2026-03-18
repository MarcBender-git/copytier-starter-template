# Per-Page Content Matrix

## How to Use This Matrix

For each page, follow the section order exactly. The order is based on conversion testing, not aesthetics — moving sections around requires a reason. Each section spec includes: purpose, word count target, required elements, copy tone, and SEO requirements.

---

## Page 1: Homepage

**URL:** `/`
**Purpose:** Convert first-time visitors into calls or form submissions. Establish trust and signal expertise immediately.
**Title tag:** `[Niche] in [City] | [Business Name]` — 50–60 chars
**Meta description:** 150–160 chars, include phone number
**H1:** Contains niche + city + trust signal. Not identical to title tag.
**Schema:** LocalBusiness + AggregateRating (if reviews) + FAQPage
**Canonical:** `https://[domain]/`

---

### Section 1.1 — Hero

**Purpose:** Answer the visitor's three unconscious questions: Can you help me? Are you real and trustworthy? What do I do next?

**Word count:** 30–60 words visible (headline + subhead + CTA)

**Required elements:**
- [ ] H1 headline (Formula 1, 2, or 10 from headline-formulas.md)
- [ ] Subheadline: 1–2 sentences, expands the H1 promise with a specific detail
- [ ] Primary CTA button: action verb, outcome-specific (NOT "Contact Us")
- [ ] Phone number visible on desktop above the fold
- [ ] Hero image alt text: `[Business Name] [niche] truck/team in [City], [State]`

**Copy tone:** Confident, immediate, zero setup. The visitor is deciding in seconds.

**Do not include:** Company history, feature lists, or anything that buries the CTA

**Example H1:** `Emergency Plumber in Sacramento — Licensed, Available 24/7`
**Example subhead:** `Serving Sacramento and surrounding areas since 2006. We answer the phone and show up.`
**Example CTA:** `Call (916) 555-0100` or `Schedule My Free Estimate`

---

### Section 1.2 — Trust Bar

**Purpose:** Quick credential confirmation — address the "but are you legit?" question in one scannable line.

**Word count:** 0 (iconographic) to 40 words total across all items

**Required elements:**
- [ ] License number: `Licensed — CA Lic. #[number]`
- [ ] Bonded & insured (yes/no signal)
- [ ] Years in business: `Serving [City] Since [Year]` or `[X]+ Years`
- [ ] Review signal: `[Rating] Stars — [Count]+ Google Reviews`
- [ ] Optional: BBB rating, certifications relevant to niche

**Copy tone:** Factual, no adjectives. The data speaks.

---

### Section 1.3 — Services Overview

**Purpose:** Help the visitor confirm this contractor does their specific job, and see the range of work available.

**Word count:** 15–30 words per service card; 3–6 cards total

**Required elements:**
- [ ] Section H2: e.g., `[Niche] Services in [City]` or `What We Fix, Install & Maintain`
- [ ] Each service card contains: service name (H3), 2–3 sentence description of outcomes (NOT features), internal link to service page
- [ ] Service names match `siteConfig.services[]` exactly

**Copy tone:** Outcome-focused. "We repair your [X] fast and right" not "We offer [X] services."

**Conversion tip:** Lead each service description with the problem it solves, not the service name.

---

### Section 1.4 — Social Proof (Testimonials)

**Purpose:** Transfer trust from past customers to new visitors.

**Word count:** 50–120 words per testimonial; minimum 3 testimonials

**Required elements:**
- [ ] Section H2: `What [City] Homeowners Say` or `[X]+ Five-Star Reviews`
- [ ] Each testimonial: full quote, reviewer first name + last initial, city, star rating
- [ ] Testimonials should reference specific services, outcomes, or employee names
- [ ] Link to Google Reviews page (opens in new tab)
- [ ] Star rating display (visual stars + number)

**Copy tone:** Unedited customer voice — do not clean up grammar unless it's genuinely unclear. Real voices build more trust than polished quotes.

**Never use:** Generic testimonials like "Great service!" with no context. If that's all the client has, use the star rating count instead until better reviews are collected.

---

### Section 1.5 — About Teaser

**Purpose:** Humanize the business. Connect the company to the community.

**Word count:** 80–140 words

**Required elements:**
- [ ] Section H2: `[City]'s [Niche] — Family-Owned Since [Year]` or similar
- [ ] Owner name + 1–2 sentences of founding story
- [ ] Specific local connection (city/neighborhood name drop)
- [ ] CTA link to full About page: `Read Our Story →`

**Copy tone:** Warm, personal, first-person where possible (especially if owner-operated). This is the most human section on the page.

---

### Section 1.6 — Service Areas

**Purpose:** Confirm geographic coverage and capture rankings in surrounding cities.

**Word count:** 20–60 words of intro copy + list

**Required elements:**
- [ ] Section H2: `Serving [Primary City] and Surrounding Areas`
- [ ] All service area cities as linked text (links to their area pages)
- [ ] Brief paragraph naming the region: "From [City A] to [City B], we serve all of [County]."

**Copy tone:** Matter-of-fact. This section is for confirmation, not persuasion.

---

### Section 1.7 — FAQ

**Purpose:** Answer objections, support AEO/AI search citations, capture long-tail keywords.

**Word count:** 50–120 words per answer; 5–8 questions

**Required elements:**
- [ ] Section H2: `Frequently Asked Questions` or `Common Questions About [Niche] in [City]`
- [ ] Questions cover: pricing, response time, licensing, brands, emergency availability, what to do while waiting, comparison to DIY
- [ ] Each answer opens with a direct response (not "That's a great question")
- [ ] FAQPage JSON-LD schema includes all questions/answers

**Copy tone:** Conversational, direct. Imagine answering a neighbor's question over the fence.

---

### Section 1.8 — Final CTA

**Purpose:** Catch visitors who scrolled without acting. Re-present the offer with urgency.

**Word count:** 30–60 words

**Required elements:**
- [ ] H2 or large headline — different from hero headline but same intent
- [ ] Phone number (large, click-to-call on mobile)
- [ ] CTA button (can be form trigger or direct call button)
- [ ] Response time promise: `We call back within [X] hours`
- [ ] Hours/availability note: `Available [days] [hours] + 24/7 Emergency`

**Copy tone:** Slightly higher urgency than hero — this visitor has already read the page and hasn't acted. Address hesitation: "Still have questions? Just call — no obligation."

---

## Page 2: Service Page

**URL:** `/services/[service-slug]`
**Purpose:** Rank for `[service] in [city]` + convert visitors who already know what they need
**Title tag:** `[Service Name] in [City] | [Business Name]` — 50–60 chars
**Meta description:** 150–160 chars, include service + city + CTA verb
**H1:** Service name + city + trust signal (not identical to title)
**Schema:** LocalBusiness + Service + FAQPage + BreadcrumbList
**Canonical:** `https://[domain]/services/[slug]`

---

### Section 2.1 — Service Hero

**Word count:** 30–50 words

**Required elements:**
- [ ] H1 with service + city + trust signal
- [ ] Subheadline: 1–2 sentences describing the specific outcome
- [ ] Primary CTA: call or estimate
- [ ] Phone number visible

---

### Section 2.2 — Problem Description

**Word count:** 80–130 words

**Purpose:** Acknowledge the visitor's situation. Demonstrate understanding before presenting solution.

**Required elements:**
- [ ] H2: Something like `[Problem Symptoms]? Here's What That Means.` or `Signs You Need [Service]`
- [ ] 2–3 specific situations or symptoms that bring someone to this page
- [ ] Emotional validation — not making them feel stupid
- [ ] Transition to solution: "That's exactly what we fix."

**Copy tone:** Empathetic, specific, calm.

---

### Section 2.3 — What We Do (Solution)

**Word count:** 150–250 words

**Required elements:**
- [ ] H2: `How We Handle [Service]` or `Our [Service] Process`
- [ ] Numbered process steps (3–6 steps)
- [ ] Each step: what happens, who does it, how long it takes
- [ ] Specific equipment or methods mentioned (demonstrates expertise without jargon)
- [ ] "You" focused — not "our technicians will" but "you'll know exactly what's needed before we start"

**Copy tone:** Methodical, clear, confidence-building.

---

### Section 2.4 — What's Included

**Word count:** 8–12 bullets, 5–15 words each

**Required elements:**
- [ ] H2: `What's Included in Every [Service]`
- [ ] Bullet list — specific, tangible items
- [ ] Include: diagnosis/inspection, labor, parts, cleanup, warranty, follow-up contact
- [ ] Differentiate from competitors if possible: "Parts on the truck" or "Same-day service" or "Written estimate before work begins"

**Copy tone:** Matter-of-fact, concrete. Every bullet is a specific deliverable.

---

### Section 2.5 — Service-Specific Trust Signals

**Word count:** 40–80 words

**Required elements:**
- [ ] Certifications relevant to this specific service (not just general)
- [ ] Brands or manufacturers for install/replacement services
- [ ] Warranty/guarantee terms, specific to this service
- [ ] Response time for this service type (emergency vs. scheduled)

---

### Section 2.6 — Proof (Testimonials)

**Word count:** 50–100 words per testimonial; 2–3 testimonials

**Required elements:**
- [ ] At least 2 testimonials specifically about this service (not just general praise)
- [ ] Reviewer first name, city, star rating
- [ ] Quote mentions specific outcome: "fixed in two hours," "stayed within estimate," "explained everything"

---

### Section 2.7 — Related Services

**Word count:** 15–25 words per related service; 3–4 links

**Required elements:**
- [ ] H2: `Other Services You May Need`
- [ ] 3–4 related service cards with brief descriptions + internal links
- [ ] Links to actual existing service pages only

---

### Section 2.8 — Service Page FAQ

**Word count:** 50–120 words per answer; 6–8 questions

**Required elements:**
- [ ] Service + city-specific questions
- [ ] Cost range question with real ranges (or "free estimate" where ranges genuinely vary widely)
- [ ] Timeline question
- [ ] DIY risk question (for safety-relevant trades: electrical, HVAC, roofing)
- [ ] Insurance/warranty question
- [ ] "What if it's more complicated than expected?" question

---

### Section 2.9 — Service CTA

Mirrors Section 1.8. Repeat phone + CTA + response time.

---

## Page 3: Service Area Page

**URL:** `/service-areas/[city-slug]` or `/[city-slug]/[service-slug]`
**Purpose:** Rank for `[service] in [area city]`; capture visitors in secondary markets
**Title tag:** `[Service] in [Area City] | [Business Name]` — 50–60 chars
**Meta description:** 150–160 chars
**H1:** `[Service] in [Area City] — [Trust Signal]`
**Schema:** LocalBusiness + Service + FAQPage + BreadcrumbList
**Canonical:** `https://[domain]/service-areas/[city-slug]`

**CRITICAL: Every service area page MUST have unique content.**
- Different FAQ questions (or different answers) than the primary city page
- Local context paragraph referencing the specific area city
- If possible: testimonial from a customer in that city specifically
- Different H1 phrasing — not just the city name swapped

---

### Section 3.1 — Area Hero

Same structure as service hero. H1 names the area city explicitly.

---

### Section 3.2 — Local Context Paragraph

**Word count:** 80–120 words

**Required elements:**
- [ ] Reference the specific city/community by name ≥ 3 times
- [ ] Note something specific about that area (neighborhood, county, common home age/type if relevant)
- [ ] Confirm coverage: "We serve all of [Area City], including [neighborhoods or zip codes]"
- [ ] Response time to that area specifically if known

**This paragraph is the content that makes it NOT a city-swap page.**

---

### Section 3.3 — Services Available in [Area City]

List of services offered in this area, with links to the primary service pages. Each service gets 1–2 sentences of description.

---

### Section 3.4 — Area-Specific Proof

**Required elements:**
- [ ] Testimonial from a customer in this area (if available)
- [ ] If no area-specific testimonial: reference years of service in the county/region
- [ ] Number of jobs completed in this area (if trackable)

---

### Section 3.5 — Area FAQ

**Word count:** 50–100 words per answer; 5 questions minimum

Questions should be area-specific:
- "Do you serve [Neighborhood] in [Area City]?"
- "How quickly can you reach [Area City]?"
- "Are there any local code differences in [Area City] for [service]?"
- "[Service] costs in [Area City] vs. [Primary City]?"

---

### Section 3.6 — Area CTA

Standard CTA + phone. Consider adding a map or address callout showing proximity to the area city.

---

## Page 4: Contact Page

**URL:** `/contact`
**Purpose:** Convert visitors who are ready to act into a call or form submission
**Title tag:** `Contact [Business Name] in [City] | Free Estimates` — 50–60 chars
**Meta description:** Include response time promise and phone number
**H1:** `Get Help Today — [Response Time Promise]`
**Schema:** LocalBusiness + BreadcrumbList
**Canonical:** `https://[domain]/contact`

---

### Section 4.1 — Contact Hero

**Word count:** 20–40 words

**Required elements:**
- [ ] H1 with urgency and response time (NOT "Contact Us")
- [ ] Response time promise visible immediately
- [ ] Phone number as primary CTA — large, click-to-call

**Example H1:** `Get Help Today — We Call Back Within 2 Hours`
**Example subhead:** `Prefer to call? (916) 555-0100 — Mon–Sat 7am–7pm, 24/7 for emergencies`

---

### Section 4.2 — Contact Form

**Required form fields:**
- Full Name (required)
- Phone Number (required) — placeholder shows format
- Email (optional for callbacks; required for email preference)
- Service Needed (dropdown matching `siteConfig.services[]`)
- Brief Description (textarea, optional but encouraged)
- Honeypot field (hidden, anti-spam — never CAPTCHA)

**Required form copy:**
- Submit button: `Send My Service Request` (not "Submit")
- Below button: "We respond within [X] hours. For emergencies, call [phone]."
- Success message: `Got it, [Name]. [Owner/team] will call you within [response time].`
- Error message (general): `Something went wrong. Please call us directly at [phone].`

---

### Section 4.3 — Alternative Contact Methods

**Required elements:**
- [ ] Phone (click-to-call link)
- [ ] Address with link to Google Maps
- [ ] Business hours (all days, including holiday availability if any)
- [ ] Emergency line hours (if different from regular hours)
- [ ] Optional: embedded Google Maps iframe

---

### Section 4.4 — Trust Reinforcement

**Word count:** 40–80 words

Brief trust paragraph below the form: license number, insurance, response time, guarantee. Reassure the visitor that submitting the form isn't a commitment — it's just the first step.

---

## Page 5: About Page

**URL:** `/about`
**Purpose:** Build personal trust; humanize the business; reinforce local authority
**Title tag:** `About [Business Name] — [City] [Niche] Since [Year]` — 50–60 chars
**Meta description:** 150–160 chars, include founding year + owner name + city
**H1:** Company story headline — not "About Us"
**Schema:** LocalBusiness + BreadcrumbList
**Canonical:** `https://[domain]/about`

---

### Section 5.1 — Company Story Headline

**Required elements:**
- [ ] H1: Story-driven, not generic. Examples:
  - `Family-Owned. Sacramento-Rooted. [Business Name] Since [Year].`
  - `Why [Owner Name] Started [Business Name] in [Year]`
  - `[X] Years of Serving [City] — The [Business Name] Story`

---

### Section 5.2 — Founding Story

**Word count:** 120–200 words

**Required elements:**
- [ ] Why this person started this business (specific, not generic)
- [ ] When: founding year
- [ ] What makes this contractor different from the beginning — was there a gap in the market? A frustration with the industry?
- [ ] First-person or close-third-person voice

**Tone:** Honest and personal. This is the most human writing on the site.

---

### Section 5.3 — Values & Philosophy

**Word count:** 80–120 words

**Required elements:**
- [ ] H2: `How We Work` or `Our Promise to [City] Homeowners` or `The [Business Name] Standard`
- [ ] 3–4 specific values as short statements, each with a brief explanation
- [ ] NOT generic values ("integrity," "quality") — specific behaviors ("We quote in writing before we wrench")

---

### Section 5.4 — Owner/Team Profile

**Required elements:**
- [ ] Owner name + photo (trust multiplier — skip if owner is genuinely camera-shy, but try to get this)
- [ ] H3 with owner name and title
- [ ] 2–3 sentences: background, certifications, local connection
- [ ] If multi-person team: brief team section with photos if available

---

### Section 5.5 — Credentials

**Word count:** 50–100 words

**Required elements:**
- [ ] License number(s) with issuing agency
- [ ] Insurance: type and carrier (if client is comfortable sharing)
- [ ] Certifications: specific and with meaning ("NATE-certified technician" + 1 sentence on what NATE is)
- [ ] BBB, HomeAdvisor, Angi, or other verified ratings
- [ ] Continuing education if relevant

---

### Section 5.6 — Community Involvement

**Word count:** 40–80 words

**Required elements:**
- [ ] Specific local involvement: charity, sports team sponsorship, neighborhood association, etc.
- [ ] NOT generic: "We care about our community" alone is insufficient
- [ ] If nothing specific exists: reference how long they've been in the community, family connection to the area

---

### Section 5.7 — About Page CTA

**Required elements:**
- [ ] Simple CTA: phone + estimate link
- [ ] Message: "Ready to work with a [City] [niche] you can trust?"

---

## Page 6: Privacy Policy

**URL:** `/privacy`
**Content:** Generated legal content, not marketing copy. Reference a lawyer-reviewed template.
**Schema:** None required
**SEO:** No-index optional; canonical self-referencing if indexed

---

## Page 7: 404 Page

**URL:** Catch-all for broken links
**Purpose:** Keep the visitor on the site; guide them to a useful destination
**Schema:** None
**SEO:** No-index; do not canonical

**Required elements:**
- [ ] H1: Helpful, on-brand message (NOT "404 Page Not Found")
  - Example: `Hmm, That Page Moved. Here's How to Find What You Need.`
- [ ] Brief explanation (1 sentence)
- [ ] 3–4 direct links: Homepage, most popular service, contact, phone number
- [ ] Search bar if site has search
- [ ] Phone number prominently displayed — this is a frustrated visitor, give them the fastest path to help
