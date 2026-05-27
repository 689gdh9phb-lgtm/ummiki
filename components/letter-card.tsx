'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Volume2 } from 'lucide-react'
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

// Pronunciation mapping for Arabic letters
const pronunciationMap: Record<string, string> = {
  'ا': 'алиф',
  'ب': 'ба',
  'ت': 'та',
  'ث': 'са',
  'ج': 'джим',
  'ح': 'ха',
  'خ': 'ха',
  'د': 'даль',
  'ذ': 'заль',
  'ر': 'ра',
  'ز': 'зай',
  'س': 'син',
  'ش': 'шин',
  'ص': 'сад',
  'ض': 'дад',
  'ط': 'та',
  'ظ': 'за',
  'ع': 'айн',
  'غ': 'гайн',
  'ف': 'фа',
  'ق': 'каф',
  'ك': 'кяф',
  'ل': 'лям',
  'م': 'мим',
  'ن': 'нун',
  'ه': 'ха',
  'و': 'вав',
  'ي': 'йа',
}

export function LetterCard({ letter, index, colorIndex }: LetterCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const { hapticFeedback } = useTelegram()

  const colorClass = colors[colorIndex % colors.length]

  const speakLetter = useCallback((text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ru-RU'
      utterance.rate = 0.8
      utterance.pitch = 1.1
      
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
  }, [])

  const handlePlay = () => {
    hapticFeedback('light')
    setIsPressed(true)
    setIsPlaying(true)
    
    const pronunciation = pronunciationMap[letter.letter] || letter.name
    speakLetter(pronunciation)
  }

  return (
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

      {/* Sound icon indicator */}
      <motion.div
        className="absolute bottom-1 right-1"
        animate={isPlaying ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Volume2 className="w-3 h-3 text-white/60" />
      </motion.div>
    </motion.button>
  )
}
