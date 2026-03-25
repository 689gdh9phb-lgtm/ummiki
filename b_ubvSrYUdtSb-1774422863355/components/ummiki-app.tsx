'use client';

import { useGame } from '@/lib/game-context';
import { WelcomeScreen } from './welcome-screen';
import { MainMenu } from './main-menu';
import { QuizTopics } from './quiz-topics';
import { LevelsScreen } from './levels-screen';
import { QuizScreen } from './quiz-screen';
import { ResultScreen } from './result-screen';
import { ProfileScreen } from './profile-screen';
import { StoryScreen } from './story-screen';
import { HadithsScreen } from './hadiths-screen';
import { AnimatePresence, motion } from 'framer-motion';

export function UmmikiApp() {
  const { state } = useGame();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'menu':
        return <MainMenu />;
      case 'quiz-topics':
        return <QuizTopics />;
      case 'levels':
        return <LevelsScreen />;
      case 'quiz':
        return <QuizScreen />;
      case 'result':
        return <ResultScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'story':
        return <StoryScreen />;
      case 'hadiths':
        return <HadithsScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-background shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
