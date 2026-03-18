# Color Generation Reference

## Algorithm: Generating a 10-Stop Scale from a Base Hex

Given a base hex color (e.g., `#1D4ED8`), generate stops: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900.

**Convention:** The provided base color maps to the **600 stop** (dark enough to pass contrast on white, light enough to remain vibrant). Adjust the target stop if the provided color is clearly very light (map to 400) or very dark (map to 800).

### Step-by-Step Process

**1. Convert hex to HSL**
```
#1D4ED8 → H: 221°, S: 75%, L: 48%
```

**2. Anchor the base color at its target stop (600)**
```
500 stop: +6% lightness  → L: 54%
400 stop: +12% lightness → L: 60%
300 stop: +22% lightness → L: 70%
200 stop: +34% lightness → L: 82%
100 stop: +44% lightness → L: 92%
 50 stop: +48% lightness → L: 96%

700 stop: -8% lightness  → L: 40%
800 stop: -18% lightness → L: 30%
900 stop: -28% lightness → L: 20%
```

**3. Saturation adjustments (prevent muddy mid-tones)**
- Stops 50-200: reduce saturation by 10-20% (pastels are desaturated)
- Stops 300-500: keep saturation near base
- Stops 600-900: keep or slightly increase saturation (deep tones stay vivid)

**4. Convert each adjusted HSL back to hex**

### Worked Example: Primary Blue (#1D4ED8)

| Stop | H | S | L | Hex |
|---|---|---|---|---|
| 50 | 221° | 55% | 96% | #EFF4FF |
| 100 | 221° | 65% | 92% | #DBEAFE |
| 200 | 221° | 70% | 82% | #BFDBFE |
| 300 | 221° | 73% | 70% | #93C5FD |
| 400 | 221° | 75% | 60% | #60A5FA |
| 500 | 221° | 75% | 54% | #3B82F6 |
| **600** | **221°** | **75%** | **48%** | **#1D4ED8** |
| 700 | 221° | 76% | 40% | #1D40AF |
| 800 | 221° | 78% | 30% | #1E3A8A |
| 900 | 221° | 80% | 20% | #1E3373 |

---

## The 60-30-10 Color Rule

Apply across every page layout:

| Proportion | Role | Examples |
|---|---|---|
| **60%** | Neutral backgrounds, white space, body text | White/off-white backgrounds, dark body copy, slate UI chrome |
| **30%** | Primary brand color | Headers, nav, section backgrounds (alternating), trust badges, link colors |
| **10%** | Accent color | CTA buttons ONLY, "Call Now" badge, emergency service highlight, phone number on mobile |

**Why this matters:** A common mistake is using the accent (orange/yellow) too broadly. When everything is orange, nothing is urgent. Reserve accent strictly for conversion actions.

---

## Contrast Checking Methodology

### Formula: WCAG Relative Luminance

```
Relative luminance L = 0.2126 × R + 0.7152 × G + 0.0722 × B
(where R, G, B are linearized: if c ≤ 0.04045 → c/12.92, else ((c+0.055)/1.055)^2.4)

Contrast ratio = (L1 + 0.05) / (L2 + 0.05)
where L1 is lighter, L2 is darker
```

### Minimum Requirements

| Use Case | Minimum Contrast | Standard |
|---|---|---|
| Body text on background | 4.5:1 | WCAG AA |
| Large text (≥18px bold or ≥24px) on background | 3:1 | WCAG AA |
| UI components and icons | 3:1 | WCAG AA |
| CTA button text on button background | 4.5:1 | WCAG AA |

### Quick Reference: Color on White Background

These primary blue tones pass 4.5:1 on white:
- 600 stop or darker typically passes for blues/greens/navies
- 500 stop: borderline — verify before using for text
- 400 stop and lighter: fails for text, acceptable for decorative elements

### Adjustment Protocol

If a provided brand color fails contrast:
1. Convert to HSL
2. Reduce lightness by 5% increments
3. Recheck contrast after each step
4. Stop when 4.5:1 is achieved
5. Document the adjustment with a comment in `tokens.css`:
   `/* Adjusted from #XXXXXX to meet WCAG AA — original was client-provided */`

---

## Niche Color Psychology Cross-Reference

See SKILL.md Section 4 for the full niche-to-palette table. Key principles:

- **Blues** — universal trust signal for home services. Safe default for any niche.
- **Greens** — natural, reliable, growth. Best for landscaping, cleaning, pest control.
- **Oranges** — urgency, action, warmth. Ideal as accent/CTA color for any niche.
- **Reds** — emergency, danger, stop. Use ONLY for "Emergency Service Available" badges.
- **Yellows** — energy, attention. Acceptable as accent for electrical trades only.
- **Purples** — luxury, tech, beauty. Actively wrong for trade contractors. Never primary.
- **Browns/earth tones** — natural, grounded. Good for pest control, landscaping.

---

## Neutral Scale Generation

The neutral scale is always derived from the primary color with near-zero saturation — this creates a "warm" or "cool" neutral that coordinates with the brand rather than clashing with a generic gray.

```
neutral-900 = hsl(H_primary, 15%, 12%)   — Near-black for headings
neutral-800 = hsl(H_primary, 12%, 22%)   — Dark body text
neutral-700 = hsl(H_primary, 10%, 35%)   — Secondary text
neutral-600 = hsl(H_primary, 8%,  45%)   — Muted text, captions
neutral-500 = hsl(H_primary, 6%,  55%)   — Placeholders
neutral-400 = hsl(H_primary, 5%,  65%)   — Disabled elements
neutral-300 = hsl(H_primary, 4%,  78%)   — Borders, dividers
neutral-200 = hsl(H_primary, 4%,  88%)   — Subtle backgrounds
neutral-100 = hsl(H_primary, 3%,  94%)   — Light backgrounds
neutral-50  = hsl(H_primary, 2%,  97%)   — Near-white page backgrounds
```

Use `slate` from Tailwind as fallback if the tinted neutral approach is not desirable.
