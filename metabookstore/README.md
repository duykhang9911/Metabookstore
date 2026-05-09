# 📚 MetaBookstore

Website bán sách trực tuyến xây dựng bằng **Next.js 14**, **TypeScript** và **Tailwind CSS**.

**Sinh viên:** Đoàn Tương Duy Khang  
**MSSV:** 2111844  
**Lớp:** CTK45A

---

## 🚀 Cài Đặt & Chạy

### Yêu cầu
- Node.js >= 18.x
- npm hoặc yarn

### Bước 1 – Cài dependencies
```bash
npm install
```

### Bước 2 – Chạy môi trường development
```bash
npm run dev
```
Mở trình duyệt tại: **http://localhost:3000**

### Build production
```bash
npm run build
npm start
```

---

## 📁 Cấu Trúc Project

```
metabookstore/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (Navbar + Footer)
│   │   ├── page.tsx            # Trang chủ (Home)
│   │   ├── globals.css         # CSS toàn cục + Tailwind
│   │   ├── books/
│   │   │   └── page.tsx        # Trang tất cả sách
│   │   ├── cart/
│   │   │   └── page.tsx        # Trang giỏ hàng
│   │   └── about/
│   │       └── page.tsx        # Trang giới thiệu
│   ├── components/
│   │   ├── Navbar.tsx          # Thanh điều hướng
│   │   ├── Footer.tsx          # Chân trang
│   │   ├── BookCard.tsx        # Card hiển thị sách
│   │   ├── CartContext.tsx     # Global state giỏ hàng
│   │   └── Providers.tsx       # Wrapper context
│   └── data/
│       └── books.ts            # Dữ liệu sách & danh mục
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## ✅ Tính Năng

| Tính Năng | Mô Tả |
|-----------|-------|
| 🏠 Trang Chủ | Hero, sách nổi bật, danh mục, reviews, newsletter |
| 📚 Trang Sách | Tìm kiếm + lọc theo danh mục real-time |
| 🛒 Giỏ Hàng | Thêm/xóa sách, tổng tiền tự động (React Context) |
| 👤 Giới Thiệu | Thông tin sinh viên & tech stack |
| 📱 Responsive | Mobile-first, tương thích mọi màn hình |
| ⚡ SSR | Next.js App Router, tối ưu SEO |

---

## 🎨 Màu Sắc

| Tên | Hex |
|-----|-----|
| Navy | `#1a1f5e` |
| Indigo | `#3b3fa0` |
| Violet | `#6c5ce7` |
| Lavender | `#a29bfe` |
| Sky Blue | `#74b9ff` |
| Ice | `#dfe6fd` |
