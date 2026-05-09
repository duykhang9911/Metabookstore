'use client'
import { useCart } from '@/components/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeFromCart, total, count } = useCart()

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
        {items.map(item => (
          <div key={item.id} className="card flex items-center gap-5 p-4">
            <div className={`w-14 h-20 rounded-lg bg-gradient-to-br ${item.gradient} flex-shrink-0 flex items-center justify-center`}>
              <span className="text-white text-xs font-display italic text-center px-1 leading-tight">{item.title}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-navy">{item.title}</h3>
              <p className="text-sm text-lavender">{item.author}</p>
              <p className="text-violet font-bold mt-1">{item.price.toLocaleString('vi-VN')} ₫ × {item.qty}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-navy text-lg">{(item.price * item.qty).toLocaleString('vi-VN')} ₫</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 text-xs mt-1 hover:text-red-600 transition-colors"
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
        <p className="text-indigo/60 text-sm mb-5">Miễn phí vận chuyển cho đơn hàng trên 200,000 ₫</p>
        <button className="btn-primary w-full text-center py-4 text-base">
          Tiến Hành Thanh Toán →
        </button>
      </div>
    </div>
  )
}
