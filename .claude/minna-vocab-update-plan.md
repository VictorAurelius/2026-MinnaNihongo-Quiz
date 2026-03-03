# Kế hoạch cập nhật từ vựng Minna no Nihongo

## 📊 Phát hiện chính

### Bài 3 thiếu ít nhất 8 từ:

**Main Vocabulary:**
1. 自動販売機 (じどうはんばいき) - vending machine

**Supplementary/Reference Vocabulary (参考語彙):**
2. イタリア (Itaria) - Italy
3. スイス (Suisu) - Switzerland
4. フランス (Furansu) - France
5. ジャカルタ (Jakaruta) - Jakarta
6. バンコク (Bankoku) - Bangkok
7. ベルリン (Berurin) - Berlin
8. 新大阪 (しんおおさか, Shin-Ōsaka) - Shin-Osaka station

**Có thể còn thiếu:**
- 日本 (にほん, Nihon) - Japan
- 中国 (ちゅうごく, Chūgoku) - China
- 韓国 (かんこく, Kankoku) - Korea

---

## 🔍 Nguồn đã xác minh

### Sources đã kiểm chứng:
- [egg-nihongo-kyoshi.com](https://egg-nihongo-kyoshi.com) - PDF vocabulary lists
- [minna-de-nihongo.jp](https://minna-de-nihongo.jp/2022/06/30/lesson-3-vocabulary/) - Teaching resources
- [Quizlet sets](https://quizlet.com/gb/855396265/minna-no-nihongo-lesson-3-vocabulary-flash-cards/)
- [learnjapaneseaz.com](https://learnjapaneseaz.com/minna-no-nihongo-lesson-3-vocabulary.html)
- Web search results xác nhận từ nhiều nguồn

### Cấu trúc sách Minna no Nihongo:
- **語彙 (Vocabulary)**: Từ vựng chính của bài
- **参考語彙 (Reference Vocabulary)**: Từ vựng bổ sung/tham khảo
  - Thường bao gồm: tên quốc gia, thành phố, nghề nghiệp, thương hiệu, v.v.
  - Không phải từ bắt buộc nhưng hữu ích cho học viên

---

## 📋 Kế hoạch thực hiện

### Phase 1: Research & Data Collection ⏰ Est: 2-3 giờ

**Task 1.1: Tìm danh sách đầy đủ cho tất cả 25 bài**
- Web search cho từng bài (lesson 1-25)
- Tìm từ các nguồn tin cậy:
  - egg-nihongo-kyoshi.com (PDF lists)
  - Quizlet verified sets
  - Japanese teaching blogs
  - Sách gốc nếu có

**Task 1.2: Tổng hợp supplementary vocabulary**
- Tạo spreadsheet/document tạm để tracking:
  ```
  Lesson | Missing Main Vocab | Missing Supplementary Vocab | Source
  3      | 自動販売機         | イタリア, スイス, ...       | egg-nihongo-kyoshi
  ...    | ...                | ...                         | ...
  ```

**Task 1.3: Priority lessons to check**
- Bài 1: Quốc gia, nghề nghiệp (countries, occupations)
- Bài 2: Đồ vật, thương hiệu (objects, brands)
- Bài 3: ✅ Đã xác minh
- Bài 4-5: Địa điểm, phương tiện (places, transportation)
- Bài 6-10: Động từ, đồ ăn (verbs, food items)
- Bài 11-15: Trợ số từ, tính từ (counters, adjectives)
- Bài 16-20: Từ vựng nâng cao
- Bài 21-25: Từ vựng cao cấp

---

### Phase 2: Data Structure Decision ⏰ Est: 30 phút

**Option 1: Thêm field `type`** (Recommended ⭐)
```javascript
vocabulary: [
  {
    japanese: "ここ",
    kana: "ここ",
    vietnamese: "ở đây",
    english: "here",
    type: "main", // hoặc "supplementary"
    example: "..."
  }
]
```
**Ưu điểm:**
- ✅ Dễ filter khi cần (main only / all)
- ✅ Giữ nguyên cấu trúc hiện tại
- ✅ Dễ hiển thị riêng biệt trong UI nếu cần

**Option 2: Tách thành 2 arrays**
```javascript
vocabulary: [ /* main vocab */ ],
supplementaryVocabulary: [ /* supplementary */ ]
```
**Ưu điểm:**
- ✅ Rõ ràng về phân loại
**Nhược điểm:**
- ❌ Phải update nhiều nơi trong code (quiz logic, display)

**Option 3: Merge tất cả (Simplest)**
```javascript
vocabulary: [ /* all vocab mixed */ ]
```
**Ưu điểm:**
- ✅ Đơn giản nhất
**Nhược điểm:**
- ❌ Không phân biệt được main vs supplementary

**Decision: Chọn Option 1** - Balance giữa flexibility và simplicity

---

### Phase 3: Data Update ⏰ Est: 3-4 giờ

**Task 3.1: Update Lesson 3 (Pilot)**
- Thêm 8 từ thiếu vào `lesson-03.js`
- Thêm field `type: "main"` cho tất cả từ hiện tại
- Thêm từ mới với `type: "supplementary"`
- Test xem app có hoạt động bình thường không

**Task 3.2: Update các bài còn lại (Lesson 1-2, 4-25)**
- Update theo batch:
  - Batch 1: Bài 1-5 (foundational)
  - Batch 2: Bài 6-10 (verbs)
  - Batch 3: Bài 11-15 (mid-level)
  - Batch 4: Bài 16-20 (advanced)
  - Batch 5: Bài 21-25 (highest level)

**Task 3.3: Code changes (if needed)**
- Check xem có chỗ nào trong code filter vocabulary không
- Update quiz logic nếu cần (có thể bỏ qua supplementary vocab trong quiz)
- Update vocab list display (có thể hiển thị badge "Reference" cho supplementary)

---

### Phase 4: Testing & Verification ⏰ Est: 1 giờ

**Task 4.1: Manual testing**
- Test từng bài xem từ vựng hiển thị đúng không
- Test quiz modes (flashcard, MC, typing)
- Test search/filter nếu có

**Task 4.2: Cross-check với sách gốc**
- Verify lại với sách Minna no Nihongo (nếu có)
- Hoặc cross-check với 2-3 nguồn tin cậy

**Task 4.3: Update documentation**
- Update PROJECT_SUMMARY.md với số từ vựng mới
- Update CHANGELOG.md

---

## ⚖️ Trade-offs & Considerations

### Approach 1: Comprehensive (Recommended)
- ✅ Cập nhật đầy đủ tất cả 25 bài
- ✅ Accurate với sách gốc
- ❌ Mất nhiều thời gian (6-8 giờ total)

### Approach 2: Incremental
- ✅ Update từng bài theo priority
- ✅ Có thể release sớm
- ⚠️ Cần tracking progress tốt

### Approach 3: Quick Fix
- ✅ Chỉ fix bài 3 trước
- ❌ Vẫn còn thiếu ở các bài khác

**Recommendation: Chọn Approach 1** - One-time effort, complete solution

---

## 🎯 Success Criteria

✅ Tất cả 25 bài có đầy đủ từ vựng main + supplementary
✅ Data match với ít nhất 2 nguồn tin cậy
✅ App vẫn hoạt động bình thường (no breaking changes)
✅ Supplementary vocab được đánh dấu rõ ràng (type field)
✅ Documentation được update

---

## 📝 Notes

- Supplementary vocabulary không bắt buộc trong quiz, có thể làm "optional" mode
- Có thể thêm UI toggle "Show reference vocabulary" trong vocab list
- Cân nhắc thêm field `difficulty` hoặc `jlpt_level` trong tương lai

---

## 🔗 Reference Links

- [Minna no Nihongo I Vocabulary - egg-nihongo-kyoshi](https://egg-nihongo-kyoshi.com/%E3%81%BF%E3%82%93%E3%81%AA%E3%81%AE%E6%97%A5%E6%9C%AC%E8%AA%9E%E5%88%9D%E7%B4%9A%E2%85%B0%E7%AC%AC1%E8%AA%B2%EF%BD%9E%E7%AC%AC25%E8%AA%B2%E8%AA%9E%E5%BD%99%E3%83%AA%E3%82%B9%E3%83%88/)
- [Minna no Nihongo Lesson 3 - minna-de-nihongo.jp](https://minna-de-nihongo.jp/2022/06/30/lesson-3-vocabulary/)
- [Quizlet - Minna no Nihongo Lesson 3](https://quizlet.com/gb/855396265/minna-no-nihongo-lesson-3-vocabulary-flash-cards/)
- [Learn Japanese AZ - Minna no Nihongo](https://learnjapaneseaz.com/minna-no-nihongo-lesson-3-vocabulary.html)
