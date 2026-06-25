import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Russian plural declension.
 * forms: [one, few, many] — e.g. ['тема', 'темы', 'тем']
 */
export function pluralizeRu(count: number, forms: [string, string, string]) {
  const n = Math.abs(count) % 100
  const n1 = n % 10
  if (n > 10 && n < 20) return forms[2]
  if (n1 > 1 && n1 < 5) return forms[1]
  if (n1 === 1) return forms[0]
  return forms[2]
}

export function topicsLabel(count: number) {
  return `${count} ${pluralizeRu(count, ['тема', 'темы', 'тем'])}`
}

export function questionsLabel(count: number) {
  return `${count} ${pluralizeRu(count, ['вопрос', 'вопроса', 'вопросов'])}`
}
