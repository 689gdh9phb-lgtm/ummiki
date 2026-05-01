'use client';

import { useGame } from '@/lib/game-context';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Star, Check } from 'lucide-react';

export function LevelsScreen() {
  const { state, startLevel, setScreen } = useGame();
  const { currentTopic } = state;

  if (!currentTopic) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-lavender/50 via-background to-background">
      {/* Header */}
      <motion.header
        className="px-6 pt-8 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => setScreen('quiz-topics')}
          className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </button>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{currentTopic.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{currentTopic.name}</h1>
            <p className="text-muted-foreground">{currentTopic.levels.length} уровней</p>
          </div>
        </div>
      </motion.header>

      {/* Levels Path */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="flex flex-col items-center py-8">
          {currentTopic.levels.map((level, index) => {
            const isFirst = index === 0;
            const isLast = index === currentTopic.levels.length - 1;
            
            return (
              <div key={level.id} className="flex flex-col items-center">
                {/* Connection line from previous */}
                {!isFirst && (
                  <motion.div
                    className={`w-1 h-12 ${level.unlocked ? 'bg-soft-purple' : 'bg-muted'}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    style={{ transformOrigin: 'top' }}
                  />
                )}

                {/* Level Node */}
                <motion.button
                  onClick={() => startLevel(level)}
                  disabled={!level.unlocked}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    level.completed
                      ? 'bg-gradient-to-br from-deep-purple to-soft-purple shadow-lg shadow-deep-purple/30'
                      : level.unlocked
                      ? 'bg-gradient-to-br from-soft-purple to-lavender shadow-lg shadow-soft-purple/30 hover:scale-110 active:scale-95'
                      : 'bg-muted'
                  }`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.4, type: 'spring' }}
                  whileHover={level.unlocked ? { scale: 1.1 } : {}}
                  whileTap={level.unlocked ? { scale: 0.95 } : {}}
                >
                  {level.completed ? (
                    <Check className="w-8 h-8 text-white" />
                  ) : level.unlocked ? (
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  ) : (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  )}

                  {/* Stars indicator for completed levels */}
                  {level.completed && (
                    <motion.div 
                      className="absolute -bottom-3 flex gap-0.5"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3, type: 'spring' }}
                    >
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 drop-shadow-sm ${
                            star <= level.stars
                              ? 'fill-gold text-gold'
                              : 'fill-muted text-muted-foreground/40'
                          }`}
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.button>

                {/* Level label */}
                <motion.p
                  className={`mt-3 text-sm font-medium ${
                    level.unlocked ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.2, duration: 0.3 }}
                >
                  {level.name}
                </motion.p>

                {/* Score if completed */}
                {level.completed && (
                  <motion.p
                    className="text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.3 }}
                  >
                    {level.score} очков
                  </motion.p>
                )}

                {/* Connection line to next */}
                {!isLast && (
                  <motion.div
                    className={`w-1 h-12 ${
                      currentTopic.levels[index + 1]?.unlocked ? 'bg-soft-purple' : 'bg-muted'
                    }`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: index * 0.1 + 0.05, duration: 0.3 }}
                    style={{ transformOrigin: 'top' }}
                  />
                )}
              </div>
            );
          })}

          {/* Trophy at the end */}
          <motion.div
            className="mt-8 text-6xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: currentTopic.levels.length * 0.15, duration: 0.4, type: 'spring' }}
          >
            🏆
          </motion.div>
        </div>
      </div>
    </div>
  );
}
