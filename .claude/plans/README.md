# Plans Index

Thư mục này chứa tất cả master plan cho dự án Smart Quiz.

## Naming Convention
```
<topic>-v<N>.md
```
- `topic`: mô tả ngắn, kebab-case
- `N`: số version, tăng dần khi plan được revise đáng kể
- Khi tạo v2: **giữ nguyên v1** (lịch sử), tạo file mới

## Plans

| File | Status | Mô tả |
|------|--------|-------|
| [minna-refactor-v1.md](./minna-refactor-v1.md) | 🟡 In Progress | Tái cấu trúc codebase Minna no Nihongo (tách data.js + app.js thành modules) |
| [hsk-vocab-v1.md](./hsk-vocab-v1.md) | 🔴 Not Started | Section học từ vựng HSK Tiếng Trung (mới hoàn toàn) |

## Status Legend
- 🔴 Not Started
- 🟡 In Progress
- 🟢 Completed
- ⏸️ Paused
- ❌ Cancelled

## Dependency Graph
```
minna-refactor-v1 (Phase 1 + 2)
        ↓
hsk-vocab-v1
```
