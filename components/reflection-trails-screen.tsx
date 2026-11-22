'use client'

import Image from 'next/image'
import { BackButton } from '@/components/back-button'
import { reflectionTrails } from '@/lib/data/reflection-trails'

export function ReflectionTrailsScreen() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F1FF] via-background to-[#EDF5FF] px-4 py-5 pb-10 safe-area-inset">
      <div className="mx-auto max-w-[600px]">
        <div className="mb-4">
          <BackButton href="/reflection" />
        </div>

        <header className="mb-5">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
            Дорожки размышления
          </p>
          <h1 className="text-[28px] font-extrabold leading-tight tracking-[-0.03em] text-foreground sm:text-[32px]">
            Выбери дорожку
          </h1>
          <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
            Каждая из них ведёт к удивительным открытиям.
          </p>
        </header>

        <section aria-label="Доступные дорожки" className="space-y-4 sm:space-y-5">
          {reflectionTrails.map((trail, index) => (
            <article
              key={trail.id}
              className="overflow-hidden rounded-[26px] border border-white/90 bg-white shadow-[0_12px_32px_rgba(63,77,104,0.12)]"
            >
              <div className="relative h-[142px] overflow-hidden sm:h-[180px]">
                <Image
                  src={trail.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 600px"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#202737]/25 to-transparent"
                />
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-sm">
                  Дорожка {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="px-5 pb-4 pt-3.5 sm:px-6 sm:pb-5 sm:pt-4">
                <h2 className="text-[20px] font-extrabold leading-tight tracking-[-0.02em] text-foreground sm:text-[23px]">
                  {trail.title}
                </h2>
                <p className="mt-1 text-[12px] font-bold tracking-[0.03em] text-primary sm:text-[13px]">
                  {trail.subtitle}
                </p>
                <p className="mt-1.5 text-[13px] leading-[1.45] text-muted-foreground sm:text-sm">
                  {trail.description}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
