'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/back-button'
import { QuizCategoryCard } from '@/components/quiz-category-card'
import { getSection } from '@/lib/data/quizzes'

interface SectionPageProps {
  params: Promise<{ id: string }>
}

export default function SectionPage({ params }: SectionPageProps) {
  const { id } = use(params)
  const router = useRouter()

  const section = getSection(id)

  if (!section) {
    return (
      <main className="min-h-screen bg-background px-5 py-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Раздел не найден</p>
          <button
            onClick={() => router.push('/quizzes')}
            className="text-primary font-medium"
          >
            Вернуться к списку
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
        <BackButton label="Викторины" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl flex-shrink-0">
          {section.emoji}
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground text-balance">
            {section.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {section.topics.length} тем
          </p>
        </div>
      </motion.div>

      {/* Topics */}
      <div className="space-y-3">
        {section.topics.map((topic, index) => (
          <QuizCategoryCard
            key={topic.id}
            href={`/quizzes/${section.id}/${topic.id}`}
            title={topic.title}
            emoji={section.emoji}
            description={`${topic.questions.length} вопросов`}
            index={index}
          />
        ))}
      </div>
    </main>
  )
}
