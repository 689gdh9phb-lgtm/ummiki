'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, List } from 'lucide-react'
import { BackButton } from '@/components/back-button'
import { useTelegram } from '@/components/telegram-provider'
import { getHadithSection, getSectionHadiths } from '@/lib/data/hadiths'

interface HadithDetailPageProps {
  params: Promise<{ section: string; id: string }>
}

export default function HadithDetailPage({ params }: HadithDetailPageProps) {
  const { section: sectionId, id } = use(params)
  const router = useRouter()
  const { hapticFeedback } = useTelegram()

  const section = getHadithSection(sectionId)
  const sectionHadiths = getSectionHadiths(sectionId)
  const currentIndex = sectionHadiths.findIndex((h) => h.id === id)
  const hadith = currentIndex >= 0 ? sectionHadiths[currentIndex] : undefined

  if (!section || !hadith) {
    return (
      <main className="min-h-screen bg-background px-5 py-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Хадис не найден</p>
          <button
            onClick={() => router.push('/hadiths')}
            className="text-primary font-medium"
          >
            Вернуться в меню хадисов
          </button>
        </div>
      </main>
    )
  }

  const prevHadith = currentIndex > 0 ? sectionHadiths[currentIndex - 1] : null
  const nextHadith =
    currentIndex < sectionHadiths.length - 1 ? sectionHadiths[currentIndex + 1] : null

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 
                     pb-12 safe-area-inset">
      {/* Header */}
      <div className="px-5 py-6">
        <div className="mb-4">
          <BackButton label={section.title} href={`/hadiths/${section.id}`} />
        </div>
      </div>

      {/* Cover Image */}
      <motion.div
        key={`cover-${hadith.id}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="px-5 mb-6"
      >
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={hadith.image}
            alt={hadith.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-5">
        <motion.div
          key={`head-${hadith.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <p className="text-xs font-semibold text-primary mb-2">
            {section.title} · {currentIndex + 1} из {sectionHadiths.length}
          </p>
          <h1 className="text-2xl font-bold text-foreground mb-2 text-balance">
            {hadith.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {hadith.readingTime} чтения
          </p>
        </motion.div>

        {/* Hadith text */}
        <motion.div
          key={`text-${hadith.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="bg-card rounded-2xl p-5 shadow-[0_4px_16px_rgba(123,63,242,0.06)] 
                     border border-border/50 mb-6"
        >
          <p className="text-foreground leading-relaxed text-base">
            {hadith.hadithText}
          </p>
          <p className="text-xs text-muted-foreground mt-4 italic">
            Источник: {hadith.source}
          </p>
        </motion.div>

        {/* Explanation */}
        <motion.div
          key={`exp-${hadith.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Что это значит?
          </h2>
          <div className="bg-secondary/50 rounded-2xl p-5 border border-border/30">
            <p className="text-foreground/90 leading-relaxed text-sm">
              {hadith.explanation}
            </p>
          </div>
        </motion.div>

        {/* Navigation within the section */}
        <div className="flex items-center gap-3 mb-4">
          {prevHadith ? (
            <Link
              href={`/hadiths/${section.id}/${prevHadith.id}`}
              onClick={() => hapticFeedback('light')}
              className="flex-1 flex items-center justify-center gap-1 rounded-2xl 
                         bg-card border border-border/50 px-4 py-3 text-sm font-medium 
                         text-foreground active:opacity-70 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Предыдущий</span>
            </Link>
          ) : (
            <div
              className="flex-1 flex items-center justify-center gap-1 rounded-2xl 
                         bg-card/50 border border-border/30 px-4 py-3 text-sm font-medium 
                         text-muted-foreground/40 cursor-not-allowed"
              aria-disabled="true"
            >
              <ChevronLeft className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Предыдущий</span>
            </div>
          )}

          {nextHadith ? (
            <Link
              href={`/hadiths/${section.id}/${nextHadith.id}`}
              onClick={() => hapticFeedback('light')}
              className="flex-1 flex items-center justify-center gap-1 rounded-2xl 
                         bg-primary px-4 py-3 text-sm font-medium 
                         text-primary-foreground active:opacity-70 transition-opacity"
            >
              <span className="truncate">Следующий</span>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
            </Link>
          ) : (
            <div
              className="flex-1 flex items-center justify-center gap-1 rounded-2xl 
                         bg-primary/40 px-4 py-3 text-sm font-medium 
                         text-primary-foreground/60 cursor-not-allowed"
              aria-disabled="true"
            >
              <span className="truncate">Следующий</span>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
            </div>
          )}
        </div>

        {/* Return to hadith menu */}
        <Link
          href="/hadiths"
          onClick={() => hapticFeedback('light')}
          className="w-full flex items-center justify-center gap-2 rounded-2xl 
                     bg-secondary px-4 py-3 text-sm font-semibold text-foreground 
                     active:opacity-70 transition-opacity"
        >
          <List className="w-4 h-4" />
          <span>Вернуться в меню хадисов</span>
        </Link>
      </div>
    </main>
  )
}
