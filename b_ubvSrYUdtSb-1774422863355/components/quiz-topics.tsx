'use client';

import { useGame } from '@/lib/game-context';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Lock } from 'lucide-react';

export function QuizTopics() {
  const { quiz, selectTopic, goToMenu } = useGame();

  const getTopicProgress = (topicIndex: number) => {
    const topic = quiz.topics[topicIndex];
    const completedLevels = topic.levels.filter(l => l.completed).length;
    const totalLevels = topic.levels.length;
    return { completedLevels, totalLevels };
  };

  const isTopicUnlocked = (topicIndex: number) => {
    // All topics are unlocked
    return true;
  };

  const getTopicStars = (topicIndex: number) => {
    const topic = quiz.topics[topicIndex];
    return topic.levels.reduce((acc, l) => acc + l.stars, 0);
  };

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
          onClick={goToMenu}
          className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </button>
        <h1 className="text-2xl font-bold text-foreground">Выбери тему</h1>
        <p className="text-muted-foreground mt-1">5 тем, 10 уровней</p>
      </motion.header>

      {/* Topics List */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {quiz.topics.map((topic, index) => {
            const { completedLevels, totalLevels } = getTopicProgress(index);
            const unlocked = isTopicUnlocked(index);
            const stars = getTopicStars(index);
            const isComplete = completedLevels === totalLevels;

            return (
              <motion.button
                key={topic.id}
                onClick={() => unlocked && selectTopic(topic)}
                disabled={!unlocked}
                className={`relative bg-card rounded-3xl p-5 shadow-xl border text-left overflow-hidden transition-all duration-300 ${
                  unlocked 
                    ? 'border-border/50 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]' 
                    : 'border-border/30 opacity-60'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${
                  index % 5 === 0 ? 'from-deep-purple' :
                  index % 5 === 1 ? 'from-soft-purple' :
                  index % 5 === 2 ? 'from-mint' :
                  index % 5 === 3 ? 'from-gold' :
                  'from-lavender'
                } to-transparent`} />

                <div className="relative flex items-center gap-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                    unlocked ? 'bg-secondary' : 'bg-muted'
                  }`}>
                    {unlocked ? topic.icon : <Lock className="w-6 h-6 text-muted-foreground" />}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground text-lg">{topic.name}</h3>
                      {isComplete && (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {completedLevels} / {totalLevels} уровней
                    </p>
                    
                    {/* Progress bar */}
                    <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-deep-purple to-soft-purple rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(completedLevels / totalLevels) * 100}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Stars */}
                  {unlocked && (
                    <div className="flex items-center gap-1 bg-gold/20 px-3 py-1.5 rounded-full">
                      <span className="text-lg">⭐</span>
                      <span className="font-semibold text-amber-700">{stars}</span>
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
