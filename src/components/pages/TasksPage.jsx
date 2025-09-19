import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { isAfter, isBefore, startOfDay } from "date-fns";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";
import TaskFilters from "@/components/organisms/TaskFilters";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import TaskForm from "@/components/organisms/TaskForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

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
        if (!task.title_c?.toLowerCase().includes(searchLower) && 
            !task.description_c?.toLowerCase().includes(searchLower)) {
          return false
        }
      }

      // Category filter
      if (selectedCategory && task.category_id_c?.Id !== selectedCategory && task.category_id_c !== selectedCategory) {
        return false
      }

      // Status filter
      if (statusFilter === "pending" && task.completed_c) return false
      if (statusFilter === "completed" && !task.completed_c) return false

      return true
    })

    // Sort tasks
filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.created_at_c || a.CreatedOn) - new Date(b.created_at_c || b.CreatedOn)
        case "dueDate":
          if (!a.due_date_c && !b.due_date_c) return 0
          if (!a.due_date_c) return 1
          if (!b.due_date_c) return -1
          return new Date(a.due_date_c) - new Date(b.due_date_c)
        case "title":
          return a.title_c?.localeCompare(b.title_c) || 0
        case "newest":
        default:
          return new Date(b.created_at_c || b.CreatedOn) - new Date(a.created_at_c || a.CreatedOn)
      }
    })

    return filtered
  }, [tasks, searchTerm, selectedCategory, sortBy, statusFilter])

  // Task statistics
const taskStats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(task => task.completed_c).length
    const overdue = tasks.filter(task => 
      task.due_date_c && 
      !task.completed_c && 
      isBefore(new Date(task.due_date_c), startOfDay(new Date()))
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
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.Id === editingTask.Id ? updatedTask : task
        ))
        toast.success("Task updated successfully")
      }
      setShowTaskForm(false)
      setEditingTask(null)
    } catch (err) {
      console.error("Error updating task:", err)
      toast.error("Failed to update task")
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      if (!task) {
        toast.error("Task not found")
        return
      }
      
      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed_c
      })
      
      if (updatedTask) {
        setTasks(prev => prev.map(t => 
          t.Id === taskId ? updatedTask : t
        ))
        
        if (updatedTask.completed_c) {
          toast.success("🎉 Task completed! Great job!")
        } else {
          toast.success("Task marked as pending")
        }
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