import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { ReflectionActivity } from '@/lib/data/reflection-around-you'

const illustrations: Record<string, { src: string; alt: string }> = {
  fingerprints: { src: '/images/reflection/activities/fingerprints.png', alt: 'Руки ребёнка рассматривают узор на пальце через лупу' },
  air: { src: '/images/reflection/activities/air.png', alt: 'Ребёнок выдыхает на ладонь, вокруг показаны потоки воздуха' },
  pulse: { src: '/images/reflection/activities/pulse.png', alt: 'Ребёнок находит пульс на запястье; рядом сон, чтение и бег' },
  colors: { src: '/images/reflection/activities/colors.png', alt: 'Солнечный свет освещает красный мяч, зелёный лист и синюю книгу' },
  sound: { src: '/images/reflection/activities/sound.png', alt: 'Звуковые волны идут от колокольчика к уху ребёнка' },
  shadows: { src: '/images/reflection/activities/shadows.png', alt: 'Лампа и непрозрачная игрушка создают тень на стене' },
  water: { src: '/images/reflection/activities/water.png', alt: 'Лёд, вода в стакане и невидимый водяной пар' },
  magnets: { src: '/images/reflection/activities/magnets.png', alt: 'Магнит притягивает скрепку и шайбу, но не бумагу и кубик' },
  reflection: { src: '/images/reflection/activities/reflection.png', alt: 'Зеркало и спокойная вода отражают цветок' },
  senses: { src: '/images/reflection/activities/senses.png', alt: 'Ребёнок исследует мир зрением, слухом, обонянием, вкусом и осязанием' },
}

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
    <section className={cn('rounded-[22px] p-4 sm:p-5', className)}>
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
  const illustration = illustrations[activity.id]

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

      <div className={cn(
        'grid items-start gap-3 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]',
        index % 2 === 1 && 'md:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]',
      )}>
        <figure className={cn(
          'relative aspect-[3/2] overflow-hidden rounded-[22px] border border-white/80 bg-[#F8F2E6] md:sticky md:top-4 md:self-start',
          index % 2 === 1 && 'md:order-2',
        )}>
          <Image
            src={illustration.src}
            alt={illustration.alt}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            className="object-cover"
          />
        </figure>

        <div className={cn('flex flex-col gap-3', index % 2 === 1 && 'md:order-1')}>
          <ActivitySection label="Сделай" className="bg-[#FFF6E4]">
            {activity.do.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </ActivitySection>

          <ActivitySection label="Узнай" className="bg-[#F4EFFF]">
            {activity.learn.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </ActivitySection>
        </div>

      </div>

      <div className="mt-3 flex flex-col gap-3">
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
