'use client';

import { useGame } from '@/lib/game-context';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Star, RotateCcw, ArrowRight } from 'lucide-react';

export function ResultScreen() {
  const { state, completeLevel, resetLevel } = useGame();
  const { currentLevel, currentScore, correctAnswers } = state;

  if (!currentLevel) return null;

  const totalQuestions = currentLevel.questions.length;
  const percentage = correctAnswers / totalQuestions;
  const stars = percentage === 1 ? 3 : percentage >= 0.66 ? 2 : percentage >= 0.33 ? 1 : 0;
  const bonusPoints = 20 + (stars === 3 ? 10 : 0);
  const totalScore = currentScore + bonusPoints;
  const isPerfect = stars === 3;

  const getMessage = () => {
    if (isPerfect) return 'Отлично! Идеальный результат!';
    if (stars >= 2) return 'Хорошая работа!';
    if (stars >= 1) return 'Неплохо! Продолжай стараться!';
    return 'Попробуй ещё раз!';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-lavender via-background to-soft-purple/20 overflow-hidden relative">
      {/* Celebration particles */}
      {isPerfect && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: [0, 1, 0],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              {['⭐', '✨', '🎉', '🌟'][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        className="flex flex-col items-center text-center z-10 w-full max-w-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Trophy/Icon */}
        <motion.div
          className="text-8xl mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          {isPerfect ? '🏆' : stars >= 2 ? '🎯' : stars >= 1 ? '👍' : '💪'}
        </motion.div>

        {/* Message */}
        <motion.h1
          className="text-2xl font-bold text-foreground mb-2 text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {getMessage()}
        </motion.h1>

        <motion.p
          className="text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {correctAnswers} из {totalQuestions} правильных ответов
        </motion.p>

        {/* Stars */}
        <motion.div
          className="flex gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[1, 2, 3].map((star, index) => (
            <motion.div
              key={star}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.6 + index * 0.15, type: 'spring', stiffness: 300 }}
            >
              <Star
                className={`w-12 h-12 ${
                  star <= stars
                    ? 'fill-gold text-gold drop-shadow-lg'
                    : 'fill-none text-muted-foreground/30'
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Score Card */}
        <motion.div
          className="w-full bg-card rounded-3xl p-6 shadow-xl border border-border/50 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-muted-foreground">Очки за ответы</span>
            <span className="font-semibold text-foreground">+{currentScore}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-muted-foreground">Бонус за прохождение</span>
            <span className="font-semibold text-foreground">+{bonusPoints}</span>
          </div>
          <div className="h-px bg-border my-3" />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-foreground">Итого</span>
            <span className="text-2xl font-bold text-deep-purple">+{totalScore} XP</span>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col gap-3 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={completeLevel}
            className="w-full bg-deep-purple hover:bg-deep-purple/90 text-white text-lg py-6 rounded-2xl shadow-lg shadow-deep-purple/30 flex items-center justify-center gap-2"
          >
            Продолжить
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          {stars < 3 && (
            <Button
              onClick={resetLevel}
              variant="outline"
              className="w-full text-lg py-6 rounded-2xl flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Попробовать снова
            </Button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
