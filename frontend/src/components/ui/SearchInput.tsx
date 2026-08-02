import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounce?: number
  className?: string
}

export default function SearchInput({ value, onChange, placeholder = 'Search...', debounce = 300, className }: SearchInputProps) {
  const [local, setLocal] = useState(value)

  useEffect(() => {
    setLocal(value)
  }, [value])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (local !== value) onChange(local)
    }, debounce)
    return () => clearTimeout(timer)
  }, [local, debounce, onChange, value])

  return (
    <div className={cn('relative', className)}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        value={local}
        onChange={e => setLocal(e.target.value)}
        placeholder={placeholder}
        className="flex h-9 w-full rounded-lg border border-input bg-card py-2 pl-9 pr-3 text-sm text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  )
}
