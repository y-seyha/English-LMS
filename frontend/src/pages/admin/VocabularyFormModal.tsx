import { useState, useEffect } from 'react'
import Modal from '../../components/ui/Modal'
import { useCreateVocabulary, useUpdateVocabulary } from '../../api/vocabulary'
import { showSuccess, showError } from '../../utils/toast'
import { useLanguage } from '../../contexts/LanguageContext'

interface Props {
  open: boolean
  onClose: () => void
  initialData?: any
}

export default function VocabularyFormModal({ open, onClose, initialData }: Props) {
  const { language } = useLanguage()
  const create = useCreateVocabulary()
  const update = useUpdateVocabulary()
  const isEdit = !!initialData

  const [form, setForm] = useState({
    word: '',
    pronunciation: '',
    partOfSpeech: '',
    meaningEn: '',
    meaningKm: '',
    exampleEn: '',
    exampleKm: '',
    category: 'general',
    level: 'beginner',
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        word: initialData.word ?? '',
        pronunciation: initialData.pronunciation ?? '',
        partOfSpeech: initialData.partOfSpeech ?? '',
        meaningEn: initialData.meaning?.en ?? '',
        meaningKm: initialData.meaning?.km ?? '',
        exampleEn: initialData.example?.en ?? '',
        exampleKm: initialData.example?.km ?? '',
        category: initialData.category ?? 'general',
        level: initialData.level ?? 'beginner',
      })
    } else {
      setForm({ word: '', pronunciation: '', partOfSpeech: '', meaningEn: '', meaningKm: '', exampleEn: '', exampleKm: '', category: 'general', level: 'beginner' })
    }
  }, [initialData, open])

  const handleSave = async () => {
    const payload = {
      word: form.word,
      pronunciation: form.pronunciation,
      partOfSpeech: form.partOfSpeech,
      meaning: { en: form.meaningEn, km: form.meaningKm },
      example: { en: form.exampleEn, km: form.exampleKm },
      category: form.category,
      level: form.level,
    }
    try {
      if (isEdit) {
        await update.mutateAsync({ id: initialData.id, data: payload })
        showSuccess(language === 'en' ? 'Word updated' : 'បានកែប្រែពាក្យ')
      } else {
        await create.mutateAsync(payload)
        showSuccess(language === 'en' ? 'Word created' : 'បានបង្កើតពាក្យ')
      }
      onClose()
    } catch {
      showError(language === 'en' ? 'Failed to save word' : 'មិនអាចរក្សាទុកពាក្យបានទេ')
    }
  }

  const busy = create.isPending || update.isPending

  return (
    <Modal isOpen={open} onClose={onClose} title={isEdit ? (language === 'en' ? 'Edit Word' : 'កែពាក្យ') : (language === 'en' ? 'New Word' : 'ពាក្យថ្មី')}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Word" value={form.word} onChange={v => setForm(f => ({ ...f, word: v }))} />
          <Input label="Pronunciation" value={form.pronunciation} onChange={v => setForm(f => ({ ...f, pronunciation: v }))} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Part of Speech" value={form.partOfSpeech} onChange={v => setForm(f => ({ ...f, partOfSpeech: v }))} />
          <div>
            <label className="mb-1 block text-xs font-medium text-black/60 dark:text-white/60">Level</label>
            <select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black dark:border-white/10 dark:bg-black dark:text-white">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Meaning (EN)" value={form.meaningEn} onChange={v => setForm(f => ({ ...f, meaningEn: v }))} />
          <Input label="Meaning (KM)" value={form.meaningKm} onChange={v => setForm(f => ({ ...f, meaningKm: v }))} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Example (EN)" value={form.exampleEn} onChange={v => setForm(f => ({ ...f, exampleEn: v }))} />
          <Input label="Example (KM)" value={form.exampleKm} onChange={v => setForm(f => ({ ...f, exampleKm: v }))} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-black/60 dark:text-white/60">Category</label>
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black dark:border-white/10 dark:bg-black dark:text-white">
            <option value="general">General</option>
            <option value="jobs">Jobs</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="education">Education</option>
            <option value="daily">Daily Life</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="rounded-lg border border-black/10 px-4 py-2 text-sm text-black hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10">
            {language === 'en' ? 'Cancel' : 'បោះបង់'}
          </button>
          <button onClick={handleSave} disabled={busy || !form.word}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/80">
            {busy ? '...' : (isEdit ? (language === 'en' ? 'Update' : 'កែប្រែ') : (language === 'en' ? 'Create' : 'បង្កើត'))}
          </button>
        </div>
      </div>
    </Modal>
  )
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-black/60 dark:text-white/60">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black dark:border-white/10 dark:bg-black dark:text-white dark:focus:border-white" />
    </div>
  )
}
