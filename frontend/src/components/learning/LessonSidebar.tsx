import { useNavigate } from 'react-router-dom';
import { ChevronDown, CheckCircle2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { GrammarUnit } from '../../types';
import { useBilingualText, useLanguage } from '../../contexts/LanguageContext';
import { useProgress } from '../../api/progress';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface LessonSidebarProps {
  units: GrammarUnit[];
  currentLessonId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function LessonSidebar({ units, currentLessonId, isOpen, onClose }: LessonSidebarProps) {
  const t = useBilingualText();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { data: progressData } = useProgress();
  const completedLessons = progressData?.progress?.completedLessons ?? [];
  const activeRef = useRef<HTMLDivElement>(null);

  const totalLessons = units.reduce(
    (sum, unit) => sum + unit.chapters.reduce((cs, c) => cs + (c.lessons?.length ?? 0), 0),
    0,
  );

  const findCurrentUnitId = () => {
    for (const unit of units) {
      for (const chapter of unit.chapters) {
        if (chapter.lessons.some(l => l.id === currentLessonId)) return unit.id;
      }
    }
    return units[0]?.id ?? '';
  };

  const [expandedUnits, setExpandedUnits] = useState<string[]>(() => {
    const unitId = findCurrentUnitId();
    return unitId ? [unitId] : [];
  });

  useEffect(() => {
    const unitId = findCurrentUnitId();
    if (unitId) {
      setExpandedUnits(prev => prev.includes(unitId) ? prev : [...prev, unitId]);
    }
  }, [currentLessonId, units]);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentLessonId, isOpen]);

  const toggleUnit = (id: string) => {
    setExpandedUnits(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const nav = (
    <div className="flex h-full flex-col">
      <div className="shrink-0 border-b px-3 pb-3 pt-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {language === 'en' ? 'Lesson Content' : 'មាតិកាមេរៀន'}
          </p>
          <button
            type="button"
            className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
            onClick={onClose}
            aria-label="Close lessons"
          >
            <X size={16} />
          </button>
        </div>
        {totalLessons > 0 && (
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span>{language === 'en' ? 'Progress' : 'វឌ្ឍនភាព'}</span>
              <span>
                {completedLessons.length}/{totalLessons}
              </span>
            </div>
            <Progress value={(completedLessons.length / totalLessons) * 100} className="h-1.5" />
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto py-2">
        {units.map(unit => (
          <div key={unit.id} className="mb-1 px-1.5">
            <div
              className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              onClick={() => toggleUnit(unit.id)}
            >
              <span>{t(unit.title)}</span>
              <ChevronDown
                size={16}
                className={cn(
                  'text-muted-foreground transition-transform duration-200',
                  expandedUnits.includes(unit.id) && 'rotate-180'
                )}
              />
            </div>
            {expandedUnits.includes(unit.id) && unit.chapters.map(chapter => (
              <div key={chapter.id} className="ml-1.5 mt-0.5">
                <div className="px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t(chapter.title)}
                </div>
                {chapter.lessons.map(lesson => {
                  const isActive = lesson.id === currentLessonId;
                  const completed = completedLessons.includes(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      ref={isActive ? activeRef : undefined}
                      className={cn(
                        'ml-2 flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-all',
                        isActive
                          ? 'bg-primary/10 font-medium text-primary'
                          : 'text-foreground hover:bg-accent'
                      )}
                      onClick={() => { navigate(`/learn/grammar/${lesson.id}`); onClose(); }}
                    >
                      <span
                        className={cn(
                          'flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[0.625rem]',
                          completed ? 'bg-success/15 text-success' : 'border-2 border-border'
                        )}
                      >
                        {completed ? <CheckCircle2 size={12} /> : null}
                      </span>
                      <span className="truncate">{t(lesson.title)}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}
      {/* Desktop: card panel */}
      <aside className="hidden lg:block">
        <div className="sticky top-4 h-[calc(100vh-6rem)] overflow-hidden rounded-xl border bg-card shadow-card">
          {nav}
        </div>
      </aside>
      {/* Mobile: drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-[300px] max-w-[85vw] border-r bg-card shadow-lg transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {nav}
      </div>
    </>
  );
}
