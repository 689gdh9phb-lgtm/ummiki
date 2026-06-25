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

// Questions for "Пророк Мухаммад ﷺ" (general standard topic)
const prophetMuhammadQuestions: Question[] = [
  {
    id: 1,
    question: 'В какой год родился Пророк Мухаммад ﷺ?',
    options: ['В год слона', 'В год переселения', 'В год завоевания Мекки'],
    correctAnswer: 0,
    explanation: 'Пророк ﷺ родился в год слона. Этот год получил такое название из-за известного события с войском Абрахи, которое пришло к Мекке со слоном.',
  },
  {
    id: 2,
    question: 'Какое хорошее прозвище было у Пророка Мухаммада ﷺ из-за его честности и надёжности?',
    options: ['Аль-Амин', 'Аль-Фарук', 'Ас-Сиддик'],
    correctAnswer: 0,
    explanation: 'Пророка ﷺ называли Аль-Амин — «Надёжный», «Верный». Это прозвище связано с его честностью, правдивостью и тем, что люди доверяли ему даже до начала пророчества.',
  },
  {
    id: 3,
    question: 'Кто был отцом Пророка Мухаммада ﷺ?',
    options: ['Абдаллах', 'Абу Талиб', 'Абд аль-Мутталиб'],
    correctAnswer: 0,
    explanation: 'Отцом Пророка ﷺ был Абдаллах ибн Абд аль-Мутталиб. Поэтому полное имя Пророка ﷺ начинается как Мухаммад ибн Абдаллах.',
  },
  {
    id: 4,
    question: 'Как звали мать Пророка Мухаммада ﷺ?',
    options: ['Амина', 'Хадиджа', 'Фатима'],
    correctAnswer: 0,
    explanation: 'Мать Пророка ﷺ звали Амина бинт Вахб. Она была матерью Посланника Аллаха ﷺ и заботилась о нём в раннем детстве.',
  },
  {
    id: 5,
    question: 'Кто был дедом Пророка Мухаммада ﷺ?',
    options: ['Абд аль-Мутталиб', 'Абу Бакр', 'Билял'],
    correctAnswer: 0,
    explanation: 'Дедом Пророка ﷺ был Абд аль-Мутталиб. После рождения Пророка ﷺ он проявил к нему особое внимание и радовался ему.',
  },
  {
    id: 6,
    question: 'Кто заботился о Пророке ﷺ после смерти его матери?',
    options: ['Его дед Абд аль-Мутталиб', 'Один из правителей Йемена', 'Торговцы из Сирии'],
    correctAnswer: 0,
    explanation: 'После смерти матери Пророк ﷺ оставался со своим дедом Абд аль-Мутталибом. Дед относился к нему с любовью и заботой.',
  },
  {
    id: 7,
    question: 'Кто заботился о Пророке ﷺ после смерти Абд аль-Мутталиба?',
    options: ['Его дядя Абу Талиб', 'Варака ибн Науфаль', 'Хамза'],
    correctAnswer: 0,
    explanation: 'После смерти Абд аль-Мутталиба Пророк ﷺ жил со своим дядей Абу Талибом. Забота дяди стала важной частью детства и юности Пророка ﷺ.',
  },
  {
    id: 8,
    question: 'Из какого племени был Пророк Мухаммад ﷺ?',
    options: ['Курайш', 'Аус', 'Хазрадж'],
    correctAnswer: 0,
    explanation: 'Пророк ﷺ происходил из курайшитов. Это было известное племя в Мекке.',
  },
  {
    id: 9,
    question: 'Кто была первой женой Пророка Мухаммада ﷺ?',
    options: ['Хадиджа', 'Аиша', 'Сафийя'],
    correctAnswer: 0,
    explanation: 'Первой женой Пророка ﷺ была Хадиджа бинт Хувайлид. Пока она была жива, Пророк ﷺ не женился ни на ком другом.',
  },
  {
    id: 10,
    question: 'Чем занималась Хадиджа до замужества с Пророком ﷺ?',
    options: ['Торговлей', 'Строительством домов', 'Ведением войска'],
    correctAnswer: 0,
    explanation: 'Хадиджа занималась торговлей. Она была уважаемой, благородной и состоятельной женщиной.',
  },
  {
    id: 11,
    question: 'Почему Хадиджа доверила Пророку ﷺ свою торговлю?',
    options: ['Потому что услышала о его правдивости и благородном нраве', 'Потому что он был самым богатым человеком Мекки', 'Потому что он был правителем города'],
    correctAnswer: 0,
    explanation: 'Хадиджа узнала о правдивости слов Пророка ﷺ и его благородном нраве. Поэтому она доверила ему своё торговое дело.',
  },
  {
    id: 12,
    question: 'Где Пророк ﷺ находился, когда к нему пришло первое откровение?',
    options: ['В пещере Хира', 'В доме Абу Талиба', 'На рынке Мекки'],
    correctAnswer: 0,
    explanation: 'Первое откровение пришло к Пророку ﷺ в пещере Хира. Это событие стало началом его пророческой миссии.',
  },
  {
    id: 13,
    question: 'Кто пришёл к Пророку ﷺ с откровением?',
    options: ['Джибрил', 'Один из курайшитов', 'Правитель Йемена'],
    correctAnswer: 0,
    explanation: 'К Пророку ﷺ пришёл ангел Джибрил. Через него Аллах передавал Пророку ﷺ откровение.',
  },
  {
    id: 14,
    question: 'Кто поддерживал Пророка ﷺ после начала откровения?',
    options: ['Хадиджа', 'Абу Джахль', 'Абраха'],
    correctAnswer: 0,
    explanation: 'Хадиджа уверовала в Пророка ﷺ и поддерживала его. Когда ему было тяжело из-за слов людей, она помогала ему переносить это.',
  },
  {
    id: 15,
    question: 'Что было главным в призыве Пророка ﷺ?',
    options: ['Вера в Единого Аллаха', 'Увеличение торговли', 'Сила племени'],
    correctAnswer: 0,
    explanation: 'Главным в призыве Пророка ﷺ была вера в Единого Аллаха. Он объяснял людям истину и учил их поклоняться только Аллаху.',
  },
  {
    id: 16,
    question: 'Как многие курайшиты отнеслись к призыву Пророка ﷺ?',
    options: ['Стали противиться ему', 'Сразу все приняли его призыв', 'Не обратили внимания'],
    correctAnswer: 0,
    explanation: 'Многие курайшиты не приняли призыв Пророка ﷺ и стали выступать против него. Несмотря на это, Пророк ﷺ продолжал призывать людей к Аллаху.',
  },
  {
    id: 17,
    question: 'Куда переселился Пророк ﷺ из Мекки?',
    options: ['В Медину', 'В Йемен', 'В Египет'],
    correctAnswer: 0,
    explanation: 'Пророк ﷺ переселился из Мекки в Медину. Это переселение называется хиджрой и считается одним из важнейших событий в истории ислама.',
  },
  {
    id: 18,
    question: 'Кто был рядом с Пророком ﷺ во время переселения?',
    options: ['Абу Бакр', 'Абу Джахль', 'Абраха'],
    correctAnswer: 0,
    explanation: 'Во время переселения рядом с Пророком ﷺ был Абу Бакр. Это показывает его верность и близость к Посланнику Аллаха ﷺ.',
  },
  {
    id: 19,
    question: 'Как назывались мусульмане, которые переселились ради веры?',
    options: ['Мухаджиры', 'Ансары', 'Хузаиты'],
    correctAnswer: 0,
    explanation: 'Мусульман, которые переселились ради веры, называли мухаджирами. Они оставили привычное место ради Аллаха и Его Посланника ﷺ.',
  },
  {
    id: 20,
    question: 'Как назывались жители Медины, которые помогали переселенцам?',
    options: ['Ансары', 'Курайшиты', 'Эфиопы'],
    correctAnswer: 0,
    explanation: 'Жителей Медины, которые помогали Пророку ﷺ и переселенцам, называли ансарами. Они проявили братство, щедрость и поддержку.',
  },
]

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
      { id: 'pm-prophet-muhammad', title: 'Пророк Мухаммад ﷺ', questions: prophetMuhammadQuestions },
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
