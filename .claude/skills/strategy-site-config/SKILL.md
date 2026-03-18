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

### Step 2: Select Niche Template
Match the contractor's trade to one of the niche templates:
- `templates/site.config.roofer.ts`
- `templates/site.config.plumber.ts`
- `templates/site.config.electrician.ts`
- `templates/site.config.hvac.ts`
- `templates/site.config.cleaner.ts`
- `templates/site.config.handyman.ts`
- `templates/site.config.landscaper.ts`

Use the matching template as the starting structure, then fill in all client-specific data.

### Step 3: Apply JTBD Framework
Read `references/jtbd-framework.md`.
- Identify which of the 4 jobs is highest priority for this niche
- Set `cta.primary` language based on the dominant job
- Enable/disable features per the niche's priority weights
- Select hero headline using the value proposition formula

### Step 4: Write the Config
Fill every field in the template. Rules:
- **No placeholder text** — every string must be real data from the Build Brief
- **Phone number** formatted for tel: links (digits only, or with hyphens)
- **Services array** — one entry per service the client offers
- **Cities array** — every city they serve, no more than 15 (more = use radius)
- **Testimonials array** — minimum 3, pulled from Build Brief social proof section
- **Colors** — default to niche color palette if client has no brand colors

### Step 5: Validate
Before outputting the config:
- Search for any remaining placeholder strings: "[", "TODO", "Lorem", "example.com"
- Verify phone number is formatted correctly
- Verify at least 3 services, 3 cities, 3 testimonials
- Verify schemaType matches the contractor's niche

### Step 6: Output
Write the completed config to `src/config/site.config.ts`.
Copy TypeScript types from `references/site-config-interface.ts` to `src/types/site-config.ts`.

---

## Reference Files

| File | Purpose |
|------|---------|
| `references/site-config-interface.ts` | Full TypeScript type definitions for siteConfig |
| `references/jtbd-framework.md` | Jobs-to-Be-Done framework — which features to include |
| `references/personas-library.md` | Visitor personas — which sections to prioritize |
| `references/architecture-decision.md` | Stack decisions, data flow, rendering strategy |
| `references/success-metrics.md` | KPIs and GA4 event setup for Pack 8 |
| `references/feature-prioritization.md` | MoSCoW templates per niche — what ships at launch |

---

## Quality Checkpoints

Before handing off to Pack 2, verify:

- [ ] `site.config.ts` exports a valid `siteConfig` object matching the TypeScript interface
- [ ] Zero placeholder text in any string field
- [ ] `businessName`, `tagline`, `contact.phone`, `contact.address` all populated
- [ ] `services` array has 3+ entries with `name`, `slug`, `description`, `features[]`
- [ ] `serviceArea.cities` has 3+ entries
- [ ] `testimonials` array has 3+ entries with `author`, `rating`, `text`
- [ ] `trust.licenseNumber` populated (or flagged as "client to provide")
- [ ] `branding.primaryColor` set (client brand or niche default)
- [ ] `schemaType` set to correct LocalBusiness subtype for the niche

---

## Pack 2 Handoff

When this skill completes, the config is ready for Pack 2 (Design System).
Pack 2 reads: `siteConfig.branding`, `siteConfig.niche`, `siteConfig.stack`

Tell Claude: "Pack 1 complete. site.config.ts written to src/config/. Proceed with Pack 2."
