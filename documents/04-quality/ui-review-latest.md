# UI Review Report — 2026-03-30 (Run 7, post-Wave 128)

Previous: Run 6 — 97/128

## Visual Inventory

- **Platform:** Mobile PWA (375px), dark mode
- **Design maturity:** Production
- **New components since last run:** Breadcrumb, SearchInput, welcome banner, progress bar in hero, "Gợi ý" badge, settings descriptions

---

## 1. Technical Audit (18/20)

| # | Dimension | Score | Prev | Key Finding |
|---|-----------|-------|------|-------------|
| 1 | Accessibility | 4 | 3 | **+1** Header icons now 44px (w-11 h-11). focus-visible:ring-2 on all buttons. Skip-to-content link present. aria-labels correct |
| 2 | Performance | 3 | 3 | No change. Static build, CSS transitions only |
| 3 | Responsive Design | 4 | 3 | **+1** All touch targets verified ≥44px. Search input full-width responsive. Breadcrumbs wrap on narrow screens |
| 4 | Theming | 4 | 4 | Dark mode flash fixed (blocking script in app.html). Courses page now renders dark correctly |
| 5 | Anti-Patterns | 3 | 3 | No AI slop. All components flat design. Quiz Modes cards have border now |
| **Total** | | **18/20** | 16 | **Excellent (+2)** |

## 2. Design Heuristics (37/40)

| # | Heuristic | Score | Prev | Key Issue |
|---|-----------|-------|------|-----------|
| 1 | Visibility of System Status | 4 | 3 | **+1** Progress bar in lesson hero. Next lesson highlighted on course detail. Mastery rings. Search filters reactively |
| 2 | Match System / Real World | 4 | 4 | Vietnamese labels, "Bắt đầu bài đầu tiên", "Tiếp tục học" |
| 3 | User Control and Freedom | 4 | 3 | **+1** Breadcrumbs on course-detail + lesson-menu. Back buttons. Search with clear + Escape |
| 4 | Consistency and Standards | 4 | 3 | **+1** Standardized py-5, gap-3.5, hover:bg-accent/50 across ALL pages. Consistent border-border. w-9 circles |
| 5 | Error Prevention | 3 | 3 | ConfirmDialog on Clear. Safe defaults. Search doesn't crash on empty |
| 6 | Recognition Rather Than Recall | 4 | 4 | Direction + quiz descriptions. Breadcrumbs show location. Welcome guide |
| 7 | Flexibility and Efficiency | 4 | 2 | **+2** Search/filter on course-detail + kanji. Escape to clear. Quick access via breadcrumbs |
| 8 | Aesthetic and Minimalist Design | 4 | 3 | **+1** Welcome banner concise. Breadcrumbs compact. Search bar clean. No clutter added |
| 9 | Error Recovery | 3 | 3 | PageEmpty fallbacks. No inline quiz undo yet |
| 10 | Help and Documentation | 3 | 4 | -1 (recalibrated: settings has descriptions but no tooltips on header icons. Quiz results has feedback but no "what went wrong" per question) |
| **Total** | | **37/40** | 32 | **Excellent (+5)** |

## 3. Visual Aesthetics (25/28)

| # | Dimension | Score | Prev | Key Finding |
|---|-----------|-------|------|-------------|
| 1 | **Color Harmony** | 4 | 3 | **+1** Primary/10 tint on welcome banner. Highlighted next lesson with ring-primary/20. Color accent bars. Consistent palette |
| 2 | **Typography** | 3 | 3 | Hierarchy clear. Search placeholder well-styled. Breadcrumb text proportional. Section headings text-foreground/60 better contrast |
| 3 | **Element Sizing** | 4 | 3 | **+1** ALL rows standardized py-5. Circles w-9. Header icons w-11. Search input proper height. Consistent across pages |
| 4 | **Spacing & Breathing Room** | 4 | 3 | **+1** ALL gaps gap-3.5. Section mb-6. Search bar mb-3. Breadcrumb mb-3. Nothing cramped |
| 5 | **Alignment & Grid** | 3 | 3 | max-w-2xl consistent. Left edges aligned. Breadcrumb chevrons inline. Search full-width |
| 6 | **Visual Hierarchy** | 4 | 3 | **+1** Welcome banner guides eye. "Bắt đầu bài đầu tiên" prominent CTA. "Gợi ý" badge draws attention. Progress bar in hero. Next lesson highlighted |
| 7 | **Polish & Detail** | 3 | 3 | hover:bg-accent/50 on all rows. Border-border consistent. "Gợi ý" badge white/20 bg. Breadcrumbs tasteful. Search clear button smooth. Could still add more micro-details |
| **Total** | | **25/28** | 21 | **Excellent (+4)** |

### Layout Checklist — All Pass ✅

| Check | All 7 pages |
|-------|-------------|
| Row height ≥ 48px | ✅ py-5 everywhere |
| Internal padding ≥ 16px | ✅ px-5 everywhere |
| Sibling gap ≥ 12px | ✅ gap-3.5 everywhere |
| Section gap ≥ 24px | ✅ gap-8 / mb-6 |
| Icon proportional | ✅ |
| Consistent sizing | ✅ |

## 4. User Friendliness (18/20)

| # | Dimension | Score | Prev | Key Finding |
|---|-----------|-------|------|-------------|
| 1 | **First Impression** | 4 | 3 | **+1** Welcome banner "Chào mừng! 👋" with clear guide. Stats. Two organized sections. Returning users see "Tiếp tục học" card |
| 2 | **Navigation Clarity** | 4 | 3 | **+1** Breadcrumbs on 2 key pages. Search bar for 25-lesson lists. Back buttons. ≤3 taps to quiz |
| 3 | **Action Clarity** | 4 | 4 | "Bắt đầu bài đầu tiên →" for new users. "Gợi ý" badge. All descriptions present |
| 4 | **Learning Curve** | 4 | 3 | **+1** Welcome guide tells exact flow. "Gợi ý" badge on Flashcard. Direction descriptions. Self-documenting |
| 5 | **Delight & Motivation** | 2 | 2 | Progress bar exists. "Tiếp tục học" card motivates. But still no confetti/celebration on quiz completion, no streaks |
| **Total** | | **18/20** | 15 | **Excellent (+3)** |

## 5. WCAG Accessibility (16/20)

| Status | Element | Check | WCAG | Notes |
|--------|---------|-------|------|-------|
| ✅ PASS | Header icons | Touch target 44×44px | 2.5.8 | w-11 h-11 = 44px |
| ✅ PASS | Header icons | focus-visible:ring-2 | 2.4.7 | Keyboard focus visible |
| ✅ PASS | Skip-to-content link | Present | 2.4.1 | sr-only, focus:not-sr-only |
| ✅ PASS | Hero title | Contrast ≥3:1 large text | 1.4.3 | Bold white on purple |
| ✅ PASS | Hero subtitle | Contrast improved | 1.4.3 | opacity-95 (was 90) |
| ✅ PASS | Quiz rows | Touch target ≥48px | 2.5.8 | py-5 full width |
| ✅ PASS | Direction tabs | Active not color-only | 1.4.1 | ring-2 + bold + bg |
| ✅ PASS | Radio groups | ARIA roles | 4.1.2 | role="radio" aria-checked |
| ✅ PASS | Search input | aria-label | 4.1.2 | Proper label |
| ✅ PASS | Breadcrumb | aria-label="Breadcrumb" | 1.3.1 | nav landmark |
| ⚠️ WARN | Section headings | Contrast text-foreground/60 | 1.4.3 | Improved but still ~4.2:1, borderline for small text |
| ⚠️ WARN | Direction tab unselected | Contrast text-foreground/70 | 1.4.3 | Better than muted-foreground but ~4.5:1 borderline |
| 🔍 N/A | Keyboard tab order | Needs live test | 2.4.3 | |
| 🔍 N/A | Screen reader heading hierarchy | Needs code review | 1.3.1 | |

| # | Category | Score | Prev | Rationale |
|---|----------|-------|------|-----------|
| 1 | Contrast | 3 | 3 | Zero FAIL, 2 WARNs remaining (section headings, direction tabs) |
| 2 | Touch Targets | 4 | 2 | **+2** All verified ≥44px. Header icons fixed |
| 3 | Labels & ARIA | 4 | 3 | **+1** Search input, breadcrumb nav, all icons labeled |
| 4 | Screen Reader | 3 | 3 | Needs live verification |
| 5 | Keyboard & Focus | 2 | 2 | Skip-to-content present, focus ring on header. But: search input, breadcrumb links, direction buttons need focus-visible verification |
| **Total** | | **16/20** | 13 | **Good (+3)** |

---

## Combined Summary

```
=== UI REVIEW REPORT (Run 7 — Post-Wave 128) ===
Technical:         18/20  (Excellent)    [was 16, +2]
Design Heuristics: 37/40  (Excellent)    [was 32, +5]
Visual Aesthetics: 25/28  (Excellent)    [was 21, +4]
User Friendliness: 18/20  (Excellent)    [was 15, +3]
WCAG Access:       16/20  (Good)         [was 13, +3]
Combined:          114/128 (Excellent)   [was 97, +17]

Wave 128 Impact: 6 PRs delivered +17 points

Remaining to 128:
- WCAG Contrast: section headings + direction tabs (2 WARNs, +1 possible)
- WCAG Keyboard: comprehensive focus verification (+2 possible)
- Aesthetics Typography: CJK font-display, line-height tuning (+1)
- Aesthetics Polish: micro-animations, subtle gradients (+1)
- Aesthetics Alignment: small container width differences (+1)
- Friendliness Delight: quiz celebration, streaks (+2)
- Heuristics Error Prevention: quiz undo button (+1)
- Heuristics Error Recovery: inline wrong-answer review (+1)
- Heuristics Help: header icon tooltips (+1)
- Technical Anti-Patterns: minor (quiz modes border) (+1)
```

## Score Progression

| Run | Tech (/20) | Heuristics (/40) | Aesthetics (/28) | Friendly (/20) | WCAG (/20) | Combined |
|-----|-----------|-------------------|-------------------|----------------|------------|----------|
| 1 | 15 | 26 | — | — | — | 41/60 |
| 2 | 16 | 30 | — | — | — | 46/60 |
| 3 | 16 | 30 | 14/20* | 14 | — | 74/100 |
| 4 | 16 | 30 | 18/28 | 14 | — | 78/108 |
| 5 | 16 | 32 | 21/28 | 15 | — | 84/108 |
| 6 | 16 | 32 | 21/28 | 15 | 13 | 97/128 |
| **7** | **18** | **37** | **25** | **18** | **16** | **114/128** |

**Wave 128 delivered +17 points (97→114). 14 points remaining to perfect score.**
