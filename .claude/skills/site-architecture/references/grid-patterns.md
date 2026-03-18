# Grid Patterns for Contractor Websites

## Layout Philosophy

Contractor sites use **proven, predictable grid patterns** — not experimental layouts. Every visitor has seen these patterns before and knows how to navigate them. Predictability = trust. The goal is effortless scanning, not visual novelty.

---

## Container System

The container is always centered with responsive horizontal padding. Never break out of the container without an explicit full-bleed background design decision.

```tsx
// Standard section wrapper — use this pattern for every section
<section className="section-padding bg-white">
  <div className="container">
    {/* content */}
  </div>
</section>

// Full-bleed colored background, constrained content
<section className="section-padding bg-brand-primary-800">
  <div className="container">
    {/* content — text will be white */}
  </div>
</section>
```

**Container max-widths** (defined in tailwind.config.ts by Pack 2):
```
Mobile default:  100% - 32px (16px padding each side)
sm (640px+):     100% - 48px
md (768px+):     100% - 64px
lg (1024px+):    960px max-width
xl (1280px+):    1200px max-width
```

**Never nest containers.** One `.container` per section, always a direct child of `<section>`.

---

## Section Header Pattern

Almost every section uses this standard header block. It is not a component — it is an inline pattern:

```tsx
// Standard section header — reuse this exact structure
<div className="text-center mb-12 lg:mb-16">
  <p className="text-overline mb-3">
    {overlineText}  {/* e.g., "OUR SERVICES", "WHY CHOOSE US" */}
  </p>
  <h2 className="font-heading font-bold text-fluid-h2 text-brand-neutral-900 mb-4">
    {sectionHeading}
  </h2>
  {sectionSubtext && (
    <p className="text-intro mx-auto">
      {sectionSubtext}
    </p>
  )}
</div>
```

Center-aligned on all pages. Left-aligned only in 2-column split sections.

---

## Grid Patterns by Section Type

### 1. Services Grid

Used on: homepage `<ServicesGridSection>`, service area pages

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {services.map(service => (
    <ServiceCard key={service.slug} service={service} />
  ))}
</div>
```

If there are exactly 4 services: `lg:grid-cols-4`
If there are 5-6 services: `lg:grid-cols-3` (no orphaned single card)
If there are 7+ services: `lg:grid-cols-3` with a "View All Services" link

### 2. Testimonials Grid

Used on: homepage `<TestimonialsSection>`, service pages, about page

```tsx
{/* 3-column — most common */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {testimonials.map(t => <TestimonialCard key={t.id} {...t} />)}
</div>

{/* 2-column — for 2 testimonials or condensed layout */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
  {testimonials.map(t => <TestimonialCard key={t.id} {...t} />)}
</div>
```

### 3. Trust Stats Bar

Used on: homepage below hero, contact page

```tsx
{/* 4 stats horizontal */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
  {stats.map(stat => <StatBlock key={stat.label} {...stat} />)}
</div>
```

### 4. Why Choose Us / Benefits

Used on: homepage `<WhyChooseUsSection>`, service pages

```tsx
{/* 3-column icons + text */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {benefits.map(b => <BenefitCard key={b.title} {...b} />)}
</div>
```

### 5. Process Steps

Used on: homepage `<ProcessSection>`, service pages

```tsx
{/* Horizontal flow on desktop, vertical on mobile */}
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 relative">
  {/* Connecting line between steps — decorative, aria-hidden */}
  <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px bg-brand-primary-200 aria-hidden" />
  {steps.map((step, i) => <ProcessStep key={step.step} {...step} />)}
</div>
```

### 6. Two-Column: Content + Image

Used on: `<ServiceOverviewSection>`, `<AboutStorySection>`

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
  <div className="order-2 lg:order-1">
    {/* Text content */}
  </div>
  <div className="order-1 lg:order-2">
    {/* Image */}
  </div>
</div>

{/* Alternate: image left on next section for visual variety */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
  <div>
    {/* Image — left by default */}
  </div>
  <div>
    {/* Text content — right */}
  </div>
</div>
```

### 7. Two-Column: Content + Sidebar (Contact Page)

Used on: contact page `<ContactInfoSection>`

```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
  <div className="lg:col-span-7">
    {/* Contact form — takes 7 of 12 columns */}
  </div>
  <div className="lg:col-span-5">
    {/* Contact info, hours, map — takes 5 of 12 columns */}
  </div>
</div>
```

### 8. Service Area Badge Grid

Used on: homepage `<ServiceAreaSection>`, service area pages `<NearbyAreasSection>`

```tsx
<div className="flex flex-wrap gap-3 justify-center">
  {areas.map(area => (
    <a
      key={area.slug}
      href={`/service-areas/${area.slug}`}
      className="badge-primary hover:bg-brand-primary-200 transition-colors duration-200"
    >
      {area.city}
    </a>
  ))}
</div>
```

### 9. Credentials / Certifications

Used on: about page `<CredentialsSection>`, footer

```tsx
<div className="flex flex-wrap gap-6 justify-center items-center">
  {credentials.map(cred => (
    <div key={cred.name} className="flex items-center gap-3">
      {/* logo or badge image */}
      <span className="text-sm font-medium">{cred.name}</span>
    </div>
  ))}
</div>
```

---

## Section Alternating Backgrounds

On the homepage and long service pages, alternate section backgrounds to create visual rhythm:

```
Section 1 (Hero):          full-bleed image or brand dark
Section 2 (Trust Bar):     brand-primary-50 (very light tint)
Section 3 (Services):      white
Section 4 (Why Choose Us): neutral-50 (alt background)
Section 5 (Testimonials):  white
Section 6 (Process):       brand-primary-800 (dark brand)
Section 7 (Service Areas): white
Section 8 (FAQ):           neutral-50 (alt background)
Section 9 (Final CTA):     accent (orange) or brand dark
```

Never two consecutive sections with the same background unless one contains very different content density.

---

## Spacing Rules

```
Section vertical padding mobile:   py-16 (64px)
Section vertical padding desktop:  lg:py-24 (96px)
Section header bottom margin:      mb-12 lg:mb-16
Card gap:                          gap-6 lg:gap-8
Content column gap:                gap-12 lg:gap-16
```

Maintain this rhythm consistently — it creates the visual "breathing room" that reads as professional.
