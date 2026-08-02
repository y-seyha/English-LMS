import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useVocabulary, useDeleteVocabulary } from '../../api/vocabulary'
import AdminLayout from '../../components/layout/AdminLayout'
import SearchInput from '../../components/ui/SearchInput'
import Pagination from '../../components/ui/Pagination'
import Badge from '../../components/ui/Badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import EmptyState from '@/components/ui/EmptyState'
import PageHeader from '@/components/ui/PageHeader'
import Spinner from '@/components/ui/Spinner'
import VocabularyFormModal from './VocabularyFormModal'
import ConfirmDelete from './ConfirmDelete'
import { Plus, Trash2, Pencil, Eye, Search } from 'lucide-react'
import { showSuccess, showError } from '../../utils/toast'
import DetailModal from '../../components/ui/DetailModal'

export default function VocabularyManager() {
  const { language } = useLanguage()
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
      <PageHeader
        title={language === 'en' ? 'Vocabulary Manager' : 'គ្រប់គ្រងវាក្យសព្ទ'}
        description={language === 'en' ? 'Manage words, meanings and pronunciation' : 'គ្រប់គ្រងពាក្យ អត្ថន័យ និងការបញ្ចេញសំឡេង'}
      >
        <Button onClick={() => { setEditItem(null); setModalOpen(true) }}>
          <Plus size={16} /> {language === 'en' ? 'New Word' : 'ពាក្យថ្មី'}
        </Button>
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="w-full max-w-xs">
          <SearchInput value={search} onChange={setSearch} placeholder={language === 'en' ? 'Search words...' : 'ស្វែងរក...'} />
        </div>
        <div className="flex gap-2">
          {['', 'beginner', 'intermediate'].map(l => (
            <button key={l} onClick={() => { setLevelFilter(l); setPage(1) }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                levelFilter === l
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/25 text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {l || (language === 'en' ? 'All' : 'ទាំងអស់')}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : data?.data?.length === 0 ? (
        <EmptyState
          icon={<Search size={24} />}
          title={language === 'en' ? 'No words found' : 'រកមិនឃើញពាក្យទេ'}
          description={language === 'en' ? 'Try adjusting your search or filters' : 'សាកល្បងផ្លាស់ប្តូរការស្វែងរក ឬតម្រង'}
        />
      ) : (
        <>
          <Card>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead>{language === 'en' ? 'Word' : 'ពាក្យ'}</TableHead>
                  <TableHead>{language === 'en' ? 'Pronunciation' : 'ការបញ្ចេញសំឡេង'}</TableHead>
                  <TableHead>{language === 'en' ? 'Part of Speech' : 'ថ្នាក់ពាក្យ'}</TableHead>
                  <TableHead className="hidden md:table-cell">{language === 'en' ? 'Meaning' : 'អត្ថន័យ'}</TableHead>
                  <TableHead>{language === 'en' ? 'Level' : 'កម្រិត'}</TableHead>
                  <TableHead className="text-right">{language === 'en' ? 'Actions' : 'សកម្មភាព'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((word: any) => (
                  <TableRow key={word.id}>
                    <TableCell className="font-medium text-foreground">{word.word}</TableCell>
                    <TableCell className="text-muted-foreground">{word.pronunciation}</TableCell>
                    <TableCell className="text-muted-foreground">{word.partOfSpeech}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">{word.meaning?.en}</TableCell>
                    <TableCell>
                      <Badge variant={word.level}>{word.level}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" className="text-muted-foreground" onClick={() => setDetailItem(word)}>
                          <Eye size={14} />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="text-muted-foreground" onClick={() => { setEditItem(word); setModalOpen(true) }}>
                          <Pencil size={14} />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="text-destructive hover:bg-destructive/10" onClick={() => setDeleteItem(word)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
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
