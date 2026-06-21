# Button Consolidation — shadcn `Button` is canonical (Wave 4 PR 4.1)

> Status: **component + decision DONE**; per-file mechanical migration of standard buttons = **gradual** (audit P2 explicitly recommended "migrate dần"). Resolves the audit-2026-05-13 P2 "parallel component systems" finding at the decision/component level without a risky big-bang swap.

## Decision

`src/lib/components/ui/button/button.svelte` (shadcn) is the **canonical** standard-button component — consistent with `app.css` `@theme` ("CANONICAL — single source of truth"). It was extended in this PR with a `success` variant so it is now a **complete superset** of the standard legacy `.btn-*` styles.

Note: visual drift between the two systems is already small — the legacy `--primary`/`--danger`/etc. tokens **alias** the shadcn `@theme` `--color-*` tokens (`app.css:81` `--primary: var(--color-primary)`), so legacy and shadcn standard buttons render with the same colors. The consolidation is therefore primarily **code-level** (one button API, not two), not a visual fix.

## Standard `.btn` → `<Button>` mapping (for the gradual migration)

| Legacy class | shadcn `<Button>` | Notes |
|---|---|---|
| `btn` / `btn-primary` | `variant="default"` | |
| `btn-secondary` | `variant="secondary"` | |
| `btn-danger` | `variant="destructive"` | |
| `btn-success` | `variant="success"` | added this PR |
| `btn-accent` (1 usage) | `variant="default"` | legacy `--accent` purple ≈ primary |
| `btn-cancel` | `variant="outline"` | |
| `btn-lg` / `btn-sm` | `size="lg"` / `size="sm"` | combine with variant |

### ⚠️ Svelte 5 gotcha when migrating
`Button` is a **runes component** that spreads `{...props}` onto its `<button>`. Svelte-4 `on:click` directives do **not** auto-forward to runes components — convert `on:click={fn}` → `onclick={fn}` (and `on:keydown`→`onkeydown`). Event **modifiers** (`on:click|stopPropagation`) have no prop form: handle them inside the handler (`e.stopPropagation()`), not as a directive. The E2E suite (69 tests, exercises quiz/results/flashcard clicks) is the regression net for this.

## Intentionally KEPT as dedicated styles (NOT migrated — they are app-specific, not shadcn-modeled)

These are purpose-built components, not "drift", and stay as legacy CSS classes:

| Class | Count | Purpose |
|---|---|---|
| `.btn-speak` | 24 | TTS pronounce button (icon + custom positioning) |
| `.btn-back` | 5 | BackButton |
| `.btn-icon` | 4 | bare icon button |
| `.btn-text` / `.btn-hint` / `.btn-toggle` / `.btn-tips` | 6 | inline text/hint/toggle affordances |

## Remaining gradual work (17 files with standard `.btn`)

Migrate standard buttons file-by-file using the mapping above, removing each migrated `.btn-*` CSS rule from `app.css` once its last usage is gone. Keep the custom classes above. Verify `npm run check` + `npx playwright test --project=chromium` (69) after each batch. Files: FlashCard, KanjiWritingQuiz, +error, TypingQuiz, kanji/radicals (+ quiz), KanjiTypingQuiz, review, vocab/[level], ConfirmDialog, KanjiFlashCard, grammar-quiz, hsk/[group] (+ quiz), kanji/[lesson]/quiz, grammar-reference.

Why gradual: the audit rated this P2 and explicitly recommended incremental migration; the per-file swap carries the event-forwarding gotcha above and benefits from running the full E2E net per batch rather than a single big-bang.
