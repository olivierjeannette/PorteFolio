'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Loader2, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Invalid password')
      }

      // Redirect to admin diplomas page
      router.push('/admin/diplomas')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-xl border border-surface-200 dark:border-surface-700 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-display font-bold text-surface-900 dark:text-surface-100">
              Admin Access
            </h1>
            <p className="text-surface-500 mt-2">
              Enter password to manage diplomas
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                placeholder="Enter admin password"
                required
                autoFocus
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-accent-500 hover:bg-accent-600 disabled:bg-surface-300 dark:disabled:bg-surface-700 text-white disabled:text-surface-500 font-medium transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-surface-500 mt-6">
            Protected area. Unauthorized access prohibited.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
