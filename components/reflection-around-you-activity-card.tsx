import type { ReactNode } from 'react'
import type { ReflectionActivity } from '@/lib/data/reflection-around-you'

interface ReflectionAroundYouActivityCardProps {
  activity: ReflectionActivity
  index: number
  children: ReactNode
}

function ActivitySection({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className: string
}) {
  return (
    <section className={`rounded-[22px] p-4 sm:p-5 ${className}`}>
      <h3 className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary sm:text-xs">
        {label}
      </h3>
      <div className="flex flex-col gap-2 text-[13px] leading-[1.65] text-foreground/90 sm:text-sm">
        {children}
      </div>
    </section>
  )
}

export function ReflectionAroundYouActivityCard({
  activity,
  index,
  children,
}: ReflectionAroundYouActivityCardProps) {
  return (
    <article
      id={`activity-${activity.id}`}
      aria-labelledby={`activity-${activity.id}-title`}
      className="scroll-mt-4 rounded-[30px] border border-white/90 bg-[#FFFEFA] p-4 shadow-[0_14px_36px_rgba(63,77,104,0.12)] sm:p-6"
    >
      <header className="mb-4 flex items-start gap-3 sm:mb-5 sm:gap-4">
        <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-[18px] bg-primary text-lg font-extrabold text-primary-foreground shadow-[0_8px_18px_rgba(123,63,242,0.22)] sm:size-14 sm:text-xl">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0 pt-0.5">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary/80">
            Шаг {index + 1} · {activity.mapLabel}
          </p>
          <h2 id={`activity-${activity.id}-title`} className="text-[21px] font-extrabold leading-[1.16] tracking-[-0.03em] text-foreground sm:text-[25px]">
            {activity.title}
          </h2>
          <p className="mt-1 text-[12px] font-semibold leading-5 text-muted-foreground sm:text-sm">
            {activity.subtitle}
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-3">
        <ActivitySection label="Сделай" className="bg-[#FFF6E4]">
          {activity.do.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </ActivitySection>

        <ActivitySection label="Узнай" className="bg-[#F4EFFF]">
          {activity.learn.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </ActivitySection>

        <section aria-label={`Задание: ${activity.gameTitle}`} className="rounded-[22px] border border-[#E9DFC9] bg-white p-4 sm:p-5">
          <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary">
            Реши · задание {index + 1}
          </p>
          <h3 className="text-[17px] font-extrabold leading-tight text-foreground sm:text-lg">
            {activity.gameTitle}
          </h3>
          <p className="mb-4 mt-1 text-[12px] leading-5 text-muted-foreground sm:text-[13px]">
            {activity.gameInstructions}
          </p>
          {children}
        </section>

        <ActivitySection label="Размышляй" className="bg-[#EAF8F3]">
          <p className="font-semibold">{activity.reflection}</p>
        </ActivitySection>
      </div>
    </article>
  )
}
