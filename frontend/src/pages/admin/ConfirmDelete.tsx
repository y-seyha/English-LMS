import Modal from '../../components/ui/Modal'
import { useLanguage } from '../../contexts/LanguageContext'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  busy?: boolean
}

export default function ConfirmDelete({ open, onClose, onConfirm, title, message, busy }: Props) {
  const { language } = useLanguage()

  return (
    <Modal isOpen={open} onClose={onClose} title={title ?? (language === 'en' ? 'Confirm Delete' : 'បញ្ជាក់ការលុប')}>
      <p className="mb-6 text-sm text-black/60 dark:text-white/60">
        {message ?? (language === 'en' ? 'Are you sure? This action cannot be undone.' : 'តើអ្នកប្រាកដទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។')}
      </p>
      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="rounded-lg border border-black/10 px-4 py-2 text-sm text-black hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10">
          {language === 'en' ? 'Cancel' : 'បោះបង់'}
        </button>
        <button onClick={onConfirm} disabled={busy}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50">
          {busy ? '...' : (language === 'en' ? 'Delete' : 'លុប')}
        </button>
      </div>
    </Modal>
  )
}
