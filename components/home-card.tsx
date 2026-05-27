'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTelegram } from './telegram-provider'

interface HomeCardProps {
  title: string
  pill: string
  emoji: string
  href: string
  index: number
}

export function HomeCard({ title, pill, emoji, href, index }: HomeCardProps) {
  const { hapticFeedback } = useTelegram()

  return (
    <Link href={href} onClick={() => hapticFeedback('light')}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: index * 0.1 + 0.2,
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="relative bg-card rounded-[24px] p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)] 
                   overflow-hidden min-h-[160px] flex flex-col
                   active:shadow-[0_1px_8px_rgba(0,0,0,0.08)] transition-shadow duration-200"
      >
        {/* Pill badge - top right */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-secondary text-primary 
                         text-xs font-semibold">
            {pill}
          </span>
        </div>
        
        {/* Emoji icon - large */}
        <div className="flex-1 flex items-start pt-2">
          <span className="text-[44px] leading-none">{emoji}</span>
        </div>
        
        {/* Title - bottom left */}
        <h3 className="text-[17px] font-bold text-foreground mt-auto leading-tight whitespace-pre-line">
          {title}
        </h3>
      </motion.div>
    </Link>
  )
}
