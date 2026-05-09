'use client'
import { Book } from '@/data/books'
import { useCart } from './CartContext'
import { useState } from 'react'

export default function BookCard({ book }: { book: Book }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(book)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="card overflow-hidden cursor-pointer">
      {/* Cover */}
      <div className={`h-48 bg-gradient-to-br ${book.gradient} flex items-center justify-center p-5 relative`}>
        <div className="absolute inset-0 bg-black/10" />
        <span className="relative z-10 font-display italic text-white text-center text-sm leading-snug">
          {book.title}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[0.72rem] font-bold tracking-widest uppercase text-violet mb-1">
          {book.category}
        </p>
        <h3 className="font-semibold text-navy text-[0.97rem] leading-snug mb-0.5">
          {book.title}
        </h3>
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
