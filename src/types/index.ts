export interface BilingualText {
  en: string;
  km: string;
}

export type Language = 'en' | 'km';
export type Theme = 'light' | 'dark';
export type Level = 'beginner' | 'intermediate';
export type StoryLevel = 'A1' | 'A2' | 'B1';
export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank';

export interface Exercise {
  id: string;
  question: BilingualText;
  type: QuestionType;
  options?: BilingualText[];
  correctAnswer: string;
  explanation: BilingualText;
}

export interface QuizQuestion {
  id: string;
  question: BilingualText;
  type: QuestionType;
  options: BilingualText[];
  correctAnswer: string;
  explanation: BilingualText;
}

export interface HomeworkTask {
  id: string;
  instruction: BilingualText;
  items?: string[];
}

export interface GrammarFormGroup {
  structure: string;
  examples: { en: string; km: string }[];
}

export interface GrammarLesson {
  id: string;
  title: BilingualText;
  level: Level;
  unitId: string;
  chapterId: string;
  order: number;
  estimatedMinutes: number;
  definition: BilingualText;
  forms: {
    affirmative: GrammarFormGroup;
    negative: GrammarFormGroup;
    question: GrammarFormGroup;
  };
  commonMistakes: {
    mistake: string;
    correction: string;
    reason: BilingualText;
  }[];
  exercises: Exercise[];
  homework: HomeworkTask[];
  quiz: QuizQuestion[];
  vocabularyIds: string[];
}

export interface GrammarChapter {
  id: string;
  title: BilingualText;
  lessons: GrammarLesson[];
}

export interface GrammarUnit {
  id: string;
  title: BilingualText;
  level: Level;
  order: number;
  chapters: GrammarChapter[];
}

export interface Story {
  id: string;
  title: BilingualText;
  level: StoryLevel;
  estimatedMinutes: number;
  vocabularyIds: string[];
  content: BilingualText;
  questions: {
    id: string;
    question: BilingualText;
    type: QuestionType;
    options: BilingualText[];
    correctAnswer: string;
    explanation: BilingualText;
  }[];
  vocabularyPractice: {
    id: string;
    type: 'match' | 'fill' | 'multiple-choice';
    prompt: BilingualText;
    correctAnswer: string;
    options?: BilingualText[];
    explanation: BilingualText;
  }[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  meaning: BilingualText;
  example: BilingualText;
  category: string;
  level: Level;
}

export interface Achievement {
  id: string;
  title: BilingualText;
  description: BilingualText;
  icon: string;
  condition: {
    type: 'lessons_completed' | 'quizzes_passed' | 'streak_days' | 'words_learned' | 'stories_read';
    count: number;
  };
}

export interface UserProgress {
  completedLessons: string[];
  completedStories: string[];
  quizScores: Record<string, number>;
  quizAttempts: Record<string, number>;
  streakStart: string | null;
  lastActiveDate: string;
  streakCount: number;
  learnedWords: string[];
  achievements: string[];
}
