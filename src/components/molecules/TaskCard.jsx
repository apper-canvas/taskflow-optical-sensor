import React from "react"
import { motion } from "framer-motion"
import { format, isAfter, isBefore, startOfDay } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const TaskCard = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  className 
}) => {
  const isOverdue = task.dueDate && !task.completed && isBefore(new Date(task.dueDate), startOfDay(new Date()))
  const isDueToday = task.dueDate && format(new Date(task.dueDate), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  
  const getDueDateVariant = () => {
    if (isOverdue) return "overdue"
    if (isDueToday) return "warning"
    return "default"
  }

  const handleToggleComplete = () => {
    onToggleComplete(task.Id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200",
        task.completed && "bg-gradient-to-r from-success/5 to-primary/5 border-success/20",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="pt-1">
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-semibold text-lg leading-tight",
              task.completed 
                ? "line-through text-gray-500" 
                : "text-secondary"
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={cn(
                "mt-2 text-sm leading-relaxed",
                task.completed 
                  ? "text-gray-400" 
                  : "text-gray-600"
              )}>
                {task.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-secondary"
          >
            <ApperIcon name="Edit2" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.Id)}
            className="text-gray-400 hover:text-error"
          >
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {category && (
            <Badge color={category.color}>
              {category.name}
            </Badge>
          )}
          
          {task.dueDate && (
            <Badge variant={getDueDateVariant()}>
              <ApperIcon name="Calendar" size={12} className="mr-1" />
              {format(new Date(task.dueDate), "MMM d")}
              {isOverdue && (
                <ApperIcon name="AlertTriangle" size={12} className="ml-1" />
              )}
            </Badge>
          )}
        </div>
        
        <div className="text-xs text-gray-400">
          {format(new Date(task.createdAt), "MMM d, h:mm a")}
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard