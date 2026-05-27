'use client'

import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTelegram } from './telegram-provider'

interface BackButtonProps {
  label?: string
}

export function BackButton({ label = 'Назад' }: BackButtonProps) {
  const router = useRouter()
  const { hapticFeedback } = useTelegram()

  const handleBack = () => {
    hapticFeedback('light')
    router.back()
  }

  return (
    <motion.button
      onClick={handleBack}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-1 text-primary font-medium text-sm 
                 active:opacity-70 transition-opacity"
    >
      <ChevronLeft className="w-5 h-5" />
      <span>{label}</span>
    </motion.button>
  )
}
