import tasksData from "@/services/mockData/tasks.json"

// Simulate a more realistic API delay
const delay = () => new Promise(resolve => setTimeout(resolve, 300))

// Local storage key
const STORAGE_KEY = "taskflow_tasks"

// Get tasks from localStorage or use default data
const getTasks = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : [...tasksData]
}

// Save tasks to localStorage
const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const taskService = {
  async getAll() {
    await delay()
    const tasks = getTasks()
    return tasks
  },

  async getById(id) {
    await delay()
    const tasks = getTasks()
    const task = tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  },

  async create(taskData) {
    await delay()
    const tasks = getTasks()
    
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      description: taskData.description || "",
      completed: false,
      dueDate: taskData.dueDate || null,
      categoryId: taskData.categoryId || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    const updatedTasks = [newTask, ...tasks]
    saveTasks(updatedTasks)
    
    return { ...newTask }
  },

  async update(id, updates) {
    await delay()
    const tasks = getTasks()
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(id))
    
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    const updatedTasks = [...tasks]
    updatedTasks[taskIndex] = updatedTask
    saveTasks(updatedTasks)
    
    return { ...updatedTask }
  },

  async delete(id) {
    await delay()
    const tasks = getTasks()
    const filteredTasks = tasks.filter(t => t.Id !== parseInt(id))
    
    if (filteredTasks.length === tasks.length) {
      throw new Error("Task not found")
    }
    
    saveTasks(filteredTasks)
    return true
  }
}