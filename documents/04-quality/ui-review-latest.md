# UI Review Report — 2026-03-31 (Run 14, post-Wave 108)

Previous: Run 13 — 82/128 (strict v2 per-screen)

---

## 1. Technical Audit — App-wide (14/20)

| # | Dimension | Score | Prev | Delta |
|---|-----------|-------|------|-------|
| 1 | Accessibility | 2 | 2 | — Unverifiable from screenshots |
| 2 | Performance | 3 | 3 | — Stagger animations CSS-only |
| 3 | Responsive Design | 3 | 2 | **+1** Home nav now scrolls (no wrap). Hero left-align works on mobile |
| 4 | Theming | 3 | 3 | — Slate dark consistent. But Courses page still renders slightly different tone |
| 5 | Anti-Patterns | 3 | 3 | — Clean design, stagger + orbs tasteful |
| **Total** | | **14/20** | 13 | **+1** |

---

## 2. Per-Screen Scores

### Home (was 70)
| Dim | Score | Prev | Delta | Rationale |
|-----|-------|------|-------|-----------|
| Heuristics | 30 | 27 | +3 | H7:3 (courses collapsed, less scroll) H8:3 (Quiz Modes visible mid-page now) H10:3 (welcome guide) |
| Aesthetics | 22 | 20 | +2 | Hierarchy:3 (courses→quiz→reference flow clear) Polish:3 (icon containers w-11 consistent, rounded-2xl) |
| Friendly | 14 | 13 | +1 | Nav:3 (less scroll, Quiz Modes visible) |
| WCAG | 11 | 10 | +1 | Touch:2 (nav items min-h-11) Labels:2 (stats dl/dt/dd) |
| **Screen total** | **77** | 70 | **+7** |

### Courses (was 72)
| Dim | Score | Prev | Delta | Rationale |
|-----|-------|------|-------|-----------|
| Heuristics | 28 | 28 | — | No changes to this page |
| Aesthetics | 21 | 21 | — | |
| Friendly | 13 | 13 | — | |
| WCAG | 10 | 10 | — | |
| **Screen total** | **72** | 72 | **—** |

### Course Detail (was 67)
| Dim | Score | Prev | Delta | Rationale |
|-----|-------|------|-------|-----------|
| Heuristics | 30 | 26 | +4 | H1:3 (grouped lessons, "Tiếp" badge) H4:3 (icon containers consistent) H6:3 (groups "Bài 1-5") H8:3 (no wall of 25 rows) |
| Aesthetics | 23 | 19 | +4 | Typo:3 (hero left 22px, no wrap) Sizing:3 (w-11 containers) Hierarchy:3 (groups break monotony) Polish:3 (stagger, orbs) |
| Friendly | 14 | 12 | +2 | First:3 ("Bắt đầu bài đầu tiên" + grouped) Delight:2 (0% hidden, "Tiếp" badge) |
| WCAG | 11 | 10 | +1 | SR:2 (h2 headings on groups) |
| **Screen total** | **78** | 67 | **+11** |

### Lesson Menu (was 76)
| Dim | Score | Prev | Delta | Rationale |
|-----|-------|------|-------|-----------|
| Heuristics | 30 | 29 | +1 | H1:3 (streak + XP badges in hero) |
| Aesthetics | 23 | 22 | +1 | Polish:3 (streak/XP badges add visual interest to hero) |
| Friendly | 15 | 14 | +1 | Delight:3 (streak "🔥 0 ngày" + "⭐ +50 XP" visible — establishes pattern even at 0) |
| WCAG | 11 | 11 | — | |
| **Screen total** | **79** | 76 | **+3** |

### Kanji (was 64)
| Dim | Score | Prev | Delta | Rationale |
|-----|-------|------|-------|-----------|
| Heuristics | 29 | 25 | +4 | H3:3 (breadcrumb) H4:3 (pill tabs match lesson menu) H6:3 (titles don't truncate) H7:3 (search) |
| Aesthetics | 23 | 19 | +4 | Color:3 (hero orbs) Sizing:3 (w-11 containers) Hierarchy:3 (hero + pill tabs + list) Polish:3 (stagger) |
| Friendly | 13 | 11 | +2 | Nav:3 (breadcrumb) Learn:2 (still no descriptions on rows) |
| WCAG | 10 | 9 | +1 | Labels:2 (aria-label on tabs) Focus:2 (focus-visible on tabs) |
| **Screen total** | **75** | 64 | **+11** |

### HSK (was 63)
| Dim | Score | Prev | Delta | Rationale |
|-----|-------|------|-------|-----------|
| Heuristics | 30 | 25 | +5 | H3:3 (breadcrumb) H4:3 (pill tabs) H6:3 (descriptions per group!) H7:3 (count pills) H10:3 (descriptions) |
| Aesthetics | 23 | 18 | +5 | Color:3 (hero teal→purple) Sizing:3 (w-12 containers) Hierarchy:3 (hero + descriptions + pills) Polish:3 (stagger, rounded-xl) |
| Friendly | 14 | 11 | +3 | Nav:3 (breadcrumb) Learn:3 (descriptions explain groups) Action:3 (count pills show content) |
| WCAG | 10 | 9 | +1 | Labels:2 (aria-label on tabs) |
| **Screen total** | **77** | 63 | **+14** |

### Settings (was 68)
| Dim | Score | Prev | Delta | Rationale |
|-----|-------|------|-------|-----------|
| Heuristics | 27 | 26 | +1 | H3:3 (breadcrumb added) |
| Aesthetics | 21 | 20 | +1 | Polish:3 (rounded-2xl container, motivational empty state) |
| Friendly | 13 | 12 | +1 | First:3 ("Bắt đầu học để xem tiến trình!") |
| WCAG | 11 | 10 | +1 | Touch:2 (checkbox 44px wrapper) SR:2 (h2 headings) |
| **Screen total** | **72** | 68 | **+4** |

---

## 3. Per-Screen Summary

| Screen | Heuristics (/40) | Aesthetics (/28) | Friendly (/20) | WCAG (/20) | Total (/108) | Prev | Delta |
|--------|-------------------|-------------------|----------------|------------|-------------|------|-------|
| Home | 30 | 22 | 14 | 11 | 77 | 70 | +7 |
| Courses | 28 | 21 | 13 | 10 | 72 | 72 | — |
| Course Detail | 30 | 23 | 14 | 11 | 78 | 67 | +11 |
| Lesson Menu | 30 | 23 | 15 | 11 | 79 | 76 | +3 |
| Kanji | 29 | 23 | 13 | 10 | 75 | 64 | +11 |
| HSK | 30 | 23 | 14 | 10 | 77 | 63 | +14 |
| Settings | 27 | 21 | 13 | 11 | 72 | 68 | +4 |
| **Average** | **29.1** | **22.3** | **13.7** | **10.6** | **75.7** | 68.6 | **+7.1** |
| **Lowest** | 27 (Set) | 21 (Crs/Set) | 13 (Crs/Knj/Set) | 10 (Crs/Knj/HSK) | 72 (Crs/Set) | 63 | +9 |

---

## 4. Combined Score

Technical (app-wide): **14/20**
Heuristics (avg): **29/40**
Aesthetics (avg): **22/28**
Friendliness (avg): **14/20**
WCAG (avg): **11/20**

**Combined: 90/128 (Good)**

---

## 5. Top 3 Issues

### 1. Courses page unchanged — lowest screen (72/108)
No hero, no breadcrumbs, no orbs, no descriptions. Only page without visual uplift.

### 2. WCAG still low (avg 10.6/20) — unverifiable from screenshots
Focus indicators, keyboard nav, screen reader — all capped at 2. Needs live testing.

### 3. Friendly Delight still 2/4 on most screens
Streak/XP badges visible on Lesson Menu but static "0". No actual gamification system behind them yet.

---

## Score Progression

| Run | Tech (/20) | Heuristics (/40) | Aesthetics (/28) | Friendly (/20) | WCAG (/20) | Combined | Notes |
|-----|-----------|-------------------|-------------------|----------------|------------|----------|-------|
| ext | 14 | 27 | 19 | 14 | 10 | 84/128 | External (lesson menu) |
| ext2 | 14 | 29 | 19 | 14 | 13 | 89/128 | External (home) |
| 13 | 13 | 27 | 20 | 12 | 10 | 82/128 | First strict per-screen |
| **14** | **14** | **29** | **22** | **14** | **11** | **90/128** | **Post-Wave 108** |

**Wave 108 delivered +8 points (82→90).** Lowest screen lifted from 63 to 72. Average screen from 68.6 to 75.7.
