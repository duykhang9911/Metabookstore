import Link from 'next/link'
import BookCard from '@/components/BookCard'
import { books, categories } from '@/data/books'

export default function HomePage() {
  const featured = books.slice(0, 6)

  return (
    <>
      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-[5%] py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-violet/10 border border-violet/25 px-4 py-1.5 rounded-full mb-5">
            <span className="badge-dot" />
            <span className="text-[0.78rem] font-bold tracking-widest uppercase text-violet">
              Thế Giới Sách Số #1 Việt Nam
            </span>
          </div>
          <h1 className="font-display text-5xl leading-tight text-navy mb-5">
            Khám Phá{' '}
            <span className="text-violet italic">Tri Thức</span>{' '}
            Không Giới Hạn
          </h1>
          <p className="text-indigo/80 text-lg leading-relaxed mb-9 max-w-lg">
            MetaBookstore – nơi hàng nghìn tựa sách chất lượng hội tụ. Từ văn học kinh điển đến công nghệ hiện đại, chúng tôi mang đến hành trình đọc sách tuyệt vời nhất.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/books" className="btn-primary">Khám Phá Ngay</Link>
            <Link href="#categories" className="btn-outline">Xem Danh Mục</Link>
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative h-80 flex items-center justify-center">
          {[
            { title: 'Nhà Giả Kim',       rotate: '-rotate-6',  z: 'z-30', gradient: 'from-violet to-lavender',  left: '15%', top: '10%' },
            { title: 'Atomic Habits',      rotate: 'rotate-4',   z: 'z-20', gradient: 'from-sky to-indigo',       left: '30%', top: '20%' },
            { title: 'Deep Work',          rotate: '-rotate-12', z: 'z-10', gradient: 'from-lavender to-violet',  left: '10%', top: '30%' },
          ].map((b, i) => (
            <div
              key={i}
              className={`absolute w-36 h-52 ${b.rotate} ${b.z} bg-gradient-to-br ${b.gradient}
                          rounded-r-xl shadow-xl flex items-end p-3 cursor-pointer
                          transition-transform duration-300 hover:-translate-y-3`}
              style={{ left: b.left, top: b.top }}
            >
              <span className="font-display italic text-white text-xs leading-snug">{b.title}</span>
            </div>
          ))}

          {/* Floating tags */}
          {[
            { text: '⭐ 4.9 / 5.0',    pos: 'top-0 right-0'      },
            { text: '🚀 Giao Nhanh 2H', pos: 'bottom-4 right-4'   },
            { text: '📦 Miễn Phí Ship', pos: 'bottom-16 left-0'   },
          ].map((t, i) => (
            <div
              key={i}
              className={`absolute ${t.pos} bg-white text-indigo text-xs font-semibold
                          px-3 py-2 rounded-2xl shadow-lg
                          shadow-violet/20 animate-bounce`}
              style={{ animationDelay: `${i * 0.5}s`, animationDuration: '3s' }}
            >
              {t.text}
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="bg-gradient-to-r from-indigo to-violet py-8 px-[5%]">
        <div className="max-w-4xl mx-auto flex justify-around flex-wrap gap-5">
          {[
            { num: '50,000+', label: 'Đầu Sách'    },
            { num: '120K+',   label: 'Khách Hàng'  },
            { num: '98%',     label: 'Hài Lòng'    },
            { num: '200+',    label: 'Nhà Xuất Bản' },
          ].map(s => (
            <div key={s.label} className="text-center text-white">
              <div className="font-display text-4xl font-bold">{s.num}</div>
              <div className="text-sm opacity-80 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED BOOKS ── */}
      <section id="books" className="max-w-6xl mx-auto px-[5%] py-20">
        <div className="text-center mb-12">
          <span className="section-tag">📖 Nổi Bật Tuần Này</span>
          <h2 className="font-display text-4xl text-navy mb-3">Sách Bán Chạy Nhất</h2>
          <p className="text-indigo/70 max-w-lg mx-auto">Những tựa sách được độc giả yêu thích và đánh giá cao nhất tháng này</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {featured.map(book => <BookCard key={book.id} book={book} />)}
        </div>
        <div className="text-center mt-10">
          <Link href="/books" className="btn-outline">Xem Tất Cả Sách →</Link>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="max-w-6xl mx-auto px-[5%] pb-20">
        <div className="text-center mb-12">
          <span className="section-tag">📂 Danh Mục</span>
          <h2 className="font-display text-4xl text-navy mb-3">Khám Phá Theo Thể Loại</h2>
          <p className="text-indigo/70">Hàng chục danh mục phong phú, luôn có cuốn sách dành riêng cho bạn</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map(cat => (
            <div
              key={cat.name}
              className={`bg-gradient-to-br ${cat.gradient} rounded-2xl p-6 text-center
                          cursor-pointer transition-all duration-300 hover:-translate-y-2
                          hover:shadow-[0_16px_48px_rgba(59,63,160,0.25)]`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-semibold text-white text-sm mb-1">{cat.name}</div>
              <div className="text-white/70 text-xs">{cat.count.toLocaleString()} đầu sách</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="max-w-6xl mx-auto px-[5%] pb-20">
        <div className="text-center mb-12">
          <span className="section-tag">💬 Đánh Giá</span>
          <h2 className="font-display text-4xl text-navy mb-3">Độc Giả Nói Gì?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Nguyễn Lan Anh', role: 'Giáo viên',        init: 'NL', text: 'MetaBookstore là nơi tôi tin tưởng mua sách nhất. Hàng chính hãng, giao nhanh và dịch vụ chăm sóc khách hàng rất tận tâm. Tôi đã mua hơn 50 cuốn tại đây!' },
            { name: 'Trần Minh Khôi', role: 'Sinh viên CNTT',   init: 'TM', text: 'Giao diện web rất đẹp, tìm sách cực kỳ dễ. Đặc biệt là giá cả hợp lý, thường xuyên có ưu đãi. Mình rất hài lòng và sẽ giới thiệu cho bạn bè!' },
            { name: 'Phạm Hoàng Nam', role: 'Kỹ sư phần mềm',  init: 'PH', text: 'Kho sách phong phú, từ kinh điển đến sách mới nhất. Tìm được nhiều cuốn hiếm mà chỗ khác không có. MetaBookstore xứng đáng là nhà sách số 1!' },
          ].map(r => (
            <div key={r.name} className="card p-6">
              <div className="text-lavender text-4xl leading-none mb-3">"</div>
              <p className="text-indigo/80 text-sm leading-relaxed mb-5">{r.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet to-sky grid place-items-center text-white text-sm font-bold">
                  {r.init}
                </div>
                <div>
                  <div className="font-semibold text-navy text-sm">{r.name}</div>
                  <div className="text-yellow-400 text-xs">★★★★★ · {r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="border-y border-lavender/20 bg-gradient-to-r from-violet/5 to-sky/5 py-16 text-center px-[5%]">
        <h2 className="font-display text-3xl text-navy mb-2">Đăng Ký Nhận Ưu Đãi</h2>
        <p className="text-indigo/70 mb-7">Nhận thông báo về sách mới và khuyến mãi hấp dẫn mỗi tuần</p>
        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email của bạn..."
            className="flex-1 px-5 py-3.5 rounded-full border-[1.5px] border-violet/20 bg-white
                       text-navy text-sm outline-none focus:border-violet transition-colors"
          />
          <button className="btn-primary whitespace-nowrap">Đăng Ký</button>
        </div>
      </section>
    </>
  )
}
