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
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import EmptyState from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/skeleton'
import PageHeader from '@/components/ui/PageHeader'
import { cn } from '@/lib/utils'

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
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024)
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
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
        <aside className="hidden space-y-3 lg:block">
          {[0, 1, 2, 3].map(i => (
            <Skeleton key={i} className="h-8 rounded-lg" />
          ))}
        </aside>
        <div className="min-w-0 space-y-6 pt-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-9 w-2/3" />
          </div>
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="animate-fade-in py-8">
        <EmptyState
          icon={<BookOpen size={24} />}
          title={language === 'en' ? 'Lesson not found' : 'រកមិនឃើញមេរៀនទេ'}
          action={
            <Button variant="outline" onClick={() => navigate('/learn/grammar')}>
              {language === 'en' ? 'Back to Lessons' : 'ត្រឡប់ទៅមេរៀនវិញ'}
            </Button>
          }
        />
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <LessonSidebar
        units={units}
        currentLessonId={lesson.id}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 pt-4">
        <div className="mb-4 flex items-center gap-1">
          <Button variant="ghost" onClick={() => navigate('/learn/grammar')}>
            <ArrowLeft size={16} /> {language === 'en' ? 'Back' : 'ត្រឡប់'}
          </Button>
          <Button variant="ghost" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={16} /> {language === 'en' ? 'Lessons' : 'មេរៀន'}
          </Button>
        </div>

        <PageHeader
          title={t(lesson.title)}
          description={
            language === 'en'
              ? `Lesson ${lesson.estimatedMinutes ?? 0} min · ${lesson.level === 'beginner' ? 'Beginner' : 'Intermediate'} level`
              : `មេរៀន ${lesson.estimatedMinutes ?? 0} នាទី · កម្រិត${lesson.level === 'beginner' ? 'ដំបូង' : 'មធ្យម'}`
          }
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={lesson.level}>
              {lesson.level === 'beginner' ? 'Beginner' : 'Intermediate'}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock size={16} /> {lesson.estimatedMinutes} min
            </span>
            {isCompleted && (
              <Badge variant="success">
                <CheckCircle2 size={14} />
                {language === 'en' ? 'Completed' : 'បានបញ្ចប់'}
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleBookmark}
              disabled={bookmarkPending}
              className={cn('ml-1', isBookmarked && 'border-primary text-primary hover:text-primary')}
            >
              {bookmarkPending ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
              )}
              {isBookmarked
                ? (language === 'en' ? 'Bookmarked' : 'បានចំណាំ')
                : (language === 'en' ? 'Bookmark' : 'ចំណាំ')}
            </Button>
          </div>
        </PageHeader>

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
                    <Button
                      onClick={handleSubmitExercises}
                      disabled={!allExercisesAttempted || submitExercises.isPending}
                    >
                      {submitExercises.isPending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                      {language === 'en' ? 'Submit Exercises' : 'បញ្ជូនលំហាត់'}
                    </Button>
                    {!allExercisesAttempted && (
                      <span className="text-xs text-muted-foreground">{language === 'en' ? 'Answer all exercises to submit' : 'ឆ្លើយលំហាត់ទាំងអស់ដើម្បីបញ្ជូន'}</span>
                    )}
                  </div>
                )}
                {exercisesSubmitted && (
                  <Alert variant="success" className="mt-4">
                    <CheckCircle2 />
                    <AlertDescription>
                      {language === 'en' ? 'Exercises submitted' : 'បានបញ្ជូនលំហាត់'}
                    </AlertDescription>
                  </Alert>
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
