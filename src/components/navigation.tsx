'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Monitor, Globe } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import { locales, localeFlags, type Locale } from '@/i18n/config'

const navItems = [
  { key: 'home', href: '/' },
  { key: 'projects', href: '/projects' },
  { key: 'cv', href: '/cv' },
  { key: 'diplomas', href: '/diplomas' },
  { key: 'military', href: '/military' },
  { key: 'contact', href: '/contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const { theme, setTheme } = useTheme()
  const t = useTranslations('nav')

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const switchLocale = (newLocale: Locale) => {
    // Get the current path without locale prefix
    const currentPath = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${newLocale}${currentPath}`)
    setShowLangMenu(false)
  }

  const ThemeIcon = () => {
    if (!mounted) return <Monitor className="w-5 h-5" />
    if (theme === 'light') return <Sun className="w-5 h-5" />
    if (theme === 'dark') return <Moon className="w-5 h-5" />
    return <Monitor className="w-5 h-5" />
  }

  // Get the base path for comparison (remove locale prefix)
  const getBasePath = (path: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    return pathWithoutLocale === path || pathWithoutLocale === `${path}/`
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'py-3' : 'py-5'
        )}
      >
        <div className="container-custom">
          <nav
            className={cn(
              'flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500',
              isScrolled
                ? 'glass shadow-lg shadow-surface-900/5 dark:shadow-surface-950/20'
                : 'bg-transparent'
            )}
          >
            {/* Logo */}
            <Link href={`/${locale}`} className="relative group">
              <span className="font-display font-bold text-xl tracking-tight">
                <span className="text-gradient">O</span>
                <span className="text-surface-900 dark:text-surface-100">livier</span>
                <span className="text-surface-500 dark:text-surface-500 text-sm ml-1">
                  J.
                </span>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={cn(
                    'relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
                    getBasePath(item.href)
                      ? 'text-accent-600 dark:text-accent-400'
                      : 'text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100'
                  )}
                >
                  {t(item.key)}
                  {getBasePath(item.href) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-accent-500/10 dark:bg-accent-400/10 rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className={cn(
                    'p-2.5 rounded-xl transition-all duration-200 flex items-center gap-1',
                    'text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100',
                    'hover:bg-surface-100 dark:hover:bg-surface-800'
                  )}
                  aria-label="Switch language"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase">{locale}</span>
                </button>

                <AnimatePresence>
                  {showLangMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 py-2 w-32 rounded-xl bg-white dark:bg-surface-800 shadow-lg border border-surface-200 dark:border-surface-700"
                    >
                      {locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => switchLocale(loc)}
                          className={cn(
                            'w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors',
                            locale === loc
                              ? 'bg-accent-500/10 text-accent-600 dark:text-accent-400'
                              : 'text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-700'
                          )}
                        >
                          <span>{localeFlags[loc]}</span>
                          <span>{loc === 'en' ? 'English' : 'Français'}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={cycleTheme}
                className={cn(
                  'p-2.5 rounded-xl transition-all duration-200',
                  'text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100',
                  'hover:bg-surface-100 dark:hover:bg-surface-800'
                )}
                aria-label="Toggle theme"
              >
                <ThemeIcon />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className={cn(
                  'md:hidden p-2.5 rounded-xl transition-all duration-200',
                  'text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100',
                  'hover:bg-surface-100 dark:hover:bg-surface-800'
                )}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-surface-950/60 backdrop-blur-sm"
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-surface-50 dark:bg-surface-900 shadow-2xl"
            >
              <div className="flex flex-col h-full p-6 pt-24">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={`/${locale}${item.href}`}
                        onClick={toggleMenu}
                        className={cn(
                          'flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200',
                          getBasePath(item.href)
                            ? 'bg-accent-500/10 text-accent-600 dark:text-accent-400'
                            : 'text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800'
                        )}
                      >
                        {t(item.key)}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Language Switcher */}
                <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-800">
                  <p className="text-xs text-surface-500 mb-3 uppercase tracking-wider">
                    Language
                  </p>
                  <div className="flex gap-2">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          switchLocale(loc)
                          toggleMenu()
                        }}
                        className={cn(
                          'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                          locale === loc
                            ? 'bg-accent-500 text-white'
                            : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                        )}
                      >
                        {localeFlags[loc]} {loc.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-surface-200 dark:border-surface-800">
                  <p className="text-xs text-surface-500 dark:text-surface-500">
                    Theme: {mounted ? theme : 'system'}
                  </p>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
