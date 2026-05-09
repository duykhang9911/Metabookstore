# MetaBookStore - Backend Setup Guide

## Database Setup

### Prerequisites
- PostgreSQL 12 or higher
- Node.js 18 or higher

### Step 1: Set Up PostgreSQL Database

1. **Install PostgreSQL** (if not already installed)
   - Windows: Download from https://www.postgresql.org/download/windows/
   - macOS: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`

2. **Create a new database**
   ```bash
   psql -U postgres
   CREATE DATABASE metabookstore;
   ```

3. **Configure your `.env.local` file**
   ```
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/metabookstore"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

### Step 2: Set Up Prisma

1. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

2. **Run migrations**
   ```bash
   npm run prisma:migrate
   ```
   This will:
   - Create all database tables based on the schema
   - Generate the Prisma client

3. **Seed sample data (optional)**
   ```bash
   npm run prisma:seed
   ```
   This creates:
   - 5 sample books
   - Admin user: admin@example.com / admin123
   - Regular user: user@example.com / user123

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
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "newuser@example.com",
    "name": "John Doe",
    "role": "user"
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
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Test User",
    "role": "user"
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
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "price": 12.99,
      "description": "A classic novel...",
      "imageUrl": null,
      "stock": 50,
      "category": "Fiction",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 5,
    "limit": 20,
    "offset": 0
  }
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
  "id": 6,
  "title": "New Book",
  "author": "Author Name",
  "price": 29.99,
  ...
}
```

### Cart

#### Get Cart
```bash
GET /api/cart
Authorization: Bearer jwt_token_here

Response (200):
{
  "cart": {
    "id": 1,
    "userId": 1,
    "items": [
      {
        "id": 1,
        "cartId": 1,
        "bookId": 1,
        "quantity": 2,
        "book": {
          "id": 1,
          "title": "The Great Gatsby",
          "price": 12.99,
          ...
        }
      }
    ]
  },
  "total": 25.98
}
```

#### Add to Cart
```bash
POST /api/cart
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "bookId": 1,
  "quantity": 2
}

Response (201):
{
  "id": 1,
  "cartId": 1,
  "bookId": 1,
  "quantity": 2,
  "book": {
    "id": 1,
    "title": "The Great Gatsby",
    "price": 12.99,
    ...
  }
}
```

#### Update Cart Item
```bash
PUT /api/cart/1
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "quantity": 5
}

Response (200):
{
  "id": 1,
  "cartId": 1,
  "bookId": 1,
  "quantity": 5,
  "book": {...}
}
```

#### Remove from Cart
```bash
DELETE /api/cart/1
Authorization: Bearer jwt_token_here

Response (200):
{
  "success": true
}
```

## Running the Project

1. **Start development server**
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:3000

2. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

## Database Schema

### Users
- `id`: Auto-incrementing primary key
- `email`: Unique email address
- `password`: Hashed password (bcrypt)
- `name`: User's name
- `role`: "user" or "admin"
- `createdAt`, `updatedAt`: Timestamps

### Books
- `id`: Auto-incrementing primary key
- `title`: Book title
- `author`: Author name
- `price`: Book price (Float)
- `description`: Book description
- `imageUrl`: URL to book cover image
- `stock`: Available quantity
- `category`: Book category
- `createdAt`, `updatedAt`: Timestamps

### Carts
- `id`: Auto-incrementing primary key
- `userId`: Foreign key to User (unique, one cart per user)
- `createdAt`, `updatedAt`: Timestamps

### CartItems
- `id`: Auto-incrementing primary key
- `cartId`: Foreign key to Cart
- `bookId`: Foreign key to Book
- `quantity`: Quantity of the book in cart
- `createdAt`, `updatedAt`: Timestamps

## Security Notes

1. **JWT Secret**: Change the `JWT_SECRET` in production to a strong random string
2. **Password Hashing**: Passwords are hashed using bcrypt with salt rounds of 10
3. **Token Expiration**: JWT tokens expire after 7 days
4. **CORS**: Configure CORS settings in production if frontend is on different domain
5. **Rate Limiting**: Consider adding rate limiting middleware in production

## Troubleshooting

### Database Connection Error
- Check PostgreSQL is running: `sudo service postgresql status`
- Verify DATABASE_URL in .env.local is correct
- Check PostgreSQL user exists: `sudo -u postgres psql`

### Prisma Client Error
- Run `npm run prisma:generate` to regenerate Prisma client
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Migration Issues
- Reset database: `npx prisma migrate reset` (WARNING: This deletes all data)
- Check for pending migrations: `npx prisma migrate status`
