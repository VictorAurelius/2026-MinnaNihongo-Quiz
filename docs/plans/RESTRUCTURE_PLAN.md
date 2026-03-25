# Project Restructure Plan

> **Ngày:** 2026-03-25
> **Mục tiêu:** Dọn cấu trúc thư mục — gom docs, xóa legacy, loại garbage files

---

## Vấn đề hiện tại

- **docs phân tán 4 nơi:** `docs/`, `.claude/docs/`, `.claude/plans/`, `.claude/archive/`
- **24 files flat** trong `docs/` không phân loại (plans lẫn audits lẫn comparisons)
- **12 loose .md** trong `svelte-app/` (legacy pre-migration docs)
- **5 vite timestamp files** trong `svelte-app/` (garbage, nên gitignore)
- **3 legacy dirs** ở root (`data/`, `src/`, `tools/`) — code cũ pre-SvelteKit
- **Duplicate scripts:** `.claude/scripts/pre-commit-check.sh` = `scripts/pre-commit-check.sh`

---

## Cấu trúc đề xuất

```
root/
├── CLAUDE.md                        ← giữ (Claude Code convention)
├── README.md                        ← giữ (GitHub convention)
├── LICENSE                          ← giữ
├── .markdownlint.json               ← giữ (IDE config)
├── cspell.json                      ← giữ (IDE config)
│
├── svelte-app/                      ← APP (giữ nguyên, dọn loose files)
│   ├── src/
│   ├── static/
│   ├── package.json
│   ├── vite.config.ts
│   ├── svelte.config.js
│   └── ... (build configs only, NO loose docs)
│
├── scripts/                         ← TẤT CẢ scripts
│   ├── test-local.sh
│   ├── check-ci.sh
│   ├── pre-commit-check.sh
│   └── quality-audit.sh
│
├── docs/
│   ├── project/                     ← Project docs (technical, architecture)
│   │   ├── ARCHITECTURE.md
│   │   ├── TECHNICAL.md
│   │   ├── BUSINESS_LOGIC.md
│   │   ├── DEPLOYMENT.md
│   │   ├── CONTRIBUTING.md
│   │   ├── PROJECT_SUMMARY.md
│   │   ├── PWA.md
│   │   ├── QUICKSTART.md
│   │   └── LOGO.md
│   ├── comparisons/                 ← Nhai Kanji comparison reports
│   │   ├── FEATURES.md
│   │   ├── UI_UX.md
│   │   ├── PERFORMANCE_SEO.md
│   │   ├── ACCESSIBILITY.md
│   │   ├── PEDAGOGY.md
│   │   └── DX_BUSINESS.md
│   ├── plans/                       ← Roadmaps, PR plans
│   │   ├── PR_PLAN_V3.md
│   │   ├── PR_PLAN_V4.md
│   │   ├── FEATURE_ROADMAP.md
│   │   ├── QUALITY_AUDIT_PR_PLAN.md
│   │   └── RESTRUCTURE_PLAN.md
│   ├── audits/                      ← Quality audit reports
│   │   └── quality-audit-2026-03-23.md
│   ├── changelog/
│   │   └── CHANGELOG.md
│   └── archive/                     ← Legacy reports, old plans, migration docs
│       ├── legacy-plans/            ← từ .claude/archive/legacy-plans/
│       ├── reports/                 ← từ .claude/archive/reports/
│       ├── phases/                  ← từ .claude/archive/phases/
│       ├── svelte-app-legacy/       ← 12 loose .md từ svelte-app/
│       └── development/             ← từ .claude/docs/
│
├── .claude/
│   ├── skills/                      ← Skills (giữ nguyên)
│   │   ├── _README-skills-index.md
│   │   ├── core/
│   │   ├── reference/
│   │   ├── workflow/
│   │   ├── continue/
│   │   ├── quality-audit.md
│   │   ├── fix-spa-routing.md
│   │   └── (project-specific skills)
│   ├── starter-kit/                 ← Kit source (giữ nguyên)
│   ├── settings.local.json
│   └── .starter-kit-version
│
└── .github/
    └── workflows/                   ← CI (giữ nguyên)
```

---

## Task Breakdown

### 1. Tạo sub-folders trong docs/
```bash
mkdir -p docs/project docs/comparisons docs/plans docs/audits docs/changelog docs/archive/legacy-plans docs/archive/reports docs/archive/phases docs/archive/svelte-app-legacy docs/archive/development
```

### 2. Move docs/ files vào sub-folders
```bash
# project/
git mv docs/ARCHITECTURE.md docs/project/
git mv docs/TECHNICAL.md docs/project/
git mv docs/BUSINESS_LOGIC.md docs/project/
git mv docs/DEPLOYMENT.md docs/project/
git mv docs/CONTRIBUTING.md docs/project/
git mv docs/PROJECT_SUMMARY.md docs/project/
git mv docs/PWA.md docs/project/
git mv docs/QUICKSTART.md docs/project/
git mv docs/LOGO.md docs/project/
git mv docs/README.md docs/project/

# comparisons/
git mv docs/COMPARISON_FEATURES.md docs/comparisons/FEATURES.md
git mv docs/COMPARISON_UI_UX.md docs/comparisons/UI_UX.md
git mv docs/COMPARISON_PERFORMANCE_SEO.md docs/comparisons/PERFORMANCE_SEO.md
git mv docs/COMPARISON_ACCESSIBILITY.md docs/comparisons/ACCESSIBILITY.md
git mv docs/COMPARISON_PEDAGOGY.md docs/comparisons/PEDAGOGY.md
git mv docs/COMPARISON_DX_BUSINESS.md docs/comparisons/DX_BUSINESS.md

# plans/
git mv docs/PR_PLAN_V3.md docs/plans/
git mv docs/PR_PLAN_V4.md docs/plans/
git mv docs/FEATURE_ROADMAP.md docs/plans/
git mv docs/QUALITY_AUDIT_PR_PLAN.md docs/plans/

# audits/
git mv docs/quality-audit-2026-03-23.md docs/audits/

# changelog/
git mv docs/CHANGELOG.md docs/changelog/
```

### 3. Move .claude/ docs/plans/archive → docs/archive/
```bash
# .claude/archive/ → docs/archive/
git mv .claude/archive/legacy-plans/* docs/archive/legacy-plans/
git mv .claude/archive/reports/* docs/archive/reports/
git mv .claude/archive/phases/* docs/archive/phases/
git mv .claude/archive/examples/ docs/archive/

# .claude/docs/ → docs/archive/development/
git mv .claude/docs/* docs/archive/development/

# .claude/plans/ → docs/archive/ (old plans, not active)
git mv .claude/plans/* docs/archive/legacy-plans/
```

### 4. Move svelte-app loose .md → docs/archive/svelte-app-legacy/
```bash
git mv svelte-app/CHANGELOG.md docs/archive/svelte-app-legacy/
git mv svelte-app/COMPONENT_MAPPING.md docs/archive/svelte-app-legacy/
git mv svelte-app/DEPLOYMENT.md docs/archive/svelte-app-legacy/
git mv svelte-app/GRAMMAR_COMPONENTS.md docs/archive/svelte-app-legacy/
git mv svelte-app/MIGRATION_PROGRESS.md docs/archive/svelte-app-legacy/
git mv svelte-app/OPTIMIZATION.md docs/archive/svelte-app-legacy/
git mv svelte-app/PHASE5_SUMMARY.md docs/archive/svelte-app-legacy/
git mv svelte-app/PRODUCTION_CHECKLIST.md docs/archive/svelte-app-legacy/
git mv svelte-app/TESTING.md docs/archive/svelte-app-legacy/
git mv svelte-app/VERIFICATION_SUMMARY.md docs/archive/svelte-app-legacy/
git mv svelte-app/README.md docs/archive/svelte-app-legacy/
```

### 5. Cleanup garbage files
```bash
# vite timestamp files
rm svelte-app/vite.config.ts.timestamp-*
echo "vite.config.ts.timestamp-*" >> svelte-app/.gitignore

# Remove empty .claude dirs
rm -rf .claude/archive/ .claude/docs/ .claude/plans/ .claude/scripts/
```

### 6. Xử lý legacy dirs (data/, src/, tools/)
```bash
# Move to docs/archive/legacy/ (giữ lại cho reference)
mkdir -p docs/archive/legacy
git mv data/ docs/archive/legacy/data/
git mv src/ docs/archive/legacy/src/
git mv tools/ docs/archive/legacy/tools/

# Hoặc nếu hoàn toàn không cần: git rm -r data/ src/ tools/
```

### 7. Remove root package.json (nếu là legacy)
```bash
# Kiểm tra root package.json có dùng không
# Nếu chỉ là legacy (svelte-app có package.json riêng) → remove
```

### 8. Update references
- CLAUDE.md: update paths nếu docs moved
- README.md: update links
- .claude/skills/_README-skills-index.md: verify paths
- scripts/quality-audit.sh: update doc paths trong report

---

## Verification

- [ ] `./scripts/test-local.sh all` — 605 tests pass
- [ ] `npx vite build` trong svelte-app/ — build pass
- [ ] Không có broken imports/references
- [ ] `git status` — clean (no untracked garbage)
- [ ] `docs/` structure matches plan
- [ ] `.claude/` chỉ còn skills/, starter-kit/, settings, version

---

## Risks

- **Broken references:** Một số docs có relative links đến nhau → cần update
- **CI paths:** `.github/workflows/deploy.yml` reference `svelte-app/` → không đổi, OK
- **CLAUDE.md docs paths:** Nếu CLAUDE.md reference `docs/TECHNICAL.md` → update thành `docs/project/TECHNICAL.md`
- **Git history:** `git mv` giữ history, nhưng GitHub UI có thể không track rename đúng

---

## Không thay đổi

- `svelte-app/src/` — app source code (giữ nguyên 100%)
- `svelte-app/static/` — assets (giữ nguyên)
- `.github/workflows/` — CI (giữ nguyên)
- `.claude/skills/` — skills (giữ nguyên)
- `.claude/starter-kit/` — kit source (giữ nguyên)
- `scripts/` — scripts (giữ nguyên)
