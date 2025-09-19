import React, { useState, useEffect, useMemo } from "react"
import { toast } from "react-toastify"
import { isAfter, isBefore, startOfDay } from "date-fns"
import Header from "@/components/organisms/Header"
import TaskForm from "@/components/organisms/TaskForm"
import TaskFilters from "@/components/organisms/TaskFilters"
import TaskList from "@/components/organisms/TaskList"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { taskService } from "@/services/api/taskService"
import { categoryService } from "@/services/api/categoryService"

const TasksPage = () => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [statusFilter, setStatusFilter] = useState("all")

  // Load data on mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ])
      
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        if (!task.title.toLowerCase().includes(searchLower) && 
            !task.description?.toLowerCase().includes(searchLower)) {
          return false
        }
      }

      // Category filter
      if (selectedCategory && task.categoryId !== selectedCategory) {
        return false
      }

      // Status filter
      if (statusFilter === "pending" && task.completed) return false
      if (statusFilter === "completed" && !task.completed) return false

      return true
    })

    // Sort tasks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt)
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        case "title":
          return a.title.localeCompare(b.title)
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

    return filtered
  }, [tasks, searchTerm, selectedCategory, sortBy, statusFilter])

  // Task statistics
  const taskStats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(task => task.completed).length
    const overdue = tasks.filter(task => 
      task.dueDate && 
      !task.completed && 
      isBefore(new Date(task.dueDate), startOfDay(new Date()))
    ).length

    return { total, completed, overdue }
  }, [tasks])

  // Task handlers
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      setShowTaskForm(false)
      setEditingTask(null)
      toast.success("Task created successfully!")
    } catch (err) {
      toast.error("Failed to create task")
    }
  }

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await taskService.update(editingTask.Id, taskData)
      setTasks(prev => prev.map(task => 
        task.Id === editingTask.Id ? updatedTask : task
      ))
      setShowTaskForm(false)
      setEditingTask(null)
      toast.success("Task updated successfully!")
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed
      })
      
      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ))
      
      if (updatedTask.completed) {
        toast.success("🎉 Task completed! Great job!")
      } else {
        toast.success("Task marked as pending")
      }
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return
    }

    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.Id !== taskId))
      toast.success("Task deleted successfully")
    } catch (err) {
      toast.error("Failed to delete task")
    }
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskForm(true)
  }

  const handleShowCreateForm = () => {
    setEditingTask(null)
    setShowTaskForm(true)
  }

  const handleCancelForm = () => {
    setShowTaskForm(false)
    setEditingTask(null)
  }

  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      handleUpdateTask(taskData)
    } else {
      handleCreateTask(taskData)
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadData} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header
          totalTasks={taskStats.total}
          completedTasks={taskStats.completed}
          overdueTasks={taskStats.overdue}
          onCreateTask={handleShowCreateForm}
        />

        <TaskForm
          task={editingTask}
          categories={categories}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
          isVisible={showTaskForm}
        />

        <TaskFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          categories={categories}
          onCreateTask={handleShowCreateForm}
        />

        <TaskList
          tasks={filteredTasks}
          categories={categories}
          onToggleComplete={handleToggleComplete}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onCreateTask={handleShowCreateForm}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
        />
      </div>
    </div>
  )
}

export default TasksPage