'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Eye, GraduationCap, Award, Calendar, Shield, Heart, Code2, TrendingUp, Upload } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '@/components/animations'
import { PDFModal } from '@/components/pdf-modal'
import { education } from '@/data/content'
import { cn } from '@/lib/utils'

type Category = 'all' | 'fitness' | 'medical' | 'military' | 'tech' | 'business'

const categoryIcons = {
  fitness: GraduationCap,
  medical: Heart,
  military: Shield,
  tech: Code2,
  business: TrendingUp,
}

const categoryColors = {
  fitness: 'bg-green-500/10 text-green-600 dark:text-green-400',
  medical: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  military: 'bg-red-500/10 text-red-600 dark:text-red-400',
  tech: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  business: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
}

export default function DiplomasPage() {
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const locale = useLocale()
  const t = useTranslations('diplomas')

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: locale === 'en' ? 'All' : 'Tous' },
    { key: 'fitness', label: t('categories.fitness') },
    { key: 'medical', label: t('categories.medical') },
    { key: 'military', label: locale === 'en' ? 'Military' : 'Militaire' },
    { key: 'tech', label: t('categories.tech') },
  ]

  const filteredEducation = activeCategory === 'all'
    ? education
    : education.filter((e) => e.category === activeCategory)

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <FadeIn>
            <span className="inline-block text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-4">
              {locale === 'en' ? 'Education' : 'Formation'}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display font-bold text-display-sm md:text-display-md text-surface-900 dark:text-surface-50 mb-6">
              {t('title')}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        {/* Category Filter */}
        <FadeIn delay={0.3}>
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  activeCategory === cat.key
                    ? 'bg-accent-500 text-white'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Diplomas Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {filteredEducation.map((edu) => {
            const Icon = categoryIcons[edu.category] || GraduationCap
            const colorClass = categoryColors[edu.category] || 'bg-accent-500/10 text-accent-600 dark:text-accent-400'

            return (
              <StaggerItem key={edu.id}>
                <HoverCard>
                  <article className="group h-full p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 card-hover">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn("p-3 rounded-xl", colorClass)}>
                        <Icon className="w-6 h-6" />
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

                    {/* Category badge */}
                    <span className={cn(
                      "inline-block px-2 py-1 text-xs font-medium rounded-md mb-4",
                      colorClass
                    )}>
                      {categories.find(c => c.key === edu.category)?.label || edu.category}
                    </span>

                    {/* Actions */}
                    {edu.pdfUrl ? (
                      <div className="flex gap-2 pt-4 border-t border-surface-200 dark:border-surface-700">
                        <button
                          onClick={() => setSelectedPdf({ url: edu.pdfUrl!, title: edu.title })}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-surface-100 hover:bg-surface-200 dark:bg-surface-700 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 text-sm font-medium transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          {t('view')}
                        </button>
                        <a
                          href={edu.pdfUrl}
                          download
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-accent-500/10 hover:bg-accent-500/20 text-accent-700 dark:text-accent-300 text-sm font-medium transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          {t('download')}
                        </a>
                      </div>
                    ) : (
                      <div className="pt-4 border-t border-surface-200 dark:border-surface-700">
                        <p className="text-xs text-surface-400 dark:text-surface-500 text-center">
                          {locale === 'en' ? 'PDF to be uploaded' : 'PDF à uploader'}
                        </p>
                      </div>
                    )}
                  </article>
                </HoverCard>
              </StaggerItem>
            )
          })}

          {/* Placeholder for more diplomas */}
          <StaggerItem>
            <div className="h-full p-6 rounded-2xl border-2 border-dashed border-surface-200 dark:border-surface-700 flex flex-col items-center justify-center text-center min-h-[250px]">
              <div className="p-3 rounded-xl bg-surface-100 dark:bg-surface-800 mb-4">
                <Upload className="w-6 h-6 text-surface-400" />
              </div>
              <p className="text-surface-500 dark:text-surface-500 text-sm mb-2">
                {t('addPlaceholder')}
              </p>
              <p className="text-xs text-surface-400">
                {locale === 'en'
                  ? 'Add PDFs to /public/diplomes/'
                  : 'Ajoutez les PDFs dans /public/diplomes/'}
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Info box */}
        <FadeIn delay={0.5}>
          <div className="mt-12 p-6 rounded-2xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  {locale === 'en' ? 'Verifiable Documents' : 'Documents vérifiables'}
                </h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm">
                  {locale === 'en'
                    ? 'All diplomas and certifications presented here are authentic and verifiable. Feel free to contact me for additional information.'
                    : 'Tous les diplômes et certifications présentés ici sont authentiques et vérifiables. N\'hésitez pas à me contacter pour des informations supplémentaires.'}
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
