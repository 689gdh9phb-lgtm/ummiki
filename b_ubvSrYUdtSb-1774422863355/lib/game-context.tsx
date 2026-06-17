'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { GameState, Quiz, Topic, Level, UserProgress } from './game-types';
import { quizData, initialUserProgress } from './game-data';

const initialGameState: GameState = {
  currentScreen: 'welcome',
  currentQuiz: null,
  currentTopic: null,
  currentLevel: null,
  currentQuestionIndex: 0,
  currentScore: 0,
  correctAnswers: 0,
  userProgress: initialUserProgress,
  selectedAnswer: null,
  showResult: false,
};

interface GameContextType {
  state: GameState;
  quiz: Quiz;
  setScreen: (screen: GameState['currentScreen']) => void;
  startQuiz: () => void;
  selectTopic: (topic: Topic) => void;
  startLevel: (level: Level) => void;
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
  completeLevel: () => void;
  resetLevel: () => void;
  goToMenu: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialGameState);
  const [quiz, setQuiz] = useState<Quiz>(quizData);

  const setScreen = useCallback((screen: GameState['currentScreen']) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  }, []);

  const startQuiz = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentScreen: 'quiz-topics',
      currentQuiz: quiz,
    }));
  }, [quiz]);

  const selectTopic = useCallback((topic: Topic) => {
    setState(prev => ({
      ...prev,
      currentScreen: 'levels',
      currentTopic: topic,
    }));
  }, []);

  const startLevel = useCallback((level: Level) => {
    // All levels are unlocked - no check needed
    setState(prev => ({
      ...prev,
      currentScreen: 'quiz',
      currentLevel: level,
      currentQuestionIndex: 0,
      currentScore: 0,
      correctAnswers: 0,
      selectedAnswer: null,
      showResult: false,
    }));
  }, []);

  const answerQuestion = useCallback((answerIndex: number) => {
    setState(prev => {
      if (prev.selectedAnswer !== null || !prev.currentLevel) return prev;
      
      const isCorrect = answerIndex === prev.currentLevel.questions[prev.currentQuestionIndex].correctAnswer;
      
      return {
        ...prev,
        selectedAnswer: answerIndex,
        currentScore: isCorrect ? prev.currentScore + 10 : prev.currentScore,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        showResult: true,
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      if (!prev.currentLevel) return prev;
      
      const isLastQuestion = prev.currentQuestionIndex >= prev.currentLevel.questions.length - 1;
      
      if (isLastQuestion) {
        return { ...prev, currentScreen: 'result' };
      }
      
      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        showResult: false,
      };
    });
  }, []);

  const completeLevel = useCallback(() => {
    setState(prev => {
      if (!prev.currentLevel || !prev.currentTopic) return prev;
      
      const totalQuestions = prev.currentLevel.questions.length;
      const percentage = prev.correctAnswers / totalQuestions;
      const stars = percentage === 1 ? 3 : percentage >= 0.66 ? 2 : percentage >= 0.33 ? 1 : 0;
      const bonusPoints = 20 + (stars === 3 ? 10 : 0);
      const totalScore = prev.currentScore + bonusPoints;
      
      const newProgress: UserProgress = {
        ...prev.userProgress,
        totalXP: prev.userProgress.totalXP + totalScore,
        totalStars: prev.userProgress.totalStars + stars,
        completedLevels: prev.userProgress.completedLevels + (prev.currentLevel.completed ? 0 : 1),
      };
      
      return {
        ...prev,
        userProgress: newProgress,
        currentScreen: 'levels',
      };
    });

    // Update quiz data to unlock next level
    setQuiz(prevQuiz => {
      const newQuiz = { ...prevQuiz };
      newQuiz.topics = newQuiz.topics.map(topic => {
        if (topic.id !== state.currentTopic?.id) return topic;
        
        let foundCurrent = false;
        const newLevels = topic.levels.map((level, index) => {
          if (level.id === state.currentLevel?.id) {
            foundCurrent = true;
            const totalQuestions = state.currentLevel.questions.length;
            const percentage = state.correctAnswers / totalQuestions;
            const stars = percentage === 1 ? 3 : percentage >= 0.66 ? 2 : percentage >= 0.33 ? 1 : 0;
            return {
              ...level,
              completed: true,
              stars: Math.max(level.stars, stars),
              score: Math.max(level.score, state.currentScore),
            };
          }
          if (foundCurrent && index > 0) {
            return { ...level, unlocked: true };
          }
          return level;
        });
        
        // Check if all levels in topic are complete to unlock next topic
        const allComplete = newLevels.every(l => l.completed);
        if (allComplete) {
          const topicIndex = newQuiz.topics.findIndex(t => t.id === topic.id);
          if (topicIndex < newQuiz.topics.length - 1) {
            const nextTopic = newQuiz.topics[topicIndex + 1];
            if (nextTopic.levels[0]) {
              nextTopic.levels[0].unlocked = true;
            }
          }
        }
        
        return { ...topic, levels: newLevels };
      });
      
      return newQuiz;
    });
  }, [state.currentTopic?.id, state.currentLevel, state.correctAnswers, state.currentScore]);

  const resetLevel = useCallback(() => {
    if (!state.currentLevel) return;
    setState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      currentScore: 0,
      correctAnswers: 0,
      selectedAnswer: null,
      showResult: false,
      currentScreen: 'quiz',
    }));
  }, [state.currentLevel]);

  const goToMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentScreen: 'menu',
      currentQuiz: null,
      currentTopic: null,
      currentLevel: null,
    }));
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        quiz,
        setScreen,
        startQuiz,
        selectTopic,
        startLevel,
        answerQuestion,
        nextQuestion,
        completeLevel,
        resetLevel,
        goToMenu,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
