---
name: quality-audit
description: Run comprehensive quality audit on Smart Quiz — 11 categories, 100-point scoring (tests, build, routing, quiz, TTS, CI/CD, UI/UX, UI aesthetics, data, docs, code quality)
disable-model-invocation: true
user-invocable: true
---

# /quality-audit — Smart Quiz Quality Audit

---

## Merge Gate

> **Wave merge to main yêu cầu audit score ≥ 95/100.**
> Nếu score < 95, KHÔNG được merge `v4-dev` → `main`. Phải fix gaps trước.

---

## Instructions

Khi user invoke `/quality-audit`:

### Bước 1: Thu thập dữ liệu tự động

Chạy **song song** tất cả lệnh sau:

```bash
# 1. Git & PR stats
git log --oneline --since="30 days ago" | wc -l
gh pr list --state merged --limit 100 --json number --jq 'length'
gh pr list --state open --json number --jq 'length'
git branch -r | grep -v "main\|HEAD" | wc -l

# 2. CI status (last 10 runs on main)
gh run list --limit 10 --json conclusion,headBranch --jq '.[] | select(.headBranch=="main") | .conclusion'

# 3. Unit & component tests
cd svelte-app && npx vitest run 2>&1 | grep -E "Test Files|Tests |Errors"

# 4. Build check
cd svelte-app && npx vite build 2>&1 | tail -5

# 5. TypeScript check
cd svelte-app && npx svelte-check --threshold error 2>&1 | tail -3

# 6. SPA routing check (base path violations)
grep -rn 'goto(' svelte-app/src/routes/ --include='*.svelte' | grep -v 'base' | grep -v '//' | head -10
grep -rn 'redirect(' svelte-app/src/routes/ --include='*.ts' | grep -v 'base' | grep -v '//' | head -10
grep -rn 'href="/' svelte-app/src/routes/ --include='*.svelte' | grep -v '{base}' | grep -v '//' | head -10

# 7. Code quality
grep -rn 'TODO\|FIXME\|HACK\|XXX' svelte-app/src/lib/ svelte-app/src/routes/ --include='*.ts' --include='*.svelte' | wc -l
grep -rn '"kaiwa"' svelte-app/src/ | wc -l
grep -rn 'console\.log' svelte-app/src/ --include='*.ts' --include='*.svelte' | grep -v node_modules | grep -v test | wc -l

# 8. TTS correctness (should use kana, not japanese for TTS)
grep -rn 'SpeechSynthesisUtterance(.*\.japanese)' svelte-app/src/ --include='*.svelte' --include='*.ts' | head -5
grep -rn 'SpeechSynthesisUtterance' svelte-app/src/ --include='*.svelte' --include='*.ts' | grep -v kana | grep -v audioUtils | head -5

# 9. Data stats
find svelte-app/src/lib/data -name '*.ts' | wc -l
find svelte-app/src/lib/components -name '*.svelte' | wc -l
find svelte-app/src/routes -name '+page.svelte' | wc -l

# 10. Documentation
ls CLAUDE.md docs/TECHNICAL.md docs/BUSINESS_LOGIC.md docs/ARCHITECTURE.md 2>/dev/null | wc -l

# 11. 404.html check
cd svelte-app && npm run build 2>&1 | tail -1 && ls build/404.html 2>/dev/null && echo "404.html OK" || echo "404.html MISSING"

# 12. Test mocks check (speechSynthesis cancel)
grep -rn "speak: vi.fn()" svelte-app/src/tests/ | grep -v cancel | head -5

# 13. UI checks — hardcoded colors, emoji in v4 components, unused CSS vars
grep -rn 'color: #\|background: #\|bg-\[#\|text-\[#' svelte-app/src/ --include='*.svelte' | wc -l
grep -Prn '[\x{1F300}-\x{1F9FF}]' svelte-app/src/lib/components/ 2>/dev/null | wc -l
grep -rn 'var(--bg)\|var(--text)\|var(--border)' svelte-app/src/ --include='*.svelte' | grep -v app.css | wc -l
```

### Bước 2: Chấm điểm 11 categories (100 điểm)

#### 1. Unit & Component Tests (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| Tất cả tests pass (0 failures) | 4 | `vitest run` results |
| 0 skipped tests | 2 | Check skipped count |
| 0 unhandled errors | 2 | Check "Errors" line |
| Test mocks đầy đủ (speechSynthesis.cancel) | 2 | grep test mocks |

#### 2. Build & TypeScript (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| `vite build` pass (0 errors) | 4 | Build output |
| `svelte-check` pass (0 errors từ code mình) | 3 | svelte-check output |
| 404.html được tạo đúng | 3 | Check build/404.html |

#### 3. SPA Routing (5 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| 0 `goto()` thiếu `${base}` | 2 | grep kết quả |
| 0 `redirect()` thiếu `${base}` | 1 | grep kết quả |
| 0 `href="/"` thiếu `{base}` | 2 | grep kết quả |

#### 4. Quiz Logic (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| Direction selector hoạt động (3 directions) | 3 | Code review |
| Answer normalization đúng (romaji alternatives) | 2 | quizUtils check |
| Retry wrong items hoạt động | 2 | results page code |
| Component state reset khi chuyển câu | 3 | reactive reset pattern |

#### 5. TTS Audio (5 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| Dùng `item.kana` cho TTS (không dùng `item.japanese`) | 2 | grep SpeechSynthesisUtterance |
| `speechSynthesis.cancel()` trước khi speak mới | 1 | audioUtils code |
| Guard `typeof window` cho SSR/test | 2 | audioUtils code |

#### 6. CI/CD (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| CI green trên main (last 5 runs) | 4 | `gh run list` |
| 0 stale branches (merged nhưng chưa xoá) | 3 | `git branch -r` count |
| 0 open PRs không hoạt động | 3 | `gh pr list --state open` |

#### 7. UI/UX Functionality (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| Dark/Light mode hoạt động | 2 | Code review |
| Responsive (mobile breakpoints) | 2 | CSS media queries |
| Keyboard shortcuts hoạt động (F1, 1-4, Enter, Space) | 3 | Component code |
| a11y: ARIA roles, focus-visible, sr-only | 3 | svelte-check + code review |

#### 8. UI Aesthetics & Screenshots (10 điểm)

> Đánh giá thẩm mỹ theo chuẩn `frontend-design` skill. Dùng dev server hoặc build preview để review.

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| **Design Consistency**: Tailwind design tokens nhất quán, 0 hardcoded colors, 0 legacy CSS vars | 3 | grep checks (#13) |
| **Icon System**: 0 emoji trong v4 components, lucide icons nhất quán, `aria-hidden` | 2 | grep emoji + code review |
| **Page States**: Loading skeleton, error, empty states cho tất cả route pages | 2 | PageLoading/Error/Empty usage |
| **Anti-Pattern Free**: Không có AI slop tells (gradient text, glassmorphism, bounce easing, hero metrics) | 1 | Visual review |
| **Visual Hierarchy**: Typography hierarchy rõ ràng, spacing nhất quán theo Tailwind scale | 2 | Visual review |

**Screenshot Review Process:**
1. Mở dev server (`npm run dev`) hoặc production URL
2. Capture screenshots các trang chính: Home, Courses, Lesson Menu, Quiz, Results
3. Kiểm tra cả Light mode và Dark mode
4. Kiểm tra mobile viewport (375px) và desktop (1440px)
5. **Lưu screenshots vào `documents/04-quality/screenshots/`** — đặt tên theo format:
   - `[date]-[page]-[mode]-[viewport].png`
   - Ví dụ: `2026-03-27-home-light-desktop.png`, `2026-03-27-quiz-dark-mobile.png`
6. Screenshots PHẢI commit vào git (không gitignore) làm evidence cho audit
7. Link screenshots trong report bằng relative path: `![Home Light](screenshots/2026-03-27-home-light-desktop.png)`

**Scoring notes:**
- 0-1 hardcoded colors + 0 legacy vars + 0 emoji = full 3đ Design Consistency
- Mỗi vi phạm trừ 0.5đ (cap ở 0đ)
- Visual review items (Anti-Pattern, Hierarchy) dựa trên visual inspection thật, KHÔNG đoán

#### 9. Data Quality (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| 0 invalid VocabItem types (e.g. "kaiwa") | 3 | grep |
| Tất cả lessons có >=5 vocab items | 3 | Data files check |
| Kanji data đầy đủ (25 lessons, 3 examples/kanji) | 2 | Data stats |
| HSK data đầy đủ (5 groups, 1600+ words) | 2 | Data stats |

#### 10. Documentation (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| CLAUDE.md có và up-to-date | 3 | File exists + review |
| docs/TECHNICAL.md có | 2 | File exists |
| docs/BUSINESS_LOGIC.md có | 2 | File exists |
| README.md mô tả đúng dự án hiện tại | 3 | Content review |

#### 11. Code Quality (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| 0 TODO/FIXME/HACK trong production code | 2 | grep count |
| 0 console.log trong production code | 2 | grep count |
| BackButton HOME_PARENTS đầy đủ cho tất cả sections | 2 | Code review |
| Header getPageTitle() cover tất cả routes | 2 | Code review |
| Không có dead CSS / unused selectors | 2 | svelte-check warnings |

### Bước 3: Output Report

```markdown
# Smart Quiz — Quality Audit Report

**Date:** [date]
**Commit:** [hash]
**Auditor:** Claude Code

---

## Overall Score

| # | Category | Score | Max | Status |
|---|----------|-------|-----|--------|
| 1 | Unit & Component Tests | X | 10 | ✅/⚠️/❌ |
| 2 | Build & TypeScript | X | 10 | ✅/⚠️/❌ |
| 3 | SPA Routing | X | 5 | ✅/⚠️/❌ |
| 4 | Quiz Logic | X | 10 | ✅/⚠️/❌ |
| 5 | TTS Audio | X | 5 | ✅/⚠️/❌ |
| 6 | CI/CD | X | 10 | ✅/⚠️/❌ |
| 7 | UI/UX Functionality | X | 10 | ✅/⚠️/❌ |
| 8 | UI Aesthetics & Screenshots | X | 10 | ✅/⚠️/❌ |
| 9 | Data Quality | X | 10 | ✅/⚠️/❌ |
| 10 | Documentation | X | 10 | ✅/⚠️/❌ |
| 11 | Code Quality | X | 10 | ✅/⚠️/❌ |
| **Total** | | **X** | **100** | **Grade** |

### Grade Scale
- 95-100: A+ (Production Excellence) — ✅ Ready to merge
- 90-94: A (Production Ready) — ⚠️ Fix gaps before merge
- 85-89: B+ (Near Production) — ❌ Not ready to merge
- 80-84: B (Good, needs polish)
- 70-79: C (Acceptable, significant gaps)
- <70: D (Major work needed)

### Merge Gate
- **≥ 95/100**: Wave READY to merge `v4-dev` → `main`
- **< 95/100**: Wave NOT READY — must fix gaps first

---

## UI Aesthetics Review

### Screenshots (saved to `documents/04-quality/screenshots/`)
| Page | Light Desktop | Dark Desktop | Mobile (375px) | Notes |
|------|--------------|-------------|----------------|-------|
| Home | ![](screenshots/[date]-home-light-desktop.png) | ![](screenshots/[date]-home-dark-desktop.png) | ![](screenshots/[date]-home-light-mobile.png) | [notes] |
| Courses | ... | ... | ... | |
| Lesson Menu | ... | ... | ... | |
| Quiz | ... | ... | ... | |
| Results | ... | ... | ... | |

> Screenshots committed to git as audit evidence. Naming: `[date]-[page]-[mode]-[viewport].png`

### Design Consistency Checks
- Hardcoded colors: [count]
- Legacy CSS vars: [count]
- Emoji in v4 components: [count]
- Anti-pattern tells: [list or "none"]

---

## ✅ Strengths (≥80% of category max)
[List with evidence]

## ⚠️ Needs Improvement (50-79% of category max)
[List with specific gaps]

## ❌ Critical Issues (<50% of category max)
[List with blockers]

---

## Action Items

| Priority | Item | Score Impact | Effort |
|----------|------|-------------|--------|
| 🔴 P0 | ... | +X | ... |
| 🟠 P1 | ... | +X | ... |
| 🟡 P2 | ... | +X | ... |
```

### Bước 4: Lưu kết quả

Save report to `documents/04-quality/quality-audit-[YYYY-MM-DD].md`

---

## Rules

- LUÔN chạy tests thật (không đoán kết quả)
- LUÔN giao tiếp tiếng Việt
- Chấm điểm dựa trên evidence (test output, grep results, visual review), không cảm tính
- Nếu không thể chạy test, ghi 0 điểm + note lý do
- So sánh với audit trước nếu có
- **MERGE GATE: Wave merge `v4-dev` → `main` yêu cầu score ≥ 95/100**
- UI Aesthetics phải review visual thật (dev server hoặc production URL), KHÔNG đoán từ code
- Ghi nhận visual observations cụ thể trong report (ví dụ: "Home page spacing nhất quán, quiz card có shadow phù hợp")
