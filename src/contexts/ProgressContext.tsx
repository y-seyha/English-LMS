import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { UserProgress } from '../types';

interface ProgressContextValue {
  progress: UserProgress;
  completeLesson: (id: string) => void;
  completeStory: (id: string) => void;
  saveQuizScore: (quizId: string, score: number) => void;
  learnWord: (id: string) => void;
  unlockAchievement: (id: string) => void;
  getLessonProgress: (lessonId: string) => 'not-started' | 'completed';
  getQuizScore: (quizId: string) => number | null;
  completedCount: number;
  totalScore: number;
}

const STORAGE_KEY = 'elp-progress';

function loadProgress(): UserProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data) as UserProgress;
  } catch {}
  return {
    completedLessons: [],
    completedStories: [],
    quizScores: {},
    quizAttempts: {},
    streakStart: null,
    lastActiveDate: '',
    streakCount: 0,
    learnedWords: [],
    achievements: [],
  };
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  const persist = useCallback((next: UserProgress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  }, []);

  const completeLesson = useCallback((id: string) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(id)) return prev;
      const next = { ...prev, completedLessons: [...prev.completedLessons, id] };
      return persist(next);
    });
  }, [persist]);

  const completeStory = useCallback((id: string) => {
    setProgress(prev => {
      if (prev.completedStories.includes(id)) return prev;
      const next = { ...prev, completedStories: [...prev.completedStories, id] };
      return persist(next);
    });
  }, [persist]);

  const saveQuizScore = useCallback((quizId: string, score: number) => {
    setProgress(prev => {
      const prevBest = prev.quizScores[quizId] ?? 0;
      const next = {
        ...prev,
        quizScores: { ...prev.quizScores, [quizId]: Math.max(prevBest, score) },
        quizAttempts: { ...prev.quizAttempts, [quizId]: (prev.quizAttempts[quizId] ?? 0) + 1 },
      };
      return persist(next);
    });
  }, [persist]);

  const learnWord = useCallback((id: string) => {
    setProgress(prev => {
      if (prev.learnedWords.includes(id)) return prev;
      const next = { ...prev, learnedWords: [...prev.learnedWords, id] };
      return persist(next);
    });
  }, [persist]);

  const unlockAchievement = useCallback((id: string) => {
    setProgress(prev => {
      if (prev.achievements.includes(id)) return prev;
      const next = { ...prev, achievements: [...prev.achievements, id] };
      return persist(next);
    });
  }, [persist]);

  const getLessonProgress = useCallback((lessonId: string): 'not-started' | 'completed' => {
    return progress.completedLessons.includes(lessonId) ? 'completed' : 'not-started';
  }, [progress.completedLessons]);

  const getQuizScore = useCallback((quizId: string): number | null => {
    return progress.quizScores[quizId] ?? null;
  }, [progress.quizScores]);

  const completedCount = progress.completedLessons.length;
  const totalScore = Object.values(progress.quizScores).reduce((a, b) => a + b, 0);

  return (
    <ProgressContext.Provider value={{
      progress, completeLesson, completeStory, saveQuizScore,
      learnWord, unlockAchievement, getLessonProgress, getQuizScore,
      completedCount, totalScore,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
