---
name: ui-review
description: "Use when user says 'review UI', 'check design', 'how does it look', 'audit screenshots', 'chấm điểm UI', or after any UI/UX code change. Captures screenshots, scores 5 dimensions (technical, heuristics, aesthetics, friendliness, accessibility) on /128 scale, outputs WCAG audit table and actionable code fixes."
user-invocable: true
---

# UI Review

Scores UI quality across 5 dimensions after every change. Tracks progression, flags WCAG issues, suggests code fixes.

## Skill Contents

- `reference/scoring-guide.md` — Scoring tables for 5 dimensions + layout checklist
- `reference/wcag-audit.md` — WCAG 2.1 AA checklist with PASS/WARN/FAIL table
- `reference/code-fixes.md` — How to write actionable code fix suggestions
- `data/` — Previous report scores for comparison
- Screenshot capture script: `svelte-app/scripts/capture-screenshots.ts`

## Process

### 1. Visual Inventory
Before scoring, identify:
- Platform & viewport (mobile/desktop, light/dark)
- Design maturity (prototype/production)
- Key components visible in screenshots

### 2. Capture screenshots
```bash
cd svelte-app && npx vite build && BASE_URL=http://localhost:5174 npx tsx scripts/capture-screenshots.ts
```

### 3. Read all dark-mobile screenshots
Read files in `documents/04-quality/screenshots/{page}-dark-mobile.png`

### 4. Score 5 dimensions
Consult `reference/scoring-guide.md` for criteria:

- **Technical (/20)** — accessibility, performance, responsive, theming, anti-patterns
- **Design Heuristics (/40)** — Nielsen's 10 heuristics (0-4 each)
- **Visual Aesthetics (/28)** — color, typography, sizing, spacing, alignment, hierarchy, polish + layout checklist
- **User Friendliness (/20)** — first impression, navigation, actions, learning curve, delight
- **WCAG Accessibility (/20)** — contrast, touch targets, labels, ARIA, screen reader. Output PASS/WARN/FAIL table per `reference/wcag-audit.md`

### 5. Top 3 critical issues
Identify the 3 most impactful problems. For each, provide:
- What's wrong + which heuristic/WCAG criterion violated
- User impact
- **Code fix** with before/after using project stack (SvelteKit + Tailwind). See `reference/code-fixes.md`

### 6. Output report
Save to `documents/04-quality/ui-review-latest.md`. Include score progression table.

## Gotchas

- Dev server MUST be running on port 5174 before capture
- Screenshots use `page.reload()` after localStorage injection — increase waitForTimeout if theme wrong
- Vocabulary page may render blank — not a real bug
- Score 4 only for genuinely excellent work. Most things score 2-3
- Judge aesthetics by what you SEE, not what code says
- For friendliness, think as Vietnamese student who just downloaded the app
- Code fixes MUST use project stack: **SvelteKit + Svelte 4 + Tailwind CSS v4 + shadcn-svelte + lucide-svelte**. No React, no raw CSS

## Scoring Bands

| Dimension | Excellent | Good | Acceptable | Poor |
|-----------|-----------|------|------------|------|
| Technical (/20) | 18+ | 14-17 | 10-13 | <10 |
| Heuristics (/40) | 36+ | 28-35 | 20-27 | <20 |
| Aesthetics (/28) | 25+ | 20-24 | 14-19 | <14 |
| Friendliness (/20) | 18+ | 14-17 | 10-13 | <10 |
| WCAG (/20) | 18+ | 14-17 | 10-13 | <10 |
| **Combined (/128)** | **108+** | **90-107** | **65-89** | **<65** |
