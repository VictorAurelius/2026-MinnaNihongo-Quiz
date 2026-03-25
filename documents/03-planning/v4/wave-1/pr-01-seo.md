# PR #1: SEO Fundamentals

**Wave:** 1 — Foundation
**Branch:** `feat/seo-meta-tags`
**Est:** 1h | **New tests:** 9
**Status:** [ ] Not started

---

## 1. Brainstorm

### Problem
- SEO score 2/10 (từ COMPARISON_PERFORMANCE_SEO.md)
- app.html không có `<title>` default, không OG tags, không Twitter cards
- Khi share link trên Facebook/Twitter → blank preview, không có hình
- Google không index nội dung (SPA, chỉ JS shell)
- `lang="ja"` sai — target audience là người Việt

### Solution
Thêm đầy đủ SEO metadata vào app.html:
- OG Protocol (Facebook, LinkedIn, Zalo)
- Twitter Cards (summary_large_image)
- Canonical URL
- Fix lang="vi"
- Fix manifest.json (start_url, theme_color)

### Alternatives Considered
| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| SSR (adapter-node) | Google crawls content | Need server, chi phí hosting | ❌ Reject — quá lớn cho SEO fix |
| Pre-render routes | Static HTML for crawlers | Build time tăng, complexity | ❌ Defer — cân nhắc sau |
| Meta tags only | Zero infra change, 1h work | Content vẫn SPA | ✅ Pick — best ROI |

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| `<svelte:head>` override app.html title | Medium | Low | app.html = fallback, mỗi page override |
| OG image file quá lớn | Low | Low | Compress < 300KB |
| manifest.json base path breaking PWA | Medium | Medium | Test install after change |

### Edge Cases
- Page không có `<svelte:head>` → app.html fallback title hiện
- OG image path phải absolute URL (GitHub Pages)
- Twitter bot cache cũ → dùng Twitter Card Validator clear

---

## 2. Task Breakdown

| # | Task | Files | Est | Verify |
|---|------|-------|-----|--------|
| 1 | Viết SEO tests (RED) | `src/tests/seo.test.ts` | 5m | `npx vitest run` — 9 tests FAIL |
| 2 | Thêm title + meta desc | `src/app.html` | 3m | Tests 2 pass |
| 3 | Thêm OG tags | `src/app.html` | 3m | Tests 4 pass |
| 4 | Thêm Twitter cards | `src/app.html` | 3m | Tests 2 pass |
| 5 | Thêm canonical URL | `src/app.html` | 2m | Test 1 pass |
| 6 | Fix lang="ja" → "vi" | `src/app.html` | 1m | Test 1 pass |
| 7 | Fix manifest.json | `static/manifest.json` | 3m | Tests pass |
| 8 | Verify 25 routes có title | Grep all `+page.svelte` | 5m | `grep -rn '<title>' | wc -l` ≥ 25 |
| 9 | Tạo OG image | `static/og-image.png` | 5m | File exists, < 300KB |

---

## 3. TDD — Full Test Code

```typescript
// src/tests/seo.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const appHtml = readFileSync(join(__dirname, '../../src/app.html'), 'utf-8');
const manifest = JSON.parse(readFileSync(join(__dirname, '../../static/manifest.json'), 'utf-8'));

describe('SEO Metadata — app.html', () => {
  it('should have default <title> tag', () => {
    expect(appHtml).toMatch(/<title>.*Smart Quiz.*<\/title>/);
  });

  it('should have meta description', () => {
    expect(appHtml).toMatch(/<meta\s+name="description"\s+content="[^"]+"/);
  });

  it('should have og:title and og:description', () => {
    expect(appHtml).toMatch(/<meta\s+property="og:title"\s+content="[^"]+"/);
    expect(appHtml).toMatch(/<meta\s+property="og:description"\s+content="[^"]+"/);
  });

  it('should have og:image and og:type', () => {
    expect(appHtml).toMatch(/<meta\s+property="og:image"\s+content="[^"]+"/);
    expect(appHtml).toMatch(/<meta\s+property="og:type"\s+content="website"/);
  });

  it('should have twitter:card and twitter:title', () => {
    expect(appHtml).toMatch(/<meta\s+name="twitter:card"\s+content="summary_large_image"/);
    expect(appHtml).toMatch(/<meta\s+name="twitter:title"\s+content="[^"]+"/);
  });

  it('should have canonical URL', () => {
    expect(appHtml).toMatch(/<link\s+rel="canonical"\s+href="[^"]+"/);
  });

  it('should have lang="vi"', () => {
    expect(appHtml).toMatch(/<html\s+lang="vi"/);
  });
});

describe('SEO — manifest.json', () => {
  it('start_url should include base path', () => {
    expect(manifest.start_url).toContain('2026-Smart-Quiz');
  });

  it('theme_color should be consistent', () => {
    const themeColorInHtml = appHtml.match(/name="theme-color"\s+content="([^"]+)"/)?.[1];
    expect(manifest.theme_color).toBe(themeColorInHtml);
  });
});
```

---

## 4. Implementation Notes

### app.html changes
```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <title>Smart Quiz — Học Tiếng Nhật & Tiếng Trung</title>
    <meta name="description" content="App luyện thi JLPT và HSK miễn phí. Flashcard, trắc nghiệm, gõ kana, ngữ pháp, kanji cho người Việt." />

    <!-- Open Graph -->
    <meta property="og:title" content="Smart Quiz — Học Tiếng Nhật & Tiếng Trung" />
    <meta property="og:description" content="App luyện thi JLPT và HSK miễn phí. Flashcard, trắc nghiệm, gõ kana, ngữ pháp, kanji." />
    <meta property="og:image" content="https://victoraurelius.github.io/2026-Smart-Quiz/og-image.png" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://victoraurelius.github.io/2026-Smart-Quiz/" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Smart Quiz — Học Tiếng Nhật & Tiếng Trung" />
    <meta name="twitter:description" content="App luyện thi JLPT và HSK miễn phí." />
    <meta name="twitter:image" content="https://victoraurelius.github.io/2026-Smart-Quiz/og-image.png" />

    <!-- Canonical -->
    <link rel="canonical" href="https://victoraurelius.github.io/2026-Smart-Quiz/" />

    <!-- Existing -->
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#6366f1" />
    ...
  </head>
```

### manifest.json changes
```json
{
  "start_url": "/2026-Smart-Quiz/",
  "theme_color": "#6366f1",
  "shortcuts": [
    { "url": "/2026-Smart-Quiz/", ... },
    { "url": "/2026-Smart-Quiz/grammar-reference", ... },
    ...
  ]
}
```

---

## 5. Acceptance Criteria

- [ ] `<title>` contains "Smart Quiz"
- [ ] `meta description` present, Vietnamese
- [ ] `og:title`, `og:description`, `og:image`, `og:type`, `og:url` present
- [ ] `twitter:card` = `summary_large_image`
- [ ] `link rel="canonical"` present
- [ ] `lang="vi"` on `<html>`
- [ ] `manifest.json` start_url = `/2026-Smart-Quiz/`
- [ ] `theme_color` = `#6366f1` in both app.html and manifest.json
- [ ] 25/25 routes have `<svelte:head><title>`
- [ ] `og-image.png` exists in `static/`, < 300KB
- [ ] All 9 tests pass
- [ ] Build pass
- [ ] `./scripts/quality-audit.sh` score ≥ 100

---

## 6. Skills to Create (nếu phát hiện pattern mới)

Không dự kiến tạo skill mới cho PR này (scope nhỏ, không có pattern lặp lại).
