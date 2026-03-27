# PR #25 — CSS Foundation Cleanup

> **Type:** fix(styles)
> **Scope:** app.css, global CSS system unification
> **Risk:** HIGH — touches all visual rendering. Must test every page.

## Problem

Two conflicting CSS variable systems coexist:

| System | Location | Primary Color | Used By |
|--------|----------|---------------|---------|
| Legacy | `:root` vars (`--primary`, `--bg`, etc.) | `#0071e3` (blue) | All custom components, app.css classes |
| Tailwind | `@theme` tokens (`--color-primary`, etc.) | `hsl(262 80% 60%)` (purple) | Header, route pages, shadcn ui/ |

Components using different systems render in **different brand colors**.

Additionally:
- `--surface` used 7x but never defined
- `--warning` missing in dark mode
- Dark mode uses 3 different selectors
- ~1000+ lines dead CSS (classes overridden by component scoped styles)

## Tasks

### 1. Unify CSS variables
- Remove legacy `:root` block (lines 64-116)
- Map any still-needed legacy vars to Tailwind tokens as aliases:
  ```css
  :root {
    --bg: var(--color-background);
    --text: var(--color-foreground);
    --primary: var(--color-primary);
    --border: var(--color-border);
    /* ... only vars still referenced by components */
  }
  ```
- Fix dark mode to use single `.dark` selector

### 2. Define missing variables
- Add `--surface` to `@theme` (map to card or background)
- Add `--warning` to `.dark` block
- Add `--card-bg` alias if needed

### 3. Remove dead CSS
- Delete global `.btn`, `.btn-primary` classes (lines 410-476) — overridden by Button.svelte scoped styles
- Delete global `.flashcard-*` classes (lines 504-578) — overridden by FlashCard.svelte
- Delete global `.mc-*`, `.quiz-*` classes (lines 595-701) — overridden by MultipleChoice.svelte
- Delete global `.typing-*` classes (lines 705-770) — overridden by TypingQuiz.svelte
- Delete global `.modal-*` classes (lines 1252-1343) — overridden by Modal.svelte
- Delete global `.progress-*` classes (lines 489-501) — overridden by ProgressBar.svelte

### 4. Extract shared animation
- Move duplicated `@keyframes fade-in` to app.css (currently copy-pasted in every page)
- Add `prefers-reduced-motion` media query:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .animate-in { animation: none !important; }
  }
  ```

### 5. Add global `:focus-visible` enhancement
- Ensure `:focus-visible` ring works with new token system
- Add `--color-ring` usage in focus styles

## Tests
- Visual regression: all 10 audited pages render correctly in light + dark mode
- No undefined CSS variable warnings in browser console
- `prefers-reduced-motion` disables animations
- `:focus-visible` ring visible on Tab navigation

## Risk Mitigation
- Introduce legacy → Tailwind aliases first (step 1), then remove dead CSS (step 3)
- Test EVERY page after each step — don't batch
- Keep `.dark, [data-theme="dark"]` selector until all references migrated, then simplify

## Files Changed
- `svelte-app/src/app.css` (major refactor)
- Possibly `svelte-app/src/routes/+layout.svelte` (dark mode toggle)
