import React from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"
import SearchBar from "@/components/molecules/SearchBar"
import CategorySelector from "@/components/molecules/CategorySelector"

const TaskFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  statusFilter,
  onStatusFilterChange,
  categories,
  onCreateTask
}) => {
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "dueDate", label: "Due Date" },
    { value: "title", label: "Alphabetical" }
  ]

  const statusOptions = [
    { value: "all", label: "All Tasks" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search tasks..."
            className="w-full"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="min-w-[140px]">
            <CategorySelector
              categories={categories}
              value={selectedCategory}
              onChange={onCategoryChange}
              showAll={true}
            />
          </div>

          <div className="min-w-[120px]">
            <Select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="min-w-[140px]">
            <Select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Create Task Button */}
        <Button
          onClick={onCreateTask}
          className="bg-gradient-to-r from-primary to-success hover:from-success hover:to-primary whitespace-nowrap"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          New Task
        </Button>
      </div>
    </div>
  )
}

export default TaskFilters