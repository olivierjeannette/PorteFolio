'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Mail, ArrowUpRight, MessageCircle } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { personalInfo } from '@/data/content'

const navItems = [
  { key: 'home', href: '/' },
  { key: 'projects', href: '/projects' },
  { key: 'cv', href: '/cv' },
  { key: 'diplomas', href: '/diplomas' },
  { key: 'military', href: '/military' },
  { key: 'contact', href: '/contact' },
]

const socialLinks = [
  { name: 'WhatsApp', href: `https://wa.me/${personalInfo.whatsapp.replace(/\+/g, '')}`, icon: MessageCircle },
  { name: 'Email', href: `mailto:${personalInfo.email}`, icon: Mail },
  { name: 'Instagram', href: personalInfo.instagram, icon: Instagram },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const locale = useLocale()
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  return (
    <footer className="relative border-t border-surface-200 dark:border-surface-800">
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent" />

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href={`/${locale}`} className="inline-block">
              <span className="font-display font-bold text-2xl tracking-tight">
                <span className="text-gradient">O</span>
                <span className="text-surface-900 dark:text-surface-100">livier</span>
                <span className="text-surface-500 text-lg ml-1">Jeannette</span>
              </span>
            </Link>
            <p className="mt-4 text-surface-600 dark:text-surface-400 max-w-sm">
              {t('tagline')}
            </p>
            <p className="mt-2 text-sm text-surface-500 dark:text-surface-500">
              {personalInfo.location}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-surface-500 dark:text-surface-500 mb-4">
              {t('navigation')}
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-surface-600 hover:text-accent-600 dark:text-surface-400 dark:hover:text-accent-400 transition-colors duration-200"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-surface-500 dark:text-surface-500 mb-4">
              {t('connect')}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 text-surface-600 hover:text-accent-600 dark:text-surface-400 dark:hover:text-accent-400 transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 mt-6 text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 font-medium transition-colors duration-200"
            >
              {t('letsTalk')}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500 dark:text-surface-500">
            © {currentYear} Olivier Jeannette. {t('rights')}
          </p>
          <p className="text-xs text-surface-400 dark:text-surface-600">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
