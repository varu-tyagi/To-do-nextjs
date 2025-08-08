'use client'

import TaskCard from './TaskCard'

export default function CategoryPage({ title, tasks, projects, onUpdateTask, onDeleteTask, showTimer = false }) {
  // Sort tasks by due date, with overdue first
  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      // If showing timer (overdue page), sort by how overdue they are
      if (showTimer) {
        const now = new Date()
        const aOverdue = now - new Date(a.dueDate)
        const bOverdue = now - new Date(b.dueDate)
        return bOverdue - aOverdue // Most overdue first
      }

      // Otherwise sort by due date
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    })
  }

  const sortedTasks = sortTasks([...tasks])

  const getEmptyStateIcon = () => {
    if (title.includes('Very Important')) return 'bi-exclamation-triangle'
    if (title.includes('Moderate')) return 'bi-exclamation-circle'
    if (title.includes('Overdue')) return 'bi-clock'
    if (title.includes('Completed')) return 'bi-check-circle'
    return 'bi-list-task'
  }

  const getEmptyStateMessage = () => {
    if (title.includes('Very Important')) return 'No very important tasks found.'
    if (title.includes('Moderate')) return 'No moderate tasks found.'
    if (title.includes('Overdue')) return 'Great! No overdue tasks.'
    if (title.includes('Completed')) return 'No completed tasks yet.'
    return 'No tasks found.'
  }

  return (
    <div className="py-4">
      <div className="mb-4">
        <h1 className="h2">{title}</h1>
        <p className="text-muted">
          {tasks.length} task{tasks.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="row">
        <div className="col-12">
          {sortedTasks.length === 0 ? (
            <div className="empty-state">
              <i className={`bi ${getEmptyStateIcon()}`}></i>
              <h4>{getEmptyStateMessage()}</h4>
              <p>
                {title.includes('Completed') 
                  ? 'Complete some tasks to see them here.'
                  : 'Tasks matching this criteria will appear here.'
                }
              </p>
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
                      showTimer={showTimer}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Category-specific stats */}
      {sortedTasks.length > 0 && (
        <div className="mt-5">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Category Stats</h6>
              <div className="row text-center">
                <div className="col-md-3 col-6">
                  <div className="h5 mb-0">{tasks.length}</div>
                  <small className="text-muted">Total Tasks</small>
                </div>
                {title.includes('Overdue') && (
                  <>
                    <div className="col-md-3 col-6">
                      <div className="h5 mb-0 text-danger">
                        {tasks.filter(t => {
                          const days = Math.floor((new Date() - new Date(t.dueDate)) / (1000 * 60 * 60 * 24))
                          return days >= 7
                        }).length}
                      </div>
                      <small className="text-muted">7+ Days Overdue</small>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="h5 mb-0 text-warning">
                        {tasks.filter(t => {
                          const days = Math.floor((new Date() - new Date(t.dueDate)) / (1000 * 60 * 60 * 24))
                          return days >= 1 && days < 7
                        }).length}
                      </div>
                      <small className="text-muted">1-6 Days Overdue</small>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="h5 mb-0 text-info">
                        {tasks.filter(t => {
                          const hours = Math.floor((new Date() - new Date(t.dueDate)) / (1000 * 60 * 60))
                          return hours < 24
                        }).length}
                      </div>
                      <small className="text-muted">Less than 24h Overdue</small>
                    </div>
                  </>
                )}
                {!title.includes('Overdue') && !title.includes('Completed') && (
                  <>
                    <div className="col-md-3 col-6">
                      <div className="h5 mb-0 text-success">
                        {tasks.filter(t => t.dueDate && new Date(t.dueDate) >= new Date()).length}
                      </div>
                      <small className="text-muted">On Track</small>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="h5 mb-0 text-danger">
                        {tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date()).length}
                      </div>
                      <small className="text-muted">Overdue</small>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="h5 mb-0 text-muted">
                        {tasks.filter(t => !t.dueDate).length}
                      </div>
                      <small className="text-muted">No Due Date</small>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
