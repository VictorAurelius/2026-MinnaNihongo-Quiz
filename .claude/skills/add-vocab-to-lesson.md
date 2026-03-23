# Add Vocabulary to Lesson Skill

**Purpose**: Thêm từ vựng mới vào các bài học Minna no Nihongo (Lesson 1-25)

## 🎯 When to Use
- Khi user yêu cầu thêm từ vựng mới vào một bài cụ thể
- Khi phát hiện thiếu từ vựng quan trọng trong bài học
- Khi cần bổ sung từ kaiwa (hội thoại), reference (tham khảo)

## 📝 Input Format
User sẽ cung cấp:
```
Bài X cần thêm các từ:
1. [từ tiếng Nhật] - [nghĩa tiếng Việt] - [type: main/kaiwa/reference]
2. ...
```

Hoặc đơn giản hơn:
```
Bài 7 cần thêm:
- máy vi tính cá nhân
- điện thoại di động
- email
```

## 🔄 Workflow

### Step 1: Xác định lesson file
```bash
# Tìm lesson file
LESSON_NUM="07"
LESSON_FILE="svelte-app/src/lib/data/minna/lessons/lesson-${LESSON_NUM}.ts"
```

### Step 2: Đọc lesson file hiện tại
- Sử dụng Read tool để đọc toàn bộ file
- Xác định vị trí vocabulary array
- Hiểu cấu trúc hiện tại

### Step 3: Web Search cho từ vựng thiếu
**IMPORTANT**: Nếu user chỉ cung cấp nghĩa tiếng Việt, phải search để tìm:
- Từ tiếng Nhật (漢字 nếu có)
- Kana (hiragana/katakana)
- English translation
- Example sentence (câu ví dụ)

```bash
# Search pattern
"[nghĩa tiếng Việt] tiếng Nhật Minna no Nihongo"
"[nghĩa tiếng Việt] Japanese vocabulary lesson [số bài]"
```

**Trusted Sources**:
- mazii.net - từ điển Nhật-Việt
- jisho.org - Japanese dictionary
- Minna no Nihongo vocabulary lists
- guidable.co - Japanese learning resources

### Step 4: Format vocabulary item
Mỗi vocabulary item theo format:
```typescript
{
  japanese: "パソコン",           // Kanji hoặc katakana/hiragana
  kana: "パソコン",               // Reading (nếu có kanji thì ghi kana, không thì giống japanese)
  vietnamese: "máy vi tính cá nhân",
  type: "main",                   // main | kaiwa | reference
  english: "Personal computer",
  example: "わたしは　パソコンで　仕事を　します。" // Câu ví dụ ngắn
}
```

**Type classification**:
- `main` - Từ vựng chính trong bài (từ trong table chính)
- `kaiwa` - Từ từ phần hội thoại (会話)
- `reference` - Từ tham khảo bổ sung (参考)

### Step 5: Insert vocabulary
**Vị trí insert**:
- `main` vocabulary: Thêm vào cuối mảng vocabulary chính, trước kaiwa/reference
- `kaiwa` vocabulary: Thêm vào phần vocabulary có `type: "kaiwa"`
- `reference` vocabulary: Thêm vào cuối cùng với `type: "reference"`

**Sort order**:
- Giữ nguyên thứ tự xuất hiện trong sách (nếu biết)
- Nếu không chắc, thêm vào cuối section tương ứng

### Step 6: Validate
Before committing, verify:
- [ ] Không duplicate vocabulary (check japanese field)
- [ ] Format đúng TypeScript syntax
- [ ] Comma cuối mỗi object
- [ ] Example sentence đầy đủ
- [ ] Type phù hợp (main/kaiwa/reference)

### Step 7: Run tests
```bash
cd svelte-app && npm test -- --run
```

### Step 8: Commit với workflow automation
```bash
npm run feature "add vocabulary to lesson [số bài]: [danh sách từ ngắn gọn]"
```

## 📋 Examples

### Example 1: User cung cấp đầy đủ
```
User: Bài 7 cần thêm:
- パソコン (pasokon) - máy vi tính cá nhân - main
- 携帯電話 (keitai denwa) - điện thoại di động - main
```

**Actions**:
1. Read lesson-07.ts
2. Format vocabulary items với example sentences
3. Insert vào vị trí phù hợp trong `vocabulary` array
4. Run tests
5. Commit: `npm run feature "add vocabulary to lesson 7: pasokon, keitai denwa"`

### Example 2: User chỉ cung cấp nghĩa tiếng Việt
```
User: Bài 7 cần thêm:
1. máy vi tính cá nhân
2. điện thoại di động
3. thư điện tử, email
4. thiệp mừng năm mới
```

**Actions**:
1. Read lesson-07.ts
2. **Web search** từng từ để tìm:
   - "máy vi tính cá nhân tiếng Nhật" → パソコン (pasokon)
   - "điện thoại di động Nhật Việt" → 携帯電話 (keitai denwa)
   - "email tiếng Nhật" → メール (meeru) hoặc Eメール (ii meeru)
   - "thiệp mừng năm mới tiếng Nhật" → 年賀状 (nengajou)
3. Tìm example sentences từ mazii.net hoặc jisho.org
4. Format vocabulary items
5. Insert vào lesson-07.ts
6. Run tests
7. Commit with proper description

### Example 3: Bổ sung kaiwa vocabulary
```
User: Bài 3 thiếu các câu kaiwa: "xin chào quý khách", "cho tôi xem", "thế thì", "vậy thì"
```

**Actions**:
1. Read lesson-03.ts
2. Web search các câu/cụm từ kaiwa:
   - "いらっしゃいませ" (irasshaimase) - xin chào quý khách
   - "見せてください" (misete kudasai) - cho tôi xem
   - "それでは" (sore dewa) - thế thì/vậy thì
3. Format với `type: "kaiwa"`
4. Insert vào section kaiwa (sau main vocabulary)
5. Run tests
6. Commit

## ⚠️ Important Notes

1. **Always Web Search**: Nếu không chắc chắn về cách viết tiếng Nhật, phải search
2. **Verify with trusted sources**: Ưu tiên mazii.net, jisho.org
3. **Keep format consistent**: Giống với vocabulary items hiện có
4. **Add example sentences**: Mọi vocabulary item phải có example
5. **Test before commit**: Luôn chạy tests để đảm bảo TypeScript compile
6. **Use automation workflow**: Dùng `npm run feature` để commit

## 🔍 Search Tips

### Pattern hiệu quả:
```
"[từ tiếng Việt] tiếng Nhật"
"[từ tiếng Việt] Japanese"
"[từ tiếng Việt] mazii"
"Minna no Nihongo lesson [số] vocabulary"
"[từ tiếng Việt] 意味 日本語"
```

### Verify accuracy:
- Check multiple sources (ít nhất 2 sources)
- Verify reading (kana) matches kanji
- Ensure example sentence is appropriate for lesson level

## 📊 Statistics Tracking
After each addition, document:
- Lesson number
- Number of vocabulary items added
- Types (main/kaiwa/reference count)
- Sources used

## 🚀 Quick Command
```bash
# Template command to execute
npm run feature "add vocab to lesson [X]: [list of words]"
```

---

**Version**: 1.0
**Last Updated**: 2026-03-19
**Total Usage**: 0 times
