# 🎨 Logo Mới cho Smart Quiz

## Thay đổi

Logo mới được thiết kế với:

- **Gradient ấm áp** (cam/đỏ/vàng) thay vì xanh dương - tượng trưng cho mặt trời mọc (biểu tượng Nhật Bản)
- **Chữ Kanji "日"** (mặt trời/Nhật Bản) thay vì hiragana "あ"
- **Ngôi sao lấp lánh** xung quanh để thể hiện sự hứng thú và hào hứng học tập
- **Sách mở** ở phía dưới với chữ hiragana "あ" để thể hiện việc học
- **Trophy/achievement icon** để khuyến khích động lực học tập
- **Màu sắc tươi tắn, năng động** hơn để kích thích hứng thú

## Cách tạo icons PNG

### Bước 1: Mở generate-icons.html

Mở file `generate-icons.html` trong trình duyệt web:

```bash
# Trên Windows (WSL)
explorer.exe generate-icons.html

# Hoặc double-click vào file generate-icons.html
```

### Bước 2: Generate & Download

1. Trang web sẽ tự động hiển thị preview của logo mới
2. Click nút **"✨ Generate All & Download"**
3. Hai file sẽ được tải xuống:
   - `icon-192.png`
   - `icon-512.png`

### Bước 3: Copy vào thư mục src

Copy 2 file PNG vừa tải xuống vào thư mục `src/`:

```bash
# Di chuyển từ Downloads vào src/
mv ~/Downloads/icon-192.png src/
mv ~/Downloads/icon-512.png src/

# Hoặc trên Windows
move %USERPROFILE%\Downloads\icon-192.png src\
move %USERPROFILE%\Downloads\icon-512.png src\
```

## Files đã thay đổi

1. **`src/icon.svg`** - Logo mới (vector)
2. **`src/manifest.json`** - Cập nhật theme_color: `#FF6B6B`
3. **`src/index.html`** - Cập nhật meta theme-color: `#FF6B6B`
4. **`generate-icons.html`** - Tool generate PNG từ SVG

## Test ứng dụng

Sau khi copy icons mới vào `src/`, mở ứng dụng và kiểm tra:

```bash
cd src
python3 -m http.server 8080

# Mở browser: http://localhost:8080
```

## Xem logo mới

- **Desktop/Mobile browser:** Logo sẽ hiển thị trong tab browser và taskbar
- **PWA (installed app):** Logo sẽ hiển thị trên màn hình chính và app switcher
- **Theme color:** Thanh status bar và header sẽ có màu cam/đỏ (#FF6B6B)

## Rollback (nếu cần)

Nếu muốn quay lại logo cũ, restore từ git:

```bash
git checkout HEAD -- src/icon.svg src/manifest.json src/index.html
```

---

**Thiết kế:** AI-assisted design
**Ngày:** 2026-03-13
**Mục đích:** Tạo logo đẹp và kích thích hứng thú học tập hơn
