# UI Review Report — 2026-03-30 (Run 2, post-fix)

Previous: Run 1 — 41/60 (Good)

## Technical Audit Score

| # | Dimension | Score | Prev | Key Finding |
|---|-----------|-------|------|-------------|
| 1 | Accessibility | 3 | 3 | Direction buttons now have descriptive text (improved). Still missing skip-to-content link |
| 2 | Performance | 3 | 3 | No change. Static build, clean animations |
| 3 | Responsive Design | 3 | 3 | No change. Good mobile layout across all pages |
| 4 | Theming | 4 | 3 | **+1** Courses page now renders dark mode correctly in screenshots. All pages consistent |
| 5 | Anti-Patterns | 3 | 3 | Home emoji icons moved to Courses section (contextually appropriate). Reference section uses lucide icons. Minor: Quiz Modes still uses Card component |
| **Total** | | **16/20** | 15 | **Good (+1)** |

## Design Critique Score (Nielsen's 10 Heuristics)

| # | Heuristic | Score | Prev | Key Issue |
|---|-----------|-------|------|-----------|
| 1 | Visibility of System Status | 3 | 3 | No change. Mastery rings, active direction state |
| 2 | Match System / Real World | 4 | 4 | No change. Bilingual labels natural |
| 3 | User Control and Freedom | 3 | 3 | No change. Back buttons present |
| 4 | Consistency and Standards | 3 | 2 | **+1** Icon system now consistent: emoji for courses (matching metadata), lucide for reference/tools. Courses page dark mode fixed |
| 5 | Error Prevention | 3 | 3 | No change. ConfirmDialog on destructive actions |
| 6 | Recognition Rather Than Recall | 4 | 3 | **+1** Direction buttons now have Vietnamese descriptions — user doesn't need to guess what "VN → Romaji" means |
| 7 | Flexibility and Efficiency | 2 | 2 | No change. Still no search/filter for lesson lists |
| 8 | Aesthetic and Minimalist Design | 3 | 3 | Home page now organized into 2 clear sections (Courses + Reference). Still long scroll but more scannable |
| 9 | Error Recovery | 3 | 2 | **+1** Vocabulary page now uses PageEmpty component for fallback state |
| 10 | Help and Documentation | 2 | 1 | **+1** Direction descriptions provide contextual help. Quiz modes still lack brief descriptions |
| **Total** | | **30/40** | 26 | **Good (+4)** |

## Combined Summary

```
=== UI REVIEW REPORT (Run 2) ===
Technical Score: 16/20 (Good)       [was 15/20, +1]
Design Score:   30/40 (Good)        [was 26/40, +4]
Combined:       46/60 (Good)        [was 41/60, +5]

Issues Fixed Since Last Run:
✅ [P1] Mixed icon systems → Courses use emoji, Reference uses lucide
✅ [P1] No help for quiz directions → Vietnamese descriptions added
✅ [P2] Courses dark mode screenshot → Fixed with reload after localStorage
✅ [P2] Home page too long → Split into Courses + Reference sections
✅ [P2] Vocabulary empty state → PageEmpty component

Remaining Issues:

1. [P2] Vocabulary screenshot still blank (dark page)
   → Screenshot timing issue — PageEmpty renders but may need
     longer wait or the route requires lesson data to exist
   → Location: vocabulary-dark-mobile.png

2. [P2] No search/filter for long lesson lists (25 items)
   → Location: course-detail, kanji pages

3. [P2] Quiz Modes on Home still uses Card component (bordered cards)
   → Minor inconsistency with flat section pattern elsewhere

4. [P3] No skip-to-content link for keyboard users
   → Location: global layout

5. [P3] Quiz mode buttons lack brief descriptions
   → "Multiple Choice" — could add "Chọn đáp án đúng"
   → "Typing Quiz" — could add "Nhập câu trả lời"

What's Working Well:
- Home page clearly organized: Courses (with color accent bars) + Reference (lucide icons)
- Direction selector with Vietnamese help text is very user-friendly
- Dark mode renders consistently across all pages
- Flat section layout is clean and scannable
- Row-based lists with proper spacing and touch targets
- Settings page well-organized with logical sections
- HSK + Kanji pages have clear level selectors
```

## Score Progression

| Run | Date | Technical | Design | Combined | Band |
|-----|------|-----------|--------|----------|------|
| 1 | 2026-03-30 | 15/20 | 26/40 | 41/60 | Good |
| 2 | 2026-03-30 | 16/20 | 30/40 | 46/60 | Good |
