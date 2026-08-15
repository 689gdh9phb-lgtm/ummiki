'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BackButton } from '@/components/back-button'
import { StoryCard } from '@/components/story-card'
import { stories, storyCategories, type StoryCategory } from '@/lib/data/stories'

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState<StoryCategory | 'all'>('all')

  const filteredStories =
    activeCategory === 'all'
      ? stories
      : stories.filter(story => story.category === activeCategory)

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

      {/* Category filters */}
      <motion.nav
        aria-label="Фильтр историй по темам"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8 -mx-5 px-5 overflow-x-auto scrollbar-hide"
      >
        <div className="flex gap-2 w-max">
          {storyCategories.map(category => {
            const isActive = activeCategory === category.id
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                }`}
              >
                {category.label}
              </button>
            )
          })}
        </div>
      </motion.nav>

      {/* Story cards */}
      {filteredStories.length > 0 ? (
        <div className="space-y-6">
          {filteredStories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm text-center py-12">
          В этой теме пока нет историй
        </p>
      )}
    </main>
  )
}
