'use client'

import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import {
  Bell,
  BookOpen,
  Brain,
  Check,
  Circle,
  Cloud,
  Droplet,
  Ear,
  Footprints,
  Hand,
  Leaf,
  Link,
  Magnet,
  Moon,
  Palette,
  Search,
  Snowflake,
  Sparkles,
  Sun,
  Waves,
  Wind,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MatchSource {
  id: string
  label: string
  icon: LucideIcon
  tone: string
}

interface MatchTarget {
  id: string
  label: string
  detail?: string
  tone: string
}

function GameStatus({ children, success = false }: { children: string; success?: boolean }) {
  return (
    <p role="status" aria-live="polite" className={cn(
      'mt-3 rounded-2xl px-3 py-2.5 text-[12px] font-semibold leading-5',
      success ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900',
    )}>
      {children}
    </p>
  )
}

function MatchPairsGame({
  sources,
  targets,
  correctPairs,
  onComplete,
  successText,
}: {
  sources: MatchSource[]
  targets: MatchTarget[]
  correctPairs: Record<string, string>
  onComplete?: () => void
  successText: string
}) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [draggingSource, setDraggingSource] = useState<string | null>(null)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [feedback, setFeedback] = useState('')
  const skipSourceClick = useRef(false)
  const completed = Object.keys(matches).length === sources.length
  const usedTargets = new Set(Object.values(matches))

  const assign = (sourceId: string, targetId: string) => {
    if (matches[sourceId] || usedTargets.has(targetId)) return
    if (correctPairs[sourceId] !== targetId) {
      setFeedback('Пока не совпало. Попробуй ещё раз.')
      return
    }

    const nextMatches = { ...matches, [sourceId]: targetId }
    setMatches(nextMatches)
    setSelectedSource(null)
    setFeedback(Object.keys(nextMatches).length === sources.length ? successText : 'Верно! Продолжай соединять пары.')
    if (Object.keys(nextMatches).length === sources.length) onComplete?.()
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5">
        {sources.map(({ id, label, icon: Icon, tone }) => {
          const isMatched = Boolean(matches[id])
          const isSelected = selectedSource === id
          return (
            <button
              key={id}
              type="button"
              aria-pressed={isSelected}
              disabled={isMatched}
              onPointerDown={(event) => {
                if (!(event.target instanceof Element) || !event.target.closest('[data-drag-handle]')) return
                event.currentTarget.setPointerCapture(event.pointerId)
                setDraggingSource(id)
                setSelectedSource(null)
              }}
              onPointerUp={(event) => {
                if (draggingSource !== id) return
                const target = event.currentTarget.ownerDocument.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-match-target]')
                if (target?.dataset.matchTarget) {
                  skipSourceClick.current = true
                  assign(id, target.dataset.matchTarget)
                }
                setDraggingSource(null)
              }}
              onPointerCancel={() => setDraggingSource(null)}
              onClick={() => {
                if (skipSourceClick.current) {
                  skipSourceClick.current = false
                  return
                }
                if (isMatched) return
                setSelectedSource(isSelected ? null : id)
                setFeedback(isSelected ? '' : 'Теперь выбери, с чем соединить карточку.')
              }}
              className={cn(
                'flex min-h-[72px] items-center gap-2 rounded-2xl border px-3 py-2 text-left text-[12px] font-bold leading-4 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:cursor-default',
                isMatched ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : draggingSource === id ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/20 scale-[1.02]' : isSelected ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/15' : 'border-border/70 bg-white text-foreground hover:border-primary/50',
              )}
            >
              <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl', tone)}>
                {isMatched ? <Check className="size-5" aria-hidden="true" /> : <Icon className="size-5" aria-hidden="true" />}
              </span>
              <span className="flex-1">{label}</span>
              {!isMatched && <span data-drag-handle="true" aria-hidden="true" className="grid size-8 shrink-0 touch-none place-items-center rounded-lg bg-primary/5 text-primary"><Hand className="size-4" /></span>}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {targets.map(({ id, label, detail, tone }) => {
          const isMatched = usedTargets.has(id)
          return (
            <button
              key={id}
              type="button"
              disabled={isMatched}
              data-match-target={id}
              onClick={() => selectedSource ? assign(selectedSource, id) : setFeedback('Сначала выбери карточку сверху.')}
              className={cn(
                'flex min-h-[56px] items-center justify-between gap-2 rounded-2xl border-2 border-dashed px-3 py-2 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:border-emerald-300 disabled:bg-emerald-50',
                isMatched ? 'border-emerald-300 bg-emerald-50' : selectedSource ? 'border-primary/50 bg-primary/[0.035] hover:bg-primary/10' : 'border-border/80 bg-[#FFFCF5]',
              )}
            >
              <span>
                <span className="block text-[12px] font-extrabold text-foreground">{label}</span>
                {detail && <span className="mt-0.5 block text-[10px] leading-4 text-muted-foreground">{detail}</span>}
              </span>
              {isMatched ? <Check className="size-4 shrink-0 text-emerald-700" aria-hidden="true" /> : <span aria-hidden="true" className={cn('size-4 shrink-0 rounded-full border', tone)} />}
            </button>
          )
        })}
      </div>

      {feedback && <GameStatus success={completed}>{feedback}</GameStatus>}
    </div>
  )
}

function FingerprintDrawing({ variant }: { variant: 'loop' | 'whorl' | 'nearby' }) {
  const lineSets = {
    loop: [
      'M50 88 C50 73 42 67 42 56 C42 43 48 34 58 34 C68 34 74 42 74 52',
      'M39 87 C39 70 31 65 31 52 C31 34 42 23 58 23 C75 23 84 35 84 51',
      'M28 86 C28 67 20 61 20 48 C20 26 36 12 58 12 C80 12 92 28 92 49',
      'M58 88 C58 76 67 70 67 58 C67 50 64 46 58 46 C53 46 50 50 50 56',
      'M48 86 C48 77 42 73 42 65',
    ],
    whorl: [
      'M50 88 C49 72 39 66 39 54 C39 41 47 33 58 33 C68 33 75 41 75 51 C75 60 69 66 61 66 C54 66 50 61 50 55 C50 50 53 47 58 47',
      'M38 87 C36 69 28 63 28 51 C28 33 41 21 58 21 C76 21 87 34 87 51 C87 65 78 75 65 76',
      'M27 86 C25 67 17 60 17 48 C17 25 34 10 58 10 C82 10 94 27 94 49',
      'M43 28 C48 19 56 16 64 17',
    ],
    nearby: [
      'M50 88 C50 73 42 67 42 56 C42 43 48 34 58 34 C68 34 74 42 74 52',
      'M39 87 C39 70 31 65 31 52 C31 34 42 23 58 23 C75 23 84 35 84 51',
      'M28 86 C28 67 20 61 20 48 C20 26 36 12 58 12 C80 12 92 28 92 49',
      'M58 88 C58 76 67 70 67 58 C67 50 64 46 58 46 C53 46 50 50 50 56',
      'M48 86 C48 77 42 73 42 65',
    ],
  }

  return (
    <svg viewBox="0 0 110 100" aria-hidden="true" className="size-14 text-primary sm:size-16">
      {lineSets[variant].map((path) => (
        <path key={path} d={path} fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3.2" />
      ))}
      {variant === 'nearby' && <path d="M83 51 C83 60 78 66 72 70" fill="none" stroke="#E3A944" strokeLinecap="round" strokeWidth="3.2" />}
    </svg>
  )
}

function FingerprintGame() {
  const [selected, setSelected] = useState<string | null>(null)
  const [solved, setSolved] = useState(false)
  const [feedback, setFeedback] = useState('')
  const cards = [
    { id: 'a', label: 'А', variant: 'loop' as const },
    { id: 'b', label: 'Б', variant: 'whorl' as const },
    { id: 'c', label: 'В', variant: 'loop' as const },
    { id: 'd', label: 'Г', variant: 'nearby' as const },
  ]

  const choose = (id: string) => {
    if (solved) return
    if (!selected) {
      setSelected(id)
      setFeedback('Теперь выбери отпечаток для сравнения.')
      return
    }
    if (selected === id) {
      setSelected(null)
      setFeedback('')
      return
    }
    const correctPair = (selected === 'a' && id === 'c') || (selected === 'c' && id === 'a')
    setSolved(correctPair)
    setSelected(null)
    setFeedback(correctPair ? 'Верно! А и В — совершенно одинаковые узоры.' : 'Эти узоры похожи, но не совпадают. Попробуй ещё раз.')
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            aria-pressed={selected === card.id || (solved && (card.id === 'a' || card.id === 'c'))}
            onClick={() => choose(card.id)}
            className={cn(
              'flex min-h-[108px] flex-col items-center justify-center gap-1 rounded-2xl border bg-white px-3 py-2 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20',
              solved && (card.id === 'a' || card.id === 'c') ? 'border-emerald-400 bg-emerald-50' : selected === card.id ? 'border-primary bg-primary/5' : 'border-border/70 hover:border-primary/50',
            )}
          >
            <FingerprintDrawing variant={card.variant} />
            <span className="text-xs font-extrabold text-foreground">{card.label}</span>
          </button>
        ))}
      </div>
      {feedback && <GameStatus success={solved}>{feedback}</GameStatus>}
    </div>
  )
}

function AirCompositionGame() {
  const [compositionMatched, setCompositionMatched] = useState(false)
  const [factAnswer, setFactAnswer] = useState<'true' | 'false' | null>(null)
  const squares = Array.from({ length: 100 }, (_, index) => index < 78 ? 'nitrogen' : index < 99 ? 'oxygen' : 'other')

  return (
    <div>
      <p className="mb-2 text-center text-[11px] font-bold text-muted-foreground">100 частей сухого воздуха</p>
      <div role="img" aria-label="Схематичное поле из ста квадратиков, сгруппированных по трём цветам" className="mx-auto mb-4 grid max-w-[260px] grid-cols-10 gap-1">
        {squares.map((gas, index) => (
          <span
            key={index}
            aria-hidden="true"
            className={cn(
              'aspect-square rounded-[4px]',
              gas === 'nitrogen' ? 'bg-slate-300' : gas === 'oxygen' ? 'bg-sky-400' : 'bg-amber-400',
            )}
          />
        ))}
      </div>
      <MatchPairsGame
        sources={[
          { id: 'nitrogen', label: 'Азот', icon: Wind, tone: 'bg-slate-100 text-slate-600' },
          { id: 'oxygen', label: 'Кислород', icon: Cloud, tone: 'bg-sky-100 text-sky-700' },
          { id: 'other', label: 'Другие газы', icon: Sparkles, tone: 'bg-amber-100 text-amber-700' },
        ]}
        targets={[
          { id: '78', label: '78 частей', detail: 'самая большая группа', tone: 'border-slate-400 bg-slate-300' },
          { id: '21', label: '21 часть', tone: 'border-sky-400 bg-sky-400' },
          { id: '1', label: 'Около 1 части', tone: 'border-amber-400 bg-amber-400' },
        ]}
        correctPairs={{ nitrogen: '78', oxygen: '21', other: '1' }}
        onComplete={() => setCompositionMatched(true)}
        successText="Отлично! Большую часть сухого воздуха составляет азот."
      />

      {compositionMatched && (
        <div className="mt-4 rounded-2xl border border-primary/15 bg-primary/[0.04] p-4">
          <p className="text-[13px] font-extrabold text-foreground">«В воздухе больше всего кислорода»</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              { id: 'true', label: 'Верно' },
              { id: 'false', label: 'Ошибка' },
            ].map((answer) => (
              <button
                key={answer.id}
                type="button"
                aria-pressed={factAnswer === answer.id}
                onClick={() => setFactAnswer(answer.id as 'true' | 'false')}
                className={cn(
                  'min-h-11 rounded-xl border px-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20',
                  factAnswer === answer.id ? 'border-primary bg-primary/10 text-primary' : 'border-border/70 bg-white text-foreground hover:border-primary/50',
                )}
              >
                {answer.label}
              </button>
            ))}
          </div>
          {factAnswer && <GameStatus success={factAnswer === 'false'}>{factAnswer === 'false' ? 'Верно: больше всего в воздухе азота.' : 'Подумай ещё раз: какая часть воздуха самая большая?'}</GameStatus>}
        </div>
      )}
    </div>
  )
}

interface SortItem {
  id: string
  label: string
  detail: string
  icon: LucideIcon
  tone: string
}

function SortOrderGame({
  items,
  initialOrder,
  correctOrder,
  successText,
  retryText,
}: {
  items: SortItem[]
  initialOrder: string[]
  correctOrder: string[]
  successText: string
  retryText: string
}) {
  const [order, setOrder] = useState(initialOrder)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [draggingItem, setDraggingItem] = useState<string | null>(null)
  const [feedback, setFeedback] = useState('')
  const [solved, setSolved] = useState(false)
  const draggingItemRef = useRef<string | null>(null)

  const moveItem = (itemId: string, targetId: string) => {
    if (itemId === targetId) return
    const nextOrder = [...order]
    const fromIndex = nextOrder.indexOf(itemId)
    const toIndex = nextOrder.indexOf(targetId)
    if (fromIndex < 0 || toIndex < 0) return
    nextOrder.splice(fromIndex, 1)
    nextOrder.splice(toIndex, 0, itemId)
    setOrder(nextOrder)
    setSolved(false)
    setSelectedItem(null)
  }

  const chooseItem = (itemId: string) => {
    if (!selectedItem) {
      setSelectedItem(itemId)
      setFeedback('Выбрано. Теперь коснись карточки, рядом с которой её нужно поставить.')
      return
    }
    if (selectedItem === itemId) {
      setSelectedItem(null)
      setFeedback('')
      return
    }
    moveItem(selectedItem, itemId)
    setFeedback('Карточка переставлена. Продолжай или проверь порядок.')
  }

  const finishDrag = (event: ReactPointerEvent<HTMLLIElement>) => {
    const draggedId = draggingItemRef.current
    if (!draggedId) return
    const target = event.currentTarget.ownerDocument.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-sort-item]')
    const targetId = target?.dataset.sortItem
    if (targetId && targetId !== draggedId) {
      moveItem(draggedId, targetId)
      setFeedback('Карточка переставлена. Продолжай или проверь порядок.')
    }
    draggingItemRef.current = null
    setDraggingItem(null)
  }

  const checkOrder = () => {
    const correct = order.every((itemId, index) => itemId === correctOrder[index])
    setSolved(correct)
    setFeedback(correct ? successText : retryText)
  }

  return (
    <div>
      <ol className="flex flex-col gap-2" aria-label="Карточки для перестановки">
        {order.map((itemId) => {
          const item = items.find(({ id }) => id === itemId)
          if (!item) return null
          const Icon = item.icon
          return (
            <li
              key={item.id}
              data-sort-item={item.id}
              onPointerUp={finishDrag}
              onPointerCancel={() => {
                draggingItemRef.current = null
                setDraggingItem(null)
              }}
              className={cn(
                'flex min-h-[64px] items-center gap-2 rounded-2xl border bg-white p-2.5 transition',
                draggingItem === item.id ? 'border-primary bg-primary/5 shadow-md' : selectedItem === item.id ? 'border-primary ring-2 ring-primary/15' : 'border-border/70',
              )}
            >
              <button
                type="button"
                aria-pressed={selectedItem === item.id}
                onClick={() => chooseItem(item.id)}
                className="flex min-w-0 flex-1 items-center gap-2 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <span aria-hidden="true" className={cn('grid size-10 shrink-0 place-items-center rounded-xl', item.tone)}>
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] font-extrabold text-foreground">{item.label}</span>
                  <span className="mt-0.5 block text-[10px] leading-4 text-muted-foreground">{item.detail}</span>
                </span>
              </button>
              <span
                data-drag-handle="true"
                aria-hidden="true"
                onPointerDown={(event) => {
                  if (event.button !== 0) return
                  const row = event.currentTarget.closest<HTMLLIElement>('[data-sort-item]')
                  row?.setPointerCapture(event.pointerId)
                  draggingItemRef.current = item.id
                  setDraggingItem(item.id)
                  setSelectedItem(null)
                }}
                className="grid size-10 shrink-0 touch-none cursor-grab place-items-center rounded-xl bg-[#F4EFFF] text-primary active:cursor-grabbing"
              >
                <Hand className="size-5" />
              </span>
            </li>
          )
        })}
      </ol>
      <button
        type="button"
        onClick={checkOrder}
        className="mt-3 min-h-11 w-full rounded-xl bg-primary px-4 text-sm font-extrabold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
      >
        Проверить порядок
      </button>
      {feedback && <GameStatus success={solved}>{feedback}</GameStatus>}
    </div>
  )
}

function ChoiceQuiz({
  question,
  options,
  correctIds,
  multiple = false,
  successText,
  retryText,
}: {
  question: string
  options: { id: string; label: string; icon: LucideIcon; tone: string }[]
  correctIds: string[]
  multiple?: boolean
  successText: string
  retryText: string
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [feedback, setFeedback] = useState('')
  const [solved, setSolved] = useState(false)

  const toggleChoice = (id: string) => {
    setSolved(false)
    setFeedback('')
    if (!multiple) {
      setSelected([id])
      return
    }
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const check = () => {
    const isCorrect = selected.length === correctIds.length && correctIds.every((id) => selected.includes(id))
    setSolved(isCorrect)
    setFeedback(isCorrect ? successText : retryText)
  }

  return (
    <div>
      <p className="mb-3 text-[12px] font-bold text-foreground">{question}</p>
      <div className="grid grid-cols-2 gap-2.5">
        {options.map(({ id, label, icon: Icon, tone }) => {
          const isSelected = selected.includes(id)
          return (
            <button
              key={id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggleChoice(id)}
              className={cn(
                'flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-center text-[11px] font-extrabold leading-4 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20',
                isSelected ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/15' : 'border-border/70 bg-white text-foreground hover:border-primary/50',
              )}
            >
              <span className={cn('grid size-9 place-items-center rounded-xl', tone)}>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              {label}
            </button>
          )
        })}
      </div>
      <button
        type="button"
        onClick={check}
        disabled={selected.length === 0}
        className="mt-3 min-h-11 w-full rounded-xl bg-primary px-4 text-sm font-extrabold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
      >
        Проверить ответ
      </button>
      {feedback && <GameStatus success={solved}>{feedback}</GameStatus>}
    </div>
  )
}

function ExamplesReflection() {
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const [complete, setComplete] = useState(false)

  return (
    <div className="mt-4 rounded-2xl bg-[#EAF8F3] p-4">
      <p className="mb-3 text-[12px] font-extrabold text-foreground">Проговори или запиши два примера, когда звук тебе необходим.</p>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label className="flex-1 text-[10px] font-bold text-muted-foreground">
          Пример 1
          <input
            value={first}
            onChange={(event) => { setFirst(event.target.value); setComplete(false) }}
            className="mt-1.5 min-h-11 w-full rounded-xl border border-border bg-white px-3 text-sm font-medium text-foreground outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
            placeholder="Например, услышать будильник"
          />
        </label>
        <label className="flex-1 text-[10px] font-bold text-muted-foreground">
          Пример 2
          <input
            value={second}
            onChange={(event) => { setSecond(event.target.value); setComplete(false) }}
            className="mt-1.5 min-h-11 w-full rounded-xl border border-border bg-white px-3 text-sm font-medium text-foreground outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
            placeholder="Например, услышать близкого"
          />
        </label>
      </div>
      <button
        type="button"
        disabled={!first.trim() || !second.trim()}
        onClick={() => setComplete(true)}
        className="mt-3 min-h-10 rounded-xl bg-white px-4 text-[12px] font-extrabold text-primary shadow-sm transition hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
      >
        Готово
      </button>
      {complete && <GameStatus success>Здорово! Ты нашёл два важных примера.</GameStatus>}
    </div>
  )
}

function FingerprintsActivity() {
  return <FingerprintGame />
}

function AirActivity() {
  return <AirCompositionGame />
}

function PulseActivity() {
  return (
    <SortOrderGame
      items={[
        { id: 'sleep', label: 'Сон', detail: 'Кровать и луна', icon: Moon, tone: 'bg-indigo-50 text-indigo-600' },
        { id: 'rest', label: 'Спокойный отдых', detail: 'Книга на столе', icon: BookOpen, tone: 'bg-amber-50 text-amber-700' },
        { id: 'run', label: 'Бег', detail: 'Кроссовки и движение', icon: Footprints, tone: 'bg-emerald-50 text-emerald-700' },
      ]}
      initialOrder={['run', 'sleep', 'rest']}
      correctOrder={['sleep', 'rest', 'run']}
      successText="Верно: во сне сердце обычно бьётся спокойнее, а при беге — быстрее."
      retryText="Подумай, когда мышцам требуется больше кислорода и питательных веществ."
    />
  )
}

function ColorsActivity() {
  return (
    <MatchPairsGame
      sources={[
        { id: 'red', label: 'Красный мяч', icon: Circle, tone: 'bg-red-50 text-red-600' },
        { id: 'green', label: 'Зелёный лист', icon: Leaf, tone: 'bg-emerald-50 text-emerald-700' },
        { id: 'blue', label: 'Синяя книга', icon: BookOpen, tone: 'bg-sky-50 text-sky-700' },
      ]}
      targets={[
        { id: 'red-ray', label: 'Красный свет', tone: 'border-red-400 bg-red-400' },
        { id: 'green-ray', label: 'Зелёный свет', tone: 'border-emerald-500 bg-emerald-500' },
        { id: 'blue-ray', label: 'Синий свет', tone: 'border-sky-500 bg-sky-500' },
      ]}
      correctPairs={{ red: 'red-ray', green: 'green-ray', blue: 'blue-ray' }}
      successText="Правильно: предмет преимущественно отражает свет своего цвета."
    />
  )
}

function SoundActivity() {
  return (
    <div>
      <SortOrderGame
        items={[
          { id: 'bell', label: 'Звенящий колокольчик', detail: 'Источник звука', icon: Bell, tone: 'bg-amber-50 text-amber-700' },
          { id: 'waves', label: 'Звуковые волны', detail: 'Колебания в воздухе', icon: Waves, tone: 'bg-sky-50 text-sky-700' },
          { id: 'ear', label: 'Ухо', detail: 'Принимает колебания', icon: Ear, tone: 'bg-rose-50 text-rose-700' },
          { id: 'brain', label: 'Мозг', detail: 'Помогает распознать звук', icon: Brain, tone: 'bg-violet-50 text-violet-700' },
        ]}
        initialOrder={['brain', 'bell', 'ear', 'waves']}
        correctOrder={['bell', 'waves', 'ear', 'brain']}
        successText="Верно! Звук проходит путь от источника через воздух к уху и мозгу."
        retryText="Представь путь звука: сначала он возникает, затем доходит до уха."
      />
      <ExamplesReflection />
    </div>
  )
}

function ShadowsActivity() {
  return (
    <ChoiceQuiz
      question="Что создаст самую чёткую тень между лампой и стеной?"
      options={[
        { id: 'glass', label: 'Прозрачный стакан', icon: Search, tone: 'bg-sky-50 text-sky-700' },
        { id: 'book', label: 'Плотная книга', icon: BookOpen, tone: 'bg-amber-50 text-amber-700' },
        { id: 'window', label: 'Чистое окно', icon: Sun, tone: 'bg-yellow-50 text-yellow-700' },
        { id: 'leaf', label: 'Тонкий лист', icon: Leaf, tone: 'bg-emerald-50 text-emerald-700' },
      ]}
      correctIds={['book']}
      successText="Верно! Непрозрачная книга задерживает больше света."
      retryText="Подумай, какой предмет пропускает меньше всего света."
    />
  )
}

function WaterActivity() {
  return (
    <MatchPairsGame
      sources={[
        { id: 'ice', label: 'Кубик льда', icon: Snowflake, tone: 'bg-sky-50 text-sky-700' },
        { id: 'liquid', label: 'Вода в стакане', icon: Droplet, tone: 'bg-cyan-50 text-cyan-700' },
        { id: 'vapor', label: 'Водяной пар', icon: Cloud, tone: 'bg-violet-50 text-violet-700' },
      ]}
      targets={[
        { id: 'solid', label: 'Твёрдое', detail: 'сохраняет форму', tone: 'border-sky-400 bg-sky-300' },
        { id: 'liquid', label: 'Жидкое', detail: 'принимает форму сосуда', tone: 'border-cyan-400 bg-cyan-300' },
        { id: 'gas', label: 'Газообразное', detail: 'невидимый водяной пар', tone: 'border-violet-400 bg-violet-300' },
      ]}
      correctPairs={{ ice: 'solid', liquid: 'liquid', vapor: 'gas' }}
      successText="Отлично! Это три состояния одного вещества — воды."
    />
  )
}

function MagnetsActivity() {
  return (
    <ChoiceQuiz
      question="Отметь все предметы, которые магнит притянет."
      multiple
      options={[
        { id: 'clip', label: 'Стальная скрепка', icon: Link, tone: 'bg-slate-100 text-slate-700' },
        { id: 'washer', label: 'Железная шайба', icon: Magnet, tone: 'bg-violet-50 text-violet-700' },
        { id: 'paper', label: 'Лист бумаги', icon: BookOpen, tone: 'bg-amber-50 text-amber-700' },
        { id: 'plastic', label: 'Пластиковый кубик', icon: Circle, tone: 'bg-emerald-50 text-emerald-700' },
      ]}
      correctIds={['clip', 'washer']}
      successText="Правильно! Магнит притягивает сталь и железо."
      retryText="Магнит притягивает не любые предметы. Проверь, из чего они сделаны."
    />
  )
}

function ReflectionActivity() {
  return (
    <ChoiceQuiz
      question="На каких поверхностях можно увидеть ясное отражение предметов?"
      multiple
      options={[
        { id: 'mirror', label: 'Зеркало', icon: Search, tone: 'bg-violet-50 text-violet-700' },
        { id: 'water', label: 'Спокойная вода', icon: Droplet, tone: 'bg-sky-50 text-sky-700' },
        { id: 'cloth', label: 'Мягкая ткань', icon: Hand, tone: 'bg-rose-50 text-rose-700' },
        { id: 'paper', label: 'Матовая бумага', icon: BookOpen, tone: 'bg-amber-50 text-amber-700' },
      ]}
      correctIds={['mirror', 'water']}
      successText="Верно! Гладкое зеркало и спокойная вода могут показать отражение."
      retryText="Ищи гладкие поверхности, которые отражают свет упорядоченно."
    />
  )
}

function SensesActivity() {
  return (
    <MatchPairsGame
      sources={[
        { id: 'color', label: 'Цветная картина', icon: Palette, tone: 'bg-violet-50 text-violet-700' },
        { id: 'sound', label: 'Звон колокольчика', icon: Bell, tone: 'bg-amber-50 text-amber-700' },
        { id: 'scent', label: 'Запах цветка', icon: Sparkles, tone: 'bg-rose-50 text-rose-700' },
        { id: 'touch', label: 'Шершавый камешек', icon: Hand, tone: 'bg-emerald-50 text-emerald-700' },
      ]}
      targets={[
        { id: 'eyes', label: 'Глаза', tone: 'border-violet-400 bg-violet-300' },
        { id: 'ears', label: 'Уши', tone: 'border-amber-400 bg-amber-300' },
        { id: 'nose', label: 'Нос', tone: 'border-rose-400 bg-rose-300' },
        { id: 'skin', label: 'Кожа и пальцы', tone: 'border-emerald-400 bg-emerald-300' },
      ]}
      correctPairs={{ color: 'eyes', sound: 'ears', scent: 'nose', touch: 'skin' }}
      successText="Здорово! Разные чувства помогают узнавать окружающий мир."
    />
  )
}

export function AroundYouActivityGame({ activityId }: { activityId: string }) {
  switch (activityId) {
    case 'fingerprints': return <FingerprintGame />
    case 'air': return <AirCompositionGame />
    case 'pulse': return <PulseActivity />
    case 'colors': return <ColorsActivity />
    case 'sound': return <SoundActivity />
    case 'shadows': return <ShadowsActivity />
    case 'water': return <WaterActivity />
    case 'magnets': return <MagnetsActivity />
    case 'reflection': return <ReflectionActivity />
    case 'senses': return <SensesActivity />
    default: return null
  }
}
