'use client';

import { useGame } from '@/lib/game-context';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Flame, Trophy, BookOpen, Target, Medal } from 'lucide-react';

export function ProfileScreen() {
  const { state, quiz, goToMenu } = useGame();
  const { userProgress } = state;

  const xpForNextLevel = 500;
  const currentLevelXP = userProgress.totalXP % xpForNextLevel;
  const level = Math.floor(userProgress.totalXP / xpForNextLevel) + 1;
  const progressPercentage = (currentLevelXP / xpForNextLevel) * 100;

  // Calculate total levels available
  const totalLevelsAvailable = quiz.topics.reduce((acc, topic) => acc + topic.levels.length, 0);

  const achievements = [
    { id: 'first-quiz', name: 'Первые шаги', icon: '🎯', description: 'Пройди первый уровень', unlocked: userProgress.completedLevels >= 1 },
    { id: 'five-levels', name: 'Ученик', icon: '📚', description: 'Пройди 5 уровней', unlocked: userProgress.completedLevels >= 5 },
    { id: 'ten-stars', name: 'Звёздный путь', icon: '⭐', description: 'Собери 10 звёзд', unlocked: userProgress.totalStars >= 10 },
    { id: 'perfect', name: 'Перфекционист', icon: '💎', description: 'Получи 3 звезды на уровне', unlocked: quiz.topics.some(t => t.levels.some(l => l.stars === 3)) },
    { id: 'streak', name: 'Постоянство', icon: '🔥', description: '3 дня подряд', unlocked: userProgress.currentStreak >= 3 },
    { id: 'master', name: 'Мастер', icon: '🏆', description: 'Пройди все уровни', unlocked: userProgress.completedLevels >= totalLevelsAvailable },
  ];

  const stats = [
    { label: 'Всего XP', value: userProgress.totalXP, icon: Target, color: 'text-deep-purple' },
    { label: 'Звёзд', value: userProgress.totalStars, icon: Star, color: 'text-gold' },
    { label: 'Уровней', value: userProgress.completedLevels, icon: BookOpen, color: 'text-soft-purple' },
    { label: 'Стрик', value: userProgress.currentStreak, icon: Flame, color: 'text-orange-500' },
  ];

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
      </motion.header>

      {/* Profile Card */}
      <motion.div
        className="px-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="bg-card rounded-3xl p-6 shadow-xl border border-border/50">
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-deep-purple to-soft-purple flex items-center justify-center text-4xl shadow-lg shadow-deep-purple/30">
                👤
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gold flex items-center justify-center text-sm font-bold text-amber-900 shadow-lg">
                {level}
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Юный учёный</h1>
              <p className="text-muted-foreground text-sm">Уровень {level}</p>
              
              {/* XP Progress */}
              <div className="mt-2">
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-deep-purple to-soft-purple rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {currentLevelXP} / {xpForNextLevel} XP до следующего уровня
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-secondary/50 rounded-2xl p-3 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
              >
                <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Achievements Section */}
      <div className="flex-1 px-6 pb-8">
        <motion.div
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Trophy className="w-5 h-5 text-gold" />
          <h2 className="text-lg font-semibold text-foreground">Достижения</h2>
          <span className="text-sm text-muted-foreground">
            ({achievements.filter(a => a.unlocked).length}/{achievements.length})
          </span>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className={`bg-card rounded-2xl p-4 border transition-all ${
                achievement.unlocked 
                  ? 'border-soft-purple/50 shadow-lg' 
                  : 'border-border/30 opacity-50'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  achievement.unlocked ? 'bg-soft-purple/20' : 'bg-muted'
                }`}>
                  {achievement.unlocked ? achievement.icon : <Medal className="w-5 h-5 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
