'use client'
import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (typeof window !== 'undefined') {
      setIsVisible(window.scrollY > 300)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-violet to-indigo 
                 text-white p-3 rounded-full shadow-lg hover:shadow-xl 
                 transition-all duration-300 hover:scale-110"
      title="Lên đầu trang"
    >
      ↑
    </button>
  )
}
