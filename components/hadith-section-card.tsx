'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { useTelegram } from './telegram-provider'
import type { HadithSection } from '@/lib/data/hadiths'

interface HadithSectionCardProps {
  section: HadithSection
  index: number
}

function pluralizeHadith(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'хадис'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'хадиса'
  return 'хадисов'
}

export function HadithSectionCard({ section, index }: HadithSectionCardProps) {
  const { hapticFeedback } = useTelegram()
  const count = section.hadithIds.length

  return (
    <Link href={`/hadiths/${section.id}`} onClick={() => hapticFeedback('light')}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.06,
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="bg-card rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
                   flex items-center gap-4 p-3"
      >
        {/* Cover thumbnail */}
        <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden">
          <Image
            src={section.cover}
            alt={section.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-base leading-tight text-balance">
            {section.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {section.description}
          </p>
          <span className="inline-block mt-2 text-xs font-semibold text-primary">
            {count} {pluralizeHadith(count)}
          </span>
        </div>

        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </motion.div>
    </Link>
  )
}
