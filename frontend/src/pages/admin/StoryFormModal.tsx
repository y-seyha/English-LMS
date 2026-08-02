import { useState, useEffect } from 'react'
import Modal from '../../components/ui/Modal'
import { useCreateStory, useUpdateStory } from '../../api/stories'
import { showSuccess, showError } from '../../utils/toast'
import { useLanguage } from '../../contexts/LanguageContext'
import { Plus, Trash2 } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  initialData?: any
}

function uid() { return Math.random().toString(36).slice(2, 9) }

export default function StoryFormModal({ open, onClose, initialData }: Props) {
  const { language } = useLanguage()
  const create = useCreateStory()
  const update = useUpdateStory()
  const isEdit = !!initialData

  const [form, setForm] = useState({
    titleEn: '', titleKm: '', level: 'A1', estimatedMinutes: 5,
    contentEn: '', contentKm: '',
    questions: [] as {
      id: string; questionEn: string; questionKm: string; type: string
      optionsEn: string[]; optionsKm: string[]; correctAnswer: string
      explanationEn: string; explanationKm: string
    }[],
  })

  useEffect(() => {
    if (initialData) {
      const d = initialData
      setForm({
        titleEn: d.title?.en ?? '', titleKm: d.title?.km ?? '',
        level: d.level ?? 'A1', estimatedMinutes: d.estimatedMinutes ?? 5,
        contentEn: d.content?.en ?? '', contentKm: d.content?.km ?? '',
        questions: (d.questions ?? []).map((q: any) => ({
          id: q.id ?? uid(), questionEn: q.question?.en ?? '', questionKm: q.question?.km ?? '',
          type: q.type ?? 'multiple-choice',
          optionsEn: (q.options ?? []).map((o: any) => typeof o === 'string' ? o : o.en ?? ''),
          optionsKm: (q.options ?? []).map((o: any) => typeof o === 'string' ? '' : o.km ?? ''),
          correctAnswer: q.correctAnswer ?? '',
          explanationEn: q.explanation?.en ?? '', explanationKm: q.explanation?.km ?? '',
        })),
      })
    } else {
      setForm({ titleEn: '', titleKm: '', level: 'A1', estimatedMinutes: 5, contentEn: '', contentKm: '', questions: [] })
    }
  }, [initialData, open])

  const handleSave = async () => {
    const buildOptions = (enArr: string[], kmArr: string[]): { en: string; km: string }[] =>
      enArr.map((en, i) => ({ en, km: kmArr[i] ?? '' }))

    const payload: Record<string, unknown> = {
      title: { en: form.titleEn, km: form.titleKm },
      level: form.level, estimatedMinutes: form.estimatedMinutes,
      content: { en: form.contentEn, km: form.contentKm },
      questions: form.questions.map(q => ({
        id: q.id, question: { en: q.questionEn, km: q.questionKm },
        type: q.type, options: buildOptions(q.optionsEn, q.optionsKm),
        correctAnswer: q.correctAnswer,
        explanation: { en: q.explanationEn, km: q.explanationKm },
      })),
    }

    try {
      if (isEdit) {
        await update.mutateAsync({ id: initialData.id, data: payload })
        showSuccess(language === 'en' ? 'Story updated' : 'បានកែប្រែរឿង')
      } else {
        await create.mutateAsync(payload)
        showSuccess(language === 'en' ? 'Story created' : 'បានបង្កើតរឿង')
      }
      onClose()
    } catch {
      showError(language === 'en' ? 'Failed to save story' : 'មិនអាចរក្សាទុករឿងបានទេ')
    }
  }

  const busy = create.isPending || update.isPending

  const updateQuestion = (i: number, patch: Partial<(typeof form.questions)[number]>) => {
    setForm(f => ({ ...f, questions: f.questions.map((q, j) => j === i ? { ...q, ...patch } : q) }))
  }

  return (
    <Modal isOpen={open} onClose={onClose} title={isEdit ? (language === 'en' ? 'Edit Story' : 'កែរឿង') : (language === 'en' ? 'New Story' : 'រឿងថ្មី')}>
      <div className="max-h-[60vh] space-y-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Title (EN)" value={form.titleEn} onChange={v => setForm(f => ({ ...f, titleEn: v }))} />
          <Input label="Title (KM)" value={form.titleKm} onChange={v => setForm(f => ({ ...f, titleKm: v }))} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Level" value={form.level} onChange={v => setForm(f => ({ ...f, level: v }))}
            options={[{ value: 'A1', label: 'A1' }, { value: 'A2', label: 'A2' }, { value: 'B1', label: 'B1' }]} />
          <Input label="Minutes" type="number" value={String(form.estimatedMinutes)} onChange={v => setForm(f => ({ ...f, estimatedMinutes: parseInt(v) || 5 }))} />
        </div>
        <Textarea label="Content (EN)" value={form.contentEn} onChange={v => setForm(f => ({ ...f, contentEn: v }))} />
        <Textarea label="Content (KM)" value={form.contentKm} onChange={v => setForm(f => ({ ...f, contentKm: v }))} />

        {/* Questions */}
        <div className="border-t border-black/10 pt-4 dark:border-white/10">
          <h4 className="mb-3 text-sm font-semibold text-black dark:text-white">
            {language === 'en' ? 'Comprehension Questions' : 'សំណួរយល់ដឹង'}
          </h4>
          {form.questions.map((q, i) => (
            <div key={q.id} className="mb-3 rounded-lg border border-black/10 p-3 dark:border-white/10">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-black/60 dark:text-white/60">Q #{i + 1}</span>
                <button onClick={() => setForm(f => ({ ...f, questions: f.questions.filter((_, j) => j !== i) }))}
                  className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input label="Question (EN)" value={q.questionEn} onChange={v => updateQuestion(i, { questionEn: v })} />
                <Input label="Question (KM)" value={q.questionKm} onChange={v => updateQuestion(i, { questionKm: v })} />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Select label="Type" value={q.type} onChange={v => updateQuestion(i, { type: v })}
                  options={[{ value: 'multiple-choice', label: 'Multiple Choice' }, { value: 'true-false', label: 'True/False' }]} />
                <Input label="Correct Answer" value={q.correctAnswer} onChange={v => updateQuestion(i, { correctAnswer: v })} />
              </div>
              <div className="mt-2">
                <label className="mb-1 block text-xs font-medium text-black/60 dark:text-white/60">Options (EN, comma-separated)</label>
                <input type="text" value={q.optionsEn.join(', ')} onChange={e => updateQuestion(i, { optionsEn: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black dark:border-white/10 dark:bg-black dark:text-white" />
              </div>
              <div className="mt-2">
                <label className="mb-1 block text-xs font-medium text-black/60 dark:text-white/60">Options (KM, comma-separated)</label>
                <input type="text" value={q.optionsKm.join(', ')} onChange={e => updateQuestion(i, { optionsKm: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black dark:border-white/10 dark:bg-black dark:text-white" />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Input label="Explanation (EN)" value={q.explanationEn} onChange={v => updateQuestion(i, { explanationEn: v })} />
                <Input label="Explanation (KM)" value={q.explanationKm} onChange={v => updateQuestion(i, { explanationKm: v })} />
              </div>
            </div>
          ))}
          <button onClick={() => setForm(f => ({ ...f, questions: [...f.questions, { id: uid(), questionEn: '', questionKm: '', type: 'multiple-choice', optionsEn: [], optionsKm: [], correctAnswer: '', explanationEn: '', explanationKm: '' }] }))}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-sky-400">
            <Plus size={14} /> {language === 'en' ? 'Add Question' : 'បន្ថែមសំណួរ'}
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2 border-t border-black/10 pt-4 dark:border-white/10">
        <button onClick={onClose} className="rounded-lg border border-black/10 px-4 py-2 text-sm text-black hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10">
          {language === 'en' ? 'Cancel' : 'បោះបង់'}
        </button>
        <button onClick={handleSave} disabled={busy || !form.titleEn}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/80">
          {busy ? '...' : (isEdit ? (language === 'en' ? 'Update' : 'កែប្រែ') : (language === 'en' ? 'Create' : 'បង្កើត'))}
        </button>
      </div>
    </Modal>
  )
}

function Input({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-black/60 dark:text-white/60">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black dark:border-white/10 dark:bg-black dark:text-white dark:focus:border-white" />
    </div>
  )
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-black/60 dark:text-white/60">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
        className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black dark:border-white/10 dark:bg-black dark:text-white dark:focus:border-white" />
    </div>
  )
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-black/60 dark:text-white/60">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black dark:border-white/10 dark:bg-black dark:text-white">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}
