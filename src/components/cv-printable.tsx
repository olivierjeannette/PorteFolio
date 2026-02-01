'use client'

import { forwardRef } from 'react'
import { MapPin, Mail, Linkedin, Phone, Globe } from 'lucide-react'
import { personalInfo, experiences, education } from '@/data/content'

interface CVPrintableProps {
  locale: string
  translations: {
    summary: { title: string; content: string }
    experience: { title: string }
    education: { title: string }
    skills: { title: string }
    languages: { title: string; french: string; frenchLevel: string; english: string; englishLevel: string }
    targetRoles?: { title: string; roles: string[] }
    experiences: Record<string, { title: string; company: string; description: string[] }>
    educations: Record<string, { title: string; institution: string }>
  }
  skillsTranslations: {
    categories: {
      dev: { title: string; items: Record<string, string> }
      business: { title: string; items: Record<string, string> }
      leadership: { title: string; items: Record<string, string> }
    }
  }
}

export const CVPrintable = forwardRef<HTMLDivElement, CVPrintableProps>(
  ({ locale, translations: t, skillsTranslations: tSkills }, ref) => {
    return (
      <div
        ref={ref}
        data-cv-content
        className="bg-white text-gray-900 p-8 max-w-[850px] mx-auto"
        style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', lineHeight: '1.4' }}
      >
        {/* Header - Canadian format: Name, title, contact info (NO photo, NO age) */}
        <header className="border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {personalInfo.name} {personalInfo.surname}
          </h1>
          <p className="text-lg text-gray-700 mb-3">{personalInfo.title}</p>

          {/* Contact info in one line */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {personalInfo.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {personalInfo.whatsapp}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {personalInfo.location}
            </span>
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              LinkedIn
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              laskali.eu
            </span>
          </div>
        </header>

        {/* Target Roles - Important for Canadian job market */}
        {t.targetRoles && (
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-2 border-b border-gray-300 pb-1">
              {t.targetRoles.title}
            </h2>
            <p className="text-gray-700">{t.targetRoles.roles.join(' • ')}</p>
          </section>
        )}

        {/* Professional Summary */}
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-2 border-b border-gray-300 pb-1">
            {t.summary.title}
          </h2>
          <p className="text-gray-700">{t.summary.content}</p>
        </section>

        {/* Professional Experience */}
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3 border-b border-gray-300 pb-1">
            {t.experience.title}
          </h2>

          {experiences.map((exp) => {
            const expData = t.experiences[exp.id]
            if (!expData) return null

            return (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{expData.title}</h3>
                  <span className="text-gray-600 text-xs">{exp.period}</span>
                </div>
                <p className="text-gray-700 italic mb-2">{expData.company} — {exp.location}</p>
                <ul className="list-disc list-inside space-y-0.5 text-gray-700 ml-2">
                  {expData.description.map((item, idx) => (
                    <li key={idx} className="text-xs">{item}</li>
                  ))}
                </ul>
                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {exp.skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </section>

        {/* Two columns: Skills + Education/Languages */}
        <div className="grid grid-cols-2 gap-6">
          {/* Skills Column */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3 border-b border-gray-300 pb-1">
              {t.skills.title}
            </h2>

            {(['dev', 'business', 'leadership'] as const).map((categoryKey) => {
              const category = tSkills.categories[categoryKey]
              const skillsToShow = {
                dev: ['aiCoding', 'frontend', 'backend', 'deployment', 'automation'],
                business: ['marketing', 'sales', 'processOpt', 'funnels'],
                leadership: ['autonomy', 'adaptability', 'stress', 'problemSolving'],
              }[categoryKey]

              return (
                <div key={categoryKey} className="mb-3">
                  <h3 className="font-semibold text-gray-800 text-xs mb-1">{category.title}</h3>
                  <ul className="text-xs text-gray-700 space-y-0.5">
                    {skillsToShow.map((skill) => (
                      <li key={skill}>• {category.items[skill as keyof typeof category.items]}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </section>

          {/* Education & Languages Column */}
          <div>
            {/* Education */}
            <section className="mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3 border-b border-gray-300 pb-1">
                {t.education.title}
              </h2>

              {education.slice(0, 6).map((edu) => {
                const eduData = t.educations[edu.id]
                if (!eduData) return null

                return (
                  <div key={edu.id} className="mb-2">
                    <p className="font-semibold text-gray-900 text-xs">{eduData.title}</p>
                    <p className="text-gray-600 text-xs">{eduData.institution} • {edu.year}</p>
                  </div>
                )
              })}
            </section>

            {/* Languages */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-2 border-b border-gray-300 pb-1">
                {t.languages.title}
              </h2>
              <div className="text-xs text-gray-700 space-y-1">
                <p><strong>{t.languages.french}:</strong> {t.languages.frenchLevel}</p>
                <p><strong>{t.languages.english}:</strong> {t.languages.englishLevel}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
)

CVPrintable.displayName = 'CVPrintable'
