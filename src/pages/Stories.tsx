import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBilingualText, useLanguage } from '../contexts/LanguageContext'
import { useProgress } from '../contexts/ProgressContext'
import { stories } from '../data/stories'
import Badge from '../components/ui/Badge'
import { Clock } from 'lucide-react'
import type { StoryLevel } from '../types'

const levels: StoryLevel[] = ['A1', 'A2', 'B1']

export default function Stories() {
  const t = useBilingualText()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const { getLessonProgress } = useProgress()

  const [levelFilter, setLevelFilter] = useState<StoryLevel | 'all'>('all')

  const filtered = useMemo(() => {
    if (levelFilter === 'all') return stories
    return stories.filter(s => s.level === levelFilter)
  }, [levelFilter])

  return (
    <div className="animate-[fadeIn_300ms_ease] py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-[1.875rem] font-bold">{language === 'en' ? 'Reading Stories' : 'រឿងសម្រាប់អាន'}</h1>
        <p className="text-[1.0625rem] text-muted">{language === 'en' ? 'Improve your reading with fun stories' : 'បង្កើនជំនាញអានរបស់អ្នកជាមួយរឿងកម្សាន្ត'}</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all sm:text-sm ${levelFilter === 'all' ? 'border-blue-600 bg-blue-600 text-white dark:border-sky-500 dark:bg-sky-500' : 'border-gray-200 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-sky-400 dark:hover:text-sky-400'}`}
            onClick={() => setLevelFilter('all')}
          >
            {language === 'en' ? 'All Levels' : 'គ្រប់កម្រិត'}
          </button>
          {levels.map(level => (
            <button
              key={level}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all sm:text-sm ${levelFilter === level ? 'border-blue-600 bg-blue-600 text-white dark:border-sky-500 dark:bg-sky-500' : 'border-gray-200 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-sky-400 dark:hover:text-sky-400'}`}
            onClick={() => setLevelFilter(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {filtered.map(story => {
          const isCompleted = getLessonProgress(story.id) === 'completed'
          return (
            <div
              key={story.id}
              className="cursor-pointer rounded-xl border border-[--border] bg-[--card] p-6 shadow-[--shadow] transition-all hover:-translate-y-0.5 hover:shadow-[--shadow-md]"
              onClick={() => navigate(`/stories/${story.id}`)}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <Badge variant={story.level}>{story.level}</Badge>
                <span className="flex items-center gap-1 text-sm text-muted">
                  <Clock size={14} />
                  {story.estimatedMinutes} min
                </span>
              </div>
              <h3 className="mb-1 text-lg font-semibold">{t(story.title)}</h3>
              <p className="mt-2 text-sm text-muted">
                {story.questions.length} {language === 'en' ? 'questions' : 'សំណួរ'} · {story.vocabularyPractice.length} {language === 'en' ? 'vocab' : 'វាក្យសព្ទ'}
              </p>
              {isCompleted && (
                <span className="mt-2 inline-flex items-center rounded-full bg-green-500/10 px-[0.625rem] py-[0.25rem] text-xs font-medium text-[--success]">
                  ✓ {language === 'en' ? 'Read' : 'បានអាន'}
                </span>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="col-span-full px-6 py-12 text-center text-muted">
            <h3 className="mb-2 text-lg font-semibold text-[--foreground]">{language === 'en' ? 'No stories found' : 'រកមិនឃើញរឿងទេ'}</h3>
            <p>{language === 'en' ? 'Try a different level' : 'សាកល្បងកម្រិតផ្សេង'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
