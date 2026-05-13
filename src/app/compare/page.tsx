'use client'
import { useSearchParams } from 'next/navigation'
import { books } from '@/data/books'
import Link from 'next/link'

export default function ComparisonPage() {
  const searchParams = useSearchParams()
  const ids = searchParams.get('ids')?.split(',').map(Number) || []
  
  const selectedBooks = books.filter(b => ids.includes(b.id))

  if (selectedBooks.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-[5%] py-32 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h1 className="font-display text-3xl text-navy mb-3">Không có sách để so sánh</h1>
        <p className="text-indigo/70 mb-8">Chọn ít nhất 2 cuốn sách để so sánh chúng</p>
        <Link href="/books" className="btn-primary">Khám Phá Sách</Link>
      </div>
    )
  }

  const comparisonFields = [
    { label: 'Giá', key: 'price', format: (v: any) => v.toLocaleString('vi-VN') + ' ₫' },
    { label: 'Tác Giả', key: 'author', format: (v: any) => v },
    { label: 'Danh Mục', key: 'category', format: (v: any) => v },
    { label: 'Rating', key: 'rating', format: (v: any) => '★'.repeat(v) + '☆'.repeat(5 - v) },
    { label: 'Kho', key: 'stock', format: (v: any) => v + ' cuốn' },
  ]

  return (
    <div className="max-w-full mx-auto px-[5%] py-12">
      <div className="mb-10">
        <h1 className="font-display text-4xl text-navy mb-2">So Sánh Sách</h1>
        <p className="text-indigo/70">Xem chi tiết và so sánh các sách một cách rõ ràng</p>
      </div>

      {/* Desktop Comparison Table */}
      <div className="hidden md:block overflow-x-auto card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-lavender/20">
              <th className="px-6 py-4 text-left font-semibold text-navy">Tiêu Chí</th>
              {selectedBooks.map(book => (
                <th key={book.id} className="px-6 py-4 text-left">
                  <div className={`bg-gradient-to-br ${book.gradient} aspect-video rounded-lg flex items-center justify-center p-3 mb-3`}>
                    <span className="font-display italic text-white text-center text-sm">{book.title}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFields.map(field => (
              <tr key={field.key} className="border-b border-lavender/10 hover:bg-violet/5">
                <td className="px-6 py-4 font-semibold text-navy">{field.label}</td>
                {selectedBooks.map(book => (
                  <td key={book.id} className="px-6 py-4 text-indigo/80">
                    {field.format((book as any)[field.key])}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4"></td>
              {selectedBooks.map(book => (
                <td key={book.id} className="px-6 py-4">
                  <Link href={`/books/${book.id}`} className="btn-primary text-center block">
                    Xem Chi Tiết
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Comparison */}
      <div className="md:hidden space-y-6">
        {selectedBooks.map(book => (
          <div key={book.id} className="card p-5">
            <div className={`bg-gradient-to-br ${book.gradient} aspect-video rounded-lg flex items-center justify-center p-3 mb-4`}>
              <span className="font-display italic text-white text-center text-sm">{book.title}</span>
            </div>
            <div className="space-y-3">
              {comparisonFields.map(field => (
                <div key={field.key} className="flex justify-between pb-3 border-b border-lavender/10">
                  <span className="font-semibold text-navy">{field.label}</span>
                  <span className="text-indigo/80">{field.format((book as any)[field.key])}</span>
                </div>
              ))}
              <Link href={`/books/${book.id}`} className="btn-primary text-center block mt-4">
                Xem Chi Tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
