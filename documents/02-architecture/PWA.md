# 🔄 PWA Update Guide

## Cách PWA tự động cập nhật

### Quy trình update:

1. **Bạn push code mới** → GitHub Pages deploy
2. **User mở app** → Service Worker check update
3. **Phát hiện thay đổi** → Download version mới
4. **Banner thông báo** xuất hiện: "🎉 Có phiên bản mới!"
5. **User nhấn "Cập nhật"** → App reload với version mới

### ⚠️ QUAN TRỌNG: Khi deploy version mới

**Mỗi lần có thay đổi quan trọng, PHẢI tăng cache version:**

1. Mở file: `src/sw.js`
2. Tìm dòng: `const CACHE_NAME = 'smart-quiz-v2';`
3. Tăng số version: `v2` → `v3` → `v4` ...
4. Commit và push

```bash
# Example
sed -i "s/smart-quiz-v2/smart-quiz-v3/g" src/sw.js
git add src/sw.js
git commit -m "chore: bump PWA cache version to v3"
git push
```

### 🤖 Auto-update features:

✅ Service Worker check update mỗi 60 giây
✅ Phát hiện version mới tự động
✅ Banner thông báo đẹp mắt
✅ User có thể chọn "Cập nhật" hoặc "Để sau"
✅ Reload mượt mà không mất dữ liệu

### 🧪 Test update locally:

1. Chạy server: `npm start` hoặc `python3 -m http.server -d src 8080`
2. Mở: `http://localhost:8080`
3. Cài PWA: Chrome DevTools → Application → Manifest → Install
4. Sửa code → Save
5. Tăng cache version trong `sw.js`
6. Reload trang
7. Banner "Có phiên bản mới" sẽ xuất hiện! 🎉

### 📱 User experience:

**Lần đầu cài app:**
- Download tất cả assets
- Lưu vào cache
- App hoạt động offline

**Khi có update:**
```
┌─────────────────────────────────┐
│ 🎉 Có phiên bản mới! Nhấn để   │
│    cập nhật ngay.               │
│    [Cập nhật]  [Để sau]         │
└─────────────────────────────────┘
```

**Sau khi nhấn "Cập nhật":**
- App reload ngay lập tức
- Version mới được active
- Cache cũ bị xóa tự động

### 🔧 Nâng cao:

**Tắt auto-update notification:**
Xóa hoặc comment phần `showUpdateNotification()` trong `pwa-register.js`

**Force update ngay lập tức:**
Đổi `self.skipWaiting()` trong `sw.js` (không khuyến khích)

**Cache thêm assets:**
Thêm paths vào `STATIC_CACHE` array trong `sw.js`

### 📊 Monitor updates:

**Chrome DevTools:**
1. F12 → Application tab
2. Service Workers section
3. Xem status: "waiting", "activated"
4. Check "Update on reload" để test

**Console logs:**
- `[PWA] Service Worker registered`
- `[PWA] New service worker installing...`
- `[PWA] New version available!`
- `[PWA] Skipping waiting...`
- `[PWA] New service worker activated, reloading...`

---

**Tóm lại:** PWA sẽ TỰ ĐỘNG cập nhật, nhưng cần:
1. ✅ Tăng cache version khi deploy
2. ✅ User nhấn nút "Cập nhật" trên banner
3. ✅ Hoặc đóng/mở lại app

Không cần làm gì thêm! 🚀
