import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBilingualText, useLanguage } from '../../contexts/LanguageContext'
import { useGrammarUnits, useDeleteLesson } from '../../api/grammar'
import AdminLayout from '../../components/layout/AdminLayout'
import SearchInput from '../../components/ui/SearchInput'
import Badge from '../../components/ui/Badge'
import LessonFormModal from './LessonFormModal'
import ConfirmDelete from './ConfirmDelete'
import { ArrowLeft, Plus, ChevronDown, Loader2, Trash2, Pencil, Eye } from 'lucide-react'
import { showSuccess, showError } from '../../utils/toast'
import DetailModal from '../../components/ui/DetailModal'

export default function LessonsManager() {
  const t = useBilingualText()
  const { language } = useLanguage()
  const navigate = useNavigate()
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <button onClick={() => navigate('/admin')} className="mb-2 inline-flex items-center gap-1 text-sm text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white">
            <ArrowLeft size={14} /> {language === 'en' ? 'Back to Dashboard' : 'ត្រឡប់'}
          </button>
          <h1 className="text-[1.875rem] font-bold text-black dark:text-white">
            {language === 'en' ? 'Lessons Manager' : 'គ្រប់គ្រងមេរៀន'}
          </h1>
        </div>
        <button onClick={() => { setEditItem(null); setModalOpen(true) }}
          className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80">
          <Plus size={16} /> {language === 'en' ? 'New Lesson' : 'មេរៀនថ្មី'}
        </button>
      </div>

      <div className="mb-4 max-w-xs">
        <SearchInput value={search} onChange={setSearch} placeholder={language === 'en' ? 'Search lessons...' : 'ស្វែងរក...'} />
      </div>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 size={32} className="animate-spin text-black/40 dark:text-white/40" />
        </div>
      ) : (
        <div className="space-y-4">
          {units?.map((unit: any) => (
            <div key={unit.id} className="rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-black">
              <button onClick={() => toggleUnit(unit.id)} className="flex w-full items-center justify-between text-lg font-semibold text-black dark:text-white">
                <span>{t(unit.title)}</span>
                <ChevronDown size={18} className="text-black/40 transition-transform duration-300 dark:text-white/40" style={{ transform: expandedUnits.has(unit.id) ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
              </button>
              <div className="overflow-hidden transition-all duration-400 ease-out" style={{ maxHeight: expandedUnits.has(unit.id) ? '2000px' : '0' }}>
                <div className="mt-3 space-y-3">
                  {unit.chapters.map((chapter: any) => (
                    <div key={chapter.id}>
                      <h3 className="mb-2 text-sm font-medium text-black/60 dark:text-white/60">{t(chapter.title)}</h3>
                      <div className="space-y-1">
                        {chapter.lessons
                          .filter((l: any) => !search || l.title.en.toLowerCase().includes(search.toLowerCase()))
                          .map((lesson: any) => (
                            <div key={lesson.id}>
                              <div className="flex items-center justify-between rounded-lg border border-black/10 px-4 py-2.5 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5">
                                <div className="flex items-center gap-3">
                                  <button onClick={(e) => { e.stopPropagation(); toggleExpand(lesson.id); }} className="text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white">
                                    <ChevronDown size={14} className="transition-transform duration-300" style={{ transform: expandedLessons.has(lesson.id) ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
                                  </button>
                                  <Badge variant={lesson.level}>
                                    {lesson.level === 'beginner' ? 'B' : 'I'}
                                  </Badge>
                                  <span className="text-black dark:text-white">{t(lesson.title)}</span>
                                  <span className="text-xs text-black/40 dark:text-white/40">{lesson.estimatedMinutes} min</span>
                                </div>
                                <div className="flex gap-1">
                                  <button onClick={() => setDetailItem(lesson)}
                                    className="rounded-lg p-1.5 text-black/30 hover:bg-black/5 hover:text-black dark:text-white/30 dark:hover:bg-white/10 dark:hover:text-white">
                                    <Eye size={14} />
                                  </button>
                                  <button onClick={() => { setEditItem(lesson); setModalOpen(true) }}
                                    className="rounded-lg p-1.5 text-black/40 hover:bg-black/5 hover:text-black dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white">
                                    <Pencil size={14} />
                                  </button>
                                  <button onClick={() => setDeleteItem(lesson)}
                                    className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                              <div className="overflow-hidden transition-all duration-400 ease-out" style={{ maxHeight: expandedLessons.has(lesson.id) ? '200px' : '0' }}>
                                <div className="ml-8 mt-1 rounded-lg border border-black/5 bg-black/2 p-3 text-xs dark:border-white/5 dark:bg-white/5">
                                  <div className="grid grid-cols-3 gap-4">
                                    <div>
                                      <span className="text-black/40 dark:text-white/40">{language === 'en' ? 'Exercises' : 'លំហាត់'}: </span>
                                      <span className="font-medium text-black dark:text-white">{lesson.exercises?.length ?? 0}</span>
                                    </div>
                                    <div>
                                      <span className="text-black/40 dark:text-white/40">{language === 'en' ? 'Quiz' : 'សំណួរ'}: </span>
                                      <span className="font-medium text-black dark:text-white">{lesson.quiz?.length ?? 0}</span>
                                    </div>
                                    <div>
                                      <span className="text-black/40 dark:text-white/40">{language === 'en' ? 'Homework' : 'កិច្ចការ'}: </span>
                                      <span className="font-medium text-black dark:text-white">{lesson.homework?.length ?? 0}</span>
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
            </div>
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
