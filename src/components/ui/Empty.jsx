import React from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "No tasks yet", 
  description = "Get started by creating your first task",
  actionLabel = "Create Task",
  onAction,
  icon = "CheckSquare"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="bg-gradient-to-br from-primary/10 to-success/10 p-8 rounded-full mb-6">
        <ApperIcon 
          name={icon} 
          size={64} 
          className="text-primary"
        />
      </div>
      
      <h3 className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        {description}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          size="lg"
          className="bg-gradient-to-r from-primary to-success hover:from-success hover:to-primary hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          {actionLabel}
        </Button>
      )}
      
      <div className="mt-12 text-sm text-gray-500 bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-3 rounded-xl border border-gray-100">
        💡 Tip: Use categories to organize your tasks and stay productive!
      </div>
    </div>
  )
}

export default Empty