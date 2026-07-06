'use client'

import { motion } from 'framer-motion'
import { BackButton } from '@/components/back-button'
import { HadithSectionCard } from '@/components/hadith-section-card'
import { hadithSections } from '@/lib/data/hadiths'

export default function HadithsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 
                     px-5 py-6 pb-12 safe-area-inset">
      {/* Header */}
      <div className="mb-6">
        <BackButton href="/" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Хадисы
        </h1>
        <p className="text-muted-foreground text-sm">
          Выбери тему, чтобы читать хадисы Пророка (мир ему и благословение)
        </p>
      </motion.div>

      {/* Section cards */}
      <div className="space-y-4">
        {hadithSections.map((section, index) => (
          <HadithSectionCard key={section.id} section={section} index={index} />
        ))}
      </div>
    </main>
  )
}
