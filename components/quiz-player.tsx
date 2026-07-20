'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useTelegram } from './telegram-provider'
import type { Question } from '@/lib/data/quizzes'

interface QuizPlayerProps {
  questions: Question[]
  categoryTitle: string
}

// Hash an integer so that sequential seeds (e.g. consecutive question ids)
// produce well-scattered values instead of correlated ones. Without this,
// a linear seed fed into the LCG below tends to yield the same permutation
// for questions that share the same option count, which is exactly what put
// every correct answer in the same slot across a topic.
function hashSeed(n: number) {
  let h = n >>> 0
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b)
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b)
  h = (h ^ (h >>> 16)) >>> 0
  return h
}

// Deterministic pseudo-random generator so the option order stays stable
// across re-renders but varies from question to question.
function seededRandom(seed: number) {
  let value = hashSeed(seed) % 2147483647
  if (value <= 0) value += 2147483646
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

// Deterministic Fisher-Yates shuffle of an array using a seeded generator.
function seededShuffle<T>(arr: T[], rand: () => number): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// Assign a target slot for the correct answer of every question so that the
// answer lands in each position about equally often — instead of relying on a
// seeded shuffle happening to be uniform (which clustered correct answers in
// one slot). Questions are grouped by their number of options; within each
// group the target positions are laid out in blocks that are shuffled
// permutations of [0..n-1], guaranteeing an even, non-sequential spread.
function buildTargetPositions(questions: Question[]): Record<number, number> {
  const groups: Record<number, number[]> = {}
  questions.forEach((q, i) => {
    const n = (q.options ?? []).length
    if (n > 1) (groups[n] ??= []).push(i)
  })

  const targets: Record<number, number> = {}
  for (const key of Object.keys(groups)) {
    const n = Number(key)
    const qIndices = groups[n]
    const rand = seededRandom(n * 7919 + qIndices.length * 31 + 17)
    let sequence: number[] = []
    while (sequence.length < qIndices.length) {
      sequence = sequence.concat(seededShuffle([...Array(n).keys()], rand))
    }
    qIndices.forEach((qi, k) => {
      targets[qi] = sequence[k]
    })
  }
  return targets
}

// Shuffle the answer options of each question so the correct answer is not
// always in the same position, while keeping the correct answer text intact.
function shuffleQuestionOptions(questions: Question[]): Question[] {
  const targets = buildTargetPositions(questions)

  return questions.map((q, qIndex) => {
    const options = q.options ?? []
    if (options.length <= 1) return q

    const targetPos = targets[qIndex] ?? 0
    const correctOption = options[q.correctAnswer]

    // Shuffle the distractors deterministically so their order also varies.
    const rand = seededRandom((q.id || qIndex + 1) * 2654435761)
    const distractors = seededShuffle(
      options.filter((_, i) => i !== q.correctAnswer),
      rand,
    )

    // Place the correct answer at its target slot and fill the rest.
    const shuffledOptions: string[] = []
    let d = 0
    for (let pos = 0; pos < options.length; pos++) {
      shuffledOptions.push(pos === targetPos ? correctOption : distractors[d++])
    }

    return { ...q, options: shuffledOptions, correctAnswer: targetPos }
  })
}

export function QuizPlayer({ questions, categoryTitle }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { hapticFeedback } = useTelegram()
  const router = useRouter()

  const shuffledQuestions = useMemo(() => shuffleQuestionOptions(questions), [questions])

  const currentQuestion = shuffledQuestions[currentIndex]
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer
  const progress = ((currentIndex + 1) / shuffledQuestions.length) * 100

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

    if (currentIndex < shuffledQuestions.length - 1) {
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
        className="flex flex-1 flex-col items-center justify-center px-6 text-center"
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
    <div className="flex flex-1 flex-col px-5 pb-4 min-h-0">
      {/* Progress bar */}
      <div className="mb-4 flex-shrink-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Вопрос {currentIndex + 1} из {shuffledQuestions.length}
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
          className="flex flex-1 flex-col min-h-0"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 text-balance flex-shrink-0">
            {currentQuestion.question}
          </h2>

          {/* Answer options */}
          <div className="space-y-2.5 flex-shrink-0">
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
                  className={`w-full p-3.5 rounded-2xl border-2 text-left font-medium 
                             transition-all duration-200 ${buttonClass}
                             disabled:cursor-default`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 flex-shrink-0 rounded-full bg-secondary flex items-center 
                                   justify-center text-sm font-semibold text-secondary-foreground">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 text-[15px] leading-snug">{option}</span>
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Explanation - flexible region that scrolls internally if needed */}
          <div className="flex-1 min-h-0 mt-3">
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="h-full overflow-y-auto"
                >
                  <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border/50">
                    <p className="text-sm text-foreground leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Next button - pinned at bottom */}
          {selectedAnswer !== null && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground flex-shrink-0 mt-3
                         font-semibold shadow-[0_4px_20px_rgba(123,63,242,0.3)]"
            >
              {currentIndex < shuffledQuestions.length - 1 ? 'Следующий вопрос' : 'Завершить'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
