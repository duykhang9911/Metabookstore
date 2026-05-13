'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Book } from '@/data/books'

type RecentlyViewedContextType = {
  recentlyViewed: Book[]
  addToRecentlyViewed: (book: Book) => void
  count: number
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined)

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<Book[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed')
    if (saved) {
      setRecentlyViewed(JSON.parse(saved))
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))
    }
  }, [recentlyViewed, mounted])

  const addToRecentlyViewed = (book: Book) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(b => b.id !== book.id)
      return [book, ...filtered].slice(0, 10) // Keep only last 10
    })
  }

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed, count: recentlyViewed.length }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)
  if (!context) {
    throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider')
  }
  return context
}
