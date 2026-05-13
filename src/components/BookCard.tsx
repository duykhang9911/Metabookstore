'use client'
import { Book } from '@/data/books'
import { useCart } from './CartContext'
import { useWishlist } from './WishlistContext'
import { useToast } from './ToastContext'
import { useState } from 'react'
import Link from 'next/link'

export default function BookCard({ book }: { book: Book }) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToast } = useToast()
  const [added, setAdded] = useState(false)
  const inWishlist = isInWishlist(book.id)

  const handleAdd = () => {
    addToCart(book)
    setAdded(true)
    addToast(`Đã thêm "${book.title}" vào giỏ hàng!`, 'success', 2000)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(book.id)
      addToast('Đã xóa khỏi danh sách yêu thích', 'info', 1500)
    } else {
      addToWishlist(book)
      addToast('Đã thêm vào danh sách yêu thích!', 'success', 1500)
    }
  }

  return (
    <div className="card overflow-hidden cursor-pointer group relative">
      {/* Cover */}
      <Link href={`/books/${book.id}`}>
        <div className={`h-48 bg-gradient-to-br ${book.gradient} flex items-center justify-center p-5 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <span className="relative z-10 font-display italic text-white text-center text-sm leading-snug">
            {book.title}
          </span>
          
          {/* Wishlist button - appears on hover */}
          <button
            onClick={(e) => {
              e.preventDefault()
              handleWishlist()
            }}
            className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
          >
            <span className="text-lg">{inWishlist ? '❤️' : '🤍'}</span>
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-[0.72rem] font-bold tracking-widest uppercase text-violet mb-1">
          {book.category}
        </p>
        <Link href={`/books/${book.id}`} className="no-underline">
          <h3 className="font-semibold text-navy text-[0.97rem] leading-snug mb-0.5 hover:text-violet transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-[0.83rem] text-lavender mb-1">{book.author}</p>
        <div className="text-yellow-400 text-xs mb-3">
          {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-violet text-lg">
            {book.price.toLocaleString('vi-VN')} ₫
          </span>
          <button
            onClick={handleAdd}
            className={`w-8 h-8 rounded-full text-white text-xl font-bold grid place-items-center
                        transition-all duration-200
                        ${added
                          ? 'bg-green-500 scale-110'
                          : 'bg-gradient-to-br from-violet to-indigo hover:scale-110'
                        }`}
          >
            {added ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  )
}
