'use client'

import { useState, useEffect } from 'react'

export default function TaskCard({ task, project, onUpdate, onDelete, showTimer = false }) {
  const [timeOverdue, setTimeOverdue] = useState('')

  useEffect(() => {
    if (showTimer && task.dueDate) {
      const updateTimer = () => {
        const now = new Date()
        const dueDate = new Date(task.dueDate)

        if (now > dueDate) {
          const timeDiff = now - dueDate
          const hours = Math.floor(timeDiff / (1000 * 60 * 60))
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
          setTimeOverdue(`${hours}h ${minutes}m overdue`)
        }
      }

      updateTimer()
      const interval = setInterval(updateTimer, 1000)
      return () => clearInterval(interval)
    }
  }, [showTimer, task.dueDate])

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed })
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id)
    }
  }

  const getImportanceClass = () => {
    switch (task.importance) {
      case 'Very Important':
        return 'importance-very'
      case 'Moderate':
        return 'importance-moderate'
      default:
        return 'importance-normal'
    }
  }

  const getImportanceBadgeClass = () => {
    switch (task.importance) {
      case 'Very Important':
        return 'importance-badge very'
      case 'Moderate':
        return 'importance-badge moderate'
      default:
        return 'importance-badge normal'
    }
  }

  const isOverdue = () => {
    if (task.completed) return false
    const today = new Date()
    const dueDate = new Date(task.dueDate)
    return dueDate < today
  }

  return (
    <div className={`task-card ${getImportanceClass()} ${task.completed ? 'completed' : ''}`}>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div className="flex-grow-1">
          <h6 className="task-title mb-1">{task.name}</h6>
          {task.description && (
            <p className="task-description mb-2">{task.description}</p>
          )}
        </div>
        <div className="d-flex gap-2">
          <button
            className={`btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-success'} btn-task-action`}
            onClick={handleToggleComplete}
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <i className={`bi ${task.completed ? 'bi-arrow-counterclockwise' : 'bi-check'}`}></i>
          </button>
          <button
            className="btn btn-sm btn-danger btn-task-action"
            onClick={handleDelete}
            title="Delete task"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>

      <div className="task-meta d-flex flex-wrap align-items-center">
        {task.dueDate && (
          <span className="due-date">
            <i className="bi bi-calendar3 me-1"></i>
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}

        {project && (
          <span className="project-name">
            <i className="bi bi-folder me-1"></i>
            {project.name}
          </span>
        )}

        <span className={getImportanceBadgeClass()}>
          {task.importance}
        </span>

        {showTimer && isOverdue() && timeOverdue && (
          <span className="overdue-timer ms-2">
            <i className="bi bi-clock me-1"></i>
            {timeOverdue}
          </span>
        )}
      </div>
    </div>
  )
}
