export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Level {
  id: string;
  name: string;
  questions: Question[];
  unlocked: boolean;
  completed: boolean;
  stars: number;
  score: number;
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  levels: Level[];
}

export interface Quiz {
  id: string;
  name: string;
  description: string;
  topics: Topic[];
}

export interface UserProgress {
  totalXP: number;
  totalStars: number;
  completedLevels: number;
  currentStreak: number;
  badges: string[];
  quizProgress: Record<string, Record<string, Record<string, { completed: boolean; stars: number; score: number }>>>;
}

export interface GameState {
  currentScreen: 'welcome' | 'menu' | 'quiz-topics' | 'levels' | 'quiz' | 'result' | 'profile' | 'story' | 'hadiths' | 'hadith-reading' | 'alphabet';
  currentQuiz: Quiz | null;
  currentTopic: Topic | null;
  currentLevel: Level | null;
  currentQuestionIndex: number;
  currentScore: number;
  correctAnswers: number;
  userProgress: UserProgress;
  selectedAnswer: number | null;
  showResult: boolean;
}
