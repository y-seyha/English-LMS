import { useState, useEffect } from 'react'
import Modal from '../../components/ui/Modal'
import { useCreateLesson, useUpdateLesson, useGrammarUnits } from '../../api/grammar'
import { showSuccess, showError } from '../../utils/toast'
import { useLanguage } from '../../contexts/LanguageContext'
import { Plus, Trash2 } from 'lucide-react'

type Tab = 'basic' | 'grammar' | 'mistakes' | 'exercises' | 'homework' | 'quiz'

interface Props {
  open: boolean
  onClose: () => void
  initialData?: any
}

function uid() { return Math.random().toString(36).slice(2, 9) }

export default function LessonFormModal({ open, onClose, initialData }: Props) {
  const { language } = useLanguage()
  const create = useCreateLesson()
  const update = useUpdateLesson()
  const { data: units } = useGrammarUnits()
  const isEdit = !!initialData

  const [tab, setTab] = useState<Tab>('basic')
  const [form, setForm] = useState({
    titleEn: '', titleKm: '', unitId: '', chapterId: '', level: 'beginner', estimatedMinutes: 10,
    definitionEn: '', definitionKm: '',
    forms: {
      affirmative: { structure: '', examples: [] as { en: string; km: string }[] },
      negative: { structure: '', examples: [] as { en: string; km: string }[] },
      question: { structure: '', examples: [] as { en: string; km: string }[] },
    },
    commonMistakes: [] as { mistake: string; correction: string; reasonEn: string; reasonKm: string }[],
    exercises: [] as { id: string; questionEn: string; questionKm: string; type: string; optionsEn: string[]; optionsKm: string[]; correctAnswer: string; explanationEn: string; explanationKm: string }[],
    homework: [] as { id: string; instructionEn: string; instructionKm: string; items: string[] }[],
    quiz: [] as { id: string; questionEn: string; questionKm: string; type: string; optionsEn: string[]; optionsKm: string[]; correctAnswer: string; explanationEn: string; explanationKm: string }[],
  })

  const chapters = units?.find((u: any) => u.id === form.unitId)?.chapters ?? []

  useEffect(() => {
    if (initialData) {
      const d = initialData
      setForm({
        titleEn: d.title?.en ?? '', titleKm: d.title?.km ?? '',
        unitId: d.unitId ?? '', chapterId: d.chapterId ?? '',
        level: d.level ?? 'beginner', estimatedMinutes: d.estimatedMinutes ?? 10,
        definitionEn: d.definition?.en ?? '', definitionKm: d.definition?.km ?? '',
        forms: {
          affirmative: { structure: d.forms?.affirmative?.structure ?? '', examples: d.forms?.affirmative?.examples ?? [] },
          negative: { structure: d.forms?.negative?.structure ?? '', examples: d.forms?.negative?.examples ?? [] },
          question: { structure: d.forms?.question?.structure ?? '', examples: d.forms?.question?.examples ?? [] },
        },
        commonMistakes: (d.commonMistakes ?? []).map((m: any) => ({
          mistake: m.mistake ?? '', correction: m.correction ?? '',
          reasonEn: m.reason?.en ?? '', reasonKm: m.reason?.km ?? '',
        })),
        exercises: (d.exercises ?? []).map((e: any) => ({
          id: e.id ?? uid(), questionEn: e.question?.en ?? '', questionKm: e.question?.km ?? '',
          type: e.type ?? 'multiple-choice',
          optionsEn: (e.options ?? []).map((o: any) => typeof o === 'string' ? o : o.en ?? ''),
          optionsKm: (e.options ?? []).map((o: any) => typeof o === 'string' ? '' : o.km ?? ''),
          correctAnswer: e.correctAnswer ?? '', explanationEn: e.explanation?.en ?? '', explanationKm: e.explanation?.km ?? '',
        })),
        homework: (d.homework ?? []).map((h: any) => ({
          id: h.id ?? uid(), instructionEn: h.instruction?.en ?? '', instructionKm: h.instruction?.km ?? '',
          items: h.items ?? [],
        })),
        quiz: (d.quiz ?? []).map((q: any) => ({
          id: q.id ?? uid(), questionEn: q.question?.en ?? '', questionKm: q.question?.km ?? '',
          type: q.type ?? 'multiple-choice',
          optionsEn: (q.options ?? []).map((o: any) => typeof o === 'string' ? o : o.en ?? ''),
          optionsKm: (q.options ?? []).map((o: any) => typeof o === 'string' ? '' : o.km ?? ''),
          correctAnswer: q.correctAnswer ?? '', explanationEn: q.explanation?.en ?? '', explanationKm: q.explanation?.km ?? '',
        })),
      })
    } else {
      setForm({
        titleEn: '', titleKm: '', unitId: units?.[0]?.id ?? '', chapterId: '', level: 'beginner', estimatedMinutes: 10,
        definitionEn: '', definitionKm: '',
        forms: { affirmative: { structure: '', examples: [] }, negative: { structure: '', examples: [] }, question: { structure: '', examples: [] } },
        commonMistakes: [],
        exercises: [], homework: [], quiz: [],
      })
    }
  }, [initialData, open, units])

  const tabs: { key: Tab; label: string; km: string }[] = [
    { key: 'basic', label: 'Basic', km: 'មូលដ្ឋាន' },
    { key: 'grammar', label: 'Grammar', km: 'វេយ្យាករណ៍' },
    { key: 'mistakes', label: 'Mistakes', km: 'កំហុស' },
    { key: 'exercises', label: 'Exercises', km: 'លំហាត់' },
    { key: 'homework', label: 'Homework', km: 'កិច្ចការ' },
    { key: 'quiz', label: 'Quiz', km: 'សំណួរ' },
  ]

  const handleSave = async () => {
    const buildOptions = (enArr: string[], kmArr: string[]): { en: string; km: string }[] =>
      enArr.map((en, i) => ({ en, km: kmArr[i] ?? '' }))

    const payload: Record<string, unknown> = {
      title: { en: form.titleEn, km: form.titleKm },
      unitId: form.unitId, chapterId: form.chapterId,
      level: form.level, estimatedMinutes: form.estimatedMinutes,
      definition: { en: form.definitionEn, km: form.definitionKm },
      forms: {
        affirmative: {
          structure: form.forms.affirmative.structure,
          examples: form.forms.affirmative.examples,
        },
        negative: {
          structure: form.forms.negative.structure,
          examples: form.forms.negative.examples,
        },
        question: {
          structure: form.forms.question.structure,
          examples: form.forms.question.examples,
        },
      },
      commonMistakes: form.commonMistakes.map(m => ({
        mistake: m.mistake, correction: m.correction,
        reason: { en: m.reasonEn, km: m.reasonKm },
      })),
      exercises: form.exercises.map(e => ({
        id: e.id, question: { en: e.questionEn, km: e.questionKm },
        type: e.type, options: buildOptions(e.optionsEn, e.optionsKm),
        correctAnswer: e.correctAnswer, explanation: { en: e.explanationEn, km: e.explanationKm },
      })),
      homework: form.homework.map(h => ({
        id: h.id, instruction: { en: h.instructionEn, km: h.instructionKm }, items: h.items,
      })),
      quiz: form.quiz.map(q => ({
        id: q.id, question: { en: q.questionEn, km: q.questionKm },
        type: q.type, options: buildOptions(q.optionsEn, q.optionsKm),
        correctAnswer: q.correctAnswer, explanation: { en: q.explanationEn, km: q.explanationKm },
      })),
    }

    try {
      if (isEdit) {
        await update.mutateAsync({ id: initialData.id, data: payload })
        showSuccess(language === 'en' ? 'Lesson updated' : 'បានកែប្រែមេរៀន')
      } else {
        await create.mutateAsync(payload)
        showSuccess(language === 'en' ? 'Lesson created' : 'បានបង្កើតមេរៀន')
      }
      onClose()
    } catch {
      showError(language === 'en' ? 'Failed to save lesson' : 'មិនអាចរក្សាទុកមេរៀនបានទេ')
    }
  }

  const busy = create.isPending || update.isPending

  return (
    <Modal isOpen={open} onClose={onClose} title={isEdit ? (language === 'en' ? 'Edit Lesson' : 'កែមេរៀន') : (language === 'en' ? 'New Lesson' : 'មេរៀនថ្មី')}>
      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-1 border-b border-black/10 pb-2 dark:border-white/10">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              tab === t.key
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'text-black/60 hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/10'
            }`}
          >
            {language === 'en' ? t.label : t.km}
          </button>
        ))}
      </div>

      <div className="max-h-[60vh] space-y-4 overflow-y-auto">
        {tab === 'basic' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Title (EN)" value={form.titleEn} onChange={v => setForm(f => ({ ...f, titleEn: v }))} />
              <Input label="Title (KM)" value={form.titleKm} onChange={v => setForm(f => ({ ...f, titleKm: v }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Select label="Unit" value={form.unitId} onChange={v => setForm(f => ({ ...f, unitId: v, chapterId: '' }))}
                options={(units ?? []).map((u: any) => ({ value: u.id, label: u.title?.en ?? u.id }))} />
              <Select label="Chapter" value={form.chapterId} onChange={v => setForm(f => ({ ...f, chapterId: v }))}
                options={chapters.map((c: any) => ({ value: c.id, label: c.title?.en ?? c.id }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Select label="Level" value={form.level} onChange={v => setForm(f => ({ ...f, level: v }))}
                options={[{ value: 'beginner', label: 'Beginner' }, { value: 'intermediate', label: 'Intermediate' }]} />
              <Input label="Minutes" type="number" value={String(form.estimatedMinutes)} onChange={v => setForm(f => ({ ...f, estimatedMinutes: parseInt(v) || 10 }))} />
            </div>
          </div>
        )}

        {tab === 'grammar' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Textarea label="Definition (EN)" value={form.definitionEn} onChange={v => setForm(f => ({ ...f, definitionEn: v }))} />
              <Textarea label="Definition (KM)" value={form.definitionKm} onChange={v => setForm(f => ({ ...f, definitionKm: v }))} />
            </div>
            {(['affirmative', 'negative', 'question'] as const).map(key => (
              <FormGroupEditor
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                structure={form.forms[key].structure}
                examples={form.forms[key].examples}
                onStructureChange={v => setForm(f => ({ ...f, forms: { ...f.forms, [key]: { ...f.forms[key], structure: v } } }))}
                onExamplesChange={exs => setForm(f => ({ ...f, forms: { ...f.forms, [key]: { ...f.forms[key], examples: exs } } }))}
              />
            ))}
          </div>
        )}

        {tab === 'mistakes' && (
          <div className="space-y-3">
            {form.commonMistakes.map((m, i) => (
              <div key={i} className="rounded-lg border border-black/10 p-3 dark:border-white/10">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-black/60 dark:text-white/60">#{i + 1}</span>
                  <button onClick={() => setForm(f => ({ ...f, commonMistakes: f.commonMistakes.filter((_, j) => j !== i) }))}
                    className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                </div>
                <div className="grid grid-cols-2 gap-2">
              <Input label="Mistake" value={m.mistake} onChange={v => setForm(f => ({ ...f, commonMistakes: f.commonMistakes.map((x, j) => j === i ? { ...x, mistake: v } : x) }))} />
              <Input label="Correction" value={m.correction} onChange={v => setForm(f => ({ ...f, commonMistakes: f.commonMistakes.map((x, j) => j === i ? { ...x, correction: v } : x) }))} />
              <Input label="Reason (EN)" value={m.reasonEn} onChange={v => setForm(f => ({ ...f, commonMistakes: f.commonMistakes.map((x, j) => j === i ? { ...x, reasonEn: v } : x) }))} />
              <Input label="Reason (KM)" value={m.reasonKm} onChange={v => setForm(f => ({ ...f, commonMistakes: f.commonMistakes.map((x, j) => j === i ? { ...x, reasonKm: v } : x) }))} />
                </div>
              </div>
            ))}
            <button onClick={() => setForm(f => ({ ...f, commonMistakes: [...f.commonMistakes, { mistake: '', correction: '', reasonEn: '', reasonKm: '' }] }))}
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-sky-400">
              <Plus size={14} /> {language === 'en' ? 'Add Mistake' : 'បន្ថែមកំហុស'}
            </button>
          </div>
        )}

        {tab === 'exercises' && (
          <ItemsEditor
            items={form.exercises}
            label="Exercise"
            render={(item, _i, onChange) => (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input label="Question (EN)" value={item.questionEn} onChange={v => onChange({ ...item, questionEn: v })} />
                  <Input label="Question (KM)" value={item.questionKm} onChange={v => onChange({ ...item, questionKm: v })} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Select label="Type" value={item.type} onChange={v => onChange({ ...item, type: v })}
                    options={[{ value: 'multiple-choice', label: 'Multiple Choice' }, { value: 'true-false', label: 'True/False' }, { value: 'fill-blank', label: 'Fill Blank' }]} />
                  <Input label="Correct Answer" value={item.correctAnswer} onChange={v => onChange({ ...item, correctAnswer: v })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-black/60 dark:text-white/60">Options (EN, comma-separated)</label>
                  <input type="text" value={item.optionsEn.join(', ')} onChange={e => onChange({ ...item, optionsEn: e.target.value.split(',').map(s => s.trim()) })}
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black dark:border-white/10 dark:bg-black dark:text-white" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-black/60 dark:text-white/60">Options (KM, comma-separated)</label>
                  <input type="text" value={item.optionsKm.join(', ')} onChange={e => onChange({ ...item, optionsKm: e.target.value.split(',').map(s => s.trim()) })}
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black dark:border-white/10 dark:bg-black dark:text-white" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input label="Explanation (EN)" value={item.explanationEn} onChange={v => onChange({ ...item, explanationEn: v })} />
                  <Input label="Explanation (KM)" value={item.explanationKm} onChange={v => onChange({ ...item, explanationKm: v })} />
                </div>
              </div>
            )}
            onAdd={() => ({ id: uid(), questionEn: '', questionKm: '', type: 'multiple-choice', optionsEn: [], optionsKm: [], correctAnswer: '', explanationEn: '', explanationKm: '' })}
            onChange={items => setForm(f => ({ ...f, exercises: items }))}
          />
        )}

        {tab === 'homework' && (
          <ItemsEditor
            items={form.homework}
            label="Task"
            render={(item, _i, onChange) => (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input label="Instruction (EN)" value={item.instructionEn} onChange={v => onChange({ ...item, instructionEn: v })} />
                  <Input label="Instruction (KM)" value={item.instructionKm} onChange={v => onChange({ ...item, instructionKm: v })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-black/60 dark:text-white/60">Items (one per line)</label>
                  <textarea value={item.items.join('\n')} onChange={e => onChange({ ...item, items: e.target.value.split('\n').filter(Boolean) })}
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black dark:border-white/10 dark:bg-black dark:text-white" rows={3} />
                </div>
              </div>
            )}
            onAdd={() => ({ id: uid(), instructionEn: '', instructionKm: '', items: [] })}
            onChange={items => setForm(f => ({ ...f, homework: items }))}
          />
        )}

        {tab === 'quiz' && (
          <ItemsEditor
            items={form.quiz}
            label="Question"
            render={(item, _i, onChange) => (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input label="Question (EN)" value={item.questionEn} onChange={v => onChange({ ...item, questionEn: v })} />
                  <Input label="Question (KM)" value={item.questionKm} onChange={v => onChange({ ...item, questionKm: v })} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Select label="Type" value={item.type} onChange={v => onChange({ ...item, type: v })}
                    options={[{ value: 'multiple-choice', label: 'Multiple Choice' }, { value: 'true-false', label: 'True/False' }, { value: 'fill-blank', label: 'Fill Blank' }]} />
                  <Input label="Correct Answer" value={item.correctAnswer} onChange={v => onChange({ ...item, correctAnswer: v })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-black/60 dark:text-white/60">Options (EN, comma-separated)</label>
                  <input type="text" value={item.optionsEn.join(', ')} onChange={e => onChange({ ...item, optionsEn: e.target.value.split(',').map(s => s.trim()) })}
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black dark:border-white/10 dark:bg-black dark:text-white" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-black/60 dark:text-white/60">Options (KM, comma-separated)</label>
                  <input type="text" value={item.optionsKm.join(', ')} onChange={e => onChange({ ...item, optionsKm: e.target.value.split(',').map(s => s.trim()) })}
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black dark:border-white/10 dark:bg-black dark:text-white" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input label="Explanation (EN)" value={item.explanationEn} onChange={v => onChange({ ...item, explanationEn: v })} />
                  <Input label="Explanation (KM)" value={item.explanationKm} onChange={v => onChange({ ...item, explanationKm: v })} />
                </div>
              </div>
            )}
            onAdd={() => ({ id: uid(), questionEn: '', questionKm: '', type: 'multiple-choice', optionsEn: [], optionsKm: [], correctAnswer: '', explanationEn: '', explanationKm: '' })}
            onChange={items => setForm(f => ({ ...f, quiz: items }))}
          />
        )}
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

function FormGroupEditor({ label, structure, examples, onStructureChange, onExamplesChange }: {
  label: string; structure: string; examples: { en: string; km: string }[]
  onStructureChange: (v: string) => void
  onExamplesChange: (exs: { en: string; km: string }[]) => void
}) {
  return (
    <div className="rounded-lg border border-black/10 p-3 dark:border-white/10">
      <h4 className="mb-2 text-sm font-semibold text-black dark:text-white">{label}</h4>
      <div className="mb-2">
        <Input label="Structure" value={structure} onChange={onStructureChange} />
      </div>
      {examples.map((ex, i) => (
        <div key={i} className="mb-1 grid grid-cols-2 gap-2">
          <Input label={`Example ${i + 1} (EN)`} value={ex.en} onChange={v => onExamplesChange(examples.map((e, j) => j === i ? { ...e, en: v } : e))} />
          <Input label={`Example ${i + 1} (KM)`} value={ex.km} onChange={v => onExamplesChange(examples.map((e, j) => j === i ? { ...e, km: v } : e))} />
        </div>
      ))}
      <button onClick={() => onExamplesChange([...examples, { en: '', km: '' }])}
        className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-sky-400">
        <Plus size={14} /> Add Example
      </button>
    </div>
  )
}

function ItemsEditor<T extends { id: string }>({ items, render, onAdd, onChange }: {
  items: T[]; render: (item: T, index: number, onChange: (item: T) => void) => React.ReactNode
  onAdd: () => T; onChange: (items: T[]) => void; label: string
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={item.id} className="rounded-lg border border-black/10 p-3 dark:border-white/10">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-black/60 dark:text-white/60">#{i + 1}</span>
            <button onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
          </div>
          {render(item, i, (updated) => { const c = [...items]; c[i] = updated; onChange(c) })}
        </div>
      ))}
      <button onClick={() => onChange([...items, onAdd()])}
        className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-sky-400">
        <Plus size={14} /> Add
      </button>
    </div>
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
