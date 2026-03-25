# So sánh tính năng: Smart Quiz vs Nhai Kanji

> **Ngày:** 2026-03-23
> **Nguồn:** https://nhaikanji.com/ vs https://victoraurelius.github.io/2026-Smart-Quiz/

## Tổng quan

| Tiêu chí | Smart Quiz | Nhai Kanji |
|----------|-----------|------------|
| **Tech stack** | SvelteKit + Static (GitHub Pages) | Next.js + Firebase + Google Auth |
| **Hosting** | Free (GitHub Pages) | Server (có backend) |
| **Target** | N5/N4 + HSK5 | N5→N1 (full JLPT) |
| **Focus** | Quiz-based learning | Kanji chiết tự + SRS |

---

## Chấm điểm so sánh (120 điểm)

| # | Category | Smart Quiz | Nhai Kanji | Gap |
|---|----------|-----------|------------|-----|
| 1 | **Nội dung Kanji** | 3/10 (256 kanji, N5/N4) | 9/10 (2500+ kanji, N5→N1, 214 bộ thủ) | -6 |
| 2 | **Nội dung Vocab** | 7/10 (1100+ JP + 1600+ HSK) | 7/10 (JLPT N5→N1) | 0 |
| 3 | **Nội dung Grammar** | 6/10 (103 patterns, N5 only) | 8/10 (Minna + Shin Kanzen + So-matome, N5→N1) | -2 |
| 4 | **Quiz modes** | 9/10 (flashcard, MC, typing, grammar quiz) | 6/10 (flashcard, SRS review) | +3 |
| 5 | **Kanji đặc biệt** | 2/10 (basic reference) | 10/10 (chiết tự trực quan, luyện viết tay, stroke order) | -8 |
| 6 | **SRS/Spaced Repetition** | 5/10 (SM-2 basic, mới implement) | 9/10 (Anki-style mature, production-tested) | -4 |
| 7 | **Gamification** | 5/10 (streaks, 14 achievements) | 8/10 (streaks, leaderboard, xếp hạng, premium) | -3 |
| 8 | **User system** | 2/10 (localStorage only) | 9/10 (Google Auth, cloud sync, Firebase) | -7 |
| 9 | **UI/UX** | 7/10 (responsive, dark mode, keyboard shortcuts) | 9/10 (custom fonts, animations, mobile-first, draw input) | -2 |
| 10 | **Bilingual (JP+CN)** | 8/10 (JP + Chinese HSK5) | 2/10 (chỉ JP) | +6 |
| 11 | **Offline/PWA** | 7/10 (service worker, install prompt) | 4/10 (requires server) | +3 |
| 12 | **Community** | 1/10 (không có) | 7/10 (Facebook group, TikTok) | -6 |
| | **Total** | **62/120** | **88/120** | **-26** |

---

## Điểm mạnh Smart Quiz (hơn Nhai Kanji)

| Tính năng | Smart Quiz | Nhai Kanji |
|-----------|-----------|------------|
| Quiz đa dạng | 4 modes (flashcard, MC, typing, grammar) | Chủ yếu flashcard |
| Bilingual | JP + Chinese HSK5 (1600+ words) | Chỉ tiếng Nhật |
| Offline | PWA, hoạt động offline | Cần internet |
| Free & Open source | Hoàn toàn miễn phí | Có premium tier |

## Điểm yếu Smart Quiz (cần cải thiện)

| # | Gap | Mô tả | Effort |
|---|-----|-------|--------|
| 1 | **Kanji chiết tự** | Nhai Kanji có sơ đồ chiết tự trực quan, phân tích cấu trúc kanji → Smart Quiz chỉ có reference table | Cao |
| 2 | **Luyện viết tay** | Nhai Kanji có canvas vẽ kanji + stroke order → Smart Quiz không có | Cao |
| 3 | **User auth + Cloud sync** | Nhai Kanji có Google login + Firebase sync → Smart Quiz chỉ localStorage | Cao |
| 4 | **JLPT N3→N1 content** | Nhai Kanji cover full N5→N1 → Smart Quiz chỉ N5/N4 | Rất cao (data) |
| 5 | **Leaderboard/Social** | Nhai Kanji có xếp hạng, cộng đồng → Smart Quiz không có | Trung bình |
| 6 | **SRS maturity** | Nhai Kanji SRS đã production-ready → Smart Quiz mới basic | Trung bình |
| 7 | **Đề thi JLPT** | Nhai Kanji có mock test JLPT → Smart Quiz không có | Trung bình |
| 8 | **Custom fonts** | Nhai Kanji có nhiều font kanji chuyên dụng (UD Digi Kyokasho, Zen Maru Gothic) | Thấp |

---

## Đề xuất ưu tiên cải thiện

| Priority | Feature | Impact | Effort |
|----------|---------|--------|--------|
| 🔴 P0 | Kanji stroke order + luyện viết (canvas) | +8 điểm | Cao |
| 🔴 P0 | Mở rộng content N3 (vocab + grammar) | +4 điểm | Cao (data) |
| 🟠 P1 | Chiết tự kanji (radical breakdown visualization) | +6 điểm | Trung bình |
| 🟠 P1 | JLPT mock test mode | +3 điểm | Trung bình |
| 🟡 P2 | User auth (Google) + cloud sync | +7 điểm | Cao |
| 🟡 P2 | Leaderboard | +3 điểm | Trung bình |
| 🟡 P2 | Thêm fonts kanji chuyên dụng | +1 điểm | Thấp |
