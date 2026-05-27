export interface ArabicLetter {
  id: number
  letter: string
  name: string
  nameArabic: string
  transliteration: string
  description: string
  audioUrl: string
}

export const arabicAlphabet: ArabicLetter[] = [
  { 
    id: 1, 
    letter: 'ا', 
    name: 'Алиф', 
    nameArabic: 'أَلِف',
    transliteration: 'a/i/u', 
    description: 'Протяжный гласный звук. Произносится как долгое "а". Язык расслаблен, рот открыт.',
    audioUrl: '/audio/alif.mp3' 
  },
  { 
    id: 2, 
    letter: 'ب', 
    name: 'Ба', 
    nameArabic: 'بَاء',
    transliteration: 'b', 
    description: 'Как русское "б". Губы сомкнуты, затем резко размыкаются с выдохом.',
    audioUrl: '/audio/ba.mp3' 
  },
  { 
    id: 3, 
    letter: 'ت', 
    name: 'Та', 
    nameArabic: 'تَاء',
    transliteration: 't', 
    description: 'Как русское "т". Кончик языка касается верхних зубов.',
    audioUrl: '/audio/ta.mp3' 
  },
  { 
    id: 4, 
    letter: 'ث', 
    name: 'Са', 
    nameArabic: 'ثَاء',
    transliteration: 'th', 
    description: 'Межзубный звук. Кончик языка между зубами, как английское "th" в "think".',
    audioUrl: '/audio/tha.mp3' 
  },
  { 
    id: 5, 
    letter: 'ج', 
    name: 'Джим', 
    nameArabic: 'جِيم',
    transliteration: 'j', 
    description: 'Как мягкое "дж". Середина языка касается нёба.',
    audioUrl: '/audio/jim.mp3' 
  },
  { 
    id: 6, 
    letter: 'ح', 
    name: 'Ха', 
    nameArabic: 'حَاء',
    transliteration: 'h', 
    description: 'Глубокий гортанный выдох. Как будто дышите на стекло, но глубже из горла.',
    audioUrl: '/audio/ha.mp3' 
  },
  { 
    id: 7, 
    letter: 'خ', 
    name: 'Ха', 
    nameArabic: 'خَاء',
    transliteration: 'kh', 
    description: 'Как русское "х", но более глубокое и гортанное. Похоже на украинское "г".',
    audioUrl: '/audio/kha.mp3' 
  },
  { 
    id: 8, 
    letter: 'د', 
    name: 'Даль', 
    nameArabic: 'دَال',
    transliteration: 'd', 
    description: 'Как русское "д". Кончик языка касается верхних зубов.',
    audioUrl: '/audio/dal.mp3' 
  },
  { 
    id: 9, 
    letter: 'ذ', 
    name: 'Заль', 
    nameArabic: 'ذَال',
    transliteration: 'dh', 
    description: 'Межзубный звук. Кончик языка между зубами, как английское "th" в "this".',
    audioUrl: '/audio/dhal.mp3' 
  },
  { 
    id: 10, 
    letter: 'ر', 
    name: 'Ра', 
    nameArabic: 'رَاء',
    transliteration: 'r', 
    description: 'Раскатистое "р". Кончик языка вибрирует у верхних зубов.',
    audioUrl: '/audio/ra.mp3' 
  },
  { 
    id: 11, 
    letter: 'ز', 
    name: 'Зай', 
    nameArabic: 'زَاي',
    transliteration: 'z', 
    description: 'Как русское "з". Кончик языка у нижних зубов.',
    audioUrl: '/audio/zay.mp3' 
  },
  { 
    id: 12, 
    letter: 'س', 
    name: 'Син', 
    nameArabic: 'سِين',
    transliteration: 's', 
    description: 'Как русское "с". Кончик языка у нижних зубов, воздух проходит через щель.',
    audioUrl: '/audio/sin.mp3' 
  },
  { 
    id: 13, 
    letter: 'ش', 
    name: 'Шин', 
    nameArabic: 'شِين',
    transliteration: 'sh', 
    description: 'Как русское "ш". Язык приподнят к нёбу.',
    audioUrl: '/audio/shin.mp3' 
  },
  { 
    id: 14, 
    letter: 'ص', 
    name: 'Сад', 
    nameArabic: 'صَاد',
    transliteration: 's', 
    description: 'Эмфатическое "с". Задняя часть языка приподнята, звук более глухой и твёрдый.',
    audioUrl: '/audio/sad.mp3' 
  },
  { 
    id: 15, 
    letter: 'ض', 
    name: 'Дад', 
    nameArabic: 'ضَاد',
    transliteration: 'd', 
    description: 'Эмфатическое "д". Уникальный арабский звук. Боковые края языка касаются верхних зубов.',
    audioUrl: '/audio/dad.mp3' 
  },
  { 
    id: 16, 
    letter: 'ط', 
    name: 'Та', 
    nameArabic: 'طَاء',
    transliteration: 't', 
    description: 'Эмфатическое "т". Язык прижат к нёбу, звук глухой и твёрдый.',
    audioUrl: '/audio/ta-emp.mp3' 
  },
  { 
    id: 17, 
    letter: 'ظ', 
    name: 'За', 
    nameArabic: 'ظَاء',
    transliteration: 'z', 
    description: 'Эмфатический межзубный звук. Как "заль", но с поднятым корнем языка.',
    audioUrl: '/audio/za-emp.mp3' 
  },
  { 
    id: 18, 
    letter: 'ع', 
    name: 'Айн', 
    nameArabic: 'عَين',
    transliteration: 'a', 
    description: 'Гортанный звук. Сжатие в горле с голосом. Уникален для арабского языка.',
    audioUrl: '/audio/ayn.mp3' 
  },
  { 
    id: 19, 
    letter: 'غ', 
    name: 'Гайн', 
    nameArabic: 'غَين',
    transliteration: 'gh', 
    description: 'Похоже на французское "r". Вибрация в задней части горла.',
    audioUrl: '/audio/ghayn.mp3' 
  },
  { 
    id: 20, 
    letter: 'ف', 
    name: 'Фа', 
    nameArabic: 'فَاء',
    transliteration: 'f', 
    description: 'Как русское "ф". Нижняя губа касается верхних зубов.',
    audioUrl: '/audio/fa.mp3' 
  },
  { 
    id: 21, 
    letter: 'ق', 
    name: 'Каф', 
    nameArabic: 'قَاف',
    transliteration: 'q', 
    description: 'Глубокое "к". Произносится корнем языка у мягкого нёба.',
    audioUrl: '/audio/qaf.mp3' 
  },
  { 
    id: 22, 
    letter: 'ك', 
    name: 'Кяф', 
    nameArabic: 'كَاف',
    transliteration: 'k', 
    description: 'Как русское "к". Задняя часть языка касается мягкого нёба.',
    audioUrl: '/audio/kaf.mp3' 
  },
  { 
    id: 23, 
    letter: 'ل', 
    name: 'Лям', 
    nameArabic: 'لاَم',
    transliteration: 'l', 
    description: 'Как русское "л". Кончик языка касается верхних зубов.',
    audioUrl: '/audio/lam.mp3' 
  },
  { 
    id: 24, 
    letter: 'م', 
    name: 'Мим', 
    nameArabic: 'مِيم',
    transliteration: 'm', 
    description: 'Как русское "м". Губы сомкнуты, звук через нос.',
    audioUrl: '/audio/mim.mp3' 
  },
  { 
    id: 25, 
    letter: 'ن', 
    name: 'Нун', 
    nameArabic: 'نُون',
    transliteration: 'n', 
    description: 'Как русское "н". Кончик языка касается верхних зубов, звук через нос.',
    audioUrl: '/audio/nun.mp3' 
  },
  { 
    id: 26, 
    letter: 'ه', 
    name: 'Ха', 
    nameArabic: 'هَاء',
    transliteration: 'h', 
    description: 'Лёгкий выдох, как в английском "h". Мягче чем "ح".',
    audioUrl: '/audio/ha-light.mp3' 
  },
  { 
    id: 27, 
    letter: 'و', 
    name: 'Вав', 
    nameArabic: 'وَاو',
    transliteration: 'w/u', 
    description: 'Как английское "w" или долгое "у". Губы округлены.',
    audioUrl: '/audio/waw.mp3' 
  },
  { 
    id: 28, 
    letter: 'ي', 
    name: 'Йа', 
    nameArabic: 'يَاء',
    transliteration: 'y/i', 
    description: 'Как русское "й" или долгое "и". Середина языка приподнята к нёбу.',
    audioUrl: '/audio/ya.mp3' 
  },
]
