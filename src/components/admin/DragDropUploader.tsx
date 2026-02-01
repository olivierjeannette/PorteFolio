'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DragDropUploaderProps {
  onUpload: (file: File, metadata: DiplomaMetadata) => Promise<void>
  isLoading?: boolean
}

interface DiplomaMetadata {
  title: string
  title_fr: string
  institution: string
  institution_fr: string
  year: string
  category: 'fitness' | 'medical' | 'military' | 'tech' | 'business'
}

const categories = [
  { value: 'fitness', label: 'Fitness & Coaching' },
  { value: 'medical', label: 'Medical & First Aid' },
  { value: 'military', label: 'Military' },
  { value: 'tech', label: 'Technical' },
  { value: 'business', label: 'Business' },
] as const

export function DragDropUploader({ onUpload, isLoading }: DragDropUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [metadata, setMetadata] = useState<DiplomaMetadata>({
    title: '',
    title_fr: '',
    institution: '',
    institution_fr: '',
    year: new Date().getFullYear().toString(),
    category: 'fitness',
  })
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const droppedFile = acceptedFiles[0]
    if (droppedFile) {
      if (droppedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed')
        return
      }
      if (droppedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        return
      }
      setFile(droppedFile)
      setError(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!metadata.title || !metadata.institution || !metadata.year) {
      setError('Please fill in all required fields')
      return
    }

    try {
      await onUpload(file!, metadata)
      // Reset form
      setFile(null)
      setMetadata({
        title: '',
        title_fr: '',
        institution: '',
        institution_fr: '',
        year: new Date().getFullYear().toString(),
        category: 'fitness',
      })
    } catch {
      setError('Failed to upload diploma')
    }
  }

  const removeFile = () => {
    setFile(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Drag & Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
          isDragActive
            ? 'border-accent-500 bg-accent-500/10'
            : 'border-surface-300 dark:border-surface-600 hover:border-accent-400',
          file && 'border-green-500 bg-green-500/10'
        )}
      >
        <input {...getInputProps()} />

        {file ? (
          <div className="flex items-center justify-center gap-3">
            <FileText className="w-8 h-8 text-green-500" />
            <div className="text-left">
              <p className="font-medium text-surface-900 dark:text-surface-100">
                {file.name}
              </p>
              <p className="text-sm text-surface-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeFile()
              }}
              className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
            >
              <X className="w-5 h-5 text-surface-500" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 mx-auto text-surface-400 mb-4" />
            <p className="text-surface-600 dark:text-surface-400">
              {isDragActive
                ? 'Drop the PDF here...'
                : 'Drag & drop a PDF here, or click to select'}
            </p>
            <p className="text-sm text-surface-500 mt-2">Maximum 10MB</p>
          </>
        )}
      </div>

      {/* Metadata Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title EN */}
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Title (EN) *
          </label>
          <input
            type="text"
            value={metadata.title}
            onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            placeholder="CrossFit Level 2 Trainer"
            required
          />
        </div>

        {/* Title FR */}
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Title (FR)
          </label>
          <input
            type="text"
            value={metadata.title_fr}
            onChange={(e) => setMetadata({ ...metadata, title_fr: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            placeholder="CrossFit Level 2 Trainer"
          />
        </div>

        {/* Institution EN */}
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Institution (EN) *
          </label>
          <input
            type="text"
            value={metadata.institution}
            onChange={(e) => setMetadata({ ...metadata, institution: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            placeholder="CrossFit Inc."
            required
          />
        </div>

        {/* Institution FR */}
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Institution (FR)
          </label>
          <input
            type="text"
            value={metadata.institution_fr}
            onChange={(e) => setMetadata({ ...metadata, institution_fr: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            placeholder="CrossFit Inc."
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Year *
          </label>
          <input
            type="text"
            value={metadata.year}
            onChange={(e) => setMetadata({ ...metadata, year: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            placeholder="2024"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Category *
          </label>
          <select
            value={metadata.category}
            onChange={(e) =>
              setMetadata({
                ...metadata,
                category: e.target.value as DiplomaMetadata['category'],
              })
            }
            className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            required
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !metadata.title || !metadata.institution}
        className={cn(
          'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all',
          isLoading || !metadata.title || !metadata.institution
            ? 'bg-surface-300 dark:bg-surface-700 text-surface-500 cursor-not-allowed'
            : 'bg-accent-500 hover:bg-accent-600 text-white'
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Upload Diploma
          </>
        )}
      </button>
    </form>
  )
}
