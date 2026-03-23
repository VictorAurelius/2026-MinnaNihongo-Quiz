# So sánh Performance & SEO: Smart Quiz vs Nhai Kanji

> **Ngày:** 2026-03-23

---

## 1. SEO

| Tiêu chí | Smart Quiz | Nhai Kanji | Winner |
|----------|-----------|------------|--------|
| `<title>` tag | Không có trong app.html | "XÓA MÙ KANJI - CHIẾT TỰ" | Nhai Kanji |
| `meta description` | Có (English only) | Có (Vietnamese) | Nhai Kanji |
| `og:title` | Không có | Có | Nhai Kanji |
| `og:description` | Không có | Có | Nhai Kanji |
| `og:image` | Không có | Có (`share.png`) | Nhai Kanji |
| `twitter:card` | Không có | `summary_large_image` | Nhai Kanji |
| Structured data (JSON-LD) | Không có | Không có | Hòa |
| `canonical` URL | Không có | Không rõ | Hòa |
| SSR/Pre-render | Không (SPA, adapter-static) | Có (Next.js SSR) | Nhai Kanji |
| HTML content for crawlers | 1.35 KB (chỉ JS shell) | 385 KB (full SSR content) | Nhai Kanji |
| Ngôn ngữ trang | `lang="ja"` | `lang="vi"` | Hòa |

**Score:** Smart Quiz **2/10** — Nhai Kanji **7/10**

> Smart Quiz hầu như không có SEO metadata. Vì là SPA (client-side only), search engines không crawl được nội dung.

---

## 2. Performance

| Tiêu chí | Smart Quiz | Nhai Kanji | Winner |
|----------|-----------|------------|--------|
| **Font loading** | 0 custom font preload | **522 file woff2 preload** (rất tệ) | Smart Quiz |
| **JS delivery** | 3 modulepreload + lazy chunks | 30 async chunks | Smart Quiz |
| **CSS files** | 31 (load theo route) | 6 | Hòa |
| **Code splitting** | Manual chunks (lesson-data, grammar-data, hsk-data, vendor) | Next.js auto split | Hòa |
| **Largest JS chunk** | 412 KB (lesson-data) | Không rõ | — |
| **Total build size** | 2.5 MB | Không rõ | — |
| **Compression** | Pre-compressed (.br, .gz) | Server-side | Smart Quiz |
| **Minification** | Terser (drop_console, no sourcemap) | Next.js default | Hòa |
| **Preload strategy** | `data-sveltekit-preload-data="hover"` | Next.js prefetch | Hòa |
| **PWA** | Service Worker + manifest + install prompt | Partial (apple-mobile-web-app) | Smart Quiz |
| **Lazy loading images** | Không rõ | Không có | Hòa |
| **SSR** | Không (SPA fallback) | Có | Nhai Kanji |

**Score:** Smart Quiz **7/10** — Nhai Kanji **5/10**

> Nhai Kanji có vấn đề nghiêm trọng: **522 font woff2 preload** block rendering. Smart Quiz nhẹ hơn nhiều nhờ static SPA + compression.

---

## 3. PWA & Manifest

| Tiêu chí | Smart Quiz | Nhai Kanji |
|----------|-----------|------------|
| Service Worker | Có (cache-first + runtime cache) | Không rõ |
| Manifest.json | Có (icons, shortcuts, theme) | Partial |
| Install prompt | Có (banner sau 30s) | Không rõ |
| Offline support | Có | Không (cần Firebase) |
| Update notification | Có (skip-waiting + reload) | Không rõ |

**Vấn đề Smart Quiz manifest:**
- `start_url: "/"` — thiếu base path `/2026-Smart-Quiz/`
- `shortcuts` URLs thiếu base path
- `theme_color` không nhất quán: manifest `#6366f1` vs app.html `#4a90e2`

---

## 4. Tổng kết

| Category | Smart Quiz | Nhai Kanji |
|----------|-----------|------------|
| SEO | 2/10 | 7/10 |
| Performance | 7/10 | 5/10 |
| PWA | 7/10 | 3/10 |
| **Total** | **16/30** | **15/30** |

---

## Khuyến nghị cho Smart Quiz

| Priority | Action | Impact |
|----------|--------|--------|
| 🔴 P0 | Thêm `<title>` tag vào `app.html` | SEO +2 |
| 🔴 P0 | Thêm OG tags (`og:title`, `og:description`, `og:image`) | SEO +3, social sharing |
| 🔴 P0 | Thêm Twitter Card meta tags | SEO +1 |
| 🟠 P1 | Fix manifest.json: `start_url`, shortcuts thêm base path | PWA correctness |
| 🟠 P1 | Thống nhất `theme_color` | Consistency |
| 🟡 P2 | Cân nhắc pre-rendering routes thay vì SPA fallback | SEO +3 |
| 🟡 P2 | Thêm JSON-LD structured data (WebApplication schema) | SEO +1 |
| 🟡 P2 | Giảm kích thước 2 chunk lớn nhất (412KB, 283KB) | Performance |
