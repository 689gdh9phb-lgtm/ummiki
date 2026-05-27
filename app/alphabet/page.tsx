'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BackButton } from '@/components/back-button'
import { PremiumLetterCard } from '@/components/premium-letter-card'
import { arabicAlphabet, learningTips } from '@/lib/data/alphabet'
import { BookOpen, Star, CheckCircle } from 'lucide-react'

export default function AlphabetPage() {
  const [learnedLetters, setLearnedLetters] = useState<Set<number>>(new Set())
  const [favoriteLetters, setFavoriteLetters] = useState<Set<number>>(new Set())
  const [showTips, setShowTips] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('learnedLetters')
      const savedFavorites = localStorage.getItem('favoriteLetters')
      if (saved) setLearnedLetters(new Set(JSON.parse(saved)))
      if (savedFavorites) setFavoriteLetters(new Set(JSON.parse(savedFavorites)))
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && learnedLetters.size > 0) {
      localStorage.setItem('learnedLetters', JSON.stringify([...learnedLetters]))
    }
  }, [learnedLetters])

  useEffect(() => {
    if (typeof window !== 'undefined' && favoriteLetters.size > 0) {
      localStorage.setItem('favoriteLetters', JSON.stringify([...favoriteLetters]))
    }
  }, [favoriteLetters])

  const toggleLearned = (id: number) => {
    setLearnedLetters(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleFavorite = (id: number) => {
    setFavoriteLetters(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const progress = Math.round((learnedLetters.size / arabicAlphabet.length) * 100)

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FDF8F3] via-[#FAF6F1] to-[#F5EFE6] 
                     px-4 py-5 pb-16 safe-area-inset">
      {/* Decorative Islamic Pattern Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23786A5A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
           }}
      />

      {/* Header */}
      <div className="relative z-10 mb-5">
        <BackButton />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B7355] to-[#6B5344] 
                          flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#4A3F35]">
              Арабский алфавит
            </h1>
            <p className="text-[#8B7355] text-sm">
              28 букв для изучения
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-white/60 rounded-2xl p-4 backdrop-blur-sm border border-[#E8DFD3]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#6B5344]">Прогресс изучения</span>
            <span className="text-sm font-bold text-[#8B7355]">{learnedLetters.size} / {arabicAlphabet.length}</span>
          </div>
          <div className="h-2.5 bg-[#E8DFD3] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#A89078] to-[#8B7355] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          {progress === 100 && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-[#6B8F71] mt-2 flex items-center gap-1"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Поздравляем! Вы изучили все буквы!
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Learning Tips Block */}
      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-10 mb-6"
          >
            <div className="bg-gradient-to-br from-[#F9F5F0] to-[#F5EDE3] rounded-2xl p-5 
                            border border-[#E8DFD3] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#4A3F35] flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#C9A86C]" />
                  Как правильно учить буквы
                </h2>
                <button 
                  onClick={() => setShowTips(false)}
                  className="text-xs text-[#8B7355] underline"
                >
                  Скрыть
                </button>
              </div>
              <div className="space-y-3">
                {learningTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-lg">{tip.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-[#4A3F35]">{tip.title}</p>
                      <p className="text-xs text-[#8B7355] leading-relaxed">{tip.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showTips && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowTips(true)}
          className="relative z-10 mb-4 text-xs text-[#8B7355] underline"
        >
          Показать советы по изучению
        </motion.button>
      )}

      {/* Favorite Letters Section */}
      {favoriteLetters.size > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 mb-6"
        >
          <h3 className="text-sm font-medium text-[#6B5344] mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-[#C9A86C] fill-[#C9A86C]" />
            Избранные буквы
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2" dir="rtl">
            {arabicAlphabet
              .filter(l => favoriteLetters.has(l.id))
              .map((letter) => (
                <motion.div
                  key={letter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#C9A86C] to-[#A68B5B]
                             flex flex-col items-center justify-center shadow-md"
                >
                  <span className="text-white text-xl font-bold">{letter.letter}</span>
                  <span className="text-white/80 text-[8px]">{letter.name}</span>
                </motion.div>
              ))}
          </div>
        </motion.div>
      )}

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mb-4"
      >
        <h3 className="text-sm font-medium text-[#6B5344]">
          Все буквы алфавита
        </h3>
        <p className="text-xs text-[#8B7355]">
          Нажмите на букву, чтобы услышать произношение
        </p>
      </motion.div>

      {/* Alphabet Grid - RTL direction */}
      <div 
        className="relative z-10 grid grid-cols-2 gap-3" 
        dir="rtl"
        style={{ unicodeBidi: 'bidi-override' }}
      >
        {arabicAlphabet.map((letter, index) => (
          <PremiumLetterCard 
            key={letter.id} 
            letter={letter} 
            index={index}
            isLearned={learnedLetters.has(letter.id)}
            isFavorite={favoriteLetters.has(letter.id)}
            onToggleLearned={() => toggleLearned(letter.id)}
            onToggleFavorite={() => toggleFavorite(letter.id)}
          />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 mt-8 text-center"
      >
        <p className="text-[#8B7355] text-xs">
          Да поможет вам Аллах в изучении Его языка
        </p>
      </motion.div>
    </main>
  )
}
