import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-[5%] py-32 text-center">
      <div className="mb-8">
        <div className="text-8xl font-display font-bold text-violet mb-4">404</div>
        <h1 className="font-display text-4xl text-navy mb-4">Không Tìm Thấy Trang</h1>
        <p className="text-indigo/70 text-lg mb-8">
          Rất tiếc, trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
      </div>

      <div className="bg-gradient-to-br from-violet/5 to-sky/5 rounded-2xl p-12 mb-8">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-indigo/60 mb-6">
          Có thể bạn muốn:
        </p>
        <ul className="text-left max-w-sm mx-auto space-y-2 text-indigo/70">
          <li>✓ Quay lại trang chủ</li>
          <li>✓ Khám phá danh sách sách</li>
          <li>✓ Tìm kiếm sách cụ thể</li>
          <li>✓ Xem danh mục sách</li>
        </ul>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/" className="btn-primary">
          🏠 Trang Chủ
        </Link>
        <Link href="/books" className="btn-outline">
          📚 Tất Cả Sách
        </Link>
      </div>

      <div className="mt-12 pt-8 border-t border-lavender/20">
        <p className="text-indigo/60 text-sm mb-4">Cần hỗ trợ?</p>
        <Link href="/faq" className="text-violet hover:text-indigo transition-colors">
          Xem Câu Hỏi Thường Gặp → 
        </Link>
      </div>
    </div>
  )
}
