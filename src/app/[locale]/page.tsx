'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowDown, Code2, TrendingUp, Users, Heart, MapPin, Download, Shield } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { FadeIn, StaggerContainer, StaggerItem, Counter, Magnetic, HoverCard } from '@/components/animations'
import { personalInfo, skills, projects } from '@/data/content'
import { cn } from '@/lib/utils'

// Icon map
const iconMap = {
  Code2,
  TrendingUp,
  Users,
  Heart,
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const t = useTranslations()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="relative">
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 gradient-mesh" />

        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
              scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-accent-500/10 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
              scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-accent-500/10 to-transparent rounded-full blur-3xl"
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative container-custom pt-32 pb-20"
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Status badge */}
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
                </span>
                <span className="text-sm font-medium text-accent-700 dark:text-accent-300">
                  {t('hero.badge')}
                </span>
              </div>
            </FadeIn>

            {/* Main heading */}
            <FadeIn delay={0.2}>
              <h1 className="font-display font-bold text-display-md md:text-display-lg lg:text-display-xl text-surface-900 dark:text-surface-50 mb-6">
                {personalInfo.name}{' '}
                <span className="text-gradient">{personalInfo.surname}</span>
              </h1>
            </FadeIn>

            {/* Title */}
            <FadeIn delay={0.3}>
              <p className="font-display text-xl md:text-2xl text-surface-600 dark:text-surface-400 mb-4">
                {personalInfo.title}
              </p>
            </FadeIn>

            {/* Location */}
            <FadeIn delay={0.4}>
              <div className="flex items-center justify-center gap-2 text-surface-500 dark:text-surface-500 mb-8">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location}</span>
              </div>
            </FadeIn>

            {/* Tagline */}
            <FadeIn delay={0.5}>
              <p className="text-2xl md:text-3xl font-light text-surface-700 dark:text-surface-300 max-w-2xl mx-auto mb-12">
                {t('hero.tagline')}
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.6}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Magnetic>
                  <Link href={`/${locale}/projects`} className="btn-primary">
                    {t('hero.cta.projects')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link href={`/${locale}/cv`} className="btn-secondary">
                    <Download className="w-4 h-4" />
                    {t('hero.cta.cv')}
                  </Link>
                </Magnetic>
              </div>
            </FadeIn>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-surface-400 dark:text-surface-600"
            >
              <span className="text-xs uppercase tracking-wider">{t('hero.scroll')}</span>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* BIO SECTION */}
      {/* ============================================ */}
      <section className="section relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Photo */}
            <FadeIn className="lg:col-span-5" direction="right">
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
                {/* Decorative frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-accent-500/20 to-accent-500/5 rounded-3xl -rotate-3" />
                <div className="absolute -inset-4 bg-gradient-to-tr from-accent-500/10 to-transparent rounded-3xl rotate-3" />

                {/* Image placeholder */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-surface-200 dark:bg-surface-800">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-surface-400 dark:text-surface-600 p-6">
                    <Shield className="w-16 h-16 mb-4 opacity-50" />
                    <span className="text-sm text-center">Photo coming soon</span>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl glass shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-display font-bold text-gradient">5+</span>
                    <span className="text-xs text-surface-600 dark:text-surface-400">
                      {t('about.yearsExp')}
                    </span>
                  </div>
                </motion.div>
              </div>
            </FadeIn>

            {/* Bio content */}
            <div className="lg:col-span-7">
              <FadeIn>
                <span className="inline-block text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-4">
                  {t('about.label')}
                </span>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2 className="font-display font-bold text-display-sm md:text-display-md text-surface-900 dark:text-surface-50 mb-8">
                  {t('about.title')}<br />
                  <span className="text-gradient">{t('about.titleAccent')}</span>
                </h2>
              </FadeIn>

              <StaggerContainer className="space-y-4 mb-8" staggerDelay={0.15}>
                {(t.raw('about.bio') as string[]).map((paragraph: string, index: number) => (
                  <StaggerItem key={index}>
                    <p className="text-lg text-surface-600 dark:text-surface-400 leading-relaxed">
                      {paragraph}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Quick stats */}
              <FadeIn delay={0.4}>
                <div className="grid grid-cols-3 gap-6 p-6 rounded-2xl bg-surface-100 dark:bg-surface-800/50">
                  <div className="text-center">
                    <div className="font-display font-bold text-2xl md:text-3xl text-gradient">
                      <Counter to={120} suffix="K€" />
                    </div>
                    <p className="text-xs md:text-sm text-surface-500 dark:text-surface-500 mt-1">
                      {t('about.stats.revenue')}
                    </p>
                  </div>
                  <div className="text-center border-x border-surface-200 dark:border-surface-700">
                    <div className="font-display font-bold text-2xl md:text-3xl text-gradient">
                      <Counter to={5} />
                    </div>
                    <p className="text-xs md:text-sm text-surface-500 dark:text-surface-500 mt-1">
                      {t('about.stats.years')}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="font-display font-bold text-2xl md:text-3xl text-gradient">
                      <Counter to={3} suffix="K€" />
                    </div>
                    <p className="text-xs md:text-sm text-surface-500 dark:text-surface-500 mt-1">
                      {t('about.stats.saved')}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SKILLS SECTION */}
      {/* ============================================ */}
      <section className="section relative bg-surface-100/50 dark:bg-surface-900/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="inline-block text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-4">
                {t('skills.label')}
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display font-bold text-display-sm md:text-display-md text-surface-900 dark:text-surface-50">
                {t('skills.title')} <span className="text-gradient">{t('skills.titleAccent')}</span>
              </h2>
            </FadeIn>
          </div>

          {/* Skill Categories - 3 columns using simplified skills data */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {Object.entries(skills).map(([key, category]) => {
              const Icon = iconMap[category.icon as keyof typeof iconMap] || Code2
              return (
                <StaggerItem key={key}>
                  <HoverCard>
                    <div className="h-full p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 card-hover">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100">
                          {category.title}
                        </h3>
                      </div>

                      {/* Show top skills with progress bars */}
                      <div className="space-y-4">
                        {category.items.slice(0, 4).map((skill) => (
                          <div key={skill.name}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-surface-700 dark:text-surface-300">
                                {skill.name}
                              </span>
                              <span className="text-xs font-mono text-surface-500">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="skill-bar">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                                className="skill-bar-fill"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/${locale}/cv#skills`}
                        className="mt-6 inline-flex items-center gap-1 text-sm text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
                      >
                        {locale === 'en' ? 'View all' : 'Voir tout'}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </HoverCard>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURED PROJECTS */}
      {/* ============================================ */}
      <section className="section">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <FadeIn>
                <span className="inline-block text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-4">
                  {t('projects.label')}
                </span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-display font-bold text-display-sm md:text-display-md text-surface-900 dark:text-surface-50">
                  {t('projects.title')} <span className="text-gradient">{t('projects.titleAccent')}</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 font-medium transition-colors"
              >
                {t('projects.viewAll')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6" staggerDelay={0.15}>
            {featuredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <article className="group h-full rounded-2xl overflow-hidden bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 card-hover">
                  {/* Image */}
                  <div className="relative aspect-video bg-surface-200 dark:bg-surface-700 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-surface-400 dark:text-surface-500">
                      <span className="text-sm font-medium">{project.title}</span>
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-mono rounded-md bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
                      >
                        {t('projects.viewLive')}
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="section relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-600 to-accent-800 dark:from-accent-700 dark:to-accent-900" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5" />

        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent" />
        <div className="absolute -bottom-1/2 -left-1/4 w-1/2 h-full bg-white/5 rounded-full blur-3xl" />

        <div className="relative container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className="font-display font-bold text-display-sm md:text-display-md text-white mb-6">
                {t('cta.title')}
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-lg md:text-xl text-white/80 mb-10">
                {t('cta.description')}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Magnetic>
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-accent-700 font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {t('cta.contact')}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href={`/${locale}/cv`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <Download className="w-5 h-5" />
                    {t('cta.viewCv')}
                  </Link>
                </Magnetic>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
