'use client'

import { motion } from 'framer-motion'
import { BackButton } from '@/components/back-button'
import { SimpleLetterCard } from '@/components/simple-letter-card'
import { arabicAlphabet } from '@/lib/data/alphabet'
import { BookOpen } from 'lucide-react'

export default function AlphabetPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F1FF] via-[#EDE7FF] to-[#E8E0FF] 
                     px-4 py-5 pb-16 safe-area-inset">
      {/* Decorative Pattern Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237B3FF2' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
           }}
      />

      {/* Header */}
      <div className="relative z-10 mb-5">
        <BackButton />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7B3FF2] to-[#A66CFF] 
                          flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#4A3F5C]">
              Арабский алфавит
            </h1>
            <p className="text-[#7B3FF2] text-sm">
              28 букв для изучения
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mb-4"
      >
        <h3 className="text-sm font-medium text-[#4A3F5C]">
          Все буквы алфавита
        </h3>
      </motion.div>

      {/* Alphabet Grid - RTL direction for Arabic letters */}
      <div 
        className="relative z-10 grid grid-cols-2 gap-3" 
        dir="rtl"
      >
        {arabicAlphabet.map((letter, index) => (
          <SimpleLetterCard 
            key={letter.id} 
            letter={letter} 
            index={index}
          />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 mt-8 text-center"
      >
        <p className="text-[#7B3FF2]/60 text-xs">
          Да поможет вам Аллах в изучении Его языка
        </p>
      </motion.div>
    </main>
  )
}
