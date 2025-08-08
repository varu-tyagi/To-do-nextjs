'use client'

import TaskCard from './TaskCard'

export default function DashboardPage({ tasks, projects, onUpdateTask, onDeleteTask }) {
  // Filter active tasks
  const activeTasks = tasks.filter(task => !task.completed)

  // Group tasks by project
  const tasksByProject = projects.map(project => ({
    project,
    tasks: activeTasks.filter(task => task.projectId === project.id)
  })).filter(group => group.tasks.length > 0)

  // Group tasks by importance
  const tasksByImportance = {
    'Very Important': activeTasks.filter(task => task.importance === 'Very Important'),
    'Moderate': activeTasks.filter(task => task.importance === 'Moderate'),
    'Normal': activeTasks.filter(task => task.importance === 'Normal' || !task.importance)
  }

  const sortTasksByDueDate = (tasks) => {
    return tasks.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    })
  }

  return (
    <div className="py-4">
      <div className="mb-4">
        <h1 className="h2">Dashboard</h1>
        <p className="text-muted">Overview of all your tasks</p>
      </div>

      {/* Tasks by Project Section */}
      <div className="dashboard-section">
        <h3 className="section-title">
          <i className="bi bi-folder me-2"></i>Tasks by Project
        </h3>

        {tasksByProject.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-folder"></i>
            <h5>No active tasks found</h5>
            <p>Create some tasks to see them organized by project.</p>
          </div>
        ) : (
          tasksByProject.map(({ project, tasks: projectTasks }) => (
            <div key={project.id} className="project-group">
              <h5 className="project-group-title">
                {project.name} ({projectTasks.length} tasks)
              </h5>
              <div className="row">
                {sortTasksByDueDate(projectTasks).map(task => (
                  <div key={task.id} className="col-lg-6 col-12">
                    <TaskCard
                      task={task}
                      project={project}
                      onUpdate={onUpdateTask}
                      onDelete={onDeleteTask}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tasks by Importance Section */}
      <div className="dashboard-section">
        <h3 className="section-title">
          <i className="bi bi-exclamation-triangle me-2"></i>Tasks by Importance
        </h3>

        {Object.entries(tasksByImportance).map(([importance, importanceTasks]) => {
          if (importanceTasks.length === 0) return null

          return (
            <div key={importance} className="importance-group">
              <h5 className={`importance-group-title ${importance.toLowerCase().replace(' ', '')}`}>
                {importance} ({importanceTasks.length} tasks)
              </h5>
              <div className="row">
                {sortTasksByDueDate(importanceTasks).map(task => {
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
            </div>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="dashboard-section">
        <h3 className="section-title">
          <i className="bi bi-bar-chart me-2"></i>Quick Stats
        </h3>
        <div className="row">
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
                <h5 className="card-title text-success">{tasks.filter(t => t.completed).length}</h5>
                <p className="card-text">Completed</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-danger">
                  {activeTasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date()).length}
                </h5>
                <p className="card-text">Overdue</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-info">{projects.length}</h5>
                <p className="card-text">Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
