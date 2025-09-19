import React from "react"
import { cn } from "@/utils/cn"

const Badge = ({ 
  className, 
  variant = "default", 
  children,
  color,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors"
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary/10 to-success/10 text-primary border border-primary/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20",
    success: "bg-gradient-to-r from-success/10 to-primary/10 text-success border border-success/20",
    warning: "bg-gradient-to-r from-warning/10 to-accent/10 text-warning border border-warning/20",
    error: "bg-gradient-to-r from-error/10 to-red-100 text-error border border-error/20",
    overdue: "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200",
  }
  
  const colorStyles = color ? {
    backgroundColor: `${color}15`,
    color: color,
    borderColor: `${color}30`,
    border: "1px solid"
  } : {}
  
  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      style={colorStyles}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge