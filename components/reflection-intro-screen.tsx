'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTelegram } from '@/components/telegram-provider'

const MotionLink = motion(Link)

export function ReflectionIntroScreen() {
  const shouldReduceMotion = useReducedMotion()
  const { hapticFeedback } = useTelegram()

  return (
    <main className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-5 sm:px-8 sm:py-6">
      <picture className="absolute inset-0 -z-20" aria-hidden="true">
        <source
          media="(min-width: 768px)"
          srcSet="/images/reflection/intro-map-wide.png"
          type="image/png"
        />
        <Image
          src="/images/reflection/intro-map.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#7B3FF2]/10 via-white/5 to-[#23A6A1]/15"
      />

      <motion.section
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-labelledby="reflection-title"
        className="relative flex min-h-[480px] w-full max-w-[520px] items-center rounded-[30px] border border-white/80 bg-[#FFFCF5]/95 p-5 shadow-[0_24px_80px_rgba(50,65,80,0.22)] backdrop-blur-[3px] sm:min-h-[540px] sm:rounded-[36px] sm:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[7px] rounded-[24px] border border-[#E9DFC9] sm:rounded-[29px]"
        />

        <div className="relative w-full">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.17em] text-primary sm:mb-4 sm:text-[11px]">
            <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span>Приключение начинается здесь</span>
          </div>

          <h1
            id="reflection-title"
            className="mb-3 text-[28px] font-extrabold leading-[1.12] tracking-[-0.035em] text-primary sm:mb-4 sm:text-[38px]"
          >
            Дорожки размышления
          </h1>

          <p className="mb-2 text-[16px] font-bold text-foreground sm:text-lg">
            Дорогой друг!
          </p>

          <div className="space-y-2.5 text-[14px] leading-[1.55] text-foreground/90 sm:space-y-3 sm:text-[15px]">
            <p>
              Куда бы ты ни посмотрел, везде увидишь творения. А все творения имеют{' '}
              <strong className="font-bold text-primary">Единого Создателя.</strong>
            </p>
            <p>
              В этой игре мы пройдём по интересным дорожкам, узнаем удивительные факты и будем учиться замечать{' '}
              <strong className="font-bold text-primary">глубокую мудрость Создателя.</strong>
            </p>
            <p className="font-semibold text-foreground">
              В путь, дорогой исследователь!
            </p>
          </div>

          <MotionLink
            href="/reflection/trails"
            onClick={() => hapticFeedback('light')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.975 }}
            className="mt-5 flex min-h-[54px] w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 text-[15px] font-bold text-primary-foreground shadow-[0_10px_22px_rgba(123,63,242,0.28)] transition-shadow hover:shadow-[0_14px_28px_rgba(123,63,242,0.34)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 sm:mt-6 sm:min-h-[58px] sm:text-base"
          >
            <span>Выбрать дорожку</span>
            <motion.span
              aria-hidden="true"
              animate={shouldReduceMotion ? undefined : { x: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </MotionLink>
        </div>
      </motion.section>
    </main>
  )
}
