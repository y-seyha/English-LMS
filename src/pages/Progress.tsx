import { useBilingualText, useLanguage } from '../contexts/LanguageContext'
import { useProgress } from '../contexts/ProgressContext'
import { grammarUnits } from '../data/grammar'
import { stories } from '../data/stories'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import { useNavigate } from 'react-router-dom'
import { BarChart3, BookOpen } from 'lucide-react'

export default function Progress() {
  const t = useBilingualText()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const { progress, completedCount, totalScore } = useProgress()

  const allLessons = grammarUnits.flatMap(u => u.chapters.flatMap(c => c.lessons))
  const totalLessons = allLessons.length
  const totalStories = stories.length

  const unitGroups = grammarUnits.map(unit => {
    const unitLessons = unit.chapters.flatMap(c => c.lessons)
    const unitDone = unitLessons.filter(l => progress.completedLessons.includes(l.id)).length
    return {
      title: unit.title,
      lessonCount: unitLessons.length,
      doneCount: unitDone,
      level: unit.level,
    }
  })

  return (
    <div className="animate-[fadeIn_300ms_ease] py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-[1.875rem] font-bold">{language === 'en' ? 'My Progress' : 'វឌ្ឍនភាពរបស់ខ្ញុំ'}</h1>
        <p className="text-[1.0625rem] text-muted">{language === 'en' ? 'Track your learning journey' : 'តាមដានដំណើរការរៀនរបស់អ្នក'}</p>
      </div>

      <div className="mb-8 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">{completedCount}/{totalLessons}</div>
          <div className="text-sm text-muted">{language === 'en' ? 'Lessons' : 'មេរៀន'}</div>
          <div className="mt-2">
            <ProgressBar value={completedCount} max={totalLessons} />
          </div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">{progress.completedStories.length}/{totalStories}</div>
          <div className="text-sm text-muted">{language === 'en' ? 'Stories' : 'រឿង'}</div>
          <div className="mt-2">
            <ProgressBar value={progress.completedStories.length} max={totalStories} />
          </div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">{totalScore}</div>
          <div className="text-sm text-muted">{language === 'en' ? 'Quiz Points' : 'ពិន្ទុសំណួរ'}</div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">{progress.streakCount}</div>
          <div className="text-sm text-muted">{language === 'en' ? 'Day Streak' : 'ថ្ងៃជាប់គ្នា'}</div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">{progress.learnedWords.length}</div>
          <div className="text-sm text-muted">{language === 'en' ? 'Words Learned' : 'ពាក្យបានរៀន'}</div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">{progress.achievements.length}</div>
          <div className="text-sm text-muted">{language === 'en' ? 'Achievements' : 'សមិទ្ធផល'}</div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">{language === 'en' ? 'Lessons Progress' : 'វឌ្ឍនភាពមេរៀន'}</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {unitGroups.map((group, i) => (
            <div key={i} className="cursor-pointer rounded-xl border border-[--border] bg-[--card] p-6 shadow-[--shadow] transition-all hover:-translate-y-0.5 hover:shadow-[--shadow-md]" onClick={() => navigate('/grammar')}>
              <div className="mb-4 flex items-start justify-between gap-4">
                <BookOpen size={24} style={{ color: 'var(--primary)' }} />
                <span className="text-sm text-muted">{group.doneCount}/{group.lessonCount}</span>
              </div>
              <h3 className="mb-1 text-lg font-semibold">{t(group.title)}</h3>
              <div className="mt-2">
                <ProgressBar value={group.doneCount} max={group.lessonCount} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">{language === 'en' ? 'Quiz Scores' : 'ពិន្ទុសំណួរ'}</h2>
        {Object.keys(progress.quizScores).length === 0 ? (
          <div className="px-6 py-12 text-center text-muted">
            <BarChart3 size={48} className="mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="mb-2 text-lg font-semibold text-[--foreground]">{language === 'en' ? 'No quizzes taken yet' : 'មិនទាន់មានការប្រលងទេ'}</h3>
            <p>{language === 'en' ? 'Complete a lesson with a quiz to see your scores' : 'បំពេញមេរៀនដែលមានសំណួរដើម្បីមើលពិន្ទុរបស់អ្នក'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {Object.entries(progress.quizScores).map(([lessonId, score]) => {
              const lesson = allLessons.find(l => l.id === lessonId)
              if (!lesson) return null
              return (
                <div
                  key={lessonId}
                  className="cursor-pointer rounded-xl border border-[--border] bg-[--card] p-6 shadow-[--shadow] transition-all hover:-translate-y-0.5 hover:shadow-[--shadow-md]"
                  onClick={() => navigate(`/grammar/${lessonId}`)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="mb-1 text-lg font-semibold">{t(lesson.title)}</h3>
                    <span className="font-semibold" style={{ color: 'var(--primary)' }}>{score}%</span>
                  </div>
                  <div className="mt-2">
                    <ProgressBar value={score} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">{language === 'en' ? 'Stories Read' : 'រឿងបានអាន'}</h2>
        {progress.completedStories.length === 0 ? (
          <div className="px-6 py-12 text-center text-muted">
            <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="mb-2 text-lg font-semibold text-[--foreground]">{language === 'en' ? 'No stories read yet' : 'មិនទាន់បានអានរឿងទេ'}</h3>
            <p>{language === 'en' ? 'Start reading stories to improve your comprehension' : 'ចាប់ផ្តើមអានរឿងដើម្បីបង្កើនការយល់ដឹងរបស់អ្នក'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            {progress.completedStories.map(storyId => {
              const story = stories.find(s => s.id === storyId)
              if (!story) return null
              return (
                <div
                  key={storyId}
                  className="cursor-pointer rounded-xl border border-[--border] bg-[--card] p-6 shadow-[--shadow] transition-all hover:-translate-y-0.5 hover:shadow-[--shadow-md]"
                  onClick={() => navigate(`/stories/${storyId}`)}
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <Badge variant={story.level}>{story.level}</Badge>
                  </div>
                  <h3 className="mb-1 text-lg font-semibold">{t(story.title)}</h3>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
