'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Info, X } from 'lucide-react'
import { useTelegram } from './telegram-provider'
import type { ArabicLetter } from '@/lib/data/alphabet'

interface LetterCardProps {
  letter: ArabicLetter
  index: number
  colorIndex: number
}

const colors = [
  'bg-[#7B3FF2]',
  'bg-[#A66CFF]',
  'bg-[#8B5CF6]',
  'bg-[#9333EA]',
  'bg-[#7C3AED]',
  'bg-[#6D28D9]',
]

// Arabic pronunciation for speech synthesis (proper Arabic names)
const arabicPronunciationMap: Record<string, string> = {
  'ا': 'alif',
  'ب': 'ba',
  'ت': 'ta',
  'ث': 'tha',
  'ج': 'jeem',
  'ح': 'haa',
  'خ': 'khaa',
  'د': 'dal',
  'ذ': 'thal',
  'ر': 'ra',
  'ز': 'zay',
  'س': 'seen',
  'ش': 'sheen',
  'ص': 'sad',
  'ض': 'dad',
  'ط': 'taa',
  'ظ': 'dhaa',
  'ع': 'ayn',
  'غ': 'ghayn',
  'ف': 'fa',
  'ق': 'qaf',
  'ك': 'kaf',
  'ل': 'lam',
  'م': 'meem',
  'ن': 'noon',
  'ه': 'ha',
  'و': 'waw',
  'ي': 'ya',
}

export function LetterCard({ letter, index, colorIndex }: LetterCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const { hapticFeedback } = useTelegram()

  const colorClass = colors[colorIndex % colors.length]

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

  const speakLetter = useCallback((letterKey: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      
      const pronunciation = arabicPronunciationMap[letterKey] || letter.name
      const utterance = new SpeechSynthesisUtterance(pronunciation)
      
      // Try to find Arabic voice first, then English male voice
      const arabicVoice = voices.find(v => v.lang.includes('ar'))
      const englishMaleVoice = voices.find(v => 
        v.lang.includes('en') && v.name.toLowerCase().includes('male')
      )
      const anyMaleVoice = voices.find(v => 
        v.name.toLowerCase().includes('male') || 
        v.name.toLowerCase().includes('david') ||
        v.name.toLowerCase().includes('daniel') ||
        v.name.toLowerCase().includes('james')
      )
      const englishVoice = voices.find(v => v.lang.includes('en-US') || v.lang.includes('en-GB'))
      
      if (arabicVoice) {
        utterance.voice = arabicVoice
        utterance.lang = 'ar-SA'
      } else if (englishMaleVoice) {
        utterance.voice = englishMaleVoice
        utterance.lang = 'en-US'
      } else if (anyMaleVoice) {
        utterance.voice = anyMaleVoice
      } else if (englishVoice) {
        utterance.voice = englishVoice
        utterance.lang = 'en-US'
      }
      
      utterance.rate = 0.7
      utterance.pitch = 0.9 // Lower pitch for male voice
      utterance.volume = 1
      
      utterance.onend = () => {
        setIsPlaying(false)
        setIsPressed(false)
      }
      
      utterance.onerror = () => {
        setIsPlaying(false)
        setIsPressed(false)
      }
      
      window.speechSynthesis.speak(utterance)
    } else {
      setTimeout(() => {
        setIsPlaying(false)
        setIsPressed(false)
      }, 500)
    }
  }, [letter.name, voices])

  const handlePlay = () => {
    hapticFeedback('light')
    setIsPressed(true)
    setIsPlaying(true)
    speakLetter(letter.letter)
  }

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    hapticFeedback('light')
    setShowInfo(true)
  }

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: index * 0.02,
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePlay}
        className={`relative aspect-square rounded-2xl ${colorClass} p-2 
                    shadow-[0_4px_12px_rgba(123,63,242,0.2)] flex flex-col items-center 
                    justify-center overflow-hidden transition-shadow duration-200
                    active:shadow-[0_2px_8px_rgba(123,63,242,0.3)]`}
      >
        {/* Pulse animation when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}

        {/* Arabic letter */}
        <motion.span 
          className="text-white text-2xl font-bold leading-none"
          animate={isPressed ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {letter.letter}
        </motion.span>

        {/* Russian name */}
        <span className="text-white/80 text-[10px] mt-1 font-medium">
          {letter.name}
        </span>

        {/* Info button */}
        <button
          onClick={handleInfoClick}
          className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center"
        >
          <Info className="w-3 h-3 text-white/80" />
        </button>

        {/* Sound icon indicator */}
        <motion.div
          className="absolute bottom-1 right-1"
          animate={isPlaying ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Volume2 className="w-3 h-3 text-white/60" />
        </motion.div>
      </motion.button>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl p-5 max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center`}>
                    <span className="text-white text-2xl font-bold">{letter.letter}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{letter.name}</h3>
                    <p className="text-sm text-muted-foreground" dir="rtl">{letter.nameArabic}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowInfo(false)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Транслитерация</p>
                  <p className="text-sm text-foreground font-medium">{letter.transliteration}</p>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Как произносить</p>
                  <p className="text-sm text-foreground leading-relaxed">{letter.description}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  handlePlay()
                }}
                className={`mt-4 w-full py-3 rounded-xl ${colorClass} text-white font-medium 
                           flex items-center justify-center gap-2 active:opacity-90`}
              >
                <Volume2 className="w-4 h-4" />
                Послушать произношение
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
