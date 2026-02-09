import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { NoiseOverlay } from '@/components/noise-overlay'
import { locales, type Locale } from '@/i18n/config'
import '../globals.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const isEn = locale === 'en'

  return {
    title: {
      default: 'Olivier Jeannette | Digital Operations & Automation Specialist',
      template: '%s | Olivier Jeannette',
    },
    description: isEn
      ? 'Digital Operations & Automation Specialist with commercially validated expertise in process optimization, custom software development, and business intelligence. Available in Calgary, Alberta.'
      : 'Spécialiste en Opérations Digitales & Automatisation avec une expertise commercialement validée en optimisation de process, développement logiciel sur mesure et intelligence business. Disponible à Calgary, Alberta.',
    keywords: [
      'digital operations',
      'automation specialist',
      'process optimization',
      'custom software',
      'Calgary',
      'Alberta',
      'Canada',
      'business intelligence',
      'web development',
      'AI integration',
    ],
    authors: [{ name: 'Olivier Jeannette' }],
    creator: 'Olivier Jeannette',
    openGraph: {
      type: 'website',
      locale: isEn ? 'en_CA' : 'fr_FR',
      alternateLocale: isEn ? 'fr_FR' : 'en_CA',
      title: 'Olivier Jeannette | Digital Operations & Automation Specialist',
      description: isEn
        ? 'Digital Operations & Automation Specialist delivering measurable business results through process automation, custom software, and data-driven marketing.'
        : 'Spécialiste en Opérations Digitales & Automatisation délivrant des résultats business mesurables via l\'automatisation, le développement logiciel et le marketing data-driven.',
      siteName: 'Olivier Jeannette Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Olivier Jeannette | Digital Operations & Automation Specialist',
      description: isEn
        ? 'Digital Operations & Automation Specialist delivering measurable business results.'
        : 'Spécialiste en Opérations Digitales & Automatisation délivrant des résultats business mesurables.',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Get messages for the locale
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <NoiseOverlay />
            <Navigation />
            <main className="relative">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
