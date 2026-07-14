import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import { useBilingualText, useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { grammarUnits } from '../data/grammar';
import Badge from '../components/ui/Badge';
import type { Level } from '../types';

export default function Grammar() {
  const t = useBilingualText();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { getLessonProgress } = useProgress();

  const [levelFilter, setLevelFilter] = useState<Level | 'all'>('all');
  const [expandedUnits, setExpandedUnits] = useState<string[]>(grammarUnits.map(u => u.id));

  const filteredUnits = useMemo(() => {
    if (levelFilter === 'all') return grammarUnits;
    return grammarUnits.filter(unit => unit.level === levelFilter);
  }, [levelFilter]);

  useEffect(() => {
    setExpandedUnits(filteredUnits.map(u => u.id));
  }, [levelFilter]);

  const totalLessons = grammarUnits.reduce((sum, u) =>
    sum + u.chapters.reduce((cs, c) => cs + c.lessons.length, 0), 0
  );
  const completedLessons = grammarUnits.reduce((sum, u) =>
    sum + u.chapters.reduce((cs, c) =>
      cs + c.lessons.filter(l => getLessonProgress(l.id) === 'completed').length, 0
    ), 0
  );

  const toggleUnit = (id: string) => {
    setExpandedUnits(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  return (
    <div className="animate-[fadeIn_300ms_ease] py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-[1.875rem] font-bold">{language === 'en' ? 'Grammar Lessons' : 'មេរៀនវេយ្យាករណ៍'}</h1>
        <p className="text-[1.0625rem] text-muted">{language === 'en' ? 'Learn English grammar with clear explanations and practice' : 'រៀនវេយ្យាករណ៍ភាសាអង់គ្លេសជាមួយការពន្យល់ច្បាស់លាស់ និងការអនុវត្ត'}</p>
      </div>

      {totalLessons > 0 && (
        <div className="mb-6 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
          <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
            <div className="mb-1 text-3xl font-bold text-[--primary]">{completedLessons}/{totalLessons}</div>
            <div className="text-sm text-muted">{language === 'en' ? 'Lessons Completed' : 'មេរៀនបានបញ្ចប់'}</div>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {(['all', 'beginner', 'intermediate'] as const).map(level => (
          <button
            key={level}
            className={`shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
              levelFilter === level
                ? 'border-blue-600 bg-blue-600 text-white shadow-sm dark:border-sky-500 dark:bg-sky-500'
                : 'border-gray-200 bg-white text-gray-500 hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-sky-400 dark:hover:text-sky-400'
            }`}
            onClick={() => setLevelFilter(level)}
          >
            {level === 'all'
              ? (language === 'en' ? 'All Levels' : 'គ្រប់កម្រិត')
              : level === 'beginner'
                ? (language === 'en' ? 'Beginner' : 'កម្រិតដំបូង')
                : (language === 'en' ? 'Intermediate' : 'កម្រិតមធ្យម')}
          </button>
        ))}
      </div>

      {filteredUnits.map(unit => (
        <div key={unit.id} className="mb-8">
          <div className="mb-4 flex cursor-pointer items-center gap-3 border-b-2 border-[--primary] pb-3" onClick={() => toggleUnit(unit.id)}>
            {expandedUnits.includes(unit.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">{language === 'en' ? `Unit ${unit.order}` : `មេរៀនទី ${unit.order}`}</p>
              <h2 className="text-xl font-bold">{t(unit.title)}</h2>
            </div>
          </div>

          {expandedUnits.includes(unit.id) && unit.chapters.map(chapter => (
            <div key={chapter.id} className="mb-4 ml-6">
              <p className="col-span-full px-0 py-2 text-xs font-semibold uppercase tracking-wider text-muted">{t(chapter.title)}</p>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
                {chapter.lessons.map(lesson => {
                  const progress = getLessonProgress(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      className="cursor-pointer rounded-xl border border-[--border] bg-[--card] p-6 shadow-[--shadow] transition-all hover:-translate-y-0.5 hover:shadow-[--shadow-md]"
                      onClick={() => navigate(`/grammar/${lesson.id}`)}
                    >
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <BookOpen size={16} style={{ color: 'var(--muted)' }} />
                          <Badge variant={lesson.level}>
                            {lesson.level === 'beginner' ? 'Beginner' : 'Intermediate'}
                          </Badge>
                          {progress === 'completed' && (
                            <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-sm text-muted">
                          <Clock size={14} />
                          {lesson.estimatedMinutes} min
                        </span>
                      </div>
                      <h3 className="mb-1 text-lg font-semibold">{t(lesson.title)}</h3>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}

      {filteredUnits.length === 0 && (
        <div className="px-6 py-12 text-center text-muted">
          <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--muted)' }} />
          <h3 className="mb-2 text-lg font-semibold text-[--foreground]">{language === 'en' ? 'No lessons found' : 'រកមិនឃើញមេរៀនទេ'}</h3>
          <p>{language === 'en' ? 'Try a different filter' : 'សាកល្បងតម្រងផ្សេង'}</p>
        </div>
      )}
    </div>
  );
}
