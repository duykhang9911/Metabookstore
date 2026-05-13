import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy text-white px-[5%] pt-12 pb-7">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-9 border-b border-white/10 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet to-sky grid place-items-center text-base">📚</div>
            <span className="font-display font-bold text-xl text-lavender">MetaBookstore</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Nền tảng mua bán sách trực tuyến hàng đầu Việt Nam. Hơn 50,000 đầu sách, giao hàng toàn quốc, cam kết chính hãng 100%.
          </p>
        </div>

        {[
          {
            title: 'Danh Mục',
            links: ['Văn Học', 'Kỹ Năng Sống', 'Khoa Học', 'Thiếu Nhi'],
          },
          {
            title: 'Hỗ Trợ',
            links: [
              { name: 'Chính Sách Đổi Trả', href: '#' },
              { name: 'Theo Dõi Đơn Hàng', href: '#' },
              { name: 'FAQ', href: '/faq' },
              { name: 'Liên Hệ', href: '#' },
            ],
          },
          {
            title: 'Về Chúng Tôi',
            links: ['Giới Thiệu', 'Blog Đọc Sách', 'Tuyển Dụng', 'Điều Khoản'],
          },
        ].map(col => (
          <div key={col.title}>
            <h4 className="text-[0.8rem] font-bold tracking-widest uppercase text-lavender mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map(l => {
                const href = typeof l === 'string' ? '#' : l.href
                const name = typeof l === 'string' ? l : l.name
                return (
                  <li key={name}>
                    <Link href={href} className="text-[0.87rem] text-white/60 no-underline hover:text-lavender transition-colors">
                      {name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-3">
        <p className="text-[0.8rem] text-white/40">
          © 2025 MetaBookstore · Đoàn Tương Duy Khang · MSSV: 2111844 · Lớp CTK45A
        </p>
        <div className="flex gap-3">
          {['f', 'in', 'tw'].map(s => (
            <a
              key={s}
              href="#"
              className="w-8 h-8 rounded-full bg-white/8 border border-white/12 grid place-items-center
                         text-white text-[0.8rem] no-underline hover:bg-violet transition-colors"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
