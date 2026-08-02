import type { Level, StoryLevel } from '../../types'

interface BadgeProps {
  variant: Level | StoryLevel | string
  children: string
}

export default function Badge({ variant, children }: BadgeProps) {
  let cls = 'inline-flex items-center px-[0.625rem] py-[0.25rem] rounded-full text-xs font-medium '
  if (variant === 'beginner' || variant === 'A1') cls += 'bg-blue-500/10 text-[--primary]'
  else if (variant === 'intermediate' || variant === 'A2') cls += 'bg-purple-500/10 text-secondary'
  else if (variant === 'B1') cls += 'bg-amber-500/10 text-warning'
  else cls += 'bg-blue-500/10 text-[--primary]'

  return <span className={cls}>{children}</span>
}
