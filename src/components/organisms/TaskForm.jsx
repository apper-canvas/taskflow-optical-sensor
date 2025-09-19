import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import FormField from "@/components/molecules/FormField"
import CategorySelector from "@/components/molecules/CategorySelector"
import { format } from "date-fns"

const TaskForm = ({ 
  task, 
  categories, 
  onSubmit, 
  onCancel,
  isVisible 
}) => {
const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    categoryId: ""
  })
  const [errors, setErrors] = useState({})

useEffect(() => {
    if (task) {
      setFormData({
        title: task.title_c || "",
        description: task.description_c || "",
        dueDate: task.due_date_c ? format(new Date(task.due_date_c), "yyyy-MM-dd") : "",
        categoryId: task.category_id_c?.Id || task.category_id_c || ""
      })
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        categoryId: ""
      })
    }
    setErrors({})
  }, [task])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required"
    }
    
    if (formData.dueDate && new Date(formData.dueDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.dueDate = "Due date cannot be in the past"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    const taskData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    }
    
    onSubmit(taskData)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          <ApperIcon name={task ? "Edit" : "Plus"} size={20} className="inline mr-2 text-primary" />
          {task ? "Edit Task" : "Create New Task"}
        </h2>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-gray-400 hover:text-secondary"
        >
          <ApperIcon name="X" size={20} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Task Title"
          error={errors.title}
          required
        >
          <Input
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="What needs to be done?"
            error={errors.title}
          />
        </FormField>

        <FormField
          label="Description"
          error={errors.description}
        >
          <Textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Add more details about this task..."
            error={errors.description}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Due Date"
            error={errors.dueDate}
          >
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              error={errors.dueDate}
            />
          </FormField>

          <FormField
            label="Category"
            error={errors.categoryId}
          >
            <CategorySelector
              categories={categories}
              value={formData.categoryId}
              onChange={(value) => handleChange("categoryId", value)}
            />
          </FormField>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-success hover:from-success hover:to-primary"
          >
            <ApperIcon name={task ? "Save" : "Plus"} size={16} className="mr-2" />
            {task ? "Update Task" : "Create Task"}
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

export default TaskForm