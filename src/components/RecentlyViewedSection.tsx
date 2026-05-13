'use client'
import { useRecentlyViewed } from '@/components/RecentlyViewedContext'
import BookCard from '@/components/BookCard'
import Link from 'next/link'

export default function RecentlyViewedSection() {
  const { recentlyViewed } = useRecentlyViewed()

  if (recentlyViewed.length === 0) {
    return null
  }

  return (
    <section className="max-w-6xl mx-auto px-[5%] py-20">
      <div className="text-center mb-12">
        <span className="section-tag">👁️ Đã Xem Gần Đây</span>
        <h2 className="font-display text-4xl text-navy mb-3">Sách Bạn Đã Xem</h2>
        <p className="text-indigo/70 max-w-lg mx-auto">Những cuốn sách bạn vừa xem lại gần đây</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {recentlyViewed.map(book => <BookCard key={book.id} book={book} />)}
      </div>
    </section>
  )
}
