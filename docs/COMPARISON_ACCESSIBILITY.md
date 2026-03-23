# So sánh Accessibility: Smart Quiz vs Nhai Kanji

> **Ngày:** 2026-03-23

---

## 1. Color Contrast (WCAG 2.1)

### Smart Quiz

| Element | Colors | Ratio | WCAG AA | WCAG AAA |
|---------|--------|-------|---------|----------|
| Text chính (light) | `#1d1d1f` / `#f5f5f7` | ~15.4:1 | ✅ | ✅ |
| Text muted (light) | `#6e6e73` / `#f5f5f7` | ~4.6:1 | ✅ | ❌ |
| Text chính (dark) | `#f5f5f7` / `#1c1c1e` | ~15.4:1 | ✅ | ✅ |
| Text muted (dark) | `#98989d` / `#1c1c1e` | ~5.3:1 | ✅ | ❌ |
| Primary button | `#0071e3` text trắng | ~4.6:1 | ✅ | ❌ |
| Warning text | `#ff9500` / trắng | ~3.0:1 | ❌ | ❌ |
| Success text | `#34c759` / trắng | ~2.9:1 | ❌ | ❌ |

**Vấn đề:** Warning (`#ff9500`) và Success (`#34c759`) không đạt WCAG AA khi dùng làm text trên nền trắng.

### Nhai Kanji
- Dùng gray text `#a1a1aa` trên dark background — có thể gặp vấn đề contrast.
- Không đánh giá chi tiết được (content render bằng JS).

**Score:** Smart Quiz **6/10** — Nhai Kanji **5/10** (ước tính)

---

## 2. ARIA & Semantic HTML

### Smart Quiz

**Có:**
- `aria-label` trên FlashCard, Header links, Modal buttons, BackButton
- `aria-modal="true"` trên modals
- `aria-valuenow/min/max` trên ProgressBar
- `aria-checked` trên vocabulary checkboxes
- `aria-hidden="true"` trên romaji display
- `role="progressbar"`, `role="dialog"`, `role="button"`, `role="checkbox"`, `role="presentation"`

**Thiếu nghiêm trọng:**
- ❌ Không có `aria-live` region — screen reader không được thông báo khi quiz chuyển câu, đáp án đúng/sai
- ❌ Không có skip-link ("Skip to main content")
- ❌ Không có `.sr-only` / `visually-hidden` class
- ❌ Không có `alt` text trên bất kỳ element nào

### Nhai Kanji
- ❌ Không phát hiện aria attributes trong HTML
- ❌ Không dùng semantic HTML (`<nav>`, `<main>`, `<header>`) — toàn bộ là `<div>`
- ❌ Logo thiếu alt text

**Score:** Smart Quiz **6/10** — Nhai Kanji **2/10**

---

## 3. Keyboard Navigation

### Smart Quiz

**Điểm mạnh:**
- F1: Speak (tất cả quiz components)
- Space/Enter: Flip flashcard
- 1-4: Chọn đáp án MC
- Enter: Submit/Next trong typing quiz
- Escape: Đóng modal
- `tabindex="0"` trên interactive elements

**Thiếu:**
- ❌ Không có `focus-visible` styles — khi Tab, không thấy focus indicator
- ❌ Không có focus trap trong modals
- ❌ Không có `prefers-reduced-motion` media query

### Nhai Kanji
- Không xác nhận được keyboard navigation (content render bằng JS)

**Score:** Smart Quiz **7/10** — Nhai Kanji **4/10** (ước tính)

---

## 4. Tổng kết

| Category | Smart Quiz | Nhai Kanji |
|----------|-----------|------------|
| Color Contrast | 6/10 | 5/10 |
| ARIA & Semantic | 6/10 | 2/10 |
| Keyboard Navigation | 7/10 | 4/10 |
| Screen Reader | 3/10 | 2/10 |
| **Total** | **22/40** | **13/40** |

> Smart Quiz vượt trội về accessibility nhờ ARIA attributes và keyboard shortcuts. Tuy nhiên cả hai đều thiếu nhiều so với WCAG 2.1 AA.

---

## Khuyến nghị cho Smart Quiz

| Priority | Action | Impact |
|----------|--------|--------|
| 🔴 P0 | Thêm `aria-live="polite"` cho quiz feedback (đúng/sai, score) | Screen reader +3 |
| 🔴 P0 | Sửa contrast cho warning `#ff9500` và success `#34c759` | WCAG compliance |
| 🟠 P1 | Thêm skip-link "Skip to main content" | Navigation +1 |
| 🟠 P1 | Thêm `focus-visible` styles (outline khi Tab) | Keyboard +1 |
| 🟠 P1 | Implement focus trap trong modals | Keyboard +1 |
| 🟡 P2 | Thêm `@media (prefers-reduced-motion: reduce)` | Motion sensitivity |
| 🟡 P2 | Thêm `.sr-only` class cho screen reader text | Screen reader +1 |
