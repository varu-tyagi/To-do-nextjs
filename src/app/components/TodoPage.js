'use client'

import { useState } from 'react'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'

export default function TodoPage({ tasks, projects, onUpdateTask, onDeleteTask, onAddTask }) {
  const [showModal, setShowModal] = useState(false)

  // Filter active tasks and sort them
  const activeTasks = tasks.filter(task => !task.completed)

  // Sort tasks by importance and due date
  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      // First, check if overdue
      const now = new Date()
      const aOverdue = new Date(a.dueDate) < now
      const bOverdue = new Date(b.dueDate) < now

      if (aOverdue && !bOverdue) return -1
      if (!aOverdue && bOverdue) return 1

      // Then by importance
      const importanceOrder = { 'Very Important': 0, 'Moderate': 1, 'Normal': 2 }
      const aImportance = importanceOrder[a.importance] || 2
      const bImportance = importanceOrder[b.importance] || 2

      if (aImportance !== bImportance) {
        return aImportance - bImportance
      }

      // Finally by due date
      return new Date(a.dueDate) - new Date(b.dueDate)
    })
  }

  const sortedTasks = sortTasks([...activeTasks])

  const handleAddTask = (taskData) => {
    onAddTask(taskData)
  }

  return (
    <div className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2">To-Do List</h1>
          <p className="text-muted">Manage your active tasks</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-lg me-2"></i>Add Task
        </button>
      </div>

      <div className="row">
        <div className="col-12">
          {sortedTasks.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-check-circle-fill"></i>
              <h4>All tasks completed!</h4>
              <p>Add a new task to get started.</p>
            </div>
          ) : (
            <div className="row">
              {sortedTasks.map(task => {
                const project = projects.find(p => p.id === task.projectId)
                return (
                  <div key={task.id} className="col-lg-6 col-12">
                    <TaskCard
                      task={task}
                      project={project}
                      onUpdate={onUpdateTask}
                      onDelete={onDeleteTask}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <TaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddTask}
        projects={projects}
      />
    </div>
  )
}
