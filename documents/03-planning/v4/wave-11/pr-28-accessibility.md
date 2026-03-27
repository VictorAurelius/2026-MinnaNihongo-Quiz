# PR #28 — Accessibility Pass

> **Type:** fix(a11y)
> **Scope:** WCAG 2.1 AA compliance across all pages and components
> **Depends on:** PR #26 (component migration)
> **Risk:** LOW-MEDIUM — additive changes, no visual regressions expected

## Problem

Audit found accessibility scored **1.4/4 average** across pages:
- Zero `:focus-visible` styles on custom interactive elements
- Zero `prefers-reduced-motion` support
- Modal lacks `role="dialog"`, `aria-modal`, focus trap
- Tab-like selectors lack ARIA tab patterns
- `<button>` used for navigation instead of `<a href>`
- Flag emojis used as meaningful content without alternatives
- Score SVG in Results has no `aria-label`

## Tasks

### 1. `prefers-reduced-motion` (ALL pages)

Add to `app.css` (global):
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Remove per-page duplicate `@keyframes fade-in` definitions (already extracted in PR #25).

### 2. `:focus-visible` styles (ALL interactive elements)

Ensure global `:focus-visible` rule in `app.css` applies to:
- All `<button>` elements
- All `<a>` elements
- All `<input>`, `<select>` elements
- Custom interactive divs (Card clickable, FlashCard)

Add component-level focus styles where global is overridden:
```css
:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
```

### 3. ARIA patterns for tab-like selectors

**Direction selector** (Lesson Menu):
```svelte
<div role="radiogroup" aria-label="Quiz direction">
  {#each directions as dir}
    <button role="radio" aria-checked={selected === dir}>
      {dir.label}
    </button>
  {/each}
</div>
```

**Level selector** (Kanji, HSK):
```svelte
<div role="tablist" aria-label="JLPT level">
  {#each levels as level}
    <button role="tab" aria-selected={active === level}>
      {level}
    </button>
  {/each}
</div>
```

### 4. Navigation semantics

Convert `<button onclick={() => goto(url)}>` to `<a href={url}>` in:
- Home page: section navigation buttons
- Courses page: course cards
- Course Detail: lesson row buttons
- Kanji: lesson cards

### 5. Modal accessibility (if not done in PR #26)

- Add `role="dialog"` + `aria-modal="true"`
- Implement focus trap (Tab cycles within modal)
- Focus first interactive element on open
- Return focus to trigger on close

### 6. SVG accessibility

Results page score ring:
```svelte
<svg role="img" aria-label="Score: {percentage}%">
  <title>Quiz score: {percentage}%</title>
  <!-- ... -->
</svg>
```

### 7. Form accessibility

Vocabulary search:
```svelte
<label for="vocab-search" class="sr-only">Search vocabulary</label>
<input id="vocab-search" ... />
```

Settings font selector:
```svelte
<div role="radiogroup" aria-label="Font selection">
  <button role="radio" aria-checked={selected === font}>
```

## Tests

- Unit tests for ARIA attributes on key components
- Keyboard navigation test: Tab through Home → Courses → Lesson → Quiz flow
- Test `prefers-reduced-motion`: animations disabled
- Test `:focus-visible`: visible ring on Tab, no ring on click
- Test modal focus trap: Tab stays within modal
- Test screen reader: `role="dialog"`, `aria-label` announced correctly
- axe-core or similar automated a11y scan

## Files Changed

- `svelte-app/src/app.css` (reduced-motion, focus-visible)
- All 10 route pages (remove duplicate keyframes, fix navigation semantics)
- `Modal.svelte` (dialog role, focus trap)
- Quiz components (ARIA live regions already good, verify)
- Kanji, HSK pages (tab/radio patterns)
- Lesson Menu (radio group for direction)
- Results (SVG accessibility)
- Vocabulary (form labels)
- Settings (radio group for fonts)
- ~20 files total
