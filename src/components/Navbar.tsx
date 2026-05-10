'use client'
import Link from 'next/link'
import { useCart } from './CartContext'

export default function Navbar() {
  const { count } = useCart()

  return (
    <nav className="sticky top-0 z-50 bg-white/65 backdrop-blur-lg border-b border-violet/15 px-[5%] flex items-center justify-between h-[68px]">
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <div className="w-[38px] h-[38px] rounded-xl bg-gradient-to-br from-violet to-sky grid place-items-center text-white text-lg">
          📚
        </div>
        <span className="font-display font-bold text-2xl text-navy">MetaBookstore</span>
      </Link>

      <ul className="hidden md:flex gap-8 list-none">
        {[
          { href: '/#books',      label: 'Sách Mới'    },
          { href: '/#categories', label: 'Danh Mục'    },
          { href: '/books',       label: 'Tất Cả Sách' },
          { href: '/about',       label: 'Giới Thiệu'  },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-[0.93rem] font-medium text-indigo no-underline
                         relative after:absolute after:bottom-[-2px] after:left-0 after:right-0
                         after:h-0.5 after:bg-gradient-to-r after:from-violet after:to-sky
                         after:rounded-full after:scale-x-0 after:transition-transform
                         hover:text-violet hover:after:scale-x-100"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/cart"
        className="bg-gradient-to-br from-violet to-indigo text-white text-sm font-semibold
                   px-5 py-2.5 rounded-full no-underline transition-all duration-200
                   hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(108,92,231,0.4)]"
      >
        🛒 Giỏ Hàng {count > 0 && <span className="ml-1">({count})</span>}
      </Link>
    </nav>
  )
}
