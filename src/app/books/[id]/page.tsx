'use client'
import { books } from '@/data/books'
import { useCart } from '@/components/CartContext'
import { useWishlist } from '@/components/WishlistContext'
import { useRecentlyViewed } from '@/components/RecentlyViewedContext'
import { useToast } from '@/components/ToastContext'
import BookCard from '@/components/BookCard'
import ShareButton from '@/components/ShareButton'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const reviews = [
  {
    author: 'Nguyễn Văn A',
    rating: 5,
    text: 'Tuyệt vời! Sách rất chất lượng và giao hàng nhanh chóng.',
    date: '2 tuần trước',
  },
  {
    author: 'Trần Thị B',
    rating: 5,
    text: 'Đóng gói cẩn thận, nội dung hay, chắc chắn sẽ mua lại!',
    date: '1 tháng trước',
  },
  {
    author: 'Phạm Văn C',
    rating: 4,
    text: 'Sách đẹp nhưng giá hơi cao một chút so với trang khác.',
    date: '1 tháng trước',
  },
]

export default function BookDetailPage() {
  const params = useParams()
  const bookId = parseInt(params.id as string)
  const book = books.find(b => b.id === bookId)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToRecentlyViewed } = useRecentlyViewed()
  const [added, setAdded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (book) {
      addToRecentlyViewed(book)
    }
  }, [bookId, book, addToRecentlyViewed])

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-[5%] py-32 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h1 className="font-display text-3xl text-navy mb-3">Không tìm thấy sách</h1>
        <Link href="/books" className="btn-primary">Quay Lại Trang Sách</Link>
      </div>
    )
  }

  const relatedBooks = books.filter(b => b.category === book.category && b.id !== book.id).slice(0, 4)
  const inWishlist = mounted ? isInWishlist(book.id) : false
  const { addToast } = useToast()

  const handleAddToCart = () => {
    addToCart(book)
    setAdded(true)
    addToast(`Đã thêm "${book.title}" vào giỏ hàng!`, 'success')
    setTimeout(() => setAdded(false), 1500)
  }

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(book.id)
    } else {
      addToWishlist(book)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-[5%] py-12">
      {/* Book Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Book Cover */}
        <div className="md:col-span-1">
          <div className={`bg-gradient-to-br ${book.gradient} aspect-video rounded-2xl shadow-xl flex items-center justify-center p-6 mb-6`}>
            <span className="font-display italic text-white text-center text-3xl">{book.title}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 rounded-full font-semibold text-white transition-all duration-200
                          ${added
                            ? 'bg-green-500'
                            : 'bg-gradient-to-br from-violet to-indigo hover:shadow-lg'
                          }`}
            >
              {added ? '✓ Thêm Vào Giỏ' : '+ Thêm Vào Giỏ'}
            </button>
            <button
              onClick={handleWishlist}
              className="px-4 py-3 rounded-full border-2 border-violet text-violet hover:bg-violet hover:text-white transition-all"
              title={inWishlist ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
            >
              {inWishlist ? '❤️' : '🤍'}
            </button>
          </div>
        </div>

        {/* Book Info */} flex items-start justify-between">
            <div>
              <span className="inline-block bg-violet/10 text-violet px-3 py-1 rounded-full text-xs font-bold mb-3">
                {book.category}
              </span>
              <h1 className="font-display text-4xl text-navy mb-2">{book.title}</h1>
              <p className="text-xl text-lavender font-medium mb-3">Tác giả: {book.author}</p>
            </div>
            <ShareButton title={book.title} author={book.author} /
            <h1 className="font-display text-4xl text-navy mb-2">{book.title}</h1>
            <p className="text-xl text-lavender font-medium mb-3">Tác giả: {book.author}</p>
          </div>

          {/* Rating */}
          <div className="mb-6 pb-6 border-b border-lavender/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-yellow-400 text-lg">
                {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
              </div>
              <span className="text-indigo font-medium">{book.rating}.0 / 5.0</span>
              <span className="text-indigo/60 text-sm">({Math.floor(Math.random() * 1000 + 200)} đánh giá)</span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-lavender/20">
            <div>
              <p className="text-indigo/60 text-sm mb-1">Giá Bán</p>
              <p className="text-3xl font-bold text-violet">{book.price.toLocaleString('vi-VN')} ₫</p>
            </div>
            <div>
              <p className="text-indigo/60 text-sm mb-1">Kho</p>
              <p className="text-2xl font-bold text-green-500">{book.stock} cuốn</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-display text-lg text-navy mb-3">Giới Thiệu</h3>
            <p className="text-indigo/80 leading-relaxed mb-4">{book.description}</p>
            <p className="text-indigo/60 text-sm">
              📦 Giao hàng miễn phí cho đơn hàng trên 200,000 ₫
              <br />
              🔄 Chính sách đổi trả 30 ngày không lý do
              <br />
              ✓ Sách chính hãng 100%
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-16 pb-16 border-b border-lavender/20">
        <h2 className="font-display text-3xl text-navy mb-8">Đánh Giá Từ Khách Hàng</h2>
        <div className="space-y-6">
          {reviews.map((review, i) => (
            <div key={i} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-navy">{review.author}</h4>
                  <p className="text-indigo/60 text-sm">{review.date}</p>
                </div>
                <div className="text-yellow-400">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <p className="text-indigo/80">{review.text}</p>
            </div>
          ))}
        </div>
        <button className="btn-outline mt-8 w-full">Xem Thêm Đánh Giá (42)</button>
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <div>
          <h2 className="font-display text-3xl text-navy mb-8">Sách Liên Quan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedBooks.map(b => <BookCard key={b.id} book={b} />)}
          </div>
        </div>
      )}
    </div>
  )
}
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
        <BookReviews bookId={book.id} />
      </div>
    </div>
  );
}
