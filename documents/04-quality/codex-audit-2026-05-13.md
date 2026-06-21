# Codex Quality and UI Audit - 2026-05-13

**Branch/commit:** `chore/migrate-claude-to-codex` / `ee81753`  
**Auditor:** Codex  
**Scope:** first Codex audit of project quality, UI, accessibility, build, tests, and workflow gates.

## Executive Summary

The app has a strong unit-test baseline and the core Svelte build can compile, but the current release gate is not trustworthy yet. The highest risks are build portability, stale E2E tests, accessibility warnings, and dependency vulnerabilities.

Script score from `./scripts/quality-audit.sh`: **94/100 - A**.

Adjusted audit confidence: **Medium**, because the quality script misses several failures that were visible when commands were run directly.

## Findings

### P0 - Build script fails on Windows and does not create `404.html`

`svelte-app/package.json:8` uses:

```json
"build": "vite build && cp build/index.html build/404.html"
```

On this Windows environment, `npm run build` compiles SvelteKit but then fails with:

```text
'cp' is not recognized as an internal or external command
```

`svelte-app/build/index.html` exists after build, but `svelte-app/build/404.html` does not. This breaks the GitHub Pages SPA fallback requirement.

Recommended fix: replace the shell-specific copy with a cross-platform Node script.

### P0 - E2E suite is not a usable quality gate

`npm run test:e2e -- --project=chromium` result:

```text
42 passed
27 failed
```

Main causes:

- Home tests expect old UI text such as `Choose a Lesson` and direct lesson grid on the home page (`svelte-app/src/tests/e2e/home.spec.ts:17`, `:26`, `:30`, `:40`).
- Typing quiz tests expect old placeholder and labels (`svelte-app/src/tests/e2e/quiz-typing.spec.ts:21`, `:25`, `:63`).
- Full user-flow tests expect old `/quiz/...?...lesson=1` behavior and old result text (`svelte-app/src/tests/e2e/user-flows.spec.ts:21`, `:27`, `:53`, `:96`).

This may be a test-staleness problem, a product regression, or both. Until reconciled, E2E cannot prove UI quality.

### P1 - `quality-audit.sh` can report false positives when tools fail

The audit script suppresses failures and then parses absent output as zero failures:

- `scripts/quality-audit.sh:41` runs `npx vitest run ... || true`.
- `scripts/quality-audit.sh:48` awards test points when `TEST_FAIL == 0`, even if no tests actually ran.
- `scripts/quality-audit.sh:59` and `:62` also ignore build/check command failures.
- `scripts/quality-audit.sh:71` reports `svelte-check 0 errors` when parsing finds no error count, even if the command failed.

Before dependencies were installed, the script reported `0 tests pass, 0 failures` as a full test score. The audit gate should fail when required commands fail or when test count is zero.

### P1 - Accessibility warnings are present in build/test output

Direct `npm test -- --run` passes, but Svelte/Vite emits a11y warnings:

- `svelte-app/src/lib/components/common/Modal.svelte:80` uses `role="dialog"` without a focusable dialog container.
- `svelte-app/src/lib/components/common/ConfirmDialog.svelte:30` uses `role="alertdialog"` without `tabindex` and has a click handler on a non-interactive element.
- `svelte-app/src/lib/components/common/Card.svelte:34` uses a non-interactive `div` with click, keydown, role, and tab index.
- `svelte-app/src/routes/hsk/[group]/quiz/[mode]/+page.svelte:132` uses a clickable flashcard `div` with no keyboard event handler.
- `svelte-app/src/lib/components/kanji/WritingCanvas.svelte:98` puts `role="img"` on an interactive canvas.

These are real UI/accessibility quality issues even though unit tests pass.

### P1 - Dependency security audit reports high vulnerabilities

`npm audit --audit-level=moderate` reports:

```text
15 vulnerabilities: 1 low, 6 moderate, 8 high
```

High-severity areas include `@sveltejs/kit`, `lodash`, `serialize-javascript`, `fast-uri`, and a Babel plugin. Run `npm audit fix` in a dedicated dependency PR and review breaking changes separately.

### P2 - UI implementation still has parallel component systems

The global CSS still documents a legacy `.btn` system used by many files:

- `svelte-app/src/app.css:323`
- `svelte-app/src/app.css:325`
- `svelte-app/src/app.css:327`

At the same time, shadcn-style components exist under `svelte-app/src/lib/components/ui/`. This increases visual drift and makes UI review harder.

### P2 - Some current UI choices conflict with the stricter Codex design rules

Lesson/course-style hero sections use decorative blurred orbs:

- `svelte-app/src/routes/course/[courseId]/lesson/[id]/+page.svelte:52`
- `svelte-app/src/routes/course/[courseId]/lesson/[id]/+page.svelte:53`

This is not a functional bug, but it conflicts with the newer Codex frontend guidance that avoids decorative orbs and prefers restrained, content-first learning surfaces.

## Positive Signals

- `npm test -- --run`: **53 test files passed, 889 tests passed**.
- `./scripts/quality-audit.sh`: **94/100** after dependencies were installed.
- SPA routing grep checks found no missing `base` usage.
- Data checks found 161 data files, 25 kanji lessons, and 2200 HSK words.
- TTS checks found no raw `SpeechSynthesisUtterance` usage outside the audio utility.
- `svelte-check` shows 0 errors in the quality script path.

## Commands Run

```bash
npm ci
./scripts/quality-audit.sh
npm run build
npm test -- --run
npm audit --audit-level=moderate
npm run test:e2e -- --project=chromium
```

## Recommended PR Order

1. Fix cross-platform build and 404 fallback generation.
2. Fix `quality-audit.sh` so failed commands and zero-test runs fail the audit.
3. Reconcile E2E tests with the current product UI and route model.
4. Fix a11y warnings in Modal, ConfirmDialog, Card, HSK flashcard, and WritingCanvas.
5. Run dependency audit fixes in a separate dependency PR.
6. Consolidate legacy `.btn` usage into the current UI component system.

