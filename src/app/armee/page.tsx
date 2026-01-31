'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Medal, Award, FileText, Download, Eye, Calendar, MapPin } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '@/components/animations'
import { PDFModal } from '@/components/pdf-modal'
import { militaryRecord } from '@/data/content'
import { cn } from '@/lib/utils'

// Group items by type
const serviceItems = militaryRecord.filter((item) => item.type === 'service')
const medals = militaryRecord.filter((item) => item.type === 'medal')
const diplomas = militaryRecord.filter((item) => item.type === 'diploma')

export default function ArmeePage() {
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null)

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <FadeIn>
            <span className="inline-block text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-4">
              Service Militaire
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display font-bold text-display-sm md:text-display-md text-surface-900 dark:text-surface-50 mb-6">
              Parcours <span className="text-gradient">Militaire</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              Mon parcours au sein des forces armées françaises. Une expérience formatrice 
              qui a forgé ma discipline, mon leadership et ma capacité à prendre des décisions sous pression.
            </p>
          </FadeIn>
        </div>

        {/* Service Overview */}
        <FadeIn delay={0.3}>
          <div className="mb-16">
            <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent-500" />
              Service
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceItems.map((item) => (
                <HoverCard key={item.id}>
                  <div className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 card-hover">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-surface-500 dark:text-surface-500 mb-3 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {item.year}
                        </p>
                        <p className="text-surface-600 dark:text-surface-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              ))}

              {serviceItems.length === 0 && (
                <div className="col-span-full p-8 rounded-2xl border-2 border-dashed border-surface-200 dark:border-surface-700 text-center">
                  <Shield className="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                  <p className="text-surface-500 dark:text-surface-500">
                    Informations du service militaire à compléter
                  </p>
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Medals */}
        <FadeIn delay={0.4}>
          <div className="mb-16">
            <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
              <Medal className="w-5 h-5 text-accent-500" />
              Médailles & Décorations
            </h2>
            
            {medals.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
                {medals.map((medal) => (
                  <StaggerItem key={medal.id}>
                    <HoverCard>
                      <div className="group p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 card-hover text-center">
                        {/* Medal image or icon */}
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center">
                          {medal.imageUrl ? (
                            <img 
                              src={medal.imageUrl} 
                              alt={medal.title}
                              className="w-16 h-16 object-contain"
                            />
                          ) : (
                            <Medal className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                          )}
                        </div>

                        <h3 className="font-display font-semibold text-surface-900 dark:text-surface-100 mb-1 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                          {medal.title}
                        </h3>
                        <p className="text-sm text-surface-500 dark:text-surface-500 mb-2">
                          {medal.year}
                        </p>
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {medal.description}
                        </p>
                      </div>
                    </HoverCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="p-8 rounded-2xl border-2 border-dashed border-surface-200 dark:border-surface-700 text-center">
                <Medal className="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                <p className="text-surface-500 dark:text-surface-500">
                  Médailles à ajouter
                </p>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Military Diplomas */}
        <FadeIn delay={0.5}>
          <div>
            <h2 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent-500" />
              Diplômes Militaires
            </h2>
            
            {diplomas.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
                {diplomas.map((diploma) => (
                  <StaggerItem key={diploma.id}>
                    <HoverCard>
                      <div className="group p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 card-hover">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-1 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                              {diploma.title}
                            </h3>
                            <p className="text-sm text-surface-500 dark:text-surface-500 mb-2">
                              {diploma.year}
                            </p>
                            <p className="text-surface-600 dark:text-surface-400 mb-4">
                              {diploma.description}
                            </p>

                            {diploma.pdfUrl && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setSelectedPdf({ url: diploma.pdfUrl!, title: diploma.title })}
                                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 dark:bg-surface-700 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 text-sm transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                  Voir
                                </button>
                                <a
                                  href={diploma.pdfUrl}
                                  download
                                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent-500/10 hover:bg-accent-500/20 text-accent-700 dark:text-accent-300 text-sm transition-colors"
                                >
                                  <Download className="w-4 h-4" />
                                  PDF
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </HoverCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="p-8 rounded-2xl border-2 border-dashed border-surface-200 dark:border-surface-700 text-center">
                <Award className="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
                <p className="text-surface-500 dark:text-surface-500">
                  Diplômes militaires à ajouter
                </p>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Value proposition */}
        <FadeIn delay={0.6}>
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-surface-100 to-surface-50 dark:from-surface-800 dark:to-surface-900 border border-surface-200 dark:border-surface-700">
            <div className="max-w-3xl">
              <h3 className="font-display font-semibold text-xl text-surface-900 dark:text-surface-100 mb-4">
                Pourquoi c'est pertinent
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center mb-3">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="font-medium text-surface-900 dark:text-surface-100 mb-1">
                    Discipline
                  </h4>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Rigueur et organisation dans l'exécution des tâches
                  </p>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center mb-3">
                    <Medal className="w-5 h-5" />
                  </div>
                  <h4 className="font-medium text-surface-900 dark:text-surface-100 mb-1">
                    Leadership
                  </h4>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Capacité à diriger et motiver une équipe sous pression
                  </p>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center mb-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="font-medium text-surface-900 dark:text-surface-100 mb-1">
                    Résilience
                  </h4>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    Adaptation et performance dans des environnements exigeants
                  </p>
                </div>
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
