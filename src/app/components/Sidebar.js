'use client'

export default function Sidebar({ currentPage, onPageChange }) {
  const navItems = [
    { id: 'todo', label: 'To-do', icon: 'bi-list-task' },
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { id: 'projects', label: 'Projects', icon: 'bi-folder' },
    { id: 'very-important', label: 'Very Important', icon: 'bi-exclamation-triangle-fill text-danger' },
    { id: 'moderate', label: 'Moderate', icon: 'bi-exclamation-circle-fill text-warning' },
    { id: 'overdue', label: 'Overdue', icon: 'bi-clock-fill text-danger' },
    { id: 'completed', label: 'Completed', icon: 'bi-check-circle-fill text-success' }
  ]

  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <h5 className="sidebar-heading px-3 mt-4 mb-1 text-muted">
          <span>Task Manager</span>
        </h5>
        <ul className="nav flex-column">
          {navItems.map(item => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link w-100 text-start border-0 bg-transparent ${
                  currentPage === item.id ? 'active' : ''
                }`}
                onClick={() => onPageChange(item.id)}
              >
                <i className={`bi ${item.icon}`}></i> {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
