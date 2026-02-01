import { NextRequest, NextResponse } from 'next/server'
import { getDiplomas, createDiploma, type CreateDiplomaInput } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { uploadFile } from '@/lib/blob'

// GET - Public: Get all diplomas
export async function GET() {
  try {
    const diplomas = await getDiplomas()
    return NextResponse.json(diplomas)
  } catch (error) {
    console.error('Error fetching diplomas:', error)
    return NextResponse.json(
      { error: 'Failed to fetch diplomas' },
      { status: 500 }
    )
  }
}

// POST - Protected: Create new diploma with file upload
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse form data
    const formData = await request.formData()

    const title = formData.get('title') as string
    const title_fr = formData.get('title_fr') as string | null
    const institution = formData.get('institution') as string
    const institution_fr = formData.get('institution_fr') as string | null
    const year = formData.get('year') as string
    const category = formData.get('category') as CreateDiplomaInput['category']
    const file = formData.get('file') as File | null

    // Validate required fields
    if (!title || !institution || !year || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, institution, year, category' },
        { status: 400 }
      )
    }

    // Validate category
    const validCategories = ['fitness', 'medical', 'military', 'tech', 'business']
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      )
    }

    let pdf_url: string | undefined

    // Upload file if provided
    if (file && file.size > 0) {
      const uploadResult = await uploadFile(file, file.name)
      if (!uploadResult.success) {
        return NextResponse.json(
          { error: uploadResult.error },
          { status: 400 }
        )
      }
      pdf_url = uploadResult.url
    }

    // Create diploma in database
    const diploma = await createDiploma({
      title,
      title_fr: title_fr || undefined,
      institution,
      institution_fr: institution_fr || undefined,
      year,
      category,
      pdf_url,
    })

    return NextResponse.json(diploma, { status: 201 })
  } catch (error) {
    console.error('Error creating diploma:', error)
    return NextResponse.json(
      { error: 'Failed to create diploma' },
      { status: 500 }
    )
  }
}
