export default function AboutPage() {
  return (
    <div>
      {/* Hero about */}
      <section className="bg-gradient-to-br from-navy via-indigo to-violet text-white px-[5%] py-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block bg-white/15 border border-white/25 rounded-full px-4 py-1 text-[0.78rem] font-bold tracking-widest uppercase text-lavender mb-5">
              👤 Về Người Phát Triển
            </span>
            <h1 className="font-display text-4xl mb-5 leading-tight">
              MetaBookstore – Dự Án Web Thương Mại Điện Tử
            </h1>
            <p className="text-white/80 leading-relaxed mb-4">
              MetaBookstore được xây dựng như một dự án học thuật ứng dụng công nghệ web hiện đại Next.js để mang lại trải nghiệm mua sách trực tuyến tốt nhất.
            </p>
            <p className="text-white/80 leading-relaxed">
              Đây là sản phẩm thể hiện khả năng áp dụng kiến thức lập trình web vào thực tế với giao diện người dùng thân thiện, hiệu suất cao và code có cấu trúc rõ ràng.
            </p>
          </div>

          {/* Info card */}
          <div className="bg-white/15 backdrop-blur border border-white/25 rounded-2xl p-8">
            {[
              { icon: '👨‍💻', label: 'Họ và Tên',        value: 'Đoàn Tương Duy Khang' },
              { icon: '🎓', label: 'Mã Số Sinh Viên',  value: '2111844'              },
              { icon: '🏫', label: 'Lớp',               value: 'CTK45A'               },
              { icon: '🛠️', label: 'Framework',         value: 'Next.js 14 (App Router)' },
              { icon: '🎨', label: 'CSS',               value: 'Tailwind CSS'          },
              { icon: '🔷', label: 'Ngôn Ngữ',          value: 'TypeScript'            },
            ].map(row => (
              <div key={row.label} className="flex gap-4 items-start mb-5 last:mb-0">
                <span className="text-xl flex-shrink-0 mt-0.5">{row.icon}</span>
                <div>
                  <div className="text-[0.72rem] uppercase tracking-widest text-white/60 mb-0.5">{row.label}</div>
                  <div className="font-semibold text-white">{row.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="max-w-4xl mx-auto px-[5%] py-20">
        <div className="text-center mb-12">
          <span className="section-tag">⚙️ Công Nghệ</span>
          <h2 className="font-display text-3xl text-navy">Stack Sử Dụng</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { name: 'Next.js 14',    desc: 'App Router, SSR',   icon: '▲', gradient: 'from-navy to-indigo' },
            { name: 'TypeScript',    desc: 'Type Safety',        icon: '🔷', gradient: 'from-indigo to-violet' },
            { name: 'Tailwind CSS',  desc: 'Utility-first CSS',  icon: '🎨', gradient: 'from-violet to-sky' },
            { name: 'React 18',      desc: 'Hooks & Context',    icon: '⚛️', gradient: 'from-sky to-lavender' },
          ].map(tech => (
            <div key={tech.name} className={`bg-gradient-to-br ${tech.gradient} rounded-2xl p-6 text-center text-white`}>
              <div className="text-3xl mb-2">{tech.icon}</div>
              <div className="font-bold mb-1">{tech.name}</div>
              <div className="text-white/70 text-xs">{tech.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-[5%] pb-20">
        <div className="text-center mb-12">
          <span className="section-tag">✅ Tính Năng</span>
          <h2 className="font-display text-3xl text-navy">Những Gì Đã Xây Dựng</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { icon: '🏠', title: 'Trang Chủ',       desc: 'Hero section, sách nổi bật, danh mục, đánh giá, newsletter' },
            { icon: '📚', title: 'Trang Sách',       desc: 'Tìm kiếm real-time, lọc theo danh mục, hiển thị dạng grid' },
            { icon: '🛒', title: 'Giỏ Hàng',         desc: 'Thêm/xóa sách, tính tổng tiền tự động với React Context' },
            { icon: '👤', title: 'Trang Giới Thiệu', desc: 'Thông tin sinh viên, tech stack, tính năng dự án' },
            { icon: '📱', title: 'Responsive',        desc: 'Giao diện tương thích mọi thiết bị từ mobile đến desktop' },
            { icon: '⚡', title: 'Hiệu Năng',        desc: 'Next.js SSR/SSG, tối ưu load time và SEO' },
          ].map(f => (
            <div key={f.title} className="card flex gap-4 p-5">
              <span className="text-2xl flex-shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-semibold text-navy mb-1">{f.title}</h3>
                <p className="text-indigo/70 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
