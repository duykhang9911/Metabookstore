import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractToken } from '@/lib/jwt';

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get('category');
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '20');
    const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0');

    const where = category ? { category } : {};

    const books = await prisma.book.findMany({
      where,
      take: limit,
      skip: offset,
    });

    const total = await prisma.book.count({ where });

    return NextResponse.json({
      books,
      pagination: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Get books error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const token = extractToken(req.headers.get('authorization'));
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { title, author, price, description, imageUrl, stock, category } = await req.json();

    if (!title || !author || price === undefined) {
      return NextResponse.json(
        { error: 'Title, author, and price are required' },
        { status: 400 }
      );
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        price,
        description,
        imageUrl,
        stock: stock || 0,
        category,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error('Create book error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
