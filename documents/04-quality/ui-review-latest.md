# UI Review Report — 2026-03-31 (Run 13, strict rubric v2 + per-screen)

Previous: Run 12 — 101/128 (old rubric)
Rubric: "has feature" = 2/4, "works well + consistent all screens" = 3/4

---

## 1. Technical Audit — App-wide (13/20)

| # | Dimension | Score | Rationale |
|---|-----------|-------|-----------|
| 1 | Accessibility | 2 | Cannot verify focus/ARIA from screenshots. Header icons LOOK small despite w-11 code. Cap at 2 |
| 2 | Performance | 3 | Static build, CSS animations only. No visible jank. Consistent across screens = 3 |
| 3 | Responsive Design | 2 | Home nav now scrolls (good), BUT: Course Detail hero text wraps awkwardly "(JLPT N5)" on 4th line. HSK title "HSK Vocabulary" large but content sparse. Inconsistent = 2 |
| 4 | Theming | 3 | Slate dark mode consistent across all 7 screens. No hardcoded colors visible. All screens match = 3 |
| 5 | Anti-Patterns | 3 | No AI slop. Flat design. Stagger animation subtle. Orbs tasteful. Consistent = 3 |
| **Total** | | **13/20** | |

---

## 2. Per-Screen Scores

### Home

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Heuristics | 27/40 | H1:3 (stats clear) H2:3 H3:2 (back N/A, nav scrolls but items tiny) H4:2 (emoji icons vs lucide icons inconsistent) H5:2 (N/A) H6:3 H7:2 (no search on Home) H8:2 (VERY long scroll — 11+6+3 items, Quiz Modes barely visible) H9:2 (N/A) H10:3 (welcome guide good) |
| Aesthetics | 20/28 | Color:3 Typo:3 Sizing:3 Spacing:2 (page too long, sections not differentiated enough) Align:3 Hierarchy:2 (all 11 course rows same weight, Reference same weight) Polish:2 (Quiz Modes cards look plain vs rest of app) |
| Friendly | 13/20 | First:3 (welcome good) Nav:2 (need heavy scroll to reach Quiz Modes) Action:3 Learn:3 Delight:2 (no personalization when 0 progress) |
| WCAG | 10/20 | Contrast:3 Touch:2 (nav items small when scrolling) Labels:2 (stat aria-labels added but icons?) SR:2 KB:1 (unverifiable) |

### Courses

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Heuristics | 28/40 | H1:2 (no progress per course shown) H2:3 H3:3 H4:3 (consistent cards) H5:2 H6:3 (descriptions clear) H7:2 (no search, only 5 items) H8:3 (clean, simple) H9:2 H10:3 |
| Aesthetics | 21/28 | Color:3 (color bars nice) Typo:3 Sizing:3 Spacing:3 (gap good, not too many items) Align:3 Hierarchy:3 (color bars differentiate) Polish:3 (rounded-2xl, border/50, hover accent) |
| Friendly | 13/20 | First:3 Nav:3 Action:3 Learn:2 (no indication which course to start) Delight:2 |
| WCAG | 10/20 | Contrast:3 Touch:2 Labels:2 SR:2 KB:1 |

### Course Detail

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Heuristics | 26/40 | H1:2 (all 0% — 25 identical mastery rings showing nothing useful) H2:3 H3:3 (breadcrumb good) H4:2 (numbered circles w-9 smaller than Home w-10) H5:2 H6:2 (search exists but lesson 1 not visually highlighted despite code) H7:2 (search present = 2, works but only 1 page feature) H8:2 (25 rows is overwhelming, no grouping) H9:2 H10:2 (no help text explaining mastery %) |
| Aesthetics | 19/28 | Color:3 Typo:2 (hero text wraps badly — "(JLPT N5)" on its own line) Sizing:2 (w-9 circles smaller than other pages) Spacing:3 Align:2 (hero text centered, breadcrumb left — mismatch) Hierarchy:2 (all 25 rows identical, "Bắt đầu" button not prominent enough vs sea of rows) Polish:3 (orbs, rounded-2xl) |
| Friendly | 12/20 | First:2 (overwhelming 25 rows of 0%) Nav:3 (breadcrumb+search) Action:2 ("Bắt đầu bài đầu tiên" good but lost among rows) Learn:2 (no explanation of what mastery % means) Delight:1 (25× "0%" is actively discouraging) |
| WCAG | 10/20 | Contrast:3 Touch:2 Labels:2 SR:2 KB:1 |

### Lesson Menu

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Heuristics | 29/40 | H1:3 (progress bar, active tab, breadcrumb) H2:3 H3:3 (breadcrumb+back) H4:3 (icon containers consistent within page) H5:2 H6:3 (descriptions clear, "Gợi ý" badge) H7:2 (no shortcuts) H8:3 (clean sections, not cluttered) H9:2 H10:3 (quiz + direction descriptions) |
| Aesthetics | 22/28 | Color:3 (hero orbs, icon colored bg) Typo:3 (hero left-aligned, 22px bold) Sizing:3 (icon containers w-11) Spacing:3 (gap-8 between sections) Align:3 (left-aligned consistent) Hierarchy:3 (Flashcard CTA prominent, Grammar/Materials distinct) Polish:2 (stagger visible but Grammar row has description "4 patterns" vs Vocab "59 từ" — inconsistent detail level) |
| Friendly | 14/20 | First:3 (clear lesson info) Nav:3 (breadcrumb) Action:3 (descriptions + "Gợi ý") Learn:3 (self-explanatory) Delight:2 ("0% hoàn thành" not motivating) |
| WCAG | 11/20 | Contrast:3 (drop-shadow helps) Touch:2 (direction buttons borderline visually) Labels:2 SR:2 KB:2 (pill tabs look focusable) |

### Kanji

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Heuristics | 25/40 | H1:2 (no progress shown per lesson) H2:3 H3:2 (back button, no breadcrumb) H4:2 (level tabs different style from lesson menu pill tabs — inconsistent) H5:2 H6:2 (titles truncate — can't read full name) H7:2 (search present) H8:2 (25 rows, no grouping) H9:2 H10:2 (no descriptions on rows) |
| Aesthetics | 19/28 | Color:3 Typo:2 (titles truncate with "...") Sizing:2 (w-9 circles, no icon container like lesson menu) Spacing:3 Align:3 Hierarchy:2 (all 25 rows identical, no differentiation) Polish:2 (no orbs on header, plain compared to lesson menu) |
| Friendly | 11/20 | First:2 (just a long list) Nav:2 (no breadcrumb) Action:2 (rows tappable but no descriptions) Learn:2 (no guidance on where to start) Delight:1 (no progress, no motivation) |
| WCAG | 9/20 | Contrast:2 (level tab text small) Touch:2 Labels:2 SR:2 KB:1 |

### HSK

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Heuristics | 25/40 | H1:2 (no progress) H2:3 H3:2 (no breadcrumb) H4:2 (level tabs same issue as Kanji — different from pill tabs) H5:2 H6:2 (groups named "A-G", "G-M" — meaningless to learners) H7:2 (level selector only) H8:3 (only 5 items, clean) H9:2 H10:2 (no descriptions) |
| Aesthetics | 18/28 | Color:3 (purple icons vibrant) Typo:2 (group titles "A-G" not informative) Sizing:3 (large icon circles) Spacing:3 Align:3 Hierarchy:2 (5 identical rows) Polish:2 (no orbs, plain header, lots of empty space below 5 items) |
| Friendly | 11/20 | First:2 (what are "A-G" groups?) Nav:2 (no breadcrumb) Action:2 Learn:2 (confusing group names) Delight:1 (no progress) |
| WCAG | 9/20 | Contrast:2 Touch:2 Labels:2 SR:2 KB:1 |

### Settings

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Heuristics | 26/40 | H1:2 (progress summary all 0s) H2:3 H3:3 H4:3 (consistent sections) H5:3 (confirm on clear) H6:3 (descriptions under each setting) H7:2 (no search, all options visible) H8:3 (clean sections) H9:2 H10:2 (descriptions present but no tooltip/help for font differences) |
| Aesthetics | 20/28 | Color:3 Typo:3 Sizing:3 Spacing:3 Align:3 Hierarchy:2 (all sections look same weight — quiz settings vs font vs progress vs data not differentiated) Polish:3 (border on quiz container, font cards polished) |
| Friendly | 12/20 | First:2 (all 0s discouraging) Nav:3 Action:3 Learn:2 (what does each font look like in practice?) Delight:2 (all zeros) |
| WCAG | 10/20 | Contrast:3 Touch:2 (checkboxes small) Labels:2 SR:2 KB:1 |

---

## 3. Per-Screen Summary Table

| Screen | Heuristics (/40) | Aesthetics (/28) | Friendly (/20) | WCAG (/20) |
|--------|-------------------|-------------------|----------------|------------|
| Home | 27 | 20 | 13 | 10 |
| Courses | 28 | 21 | 13 | 10 |
| Course Detail | 26 | 19 | 12 | 10 |
| Lesson Menu | 29 | 22 | 14 | 11 |
| Kanji | 25 | 19 | 11 | 9 |
| HSK | 25 | 18 | 11 | 9 |
| Settings | 26 | 20 | 12 | 10 |
| **Average** | **26.6** | **19.9** | **12.3** | **9.9** |
| **Lowest** | **25 (Kanji/HSK)** | **18 (HSK)** | **11 (Kanji/HSK)** | **9 (Kanji/HSK)** |

---

## 4. Combined Score

Technical (app-wide): **13/20**
Heuristics (avg): **27/40**
Aesthetics (avg): **20/28**
Friendliness (avg): **12/20**
WCAG (avg): **10/20**

**Combined: 82/128 (Acceptable)**

Weakest screens: **Kanji (64/108) and HSK (63/108)** — dragging down overall.
Strongest screen: **Lesson Menu (76/108)** — most polished.

---

## 5. WCAG Audit Table

| Status | Element | Screen | Notes |
|--------|---------|--------|-------|
| ✅ PASS | Quiz mode rows touch ≥48px | Lesson Menu | Icon containers + py-5 |
| ✅ PASS | Hero subtitle drop-shadow | Lesson Menu, Course Detail | Readable on gradient |
| ✅ PASS | Progress bar role="progressbar" | Lesson Menu | ARIA present |
| ✅ PASS | Breadcrumbs nav landmark | Lesson Menu, Course Detail | |
| ⚠️ WARN | Header icons visually small | All | w-11 in code but LOOK ~20px |
| ⚠️ WARN | Section headings contrast | Lesson Menu, Settings | text-foreground/70, small uppercase |
| ⚠️ WARN | Direction tab unselected text | Lesson Menu | Muted on muted bg |
| ⚠️ WARN | Level tabs (Kanji/HSK) | Kanji, HSK | Small text, border style different from pill tabs |
| ⚠️ WARN | Nav items on Home | Home | Scrollable but items small |
| ❌ FAIL | No breadcrumbs on Kanji/HSK/Settings | 3 screens | Inconsistent navigation |
| ❌ FAIL | Checkboxes (Settings) | Settings | Visually ~20px, below 44px target |

---

## 6. Top 3 Issues

### 1. Kanji/HSK pages severely under-designed — Score: 63-64/108
**File:** `src/routes/kanji/+page.svelte`, `src/routes/hsk/+page.svelte`
**Problem:** Plain list with no descriptions, no progress, no breadcrumbs, no orbs. Level tabs inconsistent with lesson menu pill tabs. HSK group names ("A-G") meaningless. 25 identical rows with no visual differentiation.
**Impact:** Users arriving at these screens see a wall of text with no guidance, motivation, or polish.

### 2. Course Detail — 25 rows of "0%" is actively discouraging
**File:** `src/routes/course/[courseId]/+page.svelte`
**Problem:** Hero text wraps badly. 25 identical rows with 0% mastery rings provide no useful information. No grouping, no "start here" visual beyond the button.
**Impact:** New users see 25× "I haven't learned anything" — demotivating.

### 3. Home page too long — Quiz Modes invisible without scroll
**File:** `src/routes/+page.svelte`
**Problem:** 11 course rows + 6 reference rows + 3 quiz cards = user must scroll past ~15 items to see Quiz Modes. Welcome banner + stats visible but core navigation buried.
**Impact:** Quiz Modes section (important for first-time understanding) is below fold.

---

## Score Progression

| Run | Tech (/20) | Heuristics (/40) | Aesthetics (/28) | Friendly (/20) | WCAG (/20) | Combined | Rubric |
|-----|-----------|-------------------|-------------------|----------------|------------|----------|--------|
| ext | 14 | 27 | 19 | 14 | 10 | 84/128 | External (lesson menu) |
| ext2 | 14 | 29 | 19 | 14 | 13 | 89/128 | External (home) |
| 12 | 16 | 33 | 26 | 14 | 12 | 101/128 | Old rubric |
| **13** | **13** | **27** | **20** | **12** | **10** | **82/128** | **Strict v2 + per-screen** |

**Per-screen scoring dropped 19 points.** Kanji/HSK/Course Detail pulled down averages significantly.
