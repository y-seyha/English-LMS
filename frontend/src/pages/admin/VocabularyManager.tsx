import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { useVocabulary, useDeleteVocabulary } from '../../api/vocabulary'
import AdminLayout from '../../components/layout/AdminLayout'
import SearchInput from '../../components/ui/SearchInput'
import Pagination from '../../components/ui/Pagination'
import VocabularyFormModal from './VocabularyFormModal'
import ConfirmDelete from './ConfirmDelete'
import { ArrowLeft, Plus, Loader2, Trash2, Pencil, Eye } from 'lucide-react'
import { showSuccess, showError } from '../../utils/toast'
import DetailModal from '../../components/ui/DetailModal'

export default function VocabularyManager() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [levelFilter, setLevelFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)
  const [deleteItem, setDeleteItem] = useState<any>(null)
  const [detailItem, setDetailItem] = useState<any>(null)

  const { data, isLoading } = useVocabulary({ search, page, pageSize: 50, level: levelFilter || undefined } as any)
  const deleteVocab = useDeleteVocabulary()

  const handleDelete = async () => {
    if (!deleteItem) return
    try {
      await deleteVocab.mutateAsync(deleteItem.id)
      showSuccess(language === 'en' ? 'Word deleted' : 'បានលុបពាក្យ')
      setDeleteItem(null)
    } catch {
      showError(language === 'en' ? 'Failed to delete word' : 'មិនអាចលុបពាក្យបានទេ')
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
            {language === 'en' ? 'Vocabulary Manager' : 'គ្រប់គ្រងវាក្យសព្ទ'}
          </h1>
        </div>
        <button onClick={() => { setEditItem(null); setModalOpen(true) }}
          className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80">
          <Plus size={16} /> {language === 'en' ? 'New Word' : 'ពាក្យថ្មី'}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="w-full max-w-xs">
          <SearchInput value={search} onChange={setSearch} placeholder={language === 'en' ? 'Search words...' : 'ស្វែងរក...'} />
        </div>
        <div className="flex gap-2">
          {['', 'beginner', 'intermediate'].map(l => (
            <button key={l} onClick={() => { setLevelFilter(l); setPage(1) }}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                levelFilter === l
                  ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                  : 'border-black/20 text-black/60 hover:bg-black/5 dark:border-white/20 dark:text-white/60 dark:hover:bg-white/10'
              }`}
            >
              {l || (language === 'en' ? 'All' : 'ទាំងអស់')}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 size={32} className="animate-spin text-black/40 dark:text-white/40" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">{language === 'en' ? 'Word' : 'ពាក្យ'}</th>
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">{language === 'en' ? 'Pronunciation' : 'ការបញ្ចេញសំឡេង'}</th>
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">{language === 'en' ? 'Part of Speech' : 'ថ្នាក់ពាក្យ'}</th>
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white hidden md:table-cell">{language === 'en' ? 'Meaning' : 'អត្ថន័យ'}</th>
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">{language === 'en' ? 'Level' : 'កម្រិត'}</th>
                  <th className="px-4 py-3 text-right font-medium text-black dark:text-white">{language === 'en' ? 'Actions' : 'សកម្មភាព'}</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((word: any) => (
                  <tr key={word.id} className="border-b border-black/10 last:border-0 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5">
                    <td className="px-4 py-3 font-medium text-black dark:text-white">{word.word}</td>
                    <td className="px-4 py-3 text-black/60 dark:text-white/60">{word.pronunciation}</td>
                    <td className="px-4 py-3 text-black/60 dark:text-white/60">{word.partOfSpeech}</td>
                    <td className="px-4 py-3 text-black/60 dark:text-white/60 hidden md:table-cell">{word.meaning?.en}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        word.level === 'beginner'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                      }`}>
                        {word.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setDetailItem(word)}
                        className="rounded-lg p-1.5 text-black/30 hover:bg-black/5 hover:text-black dark:text-white/30 dark:hover:bg-white/10 dark:hover:text-white">
                        <Eye size={14} />
                      </button>
                      <button onClick={() => { setEditItem(word); setModalOpen(true) }}
                        className="rounded-lg p-1.5 text-black/40 hover:bg-black/5 hover:text-black dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteItem(word)}
                        className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={data?.page ?? 1} totalPages={data?.totalPages ?? 1} total={data?.total ?? 0} onPageChange={setPage} />
        </>
      )}

      <DetailModal
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        title={detailItem ? `Word: ${detailItem.word ?? ''}` : ''}
        data={detailItem as Record<string, unknown>}
      />
      <VocabularyFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditItem(null) }}
        initialData={editItem}
      />
      <ConfirmDelete
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        busy={deleteVocab.isPending}
        title={language === 'en' ? `Delete "${deleteItem?.word ?? ''}"?` : `លុប "${deleteItem?.word ?? ''}"?`}
      />
    </AdminLayout>
  )
}
