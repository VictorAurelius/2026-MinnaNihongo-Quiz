---
name: ui-review
description: "Use when user says 'review UI', 'check design', 'audit screenshots', or after any UI/UX code change. Auto-runs after every frontend PR. Captures before/after screenshots, scores per-screen on /128 scale."
user-invocable: true
---

# UI Review — Portable Template

Per-screen scoring + before/after screenshots. Adapt `{project}` placeholders.

## Setup for your project

1. Copy this folder to `.claude/skills/ui-review/`
2. Copy `scripts/capture-screenshots.ts` to your project's scripts dir
3. Edit PAGES list in capture script for your routes
4. Edit scoring dimensions if needed

## Process

### 0. Fix Verification (MANDATORY if previous report exists)
Check each previously reported issue → FIXED/STILL OPEN/PARTIAL table at top of report.

### 1. Capture screenshots

**BEFORE any UI fix** (MANDATORY):
```bash
npx tsx scripts/capture-screenshots.ts --label before-pr-XXX
```

**AFTER fix merged** (auto-run, don't wait for user):
```bash
npx tsx scripts/capture-screenshots.ts --label after-pr-XXX
```

Script auto-detects dev server, starts if needed. Auto-updates `latest/` when using `--label`.

Output: `{project-docs}/screenshots/{label}/{page}/{theme}-{viewport}.png`

### 2. Score per screen (/128)

5 dimensions, each screen scored independently:

- **Technical (/20)** — accessibility, performance, responsive, theming, anti-patterns
- **Design Heuristics (/40)** — Nielsen's 10 heuristics (0-4 each)
- **Visual Aesthetics (/28)** — color, typography, sizing, spacing, alignment, hierarchy, polish
- **User Friendliness (/20)** — first impression, navigation, action clarity, learning curve, delight
- **WCAG Accessibility (/20)** — contrast, touch targets, labels, screen reader, keyboard

Report the LOWEST screen separately — this is the real quality bar.

### 3. Before/After comparison in report

```
| Screen | Before | After | What changed |
|--------|--------|-------|-------------|
| {page} | before-pr-XXX/{page}/dark-mobile.png | after-pr-XXX/{page}/dark-mobile.png | {description} |
```

### 4. Output report
Save to `{project-docs}/ui-review-latest.md`

## Scoring Rubric

- **0/4** = Missing entirely
- **1/4** = Present but broken
- **2/4** = Present but has obvious issues (DEFAULT for most features)
- **3/4** = Works well, consistent across ALL screens
- **4/4** = Genuinely excellent

**"Has feature" = 2/4, NOT 3/4.** Before giving 3: "Would external auditor agree this is good?"

## Gotchas

- Score what you SEE in screenshots, not what code says
- WCAG: if unverifiable from screenshot → cap at 2/4
- Auto-capture after EVERY frontend PR merge — non-negotiable
- Always update `latest/` folder so user sees current state
- Before screenshots are MANDATORY — no skipping
