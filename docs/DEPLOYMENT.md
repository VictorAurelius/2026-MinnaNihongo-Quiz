# 🚀 Hướng dẫn Deploy

Tài liệu này hướng dẫn các cách deploy **Minna Vocab Quiz** lên các nền tảng hosting khác nhau.

## 📋 Mục lục

- [GitHub Pages (Khuyến nghị)](#github-pages-khuyến-nghị)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Cloudflare Pages](#cloudflare-pages)
- [Firebase Hosting](#firebase-hosting)

---

## 🌟 GitHub Pages (Khuyến nghị)

**Ưu điểm:** Miễn phí, tự động deploy, dễ setup

### Cách 1: Tự động với GitHub Actions (Đã setup sẵn)

1. **Push code lên GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/minna-vocab-quiz.git
   git push -u origin main
   ```

2. **Kích hoạt GitHub Pages:**
   - Vào repository trên GitHub
   - **Settings** → **Pages**
   - **Source**: GitHub Actions
   - Workflow đã được setup sẵn tại `.github/workflows/deploy.yml`

3. **Xem kết quả:**
   - Website sẽ có tại: `https://YOUR-USERNAME.github.io/minna-vocab-quiz`
   - Mỗi lần push lên `main`, website tự động update

### Cách 2: Manual Deploy (Không dùng Actions)

1. **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main`, folder: `/ (root)`
4. **Save**

Website sẽ live sau vài phút tại `https://YOUR-USERNAME.github.io/minna-vocab-quiz`

---

## 🎨 Netlify

**Ưu điểm:** Deploy nhanh, preview cho PR, custom domain miễn phí

### Cách 1: Deploy từ Git

1. Đăng nhập [Netlify](https://netlify.com)
2. **New site from Git**
3. Chọn repository của bạn
4. **Build settings:**
   - Build command: (để trống)
   - Publish directory: `/`
5. **Deploy site**

### Cách 2: Drag & Drop

1. Vào [Netlify Drop](https://app.netlify.com/drop)
2. Kéo thả toàn bộ thư mục project vào
3. Website sẽ live ngay lập tức

### Cấu hình netlify.toml (Optional)

Tạo file `netlify.toml`:

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## ⚡ Vercel

**Ưu điểm:** Cực nhanh, tự động preview, analytics

### Deploy

1. Cài Vercel CLI (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Hoặc từ web:**
   - Đăng nhập [Vercel](https://vercel.com)
   - **New Project**
   - Import repository
   - **Deploy**

### Cấu hình vercel.json (Optional)

```json
{
  "version": 2,
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        }
      ]
    }
  ]
}
```

---

## ☁️ Cloudflare Pages

**Ưu điểm:** CDN toàn cầu nhanh nhất, unlimited bandwidth

### Deploy

1. Đăng nhập [Cloudflare Pages](https://pages.cloudflare.com)
2. **Create a project**
3. **Connect to Git**
4. Chọn repository
5. **Build settings:**
   - Framework preset: None
   - Build command: (để trống)
   - Build output directory: `/`
6. **Save and Deploy**

### Custom domain

1. **Custom domains** → **Set up a custom domain**
2. Nhập domain của bạn
3. Follow hướng dẫn config DNS

---

## 🔥 Firebase Hosting

**Ưu điểm:** Tích hợp tốt với Firebase services, SSL miễn phí

### Setup

1. **Cài Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login:**
   ```bash
   firebase login
   ```

3. **Init project:**
   ```bash
   firebase init hosting
   ```

   - Use an existing project hoặc tạo mới
   - Public directory: `.` (current directory)
   - Configure as single-page app: `No`
   - Set up automatic builds: `No`

4. **Deploy:**
   ```bash
   firebase deploy
   ```

### firebase.json

Tự động tạo khi init, nội dung:

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

---

## 🔧 Troubleshooting

### Lỗi 404 khi refresh page

Thêm file `_redirects` (cho Netlify):
```
/*    /index.html   200
```

Hoặc config cho từng platform như trên.

### CSS/JS không load

Kiểm tra paths trong `index.html`:
- Nên dùng relative paths: `./css/style.css`
- Không dùng absolute paths: `/css/style.css`

### Dark mode không hoạt động

Kiểm tra LocalStorage có bị block không (private/incognito mode).

### CORS errors

Static site không có CORS issues. Nếu có, kiểm tra:
- External resources (fonts, CDN)
- API calls (app này không dùng API)

---

## 📊 So sánh các nền tảng

| Nền tảng | Miễn phí | Build time | CDN | Custom domain | SSL | Analytics |
|----------|----------|------------|-----|---------------|-----|-----------|
| **GitHub Pages** | ✅ | Trung bình | ✅ | ✅ | ✅ | ❌ |
| **Netlify** | ✅ | Nhanh | ✅ | ✅ | ✅ | ✅ |
| **Vercel** | ✅ | Rất nhanh | ✅ | ✅ | ✅ | ✅ |
| **Cloudflare** | ✅ | Nhanh | ✅✅✅ | ✅ | ✅ | ✅ |
| **Firebase** | ✅* | Nhanh | ✅ | ✅ | ✅ | ✅ |

*Firebase: 10GB/month bandwidth, sau đó tính phí

---

## 🎯 Khuyến nghị

**Cho người mới:**
→ **GitHub Pages** (đơn giản, tích hợp sẵn với Git)

**Cho performance tốt nhất:**
→ **Cloudflare Pages** (CDN nhanh nhất thế giới)

**Cho dễ dàng nhất:**
→ **Netlify** (drag & drop, không cần config)

**Cho tích hợp nhiều features:**
→ **Vercel** hoặc **Firebase**

---

## 🔐 Security Headers (Optional nhưng khuyến nghị)

Thêm vào config của platform:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 📞 Hỗ trợ

Nếu gặp vấn đề khi deploy:
1. Kiểm tra [Issues](https://github.com/your-username/minna-vocab-quiz/issues)
2. Đọc docs của platform bạn đang dùng
3. Mở issue mới với chi tiết lỗi

---

**Chúc bạn deploy thành công! 🚀**
