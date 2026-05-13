# MetaBookStore - Backend Setup Guide

## Database Setup with Supabase

### Prerequisites
- Supabase account (free at https://supabase.com)
- Node.js 18 or higher
- Modern web browser

### Step 1: Create Supabase Project

1. **Sign up / Log in**
   - Visit [supabase.com](https://supabase.com)
   - Create account or log in

2. **Create new project**
   - Click "New Project"
   - Enter project name: `metabookstore`
   - Select region closest to you (Singapore, Sydney, etc.)
   - Set database password
   - Click "Create new project" (wait 2-3 minutes)

3. **Get API Keys**
   - Go to **Settings** → **API**
   - Copy these values:
     - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
     - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

4. **Configure `.env.local`**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

### Step 2: Create Database Tables

Go to **SQL Editor** in Supabase Dashboard and run these queries:

**Create users table:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

**Create books table:**
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

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
```

**Create orders table:**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  total DECIMAL(12, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
```

**Create order_items table:**
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
```

### Step 3: Add Sample Data (Optional)

```sql
-- Insert sample books
INSERT INTO books (title, author, price, description, category, stock, rating) VALUES
  ('The Great Gatsby', 'F. Scott Fitzgerald', 12.99, 'A classic novel of the Jazz Age', 'Fiction', 50, 4.5),
  ('1984', 'George Orwell', 13.99, 'A dystopian social science fiction novel', 'Fiction', 30, 4.7),
  ('Clean Code', 'Robert C. Martin', 34.99, 'A guide to writing better code', 'Technology', 25, 4.8),
  ('To Kill a Mockingbird', 'Harper Lee', 11.99, 'A classic American novel', 'Fiction', 40, 4.6),
  ('The Catcher in the Rye', 'J.D. Salinger', 10.99, 'A novel about adolescent alienation', 'Fiction', 35, 4.4);
```

## API Endpoints

### Authentication

#### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response (201):
{
  "message": "Đăng ký thành công",
  "token": "jwt_token_here",
  "user": {
    "id": "uuid-here",
    "email": "newuser@example.com",
    "fullName": "John Doe"
  }
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Đăng nhập thành công",
  "token": "jwt_token_here",
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

### Books

#### Get All Books
```bash
GET /api/books?category=Fiction&limit=20&offset=0

Response (200):
{
  "books": [
    {
      "id": "uuid-here",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "price": 12.99,
      "description": "A classic novel...",
      "image_url": null,
      "stock": 50,
      "category": "Fiction",
      "rating": 4.5,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 5,
    "limit": 20,
    "offset": 0
  }
}
```

#### Get Single Book
```bash
GET /api/books/uuid-here

Response (200):
{
  "id": "uuid-here",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 12.99,
  "description": "A classic novel...",
  "image_url": null,
  "stock": 50,
  "category": "Fiction",
  "rating": 4.5,
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### Create Book (Admin Only)
```bash
POST /api/books
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "title": "New Book",
  "author": "Author Name",
  "price": 29.99,
  "description": "Book description",
  "imageUrl": "https://example.com/image.jpg",
  "stock": 100,
  "category": "Fiction"
}

Response (201):
{
  "id": "uuid-here",
  "title": "New Book",
  "author": "Author Name",
  "price": 29.99,
  "description": "Book description",
  "image_url": "https://example.com/image.jpg",
  "stock": 100,
  "category": "Fiction",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Orders & Cart

#### Create Order (Checkout)
```bash
POST /api/cart
Content-Type: application/json

{
  "items": [
    {
      "id": "book-uuid",
      "title": "The Great Gatsby",
      "price": 12.99,
      "quantity": 2
    }
  ],
  "total": 25.98,
  "customerInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "0123456789",
    "address": "123 Main St",
    "city": "Ho Chi Minh"
  }
}

Response (201):
{
  "message": "Order created successfully",
  "order": {
    "id": "uuid-here",
    "customer_email": "john@example.com",
    "customer_name": "John Doe",
    "total": 30.98,
    "status": "pending",
    "created_at": "2024-01-01T00:00:00Z"
  }
}

## Running the Project

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env.local` file**
   ```bash
   # Copy from .env.local.example and add your Supabase keys
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your Supabase credentials.

3. **Start development server**
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:3000

4. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

## Database Schema

### users
- `id`: UUID primary key (auto-generated)
- `email`: Unique email address
- `password`: Hashed password (bcrypt)
- `full_name`: User's full name
- `created_at`: Creation timestamp

### books
- `id`: UUID primary key (auto-generated)
- `title`: Book title (required)
- `author`: Author name (required)
- `price`: Book price in USD (required, decimal)
- `description`: Book description (optional)
- `image_url`: URL to book cover (optional)
- `category`: Book category (optional)
- `stock`: Available quantity (default: 0)
- `rating`: Book rating 0-5 (optional)
- `created_at`: Creation timestamp

### orders
- `id`: UUID primary key (auto-generated)
- `user_id`: Foreign key to users (optional)
- `customer_email`: Customer email (required)
- `customer_name`: Customer full name (required)
- `address`: Delivery address (required)
- `city`: Delivery city (required)
- `total`: Order total amount (required, decimal)
- `status`: Order status (pending, completed, cancelled)
- `created_at`: Creation timestamp

### order_items
- `id`: UUID primary key (auto-generated)
- `order_id`: Foreign key to orders (on delete cascade)
- `book_id`: Foreign key to books
- `quantity`: Item quantity (required, integer)
- `price`: Price per item at purchase time (required, decimal)
- `created_at`: Creation timestamp

## Security Notes

1. **JWT Secret**: Change the `JWT_SECRET` in production to a strong random string
2. **Password Hashing**: Passwords are hashed using bcrypt with salt rounds of 10
3. **Token Expiration**: JWT tokens expire after 7 days
4. **Supabase Keys**: 
   - `NEXT_PUBLIC_*` keys can be public (used in browser)
   - `SUPABASE_SERVICE_ROLE_KEY` must be kept secret (server-side only)
5. **Row Level Security (RLS)**: Tables have RLS enabled in Supabase
   - Configure policies in Supabase Dashboard for production
6. **Rate Limiting**: Consider adding rate limiting middleware in production
7. **HTTPS**: Use HTTPS in production

## Troubleshooting

### Error: "NEXT_PUBLIC_SUPABASE_URL is not defined"
- Verify `.env.local` file exists in project root
- Check that you've copied values correctly from Supabase Dashboard
- Restart dev server after creating `.env.local`

### Error: "Invalid JWT token"
- Make sure `JWT_SECRET` matches between frontend and backend
- Check token hasn't expired (7 days)
- Verify token format: `Bearer <token>`

### Error: "User already exists"
- Email is already registered in database
- Use a different email or delete user from Supabase Dashboard

### Error: "Connection failed"
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is valid
- Ensure Supabase project is running (check Dashboard)

### Error: "Table does not exist"
- Verify all SQL queries were executed in Supabase SQL Editor
- Check table names match exactly (case-sensitive)
- Run the schema creation queries again if needed

### Supabase Dashboard Tips
- **Real-time**: Enable for specific tables in Table Settings
- **Backups**: Automatic daily backups available
- **Monitoring**: Check metrics in Supabase Dashboard
- **Logs**: View database logs for debugging

## Additional Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **bcryptjs Docs**: https://github.com/dcodeIO/bcrypt.js
- **JWT Docs**: https://jwt.io/

## Environment Variables Reference

```env
# Supabase (public, safe to expose)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Supabase (secret, server-side only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Authentication
JWT_SECRET=your-random-secret-string-here

# Application
NEXT_PUBLIC_API_URL=http://localhost:3000
```
