'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useTelegram } from './telegram-provider'
import type { Hadith } from '@/lib/data/hadiths'

interface HadithCardProps {
  hadith: Hadith
  index: number
  sectionId: string
}

export function HadithCard({ hadith, index, sectionId }: HadithCardProps) {
  const { hapticFeedback } = useTelegram()

  return (
    <Link href={`/hadiths/${sectionId}/${hadith.id}`} onClick={() => hapticFeedback('light')}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: index * 0.1,
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="bg-card rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
      >
        {/* Image with title overlay */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={hadith.image}
            alt={hadith.title}
            fill
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {/* Title on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-white text-xl leading-tight">
              {hadith.title}
            </h3>
          </div>
        </div>
        
        {/* Bottom section with source and button */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Quote icon */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              className="text-primary flex-shrink-0"
            >
              <path 
                d="M10 8H6C4.89543 8 4 8.89543 4 10V14C4 15.1046 4.89543 16 6 16H8C9.10457 16 10 15.1046 10 14V8ZM10 8C10 5.79086 8.20914 4 6 4M20 8H16C14.8954 8 14 8.89543 14 10V14C14 15.1046 14.8954 16 16 16H18C19.1046 16 20 15.1046 20 14V8ZM20 8C20 5.79086 18.2091 4 16 4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm text-muted-foreground truncate">
              {hadith.source}
            </span>
          </div>
          <span className="text-primary font-semibold text-sm flex-shrink-0">
            Читать
          </span>
        </div>
      </motion.div>
    </Link>
  )
}
