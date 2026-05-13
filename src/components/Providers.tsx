'use client'
import { CartProvider } from './CartContext'
import { WishlistProvider } from './WishlistContext'
import { RecentlyViewedProvider } from './RecentlyViewedContext'
import { ToastProvider } from './ToastContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <RecentlyViewedProvider>{children}</RecentlyViewedProvider>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  )
}
