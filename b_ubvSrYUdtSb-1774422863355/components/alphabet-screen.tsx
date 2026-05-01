'use client';

import { useGame } from '@/lib/game-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface ArabicLetter {
  number: number;
  name: string;
  letter: string;
  pronunciation: string;
  description: string;
}

const arabicAlphabet: ArabicLetter[] = [
  { number: 1, name: 'Алиф', letter: 'ا', pronunciation: 'A', description: 'Первая буква, похожа на букву "А"' },
  { number: 2, name: 'Ба', letter: 'ب', pronunciation: 'B', description: 'Похожа на букву "Б"' },
  { number: 3, name: 'Та', letter: 'ت', pronunciation: 'T', description: 'Похожа на букву "Т"' },
  { number: 4, name: 'Са', letter: 'ث', pronunciation: 'Th', description: 'Мягкий звук "Т"' },
  { number: 5, name: 'Джим', letter: 'ج', pronunciation: 'J', description: 'Похожа на букву "Дж"' },
  { number: 6, name: 'Ха', letter: 'ح', pronunciation: 'H', description: 'Глубокий звук "Х"' },
  { number: 7, name: 'Ха гортанная', letter: 'خ', pronunciation: 'Kh', description: 'Мягкий звук "Х"' },
  { number: 8, name: 'Даль', letter: 'د', pronunciation: 'D', description: 'Похожа на букву "Д"' },
  { number: 9, name: 'Даль мягкий', letter: 'ذ', pronunciation: 'Dh', description: 'Мягкий звук "Д"' },
  { number: 10, name: 'Ра', letter: 'ر', pronunciation: 'R', description: 'Похожа на букву "Р"' },
  { number: 11, name: 'Заин', letter: 'ز', pronunciation: 'Z', description: 'Похожа на букву "З"' },
  { number: 12, name: 'Син', letter: 'س', pronunciation: 'S', description: 'Похожа на букву "С"' },
  { number: 13, name: 'Шин', letter: 'ش', pronunciation: 'Sh', description: 'Похожа на букву "Ш"' },
  { number: 14, name: 'Сад', letter: 'ص', pronunciation: 'S', description: 'Глубокий звук "С"' },
  { number: 15, name: 'Дад', letter: 'ض', pronunciation: 'D', description: 'Глубокий звук "Д"' },
  { number: 16, name: 'Та глубокий', letter: 'ط', pronunciation: 'T', description: 'Глубокий звук "Т"' },
  { number: 17, name: 'За глубокий', letter: 'ظ', pronunciation: 'Z', description: 'Глубокий звук "З"' },
  { number: 18, name: 'Айн', letter: 'ع', pronunciation: 'A', description: 'Гортанный звук' },
  { number: 19, name: 'Гайн', letter: 'غ', pronunciation: 'Gh', description: 'Горловой звук' },
  { number: 20, name: 'Фа', letter: 'ف', pronunciation: 'F', description: 'Похожа на букву "Ф"' },
  { number: 21, name: 'Каф', letter: 'ق', pronunciation: 'Q', description: 'Глубокий звук "К"' },
  { number: 22, name: 'Каф мягкий', letter: 'ك', pronunciation: 'K', description: 'Похожа на букву "К"' },
  { number: 23, name: 'Лам', letter: 'ل', pronunciation: 'L', description: 'Похожа на букву "Л"' },
  { number: 24, name: 'Мим', letter: 'م', pronunciation: 'M', description: 'Похожа на букву "М"' },
  { number: 25, name: 'Нун', letter: 'ن', pronunciation: 'N', description: 'Похожа на букву "Н"' },
  { number: 26, name: 'Ха', letter: 'ه', pronunciation: 'H', description: 'Мягкий звук "Х"' },
  { number: 27, name: 'Ва', letter: 'و', pronunciation: 'W', description: 'Похожа на букву "В"' },
  { number: 28, name: 'Йа', letter: 'ي', pronunciation: 'Y', description: 'Похожа на букву "Й"' },
];

export function AlphabetScreen() {
  const { setScreen } = useGame();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-purple/20 to-lavender/20 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setScreen('menu')}
          className="rounded-full hover:bg-deep-purple/10"
        >
          <ArrowLeft className="w-6 h-6 text-deep-purple" />
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold text-deep-purple text-center flex-1">
          Арабский алфавит
        </h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-soft-purple mb-8 text-sm md:text-base"
      >
        Изучай 28 букв арабского алфавита
      </motion.p>

      {/* Letters Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4 max-w-7xl mx-auto"
      >
        {arabicAlphabet.map((letter, index) => (
          <motion.div
            key={letter.number}
            variants={itemVariants}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 h-full border-2 border-transparent hover:border-lavender hover:bg-lavender/5">
              {/* Letter number */}
              <div className="text-xs font-semibold text-muted-foreground mb-2">
                № {letter.number}
              </div>

              {/* Arabic Letter - Large */}
              <div className="text-5xl md:text-6xl font-bold text-deep-purple text-center mb-2 group-hover:text-lavender transition-colors">
                {letter.letter}
              </div>

              {/* Name */}
              <div className="text-sm font-semibold text-deep-purple text-center mb-1">
                {letter.name}
              </div>

              {/* Pronunciation */}
              <div className="text-xs text-soft-purple text-center mb-2 font-mono">
                [{letter.pronunciation}]
              </div>

              {/* Description */}
              <div className="text-xs text-muted-foreground text-center group-hover:text-soft-purple transition-colors">
                {letter.description}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center text-sm text-muted-foreground max-w-2xl mx-auto"
      >
        <p>
          Арабский алфавит состоит из 28 букв. Каждая буква имеет свое название и произношение. 
          Нажимай на карточки, чтобы лучше их запомнить!
        </p>
      </motion.div>
    </div>
  );
}
