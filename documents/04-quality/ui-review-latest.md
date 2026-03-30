# UI Review Report — 2026-03-30 (Run 6, new /128 scale with WCAG)

Previous: Run 5 — 84/108 (old scale, no WCAG dimension)

## Visual Inventory

- **Platform:** Mobile PWA (375px viewport), dark mode primary
- **Design maturity:** Production
- **Key components:** Hero gradient banners, pill direction selectors, row lists with chevrons, flat section layout with uppercase headings, icon circles, font preview cards, stat cards, level tab selectors

---

## 1. Technical Audit (16/20)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3 | ARIA roles on radio groups, `aria-hidden` on decorative icons. Missing: skip-to-content link, some header icon touch targets borderline |
| 2 | Performance | 3 | Static build, CSS-only animations (translate, scale), no layout thrashing |
| 3 | Responsive Design | 3 | Mobile-first layout, good breakpoints. Kanji titles truncate with ellipsis. No horizontal overflow |
| 4 | Theming | 4 | Full dark/light via CSS custom properties. All pages render dark mode consistently. No hardcoded colors visible |
| 5 | Anti-Patterns | 3 | No glassmorphism, gradient text, or bounce easing. Gradient on hero banners is tasteful (not AI slop). Courses page still renders light mode in screenshots |
| **Total** | | **16/20** | **Good** |

## 2. Design Heuristics (32/40)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Mastery rings (0%) on course detail. Active direction tab filled. No loading spinners visible |
| 2 | Match System / Real World | 4 | "Bài 1", "từ vựng", "ngữ pháp" — natural Vietnamese. "JP → VN" intuitive abbreviation |
| 3 | User Control and Freedom | 3 | Back buttons on all sub-pages. ConfirmDialog on destructive clear. No undo for quiz answers |
| 4 | Consistency and Standards | 3 | Row pattern consistent (icon + text + chevron). Courses use emoji, Reference uses lucide — intentional split. Direction buttons have border/ring states |
| 5 | Error Prevention | 3 | ConfirmDialog on Clear All. Safe defaults (ja-vi direction) |
| 6 | Recognition Rather Than Recall | 4 | Direction descriptions in Vietnamese. Quiz mode descriptions. Section headings. Numbered lessons |
| 7 | Flexibility and Efficiency | 2 | No search/filter on 25-lesson lists. No bookmarks. No keyboard shortcuts shown |
| 8 | Aesthetic and Minimalist Design | 3 | Clean flat sections. Good whitespace. Two clear Home sections. No clutter |
| 9 | Error Recovery | 3 | PageEmpty component for missing data. No inline error recovery visible |
| 10 | Help and Documentation | 4 | Direction + quiz mode descriptions self-documenting. "Lật thẻ để xem đáp án", "Chọn đáp án đúng trong 4 lựa chọn" |
| **Total** | | **32/40** | **Good** |

## 3. Visual Aesthetics (21/28)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | **Color Harmony** | 3 | Purple primary + teal accent cohesive. Dark mode warm (not pure black). Course color accent bars add identity. HSK purple vibrant |
| 2 | **Typography** | 3 | Clear heading/body hierarchy. Japanese text readable. Uppercase tracking-wider section headings clean. Quiz mode descriptions add good secondary text layer |
| 3 | **Element Sizing** | 3 | Rows py-4.5 to py-5 — adequate ≥48px. Direction buttons py-3.5 with descriptions — good height. Icons proportional. Course-detail/kanji rows slightly compact but acceptable |
| 4 | **Spacing & Breathing Room** | 3 | Section gaps gap-8 (32px) — clear. Row gaps gap-3 to gap-3.5. Internal padding px-5. Section heading mb-6 gives breathing room |
| 5 | **Alignment & Grid** | 3 | Left edges aligned. max-w-xl/2xl consistent. Numbered circles create vertical rhythm. ChevronRight right-aligned |
| 6 | **Visual Hierarchy** | 3 | Gradient headers anchor pages. Flashcard CTA (primary bg) stands out. Courses vs Reference sections on Home clear. Direction descriptions add visual weight |
| 7 | **Polish & Detail** | 3 | Direction buttons: border inactive + ring active = polished. Settings container border. Quiz Modes flat design with icon circles. rounded-xl consistent. Shadows subtle. Overall professional, not "template-like" anymore |
| **Total** | | **21/28** | **Good** |

### Layout Checklist

| Check | Home | Courses | Course Detail | Lesson Menu | Kanji | HSK | Settings |
|-------|------|---------|--------------|-------------|-------|-----|----------|
| Row height ≥ 48px | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Internal padding ≥ 16px | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sibling gap ≥ 12px | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Section gap ≥ 24px | ✅ | N/A | N/A | ✅ | N/A | N/A | ✅ |
| Icon proportional | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Consistent sizing | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**All checks pass.**

## 4. User Friendliness (15/20)

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | **First Impression** | 3 | Home communicates purpose ("Learn 日本語 & 中文"). Stats build credibility. Courses + Reference sections guide orientation |
| 2 | **Navigation Clarity** | 3 | Back buttons everywhere. Header nav links. Course → Lesson → Quiz in ≤3 taps |
| 3 | **Action Clarity** | 4 | ChevronRight says "tap me". Flashcard CTA primary-colored. Direction + quiz descriptions explain what happens before tapping |
| 4 | **Learning Curve** | 3 | 4 taps to first quiz. Directions self-explanatory. Quiz descriptions clear |
| 5 | **Delight & Motivation** | 2 | Mastery rings exist. Stats on home. But no celebration on completion, no streaks, all 0% can discourage |
| **Total** | | **15/20** | **Good** |

## 5. WCAG Accessibility (13/20)

| Status | Element | Check | WCAG | Notes |
|--------|---------|-------|------|-------|
| ✅ PASS | Hero banner title (white on purple) | Contrast ≥3:1 large text | 1.4.3 | Bold white on deep purple gradient |
| ✅ PASS | Quiz item text (dark on card bg) | Contrast ≥4.5:1 | 1.4.3 | text-foreground on bg-card |
| ✅ PASS | Quiz row touch targets | ≥44×44px | 2.5.8 | py-5 + full width ≥56px height |
| ✅ PASS | Direction tabs active state | Not color-only | 1.4.1 | bg-primary + ring-2 + bold text |
| ✅ PASS | Direction buttons with descriptions | Descriptive accessible name | 4.1.2 | "JP → VN / Xem tiếng Nhật, trả lời tiếng Việt" |
| ✅ PASS | Radio groups (directions, levels) | ARIA role="radio" + aria-checked | 4.1.2 | Proper radio group semantics |
| ✅ PASS | Settings checkboxes | Associated label | 1.3.1 | `<label for="...">` present |
| ⚠️ WARN | Hero subtitle ("59 từ vựng • 4 ngữ pháp") | Contrast ~3.5:1 | 1.4.3 | White/90% opacity on purple gradient — borderline for normal text |
| ⚠️ WARN | Section headings (DIRECTION, QUIZ MODES) | Contrast | 1.4.3 | text-muted-foreground uppercase — may be ~4:1, borderline |
| ⚠️ WARN | Unselected direction tabs text | Contrast | 1.4.3 | text-muted-foreground on bg-card — improved with border but text color still light |
| ⚠️ WARN | Courses page | Dark mode not applying | 1.4.3 | Renders light mode in dark screenshots — theme detection issue |
| ❌ FAIL | Header nav icons (home, settings, dark mode) | Touch target | 2.5.8 | Icons appear ~32×32px, below 44×44px minimum |
| ❌ FAIL | Skip-to-content link | Missing | 2.4.1 | No skip navigation for keyboard users |
| 🔍 N/A | Keyboard navigation / focus order | Needs live test | 2.4.3 | Cannot verify from screenshots |
| 🔍 N/A | Screen reader heading hierarchy | Needs code review | 1.3.1 | h1→h2→h3 needs verification |

| # | Category | Score | Rationale |
|---|----------|-------|-----------|
| 1 | Contrast | 3 | Zero FAIL, 3 WARNs (hero subtitle, section headings, unselected tabs) |
| 2 | Touch Targets | 2 | 1 FAIL (header icons ~32px) |
| 3 | Labels & ARIA | 3 | Zero FAIL, radio groups + labels correct. Icons have aria-hidden |
| 4 | Screen Reader | 3 | Zero FAIL, needs verification. Semantics look correct from code |
| 5 | Keyboard & Focus | 2 | 1 FAIL (missing skip-to-content). Focus indicators not verifiable from screenshot |
| **Total** | | **13/20** | **Acceptable** |

---

## Top 3 Issues (with code fixes)

### 1. Header nav icons touch targets too small — Severity: **High**

**Problem:** Home, settings, dark mode icons in header are ~32×32px, below WCAG 2.5.8 minimum 44×44px.
**Impact:** Difficult to tap on mobile, especially for users with motor impairments.
**Heuristic:** WCAG Touch Targets (2.5.8)

```svelte
<!-- File: svelte-app/src/lib/components/layout/Header.svelte -->

<!-- BEFORE -->
<button on:click={toggleDarkMode}>
  <Sun size={20} />
</button>

<!-- AFTER -->
<button
  on:click={toggleDarkMode}
  class="min-w-11 min-h-11 flex items-center justify-center"
  aria-label="Chuyển chế độ sáng/tối"
>
  <Sun size={20} aria-hidden="true" />
</button>
```

### 2. Missing skip-to-content link — Severity: **Medium**

**Problem:** No skip navigation link for keyboard users. Must tab through entire header/nav to reach main content.
**Impact:** Keyboard-only users waste time navigating through repeated nav on every page.
**Heuristic:** WCAG Bypass Blocks (2.4.1)

```svelte
<!-- File: svelte-app/src/routes/+layout.svelte -->

<!-- AFTER — add as first child of body -->
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
>
  Skip to content
</a>

<!-- Then wrap main content -->
<main id="main-content">
  <slot />
</main>
```

### 3. Courses page renders light mode in dark screenshots — Severity: **Medium**

**Problem:** Courses page doesn't pick up dark mode from localStorage on first render during screenshot capture. May also affect real users who navigate directly to /courses.
**Impact:** Jarring white flash in dark mode. Inconsistent experience.
**Heuristic:** Consistency & Standards (H4), Theming

```svelte
<!-- File: svelte-app/src/routes/courses/+page.svelte -->
<!-- Investigate: does the page read from ui-store on mount? -->
<!-- The screenshot capture already reloads after localStorage injection. -->
<!-- This may be a SvelteKit SSR issue — dark mode class needs to be applied -->
<!-- server-side or via a blocking script in app.html -->
```

```html
<!-- File: svelte-app/src/app.html -->
<!-- AFTER — add blocking script before content to prevent flash -->
<script>
  try {
    const store = JSON.parse(localStorage.getItem('ui-store') || '{}');
    if (store.darkMode) document.documentElement.classList.add('dark');
  } catch(e) {}
</script>
```

---

## Combined Summary

```
=== UI REVIEW REPORT (Run 6) ===
Technical:         16/20  (Good)
Design Heuristics: 32/40  (Good)
Visual Aesthetics: 21/28  (Good)
User Friendliness: 15/20  (Good)
WCAG Access:       13/20  (Acceptable)
Combined:          97/128 (Good)

Top 3 Issues:
1. [FAIL] Header icons touch targets ~32px < 44px minimum
2. [FAIL] Missing skip-to-content link for keyboard users
3. [WARN] Courses page renders light mode in dark screenshots

What's Working Well:
- Direction + quiz mode descriptions make all features self-documenting
- Layout checklist 100% pass on all 7 pages
- Color palette harmonious, dark mode comfortable
- Consistent row pattern across all pages
- Section separation clear (gap-8, mb-6)
- ARIA radio groups properly implemented
- Design feels professional, not generic/template-like
```

## Score Progression

| Run | Tech (/20) | Heuristics (/40) | Aesthetics (/28) | Friendly (/20) | WCAG (/20) | Combined |
|-----|-----------|-------------------|-------------------|----------------|------------|----------|
| 1 | 15 | 26 | — | — | — | 41/60 |
| 2 | 16 | 30 | — | — | — | 46/60 |
| 3 | 16 | 30 | 14/20* | 14 | — | 74/100 |
| 4 | 16 | 30 | 18/28 | 14 | — | 78/108 |
| 5 | 16 | 32 | 21/28 | 15 | — | 84/108 |
| **6** | **16** | **32** | **21** | **15** | **13** | **97/128** |

*Run 3 aesthetics was /20 scale (5 dims), converted to /28 scale (7 dims) from Run 4.
