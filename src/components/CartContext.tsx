'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export interface CartItem {
  id: string | number
  title: string
  price: number
  quantity: number
}

type CartCtx = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string | number) => void
  updateQuantity: (id: string | number, quantity: number) => void
  clearCart: () => void
  total: number
  count: number
  items?: any[]
}

const CartContext = createContext<CartCtx>({} as CartCtx)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: string | number) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const count = cart.reduce((s, i) => s + i.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, count, items: cart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
