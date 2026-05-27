'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTelegram } from './telegram-provider'

interface QuizCategoryCardProps {
  id: string
  title: string
  emoji: string
  description: string
  index: number
}

export function QuizCategoryCard({ id, title, emoji, description, index }: QuizCategoryCardProps) {
  const { hapticFeedback } = useTelegram()

  return (
    <Link href={`/quizzes/${id}`} onClick={() => hapticFeedback('light')}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          delay: index * 0.1,
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ scale: 1.01, x: 4 }}
        whileTap={{ scale: 0.98 }}
        className="bg-card rounded-[24px] p-5 shadow-[0_4px_16px_rgba(123,63,242,0.06)] 
                   border border-border/50 flex items-center gap-4
                   active:shadow-[0_2px_8px_rgba(123,63,242,0.1)] transition-shadow duration-200"
      >
        {/* Emoji container */}
        <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center 
                       text-2xl flex-shrink-0">
          {emoji}
        </div>
        
        {/* Text content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-card-foreground text-base truncate">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5 truncate">
            {description}
          </p>
        </div>
        
        {/* Arrow */}
        <div className="text-muted-foreground">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </Link>
  )
}
