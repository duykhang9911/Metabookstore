'use client'
import { useState } from 'react'

const faqs = [
  {
    q: 'Phí vận chuyển là bao nhiêu?',
    a: 'Chúng tôi cung cấp vận chuyển miễn phí cho các đơn đặt hàng trên 200,000 ₫. Các đơn hàng dưới số tiền này sẽ có phí vận chuyển từ 20,000 ₫ tùy thuộc vào khu vực.',
  },
  {
    q: 'Chính sách đổi trả là gì?',
    a: 'Chúng tôi cung cấp chính sách đổi trả 30 ngày không có câu hỏi. Nếu bạn không hài lòng với sách, chúng tôi sẽ hoàn lại tiền hoặc trao đổi nó miễn phí.',
  },
  {
    q: 'Thời gian giao hàng dự kiến là bao lâu?',
    a: 'Đối với thành phố lớn, chúng tôi cung cấp giao hàng trong vòng 24-48 giờ. Đối với các tỉnh, thời gian giao hàng thường là 3-5 ngày tùy vào vị trí.',
  },
  {
    q: 'Tất cả sách có phải là bản chính hãng không?',
    a: 'Vâng, chúng tôi cam kết 100% sách chính hãng. Tất cả sách được mua trực tiếp từ các nhà xuất bản và nhà phân phối uy tín.',
  },
  {
    q: 'Làm thế nào để tôi theo dõi đơn hàng của mình?',
    a: 'Sau khi đặt hàng, bạn sẽ nhận được email xác nhận với mã theo dõi. Bạn có thể sử dụng mã này để theo dõi gói hàng của mình trên website của chúng tôi hoặc trên trang web của nhà cung cấp vận chuyển.',
  },
  {
    q: 'Tôi có thể hủy đơn hàng của mình không?',
    a: 'Bạn có thể hủy đơn hàng trong vòng 2 giờ sau khi đặt hàng. Sau thời gian này, đơn hàng sẽ được xử lý và không thể hủy. Vui lòng liên hệ bộ phận hỗ trợ khách hàng của chúng tôi để được trợ giúp.',
  },
  {
    q: 'Bạn có chấp nhận thanh toán bằng các phương thức nào?',
    a: 'Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng, ví điện tử (Momo, ZaloPay) và thanh toán khi nhận hàng.',
  },
  {
    q: 'Làm thế nào để liên hệ với dịch vụ hỗ trợ khách hàng?',
    a: 'Bạn có thể liên hệ chúng tôi qua email support@metabookstore.com, số điện thoại 1800-1234 (miễn phí) hoặc qua live chat trên website.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-[5%] py-16">
      <div className="text-center mb-12">
        <span className="section-tag">❓ Câu Hỏi Thường Gặp</span>
        <h1 className="font-display text-4xl text-navy mb-3">FAQ - Những Câu Hỏi Thường Gặp</h1>
        <p className="text-indigo/70">Tìm câu trả lời cho các câu hỏi phổ biến về dịch vụ của chúng tôi</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="card overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-violet/5 transition-colors"
            >
              <h3 className="font-semibold text-navy text-left">{faq.q}</h3>
              <span className={`text-2xl text-violet transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {openIndex === i && (
              <div className="px-6 pb-4 border-t border-lavender/20 pt-4">
                <p className="text-indigo/80 leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="font-display text-2xl text-navy mb-4">Không tìm thấy câu trả lời?</h3>
        <p className="text-indigo/70 mb-6">Liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi</p>
        <button className="btn-primary">📞 Liên Hệ Chúng Tôi</button>
      </div>
    </div>
  )
}
