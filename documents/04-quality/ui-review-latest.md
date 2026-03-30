# UI Review Report — 2026-03-30 (Run 4, expanded aesthetics)

Previous: Run 3 — 74/100 (old aesthetics /20)

## Technical Audit (16/20)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3 | ARIA roles on radio groups. Missing skip-to-content |
| 2 | Performance | 3 | Static build, clean animations |
| 3 | Responsive Design | 3 | Mobile-first, good breakpoints |
| 4 | Theming | 4 | Full dark/light tokens, consistent across all pages |
| 5 | Anti-Patterns | 3 | No AI slop. Quiz Modes still Card-based |
| **Total** | | **16/20** | **Good** |

## Design Heuristics (30/40)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Mastery rings, active states |
| 2 | Match System / Real World | 4 | Bilingual labels natural |
| 3 | User Control and Freedom | 3 | Back buttons, confirm dialogs |
| 4 | Consistency and Standards | 3 | Consistent row pattern, icon split |
| 5 | Error Prevention | 3 | Safe defaults, ConfirmDialog |
| 6 | Recognition Rather Than Recall | 4 | Vietnamese direction descriptions |
| 7 | Flexibility and Efficiency | 2 | No search/filter for long lists |
| 8 | Aesthetic and Minimalist Design | 3 | Clean sections, good whitespace |
| 9 | Error Recovery | 3 | PageEmpty fallback |
| 10 | Help and Documentation | 2 | Direction help good, quiz modes lack descriptions |
| **Total** | | **30/40** | **Good** |

## Visual Aesthetics (18/28)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | **Color Harmony** | 3 | Purple primary + teal accent harmonious. Dark mode comfortable (warm dark, not pure black). Course color bars add identity. HSK purple icons vibrant |
| 2 | **Typography** | 3 | Clear heading/body hierarchy (text-lg headings, text-sm body). Japanese text readable at current size. Section headings (uppercase tracking-wider) are clean. Font sizes could be slightly larger on some labels |
| 3 | **Element Sizing** | 3 | Rows have py-4 to py-5 — adequate tap targets (~48-56px). Direction buttons py-3 with description text — comfortable height. Numbered circles w-8 h-8 — proportional to row text. Icons size 16-20 proportional. **But**: Settings quiz rows feel slightly thin compared to Data Management rows. Kanji/course-detail rows (py-4) slightly shorter than Home/HSK rows (py-5) — inconsistent |
| 4 | **Spacing & Breathing Room** | 3 | Section gaps gap-8 (32px) — clear separation. Row gaps gap-2.5 to gap-3.5 — adequate. Internal padding px-4 to px-5 — text not touching edges. **But**: Lesson menu direction section still feels close to header gradient. Some pages use gap-2.5 (kanji, course-detail) while others use gap-3.5 (home, settings) — inconsistent |
| 5 | **Alignment & Grid** | 3 | Left edges aligned consistently. Content blocks same width (max-w-xl/2xl). Numbered circles create a clean vertical rhythm. ChevronRight aligned right. **But**: Home page Reference icons (lucide in containers) vs Course emoji — different left-edge widths |
| 6 | **Visual Hierarchy** | 2 | Gradient headers anchor pages well. Flashcard CTA (primary bg) stands out. Numbered circles guide eye. **But**: Home "Courses" section has 5 same-weight rows → then "Reference" has 6 more same-weight rows = 11 total items with flat hierarchy. Within lesson menu, all quiz/grammar/materials rows are same visual weight — no differentiation except Flashcard CTA |
| 7 | **Polish & Detail** | 1 | Rounded corners consistent (rounded-xl). Shadows minimal (shadow-sm). **But**: Direction buttons are flat plain rectangles. Settings rows have no visual differentiation. No subtle gradients, no icon background variations, no border accents on rows. Quiz Modes cards (Home) look generic. Overall feels functional/template-like rather than crafted. Missing the "last 10%" that makes design feel premium |
| **Total** | | **18/28** | **Acceptable** |

### Layout Checklist

| Check | Home | Courses | Course Detail | Lesson Menu | Kanji | HSK | Settings |
|-------|------|---------|--------------|-------------|-------|-----|----------|
| Row height ≥ 48px | ✅ py-5 | ✅ py-5 | ✅ py-4 | ✅ py-5 | ✅ py-4 | ✅ py-5 | ✅ py-5 |
| Internal padding ≥ 16px | ✅ px-5 | ✅ px-5 | ✅ px-4 | ✅ px-5 | ✅ px-4 | ✅ px-5 | ✅ px-5 |
| Sibling gap ≥ 12px | ✅ gap-3.5 | ✅ gap-3.5 | ⚠️ gap-2.5 | ✅ gap-3.5 | ⚠️ gap-2.5 | ✅ gap-3.5 | ✅ gap-3.5 |
| Section gap ≥ 24px | ✅ mb-6 | N/A | N/A | ✅ gap-8 | N/A | N/A | ✅ gap-8 |
| Icon proportional | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Consistent sizing | ⚠️ | ✅ | ⚠️ py-4 | ✅ | ⚠️ py-4 | ✅ | ✅ |

**Key findings**: Course-detail and Kanji pages have shorter rows (py-4, gap-2.5) than other pages (py-5, gap-3.5). Should standardize.

## User Friendliness (14/20)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | **First Impression** | 3 | Clear purpose, stats build credibility, 2 sections help orientation |
| 2 | **Navigation Clarity** | 3 | Back buttons, header nav, ≤3 taps to quiz |
| 3 | **Action Clarity** | 3 | ChevronRight, primary CTA styling, direction descriptions |
| 4 | **Learning Curve** | 3 | 4 taps to first quiz, directions self-explanatory |
| 5 | **Delight & Motivation** | 2 | Mastery rings exist but no celebration, no streaks, all 0% discouraging |
| **Total** | | **14/20** | **Good** |

## Combined Summary

```
=== UI REVIEW REPORT (Run 4) ===
Technical:         16/20 (Good)
Design Heuristics: 30/40 (Good)
Visual Aesthetics: 18/28 (Acceptable)
User Friendliness: 14/20 (Good)
Combined:          78/108 (Good)

Top Issues:

1. [P1] Polish gap (Aesthetics 7: 1/4)
   App looks functional but not crafted. Direction buttons,
   settings rows, quiz cards are plain rectangles with no
   visual personality. Missing subtle details that elevate.

2. [P2] Visual hierarchy flat (Aesthetics 6: 2/4)
   Home has 11 same-weight rows. Lesson menu items all
   same visual weight except Flashcard CTA.

3. [P2] Inconsistent row sizing across pages
   Course-detail & Kanji: py-4, gap-2.5
   Home, HSK, Settings, Lesson: py-5, gap-3.5
   Should standardize to larger size.

4. [P2] Delight & Motivation (Friendliness 5: 2/4)
   No celebration, no streaks, no encouraging messages.

5. [P3] Quiz mode buttons lack descriptions

What's Working Well:
- Color palette harmonious and comfortable
- Typography hierarchy clear
- Element sizing adequate for touch (≥48px)
- Section separation strong (gap-8)
- Vietnamese direction descriptions excellent
- Mobile layout clean and scannable
```

## Score Progression

| Run | Tech (/20) | Heuristics (/40) | Aesthetics | Friendliness (/20) | Combined |
|-----|-----------|-------------------|------------|---------------------|----------|
| 1 | 15 | 26 | — | — | 41/60 |
| 2 | 16 | 30 | — | — | 46/60 |
| 3 | 16 | 30 | 14/20 | 14 | 74/100 |
| 4 | 16 | 30 | 18/28 | 14 | **78/108** |
