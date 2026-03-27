# Wave 11 — UI/UX Overhaul (Design Skills Audit)

> **Trigger:** Frontend Design Audit scored **12.2/20 (61%)** — "Acceptable" with significant gaps
> **Goal:** Raise audit score to **17+/20** across all pages
> **Based on:** Anthropic frontend-design + Impeccable skill set (PR #77)
> **Prerequisite:** Wave 10 complete ✅

## Audit Findings Summary

### Critical Issues (P0)
1. Dual theming systems — legacy CSS vars (`--primary: #0071e3` blue) vs Tailwind tokens (`--color-primary: purple`). Components render in different brand colors.
2. Undefined CSS vars — `--surface` used 7x but never defined. `--warning` missing in dark mode.
3. Modal lacks `role="dialog"` + `aria-modal`. Card suppresses a11y warnings.

### High Issues (P1)
4. All 10 custom components use legacy CSS vars; only Header + shadcn ui/ use Tailwind tokens
5. 3 duplicate component pairs: Button, Card, ProgressBar (custom + shadcn)
6. ~1000+ lines dead/duplicated CSS in app.css
7. Dark mode uses 3 different selectors (`.dark`, `[data-theme="dark"]`, both)
8. Zero `prefers-reduced-motion` support across all pages
9. Zero `:focus-visible` styles on custom interactive elements
10. Modal has no focus trap

### Medium Issues (P2)
11. 26+ emoji icons across components
12. ProgressBar animates `width` instead of `transform`
13. No loading/skeleton states on any page
14. `<button>` used for navigation instead of `<a href>`
15. No ARIA tab patterns on tab-like selectors
16. Hardcoded `color: white` in 14+ places

---

## PRs

| # | PR | Scope | Est. Tests | Depends |
|---|-----|-------|-----------|---------|
| 25 | [CSS Foundation Cleanup](pr-25-css-cleanup.md) | Unify CSS system, remove dead CSS, fix undefined vars | 5 | — |
| 26 | [Component Migration](pr-26-component-migration.md) | Migrate custom → shadcn, remove duplicates | 15 | #25 |
| 27 | [Icon System](pr-27-icon-system.md) | Replace 26+ emoji with lucide-svelte | 8 | #26 |
| 28 | [Accessibility Pass](pr-28-accessibility.md) | focus-visible, ARIA, reduced-motion, semantic HTML | 12 | #26 |
| 29 | [Page States + Navigation](pr-29-page-states.md) | Loading skeletons, error/empty states, `<a>` nav | 10 | #26 |
| 30 | [Final Polish](pr-30-polish.md) | Audit re-run, spacing, typography, micro-interactions | 5 | #27-29 |

**Total estimated new tests: ~55**
**Target test count: 755 + 55 = 810+**

---

## Wave Checkpoint

| Metric | Before | Target |
|--------|--------|--------|
| Audit score (avg) | 12.2/20 | 17+/20 |
| Dead CSS lines | ~1000+ | 0 |
| Emoji icon count | 26+ | 0 |
| Duplicate components | 3 pairs | 0 |
| CSS var systems | 2 (conflicting) | 1 (Tailwind tokens) |
| Pages with loading state | 0/10 | 10/10 |
| `prefers-reduced-motion` | 0 pages | All pages |
| `:focus-visible` coverage | 0 components | All components |

---

## Execution Order

```
PR #25 (CSS cleanup)
  └── PR #26 (component migration)
        ├── PR #27 (icons)      ─┐
        ├── PR #28 (a11y)       ─┤── can be parallel
        └── PR #29 (page states) ┘
              └── PR #30 (polish) — LAST
```
