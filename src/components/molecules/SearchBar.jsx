import React from "react"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"

const SearchBar = ({ value, onChange, placeholder = "Search tasks...", className }) => {
  return (
    <div className="relative">
      <ApperIcon 
        name="Search" 
        size={20} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`pl-12 ${className}`}
      />
    </div>
  )
}

export default SearchBar