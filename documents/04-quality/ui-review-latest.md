# UI Review Report — 2026-03-30 (Run 3, new scoring system)

Previous: Run 2 — 46/60 (old system, no aesthetics/friendliness)

## Technical Audit (16/20)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3 | ARIA roles on radio groups, semantic HTML. Missing: skip-to-content link |
| 2 | Performance | 3 | Static build, no layout thrashing, clean CSS animations |
| 3 | Responsive Design | 3 | Mobile-first, proper breakpoints. Kanji titles truncate gracefully |
| 4 | Theming | 4 | Full dark/light via CSS tokens. All pages render consistently |
| 5 | Anti-Patterns | 3 | No glassmorphism/gradient text. Quiz Modes section still uses Card component |
| **Total** | | **16/20** | **Good** |

## Design Heuristics (30/40)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Mastery rings show progress. Active direction state clear. No loading indicators |
| 2 | Match System / Real World | 4 | Bilingual labels natural for Vietnamese learners |
| 3 | User Control and Freedom | 3 | Back buttons everywhere. Confirm on destructive actions |
| 4 | Consistency and Standards | 3 | Emoji for courses, lucide for reference. Consistent row pattern |
| 5 | Error Prevention | 3 | ConfirmDialog on clear. Safe defaults |
| 6 | Recognition Rather Than Recall | 4 | Vietnamese direction descriptions. Section headings. Numbered lessons |
| 7 | Flexibility and Efficiency | 2 | No search/filter for 25-lesson lists. No keyboard shortcuts shown |
| 8 | Aesthetic and Minimalist Design | 3 | Clean flat sections. Good whitespace. Two clear Home sections |
| 9 | Error Recovery | 3 | PageEmpty fallback. No inline error recovery for quiz |
| 10 | Help and Documentation | 2 | Direction descriptions help. Quiz modes still lack descriptions |
| **Total** | | **30/40** | **Good** |

## Visual Aesthetics (14/20)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | **Color Harmony** | 3 | Purple primary + teal accent work well. Dark mode is comfortable, not too contrasty. HSK purple group icons are vibrant. Course color accent bars add visual interest |
| 2 | **Typography** | 3 | Clear heading/body hierarchy. Japanese text readable. Section headings (uppercase, tracking-wider) are clean. But font sizes feel small on some screens (settings labels, kanji subtitles) |
| 3 | **Spacing & Alignment** | 3 | Recent padding increases helped significantly. Section gaps (gap-8) create clear separation. Within-row spacing (gap-4, py-5) is comfortable. Kanji/course detail rows slightly tighter than home rows |
| 4 | **Visual Hierarchy** | 3 | Eye flows: header → sections → rows. Flashcard CTA (primary bg) stands out on lesson menu. Numbered circles anchor lesson lists. But Home page has 11 same-weight rows before Quiz Modes — hierarchy flat |
| 5 | **Polish & Detail** | 2 | Rounded corners consistent (rounded-xl). Shadows subtle (shadow-sm). But: no hover state visual feedback in screenshots (can't verify). Direction buttons look plain. Settings quiz rows lack visual divider emphasis. Overall feels functional but not "premium" — missing micro-details like subtle gradients, icon backgrounds, or accent details that elevate design |
| **Total** | | **14/20** | **Good** |

### Aesthetics Details

**What looks good:**
- Gradient headers on course/lesson pages — strong visual anchoring
- Color accent bars on course rows (Home) — connects visually to course identity
- Lucide icons in rounded containers (Reference section) — clean, professional
- HSK level selector with active purple highlight
- Dark mode background tone (not pure black, slightly warm)

**What needs improvement:**
- Settings page feels plain — rows lack visual personality, just text + control
- Quiz Modes cards (Home) are generic Card components — don't match the flat design language
- Direction buttons are flat colored rectangles — could benefit from icon or visual cue
- No subtle background textures or patterns — every section looks identical structurally
- Level selector tabs (Kanji, HSK) look like basic pills — could be more polished

## User Friendliness (14/20)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | **First Impression** | 3 | Home page communicates "Japanese & Chinese learning" immediately. Stats row (95 lessons, 3904+ words) builds credibility. "Courses" vs "Reference & Tools" split helps orientation. But hero section is text-heavy — no illustration or visual hook |
| 2 | **Navigation Clarity** | 3 | Back buttons present everywhere. Header nav has page links. Course → Lesson → Quiz flow is logical (≤3 taps to quiz). But: no breadcrumbs, "Course" title on course-detail doesn't show which course on narrow screens |
| 3 | **Action Clarity** | 3 | ChevronRight on every row says "tap me". Flashcard Quiz has primary CTA styling. "Continue — Bài 1 →" button is clear. Direction buttons with Vietnamese descriptions are helpful. But: "Multiple Choice" and "Typing Quiz" have no description of what happens |
| 4 | **Learning Curve** | 3 | A Vietnamese student can open app → tap Minna no Nihongo → tap Bài 1 → see directions explained → start Flashcard Quiz in 4 taps. Direction descriptions ("Xem tiếng Nhật, trả lời tiếng Việt") are excellent. But no onboarding for first-time users |
| 5 | **Delight & Motivation** | 2 | Mastery rings show progress. Stats on home build aspiration. But: no celebration on quiz completion (in screenshots), no streaks, no encouraging messages, no progress milestones. App feels informational rather than motivating. Empty progress (all 0%) can feel discouraging |
| **Total** | | **14/20** | **Good** |

### Friendliness Details

**What works for users:**
- Vietnamese descriptions on direction buttons — removes guessing
- Logical course → lesson → quiz flow
- Mastery percentage visible on every lesson row
- Clean, non-overwhelming layout per screen
- "Continue — Bài 1 →" CTA guides returning users

**What could frustrate users:**
- All lessons show "0%" — no sense of "start here" beyond Continue button
- No "what quiz mode should I pick?" guidance
- Settings page doesn't explain what Auto-speak or Show English do
- No progress celebration or encouraging copy anywhere
- HSK groups named "A-G", "G-M" etc. — meaningless to learners (pinyin range?)

## Combined Summary

```
=== UI REVIEW REPORT (Run 3) ===
Technical:         16/20 (Good)
Design Heuristics: 30/40 (Good)
Visual Aesthetics: 14/20 (Good)
User Friendliness: 14/20 (Good)
Combined:          74/100 (Good)

Top Issues (P1-P2):

1. [P2] Polish gap — app feels functional but not premium
   Settings rows, direction buttons, Quiz Mode cards lack
   visual personality and micro-details
   → /polish, /colorize

2. [P2] No delight/motivation features visible
   No celebration, streaks, encouraging messages
   → /delight

3. [P2] Quiz mode buttons lack descriptions
   "Multiple Choice" — what does it do?
   → Add subtitle text like direction buttons

4. [P2] No search/filter on long lists
   25 lessons, 25 kanji lessons — hard to find specific one
   → Add search bar

5. [P3] Settings labels lack context
   "Auto-speak on new card" — what does this mean?
   → Add subtle description text

What's Working Well:
- Color palette is harmonious and comfortable
- Mobile layout is clean and spacious
- Vietnamese direction descriptions are excellent UX
- Course → Lesson → Quiz flow is intuitive
- Gradient headers create strong page identity
- Section separation (gap-8) is clear
- Consistent row pattern across all pages

Recommended Next Actions:
1. /polish — Elevate visual details (direction buttons, settings rows)
2. /delight — Add motivational micro-interactions
3. Add quiz mode descriptions (same pattern as directions)
4. Add search to course-detail and kanji pages
5. /critique — Re-run after fixes to track improvement
```

## Score Progression

| Run | Technical (/20) | Heuristics (/40) | Aesthetics (/20) | Friendliness (/20) | Combined (/100) |
|-----|----------------|-------------------|-------------------|---------------------|-----------------|
| 1 | 15 | 26 | — | — | 41/60 |
| 2 | 16 | 30 | — | — | 46/60 |
| 3 | 16 | 30 | 14 | 14 | **74/100** |
