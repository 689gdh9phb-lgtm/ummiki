export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface QuizTopic {
  id: string
  title: string
  questions: Question[]
}

export interface QuizSection {
  id: string
  title: string
  emoji: string
  description: string
  topics: QuizTopic[]
}

// Helper to create empty question placeholders
function emptyQuestions(count: number): Question[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
  }))
}

export const quizSections: QuizSection[] = [
  {
    id: 'quran',
    title: 'Коран',
    emoji: '📖',
    description: 'Священная книга мусульман',
    topics: [
      { id: 'quran-numbers', title: 'Коран в цифрах', questions: emptyQuestions(10) },
      { id: 'quran-which-surah', title: 'Какая это сура Корана?', questions: emptyQuestions(10) },
      { id: 'quran-continue-ayah', title: 'Продолжи аят из Корана', questions: emptyQuestions(10) },
      { id: 'quran-revelation', title: 'Ниспослание Корана', questions: emptyQuestions(10) },
      { id: 'quran-angels', title: 'Ангелы в Коране', questions: emptyQuestions(10) },
      { id: 'quran-jinn', title: 'Джинны в Коране', questions: emptyQuestions(10) },
      { id: 'quran-animals', title: 'Животные и насекомые, упомянутые в Коране', questions: emptyQuestions(10) },
    ],
  },
  {
    id: 'aqidah',
    title: 'Основы веры (Акыда)',
    emoji: '🕌',
    description: 'Фундамент исламского вероубеждения',
    topics: [
      { id: 'aqidah-iman-islam-ihsan', title: 'Иман, Ислам и Ихсан', questions: emptyQuestions(10) },
      { id: 'aqidah-paradise', title: 'Рай', questions: emptyQuestions(10) },
      { id: 'aqidah-hell', title: 'Ад', questions: emptyQuestions(10) },
      { id: 'aqidah-judgment-day', title: 'Судный день и его признаки', questions: emptyQuestions(10) },
    ],
  },
  {
    id: 'prophets',
    title: 'Пророки',
    emoji: '👤',
    description: 'Посланники Аллаха',
    topics: [
      { id: 'prophets-scriptures', title: 'Пророки и Писания', questions: emptyQuestions(10) },
      { id: 'prophets-given-to', title: 'Какому пророку это было дано?', questions: emptyQuestions(10) },
      { id: 'prophets-by-description', title: 'Узнай пророка по описанию', questions: emptyQuestions(10) },
      { id: 'prophets-crafts', title: 'Ремёсла и профессии пророков', questions: emptyQuestions(10) },
    ],
  },
  {
    id: 'prophet-muhammad',
    title: 'Пророк Мухаммад ﷺ и его окружение',
    emoji: '☪️',
    description: 'Жизнь Пророка ﷺ и его сподвижников',
    topics: [
      { id: 'pm-prophet-muhammad', title: 'Пророк Мухаммад ﷺ', questions: emptyQuestions(10) },
      { id: 'pm-childhood', title: 'Детство Пророка ﷺ', questions: emptyQuestions(10) },
      { id: 'pm-mothers-of-believers', title: 'Матери правоверных', questions: emptyQuestions(10) },
      { id: 'pm-ten-companions', title: 'Десять сподвижников, обрадованных Раем', questions: emptyQuestions(10) },
      { id: 'pm-who-said', title: 'Кто это сказал?', questions: emptyQuestions(10) },
    ],
  },
  {
    id: 'prayer',
    title: 'Намаз и поклонение',
    emoji: '🤲',
    description: 'Молитва и виды поклонения',
    topics: [
      { id: 'prayer-namaz', title: 'Намаз', questions: emptyQuestions(10) },
      { id: 'prayer-what-breaks', title: 'Что нарушает намаз?', questions: emptyQuestions(10) },
      { id: 'prayer-mosque-adab', title: 'Адабы в мечети', questions: emptyQuestions(10) },
      { id: 'prayer-azkar-dua', title: 'Азкары и дуа', questions: emptyQuestions(10) },
    ],
  },
  {
    id: 'adab',
    title: 'Адабы и исламская этика',
    emoji: '🌙',
    description: 'Нравственность и хорошие манеры',
    topics: [
      { id: 'adab-friendship', title: 'Адабы дружбы', questions: emptyQuestions(10) },
      { id: 'adab-learning', title: 'Адабы обучения', questions: emptyQuestions(10) },
      { id: 'adab-parents', title: 'Адабы по отношению к родителям', questions: emptyQuestions(10) },
    ],
  },
  {
    id: 'marathons',
    title: 'Марафоны',
    emoji: '🏆',
    description: 'Большие испытания на знания',
    topics: [
      { id: 'marathon-50', title: 'Марафон «50 вопросов»', questions: emptyQuestions(50) },
      { id: 'marathon-100', title: 'Марафон «100 вопросов»', questions: emptyQuestions(100) },
    ],
  },
]

// Helper functions for lookups
export function getSection(sectionId: string): QuizSection | undefined {
  return quizSections.find((s) => s.id === sectionId)
}

export function getTopic(sectionId: string, topicId: string): QuizTopic | undefined {
  return getSection(sectionId)?.topics.find((t) => t.id === topicId)
}
