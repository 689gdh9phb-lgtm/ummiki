export interface ReflectionTrail {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
}

export const reflectionTrails: ReflectionTrail[] = [
  {
    id: 'around-you',
    title: 'Вокруг тебя',
    subtitle: 'Я и мир',
    description: 'Оглянись! Даже не вставая со стула, ты можешь сделать множество интересных открытий.',
    image: '/images/reflection/around-you.png',
  },
  {
    id: 'body',
    title: 'Тело человека',
    subtitle: 'Как мы устроены?',
    description: 'Узнай, как работает твоё тело и какие сложные процессы происходят в нём каждую секунду.',
    image: '/images/reflection/body.png',
  },
  {
    id: 'forests',
    title: 'Леса',
    subtitle: 'Мир природы',
    description: 'Отправляйся в лес и познакомься с необычными особенностями растений и деревьев.',
    image: '/images/reflection/forests.png',
  },
  {
    id: 'seas',
    title: 'Моря',
    subtitle: 'Подводные тайны',
    description: 'Погрузись в морские глубины и разгадай загадки подводного мира.',
    image: '/images/reflection/seas.png',
  },
  {
    id: 'mountains',
    title: 'Горы',
    subtitle: 'Великаны Земли',
    description: 'Открой для себя могучие горы и узнай, как они появились.',
    image: '/images/reflection/mountains.png',
  },
  {
    id: 'underground',
    title: 'Под землёй',
    subtitle: 'Что у нас под ногами?',
    description: 'Загляни под поверхность Земли: какие открытия ждут тебя в её недрах?',
    image: '/images/reflection/underground.png',
  },
  {
    id: 'flight',
    title: 'Полёт',
    subtitle: 'Как это возможно?',
    description: 'Разберись, почему одни предметы падают, а другие способны парить в воздухе.',
    image: '/images/reflection/flight.png',
  },
]
