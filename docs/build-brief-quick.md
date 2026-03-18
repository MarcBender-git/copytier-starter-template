# Copytier Website Build Brief — Quick Start

## Instructions for Claude Code

Ultrathink. You are starting a new Copytier contractor website build using a Quick Brief. This brief contains only the essential fields needed to generate a working `site.config.ts`. For every field NOT provided here, use the niche default from the strategy-site-config skill. Do NOT ask me any questions — build with what's here and flag any missing items as follow-up after Pack 1.

After generating `site.config.ts`, confirm you're ready for Pack 2 (Design System) and list all fields that used niche defaults so I can update them before Pack 5 (Content & SEO).

---

## Client Data

**Company Name:** [COMPANY NAME]

**Trade/Niche:** [plumber | hvac | electrician | roofer | landscaper | handyman | cleaner | general-contractor | painter]

**Owner Name:** [OWNER FULL NAME]

**Primary City:** [MAIN CITY, STATE]

**Service Area Cities:** [CITY 1, CITY 2, CITY 3, ... — list all cities served]

**Phone Number:** [PHONE with area code, e.g., (951) 555-0123]

**Email:** [EMAIL ADDRESS]

**License:** [LICENSE NUMBER and TYPE, e.g., "CSLB #1048273, C-36 Plumbing" — or N/A]

**Services Offered (in priority order):**
1. [SERVICE NAME]
2. [SERVICE NAME]
3. [SERVICE NAME]
4. [SERVICE NAME]
5. [SERVICE NAME]
[Add more as needed]

**Google Reviews:** [RATING out of 5] stars, [NUMBER] reviews — e.g., "4.8 stars, 147 reviews"

**Years in Business:** [NUMBER]

**Current Website URL:** [URL or "None"]

**Brand Color Preference:** [HEX CODES if known, describe like "blues and white", or "auto" to use niche default]

**Testimonials (provide 2–3):**

Testimonial 1:
- Name: [FIRST NAME LAST INITIAL, e.g., "Sarah M."]
- Rating: [1–5]
- Text: "[FULL TESTIMONIAL TEXT]"
- Service: [Which service this is about]

Testimonial 2:
- Name: [...]
- Rating: [...]
- Text: "[...]"
- Service: [...]

Testimonial 3 (optional):
- Name: [...]
- Rating: [...]
- Text: "[...]"
- Service: [...]

**Domain Name:** [e.g., smithplumbing.com or "Need to purchase"]

---

## Build Instructions

After reading this brief, execute the following sequence:

1. **Run Pack 1 (Strategy & Site Config):** Generate the complete `site.config.ts` using the strategy-site-config skill. Use the niche template as the base and populate only the fields provided above. Flag every field that used a niche default — these will need real client data before Pack 5.

2. **After `site.config.ts` is confirmed:** Proceed through Packs 2–8 sequentially. Do NOT skip packs. Each pack reads from `site.config.ts` and the outputs of previous packs.

3. **At each pack boundary:** Confirm the pack's output is complete before moving to the next. If something is missing that can be filled with a niche default, use it and flag it. Only stop if a field is truly unbuildable without client input.

4. **After Pack 8:** Deploy a preview to Vercel and provide me the URL. Include a complete list of all niche-defaulted fields that need real data before the site goes live.
