'use client'

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-[5%] py-16">
      <div className="space-y-6">
        {/* Skeleton header */}
        <div className="h-12 bg-gradient-to-r from-lavender/20 to-sky/20 rounded-lg animate-pulse" />
        
        {/* Skeleton grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-48 bg-gradient-to-r from-lavender/20 to-sky/20 rounded-lg animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-lavender/20 to-sky/20 rounded animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-lavender/20 to-sky/20 rounded animate-pulse w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
