export interface ArabicLetter {
  id: number
  letter: string
  name: string
  nameArabic: string
  transliteration: string
  description: string
  makhraj: string // место выхода звука
  audioUrl: string
}

export const arabicAlphabet: ArabicLetter[] = [
  { 
    id: 1, 
    letter: 'ا', 
    name: 'Алиф', 
    nameArabic: 'أَلِف',
    transliteration: 'а / и / у', 
    description: 'Протяжный гласный звук. Произносится как долгое "а". Язык расслаблен, рот открыт.',
    makhraj: 'Пустота рта (джауф)',
    audioUrl: '/audio/alif.mp3' 
  },
  { 
    id: 2, 
    letter: 'ب', 
    name: 'Ба', 
    nameArabic: 'بَاء',
    transliteration: 'б', 
    description: 'Как русское "б". Губы сомкнуты, затем резко размыкаются с выдохом.',
    makhraj: 'Обе губы (шафатан)',
    audioUrl: '/audio/ba.mp3' 
  },
  { 
    id: 3, 
    letter: 'ت', 
    name: 'Та', 
    nameArabic: 'تَاء',
    transliteration: 'т', 
    description: 'Как русское "т". Кончик языка касается основания верхних зубов.',
    makhraj: 'Кончик языка + верхние зубы',
    audioUrl: '/audio/ta.mp3' 
  },
  { 
    id: 4, 
    letter: 'ث', 
    name: 'Са', 
    nameArabic: 'ثَاء',
    transliteration: 'с (межзубн.)', 
    description: 'Межзубный звук. Кончик языка между зубами, как английское "th" в "think".',
    makhraj: 'Кончик языка между зубами',
    audioUrl: '/audio/tha.mp3' 
  },
  { 
    id: 5, 
    letter: 'ج', 
    name: 'Джим', 
    nameArabic: 'جِيم',
    transliteration: 'дж', 
    description: 'Как мягкое "дж". Середина языка касается середины нёба.',
    makhraj: 'Середина языка + нёбо',
    audioUrl: '/audio/jim.mp3' 
  },
  { 
    id: 6, 
    letter: 'ح', 
    name: 'Ха', 
    nameArabic: 'حَاء',
    transliteration: 'х (гортанн.)', 
    description: 'Глубокий гортанный выдох. Как будто дышите на стекло, но глубже из середины горла.',
    makhraj: 'Середина горла (хальк)',
    audioUrl: '/audio/ha.mp3' 
  },
  { 
    id: 7, 
    letter: 'خ', 
    name: 'Ха', 
    nameArabic: 'خَاء',
    transliteration: 'х (глубок.)', 
    description: 'Как русское "х", но более глубокое. Произносится ближе к корню языка.',
    makhraj: 'Ближайшая часть горла к языку',
    audioUrl: '/audio/kha.mp3' 
  },
  { 
    id: 8, 
    letter: 'د', 
    name: 'Даль', 
    nameArabic: 'دَال',
    transliteration: 'д', 
    description: 'Как русское "д". Кончик языка касается основания верхних зубов.',
    makhraj: 'Кончик языка + верхние зубы',
    audioUrl: '/audio/dal.mp3' 
  },
  { 
    id: 9, 
    letter: 'ذ', 
    name: 'Заль', 
    nameArabic: 'ذَال',
    transliteration: 'з (межзубн.)', 
    description: 'Межзубный звонкий звук. Кончик языка между зубами, как английское "th" в "this".',
    makhraj: 'Кончик языка между зубами',
    audioUrl: '/audio/dhal.mp3' 
  },
  { 
    id: 10, 
    letter: 'ر', 
    name: 'Ра', 
    nameArabic: 'رَاء',
    transliteration: 'р', 
    description: 'Раскатистое "р". Кончик языка вибрирует у верхних зубов (один удар).',
    makhraj: 'Кончик языка + альвеолы',
    audioUrl: '/audio/ra.mp3' 
  },
  { 
    id: 11, 
    letter: 'ز', 
    name: 'Зай', 
    nameArabic: 'زَاي',
    transliteration: 'з', 
    description: 'Как русское "з". Кончик языка у нижних зубов, воздух проходит через щель.',
    makhraj: 'Кончик языка + нижние зубы',
    audioUrl: '/audio/zay.mp3' 
  },
  { 
    id: 12, 
    letter: 'س', 
    name: 'Син', 
    nameArabic: 'سِين',
    transliteration: 'с', 
    description: 'Как русское "с". Кончик языка у нижних зубов, воздух выходит свистящим звуком.',
    makhraj: 'Кончик языка + нижние зубы',
    audioUrl: '/audio/sin.mp3' 
  },
  { 
    id: 13, 
    letter: 'ش', 
    name: 'Шин', 
    nameArabic: 'شِين',
    transliteration: 'ш', 
    description: 'Как русское "ш". Середина языка приподнята к нёбу, губы слегка округлены.',
    makhraj: 'Середина языка + нёбо',
    audioUrl: '/audio/shin.mp3' 
  },
  { 
    id: 14, 
    letter: 'ص', 
    name: 'Сад', 
    nameArabic: 'صَاد',
    transliteration: 'с (эмфат.)', 
    description: 'Эмфатическое "с". Задняя часть языка приподнята, звук более глухой и твёрдый.',
    makhraj: 'Как "с" + корень языка к нёбу',
    audioUrl: '/audio/sad.mp3' 
  },
  { 
    id: 15, 
    letter: 'ض', 
    name: 'Дад', 
    nameArabic: 'ضَاد',
    transliteration: 'д (эмфат.)', 
    description: 'Уникальный арабский звук! Боковые края языка касаются верхних коренных зубов.',
    makhraj: 'Боковые края языка + коренные зубы',
    audioUrl: '/audio/dad.mp3' 
  },
  { 
    id: 16, 
    letter: 'ط', 
    name: 'Та', 
    nameArabic: 'طَاء',
    transliteration: 'т (эмфат.)', 
    description: 'Эмфатическое "т". Язык прижат к нёбу, звук глухой и твёрдый.',
    makhraj: 'Как "т" + корень языка к нёбу',
    audioUrl: '/audio/ta-emp.mp3' 
  },
  { 
    id: 17, 
    letter: 'ظ', 
    name: 'За', 
    nameArabic: 'ظَاء',
    transliteration: 'з (эмфат.)', 
    description: 'Эмфатический межзубный звук. Как "заль", но с поднятым корнем языка.',
    makhraj: 'Межзубный + корень языка к нёбу',
    audioUrl: '/audio/za-emp.mp3' 
  },
  { 
    id: 18, 
    letter: 'ع', 
    name: 'Айн', 
    nameArabic: 'عَين',
    transliteration: 'ъ (гортанн.)', 
    description: 'Гортанный звук. Сжатие в середине горла с голосом. Уникален для арабского языка.',
    makhraj: 'Середина горла (хальк)',
    audioUrl: '/audio/ayn.mp3' 
  },
  { 
    id: 19, 
    letter: 'غ', 
    name: 'Гайн', 
    nameArabic: 'غَين',
    transliteration: 'г (гортанн.)', 
    description: 'Похоже на французское "r". Вибрация в задней части горла, ближе к языку.',
    makhraj: 'Ближайшая часть горла к языку',
    audioUrl: '/audio/ghayn.mp3' 
  },
  { 
    id: 20, 
    letter: 'ف', 
    name: 'Фа', 
    nameArabic: 'فَاء',
    transliteration: 'ф', 
    description: 'Как русское "ф". Нижняя губа касается края верхних зубов.',
    makhraj: 'Нижняя губа + верхние зубы',
    audioUrl: '/audio/fa.mp3' 
  },
  { 
    id: 21, 
    letter: 'ق', 
    name: 'Каф', 
    nameArabic: 'قَاف',
    transliteration: 'к (глубок.)', 
    description: 'Глубокое "к". Произносится корнем языка у самого мягкого нёба (увулы).',
    makhraj: 'Корень языка + увула',
    audioUrl: '/audio/qaf.mp3' 
  },
  { 
    id: 22, 
    letter: 'ك', 
    name: 'Кяф', 
    nameArabic: 'كَاف',
    transliteration: 'к', 
    description: 'Как русское "к". Задняя часть языка касается мягкого нёба.',
    makhraj: 'Задняя часть языка + мягкое нёбо',
    audioUrl: '/audio/kaf.mp3' 
  },
  { 
    id: 23, 
    letter: 'ل', 
    name: 'Лям', 
    nameArabic: 'لاَم',
    transliteration: 'л', 
    description: 'Как русское "л". Кончик языка касается основания верхних зубов.',
    makhraj: 'Кончик языка + верхние зубы',
    audioUrl: '/audio/lam.mp3' 
  },
  { 
    id: 24, 
    letter: 'م', 
    name: 'Мим', 
    nameArabic: 'مِيم',
    transliteration: 'м', 
    description: 'Как русское "м". Губы сомкнуты, звук проходит через нос.',
    makhraj: 'Обе губы (шафатан)',
    audioUrl: '/audio/mim.mp3' 
  },
  { 
    id: 25, 
    letter: 'ن', 
    name: 'Нун', 
    nameArabic: 'نُون',
    transliteration: 'н', 
    description: 'Как русское "н". Кончик языка касается верхних зубов, звук проходит через нос.',
    makhraj: 'Кончик языка + нос',
    audioUrl: '/audio/nun.mp3' 
  },
  { 
    id: 26, 
    letter: 'ه', 
    name: 'Ха', 
    nameArabic: 'هَاء',
    transliteration: 'х (лёгк.)', 
    description: 'Лёгкий выдох из самой глубины горла. Мягче и глубже чем "ح".',
    makhraj: 'Самая глубокая часть горла',
    audioUrl: '/audio/ha-light.mp3' 
  },
  { 
    id: 27, 
    letter: 'و', 
    name: 'Вав', 
    nameArabic: 'وَاو',
    transliteration: 'в / у', 
    description: 'Как английское "w" или долгое "у". Губы округлены и вытянуты вперёд.',
    makhraj: 'Губы (округлённые)',
    audioUrl: '/audio/waw.mp3' 
  },
  { 
    id: 28, 
    letter: 'ي', 
    name: 'Йа', 
    nameArabic: 'يَاء',
    transliteration: 'й / и', 
    description: 'Как русское "й" или долгое "и". Середина языка приподнята к нёбу.',
    makhraj: 'Середина языка + нёбо',
    audioUrl: '/audio/ya.mp3' 
  },
]

export const learningTips = [
  {
    icon: '👂',
    title: 'Сначала слушай',
    description: 'Внимательно слушай произношение, потом повторяй за диктором.'
  },
  {
    icon: '🐢',
    title: 'Не торопись',
    description: 'Произноси буквы медленно и чётко, следи за положением языка.'
  },
  {
    icon: '🔗',
    title: 'По одной букве',
    description: 'Не торопись соединять буквы, сначала выучи каждую отдельно.'
  },
  {
    icon: '🎯',
    title: 'Горловые буквы',
    description: 'Особое внимание уделяй буквам ح خ ع غ — они уникальны для арабского.'
  },
  {
    icon: '🔄',
    title: 'Повторяй',
    description: 'Повторяй каждую букву несколько раз, пока не запомнишь.'
  }
]
