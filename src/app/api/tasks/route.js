import { NextResponse } from 'next/server'
import connectDB from '../../lib/mongodb'
import Task from '../../../models/Task'
import Project from '../../../models/Project'

export async function GET() {
  try {
    await connectDB()
    const tasks = await Task.find().populate('projectId').sort({ createdAt: -1 })
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.projectId) {
      return NextResponse.json(
        { error: 'Name and projectId are required' },
        { status: 400 }
      )
    }

    // Validate project exists
    const project = await Project.findById(body.projectId)
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    const task = await Task.create(body)
    const populatedTask = await Task.findById(task._id).populate('projectId')

    return NextResponse.json(populatedTask, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}
