'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, MapPin, Mail, Linkedin, Github, Globe, Calendar, Building2, GraduationCap } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import { personalInfo, experiences, education, skills } from '@/data/content'
import { cn } from '@/lib/utils'

// Language toggle
type Language = 'fr' | 'en'

export default function CVPage() {
  const [lang, setLang] = useState<Language>('fr')

  const content = {
    fr: {
      title: 'Curriculum Vitae',
      download: 'Télécharger PDF',
      summary: 'Résumé Professionnel',
      summaryText: `Entrepreneur et architecte opérationnel avec plus de 5 ans d'expérience en gestion d'entreprise et développement technique. Expert en automatisation des opérations, création d'applications métier et optimisation des processus. Recherche des opportunités à Calgary, Canada, où je peux apporter ma vision hybride tech/business.`,
      experience: 'Expérience Professionnelle',
      education: 'Formation & Certifications',
      skills: 'Compétences',
      languages: 'Langues',
      langFr: 'Français',
      langFrLevel: 'Natif',
      langEn: 'Anglais',
      langEnLevel: 'Professionnel (B2/C1)',
    },
    en: {
      title: 'Resume',
      download: 'Download PDF',
      summary: 'Professional Summary',
      summaryText: `Entrepreneur and Ops Architect with 5+ years of experience in business management and technical development. Expert in operations automation, custom business applications, and process optimization. Seeking opportunities in Calgary, Canada, where I can bring my hybrid tech/business perspective.`,
      experience: 'Professional Experience',
      education: 'Education & Certifications',
      skills: 'Skills',
      languages: 'Languages',
      langFr: 'French',
      langFrLevel: 'Native',
      langEn: 'English',
      langEnLevel: 'Professional (B2/C1)',
    },
  }

  const t = content[lang]

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <FadeIn>
              <span className="inline-block text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-4">
                {t.title}
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
              {/* Language toggle */}
              <div className="flex rounded-lg bg-surface-100 dark:bg-surface-800 p-1">
                <button
                  onClick={() => setLang('fr')}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                    lang === 'fr'
                      ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 shadow-sm'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
                  )}
                >
                  FR
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                    lang === 'en'
                      ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 shadow-sm'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
                  )}
                >
                  EN
                </button>
              </div>

              {/* Download button */}
              <a href="/cv.pdf" download className="btn-primary">
                <Download className="w-4 h-4" />
                {t.download}
              </a>
            </div>
          </FadeIn>
        </div>

        {/* CV Content - Canadian format (no photo, no age) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Contact Info Bar */}
            <FadeIn>
              <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-surface-100 dark:bg-surface-800/50">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 text-sm text-surface-600 hover:text-accent-600 dark:text-surface-400 dark:hover:text-accent-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {personalInfo.email}
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
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-surface-600 hover:text-accent-600 dark:text-surface-400 dark:hover:text-accent-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </FadeIn>

            {/* Professional Summary */}
            <FadeIn delay={0.1}>
              <section>
                <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-accent-500" />
                  {t.summary}
                </h2>
                <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                  {t.summaryText}
                </p>
              </section>
            </FadeIn>

            {/* Experience */}
            <FadeIn delay={0.2}>
              <section>
                <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-accent-500" />
                  {t.experience}
                </h2>
                <StaggerContainer className="space-y-8" staggerDelay={0.1}>
                  {experiences.map((exp) => (
                    <StaggerItem key={exp.id}>
                      <div className="relative pl-6 border-l-2 border-surface-200 dark:border-surface-700">
                        {/* Timeline dot */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent-500 border-4 border-surface-50 dark:border-surface-900" />
                        
                        <div className="mb-2">
                          <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100">
                            {exp.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-surface-500 dark:text-surface-500">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {exp.company}
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
                          {exp.description.map((item, index) => (
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
                  ))}
                </StaggerContainer>
              </section>
            </FadeIn>

            {/* Education */}
            <FadeIn delay={0.3}>
              <section>
                <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-accent-500" />
                  {t.education}
                </h2>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4" staggerDelay={0.1}>
                  {education.map((edu) => (
                    <StaggerItem key={edu.id}>
                      <div className="p-4 rounded-xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-surface-900 dark:text-surface-100">
                              {edu.title}
                            </h3>
                            <p className="text-sm text-surface-500 dark:text-surface-500">
                              {edu.institution} • {edu.year}
                            </p>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </section>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Skills */}
            <FadeIn delay={0.4}>
              <div className="p-6 rounded-2xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
                <h2 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-6">
                  {t.skills}
                </h2>

                <div className="space-y-6">
                  {Object.entries(skills).map(([key, category]) => (
                    <div key={key}>
                      <h3 className="text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-3">
                        {category.title}
                      </h3>
                      <div className="space-y-3">
                        {category.items.slice(0, 5).map((skill) => (
                          <div key={skill.name}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-surface-700 dark:text-surface-300">{skill.name}</span>
                              <span className="text-surface-500 font-mono text-xs">{skill.level}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-surface-200 dark:bg-surface-700 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                                className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Languages */}
            <FadeIn delay={0.5}>
              <div className="p-6 rounded-2xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
                <h2 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-4">
                  {t.languages}
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-surface-700 dark:text-surface-300">{t.langFr}</span>
                    <span className="text-sm text-accent-600 dark:text-accent-400">{t.langFrLevel}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-700 dark:text-surface-300">{t.langEn}</span>
                    <span className="text-sm text-accent-600 dark:text-accent-400">{t.langEnLevel}</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Download CTA */}
            <FadeIn delay={0.6}>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 text-white">
                <h3 className="font-display font-semibold text-lg mb-2">
                  {lang === 'fr' ? 'Intéressé ?' : 'Interested?'}
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  {lang === 'fr' 
                    ? 'Téléchargez mon CV complet en PDF.'
                    : 'Download my complete resume in PDF format.'}
                </p>
                <a
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-accent-700 font-medium text-sm hover:bg-white/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {t.download}
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}
