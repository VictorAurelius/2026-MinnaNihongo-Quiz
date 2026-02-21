# Skill: refactor-phase2

Thực hiện Phase 2 của minna-refactor-v1: tách `js/app.js` thành 15 module files.

## Cách dùng
```
/refactor-phase2 [step]
```
- `/refactor-phase2` — Kiểm tra checklist, thực hiện step tiếp theo chưa làm
- `/refactor-phase2 1` — Thực hiện step 1 (state.js)
- `/refactor-phase2 6` — Thực hiện step 6 (utils.js — UNICODE SAFE mode)

---

## ⚠️ Quy tắc bắt buộc — tránh content filtering

**Nguyên nhân lỗi `Output blocked by content filtering policy (400)`:**
- Model cố generate khối lớn Unicode Japanese characters (hiraganaMap, katakanaMap trong `kanaToRomaji`).

**Phải tuân thủ:**
1. **Viết đúng 1 file mỗi turn** — không viết 2+ files trong 1 response.
2. **Step 6 (`utils.js`) đặc biệt:** Dùng Bash để extract `kanaToRomaji` từ app.js hiện có. KHÔNG tự generate lại nội dung hàm.
3. Sau mỗi step: báo hoàn thành, đợi lệnh tiếp theo.

---

## Thứ tự 15 steps

| Step | File | Nội dung extract từ app.js | Unicode? |
|------|------|----------------------------|----------|
| 1 | `js/core/state.js` | Tất cả `let` vars (currentLesson, questions, score...) | Không |
| 2 | `js/ui/feedback.js` | `showFeedback`, `updateProgress` | Không |
| 3 | `js/core/storage.js` | `STORAGE_KEY`, `loadProgress`, `saveProgress`, `getLessonBestPercent` | Không |
| 4 | `js/core/navigation.js` | `showScreen`, `goBack`, `updateBackButton`, `clearNavigationHistory`, btn-home/btn-back listeners | Không |
| 5 | `js/ui/darkmode.js` | `initDarkMode`, `toggleDarkIcons`, btn-dark-mode listener | Không |
| 6 | `js/core/utils.js` | `shuffle`, `normalizeKana`, `normalizeRomaji`, `kanaToRomaji` | **⚠️ YES — dùng Bash** |
| 7 | `js/screens/vocab-list.js` | `openVocabList` | Không |
| 8 | `js/screens/grammar-list.js` | `openGrammarList` | Không |
| 9 | `js/quiz/flashcard.js` | `renderFlashcard`, `advanceFlashcard`, `fcKnownCount`, fc-* listeners | Không |
| 10 | `js/quiz/mc.js` | `renderMC`, `handleMCAnswer`, mc-next listener | Không |
| 11 | `js/quiz/typing.js` | `renderTyping`, `handleTypingSubmit`, tp-* listeners | Không |
| 12 | `js/quiz/session.js` | `startSession` | Không |
| 13 | `js/screens/lessons.js` | `renderLessonGrid`, `openLessonMenu`, menu-button listeners | Không |
| 14 | `js/screens/results.js` | `showResults`, btn-retry-wrong/btn-retry-all/btn-results-home | Không |
| 15 | `js/app.js` (slim) | Chỉ giữ: `initDarkMode()`, `renderLessonGrid()`, keyboard shortcuts listener | Không |

---

## Module template (dùng cho steps 1–5, 7–15)

```javascript
window.QuizApp = window.QuizApp || {};

window.QuizApp.<namespace> = (function() {
  "use strict";

  // ... functions extracted from app.js ...

  // Expose public API
  return { fn1, fn2 };
})();
```

**Namespace mapping:**
- state.js → `window.QuizApp.state` (object trực tiếp, không IIFE)
- storage.js → `window.QuizApp.storage`
- navigation.js → `window.QuizApp.nav`
- utils.js → `window.QuizApp.utils`
- feedback.js → `window.QuizApp.ui`
- darkmode.js → `window.QuizApp.darkmode`
- lessons.js / vocab-list.js / grammar-list.js / results.js → `window.QuizApp.screens`
- flashcard.js / mc.js / typing.js / session.js → `window.QuizApp.quiz`

---

## Step 6 đặc biệt: `js/core/utils.js` (UNICODE SAFE)

`kanaToRomaji` chứa 60+ ký tự Japanese → KHÔNG dùng Write tool để tạo toàn bộ file.

**Cách làm an toàn — 2 bước:**

**Bước 6a:** Dùng Write tool để tạo file shell (KHÔNG có Unicode):
```javascript
// js/core/utils.js
window.QuizApp = window.QuizApp || {};

window.QuizApp.utils = (function() {
  "use strict";

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function normalizeKana(str) {
    return str.replace(/\s/g, "").normalize("NFKC").toLowerCase();
  }

  function normalizeRomaji(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '')
      .replace(/shi/g, 'si')
      .replace(/chi/g, 'ti')
      .replace(/tsu/g, 'tu')
      .replace(/fu/g, 'hu')
      .replace(/ji/g, 'zi')
      .replace(/\u014d/g, 'ou')
      .replace(/\u016b/g, 'uu')
      .replace(/\u0113/g, 'ei')
      .replace(/\u0101/g, 'aa')
      .replace(/n(?=[^aiueoyn]|$)/g, 'n');
  }

  // kanaToRomaji: injected by Bash in step 6b — do not write here
  function kanaToRomaji(kana) { return kana || ""; }

  return { shuffle, normalizeKana, normalizeRomaji, kanaToRomaji };
})();
```

**Bước 6b:** Dùng Bash để extract `kanaToRomaji` từ app.js và replace placeholder:
```bash
# Lấy line range của kanaToRomaji trong app.js (dòng 214-303)
# Dùng python để extract và inject vào utils.js
python3 << 'PYEOF'
with open('js/app.js', 'r') as f:
    lines = f.readlines()

# Tìm function kanaToRomaji
start = next(i for i, l in enumerate(lines) if 'function kanaToRomaji' in l)
# Tìm end: dòng '  }' đầu tiên sau start ở indent level 2
depth = 0
end = start
for i in range(start, len(lines)):
    depth += lines[i].count('{') - lines[i].count('}')
    if i > start and depth == 0:
        end = i
        break

fn_body = ''.join(lines[start:end+1])

with open('js/core/utils.js', 'r') as f:
    content = f.read()

# Replace placeholder
placeholder = '  function kanaToRomaji(kana) { return kana || ""; }'
content = content.replace(placeholder, fn_body.rstrip())

with open('js/core/utils.js', 'w') as f:
    f.write(content)

print("kanaToRomaji injected OK")
PYEOF
```

**Verify sau step 6:**
```bash
grep -c "hiraganaMap\|katakanaMap" js/core/utils.js  # phải = 2
node -e "eval(require('fs').readFileSync('js/core/utils.js','utf8')); console.log(window.QuizApp.utils.kanaToRomaji('あ'))"
```

---

## Sau tất cả 15 steps: Update index.html

Thay tất cả `<script src="js/...">` (trừ data files) bằng:
```html
<!-- Core -->
<script src="js/core/utils.js"></script>
<script src="js/core/state.js"></script>
<script src="js/core/storage.js"></script>
<script src="js/core/navigation.js"></script>
<!-- UI -->
<script src="js/ui/darkmode.js"></script>
<script src="js/ui/feedback.js"></script>
<!-- Screens -->
<script src="js/screens/vocab-list.js"></script>
<script src="js/screens/grammar-list.js"></script>
<!-- Quiz -->
<script src="js/quiz/flashcard.js"></script>
<script src="js/quiz/mc.js"></script>
<script src="js/quiz/typing.js"></script>
<script src="js/quiz/session.js"></script>
<!-- Screens (depend on quiz/session) -->
<script src="js/screens/lessons.js"></script>
<script src="js/screens/results.js"></script>
<!-- Entry point -->
<script src="js/app.js"></script>
```

---

## Checklist Phase 2

- [ ] Step 1: state.js
- [ ] Step 2: feedback.js
- [ ] Step 3: storage.js
- [ ] Step 4: navigation.js
- [ ] Step 5: darkmode.js
- [ ] Step 6: utils.js (Bash extraction)
- [ ] Step 7: vocab-list.js
- [ ] Step 8: grammar-list.js
- [ ] Step 9: flashcard.js
- [ ] Step 10: mc.js
- [ ] Step 11: typing.js
- [ ] Step 12: session.js
- [ ] Step 13: lessons.js
- [ ] Step 14: results.js
- [ ] Step 15: app.js (slim)
- [ ] index.html updated với 15 script tags mới
- [ ] Verify: lesson grid, quiz, dark mode, navigation

---

## Khi gặp content filtering trong quá trình thực hiện

Nếu thấy lỗi `Output blocked by content filtering policy`:
1. **Dừng ngay** — không retry
2. Kiểm tra file nào đang viết có chứa Unicode Japanese không
3. Nếu có → chuyển sang Bash extraction (như step 6)
4. Nếu không → chia nhỏ file ra, viết từng phần
