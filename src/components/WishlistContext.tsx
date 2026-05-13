'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Book } from '@/data/books'

type WishlistContextType = {
  wishlist: Book[]
  addToWishlist: (book: Book) => void
  removeFromWishlist: (bookId: number) => void
  isInWishlist: (bookId: number) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Book[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      setWishlist(JSON.parse(saved))
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist, mounted])

  const addToWishlist = (book: Book) => {
    setWishlist(prev => {
      if (prev.find(b => b.id === book.id)) return prev
      return [...prev, book]
    })
  }

  const removeFromWishlist = (bookId: number) => {
    setWishlist(prev => prev.filter(b => b.id !== bookId))
  }

  const isInWishlist = (bookId: number) => {
    return wishlist.some(b => b.id === bookId)
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}
