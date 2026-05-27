'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useTelegram } from './telegram-provider'
import type { Story } from '@/lib/data/stories'

interface StoryCardProps {
  story: Story
  index: number
}

export function StoryCard({ story, index }: StoryCardProps) {
  const { hapticFeedback } = useTelegram()

  return (
    <Link href={`/stories/${story.id}`} onClick={() => hapticFeedback('light')}>
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
            src={story.image}
            alt={story.title}
            fill
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {/* Title on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-white text-xl leading-tight">
              {story.title}
            </h3>
          </div>
        </div>
        
        {/* Bottom section with reading time and button */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Book icon */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              className="text-primary flex-shrink-0"
            >
              <path 
                d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm text-muted-foreground">
              {story.readingTime} чтения
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
