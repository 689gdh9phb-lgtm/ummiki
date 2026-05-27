'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Star, CheckCircle, X, MapPin } from 'lucide-react'
import { useTelegram } from './telegram-provider'
import type { ArabicLetter } from '@/lib/data/alphabet'

interface PremiumLetterCardProps {
  letter: ArabicLetter
  index: number
  isLearned: boolean
  isFavorite: boolean
  onToggleLearned: () => void
  onToggleFavorite: () => void
}

// Arabic pronunciation for Web Speech API (ar-SA)
const arabicPronunciationMap: Record<string, string> = {
  'ا': 'أَلِف',
  'ب': 'بَاء',
  'ت': 'تَاء',
  'ث': 'ثَاء',
  'ج': 'جِيم',
  'ح': 'حَاء',
  'خ': 'خَاء',
  'د': 'دَال',
  'ذ': 'ذَال',
  'ر': 'رَاء',
  'ز': 'زَاي',
  'س': 'سِين',
  'ش': 'شِين',
  'ص': 'صَاد',
  'ض': 'ضَاد',
  'ط': 'طَاء',
  'ظ': 'ظَاء',
  'ع': 'عَين',
  'غ': 'غَين',
  'ف': 'فَاء',
  'ق': 'قَاف',
  'ك': 'كَاف',
  'ل': 'لاَم',
  'م': 'مِيم',
  'ن': 'نُون',
  'ه': 'هَاء',
  'و': 'وَاو',
  'ي': 'يَاء',
}

export function PremiumLetterCard({ 
  letter, 
  index, 
  isLearned, 
  isFavorite,
  onToggleLearned,
  onToggleFavorite
}: PremiumLetterCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const { hapticFeedback } = useTelegram()

  // Load available voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices()
        setVoices(availableVoices)
      }
      
      loadVoices()
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  const speakLetter = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      
      const arabicText = arabicPronunciationMap[letter.letter] || letter.letter
      const utterance = new SpeechSynthesisUtterance(arabicText)
      
      // Try to find Arabic voice (ar-SA preferred)
      const arabicVoice = voices.find(v => v.lang === 'ar-SA') || 
                          voices.find(v => v.lang.startsWith('ar'))
      
      if (arabicVoice) {
        utterance.voice = arabicVoice
        utterance.lang = arabicVoice.lang
      } else {
        utterance.lang = 'ar-SA'
      }
      
      utterance.rate = 0.6 // Slower for learning
      utterance.pitch = 0.85 // Lower pitch for male voice effect
      utterance.volume = 1
      
      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }, [letter.letter, voices])

  const handleCardClick = () => {
    hapticFeedback('light')
    speakLetter()
  }

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    hapticFeedback('light')
    setShowDetails(true)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    hapticFeedback('light')
    onToggleFavorite()
  }

  const handleLearnedClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    hapticFeedback('medium')
    onToggleLearned()
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
        className={`relative rounded-2xl p-4 cursor-pointer transition-all duration-300
                    ${isLearned 
                      ? 'bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] border-2 border-[#A5D6A7]' 
                      : 'bg-white border border-[#E8DFD3]'
                    }
                    shadow-[0_4px_20px_rgba(139,115,85,0.08)]
                    hover:shadow-[0_8px_30px_rgba(139,115,85,0.15)]
                    ${isPlaying ? 'ring-2 ring-[#C9A86C] ring-offset-2' : ''}`}
        dir="rtl"
      >
        {/* Playing indicator */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 rounded-2xl bg-[#C9A86C]/10 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Top row: Favorite & Learned indicators */}
        <div className="flex items-center justify-between mb-3" dir="ltr">
          <button
            onClick={handleFavoriteClick}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all
                       ${isFavorite 
                         ? 'bg-[#FFF8E1] text-[#C9A86C]' 
                         : 'bg-[#F5F0E8] text-[#A89078]'}`}
          >
            <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={handleLearnedClick}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all
                       ${isLearned 
                         ? 'bg-[#E8F5E9] text-[#6B8F71]' 
                         : 'bg-[#F5F0E8] text-[#A89078]'}`}
          >
            <CheckCircle className={`w-3.5 h-3.5 ${isLearned ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Arabic Letter - Large and centered */}
        <div className="text-center mb-3">
          <motion.span 
            className="text-5xl font-bold text-[#4A3F35] leading-none block"
            animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: "'Noto Sans Arabic', 'Amiri', sans-serif" }}
          >
            {letter.letter}
          </motion.span>
        </div>

        {/* Letter name and transliteration */}
        <div className="text-center mb-3" dir="ltr">
          <p className="text-sm font-semibold text-[#4A3F35]">{letter.name}</p>
          <p className="text-xs text-[#8B7355]">{letter.transliteration}</p>
        </div>

        {/* Bottom row: Sound indicator and details button */}
        <div className="flex items-center justify-between" dir="ltr">
          <motion.div
            animate={isPlaying ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3, repeat: isPlaying ? Infinity : 0 }}
            className="text-[#A89078]"
          >
            <Volume2 className="w-4 h-4" />
          </motion.div>
          
          <button
            onClick={handleDetailsClick}
            className="text-xs text-[#8B7355] underline hover:text-[#6B5344] transition-colors"
          >
            Подробнее
          </button>
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
              className="bg-gradient-to-b from-[#FDF8F3] to-[#F5EFE6] rounded-3xl p-6 max-w-sm w-full 
                         shadow-2xl border border-[#E8DFD3]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B7355] to-[#6B5344] 
                                  flex items-center justify-center shadow-lg">
                    <span 
                      className="text-white text-3xl font-bold"
                      style={{ fontFamily: "'Noto Sans Arabic', 'Amiri', sans-serif" }}
                    >
                      {letter.letter}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#4A3F35]">{letter.name}</h3>
                    <p 
                      className="text-sm text-[#8B7355]" 
                      dir="rtl"
                      style={{ fontFamily: "'Noto Sans Arabic', 'Amiri', sans-serif" }}
                    >
                      {letter.nameArabic}
                    </p>
                    <p className="text-xs text-[#A89078] mt-0.5">{letter.transliteration}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="w-8 h-8 rounded-full bg-[#E8DFD3] flex items-center justify-center
                             hover:bg-[#DED4C8] transition-colors"
                >
                  <X className="w-4 h-4 text-[#6B5344]" />
                </button>
              </div>
              
              {/* Content */}
              <div className="space-y-4">
                {/* Pronunciation */}
                <div className="bg-white rounded-xl p-4 border border-[#E8DFD3]">
                  <p className="text-xs font-medium text-[#8B7355] mb-1.5 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5" />
                    Как произносить
                  </p>
                  <p className="text-sm text-[#4A3F35] leading-relaxed">{letter.description}</p>
                </div>
                
                {/* Makhraj */}
                <div className="bg-gradient-to-br from-[#FFF8E1] to-[#FFF3CD] rounded-xl p-4 border border-[#F5E6B8]">
                  <p className="text-xs font-medium text-[#A68B5B] mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Место выхода звука (махрадж)
                  </p>
                  <p className="text-sm text-[#6B5344] font-medium">{letter.makhraj}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2">
                <button
                  onClick={() => {
                    speakLetter()
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B7355] to-[#6B5344] 
                             text-white font-medium flex items-center justify-center gap-2 
                             shadow-lg hover:shadow-xl transition-shadow active:opacity-90"
                >
                  <Volume2 className="w-4 h-4" />
                  Послушать произношение
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      handleFavoriteClick(e)
                    }}
                    className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 
                               transition-all border
                               ${isFavorite 
                                 ? 'bg-[#FFF8E1] text-[#A68B5B] border-[#F5E6B8]' 
                                 : 'bg-white text-[#8B7355] border-[#E8DFD3]'}`}
                  >
                    <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'В избранном' : 'В избранное'}
                  </button>
                  
                  <button
                    onClick={(e) => {
                      handleLearnedClick(e)
                    }}
                    className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 
                               transition-all border
                               ${isLearned 
                                 ? 'bg-[#E8F5E9] text-[#6B8F71] border-[#C8E6C9]' 
                                 : 'bg-white text-[#8B7355] border-[#E8DFD3]'}`}
                  >
                    <CheckCircle className={`w-4 h-4 ${isLearned ? 'fill-current' : ''}`} />
                    {isLearned ? 'Изучено' : 'Изучил'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
