import Modal from '../../components/ui/Modal'
import { Button } from '@/components/ui/button'
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
      <p className="mb-6 text-sm text-muted-foreground">
        {message ?? (language === 'en' ? 'Are you sure? This action cannot be undone.' : 'តើអ្នកប្រាកដទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។')}
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          {language === 'en' ? 'Cancel' : 'បោះបង់'}
        </Button>
        <Button variant="destructive" onClick={onConfirm} disabled={busy}>
          {busy ? '...' : (language === 'en' ? 'Delete' : 'លុប')}
        </Button>
      </div>
    </Modal>
  )
}
