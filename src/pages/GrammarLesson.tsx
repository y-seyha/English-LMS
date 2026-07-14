import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Menu, BookOpen, CheckCircle2 } from 'lucide-react';
import { useBilingualText, useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { grammarUnits } from '../data/grammar';
import LessonSidebar from '../components/learning/LessonSidebar';
import LessonContent from '../components/learning/LessonContent';
import StepNavigation from '../components/learning/StepNavigation';
import ExerciseCard from '../components/learning/ExerciseCard';
import HomeworkSection from '../components/learning/HomeworkSection';
import QuizCard from '../components/learning/QuizCard';
import Badge from '../components/ui/Badge';
import type { GrammarLesson } from '../types';
import type { StepType } from '../components/learning/StepNavigation';

function getLesson(lessonId: string): GrammarLesson | null {
  for (const unit of grammarUnits) {
    for (const chapter of unit.chapters) {
      const lesson = chapter.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
  }
  return null;
}

function ExercisesSection({ lesson }: { lesson: GrammarLesson }) {
  return (
    <div>
      {lesson.exercises.map((ex, i) => (
        <ExerciseCard key={ex.id} exercise={ex} index={i} onCorrect={() => {}} />
      ))}
    </div>
  );
}

export default function GrammarLesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const t = useBilingualText();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { completeLesson, getLessonProgress } = useProgress();

  const [currentStep, setCurrentStep] = useState<StepType>('lesson');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const lesson = lessonId ? getLesson(lessonId) : null;

  if (!lesson) {
    return (
      <div className="animate-[fadeIn_300ms_ease] py-8">
        <div className="px-6 py-12 text-center text-muted">
          <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--muted)' }} />
          <h3 className="mb-2 text-lg font-semibold text-[--foreground]">{language === 'en' ? 'Lesson not found' : 'រកមិនឃើញមេរៀនទេ'}</h3>
          <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[--primary] px-5 py-[0.625rem] text-[0.9375rem] font-medium text-white transition-all hover:bg-[--primary-hover]" onClick={() => navigate('/grammar')}>
            {language === 'en' ? 'Back to Lessons' : 'ត្រឡប់ទៅមេរៀនវិញ'}
          </button>
        </div>
      </div>
    );
  }

  const isCompleted = getLessonProgress(lesson.id) === 'completed';

  const handleQuizComplete = () => {
    completeLesson(lesson.id);
    setCurrentStep('quiz');
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
      <LessonSidebar
        units={grammarUnits}
        currentLessonId={lesson.id}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 pt-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-[--border] bg-transparent px-3 py-[0.375rem] text-xs font-medium text-[--foreground] transition-all hover:border-[--primary] hover:bg-black/4 hover:text-[--primary] dark:hover:bg-white/6 sm:text-sm" onClick={() => navigate('/grammar')}>
            <ArrowLeft size={16} /> {language === 'en' ? 'Back' : 'ត្រឡប់'}
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-[--border] bg-transparent px-3 py-[0.375rem] text-xs font-medium text-[--foreground] transition-all hover:border-[--primary] hover:bg-black/4 hover:text-[--primary] dark:hover:bg-white/6 sm:text-sm lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={16} /> {language === 'en' ? 'Lessons' : 'មេរៀន'}
          </button>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <Badge variant={lesson.level}>
              {lesson.level === 'beginner' ? 'Beginner' : 'Intermediate'}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-muted">
              <Clock size={16} /> {lesson.estimatedMinutes} min
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-[0.625rem] py-[0.25rem] text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                <CheckCircle2 size={14} />
                {language === 'en' ? 'Completed' : 'បានបញ្ចប់'}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold">{t(lesson.title)}</h1>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 'lesson' && (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <LessonContent lesson={lesson} />
            </motion.div>
          )}

          {currentStep === 'exercises' && (
            <motion.div
              key="exercises"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <ExercisesSection lesson={lesson} />
            </motion.div>
          )}

          {currentStep === 'homework' && (
            <motion.div
              key="homework"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <HomeworkSection tasks={lesson.homework} />
            </motion.div>
          )}

          {currentStep === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8">
                <QuizCard questions={lesson.quiz} onComplete={handleQuizComplete} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <StepNavigation
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          lessonLabel={language === 'en' ? 'Lesson' : 'មេរៀន'}
          exercisesLabel={language === 'en' ? 'Exercises' : 'លំហាត់'}
          homeworkLabel={language === 'en' ? 'Homework' : 'កិច្ចការផ្ទះ'}
          quizLabel={language === 'en' ? 'Quiz' : 'សំណួរ'}
        />
      </div>
    </div>
  );
}
