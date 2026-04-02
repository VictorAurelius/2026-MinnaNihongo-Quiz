# UI Review Report — 2026-04-02 (Run 17, production post-SW-fix)

Previous: Run 16 — 92/128

---

## Deploy Status
- CI: ✅ completed success
- SW fix deployed: auto-unregister stale workers + disabled SW registration
- 28/28 production screenshots captured

## Production vs Local

| Screen | Prod | Match |
|--------|------|-------|
| Home | ✅ | ✅ |
| Courses | ✅ | ✅ |
| Course Detail | ✅ | ✅ |
| Lesson Menu | ✅ | ✅ |
| Kanji | ✅ | ✅ |
| HSK | ✅ | ✅ |
| Settings | ✅ | ✅ |

**7/7 match. No blank page issue — SW cleanup working.**

---

## Technical (14/20)

| # | Dim | Score | Rationale |
|---|-----|-------|-----------|
| 1 | Accessibility | 2 | Unverifiable from screenshots |
| 2 | Performance | 3 | Static, CSS animations only |
| 3 | Responsive | 3 | All 7 screens render well on 375px |
| 4 | Theming | 3 | Slate dark consistent |
| 5 | Anti-Patterns | 3 | Clean, no AI slop |

## Per-Screen (from production)

| Screen | Heur (/40) | Aes (/28) | Fri (/20) | WCAG (/20) | Total (/108) |
|--------|-----------|-----------|-----------|------------|-------------|
| Home | 30 | 23 | 14 | 11 | 78 |
| Courses | 30 | 24 | 14 | 10 | 78 |
| Course Detail | 30 | 23 | 14 | 11 | 78 |
| Lesson Menu | 30 | 23 | 15 | 11 | 79 |
| Kanji | 29 | 23 | 13 | 10 | 75 |
| HSK | 30 | 23 | 14 | 10 | 77 |
| Settings | 29 | 24 | 14 | 11 | 78 |
| **Avg** | **29.7** | **23.3** | **14.0** | **10.6** | **77.6** |
| **Low** | 29 | 23 | 13 (Knj) | 10 | 75 (Knj) |

## Combined: 92/128 (Good) — confirmed on production

Tech 14 + Heur 30 + Aes 23 + Fri 14 + WCAG 11 = **92/128**

## Score Progression

| Run | Tech | Heur | Aes | Fri | WCAG | Combined | Source |
|-----|------|------|-----|-----|------|----------|--------|
| ext | 14 | 27 | 19 | 14 | 10 | 84 | External |
| 13 | 13 | 27 | 20 | 12 | 10 | 82 | Local strict |
| 14 | 14 | 29 | 22 | 14 | 11 | 90 | Local |
| 15 | 14 | 30 | 23 | 14 | 11 | 92 | Local |
| 16 | 14 | 30 | 23 | 14 | 11 | 92 | Prod |
| **17** | **14** | **30** | **23** | **14** | **11** | **92** | **Prod post-SW-fix** |

## Remaining to 108

| Pts | What | Type |
|-----|------|------|
| +5 | WCAG live testing | Testing |
| +5 | Gamification (XP/streak system) | Feature |
| +3 | Kanji descriptions richer | CSS |
| +3 | Delight celebrations | Feature |
