import { CheckCircle2, BookOpen } from 'lucide-react';
import { useState } from 'react';
import type { HomeworkTask } from '../../types';
import { useBilingualText } from '../../contexts/LanguageContext';

interface HomeworkSectionProps {
  tasks: HomeworkTask[];
}

export default function HomeworkSection({ tasks }: HomeworkSectionProps) {
  const t = useBilingualText();
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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

      {tasks.length === 0 && (
        <div className="px-6 py-12 text-center text-muted">
          <h3 className="text-lg font-semibold text-[--foreground]">No homework for this lesson</h3>
        </div>
      )}
    </div>
  );
}
