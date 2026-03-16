---
paths:
  - "src/components/forms/**"
  - "src/app/**/page.tsx"
---

# Privacy & Security Rules

## Cookie Consent (CCPA Required)
- Cookie consent banner MUST load BEFORE any analytics scripts fire
- Two options: "Accept All" / "Reject Non-Essential" — no dark patterns, no pre-checked boxes
- Store preference in a first-party cookie (`copytier_consent`)
- GA4 and all tracking scripts wait for explicit consent before initializing
- Required because contractors serve California residents — CCPA compliance is mandatory

## Privacy Policy Page
- Included in the starter template at `/privacy`
- Placeholders for: business name, contact info, last updated date
- Covers:
  - What data is collected (form fields: name, email, phone, message)
  - How it's used (lead follow-up by the contractor)
  - Who stores it (Supabase — include region/hosting info)
  - Retention period (configurable, default 2 years)
  - CCPA rights: right to know, right to delete, right to opt-out of sale
- Link to privacy policy in the footer of every page

## Contact Form Anti-Spam
- **DEFAULT**: Honeypot field — a hidden input (`<input tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px">`) that bots fill but humans can't see. Reject submissions where honeypot has a value.
- **OPTIONAL**: reCAPTCHA v3 (invisible, score-based) enabled via `siteConfig.features.recaptcha` flag
- **NEVER** use CAPTCHA puzzles (image grids, text challenges) — they destroy mobile conversion rates

## Input Validation
- Client-side: required fields, email format regex, phone format (10 digits), message min length
- Server-side: validate ALL fields again in Server Actions — never trust client-only validation
- Sanitize all inputs before database insertion — strip HTML tags, trim whitespace
- Rate limit form submissions: max 3 per IP per 5 minutes via Supabase Edge Function

## Authentication
- No user authentication in the starter template — contractor sites are public-facing only
- Admin access is through Supabase Dashboard directly
- If a client needs a portal later, add it as a separate authenticated route group `(admin)/`

## Environment & Secrets
- NEVER commit `.env`, `.env.local`, or any file containing API keys
- `.gitignore` must include: `.env*`, `node_modules/`, `.next/`, `.vercel/`
- Use `vercel env add` to store Supabase keys in Vercel — never hardcode in source
- Supabase anon key is safe to expose (it's public by design) — service role key is NOT
