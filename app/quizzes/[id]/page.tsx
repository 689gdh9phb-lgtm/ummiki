'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/back-button'
import { QuizPlayer } from '@/components/quiz-player'
import { quizCategories } from '@/lib/data/quizzes'

interface QuizDetailPageProps {
  params: Promise<{ id: string }>
}

export default function QuizDetailPage({ params }: QuizDetailPageProps) {
  const { id } = use(params)
  const router = useRouter()
  
  const category = quizCategories.find(c => c.id === id)

  if (!category) {
    return (
      <main className="min-h-screen bg-background px-5 py-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Викторина не найдена</p>
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
                     pb-12 safe-area-inset">
      {/* Header */}
      <div className="px-5 py-6">
        <div className="mb-4">
          <BackButton label="Викторины" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl">
            {category.emoji}
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {category.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              10 вопросов
            </p>
          </div>
        </motion.div>
      </div>

      {/* Quiz Player */}
      <QuizPlayer 
        questions={category.questions} 
        categoryTitle={category.title}
      />
    </main>
  )
}
