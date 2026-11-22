import Image from 'next/image'
import { BackButton } from '@/components/back-button'
import { ReflectionAroundYouActivityCard } from '@/components/reflection-around-you-activity-card'
import { AroundYouActivityGame } from '@/components/reflection-around-you-games'
import { ReflectionAroundYouMap } from '@/components/reflection-around-you-map'
import { reflectionActivities } from '@/lib/data/reflection-around-you'

export function ReflectionAroundYouScreen() {
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
                alt="Солнечная комната со столом и лупой у большого окна"
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
                10 открытых шагов — выбирай номер или листай дальше
              </p>
            </div>
          </div>
        </header>

        <ReflectionAroundYouMap />

        <header className="mx-auto mb-4 mt-8 max-w-[560px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-primary">Всё открыто</p>
          <h2 className="mt-1 text-[22px] font-extrabold leading-tight tracking-[-0.03em] text-foreground sm:text-[26px]">
            Задания по шагам
          </h2>
          <p className="mt-1 text-[12px] leading-5 text-muted-foreground sm:text-sm">
            Каждое задание уже раскрыто полностью. Можно просто прокручивать страницу.
          </p>
        </header>

        <section aria-label="Десять заданий дорожки Вокруг тебя" className="mx-auto flex max-w-[600px] flex-col gap-5 sm:gap-6">
          {reflectionActivities.map((activity, index) => (
            <ReflectionAroundYouActivityCard key={activity.id} activity={activity} index={index}>
              <AroundYouActivityGame activityId={activity.id} />
            </ReflectionAroundYouActivityCard>
          ))}
        </section>
      </div>
    </main>
  )
}
