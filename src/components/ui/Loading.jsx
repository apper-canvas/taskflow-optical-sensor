import React from "react"

const Loading = () => {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-shimmer w-48"></div>
        <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg animate-shimmer w-32"></div>
      </div>
      
      {/* Search and filters skeleton */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-shimmer flex-1"></div>
        <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-shimmer w-32"></div>
        <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-shimmer w-32"></div>
      </div>

      {/* Task cards skeleton */}
      <div className="space-y-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-shimmer"></div>
                <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-shimmer w-64"></div>
              </div>
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full animate-shimmer w-20"></div>
            </div>
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-shimmer w-full mb-2"></div>
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-shimmer w-3/4"></div>
            <div className="flex items-center justify-between mt-4">
              <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full animate-shimmer w-24"></div>
              <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-shimmer w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading