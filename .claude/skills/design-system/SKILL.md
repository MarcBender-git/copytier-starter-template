---
name: design-system
description: >
  Use when setting up or modifying the visual design system for a contractor website.
  This includes generating Tailwind config extensions, CSS design tokens, font loading,
  motion/animation system, responsive architecture, and enforcing the "successful local
  business" aesthetic that overrides the frontend-design plugin's creative instincts.
  Runs after Pack 1 (strategy-site-config) has produced site.config.ts.
  Reads siteConfig.branding, siteConfig.niche, and siteConfig.stack.
---

# Pack 2: Design System & Visual Foundation

## Overview

Pack 2 is the **translator layer** between raw brand inputs and a fully-specified, production-ready design system. It takes the `site.config.ts` produced by Pack 1 and produces every visual foundation file the rest of the build depends on.

### What This Skill Produces

| Output File | Purpose |
|---|---|
| `tailwind.config.ts` | Extended Tailwind config with brand colors, fonts, spacing, shadows, animations |
| `src/styles/tokens.css` | Three-layer CSS custom properties (primitive → semantic → component) |
| `src/styles/globals.css` | Base styles, resets, typography defaults, motion system |
| `src/app/layout.tsx` (font section) | Next.js font loading with `next/font/google` |

### The Translator Role

The frontend-design plugin installed in Claude Code has strong creative instincts that produce visually impressive but conversion-wrong output for contractor sites. It trends toward:
- Purple/teal gradient color schemes
- Space Grotesk, Inter, or other tech-startup fonts
- Experimental layouts borrowed from SaaS products
- Motion-heavy animations that distract from CTAs

**Pack 2 overrides all of this.** Its job is to channel the plugin's genuine strengths — typography hierarchy, spatial rhythm, depth through shadows — while anchoring every decision to what converts for the target industry.

### Aesthetic North Star — Industry Aware

**Check `siteConfig.niche` first:**

**If niche is a HomeServiceNicheType** (plumber, hvac, electrician, etc.):
The aesthetic north star is **"Successful local business."** Think the professional who drives a clean truck, wears a uniform, and has 200 Google reviews. Not a startup. Not a design agency. Not a portfolio site.

**If niche is `'custom'` (out-of-niche build):**
Read `siteConfig.industry.designStyle` and apply the matching aesthetic:

| Design Style | Aesthetic North Star | Typography Character | Color Psychology | Spacing |
|---|---|---|---|---|
| `professional-clean` | "Trusted advisor" — clean, structured, credential-forward | Authoritative serif or clean sans, generous weight contrast | Blues, dark grays, muted accents. Trust over urgency | Generous whitespace, grid-strict |
| `bold-creative` | "Results-driven creative" — confident, portfolio-forward | Strong display heading, clean body. Weight contrast matters | Saturated primaries, bold accent. Can use wider palette | Tighter spacing, more visual density |
| `technical-precision` | "Engineering rigor" — data-friendly, structured, organized | Monospace or geometric heading, technical body font | Dark blues, grays, steel. Minimal warm tones | Dense but organized. Tables and data-friendly |
| `warm-inviting` | "Welcoming caregiver" — approachable, human, caring | Rounded heading, highly readable body. Lighter weights | Warm neutrals, greens, soft blues. Calming palette | Generous padding, rounded corners, soft shadows |
| `premium-luxury` | "Exclusive quality" — restrained, elegant, high-end | Thin serif heading, refined sans body. Minimal weight range | Black, white, gold/bronze accent. Very restrained | Maximum whitespace. Less is more |
| `industrial-modern` | "Successful local business" — the existing Copytier default | Clean heading with authority, readable body | Blues/greens for trust, orange for CTA urgency | 8pt grid, conversion-focused density |

The font banned list and color constraints from the home-service rules still apply as safety rails, but the specific color psychology table is replaced by the industry-appropriate palette guidance above.

---

## Design System Build Workflow

### Step 1: Read siteConfig.branding + Industry Context

Before writing a single line of CSS, read these fields from `site.config.ts`:

```typescript
// Fields you need (all builds):
siteConfig.branding.colors.primary     // e.g., "#1D4ED8"
siteConfig.branding.colors.accent      // e.g., "#F97316"
siteConfig.branding.colors.neutral     // e.g., "#1E293B"
siteConfig.branding.colors.background  // e.g., "#FFFFFF"
siteConfig.branding.fonts.heading      // e.g., "Oswald"
siteConfig.branding.fonts.body         // e.g., "Source Sans 3"
siteConfig.branding.imagery            // e.g., "photography" | "illustrated" | "minimal"
siteConfig.niche                       // e.g., "plumber" | "hvac" | "custom"
siteConfig.businessName                // Used for alt text defaults

// Additional fields for out-of-niche builds (niche === 'custom'):
siteConfig.industry?.type              // e.g., "professional-service" | "agency"
siteConfig.industry?.designStyle       // e.g., "professional-clean" | "bold-creative"
```

If any of these fields are missing or contain placeholder text like `[COLOR]`, **stop and report the gap** — do not invent values. Pack 1 must complete before Pack 2 runs.

**Industry branching:** If `siteConfig.niche === 'custom'`, the `industry` section MUST exist. Use `industry.designStyle` to determine the aesthetic rules for Steps 2-6 instead of the contractor-specific defaults.

### Step 2: Validate Brand Colors

Before generating scales, validate the provided base colors:

**Contrast Checks (WCAG AA minimum):**
- Primary color on white background: must achieve ≥ 4.5:1 ratio for body text
- Primary color as button background with white text: must achieve ≥ 4.5:1
- Accent color as CTA button with white or dark text: must achieve ≥ 4.5:1
- If a color fails contrast, darken it by adjusting lightness in HSL space until it passes

**Niche Color Psychology Check:**
Cross-reference `siteConfig.niche` against the Color Psychology by Niche table (Section 4).
- If the provided primary color conflicts with niche expectations, note it but DO NOT override — the client chose it
- If the provided primary is a banned niche color (e.g., hot pink for plumbing), flag it with a warning comment in the output files
- See `references/color-generation.md` for full contrast checking methodology

**Required: Check for banned colors:**
- No pure black (`#000000`) — use `#0F172A` or similar near-black
- No pure white (`#FFFFFF`) for backgrounds — use `#FAFAFA` or `#F8FAFC`
- No neon/fluorescent values (saturation > 95% and lightness between 50-70%)

### Step 3: Generate Color Scales

From each base color, generate a full 10-stop scale (50, 100, 200, 300, 400, 500, 600, 700, 800, 900).

**Required scales to generate:**
- `brand-primary` (10 stops from siteConfig.branding.colors.primary)
- `brand-accent` (10 stops from siteConfig.branding.colors.accent)
- `brand-neutral` (10 stops from siteConfig.branding.colors.neutral)
- Always include Tailwind's built-in `slate` as the gray system

See `references/color-generation.md` for the full algorithm, HSL manipulation approach, and how to ensure the 500-stop matches the provided base color exactly.

**60-30-10 Color Allocation:**
- 60%: Neutral/white backgrounds, text, structural elements
- 30%: Primary brand color — headers, key UI elements, trust signals
- 10%: Accent color — CTAs only, emergency badges, phone number highlights

### Step 4: Select and Validate Font Pairing

**Font selection is strictly constrained:**
1. Use `siteConfig.branding.fonts.heading` and `siteConfig.branding.fonts.body` if provided
2. If not provided, select from the approved pairings in `references/font-pairings.md` based on `siteConfig.niche`
3. Never invent a pairing not in the approved list
4. Never use a font on the banned list

**Validation checks:**
- Both fonts must be available on Google Fonts (for `next/font/google` loading)
- Heading font must have sufficient weight variation (at minimum: 700, ideally 400-900)
- Body font must have a legible regular (400) weight at 16px
- The pair must have visual contrast — two similar geometric sans-serifs is not a pairing

See `references/font-pairings.md` for complete approved pairings organized by niche feel.

### Step 5: Build Three-Layer Token System

The token system is the bridge between raw brand values and component styles. Never reference hex values directly in component CSS — always go through tokens.

**Three layers:**
1. **Primitive** — Raw named values. `--color-blue-700: #1D4ED8`
2. **Semantic** — Purpose-assigned references. `--color-primary: var(--color-blue-700)`
3. **Component** — Context-specific assignments. `--btn-cta-bg: var(--color-accent)`

This structure means a complete rebrand requires changing only the semantic layer — primitives and components stay stable.

See `references/token-system.md` for the complete token naming convention and full property list.

### Step 6: Generate Output Files

Generate these files in order. Each depends on the previous:

**1. `src/styles/tokens.css`**
Start from `templates/tokens.template.css`. Replace all placeholder comments with actual values derived from Steps 2-5. Do not leave any `/* FROM: siteConfig... */` comments in the output — replace them with real values.

**2. `tailwind.config.ts`**
Start from `templates/tailwind.config.template.ts`. Inject the brand color scales as CSS variable references (e.g., `'brand-primary': { 500: 'var(--color-primary)' }`). Never hardcode hex values in `tailwind.config.ts` — all colors must reference CSS custom properties so theming works.

**3. `src/styles/globals.css`**
Start from `templates/globals.template.css`. Verify all `@import` paths are correct for the project structure. Ensure the reduced-motion block is present and correct.

**4. Font loading in `src/app/layout.tsx`**
Add `next/font/google` imports for both fonts. Pass fonts as CSS variables so Tailwind can reference them. Pattern:

```typescript
import { Oswald, Source_Sans_3 } from 'next/font/google'

const heading = Oswald({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const body = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
})

// In layout: <html className={`${heading.variable} ${body.variable}`}>
```

### Step 7: Quality Checkpoints

Run the full checklist in Section 8 before marking Pack 2 complete. Use Playwright MCP to screenshot the project at both 375px and 1280px after applying the design system to confirm no visual regressions.

---

## Frontend-Design Plugin Constraint Rules

These rules are **explicit overrides** that take precedence over anything the frontend-design plugin suggests:

### Color Constraints
- Colors come from `siteConfig.branding.colors` ONLY — no plugin-invented palettes
- NO purple gradients — ever. Purple reads as tech/beauty, not contractor
- NO teal-to-blue gradients — reads as corporate SaaS
- NO monochromatic "sophisticated" schemes that use one hue at multiple lightness levels as the full palette — contractor sites need a clear primary + accent CTA contrast
- Gradient usage is limited to: subtle background texture (opacity < 0.05) and decorative dividers only

### Font Constraints
- Fonts come from `siteConfig.branding.fonts` ONLY — no plugin-suggested alternatives
- NEVER suggest Inter — too generic, indistinguishable
- NEVER suggest Space Grotesk — too startup/tech
- NEVER suggest Roboto — Android defaults, zero brand personality
- NEVER suggest Arial or Helvetica — system defaults with no character
- See `references/font-pairings.md` for the full banned list with explanations

### Animation Constraints
- Fade-ins on scroll ONLY — no slides, bounces, rotations, or scale effects
- Maximum animation duration: 350ms
- All animations MUST respect `prefers-reduced-motion: reduce` media query
- NEVER animate hero sections — the LCP element must render instantly
- NEVER animate text — it reduces readability and hurts Core Web Vitals
- Hover states only: color/opacity transitions at 200ms ease

### Layout Constraints
- Phone number findable in 2 seconds on mobile — no plugin-designed "clean minimal" headers that bury the phone
- "Call Now" / CTA button immediately visible without scrolling on mobile
- NO experimental layouts: no asymmetric grids, no full-bleed text sections, no magazine-style columns for services
- Hero: heading + subheading + CTA + trust badge. That's it. The plugin will want to add more — resist

---

## Color Psychology by Niche

### Home-Service Contractor Niches (niche ≠ 'custom')

| Niche | Recommended Primary | Recommended Accent | Avoid |
|---|---|---|---|
| Plumbing | Deep blue (#1E3A5F, #1D4ED8) | Orange (#F97316) | Green (reads as lawn), Purple, Pink |
| HVAC | Navy or royal blue (#1E40AF) | Orange or yellow (#F59E0B) | Cool teal (too clinical), Red |
| Electrical | Dark navy (#172554) | Bright yellow (#EAB308) | Red (danger connotations), Purple |
| Roofing | Deep gray (#374151) or forest green (#166534) | Orange or red (#DC2626) | Baby blue, Pink, Yellow primary |
| Landscaping | Forest green (#15803D) | Warm orange (#EA580C) | Dark navy, Purple, Gray-only |
| Handyman | Deep blue (#1E40AF) or charcoal (#374151) | Orange (#F97316) | Pastel anything, Lavender |
| House Cleaning | Teal (#0F766E) or sky blue (#0369A1) | Yellow-green (#65A30D) | Dark/heavy palettes, Red |
| Painting | Bold primary of contractor's choice | Warm accent | Gray-only (ironic), Neon |
| Pest Control | Forest green (#166534) or brown (#78350F) | Orange (#EA580C) | Bright pink, Lavender, Cyan |
| General Contractor | Navy (#1E3A5F) or charcoal (#1E293B) | Bold orange (#EA580C) | Pastels, Purple, Neon |

### Industry Color Psychology (niche = 'custom')

When `siteConfig.niche === 'custom'`, use the industry's `designStyle` to guide color validation:

| Industry Type | Recommended Palette Direction | CTA Accent | Avoid |
|---|---|---|---|
| Professional Service (B2B) | Deep navy, dark gray, forest green — authority colors | Muted blue or green accent. Avoid "urgent" oranges. | Bright/playful colors, neon, pastels |
| Agency / Creative | Bolder primaries permitted — the brand IS the statement | Strong contrast accent for portfolio CTAs | Generic blues (too corporate for agencies) |
| Restaurant / Hospitality | Warm tones — deep reds, rich browns, olive greens | Warm gold or amber for reservation CTAs | Cold blues, clinical whites |
| Healthcare / Medical | Clean blues, soft greens, white-dominant | Calming green or soft blue CTAs | Red (anxiety), black-heavy (clinical), bright yellows |
| Nonprofit | Mission-aligned — earth tones, community greens, warm blues | Warm orange or green for donation CTAs | Corporate navy (reads as for-profit), neon |
| E-commerce / Retail | Brand-driven — wider palette acceptable | High-contrast CTA for purchase actions | Low-contrast accents that hide the buy button |

**Trust color universals (all industries):** Blues and greens signal trust, safety, and reliability — appropriate for any industry. Oranges signal urgency and action — ideal for CTAs. Reds signal emergency — use only for emergency-service badges, not primary brand color.

---

## Typography Rules

### Banned Fonts (Never Use)

| Font | Why Banned |
|---|---|
| Inter | Overused default. Zero brand differentiation. Reads as "we didn't think about fonts" |
| Roboto | Android system font. Generic to the point of invisibility |
| Arial / Helvetica | Operating system defaults. No character, no authority |
| Space Grotesk | Distinctly startup/tech aesthetic. Wrong for trades |
| Montserrat | Severely overused. Now associated with MLM/coaching brands |
| Nunito | Rounds off authority. Too playful for service businesses |
| Raleway | Thin weight trend that kills mobile readability |

### Type Scale

Use a **Major Third (1.25×)** modular scale from a base of 16px:

```
xs:   12px  (0.75rem)  — Legal, captions
sm:   14px  (0.875rem) — Secondary labels, fine print
base: 16px  (1rem)     — Body text
lg:   20px  (1.25rem)  — Large body, card intros
xl:   25px  (1.563rem) — H4, section subheadings
2xl:  31px  (1.953rem) — H3
3xl:  39px  (2.441rem) — H2
4xl:  49px  (3.052rem) — H1 desktop
5xl:  61px  (3.815rem) — Hero headline desktop
```

### Fluid Typography

Apply `clamp()` for fluid scaling between mobile and desktop. Pattern:

```css
.heading-hero {
  font-size: clamp(2rem, 5vw + 1rem, 3.815rem);
}
.heading-h1 {
  font-size: clamp(1.75rem, 4vw + 0.75rem, 3.052rem);
}
```

### Typography Constraints
- Maximum 2 font families (heading + body)
- Line height: 1.5 for body, 1.15-1.25 for headings
- Body text: 16px minimum, 18px preferred
- Line length: 60-75 characters for body paragraphs (45ch-65ch container)
- Font weights in use: 400 (body), 600 (emphasis), 700 (heading/subheading)
- All type must pass WCAG AA contrast on its background

---

## 8pt Grid Spacing System

All spacing values are multiples of 8px. This creates visual rhythm and makes layout predictable.

```
4px  → 0.25rem  (spacing-1)   — Icon gaps, fine-tune nudges
8px  → 0.5rem   (spacing-2)   — Tight internal padding (badge pills)
16px → 1rem     (spacing-4)   — Standard internal padding
24px → 1.5rem   (spacing-6)   — Card padding
32px → 2rem     (spacing-8)   — Section internal breathing room
48px → 3rem     (spacing-12)  — Between content blocks within a section
64px → 4rem     (spacing-16)  — Section vertical padding (mobile)
96px → 6rem     (spacing-24)  — Section vertical padding (desktop)
128px → 8rem    (spacing-32)  — Major section separators
```

Tailwind's default 4px-base spacing mostly aligns, but verify custom component spacing stays on the 8pt grid. The only exception: 4px (half-grid) for fine icon alignment.

---

## Responsive Architecture

### Breakpoint Strategy (Mobile-First)

```
Default (no prefix): 0px+   — Mobile phones (375px is design target)
sm: 640px+                  — Large phones / small tablets
md: 768px+                  — Tablets / iPad portrait
lg: 1024px+                 — iPad landscape / small laptops
xl: 1280px+                 — Desktop (1280px is design target)
2xl: 1536px+                — Large desktop (use sparingly)
```

Always write mobile styles first. Larger breakpoints override, never set "desktop styles and undo for mobile."

### Container Widths

```
Mobile:  100% with 16px horizontal padding
sm:      100% with 24px horizontal padding
md:      100% with 32px horizontal padding
lg:      960px max-width, centered
xl:      1200px max-width, centered
```

See `references/responsive-patterns.md` for complete patterns including fluid containers and content-width utilities.

---

## Quality Checkpoints

Complete every item before Pack 2 handoff:

**Color System**
- [ ] All three color scales generated (primary, accent, neutral) with 10 stops each
- [ ] Every color passes WCAG AA contrast on its intended background
- [ ] CTA button (accent) achieves ≥ 4.5:1 on white text
- [ ] No pure black or pure white values in token definitions
- [ ] 60-30-10 allocation documented in token comments

**Typography**
- [ ] Both fonts confirmed available on Google Fonts
- [ ] No banned fonts present in any config file
- [ ] Font loading implemented with `next/font/google` and CSS variables
- [ ] Type scale covers all heading levels (h1-h4) and body sizes
- [ ] `display: 'swap'` set on both font definitions

**Token System**
- [ ] All three token layers present in `tokens.css`
- [ ] No hardcoded hex values in `tailwind.config.ts` (all reference CSS variables)
- [ ] Component tokens defined for: buttons, cards, nav, forms, badges
- [ ] Dark mode token stubs present (even if not implemented yet)

**Motion & Accessibility**
- [ ] `prefers-reduced-motion` block present in `globals.css`
- [ ] All keyframe animations have reduced-motion override
- [ ] No layout-affecting animations (width, height, margin, padding)
- [ ] Hero section has zero animation applied

**Responsive**
- [ ] Mobile-first approach confirmed in all utility patterns
- [ ] Container widths correct at 375px, 768px, and 1280px (verify with Playwright)
- [ ] Touch targets minimum 48px (set in globals.css)

**Plugin Override Confirmation**
- [ ] No purple, lavender, or violet hues in any color scale
- [ ] No Space Grotesk, Inter, or Roboto in any config
- [ ] Font families match `siteConfig.branding.fonts` exactly

---

## Anti-Patterns

Never do these in Pack 2:

1. **Never hardcode hex values in `tailwind.config.ts`** — Colors must reference CSS variables. Hardcoded values break theming and make future rebrand work 10× harder.

2. **Never invent fonts not in `siteConfig.branding`** — If fonts are missing from site.config.ts, pause and report rather than selecting defaults. The wrong font ships to production.

3. **Never skip the contrast validation step** — Client-provided brand colors frequently fail WCAG AA. Don't assume they pass. Check before using them.

4. **Never apply CSS animations to the hero/LCP element** — Any animation on the largest contentful paint element tanks Core Web Vitals LCP scores. Hero must be static.

5. **Never use `@font-face` with self-hosted fonts unless explicitly instructed** — Use `next/font/google` only. Self-hosted fonts require proper subsetting, caching headers, and GDPR consideration that's outside Pack 2 scope.

6. **Never leave placeholder tokens** — Every `/* FROM: siteConfig... */` comment in the template must be replaced with actual values. Placeholders that ship to production cause silent style failures.

7. **Never create a single-color palette** — Contractor sites need clear CTA contrast. A monochromatic "elegant" palette with no accent reads as a design portfolio, not a service business. Verify both primary and accent colors are visually distinct.

---

## Handoff: What Pack 3 Needs

Pack 3 (Site Architecture) requires these to be complete and committed before it starts:

| Requirement | File | Validation |
|---|---|---|
| Color CSS variables defined | `src/styles/tokens.css` | All `--color-*` tokens present |
| Font CSS variables defined | `src/styles/tokens.css` | `--font-heading` and `--font-body` set |
| Tailwind config extended | `tailwind.config.ts` | `brand-primary`, `brand-accent`, `brand-neutral` in theme |
| Globals loaded | `src/styles/globals.css` | Imported in `layout.tsx` |
| Fonts loaded | `src/app/layout.tsx` | Both `next/font` variables applied to `<html>` |
| Spacing scale documented | `tailwind.config.ts` | 8pt grid values in custom spacing |
| Motion utilities ready | `src/styles/globals.css` | `.animate-fade-in` and reduced-motion block present |

Pack 3 will use these tokens to build layouts — if any are missing, it will fall back to Tailwind defaults and the design system coherence breaks.

---

## Reference Files

| File | When to Consult |
|---|---|
| `references/color-generation.md` | Steps 2-3: Generating scales and checking contrast |
| `references/font-pairings.md` | Step 4: Selecting or validating font pairing |
| `references/tailwind-config-spec.md` | Step 6: Building `tailwind.config.ts` |
| `references/motion-patterns.md` | Step 6: Setting up animation utilities |
| `references/responsive-patterns.md` | Step 6: Setting container and grid patterns |
| `references/token-system.md` | Step 5: Building the three-layer token architecture |
| `templates/tailwind.config.template.ts` | Step 6: Base for generated `tailwind.config.ts` |
| `templates/tokens.template.css` | Step 6: Base for generated `tokens.css` |
| `templates/globals.template.css` | Step 6: Base for generated `globals.css` |
