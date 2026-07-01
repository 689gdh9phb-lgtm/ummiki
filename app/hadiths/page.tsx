'use client'

import { motion } from 'framer-motion'
import { BackButton } from '@/components/back-button'
import { HadithCard } from '@/components/hadith-card'
import { hadiths } from '@/lib/data/hadiths'

export default function HadithsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 
                     px-5 py-6 pb-12 safe-area-inset">
      {/* Header */}
      <div className="mb-6">
        <BackButton />
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
          Мудрость Пророка (мир ему и благословение) для детей
        </p>
      </motion.div>

      {/* Hadith cards */}
      <div className="space-y-12">
        {hadiths.map((hadith, index) => (
          <HadithCard key={hadith.id} hadith={hadith} index={index} />
        ))}
      </div>
    </main>
  )
}
