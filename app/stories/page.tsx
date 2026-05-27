'use client'

import { motion } from 'framer-motion'
import { BackButton } from '@/components/back-button'
import { StoryCard } from '@/components/story-card'
import { stories } from '@/lib/data/stories'

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 
                     px-5 py-6 pb-12 safe-area-inset">
      {/* Header */}
      <div className="mb-6">
        <BackButton />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Истории
        </h1>
        <p className="text-muted-foreground text-sm">
          Поучительные истории для души
        </p>
      </motion.div>

      {/* Story cards */}
      <div className="space-y-5">
        {stories.map((story, index) => (
          <StoryCard key={story.id} story={story} index={index} />
        ))}
      </div>
    </main>
  )
}
