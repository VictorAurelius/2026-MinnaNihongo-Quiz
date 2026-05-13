# SPA Routing Playbook

Use this when fixing navigation, redirects, GitHub Pages 404s, or route helpers.

## Rules

Production deploys under `/2026-Smart-Quiz/`, so all internal absolute navigation must include SvelteKit `base`.

Correct:

```typescript
import { base } from '$app/paths';
goto(`${base}/course/n5/lesson/1`);
```

Avoid:

```typescript
goto('/course/n5/lesson/1');
```

## Checklist

- `goto()` uses `${base}`.
- `redirect()` in `+page.ts` uses `${base}`.
- Internal `<a href>` values use `{base}`.
- Prefer URL builders from `courseUtils.ts`.
- Keep `build/404.html` fallback behavior intact.

## Search

```bash
rg -n "goto\\(|redirect\\(|href=\"/" svelte-app/src
```

## Verification

Run:

```bash
./scripts/test-local.sh --quick
```
