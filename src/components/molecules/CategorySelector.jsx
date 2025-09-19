import React from "react"
import Select from "@/components/atoms/Select"
import Badge from "@/components/atoms/Badge"

const CategorySelector = ({ 
  categories, 
  value, 
  onChange, 
  showAll = false,
  className 
}) => {
const selectedCategory = categories.find(cat => cat.Id === value)
  
  return (
    <div className="space-y-2">
      <Select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      >
        <option value="">
          {showAll ? "All Categories" : "Select Category"}
        </option>
        {categories.map(category => (
          <option key={category.Id} value={category.Id}>
            {category.name_c}
          </option>
        ))}
      </Select>
      
      {selectedCategory && (
        <div className="flex items-center gap-2">
          <Badge color={selectedCategory.color_c}>
            {selectedCategory.name_c}
          </Badge>
        </div>
      )}
    </div>
  )
}

export default CategorySelector