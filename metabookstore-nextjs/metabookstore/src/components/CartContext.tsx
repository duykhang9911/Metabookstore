'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { Book } from '@/data/books'

type CartItem = Book & { qty: number }

type CartCtx = {
  items: CartItem[]
  addToCart: (book: Book) => void
  removeFromCart: (id: number) => void
  total: number
  count: number
}

const CartContext = createContext<CartCtx>({} as CartCtx)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (book: Book) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === book.id)
      if (existing) return prev.map(i => i.id === book.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...book, qty: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
