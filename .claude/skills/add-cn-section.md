# Skill: add-cn-section

Tích hợp một section từ vựng Tiếng Trung mới vào app (HSKK, HSK level mới, v.v.).

## Cách dùng
```
/add-cn-section <tên> <mô-tả>
```

**Ví dụ:**
- `/add-cn-section hskk "HSKK Sơ cấp"`
- `/add-cn-section hsk1 "HSK 1 — 150 từ cơ bản"`

---

## Điều kiện tiên quyết

- Đã có JS data files (xem `/ocr-cn-pdf`)
- `src/js/data/<tên>/` đã chứa `<tên>-a.js` ... `index.js`

---

## Kiến trúc hiện tại (tham chiếu)

```
src/
├── js/
│   ├── core/
│   │   ├── navigation.js   ← thêm screen mới vào screens map
│   │   └── storage.js      ← thêm progress key
│   ├── screens/
│   │   ├── lessons.js      ← thêm tab hoặc section mới trong HSK grid
│   │   ├── hsk-menu.js     ← menu screen cho HSK groups (có thể reuse)
│   │   └── hsk-vocab-list.js ← vocab list (có thể reuse)
│   ├── quiz/
│   │   ├── flashcard.js    ← đã có hsk-fc dispatch
│   │   ├── mc.js           ← đã có isHSK branches
│   │   └── session.js      ← thêm routing cho modes mới nếu cần
│   └── data/
│       ├── hsk/            ← HSK5 data (reference)
│       └── <tên>/          ← NEW data folder
└── index.html
```

---

## Bước thực hiện

### 1. Thêm `<script>` tags vào `src/index.html`

Sau `js/data/hsk/index.js`:
```html
<!-- Data: <TÊN> -->
<script src="js/data/<tên>/<tên>-a.js"></script>
<!-- ... -->
<script src="js/data/<tên>/index.js"></script>
```

### 2. Cấu trúc data index

```javascript
// src/js/data/<tên>/index.js
const <TÊN>_DATA = {
  groups: [
    { id: "a", title: "A – G", words: <TÊN>_A },
    // ...
  ]
};
```

### 3. Tích hợp vào home screen

**Option A** — Thêm tab mới trên home screen (nếu là course độc lập như HSKK):

`src/index.html` — thêm tab trong `.course-tabs`:
```html
<button class="course-tab" data-course="hskk" role="tab">
  <span class="course-tab-flag">🇨🇳</span>
  <span class="course-tab-label">HSKK</span>
  <span class="course-tab-sub">Khẩu ngữ</span>
</button>
```

`src/js/screens/lessons.js` — thêm case trong render:
```javascript
if (course === "hskk") {
  renderHSKKGrid(grid); // new function, mirrors renderHSKGrid()
}
```

**Option B** — Thêm nhóm mới trong tab HSK hiện tại (nếu là bổ sung cho HSK):

Trong `renderHSKGrid()`, merge thêm groups từ `<TÊN>_DATA`.

### 4. Menu screen

Reuse `#screen-hsk-menu` + `hsk-menu.js` — chỉ cần đặt `state.currentLesson.hskGroup` đúng.

Nếu cần quiz modes riêng (ví dụ HSKK có mode nghe/nói):
- Tạo `src/js/screens/<tên>-menu.js` (copy `hsk-menu.js`, đổi IDs + modes)
- Thêm `#screen-<tên>-menu` vào `index.html`
- Thêm vào `navigation.js` screens map

### 5. Quiz modes

Các modes hiện tại đã hỗ trợ sẵn (dùng trực tiếp):
| Mode | Dùng cho |
|------|---------|
| `hsk-fc` | Flashcard: 中文 front, pinyin + VN back |
| `hsk-mc-cn-vi` | MC: Chữ Hán → Nghĩa VN |
| `hsk-mc-vi-cn` | MC: Nghĩa VN → Chữ Hán |

Nếu cần mode mới (ví dụ HSKK gõ pinyin):
- Thêm routing vào `session.js`
- Thêm render function vào `flashcard.js` hoặc `typing.js`

### 6. Progress storage

`src/js/core/storage.js` — thêm key riêng:
```javascript
const <TÊN>_STORAGE_KEY = "<tên>_vocab_progress";
function save<TÊN>Progress(groupId, mode, score, total) { ... }
function get<TÊN>GroupBestPercent(groupId) { ... }
```

Pattern giống hệt `saveHSKProgress` / `getHSKGroupBestPercent`.

### 7. Results screen

`src/js/screens/results.js` — thêm case trong progress save block:
```javascript
if (state.currentLesson?.hskGroup?.startsWith("<prefix>")) {
  storage.save<TÊN>Progress(...);
} else if (state.currentLesson?.hskGroup) {
  storage.saveHSKProgress(...);
}
```

### 8. Script load order

Trong `src/index.html`, thứ tự load:
```
data files → core → ui → screens (early) → quiz → screens (late: lessons, results, hsk-menu, <tên>-menu) → app.js
```

---

## Checklist

- [ ] JS data files tạo xong (`src/js/data/<tên>/`)
- [ ] `<script>` tags thêm vào `index.html`
- [ ] Tab / grid entry thêm vào home screen
- [ ] Menu screen HTML + JS
- [ ] `navigation.js` screens map cập nhật
- [ ] Quiz modes routing (hoặc reuse HSK modes)
- [ ] Progress storage key riêng
- [ ] `results.js` save logic cập nhật
- [ ] Test flashcard, MC, vocab list
- [ ] Commit + push
