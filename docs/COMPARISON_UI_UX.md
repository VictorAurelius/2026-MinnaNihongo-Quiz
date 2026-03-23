# So sánh UI/UX: Smart Quiz vs Nhai Kanji

> **Ngày:** 2026-03-23
> **Nguồn:** https://nhaikanji.com/ vs https://victoraurelius.github.io/2026-Smart-Quiz/

---

## 1. Layout & Navigation

| Tiêu chí | Smart Quiz | Nhai Kanji | Winner |
|----------|-----------|------------|--------|
| Navigation style | Top header + home nav bar (horizontal) | Sidebar cố định (vertical, 18 mục) | Nhai Kanji |
| Page structure | `max-width: 800px`, centered | Grid `[50px 1fr]`, sidebar `md:ml-20` | Nhai Kanji |
| Mobile nav | Header + horizontal scroll nav links | Sidebar collapse + bottom sheet | Nhai Kanji |
| Breadcrumbs | Không có (dùng BackButton) | Không rõ | Hòa |
| Route depth | 3-4 levels (course/lesson/quiz/mode) | 2-3 levels | Smart Quiz quản lý tốt |

**Score:** Smart Quiz **5/10** — Nhai Kanji **8/10**

---

## 2. Typography

| Tiêu chí | Smart Quiz | Nhai Kanji |
|----------|-----------|------------|
| System font | `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto` | `system-ui, inter, dm-sans, be-vietnam-pro` |
| JP font | `Noto Sans JP` (1 font) | `Zen Maru Gothic, UD Digi Kyokasho, Noto Sans JP` (3+ fonts) |
| CN font | `Noto Sans SC, PingFang SC` | Không có |
| Font customization | Không | User chọn font kanji yêu thích |
| Heading hierarchy | `1.35rem → 1.1rem → 0.95rem` | `24px bold` responsive |

**Score:** Smart Quiz **5/10** — Nhai Kanji **9/10**

> Nhai Kanji vượt trội nhờ font kanji chuyên dụng + user-customizable.

---

## 3. Color Scheme & Theming

| Tiêu chí | Smart Quiz | Nhai Kanji |
|----------|-----------|------------|
| Light mode | `#f5f5f7` bg, `#0071e3` primary (Apple-inspired) | Gradient `#d4e4f7` + grid pattern |
| Dark mode | `#1c1c1e` bg, `#4da3ff` primary | `dark:bg-gray-900` (Tailwind) |
| CSS approach | CSS variables (20+ custom properties) | Tailwind CSS + CSS variables |
| Accent colors | `#5856d6` accent, `#34c759` success | Tailwind palette |
| Visual richness | Flat, minimal | Gradient backgrounds, patterns, richer |

**Score:** Smart Quiz **6/10** — Nhai Kanji **8/10**

> Smart Quiz clean nhưng generic. Nhai Kanji có visual identity mạnh hơn.

---

## 4. Animations & Transitions

| Tiêu chí | Smart Quiz | Nhai Kanji |
|----------|-----------|------------|
| Page transition | `fadeIn 0.25s` (opacity + translateY) | Next.js page transitions |
| Card flip | 3D `rotateY(180deg)` với `preserve-3d` | Không rõ |
| Hover effects | `translateY(-2px)` + `shadow-lg` | Ripple effects + hover states |
| Loading states | Không có skeleton/spinner | Skeleton loading cards |
| Micro-interactions | Button `:active scale(0.92)` | Focus rings, ripple effects |

**Score:** Smart Quiz **5/10** — Nhai Kanji **8/10**

> Smart Quiz thiếu skeleton loading và micro-interactions — hai yếu tố tạo cảm giác "polished".

---

## 5. Cards & Components

| Tiêu chí | Smart Quiz | Nhai Kanji |
|----------|-----------|------------|
| Card design | Simple `bg-card + border + shadow` | `rounded-md + border-input + hover:bg-accent` |
| Button system | `.btn` + `.btn-primary/danger/success` (custom CSS) | Tailwind utility classes + component library |
| Input fields | Basic styled inputs | Styled inputs + draw canvas |
| Modals | Basic modal system | Không rõ |
| Progress bars | Custom `ProgressBar.svelte` | Progress indicators |

**Score:** Smart Quiz **6/10** — Nhai Kanji **7/10**

---

## 6. Mobile UX

| Tiêu chí | Smart Quiz | Nhai Kanji |
|----------|-----------|------------|
| Breakpoint | `@media (max-width: 600px)` | Tailwind `md:` (768px) |
| Touch targets | `min-height: 42px` keyboard keys | `h-11` (44px) buttons — Apple HIG compliant |
| Virtual keyboard | Custom kana keyboard + haptic | Draw input canvas |
| Swipe gestures | Không | Không rõ |
| Bottom nav | Không | Implied via sidebar collapse |

**Score:** Smart Quiz **6/10** — Nhai Kanji **7/10**

---

## 7. Onboarding & Empty States

| Tiêu chí | Smart Quiz | Nhai Kanji |
|----------|-----------|------------|
| First-time UX | Landing page với hero stats + section cards | Roadmap + lộ trình có cấu trúc |
| Empty states | Stats page: "No data yet" + emoji icon | Không rõ |
| Tooltips/hints | Quiz hints (Space to flip, F1 to speak) | Không rõ |
| Tutorial | Không có | Không rõ |

**Score:** Smart Quiz **5/10** — Nhai Kanji **7/10**

---

## 8. Branding & Identity

| Tiêu chí | Smart Quiz | Nhai Kanji |
|----------|-----------|------------|
| Logo | Không có (text only "Smart Quiz") | "XÓA MÙ KANJI" + kanji character branding |
| Color identity | Apple-blue generic | Xanh gradient + grid pattern — distinctive |
| Favicon | `favicon.png` basic | Custom icon |
| Personality | Neutral/functional | Character-driven, playful |

**Score:** Smart Quiz **3/10** — Nhai Kanji **8/10**

> Đây là gap lớn nhất — Smart Quiz không có visual identity riêng.

---

## Tổng kết

| # | Category | Smart Quiz | Nhai Kanji |
|---|----------|-----------|------------|
| 1 | Layout & Navigation | 5 | 8 |
| 2 | Typography | 5 | 9 |
| 3 | Color & Theming | 6 | 8 |
| 4 | Animations | 5 | 8 |
| 5 | Cards & Components | 6 | 7 |
| 6 | Mobile UX | 6 | 7 |
| 7 | Onboarding | 5 | 7 |
| 8 | Branding | 3 | 8 |
| | **Total** | **41/80** | **62/80** |

---

## Top 5 UI/UX gaps cần fix

| # | Gap | Hiện tại | Cần làm | Effort |
|---|-----|---------|---------|--------|
| 1 | **Skeleton loading** | Blank flash khi chuyển trang | Skeleton placeholders cho cards, lists | Thấp |
| 2 | **Branding/Logo** | Text "Smart Quiz" generic | Logo + consistent visual identity | Thấp |
| 3 | **Sidebar navigation** | Horizontal nav (crowded khi thêm features) | Sidebar desktop + bottom nav mobile | Trung bình |
| 4 | **Japanese fonts** | Chỉ Noto Sans JP | Thêm Zen Maru Gothic, UD Digi Kyokasho + user choice | Thấp |
| 5 | **Rich animations** | Chỉ fadeIn + card flip | Skeleton loading, page transitions, ripple effects | Trung bình |

---

## CSS Design Tokens so sánh

### Smart Quiz
```css
--bg: #f5f5f7;        --primary: #0071e3;
--bg-card: #ffffff;    --accent: #5856d6;
--border: #d2d2d7;     --radius: 12px;
--shadow: 0 1px 3px rgba(0,0,0,.08);
--font: -apple-system, BlinkMacSystemFont, "Segoe UI";
--font-jp: "Noto Sans JP";
```

### Nhai Kanji
```css
background: gradient #d4e4f7 + grid pattern 20px;
font-family: zen-maru-gothic, ud-digi-kyokasho, noto-sans-jp;
button: h-11 rounded-md px-8 hover:bg-accent;
dark: bg-gray-900;
framework: Tailwind CSS;
```
