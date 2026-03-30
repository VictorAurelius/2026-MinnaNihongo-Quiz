# TDD Enforcement — Smart Quiz Gotchas

Claude already knows RED-GREEN-REFACTOR. This file contains **project-specific gotchas only**.

## Smart Quiz Test Setup

- Framework: **Vitest** + `@testing-library/svelte`
- Test dir: `svelte-app/src/tests/` mirrors `src/lib/` structure
- Run: `cd svelte-app && npx vitest run` (772+ tests)

## Gotchas

1. **Always mock `speechSynthesis.cancel`** — tests crash without it:
   ```typescript
   Object.defineProperty(window, 'speechSynthesis', {
     value: { speak: vi.fn(), cancel: vi.fn() },
     writable: true
   });
   ```

2. **Guard `window` access** — SSR/test environment has no `window`:
   ```typescript
   if (typeof window !== 'undefined') { ... }
   ```

3. **Svelte component state reuse** — Svelte reuses instances when props change. Tests must verify reactive reset:
   ```typescript
   // After changing props, check component re-rendered
   await tick();
   ```

4. **Quiz direction tests** — test all 3: `ja-vi`, `vi-ja`, `vi-romaji`. Romaji normalization has edge cases (`shi/si`, `chi/ti`, `tsu/tu`, `fu/hu`).

5. **Pre-push mandatory**: `./scripts/test-local.sh svelte-app` — NEVER push without this passing.
