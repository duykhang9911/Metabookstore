'use client'
import { useCart } from '@/components/CartContext'
import { useToast } from '@/components/ToastContext'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, count } = useCart()
  const { addToast } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRemove = (id: string | number, title: string) => {
    removeFromCart(id)
    addToast(`Đã xóa "${title}"`, 'info', 2000)
  }

  const handleQuantityChange = (id: string | number, quantity: number) => {
    if (quantity <= 0) return
    updateQuantity(id, quantity)
  }

  if (!mounted) {
    return (
      <div className="max-w-2xl mx-auto px-[5%] py-32 text-center">
        <div className="text-2xl text-indigo/50">Đang tải...</div>
      </div>
    )
  }

  if (count === 0) return (
    <div className="max-w-2xl mx-auto px-[5%] py-32 text-center">
      <div className="text-6xl mb-6">🛒</div>
      <h2 className="font-display text-3xl text-navy mb-3">Giỏ hàng trống</h2>
      <p className="text-indigo/70 mb-8">Hãy thêm sách vào giỏ hàng để tiến hành mua.</p>
      <Link href="/books" className="btn-primary">Khám Phá Sách Ngay</Link>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-[5%] py-16">
      <h1 className="font-display text-4xl text-navy mb-10">Giỏ Hàng ({count} sách)</h1>

      <div className="space-y-4 mb-10">
        {cart.map(item => (
          <div key={item.id} className="card flex items-center gap-5 p-4">
            <div className="w-14 h-20 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 flex-shrink-0 flex items-center justify-center">
              <span className="text-white text-xs font-display italic text-center px-1 leading-tight">📚</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-navy">{item.title}</h3>
              <p className="text-sm text-lavender">{item.price.toLocaleString('vi-VN')} ₫</p>
              <p className="text-violet font-bold mt-1">{item.price.toLocaleString('vi-VN')} ₫ × {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-navy text-lg">{(item.price * item.quantity).toLocaleString('vi-VN')} ₫</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(item.id, item.title)}
                className="text-red-400 text-xs mt-2 hover:text-red-600 transition-colors block w-full"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <div className="flex justify-between text-lg font-semibold text-navy mb-2">
          <span>Tổng cộng:</span>
          <span className="text-violet text-2xl font-bold">{total.toLocaleString('vi-VN')} ₫</span>
        </div>
        <p className="text-indigo/60 text-sm mb-5">Phí vận chuyển sẽ được tính tại trang thanh toán</p>
        <Link href="/checkout" className="btn-primary w-full text-center py-4 text-base block">
          Tiến Hành Thanh Toán →
        </Link>
      </div>
    </div>
  )
}
