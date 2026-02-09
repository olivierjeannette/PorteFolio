'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, ChevronUp, Calendar, Building2, Wrench } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { FadeIn, StaggerContainer, StaggerItem, Counter } from '@/components/animations'
import { caseStudies } from '@/data/content'

export default function CaseStudiesPage() {
  const [expandedStudy, setExpandedStudy] = useState<string | null>(caseStudies[0]?.id || null)
  const locale = useLocale()
  const t = useTranslations('caseStudies')

  const toggleStudy = (id: string) => {
    setExpandedStudy(expandedStudy === id ? null : id)
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <FadeIn>
            <span className="inline-block text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-4">
              {t('label')}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display font-bold text-display-sm md:text-display-md text-surface-900 dark:text-surface-50 mb-6">
              {t('title')} <span className="text-gradient">{t('titleAccent')}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        {/* Case Studies */}
        <StaggerContainer className="space-y-8" staggerDelay={0.15}>
          {caseStudies.map((study) => {
            const isExpanded = expandedStudy === study.id
            const studyT = (key: string) => t(`items.${study.titleKey}.${key}`)
            const solutionItems = t.raw(`items.${study.titleKey}.solution`) as string[]
            const resultItems = t.raw(`items.${study.titleKey}.results`) as string[]
            const stackItems = t.raw(`items.${study.titleKey}.stack`) as string[]

            return (
              <StaggerItem key={study.id}>
                <article className="rounded-2xl overflow-hidden bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                  {/* Metrics Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-surface-50 dark:bg-surface-800/80 border-b border-surface-200 dark:border-surface-700">
                    {study.metrics.map((metric) => (
                      <div key={metric.key} className="text-center">
                        <div className="font-display font-bold text-2xl md:text-3xl text-gradient">
                          {metric.prefix && <span>{metric.prefix}</span>}
                          <Counter to={Number(metric.value)} />
                          {metric.suffix && <span>{metric.suffix}</span>}
                        </div>
                        <p className="text-xs md:text-sm text-surface-500 mt-1">
                          {t(`items.${study.titleKey}.${metric.key}`)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Header */}
                  <div
                    className="p-6 cursor-pointer group"
                    onClick={() => toggleStudy(study.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400">
                            {studyT('industry')}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-surface-500">
                            <Calendar className="w-3 h-3" />
                            {study.duration}
                          </span>
                        </div>
                        <h2 className="font-display font-bold text-xl md:text-2xl text-surface-900 dark:text-surface-100 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                          {studyT('title')}
                        </h2>
                        <p className="text-surface-600 dark:text-surface-400 mt-1">
                          {studyT('subtitle')}
                        </p>
                      </div>
                      <button className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-500 shrink-0">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-8 space-y-8">
                          {/* Challenge */}
                          <div>
                            <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-3 flex items-center gap-2">
                              <span className="w-8 h-0.5 bg-red-500" />
                              {t('problem')}
                            </h3>
                            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                              {studyT('problem')}
                            </p>
                          </div>

                          {/* Solution */}
                          <div>
                            <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-3 flex items-center gap-2">
                              <span className="w-8 h-0.5 bg-accent-500" />
                              {t('solution')}
                            </h3>
                            <ul className="space-y-3">
                              {solutionItems.map((item: string, index: number) => (
                                <li key={index} className="flex items-start gap-3 text-surface-600 dark:text-surface-400">
                                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Results */}
                          <div>
                            <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-3 flex items-center gap-2">
                              <span className="w-8 h-0.5 bg-green-500" />
                              {t('result')}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {resultItems.map((item: string, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 p-3 rounded-lg bg-green-500/5 border border-green-500/10"
                                >
                                  <span className="w-2 h-2 rounded-full bg-green-500" />
                                  <span className="text-sm text-surface-700 dark:text-surface-300">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tech Stack */}
                          <div>
                            <h3 className="font-display font-semibold text-sm text-surface-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                              <Wrench className="w-4 h-4" />
                              {t('techStack')}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {stackItems.map((tech: string) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1.5 text-sm font-mono rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 border border-surface-200 dark:border-surface-600"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Alberta CTA */}
        <FadeIn delay={0.3}>
          <section className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-accent-600 to-accent-800 dark:from-accent-700 dark:to-accent-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent" />

            <div className="relative max-w-3xl">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
                {t('albertaCta.title')}
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                {t('albertaCta.description')}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-accent-700 font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('albertaCta.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  )
}
