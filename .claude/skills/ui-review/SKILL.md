---
name: ui-review
description: "Use when user says 'review UI', 'check design', 'audit screenshots', 'chấm điểm UI', 'nâng cấp visual', 'thêm gamification', or after any UI/UX code change. Also AUTO-RUN after every frontend fix PR is merged — do not wait for user to ask. Scores per-screen + overall on /128 scale."
user-invocable: true
---

# UI Review

Per-screen + overall scoring. **Auto-runs after every frontend fix.**

## Skill Contents

- `reference/scoring-guide.md` — 5 dimensions + layout checklist + Tailwind mapping
- `reference/wcag-audit.md` — WCAG 2.1 AA PASS/WARN/FAIL checklist
- `reference/code-fixes.md` — Component locator + spacing patterns
- `reference/visual-uplift.md` — Color psychology, hero patterns, micro-details
- `reference/gamification.md` — XP, streaks, badges, completion screens

## Auto-Audit Rule

**After every PR that touches `svelte-app/src/routes/` or `svelte-app/src/lib/components/` or `svelte-app/src/app.css`:**
1. Rebuild + recapture screenshots
2. Score the CHANGED screens (not all 8)
3. Update `documents/04-quality/ui-review-latest.md`
4. Report delta to user

Do NOT wait for user to say "audit" — do it automatically.

## Mode Detection

| User says | Mode | References |
|-----------|------|-----------|
| "audit", "chấm điểm" | **Full Audit** | scoring-guide, wcag-audit |
| "nhạt", "nâng cấp visual" | **Visual Uplift** | visual-uplift |
| "gamification", "thêm streak" | **Gamification** | gamification |
| "sửa margin/spacing" | **Fix** | code-fixes |
| *(auto after frontend PR)* | **Quick Audit** | scoring-guide (changed screens only) |

## Process

### 1. Capture screenshots (local only — NOT committed to git)
```bash
cd svelte-app && npx vite build && BASE_URL=http://localhost:5174 npx tsx scripts/capture-screenshots.ts
```
Screenshots saved to `documents/04-quality/screenshots/` (gitignored).

**Fallback:** User pastes screenshot → score from that. Note in report.

### 2. Score PER SCREEN (not averaged!)

For each screen, score independently:

```
| Screen | Aesthetics (/28) | Heuristics (/40) | Friendly (/20) | WCAG (/20) |
|--------|------------------|-------------------|----------------|------------|
| Home | ? | ? | ? | ? |
| Courses | ? | ? | ? | ? |
| Course Detail | ? | ? | ? | ? |
| Lesson Menu | ? | ? | ? | ? |
| Kanji | ? | ? | ? | ? |
| HSK | ? | ? | ? | ? |
| Settings | ? | ? | ? | ? |
| **Lowest** | ? | ? | ? | ? |
```

**Combined score = average of all screens, NOT cherry-picking the best.**
**Report the LOWEST screen separately** — this is the real quality bar.

### 3. Overall Technical (/20) — scored once for whole app

### 4. WCAG Audit Table — per element, PASS/WARN/FAIL

### 5. Top 3 issues with code fixes
Per `reference/code-fixes.md`: locate file → before/after → Tailwind classes.

### 6. Visual Uplift / Gamification (if needed)
Per mode detection.

### 7. Output report
Save to `documents/04-quality/ui-review-latest.md`. Include:
- Per-screen score table
- Lowest screen highlighted
- Score progression

## Strict Scoring Rules

- **Score what you SEE, not what code says**
- **4/4 = genuinely excellent. Most things are 2-3. When in doubt, score LOWER**
- WCAG contrast: estimate ratio from screenshot colors, not CSS class
- Touch targets: measure VISIBLE interactive area, not CSS padding
- ARIA: if unverifiable from screenshot, cap at 2/4
- **Per-screen scoring exposes weak screens** — no hiding behind averages
- Previous self-assessment was 35pts too generous vs external audit

## Gotchas

- Screenshots are LOCAL ONLY (gitignored) — never commit PNGs
- Dev server on port 5174 before capture
- Vocabulary page may render blank — not a bug
- Slate dark mode: hsl(222 47% ...) — neutral blue, not purple-tinted
