'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Eye, GraduationCap, Award, Calendar } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '@/components/animations'
import { PDFModal } from '@/components/pdf-modal'
import { education } from '@/data/content'
import { cn } from '@/lib/utils'

export default function DiplomesPage() {
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null)

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <FadeIn>
            <span className="inline-block text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-4">
              Formation
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display font-bold text-display-sm md:text-display-md text-surface-900 dark:text-surface-50 mb-6">
              Diplômes & <span className="text-gradient">Certifications</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              Mes qualifications et certifications professionnelles. 
              Cliquez sur un diplôme pour voir le document complet.
            </p>
          </FadeIn>
        </div>

        {/* Diplomas Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {education.map((edu) => (
            <StaggerItem key={edu.id}>
              <HoverCard>
                <article className="group h-full p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 card-hover">
                  {/* Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="flex items-center gap-1 text-sm text-surface-500 dark:text-surface-500">
                      <Calendar className="w-4 h-4" />
                      {edu.year}
                    </span>
                  </div>

                  {/* Content */}
                  <h2 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                    {edu.title}
                  </h2>
                  <p className="text-surface-600 dark:text-surface-400 mb-4">
                    {edu.institution}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-surface-500 dark:text-surface-500 mb-4">
                      {edu.description}
                    </p>
                  )}

                  {/* Actions */}
                  {edu.pdfUrl && (
                    <div className="flex gap-2 pt-4 border-t border-surface-200 dark:border-surface-700">
                      <button
                        onClick={() => setSelectedPdf({ url: edu.pdfUrl!, title: edu.title })}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-surface-100 hover:bg-surface-200 dark:bg-surface-700 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 text-sm font-medium transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Voir
                      </button>
                      <a
                        href={edu.pdfUrl}
                        download
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-accent-500/10 hover:bg-accent-500/20 text-accent-700 dark:text-accent-300 text-sm font-medium transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Télécharger
                      </a>
                    </div>
                  )}
                </article>
              </HoverCard>
            </StaggerItem>
          ))}

          {/* Placeholder for more diplomas */}
          {education.length < 3 && (
            <StaggerItem>
              <div className="h-full p-6 rounded-2xl border-2 border-dashed border-surface-200 dark:border-surface-700 flex flex-col items-center justify-center text-center">
                <div className="p-3 rounded-xl bg-surface-100 dark:bg-surface-800 mb-4">
                  <Award className="w-6 h-6 text-surface-400" />
                </div>
                <p className="text-surface-500 dark:text-surface-500 text-sm">
                  Plus de certifications à venir...
                </p>
              </div>
            </StaggerItem>
          )}
        </StaggerContainer>

        {/* Info box */}
        <FadeIn delay={0.4}>
          <div className="mt-12 p-6 rounded-2xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  Documents vérifiables
                </h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm">
                  Tous les diplômes et certifications présentés ici sont authentiques et vérifiables. 
                  N'hésitez pas à me contacter si vous souhaitez des informations supplémentaires.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* PDF Modal */}
      {selectedPdf && (
        <PDFModal
          isOpen={!!selectedPdf}
          onClose={() => setSelectedPdf(null)}
          pdfUrl={selectedPdf.url}
          title={selectedPdf.title}
        />
      )}
    </div>
  )
}
