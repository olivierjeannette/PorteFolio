'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { GraduationCap, LogOut, RefreshCw, CheckCircle } from 'lucide-react'
import { DragDropUploader } from '@/components/admin/DragDropUploader'
import { DiplomaManager } from '@/components/admin/DiplomaManager'

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

export default function AdminDiplomasPage() {
  const [diplomas, setDiplomas] = useState<Diploma[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Fetch diplomas
  const fetchDiplomas = useCallback(async () => {
    try {
      const response = await fetch('/api/diplomas')
      if (!response.ok) throw new Error('Failed to fetch diplomas')
      const data = await response.json()
      setDiplomas(data)
    } catch {
      setError('Failed to load diplomas')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDiplomas()
  }, [fetchDiplomas])

  // Handle upload
  const handleUpload = async (
    file: File | null,
    metadata: {
      title: string
      title_fr: string
      institution: string
      institution_fr: string
      year: string
      category: 'fitness' | 'medical' | 'military' | 'tech' | 'business'
    }
  ) => {
    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      if (file) formData.append('file', file)
      formData.append('title', metadata.title)
      formData.append('title_fr', metadata.title_fr)
      formData.append('institution', metadata.institution)
      formData.append('institution_fr', metadata.institution_fr)
      formData.append('year', metadata.year)
      formData.append('category', metadata.category)

      const response = await fetch('/api/diplomas', {
        method: 'POST',
        body: formData,
      })

      if (response.status === 401) {
        router.push('/admin/login')
        return
      }

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to upload')
      }

      setSuccessMessage('Diploma uploaded successfully!')
      setTimeout(() => setSuccessMessage(null), 3000)
      await fetchDiplomas()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  // Handle delete
  const handleDelete = async (id: number) => {
    setIsDeleting(id)
    setError(null)

    try {
      const response = await fetch(`/api/diplomas/${id}`, {
        method: 'DELETE',
      })

      if (response.status === 401) {
        router.push('/admin/login')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to delete diploma')
      }

      setSuccessMessage('Diploma deleted successfully!')
      setTimeout(() => setSuccessMessage(null), 3000)
      await fetchDiplomas()
    } catch {
      setError('Failed to delete diploma')
    } finally {
      setIsDeleting(null)
    }
  }

  // Handle logout
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-surface-900 dark:text-surface-100">
                Diploma Manager
              </h1>
              <p className="text-surface-500">Upload and manage your certifications</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchDiplomas}
              className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-4 mb-6 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400"
          >
            <CheckCircle className="w-5 h-5" />
            {successMessage}
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-6 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-6 mb-8"
        >
          <h2 className="text-lg font-display font-semibold text-surface-900 dark:text-surface-100 mb-6">
            Upload New Diploma
          </h2>
          <DragDropUploader onUpload={handleUpload} isLoading={isUploading} />
        </motion.div>

        {/* Diplomas List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-6"
        >
          <h2 className="text-lg font-display font-semibold text-surface-900 dark:text-surface-100 mb-6">
            Existing Diplomas ({diplomas.length})
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-surface-400" />
            </div>
          ) : (
            <DiplomaManager
              diplomas={diplomas}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}
