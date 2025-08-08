'use client'

import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import TodoPage from './components/TodoPage'
import DashboardPage from './components/DashboardPage'
import ProjectsPage from './components/ProjectsPage'
import CategoryPage from './components/CategoryPage'
import ProjectDetailPage from './components/ProjectDetailPage'

const SAMPLE_PROJECTS = [
  {
    id: "1",
    name: "Work Project",
    description: "Office tasks and deadlines",
    createdAt: "2025-08-01"
  },
  {
    id: "2", 
    name: "Personal",
    description: "Personal goals and tasks",
    createdAt: "2025-08-02"
  },
  {
    id: "3",
    name: "Learning",
    description: "Courses and skill development", 
    createdAt: "2025-08-03"
  }
]

const SAMPLE_TASKS = [
  {
    id: "1",
    name: "Complete project proposal",
    description: "Draft and submit the Q4 project proposal",
    dueDate: "2025-08-10",
    projectId: "1",
    importance: "Very Important",
    completed: false,
    createdAt: "2025-08-05"
  },
  {
    id: "2", 
    name: "Review client feedback",
    description: "Go through client comments and prepare response",
    dueDate: "2025-08-07",
    projectId: "1", 
    importance: "Very Important",
    completed: false,
    createdAt: "2025-08-06"
  },
  {
    id: "3",
    name: "Grocery shopping",
    description: "Buy weekly groceries",
    dueDate: "2025-08-09",
    projectId: "2",
    importance: "Moderate", 
    completed: false,
    createdAt: "2025-08-07"
  },
  {
    id: "4",
    name: "Complete online course module",
    description: "Finish React advanced concepts module",
    dueDate: "2025-08-15",
    projectId: "3",
    importance: "Moderate",
    completed: false, 
    createdAt: "2025-08-06"
  },
  {
    id: "5",
    name: "Submit monthly report", 
    description: "Compile and submit July monthly report",
    dueDate: "2025-08-06",
    projectId: "1",
    importance: "Very Important",
    completed: false,
    createdAt: "2025-08-04"
  }
]

export default function Home() {
  const [currentPage, setCurrentPage] = useState('todo')
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    // Load data from localStorage or initialize with sample data
    const savedProjects = localStorage.getItem('todoProjects')
    const savedTasks = localStorage.getItem('todoTasks')

    if (savedProjects && savedTasks) {
      setProjects(JSON.parse(savedProjects))
      setTasks(JSON.parse(savedTasks))
    } else {
      setProjects(SAMPLE_PROJECTS)
      setTasks(SAMPLE_TASKS)
      localStorage.setItem('todoProjects', JSON.stringify(SAMPLE_PROJECTS))
      localStorage.setItem('todoTasks', JSON.stringify(SAMPLE_TASKS))
    }
  }, [])

  const saveData = (newProjects, newTasks) => {
    localStorage.setItem('todoProjects', JSON.stringify(newProjects))
    localStorage.setItem('todoTasks', JSON.stringify(newTasks))
  }

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    }
    const newProjects = [...projects, newProject]
    setProjects(newProjects)
    saveData(newProjects, tasks)
  }

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    }
    const newTasks = [...tasks, newTask]
    setTasks(newTasks)
    saveData(projects, newTasks)
  }

  const updateTask = (taskId, updates) => {
    const newTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    )
    setTasks(newTasks)
    saveData(projects, newTasks)
  }

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId)
    setTasks(newTasks)
    saveData(projects, newTasks)
  }

  const deleteProject = (projectId) => {
    const newProjects = projects.filter(project => project.id !== projectId)
    const newTasks = tasks.filter(task => task.projectId !== projectId)
    setProjects(newProjects)
    setTasks(newTasks)
    saveData(newProjects, newTasks)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'todo':
        return <TodoPage tasks={tasks} projects={projects} onUpdateTask={updateTask} onDeleteTask={deleteTask} onAddTask={addTask} />
      case 'dashboard':
        return <DashboardPage tasks={tasks} projects={projects} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
      case 'projects':
        return <ProjectsPage 
          projects={projects} 
          tasks={tasks} 
          onAddProject={addProject} 
          onDeleteProject={deleteProject}
          onSelectProject={(project) => {
            setSelectedProject(project)
            setCurrentPage('project-detail')
          }}
        />
      case 'project-detail':
        return <ProjectDetailPage 
          project={selectedProject}
          tasks={tasks.filter(task => task.projectId === selectedProject?.id)}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onBack={() => setCurrentPage('projects')}
        />
      case 'very-important':
        return <CategoryPage 
          title="Very Important Tasks"
          tasks={tasks.filter(task => task.importance === 'Very Important' && !task.completed)} 
          projects={projects}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      case 'moderate':
        return <CategoryPage 
          title="Moderate Tasks"
          tasks={tasks.filter(task => task.importance === 'Moderate' && !task.completed)} 
          projects={projects}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      case 'overdue':
        return <CategoryPage 
          title="Overdue Tasks"
          tasks={tasks.filter(task => {
            if (task.completed) return false
            const today = new Date()
            const dueDate = new Date(task.dueDate)
            return dueDate < today
          })} 
          projects={projects}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          showTimer={true}
        />
      case 'completed':
        return <CategoryPage 
          title="Completed Tasks"
          tasks={tasks.filter(task => task.completed)} 
          projects={projects}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      default:
        return <TodoPage tasks={tasks} projects={projects} onUpdateTask={updateTask} onDeleteTask={deleteTask} onAddTask={addTask} />
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
