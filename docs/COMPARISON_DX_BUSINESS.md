# So sánh DX & Business Model: Smart Quiz vs Nhai Kanji

> **Ngày:** 2026-03-23

---

## Phần 1: Developer Experience & Code Quality

### Smart Quiz

| Metric | Value |
|--------|-------|
| **Open source** | Có (MIT License) |
| **Test suite** | 605 tests, 22 files, 100% pass |
| **Source files** | 140 (.ts + .svelte) trong src/lib/ |
| **Route pages** | 25 (+page.svelte) |
| **Test/Source ratio** | ~16% |
| **CI/CD** | 2 GitHub Actions workflows (deploy + auto-merge) |
| **CI speed** | ~1-2 phút |
| **Documentation** | 17+ docs (CLAUDE.md, TECHNICAL, ARCHITECTURE, CONTRIBUTING, etc.) |
| **Framework** | SvelteKit 2 + TypeScript strict |
| **Commit convention** | Conventional commits (feat:, fix:, docs:) |
| **Branch naming** | fix/, feat/, test/, docs/ |
| **Quality audit** | Automated script (`scripts/quality-audit.sh`) — 100/100 |

### Nhai Kanji

| Metric | Value |
|--------|-------|
| **Open source** | Không (closed source, proprietary) |
| **Test suite** | Không rõ |
| **CI/CD** | Không rõ |
| **Documentation** | Không có public docs |
| **Framework** | Next.js + Firebase |
| **Contributing guide** | Không có |

### So sánh

| Tiêu chí | Smart Quiz | Nhai Kanji | Winner |
|----------|-----------|------------|--------|
| Transparency | Open source, public repo | Closed source | Smart Quiz |
| Test coverage | 605 tests, automated | Không rõ | Smart Quiz |
| CI/CD | 2 workflows, auto-merge | Không rõ | Smart Quiz |
| Documentation | 17+ files, rất chi tiết | Không có | Smart Quiz |
| Quality tooling | Audit script tự động | Không rõ | Smart Quiz |
| Tech modernity | SvelteKit 2 (2024+) | Next.js (mature) | Hòa |

**Score:** Smart Quiz **9/10** — Nhai Kanji **5/10** (ước tính, thiếu data)

> Smart Quiz vượt trội về DX: open source, test đầy đủ, CI/CD, tài liệu cấp chuyên nghiệp.

---

## Phần 2: Business Model

### Smart Quiz

| Hạng mục | Chi tiết |
|----------|---------|
| **Mô hình** | Free & open source (MIT) |
| **Monetization** | Không có — không ads, không premium, không IAP |
| **Hosting cost** | $0/tháng (GitHub Pages) |
| **Backend** | Không có — static + localStorage |
| **Authentication** | Không cần đăng nhập |
| **Revenue** | $0 |
| **Mục đích** | Portfolio/học tập |

### Nhai Kanji

| Hạng mục | Chi tiết |
|----------|---------|
| **Mô hình** | Freemium (free tier + 3 gói trả phí) |
| **Hosting cost** | Firebase (trả theo usage) |
| **Backend** | Firebase (Firestore + Auth + Hosting) |
| **Authentication** | Google OAuth (bắt buộc để mua gói) |
| **Quảng cáo** | Không phát hiện |

### Bảng giá Nhai Kanji

| Gói | Giá | Tính năng |
|-----|-----|-----------|
| **Linh Hoạt** | 29,000đ/tháng | 2,500 kanji, full bộ từ vựng, đồng bộ nhiều thiết bị, flashcard SRS, quiz, typing, đọc hiểu, luyện nghe |
| **Siêu Tiết Kiệm** | 199,000đ/năm (giảm từ 349k) | Tất cả Linh Hoạt + đề thi JLPT |
| **Premium+** | 365,000đ/năm (giảm từ 549k) | Tất cả + tài liệu học tập |
| **Gói Tài Liệu** | 199,000đ (mua 1 lần) | 214 bộ thủ, tập viết 2,500 kanji, Mina 50 bài, ebook |

**Ước tính doanh thu:** Với 1,000 người dùng trả phí gói năm → ~199 triệu VND/năm (~$8,000 USD)

### So sánh

| Tiêu chí | Smart Quiz | Nhai Kanji | Winner |
|----------|-----------|------------|--------|
| Chi phí vận hành | $0 | Có phí Firebase | Smart Quiz |
| Revenue potential | $0 | Subscription recurring | Nhai Kanji |
| Barrier to entry | Không (no login) | Thấp (free tier) | Smart Quiz |
| Scalability cost | $0 (static) | Tăng theo users | Smart Quiz |
| IP protection | Không (MIT) | Có (closed source) | Nhai Kanji |
| Sustainability | Phụ thuộc developer | Có revenue stream | Nhai Kanji |

**Score:** Smart Quiz **4/10** — Nhai Kanji **8/10**

---

## Tổng kết

| Category | Smart Quiz | Nhai Kanji |
|----------|-----------|------------|
| Developer Experience | 9/10 | 5/10 |
| Business Model | 4/10 | 8/10 |
| **Total** | **13/20** | **13/20** |

> Hai dự án bổ trợ nhau: Smart Quiz mạnh về DX, Nhai Kanji mạnh về business.

---

## Khuyến nghị cho Smart Quiz

### Nếu muốn thương mại hoá:

| Priority | Action | Impact |
|----------|--------|--------|
| 🟠 P1 | Thêm Google Auth + Firebase sync | Nền tảng cho premium tier |
| 🟠 P1 | Tạo free tier (N5 basic) + premium (N4+, SRS, đề thi) | Revenue stream |
| 🟡 P2 | Thêm leaderboard (cần auth) | Engagement + social proof |
| 🟡 P2 | Tích hợp Stripe/MoMo/ZaloPay | Payment processing |

### Nếu giữ open source:

| Priority | Action | Impact |
|----------|--------|--------|
| 🟠 P1 | Thêm GitHub Sponsors / Ko-fi donation | Nhận ủng hộ |
| 🟡 P2 | Tạo plugin system để cộng đồng đóng góp content | Scale content |
| 🟡 P2 | Marketing: ProductHunt, Reddit r/LearnJapanese | Organic growth |
