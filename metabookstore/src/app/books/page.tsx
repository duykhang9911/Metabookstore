'use client'
import { useState } from 'react'
import BookCard from '@/components/BookCard'
import { books, categories } from '@/data/books'

export default function BooksPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tất Cả')

  const allCategories = ['Tất Cả', ...categories.map(c => c.name)]

  const filtered = books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
                        b.author.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'Tất Cả' || b.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div className="max-w-6xl mx-auto px-[5%] py-16">
      <div className="text-center mb-12">
        <span className="section-tag">📚 Thư Viện</span>
        <h1 className="font-display text-4xl text-navy mb-3">Tất Cả Sách</h1>
        <p className="text-indigo/70">Khám phá kho sách phong phú với hàng nghìn đầu sách chất lượng</p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-8">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lavender">🔍</span>
        <input
          type="text"
          placeholder="Tìm tên sách, tác giả..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-12 pr-5 py-4 rounded-full border-[1.5px] border-violet/20 bg-white
                     text-navy outline-none focus:border-violet transition-colors shadow-sm text-sm"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                        ${activeCategory === cat
                          ? 'bg-gradient-to-r from-violet to-indigo text-white shadow-md'
                          : 'bg-white text-indigo border border-violet/20 hover:border-violet'
                        }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-indigo/60 text-sm mb-6">
        Hiển thị {filtered.length} / {books.length} cuốn sách
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(book => <BookCard key={book.id} book={book} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-indigo/50">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-lg">Không tìm thấy sách phù hợp.</p>
        </div>
      )}
    </div>
  )
}
