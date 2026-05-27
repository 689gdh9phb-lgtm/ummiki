'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BackButton } from '@/components/back-button'
import { hadiths } from '@/lib/data/hadiths'

interface HadithDetailPageProps {
  params: Promise<{ id: string }>
}

export default function HadithDetailPage({ params }: HadithDetailPageProps) {
  const { id } = use(params)
  const router = useRouter()
  
  const hadith = hadiths.find(h => h.id === id)

  if (!hadith) {
    return (
      <main className="min-h-screen bg-background px-5 py-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Хадис не найден</p>
          <button
            onClick={() => router.push('/hadiths')}
            className="text-primary font-medium"
          >
            Вернуться к списку
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 
                     pb-12 safe-area-inset">
      {/* Header */}
      <div className="px-5 py-6">
        <div className="mb-4">
          <BackButton label="Хадисы" />
        </div>
      </div>

      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="px-5 mb-6"
      >
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={hadith.image}
            alt={hadith.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {hadith.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {hadith.readingTime} чтения
          </p>
        </motion.div>

        {/* Hadith text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-card rounded-2xl p-5 shadow-[0_4px_16px_rgba(123,63,242,0.06)] 
                     border border-border/50 mb-6"
        >
          <p className="text-foreground leading-relaxed text-base">
            {hadith.hadithText}
          </p>
          <p className="text-xs text-muted-foreground mt-4 italic">
            Источник: {hadith.source}
          </p>
        </motion.div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Что это значит?
          </h2>
          <div className="bg-secondary/50 rounded-2xl p-5 border border-border/30">
            <p className="text-foreground/90 leading-relaxed text-sm">
              {hadith.explanation}
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
