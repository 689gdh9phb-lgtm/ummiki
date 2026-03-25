'use client';

import { useState } from 'react';
import { useGame } from '@/lib/game-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Story {
  id: string;
  title: string;
  image: string;
  paragraphs: string[];
}

const stories: Story[] = [
  {
    id: 'intention',
    title: 'Сила намерения',
    image: '/story-quran.jpg',
    paragraphs: [
      'Однажды мальчик по имени Ахмад спросил своего дедушку: «Почему так важно делать дуа перед едой, перед сном, перед каждым делом?»',
      'Дедушка улыбнулся и открыл Коран. «Потому что, внучек, каждое наше действие начинается с намерения. Когда мы говорим "Бисмиллях", мы напоминаем себе, что делаем это ради Аллаха».',
      'Ахмад задумался. Он вспомнил, как утром просто поел завтрак, не подумав о благодарности. А ведь еда — это дар от Аллаха.',
      'С того дня Ахмад стал внимательнее. Перед каждым делом он останавливался и говорил: «Я делаю это с именем Аллаха». И простые дела стали наполняться смыслом.',
      'Дедушка был прав — намерение превращает обычное в особенное. Даже стакан воды, выпитый с благодарностью, становится поклонением.',
    ],
  },
  {
    id: 'ramadan',
    title: 'Первый Рамадан Амины',
    image: '/story-lantern.jpg',
    paragraphs: [
      'Амине исполнилось семь лет, и она очень хотела поститься в Рамадан, как взрослые. Мама сказала: «Попробуй сначала до обеда, доченька».',
      'Утром было легко. Амина играла, читала книжки. Но когда солнце поднялось высоко, она почувствовала голод. Ей очень хотелось пить.',
      'Она подошла к маме: «Мама, это так трудно!» Мама обняла её: «Знаешь, Амина, когда тебе трудно, вспомни о тех, кому ещё труднее. О тех, у кого нет еды каждый день».',
      'Амина задумалась. Она поняла, что пост учит терпению и благодарности. К вечеру, когда прозвучал азан, она была так счастлива!',
      'За столом ифтара Амина попробовала финик и улыбнулась. Это был самый вкусный финик в её жизни. Она поняла — терпение делает награду ещё слаще.',
    ],
  },
  {
    id: 'gratitude',
    title: 'Сад благодарности',
    image: '/story-nature.jpg',
    paragraphs: [
      'В маленьком городе жил мальчик Юсуф. Каждый день он проходил мимо красивого сада, но никогда не замечал его красоты — он всегда спешил.',
      'Однажды старый садовник позвал его: «Юсуф, остановись на минутку. Посмотри на эту розу. Знаешь, сколько времени нужно, чтобы она расцвела?»',
      'Юсуф пожал плечами. Садовник улыбнулся: «Месяцы заботы, воды, солнца. Аллах создал такую красоту для нас. А мы часто проходим мимо, не сказав "Субханаллах"».',
      'С того дня Юсуф стал замечать чудеса вокруг. Пение птиц по утрам, тёплый ветерок, улыбку мамы. Каждый день он находил что-то, за что говорил: «Альхамдулиллях».',
      'Его сердце наполнилось радостью. Он понял — благодарность открывает глаза на красоту, которая всегда была рядом.',
    ],
  },
];

export function StoryScreen() {
  const { setScreen } = useGame();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  if (selectedStory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-lavender/30 via-background to-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-lavender/50 to-transparent backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedStory(null)}
              className="rounded-full bg-card/80 shadow-md hover:bg-card"
            >
              <ArrowLeft className="h-5 w-5 text-deep-purple" />
            </Button>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-deep-purple" />
              <span className="text-sm font-medium text-foreground/70">История</span>
            </div>
            <div className="w-10" />
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-8">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-6"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={selectedStory.image}
                alt={selectedStory.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/20 to-transparent" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-center text-2xl font-bold text-deep-purple text-balance"
          >
            {selectedStory.title}
          </motion.h1>

          {/* Story Text */}
          <div className="space-y-6">
            {selectedStory.paragraphs.map((paragraph, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <p className="text-lg leading-relaxed text-foreground/90">
                  {paragraph}
                </p>
                
                {index < selectedStory.paragraphs.length - 1 && (
                  <div className="flex justify-center pt-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      <Star className="h-4 w-4 text-soft-purple/50 fill-soft-purple/30" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 flex justify-center"
          >
            <Button
              onClick={() => setSelectedStory(null)}
              className="rounded-full bg-deep-purple px-8 py-6 text-lg font-semibold text-primary-foreground shadow-lg hover:bg-deep-purple/90"
            >
              К списку историй
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Story List View
  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender/30 via-background to-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-lavender/50 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScreen('menu')}
            className="rounded-full bg-card/80 shadow-md hover:bg-card"
          >
            <ArrowLeft className="h-5 w-5 text-deep-purple" />
          </Button>
          <h1 className="text-4xl font-bold text-deep-purple">Истории</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Story Cards */}
      <div className="px-4 pb-8">
        <p className="mb-6 text-center text-foreground/70">
          Выберите историю для чтения
        </p>
        
        <div className="space-y-4">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => setSelectedStory(story)}
                className="w-full overflow-hidden rounded-2xl bg-card shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="relative aspect-[2/1] w-full">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-left text-xl font-bold text-white">
                      {story.title}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-soft-purple" />
                    <span className="text-sm text-foreground/70">5 минут чтения</span>
                  </div>
                  <span className="text-sm font-medium text-deep-purple">Читать</span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
