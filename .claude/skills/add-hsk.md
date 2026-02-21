# Skill: add-hsk

Thêm từ vựng HSK (Tiếng Trung) vào Smart Quiz.

## Cách dùng
```
/add-hsk <level>
```
Level: 1, 2, 3, 4, 5, 6

**Ví dụ:** `/add-hsk 1`

---

## Hướng dẫn thực hiện

### Cấu trúc HSK theo cấp độ

| Level | Số từ | Mô tả |
|-------|-------|-------|
| HSK 1 | 150 từ | Cơ bản, giao tiếp hàng ngày |
| HSK 2 | 300 từ | Sơ cấp |
| HSK 3 | 600 từ | Trung cấp thấp |
| HSK 4 | 1200 từ | Trung cấp |
| HSK 5 | 2500 từ | Cao cấp |
| HSK 6 | 5000 từ | Thành thạo |

### File cần tạo/chỉnh sửa

1. **`js/data/hsk/hsk<N>.js`** — Data file cho level N
2. **`js/data/hsk/index.js`** — Export tất cả HSK levels
3. **`js/data/index.js`** — Combined export (Minna + HSK)

### Cấu trúc data HSK

```javascript
// js/data/hsk/hsk1.js
const HSK1_DATA = [
  {
    lessonNumber: 1,
    hskLevel: 1,
    title: "HSK 1 — Chủ đề: Chào hỏi",
    vocabulary: [
      {
        chinese: "你好",
        pinyin: "nǐ hǎo",
        tone: "3-3",           // tone numbers
        vietnamese: "xin chào",
        english: "hello",
        example: "你好！我叫小明。",
        exampleVi: "Xin chào! Tôi tên là Tiểu Minh."
      }
    ]
  }
];
```

### Quiz modes cho HSK (cần implement)

- **Flashcard**: Mặt trước = Chữ Hán, Mặt sau = Pinyin + Nghĩa
- **MC Chinese → VN**: Chọn nghĩa từ chữ Hán
- **MC VN → Chinese**: Chọn chữ Hán từ nghĩa
- **Gõ Pinyin**: Nhập pinyin cho từ tiếng Việt
- **Tone Quiz**: Chọn thanh điệu đúng

### Bước thực hiện

1. Đọc `js/data/index.js` để hiểu cấu trúc hiện tại
2. Tạo file `js/data/hsk/hsk<N>.js` với data
3. Cập nhật `js/data/hsk/index.js`
4. Cập nhật `js/data/index.js` để merge HSK data
5. Cập nhật `js/core/utils.js` nếu cần thêm hàm xử lý pinyin
6. Cập nhật `index.html` để load file mới
7. Test trong browser

### Note về Pinyin

- Tone marks: ā á ǎ à, ē é ě è, ī í ǐ ì, ō ó ǒ ò, ū ú ǔ ù, ǖ ǘ ǚ ǜ
- Neutral tone: không có dấu (ma, me, le...)
- Validate: cần normalize cả dạng có dấu và dạng số (ni3 hao3 = nǐ hǎo)
