# 📝 Changelog

Tất cả các thay đổi quan trọng của dự án sẽ được ghi nhận trong file này.

Format dựa trên [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
và project tuân theo [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-03-23

### 🔧 Quality Audit → 100/100

**PR #33: fix: kanji quiz TTS + F1 shortcut + state reset**
- ✅ Replace raw `SpeechSynthesisUtterance` → `playJapaneseAudio()` trong 3 kanji components (KanjiFlashCard, KanjiMultipleChoice, KanjiTypingQuiz)
- ✅ Thêm F1 keyboard shortcut cho speak ở tất cả kanji quiz modes
- ✅ Thêm reactive state reset (`prevAnswer` tracking) trong KanjiMultipleChoice và KanjiTypingQuiz
- ✅ KanjiTypingQuiz: Enter submit → TTS → Enter advance (giống TypingQuiz chính)
- ✅ Thêm `{#key}` wrapper cho KanjiFlashCard đảm bảo reset khi chuyển câu
- ✅ Button label: `🔊 Speak (F1)`, hint text cập nhật

**Branch Cleanup:**
- ✅ Xoá 11 stale remote branches đã merged (docs/*, feat/*, fix/*, feature/*)
- ✅ Chỉ còn `main`, `gh-pages`, và active PR branches

**Audit Score:**

| Category | Before | After |
|----------|--------|-------|
| TTS Audio | 7/10 | 10/10 |
| CI/CD | 7/10 | 10/10 |
| Code Quality | 9/10 | 10/10 |
| **Total** | **92/100** | **100/100** |

---

## [1.1.0] - 2026-03-03

### ✨ Tính năng mới

**Từ vựng bổ sung (参考語彙 - Supplementary Vocabulary):**
- ✅ Thêm 115 từ vựng bổ sung cho 14 bài học
- ✅ Bài 1: +18 quốc gia (Úc, Canada, Đài Loan, New Zealand, Philippines, Malaysia, Mexico, Nga, Ý, Tây Ban Nha, Bồ Đào Nha, Thụy Sĩ, Hà Lan, Hy Lạp, Thổ Nhĩ Kỳ, Ai Cập, Nam Phi, Argentina)
- ✅ Bài 2: +6 ngôn ngữ (tiếng Trung, Hàn, Pháp, Đức, Tây Ban Nha, Thái)
- ✅ Bài 3: +2 từ chính (自動販売機, お手洗い) + 7 từ bổ sung (Italia, Thụy Sĩ, Pháp, Jakarta, Bangkok, Berlin, Shin-Osaka)
- ✅ Bài 5: +3 phương tiện (新幹線, 地下鉄, オートバイ)
- ✅ Bài 7: +12 thành viên gia đình (父, 母, 兄, 姉, 弟, 妹, 祖父, 祖母, etc.)
- ✅ Bài 8: +9 màu sắc & vị (赤い, 青い, 黄色い, 黒い, 茶色い, 甘い, 辛い, 苦い, 酸っぱい)
- ✅ Bài 9: +9 thể thao & âm nhạc (サッカー, 野球, テニス, バスケットボール, バレーボール, 水泳, ロック, ポップス, 演歌)
- ✅ Bài 10: +6 đồ dùng nhà (冷蔵庫, 洗濯機, エアコン, ベッド, ソファー, カーテン)
- ✅ Bài 11: +10 đồ ăn (ご飯, パン, 肉, 魚, 野菜, 果物, 卵, 牛乳, 水, お茶)
- ✅ Bài 12: +6 địa danh & lễ hội (富士山, 京都, 奈良, 横浜, お正月, 桜)
- ✅ Bài 13: +5 địa điểm trong thành phố (本屋, 薬局, パン屋, 花屋, 交番)
- ✅ Bài 15: +6 nghề nghiệp (看護師, 弁護士, 料理人, 美容師, 運転手, 警察官)
- ✅ Bài 17: +10 bộ phận cơ thể (頭, 目, 耳, 鼻, 口, 歯, 手, 足, 背中, 指)
- ✅ Bài 22: +8 quần áo (シャツ, ズボン, スカート, コート, セーター, Tシャツ, 帽子, 眼鏡)

### 🔧 Cải tiến kỹ thuật

**Data Structure:**
- ✅ Thêm field `type` cho tất cả vocabulary items
  - `type: "main"` - Từ vựng chính của bài
  - `type: "supplementary"` - Từ vựng bổ sung (参考語彙)
- ✅ Tổng số từ vựng tăng từ ~1,000 lên 1,100+

### 📚 Documentation

- ✅ Cập nhật PROJECT_SUMMARY.md với số liệu mới
- ✅ Thêm CHANGELOG entry cho phiên bản 1.1.0

---

## [1.0.0] - 2025-02-10

### 🎉 Initial Release

#### ✨ Tính năng mới

**Từ vựng:**
- ✅ 25 bài học với 1,000+ từ vựng
- ✅ Hiển thị đầy đủ: Kanji, Kana, Romaji, Tiếng Việt, English
- ✅ Danh sách từ vựng cho mỗi bài (Xem danh sách từ)

**Quiz từ vựng:**
- ✅ Flashcard - Lật thẻ để học
- ✅ Trắc nghiệm JP → VN
- ✅ Trắc nghiệm VN → JP
- ✅ Gõ Kana - Nhập kana cho từ tiếng Việt
- ✅ Gõ Romaji - Nhập romaji cho từ tiếng Việt
  - Hỗ trợ variants: shi/si, chi/ti, tsu/tu, fu/hu, ji/zi
  - Case-insensitive
  - Ignore spaces

**Ngữ pháp:**
- ✅ 103 mẫu ngữ pháp cho 25 bài
- ✅ Giải thích chi tiết bằng tiếng Việt và English
- ✅ 2-3 ví dụ cho mỗi mẫu câu
- ✅ Xem danh sách ngữ pháp (Grammar List)

**Quiz ngữ pháp:**
- ✅ Flashcard ngữ pháp
- ✅ Trắc nghiệm JP → VN
- ✅ Trắc nghiệm VN → JP

**UI/UX:**
- ✅ Responsive design - Mobile-first
- ✅ Dark mode / Light mode
- ✅ Progress tracking
- ✅ LocalStorage - Lưu kết quả học
- ✅ Retry mode - Ôn lại từ sai
- ✅ Smooth animations
- ✅ Keyboard shortcuts (Enter, Space, Arrows)

**Technical:**
- ✅ Vanilla JavaScript (zero dependencies)
- ✅ CSS Variables for theming
- ✅ LocalStorage API
- ✅ Offline-capable
- ✅ < 100KB total size

#### 📚 Nội dung

**Bài 1-5:** Cơ bản
- Giới thiệu, danh từ, chỉ định từ
- Thời gian, lịch trình
- Di chuyển, phương tiện

**Bài 6-10:** Nâng cao
- Động từ tác động, trợ từ
- Cho/nhận
- Tính từ
- Sở thích, khả năng
- Vị trí, tồn tại

**Bài 11-15:** Trung cấp
- Trợ số từ
- Thì quá khứ
- Mong muốn
- て-form
- Xin phép, cấm đoán

**Bài 16-20:** Nâng cao
- て-form nâng cao
- ない-form
- Dictionary form
- た-form
- Plain form

**Bài 21-25:** Cao cấp
- Trích dẫn
- Bổ nghĩa danh từ
- Điều kiện
- Cho/nhận nâng cao
- たら/ても

#### 🚀 Deployment

- ✅ GitHub Actions workflow
- ✅ Hỗ trợ GitHub Pages
- ✅ Documentation đầy đủ

#### 📖 Documentation

- ✅ README.md
- ✅ CONTRIBUTING.md
- ✅ DEPLOYMENT.md
- ✅ CHANGELOG.md
- ✅ LICENSE (MIT)

---

## [Unreleased]

### 💡 Planned Features

**Tính năng đang xem xét:**
- [ ] Audio pronunciation cho từ vựng
- [ ] Spaced repetition system (SRS)
- [ ] Study streaks và achievements
- [ ] Export/import progress
- [ ] More lesson packs (Minna II)
- [ ] JLPT level indicators
- [ ] Kanji writing practice
- [ ] Grammar exercises
- [ ] Offline mode improvements
- [ ] Mobile app (PWA)

**Improvements:**
- [ ] Better mobile keyboard UX
- [ ] More keyboard shortcuts
- [ ] Statistics dashboard
- [ ] Print-friendly views
- [ ] Multi-language UI
- [ ] Customizable quiz settings

---

## 📅 Version History

### Format
- `[Major.Minor.Patch]` - YYYY-MM-DD

### Categories
- `Added` - Tính năng mới
- `Changed` - Thay đổi trong features hiện có
- `Deprecated` - Features sẽ bị loại bỏ
- `Removed` - Features đã loại bỏ
- `Fixed` - Bug fixes
- `Security` - Vulnerability fixes

---

## 🔗 Links

- [Unreleased]: https://github.com/your-username/minna-vocab-quiz/compare/v1.0.0...HEAD
- [1.0.0]: https://github.com/your-username/minna-vocab-quiz/releases/tag/v1.0.0
