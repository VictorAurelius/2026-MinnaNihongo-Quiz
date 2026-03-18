# Claude Configuration & Documentation

Thư mục này chứa cấu hình và tài liệu làm việc với Claude Code cho dự án Smart Quiz.

## Cấu trúc thư mục

### `docs/` - Tài liệu chính
Tài liệu đang được sử dụng cho development:
- **DEVELOPMENT.md** - Hướng dẫn phát triển
- **FEATURE_CHECKLIST.md** - Checklist tính năng
- **VALIDATION.md** - Quy trình validation và testing

### `plans/` - Kế hoạch phát triển
Các kế hoạch implementation đang hoạt động:
- **README.md** - Index các plans
- **hsk-vocab-v1.md** - Kế hoạch HSK vocabulary
- **hsk5-phase5-easyocr.md** - Kế hoạch OCR cho HSK5
- **minna-extras-v1.md** - Kế hoạch mở rộng Minna no Nihongo
- **minna-refactor-v1.md** - Kế hoạch refactor Minna

### `skills/` - Claude Skills
Custom skills cho các tác vụ thường xuyên:
- **add-cn-section.md** - Thêm section tiếng Trung
- **add-hsk.md** - Thêm HSK vocabulary
- **add-lesson.md** - Thêm bài học Minna
- **commit.md** - Commit changes
- **ocr-cn-pdf.md** - OCR PDF tiếng Trung
- **refactor.md** / **refactor-phase2.md** - Refactoring tasks
- **update-hsk5.md** - Cập nhật HSK5 data

### `user-prompt/` - User Prompts
Prompts từ user được lưu lại:
- **prompt-1.md** - User prompt history

### `archive/` - Lưu trữ
Tài liệu và reports đã hoàn thành:

#### `archive/reports/`
Báo cáo completion và summaries:
- lessons-8-12-completion-report.md
- lessons-13-25-completion-report.md
- duplicate-fixes-summary.md
- vocabulary-completion-summary.md
- vocabulary-survey-lessons-2-25.md
- grammar-reference-summary.md
- grammar-reference-progress.md
- session-summary-2026-03-13.md
- test-report.md

#### `archive/phases/`
Phase completion summaries:
- phase-4-complete.md
- phase-5-complete.md
- phase-6-complete.md

#### `archive/legacy-plans/`
Kế hoạch đã hoàn thành hoặc không còn dùng:
- MASTER_PLAN.md
- minna-vocab-update-plan.md
- extra-vocabulary-additions.md
- counters-expansion-plan.md
- GRAMMAR-REFERENCE-COMPLETE.md

#### `archive/examples/`
Code examples và snippets cũ:
- example-lesson-03-updated.js

### `settings.local.json`
File cấu hình local cho Claude Code (không commit vào git).

## Sử dụng

### Tài liệu Development
Tham khảo `docs/` để hiểu quy trình phát triển và validation.

### Thực thi Plans
Xem `plans/README.md` để chọn plan cần thực hiện.

### Sử dụng Skills
Gọi skills bằng lệnh `/skill-name` trong Claude Code.

### Tìm kiếm Archive
Khi cần tham khảo lại reports hoặc plans cũ, xem trong `archive/`.
