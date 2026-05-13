# 🗄️ Supabase Setup Guide

## 1. Tạo Supabase Project

1. Truy cập [supabase.com](https://supabase.com)
2. Đăng nhập hoặc đăng ký tài khoản
3. Click **"New Project"**
4. Nhập tên project: `metabookstore`
5. Chọn region gần nhất (vd: `Singapore` hoặc `Sydney`)
6. Đặt mật khẩu database
7. Click **"Create new project"** (chờ ~2-3 phút)

## 2. Lấy Keys

Sau khi project được tạo:

1. Vào **Settings** → **API**
2. Copy các giá trị:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

## 3. Cấu hình Biến Môi Trường

Tạo file `.env.local` ở root project:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
JWT_SECRET=your-jwt-secret-key
```

## 4. Tạo Bảng Dữ Liệu

Vào **SQL Editor** trong Supabase Console và chạy:

### Bảng Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

### Bảng Books
```sql
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  stock INTEGER DEFAULT 0,
  rating DECIMAL(3, 2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
```

### Bảng Orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  total DECIMAL(12, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
```

### Bảng Order Items
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
```

## 5. Thêm Dữ Liệu Sample

```sql
-- Thêm vài cuốn sách sample
INSERT INTO books (title, author, price, description, category, stock, rating) VALUES
  ('The Great Gatsby', 'F. Scott Fitzgerald', 12.99, 'A classic novel', 'Fiction', 50, 4.5),
  ('1984', 'George Orwell', 13.99, 'Dystopian masterpiece', 'Fiction', 30, 4.7),
  ('Clean Code', 'Robert C. Martin', 34.99, 'Guide to writing better code', 'Technology', 25, 4.8);
```

## 6. Cấu hình RLS (Row Level Security) - Tùy chọn

Nếu muốn bảo mật dữ liệu:

```sql
-- Allow public read for books
CREATE POLICY "Allow public read" ON books
  FOR SELECT USING (true);

-- Allow authenticated users to read users table
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);
```

## 7. Khởi động Ứng Dụng

```bash
npm run dev
```

Truy cập: `http://localhost:3000`

## 8. Các Endpoints API Hiện Tại

- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/books` - Lấy danh sách sách
- `GET /api/books/[id]` - Lấy chi tiết sách
- `POST /api/books` - Tạo sách (cần admin token)
- `POST /api/cart` - Tạo đơn hàng

## 9. Troubleshooting

### Lỗi: "NEXT_PUBLIC_SUPABASE_URL is not defined"
→ Kiểm tra `.env.local` đã được tạo chưa và restart dev server

### Lỗi: "Connection refused"
→ Kiểm tra URLs và keys có đúng không

### Lỗi: "User already exists"
→ Email đã được đăng ký, sử dụng email khác

---

✅ Hoàn tất! Dự án sẵn sàng sử dụng Supabase.
