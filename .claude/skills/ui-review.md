---
name: ui-review
description: "Run combined UI/UX quality review: capture fresh screenshots, then run technical audit + design critique + visual aesthetics + user friendliness scoring on all screens. Use after every UI/UX change to track quality."
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

## Step 3: Technical Audit (/20)

Score each dimension 0-4:

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | ? | |
| 2 | Performance | ? | |
| 3 | Responsive Design | ? | |
| 4 | Theming | ? | |
| 5 | Anti-Patterns | ? | |
| **Total** | | **??/20** | |

## Step 4: Design Heuristics (/40)

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

## Step 5: Visual Aesthetics (/20)

Evaluate the **look and feel** purely from screenshots. Score each dimension 0-4:

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | **Color Harmony** | ? | Are colors pleasing together? Enough contrast? Palette cohesive? Dark mode comfortable? |
| 2 | **Typography** | ? | Clear hierarchy? Readable sizes? Consistent font weights? Good line spacing? |
| 3 | **Spacing & Alignment** | ? | Consistent padding/margins? Elements aligned? Breathing room between items? Nothing cramped or floating? |
| 4 | **Visual Hierarchy** | ? | Eye flows naturally? Primary action obvious? Important elements stand out? Clear sections? |
| 5 | **Polish & Detail** | ? | Rounded corners consistent? Shadows appropriate? Transitions smooth? Borders tasteful? Icons crisp? Overall professional feel? |
| **Total** | | **??/20** | |

**Scoring**: 0=Ugly/broken, 1=Amateur/inconsistent, 2=Passable/generic, 3=Good/professional, 4=Beautiful/distinctive

## Step 6: User Friendliness (/20)

Evaluate from perspective of a **first-time Vietnamese learner** opening the app. Score 0-4:

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | **First Impression** | ? | Does the home page immediately communicate what this app does? Would a new user know where to start? |
| 2 | **Navigation Clarity** | ? | Can user find what they need in ≤2 taps? Are back buttons/breadcrumbs clear? Is current location obvious? |
| 3 | **Action Clarity** | ? | Are buttons/links obviously clickable? Do labels describe what will happen? Is the primary action per screen clear? |
| 4 | **Learning Curve** | ? | Can user start a quiz without reading instructions? Are quiz directions/modes self-explanatory? Are results meaningful? |
| 5 | **Delight & Motivation** | ? | Does the app feel encouraging? Are there progress indicators? Does completing actions feel rewarding? Would user come back? |
| **Total** | | **??/20** | |

**Scoring**: 0=Confusing/frustrating, 1=Difficult/unclear, 2=Usable/neutral, 3=Easy/pleasant, 4=Intuitive/delightful

## Step 7: Combined Summary

```
=== UI REVIEW REPORT ===
Technical:        ??/20 ([band])
Design Heuristics:??/40 ([band])
Visual Aesthetics:??/20 ([band])
User Friendliness:??/20 ([band])
Combined:         ??/100

Top Issues (P0-P2):
1. ...

What's Working Well:
- ...

Recommended Next Actions:
1. ...
```

## Scoring Bands

**Technical (20):** 18-20 Excellent, 14-17 Good, 10-13 Acceptable, 6-9 Poor, 0-5 Critical
**Heuristics (40):** 36-40 Excellent, 28-35 Good, 20-27 Acceptable, 12-19 Poor, 0-11 Critical
**Aesthetics (20):** 18-20 Excellent, 14-17 Good, 10-13 Acceptable, 6-9 Poor, 0-5 Critical
**Friendliness (20):** 18-20 Excellent, 14-17 Good, 10-13 Acceptable, 6-9 Poor, 0-5 Critical
**Combined (100):** 85+ Excellent, 70-84 Good, 50-69 Acceptable, 30-49 Poor, <30 Critical

## Rules

- Be brutally honest with scores — a 4 means genuinely excellent, most things score 2-3
- Reference specific screenshots when citing issues
- For aesthetics: judge what you SEE, not what the code says
- For friendliness: think as a Vietnamese student who just downloaded the app
- Compare with previous run if available (track improvement in each dimension)
- Save report to `documents/04-quality/ui-review-latest.md`
