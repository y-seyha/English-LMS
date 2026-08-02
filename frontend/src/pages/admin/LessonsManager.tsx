import { useState } from 'react'
import { useBilingualText, useLanguage } from '../../contexts/LanguageContext'
import { useGrammarUnits, useDeleteLesson } from '../../api/grammar'
import AdminLayout from '../../components/layout/AdminLayout'
import SearchInput from '../../components/ui/SearchInput'
import Badge from '../../components/ui/Badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import PageHeader from '@/components/ui/PageHeader'
import Spinner from '@/components/ui/Spinner'
import LessonFormModal from './LessonFormModal'
import ConfirmDelete from './ConfirmDelete'
import { Plus, ChevronDown, Trash2, Pencil, Eye } from 'lucide-react'
import { showSuccess, showError } from '../../utils/toast'
import DetailModal from '../../components/ui/DetailModal'

export default function LessonsManager() {
  const t = useBilingualText()
  const { language } = useLanguage()
  const { data: units, isLoading } = useGrammarUnits()
  const deleteLesson = useDeleteLesson()
  const [search, setSearch] = useState('')
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set())
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set())
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)
  const [deleteItem, setDeleteItem] = useState<any>(null)
  const [detailItem, setDetailItem] = useState<any>(null)

  const toggleExpand = (id: string) => {
    setExpandedLessons(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleUnit = (id: string) => {
    setExpandedUnits(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleDelete = async () => {
    if (!deleteItem) return
    try {
      await deleteLesson.mutateAsync(deleteItem.id)
      showSuccess(language === 'en' ? 'Lesson deleted' : 'បានលុបមេរៀន')
      setDeleteItem(null)
    } catch {
      showError(language === 'en' ? 'Failed to delete lesson' : 'មិនអាចលុបមេរៀនបានទេ')
    }
  }

  return (
    <AdminLayout>
      <PageHeader
        title={language === 'en' ? 'Lessons Manager' : 'គ្រប់គ្រងមេរៀន'}
        description={language === 'en' ? 'Create and manage grammar lessons across units' : 'បង្កើត និងគ្រប់គ្រងមេរៀនវេយ្យាករណ៍'}
      >
        <Button onClick={() => { setEditItem(null); setModalOpen(true) }}>
          <Plus size={16} /> {language === 'en' ? 'New Lesson' : 'មេរៀនថ្មី'}
        </Button>
      </PageHeader>

      <div className="mb-4 max-w-xs">
        <SearchInput value={search} onChange={setSearch} placeholder={language === 'en' ? 'Search lessons...' : 'ស្វែងរក...'} />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="space-y-4">
          {units?.map((unit: any) => (
            <Card key={unit.id} className="p-5">
              <button onClick={() => toggleUnit(unit.id)} className="flex w-full items-center justify-between text-base font-semibold text-foreground">
                <span>{t(unit.title)}</span>
                <ChevronDown size={18} className="text-muted-foreground transition-transform duration-300" style={{ transform: expandedUnits.has(unit.id) ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
              </button>
              <div className="overflow-hidden transition-all duration-400 ease-out" style={{ maxHeight: expandedUnits.has(unit.id) ? '2000px' : '0' }}>
                <div className="mt-3 space-y-3">
                  {unit.chapters.map((chapter: any) => (
                    <div key={chapter.id}>
                      <h3 className="mb-2 text-sm font-medium text-muted-foreground">{t(chapter.title)}</h3>
                      <div className="space-y-1">
                        {chapter.lessons
                          .filter((l: any) => !search || l.title.en.toLowerCase().includes(search.toLowerCase()))
                          .map((lesson: any) => (
                            <div key={lesson.id}>
                              <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-2.5 text-sm transition-colors hover:bg-accent/50">
                                <div className="flex items-center gap-3">
                                  <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); toggleExpand(lesson.id); }} className="text-muted-foreground">
                                    <ChevronDown size={14} className="transition-transform duration-300" style={{ transform: expandedLessons.has(lesson.id) ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
                                  </Button>
                                  <Badge variant={lesson.level}>
                                    {lesson.level === 'beginner' ? 'B' : 'I'}
                                  </Badge>
                                  <span className="text-foreground">{t(lesson.title)}</span>
                                  <span className="text-xs text-muted-foreground">{lesson.estimatedMinutes} min</span>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon-sm" className="text-muted-foreground" onClick={() => setDetailItem(lesson)}>
                                    <Eye size={14} />
                                  </Button>
                                  <Button variant="ghost" size="icon-sm" className="text-muted-foreground" onClick={() => { setEditItem(lesson); setModalOpen(true) }}>
                                    <Pencil size={14} />
                                  </Button>
                                  <Button variant="ghost" size="icon-sm" className="text-destructive hover:bg-destructive/10" onClick={() => setDeleteItem(lesson)}>
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              </div>
                              <div className="overflow-hidden transition-all duration-400 ease-out" style={{ maxHeight: expandedLessons.has(lesson.id) ? '200px' : '0' }}>
                                <div className="ml-8 mt-1 rounded-lg border bg-muted/25 p-3 text-xs">
                                  <div className="grid grid-cols-3 gap-4">
                                    <div>
                                      <span className="text-muted-foreground">{language === 'en' ? 'Exercises' : 'លំហាត់'}: </span>
                                      <span className="font-medium text-foreground">{lesson.exercises?.length ?? 0}</span>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">{language === 'en' ? 'Quiz' : 'សំណួរ'}: </span>
                                      <span className="font-medium text-foreground">{lesson.quiz?.length ?? 0}</span>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">{language === 'en' ? 'Homework' : 'កិច្ចការ'}: </span>
                                      <span className="font-medium text-foreground">{lesson.homework?.length ?? 0}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <DetailModal
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        title={detailItem ? (language === 'en' ? `Lesson: ${detailItem.title?.en ?? ''}` : `មេរៀន: ${detailItem.title?.km ?? ''}`) : ''}
        data={detailItem as Record<string, unknown>}
      />
      <LessonFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditItem(null) }}
        initialData={editItem}
      />
      <ConfirmDelete
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        busy={deleteLesson.isPending}
        title={language === 'en' ? `Delete "${deleteItem?.title?.en ?? ''}"?` : `លុប "${deleteItem?.title?.km ?? ''}"?`}
      />
    </AdminLayout>
  )
}
