'use client';

import { useGame } from '@/lib/game-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

interface ArabicLetter {
  number: number;
  name: string;
  nameFull: string;
  letter: string;
  transcription: string;
  arabicName: string;
}

const arabicAlphabet: ArabicLetter[] = [
  { number: 1,  name: 'Алиф',       nameFull: 'الِف',   letter: 'ا', transcription: 'а',    arabicName: 'أَلِف'   },
  { number: 2,  name: 'Ба',         nameFull: 'بَاء',   letter: 'ب', transcription: 'б',    arabicName: 'بَاء'   },
  { number: 3,  name: 'Та',         nameFull: 'تَاء',   letter: 'ت', transcription: 'т',    arabicName: 'تَاء'   },
  { number: 4,  name: 'Са',         nameFull: 'ثَاء',   letter: 'ث', transcription: 'с',    arabicName: 'ثَاء'   },
  { number: 5,  name: 'Джим',       nameFull: 'جِيم',   letter: 'ج', transcription: 'дж',   arabicName: 'جِيم'   },
  { number: 6,  name: 'Ха',         nameFull: 'حَاء',   letter: 'ح', transcription: 'х̣',   arabicName: 'حَاء'   },
  { number: 7,  name: 'Хо',         nameFull: 'خَاء',   letter: 'خ', transcription: 'х',    arabicName: 'خَاء'   },
  { number: 8,  name: 'Даль',       nameFull: 'دَال',   letter: 'د', transcription: 'д',    arabicName: 'دَال'   },
  { number: 9,  name: 'Заль',       nameFull: 'ذَال',   letter: 'ذ', transcription: 'з',    arabicName: 'ذَال'   },
  { number: 10, name: 'Ра',         nameFull: 'رَاء',   letter: 'ر', transcription: 'р',    arabicName: 'رَاء'   },
  { number: 11, name: 'Зайн',       nameFull: 'زَاي',   letter: 'ز', transcription: 'з',    arabicName: 'زَاي'   },
  { number: 12, name: 'Сийн',       nameFull: 'سِين',   letter: 'س', transcription: 'с',    arabicName: 'سِين'   },
  { number: 13, name: 'Шийн',       nameFull: 'شِين',   letter: 'ش', transcription: 'ш',    arabicName: 'شِين'   },
  { number: 14, name: 'Сад',        nameFull: 'صَاد',   letter: 'ص', transcription: 'с̣',   arabicName: 'صَاد'   },
  { number: 15, name: 'Дад',        nameFull: 'ضَاد',   letter: 'ض', transcription: 'д̣',   arabicName: 'ضَاد'   },
  { number: 16, name: 'Та',         nameFull: 'طَاء',   letter: 'ط', transcription: 'т̣',   arabicName: 'طَاء'   },
  { number: 17, name: 'За',         nameFull: 'ظَاء',   letter: 'ظ', transcription: 'з̣',   arabicName: 'ظَاء'   },
  { number: 18, name: 'Айн',        nameFull: 'عَيْن',  letter: 'ع', transcription: 'ъ',    arabicName: 'عَيْن'  },
  { number: 19, name: 'Гайн',       nameFull: 'غَيْن',  letter: 'غ', transcription: 'гъ',   arabicName: 'غَيْن'  },
  { number: 20, name: 'Фа',         nameFull: 'فَاء',   letter: 'ف', transcription: 'ф',    arabicName: 'فَاء'   },
  { number: 21, name: 'Каф',        nameFull: 'قَاف',   letter: 'ق', transcription: 'къ',   arabicName: 'قَاف'   },
  { number: 22, name: 'Каф',        nameFull: 'كَاف',   letter: 'ك', transcription: 'к',    arabicName: 'كَاف'   },
  { number: 23, name: 'Лам',        nameFull: 'لَام',   letter: 'ل', transcription: 'л',    arabicName: 'لَام'   },
  { number: 24, name: 'Мийм',       nameFull: 'مِيم',   letter: 'م', transcription: 'м',    arabicName: 'مِيم'   },
  { number: 25, name: 'Нун',        nameFull: 'نُون',   letter: 'ن', transcription: 'н',    arabicName: 'نُون'   },
  { number: 26, name: 'Ха',         nameFull: 'هَاء',   letter: 'ه', transcription: 'h',    arabicName: 'هَاء'   },
  { number: 27, name: 'Вав',        nameFull: 'وَاو',   letter: 'و', transcription: 'в/у',  arabicName: 'وَاو'   },
  { number: 28, name: 'Йа',         nameFull: 'يَاء',   letter: 'ي', transcription: 'й/и',  arabicName: 'يَاء'   },
];

// Colour palette cycles through 4 theme colours
const cardColors = [
  { bg: 'bg-deep-purple',     text: 'text-white',        sub: 'text-lavender',      badge: 'bg-lavender/20 text-lavender'         },
  { bg: 'bg-soft-purple',     text: 'text-white',        sub: 'text-white/80',      badge: 'bg-white/20 text-white'               },
  { bg: 'bg-lavender',        text: 'text-deep-purple',  sub: 'text-deep-purple/70', badge: 'bg-deep-purple/10 text-deep-purple'  },
  { bg: 'bg-mint',            text: 'text-deep-purple',  sub: 'text-deep-purple/70', badge: 'bg-deep-purple/10 text-deep-purple'  },
];

function speakLetter(arabicName: string) {
  if (typeof window === 'undefined') return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(arabicName);
  utterance.lang = 'ar-SA';
  utterance.rate = 0.7;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
  if (arabicVoice) utterance.voice = arabicVoice;

  window.speechSynthesis.speak(utterance);
}

export function AlphabetScreen() {
  const { setScreen } = useGame();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = useCallback((letter: ArabicLetter) => {
    setActiveCard(letter.number);
    speakLetter(letter.arabicName);
    setTimeout(() => setActiveCard(null), 600);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScreen('menu')}
            className="rounded-full hover:bg-deep-purple/10 shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-deep-purple" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-deep-purple leading-tight">
              Арабский алфавит
            </h1>
            <p className="text-xs text-muted-foreground">
              28 букв · нажми чтобы услышать
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-2 py-1">
            <Volume2 className="w-3 h-3" />
            <span>звук</span>
          </div>
        </div>
      </div>

      {/* Grid — RTL, 4 cards per row */}
      <div className="px-3 py-4 max-w-lg mx-auto" dir="rtl">
        <div className="grid grid-cols-4 gap-2">
          {arabicAlphabet.map((letter) => {
            const color = cardColors[(letter.number - 1) % cardColors.length];
            const isActive = activeCard === letter.number;

            return (
              <motion.button
                key={letter.number}
                onClick={() => handleCardClick(letter)}
                whileTap={{ scale: 0.92 }}
                animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`
                  relative flex flex-col items-center justify-center
                  rounded-2xl p-2 pt-3 pb-3 aspect-square
                  ${color.bg} ${color.text}
                  shadow-sm active:shadow-inner
                  cursor-pointer select-none
                  border-2 ${isActive ? 'border-gold' : 'border-transparent'}
                  transition-all duration-150
                `}
              >
                {/* Number badge */}
                <span
                  className={`
                    absolute top-1.5 right-1.5
                    text-[9px] font-bold rounded-full
                    px-1 py-0 leading-4 min-w-[16px] text-center
                    ${color.badge}
                  `}
                  dir="ltr"
                >
                  {letter.number}
                </span>

                {/* Arabic letter */}
                <span
                  className="text-4xl font-bold leading-none mb-1"
                  style={{ fontFamily: 'serif' }}
                >
                  {letter.letter}
                </span>

                {/* Russian name */}
                <span className={`text-[10px] font-semibold leading-tight text-center ${color.sub}`}>
                  {letter.name}
                </span>

                {/* Transcription */}
                <span className={`text-[9px] leading-tight ${color.sub} opacity-80`} dir="ltr">
                  [{letter.transcription}]
                </span>

                {/* Sound wave indicator when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 rounded-2xl border-2 border-gold pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Footer hint */}
      <div className="pb-6 text-center px-4">
        <p className="text-xs text-muted-foreground" dir="ltr">
          Нажми на любую букву, чтобы услышать её произношение
        </p>
      </div>
    </div>
  );
}
