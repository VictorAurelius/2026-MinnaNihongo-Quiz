# Skill: refactor

Tái cấu trúc codebase theo module pattern.

## Cách dùng
```
/refactor <target>
```

Targets: `js-modules`, `data-split`, `css-modules`, `all`

**Ví dụ:**
- `/refactor js-modules` — Tách app.js thành modules
- `/refactor data-split` — Tách data.js thành files nhỏ hơn
- `/refactor all` — Thực hiện toàn bộ refactor

---

## Hướng dẫn thực hiện

### Target: `js-modules`

Tách `js/app.js` (914 dòng) thành:

```
js/
├── core/
│   ├── utils.js          # shuffle, normalizeKana, normalizeRomaji, kanaToRomaji
│   ├── storage.js        # loadProgress, saveProgress, getLessonBestPercent
│   ├── navigation.js     # showScreen, goBack, updateBackButton, history stack
│   └── state.js          # currentLesson, currentMode, questions, score, etc.
├── screens/
│   ├── lessons.js        # renderLessonGrid, openLessonMenu
│   ├── vocab-list.js     # openVocabList
│   ├── grammar-list.js   # openGrammarList
│   └── results.js        # showResults, retry buttons
├── quiz/
│   ├── flashcard.js      # renderFlashcard, advanceFlashcard, fc-* event handlers
│   ├── mc.js             # renderMC, handleMCAnswer, mc-* event handlers
│   └── typing.js         # renderTyping, handleTypingSubmit, tp-* event handlers
├── ui/
│   ├── feedback.js       # showFeedback, updateProgress
│   └── darkmode.js       # initDarkMode, toggleDarkIcons
└── app.js                # Entry point — import all, init, startSession
```

**Quy tắc:**
- Không dùng ES modules (import/export) vì app dùng `<script>` tags
- Dùng global namespace: `window.QuizApp = window.QuizApp || {}`
- Mỗi module expose functions cần thiết lên namespace
- Load order trong index.html: utils → state → storage → navigation → ui → screens → quiz → app

### Target: `data-split`

Tách `js/data.js` (8462 dòng) thành:

```
js/data/
├── minna/
│   ├── lesson-01.js      # ~30-50 từ + grammar
│   ├── lesson-02.js
│   ├── ...
│   ├── lesson-25.js
│   └── index.js          # const MINNA_DATA = [...all lessons]
├── hsk/
│   ├── hsk1.js
│   ├── ...
│   └── index.js          # const HSK_DATA = {...levels}
└── index.js              # const ALL_COURSES = { minna: MINNA_DATA, hsk: HSK_DATA }
```

**Bước thực hiện:**
1. Đọc data.js, xác định ranh giới từng bài (comment `// LESSON N`)
2. Extract từng bài thành file riêng
3. Tạo index files
4. Update index.html script tags
5. Verify app vẫn hoạt động

### Target: `css-modules`

Tách `css/style.css` (878 dòng) thành:

```
css/
├── base/
│   ├── reset.css         # CSS reset, base styles
│   ├── variables.css     # CSS custom properties (colors, fonts, spacing)
│   └── typography.css    # Font sizes, headings
├── components/
│   ├── header.css        # App header
│   ├── buttons.css       # All button variants
│   ├── cards.css         # Lesson cards, grammar cards
│   ├── flashcard.css     # Flashcard flip animation
│   ├── mc.css            # Multiple choice options
│   ├── typing.css        # Typing input
│   ├── progress.css      # Progress bars, score ring
│   └── feedback.css      # Correct/wrong feedback
├── screens/
│   ├── lessons.css       # Lesson grid
│   ├── menu.css          # Lesson menu
│   └── results.css       # Results screen
└── style.css             # Main file: @import all modules
```

**Note:** Hoặc giữ nguyên style.css vì HTML chỉ load 1 file CSS — chỉ tách nếu thực sự cần.

### Verify sau refactor

Luôn test các tính năng sau khi refactor:
- [ ] Lesson grid load đúng
- [ ] Chọn bài → menu hiển thị
- [ ] Flashcard hoạt động (lật, biết/chưa biết)
- [ ] Multiple choice hoạt động (4 đáp án, highlight đúng/sai)
- [ ] Typing quiz hoạt động (kana + romaji mode)
- [ ] Grammar list hiển thị
- [ ] Results screen + retry
- [ ] Dark mode toggle
- [ ] Progress lưu localStorage
- [ ] Navigation (back, home buttons)
