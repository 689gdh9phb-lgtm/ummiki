'use client';

import { useState } from 'react';
import { useGame } from '@/lib/game-context';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Users, Sparkles, Shield, Home, Star } from 'lucide-react';
import Image from 'next/image';

interface Hadith {
  id: string;
  text: string;
  highlight?: string;
}

interface HadithTopic {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  hadiths: Hadith[];
}

const hadithTopics: HadithTopic[] = [
  {
    id: 'people',
    title: 'Отношение к людям',
    subtitle: 'Как относиться к другим',
    icon: <Users className="w-6 h-6" />,
    gradient: 'from-purple-400 to-purple-600',
    hadiths: [
      { id: '1', text: 'Лучшие из людей — те, кто приносит пользу другим.', highlight: 'приносит пользу' },
      { id: '2', text: 'Будь мягким с людьми, и Аллах будет мягок с тобой.', highlight: 'мягким с людьми' },
      { id: '3', text: 'Не причиняй вреда другим.', highlight: 'Не причиняй вреда' },
    ],
  },
  {
    id: 'friendship',
    title: 'Дружба',
    subtitle: 'О настоящих друзьях',
    icon: <Heart className="w-6 h-6" />,
    gradient: 'from-pink-400 to-purple-500',
    hadiths: [
      { id: '1', text: 'Человек следует религии своего друга.', highlight: 'религии своего друга' },
      { id: '2', text: 'Выбирай хороших друзей.', highlight: 'хороших друзей' },
      { id: '3', text: 'Хороший друг напоминает о добре.', highlight: 'напоминает о добре' },
    ],
  },
  {
    id: 'kindness',
    title: 'Доброта',
    subtitle: 'Сила добрых дел',
    icon: <Sparkles className="w-6 h-6" />,
    gradient: 'from-amber-400 to-orange-500',
    hadiths: [
      { id: '1', text: 'Улыбка — это милостыня.', highlight: 'Улыбка' },
      { id: '2', text: 'Аллах любит добрых людей.', highlight: 'добрых людей' },
      { id: '3', text: 'Доброе слово — это добро.', highlight: 'Доброе слово' },
    ],
  },
  {
    id: 'honesty',
    title: 'Честность',
    subtitle: 'Правда и искренность',
    icon: <Shield className="w-6 h-6" />,
    gradient: 'from-emerald-400 to-teal-500',
    hadiths: [
      { id: '1', text: 'Говорите правду.', highlight: 'правду' },
      { id: '2', text: 'Ложь ведёт к плохому.', highlight: 'Ложь' },
      { id: '3', text: 'Честность ведёт к благу.', highlight: 'Честность' },
    ],
  },
  {
    id: 'parents',
    title: 'Уважение к родителям',
    subtitle: 'Почитание семьи',
    icon: <Home className="w-6 h-6" />,
    gradient: 'from-blue-400 to-indigo-500',
    hadiths: [
      { id: '1', text: 'Рай находится под ногами матерей.', highlight: 'под ногами матерей' },
      { id: '2', text: 'Будь добр к своим родителям.', highlight: 'добр к своим родителям' },
      { id: '3', text: 'Слушайся родителей в хорошем.', highlight: 'Слушайся родителей' },
    ],
  },
  {
    id: 'intention',
    title: 'Намерение',
    subtitle: 'Искренность сердца',
    icon: <Star className="w-6 h-6" />,
    gradient: 'from-violet-400 to-purple-600',
    hadiths: [
      { id: '1', text: 'Дела оцениваются по намерениям.', highlight: 'по намерениям' },
      { id: '2', text: 'Аллах смотрит на сердца.', highlight: 'на сердца' },
      { id: '3', text: 'Искренность — это путь к добру.', highlight: 'Искренность' },
    ],
  },
];

function HadithCard({ hadith, index }: { hadith: Hadith; index: number }) {
  const renderText = () => {
    if (!hadith.highlight) return hadith.text;
    
    const parts = hadith.text.split(hadith.highlight);
    return (
      <>
        {parts[0]}
        <span className="text-deep-purple font-semibold">{hadith.highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.4 }}
      className="bg-white dark:bg-card rounded-3xl p-6 shadow-lg border border-lavender/30"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-soft-purple to-lavender flex items-center justify-center flex-shrink-0">
          <Star className="w-5 h-5 text-white" />
        </div>
        <p className="text-lg leading-relaxed text-foreground font-medium">
          {renderText()}
        </p>
      </div>
    </motion.div>
  );
}

function TopicDetail({ topic, onBack }: { topic: HadithTopic; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender/30 via-background to-background">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground mb-6"
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4"
        >
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center text-white shadow-lg`}>
            {topic.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{topic.title}</h1>
            <p className="text-muted-foreground">{topic.subtitle}</p>
          </div>
        </motion.div>
      </div>

      {/* Hadith Cards */}
      <div className="px-6 pb-8 flex flex-col gap-4">
        {topic.hadiths.map((hadith, index) => (
          <HadithCard key={hadith.id} hadith={hadith} index={index} />
        ))}
      </div>
    </div>
  );
}

export function HadithsScreen() {
  const { setScreen } = useGame();
  const [selectedTopic, setSelectedTopic] = useState<HadithTopic | null>(null);

  if (selectedTopic) {
    return <TopicDetail topic={selectedTopic} onBack={() => setSelectedTopic(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender/30 via-background to-background">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <motion.button
          onClick={() => setScreen('menu')}
          className="flex items-center gap-2 text-muted-foreground mb-6"
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </motion.button>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-32 rounded-3xl overflow-hidden mb-6 shadow-lg"
        >
          <Image
            src="/hadiths-header.jpg"
            alt="Hadiths"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/60 to-transparent" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Хадисы</h1>
          <p className="text-muted-foreground text-lg">Мудрые слова для сердца</p>
        </motion.div>
      </div>

      {/* Topics Grid */}
      <div className="px-6 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {hadithTopics.map((topic, index) => (
            <motion.button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="relative bg-card rounded-3xl p-5 shadow-lg border border-border/50 text-left overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.08, duration: 0.4 }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${topic.gradient}`} />
              
              <div className="relative">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center text-white mb-3 shadow-md`}>
                  {topic.icon}
                </div>
                <p className="font-semibold text-foreground mb-1">{topic.title}</p>
                <p className="text-xs text-muted-foreground">{topic.subtitle}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
