'use client'

import { use, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/back-button'
import { NameDetailModal } from '@/components/name-detail-modal'
import { getNameGroup, type DivineName } from '@/lib/data/names'
import { useTelegram } from '@/components/telegram-provider'

interface GroupPageProps {
  params: Promise<{ group: string }>
}

export default function NameGroupPage({ params }: GroupPageProps) {
  const { group: groupId } = use(params)
  const router = useRouter()
  const { hapticFeedback } = useTelegram()
  const [selected, setSelected] = useState<DivineName | null>(null)

  const group = getNameGroup(groupId)

  if (!group) {
    return (
      <main className="min-h-screen bg-background px-5 py-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Группа не найдена</p>
          <button
            onClick={() => router.push('/names')}
            className="text-primary font-medium"
          >
            Вернуться к именам
          </button>
        </div>
      </main>
    )
  }

  const openName = (name: DivineName) => {
    hapticFeedback('light')
    setSelected(name)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 
                     px-5 py-6 pb-12 safe-area-inset">
      {/* Header */}
      <div className="mb-6">
        <BackButton label="Имена Аллаха" href="/names" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {group.title}
        </h1>
        <p className="text-muted-foreground text-sm">
          Нажми на имя, чтобы прочитать его значение и пояснение.
        </p>
      </motion.div>

      {/* Name list */}
      <div className="space-y-3">
        {group.names.map((name, index) => (
          <motion.button
            key={name.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.35 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openName(name)}
            className="w-full text-left bg-card rounded-[18px] shadow-[0_2px_14px_rgba(0,0,0,0.06)] 
                       flex items-center gap-3 p-3.5"
          >
            {/* Number */}
            <div className="w-9 h-9 flex-shrink-0 rounded-full bg-secondary 
                            flex items-center justify-center">
              <span className="text-secondary-foreground font-bold text-sm">
                {name.id}
              </span>
            </div>

            {/* Transliteration + translation */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground text-[15px] leading-tight">
                {name.transliteration}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {name.translation}
              </p>
            </div>

            {/* Arabic */}
            <p
              dir="rtl"
              lang="ar"
              className="text-primary text-2xl flex-shrink-0"
              style={{ fontFamily: 'var(--font-amiri), serif' }}
            >
              {name.arabic}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Detail modal */}
      <NameDetailModal name={selected} onClose={() => setSelected(null)} />
    </main>
  )
}
