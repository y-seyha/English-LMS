import { useNavigate } from 'react-router-dom';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { GrammarUnit } from '../../types';
import { useBilingualText } from '../../contexts/LanguageContext';
import { useProgress } from '../../contexts/ProgressContext';

interface LessonSidebarProps {
  units: GrammarUnit[];
  currentLessonId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function LessonSidebar({ units, currentLessonId, isOpen, onClose }: LessonSidebarProps) {
  const t = useBilingualText();
  const navigate = useNavigate();
  const { getLessonProgress } = useProgress();
  const activeRef = useRef<HTMLDivElement>(null);

  const findCurrentUnitId = () => {
    for (const unit of units) {
      for (const chapter of unit.chapters) {
        if (chapter.lessons.some(l => l.id === currentLessonId)) return unit.id;
      }
    }
    return units[0]?.id ?? '';
  };

  const [expandedUnits, setExpandedUnits] = useState<string[]>([findCurrentUnitId()]);

  useEffect(() => {
    const unitId = findCurrentUnitId();
    setExpandedUnits(prev =>
      prev.includes(unitId) ? prev : [...prev, unitId]
    );
  }, [currentLessonId]);

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
        max-md:fixed max-md:inset-0 max-md:top-16 max-md:z-40 max-md:overflow-y-auto max-md:bg-white max-md:p-4 dark:max-md:bg-gray-900
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
                <div className="px-[0.625rem] py-[0.375rem] text-xs font-semibold uppercase tracking-wider text-muted">{t(chapter.title)}</div>
                {chapter.lessons.map(lesson => {
                  const isActive = lesson.id === currentLessonId;
                  const progress = getLessonProgress(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      ref={isActive ? activeRef : undefined}
                      className={`ml-2 flex cursor-pointer items-center gap-2 rounded-lg px-[0.625rem] py-[0.375rem] text-sm text-muted transition-all hover:bg-black/4 hover:text-[--foreground] dark:hover:bg-white/6 ${isActive ? 'bg-blue-100 font-medium text-blue-700 dark:bg-sky-900/40 dark:text-sky-300' : ''}`}
                      onClick={() => { navigate(`/grammar/${lesson.id}`); onClose(); }}
                    >
                      <span className={`flex shrink-0 items-center justify-center rounded-full ${progress === 'completed' ? 'bg-[--success] text-white' : 'border-2 border-[--border]'} h-4 w-4 text-[0.625rem]`}>
                        {progress === 'completed' ? <CheckCircle2 size={12} /> : null}
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
