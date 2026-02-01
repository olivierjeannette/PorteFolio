import { NextRequest, NextResponse } from 'next/server'
import { getDiplomaById, deleteDiploma } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { deleteFile } from '@/lib/blob'

// GET - Public: Get single diploma
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const diploma = await getDiplomaById(parseInt(id, 10))

    if (!diploma) {
      return NextResponse.json(
        { error: 'Diploma not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(diploma)
  } catch (error) {
    console.error('Error fetching diploma:', error)
    return NextResponse.json(
      { error: 'Failed to fetch diploma' },
      { status: 500 }
    )
  }
}

// DELETE - Protected: Delete diploma
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const diplomaId = parseInt(id, 10)

    // Get diploma to find the PDF URL
    const diploma = await getDiplomaById(diplomaId)
    if (!diploma) {
      return NextResponse.json(
        { error: 'Diploma not found' },
        { status: 404 }
      )
    }

    // Delete file from Vercel Blob if exists
    if (diploma.pdf_url) {
      await deleteFile(diploma.pdf_url)
    }

    // Delete from database
    await deleteDiploma(diplomaId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting diploma:', error)
    return NextResponse.json(
      { error: 'Failed to delete diploma' },
      { status: 500 }
    )
  }
}
