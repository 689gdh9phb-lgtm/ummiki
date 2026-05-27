'use client'

import Image from 'next/image'
import { HomeCard } from '@/components/home-card'

const menuItems = [
  { title: 'Викторины', pill: 'Играть', emoji: '🧠', href: '/quizzes' },
  { title: 'Истории', pill: 'Читать', emoji: '📖', href: '/stories' },
  { title: 'Хадисы', pill: 'Читать', emoji: '🕌', href: '/hadiths' },
  { title: 'Арабский\nалфавит', pill: 'Изучать', emoji: '🔤', href: '/alphabet' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-muted/50 px-4 py-6 safe-area-inset flex flex-col items-center justify-center">
      {/* Logo - centered */}
      <div className="mb-8 flex flex-col items-center justify-center">
        <Image 
          src="/logo.svg" 
          alt="Уммики" 
          width={200} 
          height={170}
          priority
          className="w-[160px] h-auto mx-auto"
        />
        <h1 className="text-2xl font-bold text-[#7B3FF2] mt-3 font-sans tracking-wide text-center">
          УММИКИ
        </h1>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-[400px]">
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
    </main>
  )
}
