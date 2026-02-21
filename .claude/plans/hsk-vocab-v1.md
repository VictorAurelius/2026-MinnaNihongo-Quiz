# Plan: HSK 5 Vocabulary Section
**Version:** v1 (revised 2026-02-21)
**Created:** 2026-02-21
**Status:** 🟡 In Progress — Phase 2 (course selector UI) being implemented
**Scope:** Xây dựng section học từ vựng **HSK 5** (Tiếng Trung) — song song với Minna (JLPT)

---

## Changelog
| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-21 | Initial plan (HSK 1–6) |
| v1 revised | 2026-02-21 | Scope down to HSK5 only; use data-pdf/hsk5/; update dependency status |

---

## 🎯 Mục tiêu

Thêm section học từ vựng **HSK 5** (Hán ngữ Thủy bình Khảo thí — bậc C1).
App hỗ trợ song song 2 ngôn ngữ: **Tiếng Nhật (JLPT/Minna)** và **Tiếng Trung (HSK 5)**.

**Không merge vào codebase Minna** — xây như section riêng, chia sẻ core engine (quiz, navigation, storage).

---

## 📐 Phạm vi

| Level | Mô tả | Số từ |
|-------|-------|-------|
| **HSK 5** | Cao cấp I — C1 | 2500 từ tích lũy (HSK1→5) |

**Nguồn dữ liệu:**
- `data-pdf/hsk5/tu-vung-hsk-5-1-20.pdf` — từ #1–~950 (20 trang ảnh scan)
- `data-pdf/hsk5/tu-vung-hsk-5-21-40.pdf` — từ ~950–2500 (20 trang ảnh scan)
- Format trong PDF: số thứ tự + pinyin (trên) + chữ Hán (dưới), sắp xếp theo pinyin
- **Không có nghĩa tiếng Việt trong PDF** — cần bổ sung thủ công hoặc từ nguồn khác
- **Không thể extract text tự động** (PDF là ảnh scan) — nhập liệu thủ công theo batch

---

## 🗺️ Kiến trúc

### Cấu trúc file

```
src/js/data/hsk/
├── hsk5-a.js     # Từ #1–500 (chữ A–G)
├── hsk5-b.js     # Từ #501–1000 (chữ G–M)
├── hsk5-c.js     # Từ #1001–1500 (chữ M–S)
├── hsk5-d.js     # Từ #1501–2000 (chữ S–X)
├── hsk5-e.js     # Từ #2001–2500 (chữ X–Z)
└── index.js      # const HSK5_DATA = [...all]; export
```

*(Chia theo pinyin alphabetical group — phù hợp với cấu trúc PDF)*

### Course Selector UI (home screen)

```
┌──────────────────────────────────────────────────┐
│   [ 🇯🇵  JLPT  Tiếng Nhật ]  [ 🇨🇳  HSK  Tiếng Trung ]  │
└──────────────────────────────────────────────────┘
         ↓ chọn tab
 JLPT: Lesson grid Minna 1–25 + Alphabet + Counters
  HSK: HSK5 Group list (A–G, G–M, M–S, S–X, X–Z)
```

- Tab state lưu vào `localStorage` (`quiz_active_course`)
- Header title đổi theo tab: "Minna no Nihongo 1" / "HSK 5"

---

## 📦 Data Schema

### HSK Vocabulary Item
```javascript
{
  chinese: "安静",       // Chữ Hán (bắt buộc)
  pinyin: "ānjìng",     // Pinyin với dấu thanh (bắt buộc)
  vietnamese: "yên tĩnh",  // Nghĩa tiếng Việt (bắt buộc)
  english: "quiet",     // Nghĩa tiếng Anh (optional)
}
```

*(Đơn giản hóa so với schema v1 gốc — bỏ tones[], type, example, examplePinyin)*

### HSK5 Data Structure
```javascript
// src/js/data/hsk/hsk5-a.js
const HSK5_A = [
  { chinese: "阿姨", pinyin: "āyí",   vietnamese: "dì/cô",     english: "aunt" },
  { chinese: "啊",   pinyin: "a",     vietnamese: "à/ạ (thán từ)", english: "ah/oh" },
  // ...
];
```

```javascript
// src/js/data/hsk/index.js
const HSK5_DATA = {
  groups: [
    { id: "a", title: "A – G", words: HSK5_A },
    { id: "b", title: "G – M", words: HSK5_B },
    { id: "c", title: "M – S", words: HSK5_C },
    { id: "d", title: "S – X", words: HSK5_D },
    { id: "e", title: "X – Z", words: HSK5_E },
  ]
};
```

---

## 🎮 Quiz Modes cho HSK 5

### Tái dùng engine hiện tại
| Mode | Hiển thị |
|------|---------|
| Flashcard | Front: Chữ Hán, Back: Pinyin + Nghĩa VN |
| MC CN → VN | Câu hỏi: Chữ Hán, Đáp án: 4 nghĩa tiếng Việt |
| MC VN → CN | Câu hỏi: Tiếng Việt, Đáp án: 4 chữ Hán |

### Mode mới (Phase 3+)
| Mode | Mô tả |
|------|-------|
| Gõ Pinyin | Hiện chữ Hán → gõ pinyin (dấu hoặc số: nǐ / ni3) |

---

## 🔧 Thay đổi code cần thiết

### 1. `src/js/core/state.js`
```javascript
window.QuizApp.state.activeCourse = 'jlpt'; // 'jlpt' | 'hsk'
```

### 2. `src/js/screens/lessons.js`
- Thêm tab click handlers (JLPT / HSK)
- `renderLessonGrid()` dispatch theo `activeCourse`
- Khi HSK: render HSK group cards thay Minna lesson cards

### 3. `src/js/core/navigation.js`
- `goBack()` và home button: cập nhật header title theo `activeCourse`

### 4. `src/index.html`
- Thêm `.course-tabs` trong `#screen-lessons`
- Thêm `#screen-hsk-menu` (lesson menu cho HSK topic)

### 5. `src/css/style.css`
- `.course-tabs`, `.course-tab`, `.course-tab.active`

### 6. Quiz adaptation (Phase 3)
- `flashcard.js`, `mc.js`: detect `activeCourse === 'hsk'` → dùng `item.chinese` thay `item.japanese`
- `session.js`: route `hsk-fc`, `hsk-mc-cn-vi`, `hsk-mc-vi-cn`

---

## 📋 Phases

### ✅ Phase 0: Prerequisite (đã xong)
- [x] minna-refactor-v1 Phase 1 & 2 hoàn thành
- [x] minna-extras-v1 (alphabet + counters) xong
- [x] Repo structure: source files trong `src/`

### ✅ Phase 1: UI — Course Selector
- [x] Thêm `.course-tabs` vào `screen-lessons`
- [x] Tab JLPT / HSK với localStorage persistence
- [x] Header title đổi theo tab
- [x] HSK tab: placeholder "coming soon" (data chưa có)
- [x] JLPT tab: giữ nguyên behavior hiện tại

### 🔴 Phase 2: Data Entry (HSK5)
- [ ] Nhập liệu batch đầu: 200 từ đầu (A–C) từ PDF scan
- [ ] Tạo `src/js/data/hsk/hsk5-a.js`
- [ ] Tạo `src/js/data/hsk/index.js`
- [ ] Kiểm tra render HSK group grid với data thật
- [ ] Tiếp tục nhập các batch còn lại

### 🔴 Phase 3: Quiz Adaptation
- [ ] Thêm `normalizePinyin()` vào utils.js
- [ ] Flashcard HSK: `item.chinese` front, `item.pinyin + item.vietnamese` back
- [ ] MC modes cho HSK
- [ ] Session routing cho HSK modes

### 🔴 Phase 4: Polish
- [ ] Progress tracking riêng cho HSK
- [ ] Vocabulary list screen cho HSK (Chữ Hán | Pinyin | Nghĩa VN)
- [ ] TTS Tiếng Trung (Web Speech API, lang: zh-CN)

---

## ⚠️ Rủi ro & Giải pháp

| Rủi ro | Giải pháp |
|--------|-----------|
| PDF là ảnh scan, không extract được text | Nhập liệu thủ công theo batch hoặc dùng OCR tool riêng |
| Nghĩa tiếng Việt không có trong PDF | Tham khảo từ điển Hán-Việt, HSK vocab lists online |
| Pinyin validation | Support cả dạng dấu (nǐ) và dạng số (ni3) trong typing mode |
| Chinese font trên mobile | Test `font-family` Chinese fonts |
| Quiz logic mixed (Nhật/Trung) | Kiểm tra `activeCourse` ở mỗi render function |

---

## 📝 Nguồn dữ liệu HSK

- **Primary:** `data-pdf/hsk5/` (scanned official HSK5 wordlist)
- **Vietnamese meanings:** Từ điển Hán-Việt, VDICT, hoặc reference từ HSK vocab apps
- **Pinyin verify:** Pleco dictionary, MDBG (mdbg.net)

---

## 🔗 Dependencies

- **Unblocked:** `minna-refactor-v1` (Phase 1+2) ✅ đã xong
- **Không conflict với:** Minna features (tất cả giữ nguyên)
