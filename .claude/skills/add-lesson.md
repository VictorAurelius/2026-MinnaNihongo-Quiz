# Skill: add-lesson

Thêm bài học mới (từ vựng + ngữ pháp) vào ứng dụng Smart Quiz.

## Cách dùng
```
/add-lesson <course> <lessonNumber> "<title>"
```

**Ví dụ:**
- `/add-lesson minna 26 "Tiêu đề bài 26"`
- `/add-lesson hsk 1 "HSK 1 — Cơ bản"`

---

## Hướng dẫn thực hiện

Khi người dùng gọi skill này, hãy:

1. **Xác định course** từ argument:
   - `minna` → file `js/data/minna/lesson-XX.js` + append vào `js/data/minna/index.js`
   - `hsk1`..`hsk6` → file `js/data/hsk/hskX.js`

2. **Hỏi người dùng** nếu thiếu thông tin:
   - Danh sách từ vựng (japanese, kana, vietnamese, english, example)
   - Danh sách ngữ pháp (pattern, vietnamese, english, explanation, examples[])

3. **Tạo file data** với cấu trúc chuẩn:

### Cấu trúc từ vựng (Japanese)
```javascript
{
  lessonNumber: N,
  title: "...",
  vocabulary: [
    {
      japanese: "漢字（かな）",
      kana: "かな",
      vietnamese: "nghĩa tiếng Việt",
      english: "English meaning",
      example: "Câu ví dụ。"
    }
  ],
  grammar: [
    {
      pattern: "〜パターン",
      vietnamese: "nghĩa",
      english: "meaning",
      explanation: "Giải thích cách dùng...",
      examples: [
        { japanese: "例文。", vietnamese: "Câu ví dụ.", english: "Example." }
      ]
    }
  ]
}
```

### Cấu trúc từ vựng (HSK Chinese)
```javascript
{
  lessonNumber: N,
  hskLevel: 1,  // 1-6
  title: "...",
  vocabulary: [
    {
      chinese: "汉字",
      pinyin: "hàn zì",
      vietnamese: "chữ Hán",
      english: "Chinese character",
      example: "我学汉字。"
    }
  ]
}
```

4. **Cập nhật data index** để include file mới:
   - `js/data/index.js` — export combined dataset

5. **Cập nhật `index.html`** để load file script mới (nếu dùng `<script>` tags)

6. **Verify** bằng cách chạy:
   ```bash
   python3 -m http.server 8080
   ```
   Và kiểm tra bài mới xuất hiện trong lesson grid.
