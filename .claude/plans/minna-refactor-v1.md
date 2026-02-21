# Plan: Minna no Nihongo — Code Refactor
**Version:** v1
**Created:** 2026-02-21
**Status:** 🟡 In Progress
**Scope:** Tái cấu trúc codebase hiện tại (không thêm tính năng mới)

---

## Changelog
| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-21 | Initial plan |

---

## 🎯 Mục tiêu

Tách monolith `app.js` (914 dòng) và `data.js` (8,462 dòng) thành các module nhỏ, dễ maintain. **Không thay đổi tính năng hoặc UI.**

---

## 📊 Trạng thái file hiện tại

| File | Dòng | Vấn đề |
|------|------|--------|
| `js/app.js` | 914 | Monolith — utils + nav + quiz + UI trộn lẫn |
| `js/data.js` | 8,462 | Quá lớn — 25 bài học trong 1 file |
| `css/style.css` | 878 | Chấp nhận được, giữ nguyên |
| `index.html` | 272 | OK — cần update script tags sau refactor |

---

## 🗺️ Kiến trúc mục tiêu

```
js/
├── core/
│   ├── utils.js          # shuffle, normalizeKana, normalizeRomaji, kanaToRomaji
│   ├── state.js          # App state variables (currentLesson, currentMode, ...)
│   ├── storage.js        # loadProgress, saveProgress, getLessonBestPercent
│   └── navigation.js     # showScreen, goBack, updateBackButton, history stack
├── ui/
│   ├── darkmode.js       # initDarkMode, toggleDarkIcons
│   └── feedback.js       # showFeedback, updateProgress
├── screens/
│   ├── lessons.js        # renderLessonGrid, openLessonMenu
│   ├── vocab-list.js     # openVocabList
│   ├── grammar-list.js   # openGrammarList
│   └── results.js        # showResults, retry/home buttons
├── quiz/
│   ├── session.js        # startSession, routing to quiz modes
│   ├── flashcard.js      # renderFlashcard, advanceFlashcard, event handlers
│   ├── mc.js             # renderMC, handleMCAnswer, event handlers
│   └── typing.js         # renderTyping, handleTypingSubmit, event handlers
├── data/
│   ├── minna/
│   │   ├── lesson-01.js  # ~300-400 dòng mỗi file
│   │   ├── lesson-02.js
│   │   ├── ...
│   │   ├── lesson-25.js
│   │   └── index.js      # const MINNA_DATA = [LESSON_01, ..., LESSON_25]
│   └── index.js          # const VOCABULARY_DATA = MINNA_DATA (tương thích ngược)
└── app.js                # Entry point: init darkmode, renderLessonGrid, keyboard shortcuts
```

---

## 📋 Phases

### ✅ Phase 0: Chuẩn bị
- [x] Đọc hiểu codebase
- [x] Tạo skills trong `.claude/skills/`
- [x] Tạo plan này
- [x] Lưu memory

### Phase 1: Tách data.js → per-lesson files
**Goal:** Mỗi bài học = 1 file riêng, dễ chỉnh sửa và tìm kiếm

**Files tạo mới:**
- `js/data/minna/lesson-01.js` đến `lesson-25.js`
- `js/data/minna/index.js`
- `js/data/index.js`

**Cách thực hiện:**
1. Backup: `cp js/data.js js/data.js.bak`
2. Với mỗi lesson N trong data.js:
   - Extract toàn bộ object `{ lessonNumber: N, ... }`
   - Tạo `js/data/minna/lesson-NN.js` với nội dung:
     ```javascript
     // Lesson NN — <title>
     const LESSON_NN_DATA = { lessonNumber: N, title: "...", vocabulary: [...], grammar: [...] };
     ```
3. Tạo `js/data/minna/index.js`:
   ```javascript
   // Minna no Nihongo — All Lessons
   const MINNA_DATA = [LESSON_01_DATA, LESSON_02_DATA, ..., LESSON_25_DATA];
   ```
4. Tạo `js/data/index.js`:
   ```javascript
   // Tương thích ngược với app.js hiện tại
   const VOCABULARY_DATA = MINNA_DATA;
   ```
5. Update `index.html`: thay `<script src="js/data.js">` bằng 27 script tags mới
6. Test: lesson grid load đúng 25 bài, quiz hoạt động
7. Xóa `js/data.js` (giữ .bak tạm thời)

**Checklist sau Phase 1:**
- [ ] 25 lesson files tạo xong
- [ ] index.js đúng
- [ ] Lesson grid hiển thị đủ 25 bài
- [ ] Quiz từng bài hoạt động
- [ ] Progress/localStorage OK

---

### Phase 2: Tách app.js → modules
**Goal:** Mỗi concern = 1 file, load theo thứ tự dependency

**Thứ tự tạo (theo dependency, không có circular):**

| # | File | Extract từ app.js | Depends on |
|---|------|-------------------|------------|
| 1 | `js/core/utils.js` | `shuffle`, `normalizeKana`, `normalizeRomaji`, `kanaToRomaji` | — |
| 2 | `js/core/state.js` | Tất cả `let` variables (currentLesson, currentMode, ...) | — |
| 3 | `js/core/storage.js` | `STORAGE_KEY`, `loadProgress`, `saveProgress`, `getLessonBestPercent` | state |
| 4 | `js/core/navigation.js` | `screens{}`, `showScreen`, `goBack`, `updateBackButton`, `clearNavigationHistory`, btn-home/btn-back listeners | state |
| 5 | `js/ui/darkmode.js` | `initDarkMode`, `toggleDarkIcons`, btn-dark-mode listener | — |
| 6 | `js/ui/feedback.js` | `showFeedback`, `updateProgress` | — |
| 7 | `js/screens/vocab-list.js` | `openVocabList` | state, utils |
| 8 | `js/screens/grammar-list.js` | `openGrammarList` | state |
| 9 | `js/quiz/flashcard.js` | `renderFlashcard`, `advanceFlashcard`, `fcKnownCount`, fc-* listeners | state, navigation, feedback, utils |
| 10 | `js/quiz/mc.js` | `renderMC`, `handleMCAnswer`, mc-next listener | state, navigation, feedback, utils |
| 11 | `js/quiz/typing.js` | `renderTyping`, `handleTypingSubmit`, tp-* listeners | state, navigation, feedback, utils |
| 12 | `js/quiz/session.js` | `startSession` | state, flashcard, mc, typing |
| 13 | `js/screens/lessons.js` | `renderLessonGrid`, `openLessonMenu`, menu-button listeners | state, storage, session |
| 14 | `js/screens/results.js` | `showResults`, btn-retry-wrong/btn-retry-all/btn-results-home | state, storage, session, navigation |
| 15 | `js/app.js` (slim) | `initDarkMode()`, `renderLessonGrid()`, keyboard shortcuts, keyboard shortcut listener | tất cả |

**Pattern namespace (không dùng ES modules):**
```javascript
// Mỗi module expose vào window.QuizApp
window.QuizApp = window.QuizApp || {};

// utils.js
window.QuizApp.utils = (function() {
  function shuffle(arr) { ... }
  function kanaToRomaji(kana) { ... }
  // ...
  return { shuffle, normalizeKana, normalizeRomaji, kanaToRomaji };
})();

// state.js — mutable shared state
window.QuizApp.state = {
  currentLesson: null,
  currentMode: null,
  questions: [],
  questionIndex: 0,
  score: 0,
  wrongItems: [],
  isRetryMode: false,
  fcKnownCount: 0,
  navigationHistory: [],
};
```

**Script load order trong index.html:**
```html
<script src="js/core/utils.js"></script>
<script src="js/core/state.js"></script>
<script src="js/core/storage.js"></script>
<script src="js/core/navigation.js"></script>
<script src="js/ui/darkmode.js"></script>
<script src="js/ui/feedback.js"></script>
<script src="js/screens/vocab-list.js"></script>
<script src="js/screens/grammar-list.js"></script>
<script src="js/quiz/flashcard.js"></script>
<script src="js/quiz/mc.js"></script>
<script src="js/quiz/typing.js"></script>
<script src="js/quiz/session.js"></script>
<script src="js/screens/lessons.js"></script>
<script src="js/screens/results.js"></script>
<script src="js/app.js"></script>
```

**Checklist sau Phase 2:**
- [ ] 15 module files tạo xong
- [ ] Không còn logic trong app.js gốc (chỉ còn init + keyboard shortcuts)
- [ ] Mọi quiz mode hoạt động
- [ ] Dark mode hoạt động
- [ ] Navigation (back/home) hoạt động
- [ ] Grammar list hoạt động
- [ ] Results + retry hoạt động

---

## 🔧 Conventions

- **File naming:** `kebab-case.js`
- **Variables:** `camelCase`
- **Constants:** `UPPER_SNAKE_CASE`
- **Functions:** `camelCase` (prefix: `render`, `handle`, `show`, `open`, `update`)
- **Namespace:** `window.QuizApp.<module>` cho tất cả exports
- **Không dùng** ES modules / import-export (static HTML, no bundler)

---

## ⚠️ Rủi ro & Giải pháp

| Rủi ro | Giải pháp |
|--------|-----------|
| Break app khi refactor | Làm 1 module, test ngay, commit nhỏ từng bước |
| Mất data khi tách data.js | Backup `.bak` trước, verify tổng từ vựng sau khi tách |
| Circular dependency | Tách state ra file riêng, không để module nào import lẫn nhau |
| index.html nhiều script tags | Chấp nhận (27 + 15 = ~42 tags), có thể dùng bundle sau nếu cần |

---

## 📝 Notes kỹ thuật

- Giữ nguyên logic hoàn toàn — chỉ tổ chức lại
- Không thêm framework/library
- Không thêm build step
- localStorage key `minna_vocab_progress` giữ nguyên (tương thích với user hiện tại)
