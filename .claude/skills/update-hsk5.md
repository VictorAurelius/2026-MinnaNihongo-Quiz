# Skill: update-hsk5

Cập nhật/sửa dữ liệu HSK5 hiện có — thêm entries còn thiếu, sửa chữ Hán sai, cập nhật nghĩa Việt.

## Cách dùng
```
/update-hsk5
```

---

## Cấu trúc file dữ liệu HSK5

```
scripts/
├── hsk5_raw.json          ← SOURCE OF TRUTH (1603 entries hiện tại)
├── ocr_hsk5.py            ← OCR pipeline (Tesseract)
├── ocr_easyocr.py         ← OCR pipeline (EasyOCR, chất lượng tốt hơn)
└── generate_js.py         ← JSON → JS files

src/js/data/hsk/
├── hsk5-a.js  (#1–500)
├── hsk5-b.js  (#501–1000)
├── hsk5-c.js  (#1001–1500)
├── hsk5-d.js  (#1501–2000)
├── hsk5-e.js  (#2001–2500)
└── index.js
```

**Quy trình:** Chỉ sửa `hsk5_raw.json` → chạy `generate_js.py` → commit.

---

## Trường hợp 1: Sửa entry sai

Mở `scripts/hsk5_raw.json`, tìm entry theo `num`, sửa trực tiếp:

```json
{ "num": 3, "chinese": "唉", "pinyin": "āi", "vietnamese": "ôi trời" }
```

Thường gặp:
- Chữ Hán OCR sai → sửa `chinese` + `pinyin` sẽ tự fix nếu dùng pypinyin
- Nghĩa Việt dịch sai → sửa `vietnamese`
- Pinyin có dấu sai → sửa `pinyin`

---

## Trường hợp 2: Thêm entries còn thiếu (thủ công)

Xem gaps hiện tại:
```bash
python3 - <<'EOF'
import json
with open("scripts/hsk5_raw.json") as f: data = json.load(f)
nums = set(e['num'] for e in data)
gaps = sorted(n for n in range(1, 2501) if n not in nums)
print(f"Total gaps: {len(gaps)}")
print("First 30:", gaps[:30])
EOF
```

Thêm entry vào JSON:
```json
{ "num": 75, "chinese": "报名", "pinyin": "bàomíng", "vietnamese": "đăng ký" }
```

Sau đó regenerate:
```bash
python3 scripts/generate_js.py
```

---

## Trường hợp 3: Cải thiện coverage bằng EasyOCR

Chạy EasyOCR pass để fill gaps tự động:
```bash
# Chạy background (~28 phút)
python3 scripts/ocr_easyocr.py --skip-translate > /tmp/easyocr.log 2>&1 &
tail -f /tmp/easyocr.log

# Sau khi xong — translate
python3 scripts/ocr_hsk5.py --resume

# Regenerate
python3 scripts/generate_js.py
```

---

## Trường hợp 4: Thêm batch translation cho entries thiếu nghĩa Việt

```bash
python3 scripts/ocr_hsk5.py --resume
```

Script sẽ tự tìm và translate các entries có `vietnamese: ""`.

---

## Sau khi sửa xong

```bash
# Regenerate JS files
python3 scripts/generate_js.py

# Verify JS syntax
node -c src/js/data/hsk/hsk5-a.js && echo "OK"

# Check entry count
python3 - <<'EOF'
import json
with open("scripts/hsk5_raw.json") as f: data = json.load(f)
print(f"{len(data)}/2500 ({len(data)/2500*100:.1f}%)")
EOF

# Commit
git add scripts/hsk5_raw.json src/js/data/hsk/
git commit -m "fix(data): update HSK5 vocabulary entries"
```

---

## Schema

```javascript
{ chinese: "汉字", pinyin: "hàn zì", vietnamese: "nghĩa VN" }
```

> `english` đã bỏ khỏi schema từ 2026-02-22.
