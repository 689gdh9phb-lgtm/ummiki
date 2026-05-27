'use client'

import { motion } from 'framer-motion'
import { HomeCard } from '@/components/home-card'

const menuItems = [
  { title: 'Викторины', pill: 'Играть', emoji: '🧠', href: '/quizzes' },
  { title: 'Истории', pill: 'Читать', emoji: '📖', href: '/stories' },
  { title: 'Хадисы', pill: 'Читать', emoji: '🕌', href: '/hadiths' },
  { title: 'Арабский алфавит', pill: 'Изучать', emoji: '🔤', href: '/alphabet' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-muted/50 px-4 py-6 pb-10 safe-area-inset">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        {/* Logo Icon */}
        <motion.div
          className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-primary to-accent 
                     flex items-center justify-center shadow-[0_8px_30px_rgba(123,63,242,0.25)]"
          animate={{ 
            boxShadow: [
              '0 8px 30px rgba(123,63,242,0.25)',
              '0 12px 40px rgba(123,63,242,0.35)',
              '0 8px 30px rgba(123,63,242,0.25)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-10 h-10 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" 
            />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-primary to-accent 
                     bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          УММИКИ
        </motion.h1>
      </motion.header>

      {/* Menu Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {menuItems.map((item, index) => (
          <HomeCard 
            key={item.href}
            title={item.title}
            pill={item.pill}
            emoji={item.emoji}
            href={item.href}
            index={index}
          />
        ))}
      </div>

      {/* Footer Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-muted-foreground text-sm font-medium"
      >
        Играй, читай и изучай вместе с Уммики!
      </motion.p>
    </main>
  )
}
