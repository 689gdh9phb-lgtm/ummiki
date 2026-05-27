import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { TelegramProvider } from '@/components/telegram-provider'

const montserrat = Montserrat({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Уммики - Исламское приложение для детей',
  description: 'Играй, читай и изучай вместе с Уммики! Исламское образовательное приложение для детей.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/logo.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#7B3FF2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-background" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <TelegramProvider>
          {children}
        </TelegramProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
