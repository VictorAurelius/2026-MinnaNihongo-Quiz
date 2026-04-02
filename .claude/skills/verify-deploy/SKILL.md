---
name: verify-deploy
description: "Use when user says 'check deploy', 'verify production', 'site working?', 'kiểm tra deploy', or after merging v4-dev → main. Fetches live pages, checks HTTP status, verifies key content renders, reports PASS/FAIL per page."
user-invocable: true
---

# Verify Deploy

Checks production site after deploy. Fetches live pages, verifies content.

## Skill Contents

- `reference/pages.md` — List of pages to check with expected content

## Process

### 1. Check CI status
```bash
gh run list --limit 3 --json status,conclusion,headBranch
```
Verify latest main run = `completed` + `success`.

### 2. Fetch each production page

Base URL: `https://victoraurelius.github.io/2026-Smart-Quiz`

For each page, use WebFetch to:
- Verify page loads (not 404)
- Check key content exists (title, heading, specific text)

### 3. Output report

```
=== DEPLOY VERIFICATION ===
CI: ✅ PASS (run #X, completed success)

| Page | URL | Status | Key Content |
|------|-----|--------|-------------|
| Home | /2026-Smart-Quiz/ | ✅/❌ | "Learn 日本語" found |
| Courses | /2026-Smart-Quiz/courses | ✅/❌ | "Japanese Courses" found |
| ...  | ... | ... | ... |

Result: X/Y pages OK
```

## Gotchas

- GitHub Pages may take 1-2 minutes after CI completes to update
- SPA routing: all pages serve index.html, content renders client-side
- WebFetch may not execute JavaScript — check for SSR content or meta tags
- 404.html = copy of index.html (SPA fallback) — a "200" doesn't mean page works
- Check `<title>` tag as minimum proof the build includes the page
