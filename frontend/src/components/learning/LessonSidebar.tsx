import { useNavigate } from 'react-router-dom';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { GrammarUnit } from '../../types';
import { useBilingualText } from '../../contexts/LanguageContext';
import { useProgress } from '../../api/progress';

interface LessonSidebarProps {
  units: GrammarUnit[];
  currentLessonId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function LessonSidebar({ units, currentLessonId, isOpen, onClose }: LessonSidebarProps) {
  const t = useBilingualText();
  const navigate = useNavigate();
  const { data: progressData } = useProgress();
  const completedLessons = progressData?.progress?.completedLessons ?? [];
  const activeRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={onClose} />}
      <aside className={`
        ${isOpen ? 'block' : 'hidden'}
        md:block
        max-md:fixed max-md:inset-0 max-md:top-16 max-md:z-40 max-md:overflow-y-auto max-md:bg-white max-md:p-4 dark:max-md:bg-black
        md:sticky md:top-6 md:max-h-[calc(100vh-8rem)] md:overflow-y-auto md:border-r md:border-black/10 md:pt-6 dark:md:border-white/10
      `}>
        {units.map(unit => (
          <div key={unit.id} className="mb-3">
            <div className="flex cursor-pointer items-center justify-between rounded-lg px-[0.625rem] py-2 text-sm font-semibold transition-colors hover:bg-black/4 dark:hover:bg-white/6" onClick={() => toggleUnit(unit.id)}>
              <span>{t(unit.title)}</span>
              <ChevronDown
                size={16}
                className="transition-transform duration-200"
                style={{
                  transform: expandedUnits.includes(unit.id) ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </div>
            {expandedUnits.includes(unit.id) && unit.chapters.map(chapter => (
              <div key={chapter.id} className="ml-2 mt-1">
                <div className="px-[0.625rem] py-[0.375rem] text-xs font-semibold uppercase tracking-wider text-black dark:text-white">{t(chapter.title)}</div>
                {chapter.lessons.map(lesson => {
                  const isActive = lesson.id === currentLessonId;
                  const completed = completedLessons.includes(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      ref={isActive ? activeRef : undefined}
                      className={`ml-2 flex cursor-pointer items-center gap-2 rounded-lg px-[0.625rem] py-[0.375rem] text-sm text-black dark:text-white transition-all hover:bg-black/4 hover:text-black dark:hover:bg-white/6 dark:hover:text-white ${isActive ? 'bg-blue-100 font-medium dark:bg-sky-900/40' : ''}`}
                      onClick={() => { navigate(`/learn/grammar/${lesson.id}`); onClose(); }}
                    >
                      <span className={`flex shrink-0 items-center justify-center rounded-full ${completed ? 'bg-emerald-500 text-white' : 'border-2 border-black/20 dark:border-white/20'} h-4 w-4 text-[0.625rem]`}>
                        {completed ? <CheckCircle2 size={12} /> : null}
                      </span>
                      <span>{t(lesson.title)}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </aside>
    </>
  );
}
