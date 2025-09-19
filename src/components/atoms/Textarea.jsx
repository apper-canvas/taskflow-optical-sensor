import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Textarea = forwardRef(({ 
  className, 
  error,
  ...props 
}, ref) => {
  const baseStyles = "flex min-h-[100px] w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none"
  
  return (
    <textarea
      className={cn(
        baseStyles,
        error && "border-error focus:border-error focus:ring-error/20",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export default Textarea