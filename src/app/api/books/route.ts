import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { verify } from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get('category');
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '20');
    const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0');

    const supabase = supabaseServer();

    let query = supabase.from('books').select('*', { count: 'exact' });

    if (category) {
      query = query.eq('category', category);
    }

    const { data: books, count, error } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch books' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      books,
      pagination: {
        total: count || 0,
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
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { title, author, price, description, imageUrl, stock, category } = await req.json();

    if (!title || !author || price === undefined) {
      return NextResponse.json(
        { error: 'Title, author, and price are required' },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    const { data: book, error } = await supabase
      .from('books')
      .insert([{
        title,
        author,
        price,
        description,
        image_url: imageUrl,
        stock: stock || 0,
        category,
        created_at: new Date().toISOString(),
      }])
      .select('*')
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create book' },
        { status: 500 }
      );
    }

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error('Create book error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
