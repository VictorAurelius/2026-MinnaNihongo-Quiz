# 🤝 Hướng dẫn đóng góp (Contributing Guide)

Cảm ơn bạn đã quan tâm đến việc đóng góp cho **Minna Vocab Quiz**! 🎉

## 📋 Mục lục

- [Cách đóng góp](#cách-đóng-góp)
- [Báo lỗi (Bug Reports)](#báo-lỗi-bug-reports)
- [Đề xuất tính năng (Feature Requests)](#đề-xuất-tính-năng-feature-requests)
- [Pull Requests](#pull-requests)
- [Coding Standards](#coding-standards)
- [Thêm dữ liệu](#thêm-dữ-liệu)

## 🚀 Cách đóng góp

### 1. Fork và Clone

```bash
# Fork repository trên GitHub
# Sau đó clone về máy

git clone https://github.com/YOUR-USERNAME/minna-vocab-quiz.git
cd minna-vocab-quiz
```

### 2. Tạo branch mới

```bash
git checkout -b feature/ten-tinh-nang
# hoặc
git checkout -b fix/ten-loi
```

### 3. Thực hiện thay đổi

- Viết code
- Test kỹ lưỡng
- Commit với message rõ ràng

```bash
git add .
git commit -m "feat: thêm tính năng XYZ"
# hoặc
git commit -m "fix: sửa lỗi ABC"
```

### 4. Push và tạo Pull Request

```bash
git push origin feature/ten-tinh-nang
```

Sau đó mở Pull Request trên GitHub.

## 🐛 Báo lỗi (Bug Reports)

Khi báo lỗi, vui lòng cung cấp:

1. **Mô tả chi tiết** về lỗi
2. **Các bước tái hiện** (steps to reproduce)
3. **Kết quả mong đợi** vs **Kết quả thực tế**
4. **Screenshots** (nếu có)
5. **Browser & OS** đang sử dụng

**Template:**

```markdown
### Mô tả lỗi
[Mô tả ngắn gọn về lỗi]

### Các bước tái hiện
1. Vào trang...
2. Nhấn vào...
3. Thấy lỗi...

### Kết quả mong đợi
[Nên xảy ra gì]

### Kết quả thực tế
[Thực tế xảy ra gì]

### Môi trường
- Browser: Chrome 120
- OS: Windows 11
- Version: 1.0.0
```

## 💡 Đề xuất tính năng (Feature Requests)

Chúng tôi luôn hoan nghênh các ý tưởng mới!

**Template:**

```markdown
### Mô tả tính năng
[Mô tả chi tiết tính năng]

### Lý do
[Tại sao tính năng này hữu ích?]

### Đề xuất giải pháp
[Cách bạn nghĩ nên implement]

### Các phương án khác
[Các cách khác đã cân nhắc]
```

## 🔀 Pull Requests

### Checklist trước khi submit PR:

- [ ] Code chạy được và đã test
- [ ] Không có lỗi console
- [ ] Code format đúng (xem [Coding Standards](#coding-standards))
- [ ] Đã update README (nếu cần)
- [ ] Commit messages rõ ràng
- [ ] Branch được update từ main mới nhất

### PR Title Format:

```
feat: Thêm chế độ quiz mới
fix: Sửa lỗi hiển thị kana
docs: Cập nhật README
style: Format code
refactor: Tái cấu trúc function XYZ
test: Thêm test cho feature ABC
chore: Cập nhật dependencies
```

### Review Process:

1. Maintainer sẽ review PR của bạn
2. Có thể có comments hoặc yêu cầu thay đổi
3. Sau khi approved, PR sẽ được merge

## 📝 Coding Standards

### JavaScript

```javascript
// ✅ GOOD
function calculateScore(correct, total) {
  return Math.round((correct / total) * 100);
}

// ❌ BAD
function calc(c,t){return Math.round(c/t*100)}
```

**Quy tắc:**
- Sử dụng `const` và `let`, tránh `var`
- Tên biến/function rõ ràng, meaningful
- Comment cho logic phức tạp
- 2 spaces indent
- Single quotes cho strings
- Semicolons

### CSS

```css
/* ✅ GOOD */
.quiz-card {
  padding: 1rem;
  border-radius: var(--radius);
  background: var(--bg-card);
}

/* ❌ BAD */
.quiz-card{padding:1rem;border-radius:8px;background:#fff}
```

**Quy tắc:**
- BEM naming convention (nếu phù hợp)
- CSS Variables cho theme
- Mobile-first
- 2 spaces indent

### HTML

```html
<!-- ✅ GOOD -->
<button class="btn btn-primary" data-action="submit">
  <svg>...</svg>
  Submit
</button>

<!-- ❌ BAD -->
<button class="btn btn-primary" onclick="submit()">Submit</button>
```

**Quy tắc:**
- Semantic HTML
- Accessibility attributes (aria-*)
- 2 spaces indent
- Tránh inline JavaScript

## 📚 Thêm dữ liệu

### Thêm bài học mới

Edit `js/data.js`:

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
      example: "例文です。"
    }
  ],
  grammar: [
    {
      pattern: "～文法",
      vietnamese: "nghĩa",
      english: "meaning",
      explanation: "Giải thích chi tiết...",
      examples: [
        {
          japanese: "例文。",
          vietnamese: "Câu ví dụ.",
          english: "Example sentence."
        }
      ]
    }
  ]
}
```

### Yêu cầu dữ liệu:

**Vocabulary:**
- ✅ `japanese`: Kanji + kana (display form)
- ✅ `kana`: Chỉ kana (để đọc)
- ✅ `vietnamese`: Nghĩa tiếng Việt
- ✅ `english`: Nghĩa tiếng Anh (optional nhưng khuyến khích)
- ✅ `example`: Câu ví dụ (optional)

**Grammar:**
- ✅ `pattern`: Mẫu câu tiếng Nhật
- ✅ `vietnamese`: Nghĩa tiếng Việt
- ✅ `english`: Nghĩa tiếng Anh
- ✅ `explanation`: Giải thích chi tiết
- ✅ `examples`: Mảng 2-3 ví dụ với 3 ngôn ngữ

### Kiểm tra dữ liệu:

```bash
# Test syntax
node -c js/data.js

# Test trên browser
python3 -m http.server 8080
# Mở http://localhost:8080 và test
```

## 🎨 Design Guidelines

- **Colors**: Sử dụng CSS Variables (--primary, --accent, etc.)
- **Typography**: System fonts, rõ ràng, dễ đọc
- **Spacing**: Consistent (0.5rem, 1rem, 1.5rem, 2rem)
- **Responsive**: Mobile-first, test trên nhiều kích thước màn hình
- **Accessibility**: WCAG AA compliant

## ✅ Testing

Trước khi submit PR, test:

1. ✅ Mở app trên Chrome, Firefox, Safari
2. ✅ Test trên mobile (hoặc responsive mode)
3. ✅ Test tất cả quiz modes
4. ✅ Test dark/light mode
5. ✅ Test với nhiều bài khác nhau
6. ✅ Kiểm tra console (không có errors)
7. ✅ Test LocalStorage (clear storage và test lại)

## 📞 Liên hệ

Nếu có câu hỏi:
- Mở [Discussion](https://github.com/your-username/minna-vocab-quiz/discussions)
- Hoặc [Issue](https://github.com/your-username/minna-vocab-quiz/issues)

## 🙏 Cảm ơn!

Mọi đóng góp đều được trân trọng và ghi nhận. Cảm ơn bạn đã giúp cải thiện dự án! 🎉

---

**がんばってください！** (Cố gắng!)
