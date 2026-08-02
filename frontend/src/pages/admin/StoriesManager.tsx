import { useState } from 'react'
import { useBilingualText, useLanguage } from '../../contexts/LanguageContext'
import { useStories, useDeleteStory } from '../../api/stories'
import AdminLayout from '../../components/layout/AdminLayout'
import SearchInput from '../../components/ui/SearchInput'
import Badge from '../../components/ui/Badge'
import { Button } from '@/components/ui/button'
import EmptyState from '@/components/ui/EmptyState'
import PageHeader from '@/components/ui/PageHeader'
import Spinner from '@/components/ui/Spinner'
import StoryFormModal from './StoryFormModal'
import ConfirmDelete from './ConfirmDelete'
import { Plus, Trash2, Pencil, Eye, BookMarked } from 'lucide-react'
import { showSuccess, showError } from '../../utils/toast'
import DetailModal from '../../components/ui/DetailModal'

export default function StoriesManager() {
  const t = useBilingualText()
  const { language } = useLanguage()
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)
  const [deleteItem, setDeleteItem] = useState<any>(null)
  const [detailItem, setDetailItem] = useState<any>(null)

  const { data, isLoading } = useStories({ search, pageSize: 100 })
  const deleteStory = useDeleteStory()

  const handleDelete = async () => {
    if (!deleteItem) return
    try {
      await deleteStory.mutateAsync(deleteItem.id)
      showSuccess(language === 'en' ? 'Story deleted' : 'បានលុបរឿង')
      setDeleteItem(null)
    } catch {
      showError(language === 'en' ? 'Failed to delete story' : 'មិនអាចលុបរឿងបានទេ')
    }
  }

  return (
    <AdminLayout>
      <PageHeader
        title={language === 'en' ? 'Stories Manager' : 'គ្រប់គ្រងរឿង'}
        description={language === 'en' ? 'Create and manage reading stories for students' : 'បង្កើត និងគ្រប់គ្រងរឿងសម្រាប់សិស្ស'}
      >
        <Button onClick={() => { setEditItem(null); setModalOpen(true) }}>
          <Plus size={16} /> {language === 'en' ? 'New Story' : 'រឿងថ្មី'}
        </Button>
      </PageHeader>

      <div className="mb-4 max-w-xs">
        <SearchInput value={search} onChange={setSearch} placeholder={language === 'en' ? 'Search stories...' : 'ស្វែងរក...'} />
      </div>

      {isLoading ? (
        <Spinner />
      ) : data?.data?.length === 0 ? (
        <EmptyState
          icon={<BookMarked size={24} />}
          title={language === 'en' ? 'No stories found' : 'រកមិនឃើញរឿងទេ'}
          description={language === 'en' ? 'Try adjusting your search or create a new story' : 'សាកល្បងផ្លាស់ប្តូរការស្វែងរក ឬបង្កើតរឿងថ្មី'}
        />
      ) : (
        <div className="space-y-2">
          {data?.data?.map((story: any) => (
            <div key={story.id} className="flex items-center justify-between rounded-xl border bg-card px-5 py-4 shadow-card transition-colors hover:bg-accent/50">
              <div className="flex items-center gap-3">
                <Badge variant={story.level}>{story.level}</Badge>
                <span className="font-medium text-foreground">{t(story.title)}</span>
                <span className="text-xs text-muted-foreground">{story.estimatedMinutes} min</span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon-sm" className="text-muted-foreground" onClick={() => setDetailItem(story)}>
                  <Eye size={14} />
                </Button>
                <Button variant="ghost" size="icon-sm" className="text-muted-foreground" onClick={() => { setEditItem(story); setModalOpen(true) }}>
                  <Pencil size={14} />
                </Button>
                <Button variant="ghost" size="icon-sm" className="text-destructive hover:bg-destructive/10" onClick={() => setDeleteItem(story)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <DetailModal
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        title={detailItem ? (language === 'en' ? `Story: ${detailItem.title?.en ?? ''}` : `រឿង: ${detailItem.title?.km ?? ''}`) : ''}
        data={detailItem as Record<string, unknown>}
      />
      <StoryFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditItem(null) }}
        initialData={editItem}
      />
      <ConfirmDelete
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        busy={deleteStory.isPending}
        title={language === 'en' ? `Delete "${deleteItem?.title?.en ?? ''}"?` : `លុប "${deleteItem?.title?.km ?? ''}"?`}
      />
    </AdminLayout>
  )
}
