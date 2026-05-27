'use client';

import { useState, useEffect, useRef } from 'react';
import { useGame } from '@/lib/game-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArabicLetter {
  letter: string;
  name: string;
  transliteration: string;
  pronunciation: string;
  audioText: string;
}

const arabicAlphabet: ArabicLetter[] = [
  { letter: 'ا', name: 'Алиф', transliteration: 'a', pronunciation: 'Долгий звук "а", похож на русский "а"', audioText: 'أَلِف' },
  { letter: 'ب', name: 'Ба', transliteration: 'b', pronunciation: 'Как русский "б"', audioText: 'بَاء' },
  { letter: 'ت', name: 'Та', transliteration: 't', pronunciation: 'Как русский "т"', audioText: 'تَاء' },
  { letter: 'ث', name: 'Са', transliteration: 'th', pronunciation: 'Межзубный "с", язык между зубами', audioText: 'ثَاء' },
  { letter: 'ج', name: 'Джим', transliteration: 'j', pronunciation: 'Как русский "дж"', audioText: 'جِيم' },
  { letter: 'ح', name: 'Ха', transliteration: 'ḥ', pronunciation: 'Глубокий выдох из горла', audioText: 'حَاء' },
  { letter: 'خ', name: 'Ха', transliteration: 'kh', pronunciation: 'Как русский "х", но глубже', audioText: 'خَاء' },
  { letter: 'د', name: 'Даль', transliteration: 'd', pronunciation: 'Как русский "д"', audioText: 'دَال' },
  { letter: 'ذ', name: 'Заль', transliteration: 'dh', pronunciation: 'Межзубный "з", язык между зубами', audioText: 'ذَال' },
  { letter: 'ر', name: 'Ра', transliteration: 'r', pronunciation: 'Раскатистый "р"', audioText: 'رَاء' },
  { letter: 'ز', name: 'Зайн', transliteration: 'z', pronunciation: 'Как русский "з"', audioText: 'زَاي' },
  { letter: 'س', name: 'Син', transliteration: 's', pronunciation: 'Как русский "с"', audioText: 'سِين' },
  { letter: 'ش', name: 'Шин', transliteration: 'sh', pronunciation: 'Как русский "ш"', audioText: 'شِين' },
  { letter: 'ص', name: 'Сад', transliteration: 'ṣ', pronunciation: 'Эмфатический "с", произносится глубже', audioText: 'صَاد' },
  { letter: 'ض', name: 'Дад', transliteration: 'ḍ', pronunciation: 'Эмфатический "д", уникальный арабский звук', audioText: 'ضَاد' },
  { letter: 'ط', name: 'Та', transliteration: 'ṭ', pronunciation: 'Эмфатический "т", произносится глубже', audioText: 'طَاء' },
  { letter: 'ظ', name: 'За', transliteration: 'ẓ', pronunciation: 'Эмфатический межзубный "з"', audioText: 'ظَاء' },
  { letter: 'ع', name: 'Айн', transliteration: 'ʿ', pronunciation: 'Гортанный звук, сжатие горла', audioText: 'عَين' },
  { letter: 'غ', name: 'Гайн', transliteration: 'gh', pronunciation: 'Как французский "r", горловой звук', audioText: 'غَين' },
  { letter: 'ف', name: 'Фа', transliteration: 'f', pronunciation: 'Как русский "ф"', audioText: 'فَاء' },
  { letter: 'ق', name: 'Каф', transliteration: 'q', pronunciation: 'Глубокий "к" из горла', audioText: 'قَاف' },
  { letter: 'ك', name: 'Каф', transliteration: 'k', pronunciation: 'Как русский "к"', audioText: 'كَاف' },
  { letter: 'ل', name: 'Лям', transliteration: 'l', pronunciation: 'Как русский "л"', audioText: 'لَام' },
  { letter: 'م', name: 'Мим', transliteration: 'm', pronunciation: 'Как русский "м"', audioText: 'مِيم' },
  { letter: 'ن', name: 'Нун', transliteration: 'n', pronunciation: 'Как русский "н"', audioText: 'نُون' },
  { letter: 'ه', name: 'Ха', transliteration: 'h', pronunciation: 'Лёгкий выдох, как в слове "ах"', audioText: 'هَاء' },
  { letter: 'و', name: 'Вав', transliteration: 'w/ū', pronunciation: 'Как русский "в" или долгий "у"', audioText: 'وَاو' },
  { letter: 'ي', name: 'Йа', transliteration: 'y/ī', pronunciation: 'Как русский "й" или долгий "и"', audioText: 'يَاء' },
];

export function AlphabetScreen() {
  const { setScreen } = useGame();
  const [selectedLetter, setSelectedLetter] = useState<ArabicLetter | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [arabicVoice, setArabicVoice] = useState<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load Arabic male voice
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Try to find Arabic male voice
      const arabicMaleVoice = voices.find(
        voice => voice.lang.startsWith('ar') && voice.name.toLowerCase().includes('male')
      );
      // Fallback to any Arabic voice
      const anyArabicVoice = voices.find(voice => voice.lang.startsWith('ar'));
      
      if (arabicMaleVoice) {
        setArabicVoice(arabicMaleVoice);
      } else if (anyArabicVoice) {
        setArabicVoice(anyArabicVoice);
      }
      
      setVoicesLoaded(true);
    };

    // Load voices immediately if available
    loadVoices();
    
    // Also listen for voiceschanged event
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playPronunciation = (letter: ArabicLetter) => {
    if (!voicesLoaded) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(letter.audioText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.7; // Slower for learning
    utterance.pitch = 0.9; // Slightly lower pitch for male voice
    
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleLetterClick = (letter: ArabicLetter) => {
    setSelectedLetter(letter);
    playPronunciation(letter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint/30 via-background to-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-mint/50 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScreen('menu')}
            className="rounded-full bg-card/80 shadow-md hover:bg-card"
          >
            <ArrowLeft className="h-5 w-5 text-deep-purple" />
          </Button>
          <h1 className="text-2xl font-bold text-deep-purple">Арабский алфавит</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-8">
        <p className="text-center text-muted-foreground mb-4">
          Нажмите на букву, чтобы услышать произношение
        </p>
        
        {!voicesLoaded && (
          <p className="text-center text-amber-600 text-sm mb-4">
            Загрузка голоса...
          </p>
        )}

        {/* Selected Letter Detail */}
        <AnimatePresence>
          {selectedLetter && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 bg-card rounded-3xl p-6 shadow-xl border border-mint/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-deep-purple to-soft-purple flex items-center justify-center">
                    <span className="text-5xl text-white font-arabic">{selectedLetter.letter}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{selectedLetter.name}</h2>
                    <p className="text-muted-foreground">/{selectedLetter.transliteration}/</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => playPronunciation(selectedLetter)}
                  disabled={isPlaying}
                  className="rounded-full h-12 w-12"
                >
                  {isPlaying ? (
                    <VolumeX className="h-6 w-6 text-deep-purple animate-pulse" />
                  ) : (
                    <Volume2 className="h-6 w-6 text-deep-purple" />
                  )}
                </Button>
              </div>
              <p className="text-foreground/80 leading-relaxed">{selectedLetter.pronunciation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alphabet Grid */}
        <div className="grid grid-cols-4 gap-3">
          {arabicAlphabet.map((item, index) => (
            <motion.button
              key={item.letter}
              onClick={() => handleLetterClick(item)}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center shadow-lg border transition-all duration-200 ${
                selectedLetter?.letter === item.letter
                  ? 'bg-gradient-to-br from-deep-purple to-soft-purple border-deep-purple text-white scale-105'
                  : 'bg-card border-border/50 hover:border-mint hover:shadow-xl active:scale-95'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02, duration: 0.3 }}
            >
              <span className={`text-3xl font-arabic mb-1 ${
                selectedLetter?.letter === item.letter ? 'text-white' : 'text-foreground'
              }`}>
                {item.letter}
              </span>
              <span className={`text-xs ${
                selectedLetter?.letter === item.letter ? 'text-white/80' : 'text-muted-foreground'
              }`}>
                {item.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 bg-card rounded-2xl p-4 shadow-lg border border-border/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-mint/30 flex items-center justify-center">
              <Volume2 className="h-5 w-5 text-deep-purple" />
            </div>
            <div>
              <p className="font-medium text-foreground">28 букв арабского алфавита</p>
              <p className="text-sm text-muted-foreground">Нажимайте для изучения произношения</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
