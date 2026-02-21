# 📚 Minna no Nihongo - Vocabulary & Grammar Quiz App

Ứng dụng học từ vựng và ngữ pháp tiếng Nhật theo giáo trình **Minna no Nihongo I** (Bài 1-25).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Japanese](https://img.shields.io/badge/Language-Japanese-red.svg)](https://github.com/topics/japanese)
[![Vietnamese](https://img.shields.io/badge/Language-Vietnamese-red.svg)](https://github.com/topics/vietnamese)

## ✨ Tính năng

### 📖 Từ vựng (Vocabulary)
- **25 bài học** với hơn 1,000 từ vựng
- Hiển thị: Kanji + Kana + Romaji + Tiếng Việt + English
- Danh sách từ vựng đầy đủ cho mỗi bài

### 🎯 Quiz từ vựng (5 chế độ)
1. **💡 Flashcard** - Lật thẻ để học từ
2. **✅ Trắc nghiệm JP → VN** - Chọn nghĩa tiếng Việt
3. **✅ Trắc nghiệm VN → JP** - Chọn từ tiếng Nhật
4. **⌨️ Gõ Kana** - Nhập kana cho từ tiếng Việt
5. **⌨️ Gõ Romaji** - Nhập romaji cho từ tiếng Việt

### 📝 Ngữ pháp (Grammar)
- **103 mẫu ngữ pháp** cho 25 bài học
- Giải thích chi tiết bằng tiếng Việt và English
- Ví dụ minh họa với 3 ngôn ngữ

### 🎮 Quiz ngữ pháp (3 chế độ)
1. **💡 Flashcard ngữ pháp** - Học mẫu câu
2. **✅ Trắc nghiệm JP → VN** - Chọn nghĩa
3. **✅ Trắc nghiệm VN → JP** - Chọn mẫu câu

### 🎨 Giao diện
- ⚡ Responsive - Hoạt động tốt trên mọi thiết bị
- 🌓 Dark mode / Light mode
- 🎯 Progress tracking - Theo dõi tiến độ
- 💾 LocalStorage - Lưu kết quả học tập
- 🔄 Retry mode - Ôn lại từ sai

## 🚀 Demo

**[👉 Xem Demo tại đây](https://your-username.github.io/minna-vocab-quiz)**

## 📦 Cài đặt & Sử dụng

### Cách 1: Chạy local (đơn giản nhất)

```bash
# Clone repository
git clone https://github.com/your-username/minna-vocab-quiz.git
cd minna-vocab-quiz

# Mở bằng Python server
python3 -m http.server 8080

# Hoặc dùng Node.js
npx http-server -p 8080

# Mở trình duyệt tại: http://localhost:8080
```

### Cách 2: Chỉ cần mở file

Mở file `index.html` trực tiếp bằng trình duyệt (Chrome, Firefox, Safari, Edge).

### Cách 3: Deploy lên GitHub Pages

1. Fork repository này
2. Vào **Settings** → **Pages**
3. Chọn **Source**: Deploy from a branch
4. Chọn branch **main** và folder **/ (root)**
5. Nhấn **Save**
6. Website sẽ có tại: `https://your-username.github.io/minna-vocab-quiz`

## 📂 Cấu trúc dự án

```
minna-vocab-quiz/
├── index.html          # Trang chính
├── css/
│   └── style.css      # Styles chính (dark/light mode)
├── js/
│   ├── app.js         # Logic chính của app
│   └── data.js        # Dữ liệu 25 bài học
├── .github/
│   └── workflows/
│       └── deploy.yml # GitHub Actions CI/CD
└── README.md          # Tài liệu này
```

## 🎓 Nội dung học

### Bài 1-5: Cơ bản
- Giới thiệu bản thân, danh từ, chỉ định từ
- Thời gian, lịch trình
- Động từ di chuyển, phương tiện

### Bài 6-10: Nâng cao
- Động từ tác động, trợ từ を
- Cho/nhận, mượn/cho mượn
- Tính từ い/な
- Sở thích, khả năng
- Vị trí, tồn tại

### Bài 11-15: Trung cấp
- Trợ số từ, gia đình
- Thì quá khứ
- Mong muốn, mục đích
- て-form cơ bản
- Xin phép, cấm đoán, tiến hành

### Bài 16-20: Nâng cao hơn
- て-form nâng cao, lý do
- ない-form, bắt buộc
- Dictionary form, có thể
- た-form, kinh nghiệm
- Plain form, suy nghĩ

### Bài 21-25: Cao cấp
- Trích dẫn nâng cao
- Bổ nghĩa danh từ
- Điều kiện thời gian
- Cho/nhận nâng cao
- Điều kiện たら/ても

## 🛠️ Công nghệ sử dụng

- **Vanilla JavaScript** - Không cần framework
- **CSS3** - Modern styling với CSS Variables
- **HTML5** - Semantic markup
- **LocalStorage API** - Lưu tiến độ học tập
- **GitHub Actions** - CI/CD tự động

## 🎯 Tính năng nổi bật

### Quiz thông minh
- ✅ Xáo trộn câu hỏi ngẫu nhiên
- ✅ Tạo đáp án nhiễu từ cùng bài học
- ✅ Validation thông minh cho romaji (hỗ trợ shi/si, chi/ti, etc.)
- ✅ Feedback chi tiết khi trả lời sai

### UX/UI tốt
- ⌨️ Keyboard shortcuts (Enter, Space, Arrow keys)
- 🎨 Smooth animations
- 📱 Mobile-first design
- 🌐 Hỗ trợ 3 ngôn ngữ (JP, VN, EN)

### Performance
- ⚡ Load nhanh (< 100KB tổng cộng)
- 💾 Offline-capable (cache với LocalStorage)
- 🚀 Zero dependencies

## 🤝 Đóng góp

Contributions, issues và feature requests đều được chào đón!

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Cách thêm từ vựng/ngữ pháp

Chỉnh sửa file `js/data.js`:

```javascript
{
  lessonNumber: 26,
  title: "Tiêu đề bài học",
  vocabulary: [
    {
      japanese: "言葉",
      kana: "ことば",
      vietnamese: "từ ngữ",
      english: "word",
      example: "日本語の　言葉を　勉強します。"
    }
  ],
  grammar: [
    {
      pattern: "～文法",
      vietnamese: "nghĩa tiếng Việt",
      english: "English meaning",
      explanation: "Giải thích...",
      examples: [
        {
          japanese: "例文です。",
          vietnamese: "Đây là câu ví dụ.",
          english: "This is an example sentence."
        }
      ]
    }
  ]
}
```

## 📝 License

Dự án này được phát hành dưới [MIT License](LICENSE).

## 👨‍💻 Tác giả

**Minna Vocab Quiz**

- Website: [Demo](https://your-username.github.io/minna-vocab-quiz)
- GitHub: [@your-username](https://github.com/your-username)

## 🙏 Credits

- Giáo trình: **Minna no Nihongo I** (3A Corporation)
- Icons: SVG inline
- Fonts: System fonts

## 📞 Liên hệ

Nếu có câu hỏi hoặc góp ý, vui lòng:
- Mở [Issue](https://github.com/your-username/minna-vocab-quiz/issues)
- Hoặc gửi email: your-email@example.com

---

⭐ **Nếu dự án hữu ích, hãy cho một Star nhé!** ⭐

**がんばってください！** (Cố gắng học tập!)
