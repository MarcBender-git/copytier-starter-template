# Dependency Audit Reference

## Why This Matters

Outdated dependencies with known vulnerabilities are one of the most common
attack vectors on web applications. For contractor sites, the risk is primarily:
- Supply chain attacks via compromised npm packages
- XSS vulnerabilities in UI libraries
- Data exposure via authentication/HTTP libraries

**Policy:** Zero high or critical vulnerabilities before any production deploy.

---

## Running the Audit

```bash
# Standard audit — check all dependencies
pnpm audit

# Show only high and critical
pnpm audit --audit-level=high

# Auto-fix compatible vulnerabilities
pnpm audit --fix

# Generate machine-readable report
pnpm audit --json > audit-report.json
```

---

## Interpreting Audit Results

### Severity Levels

| Level | Response Required | Deadline |
|-------|-----------------|----------|
| Critical | Fix before any deploy — no exceptions | Immediate |
| High | Fix before production deploy | Before Pack 8 |
| Moderate | Fix if easy, document if not | Best effort |
| Low | Document and move on | Not required |

### Reading the Output

```
┌─────────────────────────────────────────────────────────────────┐
│                       npm audit report                          │
├──────────────────────────────────┬──────────────────────────────┤
│ high             │ Prototype Pollution in package-name         │
│ Package          │ package-name                                │
│ Patched in       │ >=2.1.4                                     │
│ Dependency of    │ next-auth                                   │
│ Path             │ next-auth > package-name                    │
│ More info        │ https://npmjs.com/advisories/XXXX           │
└──────────────────────────────────┴──────────────────────────────┘
```

**Key fields:**
- **Package:** The vulnerable package (may be a transitive dependency)
- **Dependency of:** The top-level package that pulled it in
- **Patched in:** The version that fixes it
- **Path:** The full dependency chain

---

## Fix Decision Tree

```
Vulnerability found
    ↓
Is it HIGH or CRITICAL?
    ├─ No → Document, continue
    └─ Yes ↓
        Does `pnpm audit --fix` resolve it?
            ├─ Yes → Run fix, test, commit
            └─ No ↓
                Can I upgrade the PARENT package?
                    ├─ Yes → pnpm update [parent-package]
                    └─ No ↓
                        Is the vulnerable code PATH reachable?
                            ├─ No → Accept risk, document in comment
                            └─ Yes ↓
                                Can I replace the parent with an alternative?
                                    ├─ Yes → Replace package
                                    └─ No → Block deploy, escalate to Marc
```

---

## Common Vulnerable Packages and Their Fixes

| Package | Common Issue | Fix |
|---------|-------------|-----|
| `lodash` < 4.17.21 | Prototype pollution | Upgrade to 4.17.21+ or remove |
| `axios` < 1.6.0 | CSRF vulnerability | Upgrade or switch to native fetch |
| `node-fetch` v2 | No longer maintained | Upgrade to v3 or use native fetch |
| `minimist` < 1.2.6 | Prototype pollution | Upgrade (usually transitive) |
| `semver` < 7.5.2 | ReDoS | Upgrade (usually transitive) |
| `tough-cookie` < 4.1.3 | Prototype pollution | Upgrade (via jest-environment) |
| `word-wrap` < 1.2.4 | ReDoS | Upgrade (usually transitive) |
| `postcss` < 8.4.31 | Line return parsing | Upgrade |

---

## Handling Transitive Dependencies

When the vulnerable package is a transitive dependency (you didn't install it
directly), you have a few options:

### Option 1: Override in package.json (pnpm resolutions)

```json
// package.json
{
  "pnpm": {
    "overrides": {
      "minimist": "^1.2.8",
      "semver": "^7.5.4",
      "tough-cookie": "^4.1.3"
    }
  }
}
```

Run `pnpm install` after adding overrides. This forces the specific version
regardless of what the parent package requests.

**Warning:** Overrides can break packages if the forced version has breaking
changes. Test thoroughly after adding overrides.

### Option 2: Upgrade the parent package

```bash
pnpm update next-auth          # upgrade to latest compatible version
pnpm update next-auth@latest   # upgrade to absolute latest (may break)
```

Check the parent package's changelog before upgrading to ensure no breaking changes.

### Option 3: Document accepted risk

If a vulnerability is in a development-only package (jest, eslint, etc.) that
never runs in production, it may be acceptable to document and not fix:

```json
// package.json
{
  "comments": {
    "audit-accepted-risks": {
      "tough-cookie-GHSA-xxxx": "dev-only via jest, not in production build"
    }
  }
}
```

Note: The `comments` field in package.json is non-standard but serves as
documentation. Use a real `SECURITY-NOTES.md` file for anything important.

---

## Checking for Unused Dependencies

Unused packages expand the attack surface and slow down builds.

```bash
# Install depcheck globally (one-time)
pnpm add -g depcheck

# Run in project root
depcheck

# Output example:
# Unused dependencies
# * @radix-ui/react-tooltip   ← was this removed intentionally?
# * framer-motion             ← if not used anywhere, remove it
#
# Missing dependencies (used but not in package.json)
# * react-hook-form           ← install it!
```

**Before removing a "unused" package:**
1. Search the codebase: `grep -rn "package-name" src/`
2. Check if it's a peer dependency required by another package
3. Check if it's used in a config file (tailwind.config.ts, etc.)

```bash
# Remove a confirmed unused package
pnpm remove @unused/package

# Rebuild to verify nothing broke
pnpm build
```

---

## Lock File Integrity Check

The lock file (`pnpm-lock.yaml`) ensures deterministic installs. If it's out of
sync with `package.json`, the deployed version may differ from local development.

```bash
# Verify lock file is in sync
pnpm install --frozen-lockfile

# If this fails, the lock file is out of sync
# Fix: run normal install and commit the updated lock file
pnpm install
git add pnpm-lock.yaml
git commit -m "fix: sync pnpm lock file"
```

**Never delete pnpm-lock.yaml** unless you intend to rebuild it from scratch.
The lock file is what makes builds reproducible.

---

## Pre-Deploy Audit Checklist

Run this before every production deploy (Pack 8 will also run this):

```bash
# 1. Dependency audit
pnpm audit --audit-level=high
# Expected: 0 high or critical vulnerabilities

# 2. Lock file integrity
pnpm install --frozen-lockfile
# Expected: exits 0, no changes to lock file

# 3. Build succeeds
pnpm build
# Expected: exits 0, no TypeScript errors

# 4. No secrets in source
grep -rn "SUPABASE_SERVICE_ROLE" src/ public/
grep -rn "sk_live_" src/ public/
grep -rn "rk_live_" src/ public/
# Expected: 0 matches

# 5. Check .gitignore covers secrets
cat .gitignore | grep ".env"
# Expected: .env.local, .env.*.local appear in .gitignore
```

---

## Dependency Update Strategy

### Patch updates (1.2.3 → 1.2.4): Update freely
```bash
pnpm update --latest --depth 0  # update all direct deps to latest
```

### Minor updates (1.2.3 → 1.3.0): Update with care
Check changelog before updating. Minor versions should be backward-compatible
but sometimes include breaking changes in practice.

### Major updates (1.2.3 → 2.0.0): Plan carefully
These often have breaking changes. Read the migration guide. Test thoroughly.
Commit as `fix: upgrade [package] to v2 for security` so the context is clear.

### Cadence
- Run `pnpm audit` before every production deploy (mandatory)
- Run `pnpm update` monthly to stay current (optional but recommended)
- Subscribe to GitHub Security Advisories for key packages (Next.js, Supabase)

---

## Secrets Audit

Alongside dependency auditing, check that no secrets have been committed.

```bash
# Search for common secret patterns in tracked files
git log --all --full-history -- "*.env"       # env files ever committed?
grep -rn "eyJ" src/                            # JWT tokens (base64)
grep -rn "sk_live_" src/                       # Stripe live keys
grep -rn "SUPABASE_SERVICE_ROLE_KEY" src/      # Supabase admin key
grep -rn "AIza" src/                           # Google API keys in code

# If anything is found in git history:
# 1. Rotate the exposed key IMMEDIATELY
# 2. Remove from git history (git filter-repo or BFG Repo Cleaner)
# 3. Force push (after warning Marc)
```

**Prevention:** All secrets go in `.env.local` (never committed).
Only `NEXT_PUBLIC_*` env vars that are safe to expose go in the Next.js build.
The Supabase `anon` key is safe to expose (protected by RLS policies).
The Supabase `service_role` key is NEVER safe to expose — server-only.
