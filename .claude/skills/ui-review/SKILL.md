---
name: ui-review
description: "Use when user says 'review UI', 'check design', 'audit screenshots', 'chấm điểm UI', 'nâng cấp visual', 'thêm gamification', or after any UI/UX code change. Also AUTO-RUN after every frontend fix PR is merged — do not wait for user to ask. Scores per-screen + overall on /128 scale. Captures BOTH local dev + production screenshots."
user-invocable: true
---

# UI Review

Per-screen + overall scoring. **Auto-runs after every frontend fix.**
Captures both local dev AND production screenshots for comparison.

## Skill Contents

- `reference/fix-checklist.md` — **READ FIRST** — Fix verification protocol, persistent issues, ARIA labels, touch target cheat sheet
- `reference/scoring-guide.md` — 5 dimensions + layout checklist + Tailwind mapping
- `reference/wcag-audit.md` — WCAG 2.1 AA PASS/WARN/FAIL checklist
- `reference/code-fixes.md` — Component locator + spacing patterns
- `reference/visual-uplift.md` — Color psychology, hero patterns, micro-details
- `reference/gamification.md` — XP, streaks, badges, completion screens

## Auto-Audit Rule

**After every PR that touches `svelte-app/src/routes/` or `svelte-app/src/lib/components/` or `svelte-app/src/app.css`:**
1. Rebuild + recapture local screenshots
2. Score the CHANGED screens (not all 8)
3. Update `documents/04-quality/ui-review-latest.md`
4. Report delta to user

**After every merge to main (deploy):**
1. Wait for CI to complete
2. Capture production screenshots
3. Compare prod vs local — flag any differences
4. Report deploy verification status

Do NOT wait for user to say "audit" — do it automatically.

## Mode Detection

| User says | Mode | References |
|-----------|------|-----------|
| "audit", "chấm điểm" | **Full Audit** | fix-checklist → scoring-guide, wcag-audit |
| "audit lại", "re-audit" | **Re-Audit** | fix-checklist (verify fixes) → scoring-guide |
| "nhạt", "nâng cấp visual" | **Visual Uplift** | visual-uplift |
| "gamification", "thêm streak" | **Gamification** | gamification |
| "sửa margin/spacing" | **Fix** | code-fixes |
| *(auto after frontend PR)* | **Quick Audit** | fix-checklist → scoring-guide (changed screens) |
| *(auto after deploy)* | **Prod Verify** | capture prod screenshots + compare |

## Process

### 0. Fix Verification (MANDATORY — read before anything else)
Read `reference/fix-checklist.md`. If previous report exists:
- Check each previously reported issue against new screenshots
- Output FIXED/STILL OPEN/PARTIAL table at TOP of report
- Issue reported ≥3 times without fix → add -1 penalty score
- Issue Critical tồn đọng ≥2 reviews → add -1 penalty

### 1. Capture screenshots

Screenshots organized in labeled folders with per-screen subfolders:

```
screenshots/{label}/{page}/{theme}-{viewport}.png

Example:
  screenshots/after-pr-123/lesson-menu/dark-mobile.png
  screenshots/before-pr-123/home/light-desktop.png
```

**Commands:**
```bash
# Before fix
cd svelte-app && BASE_URL=http://localhost:5174 npx tsx scripts/capture-screenshots.ts --label before-pr-XXX

# After fix
cd svelte-app && BASE_URL=http://localhost:5174 npx tsx scripts/capture-screenshots.ts --label after-pr-XXX

# Latest (default, overwritten)
cd svelte-app && BASE_URL=http://localhost:5174 npx tsx scripts/capture-screenshots.ts

# Production
cd svelte-app && BASE_URL=https://victoraurelius.github.io/2026-Smart-Quiz npx tsx scripts/capture-screenshots.ts --label prod
```

**Note:** Node 18+ required. If default node is 16, prefix: `PATH="/c/Program Files/nodejs:$PATH"`

All output gitignored. **Fallback:** User pastes screenshot → score from that.

### Screenshot Workflow Rules (MANDATORY)

1. **Before starting UI fix**: capture `--label before-pr-XXX`
2. **After fix merged**: capture `--label after-pr-XXX`
3. **Compare before/after** per screen in report (open both folders side by side)
4. **After deploy to main**: capture `--label prod`
5. **`latest/`** is the most recent capture (default, no --label)
6. **Browse per screen**: each page has its own subfolder (`home/`, `lesson-menu/`, etc.)
7. **Read `{page}/dark-mobile.png`** as primary review target per screen

### 2. Score PER SCREEN (not averaged!)

For each screen, score independently:

```
| Screen | Heuristics (/40) | Aesthetics (/28) | Friendly (/20) | WCAG (/20) |
|--------|-------------------|-------------------|----------------|------------|
| Home | ? | ? | ? | ? |
| Courses | ? | ? | ? | ? |
| Course Detail | ? | ? | ? | ? |
| Lesson Menu | ? | ? | ? | ? |
| Kanji | ? | ? | ? | ? |
| HSK | ? | ? | ? | ? |
| Settings | ? | ? | ? | ? |
| **Lowest** | ? | ? | ? | ? |
```

**Score from LOCAL screenshots for consistency.**
**Use PROD screenshots to verify deploy matches local.**

### 3. Overall Technical (/20) — scored once for whole app

### 4. WCAG Audit Table — per element, PASS/WARN/FAIL

### 5. Top 3 issues with code fixes
Per `reference/code-fixes.md`: locate file → before/after → Tailwind classes.

### 6. Production vs Local comparison (after deploy)

```
| Screen | Local | Prod | Match? |
|--------|-------|------|--------|
| Home | ✅ renders | ✅ renders | ✅ |
| ...    | ...   | ...  | ...    |
```

Flag any screen where prod renders differently from local.

### 7. Visual Uplift / Gamification (if needed)
Per mode detection.

### 8. Output report
Save to `documents/04-quality/ui-review-latest.md`. Include:
- Per-screen score table
- Lowest screen highlighted
- Score progression
- Prod vs local comparison (if applicable)

## Strict Scoring Rubric

### Score meaning (MUST follow this — no inflating)
- **0/4** = Missing entirely
- **1/4** = Present but broken or severely flawed
- **2/4** = Present and functional, BUT has obvious visible issues (this is where most features land)
- **3/4** = Works well, no visible issues, consistent across all screens
- **4/4** = Genuinely excellent — would impress a professional UI designer

### "Has feature" = 2/4, NOT 3/4
Before giving 3/4, ask: **"Would an external auditor looking ONLY at this screenshot agree this is good?"** If uncertain → 2/4.

### Verification rules
- **Score what you SEE in screenshot, not what code says**
- WCAG contrast: estimate from screenshot colors. opacity-95 on gradient ≠ guaranteed pass
- Touch targets: measure VISIBLE area. 18px icon inside 44px button LOOKS small
- ARIA: unverifiable from screenshot → cap at 2/4
- Per-screen scoring: no hiding weak screens behind averages
- Self-assessment has been 12-35pts too generous historically. Default to lower.

## Gotchas

- **Fix Verification is Step 0** — always read fix-checklist.md BEFORE scoring
- Issue reported 3+ times without fix = penalty. Don't let issues slide silently
- Local screenshots: dev server on port 5174
- Production screenshots: need Node 18+ (`PATH="/c/Program Files/nodejs:$PATH"`)
- Both screenshot folders gitignored — local only
- Vocabulary page may render blank — not a bug
- Slate dark mode: hsl(222 47% ...) — neutral blue
- Production may show blank if user has old service worker cached — not a screenshot issue
- Prod screenshots use `networkidle` (slower, 30s timeout) vs local `domcontentloaded`
