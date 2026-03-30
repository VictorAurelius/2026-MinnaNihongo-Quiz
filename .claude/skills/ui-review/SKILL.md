---
name: ui-review
description: "Use when user says 'review UI', 'check design', 'how does it look', 'audit screenshots', 'chấm điểm UI', 'nâng cấp giao diện', 'cải thiện visual', 'thêm gamification', 'app nhạt', 'không bắt mắt', or after any UI/UX code change. Captures screenshots, scores 5 dimensions (technical, heuristics, aesthetics, friendliness, accessibility) on /128 scale, outputs WCAG audit table, actionable code fixes, visual uplift suggestions, and gamification patterns."
---

# UI Review

Scores UI quality across 5 dimensions after every change. Tracks progression, flags WCAG issues, suggests code fixes, and provides visual uplift + gamification guidance to make the app engaging.

## Skill Contents

- `reference/scoring-guide.md` — Scoring tables for 5 dimensions + layout checklist
- `reference/wcag-audit.md` — WCAG 2.1 AA checklist with PASS/WARN/FAIL table
- `reference/code-fixes.md` — How to write actionable code fix suggestions (includes spacing fix patterns)
- `reference/visual-uplift.md` — Color psychology, typography, hero patterns, micro-details for e-learning
- `reference/gamification.md` — XP system, streaks, badges, animations, completion screens
- `data/` — Previous report scores for comparison
- Screenshot capture script: `svelte-app/scripts/capture-screenshots.ts`

## Mode Detection

Đọc request của user và chọn mode phù hợp:

| User says | Mode | Reference files to read |
|-----------|------|--------------------------|
| "review UI", "chấm điểm" | **Audit** | scoring-guide, wcag-audit, code-fixes |
| "nhạt", "không bắt mắt", "nâng cấp visual" | **Visual Uplift** | visual-uplift, code-fixes |
| "gamification", "engagement", "thêm streak/XP" | **Gamification** | gamification, code-fixes |
| "redesign", "cải thiện toàn diện" | **Full** | tất cả reference files |
| "sửa margin/spacing" | **Fix** | code-fixes (spacing section) |

## Process

### 1. Visual Inventory
Before scoring, identify:
- Platform & viewport (mobile/desktop, light/dark)
- Design maturity (prototype/production)
- Key components visible in screenshots

### 2. Capture screenshots
```bash
cd svelte-app && npx vite build && BASE_URL=http://localhost:5174 npx tsx scripts/capture-screenshots.ts
```

**Fallback nếu server không chạy hoặc script lỗi:**
Yêu cầu user paste screenshot trực tiếp vào chat, ghi chú "Scored from user-provided screenshot" trong report. Không block toàn bộ process.

### 3. Read all dark-mobile screenshots
Read files in `documents/04-quality/screenshots/{page}-dark-mobile.png`

### 4. Score 5 dimensions
Consult `reference/scoring-guide.md` for criteria:

- **Technical (/20)** — accessibility, performance, responsive, theming, anti-patterns
- **Design Heuristics (/40)** — Nielsen's 10 heuristics (0-4 each)
- **Visual Aesthetics (/28)** — color, typography, sizing, spacing, alignment, hierarchy, polish + layout checklist
- **User Friendliness (/20)** — first impression, navigation, actions, learning curve, delight
- **WCAG Accessibility (/20)** — contrast, touch targets, labels, ARIA, screen reader. Output PASS/WARN/FAIL table per `reference/wcag-audit.md`

### 5. Top 3 critical issues
Identify the 3 most impactful problems. For each, provide:
- What's wrong + which heuristic/WCAG criterion violated
- User impact
- **Code fix** with before/after using project stack (SvelteKit + Tailwind). See `reference/code-fixes.md`

**Khi fix spacing/margin:** Luôn xác định file path trước, check xem vấn đề ở parent hay component con, dùng `gap-*`/`space-y-*`/`p-*` thay vì margin manual. Xem spacing patterns trong `reference/code-fixes.md`.

### 6. Visual Uplift Recommendations (nếu Aesthetics < 20/28 hoặc user yêu cầu)
Consult `reference/visual-uplift.md`:
- Đề xuất color palette upgrade phù hợp e-learning
- Typography pairing cụ thể
- Hero banner pattern với code
- Card/list item upgrade với before/after Svelte code
- Micro-details checklist còn thiếu

### 7. Gamification Recommendations (nếu user yêu cầu hoặc Friendliness < 14/20)
Consult `reference/gamification.md`:
- Chọn mechanic phù hợp với giai đoạn app (MVP vs production)
- Cung cấp TypeScript types + Svelte component code đầy đủ
- Gợi ý thứ tự implement: XP → Streak → Badges → Completion screen

### 8. Output report
Save to `documents/04-quality/ui-review-latest.md`. Include score progression table.

## Component Locator (trước khi viết fix)

1. Đọc `src/routes/` để map page → route file
2. Tìm component theo tên element (e.g. "lesson card" → tìm `*Card*`, `*Lesson*`)
3. Vấn đề margin/spacing thường ở **parent container**, không phải component con
4. Luôn state file path rõ trong fix: `// File: src/routes/lesson/[id]/+page.svelte`

## Gotchas

- Dev server MUST be running on port 5174 before capture — nhưng có fallback (xem bước 2)
- Screenshots use `page.reload()` after localStorage injection — increase waitForTimeout if theme wrong
- Vocabulary page may render blank — not a real bug
- Score 4 only for genuinely excellent work. Most things score 2-3
- Judge aesthetics by what you SEE, not what code says
- For friendliness, think as Vietnamese student who just downloaded the app
- Code fixes MUST use project stack: **SvelteKit + Svelte 4 + Tailwind CSS v4 + shadcn-svelte + lucide-svelte**. No React, no raw CSS
- Spacing fixes: dùng `gap-*`, `space-y-*`, `p-*` — không dùng `mt-`, `mb-` manual trừ khi cần thiết
- Gamification: implement theo thứ tự XP → Streak → Badges — đừng ship tất cả cùng lúc

## Scoring Bands

| Dimension | Excellent | Good | Acceptable | Poor |
|-----------|-----------|------|------------|------|
| Technical (/20) | 18+ | 14-17 | 10-13 | <10 |
| Heuristics (/40) | 36+ | 28-35 | 20-27 | <20 |
| Aesthetics (/28) | 25+ | 20-24 | 14-19 | <14 |
| Friendliness (/20) | 18+ | 14-17 | 10-13 | <10 |
| WCAG (/20) | 18+ | 14-17 | 10-13 | <10 |
| **Combined (/128)** | **108+** | **90-107** | **65-89** | **<65** |

## Expected Score Impact After Upgrades

| Action | Aesthetics delta | Friendliness delta |
|--------|-----------------|-------------------|
| Visual uplift (colors + typography) | +6 to +8 | +2 to +3 |
| Hero banner upgrade | +2 to +3 | +1 |
| Gamification (XP + streak) | +1 | +4 to +5 |
| Completion screen | 0 | +2 |
| Micro-details checklist | +2 | +1 |
