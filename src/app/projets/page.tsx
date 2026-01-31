'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink, X } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '@/components/animations'
import { projects, type Project } from '@/data/content'
import { cn } from '@/lib/utils'

export default function ProjetsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <FadeIn>
            <span className="inline-block text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-4">
              Portfolio
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display font-bold text-display-sm md:text-display-md text-surface-900 dark:text-surface-50 mb-6">
              Mes <span className="text-gradient">projets</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              Une sélection de projets qui illustrent mon approche : résoudre des problèmes réels 
              avec des solutions techniques élégantes et efficaces.
            </p>
          </FadeIn>
        </div>

        {/* Projects Grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8" staggerDelay={0.1}>
          {projects.map((project) => (
            <StaggerItem key={project.id} id={project.id}>
              <HoverCard>
                <article 
                  className="group h-full rounded-2xl overflow-hidden bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 card-hover cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image */}
                  <div className="relative aspect-video bg-surface-200 dark:bg-surface-700 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-500/20 to-accent-600/10">
                      <span className="font-display font-semibold text-xl text-surface-500 dark:text-surface-400">
                        {project.title}
                      </span>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-lg bg-white/90 dark:bg-surface-900/90 text-sm font-medium text-surface-900 dark:text-surface-100">
                        Voir les détails
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Featured badge */}
                    {project.featured && (
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-accent-500/10 text-accent-600 dark:text-accent-400 mb-3">
                        Featured
                      </span>
                    )}

                    <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                      {project.title}
                    </h2>
                    
                    <p className="text-surface-600 dark:text-surface-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.metrics.map((metric, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-md bg-green-500/10 text-green-700 dark:text-green-400"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-mono rounded-md bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-surface-950/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-y-auto rounded-2xl bg-surface-50 dark:bg-surface-900 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-6 md:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  {/* Image */}
                  <div className="relative aspect-video rounded-xl bg-surface-200 dark:bg-surface-800 overflow-hidden mb-8">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-500/20 to-accent-600/10">
                      <span className="font-display font-semibold text-2xl text-surface-500 dark:text-surface-400">
                        {selectedProject.title}
                      </span>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                    <div>
                      <h2 className="font-display font-bold text-2xl md:text-3xl text-surface-900 dark:text-surface-100 mb-2">
                        {selectedProject.title}
                      </h2>
                      <p className="text-lg text-surface-600 dark:text-surface-400">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 shrink-0">
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Voir le site
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Metrics */}
                  {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 p-6 rounded-xl bg-surface-100 dark:bg-surface-800 mb-8">
                      {selectedProject.metrics.map((metric, index) => (
                        <div key={index} className="text-center">
                          <span className="block font-display font-bold text-lg text-accent-600 dark:text-accent-400">
                            {metric}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-4">
                      Description
                    </h3>
                    <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Stack */}
                  <div>
                    <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-4">
                      Technologies utilisées
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-2 text-sm font-mono rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
