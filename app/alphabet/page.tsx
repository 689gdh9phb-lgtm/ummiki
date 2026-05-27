'use client'

import { motion } from 'framer-motion'
import { BackButton } from '@/components/back-button'
import { LetterCard } from '@/components/letter-card'
import { arabicAlphabet } from '@/lib/data/alphabet'

export default function AlphabetPage() {
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
          Арабский алфавит
        </h1>
        <p className="text-muted-foreground text-sm">
          28 букв • нажми чтобы услышать
        </p>
      </motion.div>

      {/* Alphabet grid - 4 columns, RTL direction */}
      <div className="grid grid-cols-4 gap-3" dir="rtl">
        {arabicAlphabet.map((letter, index) => (
          <LetterCard 
            key={letter.id} 
            letter={letter} 
            index={index}
            colorIndex={index}
          />
        ))}
      </div>

      {/* Footer info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="text-muted-foreground text-xs">
          Нажимай на буквы, чтобы изучать произношение
        </p>
      </motion.div>
    </main>
  )
}
