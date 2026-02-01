import { put, del, list } from '@vercel/blob'

// Maximum file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024

// Allowed MIME types
const ALLOWED_TYPES = ['application/pdf']

// Validate file before upload
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Only PDF files are allowed' }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size must be less than 10MB' }
  }

  return { valid: true }
}

// Upload file to Vercel Blob
export async function uploadFile(
  file: File,
  filename: string
): Promise<{ url: string; success: true } | { success: false; error: string }> {
  try {
    // Validate file
    const validation = validateFile(file)
    if (!validation.valid) {
      return { success: false, error: validation.error! }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
    const blobFilename = `diplomas/${timestamp}-${safeFilename}`

    // Upload to Vercel Blob
    const blob = await put(blobFilename, file, {
      access: 'public',
      contentType: file.type,
    })

    return { url: blob.url, success: true }
  } catch (error) {
    console.error('Upload error:', error)
    return { success: false, error: 'Failed to upload file' }
  }
}

// Delete file from Vercel Blob
export async function deleteFile(url: string): Promise<boolean> {
  try {
    await del(url)
    return true
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}

// List all diploma files
export async function listDiplomaFiles() {
  try {
    const { blobs } = await list({ prefix: 'diplomas/' })
    return blobs
  } catch (error) {
    console.error('List error:', error)
    return []
  }
}
