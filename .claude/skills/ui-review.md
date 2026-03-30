---
name: ui-review
description: "Run combined UI/UX quality review: capture fresh screenshots, then run technical audit (/audit) + design critique (/critique) on all screens. Use after every UI/UX change to track quality."
user-invocable: true
---

# UI Review — Combined Quality Check

Run this skill after every UI/UX change to measure quality before and after.

## Step 1: Capture Fresh Screenshots

```bash
cd svelte-app
npx vite build
BASE_URL=http://localhost:5174 npx tsx scripts/capture-screenshots.ts
```

Screenshots are saved to `documents/04-quality/screenshots/` — one per screen, no date prefix, overwritten each run.

## Step 2: Visual Review

Read ALL dark-mobile screenshots (primary review target):
- `documents/04-quality/screenshots/home-dark-mobile.png`
- `documents/04-quality/screenshots/courses-dark-mobile.png`
- `documents/04-quality/screenshots/course-detail-dark-mobile.png`
- `documents/04-quality/screenshots/lesson-menu-dark-mobile.png`
- `documents/04-quality/screenshots/kanji-dark-mobile.png`
- `documents/04-quality/screenshots/hsk-dark-mobile.png`
- `documents/04-quality/screenshots/settings-dark-mobile.png`
- `documents/04-quality/screenshots/vocabulary-dark-mobile.png`

## Step 3: Technical Audit (from /audit)

Score each dimension 0-4:

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | ? | |
| 2 | Performance | ? | |
| 3 | Responsive Design | ? | |
| 4 | Theming | ? | |
| 5 | Anti-Patterns | ? | |
| **Total** | | **??/20** | |

## Step 4: Design Critique (from /critique)

Score Nielsen's 10 heuristics 0-4:

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | ? | |
| 2 | Match System / Real World | ? | |
| 3 | User Control and Freedom | ? | |
| 4 | Consistency and Standards | ? | |
| 5 | Error Prevention | ? | |
| 6 | Recognition Rather Than Recall | ? | |
| 7 | Flexibility and Efficiency | ? | |
| 8 | Aesthetic and Minimalist Design | ? | |
| 9 | Error Recovery | ? | |
| 10 | Help and Documentation | ? | |
| **Total** | | **??/40** | |

## Step 5: Combined Summary

Present a single combined report:

```
=== UI REVIEW REPORT ===
Technical Score: ??/20 ([band])
Design Score:   ??/40 ([band])
Combined:       ??/60

Top 5 Issues (P0-P1):
1. ...
2. ...

What's Working Well:
- ...

Recommended Next Actions:
1. ...
```

## Scoring Bands

**Technical (20):** 18-20 Excellent, 14-17 Good, 10-13 Acceptable, 6-9 Poor, 0-5 Critical
**Design (40):** 36-40 Excellent, 28-35 Good, 20-27 Acceptable, 12-19 Poor, 0-11 Critical
**Combined (60):** 50+ Excellent, 40-49 Good, 30-39 Acceptable, 20-29 Poor, <20 Critical

## Rules

- Be brutally honest with scores
- Reference specific screenshots when citing issues
- Only flag issues visible in screenshots or verifiable in code
- Compare with previous run if available (track improvement)
- Save report to `documents/04-quality/ui-review-latest.md`
