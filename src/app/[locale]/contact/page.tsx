'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Send, MessageCircle, Mail, Instagram, MapPin, CheckCircle, AlertCircle, Loader2, Linkedin } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { FadeIn, StaggerContainer, StaggerItem, Magnetic } from '@/components/animations'
import { personalInfo } from '@/data/content'
import { cn } from '@/lib/utils'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const locale = useLocale()
  const t = useTranslations('contact')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.name} from ${formData.company || 'N/A'}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\n\nMessage:\n${formData.message}`
      )

      // Open email client
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`

      // Show success after a short delay
      setTimeout(() => {
        setStatus('success')
        setFormData({ name: '', email: '', company: '', message: '' })
      }, 500)
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactMethods = [
    {
      name: t('whatsapp'),
      href: `https://wa.me/${personalInfo.whatsapp.replace(/\+/g, '')}`,
      icon: MessageCircle,
      color: 'bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20',
      description: t('whatsappDesc'),
    },
    {
      name: t('email'),
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20',
      description: personalInfo.email,
    },
    {
      name: t('linkedin'),
      href: personalInfo.linkedin,
      icon: Linkedin,
      color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20',
      description: 'LinkedIn',
    },
    {
      name: t('instagram'),
      href: personalInfo.instagram,
      icon: Instagram,
      color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20',
      description: '@jackson.skali',
    },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <FadeIn>
            <span className="inline-block text-sm font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-4">
              Contact
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <FadeIn className="lg:col-span-7" delay={0.3}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    {t('form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('form.namePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    {t('form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('form.emailPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  {t('form.company')}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={t('form.companyPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  {t('form.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('form.messagePlaceholder')}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center gap-4">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={cn(
                      'btn-primary',
                      status === 'loading' && 'opacity-75 cursor-not-allowed'
                    )}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('form.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t('form.submit')}
                      </>
                    )}
                  </button>
                </Magnetic>

                {/* Status messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-green-600 dark:text-green-400"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">{t('form.success')}</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-red-600 dark:text-red-400"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">{t('form.error')}</span>
                  </motion.div>
                )}
              </div>
            </form>
          </FadeIn>

          {/* Contact Methods */}
          <div className="lg:col-span-5 space-y-8">
            <FadeIn delay={0.4}>
              <div className="p-6 rounded-2xl bg-surface-100 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
                <h2 className="font-display font-semibold text-lg text-surface-900 dark:text-surface-100 mb-6">
                  {t('or')}
                </h2>

                <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                  {contactMethods.map((method) => (
                    <StaggerItem key={method.name}>
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-xl transition-all duration-200',
                          method.color
                        )}
                      >
                        <div className="p-2 rounded-lg bg-white/50 dark:bg-surface-900/50">
                          <method.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-surface-900 dark:text-surface-100">
                            {method.name}
                          </p>
                          <p className="text-sm text-surface-500 dark:text-surface-500">
                            {method.description}
                          </p>
                        </div>
                      </a>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>

            {/* Location */}
            <FadeIn delay={0.5}>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-500/10 to-accent-600/5 border border-accent-500/20">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-surface-900 dark:text-surface-100 mb-1">
                      {t('location')}
                    </h3>
                    <p className="text-surface-600 dark:text-surface-400">
                      {personalInfo.location}
                    </p>
                    <p className="text-sm text-surface-500 dark:text-surface-500 mt-2">
                      {t('locationAvailable')}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Response time */}
            <FadeIn delay={0.6}>
              <p className="text-sm text-surface-500 dark:text-surface-500 text-center">
                {t('responseTime')}
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}
