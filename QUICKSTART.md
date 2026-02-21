# ⚡ Quick Start Guide

Hướng dẫn nhanh để chạy và deploy **Minna Vocab Quiz** trong 5 phút!

## 🚀 Chạy local (30 giây)

### Cách 1: Python (Đơn giản nhất)

```bash
# Di chuyển vào thư mục project
cd "minna-vocab-quiz"

# Chạy server
python3 -m http.server 8080

# Mở browser: http://localhost:8080
```

### Cách 2: Node.js

```bash
# Cài http-server (một lần)
npm install -g http-server

# Chạy
http-server -p 8080

# Hoặc dùng npm script
npm start
```

### Cách 3: Chỉ mở file

Double-click file `index.html` → Mở bằng Chrome/Firefox/Safari

---

## 📤 Deploy lên GitHub Pages (5 phút)

### Bước 1: Push code lên GitHub

```bash
# Tạo repository mới trên GitHub.com
# Rồi chạy:

git init
git add .
git commit -m "🎉 Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/minna-vocab-quiz.git
git push -u origin main
```

### Bước 2: Kích hoạt GitHub Pages

1. Vào repository trên GitHub
2. **Settings** → **Pages** (menu bên trái)
3. **Source**:
   - Chọn **GitHub Actions** (khuyến nghị)
   - Hoặc chọn **Deploy from a branch** → branch `main` → folder `/`
4. **Save**

### Bước 3: Xem website

Website sẽ live tại:
```
https://YOUR-USERNAME.github.io/minna-vocab-quiz
```

Thời gian: ~2-5 phút sau khi push.

---

## 🎯 Test checklist

Sau khi deploy, kiểm tra:

- [ ] Mở được trang chính
- [ ] Danh sách 25 bài hiển thị đúng
- [ ] Chọn bài → Hiển thị menu quiz
- [ ] Dark/Light mode toggle
- [ ] Chạy 1 quiz bất kỳ → Hoạt động OK
- [ ] Xem ngữ pháp → Card hiển thị đẹp
- [ ] Mobile responsive (mở trên điện thoại)

---

## 🔧 Troubleshooting

### ❌ Lỗi: "Address already in use"
→ Port 8080 đang được dùng. Thử port khác:
```bash
python3 -m http.server 8081
```

### ❌ GitHub Actions không chạy
→ Kiểm tra:
1. File `.github/workflows/deploy.yml` có tồn tại không?
2. Settings → Actions → General → Workflow permissions → **Read and write permissions**

### ❌ 404 Not Found trên GitHub Pages
→ Đợi 2-5 phút, GitHub cần thời gian build.
→ Kiểm tra Actions tab xem build có lỗi không.

### ❌ Dark mode không hoạt động
→ Xóa LocalStorage: F12 → Application → LocalStorage → Clear

---

## 📖 Đọc thêm

- **README.md** - Tài liệu đầy đủ
- **DEPLOYMENT.md** - Hướng dẫn deploy chi tiết (Netlify, Vercel, etc.)
- **CONTRIBUTING.md** - Hướng dẫn đóng góp

---

## 💡 Tips

### Custom domain (Optional)

Sau khi deploy GitHub Pages:
1. Mua domain (hoặc dùng miễn phí từ Freenom)
2. Settings → Pages → Custom domain
3. Nhập domain và setup DNS theo hướng dẫn

### Update code

```bash
# Sau khi sửa code
git add .
git commit -m "feat: thêm tính năng XYZ"
git push

# GitHub Actions tự động deploy sau vài phút
```

### Xem logs

- GitHub: Actions tab → Xem workflow runs
- Local: Check browser console (F12)

---

## 🎉 Xong!

Giờ bạn đã có một app học tiếng Nhật hoàn chỉnh!

**Next steps:**
- ⭐ Star repository nếu thấy hữu ích
- 🐛 Report bugs tại Issues
- 🤝 Contribute (xem CONTRIBUTING.md)
- 📢 Share với bạn bè

---

**がんばってください！** 🇯🇵📚
