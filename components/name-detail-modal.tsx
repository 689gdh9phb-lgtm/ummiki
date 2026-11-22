'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import type { DivineName } from '@/lib/data/names'

interface NameDetailModalProps {
  name: DivineName | null
  onClose: () => void
}

export function NameDetailModal({ name, onClose }: NameDetailModalProps) {
  // Block body scroll while the modal is open
  useEffect(() => {
    if (name) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [name])

  return (
    <AnimatePresence>
      {name && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center 
                     bg-foreground/40 backdrop-blur-sm px-0 sm:px-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Имя Аллаха: ${name.transliteration}`}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.6 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full sm:max-w-md bg-card rounded-t-[28px] sm:rounded-[28px] 
                       shadow-[0_-4px_30px_rgba(0,0,0,0.15)] max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-secondary 
                         flex items-center justify-center text-secondary-foreground 
                         active:opacity-70 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Arabic name header */}
            <div className="bg-gradient-to-br from-primary to-accent px-6 pt-10 pb-8 text-center">
              <p
                dir="rtl"
                lang="ar"
                className="text-primary-foreground text-5xl leading-tight mb-3"
                style={{ fontFamily: 'var(--font-amiri), serif' }}
              >
                {name.arabic}
              </p>
              <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 
                             text-primary-foreground text-xs font-semibold">
                Имя № {name.id}
              </span>
            </div>

            {/* Details */}
            <div className="px-6 py-6 space-y-5">
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                  Транскрипция
                </p>
                <p className="text-xl font-bold text-foreground">
                  {name.transliteration}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                  Перевод
                </p>
                <p className="text-base text-foreground">{name.translation}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                  Пояснение
                </p>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {name.description}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
