import type { Metadata } from 'next'
import { ReflectionTrailsScreen } from '@/components/reflection-trails-screen'

export const metadata: Metadata = {
  title: 'Выбери дорожку — УММИКИ',
  description: 'Выбери тему и отправляйся исследовать удивительный мир вокруг.',
}

export default function ReflectionTrailsPage() {
  return <ReflectionTrailsScreen />
}
