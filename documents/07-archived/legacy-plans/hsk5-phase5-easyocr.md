# Phase 5: Cải thiện coverage HSK5 bằng EasyOCR

**Status:** 🔴 Chưa chạy — bị interrupt, để test sau
**Created:** 2026-02-22

---

## Mục tiêu

Tăng coverage từ **64.1% (1603/2500)** lên ~80%+ bằng cách dùng EasyOCR
(chính xác hơn Tesseract cho chữ Hán, đặc biệt các ký tự phức tạp).

---

## Vấn đề đã phát hiện

### 1. Stdout bị buffer khi redirect
Khi chạy `python3 scripts/ocr_easyocr.py > log.txt`, output bị buffer →
không thấy progress và không biết script crash hay chạy xong.

**Fix:** Dùng `-u` flag:
```bash
python3 -u scripts/ocr_easyocr.py --skip-translate 2>&1 | tee /tmp/easyocr.log
```

### 2. Thời gian ước tính
- ~42 giây / page (3 columns × 14s/col trên CPU)
- 37 pages có gaps → ~25 phút tổng
- Không dùng GPU (WSL2 không có CUDA passthrough)

---

## Script đã sẵn sàng

```
scripts/ocr_easyocr.py   ← đã viết xong, cần test
```

**Cách chạy:**
```bash
# Bước 1: OCR (skip translate, ~25 phút)
python3 -u scripts/ocr_easyocr.py --skip-translate 2>&1 | tee /tmp/easyocr.log

# Theo dõi progress trong terminal khác:
tail -f /tmp/easyocr.log | grep -E "(page|found|Result|Error)"

# Bước 2: Translate entries mới
python3 scripts/ocr_hsk5.py --resume

# Bước 3: Regenerate JS
python3 scripts/generate_js.py

# Bước 4: Verify
python3 - <<'EOF'
import json
with open("scripts/hsk5_raw.json") as f: data = json.load(f)
print(f"{len(data)}/2500 ({len(data)/2500*100:.1f}%)")
EOF

# Bước 5: Commit
git add scripts/hsk5_raw.json src/js/data/hsk/
git commit -m "feat(data): improve HSK5 coverage via EasyOCR (Phase 5)"
```

---

## Chất lượng EasyOCR (đã verify trên page 1)

So sánh với Tesseract trên page 1 col 1:

| # | Tesseract | EasyOCR | Đúng |
|---|-----------|---------|------|
| 1 | 阿姨 ✓ | 阿姨 ✓ | 阿姨 |
| 14 | 安感 ✗ | 安慰 ✓ | 安慰 |
| 15 | 安帮 ✗ | 安装 ✓ | 安装 |
| 16 | 上岸 ✗ | 岸 ✓ | 岸 |

EasyOCR rõ ràng chính xác hơn cho multi-char words.

**Lưu ý:** EasyOCR không detect được một số single-char entries (e.g., 啊, 唉, 矮)
ở page 1 — có thể do image contrast. Tesseract cũng bỏ sót các từ này.

---

## Script structure (`ocr_easyocr.py`)

```
1. Load hsk5_raw.json → tìm gaps (897 entries hiện tại)
2. Map gaps → pages cần scan (37 pages)
3. Init EasyOCR reader(['ch_sim', 'en'], gpu=False)
4. Với mỗi page có gaps:
   - pdf2image (1 page at a time, DPI=200)
   - Split 3 columns
   - preprocess_np(): grayscale + binarize → numpy array
   - reader.readtext() → list of (bbox, text, conf) blocks
   - parse_easyocr_column(): sort by Y → pair "N." block với CJK block kế tiếp
   - Chỉ thêm entries KHÔNG có trong existing data
5. Derive pinyin (pypinyin)
6. Nếu không --skip-translate: Google Translate CN→VI
7. Merge vào hsk5_raw.json (overwrite)
```

---

## Dependencies (đã cài)

```bash
python3 -c "import easyocr, pdf2image, pypinyin, deep_translator; print('OK')"
# → OK
```

EasyOCR models đã được download vào `~/.EasyOCR/model/`

---

## Gaps hiện tại (897 entries)

Xem phân tích chi tiết:
```bash
python3 - <<'EOF'
import json
with open("scripts/hsk5_raw.json") as f: data = json.load(f)
nums = set(e['num'] for e in data)
gaps = sorted(n for n in range(1, 2501) if n not in nums)
print(f"Total gaps: {len(gaps)}")
# Gap ranges: 75, 100-120, 159, 163-183, ...
EOF
```
