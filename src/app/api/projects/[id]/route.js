import { NextResponse } from 'next/server'
import connectDB from '../../../lib/mongodb'
import Project from '../../../../models/Project'
import Task from '../../../../models/Task'

export async function PUT(request, { params }) {
  try {
    await connectDB()
    const { id } = params
    const body = await request.json()

    const project = await Project.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { id } = params

    // Delete all tasks associated with this project
    await Task.deleteMany({ projectId: id })

    // Delete the project
    const project = await Project.findByIdAndDelete(id)

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Project and associated tasks deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
