'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Medal, Award, FileText, Download, Eye, Calendar, Heart, Target, Users, Zap } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '@/components/animations'
import { PDFModal } from '@/components/pdf-modal'
import { militaryRecord, education } from '@/data/content'
import { cn } from '@/lib/utils'

// Group items by type
const serviceItems = militaryRecord.filter((item) => item.type === 'service')
const medals = militaryRecord.filter((item) => item.type === 'medal')
const diplomasFromRecord = militaryRecord.filter((item) => item.type === 'diploma')

// Get military and medical certifications from education
const militaryCertifications = education.filter(
  (item) => item.category === 'military' || item.category === 'medical'
)

export default function MilitaryPage() {
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null)
  const locale = useLocale()
  const t = useTranslations('military')
  const tEdu = useTranslations('cv.educations')

  const values = [
    {
      icon: Shield,
      titleKey: 'discipline',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      icon: Zap,
      titleKey: 'resilience',
      color: 'bg-red-500/10 text-red-600 dark:text-red-400',
    },
    {
      icon: Users,
      titleKey: 'leadership',
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      icon: Target,
      titleKey: 'adaptability',
      color: 'bg-green-500/10 text-green-600 dark:text-green-400',
    },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <FadeIn>
            <span className="inline-block text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-4">
              {t('title')}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display font-bold text-display-sm md:text-display-md text-surface-900 dark:text-surface-50 mb-6">
              {t('headerTitle')} <span className="text-gradient">{t('headerTitleAccent')}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        {/* Service Overview */}
        <FadeIn delay={0.3}>
          <div className="mb-16">
            <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent-500" />
              {t('service.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Service Card */}
              <HoverCard>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-surface-900 to-surface-800 dark:from-surface-800 dark:to-surface-900 border border-surface-700 text-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-red-500/20">
                      <Shield className="w-8 h-8 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-2xl">
                        {t('service.unitValue')}
                      </h3>
                      <p className="text-surface-400">{t('service.unit')}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-surface-700">
                      <span className="text-surface-400">{t('service.role')}</span>
                      <span className="font-medium text-red-400">{t('service.roleValue')}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-surface-700">
                      <span className="text-surface-400">{t('service.rank')}</span>
                      <span className="font-medium">{t('service.rankValue')}</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-surface-400">{t('service.period')}</span>
                      <span className="font-medium text-surface-300">{t('service.periodValue')}</span>
                    </div>
                  </div>
                </div>
              </HoverCard>

              {/* Combat Paramedic Card */}
              <HoverCard>
                <div className="p-8 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-red-500/10">
                      <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-surface-900 dark:text-surface-100">
                        {t('combatParamedic.title')}
                      </h3>
                      <p className="text-surface-500">
                        {t('combatParamedic.subtitle')}
                      </p>
                    </div>
                  </div>

                  <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                    {t('combatParamedic.description')}
                  </p>
                </div>
              </HoverCard>
            </div>
          </div>
        </FadeIn>

        {/* Skills Acquired */}
        <FadeIn delay={0.4}>
          <div className="mb-16">
            <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-accent-500" />
              {t('skills.title')}
            </h2>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.1}>
              {(t.raw('skills.items') as string[]).map((skill: string, index: number) => (
                <StaggerItem key={index}>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-surface-700 dark:text-surface-300">{skill}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* Medals Section */}
        <FadeIn delay={0.5}>
          <div className="mb-16">
            <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
              <Medal className="w-5 h-5 text-accent-500" />
              {t('medals.title')}
            </h2>

            {medals.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
                {medals.map((medal) => (
                  <StaggerItem key={medal.id}>
                    <HoverCard>
                      <div className="group p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 card-hover text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center">
                          <Medal className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <h3 className="font-display font-semibold text-surface-900 dark:text-surface-100 mb-1">
                          {medal.title}
                        </h3>
                        <p className="text-sm text-surface-500">{medal.year}</p>
                      </div>
                    </HoverCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="p-8 rounded-2xl border-2 border-dashed border-surface-200 dark:border-surface-700 text-center">
                <Medal className="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                <p className="text-surface-500 dark:text-surface-500">
                  {t('medals.placeholder')}
                </p>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Military Diplomas */}
        <FadeIn delay={0.6}>
          <div className="mb-16">
            <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent-500" />
              {t('diplomas.title')}
            </h2>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.05}>
              {militaryCertifications.map((cert) => (
                <StaggerItem key={cert.id}>
                  <HoverCard>
                    <div className="p-5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 h-full">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "p-3 rounded-lg flex-shrink-0",
                          cert.category === 'military'
                            ? "bg-red-500/10"
                            : "bg-green-500/10"
                        )}>
                          {cert.category === 'military' ? (
                            <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                          ) : (
                            <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-1">
                            {tEdu(`${cert.id}.title`)}
                          </h3>
                          <p className="text-sm text-surface-500 mb-2">
                            {tEdu(`${cert.id}.institution`)}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-surface-400">
                            <Calendar className="w-3 h-3" />
                            <span>{cert.year}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* Value Proposition */}
        <FadeIn delay={0.7}>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-surface-100 to-surface-50 dark:from-surface-800 dark:to-surface-900 border border-surface-200 dark:border-surface-700">
            <div className="max-w-3xl">
              <h3 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-6">
                {t('values.title')}
              </h3>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
                {values.map((value) => (
                  <StaggerItem key={value.titleKey}>
                    <div className="text-center">
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4",
                        value.color
                      )}>
                        <value.icon className="w-7 h-7" />
                      </div>
                      <h4 className="font-display font-semibold text-surface-900 dark:text-surface-100 mb-2">
                        {t(`values.${value.titleKey}.title`)}
                      </h4>
                      <p className="text-sm text-surface-600 dark:text-surface-400">
                        {t(`values.${value.titleKey}.description`)}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
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
