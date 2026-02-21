# Skill: commit

Tạo git commit chuẩn format với Claude co-author.

## Cách dùng
```
/commit
```

---

## Hướng dẫn thực hiện

Khi người dùng gọi `/commit`, hãy thực hiện theo đúng trình tự sau:

### Bước 1: Kiểm tra trạng thái

Chạy song song:
```bash
git status
git diff --cached
git log --oneline -5
```

### Bước 2: Stage files (nếu chưa stage)

Nếu chưa có gì được staged, hỏi người dùng muốn stage file nào. Ưu tiên stage cụ thể từng file thay vì `git add .` để tránh commit nhầm file nhạy cảm.

### Bước 3: Soạn commit message

Dựa trên diff đã stage, soạn message theo format:

```
<type>(<scope>): <subject>

<body (nếu cần)>

Co-authored-by: Claude Sonnet 4.6 (1M context) <noreply@anthropic.com>
```

**Types:** `feat` | `fix` | `refactor` | `chore` | `docs` | `style` | `test`

**Quy tắc:**
- Subject: imperative, lowercase, không chấm cuối, tối đa 72 ký tự
- Body: giải thích WHY, không phải WHAT (nếu message đủ rõ thì bỏ body)
- `Co-authored-by` luôn là dòng cuối cùng

### Bước 4: Commit

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body>

Co-authored-by: Claude Sonnet 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Bước 5: Xác nhận

Chạy `git log --oneline -3` để confirm commit thành công.
