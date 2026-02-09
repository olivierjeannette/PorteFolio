'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Download, Printer, MapPin, Mail, Linkedin, Calendar, Building2, GraduationCap, Shield, MessageCircle, FileDown, Loader2, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import { personalInfo, experiences, education } from '@/data/content'
import { cn } from '@/lib/utils'
import { CVPrintable } from '@/components/cv-printable'

export default function CVPage() {
  const locale = useLocale()
  const t = useTranslations('cv')
  const tMilitary = useTranslations('military')
  const tSkills = useTranslations('skills')
  const cvRef = useRef<HTMLDivElement>(null)
  const printableRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleExportPDF = async () => {
    if (!printableRef.current || isExporting) return

    setIsExporting(true)

    try {
      const html2canvas = (await import('html2canvas-pro')).default
      const { jsPDF } = await import('jspdf')

      const canvas = await html2canvas(printableRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      // Letter size dimensions in mm
      const imgWidth = 215.9
      const pageHeight = 279.4
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter',
      })

      let heightLeft = imgHeight
      let position = 0
      const imgData = canvas.toDataURL('image/jpeg', 0.95)

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`CV-Olivier-Jeannette-${locale.toUpperCase()}.pdf`)
    } catch (error) {
      console.error('Error exporting PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  // Prepare translations for printable component
  const cvTranslations = {
    summary: { title: t('summary.title'), content: t('summary.content') },
    experience: { title: t('experience.title') },
    education: { title: t('education.title') },
    skills: { title: t('skills.title') },
    languages: {
      title: t('languages.title'),
      french: t('languages.french'),
      frenchLevel: t('languages.frenchLevel'),
      english: t('languages.english'),
      englishLevel: t('languages.englishLevel'),
    },
    targetRoles: t.raw('targetRoles') as { title: string; roles: string[] } | undefined,
    experiences: experiences.reduce((acc, exp) => {
      try {
        acc[exp.id] = {
          title: t(`experiences.${exp.id}.title`),
          company: t(`experiences.${exp.id}.company`),
          description: t.raw(`experiences.${exp.id}.description`) as string[],
        }
      } catch {
        // Skip if translation not found
      }
      return acc
    }, {} as Record<string, { title: string; company: string; description: string[] }>),
    educations: education.reduce((acc, edu) => {
      try {
        acc[edu.id] = {
          title: t(`educations.${edu.id}.title`),
          institution: t(`educations.${edu.id}.institution`),
        }
      } catch {
        // Skip if translation not found
      }
      return acc
    }, {} as Record<string, { title: string; institution: string }>),
  }

  const skillsTranslations = {
    categories: {
      digitalOperations: {
        title: tSkills('categories.digitalOperations.title'),
        items: {
          customSoftware: tSkills('categories.digitalOperations.items.customSoftware'),
          processAutomation: tSkills('categories.digitalOperations.items.processAutomation'),
          dataInfra: tSkills('categories.digitalOperations.items.dataInfra'),
          cloudDeployment: tSkills('categories.digitalOperations.items.cloudDeployment'),
          aiIntegration: tSkills('categories.digitalOperations.items.aiIntegration'),
        },
      },
      businessAutomation: {
        title: tSkills('categories.businessAutomation.title'),
        items: {
          digitalMarketing: tSkills('categories.businessAutomation.items.digitalMarketing'),
          crmAutomation: tSkills('categories.businessAutomation.items.crmAutomation'),
          revenueOpt: tSkills('categories.businessAutomation.items.revenueOpt'),
          processAudit: tSkills('categories.businessAutomation.items.processAudit'),
        },
      },
      leadership: {
        title: tSkills('categories.leadership.title'),
        items: {
          autonomousExecution: tSkills('categories.leadership.items.autonomousExecution'),
          crisisManagement: tSkills('categories.leadership.items.crisisManagement'),
          systemsThinking: tSkills('categories.leadership.items.systemsThinking'),
          crossFunctional: tSkills('categories.leadership.items.crossFunctional'),
        },
      },
    },
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <FadeIn>
              <span className="inline-block text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-4">
                {t('title')}
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display font-bold text-display-sm md:text-display-md text-surface-900 dark:text-surface-50">
                {personalInfo.name}{' '}
                <span className="text-gradient">{personalInfo.surname}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-surface-600 dark:text-surface-400 mt-2">
                {personalInfo.title}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="flex items-center gap-3">
              {/* Print button */}
              <button
                onClick={handlePrint}
                className="btn-secondary print:hidden"
              >
                <Printer className="w-4 h-4" />
                {t('print')}
              </button>

              {/* Export PDF button */}
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="btn-primary print:hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileDown className="w-4 h-4" />
                )}
                {t('exportPdf')}
              </button>
            </div>
          </FadeIn>
        </div>

        {/* CV Content - Canadian format (no photo, no age) */}
        <div ref={cvRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:gap-4">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10 print:space-y-6">
            {/* Contact Info Bar */}
            <FadeIn>
              <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-surface-100 dark:bg-surface-800/50 print:bg-gray-100 print:p-2">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 text-sm text-surface-600 hover:text-accent-600 dark:text-surface-400 dark:hover:text-accent-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {personalInfo.email}
                </a>
                <a
                  href={`https://wa.me/${personalInfo.whatsapp.replace(/\+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-surface-600 hover:text-accent-600 dark:text-surface-400 dark:hover:text-accent-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <span className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
                  <MapPin className="w-4 h-4" />
                  {personalInfo.location}
                </span>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-surface-600 hover:text-accent-600 dark:text-surface-400 dark:hover:text-accent-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </FadeIn>

            {/* Professional Summary */}
            <FadeIn delay={0.1}>
              <section>
                <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-accent-500" />
                  {t('summary.title')}
                </h2>
                <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                  {t('summary.content')}
                </p>
              </section>
            </FadeIn>

            {/* Experience */}
            <FadeIn delay={0.2}>
              <section>
                <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-accent-500" />
                  {t('experience.title')}
                </h2>
                <StaggerContainer className="space-y-8" staggerDelay={0.1}>
                  {experiences.map((exp) => {
                    const expTitle = t(`experiences.${exp.id}.title`)
                    const expCompany = t(`experiences.${exp.id}.company`)
                    const expDescription = t.raw(`experiences.${exp.id}.description`) as string[]

                    return (
                      <StaggerItem key={exp.id}>
                        <div className="relative pl-6 border-l-2 border-surface-200 dark:border-surface-700">
                          {/* Timeline dot */}
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent-500 border-4 border-surface-50 dark:border-surface-900" />

                          <div className="mb-2">
                            <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100">
                              {expTitle}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-surface-500 dark:text-surface-500">
                              <span className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                {expCompany}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {exp.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {exp.period}
                              </span>
                            </div>
                          </div>

                          <ul className="space-y-2 mb-4">
                            {expDescription.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-surface-600 dark:text-surface-400">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 text-xs font-medium rounded-md bg-accent-500/10 text-accent-700 dark:text-accent-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </StaggerItem>
                    )
                  })}
                </StaggerContainer>
              </section>
            </FadeIn>

            {/* Military Skills Section */}
            <FadeIn delay={0.3}>
              <section>
                <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-accent-500" />
                  <Shield className="w-5 h-5" />
                  {t('militarySkills.title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(tMilitary.raw('skills.items') as string[]).map((skill: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 rounded-lg bg-surface-100 dark:bg-surface-800/50"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-sm text-surface-700 dark:text-surface-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Education */}
            <FadeIn delay={0.4}>
              <section id="skills">
                <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-accent-500" />
                  {t('education.title')}
                </h2>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4" staggerDelay={0.1}>
                  {education.map((edu) => {
                    const eduTitle = t(`educations.${edu.id}.title`)
                    const eduInstitution = t(`educations.${edu.id}.institution`)

                    return (
                      <StaggerItem key={edu.id}>
                        <div className="p-4 rounded-xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "p-2 rounded-lg",
                              edu.category === 'military' && "bg-red-500/10 text-red-600 dark:text-red-400",
                              edu.category === 'medical' && "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                              edu.category === 'fitness' && "bg-green-500/10 text-green-600 dark:text-green-400",
                              edu.category === 'tech' && "bg-purple-500/10 text-purple-600 dark:text-purple-400",
                              edu.category === 'business' && "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
                            )}>
                              <GraduationCap className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-medium text-surface-900 dark:text-surface-100">
                                {eduTitle}
                              </h3>
                              <p className="text-sm text-surface-500 dark:text-surface-500">
                                {eduInstitution} • {edu.year}
                              </p>
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                    )
                  })}
                </StaggerContainer>

                <Link
                  href={`/${locale}/diplomas`}
                  className="mt-4 inline-flex items-center gap-1 text-sm text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
                >
                  {t('education.viewAll')}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </section>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8 print:space-y-4">
            {/* Skills */}
            <FadeIn delay={0.5}>
              <div className="p-6 rounded-2xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 print:p-4">
                <h2 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-6">
                  {t('skills.title')}
                </h2>

                <div className="space-y-6">
                  {(['digitalOperations', 'businessAutomation', 'leadership'] as const).map((categoryKey) => {
                    const skillsConfig = {
                      digitalOperations: { items: ['customSoftware', 'processAutomation', 'dataInfra', 'cloudDeployment', 'aiIntegration'] as const, levels: [90, 85, 85, 90, 95] },
                      businessAutomation: { items: ['digitalMarketing', 'crmAutomation', 'revenueOpt', 'processAudit'] as const, levels: [85, 85, 90, 90] },
                      leadership: { items: ['autonomousExecution', 'crisisManagement', 'systemsThinking', 'crossFunctional'] as const, levels: [95, 95, 90, 90] },
                    }
                    const config = skillsConfig[categoryKey]

                    return (
                      <div key={categoryKey}>
                        <h3 className="text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-3">
                          {tSkills(`categories.${categoryKey}.title`)}
                        </h3>
                        <div className="space-y-3">
                          {config.items.map((itemKey, index) => (
                            <div key={itemKey}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-surface-700 dark:text-surface-300">
                                  {tSkills(`categories.${categoryKey}.items.${itemKey}`)}
                                </span>
                                <span className="text-surface-500 font-mono text-xs">{config.levels[index]}%</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-surface-200 dark:bg-surface-700 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${config.levels[index]}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                                  className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </FadeIn>

            {/* Languages */}
            <FadeIn delay={0.6}>
              <div className="p-6 rounded-2xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 print:p-4">
                <h2 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-4">
                  {t('languages.title')}
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-surface-700 dark:text-surface-300">{t('languages.french')}</span>
                    <span className="text-sm text-accent-600 dark:text-accent-400">{t('languages.frenchLevel')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-700 dark:text-surface-300">{t('languages.english')}</span>
                    <span className="text-sm text-accent-600 dark:text-accent-400">{t('languages.englishLevel')}</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Download CTA */}
            <FadeIn delay={0.7}>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 text-white print:hidden">
                <h3 className="font-display font-semibold text-lg mb-2">
                  {t('interested.title')}
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  {t('interested.description')}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-accent-700 font-medium text-sm hover:bg-white/90 transition-colors disabled:opacity-50"
                  >
                    {isExporting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    PDF
                  </button>
                  <a
                    href={`https://wa.me/${personalInfo.whatsapp.replace(/\+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Hidden printable CV for PDF export - Canadian format */}
        <div className="fixed left-[-9999px] top-0">
          <CVPrintable
            ref={printableRef}
            locale={locale}
            translations={cvTranslations}
            skillsTranslations={skillsTranslations}
          />
        </div>
      </div>
    </div>
  )
}
