import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useVocabulary } from '../../api/vocabulary'
import { useProgress, useLearnWord } from '../../api/progress'
import { useSpeech } from '../../hooks/useSpeech'
import { Loader2, CheckCircle2, Speaker, Search, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'

export default function VocabularyPage() {
  const { language } = useLanguage()
  const { speak } = useSpeech()
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [page, setPage] = useState(1)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const { data, isLoading } = useVocabulary({
    search: search || undefined,
    level: levelFilter || undefined,
    category: categoryFilter || undefined,
    page, pageSize: 20,
  } as any)
  const { data: progressData } = useProgress()
  const learnWord = useLearnWord()

  const learnedWords = progressData?.progress?.learnedWords ?? []

  const categories = ['general', 'jobs', 'food', 'travel', 'education', 'daily']

  return (
    <div className="animate-[fadeIn_300ms_ease] py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-[1.875rem] font-bold text-black dark:text-white">
          {language === 'en' ? 'Vocabulary' : 'វាក្យសព្ទ'}
        </h1>
        <p className="text-sm text-black/60 dark:text-white/60">
          {language === 'en' ? 'Browse and learn English words' : 'រកមើល និងរៀនពាក្យអង់គ្លេស'}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative w-full max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" />
          <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder={language === 'en' ? 'Search words...' : 'ស្វែងរកពាក្យ...'}
            className="w-full rounded-lg border border-black/10 bg-white py-2 pl-9 pr-3 text-sm text-black outline-none focus:border-black dark:border-white/10 dark:bg-black dark:text-white dark:focus:border-white" />
        </div>
        <select value={levelFilter} onChange={e => { setLevelFilter(e.target.value); setPage(1) }}
          className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black dark:border-white/10 dark:bg-black dark:text-white">
          <option value="">{language === 'en' ? 'All Levels' : 'កម្រិតទាំងអស់'}</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
        </select>
        <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(1) }}
          className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black dark:border-white/10 dark:bg-black dark:text-white">
          <option value="">{language === 'en' ? 'All Categories' : 'ប្រភេទទាំងអស់'}</option>
          {categories.map(c => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 size={32} className="animate-spin text-black/40 dark:text-white/40" />
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="py-12 text-center text-black/60 dark:text-white/60">
          <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
          <p>{language === 'en' ? 'No words found' : 'រកមិនឃើញពាក្យទេ'}</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data?.data?.map((word: any) => {
            const isLearned = learnedWords.includes(word.id)
            const expanded = expandedId === word.id
            return (
              <div key={word.id}
                className={`rounded-xl border border-black/10 bg-white p-4 transition-all dark:border-white/10 dark:bg-black ${expanded ? 'ring-2 ring-black/20 dark:ring-white/20' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-black dark:text-white">{word.word}</h3>
                      {word.pronunciation && (
                        <span className="text-xs text-black/40 dark:text-white/40">/{word.pronunciation}/</span>
                      )}
                      <button onClick={() => speak(word.word)}
                        className="rounded-lg p-1 text-black/40 hover:bg-black/5 hover:text-black dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white">
                        <Speaker size={14} />
                      </button>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      {word.partOfSpeech && (
                        <span className="rounded bg-black/5 px-1.5 py-0.5 text-[11px] font-medium text-black/60 dark:bg-white/10 dark:text-white/60">
                          {word.partOfSpeech}
                        </span>
                      )}
                      <span className={`rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
                        word.level === 'beginner'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                      }`}>{word.level}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isLearned ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 size={14} /> {language === 'en' ? 'Learned' : 'បានរៀន'}
                      </span>
                    ) : (
                      <button onClick={() => learnWord.mutate(word.id)}
                        disabled={learnWord.isPending}
                        className="rounded-lg bg-black/5 px-2 py-1 text-[11px] font-medium text-black/60 hover:bg-black/10 dark:bg-white/10 dark:text-white/60 dark:hover:bg-white/20">
                        {language === 'en' ? 'Mark Learned' : 'សម្គាល់ថាបានរៀន'}
                      </button>
                    )}
                    <button onClick={() => setExpandedId(expanded ? null : word.id)}
                      className="text-black/40 dark:text-white/40">
                      {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-black/70 dark:text-white/70">
                  <p><span className="font-medium">{language === 'en' ? 'Meaning:' : 'អត្ថន័យ៖'}</span> {word.meaning?.en ?? ''}</p>
                  <p className="text-xs text-black/50 dark:text-white/50">{word.meaning?.km ?? ''}</p>
                </div>
                {expanded && (
                  <div className="mt-3 animate-fade-in border-t border-black/10 pt-3 dark:border-white/10">
                    <p className="text-sm text-black/70 dark:text-white/70">
                      <span className="font-medium">{language === 'en' ? 'Example:' : 'ឧទាហរណ៍៖'}</span> {word.example?.en ?? ''}
                    </p>
                    <p className="text-xs text-black/50 dark:text-white/50">{word.example?.km ?? ''}</p>
                    <p className="mt-1 text-xs text-black/40 dark:text-white/40">
                      {language === 'en' ? 'Category:' : 'ប្រភេទ៖'} {word.category}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {data?.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between text-sm text-black/60 dark:text-white/60">
          <span>{language === 'en' ? `Page ${data.page} of ${data.totalPages}` : `ទំព័រ ${data.page} នៃ ${data.totalPages}`}</span>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
              className="rounded-lg border border-black/10 px-3 py-1.5 text-sm disabled:opacity-30 dark:border-white/10">Prev</button>
            <button disabled={page >= (data?.totalPages ?? 1)} onClick={() => setPage(p => p + 1)}
              className="rounded-lg border border-black/10 px-3 py-1.5 text-sm disabled:opacity-30 dark:border-white/10">Next</button>
          </div>
        </div>
      )}
    </div>
  )
}
