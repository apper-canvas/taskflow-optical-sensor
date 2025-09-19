import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  className, 
  checked,
  onChange,
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "h-5 w-5 rounded border-2 border-gray-300 transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-primary/20 focus:outline-none"
  
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          baseStyles,
          checked 
            ? "bg-gradient-to-br from-primary to-success border-primary text-white" 
            : "bg-white hover:border-primary/50",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={!disabled ? () => onChange?.({ target: { checked: !checked } }) : undefined}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            size={14} 
            className="absolute inset-0 m-auto text-white"
          />
        )}
      </div>
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox