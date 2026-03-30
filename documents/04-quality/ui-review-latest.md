# UI Review Report — 2026-03-30

## Technical Audit Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3 | ARIA roles on radio groups, semantic HTML. Missing: skip-to-content link, some touch targets borderline 44px |
| 2 | Performance | 3 | Static build, no layout thrashing. Missing: image lazy-load (N/A — no images), will-change on animated elements |
| 3 | Responsive Design | 3 | Mobile-first, good breakpoints. Kanji page title truncates on narrow screens. Course detail rows truncate well |
| 4 | Theming | 3 | Full dark/light via CSS tokens. Courses page screenshot shows light mode (inconsistent capture). HSK cards use opaque bg-primary/80 — good contrast |
| 5 | Anti-Patterns | 3 | No glassmorphism, no gradient text, no hero metrics grid. Minor: emoji icons on Home (📕📗) instead of proper icon library. Quiz Modes section uses Card component (bordered cards pattern) |
| **Total** | | **15/20** | **Good** |

## Design Critique Score (Nielsen's 10 Heuristics)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Mastery rings on course detail show progress. No loading states visible. Direction selector has clear active state |
| 2 | Match System / Real World | 4 | Japanese/Vietnamese bilingual labels natural for target users. "Bài 1", "từ vựng", "ngữ pháp" match learner vocabulary |
| 3 | User Control and Freedom | 3 | Back buttons present on all sub-pages. No undo for "Clear All Progress" beyond confirm dialog |
| 4 | Consistency and Standards | 2 | **Key issue**: Courses page renders in light mode while rest is dark. Row styles differ across pages (some have borders, some don't). Home uses emoji icons while lesson menu uses lucide icons |
| 5 | Error Prevention | 3 | Destructive "Clear All Progress" has ConfirmDialog. Quiz direction defaults to ja-vi (safe default) |
| 6 | Recognition Rather Than Recall | 3 | Section headings (DIRECTION, QUIZ MODES, GRAMMAR) help orientation. Lesson numbers visible. ChevronRight indicates navigability |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts visible on these screens. No search/filter for 25-lesson lists. No "jump to lesson" |
| 8 | Aesthetic and Minimalist Design | 3 | Clean flat sections, good use of whitespace. Settings page well-organized. Lesson menu is clean. Minor: Home page has 10 items in "Start Learning" — long scroll |
| 9 | Error Recovery | 2 | No visible error states in screenshots. Vocabulary page blank (no graceful empty state shown) |
| 10 | Help and Documentation | 1 | No onboarding, no tooltips, no help text explaining quiz modes or directions. New users may not understand "VN → Romaji" |
| **Total** | | **26/40** | **Acceptable** |

## Combined Summary

```
=== UI REVIEW REPORT ===
Technical Score: 15/20 (Good)
Design Score:   26/40 (Acceptable)
Combined:       41/60 (Good)

Top 5 Issues (P0-P1):

1. [P1] Inconsistent theming: Courses page captures in light mode
   while app is dark — screenshot script or theme detection issue
   → Location: courses-dark-mobile.png

2. [P1] No help/onboarding: Quiz directions (ja-vi, vi-ja, vi-romaji)
   have no explanation for new users
   → Location: lesson-menu, all quiz entry points

3. [P1] Mixed icon systems: Home uses emoji (📕📗漢あ文数中試),
   Lesson menu uses lucide icons — visual inconsistency
   → Location: home vs lesson-menu

4. [P2] Long Start Learning list: 10 items requires scrolling past
   fold on mobile to reach Quiz Modes section
   → Location: home-dark-mobile.png

5. [P2] Vocabulary page blank: No graceful empty/loading state
   → Location: vocabulary-dark-mobile.png

What's Working Well:
- Flat section layout with uppercase headings is clean and consistent
- Direction selector with active state is clear
- Mastery rings on course detail provide progress feedback
- Gradient headers on course/lesson pages create visual hierarchy
- Row-based lists with numbered circles + chevrons work well
- Settings page organization is logical and spacious
- Dark mode colors are comfortable (not too contrasty)
- Touch targets are generally adequate (py-4 to py-5 padding)

Recommended Next Actions:
1. Fix screenshot capture for Courses page (theme detection)
2. Add brief help text/tooltips for quiz directions
3. Migrate Home page emoji icons to lucide or consistent icon set
4. Consider collapsible sections or categories on Home page
5. Add empty state component for Vocabulary page
6. Run /polish for final consistency pass
```

## Detailed Findings

### P1 Issues

**[P1] Inconsistent icon system**
- Location: `routes/+page.svelte` (Home) vs `routes/course/[courseId]/lesson/[id]/+page.svelte` (Lesson Menu)
- Impact: Home uses emoji characters (📕, 漢, あ, 文, 数, 中, 試) while Lesson Menu uses lucide-svelte icons (Layers, CheckCircle, Keyboard, BookOpen, Book, PenLine). Creates visual inconsistency between pages.
- Recommendation: Replace emoji icons on Home with a consistent icon set (lucide or custom SVG icons in colored containers)

**[P1] No contextual help for quiz features**
- Location: Lesson menu direction selector, quiz mode buttons
- Impact: "VN → Romaji", "Multiple Choice", "Typing Quiz" — new users may not understand what these do or which to choose
- Recommendation: Add subtle description text below direction buttons or quiz mode names

### P2 Issues

**[P2] Courses page theme mismatch in capture**
- Location: `courses-dark-mobile.png` renders in light mode
- Impact: Screenshot evidence inconsistency. May indicate theme detection issue in the app or capture script
- Recommendation: Investigate `capture-screenshots.ts` localStorage dark mode injection for courses route

**[P2] Home page information density**
- Location: `home-dark-mobile.png`
- Impact: 10 "Start Learning" items + Quiz Modes section = user must scroll significantly. Quiz Modes section barely visible above fold
- Recommendation: Group courses (N5-N1) into expandable section, or show only primary courses with "See all" link

**[P2] Vocabulary empty state**
- Location: `vocabulary-dark-mobile.png`
- Impact: Blank white page — no guidance for user
- Recommendation: Use PageEmpty component with call-to-action

### Positive Patterns to Maintain

1. **Flat section layout** — uppercase headings + content without Card wrappers looks professional
2. **Gradient headers** — course/lesson headers with BackButton in flow create strong visual anchoring
3. **Consistent row pattern** — numbered circle + text + chevron is readable and touch-friendly
4. **Settings page** — clean organization, logical sections, good spacing
5. **Dark mode palette** — comfortable purple-tinted dark with good text contrast
