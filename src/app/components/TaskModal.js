'use client'

import { useState, useEffect } from 'react'

export default function TaskModal({ show, onClose, onSubmit, projects, task = null }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    projectId: '',
    importance: 'Normal'
  })

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || '',
        description: task.description || '',
        dueDate: task.dueDate || '',
        projectId: task.projectId || '',
        importance: task.importance || 'Normal'
      })
    } else {
      setFormData({
        name: '',
        description: '',
        dueDate: '',
        projectId: projects.length > 0 ? projects[0].id : '',
        importance: 'Normal'
      })
    }
  }, [task, projects, show])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name.trim() && formData.projectId) {
      onSubmit(formData)
      onClose()
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (!show) return null

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {task ? 'Edit Task' : 'Add New Task'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="taskName" className="form-label">Task Name *</label>
                <input
                  type="text"
                  className="form-control"
                  id="taskName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="taskDescription" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="taskDescription"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="taskDueDate" className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="taskDueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="taskProject" className="form-label">Project *</label>
                <select
                  className="form-control"
                  id="taskProject"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="taskImportance" className="form-label">Importance Level</label>
                <select
                  className="form-control"
                  id="taskImportance"
                  name="importance"
                  value={formData.importance}
                  onChange={handleChange}
                >
                  <option value="Normal">Normal</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Very Important">Very Important</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {task ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
