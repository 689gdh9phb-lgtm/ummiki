'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/back-button'
import { HadithCard } from '@/components/hadith-card'
import { getHadithSection, getSectionHadiths } from '@/lib/data/hadiths'

interface SectionPageProps {
  params: Promise<{ section: string }>
}

export default function HadithSectionPage({ params }: SectionPageProps) {
  const { section: sectionId } = use(params)
  const router = useRouter()

  const section = getHadithSection(sectionId)
  const sectionHadiths = getSectionHadiths(sectionId)

  if (!section) {
    return (
      <main className="min-h-screen bg-background px-5 py-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Тема не найдена</p>
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 
                     px-5 py-6 pb-12 safe-area-inset">
      {/* Header */}
      <div className="mb-6">
        <BackButton label="Хадисы" href="/hadiths" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground mb-2 text-balance">
          {section.title}
        </h1>
        <p className="text-muted-foreground text-sm">
          {section.description}
        </p>
      </motion.div>

      {/* Hadith cards */}
      <div className="space-y-20">
        {sectionHadiths.map((hadith, index) => (
          <HadithCard
            key={hadith.id}
            hadith={hadith}
            index={index}
            sectionId={section.id}
          />
        ))}
      </div>
    </main>
  )
}
