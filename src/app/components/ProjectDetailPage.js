'use client'

import { useState } from 'react'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'

export default function ProjectDetailPage({ project, tasks, onAddTask, onUpdateTask, onDeleteTask, onBack }) {
  const [showModal, setShowModal] = useState(false)

  if (!project) return null

  // Group tasks by importance and completion status
  const activeTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  const overdueTasks = activeTasks.filter(task => {
    if (!task.dueDate) return false
    return new Date(task.dueDate) < new Date()
  })

  const veryImportantTasks = activeTasks.filter(task => 
    task.importance === 'Very Important' && new Date(task.dueDate) >= new Date()
  )

  const moderateTasks = activeTasks.filter(task => 
    task.importance === 'Moderate' && new Date(task.dueDate) >= new Date()
  )

  const otherTasks = activeTasks.filter(task => 
    (!task.importance || task.importance === 'Normal') && 
    (!task.dueDate || new Date(task.dueDate) >= new Date())
  )

  const handleAddTask = (taskData) => {
    onAddTask({ ...taskData, projectId: project.id })
  }

  const TaskGroup = ({ title, tasks, className = '', showTimer = false }) => {
    if (tasks.length === 0) return null

    return (
      <div className={`mb-4 ${className}`}>
        <h5 className="mb-3">
          {title} ({tasks.length})
        </h5>
        <div className="row">
          {tasks.map(task => (
            <div key={task.id} className="col-lg-6 col-12">
              <TaskCard
                task={task}
                project={project}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
                showTimer={showTimer}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <button className="btn btn-link p-0" onClick={onBack}>
                  <i className="bi bi-arrow-left me-1"></i>Projects
                </button>
              </li>
              <li className="breadcrumb-item active">{project.name}</li>
            </ol>
          </nav>
          <h1 className="h2">{project.name}</h1>
          {project.description && (
            <p className="text-muted">{project.description}</p>
          )}
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-lg me-2"></i>Add Task
        </button>
      </div>

      {/* Project Stats */}
      <div className="row mb-4">
        <div className="col-md-3 col-6 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-primary">{activeTasks.length}</h5>
              <p className="card-text">Active Tasks</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-success">{completedTasks.length}</h5>
              <p className="card-text">Completed</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-danger">{overdueTasks.length}</h5>
              <p className="card-text">Overdue</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-warning">{veryImportantTasks.length}</h5>
              <p className="card-text">Very Important</p>
            </div>
          </div>
        </div>
      </div>

      {/* Task Groups */}
      {tasks.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-list-task"></i>
          <h4>No tasks in this project</h4>
          <p>Add your first task to get started.</p>
        </div>
      ) : (
        <>
          <TaskGroup
            title="⚠️ Overdue Tasks"
            tasks={overdueTasks}
            className="border-start border-danger border-4 ps-3"
            showTimer={true}
          />

          <TaskGroup
            title="🔥 Very Important Tasks"
            tasks={veryImportantTasks}
            className="border-start border-danger border-4 ps-3"
          />

          <TaskGroup
            title="⚡ Moderate Tasks"
            tasks={moderateTasks}
            className="border-start border-warning border-4 ps-3"
          />

          <TaskGroup
            title="📋 Other Tasks"
            tasks={otherTasks}
            className="border-start border-secondary border-4 ps-3"
          />

          {completedTasks.length > 0 && (
            <TaskGroup
              title="✅ Completed Tasks"
              tasks={completedTasks}
              className="border-start border-success border-4 ps-3"
            />
          )}
        </>
      )}

      <TaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddTask}
        projects={[project]}
      />
    </div>
  )
}
