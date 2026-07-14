interface ProgressBarProps {
  value: number
  max?: number
  className?: string
}

export default function ProgressBar({ value, max = 100, className = '' }: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={`h-2 w-full rounded-full bg-black/6 dark:bg-white/8 ${className}`}>
      <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${pct}%` }} />
    </div>
  )
}
