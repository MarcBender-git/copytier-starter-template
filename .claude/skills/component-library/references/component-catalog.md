# Component Catalog — Prop Interfaces & Usage Examples

Complete reference for every component in the Pack 4 library.
Each entry: TypeScript interface, default values, usage example.

---

## Foundation Components (`src/components/ui/`)

### Button

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'emergency' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  href?: string          // Renders as <a> if provided
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
  children: React.ReactNode
}
// Defaults: variant='primary', size='md', type='button'
```

Usage:
```tsx
<Button variant="primary" size="lg">Get a Free Estimate</Button>
<Button variant="emergency" href="tel:+15551234567" leftIcon={<PhoneIcon />}>
  Call Now — 24/7
</Button>
<Button variant="outline" isLoading loadingText="Sending...">Submit</Button>
```

Variant styles map directly to token variables:
- `primary` → `var(--btn-primary-bg)`, `var(--btn-primary-text)`
- `secondary` → `var(--btn-secondary-bg)`, `var(--btn-secondary-text)`
- `emergency` → `var(--btn-emergency-bg)` (accent/orange)
- `outline` → transparent bg, `var(--btn-outline-border)`
- `ghost` → transparent bg, no border, hover bg on hover

---

### Input

```typescript
interface InputProps {
  id: string
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'number' | 'password'
  placeholder?: string
  helperText?: string
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  autoComplete?: string
  className?: string
}
```

Usage:
```tsx
<Input
  id="phone"
  name="phone"
  label="Phone Number"
  type="tel"
  required
  autoComplete="tel"
  errorMessage={errors.phone}
  helperText="We'll call you within 1 hour"
/>
```

Always renders `<label htmlFor={id}>` + `<input id={id}>` together.
Error message renders in `<p id={`${id}-error`} role="alert">`.
Input gets `aria-describedby={`${id}-error`}` and `aria-invalid="true"` when error exists.

---

### Select

```typescript
interface SelectProps {
  id: string
  name: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string   // "Select a service..."
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
```

Usage:
```tsx
<Select
  id="service"
  name="service"
  label="Service Needed"
  placeholder="Select a service..."
  options={siteConfig.services.map(s => ({ value: s.slug, label: s.name }))}
  required
  errorMessage={errors.service}
/>
```

---

### Textarea

```typescript
interface TextareaProps {
  id: string
  name: string
  label: string
  rows?: number          // default: 4
  placeholder?: string
  helperText?: string
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  maxLength?: number
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
```

---

### Checkbox

```typescript
interface CheckboxProps {
  id: string
  name: string
  label: string | React.ReactNode
  checked?: boolean
  disabled?: boolean
  errorMessage?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
```

---

### Badge

```typescript
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline'
  size?: 'sm' | 'md'
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}
```

Usage:
```tsx
<Badge variant="success" icon={<CheckIcon />}>Licensed & Insured</Badge>
<Badge variant="outline">HVAC</Badge>
```

---

## Layout Components (`src/components/ui/`)

### Card

```typescript
interface CardProps {
  href?: string            // If set, entire card is clickable link
  image?: { src: string; alt: string }
  imagePosition?: 'top' | 'left'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean          // Adds lift/border effect on hover
  className?: string
  children: React.ReactNode
}
```

If `href` is provided, wraps content in `<a>` with proper focus styles.
Never wraps in `<div onClick>`.

---

### Accordion

```typescript
interface AccordionItem {
  id: string
  question: string
  answer: string | React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean    // default: false (one open at a time)
  defaultOpenId?: string
  className?: string
}
```

Keyboard navigation:
- `Enter`/`Space` on trigger: toggle panel
- `ArrowDown`: focus next trigger
- `ArrowUp`: focus previous trigger
- `Home`: focus first trigger
- `End`: focus last trigger

Each trigger: `<button aria-expanded={isOpen} aria-controls={`panel-${id}`}>`
Each panel: `<div id={`panel-${id}`} role="region" aria-labelledby={`trigger-${id}`}>`

---

### Modal

```typescript
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  size?: 'sm' | 'md' | 'lg' | 'full'
  closeOnBackdrop?: boolean   // default: true
  children: React.ReactNode
}
```

Implementation requirements:
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby={titleId}`
- Focus trap: on open, focus first focusable element inside
- Escape key closes modal
- On close, return focus to trigger element (pass `triggerRef` as prop)
- Renders via React Portal to `document.body`
- Scroll lock on `<body>` while open

---

### Tooltip

```typescript
interface TooltipProps {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  children: React.ReactElement   // Must be a focusable element
}
```

Usage:
```tsx
<Tooltip content="Call us 24/7 for emergencies">
  <button aria-describedby="tooltip-123">...</button>
</Tooltip>
```

Shows on hover AND focus. Hidden with `aria-hidden="true"` when not visible.
Trigger element gets `aria-describedby` pointing to tooltip id.

---

## Section Components (`src/components/sections/`)

### HeroSection

```typescript
interface HeroSectionProps {
  // All props optional — reads from siteConfig by default
  headline?: string
  subheadline?: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  backgroundImage?: string
  showTrustBar?: boolean    // default: true
}
```

Notes:
- H1 is always the headline (only H1 on page — enforced by this component)
- Background image: never lazy-load (it's the LCP element). Use `fetchPriority="high"`.
- `loading="eager"` on the hero image, `loading="lazy"` on all others

---

### PageHeroSection

```typescript
interface PageHeroSectionProps {
  headline: string             // Becomes the H1
  subheadline?: string
  breadcrumbs: { label: string; href: string }[]
  backgroundVariant?: 'light' | 'dark' | 'brand'
}
```

---

### ServicesGridSection

```typescript
interface ServicesGridSectionProps {
  headline?: string
  subtext?: string
  services?: ServiceConfig[]   // defaults to siteConfig.services
  columns?: 2 | 3 | 4          // auto-selected based on service count if omitted
  showViewAll?: boolean         // Link to /services listing
}
```

---

### TestimonialsSection

```typescript
interface TestimonialsSectionProps {
  headline?: string
  limit?: number               // default: all
  variant?: 'grid' | 'carousel' | 'list'
  filterByService?: string     // Show only reviews mentioning this service
  showSchema?: boolean         // Emit Review schema — default: true
}
```

---

### CTASection

```typescript
interface CTASectionProps {
  headline?: string
  subtext?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string      // optional second CTA
  secondaryHref?: string
  showEmergency?: boolean      // default: true — shows emergency phone link
  variant?: 'default' | 'brand' | 'dark'
}
```

---

### FAQSection

```typescript
interface FAQSectionProps {
  headline?: string
  faqs?: { question: string; answer: string }[]  // defaults to siteConfig.faq
  limit?: number
  showSchema?: boolean    // Emit FAQPage JSON-LD — default: true
  serviceSlug?: string    // Filter FAQs for a specific service
}
```

---

### ProcessSection

```typescript
interface ProcessSectionProps {
  headline?: string
  steps?: { title: string; description: string; icon?: React.ReactNode }[]
  layout?: 'horizontal' | 'vertical'   // default: horizontal on desktop
}
```

---

### TrustBarSection

```typescript
interface TrustBarSectionProps {
  items?: string[]   // defaults to generated trust items from siteConfig
  variant?: 'light' | 'dark' | 'transparent'
  showDividers?: boolean    // default: true
}
// Auto-generated from siteConfig:
// "★ 4.9 on Google", "Licensed & Insured", "X+ Years Experience", "Family Owned"
```

---

### ServiceAreaSection

```typescript
interface ServiceAreaSectionProps {
  headline?: string
  variant?: 'grid' | 'badges' | 'map-placeholder'
  areas?: ServiceAreaConfig[]   // defaults to siteConfig.serviceAreas
  primaryCity?: string          // Highlighted differently
}
```

---

### RelatedServicesSection

```typescript
interface RelatedServicesSectionProps {
  currentSlug: string        // Excluded from the list
  limit?: number             // default: 3
  headline?: string
}
```
