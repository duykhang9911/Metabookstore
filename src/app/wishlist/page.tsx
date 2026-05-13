'use client'
import { useWishlist } from '@/components/WishlistContext'
import { useCart } from '@/components/CartContext'
import Link from 'next/link'
import BookCard from '@/components/BookCard'

export default function WishlistPage() {
  const { wishlist, count } = useWishlist()
  const { addToCart } = useCart()

  if (count === 0) return (
    <div className="max-w-2xl mx-auto px-[5%] py-32 text-center">
      <div className="text-6xl mb-6">🤍</div>
      <h2 className="font-display text-3xl text-navy mb-3">Chưa có sách yêu thích</h2>
      <p className="text-indigo/70 mb-8">Hãy thêm các sách bạn yêu thích vào danh sách này.</p>
      <Link href="/books" className="btn-primary">Khám Phá Sách Ngay</Link>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-[5%] py-16">
      <div className="text-center mb-12">
        <span className="section-tag">❤️ Danh Sách Yêu Thích</span>
        <h1 className="font-display text-4xl text-navy mb-3">Sách Yêu Thích ({count})</h1>
        <p className="text-indigo/70">Những cuốn sách bạn đánh dấu để xem sau</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map(book => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  )
}
