import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Select = forwardRef(({ 
  className, 
  children,
  error,
  ...props 
}, ref) => {
  const baseStyles = "flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
  
  return (
    <select
      className={cn(
        baseStyles,
        error && "border-error focus:border-error focus:ring-error/20",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
})

Select.displayName = "Select"

export default Select