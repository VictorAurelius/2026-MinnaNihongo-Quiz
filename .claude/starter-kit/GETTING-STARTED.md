# Getting Started — Cài đặt và Customize Starter Kit

## Bước 1: Cài đặt (2 phút)

### Dự án MỚI
```bash
git clone https://github.com/VictorAurelius/claude-starter-kit.git /tmp/kit
bash /tmp/kit/init-project.sh /path/to/your-project
```

### Dự án ĐÃ CÓ
```bash
git clone https://github.com/VictorAurelius/claude-starter-kit.git /tmp/kit
bash /tmp/kit/install-remote.sh /path/to/your-project
```

### Xem trước (không thay đổi gì)
```bash
git clone https://github.com/VictorAurelius/claude-starter-kit.git /tmp/kit
bash /tmp/kit/upgrade-project.sh /path/to/your-project --dry-run
```

---

## Bước 2: Customize CLAUDE.md (5 phút) — QUAN TRỌNG NHẤT

`CLAUDE.md` là file Claude Code đọc ĐẦU TIÊN mỗi session. Nó quyết định Claude hành xử thế nào trong dự án của bạn.

### Mở file và sửa các placeholder:

```bash
code CLAUDE.md  # hoặc nano, vim
```

### Checklist customize:

| Section | Placeholder | Sửa thành | Bắt buộc? |
|---------|-------------|-----------|-----------|
| **Language** | `{LANGUAGE}` | `Vietnamese`, `English`, `Japanese` | ✅ Bắt buộc |
| **Project Name** | `{PROJECT_NAME}` | Tên dự án của bạn | ✅ Bắt buộc |
| **Description** | `{brief description}` | Mô tả ngắn | ✅ Bắt buộc |
| **Architecture** | `{describe your services}` | Tech stack thật | ✅ Bắt buộc |
| **Scripts** | Comment block | Uncomment scripts bạn có | ⚠️ Nên làm |
| **Business Logic** | `{domain}` | Domain nghiệp vụ | 🔲 Nếu có |
| **Project Structure** | `{service-1}` | Folder structure thật | ⚠️ Nên làm |

### Ví dụ CLAUDE.md đã customize:

```markdown
## Communication Language
**ALWAYS communicate in Vietnamese**

## Project Overview
**E-Commerce Platform** — Hệ thống bán hàng online với microservices

**Architecture:** 3 services (API Gateway, Order Service, Payment Service)
+ React frontend + PostgreSQL + Redis

## Scripts
| Script | Purpose |
|--------|---------|
| `scripts/test-local.sh` | Test locally before push |
| `scripts/check-ci.sh` | Wait for CI after push |
| `scripts/dev-up.sh` | Start Docker stack |
| `scripts/migrate.sh` | Run DB migrations |
```

---

## Bước 3: Chọn skills phù hợp (3 phút)

Kit cài TẤT CẢ skills. Bạn có thể tắt những cái không cần:

### Core Skills (giữ tất cả — đều hữu ích)

| Skill | Giữ? | Lý do |
|-------|------|-------|
| brainstorming-methodology | ✅ Luôn giữ | Tránh code trước nghĩ sau |
| tdd-enforcement | ✅ Luôn giữ | Test-first mindset |
| two-stage-code-review | ✅ Luôn giữ | Review chất lượng |
| systematic-debugging | ✅ Luôn giữ | Debug có hệ thống |
| task-breakdown-guide | ✅ Luôn giữ | Chia nhỏ tasks |

### Workflow Skills

| Skill | Giữ? | Khi nào bỏ |
|-------|------|-----------|
| development-workflow | ✅ Giữ | — |

### Quality Skills

| Skill | Giữ? | Khi nào bỏ |
|-------|------|-----------|
| quality-audit | ✅ Giữ | Bỏ nếu không cần scoring |

### Reference Skills (chọn theo dự án)

| Skill | Giữ? | Khi nào bỏ |
|-------|------|-----------|
| business-docs-3-layer | ⚠️ Tùy | Bỏ nếu không có business logic phức tạp |
| service-docs-standard | ⚠️ Tùy | Bỏ nếu không có microservices |
| project-structure | ✅ Giữ | — |
| ide-setup | ✅ Giữ | — |
| diagrams | ⚠️ Tùy | Bỏ nếu dự án nhỏ, không cần diagrams |

### Cách tắt skill:

```bash
# Xóa file (không ảnh hưởng kit — kit copy riêng)
rm .claude/skills/reference/business-docs-3-layer.md
rm .claude/skills/reference/service-docs-standard.md
```

---

## Bước 4: Customize scripts (2 phút)

### test-local.sh

Mở `scripts/test-local.sh` và cấu hình:

```bash
# Sửa dòng PROJECT_DIRS để match dự án
PROJECT_DIRS=("src" "lib" "app")  # Folders chứa code

# Sửa test commands theo tech stack
# Java:   mvnw test
# Node:   npm test
# Python: pytest
# Go:     go test ./...
```

### check-ci.sh

Thường không cần sửa — tự detect GitHub Actions.

### pre-commit-check.sh

Thêm project-specific checks nếu cần:

```bash
# Thêm vào cuối file
echo "🔍 Checking for TODO comments..."
if grep -rn "TODO" src/ --include="*.java" | head -5; then
    echo "⚠️  Found TODOs — consider resolving before commit"
fi
```

---

## Bước 5: Seed memories (1 phút)

Kit cài 4 lessons learned. Kiểm tra chúng phù hợp không:

```bash
ls ~/.claude/projects/*/memory/feedback_*.md
```

| Memory | Giữ? | Lý do bỏ |
|--------|------|----------|
| scripts_not_adhoc | ✅ Luôn giữ | Universal rule |
| self_test_before_push | ✅ Luôn giữ | Universal rule |
| ci_before_scoring | ✅ Luôn giữ | Universal rule |
| business_design_first | ⚠️ Tùy | Bỏ nếu không có business docs |

---

## Bước 6: Verify (1 phút)

```bash
# Check skills loaded
ls .claude/skills/core/
ls .claude/skills/reference/

# Check scripts work
scripts/test-local.sh --quick

# Check version
cat .claude/.starter-kit-version
```

---

## Tổng thời gian: ~15 phút

| Bước | Thời gian | Bắt buộc? |
|------|-----------|-----------|
| 1. Cài đặt | 2 min | ✅ |
| 2. CLAUDE.md | 5 min | ✅ |
| 3. Chọn skills | 3 min | ⚠️ Nên |
| 4. Scripts | 2 min | ⚠️ Nên |
| 5. Memories | 1 min | 🔲 Optional |
| 6. Verify | 1 min | ✅ |

---

## Update kit trong tương lai

```bash
# Khi có version mới:
git clone https://github.com/VictorAurelius/claude-starter-kit.git /tmp/kit
bash /tmp/kit/install-remote.sh /path/to/project

# Output:
# "Upgrade v1.1.2 → v1.2.0"
# "Updated: 5 files"
# CLAUDE.md + README.md KHÔNG bị overwrite
```

---

## FAQ

**Q: Kit overwrite CLAUDE.md tôi đã customize?**
A: Không. Từ v1.1.2, templates chỉ apply cho dự án mới (file chưa tồn tại).

**Q: Tôi muốn chỉ cài scripts, không cài skills?**
A: `bash upgrade-project.sh /path/to/project --scripts`

**Q: Tôi sửa skill trong dự án, làm sao đóng góp lại kit?**
A: `bash contribute.sh /path/to/project "Mô tả cải tiến"` → tạo proposal → review → apply.

**Q: Nhiều dự án dùng versions khác nhau có sao không?**
A: Không sao. Mỗi dự án track version riêng tại `.claude/.starter-kit-version`.
