import { useBilingualText, useLanguage } from '../../contexts/LanguageContext'
import { useProgress } from '../../api/progress'
import { useGrammarUnits } from '../../api/grammar'
import { useStories } from '../../api/stories'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Trophy, Flame, BookMarked, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import PageHeader from '@/components/ui/PageHeader'
import StatCard from '@/components/ui/StatCard'
import ProgressBar from '../../components/ui/ProgressBar'

export default function Progress() {
  const t = useBilingualText()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const { data: progressData, isLoading } = useProgress()
  const { data: units } = useGrammarUnits()
  const { data: storiesData } = useStories({ pageSize: 100 })

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

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
    <div className="space-y-8">
      <PageHeader
        title={language === 'en' ? 'My Progress' : 'វឌ្ឍនភាពរបស់ខ្ញុំ'}
        description={language === 'en' ? 'Track your learning journey' : 'តាមដានដំណើរការរៀនរបស់អ្នក'}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-2xl font-bold tracking-tight text-foreground">{completedCount}/{totalLessons}</div>
                <div className="mt-0.5 text-xs font-medium text-muted-foreground">{language === 'en' ? 'Lessons' : 'មេរៀន'}</div>
                <div className="mt-3"><ProgressBar value={completedCount} max={totalLessons} /></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookMarked size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-2xl font-bold tracking-tight text-foreground">{progress?.completedStories?.length ?? 0}/{totalStories}</div>
                <div className="mt-0.5 text-xs font-medium text-muted-foreground">{language === 'en' ? 'Stories' : 'រឿង'}</div>
                <div className="mt-3"><ProgressBar value={progress?.completedStories?.length ?? 0} max={totalStories} /></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <StatCard
          icon={<Trophy size={22} />}
          label={language === 'en' ? 'Quiz Points' : 'ពិន្ទុ'}
          value={totalScore}
        />
        <StatCard
          icon={<Flame size={22} />}
          label={language === 'en' ? 'Day Streak' : 'ថ្ងៃជាប់'}
          value={progress?.streakCount ?? 0}
        />
        <StatCard
          icon={<Star size={22} />}
          label={language === 'en' ? 'Words' : 'ពាក្យ'}
          value={progress?.learnedWords?.length ?? 0}
        />
      </div>

      {progress?.achievements?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            {language === 'en' ? 'Achievements Unlocked' : 'សមិទ្ធផលបានទទួល'}
          </h2>
          <div className="flex flex-wrap gap-3">
            {achievements.filter((a: any) => progress?.achievements?.includes(a.id)).map((ach: any) => (
              <div key={ach.id} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-2.5 shadow-card">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-xl">{ach.icon}</span>
                <div>
                  <div className="text-sm font-medium text-foreground">{t(ach.title as any)}</div>
                  <div className="text-xs text-muted-foreground">{t(ach.description as any)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          {language === 'en' ? 'Lessons Progress' : 'វឌ្ឍនភាពមេរៀន'}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {unitGroups.map((group: any, i: number) => (
            <Card key={i} onClick={() => navigate('/learn/grammar')}
              className="cursor-pointer p-6 transition-all hover:-translate-y-0.5 hover:shadow-card-md">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen size={20} />
                </div>
                <span className="text-sm text-muted-foreground">{group.doneCount}/{group.lessonCount}</span>
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{t(group.title as any)}</h3>
              <ProgressBar value={group.doneCount} max={group.lessonCount} />
            </Card>
          ))}
        </div>
      </section>

      {progress?.quizScores && Object.keys(progress.quizScores).length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            {language === 'en' ? 'Quiz Scores' : 'ពិន្ទុសំណួរ'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(progress.quizScores).map(([lessonId, score]) => {
              const lesson = allLessons.find((l: any) => l.id === lessonId)
              if (!lesson) return null
              return (
                <Card key={lessonId} onClick={() => navigate(`/learn/grammar/${lessonId}`)}
                  className="cursor-pointer p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-md">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-foreground">{t((lesson as any).title)}</h3>
                    <span className="shrink-0 font-bold text-primary">{String(score)}%</span>
                  </div>
                  <ProgressBar value={score as number} />
                </Card>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
