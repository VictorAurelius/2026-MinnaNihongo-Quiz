# So sánh Content Pedagogy: Smart Quiz vs Nhai Kanji

> **Ngày:** 2026-03-23

---

## 1. Spaced Repetition System (SRS)

### Smart Quiz
- **Thuật toán:** SM-2 (SuperMemo 2) — đúng công thức gốc
- **Parameters:** easeFactor 1.3–2.5, interval 1→6→×EF
- **Quality mapping:** Binary (đúng = quality 4, sai = quality 1) — không tận dụng đầy đủ thang 0-5
- **Lưu trữ:** localStorage (mất khi xóa browser data)
- **Review page:** Có (`/review`) với flashcard UI + due count badge

**Thiếu:**
- ❌ Không có learning steps (Anki-style: 1m, 10m trước khi vào review)
- ❌ Không có leech detection (từ bị sai >8 lần liên tục)
- ❌ Mastery level (0-5) và SRS easeFactor chạy song song, không liên kết
- ❌ Không tính thời gian response vào quality

### Nhai Kanji
- **Thuật toán:** Anki-style SRS (mature, production-tested)
- **Integration:** Tích hợp sâu với tất cả content (kanji, vocab, grammar)
- **Cloud sync:** Firebase — không mất data
- **Features:** Ghi nhớ section riêng, chủ động (active recall) section riêng

**Score:** Smart Quiz **4/10** — Nhai Kanji **8/10**

---

## 2. Answer Checking & Quiz Logic

### Smart Quiz
- **Normalization:** lowercase, strip spaces, romaji variants (shi/si, chi/ti, tsu/tu, fu/hu, ji/zi)
- **Long vowels:** ō→ou, ū→uu
- **MC generation:** Fisher-Yates shuffle, 4 options, loại duplicate
- **Modes:** 4 (flashcard, MC, typing, grammar fill-blank/pattern-match)
- **Directions:** 6 (ja-vi, vi-ja, ja-en, en-ja, ja-romaji, vi-romaji)

**Thiếu:**
- ❌ Không có fuzzy matching (cho phép sai 1-2 ký tự)
- ❌ Không có partial credit
- ❌ Không có adaptive difficulty

### Nhai Kanji
- **Modes:** Flashcard, SRS review, luyện viết tay, quiz, typing hiragana, đọc hiểu, luyện nghe
- **Input:** Drawing canvas cho kanji + text input
- **Đề thi:** Mock test JLPT

**Score:** Smart Quiz **7/10** — Nhai Kanji **8/10**

---

## 3. Mastery & Progression

### Smart Quiz
- **Mastery levels:** 6 (0=New → 5=Mastered)
- **Logic:** Đúng +1, sai -1, clamp 0-5
- **Learning path:** Không có — user tự chọn bài, không có suggested order
- **Prerequisites:** Không có — mọi bài đều unlock từ đầu

### Nhai Kanji
- **Lộ trình (Roadmap):** Có trang riêng cho learning path
- **JLPT levels:** N5→N1 có cấu trúc tiến trình rõ ràng
- **Progression:** Implied via roadmap + xếp hạng

**Score:** Smart Quiz **3/10** — Nhai Kanji **7/10**

---

## 4. Gamification

### Smart Quiz
- **Streaks:** Daily tracking (current, longest, total days)
- **Achievements:** 14 achievements (4 nhóm: correct count, word count, mastery, streak)
- **Stats dashboard:** Overview cards, mastery chart, lesson breakdown

**Thiếu:**
- ❌ Không có XP/point system
- ❌ Không có daily goals
- ❌ Không có leaderboard
- ❌ Không có badge sharing/social

### Nhai Kanji
- **Xếp hạng:** Leaderboard so sánh với người dùng khác
- **Premium rewards:** Unlock thêm tính năng khi nâng cấp
- **Cộng đồng:** Facebook group + TikTok

**Score:** Smart Quiz **5/10** — Nhai Kanji **8/10**

---

## 5. Nội dung giảng dạy

### Smart Quiz

| Content | Scope | Chi tiết |
|---------|-------|----------|
| Vocab JP | N5/N4 | 1100+ từ (Minna no Nihongo) |
| Grammar JP | N5 | 103 patterns + comparison cards |
| Kanji | N5/N4 | 256 kanji (onyomi, kunyomi, examples) |
| HSK Chinese | HSK5 | 1600+ từ tiếng Trung |
| Alphabet | Full | Hiragana + Katakana charts |
| Counters | N5 | Bộ trợ số từ |

### Nhai Kanji

| Content | Scope | Chi tiết |
|---------|-------|----------|
| Kanji | N5→N1 | 2500+ kanji + 214 bộ thủ + chiết tự trực quan |
| Vocab | N5→N1 | Tango + Mina + Mimikara + Tettei |
| Grammar | N5→N1 | Minna + Shin Kanzen + So-matome + Nihongo So-matome |
| Đề thi | N5→N1 | Mock test JLPT |
| Luyện viết | Full | Canvas vẽ kanji + stroke order |

**Score:** Smart Quiz **5/10** — Nhai Kanji **9/10**

---

## 6. Tổng kết

| Category | Smart Quiz | Nhai Kanji |
|----------|-----------|------------|
| SRS | 4/10 | 8/10 |
| Quiz Logic | 7/10 | 8/10 |
| Mastery & Progression | 3/10 | 7/10 |
| Gamification | 5/10 | 8/10 |
| Content | 5/10 | 9/10 |
| **Total** | **24/50** | **40/50** |

---

## Khuyến nghị cho Smart Quiz

| Priority | Action | Impact |
|----------|--------|--------|
| 🔴 P0 | Thêm learning path (unlock bài tiếp khi đạt mastery threshold) | Progression +3 |
| 🔴 P0 | Kết nối mastery level với SRS easeFactor | SRS +2 |
| 🟠 P1 | Thêm adaptive difficulty (ưu tiên từ yếu) | Quiz +2 |
| 🟠 P1 | Thêm JLPT mock test mode | Content +2 |
| 🟠 P1 | Mở rộng quality mapping SRS từ binary sang 0-5 | SRS +1 |
| 🟡 P2 | Thêm leech detection | SRS +1 |
| 🟡 P2 | Thêm daily goals + XP system | Gamification +2 |
| 🟡 P2 | Thêm fuzzy matching cho answer checking | Quiz +1 |
