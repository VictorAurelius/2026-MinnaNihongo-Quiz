# UI Review Report — 2026-03-31 (Run 11, post-visual uplift PR #108)

Previous: Run 10 — 93/128 (strict)

---

## 1. Technical Audit (15/20)

| # | Dimension | Score | Prev | Key Finding |
|---|-----------|-------|------|-------------|
| 1 | Accessibility | 2 | 2 | Cannot verify ARIA/focus from screenshots. Cap at 2 |
| 2 | Performance | 3 | 3 | blur-2xl on decorative orbs — CSS only, no jank risk. No layout thrashing |
| 3 | Responsive Design | 3 | 3 | Mobile layout good. Cards rounded-2xl still fit. Overflow hidden on hero |
| 4 | Theming | 4 | 4 | Dark mode consistent. Orbs bg-white/10 work in both themes |
| 5 | Anti-Patterns | 3 | 3 | Decorative orbs are subtle, not glassmorphism. Pill tabs are clean pattern |
| **Total** | | **15/20** | 15 | **Good (unchanged)** |

## 2. Design Heuristics (32/40)

| # | Heuristic | Score | Prev | Key Finding |
|---|-----------|-------|------|-------------|
| 1 | Visibility of System Status | 3 | 3 | Progress bar now clearer ("Tiến độ / 0%" side-by-side). Active tab in pill container stands out better |
| 2 | Match System / Real World | 4 | 4 | No change |
| 3 | User Control and Freedom | 3 | 3 | No change |
| 4 | Consistency and Standards | 3 | 3 | rounded-2xl now consistent across all pages. Icon containers on quiz cards match Reference section pattern. Pill tabs clean |
| 5 | Error Prevention | 2 | 2 | Unverifiable |
| 6 | Recognition Rather Than Recall | 3 | 3 | No change |
| 7 | Flexibility and Efficiency | 3 | 3 | No change |
| 8 | Aesthetic and Minimalist Design | 4 | 3 | **+1** Hero orbs add depth without clutter. Pill tabs cleaner than bordered buttons. Icon containers elevate card quality. border-border/50 softer |
| 9 | Error Recovery | 2 | 2 | Unverifiable |
| 10 | Help and Documentation | 3 | 3 | No change |
| **Total** | | **32/40** | 31 | **Good (+1)** |

## 3. Visual Aesthetics (24/28)

| # | Dimension | Score | Prev | Key Finding |
|---|-----------|-------|------|-------------|
| 1 | Color Harmony | 4 | 3 | **+1** Hero orbs add subtle depth. Icon containers with section colors (primary/10, success/10, warning/10) create color coding. border-border/50 softer. Pill tab bg-muted wrapper adds layering |
| 2 | Typography | 3 | 3 | No change. Hierarchy clear, drop-shadow on hero text |
| 3 | Element Sizing | 3 | 3 | Icon containers w-11 h-11 on quiz cards — visually substantial. But kanji/course-detail numbered circles (w-9) still slightly smaller |
| 4 | Spacing & Breathing Room | 3 | 3 | No change. gap-3.5 standard, pill tab has p-1.5 padding |
| 5 | Alignment & Grid | 3 | 3 | Icon containers create consistent left edge on lesson menu. Home emoji container w-10 close to Reference w-10 |
| 6 | Visual Hierarchy | 4 | 3 | **+1** Flashcard CTA with icon container + "Gợi ý" badge in primary bg clearly dominates. Grammar/Materials have distinct colored icons (green/orange). Pill tabs differentiate clearly from content below |
| 7 | Polish & Detail | 4 | 3 | **+1** Hero decorative orbs = depth. Icon containers with group-hover color transition. rounded-2xl consistent. border/50 softer. Pill wrapper adds visual grouping. Overall feels crafted, not flat |
| **Total** | | **24/28** | 21 | **Good (+3)** |

### Layout Checklist — All Pass ✅

## 4. User Friendliness (14/20)

| # | Dimension | Score | Prev | Key Finding |
|---|-----------|-------|------|-------------|
| 1 | First Impression | 3 | 3 | Home unchanged. Welcome banner still good |
| 2 | Navigation Clarity | 3 | 3 | No change |
| 3 | Action Clarity | 3 | 3 | Icon containers make quiz cards more "tappable looking" |
| 4 | Learning Curve | 3 | 3 | No change |
| 5 | Delight & Motivation | 2 | 2 | Hero looks nicer but still no XP/streaks/confetti |
| **Total** | | **14/20** | 14 | **Good (unchanged)** |

## 5. WCAG Accessibility (12/20)

| # | Category | Score | Prev | Key Finding |
|---|----------|-------|------|-------------|
| 1 | Contrast | 3 | 3 | Hero subtitle readable with drop-shadow. Section headings /70. Pill tab inactive text visible against muted bg |
| 2 | Touch Targets | 2 | 2 | Header icons still visually small. Quiz cards now have larger icon containers but tap area was already adequate |
| 3 | Labels & ARIA | 2 | 2 | Unverifiable from screenshots |
| 4 | Screen Reader | 2 | 2 | Unverifiable |
| 5 | Keyboard & Focus | 3 | 3 | No change |
| **Total** | | **12/20** | 12 | **Acceptable (unchanged)** |

---

## Combined Summary

```
=== UI REVIEW REPORT (Run 11 — Post Visual Uplift) ===
Technical:         15/20  (Good)         [unchanged]
Design Heuristics: 32/40  (Good)         [was 31, +1]
Visual Aesthetics: 24/28  (Good)         [was 21, +3]
User Friendliness: 14/20  (Good)         [unchanged]
WCAG Access:       12/20  (Acceptable)   [unchanged]
Combined:          97/128 (Good)         [was 93, +4]

Visual Uplift Impact: +4 points
- Aesthetics Color +1 (orbs, colored icon containers)
- Aesthetics Hierarchy +1 (CTA dominance, section color coding)
- Aesthetics Polish +1 (orbs, rounded-2xl, softer borders)
- Heuristics Minimalist +1 (pill tabs cleaner)

Remaining to improve:
- Delight (+2): gamification features (XP, streaks, confetti)
- WCAG (+3-5): needs live testing, not screenshot-verifiable
- Error Prevention/Recovery (+2): quiz undo, inline review
- Help (+1): header tooltips
```

## Score Progression

| Run | Tech (/20) | Heuristics (/40) | Aesthetics (/28) | Friendly (/20) | WCAG (/20) | Combined | Notes |
|-----|-----------|-------------------|-------------------|----------------|------------|----------|-------|
| 6 | 16 | 32 | 21 | 15 | 13 | 97/128 | First /128 |
| 10 | 15 | 31 | 21 | 14 | 12 | 93/128 | Strict recalibration |
| **11** | **15** | **32** | **24** | **14** | **12** | **97/128** | **Post visual uplift** |
