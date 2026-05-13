'use client'
import { useToast } from './ToastContext'

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ⓘ',
    warning: '⚠',
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${bgColors[toast.type]} text-white px-6 py-3 rounded-lg shadow-lg 
                       flex items-center gap-3 animate-bounce pointer-events-auto
                       cursor-pointer hover:shadow-xl transition-all`}
          onClick={() => removeToast(toast.id)}
        >
          <span className="text-lg font-bold">{icons[toast.type]}</span>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
