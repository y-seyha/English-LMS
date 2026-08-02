import { useEffect, type ReactNode } from 'react'
import { X, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface DetailModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  data: Record<string, unknown> | null
}

export default function DetailModal({ isOpen, onClose, title, data }: DetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen || !data) return null

  return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="w-full max-w-2xl animate-[popIn_300ms_cubic-bezier(0.16,1,0.3,1)] rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 dark:bg-black dark:ring-white/10">
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-4 dark:border-white/10">
          <h2 className="text-lg font-bold text-black dark:text-white">{title}</h2>
          <button className="rounded-lg p-1.5 text-black/40 hover:bg-black/5 hover:text-black dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
          <table className="w-full text-sm">
            <tbody>
              {renderRows(data, '')}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end border-t border-black/10 px-6 py-3 dark:border-white/10">
          <CopyButton data={data} />
        </div>
      </div>
    </div>
  )
}

function CopyButton({ data }: { data: Record<string, unknown> }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 px-3 py-1.5 text-xs font-medium text-black/60 transition-all hover:bg-black/5 hover:text-black dark:border-white/10 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white">
      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
      {copied ? 'Copied' : 'Copy JSON'}
    </button>
  )
}

function renderRows(obj: Record<string, unknown>, prefix: string): ReactNode[] {
  const entries = Object.entries(obj)
  const rows: ReactNode[] = []

  for (const [key, value] of entries) {
    const fieldKey = prefix ? `${prefix}.${key}` : key
    const isNested = value !== null && typeof value === 'object'

    if (isNested && !Array.isArray(value)) {
      rows.push(
        <tr key={fieldKey}>
          <td colSpan={2} className="pb-1 pt-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">{fieldKey}</span>
          </td>
        </tr>
      )
      rows.push(...renderRows(value as Record<string, unknown>, fieldKey))
    } else if (Array.isArray(value)) {
      rows.push(
        <tr key={fieldKey}>
          <td className="w-1/3 py-1.5 align-top text-xs font-medium text-black/60 dark:text-white/60">{fieldKey}</td>
          <td className="py-1.5 text-black dark:text-white">
            {value.length === 0 ? (
              <span className="text-xs italic text-black/30 dark:text-white/30">empty array</span>
            ) : (
              <ArrayDisplay items={value} />
            )}
          </td>
        </tr>
      )
    } else {
      const display = formatValue(value)
      rows.push(
        <tr key={fieldKey}>
          <td className="w-1/3 py-1.5 align-top text-xs font-medium text-black/60 dark:text-white/60">{key}</td>
          <td className="break-all py-1.5 text-sm text-black dark:text-white">{display}</td>
        </tr>
      )
    }
  }

  return rows
}

function ArrayDisplay({ items }: { items: unknown[] }) {
  const [expanded, setExpanded] = useState(false)

  if (items.length <= 3 && items.every(i => typeof i !== 'object' || i === null)) {
    return <span className="text-sm text-black dark:text-white">{items.map(v => formatValue(v)).join(', ')}</span>
  }

  return (
    <div>
      <button onClick={() => setExpanded(!expanded)} className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-300">
        {expanded ? '▼' : '▶'} {items.length} item{items.length > 1 ? 's' : ''}
      </button>
      {expanded && (
        <div className="mt-1 space-y-2">
          {items.map((item, i) => (
            <div key={i} className="rounded-lg border border-black/5 bg-black/2 p-2 dark:border-white/5 dark:bg-white/5">
              <div className="mb-1 text-[10px] font-medium text-black/40 dark:text-white/40">[{i}]</div>
              {typeof item === 'object' && item !== null ? (
                <table className="w-full text-xs">
                  <tbody>
                    {renderRows(item as Record<string, unknown>, '')}
                  </tbody>
                </table>
              ) : (
                <span className="text-sm text-black dark:text-white">{formatValue(item)}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function formatValue(value: unknown): ReactNode {
  if (value === null || value === undefined) return <span className="text-xs italic text-black/30 dark:text-white/30">null</span>
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'string') return value
  return String(value)
}
