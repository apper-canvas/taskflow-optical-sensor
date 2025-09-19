import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import TasksPage from "@/components/pages/TasksPage"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-surface via-background to-slate-50">
        <Routes>
          <Route path="/*" element={<TasksPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="mt-16"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App