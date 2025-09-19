import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-success text-white hover:from-success hover:to-primary hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
    secondary: "bg-white text-secondary border border-gray-200 hover:bg-gray-50 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]",
    ghost: "text-gray-600 hover:text-secondary hover:bg-gray-50 hover:scale-[1.02]",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:from-red-600 hover:to-error hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm h-9",
    md: "px-4 py-2.5 text-sm h-10",
    lg: "px-6 py-3 text-base h-12",
  }
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button