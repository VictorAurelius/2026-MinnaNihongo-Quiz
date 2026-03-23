---
name: quality-audit
description: Run comprehensive quality audit on Smart Quiz — 10 categories, 100-point scoring (tests, build, routing, quiz, TTS, CI/CD, UI/UX, data, docs, code quality)
disable-model-invocation: true
user-invocable: true
---

# /quality-audit — Smart Quiz Quality Audit

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
```

### Bước 2: Chấm điểm 10 categories (100 điểm)

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

#### 3. SPA Routing (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| 0 `goto()` thiếu `${base}` | 4 | grep kết quả |
| 0 `redirect()` thiếu `${base}` | 3 | grep kết quả |
| 0 `href="/"` thiếu `{base}` | 3 | grep kết quả |

#### 4. Quiz Logic (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| Direction selector hoạt động (3 directions) | 3 | Code review |
| Answer normalization đúng (romaji alternatives) | 2 | quizUtils check |
| Retry wrong items hoạt động | 2 | results page code |
| Component state reset khi chuyển câu | 3 | reactive reset pattern |

#### 5. TTS Audio (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| Dùng `item.kana` cho TTS (không dùng `item.japanese`) | 4 | grep SpeechSynthesisUtterance |
| `speechSynthesis.cancel()` trước khi speak mới | 3 | audioUtils code |
| Guard `typeof window` cho SSR/test | 3 | audioUtils code |

#### 6. CI/CD (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| CI green trên main (last 5 runs) | 4 | `gh run list` |
| 0 stale branches (merged nhưng chưa xoá) | 3 | `git branch -r` count |
| 0 open PRs không hoạt động | 3 | `gh pr list --state open` |

#### 7. UI/UX (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| Dark/Light mode hoạt động | 2 | Code review |
| Responsive (mobile breakpoints) | 2 | CSS media queries |
| Keyboard shortcuts hoạt động (F1, 1-4, Enter, Space) | 3 | Component code |
| a11y: 0 warnings trong components | 3 | svelte-check warnings |

#### 8. Data Quality (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| 0 invalid VocabItem types (e.g. "kaiwa") | 3 | grep |
| Tất cả lessons có >=5 vocab items | 3 | Data files check |
| Kanji data đầy đủ (25 lessons, 3 examples/kanji) | 2 | Data stats |
| HSK data đầy đủ (5 groups, 1600+ words) | 2 | Data stats |

#### 9. Documentation (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| CLAUDE.md có và up-to-date | 3 | File exists + review |
| docs/TECHNICAL.md có | 2 | File exists |
| docs/BUSINESS_LOGIC.md có | 2 | File exists |
| README.md mô tả đúng dự án hiện tại | 3 | Content review |

#### 10. Code Quality (10 điểm)

| Tiêu chí | Điểm | Check |
|----------|------|-------|
| 0 TODO/FIXME/HACK trong production code | 3 | grep count |
| BackButton HOME_PARENTS đầy đủ cho tất cả sections | 2 | Code review |
| Header getPageTitle() cover tất cả routes | 2 | Code review |
| Không có dead CSS / unused selectors | 3 | svelte-check warnings |

### Bước 3: Output Report

```markdown
# Smart Quiz — Quality Audit Report

**Date:** [date]
**Commit:** [hash]
**Auditor:** Claude Code

---

## Overall Score

| # | Category | Score | /10 | Status |
|---|----------|-------|-----|--------|
| 1 | Unit & Component Tests | X | 10 | ✅/⚠️/❌ |
| 2 | Build & TypeScript | X | 10 | ✅/⚠️/❌ |
| 3 | SPA Routing | X | 10 | ✅/⚠️/❌ |
| 4 | Quiz Logic | X | 10 | ✅/⚠️/❌ |
| 5 | TTS Audio | X | 10 | ✅/⚠️/❌ |
| 6 | CI/CD | X | 10 | ✅/⚠️/❌ |
| 7 | UI/UX | X | 10 | ✅/⚠️/❌ |
| 8 | Data Quality | X | 10 | ✅/⚠️/❌ |
| 9 | Documentation | X | 10 | ✅/⚠️/❌ |
| 10 | Code Quality | X | 10 | ✅/⚠️/❌ |
| **Total** | | **X** | **100** | **Grade** |

### Grade Scale
- 95-100: A+ (Production Excellence)
- 90-94: A (Production Ready)
- 85-89: B+ (Near Production)
- 80-84: B (Good, needs polish)
- 70-79: C (Acceptable, significant gaps)
- <70: D (Major work needed)

---

## ✅ Strengths (8+/10)
[List with evidence]

## ⚠️ Needs Improvement (5-7/10)
[List with specific gaps]

## ❌ Critical Issues (<5/10)
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

Save report to `docs/quality-audit-[YYYY-MM-DD].md`

---

## Rules

- LUÔN chạy tests thật (không đoán kết quả)
- LUÔN giao tiếp tiếng Việt
- Chấm điểm dựa trên evidence (test output, grep results), không cảm tính
- Nếu không thể chạy test, ghi 0 điểm + note lý do
- So sánh với audit trước nếu có
