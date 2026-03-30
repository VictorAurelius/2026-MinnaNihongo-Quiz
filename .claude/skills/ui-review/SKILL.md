---
name: ui-review
description: "Use when user says 'review UI', 'check design', 'how does it look', 'audit screenshots', 'chấm điểm UI', or after any UI/UX code change. Captures screenshots and scores technical + heuristics + aesthetics + friendliness on /108 scale."
user-invocable: true
---

# UI Review

Scores UI quality across 4 dimensions after every change. Tracks progression.

## Skill Contents

- `reference/scoring-guide.md` — All scoring tables, criteria, layout checklist, bands
- `data/` — Store previous report scores here for comparison
- Screenshot capture script: `svelte-app/scripts/capture-screenshots.ts`

## Process

### 1. Capture screenshots
```bash
cd svelte-app && npx vite build && BASE_URL=http://localhost:5174 npx tsx scripts/capture-screenshots.ts
```

### 2. Read all dark-mobile screenshots
Read these files visually (primary review targets):
`documents/04-quality/screenshots/{home,courses,course-detail,lesson-menu,kanji,hsk,settings,vocabulary}-dark-mobile.png`

### 3. Score 4 dimensions
Consult `reference/scoring-guide.md` for detailed criteria. Fill in scores:

- **Technical (/20)** — 5 dimensions: accessibility, performance, responsive, theming, anti-patterns
- **Design Heuristics (/40)** — Nielsen's 10 heuristics
- **Visual Aesthetics (/28)** — 7 dimensions: color, typography, element sizing, spacing, alignment, hierarchy, polish. Run layout checklist per screen.
- **User Friendliness (/20)** — 5 dimensions from perspective of first-time Vietnamese learner

### 4. Output report
Save to `documents/04-quality/ui-review-latest.md`. Compare with previous run.

## Gotchas

- Dev server MUST be running on port 5174 before capture (`npm run dev -- --port 5174`)
- Screenshots use `page.reload()` after localStorage injection — if theme looks wrong, increase waitForTimeout
- Vocabulary page may render blank if lesson data hasn't loaded — not a real bug
- Score a 4 only for genuinely excellent work. Most real interfaces score 2-3.
- Judge aesthetics by what you SEE in screenshots, not what the code says
- For friendliness, think as a Vietnamese student who just downloaded the app

## Scoring Bands

| Dimension | Excellent | Good | Acceptable | Poor |
|-----------|-----------|------|------------|------|
| Technical (/20) | 18+ | 14-17 | 10-13 | <10 |
| Heuristics (/40) | 36+ | 28-35 | 20-27 | <20 |
| Aesthetics (/28) | 25+ | 20-24 | 14-19 | <14 |
| Friendliness (/20) | 18+ | 14-17 | 10-13 | <10 |
| **Combined (/108)** | **90+** | **75-89** | **55-74** | **<55** |
