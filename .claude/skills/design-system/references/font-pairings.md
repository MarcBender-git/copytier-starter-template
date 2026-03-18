# Approved Font Pairings for Contractor Websites

## Selection Protocol

1. Check `siteConfig.branding.fonts.heading` and `siteConfig.branding.fonts.body`
2. If provided: validate against the Banned Fonts list below. If banned, report and use the closest approved alternative
3. If not provided: select from the pairings below based on `siteConfig.niche` and desired feel
4. Confirm both fonts exist on Google Fonts before committing

---

## Banned Fonts — With Explanations

| Font | Reason |
|---|---|
| **Inter** | Overused to the point of invisibility. Now signals "default developer choice" rather than brand intent. Zero personality for a local business. |
| **Roboto** | Android system font. Extremely common as a no-decision default. Users see it in every app — it reads as unbranded. |
| **Arial** | OS default (Windows). No web font version needed because it's already everywhere. Using it says nothing about your brand. |
| **Helvetica** | Premium version of Arial's problem. Beautiful in its original context; meaningless as a web brand font. |
| **Space Grotesk** | Distinctly 2020s startup aesthetic. Associated with SaaS, DTC, crypto, and fintech. Immediately wrong for a plumber or roofer. |
| **Montserrat** | Severely overused in MLM, wellness coaching, and generic WordPress themes. Lost all distinctiveness. |
| **Nunito** | Rounded corners undermine authority. A home services contractor needs to read as reliable and professional, not playful. |
| **Raleway** | Thin weights (300-400) destroy legibility on mobile and fail contrast at small sizes. Its beauty is in display use only. |
| **Poppins** | The new Montserrat. Vastly overused in templates and theme packs. Signals "I used a template" to design-literate visitors. |
| **Open Sans** | Google's recommendation font for 10 years. Everyone used it. Now as generic as Arial. |

---

## Approved Pairings by Feel

### AUTHORITATIVE — Best for: Plumbing, Electrical, HVAC, Roofing

Communicate expertise, longevity, and trust. These businesses need to read as established professionals.

**Pairing A-1: The Solid Contractor**
- Heading: `Oswald` (weights 400, 600, 700) — condensed, strong, fills space well
- Body: `Source Sans 3` (weights 400, 600) — clean, highly legible, generous x-height
- Notes: The classic contractor pairing. Oswald gives authority without being stuffy.

**Pairing A-2: The Established Pro**
- Heading: `Barlow Condensed` (weights 600, 700) — tight, professional, great for hero headlines
- Body: `Lato` (weights 400, 700) — approachable but still professional
- Notes: Good when the client wants to feel slightly more "modern established" than classic

**Pairing A-3: The Premium Trade**
- Heading: `Playfair Display` (weights 700, 800) — classic serif authority
- Body: `Source Sans 3` (weights 400, 600) — contrasts well with serif heading
- Notes: Best for high-end remodeling contractors, premium HVAC, luxury installations

**Pairing A-4: The Heritage Brand**
- Heading: `Merriweather` (weights 700, 900) — traditional, trustworthy, newspaper-heritage
- Body: `Merriweather Sans` (weights 400, 600) — matched family, cohesive
- Notes: Ideal when client emphasizes "40 years in business" or family heritage

---

### FRIENDLY — Best for: House Cleaning, Handyman, Landscaping

Communicate approachability, warmth, and ease of doing business. These services enter people's homes.

**Pairing F-1: The Trusted Neighbor**
- Heading: `DM Sans` (weights 600, 700) — geometric, friendly, modern
- Body: `DM Sans` (weights 400, 500) — single-family pair, very cohesive
- Notes: Clean and modern without feeling cold. Good for cleaning and handyman services.

**Pairing F-2: The Warm Professional**
- Heading: `Nunito Sans` — NOTE: Nunito (rounded) is banned but Nunito SANS is acceptable. Less rounded, maintains friendliness without sacrificing authority.
- Body: `Mulish` (weights 400, 600) — clean, excellent readability
- Notes: Works well for house cleaning and pet-friendly landscaping companies

**Pairing F-3: The Modern Local**
- Heading: `Plus Jakarta Sans` (weights 600, 700, 800) — contemporary, confident, distinctive
- Body: `Plus Jakarta Sans` (weights 400, 500) — single-family
- Notes: Feels current without being startup-y. Good for tech-forward handyman/home services

---

### PREMIUM — Best for: High-End Remodeling, Luxury Landscaping, Custom Builds

Communicate quality, craft, and investment worthiness.

**Pairing P-1: The Craftsman**
- Heading: `Cormorant Garamond` (weights 600, 700) — editorial, refined, classic craft
- Body: `Jost` (weights 400, 500) — geometric sans that contrasts crisply with serif heading
- Notes: Best for bespoke contractors where the client sells craft, not commodity

**Pairing P-2: The Modern Premium**
- Heading: `Fraunces` (weights 700, 800) — distinctive optical size serif, design-forward
- Body: `Work Sans` (weights 400, 500) — clean, readable, wide character set
- Notes: Establishes a distinctive visual identity. For contractors who want to stand out.

---

### MODERN — Best for: Younger Contractors, Tech-Forward Services, HVAC Specialties

Feel current and competent without veering into startup territory.

**Pairing M-1: The Modern Pro**
- Heading: `Syne` (weights 700, 800) — distinctive, bold, contemporary
- Body: `Figtree` (weights 400, 500) — excellent readability, slightly friendly
- Notes: Good differentiation pairing. The heading is distinctive enough to register as a brand choice.

**Pairing M-2: The Clean Authority**
- Heading: `Lexend Deca` (weights 600, 700) — designed for readability, modern authority
- Body: `Lexend` (weights 400, 500) — related family, clean
- Notes: Single-family, highly legible, no-compromise readability for mobile.

---

## Google Fonts Loading Reference

All fonts above are available via `next/font/google`. Standard loading pattern:

```typescript
import { Oswald, Source_Sans_3 } from 'next/font/google'
// Note: Google Fonts names with spaces use underscores in next/font imports
// Source Sans 3 → Source_Sans_3
// DM Sans → DM_Sans
// Plus Jakarta Sans → Plus_Jakarta_Sans
// Barlow Condensed → Barlow_Condensed
// etc.
```

Always include `display: 'swap'` and `variable` to expose as a CSS custom property.
Load only the weights you'll actually use — unnecessary weights hurt performance.
