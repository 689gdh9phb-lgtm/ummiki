'use client'

import { motion } from 'framer-motion'
import { BackButton } from '@/components/back-button'
import { QuizCategoryCard } from '@/components/quiz-category-card'
import { quizSections } from '@/lib/data/quizzes'

export default function QuizzesPage() {
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
          Викторины
        </h1>
        <p className="text-muted-foreground text-sm">
          Выбери раздел и проверь свои знания!
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-3">
        {quizSections.map((section, index) => (
          <QuizCategoryCard
            key={section.id}
            href={`/quizzes/${section.id}`}
            title={section.title}
            emoji={section.emoji}
            description={`${section.topics.length} тем`}
            index={index}
          />
        ))}
      </div>
    </main>
  )
}
