---
name: strategy-site-config
description: Transform a client Build Brief into a complete site.config.ts — the single source of truth for every contractor website. Analyzes the brief, selects niche-appropriate defaults, writes all business data, and outputs a zero-placeholder config ready for Pack 2.
---

# Pack 1: Strategy & Site Config

## Overview

Pack 1 is the first step in every Copytier build. It reads the Build Brief and produces
`site.config.ts` — the single file that drives every subsequent pack.

**Input:** Build Brief (pasted as prompt or loaded from docs/)
**Output:** `src/config/site.config.ts` — complete, no placeholders, ready for Pack 2

**Unifying principle:** Every field in site.config.ts must be filled with real client data.
If a field cannot be filled from the Build Brief, flag it and ask. Never use placeholder text.

---

## What This Skill Produces

```
src/config/site.config.ts     ← Primary output (complete config)
src/types/site-config.ts      ← TypeScript type definitions (from references/site-config-interface.ts)
```

---

## Build Workflow

### Step 1: Read the Build Brief
Extract all five sections:
1. Client Business Data (name, address, phone, license, years in business)
2. Website Evaluation Report (existing site issues, competitor analysis)
3. Client Requirements (services, service areas, features requested)
4. Trust & Social Proof Assets (reviews, testimonials, certifications)
5. Technical Needs (domain, Vercel, Supabase, integrations)

### Step 2: Detect Industry Type

**This is the branch point for all downstream behavior.**

Determine whether the client is a home-service contractor or an out-of-niche business:

**If home-service contractor** (plumber, HVAC, electrician, roofer, landscaper, handyman, cleaner, painter, general-contractor, pool-spa):
- Set `niche` to the matching `HomeServiceNicheType` value
- The `industry` config section is **optional** — skills use existing contractor defaults
- Proceed to Step 3a (Select Niche Template)

**If out-of-niche business** (B2B services, agency, restaurant, healthcare, nonprofit, e-commerce, etc.):
- Set `niche` to `'custom'`
- The `industry` config section is **REQUIRED**
- Read `references/industry-defaults.md` for the industry type's default configuration
- Proceed to Step 3b (Build Industry Config)

### Step 3a: Select Niche Template (Home-Service Only)
Match the contractor's trade to one of the niche templates:
- `templates/site.config.roofer.ts`
- `templates/site.config.plumber.ts`
- `templates/site.config.electrician.ts`
- `templates/site.config.hvac.ts`
- `templates/site.config.cleaner.ts`
- `templates/site.config.handyman.ts`
- `templates/site.config.landscaper.ts`

Use the matching template as the starting structure, then fill in all client-specific data.
**Skip to Step 4.**

### Step 3b: Build Industry Config (Out-of-Niche Only)

Read `references/industry-defaults.md` and select the matching `IndustryType`.

Populate the `industry` config section:

1. **`industry.type`** — Select from: `'professional-service'`, `'agency'`, `'restaurant'`, `'ecommerce'`, `'healthcare'`, `'nonprofit'`, `'custom'`

2. **`industry.schemaType`** — Select the most specific schema.org type for this business. Reference the Schema.org Type Selection table in `references/industry-defaults.md`.

3. **`industry.conversion`** — Set conversion configuration:
   - `primaryAction`: What is the #1 action visitors should take? (`'phone'`, `'form'`, `'booking'`, `'meeting'`, `'demo'`, `'purchase'`)
   - `primaryCTAText`: Action verb + specific outcome (e.g., "Request a Consultation", "Book a Table")
   - `secondaryCTAText`: Lower-commitment alternative (e.g., "View Our Projects", "See Our Menu")
   - `showPhoneInHeader`: `true` for local service businesses, often `false` for B2B national
   - `showEmergencyBanner`: `true` ONLY for emergency service providers
   - `formFields`: Ordered list of form field names appropriate for this industry

4. **`industry.designStyle`** — Select from: `'professional-clean'`, `'bold-creative'`, `'technical-precision'`, `'warm-inviting'`, `'premium-luxury'`, `'industrial-modern'`, `'custom'`

5. **`industry.homepageSections`** — Define the ordered section flow for the homepage. Reference the Page Structure Mapping in `references/industry-defaults.md`.

6. **`industry.trustSignals`** — Map the client's available trust assets to three tiers using the Trust Signal Mapping in `references/industry-defaults.md`.

7. **`industry.seo`** — Set SEO configuration:
   - `titleFormat`: Industry-appropriate title tag template
   - `localSEO`: `true` for local businesses, `false` for national/B2B
   - `serviceAreaPages`: `true` only for local service businesses with geographic coverage

### Step 4: Apply JTBD Framework
Read `references/jtbd-framework.md`.
- Identify which of the 4 jobs is highest priority for this niche/industry
- Set `cta.primary` language based on the dominant job
- Enable/disable features per the niche/industry priority weights
- Select hero headline using the value proposition formula
- **For out-of-niche builds:** The JTBD framework still applies but the specific jobs may differ. Adapt the 4 core jobs to the industry context (e.g., a B2B firm's Job 1 might be "Confirm expertise in my specific problem area" rather than "Confirm service availability").

### Step 5: Write the Config
Fill every field in the template. Rules:
- **No placeholder text** — every string must be real data from the Build Brief
- **Phone number** formatted for tel: links (digits only, or with hyphens)
- **Services array** — one entry per service the client offers
- **Cities array** — every city they serve, no more than 15 (more = use radius). For non-local businesses without service areas, this can be empty.
- **Testimonials array** — minimum 3, pulled from Build Brief social proof section
- **Colors** — default to niche color palette (home-service) or industry design style palette (out-of-niche) if client has no brand colors
- **For out-of-niche builds:** Ensure `industry` section is fully populated with zero placeholders

### Step 6: Validate
Before outputting the config:
- Search for any remaining placeholder strings: "[", "TODO", "Lorem", "example.com"
- Verify phone number is formatted correctly
- Verify at least 3 services and 3 testimonials
- For home-service: verify at least 3 cities and schemaType matches niche
- For out-of-niche: verify `industry` section is complete:
  - [ ] `industry.type` is set and not 'home-service'
  - [ ] `industry.schemaType` is a valid schema.org type
  - [ ] `industry.conversion` has all required fields
  - [ ] `industry.designStyle` is set
  - [ ] `industry.homepageSections` has at least 5 sections
  - [ ] `industry.trustSignals` has at least 2 items in tier1
  - [ ] `industry.seo.titleFormat` is set

### Step 7: Output
Write the completed config to `src/config/site.config.ts`.
Copy TypeScript types from `references/site-config-interface.ts` to `src/types/site-config.ts`.

---

## Reference Files

| File | Purpose |
|------|---------|
| `references/site-config-interface.ts` | Full TypeScript type definitions for siteConfig (includes IndustryConfig) |
| `references/industry-defaults.md` | Industry-specific defaults: conversion, design, trust signals, page structure, SEO |
| `references/jtbd-framework.md` | Jobs-to-Be-Done framework — which features to include |
| `references/personas-library.md` | Visitor personas — which sections to prioritize |
| `references/architecture-decision.md` | Stack decisions, data flow, rendering strategy |
| `references/success-metrics.md` | KPIs and GA4 event setup for Pack 8 |
| `references/feature-prioritization.md` | MoSCoW templates per niche — what ships at launch |

---

## Quality Checkpoints

Before handing off to Pack 2, verify:

**All builds:**
- [ ] `site.config.ts` exports a valid `siteConfig` object matching the TypeScript interface
- [ ] Zero placeholder text in any string field
- [ ] `businessName`, `tagline`, `contact.phone`, `contact.address` all populated
- [ ] `services` array has 3+ entries with `name`, `slug`, `description`
- [ ] `testimonials` array has 3+ entries with `author`, `rating`, `text`
- [ ] `branding.primaryColor` set (client brand, niche default, or industry default)

**Home-service builds (niche ≠ 'custom'):**
- [ ] `niche` set to a valid `HomeServiceNicheType`
- [ ] `serviceArea.cities` has 3+ entries
- [ ] `trust.licenseNumber` populated (or flagged as "client to provide")
- [ ] `schemaType` set to correct LocalBusiness subtype for the niche

**Out-of-niche builds (niche = 'custom'):**
- [ ] `niche` is set to `'custom'`
- [ ] `industry` section is present and fully populated
- [ ] `industry.type` is set to correct IndustryType
- [ ] `industry.schemaType` is a valid schema.org type string
- [ ] `industry.conversion.primaryAction` matches the business model
- [ ] `industry.conversion.primaryCTAText` starts with an action verb
- [ ] `industry.designStyle` is set and appropriate for the industry
- [ ] `industry.homepageSections` has 5+ sections in correct order
- [ ] `industry.trustSignals.tier1` has 2+ items
- [ ] `industry.seo.titleFormat` is set with bracket tokens
- [ ] `industry.seo.localSEO` correctly reflects local vs. national business
- [ ] `industry.seo.serviceAreaPages` is `false` unless the business has local service coverage

---

## Pack 2 Handoff

When this skill completes, the config is ready for Pack 2 (Design System).

**Home-service builds:** Pack 2 reads: `siteConfig.branding`, `siteConfig.niche`, `siteConfig.stack`
**Out-of-niche builds:** Pack 2 reads: `siteConfig.branding`, `siteConfig.niche`, `siteConfig.industry.designStyle`, `siteConfig.industry.type`, `siteConfig.stack`

Tell Claude: "Pack 1 complete. site.config.ts written to src/config/. Proceed with Pack 2."
