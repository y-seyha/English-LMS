import { useState, useEffect } from 'react'
import Modal from '../../components/ui/Modal'
import { useCreateVocabulary, useUpdateVocabulary } from '../../api/vocabulary'
import { showSuccess, showError } from '../../utils/toast'
import { useLanguage } from '../../contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Input as UIInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select as SelectRadix, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
          <Select label="Level" value={form.level} onChange={v => setForm(f => ({ ...f, level: v }))}
            options={[{ value: 'beginner', label: 'Beginner' }, { value: 'intermediate', label: 'Intermediate' }]} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Meaning (EN)" value={form.meaningEn} onChange={v => setForm(f => ({ ...f, meaningEn: v }))} />
          <Input label="Meaning (KM)" value={form.meaningKm} onChange={v => setForm(f => ({ ...f, meaningKm: v }))} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Example (EN)" value={form.exampleEn} onChange={v => setForm(f => ({ ...f, exampleEn: v }))} />
          <Input label="Example (KM)" value={form.exampleKm} onChange={v => setForm(f => ({ ...f, exampleKm: v }))} />
        </div>
        <Select label="Category" value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))}
          options={[
            { value: 'general', label: 'General' },
            { value: 'jobs', label: 'Jobs' },
            { value: 'food', label: 'Food' },
            { value: 'travel', label: 'Travel' },
            { value: 'education', label: 'Education' },
            { value: 'daily', label: 'Daily Life' },
          ]} />
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>
            {language === 'en' ? 'Cancel' : 'បោះបង់'}
          </Button>
          <Button onClick={handleSave} disabled={busy || !form.word}>
            {busy ? '...' : (isEdit ? (language === 'en' ? 'Update' : 'កែប្រែ') : (language === 'en' ? 'Create' : 'បង្កើត'))}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <UIInput type="text" value={value} onChange={e => onChange(e.target.value)} />
    </div>
  )
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <SelectRadix value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
        </SelectContent>
      </SelectRadix>
    </div>
  )
}
