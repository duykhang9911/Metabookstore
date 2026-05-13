'use client'
import { useState } from 'react'
import { useToast } from './ToastContext'

interface ShareButtonProps {
  title: string
  author?: string
  url?: string
}

export default function ShareButton({ title, author, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { addToast } = useToast()

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareText = `${title}${author ? ` - ${author}` : ''} 📚`

  const shares = [
    {
      name: 'Facebook',
      icon: 'f',
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400')
        addToast('Chia sẻ lên Facebook thành công!', 'success')
      }
    },
    {
      name: 'Twitter',
      icon: '𝕏',
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400')
        addToast('Chia sẻ lên Twitter thành công!', 'success')
      }
    },
    {
      name: 'Copy Link',
      icon: '🔗',
      action: () => {
        navigator.clipboard.writeText(shareUrl)
        addToast('Đã sao chép link!', 'info')
        setIsOpen(false)
      }
    },
    {
      name: 'Email',
      icon: '✉️',
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`
        addToast('Mở ứng dụng email...', 'info')
      }
    }
  ]

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 rounded-full text-indigo hover:text-violet transition-colors"
        title="Chia sẻ"
      >
        📤
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-lavender/20 overflow-hidden z-10">
          {shares.map(share => (
            <button
              key={share.name}
              onClick={share.action}
              className="w-full px-4 py-2 text-left text-sm text-indigo hover:bg-violet/10 transition-colors flex items-center gap-2"
            >
              <span>{share.icon}</span>
              {share.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
