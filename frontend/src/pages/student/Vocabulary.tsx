import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useVocabulary } from '../../api/vocabulary'
import { useProgress, useLearnWord } from '../../api/progress'
import { useSpeech } from '../../hooks/useSpeech'
import { CheckCircle2, Speaker, Search, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import PageHeader from '@/components/ui/PageHeader'
import EmptyState from '@/components/ui/EmptyState'
import Pagination from '../../components/ui/Pagination'

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
    <div className="space-y-8">
      <PageHeader
        title={language === 'en' ? 'Vocabulary' : 'វាក្យសព្ទ'}
        description={language === 'en' ? 'Browse and learn English words' : 'រកមើល និងរៀនពាក្យអង់គ្លេស'}
      />

      <div className="flex flex-wrap gap-3">
        <div className="relative w-full max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder={language === 'en' ? 'Search words...' : 'ស្វែងរកពាក្យ...'}
            className="flex h-9 w-full rounded-lg border border-input bg-card py-2 pl-9 pr-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
        <select value={levelFilter} onChange={e => { setLevelFilter(e.target.value); setPage(1) }}
          className="flex h-9 rounded-lg border border-input bg-card px-3 py-1 text-sm text-foreground shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring">
          <option value="">{language === 'en' ? 'All Levels' : 'កម្រិតទាំងអស់'}</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
        </select>
        <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(1) }}
          className="flex h-9 rounded-lg border border-input bg-card px-3 py-1 text-sm text-foreground shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring">
          <option value="">{language === 'en' ? 'All Categories' : 'ប្រភេទទាំងអស់'}</option>
          {categories.map(c => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      ) : data?.data?.length === 0 ? (
        <EmptyState
          icon={<BookOpen size={24} />}
          title={language === 'en' ? 'No words found' : 'រកមិនឃើញពាក្យទេ'}
          description={language === 'en' ? 'Try a different search or filter.' : 'សូមសាកល្បងស្វែងរក ឬត្រងផ្សេង។'}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.data?.map((word: any) => {
            const isLearned = learnedWords.includes(word.id)
            const expanded = expandedId === word.id
            return (
              <Card key={word.id}
                className={`p-5 transition-all ${expanded ? 'ring-2 ring-primary/30' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-foreground">{word.word}</h3>
                      {word.pronunciation && (
                        <span className="text-xs text-muted-foreground">/{word.pronunciation}/</span>
                      )}
                      <button onClick={() => speak(word.word)}
                        aria-label={`Speak ${word.word}`}
                        className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <Speaker size={14} />
                      </button>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {word.partOfSpeech && (
                        <span className="rounded-full bg-muted/25 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {word.partOfSpeech}
                        </span>
                      )}
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        word.level === 'beginner'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-warning/10 text-warning'
                      }`}>{word.level}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    {isLearned ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-success">
                        <CheckCircle2 size={14} /> {language === 'en' ? 'Learned' : 'បានរៀន'}
                      </span>
                    ) : (
                      <Button variant="secondary" size="sm"
                        onClick={() => learnWord.mutate(word.id)}
                        disabled={learnWord.isPending}>
                        {language === 'en' ? 'Mark Learned' : 'សម្គាល់ថាបានរៀន'}
                      </Button>
                    )}
                    <Button variant="ghost" size="icon-sm"
                      onClick={() => setExpandedId(expanded ? null : word.id)}
                      aria-label={expanded ? 'Collapse' : 'Expand'}>
                      {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                  </div>
                </div>
                <div className="mt-2 space-y-0.5 text-sm text-foreground">
                  <p><span className="font-medium">{language === 'en' ? 'Meaning:' : 'អត្ថន័យ៖'}</span> {word.meaning?.en ?? ''}</p>
                  <p className="text-xs text-muted-foreground">{word.meaning?.km ?? ''}</p>
                </div>
                {expanded && (
                  <div className="mt-3 animate-fade-in">
                    <Separator className="mb-3" />
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{language === 'en' ? 'Example:' : 'ឧទាហរណ៍៖'}</span> {word.example?.en ?? ''}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{word.example?.km ?? ''}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {language === 'en' ? 'Category:' : 'ប្រភេទ៖'} {word.category}
                    </p>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {data?.totalPages && data.totalPages > 1 && (
        <Pagination
          page={data?.page ?? 1}
          totalPages={data?.totalPages ?? 1}
          total={data?.total ?? 0}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
