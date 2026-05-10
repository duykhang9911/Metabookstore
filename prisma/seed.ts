import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/password';

const prisma = new PrismaClient();

async function main() {
  // Create sample books
  const books = await prisma.book.createMany({
    data: [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 12.99,
        description: 'A classic novel of wealth, love, and the American Dream',
        category: 'Fiction',
        stock: 50,
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: 14.99,
        description: 'A gripping tale of racial injustice and childhood innocence',
        category: 'Fiction',
        stock: 40,
      },
      {
        title: '1984',
        author: 'George Orwell',
        price: 13.99,
        description: 'A dystopian novel about totalitarianism and surveillance',
        category: 'Fiction',
        stock: 35,
      },
      {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        price: 18.99,
        description: 'A brief history of humankind',
        category: 'Non-Fiction',
        stock: 45,
      },
      {
        title: 'Educated',
        author: 'Tara Westover',
        price: 17.99,
        description: 'A memoir about education and family',
        category: 'Non-Fiction',
        stock: 30,
      },
    ],
  });

  // Create sample admin user
  const hashedPassword = await hashPassword('admin123');
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
      cart: {
        create: {},
      },
    },
  });

  // Create sample regular user
  const userPassword = await hashPassword('user123');
  const regularUser = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: userPassword,
      name: 'Test User',
      role: 'user',
      cart: {
        create: {},
      },
    },
  });

  console.log('Seed data created successfully!');
  console.log('Sample users:');
  console.log('Admin - email: admin@example.com, password: admin123');
  console.log('User - email: user@example.com, password: user123');
  console.log(`Created ${books.count} books`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
