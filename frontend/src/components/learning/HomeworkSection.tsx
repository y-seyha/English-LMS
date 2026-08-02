import { CheckCircle2, BookOpen, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { HomeworkTask } from '../../types';
import { useBilingualText, useLanguage } from '../../contexts/LanguageContext';
import { useCompleteHomework } from '../../api/progress';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import EmptyState from '@/components/ui/EmptyState';
import { cn } from '@/lib/utils';

interface HomeworkSectionProps {
  tasks: HomeworkTask[];
  lessonId?: string;
}

export default function HomeworkSection({ tasks, lessonId }: HomeworkSectionProps) {
  const t = useBilingualText();
  const { language } = useLanguage();
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
        <p className="leading-relaxed text-muted-foreground">
          {language === 'en'
            ? 'Complete the following homework tasks to practice what you have learned.'
            : 'បំពេញកិច្ចការផ្ទះខាងក្រោម ដើម្បីអនុវត្តនូវអ្វីដែលអ្នកបានរៀន។'}
        </p>
      </div>

      {tasks.map((task) => {
        const isDone = completedTasks.has(task.id);
        return (
          <Card
            key={task.id}
            className={cn(
              'mb-4 cursor-pointer p-5 transition-all hover:shadow-card-md',
              isDone && 'border-success'
            )}
            onClick={() => toggleTask(task.id)}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all',
                  isDone ? 'text-success' : 'border-2 border-border text-muted-foreground'
                )}
              >
                {isDone ? <CheckCircle2 size={16} /> : <BookOpen size={14} />}
              </span>
              <span
                className={cn(
                  'flex-1 text-[0.9375rem]',
                  isDone ? 'text-muted-foreground line-through' : 'text-foreground'
                )}
              >
                {t(task.instruction)}
              </span>
            </div>
          </Card>
        );
      })}

      {tasks.length > 0 && !saved && (
        <Button
          onClick={handleSave}
          disabled={!allDone || completeHomework.isPending}
          variant={allDone ? 'success' : 'default'}
          className="mt-4"
        >
          {completeHomework.isPending ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
          {allDone
            ? language === 'en' ? 'Save Progress' : 'រក្សាទុកវឌ្ឍនភាព'
            : language === 'en' ? 'Complete all tasks to save' : 'បំពេញកិច្ចការទាំងអស់ដើម្បីរក្សាទុក'}
        </Button>
      )}

      {saved && (
        <Alert variant="success" className="mt-4">
          <CheckCircle2 />
          <AlertDescription>
            {language === 'en' ? 'Homework saved' : 'បានរក្សាទុកកិច្ចការផ្ទះ'}
          </AlertDescription>
        </Alert>
      )}

      {tasks.length === 0 && (
        <EmptyState
          icon={<BookOpen size={24} />}
          title={language === 'en' ? 'No homework for this lesson' : 'មិនមានកិច្ចការផ្ទះសម្រាប់មេរៀននេះទេ'}
        />
      )}
    </div>
  );
}
