import { supabaseServer } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = supabaseServer()

    const { data: book, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error || !book) {
      return NextResponse.json(
        { message: 'Sách không tìm thấy' },
        { status: 404 }
      )
    }

    return NextResponse.json(book)
  } catch (error) {
    return NextResponse.json(
      { message: 'Lỗi server' },
      { status: 500 }
    )
  }
}
