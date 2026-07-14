import { useNavigate } from 'react-router-dom'
import { useBilingualText, useLanguage } from '../contexts/LanguageContext'
import { useProgress } from '../contexts/ProgressContext'
import { grammarUnits } from '../data/grammar'
import { BookOpen, BarChart3, BookMarked } from 'lucide-react'
import Badge from '../components/ui/Badge'

export default function Home() {
  const t = useBilingualText()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const { progress, completedCount, totalScore } = useProgress()

  const totalLessons = grammarUnits.reduce((sum, u) =>
    sum + u.chapters.reduce((cs, c) => cs + c.lessons.length, 0), 0
  )

  const unitGroups = grammarUnits.map(unit => ({
    title: unit.title,
    level: unit.level,
    lessonCount: unit.chapters.reduce((cs, c) => cs + c.lessons.length, 0),
  }))

  return (
    <div className="animate-[fadeIn_300ms_ease] py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-[1.875rem] font-bold">{language === 'en' ? 'Welcome to EnglishEase' : 'សូមស្វាគមន៍មកកាន់ EnglishEase'}</h1>
        <p className="text-[1.0625rem] text-muted">{language === 'en' ? 'Learn English step by step with Khmer translations' : 'រៀនភាសាអង់គ្លេសជាជំហានៗជាមួយការបកប្រែជាភាសាខ្មែរ'}</p>
      </div>

      <div className="mb-8 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">{completedCount}</div>
          <div className="text-sm text-muted">{language === 'en' ? 'Lessons Done' : 'មេរៀនបានរៀន'}</div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">{totalLessons}</div>
          <div className="text-sm text-muted">{language === 'en' ? 'Total Lessons' : 'មេរៀនសរុប'}</div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">{totalScore}</div>
          <div className="text-sm text-muted">{language === 'en' ? 'Quiz Score' : 'ពិន្ទុសំណួរ'}</div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">{progress.streakCount}</div>
          <div className="text-sm text-muted">{language === 'en' ? 'Day Streak' : 'ថ្ងៃជាប់គ្នា'}</div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">{language === 'en' ? 'Learning Units' : 'មេរៀន'}</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {unitGroups.map((group, i) => (
            <div
              key={i}
              className="cursor-pointer rounded-xl border border-[--border] bg-[--card] p-6 shadow-[--shadow] transition-all hover:-translate-y-0.5 hover:shadow-[--shadow-md]"
              onClick={() => navigate('/grammar')}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <BookOpen size={24} style={{ color: 'var(--primary)' }} />
                <Badge variant={group.level}>
                  {group.level === 'beginner' ? (language === 'en' ? 'Beginner' : 'កម្រិតដំបូង') : (language === 'en' ? 'Intermediate' : 'កម្រិតមធ្យម')}
                </Badge>
              </div>
              <h3 className="mb-1 text-lg font-semibold">{t(group.title)}</h3>
              <p className="text-sm text-muted">{group.lessonCount} {language === 'en' ? 'lessons' : 'មេរៀន'}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">{language === 'en' ? 'Quick Actions' : 'សកម្មភាពរហ័ស'}</h2>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg bg-[--primary] px-5 py-[0.625rem] text-[0.9375rem] font-medium text-white transition-all hover:bg-[--primary-hover]" onClick={() => navigate('/grammar')}>
            <BookOpen size={18} /> {language === 'en' ? 'Start Learning' : 'ចាប់ផ្តើមរៀន'}
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-[--border] bg-transparent px-5 py-[0.625rem] text-[0.9375rem] font-medium text-[--foreground] transition-all hover:border-[--primary] hover:bg-black/4 hover:text-[--primary] dark:hover:bg-white/6" onClick={() => navigate('/stories')}>
            <BookMarked size={18} /> {language === 'en' ? 'Read Stories' : 'អានរឿង'}
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-[--border] bg-transparent px-5 py-[0.625rem] text-[0.9375rem] font-medium text-[--foreground] transition-all hover:border-[--primary] hover:bg-black/4 hover:text-[--primary] dark:hover:bg-white/6" onClick={() => navigate('/progress')}>
            <BarChart3 size={18} /> {language === 'en' ? 'My Progress' : 'វឌ្ឍនភាពរបស់ខ្ញុំ'}
          </button>
        </div>
      </section>
    </div>
  )
}
