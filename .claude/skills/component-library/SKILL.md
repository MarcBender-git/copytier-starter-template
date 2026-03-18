---
name: component-library
description: >
  Use when building or modifying UI components, form elements, interactive elements,
  or accessibility features for contractor websites. This covers buttons, inputs, cards,
  accordions, modals, testimonial blocks, skeleton loaders, empty states, error states,
  and the complete ContactForm/BookingForm system. Accessibility (WCAG 2.2 AA) is built
  INTO every component, not bolted on after. Runs after Pack 3 (site-architecture) has
  produced page templates. Reads Pack 2 tokens, Pack 3 section shells, and siteConfig.
---

# Pack 4: Component Library & Interaction Layer

## 1. Overview

Pack 4 fills the section shells that Pack 3's page templates declared. Every import
(`HeroSection`, `ContactForm`, `TestimonialCard`, etc.) in those templates is built here.

**What this skill produces:**
- Foundation components (Button, Input, Select, Textarea, Checkbox, Label)
- Layout components (Card, Accordion, Modal, Drawer, Tooltip)
- Section components (all Hero variants, ServicesGrid, TrustBar, TestimonialsCarousel,
  ProcessSteps, FAQAccordion, CTABanner, ServiceAreaBadges)
- Form system (ContactForm with Server Action, validation, honeypot, all states)
- State components (Skeleton loaders, Empty states, Error boundaries)

**The accessibility-first principle:**
Accessibility is not a separate pass after components are built. Every component is written
accessible from line one — semantic HTML, ARIA roles, keyboard navigation, focus management,
contrast compliance — because retrofitting accessibility to finished components costs 3× as
much time and invariably misses edge cases.

## 2. The Unifying Principle

Every component in this library satisfies four invariants:

**Token-driven:** All colors, spacing, radii, shadows, transitions reference CSS custom
properties from `tokens.css`. Zero hardcoded hex values. A rebrand requires only changing
`tokens.css` — components update automatically.

**State-complete:** Every interactive component handles all states: default, hover, focus,
active, disabled, loading, error, success. Designing only the "happy path" default state
is the most common component bug in contractor site builds.

**Accessible by default:** Semantic HTML, ARIA labels, keyboard navigation, focus management,
contrast ratios, touch targets — all satisfied without the consumer needing to add anything.

**Props-driven with siteConfig defaults:** Components accept props for flexibility but fall
back gracefully to siteConfig values. A `<CtaSection />` with no props still works correctly
because it reads `siteConfig.contact.phone` and `siteConfig.primaryCta` internally.

## 3. Component Build Workflow

### Step 1 — Read Pack 3's Section Shells
Open every file in `.claude/skills/site-architecture/templates/`. Each section component
import is a component this pack must build. Map them:
- `homepage.template.tsx` → `HeroSection`, `TrustBarSection`, `ServicesGridSection`, etc.
- `service-page.template.tsx` → `PageHeroSection`, `ServiceBenefitsSection`, etc.
- `contact-page.template.tsx` → `ContactFormSection`, `ContactHeroSection`, etc.
Build the complete component list before writing any code.

### Step 2 — Foundation Components
Build in this order (each depends on the previous):
1. `Button` — all variants (primary, secondary, emergency, outline, ghost), all sizes, all states
2. `Input`, `Select`, `Textarea` — form primitives with label, error message, helper text
3. `Checkbox`, `RadioGroup` — selection inputs with custom styling
4. `Label` — associated with form fields via `htmlFor`/`id`
5. `Badge` — inline status/category labels

Location: `src/components/ui/` (these are the shadcn/ui layer)

### Step 3 — Layout Components
Build in this order:
1. `Card` — container with optional header, footer, image slot
2. `Accordion` — FAQ expandable, keyboard nav (Up/Down arrow keys between items)
3. `Modal` — focus trap, Escape to close, `aria-modal`, backdrop click to close
4. `Drawer` — mobile slide-in panel (used for mobile nav)
5. `Tooltip` — hover/focus triggered, `role="tooltip"`, positioned with CSS

Location: `src/components/ui/`

### Step 4 — Section Components
Fill every shell from Pack 3's templates. Build in page order:
**Homepage sections:** HeroSection → TrustBarSection → ServicesGridSection →
WhyChooseUsSection → ProcessSection → TestimonialsSection → ServiceAreaSection →
FAQSection → CTASection

**Service page sections:** PageHeroSection → ServiceOverviewSection →
ServiceBenefitsSection → ProcessSection (reuse) → TestimonialsSection (reuse) →
FAQSection (reuse) → RelatedServicesSection → CTASection (reuse)

**Shared sections:** Reuse across pages — never duplicate a section component.

Location: `src/components/sections/`

### Step 5 — ContactForm System
The highest-stakes component on the site. Missed leads = lost revenue.
See Section 5 for full specification.

Location: `src/components/forms/ContactForm.tsx`
Server Action: `src/app/actions/contact.ts`

### Step 6 — State Components
Build after all interactive components are done:
1. `Skeleton` — loading placeholder matching the shape of each card type
2. `EmptyState` — when no data exists (e.g., no reviews yet)
3. `ErrorBoundary` — React error boundary wrapper for section-level failures
4. `Toast` — success/error notification (for form submission feedback)

Location: `src/components/ui/`

### Step 7 — Verify Accessibility
Run the a11y subagent: `a11y-checker`
Manually verify keyboard flow:
1. Tab through the page — every interactive element must receive focus
2. Activate every button with Enter and Space
3. Open/close modals with Escape
4. Complete the contact form using keyboard only
5. Test with VoiceOver (macOS) on the contact form and navigation

## 4. The Complete Component Catalog

| Component | Category | States | A11y Requirements |
|---|---|---|---|
| Button | Foundation | default, hover, focus, active, disabled, loading | `type` attr, `aria-disabled`, `aria-busy` |
| Input | Foundation | default, focus, filled, error, disabled | `id`+`htmlFor`, `aria-describedby`, `aria-invalid` |
| Select | Foundation | default, open, selected, error, disabled | `id`+`htmlFor`, keyboard navigation |
| Textarea | Foundation | default, focus, filled, error, disabled | `id`+`htmlFor`, `aria-describedby` |
| Checkbox | Foundation | unchecked, checked, indeterminate, disabled | `id`+`htmlFor`, visible focus ring |
| RadioGroup | Foundation | unselected, selected, disabled | `role="radiogroup"`, `aria-labelledby` |
| Label | Foundation | default, required, error | `htmlFor` matches input `id` |
| Badge | Foundation | default, success, warning, error, info | Decorative or `aria-label` |
| Card | Layout | default, hover (if clickable) | If clickable: `role="link"` or wrapping `<a>` |
| Accordion | Layout | collapsed, expanded, disabled | `aria-expanded`, `aria-controls`, Up/Down arrow |
| Modal | Layout | closed, open, loading | `role="dialog"`, `aria-modal`, focus trap |
| Drawer | Layout | closed, open | `role="dialog"`, `aria-modal`, focus trap |
| Tooltip | Layout | hidden, visible | `role="tooltip"`, `aria-describedby` on trigger |
| HeroSection | Section | default, with background image | H1 landmark, `role="banner"` on header |
| PageHeroSection | Section | default | H1, breadcrumb nav |
| TrustBarSection | Section | default | `<ul>` for trust items |
| ServicesGridSection | Section | default, loading | `<ul>` grid, each card is `<li>` |
| WhyChooseUsSection | Section | default | Feature list with `<ul>` |
| ProcessSection | Section | default | Ordered `<ol>` for steps |
| TestimonialsSection | Section | default, carousel | `<blockquote>`, `<cite>`, `aria-live` on carousel |
| ServiceAreaSection | Section | default | Area list as `<ul>` |
| FAQSection | Section | collapsed, expanded | `role="region"`, accordion a11y |
| CTASection | Section | default, brand | CTA button prominence |
| ContactFormSection | Form | idle, active, loading, success, error | Form landmark, `aria-live` status |
| ServiceBenefitsSection | Section | default | `<ul>` with checkmark bullets |
| RelatedServicesSection | Section | default | Card grid with links |
| CredentialsSection | Section | default | Badge/logo list |
| AboutHeroSection | Section | default | H1, team photo alt text |
| AboutStorySection | Section | default | Readable prose |
| TeamSection | Section | default | Team card grid |
| SkeletonCard | State | loading | `aria-busy="true"`, `aria-label="Loading..."` |
| EmptyState | State | no-data | Descriptive message + action |
| ErrorBoundary | State | error | Fallback UI with retry option |
| Toast | State | success, error, info | `role="status"` or `role="alert"`, `aria-live` |

## 5. Form System Specification

### Field Configuration
ContactForm reads its fields from `siteConfig.contact.formFields[]`. Each field entry:
```typescript
{ name: string; label: string; type: 'text'|'email'|'tel'|'select'|'textarea'; required: boolean; options?: string[] }
```
Standard fields: name, phone, email, service (select from siteConfig.services[]), message.

### Validation Strategy
- **Client-side:** Inline validation on blur. Error messages appear below each field.
  Validates: required, email format, phone format (10 digits, US), message min length.
- **Server-side:** Server Action re-validates all fields. Never trust client-only validation.
  Returns typed `FormState` with field-level errors.

### Honeypot Anti-Spam
```html
<input type="text" name="website" tabIndex={-1} aria-hidden="true"
       autoComplete="off" className="sr-only" />
```
Hidden from users (sr-only + tabIndex=-1). Bots fill it. Server Action checks:
if `formData.get('website') !== ''` → silently succeed (don't reveal detection).

### Form States
- **Idle:** Standard form with all fields enabled
- **Loading:** All inputs disabled, button shows "Sending..." with spinner, `aria-busy="true"`
- **Success:** Form hidden, green confirmation panel with:
  - "Thank you, [name]! We received your message."
  - Response time promise from `siteConfig.contact.responseTime`
  - Phone number as fallback: "Need immediate help? Call [phone]"
  - `role="alert"` so screen readers announce the success
- **Error:** Form re-enabled, red error banner above submit button with:
  - "Something went wrong. Please try again or call us at [phone]"
  - `role="alert"` for screen reader announcement

### Analytics Events (GA4)
```typescript
// On first input focus (form_start)
gtag('event', 'form_start', { form_name: 'contact' })

// On successful submission (form_submit)
gtag('event', 'form_submit', {
  form_name: 'contact',
  service_requested: formData.service,
})
```
Fire these only if `typeof gtag !== 'undefined'` (GA4 may not have loaded yet).

## 6. Accessibility Requirements

### Semantic HTML (Non-Negotiable)
- `<button>` for all clickable actions — never `<div onClick>`
- `<a>` for navigation — never `<div onClick>` for links
- `<form>` with `<label>` + `<input>` pairs — never placeholder as label substitute
- `<nav>` for navigation, `<main>` for page content, `<footer>` for footer
- Heading hierarchy: one H1 per page, sequential H2→H3→H4 (no skipping)
- `<ul>`/`<ol>` for lists — never `<div>` stacks that visually look like lists

### ARIA Usage
- Add ARIA only when semantic HTML is insufficient
- `aria-label`: on icon-only buttons (`<button aria-label="Close dialog">`)
- `aria-describedby`: links input to its error message element
- `aria-invalid="true"`: on inputs with validation errors
- `aria-expanded`: on accordion triggers, dropdown triggers
- `aria-controls`: points to the panel being controlled
- `aria-live="polite"`: for non-urgent updates (form field errors)
- `aria-live="assertive"`: for urgent updates (form submission errors only)
- `aria-busy="true"`: on loading containers

### Keyboard Navigation
| Key | Behavior |
|---|---|
| Tab | Move to next focusable element |
| Shift+Tab | Move to previous focusable element |
| Enter | Activate button, submit form, follow link |
| Space | Activate button, toggle checkbox |
| Escape | Close modal, close dropdown, cancel |
| Arrow keys | Navigate accordion items, radio groups, carousel |
| Home/End | Jump to first/last item in a widget |

### Focus Management
- **Modals:** On open, move focus to modal container or first focusable element inside.
  Trap focus within modal while open. On close, return focus to the trigger element.
- **Accordions:** Focus stays on trigger. Panel content is reachable by Tab after expand.
- **Form errors:** After failed submission, move focus to first field with an error.
- **Page navigation:** After route change, move focus to `<main>` or H1.

### Contrast Ratios
- Normal text (< 18pt): 4.5:1 minimum against background
- Large text (≥ 18pt or 14pt bold): 3:1 minimum
- UI components (borders, icons): 3:1 against adjacent background
- Verify with: contrast.tools or browser DevTools accessibility panel

### Touch Targets
- All interactive elements: 48px × 48px minimum clickable area
- Use `min-h-[48px] min-w-[48px]` Tailwind classes on touch-sensitive elements
- If visual size is smaller, use padding or `::after` pseudo-element to expand hit area

## 7. Loading, Empty, and Error States

Every component that fetches or displays data must handle all three states.

### Loading States
Use Skeleton components that match the shape of the loaded content:
- `SkeletonCard` — mimics a service card or testimonial card
- `SkeletonText` — mimics a paragraph of text
- `SkeletonHero` — mimics the hero section during SSR hydration
Apply `animate-pulse` (Tailwind) for the shimmer effect.
Always set `aria-busy="true"` and `aria-label="Loading content"` on skeleton containers.

### Empty States
Shown when a section has no data (e.g., `siteConfig.testimonials` is empty):
- Clear message: "No reviews yet" (never just blank space)
- Action: "Be the first to review us on Google" with link
- Never render broken-looking grids with 0 or 1 items — use EmptyState instead

### Error States
Use `ErrorBoundary` to catch React rendering errors at the section level:
- Section-level errors show a contained fallback — not a full-page crash
- Fallback message: "This section couldn't load. [Refresh] or [Call us]"
- Log errors to console in development, to Vercel logs in production

## 8. Quality Checkpoints

Before marking Pack 4 complete:

**Component completeness:**
- [ ] Every section import from Pack 3 templates is implemented
- [ ] Every component handles all states (default, hover, focus, disabled, loading, error)
- [ ] No component renders undefined or null without an EmptyState fallback

**Accessibility:**
- [ ] Zero `<div onClick>` patterns — all replaced with `<button>`
- [ ] Every input has a visible, associated `<label>`
- [ ] Every icon-only button has `aria-label`
- [ ] All modals/drawers have focus trap implemented
- [ ] Color contrast passes 4.5:1 for all text
- [ ] Touch targets are ≥ 48px on all interactive elements

**Form system:**
- [ ] ContactForm submits without JavaScript (progressive enhancement)
- [ ] Honeypot field present and validated server-side
- [ ] All three form states (loading, success, error) tested
- [ ] GA4 events fire on form_start and form_submit

**TypeScript:**
- [ ] No `any` types
- [ ] All props typed with explicit interfaces
- [ ] Server Action returns typed `FormState`

**Token compliance:**
- [ ] No hardcoded hex values in components
- [ ] All colors reference `var(--color-*)` tokens or Tailwind classes that map to them

## 9. Anti-Patterns

**Never use `<div>` as a button.** If it's clickable, it's a `<button>`. No exceptions.
Divs are not keyboard accessible, not announced by screen readers, and not in the Tab order.

**Never use placeholder as a label.** `placeholder` disappears when the user types. It is
never a substitute for a visible `<label>`. Always render both.

**Never skip focus management in modals.** Opening a modal without moving focus into it means
keyboard users are left behind with focus on the trigger, unable to reach the modal content.

**Never use `autofocus` on page load.** It disorients users relying on screen readers by
jumping them to an unexpected location when the page opens.

**Never build one-state components.** A button with only a default style is incomplete.
Design hover, focus, active, disabled, and loading before shipping.

**Never hardcode phone numbers in components.** Every phone reference must read from
`siteConfig.contact.phone`. When a client changes their number, it updates everywhere.

**Never use GA4 events without a null check.** `gtag` may not be loaded yet, especially on
slow connections. Always guard with `if (typeof gtag !== 'undefined')`.

**Never render an empty grid.** A 3-column grid with 1 item looks broken. If fewer than
the minimum items exist, switch to centered layout or show the EmptyState component.

## 10. Handoff: What Pack 5 Needs

Pack 5 (Content & SEO) writes the actual copy that fills these components:

| Component | What Pack 5 Provides |
|---|---|
| HeroSection | H1 headline, subheadline, CTA button label |
| ServicesGridSection | Service card titles, descriptions (150–200 words each) |
| WhyChooseUsSection | 4–6 benefit headlines + supporting sentences |
| ProcessSection | 3–5 step titles + descriptions |
| TestimonialsSection | Full review text, reviewer name, city, star rating |
| FAQSection | 6–8 question/answer pairs per page |
| AboutStorySection | 2–4 paragraphs of founding story copy |
| CredentialsSection | License numbers, certifications, association names |
| ServiceAreaSection | City list with display names |
| CTASection | Headline, subtext, primary and secondary button labels |

Pack 5 also writes all `generateMetadata` titles and descriptions using the section
content it just produced — ensuring titles and meta descriptions accurately reflect
the on-page content (a requirement for Google's quality guidelines).

---

## Reference Files
| File | Contents |
|---|---|
| `references/component-catalog.md` | Full prop interfaces and usage examples for every component |
| `references/form-system.md` | ContactForm Server Action, validation schema, field config spec |
| `references/a11y-patterns.md` | Copy-paste ARIA patterns, focus trap implementation, keyboard handlers |
| `references/loading-error-states.md` | Skeleton patterns, ErrorBoundary implementation, Toast system |
| `references/component-architecture.md` | File structure, import conventions, shadcn/ui integration rules |
