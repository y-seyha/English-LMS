import { useNavigate } from 'react-router-dom'
import { useBilingualText, useLanguage } from '../../contexts/LanguageContext'
import { useBookmarks, useRemoveBookmark } from '../../api/bookmarks'
import { useGrammarUnits } from '../../api/grammar'
import { useStories } from '../../api/stories'
import { BookOpen, BookMarked, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-black">
      <div className="mb-3 h-5 w-5 rounded bg-black/10 dark:bg-white/10" />
      <div className="mb-2 h-5 w-3/4 rounded bg-black/10 dark:bg-white/10" />
      <div className="h-3 w-16 rounded bg-black/10 dark:bg-white/10" />
    </div>
  )
}

export default function Bookmarks() {
  const t = useBilingualText()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const { data: bookmarks, isLoading } = useBookmarks()
  const { data: units } = useGrammarUnits()
  const { data: storiesData } = useStories({ pageSize: 100 })
  const removeBookmark = useRemoveBookmark()

  const allLessons = units?.flatMap((u: any) => u.chapters.flatMap((c: any) => c.lessons)) ?? []
  const allStories = storiesData?.data ?? []

  const getLesson = (id: string) => allLessons.find((l: any) => l.id === id)
  const getStory = (id: string) => allStories.find((s: any) => s.id === id)

  const handleRemove = async (e: React.MouseEvent, bmId: string) => {
    e.stopPropagation()
    toast.promise(removeBookmark.mutateAsync(bmId), {
      loading: language === 'en' ? 'Removing bookmark...' : 'កំពុងលុបចំណាំ...',
      success: language === 'en' ? 'Bookmark removed' : 'បានលុបចំណាំ',
      error: language === 'en' ? 'Failed to remove bookmark' : 'មិនអាចលុបចំណាំបានទេ',
    })
  }

  return (
    <div className="animate-[fadeIn_300ms_ease] py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-[1.875rem] font-bold" style={{ color: 'var(--foreground)' }}>
          {language === 'en' ? 'My Bookmarks' : 'ចំណាំរបស់ខ្ញុំ'}
        </h1>
        <p className="text-[1.0625rem] text-muted">
          {language === 'en' ? 'Saved lessons and stories' : 'មេរៀន និងរឿងដែលបានចំណាំ'}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          <SkeletonCard key="sk1" />
          <SkeletonCard key="sk2" />
          <SkeletonCard key="sk3" />
          <SkeletonCard key="sk4" />
        </div>
      ) : bookmarks?.length === 0 ? (
        <div className="py-12 text-center">
          <BookMarked size={48} className="mx-auto mb-4" style={{ color: 'var(--muted)' }} />
          <p className="text-muted">{language === 'en' ? 'No bookmarks yet. Save lessons and stories to revisit later.' : 'មិនទាន់មានចំណាំទេ'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          {bookmarks?.map((bm: any) => {
            const lesson = bm.targetType === 'lesson' ? getLesson(bm.targetId) : null
            const story = bm.targetType === 'story' ? getStory(bm.targetId) : null
            const item = lesson ?? story
            if (!item) return null

            const isDeleting = removeBookmark.isPending && removeBookmark.variables === bm._id

            return (
              <div
                key={bm._id}
                className={`group relative cursor-pointer rounded-xl border border-[--border] bg-[--card] p-5 shadow-[--shadow] transition-all hover:-translate-y-0.5 hover:shadow-[--shadow-md] ${isDeleting ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => navigate(bm.targetType === 'lesson' ? `/learn/grammar/${bm.targetId}` : `/learn/stories/${bm.targetId}`)}
              >
                <button
                  onClick={(e) => handleRemove(e, bm._id)}
                  disabled={isDeleting}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:bg-red-50 group-hover:opacity-100 dark:hover:bg-red-950/30 disabled:opacity-100"
                >
                  {isDeleting ? <Loader2 size={14} className="animate-spin text-red-500" /> : <Trash2 size={14} className="text-red-500" />}
                </button>
                <div className="mb-3">
                  {bm.targetType === 'lesson' ? <BookOpen size={20} style={{ color: 'var(--primary)' }} /> : <BookMarked size={20} style={{ color: 'var(--primary)' }} />}
                </div>
                <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>{t(item.title)}</h3>
                <span className="text-xs text-muted">
                  {bm.targetType === 'lesson' ? (language === 'en' ? 'Lesson' : 'មេរៀន') : (language === 'en' ? 'Story' : 'រឿង')}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
