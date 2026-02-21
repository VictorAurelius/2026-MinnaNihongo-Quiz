# Plan: HSK Vocabulary — New Section
**Version:** v1
**Created:** 2026-02-21
**Status:** 🔴 Not Started (blocked by minna-refactor-v1)
**Scope:** Xây dựng section học từ vựng HSK Tiếng Trung — hoàn toàn mới, song song với Minna

---

## Changelog
| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-21 | Initial plan |

---

## 🎯 Mục tiêu

Thêm section học từ vựng **HSK (Hanyu Shuiping Kaoshi)** — chuẩn kiểm tra tiếng Trung quốc tế.
App sẽ hỗ trợ song song **2 ngôn ngữ**: Tiếng Nhật (Minna) và Tiếng Trung (HSK).

**Không merge vào codebase Minna** — xây như section riêng, chia sẻ core engine (quiz, navigation, storage).

---

## 📐 Phạm vi HSK

| Level | Tên | Số từ | Tương đương |
|-------|-----|-------|-------------|
| HSK 1 | Sơ cấp I | 150 từ | A1 |
| HSK 2 | Sơ cấp II | 150 từ (tổng 300) | A2 |
| HSK 3 | Trung cấp I | 300 từ (tổng 600) | B1 |
| HSK 4 | Trung cấp II | 600 từ (tổng 1200) | B2 |
| HSK 5 | Cao cấp I | 1300 từ (tổng 2500) | C1 |
| HSK 6 | Cao cấp II | 2500 từ (tổng 5000) | C2 |

**Giai đoạn 1:** HSK 1 + HSK 2 trước (300 từ, đủ để test toàn bộ flow)

---

## 🗺️ Kiến trúc

### Cấu trúc file mới

```
js/
└── data/
    └── hsk/
        ├── hsk1.js           # 150 từ HSK 1, chia theo chủ đề
        ├── hsk2.js           # 150 từ HSK 2
        ├── hsk3.js           # (phase sau)
        ├── hsk4.js           # (phase sau)
        ├── hsk5.js           # (phase sau)
        ├── hsk6.js           # (phase sau)
        └── index.js          # const HSK_DATA = { 1: HSK1_DATA, ... }
```

### Course selector UI

Thêm vào home screen (`index.html` + `screens/lessons.js`):

```
┌─────────────────────────────────────────────┐
│  [🇯🇵 Tiếng Nhật]  [🇨🇳 Tiếng Trung]         │
└─────────────────────────────────────────────┘
     ↓ active tab
  Lesson grid (Minna 1-25)  /  HSK Level grid (1-6)
```

- Tab state lưu vào `localStorage` (`quiz_active_course`)
- Khi chọn tab HSK → hiển thị HSK Level cards (không phải lesson cards)
- Khi chọn tab Nhật → giữ nguyên behavior hiện tại

---

## 📦 Data Schema

### HSK Vocabulary Item
```javascript
{
  chinese: "你好",         // Chữ Hán (bắt buộc)
  pinyin: "nǐ hǎo",       // Pinyin với dấu thanh (bắt buộc)
  tones: [3, 3],           // Tone numbers array (optional, tiện cho quiz)
  vietnamese: "xin chào", // Nghĩa tiếng Việt (bắt buộc)
  english: "hello",        // Nghĩa tiếng Anh (optional)
  type: "greeting",        // Loại từ: noun/verb/adj/adv/greeting/... (optional)
  example: "你好！我叫小明。",          // Câu ví dụ tiếng Trung
  examplePinyin: "Nǐ hǎo! Wǒ jiào Xiǎo Míng.", // Pinyin của ví dụ
  exampleVi: "Xin chào! Tôi tên là Tiểu Minh."  // Dịch ví dụ
}
```

### HSK Level Data Structure
```javascript
// js/data/hsk/hsk1.js
const HSK1_DATA = {
  level: 1,
  title: "HSK 1 — Sơ cấp I",
  totalWords: 150,
  topics: [
    {
      topicId: 1,
      title: "Chào hỏi & Giao tiếp cơ bản",
      vocabulary: [
        {
          chinese: "你好", pinyin: "nǐ hǎo", tones: [3,3],
          vietnamese: "xin chào", english: "hello",
          example: "你好！", examplePinyin: "Nǐ hǎo!",
          exampleVi: "Xin chào!"
        },
        // ...
      ]
    },
    {
      topicId: 2,
      title: "Số đếm & Tiền tệ",
      vocabulary: [ ... ]
    }
    // ... ~8-10 chủ đề cho HSK 1
  ]
};
```

---

## 🎮 Quiz Modes cho HSK

### Modes giữ nguyên (tái dùng engine hiện tại)
| Mode | Hiển thị |
|------|---------|
| Flashcard | Front: Chữ Hán, Back: Pinyin + Nghĩa VN + Nghĩa EN |
| MC Chinese → VN | Câu hỏi: Chữ Hán, Đáp án: 4 nghĩa tiếng Việt |
| MC VN → Chinese | Câu hỏi: Tiếng Việt, Đáp án: 4 chữ Hán |

### Modes mới cần implement
| Mode | Mô tả |
|------|-------|
| **Gõ Pinyin** | Hiện chữ Hán → gõ pinyin (validate cả dạng dấu và dạng số) |
| **Tone Quiz** | Hiện chữ Hán + pinyin không dấu → chọn thanh điệu đúng |

---

## 🔧 Thay đổi code cần thiết

### 1. Utility mới: `js/core/utils.js`
Thêm vào (không break existing):
```javascript
// Normalize pinyin: nǐ hǎo == ni3 hao3 == nihao (approximate)
QuizApp.utils.normalizePinyin = function(str) { ... }

// Convert tone numbers to marks: ni3 → nǐ
QuizApp.utils.pinyin NumberToMark = function(str) { ... }
```

### 2. Cập nhật `js/core/state.js`
Thêm:
```javascript
window.QuizApp.state.activeCourse = 'minna'; // 'minna' | 'hsk'
window.QuizApp.state.hskLevel = null;         // 1-6
```

### 3. Cập nhật `js/core/storage.js`
- Tách key localStorage: `minna_vocab_progress` (giữ nguyên) + `hsk_vocab_progress` (mới)

### 4. Cập nhật `js/screens/lessons.js`
- Thêm course tab selector HTML + logic
- Khi course = 'hsk': render HSK Level grid (6 level cards) thay vì lesson grid
- Khi click HSK Level card → mở topic list trong level đó

### 5. Cập nhật `js/quiz/flashcard.js`, `mc.js`
- Detect `activeCourse === 'hsk'` → dùng `item.chinese` thay `item.japanese`, `item.pinyin` thay `item.kana`
- Reuse cùng flashcard/mc HTML structure

### 6. HTML — thêm screen mới: HSK Topic List
```html
<section id="screen-hsk-topics" class="screen">
  <h2 id="hsk-topics-title" class="screen-heading"></h2>
  <div id="hsk-topics-grid" class="lesson-grid">
    <!-- Topic cards rendered by JS -->
  </div>
</section>
```

### 7. `index.html` — thêm script tags
```html
<script src="js/data/hsk/hsk1.js"></script>
<script src="js/data/hsk/hsk2.js"></script>
<script src="js/data/hsk/index.js"></script>
```

---

## 📋 Phases

### Phase 0: Prerequisite
- [ ] **minna-refactor-v1 Phase 1 & 2 hoàn thành** trước
  - Lý do: cần modular architecture để add HSK không break Minna

### Phase 1: Data & Core
- [ ] Tạo `js/data/hsk/hsk1.js` với 150 từ HSK 1 (theo chủ đề)
- [ ] Tạo `js/data/hsk/hsk2.js` với 150 từ HSK 2
- [ ] Tạo `js/data/hsk/index.js`
- [ ] Thêm `normalizePinyin()` vào utils
- [ ] Update state.js với `activeCourse`, `hskLevel`

### Phase 2: UI — Course Selector
- [ ] Thêm tab selector HTML vào `index.html` (hoặc render bằng JS)
- [ ] Implement tab switch logic trong `screens/lessons.js`
- [ ] HSK Level grid (6 cards)
- [ ] HSK Topic grid (khi chọn 1 level)
- [ ] Lesson menu cho HSK (các quiz modes)

### Phase 3: Quiz Adaptation
- [ ] Flashcard: hiển thị Chinese/Pinyin thay Japanese/Kana
- [ ] MC modes: dùng `chinese` field thay `japanese`
- [ ] Typing mode mới: "Gõ Pinyin"
- [ ] (Optional) Tone Quiz mode

### Phase 4: Polish
- [ ] Progress tracking riêng cho HSK
- [ ] Results screen phân biệt Minna / HSK
- [ ] Vocabulary list screen cho HSK (Chinese | Pinyin | Nghĩa VN | Nghĩa EN)

---

## ⚠️ Rủi ro & Giải pháp

| Rủi ro | Giải pháp |
|--------|-----------|
| HSK data độ chính xác | Cần verify từng từ với nguồn chuẩn (HSK official list) |
| Pinyin validation phức tạp | Support cả dạng dấu (nǐ) và dạng số (ni3) |
| Quiz logic bị mixed (Nhật/Trung) | Kiểm tra `activeCourse` ở mỗi render function |
| CSS hiển thị Hán tự | Thêm `font-family` Chinese fonts, test trên mobile |

---

## 📝 Nguồn dữ liệu HSK

- **Official:** HSK Standard Course (BLCU Press)
- **Reference:** https://www.hskhsk.com/word-lists.html
- **Verify tones:** Pleco dictionary hoặc MDBG
- **Pinyin diacritics:** Unicode combining marks (ā á ǎ à, etc.)

---

## 🔗 Dependencies

- **Blocked by:** `minna-refactor-v1` (Phase 1 + 2)
- **Không conflict với:** Minna features (tất cả giữ nguyên)
