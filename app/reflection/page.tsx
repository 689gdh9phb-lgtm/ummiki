import type { Metadata } from 'next'
import { ReflectionIntroScreen } from '@/components/reflection-intro-screen'

export const metadata: Metadata = {
  title: 'Дорожки размышления — УММИКИ',
  description: 'Познакомься с дорожками размышления и отправляйся в путешествие по удивительным творениям.',
}

export default function ReflectionPage() {
  return <ReflectionIntroScreen />
}
