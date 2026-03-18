---
name: audit-seo
description: Run a comprehensive SEO audit on the current contractor website. Checks titles, metas, schema, headings, canonicals, OG tags, alt text, and internal linking on every page.
disable-model-invocation: true
---

# SEO Audit

Run a full SEO audit on the site: $ARGUMENTS

Check every page in src/app/ for:

1. Title tag present and 50-60 characters, follows "[Service] in [City] | [Company Name]" format
2. Meta description present and 150-160 characters with action CTA
3. Single H1 per page, different from title tag
4. Sequential heading hierarchy (no H2 → H4 skips)
5. Self-referencing canonical tag
6. JSON-LD schema present (LocalBusiness, Service, FAQPage, BreadcrumbList as appropriate)
7. Open Graph tags (og:title, og:description, og:image)
8. Alt text on all images — descriptive, not "image" or empty
9. Internal links present (no dead-end pages — every page links to 2+ other pages)
10. NAP consistency (Name, Address, Phone match siteConfig everywhere)
11. generateStaticParams used for service and area pages

Output results as a table: Page | Check | Status (PASS/FAIL) | Details

Fix any FAIL items immediately. Recheck after fixes.
