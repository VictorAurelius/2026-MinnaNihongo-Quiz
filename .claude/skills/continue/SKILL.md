---
name: continue
description: Xác định action ưu tiên nhất từ project plans và thực hiện cho Smart Quiz
user-invocable: true
argument-hint: "[optional context]"
---

# /continue - Thực hiện Action Ưu Tiên Nhất

## Step 1: Xác định Priority Action

Đọc các plan/tracking documents theo thứ tự, tìm item ưu tiên cao nhất chưa hoàn thành:

1. `docs/QUALITY_AUDIT_PR_PLAN.md` — audit gaps cần fix
2. `docs/CHANGELOG.md` — [Unreleased] planned features
3. `docs/PROJECT_SUMMARY.md` — tổng quan tính năng hiện tại

Nếu không tìm thấy task cụ thể, kiểm tra health:
- Open PRs: `gh pr list --state open`
- CI status: `gh run list --limit 5`
- Stale branches: `git branch -r --merged origin/main | grep -v "main\|gh-pages\|HEAD" | wc -l`
- Unit tests: `cd svelte-app && npx vitest run`
- Build: `cd svelte-app && npx vite build`

Context bổ sung từ user: $ARGUMENTS

## Step 2: Báo cáo trước khi làm

```
## Tiếp tục: [Tên Task/PR]
**Priority**: P0/P1/P2
**Source**: [tên document]
**Scope**: [mô tả 1-2 câu]
**Files**: [danh sách files dự kiến thay đổi]
```

## Step 3: Thực hiện

### 3.1 Phân tích
- Đọc code liên quan trước khi sửa
- Xác định pattern tham khảo từ components đã hoạt động tốt
- Xác định risks và edge cases

### 3.2 Task Breakdown
- Chia tasks cụ thể
- Xác định thứ tự thực hiện

### 3.3 Implementation
- Tham khảo pattern từ CLAUDE.md (routing, TTS, quiz components, etc.)
- Luôn dùng `${base}` cho navigation
- Luôn dùng `playJapaneseAudio()` cho TTS (không raw SpeechSynthesisUtterance)
- Luôn dùng `item.kana` cho TTS input (không `item.japanese`)
- Commit thường xuyên với message rõ ràng

### 3.4 Verify (BẮT BUỘC trước khi push)
- Unit tests: `cd svelte-app && npx vitest run`
- Build: `cd svelte-app && npx vite build`
- Grep verify nếu cần (ví dụ: 0 raw SpeechSynthesisUtterance)
- PHẢI tất cả pass

### 3.5 Push & PR
- `git checkout -b <type>/<short-description>`
- `git push -u origin <branch>`
- `gh pr create` với Summary + Test plan
- KHÔNG merge — chờ user approve

## Step 4: Update Documents
Sau khi PR tạo xong:
- Update `docs/CHANGELOG.md` nếu là feature/fix đáng ghi nhận
- Update plan document: đánh dấu ✅, thêm PR number

## Rules
- LUÔN giao tiếp tiếng Việt
- LUÔN tạo feature branch (không commit trực tiếp lên main)
- LUÔN đọc code trước khi sửa
- LUÔN chạy tests + build sau code changes
- KHÔNG merge không có approval
- KHÔNG over-engineer — chỉ làm đúng scope yêu cầu
