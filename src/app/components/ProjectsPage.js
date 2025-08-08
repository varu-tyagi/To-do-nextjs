'use client'

import { useState } from 'react'

export default function ProjectsPage({ projects, tasks, onAddProject, onDeleteProject, onSelectProject }) {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name.trim()) {
      onAddProject(formData)
      setFormData({ name: '', description: '' })
      setShowModal(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDeleteProject = (projectId) => {
    const project = projects.find(p => p.id === projectId)
    const projectTasks = tasks.filter(task => task.projectId === projectId)

    if (projectTasks.length > 0) {
      if (confirm(`Are you sure you want to delete "${project.name}" and its ${projectTasks.length} tasks?`)) {
        onDeleteProject(projectId)
      }
    } else {
      if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
        onDeleteProject(projectId)
      }
    }
  }

  const getProjectTaskCount = (projectId) => {
    return tasks.filter(task => task.projectId === projectId && !task.completed).length
  }

  const getProjectCompletedCount = (projectId) => {
    return tasks.filter(task => task.projectId === projectId && task.completed).length
  }

  return (
    <div className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2">Projects</h1>
          <p className="text-muted">Manage your projects and organize tasks</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-lg me-2"></i>Add Project
        </button>
      </div>

      <div className="row">
        {projects.length === 0 ? (
          <div className="col-12">
            <div className="empty-state">
              <i className="bi bi-folder-plus"></i>
              <h4>No projects yet</h4>
              <p>Create your first project to organize your tasks.</p>
            </div>
          </div>
        ) : (
          projects.map(project => {
            const activeTasks = getProjectTaskCount(project.id)
            const completedTasks = getProjectCompletedCount(project.id)

            return (
              <div key={project.id} className="col-lg-6 col-12 mb-4">
                <div className="project-card h-100">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="mb-0">{project.name}</h5>
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <i className="bi bi-trash me-2"></i>Delete Project
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {project.description && (
                    <p className="text-muted mb-3">{project.description}</p>
                  )}

                  <div className="row mb-3">
                    <div className="col-6">
                      <div className="text-center">
                        <div className="h4 text-primary mb-0">{activeTasks}</div>
                        <small className="text-muted">Active Tasks</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center">
                        <div className="h4 text-success mb-0">{completedTasks}</div>
                        <small className="text-muted">Completed</small>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => onSelectProject(project)}
                    >
                      <i className="bi bi-eye me-2"></i>View Tasks
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Add Project Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Project</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="projectName" className="form-label">Project Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="projectName"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="projectDescription" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="projectDescription"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
