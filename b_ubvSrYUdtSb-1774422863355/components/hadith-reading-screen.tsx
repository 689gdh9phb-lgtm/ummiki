'use client';

import { useState } from 'react';
import { useGame } from '@/lib/game-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HadithReading {
  id: string;
  title: string;
  image: string;
  arabicText?: string;
  text: string;
  source: string;
  explanation: string;
}

// Достоверные хадисы из Сахих аль-Бухари и Сахих Муслим
const hadithReadings: HadithReading[] = [
  {
    id: 'intention',
    title: 'О намерении',
    image: '/hadith-intention.jpg',
    arabicText: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
    text: 'Поистине, дела оцениваются только по намерениям, и каждому человеку достанется лишь то, что он намеревался обрести.',
    source: 'Сахих аль-Бухари, хадис 1',
    explanation: 'Этот хадис учит нас, что каждое наше действие имеет значение перед Аллахом в зависимости от того, с каким намерением мы его совершаем. Если мы делаем что-то доброе ради Аллаха, мы получим награду. Но если делаем это ради похвалы людей, награды не будет. Поэтому перед каждым делом важно проверить своё сердце: ради кого я это делаю? Например, когда помогаешь маме по дому, делай это с мыслью о том, что Аллах любит тех, кто почитает родителей.',
  },
  {
    id: 'smile',
    title: 'Улыбка — это садака',
    image: '/hadith-smile.jpg',
    arabicText: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ',
    text: 'Твоя улыбка брату твоему — это садака (милостыня).',
    source: 'Сунан ат-Тирмизи, хадис 1956',
    explanation: 'Пророк Мухаммад (мир ему и благословение) научил нас, что добро не обязательно требует денег. Даже простая искренняя улыбка другому человеку — это благое дело, за которое Аллах даёт награду. Когда ты улыбаешься друзьям, родителям или даже незнакомым людям, ты делаешь мир добрее. Улыбка может поднять настроение тому, кому грустно, и показать, что ты рад его видеть. Это так просто, но так важно!',
  },
  {
    id: 'paradise',
    title: 'Рай под ногами матерей',
    image: '/hadith-paradise.jpg',
    arabicText: 'الْجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ',
    text: 'Рай находится под ногами матерей.',
    source: 'Сунан ан-Насаи, хадис 3104',
    explanation: 'Этот хадис показывает, как высоко Ислам ставит уважение к матери. Путь в Рай лежит через послушание и доброту к маме. Мама заботилась о тебе, когда ты был маленьким, не спала ночами, кормила и оберегала. Аллах повелел нам быть добрыми к родителям, а особенно к матери. Когда ты слушаешься маму, помогаешь ей и говоришь ей добрые слова, ты приближаешься к Раю. Даже простое «спасибо, мама» — это великое дело.',
  },
];

export function HadithReadingScreen() {
  const { setScreen } = useGame();
  const [selectedHadith, setSelectedHadith] = useState<HadithReading | null>(null);

  if (selectedHadith) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-lavender/30 via-background to-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-lavender/50 to-transparent backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedHadith(null)}
              className="rounded-full bg-card/80 shadow-md hover:bg-card"
            >
              <ArrowLeft className="h-5 w-5 text-deep-purple" />
            </Button>
            <div className="flex items-center gap-1">
              <Quote className="h-4 w-4 text-deep-purple" />
              <span className="text-sm font-medium text-foreground/70">Хадис</span>
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
                src={selectedHadith.image}
                alt={selectedHadith.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/30 to-transparent" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-center text-2xl font-bold text-deep-purple text-balance"
          >
            {selectedHadith.title}
          </motion.h1>

          {/* Arabic Text */}
          {selectedHadith.arabicText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 rounded-2xl bg-gradient-to-r from-deep-purple/10 to-soft-purple/10 p-6 text-center border border-lavender/30"
            >
              <p className="text-2xl font-arabic leading-loose text-deep-purple" dir="rtl">
                {selectedHadith.arabicText}
              </p>
            </motion.div>
          )}

          {/* Hadith Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4 rounded-2xl bg-card p-6 shadow-lg border border-border/50"
          >
            <div className="flex items-start gap-3 mb-4">
              <Quote className="h-6 w-6 text-soft-purple flex-shrink-0 mt-1" />
              <p className="text-lg leading-relaxed text-foreground font-medium">
                {selectedHadith.text}
              </p>
            </div>
            <p className="text-sm text-muted-foreground text-right">
              {selectedHadith.source}
            </p>
          </motion.div>

          {/* Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-soft-purple" />
              Что это значит?
            </h2>
            <p className="text-base leading-relaxed text-foreground/90">
              {selectedHadith.explanation}
            </p>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center"
          >
            <Button
              onClick={() => setSelectedHadith(null)}
              className="rounded-full bg-deep-purple px-8 py-6 text-lg font-semibold text-primary-foreground shadow-lg hover:bg-deep-purple/90"
            >
              К списку хадисов
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Hadith List View
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
          <h1 className="text-3xl font-bold text-deep-purple">Хадисы для чтения</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Hadith Cards */}
      <div className="px-4 pb-8">
        <p className="mb-6 text-center text-foreground/70">
          Мудрость Пророка (мир ему) для детей
        </p>
        
        <div className="space-y-4">
          {hadithReadings.map((hadith, index) => (
            <motion.div
              key={hadith.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => setSelectedHadith(hadith)}
                className="w-full overflow-hidden rounded-2xl bg-card shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="relative aspect-[2/1] w-full">
                  <Image
                    src={hadith.image}
                    alt={hadith.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-left text-xl font-bold text-white">
                      {hadith.title}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <Quote className="h-4 w-4 text-soft-purple" />
                    <span className="text-sm text-foreground/70">{hadith.source}</span>
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
