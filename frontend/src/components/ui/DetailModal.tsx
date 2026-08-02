import type { ReactNode } from 'react'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog'
import { Button } from './button'

interface DetailModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  data: Record<string, unknown> | null
}

export default function DetailModal({ isOpen, onClose, title, data }: DetailModalProps) {
  if (!data) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[65vh] overflow-y-auto rounded-lg border bg-muted/20">
          <table className="w-full text-sm">
            <tbody>
              {renderRows(data, '')}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <CopyButton data={data} />
        </div>
      </DialogContent>
    </Dialog>
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
    <Button variant="outline" size="sm" onClick={handleCopy}>
      {copied ? <Check className="text-success" /> : <Copy />}
      {copied ? 'Copied' : 'Copy JSON'}
    </Button>
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
          <td colSpan={2} className="px-4 pb-1 pt-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{fieldKey}</span>
          </td>
        </tr>
      )
      rows.push(...renderRows(value as Record<string, unknown>, fieldKey))
    } else if (Array.isArray(value)) {
      rows.push(
        <tr key={fieldKey}>
          <td className="w-1/3 px-4 py-1.5 align-top text-xs font-medium text-muted-foreground">{fieldKey}</td>
          <td className="px-4 py-1.5 text-foreground">
            {value.length === 0 ? (
              <span className="text-xs italic text-muted-foreground/60">empty array</span>
            ) : (
              <ArrayDisplay items={value} />
            )}
          </td>
        </tr>
      )
    } else {
      const display = formatValue(value)
      rows.push(
        <tr key={fieldKey} className="border-b border-border/50">
          <td className="w-1/3 px-4 py-1.5 align-top text-xs font-medium text-muted-foreground">{key}</td>
          <td className="break-all px-4 py-1.5 text-sm text-foreground">{display}</td>
        </tr>
      )
    }
  }

  return rows
}

function ArrayDisplay({ items }: { items: unknown[] }) {
  const [expanded, setExpanded] = useState(false)

  if (items.length <= 3 && items.every(i => typeof i !== 'object' || i === null)) {
    return <span className="text-sm text-foreground">{items.map(v => formatValue(v)).join(', ')}</span>
  }

  return (
    <div>
      <button onClick={() => setExpanded(!expanded)} className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
        {expanded ? '▼' : '▶'} {items.length} item{items.length > 1 ? 's' : ''}
      </button>
      {expanded && (
        <div className="mt-1 space-y-2">
          {items.map((item, i) => (
            <div key={i} className="rounded-lg border border-border/60 bg-card p-2">
              <div className="mb-1 text-[10px] font-medium text-muted-foreground">[{i}]</div>
              {typeof item === 'object' && item !== null ? (
                <table className="w-full text-xs">
                  <tbody>
                    {renderRows(item as Record<string, unknown>, '')}
                  </tbody>
                </table>
              ) : (
                <span className="text-sm text-foreground">{formatValue(item)}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function formatValue(value: unknown): ReactNode {
  if (value === null || value === undefined) return <span className="text-xs italic text-muted-foreground/60">null</span>
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'string') return value
  return String(value)
}
