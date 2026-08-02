import { RefreshCw, CircleCheck, CircleX } from 'lucide-react'
import { useState } from 'react'
import type { Exercise } from '../../types'
import { useBilingualText, useLanguage } from '../../contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ExerciseCardProps {
  exercise: Exercise
  index: number
  onCorrect: () => void
  onAttempt?: (exerciseId: string, selectedAnswer: string, isCorrect: boolean) => void
}

export default function ExerciseCard({ exercise, index, onCorrect, onAttempt }: ExerciseCardProps) {
  const t = useBilingualText()
  const { language } = useLanguage()
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)

  const handleSelect = (value: string) => {
    if (revealed) return
    setSelected(value)
    setRevealed(true)
    const isCorrect = value === exercise.correctAnswer
    if (isCorrect) {
      onCorrect()
    }
    onAttempt?.(exercise.id, value, isCorrect)
  }

  const handleRetry = () => {
    setSelected(null)
    setRevealed(false)
  }

  const isCorrect = selected === exercise.correctAnswer
  const showResult = revealed

  return (
    <div
      className={cn(
        'mb-4 rounded-xl border bg-card p-6 shadow-card transition-all',
        showResult && (isCorrect ? 'border-success/50' : 'border-destructive/50')
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors',
            showResult
              ? isCorrect
                ? 'bg-success/15 text-success'
                : 'bg-destructive/15 text-destructive'
              : 'bg-primary/10 text-primary'
          )}
        >
          {index + 1}
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {language === 'en' ? `Exercise ${index + 1}` : `លំហាត់ ${index + 1}`}
        </span>
        {showResult && (
          <span
            className={cn(
              'ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
              isCorrect ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive'
            )}
          >
            {isCorrect ? <CircleCheck size={13} /> : <CircleX size={13} />}
            {isCorrect
              ? language === 'en' ? 'Correct' : 'ត្រឹមត្រូវ'
              : language === 'en' ? 'Incorrect' : 'ខុស'}
          </span>
        )}
      </div>
      <p className="mb-4 text-base font-medium leading-relaxed text-foreground">{t(exercise.question)}</p>

      {exercise.options && (
        <div className="flex flex-col gap-2">
          {exercise.options.map((opt, i) => {
            const value = t(opt)
            const isAnswer = value === exercise.correctAnswer
            const isPicked = value === selected
            let cls =
              'group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-[0.9375rem] transition-all'
            if (showResult) {
              if (isAnswer) cls += ' border-success bg-success/10 text-success'
              else if (isPicked) cls += ' border-destructive bg-destructive/10 text-destructive'
              else cls += ' border-border text-muted-foreground opacity-60'
            } else {
              cls += ' border-border text-foreground hover:border-primary hover:bg-primary/5'
            }
            return (
              <button key={i} type="button" className={cls} onClick={() => handleSelect(value)}>
                <span
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.625rem] font-bold transition-colors',
                    showResult
                      ? isAnswer
                        ? 'border-success bg-success text-success-foreground'
                        : isPicked
                          ? 'border-destructive bg-destructive text-destructive-foreground'
                          : 'border-border'
                      : 'border-border text-transparent group-hover:border-primary'
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {value}
              </button>
            )
          })}
        </div>
      )}

      {showResult && (
        <div className="mt-4 flex flex-col gap-3 border-t pt-4">
          <div
            className={cn(
              'flex items-start gap-2.5 rounded-lg px-4 py-3 text-sm',
              isCorrect
                ? 'bg-success/10 text-success'
                : 'bg-destructive/10 text-destructive'
            )}
          >
            {isCorrect ? (
              <CircleCheck size={16} className="mt-0.5 shrink-0" />
            ) : (
              <CircleX size={16} className="mt-0.5 shrink-0" />
            )}
            <p className="leading-relaxed">{t(exercise.explanation)}</p>
          </div>
          {!isCorrect && (
            <Button variant="outline" size="sm" className="w-fit" onClick={handleRetry}>
              <RefreshCw size={14} />
              {language === 'en' ? 'Try Again' : 'ព្យាយាមម្តងទៀត'}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
