import { supabaseServer } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const bookId = req.nextUrl.searchParams.get('bookId');
  const supabase = supabaseServer();
  let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });
  if (bookId) query = query.eq('book_id', bookId);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const { book_id, user_id, rating, comment } = await req.json();
    if (!book_id || !user_id || !rating) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 });
    }
    const supabase = supabaseServer();
    const { data, error } = await supabase.from('reviews').insert([
      { book_id, user_id, rating, comment, created_at: new Date().toISOString() }
    ]).select('*').single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
