import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const Header = ({ 
  totalTasks, 
  completedTasks, 
  overdueTasks,
  onCreateTask 
}) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  
  return (
    <div
    className="bg-gradient-to-r from-white to-surface rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
    <div
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Brand and Title */}
        <div className="flex items-center gap-4">
            <div
                className="bg-gradient-to-br from-primary to-success p-3 rounded-xl shadow-lg">
                <ApperIcon name="CheckSquare" size={28} className="text-white" />
            </div>
            <div>
                <h1
                    className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">TaskFlow
                                </h1>
                <p className="text-gray-600 text-sm lg:text-base">Organize your day, accomplish your goals
                                </p>
            </div>
        </div>
        {/* Stats and Quick Actions */}
        <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
            {/* Task Statistics */}
            <div className="flex items-center gap-4">
                <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">{totalTasks}</div>
                    <div className="text-xs text-gray-500">Total</div>
                </div>
                <div className="text-center">
                    <div
                        className="text-2xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
                        {completedTasks}
                    </div>
                    <div className="text-xs text-gray-500">Done</div>
                </div>
                {overdueTasks > 0 && <div className="text-center">
                    <div className="text-2xl font-bold text-error">{overdueTasks}</div>
                    <div className="text-xs text-gray-500">Overdue</div>
                </div>}
            </div>
            {/* Completion Rate */}
            {totalTasks > 0 && <div
                className="flex items-center gap-1 text-xs font-medium bg-gradient-to-r from-success/10 to-primary/10 text-success px-3 py-1 rounded-full border border-success/20">
                <ApperIcon name="TrendingUp" size={14} className="mr-1" />
                {completionRate}% Complete
                            </div>}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                    const {
                        AuthContext
                    } = require("../../App");

                    const authMethods = React.useContext(AuthContext);

                    if (authMethods?.logout) {
                        authMethods.logout();
                    }
                }}
                className="text-gray-600 hover:text-secondary">
                <ApperIcon name="LogOut" size={16} className="mr-1" />Logout
                          </Button>
            {completionRate}% Complete
                        
                      )

                      {/* Quick Create Button */}
            <Button
                onClick={onCreateTask}
                size="lg"
                className="bg-gradient-to-r from-primary to-success hover:from-success hover:to-primary hover:scale-105 shadow-lg">
                <ApperIcon name="Plus" size={18} className="mr-2" />Quick Add
                          </Button>
        </div>
    </div>
</div>
  )
}

export default Header