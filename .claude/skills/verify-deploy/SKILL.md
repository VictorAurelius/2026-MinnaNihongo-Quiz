---
name: verify-deploy
description: "Use when user says 'check deploy', 'verify production', 'screenshot production', 'site working?', 'kiểm tra deploy', or after merging v4-dev → main. Checks CI, fetches pages, captures production screenshots, reports PASS/FAIL."
user-invocable: true
---

# Verify Deploy

Checks production site + captures screenshots after deploy.

## Skill Contents

- `reference/pages.md` — Pages to check with expected content
- `reference/screenshot-prod.md` — Production screenshot capture guide
- Screenshot script: `svelte-app/scripts/capture-prod-screenshots.ts`

## Process

### 1. Check CI status
```bash
gh run list --limit 3 --json status,conclusion,headBranch
```
Verify latest main run = `completed` + `success`.

### 2. Fetch production pages (WebFetch)
Base URL: `https://victoraurelius.github.io/2026-Smart-Quiz`
- Verify HTML loads, title contains "Smart Quiz"
- Verify no `%sveltekit.body%` placeholder (build succeeded)
- Verify `/_app/` asset references present

### 3. Capture production screenshots
```bash
cd svelte-app && BASE_URL=https://victoraurelius.github.io/2026-Smart-Quiz npx tsx scripts/capture-screenshots.ts --label prod
```
Saves to `documents/04-quality/screenshots/prod/{page}/{theme}-{viewport}.png`

### 4. Visual review
Read key screenshots per screen subfolder:
- `screenshots/prod/home/dark-mobile.png`
- `screenshots/prod/lesson-menu/dark-mobile.png`
- `screenshots/prod/kanji/dark-mobile.png`

### 5. Output report
```
=== DEPLOY VERIFICATION ===
CI: ✅/❌
HTML: ✅/❌ (title, assets, no placeholder)
Screenshots: ✅/❌ (X/28 captured)
Visual: ✅/❌ (key pages render correctly)
```

## Gotchas

- GitHub Pages may take 1-2 min after CI to update
- SPA: all routes serve index.html, content renders client-side
- Production uses `networkidle` wait (slower than dev `domcontentloaded`)
- Screenshots-prod are gitignored — local only
- First load on prod slower — script uses 30s timeout + 1.5s settle
