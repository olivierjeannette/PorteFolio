import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { NoiseOverlay } from '@/components/noise-overlay'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Olivier | Ops Architect & Builder',
    template: '%s | Olivier',
  },
  description: 'Entrepreneur, architecte opérationnel et builder. Je construis des systèmes qui tournent seuls.',
  keywords: ['developer', 'entrepreneur', 'ops architect', 'full-stack', 'Calgary', 'Canada'],
  authors: [{ name: 'Olivier' }],
  creator: 'Olivier',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_CA',
    title: 'Olivier | Ops Architect & Builder',
    description: 'Entrepreneur, architecte opérationnel et builder. Je construis des systèmes qui tournent seuls.',
    siteName: 'Olivier Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olivier | Ops Architect & Builder',
    description: 'Entrepreneur, architecte opérationnel et builder.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <NoiseOverlay />
          <Navigation />
          <main className="relative">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
