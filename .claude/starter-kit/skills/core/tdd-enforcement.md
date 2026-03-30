# TDD Enforcement — {project} Gotchas

Claude already knows RED-GREEN-REFACTOR. This file contains **project-specific test gotchas only**.

## {project} Test Setup

- Framework: **{test framework}** (e.g., Vitest, Jest, Pytest)
- Test dir: `{test directory}`
- Run: `{test command}`

## Gotchas

<!-- Add project-specific test gotchas here. Examples: -->

1. **{Mock requirement}** — {what happens if you don't mock it}:
   ```{language}
   // example mock setup
   ```

2. **{Environment guard}** — {SSR/test environment issue}:
   ```{language}
   if (typeof window !== 'undefined') { ... }
   ```

3. **{State management gotcha}** — {framework-specific state reuse issue}

4. **{Pre-push requirement}**: `{test script}` — NEVER push without this passing.
