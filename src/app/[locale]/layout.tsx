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
      default: 'Olivier Jeannette | Ops Architect & AI-Augmented Builder',
      template: '%s | Olivier Jeannette',
    },
    description: isEn
      ? 'Former Special Forces Paramedic turned Tech Entrepreneur. I build systems that run themselves. Available for opportunities in Calgary, Alberta.'
      : 'Ancien Paramedic des Forces Spéciales devenu entrepreneur tech. Je construis des systèmes qui tournent seuls. Disponible pour des opportunités à Calgary, Alberta.',
    keywords: [
      'developer',
      'entrepreneur',
      'ops architect',
      'full-stack',
      'Calgary',
      'Alberta',
      'Canada',
      'special forces',
      'paramedic',
      'AI',
      'automation',
    ],
    authors: [{ name: 'Olivier Jeannette' }],
    creator: 'Olivier Jeannette',
    openGraph: {
      type: 'website',
      locale: isEn ? 'en_CA' : 'fr_FR',
      alternateLocale: isEn ? 'fr_FR' : 'en_CA',
      title: 'Olivier Jeannette | Ops Architect & AI-Augmented Builder',
      description: isEn
        ? 'Former Special Forces Paramedic turned Tech Entrepreneur. I build systems that run themselves.'
        : 'Ancien Paramedic des Forces Spéciales devenu entrepreneur tech. Je construis des systèmes qui tournent seuls.',
      siteName: 'Olivier Jeannette Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Olivier Jeannette | Ops Architect & AI-Augmented Builder',
      description: isEn
        ? 'Former Special Forces Paramedic turned Tech Entrepreneur.'
        : 'Ancien Paramedic des Forces Spéciales devenu entrepreneur tech.',
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
