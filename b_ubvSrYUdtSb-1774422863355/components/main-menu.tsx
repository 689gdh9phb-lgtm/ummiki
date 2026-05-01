'use client';

import { useGame } from '@/lib/game-context';
import { categories } from '@/lib/game-data';
import { motion } from 'framer-motion';
import { User, Flame } from 'lucide-react';

export function MainMenu() {
  const { state, startQuiz, setScreen } = useGame();
  const { userProgress } = state;

  const xpForNextLevel = 500;
  const currentLevelXP = userProgress.totalXP % xpForNextLevel;
  const level = Math.floor(userProgress.totalXP / xpForNextLevel) + 1;
  const progressPercentage = (currentLevelXP / xpForNextLevel) * 100;

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'quizzes') {
      startQuiz();
    } else if (categoryId === 'stories') {
      setScreen('story');
} else if (categoryId === 'hadith-reading') {
      setScreen('hadith-reading');
    }
    // Other categories can be implemented later
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground text-sm">Добро пожаловать!</p>
            <h1 className="text-2xl font-bold text-foreground">
              Ассаляму алейкум!
            </h1>
          </div>
          <button 
            onClick={() => setScreen('profile')}
            className="w-12 h-12 rounded-full bg-soft-purple/30 flex items-center justify-center shadow-lg border-2 border-soft-purple/50 transition-transform hover:scale-105"
          >
            <User className="w-6 h-6 text-deep-purple" />
          </button>
        </div>

        {/* Progress Card */}
        <motion.div
          className="bg-card rounded-3xl p-5 shadow-xl border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-deep-purple to-soft-purple flex items-center justify-center text-white font-bold">
                {level}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Уровень</p>
                <p className="font-semibold text-foreground">{userProgress.totalXP} XP</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gold/20 px-3 py-1.5 rounded-full">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-semibold text-orange-600">{userProgress.currentStreak}</span>
            </div>
          </div>
          
          {/* XP Progress Bar */}
          <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-deep-purple to-soft-purple rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-right">
            {currentLevelXP} / {xpForNextLevel} XP
          </p>
        </motion.div>
      </motion.header>

      {/* Stats Row */}
      <motion.div
        className="px-6 py-4 flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="flex-1 bg-card rounded-2xl p-4 text-center shadow-lg border border-border/50">
          <p className="text-3xl font-bold text-deep-purple">{userProgress.totalStars}</p>
          <p className="text-xs text-muted-foreground">Звёзд</p>
        </div>
        <div className="flex-1 bg-card rounded-2xl p-4 text-center shadow-lg border border-border/50">
          <p className="text-3xl font-bold text-soft-purple">{userProgress.completedLevels}</p>
          <p className="text-xs text-muted-foreground">Уровней</p>
        </div>
        <div className="flex-1 bg-card rounded-2xl p-4 text-center shadow-lg border border-border/50">
          <p className="text-3xl font-bold text-gold">{userProgress.badges.length}</p>
          <p className="text-xs text-muted-foreground">Наград</p>
        </div>
      </motion.div>

      {/* Categories */}
      <div className="flex-1 px-6 pb-8">
        <motion.h2
          className="text-lg font-semibold text-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Обучение
        </motion.h2>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="relative bg-card rounded-3xl p-6 shadow-xl border border-border/50 text-left overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 opacity-10 ${
                index === 0 ? 'bg-gradient-to-br from-deep-purple to-transparent' :
                index === 1 ? 'bg-gradient-to-br from-soft-purple to-transparent' :
                index === 2 ? 'bg-gradient-to-br from-lavender to-transparent' :
                'bg-gradient-to-br from-mint to-transparent'
              }`} />
              
              <div className="relative">
                <span className="text-4xl mb-3 block">{category.icon}</span>
                <p className="font-semibold text-foreground">{category.name}</p>
              </div>
              
              {category.id === 'quizzes' && (
                <div className="absolute top-3 right-3 bg-deep-purple text-white text-xs px-2 py-1 rounded-full font-medium">
                  Играть
                </div>
              )}
              {category.id === 'stories' && (
                <div className="absolute top-3 right-3 bg-soft-purple text-white text-xs px-2 py-1 rounded-full font-medium">
                  Читать
                </div>
              )}
              {category.id === 'hadith-reading' && (
                <div className="absolute top-3 right-3 bg-lavender text-deep-purple text-xs px-2 py-1 rounded-full font-medium">
                  Читать
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom safe area */}
      <div className="h-6" />
    </div>
  );
}
