# Production Screenshot Capture

Capture screenshots from LIVE production site (not local dev server).

## Script

Uses the same `capture-screenshots.ts` but with production BASE_URL:

```bash
cd svelte-app && BASE_URL=https://victoraurelius.github.io/2026-Smart-Quiz npx tsx scripts/capture-prod-screenshots.ts
```

## Differences from dev capture

| | Dev capture | Prod capture |
|---|---|---|
| URL | `http://localhost:5174` | `https://victoraurelius.github.io/2026-Smart-Quiz` |
| Paths | `/settings` | `/2026-Smart-Quiz/settings` |
| Dark mode | localStorage injection | localStorage injection (same) |
| Output | `documents/04-quality/screenshots/` | `documents/04-quality/screenshots-prod/` |
| Git | gitignored | gitignored |

## Gotchas

- Production uses base path `/2026-Smart-Quiz` — all page paths must include it
- GitHub Pages may cache old version — add `?t=timestamp` if needed
- SPA routing: non-root pages serve via 404.html redirect — may need `waitUntil: 'networkidle'`
- First load slower than dev — increase timeout to 30s
