import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBilingualText, useLanguage } from '../contexts/LanguageContext'
import { useProgress } from '../contexts/ProgressContext'
import { stories } from '../data/stories'
import Badge from '../components/ui/Badge'
import { useSpeech } from '../hooks/useSpeech'
import { Speaker, Clock } from 'lucide-react'

function QuestionCard({
  question,
  index,
}: {
  question: typeof stories[number]['questions'][number]
  index: number
}) {
  const t = useBilingualText()
  const [selected, setSelected] = useState<string | null>(null)
  const revealed = selected !== null

  return (
    <div className={`mb-3 rounded-xl border bg-[--card] p-6 shadow-[--shadow] ${revealed ? (selected === question.correctAnswer ? 'border-l-3 border-l-emerald-500 dark:border-l-emerald-400' : 'border-l-3 border-l-red-500 dark:border-l-red-400') : 'border-l-3 border-l-blue-600 border-[--border] dark:border-l-sky-500'}`}>
      <p className="mb-4 text-base font-medium leading-relaxed">{index + 1}. {t(question.question)}</p>
      <div className="flex flex-col gap-2">
        {question.options.map((opt, j) => {
          const val = t(opt)
          let cls = 'w-full text-left rounded-lg border px-4 py-3 text-[0.9375rem] transition-all'
          if (revealed) {
            if (val === question.correctAnswer) cls += ' border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-400'
            else if (val === selected) cls += ' border-red-500 bg-red-50 text-red-600 dark:border-red-400 dark:bg-red-900/30 dark:text-red-400'
            else cls += ' border-gray-200 text-gray-500 dark:border-gray-600 dark:text-gray-400'
          } else {
            cls += ' border-gray-200 text-[--foreground] hover:border-blue-500 hover:bg-blue-50 dark:border-gray-600 dark:hover:border-sky-400 dark:hover:bg-sky-900/20'
          }
          return (
            <button key={j} className={cls} onClick={() => { if (!revealed) setSelected(val) }}>
              {val}
            </button>
          )
        })}
      </div>
      {revealed && (
        <div className={`mt-4 rounded-lg border px-4 py-3 text-sm ${selected === question.correctAnswer ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400' : 'border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400'}`}>
          {t(question.explanation)}
        </div>
      )}
    </div>
  )
}

export default function StoryReader() {
  const { storyId } = useParams<{ storyId: string }>()
  const t = useBilingualText()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const { completeStory, getLessonProgress } = useProgress()
  const { speak } = useSpeech()

  const [showTranslation, setShowTranslation] = useState(false)
  const [vocabAnswers, setVocabAnswers] = useState<Record<string, string>>({})
  const [vocabRevealed, setVocabRevealed] = useState<Record<string, boolean>>({})

  const story = stories.find(s => s.id === storyId)

  if (!story) {
    return (
      <div className="animate-[fadeIn_300ms_ease] py-8">
        <div className="px-6 py-12 text-center text-muted">
          <h3 className="mb-2 text-lg font-semibold text-[--foreground]">{language === 'en' ? 'Story not found' : 'រកមិនឃើញរឿងទេ'}</h3>
          <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-[0.625rem] text-[0.9375rem] font-medium text-white transition-all hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-600" onClick={() => navigate('/stories')}>
            {language === 'en' ? 'Back to Stories' : 'ត្រឡប់ទៅរឿងវិញ'}
          </button>
        </div>
      </div>
    )
  }

  const isCompleted = getLessonProgress(story.id) === 'completed'

  const handleVocabSelect = (practiceId: string, value: string) => {
    if (vocabRevealed[practiceId]) return
    setVocabAnswers(prev => ({ ...prev, [practiceId]: value }))
    setVocabRevealed(prev => ({ ...prev, [practiceId]: true }))
  }

  const handleComplete = () => {
    completeStory(story.id)
  }

  return (
    <div className="animate-[fadeIn_300ms_ease] py-8">
      <button className="mb-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-transparent px-3 py-[0.375rem] text-xs font-medium text-[--foreground] transition-all hover:border-blue-500 hover:bg-black/4 hover:text-blue-600 dark:border-gray-600 dark:hover:border-sky-400 dark:hover:bg-white/6 dark:hover:text-sky-400 sm:text-sm" onClick={() => navigate('/stories')}>
        ← {language === 'en' ? 'Back to Stories' : 'ត្រឡប់ទៅរឿងវិញ'}
      </button>

      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          <Badge variant={story.level}>{story.level}</Badge>
          <span className="flex items-center gap-1 text-sm text-muted">
            <Clock size={16} />
            {story.estimatedMinutes} min
          </span>
          {isCompleted && (
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-[0.625rem] py-[0.25rem] text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
              ✓ {language === 'en' ? 'Read' : 'បានអាន'}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold">{t(story.title)}</h1>
      </div>

      <div className="mb-6 rounded-xl border border-[--border] bg-black/2 p-6 leading-relaxed dark:bg-white/2">
        <div className="flex items-start justify-between">
          <p className="whitespace-pre-line text-base">{story.content.en}</p>
          <button className="ml-1 shrink-0 rounded-lg p-[0.375rem] text-muted hover:bg-black/4 hover:text-blue-600 dark:hover:bg-white/6 dark:hover:text-sky-400" onClick={() => speak(story.content.en)} title="Listen">
            <Speaker size={18} />
          </button>
        </div>

        {story.content.km && (
          <div className="mt-4 border-t border-[--border] pt-4 text-[0.9375rem] leading-relaxed text-muted">
            <button
              className="mb-2 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-transparent px-3 py-[0.375rem] text-xs font-medium text-[--foreground] transition-all hover:border-blue-500 hover:bg-black/4 hover:text-blue-600 dark:border-gray-600 dark:hover:border-sky-400 dark:hover:bg-white/6 dark:hover:text-sky-400 sm:text-sm"
              onClick={() => setShowTranslation(!showTranslation)}
            >
              {showTranslation
                ? (language === 'en' ? 'Hide Khmer' : 'លាក់ខ្មែរ')
                : (language === 'en' ? 'Show Khmer Translation' : 'បង្ហាញការបកប្រែជាខ្មែរ')}
            </button>
            {showTranslation && <p className="whitespace-pre-line">{story.content.km}</p>}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">{language === 'en' ? 'Comprehension Questions' : 'សំណួរយល់ដឹង'}</h2>
        {story.questions.map((q, i) => (
          <QuestionCard key={q.id} question={q} index={i} />
        ))}
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">{language === 'en' ? 'Vocabulary Practice' : 'ការអនុវត្តវាក្យសព្ទ'}</h2>
        {story.vocabularyPractice.map(vp => {
          const isRevealed = vocabRevealed[vp.id] ?? false
          const selectedAnswer = vocabAnswers[vp.id]
          const isCorrect = selectedAnswer === vp.correctAnswer

          return (
            <div key={vp.id} className="mb-3 rounded-lg border border-[--border] p-4">
              <p className="mb-3 font-medium">{t(vp.prompt)}</p>
              {vp.options && (
                <div className="flex flex-wrap gap-2">
                  {vp.options.map((opt, i) => {
                    const val = t(opt)
                    let cls = 'rounded-lg border px-4 py-2 text-sm transition-all'
                    if (isRevealed) {
                      if (val === vp.correctAnswer) cls += ' border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-400'
                      else if (val === selectedAnswer) cls += ' border-red-500 bg-red-50 text-red-600 dark:border-red-400 dark:bg-red-900/30 dark:text-red-400'
                      else cls += ' border-gray-200 text-gray-500 dark:border-gray-600 dark:text-gray-400'
                    } else {
                      cls += ' border-gray-200 text-[--foreground] hover:border-blue-500 dark:border-gray-600 dark:hover:border-sky-400'
                    }
                    return (
                      <button
                        key={i}
                        className={cls}
                        onClick={() => handleVocabSelect(vp.id, val)}
                        disabled={isRevealed}
                      >
                        {val}
                      </button>
                    )
                  })}
                </div>
              )}
              {!vp.options && (
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`rounded-lg border px-4 py-2 text-sm transition-all ${isRevealed ? (isCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-400' : 'border-red-500 bg-red-50 text-red-600 dark:border-red-400 dark:bg-red-900/30 dark:text-red-400') : 'border-gray-200 text-[--foreground] hover:border-blue-500 dark:border-gray-600 dark:hover:border-sky-400'}`}
                    onClick={() => handleVocabSelect(vp.id, vp.correctAnswer)}
                    disabled={isRevealed}
                  >
                    {vp.correctAnswer}
                  </button>
                </div>
              )}
              {isRevealed && (
                <div className={`mt-2 rounded-lg border px-4 py-3 text-sm ${isCorrect ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400' : 'border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400'}`}>
                  {t(vp.explanation)}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {!isCompleted && (
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-[0.625rem] text-[0.9375rem] font-medium text-white transition-all hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-600" onClick={handleComplete}>
          {language === 'en' ? 'Mark Story as Read' : 'សម្គាល់ថាបានអានរួចរាល់'}
        </button>
      )}
    </div>
  )
}
