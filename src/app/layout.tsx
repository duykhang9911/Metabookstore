import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Breadcrumb from '@/components/Breadcrumb'
import ToastContainer from '@/components/ToastContainer'
import ScrollToTop from '@/components/ScrollToTop'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'MetaBookstore – Thế Giới Sách Của Bạn',
  description: 'Nền tảng mua bán sách trực tuyến hàng đầu Việt Nam. Hơn 50,000 đầu sách chất lượng.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          <Navbar />
          <Breadcrumb />
          <main>{children}</main>
          <ScrollToTop />
          <ToastContainer />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
