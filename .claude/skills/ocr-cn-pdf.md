# Skill: ocr-cn-pdf

OCR một file PDF từ vựng Tiếng Trung (ảnh scan) → JSON → JS data files.

## Cách dùng
```
/ocr-cn-pdf
```
Dùng khi có file PDF mới chứa từ vựng Tiếng Trung (HSK, HSKK, hoặc bất kỳ giáo trình nào).

---

## Điều kiện tiên quyết

```bash
# Kiểm tra dependencies
python3 -c "import pytesseract, pdf2image, deep_translator, pypinyin; print('OK')"
python3 -c "import easyocr; print('EasyOCR OK')"

# Cài nếu thiếu
sudo apt-get install -y tesseract-ocr tesseract-ocr-chi-sim
python3 -m pip install pytesseract pdf2image deep-translator pypinyin easyocr pillow --break-system-packages
```

---

## Bước thực hiện

### 1. Đặt PDF vào `data-pdf/`
```
data-pdf/
└── <tên-collection>/
    ├── vocab-part1.pdf
    └── vocab-part2.pdf
```

### 2. Chạy OCR (Tesseract pass đầu — nhanh)

Sao chép và chỉnh `scripts/ocr_hsk5.py`:
```python
PDF_PATHS = [
    "data-pdf/<tên-collection>/vocab-part1.pdf",
    "data-pdf/<tên-collection>/vocab-part2.pdf",
]
OUTPUT_JSON = "scripts/<tên-collection>_raw.json"
```

Chạy:
```bash
python3 scripts/ocr_hsk5.py --skip-translate
```

Kết quả: `scripts/<tên-collection>_raw.json`
```json
[{ "num": 1, "chinese": "阿姨", "pinyin": "āyí", "vietnamese": "" }]
```

### 3. Cải thiện coverage với EasyOCR (pass thứ hai)

Sao chép và chỉnh `scripts/ocr_easyocr.py`:
```python
PDF_PATHS = [...]
INPUT_JSON  = "scripts/<tên-collection>_raw.json"
OUTPUT_JSON = "scripts/<tên-collection>_raw.json"
```

Chạy (mất ~30 phút CPU, nên background):
```bash
python3 scripts/ocr_easyocr.py --skip-translate > /tmp/easyocr_run.log 2>&1 &
tail -f /tmp/easyocr_run.log
```

### 4. Dịch sang Tiếng Việt
```bash
python3 scripts/ocr_hsk5.py --resume
# hoặc:
python3 scripts/ocr_easyocr.py  # (không --skip-translate)
```

### 5. Review JSON trước khi generate
```bash
python3 - <<'EOF'
import json
with open("scripts/<tên-collection>_raw.json") as f: data = json.load(f)
print(f"Total: {len(data)}")
for e in data[:15]: print(f"  #{e['num']:4d}  {e['chinese']}  ({e['pinyin']})  →  {e['vietnamese']}")
EOF
```

Sửa thủ công các entry sai trực tiếp trong JSON nếu cần.

### 6. Generate JS files

Sao chép và chỉnh `scripts/generate_js.py`:
```python
GROUPS = [
    ("a", "A – G",  1,    500),
    ("b", "G – M",  501,  1000),
    # ...điều chỉnh theo số lượng từ thực tế
]
# Đổi tên file output theo collection mới:
path = os.path.join(args.out_dir, f"<collection>-{gid}.js")
```

Chạy:
```bash
python3 scripts/generate_js.py \
    --input scripts/<tên-collection>_raw.json \
    --out-dir src/js/data/<tên-collection>
```

---

## Schema chuẩn (hiện tại)

```javascript
{ chinese: "安静", pinyin: "ānjìng", vietnamese: "yên tĩnh" }
```

> **Không cần `english`** — đã bỏ khỏi schema.

---

## Lưu ý OCR

| Vấn đề | Xử lý |
|--------|-------|
| `$` bị nhận là `5` | `_clean_num()` đã xử lý: `$→5` |
| Số bị đọc `S30` thay `530` | `S→5` trong `_clean_num()` |
| Trang PDF cho <40 từ | Log warning → nhập thủ công vào JSON |
| Pinyin bị OCR sai | Bỏ qua — `pypinyin` tự tính từ chữ Hán |
| Chữ Hán sai (OCR error) | Sửa trong JSON, re-run `generate_js.py` |

---

## Sau khi có data files

→ Xem skill `/add-cn-section` để tích hợp vào app.
