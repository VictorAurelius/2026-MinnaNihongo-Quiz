# PR #26 — Component Migration (Custom → shadcn)

> **Type:** refactor(components)
> **Scope:** Migrate all custom common/ components to use Tailwind tokens + shadcn patterns
> **Depends on:** PR #25 (CSS cleanup)
> **Risk:** HIGH — touches every component used across the app

## Problem

3 duplicate component pairs exist:
| Custom (legacy CSS) | shadcn (Tailwind) | Both used? |
|---------------------|-------------------|------------|
| `common/Button.svelte` | `ui/button/button.svelte` | Yes — pages use both |
| `common/Card.svelte` | `ui/card/card.svelte` | Yes — pages use both |
| `common/ProgressBar.svelte` | `ui/progress/progress.svelte` | Yes |

Additionally, custom components (`Modal`, `Toast`, `BackButton`, `FlashCard`, `MultipleChoice`, `TypingQuiz`) all use legacy CSS vars.

## Strategy

**NOT "delete and replace"** — instead migrate custom components to use Tailwind tokens while preserving their API. This avoids breaking all call sites at once.

## Tasks

### Phase 1: Migrate custom components to Tailwind tokens

For each component, replace scoped `<style>` CSS vars with Tailwind classes:

| Component | Key Changes |
|-----------|------------|
| **Button.svelte** | Replace `var(--primary)` → `bg-primary text-primary-foreground`, etc. Replace scoped CSS with Tailwind classes. Add `:focus-visible` ring. Add loading state prop. |
| **Card.svelte** | Replace `var(--bg-card)` → `bg-card`. Add `role="button"` + `tabindex="0"` when clickable. Remove a11y warning suppression. |
| **Modal.svelte** | Replace legacy vars → Tailwind tokens. Add `role="dialog"` + `aria-modal="true"`. Add focus trap. Replace gradient header with solid bg-primary. |
| **Toast.svelte** | Replace legacy vars + hardcoded fallbacks → Tailwind tokens. Add dismiss button. Use `role="status"` for info type. |
| **ProgressBar.svelte** | Replace `width` animation → `transform: scaleX()`. Use Tailwind tokens. |
| **BackButton.svelte** | Replace legacy vars → Tailwind. Replace `←` with icon (prep for PR #27). |
| **Skeleton.svelte** | Verify alignment with shadcn skeleton. |

### Phase 2: Migrate quiz components to Tailwind tokens

| Component | Key Changes |
|-----------|------------|
| **FlashCard.svelte** | Replace all `var(--*)` → Tailwind tokens. Fix auto-flip timer cleanup. |
| **MultipleChoice.svelte** | Replace scoped CSS vars → Tailwind. Keep good ARIA patterns. |
| **TypingQuiz.svelte** | Replace scoped CSS vars → Tailwind. Fix `var(--bg)` background issue. |

### Phase 3: Deprecate custom duplicates

After migration, evaluate if custom `Button`, `Card`, `ProgressBar` can be removed in favor of shadcn equivalents. Decision criteria:
- If custom API offers nothing shadcn doesn't → delete custom, update call sites
- If custom has unique features (e.g., Button icon prop) → keep custom but on Tailwind tokens

### Phase 4: Standardize BackButton usage

Replace all inline back buttons in pages with `BackButton.svelte`:
- `course/[courseId]/+page.svelte` (line 36-41)
- `course/[courseId]/lesson/[id]/+page.svelte` (line 47-52)
- `course/[courseId]/lesson/[id]/vocabulary/+page.svelte` (line 95-96)

## Tests
- All existing component tests pass (no API changes in Phase 1-2)
- New tests for:
  - Modal: `role="dialog"` present, focus trap works, Escape closes
  - Card: keyboard accessible when clickable
  - Button: loading state renders spinner
  - Toast: dismiss button works
  - ProgressBar: uses `scaleX` (not width)
- Visual: all pages render correctly with new token system

## Files Changed
- `svelte-app/src/lib/components/common/*.svelte` (7 files)
- `svelte-app/src/lib/components/quiz/*.svelte` (3 files)
- Route pages using BackButton (3 files)
- Possibly consolidate duplicates (delete up to 3 files)
