import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBilingualText, useLanguage } from '../../contexts/LanguageContext'
import { useStories, useDeleteStory } from '../../api/stories'
import AdminLayout from '../../components/layout/AdminLayout'
import SearchInput from '../../components/ui/SearchInput'
import Badge from '../../components/ui/Badge'
import StoryFormModal from './StoryFormModal'
import ConfirmDelete from './ConfirmDelete'
import { ArrowLeft, Plus, Loader2, Trash2, Pencil, Eye } from 'lucide-react'
import { showSuccess, showError } from '../../utils/toast'
import DetailModal from '../../components/ui/DetailModal'

export default function StoriesManager() {
  const t = useBilingualText()
  const { language } = useLanguage()
  const navigate = useNavigate()
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <button onClick={() => navigate('/admin')} className="mb-2 inline-flex items-center gap-1 text-sm text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white">
            <ArrowLeft size={14} /> {language === 'en' ? 'Back to Dashboard' : 'ត្រឡប់'}
          </button>
          <h1 className="text-[1.875rem] font-bold text-black dark:text-white">
            {language === 'en' ? 'Stories Manager' : 'គ្រប់គ្រងរឿង'}
          </h1>
        </div>
        <button onClick={() => { setEditItem(null); setModalOpen(true) }}
          className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80">
          <Plus size={16} /> {language === 'en' ? 'New Story' : 'រឿងថ្មី'}
        </button>
      </div>

      <div className="mb-4 max-w-xs">
        <SearchInput value={search} onChange={setSearch} placeholder={language === 'en' ? 'Search stories...' : 'ស្វែងរក...'} />
      </div>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 size={32} className="animate-spin text-black/40 dark:text-white/40" />
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="py-12 text-center text-black/60 dark:text-white/60">
          {language === 'en' ? 'No stories found' : 'រកមិនឃើញរឿងទេ'}
        </div>
      ) : (
        <div className="space-y-2">
          {data?.data?.map((story: any) => (
            <div key={story.id} className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-black">
              <div className="flex items-center gap-3">
                <Badge variant={story.level}>{story.level}</Badge>
                <span className="font-medium text-black dark:text-white">{t(story.title)}</span>
                <span className="text-xs text-black/40 dark:text-white/40">{story.estimatedMinutes} min</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setDetailItem(story)}
                  className="rounded-lg p-1.5 text-black/30 hover:bg-black/5 hover:text-black dark:text-white/30 dark:hover:bg-white/10 dark:hover:text-white">
                  <Eye size={14} />
                </button>
                <button onClick={() => { setEditItem(story); setModalOpen(true) }}
                  className="rounded-lg p-1.5 text-black/40 hover:bg-black/5 hover:text-black dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white">
                  <Pencil size={14} />
                </button>
                <button onClick={() => setDeleteItem(story)}
                  className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30">
                  <Trash2 size={14} />
                </button>
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
