---
name: audit-accessibility
description: Run a WCAG 2.2 AA accessibility audit on the current contractor website. Checks contrast, labels, keyboard nav, ARIA, touch targets, focus indicators, and heading structure.
disable-model-invocation: true
---

# Accessibility Audit

Run a WCAG 2.2 AA accessibility audit: $ARGUMENTS

Check all components in src/components/ and pages in src/app/:

1. Color contrast ratios: 4.5:1 for normal text, 3:1 for large text and UI components
2. All images have meaningful alt text
3. All form inputs have associated label elements
4. All buttons use semantic HTML (button or a, never div with onClick)
5. Visible focus indicators on all interactive elements
6. Keyboard navigation works (Tab through all interactive elements in logical order)
7. ARIA attributes used correctly (not overused — prefer semantic HTML)
8. Touch targets 48px minimum on mobile
9. Skip navigation link present in layout
10. Heading hierarchy is sequential (H1 → H2 → H3, no skips)
11. Language attribute set on html element
12. No autoplay media

Use Playwright to navigate to localhost:3000 and test:
- Keyboard-only navigation on homepage and contact page
- Screenshots at 375px and 1280px showing focus states

Output results as table: Component/Page | Issue | WCAG Criterion | Severity (Critical/Warning) | Fix

Fix any Critical items immediately. Recheck after fixes.
