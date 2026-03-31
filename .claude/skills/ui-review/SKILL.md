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

## Strict Scoring Rubric

### Score meaning (MUST follow this — no inflating)
- **0/4** = Missing entirely
- **1/4** = Present but broken or severely flawed
- **2/4** = Present and functional, BUT has obvious visible issues (this is where most features land)
- **3/4** = Works well, no visible issues, consistent across all screens
- **4/4** = Genuinely excellent — would impress a professional UI designer

### "Has feature" = 2/4, NOT 3/4
Before giving 3/4, ask: **"Would an external auditor looking ONLY at this screenshot agree this is good?"** If uncertain → 2/4.

Examples of 2/4 (NOT 3):
- Progress bar shows "0%" with no motivating context → 2
- Breadcrumbs on 2/7 pages (inconsistent) → 2
- Search on 2/7 list pages → 2
- Icon container sizes vary (w-9/w-10/w-11) → 2 consistency
- Welcome banner exists but page still requires heavy scroll → 2
- Quiz descriptions exist but Grammar/Materials rows lack them → 2

### Verification rules
- **Score what you SEE in screenshot, not what code says**
- WCAG contrast: estimate from screenshot colors. opacity-95 on gradient ≠ guaranteed pass
- Touch targets: measure VISIBLE area. 18px icon inside 44px button LOOKS small
- ARIA: unverifiable from screenshot → cap at 2/4
- Per-screen scoring: no hiding weak screens behind averages
- Self-assessment has been 12-35pts too generous historically. Default to lower.

## Gotchas

- Screenshots are LOCAL ONLY (gitignored) — never commit PNGs
- Dev server on port 5174 before capture
- Vocabulary page may render blank — not a bug
- Slate dark mode: hsl(222 47% ...) — neutral blue, not purple-tinted
