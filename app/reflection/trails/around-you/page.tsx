import type { Metadata } from 'next'
import { ReflectionAroundYouScreen } from '@/components/reflection-around-you-screen'

export const metadata: Metadata = {
  title: 'Вокруг тебя — Я и мир — УММИКИ',
  description: 'Десять открытых заданий о теле, воздухе, свете, звуке и мире вокруг нас.',
}

export default function AroundYouPage() {
  return <ReflectionAroundYouScreen />
}
