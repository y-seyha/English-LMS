import { useState, useCallback, useEffect } from 'react';
import { RefreshCw, CheckCircle2, XCircle, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizQuestion } from '../../types';
import { useBilingualText } from '../../contexts/LanguageContext';
import { showSuccess, showWarning } from '../../utils/toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export interface QuizAnswer {
  questionId: string;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface QuizCardProps {
  questions: QuizQuestion[];
  completed?: boolean;
  onComplete: (answers: QuizAnswer[], isFinalSubmit: boolean) => void;
}

export default function QuizCard({ questions, completed, onComplete }: QuizCardProps) {
  const t = useBilingualText();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());
  const [allCorrect, setAllCorrect] = useState(false);

  useEffect(() => {
    if (!completed) {
      setAnswers({});
      setSubmitted(false);
      setWrongIds(new Set());
      setAllCorrect(false);
    }
  }, [questions, completed]);

  const buildAnswers = useCallback(() =>
    questions.map(q => ({
      questionId: q.id,
      questionText: t(q.question),
      selectedAnswer: answers[q.id] ?? '',
      correctAnswer: q.correctAnswer,
      isCorrect: answers[q.id] === q.correctAnswer,
    })),
    [questions, answers]
  );

  const allAnswered = questions.every(q => answers[q.id] !== undefined);

  const handleSelect = (questionId: string, value: string) => {
    if (allCorrect || completed) return;
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
      showWarning(`${wrong.size} question${wrong.size > 1 ? 's' : ''} incorrect. Saved for review.`);
    } else {
      showSuccess('All answers correct! Great job!');
    }

    onComplete(buildAnswers(), wrong.size === 0);
    if (wrong.size === 0) {
      setAllCorrect(true);
    }
  }, [questions, answers, onComplete, buildAnswers]);

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
      onComplete(buildAnswers(), true);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setSubmitted(false);
    setWrongIds(new Set());
    setAllCorrect(false);
  };

  const correctCount = questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const progress = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  if (completed) {
    return (
      <Card className="p-8">
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
            <CheckCircle2 className="mx-auto mb-4 size-16 text-success" />
          </motion.div>
          <h3 className="mb-2 text-xl font-bold">Quiz Completed</h3>
          <p className="mb-6 text-muted-foreground">You have already passed this quiz.</p>
        </motion.div>
      </Card>
    );
  }

  if (allCorrect) {
    return (
      <Card className="p-8">
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
            <CheckCircle2 className="mx-auto mb-4 size-16 text-success" />
          </motion.div>
          <h3 className="mb-2 text-xl font-bold">All Correct!</h3>
          <p className="mb-6 text-muted-foreground">Great job! You have successfully completed the quiz.</p>
          <ArrowRight size={32} className="mx-auto text-primary" />
        </motion.div>
      </Card>
    );
  }

  return (
    <div className="mb-8">
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium">
            {submitted
              ? `${correctCount}/${questions.length} correct`
              : `${Object.keys(answers).length}/${questions.length} answered`}
          </span>
          {submitted && wrongIds.size > 0 && (
            <span className="text-sm font-medium text-warning">
              {wrongIds.size} remaining
            </span>
          )}
        </div>
        <Progress
          value={submitted ? progress : 0}
          className={cn(
            submitted && wrongIds.size === 0 && '[&>div]:bg-success',
            submitted && wrongIds.size > 0 && '[&>div]:bg-warning'
          )}
        />
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
            className="mb-6 rounded-xl border border-border bg-card p-5 shadow-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p className="mb-4 flex items-start gap-2 text-base font-semibold leading-relaxed">
              <span className="mt-0.5 inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 px-1.5 text-sm font-semibold text-primary">
                {i + 1}
              </span>
              <span>{t(q.question)}</span>
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, j) => {
                const val = t(opt);
                const state = optionStates[val];
                let cls = 'flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-[0.9375rem] transition-all';
                if (state === 'correct') cls += ' border-success bg-success/10 text-success';
                else if (state === 'wrong') cls += ' border-destructive bg-destructive/10 text-destructive';
                else if (state === 'recheck') cls += ' border-warning bg-warning/10 text-warning';
                else if (state === 'selected') cls += ' border-primary bg-primary/5 text-foreground';
                else if (showResult && !isWrong) cls += ' cursor-default border-border text-muted-foreground opacity-60';
                else cls += ' cursor-pointer border-border text-foreground hover:border-primary hover:bg-primary/5';

                return (
                  <button
                    key={j}
                    type="button"
                    className={cls}
                    onClick={() => {
                      if (!showResult || isWrong) handleSelect(q.id, val);
                    }}
                  >
                    <span
                      className={cn(
                        'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-all',
                        state === 'correct'
                          ? 'border-success'
                          : state === 'wrong'
                            ? 'border-destructive'
                            : state === 'recheck'
                              ? 'border-warning'
                              : state === 'selected'
                                ? 'border-primary'
                                : 'border-border'
                      )}
                    >
                      {state === 'selected' && <span className="h-2 w-2 rounded-full bg-primary" />}
                      {state === 'recheck' && <XCircle size={12} className="text-warning" />}
                      {state === 'correct' && <Check size={12} className="text-success" />}
                    </span>
                    <span>{val}</span>
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {showResult && isCorrect && (
                <motion.div
                  key="correct"
                  className="mt-3 overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Alert variant="success">
                    <CheckCircle2 />
                    <AlertDescription>{t(q.explanation)}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
              {showResult && isWrong && (
                <motion.div
                  key="wrong"
                  className="mt-3 overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Alert variant="destructive">
                    <XCircle />
                    <AlertDescription>{t(q.explanation)}</AlertDescription>
                  </Alert>
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
            <Button
              disabled={!allAnswered}
              onClick={handleSubmit}
            >
              Submit Answers
            </Button>
            {!allAnswered && (
              <p className="mt-2 text-xs text-muted-foreground">Answer all questions to submit</p>
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
            <p className="text-sm text-muted-foreground">
              {wrongIds.size} question{wrongIds.size > 1 ? 's' : ''} incorrect. Fix the answers above and retry.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleRetryWrong}>
                <RefreshCw size={16} /> Check Answers Again
              </Button>
              <Button variant="outline" onClick={handleRestart}>
                <RefreshCw size={16} /> Restart All
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
