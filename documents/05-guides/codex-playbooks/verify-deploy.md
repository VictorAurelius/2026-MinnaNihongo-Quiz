# Verify Deploy Playbook

Use this after deployment, routing changes, or release PRs.

## Production

GitHub Pages URL:

```text
https://victoraurelius.github.io/2026-Smart-Quiz/
```

## Checklist

- Home page loads under the GitHub Pages base path.
- Deep links load through SPA fallback.
- Course, lesson, quiz, kanji, and HSK routes render.
- Static assets resolve with the correct base path.
- `build/404.html` exists after build.

## Commands

```bash
./scripts/test-local.sh --quick
./scripts/check-ci.sh --status
```

Use `./scripts/check-ci.sh` when waiting for CI completion.
