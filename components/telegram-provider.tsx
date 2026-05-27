'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface TelegramWebApp {
  ready: () => void
  expand: () => void
  close: () => void
  MainButton: {
    text: string
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
  }
  BackButton: {
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
  }
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void
    selectionChanged: () => void
  }
  themeParams: {
    bg_color?: string
    text_color?: string
    hint_color?: string
    link_color?: string
    button_color?: string
    button_text_color?: string
  }
  colorScheme: 'light' | 'dark'
  viewportHeight: number
  viewportStableHeight: number
  isExpanded: boolean
}

interface TelegramContextType {
  webApp: TelegramWebApp | null
  isReady: boolean
  hapticFeedback: (type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' | 'selection') => void
}

const TelegramContext = createContext<TelegramContextType>({
  webApp: null,
  isReady: false,
  hapticFeedback: () => {},
})

export function useTelegram() {
  return useContext(TelegramContext)
}

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initTelegram = () => {
      const tg = (window as unknown as { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp
      
      if (tg) {
        tg.ready()
        tg.expand()
        setWebApp(tg)
        setIsReady(true)

        // Update viewport height CSS variable only if values are valid
        if (tg.viewportHeight && tg.viewportHeight > 0) {
          document.documentElement.style.setProperty(
            '--tg-viewport-height',
            `${tg.viewportHeight}px`
          )
        }
        if (tg.viewportStableHeight && tg.viewportStableHeight > 0) {
          document.documentElement.style.setProperty(
            '--tg-viewport-stable-height',
            `${tg.viewportStableHeight}px`
          )
        }
      } else {
        // Not in Telegram - still mark as ready for web preview
        setIsReady(true)
      }
    }

    // Try after a short delay to ensure script is loaded
    const timer = setTimeout(initTelegram, 100)
    return () => clearTimeout(timer)
  }, [])

  const hapticFeedback = (type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' | 'selection') => {
    if (!webApp?.HapticFeedback) return
    
    if (type === 'selection') {
      webApp.HapticFeedback.selectionChanged()
    } else if (['success', 'error', 'warning'].includes(type)) {
      webApp.HapticFeedback.notificationOccurred(type as 'success' | 'error' | 'warning')
    } else {
      webApp.HapticFeedback.impactOccurred(type as 'light' | 'medium' | 'heavy')
    }
  }

  return (
    <TelegramContext.Provider value={{ webApp, isReady, hapticFeedback }}>
      {children}
    </TelegramContext.Provider>
  )
}
