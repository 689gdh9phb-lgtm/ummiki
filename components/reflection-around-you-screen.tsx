'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, Check, Map } from 'lucide-react'
import { BackButton } from '@/components/back-button'
import { ReflectionAroundYouActivityCard } from '@/components/reflection-around-you-activity-card'
import { AroundYouActivityGame } from '@/components/reflection-around-you-games'
import { ReflectionAroundYouMap } from '@/components/reflection-around-you-map'
import { reflectionActivities } from '@/lib/data/reflection-around-you'

export function ReflectionAroundYouScreen() {
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null)
  const [completedActivityIds, setCompletedActivityIds] = useState<string[]>([])
  const [lastCompletedId, setLastCompletedId] = useState<string | null>(null)
  const [completionToRevealId, setCompletionToRevealId] = useState<string | null>(null)
  const completionRef = useRef<HTMLElement | null>(null)
  const selectedActivity = reflectionActivities.find(({ id }) => id === selectedActivityId)
  const lastCompletedActivity = reflectionActivities.find(({ id }) => id === lastCompletedId)

  const openActivity = (activityId: string) => {
    setSelectedActivityId(activityId)
  }

  const returnToMap = () => {
    setSelectedActivityId(null)
    setCompletionToRevealId(null)
  }

  const completeActivity = (activityId: string) => {
    setCompletedActivityIds((current) => current.includes(activityId) ? current : [...current, activityId])
    setLastCompletedId(activityId)
    setCompletionToRevealId(activityId)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedActivityId])

  useEffect(() => {
    if (selectedActivityId && completionToRevealId === selectedActivityId) {
      completionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [completionToRevealId, selectedActivityId])

  if (selectedActivity) {
    const activityIndex = reflectionActivities.findIndex(({ id }) => id === selectedActivity.id)
    const completed = completedActivityIds.includes(selectedActivity.id)

    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#FFF9EA_0%,#F8F4FF_48%,#F4F8FF_100%)] px-4 pb-12 pt-3 safe-area-inset sm:px-6 sm:pt-5">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={returnToMap}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white bg-white/85 px-4 text-sm font-extrabold text-primary shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              На карту
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/75 px-3 py-2 text-[11px] font-bold text-muted-foreground">
              <Map aria-hidden="true" className="size-4 text-primary" />
              Шаг {activityIndex + 1} из {reflectionActivities.length}
            </span>
          </div>

          <ReflectionAroundYouActivityCard activity={selectedActivity} index={activityIndex}>
            <AroundYouActivityGame activityId={selectedActivity.id} onComplete={() => completeActivity(selectedActivity.id)} />
          </ReflectionAroundYouActivityCard>

          {completed && (
            <section ref={completionRef} role="status" aria-live="polite" className="mt-4 rounded-[26px] border border-emerald-200 bg-[linear-gradient(135deg,#F0FFF7,#FFFDF5)] p-5 text-center shadow-[0_12px_30px_rgba(63,77,104,0.10)] sm:p-6">
              <span aria-hidden="true" className="mx-auto grid size-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-800">
                <Check className="size-6" />
              </span>
              <p className="mt-3 text-lg font-extrabold leading-snug text-foreground sm:text-xl">
                Молодец, машааллах теперь ты знаешь больше!
              </p>
              <button
                type="button"
                onClick={returnToMap}
                className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-extrabold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
              >
                <Map aria-hidden="true" className="size-4" />
                Вернуться на карту
              </button>
            </section>
          )}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#FFF9EA_0%,#F8F4FF_48%,#F4F8FF_100%)] px-4 pb-12 pt-3 safe-area-inset sm:px-6 sm:pt-5">
      <div className="mx-auto max-w-[680px]">
        <div className="mb-3">
          <BackButton href="/reflection/trails" />
        </div>

        <header className="mb-4">
          <div className="flex min-h-[112px] overflow-hidden rounded-[26px] border border-white/90 bg-[#FFFCF5] shadow-[0_12px_30px_rgba(63,77,104,0.12)] sm:min-h-[132px]">
            <div className="relative min-h-[112px] w-[42%] shrink-0 overflow-hidden sm:min-h-[132px] sm:w-[45%]">
              <Image
                src="/images/reflection/around-you.png"
                alt="Настольная лупа и яркие предметы для научных открытий"
                fill
                priority
                sizes="(max-width: 640px) 42vw, 300px"
                className="object-cover object-center"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#FFFCF5]/20" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-3 sm:px-5 sm:py-4">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-primary sm:text-[10px]">
                Дорожка открытий
              </p>
              <h1 className="mt-1 text-[21px] font-extrabold leading-tight tracking-[-0.04em] text-foreground sm:text-[28px]">
                Вокруг тебя
              </h1>
              <p className="mt-1 text-[11px] font-bold text-primary sm:text-sm">Я и мир</p>
              <p className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                Выбери шаг на карте, чтобы начать задание
              </p>
            </div>
          </div>
        </header>

        {lastCompletedActivity && (
          <section role="status" aria-live="polite" className="mb-4 flex items-center gap-3 rounded-[22px] border border-emerald-200 bg-[linear-gradient(135deg,#F0FFF7,#FFFDF5)] p-4 shadow-sm">
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
              <Check className="size-5" />
            </span>
            <div>
              <p className="text-sm font-extrabold leading-snug text-foreground">Молодец, машааллах теперь ты знаешь больше!</p>
              <p className="mt-1 text-[11px] font-semibold text-muted-foreground">Шаг {reflectionActivities.findIndex(({ id }) => id === lastCompletedActivity.id) + 1} пройден — выбери следующий.</p>
            </div>
          </section>
        )}

        <ReflectionAroundYouMap
          onSelectActivity={openActivity}
          completedActivityIds={completedActivityIds}
        />

        <p className="mx-auto mt-4 max-w-[560px] text-center text-[11px] font-semibold text-muted-foreground">
          Пройдено {completedActivityIds.length} из {reflectionActivities.length} заданий
        </p>
      </div>
    </main>
  )
}
