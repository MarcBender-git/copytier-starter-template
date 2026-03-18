# Navigation Accessibility Reference

## Why This Matters

Navigation failures are the #1 WCAG audit finding on contractor sites. The Header and mobile menu contain the most complex interactive patterns on the site. Getting these right prevents accessibility complaints, improves SEO (Google's crawlers respect aria attributes), and passes California ADA compliance checks for businesses serving the public.

---

## Skip-to-Content Link

**Required on every page.** First focusable element in the DOM. Appears visually only on keyboard focus.

```tsx
// src/app/layout.tsx — first child inside <body>
<a
  href="#main-content"
  className="skip-link"  // defined in globals.css — visually hidden until :focus
>
  Skip to main content
</a>

// Every page.tsx — main landmark receives the ID
<main id="main-content" tabIndex={-1}>
  {/* page content */}
</main>
```

`tabIndex={-1}` on `<main>` allows programmatic focus (when skip link is activated) without adding it to the natural tab order.

---

## Desktop Navigation

```tsx
<header role="banner">
  <nav aria-label="Main navigation">
    <ul role="list">
      {navLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            aria-current={pathname === link.href ? 'page' : undefined}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</header>
```

**Key attributes:**
- `role="banner"` on `<header>` (implicit for `<header>` outside `<aside>`/`<section>`, but explicit is safer)
- `aria-label="Main navigation"` on `<nav>` — distinguishes from breadcrumb nav and footer nav
- `aria-current="page"` on the active link — screen readers announce "current page"
- Never use `<div>` for navigation — always `<nav>` with `<ul>` + `<li>`

---

## Mobile Menu — Complete Pattern

The mobile menu is the highest-risk accessibility component. It must implement a **focus trap** while open.

### State Management

```typescript
const [isOpen, setIsOpen] = useState(false)
const menuRef = useRef<HTMLDivElement>(null)
const triggerRef = useRef<HTMLButtonElement>(null)

// Close on Escape
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
      triggerRef.current?.focus()  // Return focus to trigger button
    }
  }
  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
}, [isOpen])

// Prevent body scroll when menu open
useEffect(() => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  return () => { document.body.style.overflow = '' }
}, [isOpen])
```

### Trigger Button

```tsx
<button
  ref={triggerRef}
  type="button"
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
  onClick={() => setIsOpen(!isOpen)}
  className="lg:hidden touch-target"
>
  {isOpen ? <XIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
</button>
```

**Required attributes:**
- `aria-expanded` — announces open/closed state to screen readers
- `aria-controls` — links button to the menu it controls (ID must match)
- `aria-label` — dynamic label that changes with state ("Open" vs "Close")
- `aria-hidden="true"` on icon SVGs — the button label is sufficient

### Menu Panel

```tsx
<div
  id="mobile-menu"
  ref={menuRef}
  role="dialog"
  aria-modal="true"
  aria-label="Navigation menu"
  hidden={!isOpen}
  className={`fixed inset-0 z-50 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
>
  <nav aria-label="Mobile navigation">
    <ul role="list">
      {navLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            aria-current={pathname === link.href ? 'page' : undefined}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</div>
```

### Focus Trap Implementation

```typescript
// Trap focus inside mobile menu while open
useEffect(() => {
  if (!isOpen || !menuRef.current) return

  const focusableSelectors = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled])',
    'select:not([disabled])', 'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')

  const focusableElements = Array.from(
    menuRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
  ).filter(el => !el.closest('[hidden]'))

  const firstEl = focusableElements[0]
  const lastEl = focusableElements[focusableElements.length - 1]

  // Focus first element when menu opens
  firstEl?.focus()

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return
    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault()
        lastEl?.focus()
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault()
        firstEl?.focus()
      }
    }
  }

  document.addEventListener('keydown', handleTabKey)
  return () => document.removeEventListener('keydown', handleTabKey)
}, [isOpen])
```

---

## Breadcrumb Navigation

```tsx
// src/components/layout/Breadcrumbs.tsx
<nav aria-label="Breadcrumb">
  <ol
    role="list"
    className="flex items-center gap-2 text-sm text-text-muted"
  >
    <li>
      <a href="/" aria-label="Home">Home</a>
    </li>
    {crumbs.map((crumb, i) => (
      <li key={crumb.href} className="flex items-center gap-2">
        <span aria-hidden="true">/</span>
        {i === crumbs.length - 1 ? (
          // Current page — not a link, announced as current
          <span aria-current="page">{crumb.label}</span>
        ) : (
          <a href={crumb.href}>{crumb.label}</a>
        )}
      </li>
    ))}
  </ol>
</nav>
```

The separator `/` gets `aria-hidden="true"` — screen readers do not need to announce it.

The last breadcrumb is a `<span>` with `aria-current="page"`, not a link (linking to the current page is redundant and confusing).

---

## Footer Navigation

```tsx
<footer role="contentinfo">
  {/* NAP — use <address> for machine-readable contact info */}
  <address>
    <strong>{siteConfig.businessName}</strong>
    <span>{siteConfig.contact.address}</span>
    <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
  </address>

  {/* Footer nav — distinct label from header nav */}
  <nav aria-label="Footer navigation">
    <ul role="list">
      {footerLinks.map(link => (
        <li key={link.href}>
          <a href={link.href}>{link.label}</a>
        </li>
      ))}
    </ul>
  </nav>
</footer>
```

`role="contentinfo"` on `<footer>` is implicit but explicit for the landmark region to work correctly with all screen readers.

---

## Keyboard Navigation Checklist

- [ ] `Tab` reaches every nav link and CTA button
- [ ] `Shift+Tab` reverses order correctly
- [ ] `Enter` / `Space` activates buttons and links
- [ ] `Escape` closes mobile menu and returns focus to trigger
- [ ] Focus indicator is visible (2px outline, never `outline: none` on `:focus-visible`)
- [ ] `aria-current="page"` present on active nav link
- [ ] No keyboard traps outside the intentional mobile menu focus trap
- [ ] All icon-only buttons have `aria-label` text
