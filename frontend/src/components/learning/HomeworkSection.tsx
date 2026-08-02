import { CheckCircle2, BookOpen, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { HomeworkTask } from '../../types';
import { useBilingualText } from '../../contexts/LanguageContext';
import { useCompleteHomework } from '../../api/progress';

interface HomeworkSectionProps {
  tasks: HomeworkTask[];
  lessonId?: string;
}

export default function HomeworkSection({ tasks, lessonId }: HomeworkSectionProps) {
  const t = useBilingualText();
  const completeHomework = useCompleteHomework();
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setCompletedTasks(new Set());
    setSaved(false);
  }, [tasks]);

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = async () => {
    if (!lessonId || saved) return;
    try {
      await completeHomework.mutateAsync({ lessonId, taskIds: Array.from(completedTasks) });
      setSaved(true);
    } catch {}
  };

  const allDone = completedTasks.size === tasks.length && tasks.length > 0;

  return (
    <div>
      <div className="mb-8">
        <p className="leading-relaxed text-muted">
          Complete the following homework tasks to practice what you have learned.
        </p>
      </div>

      {tasks.map((task) => {
        const isDone = completedTasks.has(task.id);
        return (
          <div
            key={task.id}
            className={`mb-4 cursor-pointer rounded-xl border bg-[--card] p-6 shadow-[--shadow] transition-all ${isDone ? 'border-[--success]' : 'border-[--border]'}`}
            onClick={() => toggleTask(task.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white transition-all ${isDone ? 'bg-[--success]' : 'bg-[--border]'}`}>
                {isDone ? <CheckCircle2 size={16} /> : <BookOpen size={14} />}
              </div>
              <span className={`flex-1 text-[0.9375rem] ${isDone ? 'text-muted line-through' : 'text-[--foreground]'}`}>
                {t(task.instruction)}
              </span>
            </div>
          </div>
        );
      })}

      {tasks.length > 0 && !saved && (
        <button
          onClick={handleSave}
          disabled={!allDone || completeHomework.isPending}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:opacity-50 dark:bg-sky-500 dark:hover:bg-sky-600"
        >
          {completeHomework.isPending ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
          {allDone ? 'Save Progress' : 'Complete all tasks to save'}
        </button>
      )}

      {saved && (
        <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={16} /> Homework saved
        </div>
      )}

      {tasks.length === 0 && (
        <div className="px-6 py-12 text-center text-muted">
          <h3 className="text-lg font-semibold text-[--foreground]">No homework for this lesson</h3>
        </div>
      )}
    </div>
  );
}
