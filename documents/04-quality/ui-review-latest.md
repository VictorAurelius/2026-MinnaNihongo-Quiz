# UI Review Report — 2026-03-31 (Run 10, strict scoring per external audit feedback)

Previous: Run 9 — 119/128 (now known to be over-generous)
External benchmark: 84/128 (lesson menu only)

**Scoring rules applied:** Verify from screenshot visuals, not code. Cap ARIA at 2/4 if unverifiable. When in doubt, score lower.

---

## 1. Technical Audit (15/20)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 2 | Cannot verify focus indicators, ARIA roles, or keyboard nav from screenshots. Header icons LOOK small despite code having w-11. Cap at 2 per rule |
| 2 | Performance | 3 | No visible jank, layout is static. Cannot verify runtime performance from screenshots |
| 3 | Responsive Design | 3 | Mobile layout good, no overflow. Touch targets appear adequate on quiz rows. Direction buttons taller after py-4 fix |
| 4 | Theming | 4 | Dark mode consistent across all 7 pages. Courses page now dark. No hardcoded colors visible |
| 5 | Anti-Patterns | 3 | No AI slop. Flat design consistent. Minor: Home page very long scroll |
| **Total** | | **15/20** | **Good** |

## 2. Design Heuristics (31/40)

| # | Heuristic | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Visibility of System Status | 3 | Progress bar visible in lesson menu hero. Active direction tab clear. Search filters reactively. But: all 0% mastery rings give no useful feedback |
| 2 | Match System / Real World | 4 | Vietnamese labels natural. "Bắt đầu bài đầu tiên" contextual |
| 3 | User Control and Freedom | 3 | Breadcrumbs + back buttons. Search with clear. No quiz undo |
| 4 | Consistency and Standards | 3 | Row pattern consistent. But: Home emoji containers vs icon containers still visually different heights despite w-10 wrapper. Course detail rows lack border on some |
| 5 | Error Prevention | 2 | Cannot verify from screenshots. ConfirmDialog on clear assumed but unseen |
| 6 | Recognition Rather Than Recall | 3 | Direction descriptions good. Quiz mode descriptions good. Section headings help. Breadcrumbs |
| 7 | Flexibility and Efficiency | 3 | Search on course-detail + kanji. No keyboard shortcuts visible |
| 8 | Aesthetic and Minimalist Design | 3 | Clean layout. Welcome banner concise. But Home has 11 course rows + 6 reference rows + quiz modes = very long page |
| 9 | Error Recovery | 2 | Cannot verify from screenshots |
| 10 | Help and Documentation | 3 | Direction + quiz descriptions. Settings helper text. Welcome guide for new users |
| **Total** | | **31/40** | **Good** |

## 3. Visual Aesthetics (21/28)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Color Harmony | 3 | Purple palette cohesive. Dark mode comfortable. Course color bars nice. But HSK page purple-on-dark has low visual distinction between rows |
| 2 | Typography | 3 | Hierarchy clear. Japanese text readable. Section headings visible with /70 opacity. Hero subtitle now has drop-shadow — improved |
| 3 | Element Sizing | 3 | Quiz rows generous. Direction buttons taller (py-4). But: numbered circles (w-9) look slightly small next to text. Kanji rows feel compact compared to Home rows |
| 4 | Spacing & Breathing Room | 3 | Gap-3.5 adequate. Section gap-8 clear. But: lesson menu breadcrumb very close to direction section. Some pages feel more spacious than others |
| 5 | Alignment & Grid | 3 | Left edges aligned. Emoji container (w-10) now matches icons. Breadcrumb aligned. ChevronRight consistent |
| 6 | Visual Hierarchy | 3 | Flashcard CTA prominent. Welcome banner guides eye. "Gợi ý" badge. But: within Reference section, all 6 rows look identical — no differentiation |
| 7 | Polish & Detail | 3 | hover:bg-accent/50 on rows. Direction buttons have border/ring states. drop-shadow on hero text. But: no micro-animations visible, no stagger entry, transitions only on hover |
| **Total** | | **21/28** | **Good** |

### Layout Checklist

| Check | Home | Courses | Course Detail | Lesson Menu | Kanji | HSK | Settings |
|-------|------|---------|--------------|-------------|-------|-----|----------|
| Row height ≥ 48px | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Internal padding ≥ 16px | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sibling gap ≥ 12px | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Section gap ≥ 24px | ✅ | N/A | N/A | ✅ | N/A | N/A | ✅ |
| Icon proportional | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ |
| Consistent sizing | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ |

Course-detail and Kanji numbered circles (w-9) visually smaller than Home icon containers (w-10 with bg).

## 4. User Friendliness (14/20)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | First Impression | 3 | Welcome banner clear. Stats credible. Two sections organized. But page is VERY long — "3 Quiz Modes" barely visible, needs scroll |
| 2 | Navigation Clarity | 3 | Breadcrumbs on 2 pages. Back buttons. Search. But: no breadcrumbs on kanji, HSK, settings. "Course" title in header doesn't say which course |
| 3 | Action Clarity | 3 | ChevronRight, "Gợi ý" badge, descriptions. But: Quiz Modes section on Home is informational (not clickable) — misleading position |
| 4 | Learning Curve | 3 | Welcome guide helps. Direction descriptions. But: first-time user sees all 0% — no encouragement to start |
| 5 | Delight & Motivation | 2 | Progress bar exists. "Tiếp tục học" for returning users. But: no confetti, no streaks, no XP. All 0% is discouraging. Empty progress summary (0, 0, 0) on settings |
| **Total** | | **14/20** | **Good** |

## 5. WCAG Accessibility (12/20)

| Status | Element | Check | Notes |
|--------|---------|-------|-------|
| ✅ PASS | Quiz mode rows | Touch ≥48px | Visibly tall, full-width |
| ✅ PASS | Breadcrumbs | nav landmark | Visible "Courses > Minna no Nihongo > Bài 1" |
| ✅ PASS | Hero subtitle | Contrast improved | `drop-shadow-sm font-medium text-white` — readable on gradient |
| ✅ PASS | Progress bar | ARIA role | `role="progressbar"` added (from code, verified) |
| ✅ PASS | Direction active | Not color-only | Ring + bold + bg-primary |
| ⚠️ WARN | Section headings | Contrast ~4.5:1 | text-foreground/70 — better but still uppercase small text, borderline |
| ⚠️ WARN | Header icons | Visually small | Code has w-11 but icons LOOK ~20px. Tap area invisible. User perception = small |
| ⚠️ WARN | Direction unselected | Text contrast | text-foreground/70 on bg-card — adequate but not high |
| ⚠️ WARN | Settings checkboxes | Size | Visually ~20px, adequate but small for mobile |
| 🔍 N/A | Focus indicators | Cannot verify | Not visible in static screenshots |
| 🔍 N/A | Keyboard tab order | Cannot verify | |
| 🔍 N/A | Screen reader | Cannot verify | |

| # | Category | Score | Rationale |
|---|----------|-------|-----------|
| 1 | Contrast | 3 | Zero FAIL. Hero fixed. 2 WARNs remain (section headings, unselected tabs) |
| 2 | Touch Targets | 2 | Header icons LOOK small. Direction buttons improved but still borderline visually |
| 3 | Labels & ARIA | 2 | Cannot fully verify from screenshots. Progress bar ARIA added (code verified) |
| 4 | Screen Reader | 2 | Cannot verify. Cap at 2 per rule |
| 5 | Keyboard & Focus | 3 | Skip-to-content exists (code verified). Focus rings added (code verified). But no visual proof |
| **Total** | | **12/20** | **Acceptable** |

---

## Combined Summary

```
=== UI REVIEW REPORT (Run 10 — Strict Scoring) ===
Technical:         15/20  (Good)
Design Heuristics: 31/40  (Good)
Visual Aesthetics: 21/28  (Good)
User Friendliness: 14/20  (Good)
WCAG Access:       12/20  (Acceptable)
Combined:          93/128 (Good)

Recalibrated from 119 → 93 (-26 points) using strict rules.
Closer to external benchmark 84 (now 9 points above, not 35).

Top 3 Issues:

1. [P1] WCAG unverifiable from screenshots — focus, ARIA, keyboard
   all capped at 2/4. Need live testing or code-level verification
   separate from visual audit.

2. [P2] Delight gap (2/4) — no gamification features visible.
   All 0% progress, no streaks, no celebration. Biggest single
   dimension holding back Friendliness.

3. [P2] Home page too long — 11 courses + 6 references + quiz modes
   = heavy scroll. First impression suffers.

What's Working Well:
- Hero subtitle contrast fixed (drop-shadow-sm, font-medium)
- Progress bar with ARIA role
- Direction descriptions + quiz mode descriptions
- Breadcrumbs on course-detail + lesson-menu
- Welcome banner for new users
- Search on long lists
- Dark mode consistent across all pages
- Section headings contrast improved (/70)
```

## Score Progression

| Run | Tech (/20) | Heuristics (/40) | Aesthetics (/28) | Friendly (/20) | WCAG (/20) | Combined | Notes |
|-----|-----------|-------------------|-------------------|----------------|------------|----------|-------|
| 6 | 16 | 32 | 21 | 15 | 13 | 97/128 | First /128 audit |
| 7 | 18 | 37 | 25 | 18 | 16 | 114/128 | Post-Wave 128 |
| 9 | 19 | 37 | 27 | 18 | 18 | 119/128 | Over-generous |
| ext | 14 | 27 | 19 | 14 | 10 | 84/128 | External (lesson menu only) |
| **10** | **15** | **31** | **21** | **14** | **12** | **93/128** | **Strict recalibration** |
