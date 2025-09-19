import React from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-full mb-6">
        <ApperIcon 
          name="AlertTriangle" 
          size={48} 
          className="text-error"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-secondary mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          className="bg-gradient-to-r from-primary to-success hover:from-success hover:to-primary transition-all duration-300"
        >
          <ApperIcon name="RotateCcw" size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  )
}

export default Error