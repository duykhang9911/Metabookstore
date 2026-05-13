'use client'
import { useState } from 'react'
import { useToast } from './ToastContext'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      addToast('Vui lòng nhập email hợp lệ', 'error')
      return
    }

    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    addToast('Đã đăng ký nhận thông báo! 🎉', 'success')
    setEmail('')
    setLoading(false)
  }

  return (
    <section className="border-y border-lavender/20 bg-gradient-to-r from-violet/5 to-sky/5 py-16 text-center px-[5%]">
      <h2 className="font-display text-3xl text-navy mb-2">Đăng Ký Nhận Ưu Đãi</h2>
      <p className="text-indigo/70 mb-7">Nhận thông báo về sách mới và khuyến mãi hấp dẫn mỗi tuần</p>
      <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Email của bạn..."
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
          className="flex-1 px-5 py-3.5 rounded-full border-[1.5px] border-violet/20 bg-white
                     text-navy text-sm outline-none focus:border-violet transition-colors disabled:opacity-50"
        />
        <button 
          type="submit"
          disabled={loading}
          className="btn-primary whitespace-nowrap disabled:opacity-50"
        >
          {loading ? '⏳' : '📬'} {loading ? 'Đang gửi...' : 'Đăng Ký'}
        </button>
      </form>
      <p className="text-indigo/50 text-xs mt-4">
        ✓ Không spam, hủy đăng ký bất kỳ lúc nào
      </p>
    </section>
  )
}
