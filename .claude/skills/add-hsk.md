# Skill: add-hsk

> **Lưu ý:** HSK5 đã được implement xong. Skill này dành cho việc thêm HSK level khác (HSK1-4, HSK6) hoặc HSKK trong tương lai.
>
> - Để sửa/bổ sung dữ liệu HSK5 hiện có → dùng `/update-hsk5`
> - Để thêm section Tiếng Trung mới từ PDF → dùng `/ocr-cn-pdf` + `/add-cn-section`

## Cách dùng
```
/add-hsk <level>
```
Level: 1, 2, 3, 4, 6 (HSK5 đã có)

**Ví dụ:** `/add-hsk 1` — thêm 150 từ HSK1

---

## Kiến trúc hiện tại (HSK5 là reference)

```
src/js/data/hsk/
├── hsk5-a.js  — entries #1–500    (const HSK5_A = [...])
├── hsk5-b.js  — entries #501–1000
├── hsk5-c.js  — entries #1001–1500
├── hsk5-d.js  — entries #1501–2000
├── hsk5-e.js  — entries #2001–2500
└── index.js   — const HSK5_DATA = { groups: [...] }
```

Quiz modes đã hoạt động: `hsk-fc`, `hsk-mc-cn-vi`, `hsk-mc-vi-cn`
Navigation: `hskMenu` screen, `hsk-menu.js`, `hsk-vocab-list.js`

---

## Schema từ vựng (chuẩn hiện tại)

```javascript
{ chinese: "你好", pinyin: "nǐ hǎo", vietnamese: "xin chào" }
```

> Không cần `english`, `example`, `tone` — đã đơn giản hóa.

---

## Bước thực hiện cho level mới

### 1. Lấy dữ liệu

**Option A: PDF scan** → dùng `/ocr-cn-pdf`

**Option B: Nhập thủ công** (HSK1-2 chỉ 150-300 từ, khả thi)
```json
[
  { "num": 1, "chinese": "爱", "pinyin": "ài", "vietnamese": "yêu" },
  { "num": 2, "chinese": "八", "pinyin": "bā", "vietnamese": "tám" }
]
```

### 2. Generate JS files

Chỉnh `scripts/generate_js.py`:
```python
GROUPS = [
    ("a", "A – Z", 1, 9999),  # HSK1 ít từ → 1 group
]
# Đổi output dir:
# --out-dir src/js/data/hsk1
```

Chạy:
```bash
python3 scripts/generate_js.py \
    --input scripts/hsk1_raw.json \
    --out-dir src/js/data/hsk1
```

### 3. Thêm vào app

Xem `/add-cn-section` để hướng dẫn tích hợp đầy đủ (script tags, navigation, menu screen, storage, results).

---

## Lưu ý quan trọng

- HSK5 dùng chung `#screen-hsk-menu`, `hsk-menu.js`, `hsk-vocab-list.js` — reusable cho các level khác
- `storage.js` có `saveHSKProgress()` / `getHSKGroupBestPercent()` — dùng lại được
- `flashcard.js` dispatch `hsk-fc`, `mc.js` dispatch `hsk-mc-*` — dùng lại được
- Chỉ cần thêm data files + script tags + entries vào lesson grid
