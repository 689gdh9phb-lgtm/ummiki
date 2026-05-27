'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin } from 'lucide-react'
import { useTelegram } from './telegram-provider'
import type { ArabicLetter } from '@/lib/data/alphabet'

interface SimpleLetterCardProps {
  letter: ArabicLetter
  index: number
}

export function SimpleLetterCard({ letter, index }: SimpleLetterCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const { hapticFeedback } = useTelegram()

  const handleCardClick = () => {
    hapticFeedback('light')
    setShowDetails(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: index * 0.03,
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCardClick}
        className="relative rounded-2xl p-4 cursor-pointer transition-all duration-300
                   bg-white border border-[#E0D4F7]
                   shadow-[0_4px_20px_rgba(123,63,242,0.08)]
                   hover:shadow-[0_8px_30px_rgba(123,63,242,0.15)]"
        dir="rtl"
      >
        {/* Arabic Letter - Large and centered */}
        <div className="text-center mb-3">
          <span 
            className="text-5xl font-bold text-[#7B3FF2] leading-none block"
            style={{ fontFamily: "'Noto Sans Arabic', 'Amiri', sans-serif" }}
          >
            {letter.letter}
          </span>
        </div>

        {/* Letter name and transliteration - LTR for Russian */}
        <div className="text-center mb-2" dir="ltr">
          <p className="text-sm font-semibold text-[#4A3F5C]">{letter.name}</p>
          <p className="text-xs text-[#7B3FF2]/70">{letter.transliteration}</p>
        </div>

        {/* Details button */}
        <div className="text-center" dir="ltr">
          <span className="text-xs text-[#A66CFF] underline">
            Подробнее
          </span>
        </div>
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-gradient-to-b from-[#F5F1FF] to-[#EDE7FF] rounded-3xl p-6 max-w-sm w-full 
                         shadow-2xl border border-[#E0D4F7]"
              onClick={(e) => e.stopPropagation()}
              dir="ltr"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B3FF2] to-[#A66CFF] 
                                  flex items-center justify-center shadow-lg">
                    <span 
                      className="text-white text-3xl font-bold"
                      style={{ fontFamily: "'Noto Sans Arabic', 'Amiri', sans-serif" }}
                    >
                      {letter.letter}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#4A3F5C]">{letter.name}</h3>
                    <p 
                      className="text-sm text-[#7B3FF2]" 
                      dir="rtl"
                      style={{ fontFamily: "'Noto Sans Arabic', 'Amiri', sans-serif" }}
                    >
                      {letter.nameArabic}
                    </p>
                    <p className="text-xs text-[#A66CFF] mt-0.5">{letter.transliteration}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="w-8 h-8 rounded-full bg-[#E0D4F7] flex items-center justify-center
                             hover:bg-[#D0C4E7] transition-colors"
                >
                  <X className="w-4 h-4 text-[#7B3FF2]" />
                </button>
              </div>
              
              {/* Content - all in LTR for Russian text */}
              <div className="space-y-4">
                {/* Pronunciation instruction */}
                <div className="bg-white rounded-xl p-4 border border-[#E0D4F7]">
                  <p className="text-xs font-medium text-[#7B3FF2] mb-1.5">
                    Как произносить
                  </p>
                  <p className="text-sm text-[#4A3F5C] leading-relaxed">{letter.description}</p>
                </div>
                
                {/* Makhraj */}
                <div className="bg-gradient-to-br from-[#F0E6FF] to-[#E8DEFF] rounded-xl p-4 border border-[#D0C4F7]">
                  <p className="text-xs font-medium text-[#7B3FF2] mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Место выхода звука (махрадж)
                  </p>
                  <p className="text-sm text-[#4A3F5C] font-medium">{letter.makhraj}</p>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-5">
                <button
                  onClick={() => setShowDetails(false)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7B3FF2] to-[#A66CFF] 
                             text-white font-medium shadow-lg hover:shadow-xl transition-shadow active:opacity-90"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
