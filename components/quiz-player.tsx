'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useTelegram } from './telegram-provider'
import type { Question } from '@/lib/data/quizzes'

interface QuizPlayerProps {
  questions: Question[]
  categoryTitle: string
}

export function QuizPlayer({ questions, categoryTitle }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { hapticFeedback } = useTelegram()
  const router = useRouter()

  const currentQuestion = questions[currentIndex]
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    
    if (answerIndex === currentQuestion.correctAnswer) {
      hapticFeedback('success')
    } else {
      hapticFeedback('error')
    }
  }

  const handleNext = () => {
    hapticFeedback('light')
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setIsComplete(true)
    }
  }

  const handleFinish = () => {
    hapticFeedback('success')
    router.push('/quizzes')
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center"
      >
        {/* Celebration animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent 
                     flex items-center justify-center mb-6 shadow-[0_8px_30px_rgba(123,63,242,0.3)]"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl"
          >
            ✨
          </motion.span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-foreground mb-2"
        >
          МашаАллах!
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground mb-8"
        >
          Ты закончил викторину &quot;{categoryTitle}&quot;
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleFinish}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full max-w-xs py-4 rounded-2xl bg-primary text-primary-foreground 
                     font-semibold shadow-[0_4px_20px_rgba(123,63,242,0.3)]"
        >
          Вернуться к викторинам
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="px-5 py-6">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Вопрос {currentIndex + 1} из {questions.length}
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-6 text-balance">
            {currentQuestion.question}
          </h2>

          {/* Answer options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = 'bg-card border-border/50'
              
              if (selectedAnswer !== null) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass = 'bg-success/10 border-success text-success'
                } else if (index === selectedAnswer && !isCorrect) {
                  buttonClass = 'bg-destructive/10 border-destructive text-destructive'
                }
              }

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                  className={`w-full p-4 rounded-2xl border-2 text-left font-medium 
                             transition-all duration-200 ${buttonClass}
                             disabled:cursor-default`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-secondary flex items-center 
                                   justify-center text-sm font-semibold text-secondary-foreground">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <div className="p-4 rounded-2xl bg-secondary/50 border border-border/50">
                  <p className="text-sm text-foreground leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next button */}
          {selectedAnswer !== null && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground 
                         font-semibold shadow-[0_4px_20px_rgba(123,63,242,0.3)]"
            >
              {currentIndex < questions.length - 1 ? 'Следующий вопрос' : 'Завершить'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
