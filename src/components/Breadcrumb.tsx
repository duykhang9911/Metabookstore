'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumb() {
  const pathname = usePathname()
  
  if (pathname === '/') return null

  const paths = pathname.split('/').filter(Boolean)
  
  const breadcrumbs = [
    { name: 'Trang Chủ', href: '/' },
    ...paths.map((path, i) => ({
      name: path.charAt(0).toUpperCase() + path.slice(1),
      href: '/' + paths.slice(0, i + 1).join('/'),
      isCurrent: i === paths.length - 1
    }))
  ]

  return (
    <nav className="max-w-6xl mx-auto px-[5%] py-3 text-sm">
      <div className="flex items-center gap-2">
        {breadcrumbs.map((item, i) => (
          <div key={item.href} className="flex items-center gap-2">
            {i > 0 && <span className="text-lavender">/</span>}
            {item.isCurrent ? (
              <span className="text-indigo font-medium">{item.name}</span>
            ) : (
              <Link href={item.href} className="text-violet hover:text-indigo no-underline transition-colors">
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
