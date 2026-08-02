import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Clock, Menu, BookOpen, CheckCircle2, Bookmark, Loader2, Send } from 'lucide-react'
import { showSuccess, showError } from '../../utils/toast'
import { useBilingualText, useLanguage } from '../../contexts/LanguageContext'
import { useGrammarUnits, useGrammarLesson } from '../../api/grammar'
import { useProgress, useCompleteLesson, useSubmitQuiz, useCompleteExercises } from '../../api/progress'
import { useBookmarks, useAddBookmark, useRemoveBookmark } from '../../api/bookmarks'
import LessonSidebar from '../../components/learning/LessonSidebar'
import LessonContent from '../../components/learning/LessonContent'
import StepNavigation from '../../components/learning/StepNavigation'
import ExerciseCard from '../../components/learning/ExerciseCard'
import HomeworkSection from '../../components/learning/HomeworkSection'
import QuizCard from '../../components/learning/QuizCard'
import type { QuizAnswer } from '../../components/learning/QuizCard'
import Badge from '../../components/ui/Badge'
import type { StepType } from '../../components/learning/StepNavigation'

export default function GrammarLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const t = useBilingualText()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const { data: lesson, isLoading } = useGrammarLesson(lessonId ?? '')
  const { data: unitsData } = useGrammarUnits()
  const { data: progressData } = useProgress()
  const { data: bookmarks } = useBookmarks()
  const completeLesson = useCompleteLesson()
  const submitQuiz = useSubmitQuiz()
  const submitExercises = useCompleteExercises()
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()

  const [currentStep, setCurrentStep] = useState<StepType>('lesson')
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768)
  const [exerciseAttempts, setExerciseAttempts] = useState<Record<string, { selectedAnswer: string; isCorrect: boolean }>>({})
  const [exercisesSubmitted, setExercisesSubmitted] = useState(false)

  const units = unitsData ?? []
  const completedLessons = progressData?.progress?.completedLessons ?? []
  const isCompleted = lessonId ? completedLessons.includes(lessonId) : false
  const isBookmarked = bookmarks?.some((bm: any) => bm.targetType === 'lesson' && bm.targetId === lessonId)
  const currentBookmarkId = bookmarks?.find((bm: any) => bm.targetType === 'lesson' && bm.targetId === lessonId)?._id
  const bookmarkPending = addBookmark.isPending || removeBookmark.isPending

  const toggleBookmark = useCallback(() => {
    if (!lessonId || bookmarkPending) return
    if (isBookmarked && currentBookmarkId) {
      removeBookmark.mutate(currentBookmarkId, {
        onSuccess: () => showSuccess(language === 'en' ? 'Bookmark removed' : 'បានលុបចំណាំ'),
        onError: () => showError(language === 'en' ? 'Failed to remove bookmark' : 'មិនអាចលុបចំណាំបានទេ'),
      })
    } else {
      addBookmark.mutate({ targetType: 'lesson', targetId: lessonId }, {
        onSuccess: () => showSuccess(language === 'en' ? 'Bookmark added' : 'បានបន្ថែមចំណាំ'),
        onError: () => showError(language === 'en' ? 'Failed to add bookmark' : 'មិនអាចបន្ថែមចំណាំបានទេ'),
      })
    }
  }, [lessonId, isBookmarked, currentBookmarkId, bookmarkPending, removeBookmark, addBookmark, language])

  if (isLoading) {
    return <div className="py-12 text-center text-muted">Loading lesson...</div>
  }

  if (!lesson) {
    return (
      <div className="animate-[fadeIn_300ms_ease] py-8">
        <div className="px-6 py-12 text-center text-muted">
          <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--muted)' }} />
          <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
            {language === 'en' ? 'Lesson not found' : 'រកមិនឃើញមេរៀនទេ'}
          </h3>
          <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[--primary] px-5 py-[0.625rem] text-[0.9375rem] font-medium text-white transition-all hover:bg-[--primary-hover]" onClick={() => navigate('/learn/grammar')}>
            {language === 'en' ? 'Back to Lessons' : 'ត្រឡប់ទៅមេរៀនវិញ'}
          </button>
        </div>
      </div>
    )
  }

  const handleQuizComplete = (answers: QuizAnswer[], isFinalSubmit: boolean) => {
    if (lessonId) {
      submitQuiz.mutate({ lessonId, answers })
      if (isFinalSubmit) {
        completeLesson.mutate(lessonId)
      }
    }
    if (isFinalSubmit) {
      setCurrentStep('quiz')
    }
  }

  const handleExerciseAttempt = (exerciseId: string, selectedAnswer: string, isCorrect: boolean) => {
    setExerciseAttempts(prev => ({ ...prev, [exerciseId]: { selectedAnswer, isCorrect } }))
  }

  const handleSubmitExercises = () => {
    if (!lessonId || !lesson?.exercises) return
    const answers = lesson.exercises.map((ex: any) => {
      const attempt = exerciseAttempts[ex.id]
      return {
        exerciseId: ex.id,
        questionText: ex.question?.en ?? '',
        selectedAnswer: attempt?.selectedAnswer ?? '',
        correctAnswer: ex.correctAnswer,
        isCorrect: attempt?.isCorrect ?? false,
      }
    })
    submitExercises.mutate({ lessonId, answers }, {
      onSuccess: () => {
        showSuccess(language === 'en' ? 'Exercises submitted' : 'បានបញ្ជូនលំហាត់')
        setExercisesSubmitted(true)
      },
      onError: () => {
        showError(language === 'en' ? 'Failed to submit exercises' : 'មិនអាចបញ្ជូនលំហាត់បានទេ')
      },
    })
  }

  const allExercisesAttempted = lesson?.exercises
    ? lesson.exercises.every((ex: any) => exerciseAttempts[ex.id] !== undefined)
    : false

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
      <LessonSidebar
        units={units}
        currentLessonId={lesson.id}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 pt-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-[--border] bg-transparent px-3 py-[0.375rem] text-xs font-medium transition-all hover:border-[--primary] hover:bg-black/4 hover:text-[--primary] dark:hover:bg-white/6 sm:text-sm" style={{ color: 'var(--foreground)' }} onClick={() => navigate('/learn/grammar')}>
            <ArrowLeft size={16} /> {language === 'en' ? 'Back' : 'ត្រឡប់'}
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-[--border] bg-transparent px-3 py-[0.375rem] text-xs font-medium transition-all hover:border-[--primary] hover:bg-black/4 hover:text-[--primary] dark:hover:bg-white/6 sm:text-sm lg:hidden" style={{ color: 'var(--foreground)' }} onClick={() => setSidebarOpen(true)}>
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
            <button
              onClick={toggleBookmark}
              disabled={bookmarkPending}
              className="ml-auto inline-flex items-center gap-1 rounded-lg border px-3 py-[0.375rem] text-xs font-medium transition-all sm:text-sm disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                color: isBookmarked ? 'var(--primary)' : 'var(--foreground)',
                borderColor: isBookmarked ? 'var(--primary)' : 'var(--border)',
              }}
            >
              {bookmarkPending ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Bookmark size={14} fill={isBookmarked ? 'var(--primary)' : 'none'} />
              )}
              {isBookmarked
                ? (language === 'en' ? 'Bookmarked' : 'បានចំណាំ')
                : (language === 'en' ? 'Bookmark' : 'ចំណាំ')}
            </button>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{t(lesson.title)}</h1>
        </div>

        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {currentStep === 'lesson' && (
              <motion.div
                key="lesson"
                layout
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
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                {lesson.exercises?.map((ex: any, i: number) => (
                  <ExerciseCard key={ex.id} exercise={ex} index={i} onCorrect={() => {}} onAttempt={handleExerciseAttempt} />
                ))}
                {!exercisesSubmitted && lesson.exercises?.length > 0 && (
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={handleSubmitExercises}
                      disabled={!allExercisesAttempted || submitExercises.isPending}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-[0.625rem] text-[0.9375rem] font-medium text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-500 dark:hover:bg-sky-600"
                    >
                      {submitExercises.isPending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                      {language === 'en' ? 'Submit Exercises' : 'បញ្ជូនលំហាត់'}
                    </button>
                    {!allExercisesAttempted && (
                      <span className="text-xs text-muted">{language === 'en' ? 'Answer all exercises to submit' : 'ឆ្លើយលំហាត់ទាំងអស់ដើម្បីបញ្ជូន'}</span>
                    )}
                  </div>
                )}
                {exercisesSubmitted && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={16} /> {language === 'en' ? 'Exercises submitted' : 'បានបញ្ជូនលំហាត់'}
                  </div>
                )}
              </motion.div>
            )}
            {currentStep === 'homework' && (
              <motion.div
                key="homework"
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <HomeworkSection tasks={lesson.homework ?? []} lessonId={lesson.id} />
              </motion.div>
            )}
            {currentStep === 'quiz' && (
              <motion.div
                key="quiz"
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-8">
                  <QuizCard questions={lesson.quiz ?? []} completed={isCompleted} onComplete={handleQuizComplete} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
  )
}
