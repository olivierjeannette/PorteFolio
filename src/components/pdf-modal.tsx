'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ExternalLink } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

interface PDFModalProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
  title: string
}

export function PDFModal({ isOpen, onClose, pdfUrl, title }: PDFModalProps) {
  // Close on escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-surface-950/90 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                className="fixed inset-4 md:inset-8 z-50 flex flex-col bg-surface-50 dark:bg-surface-900 rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200 dark:border-surface-800">
                  <Dialog.Title className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100">
                    {title}
                  </Dialog.Title>

                  <div className="flex items-center gap-2">
                    {/* Download */}
                    <a
                      href={pdfUrl}
                      download
                      className={cn(
                        'p-2 rounded-lg transition-colors duration-200',
                        'text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100',
                        'hover:bg-surface-100 dark:hover:bg-surface-800'
                      )}
                      title="Télécharger"
                    >
                      <Download className="w-5 h-5" />
                    </a>

                    {/* Open in new tab */}
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'p-2 rounded-lg transition-colors duration-200',
                        'text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100',
                        'hover:bg-surface-100 dark:hover:bg-surface-800'
                      )}
                      title="Ouvrir dans un nouvel onglet"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>

                    {/* Close */}
                    <Dialog.Close asChild>
                      <button
                        className={cn(
                          'p-2 rounded-lg transition-colors duration-200',
                          'text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100',
                          'hover:bg-surface-100 dark:hover:bg-surface-800'
                        )}
                        title="Fermer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </Dialog.Close>
                  </div>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 bg-surface-100 dark:bg-surface-800">
                  <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0`}
                    className="w-full h-full"
                    title={title}
                  />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  )
}
