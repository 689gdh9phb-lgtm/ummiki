'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/back-button'
import { QuizPlayer } from '@/components/quiz-player'
import { getSection, getTopic } from '@/lib/data/quizzes'

interface TopicPageProps {
  params: Promise<{ id: string; topic: string }>
}

export default function TopicPage({ params }: TopicPageProps) {
  const { id, topic: topicId } = use(params)
  const router = useRouter()

  const section = getSection(id)
  const topic = getTopic(id, topicId)

  if (!section || !topic) {
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

  // Check if questions are filled in
  const hasQuestions = topic.questions.some((q) => q.question.trim() !== '')

  return (
    <main className="flex h-[100dvh] flex-col overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30 
                     safe-area-inset">
      {/* Header - compact */}
      <div className="px-5 pt-5 pb-3 flex-shrink-0">
        <div className="mb-3">
          <BackButton label={section.title} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg flex-shrink-0">
            {section.emoji}
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground text-balance leading-tight">
              {topic.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              {topic.questions.length} вопросов
            </p>
          </div>
        </motion.div>
      </div>

      {/* Quiz Player or empty state */}
      {hasQuestions ? (
        <QuizPlayer
          questions={topic.questions.filter((q) => q.question.trim() !== '')}
          categoryTitle={topic.title}
        />
      ) : (
        <div className="px-5 flex-1 flex items-center">
          <div className="bg-card rounded-[24px] p-8 text-center border border-border/50 w-full">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="font-semibold text-card-foreground mb-2">
              Вопросы скоро появятся
            </h2>
            <p className="text-sm text-muted-foreground">
              Эта тема готовится. Вопросы и ответы будут добавлены в ближайшее время.
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
