export interface ArabicLetter {
  id: number
  letter: string
  name: string
  transliteration: string
  audioUrl: string
}

export const arabicAlphabet: ArabicLetter[] = [
  { id: 1, letter: 'ا', name: 'Алиф', transliteration: 'a', audioUrl: '/audio/alif.mp3' },
  { id: 2, letter: 'ب', name: 'Ба', transliteration: 'b', audioUrl: '/audio/ba.mp3' },
  { id: 3, letter: 'ت', name: 'Та', transliteration: 't', audioUrl: '/audio/ta.mp3' },
  { id: 4, letter: 'ث', name: 'Са', transliteration: 'th', audioUrl: '/audio/tha.mp3' },
  { id: 5, letter: 'ج', name: 'Джим', transliteration: 'j', audioUrl: '/audio/jim.mp3' },
  { id: 6, letter: 'ح', name: 'Ха', transliteration: 'ḥ', audioUrl: '/audio/ha.mp3' },
  { id: 7, letter: 'خ', name: 'Ха', transliteration: 'kh', audioUrl: '/audio/kha.mp3' },
  { id: 8, letter: 'د', name: 'Даль', transliteration: 'd', audioUrl: '/audio/dal.mp3' },
  { id: 9, letter: 'ذ', name: 'Заль', transliteration: 'dh', audioUrl: '/audio/dhal.mp3' },
  { id: 10, letter: 'ر', name: 'Ра', transliteration: 'r', audioUrl: '/audio/ra.mp3' },
  { id: 11, letter: 'ز', name: 'Зай', transliteration: 'z', audioUrl: '/audio/zay.mp3' },
  { id: 12, letter: 'س', name: 'Син', transliteration: 's', audioUrl: '/audio/sin.mp3' },
  { id: 13, letter: 'ش', name: 'Шин', transliteration: 'sh', audioUrl: '/audio/shin.mp3' },
  { id: 14, letter: 'ص', name: 'Сад', transliteration: 'ṣ', audioUrl: '/audio/sad.mp3' },
  { id: 15, letter: 'ض', name: 'Дад', transliteration: 'ḍ', audioUrl: '/audio/dad.mp3' },
  { id: 16, letter: 'ط', name: 'Та', transliteration: 'ṭ', audioUrl: '/audio/ta-emp.mp3' },
  { id: 17, letter: 'ظ', name: 'За', transliteration: 'ẓ', audioUrl: '/audio/za-emp.mp3' },
  { id: 18, letter: 'ع', name: 'Айн', transliteration: 'ʿ', audioUrl: '/audio/ayn.mp3' },
  { id: 19, letter: 'غ', name: 'Гайн', transliteration: 'gh', audioUrl: '/audio/ghayn.mp3' },
  { id: 20, letter: 'ف', name: 'Фа', transliteration: 'f', audioUrl: '/audio/fa.mp3' },
  { id: 21, letter: 'ق', name: 'Каф', transliteration: 'q', audioUrl: '/audio/qaf.mp3' },
  { id: 22, letter: 'ك', name: 'Кяф', transliteration: 'k', audioUrl: '/audio/kaf.mp3' },
  { id: 23, letter: 'ل', name: 'Лям', transliteration: 'l', audioUrl: '/audio/lam.mp3' },
  { id: 24, letter: 'م', name: 'Мим', transliteration: 'm', audioUrl: '/audio/mim.mp3' },
  { id: 25, letter: 'ن', name: 'Нун', transliteration: 'n', audioUrl: '/audio/nun.mp3' },
  { id: 26, letter: 'ه', name: 'Ха', transliteration: 'h', audioUrl: '/audio/ha-light.mp3' },
  { id: 27, letter: 'و', name: 'Вав', transliteration: 'w', audioUrl: '/audio/waw.mp3' },
  { id: 28, letter: 'ي', name: 'Йа', transliteration: 'y', audioUrl: '/audio/ya.mp3' },
]
