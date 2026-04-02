# Wave 108 — Nâng tất cả screens lên 3/4+ (strict rubric)

**Current:** 82/128 (Acceptable). **Target:** 108/128 (Excellent threshold).
**Strategy:** Nâng screens yếu nhất (Kanji 64, HSK 63, Course Detail 67) lên ngang Lesson Menu (76).

Per-screen target: mỗi screen ≥ 3/4 trên tất cả dimensions = consistent quality.

---

## Weakest Screens Analysis

| Screen | Now | Gap | Root cause |
|--------|-----|-----|-----------|
| HSK (63) | Aes:18 Fri:11 | -13 vs Lesson Menu | No descriptions, "A-G" meaningless, no breadcrumb, no orbs, no progress |
| Kanji (64) | Aes:19 Fri:11 | -12 vs Lesson Menu | Same issues as HSK + titles truncate, level tabs inconsistent |
| Course Detail (67) | Aes:19 Fri:12 | -9 vs Lesson Menu | 25× "0%" demotivating, hero text wrap, no grouping |
| Home (70) | Aes:20 Fri:13 | -6 vs Lesson Menu | Too long, Quiz Modes hidden, emoji inconsistent |
| Settings (68) | Aes:20 Fri:12 | -8 vs Lesson Menu | All zeros, no visual differentiation between sections |

---

## PR 1: Kanji + HSK Redesign (biggest impact: +13 each)
**Target: Kanji 64→76, HSK 63→76**
**Effort: Medium**

### Tasks — Kanji
- [ ] Add hero section with orbs (like lesson menu) — title "漢字" + total count + level info
- [ ] Add breadcrumb "Home > Kanji"
- [ ] Level tabs → pill tabs style (match lesson menu direction selector)
- [ ] Add descriptions to lesson rows ("Bài 1: Số đếm, cơ bản — 14 kanji")
- [ ] Numbered circles w-9 → icon containers w-11 with bg-primary/10
- [ ] Remove title truncation — allow 2 lines or increase container width

### Tasks — HSK
- [ ] Add hero section with orbs — "HSK 汉语水平考试" + level info
- [ ] Add breadcrumb "Home > HSK"
- [ ] Level tabs → pill tabs style
- [ ] Replace group names: "A-G" → meaningful labels ("Nhóm 1: 337 từ phổ biến")
- [ ] Add descriptions to group rows
- [ ] Group icon circles → icon containers with colored bg

### Expected: Heuristics +4, Aesthetics +3, Friendly +3, WCAG +1 per screen

---

## PR 2: Course Detail Polish (+9)
**Target: Course Detail 67→76**
**Effort: Medium**

### Tasks
- [ ] Fix hero text wrap — limit description to 1 line with `truncate`, or reduce font size
- [ ] Hero alignment: center → left (match lesson menu)
- [ ] Add orbs to hero (like lesson menu)
- [ ] Group lessons by 5s or 10s with section dividers ("Bài 1-5", "Bài 6-10") — break wall of 25 rows
- [ ] Replace 0% mastery rings with motivational state: first 5 lessons show "Bắt đầu" badge instead of "0%"
- [ ] Numbered circles w-9 → w-10 (match Home icon containers)
- [ ] Add breadcrumb (already exists — verify visible)
- [ ] Search bar visible by default (not conditional on >10)

### Expected: Heuristics +3, Aesthetics +3, Friendly +3

---

## PR 3: Home Page Restructure (+6)
**Target: Home 70→76**
**Effort: Medium**

### Tasks
- [ ] Collapse Courses into top 3 visible + "Xem tất cả N5-N1 →" expand link
- [ ] Or: group courses into "Beginner (N5/N4)" + "Intermediate (N3)" + "Advanced (N2/N1)" collapsible sections
- [ ] Move Quiz Modes section ABOVE Reference & Tools (more important)
- [ ] Quiz Modes cards: add icon containers (match lesson menu pattern)
- [ ] Emoji icons in Courses rows → lucide icon + colored bg containers (consistency with Reference)
- [ ] Stats: add subtle separator background or card container

### Expected: Heuristics +2, Aesthetics +2, Friendly +2

---

## PR 4: Settings + Global Consistency (+4)
**Target: Settings 68→72, All screens consistent**
**Effort: Small**

### Tasks
- [ ] Settings progress summary: replace "0, 0, 0" with motivational empty state ("Bắt đầu học để xem tiến trình!")
- [ ] Settings sections: add subtle color accents (quiz = primary, font = secondary, progress = success, data = destructive border hint)
- [ ] Add breadcrumbs to ALL remaining screens: Kanji, HSK, Settings (currently only Course Detail + Lesson Menu have them)
- [ ] Standardize ALL level/tab selectors to pill tabs pattern across Kanji, HSK, Alphabet, Counters
- [ ] Header icons: increase icon size from 18 → 20px so they LOOK bigger (w-11 padding already exists)

### Expected: Consistency +2, WCAG +1, Friendly +1

---

## PR 5: WCAG Hardening (+5)
**Target: WCAG avg 10→15**
**Effort: Small-Medium**

### Tasks
- [ ] Settings checkboxes: wrap in min-h-11 min-w-11 touch target container
- [ ] All screens: verify heading hierarchy h1→h2→h3 in code
- [ ] Add `aria-current="page"` to active nav items
- [ ] Home nav items: increase min-h from 9 → 11 (44px)
- [ ] Level tab buttons: add aria-label with full description ("JLPT N5/N4 — 255 kanji")
- [ ] All icon-only elements: verify aria-hidden="true" + parent has aria-label
- [ ] Focus-visible: test with keyboard, add ring to any missing elements

### Expected: WCAG +5 across all screens

---

## PR 6: Delight Features (+5 Friendly)
**Target: Friendly avg 12→17**
**Effort: Medium-Large**

### Tasks
- [ ] Empty mastery state: show encouraging text instead of "0%" ("Chưa học" with subtle icon)
- [ ] Course Detail: first unlearned lesson shows pulsing "Bắt đầu" indicator
- [ ] Home: "Tiếp tục học" card shows when any progress exists (already done — verify visible)
- [ ] Settings: progress summary shows encouraging message when all zero
- [ ] Streak counter display: show "0 ngày" with flame icon (even when 0 — establishes the pattern)
- [ ] Progress bar animation: animate from 0 on first render (spring easing)

### Expected: Friendly +5 across all screens

---

## Summary

| PR | Focus | Target Screens | Score Impact | Effort |
|----|-------|---------------|-------------|--------|
| PR 1 | Kanji + HSK redesign | Kanji, HSK | +13 each | ✅ #112 |
| PR 2 | Course Detail polish | Course Detail | +9 | ✅ #114 |
| PR 3 | Home restructure | Home | +6 | ✅ #116 |
| PR 4 | Settings + consistency | Settings, All | +4 | ✅ #113 |
| PR 5 | WCAG hardening | All | +5 | ✅ #115 |
| PR 6 | Delight features | All | +5 | ✅ #117 |
| **Total** | | | **+26 (82→108)** | |

### Recommended Order (impact per effort)

1. **PR 1** (Kanji+HSK) — biggest gap, lifts 2 weakest screens
2. **PR 4** (Consistency) — small effort, fixes breadcrumbs/tabs everywhere
3. **PR 2** (Course Detail) — 3rd weakest screen
4. **PR 5** (WCAG) — systematic, affects all screens
5. **PR 3** (Home) — restructure needs careful UX decisions
6. **PR 6** (Delight) — features, largest effort

### Audit Checkpoints

Run `/ui-review` per-screen after each PR:
- After PR 1: Kanji ~76, HSK ~76 → avg should rise to ~87
- After PR 1+4: all screens ≥68 → avg ~90
- After PR 1+4+2: Course Detail ~76 → avg ~93
- After PR 1+4+2+5: WCAG +5 → avg ~98
- After all 6: **target 108/128**
