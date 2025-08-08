# To-Do List App - Complete Task Management Solution

A comprehensive task management web application built with Next.js 14, featuring real-time updates, project categorization, and priority tracking.

![Task Manager](https://img.shields.io/badge/Next.js-14-black) ![MongoDB](https://img.shields.io/badge/MongoDB-green) ![Bootstrap](https://img.shields.io/badge/Bootstrap-5-blue)

---

## 🚀 Features

### **Core Task Management**
- ✅ Create, edit, delete, and complete tasks
- ✅ Three priority levels: **Very Important**, **Moderate**, and **Normal**
- ✅ Due date tracking with visual indicators
- ✅ Rich task descriptions and metadata
- ✅ Smart task sorting by urgency and due dates

### **Real-Time Overdue Tracking**
- ⏳ Live overdue timers that update every second
- ⏱ Displays format: `"2h 15m overdue"`
- 🔔 Visual alerts for overdue tasks
- 📊 Overdue statistics and breakdown

### **Project Organization**
- 📁 Create and manage unlimited projects
- 📌 Project-specific task views
- 📈 Project statistics and progress tracking
- 📑 Task grouping within projects by priority

### **Multiple Dashboard Views**
- 📝 **To-do Page**: All active tasks with smart sorting
- 📊 **Dashboard**: Tasks grouped by project and importance
- 📂 **Projects**: Project management with drill-down capabilities
- 📌 **Category Pages**: Filter by Very Important, Moderate, Overdue, Completed
- 📈 **Live Statistics**: Real-time task counts and progress

### **User Experience**
- 🎨 Clean, modern Bootstrap-based design
- 📱 Fully responsive (desktop, tablet, mobile)
- ⚡ Real-time updates without page refresh
- 🧭 Intuitive navigation with visual feedback
- 💾 Persistent data storage

---

## 🛠 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- MongoDB (optional — uses localStorage for demo)

### Installation
```bash
# 1. Download and extract
unzip todo-app-nextjs-project.zip
cd todo-app-project

# 2. Install dependencies
npm install
# or
yarn install

# 3. Environment setup (optional)
cp .env.local.example .env.local
MONGODB_URI=mongodb://localhost:27017/todoapp

# 4. Run development server
npm run dev
# or
yarn dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📖 User Guide

### Navigation Structure
- **To-do** — All active tasks
- **Dashboard** — Overview grouped by project and priority
- **Projects** — Manage projects and view tasks
- **Very Important** — Urgent tasks
- **Moderate** — Medium-priority tasks
- **Overdue** — Past-due tasks with live timers
- **Completed** — Finished tasks

### Adding Tasks
1. Click **"Add Task"**
2. Enter task name, due date, project, and importance
3. Save to update instantly

### Managing Projects
- Add projects from **Projects** page
- View project-specific tasks grouped by urgency

### Overdue Timers
- Show `"Xh Ym overdue"`
- Updates every second
- Always sorted at the top

---

## 📂 Project Structure
```
todo-app-project/
├── app/
│   ├── api/
│   ├── components/
│   ├── lib/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── models/
├── public/
├── package.json
├── next.config.js
├── .env.local.example
└── README.md
```

---

## 🖥 Tech Stack
- **Frontend**: Next.js 14, React 18, Bootstrap 5
- **Backend**: Next.js API Routes
- **Database**: MongoDB + Mongoose

---

## 🎨 Styling
- **Priority Colors**:
  - Very Important: 🔴 Red
  - Moderate: 🟡 Yellow
  - Normal: ⚪ Gray
- Fully responsive for all devices

---

## ⚙ Configuration
Create `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/todoapp
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

---

## 🧩 Development Commands
```bash
npm run dev       # Dev server
npm run build     # Production build
npm start         # Start server
npm run lint      # Lint code
```

---

## 📜 License
MIT License — Free to use and modify.

---

**Built with ❤ using Next.js, React, and MongoDB**
