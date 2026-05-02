import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ServiceWorkerRegistration } from './components/ServiceWorkerRegistration'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Уммики - Исламское образование для детей',
  description: 'Интерактивное исламское образовательное приложение для детей. Изучайте Коран, Сунну и исламские знания через игры и викторины.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Уммики',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/favicon.jpg',
        type: 'image/jpeg',
      },
    ],
    apple: '/favicon.jpg',
    shortcut: '/favicon.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: '#7C3AED',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
