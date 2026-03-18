# About Page Copy Template
## Niche: Plumber | Example Business: Valley Plumbing Co., Sacramento CA

**How to use:** Replace every `[VARIABLE]` with data from siteConfig. The about page is the most personal page on the site — adapt the tone to match the actual owner's voice and story after replacing variables.

---

## SEO Metadata

```typescript
export const metadata: Metadata = {
  title: "About [BUSINESS_NAME] — [CITY] Plumber Since [FOUNDING_YEAR]",
  // Example: "About Valley Plumbing Co. — Sacramento Plumber Since 2006"
  // Target: 50–60 chars

  description: "Meet [OWNER_NAME] and the team at [BUSINESS_NAME]. Family-owned plumbing in [CITY] since [FOUNDING_YEAR]. Licensed (CA Lic. #[LICENSE_NUMBER]), [REVIEW_RATING]-star rated.",
  // Target: 150–160 chars

  openGraph: {
    title: "About [BUSINESS_NAME] — [CITY] Plumber Since [FOUNDING_YEAR]",
    description: "[Same as above]",
    url: "https://[DOMAIN]/about",
    images: [{ url: "https://[DOMAIN]/images/og/about.jpg", width: 1200, height: 630, alt: "[OWNER_NAME], owner of [BUSINESS_NAME] in [CITY], CA" }],
  },
  alternates: { canonical: "https://[DOMAIN]/about" }
}
```

---

## Breadcrumb

```
Home / About
```

---

## Section 1: Company Story Headline

### H1 Options (choose one based on contractor's strongest story)

**Option A — Founding year + local roots:**
```
Family-Owned. [CITY]-Rooted. [BUSINESS_NAME] Since [FOUNDING_YEAR].
```

**Option B — Founder story angle:**
```
Why [OWNER_NAME] Started [BUSINESS_NAME] in [FOUNDING_YEAR]
```

**Option C — Community focus:**
```
[YEARS_IN_BUSINESS] Years Serving [CITY] Homeowners — The [BUSINESS_NAME] Story
```

**Option D — Mission-driven:**
```
[CITY]'s Plumber for Homeowners Who Are Tired of Being Let Down
```

*The H1 should feel personal, not generic. If the owner has a specific story angle — grew up here, walked away from a corporate job, started the company after a bad experience with another plumber — that angle should inform which option fits.*

---

## Section 2: Founding Story

### H2
```
How [BUSINESS_NAME] Got Started
```

### Body Copy Template A (Solo founder, local roots)
```
[OWNER_NAME] grew up in [CITY]. Learned the trade from [BACKGROUND — e.g., "his
father, who ran a plumbing company in the area for 30 years" or "working summers
for a local plumbing company while in high school"]. When [OWNER_NAME] started
[BUSINESS_NAME] in [FOUNDING_YEAR], the goal was straightforward: be the plumber
[CITY] homeowners could actually rely on.

"I got tired of hearing the same story from customers — a plumber they called
didn't show up, or quoted one thing and charged another, or sent someone who
didn't know what they were doing. I knew that wasn't how it had to be."
— [OWNER_NAME], Owner

[YEARS_IN_BUSINESS] years later, [BUSINESS_NAME] has completed [JOBS_COMPLETED]
jobs across [CITY] and [SERVICE_AREAS_BRIEF_LIST]. The business has grown. The
standard hasn't changed.
```

### Body Copy Template B (Career change / industry frustration)
```
Before [OWNER_NAME] started [BUSINESS_NAME], they worked for [PREVIOUS_EXPERIENCE
— e.g., "a large regional plumbing chain"]. The experience taught them everything
about what not to do.

"The incentives were all wrong. Technicians were pushed to upsell. Response times
were promises that rarely held. The customers were just tickets in a queue."

[OWNER_NAME] started [BUSINESS_NAME] in [FOUNDING_YEAR] to do it differently —
smaller, local, personal. A plumber who answers the phone, shows up when scheduled,
and charges what they said they would.

What started as a one-truck operation is now [COMPANY_SIZE_DESCRIPTION], but the
approach is the same as day one.
```

*Choose the template that best fits the actual owner's story. Adapt freely — the templates are a starting point, not a script. The founding story must be true.*

---

## Section 3: Values & Philosophy

### H2
```
How [BUSINESS_NAME] Works — Every Time
```

### Values Copy (3–4 specific commitments, not generic values)

```
We quote before we wrench.
You get a written estimate before any work starts. The price you approve is the
price on your invoice. No "we found something else" surprises without your explicit
okay first.

We explain what we found.
Before we start, we show you what's wrong and why. Photos if helpful. Plain English,
not plumbing jargon. You make an informed decision — we do the work.

We clean up after ourselves.
Your home was clean before we arrived. It'll be clean when we leave. Shoe covers,
drop cloths, and a final walkthrough before we close the job.

We stand behind our work.
Every job comes with a [WARRANTY_PERIOD] labor warranty. If something we repaired
or installed fails because of our work, we come back and fix it at no charge.
No runaround, no fine print.
```

---

## Section 4: Owner Profile

### H2
```
Meet [OWNER_NAME]
```

### Owner Bio Copy
```
[OWNER_NAME] is the owner and [TITLE — e.g., "lead plumber"] at [BUSINESS_NAME].
[He/She/They] [holds/hold] California Plumbing License #[LICENSE_NUMBER] and
[ADDITIONAL_CERTIFICATIONS if any].

[1–2 sentences about technical background or specialty area — e.g., "He specializes
in trenchless sewer repair and has completed training with Perma-Pipe for pipe
lining installations."]

Outside of work, [OWNER_NAME] [PERSONAL_DETAIL — e.g., "coaches youth soccer at
[Local Park] in the [Neighborhood] area" or "volunteers with [local nonprofit]"].
[He/She/They] [lives/live] in [CITY] with [FAMILY_CONTEXT if client is comfortable
sharing, e.g., "his wife and two kids"].
```

*Owner photo alt text: `[OWNER_NAME], licensed plumber and owner of [BUSINESS_NAME] in [CITY], CA`*

---

## Section 5: Team Section (if applicable)

### H2
```
Our [CITY] Plumbing Team
```

### Intro
```
Every [BUSINESS_NAME] technician is a licensed journeyman plumber — not an
apprentice working unsupervised. Our team is [NUMBER] strong, all background-checked,
all local to the [CITY] area.
```

### Team Member Card Format (repeat for each team member)
```
Name: [TEAM_MEMBER_NAME]
Title: [TITLE — e.g., "Journeyman Plumber"]
Credentials: CA Lic. #[LICENSE], [X] years experience
Bio: [1 sentence — specialty or notable background]
Photo alt: [NAME], journeyman plumber at [BUSINESS_NAME] in [CITY], CA
```

*Skip this section if the contractor is a solo operator or doesn't want to list employees individually.*

---

## Section 6: Credentials

### H2
```
[BUSINESS_NAME] Licenses, Certifications & Insurance
```

### Credentials Copy
```
[BUSINESS_NAME] holds the following credentials — not because they're required
to advertise, but because they protect you:

California Plumbing Contractor License: #[LICENSE_NUMBER]
Issued by: California Contractors State License Board (CSLB)

General Liability Insurance: [INSURANCE_AMOUNT] coverage
[INSURANCE_CARRIER if client is comfortable sharing]

Workers' Compensation: Current, covering all [BUSINESS_NAME] employees

[CERTIFICATION_1 if applicable — e.g., "ASSE Certified Backflow Prevention
Tester, Cert. #[NUMBER]"]

[CERTIFICATION_2 if applicable]

BBB Rating: [RATING if applicable]
Member Since: [YEAR]
```

### Credential Note
```
California law requires plumbing contractors to be licensed for work over $500.
If a plumber can't provide their license number, don't hire them. Ours is
CA Lic. #[LICENSE_NUMBER] — verify it at cslb.ca.gov any time.
```

---

## Section 7: Community Involvement

### H2
```
Part of the [CITY] Community
```

### Copy
```
[BUSINESS_NAME] has been part of [CITY] for [YEARS_IN_BUSINESS] years — not just
as a business, but as a neighbor.

[SPECIFIC_COMMUNITY_INVOLVEMENT — e.g.:]

[OWNER_NAME] has sponsored the [LOCAL_TEAM or LOCAL_EVENT] for [X] years.
[BUSINESS_NAME] donates [X%] of proceeds from [specific service or month] to
[LOCAL_CHARITY].
We provide discounted service for seniors on fixed incomes in [CITY] — ask about
our Senior Assist program.

We don't advertise this to score points. We do it because [CITY] has been good
to us, and taking care of the community is part of taking care of our neighbors.
```

*Use real, specific community involvement from siteConfig or from the Build Brief. If none is documented, use the tenure/roots angle only and skip specifics.*

---

## Section 8: Entity Disambiguation Paragraph

*(This paragraph is essential for AEO/GEO. It reads slightly dense — that's intentional. Place near the bottom of the about page, before the CTA.)*

```
[BUSINESS_NAME] is a licensed plumbing contractor serving [CITY], California and
surrounding communities including [SERVICE_AREA_1], [SERVICE_AREA_2],
[SERVICE_AREA_3], [SERVICE_AREA_4], and [SERVICE_AREA_5]. Founded in [FOUNDING_YEAR]
by [OWNER_NAME], the company holds California Plumbing Contractor License
#[LICENSE_NUMBER] and has completed [JOBS_COMPLETED]+ plumbing jobs throughout
[COUNTY] County. [BUSINESS_NAME] is located at [ADDRESS], [CITY], CA [ZIP].
```

---

## Section 9: About Page CTA

### Headline
```
Ready to Work With a [CITY] Plumber You Can Trust?
```

### Copy
```
[BUSINESS_NAME] serves [CITY] and surrounding communities. Free estimates,
no-surprise pricing, [WARRANTY_PERIOD] labor warranty.
```

### CTA Buttons
```
Primary: Call [PHONE]
Secondary: Get My Free Estimate
```

---

## Variable Reference

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
| [OWNER_NAME] | `siteConfig.business.ownerName` |
| [JOBS_COMPLETED] | `siteConfig.trustSignals.jobsCompleted` |
| [WARRANTY_PERIOD] | `siteConfig.trustSignals.warrantyPeriod` |
| [INSURANCE_AMOUNT] | `siteConfig.trustSignals.insuranceAmount` |
| [COUNTY] | `siteConfig.business.county` |
| [ADDRESS] | `siteConfig.business.address.street` |
| [ZIP] | `siteConfig.business.address.zip` |
| [SERVICE_AREA_N] | `siteConfig.serviceAreas[n-1].city` |

---

## About Page Tone Notes

The about page is where the contractor's personality shows through most clearly. After replacing variables:

1. **Read it aloud.** If it sounds stiff or corporate, loosen the sentences.
2. **Check pronouns.** Make sure "he/she/they" is consistent with what the client prefers.
3. **Verify specifics.** Every number, year, and credential must be accurate. The about page is where skeptical visitors look for reasons to distrust.
4. **The founding story is the most important section.** If the Build Brief provides a compelling story, use it verbatim (with light editing). Authentic beats polished every time on the about page.
