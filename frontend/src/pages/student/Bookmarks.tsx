import { useNavigate } from 'react-router-dom'
import { useBilingualText, useLanguage } from '../../contexts/LanguageContext'
import { useBookmarks, useRemoveBookmark } from '../../api/bookmarks'
import { useGrammarUnits } from '../../api/grammar'
import { useStories } from '../../api/stories'
import { BookOpen, BookMarked, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import PageHeader from '@/components/ui/PageHeader'
import EmptyState from '@/components/ui/EmptyState'

function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-xl border bg-card p-5 shadow-card">
      <Skeleton className="h-5 w-5 rounded-lg" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-16" />
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
    <div className="space-y-8">
      <PageHeader
        title={language === 'en' ? 'My Bookmarks' : 'ចំណាំរបស់ខ្ញុំ'}
        description={language === 'en' ? 'Saved lessons and stories' : 'មេរៀន និងរឿងដែលបានចំណាំ'}
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : bookmarks?.length === 0 ? (
        <EmptyState
          icon={<BookMarked size={24} />}
          title={language === 'en' ? 'No bookmarks yet' : 'មិនទាន់មានចំណាំទេ'}
          description={language === 'en'
            ? 'Save lessons and stories to revisit later.'
            : 'ចំណាំមេរៀន និងរឿង ដើម្បីត្រលប់មកមើលវិញនៅពេលក្រោយ។'}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks?.map((bm: any) => {
            const lesson = bm.targetType === 'lesson' ? getLesson(bm.targetId) : null
            const story = bm.targetType === 'story' ? getStory(bm.targetId) : null
            const item = lesson ?? story
            if (!item) return null

            const isDeleting = removeBookmark.isPending && removeBookmark.variables === bm._id

            return (
              <Card
                key={bm._id}
                className={`group relative cursor-pointer p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-md ${isDeleting ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => navigate(bm.targetType === 'lesson' ? `/learn/grammar/${bm.targetId}` : `/learn/stories/${bm.targetId}`)}
              >
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={(e) => handleRemove(e, bm._id)}
                  disabled={isDeleting}
                  aria-label={language === 'en' ? 'Remove bookmark' : 'លុបចំណាំ'}
                  className="absolute right-2.5 top-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  {isDeleting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </Button>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {bm.targetType === 'lesson' ? <BookOpen size={20} /> : <BookMarked size={20} />}
                </div>
                <h3 className="mb-1 font-semibold text-foreground">{t(item.title)}</h3>
                <span className="text-xs text-muted-foreground">
                  {bm.targetType === 'lesson' ? (language === 'en' ? 'Lesson' : 'មេរៀន') : (language === 'en' ? 'Story' : 'រឿង')}
                </span>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
