'use client'

import { motion } from 'framer-motion'
import { BackButton } from '@/components/back-button'
import { NameGroupCard } from '@/components/name-group-card'
import { nameGroups } from '@/lib/data/names'

export default function NamesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 
                     px-5 py-6 pb-12 safe-area-inset">
      {/* Header */}
      <div className="mb-6">
        <BackButton href="/" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground mb-2 text-balance">
          99 имён Аллаха
        </h1>
        <p className="text-muted-foreground text-sm">
          Знакомимся и заучиваем прекрасные имена Аллаха. Выбери группу имён.
        </p>
      </motion.div>

      {/* Group cards */}
      <div className="space-y-4">
        {nameGroups.map((group, index) => (
          <NameGroupCard key={group.id} group={group} index={index} />
        ))}
      </div>
    </main>
  )
}
