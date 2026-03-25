# Project Restructure Plan (aligned with Starter Kit v1.1.0)

> **Ngày:** 2026-03-25
> **Chuẩn tham chiếu:** `.claude/starter-kit/skills/reference/project-structure.md`
> **Kit version:** 1.1.0

---

## Vấn đề hiện tại (5/5 anti-pattern signals)

| Signal | Hiện tại | Status |
|--------|---------|--------|
| >5 folders ở root không phải service? | `data/`, `src/`, `tools/`, `docs/`, `scripts/` + configs | ✗ Có |
| Docs nằm >3 locations? | `docs/`, `.claude/docs/`, `.claude/plans/`, `.claude/archive/` | ✗ Có |
| Scripts phân tán >2 locations? | `scripts/`, `.claude/scripts/` | ✗ Có |
| Developer mới không biết tìm file? | 24 flat files trong `docs/`, không phân loại | ✗ Có |
| Garbage files? | 5 vite timestamps, 12 loose .md trong svelte-app/ | ✗ Có |

---

## Cấu trúc đề xuất (theo kit standard)

```
root/
├── CLAUDE.md                        ← Claude Code (giữ, convention)
├── README.md                        ← GitHub (giữ, convention)
├── LICENSE                          ← giữ
├── .markdownlint.json               ← giữ (hoặc move vào .vscode/)
├── cspell.json                      ← xóa (thay bằng .vscode/settings.json)
│
├── svelte-app/                      ← APP (giữ nguyên, dọn loose files)
│
├── scripts/                         ← TẤT CẢ scripts (cross-project)
│   ├── test-local.sh
│   ├── check-ci.sh
│   ├── pre-commit-check.sh
│   └── quality-audit.sh
│
├── documents/                       ← ALL DOCS (SOURCE OF TRUTH)
│   ├── 01-business/                 ← Business logic (future 3-layer)
│   │   └── BUSINESS_LOGIC.md        ← Current (sẽ split sau)
│   ├── 02-architecture/             ← Technical docs
│   │   ├── ARCHITECTURE.md
│   │   ├── TECHNICAL.md
│   │   ├── PWA.md
│   │   └── PROJECT_SUMMARY.md
│   ├── 03-planning/                 ← Plans, roadmaps
│   │   ├── PR_PLAN_V3.md
│   │   ├── PR_PLAN_V4.md
│   │   ├── FEATURE_ROADMAP.md
│   │   ├── QUALITY_AUDIT_PR_PLAN.md
│   │   └── RESTRUCTURE_PLAN.md
│   ├── 04-quality/                  ← Audit reports, comparisons
│   │   ├── quality-audit-2026-03-23.md
│   │   ├── COMPARISON_FEATURES.md
│   │   ├── COMPARISON_UI_UX.md
│   │   ├── COMPARISON_PERFORMANCE_SEO.md
│   │   ├── COMPARISON_ACCESSIBILITY.md
│   │   ├── COMPARISON_PEDAGOGY.md
│   │   └── COMPARISON_DX_BUSINESS.md
│   ├── 05-guides/                   ← Operations, deployment
│   │   ├── DEPLOYMENT.md
│   │   ├── CONTRIBUTING.md
│   │   ├── QUICKSTART.md
│   │   ├── CHANGELOG.md
│   │   └── LOGO.md
│   └── 07-archived/                 ← Legacy, deprecated
│       ├── legacy-plans/            ← .claude/archive/legacy-plans/*
│       ├── reports/                 ← .claude/archive/reports/*
│       ├── phases/                  ← .claude/archive/phases/*
│       ├── development/             ← .claude/docs/*
│       ├── svelte-migration/        ← svelte-app/*.md (12 files)
│       └── pre-svelte/              ← data/, src/, tools/
│
├── .vscode/                         ← IDE settings (shared, committed)
│   └── settings.json                ← Từ kit template (markdown, TS, vitest)
│
├── .claude/                         ← Claude Code config
│   ├── skills/                      ← Skills (giữ nguyên)
│   ├── starter-kit/                 ← Kit source (giữ nguyên)
│   ├── settings.local.json          ← Permissions (local only)
│   └── .starter-kit-version
│
└── .github/                         ← CI (giữ nguyên)
    └── workflows/
```

---

## Task Breakdown (12 tasks)

### Task 1: Tạo `documents/` structure
```bash
mkdir -p documents/{01-business,02-architecture,03-planning,04-quality,05-guides,07-archived/{legacy-plans,reports,phases,development,svelte-migration,pre-svelte}}
```

### Task 2: Move `docs/` → `documents/`

**02-architecture/**
```bash
git mv docs/ARCHITECTURE.md documents/02-architecture/
git mv docs/TECHNICAL.md documents/02-architecture/
git mv docs/PWA.md documents/02-architecture/
git mv docs/PROJECT_SUMMARY.md documents/02-architecture/
git mv docs/README.md documents/02-architecture/
```

**01-business/**
```bash
git mv docs/BUSINESS_LOGIC.md documents/01-business/
```

**03-planning/**
```bash
git mv docs/PR_PLAN_V3.md documents/03-planning/
git mv docs/PR_PLAN_V4.md documents/03-planning/
git mv docs/FEATURE_ROADMAP.md documents/03-planning/
git mv docs/QUALITY_AUDIT_PR_PLAN.md documents/03-planning/
git mv docs/plans/RESTRUCTURE_PLAN.md documents/03-planning/
```

**04-quality/**
```bash
git mv docs/quality-audit-2026-03-23.md documents/04-quality/
git mv docs/COMPARISON_FEATURES.md documents/04-quality/
git mv docs/COMPARISON_UI_UX.md documents/04-quality/
git mv docs/COMPARISON_PERFORMANCE_SEO.md documents/04-quality/
git mv docs/COMPARISON_ACCESSIBILITY.md documents/04-quality/
git mv docs/COMPARISON_PEDAGOGY.md documents/04-quality/
git mv docs/COMPARISON_DX_BUSINESS.md documents/04-quality/
```

**05-guides/**
```bash
git mv docs/CHANGELOG.md documents/05-guides/
git mv docs/DEPLOYMENT.md documents/05-guides/
git mv docs/CONTRIBUTING.md documents/05-guides/
git mv docs/QUICKSTART.md documents/05-guides/
git mv docs/LOGO.md documents/05-guides/
```

### Task 3: Move `.claude/archive/` → `documents/07-archived/`
```bash
git mv .claude/archive/legacy-plans/* documents/07-archived/legacy-plans/
git mv .claude/archive/reports/* documents/07-archived/reports/
git mv .claude/archive/phases/* documents/07-archived/phases/
git mv .claude/archive/examples/ documents/07-archived/
git mv .claude/archive/README.md documents/07-archived/
```

### Task 4: Move `.claude/docs/` → `documents/07-archived/development/`
```bash
git mv .claude/docs/* documents/07-archived/development/
```

### Task 5: Move `.claude/plans/` → `documents/07-archived/legacy-plans/`
```bash
git mv .claude/plans/* documents/07-archived/legacy-plans/
```

### Task 6: Move `svelte-app/*.md` (loose) → `documents/07-archived/svelte-migration/`
```bash
for f in CHANGELOG COMPONENT_MAPPING DEPLOYMENT GRAMMAR_COMPONENTS MIGRATION_PROGRESS OPTIMIZATION PHASE5_SUMMARY PRODUCTION_CHECKLIST README TESTING VERIFICATION_SUMMARY; do
  git mv "svelte-app/$f.md" documents/07-archived/svelte-migration/ 2>/dev/null
done
```

### Task 7: Move legacy dirs → `documents/07-archived/pre-svelte/`
```bash
git mv data/ documents/07-archived/pre-svelte/data/
git mv src/ documents/07-archived/pre-svelte/src/
git mv tools/ documents/07-archived/pre-svelte/tools/
```

### Task 8: Cleanup garbage
```bash
rm svelte-app/vite.config.ts.timestamp-*
echo "vite.config.ts.timestamp-*" >> svelte-app/.gitignore
```

### Task 9: Create `.vscode/settings.json` (from kit template)
```bash
mkdir -p .vscode
# Copy template, uncomment TypeScript/Vitest sections, remove Java/Python/Go
```

### Task 10: Cleanup duplicates
```bash
rm -rf .claude/archive/ .claude/docs/ .claude/plans/ .claude/scripts/
rm cspell.json .markdownlint.json  # Replaced by .vscode/settings.json
```

### Task 11: Remove root `package.json` + `package-lock.json`
```bash
# Nếu chỉ dùng cho legacy tools → remove
# svelte-app/ có package.json riêng
git rm package.json package-lock.json
```

### Task 12: Update all references
- `CLAUDE.md` — update doc paths (`docs/` → `documents/`)
- `scripts/quality-audit.sh` — update `ls docs/...` → `ls documents/...`
- `.claude/skills/continue/SKILL.md` — update plan document paths
- `README.md` — update any doc links

---

## Upgrade kit v1.0.0 → v1.1.0

Cùng PR, chạy:
```bash
.claude/starter-kit/upgrade-project.sh . --force --skills
```

Thêm 2 skills mới:
- `reference/project-structure.md`
- `reference/ide-setup.md`

---

## Verification

- [ ] `./scripts/test-local.sh all` — 605 tests pass
- [ ] `npx vite build` trong svelte-app/ — build pass
- [ ] `git status` — clean
- [ ] `find . -name '*.md' -path '*/docs/*' | wc -l` = 0 (docs/ không tồn tại)
- [ ] `ls documents/` — 6 sub-folders đúng
- [ ] `.claude/` chỉ còn: skills/, starter-kit/, settings.local.json, .starter-kit-version
- [ ] `.vscode/settings.json` tồn tại
- [ ] 0 vite timestamp files
- [ ] 0 loose .md trong svelte-app/
- [ ] `scripts/quality-audit.sh --save` vẫn hoạt động (update paths)

---

## Risks

| Risk | Mitigation |
|------|-----------|
| CI workflow paths | `deploy.yml` reference `svelte-app/` → KHÔNG đổi |
| Broken internal links | Grep tất cả `.md` files cho `docs/` references → update |
| Git history | `git mv` giữ history, nhưng GitHub UI có thể hiện "deleted + added" |
| quality-audit.sh | Script check `docs/TECHNICAL.md` → update thành `documents/02-architecture/TECHNICAL.md` |
