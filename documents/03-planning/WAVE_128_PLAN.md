# Wave 128 — Perfect UI Review Score Plan

**Goal:** 97/128 → 128/128
**Branch:** Feature branches from `v4-dev`
**Audit:** Run `/ui-review` after each PR to track progression

---

## PR 1: WCAG Critical Fixes (+7 WCAG, +2 Technical) ✅ PR #98
**Target: WCAG 13→20, Technical 16→18**
**Effort: Small** — MERGED

### Tasks
- [ ] Header nav icons: add `min-w-11 min-h-11` padding + `aria-label` on all header buttons (home, settings, dark mode toggle)
- [ ] Add skip-to-content link in `+layout.svelte` (`sr-only focus:not-sr-only`)
- [ ] Add `<main id="main-content">` wrapper around `<slot />`
- [ ] Fix dark mode flash: add blocking `<script>` in `app.html` to apply `.dark` class before render
- [ ] Fix hero subtitle contrast: increase opacity from 90% to 100% or use solid white
- [ ] Fix section heading contrast: change `text-muted-foreground` to `text-foreground/70` (higher contrast)
- [ ] Fix unselected direction tab text: use `text-foreground/60` instead of `text-muted-foreground`
- [ ] Audit all interactive elements for ≥44×44px touch targets
- [ ] Add visible focus indicators (`focus-visible:ring-2 focus-visible:ring-primary`) to all buttons/links
- [ ] Verify heading hierarchy h1→h2→h3 across all pages

### Expected Score Impact
- WCAG Contrast: 3→4 (fix 3 WARNs)
- WCAG Touch Targets: 2→4 (fix header icons FAIL)
- WCAG Labels: 3→4 (audit complete)
- WCAG Screen Reader: 3→4 (heading hierarchy verified)
- WCAG Keyboard: 2→4 (skip-to-content + focus indicators)
- Technical Accessibility: 3→4
- Technical Anti-Patterns: 3→4 (Courses dark mode fixed)

---

## PR 2: Search & Filter for Long Lists (+2 Heuristics)
**Target: Heuristics H7 2→4**
**Effort: Medium**

### Tasks
- [ ] Add search bar component (`SearchInput.svelte`) with debounce
- [ ] Course detail page: search/filter 25 lessons by title/number
- [ ] Kanji page: search/filter 25 lessons by title/number
- [ ] HSK page: already has level selector, consider word search within group
- [ ] Add keyboard shortcut `/` or `Ctrl+K` to focus search (show hint in UI)
- [ ] Add "jump to lesson" via number input or scroll-to

### Expected Score Impact
- H7 Flexibility: 2→4

---

## PR 3: Loading States & Progress Indicators (+3 Heuristics) ✅ PR #100
**Target: H1 3→4, H9 3→4, Heuristics +3**
**Effort: Medium** — MERGED

### Tasks
- [ ] Add skeleton loading states for: course detail, lesson menu, kanji list, HSK groups
- [ ] Add progress bar in lesson menu hero banner ("X/59 từ đã học")
- [ ] Course detail: highlight "next unlearned lesson" with visual indicator (glow/badge)
- [ ] Add error boundary component with retry button for all route pages
- [ ] Vocabulary page: show graceful loading state (not blank)
- [ ] Quiz results: add inline error recovery ("Thử lại" button for wrong answers)

### Expected Score Impact
- H1 Visibility: 3→4
- H9 Error Recovery: 3→4
- H4 Consistency: 3→4 (all pages have loading/error states)

---

## PR 4: Delight & Motivation Features (+3 Friendliness)
**Target: Friendliness Delight 2→4, First Impression 3→4**
**Effort: Medium-Large**

### Tasks
- [ ] Quiz completion celebration: confetti animation + encouraging message ("Tuyệt vời! 🎉")
- [ ] Progress milestones: badge/toast when reaching 25%, 50%, 75%, 100% of lesson
- [ ] Streak counter: track consecutive days of practice (store in localStorage)
- [ ] Home page: show "Continue learning" card with last-studied lesson + progress
- [ ] Course detail: replace "all 0%" with motivational empty state ("Bắt đầu bài đầu tiên!")
- [ ] Add micro-animations: success checkmark on correct answer, smooth transitions between quiz questions
- [ ] Mastery ring: animate fill on first render (0→current%)

### Expected Score Impact
- Friendliness Delight: 2→4
- Friendliness First Impression: 3→4
- H1 Visibility: reinforced (progress + streaks)

---

## PR 5: Visual Polish to Excellent (+7 Aesthetics) ✅ PR #99
**Target: All aesthetics dimensions 3→4**
**Effort: Medium** — MERGED

### Tasks
- [ ] **Color**: Add subtle accent variations per section (courses=purple, kanji=indigo, HSK=teal). Use `bg-primary/5` tint on alternate rows for visual rhythm
- [ ] **Typography**: Add `font-display: swap` for CJK fonts. Fine-tune line-height on Japanese text. Increase section heading size slightly for more hierarchy contrast
- [ ] **Element Sizing**: Standardize ALL rows to py-5 (remove py-4.5 variants). Increase numbered circles to w-10 h-10 on course-detail/kanji for consistency with other pages
- [ ] **Spacing**: Standardize all row gaps to gap-3.5. Standardize all section heading margins to mb-6
- [ ] **Alignment**: Ensure all pages use same max-w container. Align course emoji size with reference icon container size
- [ ] **Visual Hierarchy**: Add subtle background tint to "Courses" section header on Home. Make "Continue — Bài X →" button more prominent (larger, gradient bg)
- [ ] **Polish**: Add hover:bg-accent transition on all rows. Subtle shadow increase on hover (shadow-sm → shadow-md). Add border-border to all card-like elements. Icon containers: consistent bg-primary/10 rounded-lg everywhere

### Expected Score Impact
- All 7 aesthetics dimensions: 3→4

---

## PR 6: Navigation & Onboarding (+3 Friendliness, +2 Heuristics)
**Target: Friendliness Nav/Learning 3→4, H3 3→4, H5 3→4**
**Effort: Medium**

### Tasks
- [ ] Add breadcrumb trail on course-detail and lesson-menu ("Courses > N5 > Bài 1")
- [ ] First-time user: show welcome modal/banner with quick guide ("Chọn khóa học → Chọn bài → Bắt đầu quiz")
- [ ] Add "Recommended" badge on Flashcard Quiz for first-time users
- [ ] Quiz: add undo/back button ("Quay lại câu trước")
- [ ] Settings: add helper descriptions ("Tự động phát âm khi lật thẻ mới")
- [ ] Add tooltip on header icons for new users (on first visit only)

### Expected Score Impact
- Friendliness Navigation: 3→4
- Friendliness Learning Curve: 3→4
- H3 User Control: 3→4
- H5 Error Prevention: 3→4

---

## Summary

| PR | Focus | Score Impact | Effort |
|----|-------|-------------|--------|
| **PR 1** | WCAG Critical Fixes | +9 (WCAG +7, Tech +2) | Small |
| **PR 2** | Search & Filter | +2 (Heuristics) | Medium |
| **PR 3** | Loading & Progress | +3 (Heuristics) | Medium |
| **PR 4** | Delight & Motivation | +3 (Friendliness) | Medium-Large |
| **PR 5** | Visual Polish | +7 (Aesthetics) | Medium |
| **PR 6** | Navigation & Onboarding | +5 (Friendliness +3, Heuristics +2) | Medium |
| **Total** | | **+31 (97→128)** | |

### Recommended Order

1. **PR 1** (WCAG) — highest impact, smallest effort, fixes real accessibility issues
2. **PR 5** (Polish) — visual improvements, easy to verify
3. **PR 3** (Loading/Progress) — improves perceived quality
4. **PR 2** (Search) — functional feature
5. **PR 4** (Delight) — motivational features
6. **PR 6** (Onboarding) — final polish

### Audit Checkpoints

Run `/ui-review` after each PR:
- After PR 1: expect ~106/128
- After PR 1+5: expect ~113/128
- After PR 1+5+3: expect ~116/128
- After PR 1+5+3+2: expect ~118/128
- After PR 1+5+3+2+4: expect ~123/128
- After all 6: expect **128/128**
