import categoriesData from "@/services/mockData/categories.json"

// Simulate a more realistic API delay
const delay = () => new Promise(resolve => setTimeout(resolve, 200))

// Local storage key
const STORAGE_KEY = "taskflow_categories"

// Get categories from localStorage or use default data
const getCategories = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : [...categoriesData]
}

// Save categories to localStorage
const saveCategories = (categories) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories))
}

export const categoryService = {
  async getAll() {
    await delay()
    const categories = getCategories()
    return categories
  },

  async getById(id) {
    await delay()
    const categories = getCategories()
    const category = categories.find(c => c.Id === parseInt(id))
    if (!category) {
      throw new Error("Category not found")
    }
    return { ...category }
  },

  async create(categoryData) {
    await delay()
    const categories = getCategories()
    
    const newCategory = {
      Id: Math.max(...categories.map(c => c.Id), 0) + 1,
      name: categoryData.name,
      color: categoryData.color,
      taskCount: 0
    }
    
    const updatedCategories = [...categories, newCategory]
    saveCategories(updatedCategories)
    
    return { ...newCategory }
  },

  async update(id, updates) {
    await delay()
    const categories = getCategories()
    const categoryIndex = categories.findIndex(c => c.Id === parseInt(id))
    
    if (categoryIndex === -1) {
      throw new Error("Category not found")
    }
    
    const updatedCategory = {
      ...categories[categoryIndex],
      ...updates
    }
    
    const updatedCategories = [...categories]
    updatedCategories[categoryIndex] = updatedCategory
    saveCategories(updatedCategories)
    
    return { ...updatedCategory }
  },

  async delete(id) {
    await delay()
    const categories = getCategories()
    const filteredCategories = categories.filter(c => c.Id !== parseInt(id))
    
    if (filteredCategories.length === categories.length) {
      throw new Error("Category not found")
    }
    
    saveCategories(filteredCategories)
    return true
  }
}