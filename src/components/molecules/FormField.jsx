import React from "react"
import { cn } from "@/utils/cn"

const FormField = ({ 
  label, 
  error, 
  children, 
  className,
  required = false,
  ...props 
}) => {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && (
        <label className="text-sm font-medium text-secondary">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  )
}

export default FormField