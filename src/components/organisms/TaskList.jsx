import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "@/components/molecules/TaskCard"
import Empty from "@/components/ui/Empty"

const TaskList = ({ 
  tasks, 
  categories, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onCreateTask,
  searchTerm,
  selectedCategory,
  sortBy 
}) => {
  if (tasks.length === 0) {
    const getEmptyMessage = () => {
      if (searchTerm) {
        return {
          title: "No matching tasks",
          description: `No tasks found matching "${searchTerm}". Try a different search term.`,
          icon: "Search",
          actionLabel: null
        }
      }
      
      if (selectedCategory) {
        const category = categories.find(cat => cat.Id === selectedCategory)
        return {
          title: "No tasks in this category",
          description: `No tasks found in "${category?.name}". Create your first task in this category.`,
          icon: "FolderOpen",
          actionLabel: "Create Task"
        }
      }
      
      return {
        title: "No tasks yet",
        description: "Get started by creating your first task and take control of your productivity!",
        icon: "CheckSquare",
        actionLabel: "Create Your First Task"
      }
    }
    
    const emptyProps = getEmptyMessage()
    
    return (
      <Empty
        title={emptyProps.title}
        description={emptyProps.description}
        icon={emptyProps.icon}
        actionLabel={emptyProps.actionLabel}
        onAction={emptyProps.actionLabel ? onCreateTask : null}
      />
    )
  }

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id === categoryId)
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              category={getCategoryById(task.categoryId)}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList