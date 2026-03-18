# Service Page Copy Template
## Niche: Plumber | Service: Water Heater Repair & Installation | City: Sacramento CA

**How to use:** Replace every `[VARIABLE]` with data from siteConfig. One template per service — create a separate content doc for each service in `siteConfig.services[]`.

---

## SEO Metadata

```typescript
export const metadata: Metadata = {
  title: "Water Heater Repair & Installation in [CITY] | [BUSINESS_NAME]",
  // Example: "Water Heater Repair & Installation in Sacramento | Valley Plumbing Co."
  // Target: 50–60 chars — trim service name if needed

  description: "Water heater repair and installation in [CITY]. Same-day service, all major brands. [BUSINESS_NAME] — licensed plumber, CA Lic. #[LICENSE_NUMBER]. Call [PHONE].",
  // Target: 150–160 chars

  openGraph: {
    title: "Water Heater Repair & Installation in [CITY] | [BUSINESS_NAME]",
    description: "[Same as above]",
    url: "https://[DOMAIN]/services/water-heater",
    images: [{ url: "https://[DOMAIN]/images/og/water-heater.jpg", width: 1200, height: 630, alt: "Water heater installation in [CITY] by [BUSINESS_NAME]" }],
  },
  alternates: { canonical: "https://[DOMAIN]/services/water-heater" }
}
```

---

## Breadcrumb

```
Home / Services / Water Heater Repair & Installation
```

*(Rendered as linked breadcrumb nav + BreadcrumbList JSON-LD)*

---

## Section 1: Service Hero

### H1
```
Water Heater Repair & Installation in [CITY] — Same-Day Service
```

Alternative H1s:
```
[CITY] Water Heater Repair — Licensed Plumber, All Major Brands
No Hot Water in [CITY]? Same-Day Water Heater Repair & Replacement
```

### Subheadline
```
Tank or tankless, repair or replacement — [BUSINESS_NAME] handles it same-day
throughout [CITY] and [SERVICE_AREA_2]. Written estimate before we start.
```

### Primary CTA
```
Call [PHONE] — We Answer 24/7
```

Secondary CTA:
```
Schedule My Free Estimate
```

---

## Section 2: Problem Description

### H2
```
Signs Your Water Heater Needs Attention
```

### Body Copy
```
No hot water is the obvious sign — but there are others worth knowing about.
Rusty or discolored water from your hot tap often means corrosion inside the tank.
A popping or rumbling sound usually means mineral buildup, which shortens the unit's
life significantly. A small puddle near the base of the unit? That's a leak, and it
won't get better on its own.

Water heaters fail gradually, then suddenly. Most [CITY] homeowners don't think
about their water heater until the morning it stops working — usually in winter,
usually when they have somewhere to be. If your unit is [WARNING_AGE]+ years old,
it's worth knowing where it stands before it decides for you.

[BUSINESS_NAME] diagnoses water heater problems correctly the first time, so you're
not paying for a band-aid repair when a replacement makes more financial sense — or
replacing a unit that had years left in it.
```

*[WARNING_AGE] = typically 8–10 years for tank units, 12–15 for tankless. Adjust per niche knowledge.*

---

## Section 3: Our Process

### H2
```
How We Handle Water Heater Repairs and Replacements in [CITY]
```

### Numbered Process Steps

```
Step 1: We Diagnose the Problem First
Before recommending anything, we inspect your water heater and your hot water
system — checking the anode rod, thermostat, heating elements (electric) or
burner assembly (gas), pressure relief valve, and connections. You get a clear
explanation of what we found and what it means.

Step 2: You Get a Written Estimate — No Surprises
We quote the repair or replacement in writing before any work starts. The price
you see is the price you pay. No "we found something else" upsells mid-job
without your approval.

Step 3: We Fix It or Replace It — Today
Most water heater repairs take 1–2 hours. Replacements on standard tank models
take 2–4 hours. We carry the most common 40 and 50-gallon units on our trucks
for same-day swap-outs. Tankless units are typically ordered within 24 hours
unless we have one in stock.

Step 4: We Test Before We Leave
Before we close the job, we run your hot water through a full cycle — checking
temperature, pressure, and connections. You get a functioning water heater,
not a promise that it should work.

Step 5: Warranty Documentation
All [BUSINESS_NAME] installations include a [WARRANTY_PERIOD] labor warranty.
We register your new unit's manufacturer warranty for you and leave you a copy
of everything — make, model, install date, serial number, and our contact info.
```

---

## Section 4: What's Included

### H2
```
What's Included in Every [BUSINESS_NAME] Water Heater Job
```

### Bullets
```
✓ Complete diagnostic inspection before any repair or replacement recommendation
✓ Written, itemized estimate — approved by you before work begins
✓ All labor for repair or full installation
✓ Haul-away and disposal of your old unit (no extra charge)
✓ Pressure relief valve check and replacement if needed
✓ Sediment flush on repairs (extends remaining life of the unit)
✓ All supply line connections and fitting work
✓ Gas line connections and leak test (gas units)
✓ Electrical connections (electric units)
✓ [WARRANTY_PERIOD] workmanship warranty on all labor
✓ Manufacturer warranty registration completed on your behalf
✓ Final temperature and pressure verification before we leave
```

---

## Section 5: Trust Signals — Water Heater Specific

### H2
```
[BUSINESS_NAME] Water Heater Credentials
```

### Copy
```
[BUSINESS_NAME] is licensed by the California Contractors State License Board
(CA Lic. #[LICENSE_NUMBER]) and carries [INSURANCE_AMOUNT] in general liability
insurance. All gas line work is performed per California Plumbing Code and
inspected when permits are required.

We install and service [BRAND_1], [BRAND_2], [BRAND_3], and most other major brands.
For units still under manufacturer warranty, we work directly with the manufacturer
to document the claim correctly — which can save you hundreds of dollars.
```

---

## Section 6: Proof (Testimonials)

### H2
```
[CITY] Customers on Our Water Heater Work
```

### Testimonial 1
```
"Our water heater went out on a Friday afternoon and [BUSINESS_NAME] had a new one
installed by 6pm. [OWNER_NAME] explained everything, showed me what failed on the
old unit, and the price was exactly what was quoted. No drama."
— James K., [CITY_NEIGHBORHOOD or SERVICE_AREA]
★★★★★
```

### Testimonial 2
```
"I thought I needed a full replacement but [BUSINESS_NAME] diagnosed it as a failed
heating element. Fixed for $180 instead of $1,200. Honest is a rare thing. I'll
be a customer for life."
— Sandra M., [CITY]
★★★★★
```

*Replace with real testimonials from siteConfig.testimonials[]. Use ones that specifically mention water heater work if available.*

---

## Section 7: Cost Information

### H2
```
Water Heater Repair & Replacement Costs in [CITY]
```

### Body Copy
```
Water heater costs in [CITY] vary based on the type of unit and whether it's a repair
or replacement. Here's what most [CITY] homeowners typically pay:

Repairs: Most water heater repairs run $150–$450 for parts and labor. Common repairs
include replacing a heating element ($150–$250), a thermostat ($120–$200), or a
pressure relief valve ($100–$175). Emergency/after-hours service carries an additional
trip fee.

Standard tank replacements: A new 40–50 gallon tank water heater fully installed
typically runs $900–$1,300 in [CITY], depending on unit and any code upgrades required.

Tankless water heaters: Installation of a whole-home tankless system runs $1,400–$2,500
or more, depending on the unit and whether gas line modifications are needed.

[BUSINESS_NAME] provides itemized written estimates for every job. Call [PHONE] for a
free assessment — we'll tell you honestly whether repair or replacement makes more
financial sense for your situation.
```

---

## Section 8: Related Services

### H2
```
Other Plumbing Services in [CITY]
```

### Related Service Cards (3–4 links)

```
Card 1: Emergency Plumbing
Burst pipes, flooding, and sewage backups. We respond to [CITY] emergencies
within [EMERGENCY_RESPONSE_TIME].
Link: /services/emergency-plumbing

Card 2: Leak Detection & Repair
Water bills spiking? We locate and repair leaks without tearing up walls.
Link: /services/leak-detection

Card 3: Drain Cleaning
Slow drains and clogs cleared fast. Camera inspection for recurring problems.
Link: /services/drain-cleaning
```

---

## Section 9: FAQ — Water Heater Specific

### H2
```
Water Heater Questions — [CITY] Homeowners Ask
```

### FAQ 1 — Repair vs. Replace
```
Q: Should I repair or replace my water heater?

A: If your water heater is under 8 years old, repair usually makes sense. If it's
   over 12 years old, replacement is typically more cost-effective — you're paying
   for repairs on a unit that will fail within a few years anyway. Between 8 and 12
   years, it depends on what's wrong and what repair costs. [BUSINESS_NAME] will
   give you an honest assessment of both options with pricing for each.
```

### FAQ 2 — Timeline
```
Q: How long does a water heater installation take?

A: A standard tank water heater replacement typically takes 2–4 hours once we're on
   site. This includes removing the old unit, making any necessary code updates, installing
   the new unit, connecting gas or electrical, and testing. We carry 40 and 50-gallon
   units on our trucks for same-day installations. Tankless systems take 4–6 hours and
   are usually ordered if we don't have the model in stock.
```

### FAQ 3 — Permits
```
Q: Is a permit required to replace a water heater in [CITY]?

A: Yes, [CITY] requires a permit for water heater replacement. [BUSINESS_NAME] pulls
   the permit for all installations as part of the job — it's included in our price.
   Permitted work means the installation is inspected and documented, which matters
   when you sell your home.
```

### FAQ 4 — Tank vs. Tankless
```
Q: Is a tankless water heater worth it in [CITY]?

A: Tankless water heaters cost 2–3× more to install but use 30–50% less energy and
   last 20+ years vs. 10–12 for tank units. For households using a lot of hot water —
   or planning to stay in the home long-term — the math often works out. For smaller
   households or those planning to sell within a few years, a standard tank replacement
   usually makes more financial sense. We'll run the numbers for your specific situation.
```

### FAQ 5 — Emergency water heater
```
Q: My water heater is leaking right now — what should I do?

A: If it's actively leaking: turn off the water supply valve at the top of the unit
   (clockwise to close), then turn off the gas valve (perpendicular to the pipe = off)
   or flip the circuit breaker for electric units. This stops the water and prevents
   a gas or electrical hazard. Then call [PHONE]. We'll respond within [EMERGENCY_RESPONSE_TIME]
   for water heater emergencies. Don't try to move a full water heater — they weigh
   150+ pounds.
```

### FAQ 6 — Warranty
```
Q: What warranty do I get on a new water heater from [BUSINESS_NAME]?

A: Every water heater installation from [BUSINESS_NAME] includes a [WARRANTY_PERIOD]
   labor warranty from us and the manufacturer's warranty on the unit itself — typically
   6 years on the tank and 1 year on parts for standard units, longer for premium models.
   We register your warranty with the manufacturer and give you the documentation.
```

### FAQ 7 — Hard water impact
```
Q: Does hard water affect my water heater in [CITY]?

A: [CITY]'s water has moderate to high mineral content, which accelerates sediment
   buildup inside tank water heaters. This reduces efficiency and shortens the unit's
   life. Annual flushing helps — [BUSINESS_NAME] includes a sediment flush with all
   repair visits. For homes with severe hard water, a water softener or whole-home
   filter extends your water heater's life significantly.
```

---

## Section 10: Service Page CTA

### Headline
```
Water Heater Problem in [CITY]? We Can Help Today.
```

### Copy
```
[BUSINESS_NAME] offers same-day water heater repair and replacement throughout
[CITY], [SERVICE_AREA_2], [SERVICE_AREA_3], and surrounding communities.
Licensed, insured, and backed by a [WARRANTY_PERIOD] labor warranty.
```

### CTA Buttons
```
Primary: Call [PHONE]
Secondary: Get My Free Estimate
```

### Supporting Microcopy
```
We call back within 2 hours for non-emergencies.
For active leaks or no water: call [PHONE] now — we respond within [EMERGENCY_RESPONSE_TIME].
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
| [WARRANTY_PERIOD] | `siteConfig.trustSignals.warrantyPeriod` |
| [EMERGENCY_RESPONSE_TIME] | `siteConfig.contact.emergencyResponseTime` |
| [INSURANCE_AMOUNT] | `siteConfig.trustSignals.insuranceAmount` |
| [BRAND_1/2/3] | `siteConfig.services[n].brands[]` |
| [OWNER_NAME] | `siteConfig.business.ownerName` |
| [SERVICE_AREA_N] | `siteConfig.serviceAreas[n-1].city` |
