import { useState, useCallback, useEffect } from 'react';
import { RefreshCw, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizQuestion } from '../../types';
import { useBilingualText } from '../../contexts/LanguageContext';
import { showSuccess, showWarning } from '../../utils/toast';

interface QuizCardProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export default function QuizCard({ questions, onComplete }: QuizCardProps) {
  const t = useBilingualText();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());
  const [allCorrect, setAllCorrect] = useState(false);

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setWrongIds(new Set());
    setAllCorrect(false);
  }, [questions]);

  const allAnswered = questions.every(q => answers[q.id] !== undefined);

  const handleSelect = (questionId: string, value: string) => {
    if (allCorrect) return;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = useCallback(() => {
    const wrong = new Set<string>();
    for (const q of questions) {
      if (answers[q.id] !== q.correctAnswer) {
        wrong.add(q.id);
      }
    }
    setWrongIds(wrong);
    setSubmitted(true);

    if (wrong.size > 0) {
      showWarning(`${wrong.size} question${wrong.size > 1 ? 's' : ''} incorrect. Try again!`);
    }

    if (wrong.size === 0) {
      setAllCorrect(true);
      showSuccess('All answers correct! Great job!');
      setTimeout(() => onComplete(), 1500);
    }
  }, [questions, answers, onComplete]);

  const handleRetryWrong = () => {
    const wrong = new Set<string>();
    for (const q of questions) {
      if (answers[q.id] !== q.correctAnswer) {
        wrong.add(q.id);
      }
    }
    setWrongIds(wrong);
    if (wrong.size === 0) {
      setAllCorrect(true);
      showSuccess('All answers correct! Great job!');
      setTimeout(() => onComplete(), 1500);
    }
  };

  const correctCount = questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const progress = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  if (allCorrect) {
    return (
      <motion.div
        className="p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 size={64} className="mx-auto mb-4" style={{ color: 'var(--success)' }} />
        </motion.div>
        <h3 className="mb-2 text-xl font-bold">All Correct!</h3>
        <p className="mb-6 text-muted">Great job! You have successfully completed the quiz.</p>
        <ArrowRight size={32} className="mx-auto" style={{ color: 'var(--primary)' }} />
      </motion.div>
    );
  }

  return (
    <div className="mb-8">
      <div className="mb-6">
        <div className="mb-2 h-[6px] w-full rounded-full bg-black/6 dark:bg-white/8">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${submitted ? progress : 0}%`,
              background: submitted ? (wrongIds.size === 0 ? 'var(--success)' : 'var(--warning)') : 'var(--primary)',
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">
            {submitted
              ? `${correctCount}/${questions.length} correct`
              : `${Object.keys(answers).length}/${questions.length} answered`}
          </span>
          {submitted && wrongIds.size > 0 && (
            <span className="text-sm" style={{ color: 'var(--danger)' }}>
              {wrongIds.size} remaining
            </span>
          )}
        </div>
      </div>

      {questions.map((q, i) => {
        const selected = answers[q.id];
        const isWrong = submitted && wrongIds.has(q.id);
        const isCorrect = submitted && !isWrong && selected === q.correctAnswer;
        const showResult = submitted;

        let optionStates: Record<string, 'correct' | 'wrong' | 'selected' | 'recheck' | null> = {};
        if (q.options) {
          q.options.forEach(opt => {
            const val = t(opt);
            if (showResult && val === q.correctAnswer) {
              optionStates[val] = 'correct';
            } else if (showResult && isWrong && val === selected) {
              optionStates[val] = 'recheck';
            } else if (selected === val) {
              optionStates[val] = 'selected';
            }
          });
        }

        return (
          <motion.div
            key={q.id}
            className={`mb-6 rounded-xl border bg-[--card] p-5 transition-all ${isWrong ? 'border-red-500 bg-red-50/50 dark:border-red-400 dark:bg-red-950/20' : ''} ${isCorrect ? 'border-emerald-500 bg-emerald-50/50 dark:border-emerald-400 dark:bg-emerald-950/20' : 'border-[--border]'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p className="mb-4 text-base font-semibold leading-relaxed">
              <span className="mr-2 font-medium text-muted">{i + 1}.</span>
              {t(q.question)}
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, j) => {
                const val = t(opt);
                const state = optionStates[val];
                let cls = 'flex items-center gap-3 rounded-lg border px-4 py-3 text-[0.9375rem] transition-all';
                if (state === 'correct') cls += ' border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/30';
                else if (state === 'wrong') cls += ' border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/30';
                else if (state === 'recheck') cls += ' border-amber-400 bg-amber-50 dark:border-amber-400 dark:bg-amber-900/30';
                else if (state === 'selected') cls += ' border-blue-500 bg-blue-50 dark:border-sky-400 dark:bg-sky-900/30';
                else if (showResult && !isWrong) cls += ' cursor-default border-gray-200 opacity-80 dark:border-gray-600';
                else cls += ' cursor-pointer border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 dark:border-gray-600 dark:hover:border-sky-400 dark:hover:bg-sky-900/20';

                return (
                  <label key={j} className={cls} onClick={() => {
                    if (!showResult || isWrong) handleSelect(q.id, val);
                  }}>
                    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-all" style={{
                      borderColor: state === 'correct' ? 'var(--success)' : state === 'wrong' ? 'var(--danger)' : state === 'recheck' ? 'var(--warning)' : state === 'selected' ? 'var(--primary)' : 'var(--border)',
                    }}>
                      {state === 'selected' && <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-sky-400" />}
                      {state === 'recheck' && <span className="h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-400" />}
                      {state === 'correct' && <span className="text-xs text-emerald-600 dark:text-emerald-400">✓</span>}
                      {state === 'wrong' && <span className="text-xs text-red-500 dark:text-red-400">✗</span>}
                    </span>
                    <span>{val}</span>
                  </label>
                );
              })}
            </div>
            <AnimatePresence>
              {showResult && isCorrect && (
                <motion.div
                  key="correct"
                  className="mt-3 animate-[slideUp_200ms_ease] rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <CheckCircle2 size={14} className="mr-1 inline" />
                  {t(q.explanation)}
                </motion.div>
              )}
              {showResult && isWrong && (
                <motion.div
                  key="wrong"
                  className="mt-3 animate-[slideUp_200ms_ease] rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/20 dark:text-red-400"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <XCircle size={14} className="mr-1 inline" />
                  {t(q.explanation)}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      <AnimatePresence>
        {!submitted && (
          <motion.div
            key="submit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-[0.625rem] text-[0.9375rem] font-medium text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:saturate-50 dark:bg-sky-500 dark:hover:bg-sky-600"
              disabled={!allAnswered}
              onClick={handleSubmit}
            >
              Submit Answers
            </button>
            {!allAnswered && (
              <p className="mt-2 text-xs text-muted">Answer all questions to submit</p>
            )}
          </motion.div>
        )}

        {submitted && wrongIds.size > 0 && (
          <motion.div
            key="retry"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-start gap-3"
          >
            <p className="text-muted">
              {wrongIds.size} question{wrongIds.size > 1 ? 's' : ''} incorrect. Fix the answers above and retry.
            </p>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-[0.625rem] text-[0.9375rem] font-medium text-white transition-all hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-600" onClick={handleRetryWrong}>
              <RefreshCw size={16} /> Check Answers Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
