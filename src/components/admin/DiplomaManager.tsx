'use client'

import { useState } from 'react'
import { Trash2, FileText, ExternalLink, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Diploma {
  id: number
  title: string
  title_fr: string | null
  institution: string
  institution_fr: string | null
  year: string
  category: 'fitness' | 'medical' | 'military' | 'tech' | 'business'
  pdf_url: string | null
}

interface DiplomaManagerProps {
  diplomas: Diploma[]
  onDelete: (id: number) => Promise<void>
  isDeleting?: number | null
}

const categoryColors = {
  fitness: 'bg-green-500/10 text-green-600 dark:text-green-400',
  medical: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  military: 'bg-red-500/10 text-red-600 dark:text-red-400',
  tech: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  business: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
}

export function DiplomaManager({ diplomas, onDelete, isDeleting }: DiplomaManagerProps) {
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (confirmDelete === id) {
      await onDelete(id)
      setConfirmDelete(null)
    } else {
      setConfirmDelete(id)
      // Auto-reset confirmation after 3 seconds
      setTimeout(() => setConfirmDelete(null), 3000)
    }
  }

  if (diplomas.length === 0) {
    return (
      <div className="text-center py-12 text-surface-500">
        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No diplomas uploaded yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {diplomas.map((diploma) => (
        <div
          key={diploma.id}
          className="flex items-center justify-between p-4 rounded-xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700"
        >
          <div className="flex items-center gap-4">
            <div className={cn('p-2 rounded-lg', categoryColors[diploma.category])}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-surface-900 dark:text-surface-100">
                {diploma.title}
              </h3>
              <p className="text-sm text-surface-500">
                {diploma.institution} • {diploma.year}
              </p>
              {diploma.title_fr && (
                <p className="text-xs text-surface-400 mt-1">
                  FR: {diploma.title_fr}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {diploma.pdf_url && (
              <a
                href={diploma.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400 transition-colors"
                title="View PDF"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}

            <button
              onClick={() => handleDelete(diploma.id)}
              disabled={isDeleting === diploma.id}
              className={cn(
                'p-2 rounded-lg transition-colors',
                confirmDelete === diploma.id
                  ? 'bg-red-500 text-white'
                  : 'hover:bg-red-500/10 text-red-500'
              )}
              title={confirmDelete === diploma.id ? 'Click again to confirm' : 'Delete'}
            >
              {isDeleting === diploma.id ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
