# UI Review Report — 2026-03-31 (Run 15, post Courses+Settings uplift)

Previous: Run 14 — 90/128

---

## 1. Technical (14/20) — unchanged

## 2. Per-Screen Scores

### Home
| Dim | Score | Prev | Rationale |
|-----|-------|------|-----------|
| Heuristics | 30 | 30 | — |
| Aesthetics | 22 | 22 | — |
| Friendly | 14 | 14 | — |
| WCAG | 11 | 11 | — |
| **Total** | **77** | 77 | — |

### Courses (was 72 — FIXED)
| Dim | Score | Prev | Rationale |
|-----|-------|------|-----------|
| Heuristics | 30 | 28 | +2 H3:3 (breadcrumb) H4:3 (icon containers, stagger match) |
| Aesthetics | 24 | 21 | +3 Color:3 (hero orbs) Hierarchy:3 (hero→list) Polish:3 (containers, stagger, rounded-2xl) |
| Friendly | 14 | 13 | +1 Nav:3 (breadcrumb) |
| WCAG | 10 | 10 | — |
| **Total** | **78** | 72 | **+6** |

### Course Detail
| Dim | Score | Prev | Rationale |
|-----|-------|------|-----------|
| Heuristics | 30 | 30 | — |
| Aesthetics | 23 | 23 | — |
| Friendly | 14 | 14 | — |
| WCAG | 11 | 11 | — |
| **Total** | **78** | 78 | — |

### Lesson Menu
| Dim | Score | Prev | Rationale |
|-----|-------|------|-----------|
| Heuristics | 30 | 30 | — |
| Aesthetics | 23 | 23 | — |
| Friendly | 15 | 15 | — |
| WCAG | 11 | 11 | — |
| **Total** | **79** | 79 | — |

### Kanji
| Dim | Score | Prev | Rationale |
|-----|-------|------|-----------|
| Heuristics | 29 | 29 | — |
| Aesthetics | 23 | 23 | — |
| Friendly | 13 | 13 | — |
| WCAG | 10 | 10 | — |
| **Total** | **75** | 75 | — |

### HSK
| Dim | Score | Prev | Rationale |
|-----|-------|------|-----------|
| Heuristics | 30 | 30 | — |
| Aesthetics | 23 | 23 | — |
| Friendly | 14 | 14 | — |
| WCAG | 10 | 10 | — |
| **Total** | **77** | 77 | — |

### Settings (was 72 — FIXED)
| Dim | Score | Prev | Rationale |
|-----|-------|------|-----------|
| Heuristics | 29 | 27 | +2 H4:3 (icon containers consistent) H8:3 (hero adds context, not clutter) |
| Aesthetics | 24 | 21 | +3 Color:3 (hero orbs) Hierarchy:3 (hero→sections clear) Polish:3 (icon containers on data mgmt, font cards bordered, destructive/10 accent) |
| Friendly | 14 | 13 | +1 First:3 (hero establishes "settings" context immediately) |
| WCAG | 11 | 11 | — touch:2 (checkbox wrappers 44px) |
| **Total** | **78** | 72 | **+6** |

---

## 3. Summary Table

| Screen | Heuristics | Aesthetics | Friendly | WCAG | Total | Prev | Delta |
|--------|-----------|-----------|----------|------|-------|------|-------|
| Home | 30 | 22 | 14 | 11 | 77 | 77 | — |
| Courses | 30 | 24 | 14 | 10 | 78 | 72 | +6 |
| Course Detail | 30 | 23 | 14 | 11 | 78 | 78 | — |
| Lesson Menu | 30 | 23 | 15 | 11 | 79 | 79 | — |
| Kanji | 29 | 23 | 13 | 10 | 75 | 75 | — |
| HSK | 30 | 23 | 14 | 10 | 77 | 77 | — |
| Settings | 29 | 24 | 14 | 11 | 78 | 72 | +6 |
| **Average** | **29.7** | **23.1** | **14.0** | **10.6** | **77.4** | 75.7 | **+1.7** |
| **Lowest** | 29 (Knj/Set) | 22 (Home) | 13 (Knj) | 10 (Crs/Knj/HSK) | **75 (Kanji)** | 72 | +3 |

---

## 4. Combined Score

Technical: **14/20**
Heuristics (avg): **30/40**
Aesthetics (avg): **23/28**
Friendliness (avg): **14/20**
WCAG (avg): **11/20**

**Combined: 92/128 (Good)**

---

## 5. What Changed

Courses + Settings were the 2 remaining screens without hero/orbs/breadcrumb. Now all 7 screens have consistent:
- Hero gradient with decorative orbs
- Left-aligned title
- Breadcrumb navigation
- Icon containers w-11 rounded-xl
- rounded-2xl cards with border/50
- Stagger animations

**Lowest screen: Kanji (75).** Gap reason: no descriptions on lesson rows (just title + count). Still weakest but acceptable.

---

## 6. Remaining to 108

| Points | What | Type |
|--------|------|------|
| +3 | Kanji: add descriptions to rows | CSS |
| +3 | WCAG live testing (focus, keyboard, SR) | Testing |
| +4 | Gamification system (real XP/streak logic) | Feature |
| +3 | Home Aesthetics: differentiate sections more | CSS |
| +3 | All screens: Delight 3→4 needs celebrations | Feature |

---

## Score Progression

| Run | Tech | Heuristics | Aesthetics | Friendly | WCAG | Combined | Notes |
|-----|------|-----------|-----------|----------|------|----------|-------|
| 13 | 13 | 27 | 20 | 12 | 10 | 82/128 | First strict per-screen |
| 14 | 14 | 29 | 22 | 14 | 11 | 90/128 | Post-Wave 108 |
| **15** | **14** | **30** | **23** | **14** | **11** | **92/128** | **All screens consistent** |
