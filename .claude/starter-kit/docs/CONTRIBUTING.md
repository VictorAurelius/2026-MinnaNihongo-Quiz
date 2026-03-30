# Contributing to Claude Starter Kit

## Cách đóng góp từ dự án khác

### 1. Fork + PR (recommend)

```bash
# Fork repo trên GitHub UI
# Clone fork
git clone https://github.com/{your-user}/claude-starter-kit.git
cd claude-starter-kit

# Tạo branch
git checkout -b improve/tdd-skill

# Sửa files
# ...

# Push + tạo PR
git push -u origin improve/tdd-skill
gh pr create --repo VictorAurelius/claude-starter-kit \
  --title "improve(tdd): add pre-push checklist" \
  --body "Rút từ dự án X: thêm checklist test-local.sh trước push"
```

### 2. Issue (nếu không muốn sửa code)

Tạo issue mô tả:
- Lesson learned từ dự án
- Đề xuất skill/rule mới
- Bug report

## Review checklist

Mọi PR phải đạt:

- [ ] **Generic** — không có tên dự án, đường dẫn, port cụ thể
- [ ] **Cải thiện chất lượng** — không chỉ preference cá nhân
- [ ] **Backward compatible** — projects dùng version cũ không bị break
- [ ] **Có lý do** — mô tả bài học / incident dẫn đến thay đổi
- [ ] **CHANGELOG entry** — ghi rõ thay đổi gì

## Branching Strategy

```
main                    ← latest development
├── release/v1.x       ← v1 maintenance (patches + minor features)
│   ├── v1.0.0 (tag)
│   ├── v1.1.0 (tag)
│   └── v1.1.2 (tag)
└── release/v2.x       ← v2 (khi có breaking changes)
```

### Khi nào tạo major version mới?

- Đổi cấu trúc folder skills/scripts
- Xóa hoặc rename skill/script
- Đổi format template
- Đổi API của scripts (flags, arguments)

### Flow

1. **PR → main** (mọi thay đổi)
2. **Tag** trên main khi release
3. **Cherry-pick** patches quan trọng → release/v1.x
4. Projects pin version: `bash /tmp/kit/bin/install-remote.sh . --version 1.1.2`

## Versioning

| Type | Bump | Ví dụ |
|------|------|-------|
| Breaking change | MAJOR | Đổi cấu trúc skills → v2.0.0 |
| New skill/script | MINOR | Thêm diagrams.md → v1.2.0 |
| Fix content/bug | PATCH | Sửa typo trong TDD skill → v1.2.1 |

## File Classification

```yaml
# Phân loại khi upgrade dự án:

override-safe:          # Luôn safe to overwrite
  - templates/*         # Templates chưa ai customize
  - memory/*            # Seed memories (additive)

new-only:               # Chỉ copy nếu file chưa tồn tại
  - skills/reference/*  # Reference docs
  - scripts/render-diagrams.sh

merge-required:         # Project thường customize → KHÔNG auto-overwrite
  - skills/core/*       # Core skills (project adds specifics)
  - skills/workflow/*   # Workflow (project has own git flow)
  - scripts/check-ci.sh # CI script (project has own timeouts)
  - scripts/test-local.sh # Test script (project has own paths)
```

`bin/install-remote.sh` PHẢI respect phân loại này — default `--plan`, KHÔNG `--force`.
