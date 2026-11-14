'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useTelegram } from './telegram-provider'
import type { NameGroup } from '@/lib/data/names'

interface NameGroupCardProps {
  group: NameGroup
  index: number
}

export function NameGroupCard({ group, index }: NameGroupCardProps) {
  const { hapticFeedback } = useTelegram()
  const preview = group.names
    .slice(0, 3)
    .map((n) => n.transliteration)
    .join(', ')

  return (
    <Link href={`/names/${group.id}`} onClick={() => hapticFeedback('light')}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.05,
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="bg-card rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
                   flex items-center gap-4 p-4"
      >
        {/* Number badge */}
        <div
          className="w-14 h-14 flex-shrink-0 rounded-2xl flex items-center justify-center 
                     bg-gradient-to-br from-primary to-accent shadow-md"
        >
          <span className="text-primary-foreground font-bold text-sm leading-tight text-center">
            {group.start}–{group.end}
          </span>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-base leading-tight">
            {group.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {preview}…
          </p>
          <span className="inline-block mt-2 text-xs font-semibold text-primary">
            {group.names.length} имён
          </span>
        </div>

        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </motion.div>
    </Link>
  )
}
