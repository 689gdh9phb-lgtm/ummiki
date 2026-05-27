'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BackButton } from '@/components/back-button'
import { SimpleLetterCard } from '@/components/simple-letter-card'
import { arabicAlphabet, learningTips } from '@/lib/data/alphabet'
import { BookOpen, Sparkles } from 'lucide-react'

export default function AlphabetPage() {
  const [showTips, setShowTips] = useState(true)

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F1FF] via-[#EDE7FF] to-[#E8E0FF] 
                     px-4 py-5 pb-16 safe-area-inset">
      {/* Decorative Pattern Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237B3FF2' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7B3FF2] to-[#A66CFF] 
                          flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#4A3F5C]">
              Арабский алфавит
            </h1>
            <p className="text-[#7B3FF2] text-sm">
              28 букв для изучения
            </p>
          </div>
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 
                            border border-[#E0D4F7] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#4A3F5C] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A66CFF]" />
                  Как правильно учить буквы
                </h2>
                <button 
                  onClick={() => setShowTips(false)}
                  className="text-xs text-[#7B3FF2] underline"
                >
                  Скрыть
                </button>
              </div>
              <div className="space-y-3" dir="ltr">
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
                      <p className="text-sm font-medium text-[#4A3F5C]">{tip.title}</p>
                      <p className="text-xs text-[#7B3FF2]/70 leading-relaxed">{tip.description}</p>
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
          className="relative z-10 mb-4 text-xs text-[#7B3FF2] underline"
        >
          Показать советы по изучению
        </motion.button>
      )}

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mb-4"
      >
        <h3 className="text-sm font-medium text-[#4A3F5C]">
          Все буквы алфавита
        </h3>
      </motion.div>

      {/* Alphabet Grid - RTL direction for Arabic letters */}
      <div 
        className="relative z-10 grid grid-cols-2 gap-3" 
        dir="rtl"
      >
        {arabicAlphabet.map((letter, index) => (
          <SimpleLetterCard 
            key={letter.id} 
            letter={letter} 
            index={index}
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
        <p className="text-[#7B3FF2]/60 text-xs">
          Да поможет вам Аллах в изучении Его языка
        </p>
      </motion.div>
    </main>
  )
}
