'use client';

import { useGame } from '@/lib/game-context';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function QuizScreen() {
  const { state, answerQuestion, nextQuestion, setScreen } = useGame();
  const { currentLevel, currentQuestionIndex, selectedAnswer, showResult } = state;

  if (!currentLevel) return null;

  const question = currentLevel.questions[currentQuestionIndex];
  const totalQuestions = currentLevel.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-lavender/50 via-background to-background">
      {/* Header */}
      <motion.header
        className="px-6 pt-8 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setScreen('levels')}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-md hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-md">
            <span className="text-lg">⭐</span>
            <span className="font-semibold text-foreground">{state.currentScore}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-deep-purple to-soft-purple rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Вопрос {currentQuestionIndex + 1} из {totalQuestions}
        </p>
      </motion.header>

      {/* Question */}
      <div className="flex-1 px-6 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* Question Card */}
            <motion.div
              className="bg-card rounded-3xl p-6 shadow-xl border border-border/50 mb-6"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xl font-semibold text-foreground text-center text-balance leading-relaxed">
                {question.text}
              </p>
            </motion.div>

            {/* Answer Options */}
            <div className="flex flex-col gap-3 flex-1">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;
                const showCorrect = showResult && isCorrectAnswer;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => answerQuestion(index)}
                    disabled={showResult}
                    className={`w-full p-5 rounded-2xl text-left font-medium text-lg transition-all duration-300 border-2 ${
                      showCorrect
                        ? 'bg-success/20 border-success text-success'
                        : showWrong
                        ? 'bg-destructive/20 border-destructive text-destructive animate-shake'
                        : isSelected
                        ? 'bg-soft-purple/20 border-soft-purple text-foreground'
                        : 'bg-card border-border/50 text-foreground hover:border-soft-purple hover:bg-soft-purple/10'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        showCorrect
                          ? 'bg-success text-white'
                          : showWrong
                          ? 'bg-destructive text-white'
                          : 'bg-secondary text-muted-foreground'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Result Feedback */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6"
                >
                  {isCorrect ? (
                    <motion.div
                      className="flex items-center justify-center gap-3 py-4"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      <motion.span
                        className="text-4xl"
                        animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        ⭐
                      </motion.span>
                      <span className="text-xl font-bold text-success">Правильно! +10</span>
                      <motion.span
                        className="text-4xl"
                        animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        ⭐
                      </motion.span>
                    </motion.div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-lg font-medium text-destructive">Не совсем...</p>
                      <p className="text-muted-foreground mt-1">
                        Правильный ответ: {question.options[question.correctAnswer]}
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={nextQuestion}
                    className="w-full bg-deep-purple hover:bg-deep-purple/90 text-white text-lg py-6 rounded-2xl shadow-lg shadow-deep-purple/30"
                  >
                    {currentQuestionIndex < totalQuestions - 1 ? 'Далее' : 'Завершить'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom safe area */}
      <div className="h-6" />
    </div>
  );
}
