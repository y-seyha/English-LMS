import { useState } from 'react'
import type { Exercise } from '../../types'
import { useBilingualText } from '../../contexts/LanguageContext'

interface ExerciseCardProps {
  exercise: Exercise
  index: number
  onCorrect: () => void
}

export default function ExerciseCard({ exercise, index, onCorrect }: ExerciseCardProps) {
  const t = useBilingualText()
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)

  const handleSelect = (value: string) => {
    if (revealed) return
    setSelected(value)
    setRevealed(true)
    if (value === exercise.correctAnswer) {
      onCorrect()
    }
  }

  const isCorrect = selected === exercise.correctAnswer
  const showResult = revealed

  return (
    <div className={`mb-4 rounded-xl border bg-[--card] p-6 shadow-[--shadow] transition-shadow duration-200 ${showResult ? (isCorrect ? 'border-l-3 border-l-emerald-500 dark:border-l-emerald-400' : 'border-l-3 border-l-red-500 dark:border-l-red-400') : 'border-l-3 border-l-blue-600 border-[--border] dark:border-l-sky-500'}`}>
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">Exercise {index + 1}</div>
      <p className="mb-4 text-base font-medium leading-relaxed">{t(exercise.question)}</p>

      {exercise.options && (
        <div className="flex flex-col gap-2">
          {exercise.options.map((opt, i) => {
            const value = t(opt)
            let cls = 'w-full text-left rounded-lg border px-4 py-3 text-[0.9375rem] transition-all'
            if (showResult) {
              if (value === exercise.correctAnswer) cls += ' border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-400'
              else if (value === selected) cls += ' border-red-500 bg-red-50 text-red-600 dark:border-red-400 dark:bg-red-900/30 dark:text-red-400'
              else cls += ' border-gray-200 text-gray-500 dark:border-gray-600 dark:text-gray-400'
            } else {
              cls += ' border-gray-200 text-[--foreground] hover:border-blue-500 hover:bg-blue-50 dark:border-gray-600 dark:hover:border-sky-400 dark:hover:bg-sky-900/20'
            }
            return (
              <button key={i} className={cls} onClick={() => handleSelect(value)}>
                {value}
              </button>
            )
          })}
        </div>
      )}

      {showResult && (
        <div className={`mt-4 rounded-lg border px-4 py-3 text-sm ${isCorrect ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400' : 'border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400'}`}>
          <p>
            {isCorrect ? '✓ ' : '✗ '}
            {t(exercise.explanation)}
          </p>
        </div>
      )}
    </div>
  )
}
