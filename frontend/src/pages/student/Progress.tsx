import { useBilingualText, useLanguage } from '../../contexts/LanguageContext'
import { useProgress } from '../../api/progress'
import { useGrammarUnits } from '../../api/grammar'
import { useStories } from '../../api/stories'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Trophy, Flame, BookMarked, Star } from 'lucide-react'
import ProgressBar from '../../components/ui/ProgressBar'

export default function Progress() {
  const t = useBilingualText()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const { data: progressData, isLoading } = useProgress()
  const { data: units } = useGrammarUnits()
  const { data: storiesData } = useStories({ pageSize: 100 })

  if (isLoading) return <div className="py-12 text-center text-muted">Loading progress...</div>

  const progress = progressData?.progress
  const achievements = progressData?.achievements ?? []

  const allLessons = units?.flatMap((u: any) => u.chapters.flatMap((c: any) => c.lessons)) ?? []
  const totalLessons = allLessons.length
  const totalStories = storiesData?.total ?? 0
  const completedCount = progress?.completedLessons?.length ?? 0
  const totalScore = progress ? Object.values(progress.quizScores ?? {}).reduce((a: number, b: unknown) => a + (b as number), 0) : 0

  const unitGroups = units?.map((unit: any) => {
    const unitLessons = unit.chapters.flatMap((c: any) => c.lessons)
    const unitDone = unitLessons.filter((l: any) => progress?.completedLessons?.includes(l.id)).length
    return { title: unit.title, lessonCount: unitLessons.length, doneCount: unitDone }
  }) ?? []

  return (
    <div className="animate-[fadeIn_300ms_ease] py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-[1.875rem] font-bold" style={{ color: 'var(--foreground)' }}>
          {language === 'en' ? 'My Progress' : 'វឌ្ឍនភាពរបស់ខ្ញុំ'}
        </h1>
        <p className="text-[1.0625rem] text-muted">
          {language === 'en' ? 'Track your learning journey' : 'តាមដានដំណើរការរៀនរបស់អ្នក'}
        </p>
      </div>

      <div className="mb-8 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
        <div className="rounded-xl border border-[--border] bg-[--card] p-5 text-center shadow-[--shadow]">
          <BookOpen size={24} className="mx-auto mb-2" style={{ color: 'var(--primary)' }} />
          <div className="mb-1 text-2xl font-bold text-[--primary]">{completedCount}/{totalLessons}</div>
          <div className="text-xs text-muted">{language === 'en' ? 'Lessons' : 'មេរៀន'}</div>
          <div className="mt-2"><ProgressBar value={completedCount} max={totalLessons} /></div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-5 text-center shadow-[--shadow]">
          <BookMarked size={24} className="mx-auto mb-2" style={{ color: 'var(--primary)' }} />
          <div className="mb-1 text-2xl font-bold text-[--primary]">{progress?.completedStories?.length ?? 0}/{totalStories}</div>
          <div className="text-xs text-muted">{language === 'en' ? 'Stories' : 'រឿង'}</div>
          <div className="mt-2"><ProgressBar value={progress?.completedStories?.length ?? 0} max={totalStories} /></div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-5 text-center shadow-[--shadow]">
          <Trophy size={24} className="mx-auto mb-2" style={{ color: 'var(--primary)' }} />
          <div className="mb-1 text-2xl font-bold text-[--primary]">{totalScore}</div>
          <div className="text-xs text-muted">{language === 'en' ? 'Quiz Points' : 'ពិន្ទុ'}</div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-5 text-center shadow-[--shadow]">
          <Flame size={24} className="mx-auto mb-2" style={{ color: 'var(--primary)' }} />
          <div className="mb-1 text-2xl font-bold text-[--primary]">{progress?.streakCount ?? 0}</div>
          <div className="text-xs text-muted">{language === 'en' ? 'Day Streak' : 'ថ្ងៃជាប់'}</div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-5 text-center shadow-[--shadow]">
          <Star size={24} className="mx-auto mb-2" style={{ color: 'var(--primary)' }} />
          <div className="mb-1 text-2xl font-bold text-[--primary]">{progress?.learnedWords?.length ?? 0}</div>
          <div className="text-xs text-muted">{language === 'en' ? 'Words' : 'ពាក្យ'}</div>
        </div>
      </div>

      {progress?.achievements?.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            {language === 'en' ? 'Achievements Unlocked' : 'សមិទ្ធផលបានទទួល'}
          </h2>
          <div className="flex flex-wrap gap-3">
            {achievements.filter((a: any) => progress?.achievements?.includes(a.id)).map((ach: any) => (
              <div key={ach.id} className="flex items-center gap-2 rounded-lg border border-[--border] bg-[--card] px-4 py-2 shadow-[--shadow]">
                <span className="text-xl">{ach.icon}</span>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{t(ach.title as any)}</div>
                  <div className="text-xs text-muted">{t(ach.description as any)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
          {language === 'en' ? 'Lessons Progress' : 'វឌ្ឍនភាពមេរៀន'}
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {unitGroups.map((group: any, i: number) => (
            <div key={i} className="cursor-pointer rounded-xl border border-[--border] bg-[--card] p-6 shadow-[--shadow] transition-all hover:-translate-y-0.5" onClick={() => navigate('/learn/grammar')}>
              <div className="mb-3 flex items-start justify-between gap-4">
                <BookOpen size={20} style={{ color: 'var(--primary)' }} />
                <span className="text-sm text-muted">{group.doneCount}/{group.lessonCount}</span>
              </div>
              <h3 className="mb-2 font-semibold" style={{ color: 'var(--foreground)' }}>{t(group.title as any)}</h3>
              <ProgressBar value={group.doneCount} max={group.lessonCount} />
            </div>
          ))}
        </div>
      </section>

      {progress?.quizScores && Object.keys(progress.quizScores).length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            {language === 'en' ? 'Quiz Scores' : 'ពិន្ទុសំណួរ'}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            {Object.entries(progress.quizScores).map(([lessonId, score]) => {
              const lesson = allLessons.find((l: any) => l.id === lessonId)
              if (!lesson) return null
              return (
                <div key={lessonId} className="cursor-pointer rounded-xl border border-[--border] bg-[--card] p-5 shadow-[--shadow] transition-all hover:-translate-y-0.5" onClick={() => navigate(`/learn/grammar/${lessonId}`)}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{t((lesson as any).title)}</h3>
                    <span className="font-bold" style={{ color: 'var(--primary)' }}>{String(score)}%</span>
                  </div>
                  <ProgressBar value={score as number} />
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
