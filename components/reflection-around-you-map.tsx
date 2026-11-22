import { Check } from 'lucide-react'
import { reflectionActivities } from '@/lib/data/reflection-around-you'

const rowHeight = 84
const nodePositions = [20, 52, 80, 72, 37, 18, 36, 68, 82, 50]
const points = nodePositions.map((x, index) => ({ x, y: index * rowHeight + 42 }))
const routePath = points.reduce((path, point, index) => {
  if (index === 0) return `M ${point.x} ${point.y}`
  const previous = points[index - 1]
  const middleY = (previous.y + point.y) / 2
  return `${path} C ${previous.x} ${middleY} ${point.x} ${middleY} ${point.x} ${point.y}`
}, '')

interface ReflectionAroundYouMapProps {
  onSelectActivity: (activityId: string) => void
  completedActivityIds: string[]
}

export function ReflectionAroundYouMap({ onSelectActivity, completedActivityIds }: ReflectionAroundYouMapProps) {
  return (
    <section aria-label="Карта десяти заданий дорожки" className="relative mx-auto w-full max-w-[560px]">
      <div
        className="relative isolate overflow-hidden rounded-[30px] border border-[#E9DFC9] bg-[linear-gradient(155deg,#FFF9EA_0%,#FFFDF8_48%,#F7F1FF_100%)] shadow-[0_16px_42px_rgba(78,61,111,0.10)]"
        style={{ height: `${rowHeight * reflectionActivities.length}px` }}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_18%,rgba(255,209,111,0.18),transparent_26%),radial-gradient(ellipse_at_82%_72%,rgba(123,63,242,0.08),transparent_34%)]" />

        <svg
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full"
          viewBox={`0 0 100 ${rowHeight * reflectionActivities.length}`}
          preserveAspectRatio="none"
        >
          <path d={routePath} fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
          <path d={routePath} fill="none" stroke="#E9C56C" strokeDasharray="3 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </svg>

        {reflectionActivities.map((activity, index) => {
          const completed = completedActivityIds.includes(activity.id)
          return (
            <button
              key={activity.id}
              type="button"
              onClick={() => onSelectActivity(activity.id)}
              aria-label={`Шаг ${index + 1}: ${activity.mapLabel}${completed ? ', выполнено' : ', открыть задание'}`}
              className="absolute z-10 grid size-[68px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[5px] border-white bg-[linear-gradient(145deg,#FFFFFF_0%,#F3E9D5_100%)] text-[23px] font-extrabold tracking-[-0.04em] text-primary shadow-[0_8px_18px_rgba(62,73,97,0.22)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 active:scale-95 sm:size-[76px] sm:text-[25px]"
              style={{ left: `${nodePositions[index]}%`, top: points[index].y }}
            >
              {index + 1}
              {completed && <span aria-hidden="true" className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-sm"><Check className="size-3.5" /></span>}
            </button>
          )
        })}
      </div>
    </section>
  )
}
