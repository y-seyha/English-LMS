import { motion } from 'framer-motion';
import type { GrammarLesson } from '../../types';
import { useBilingualText, useLanguage } from '../../contexts/LanguageContext';
import { useSpeech } from '../../hooks/useSpeech';
import { Speaker, AlertTriangle, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface LessonContentProps {
  lesson: GrammarLesson;
}

function FormSection({ title, icon, color, structure, examples }: {
  title: { en: string; km: string };
  icon: React.ReactNode;
  color: string;
  structure: string;
  examples: { en: string; km: string }[];
}) {
  const { speak } = useSpeech();
  const { language } = useLanguage();

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
        <span style={{ color }}>{icon}</span>
        {language === 'en' ? title.en : title.km}
      </h3>
      <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 font-mono text-[0.9375rem] text-blue-700 dark:border-sky-800 dark:bg-sky-950/20 dark:text-sky-300">{structure}</div>
      <div className="flex flex-col gap-2">
        {examples.map((ex, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-[--border] bg-black/2 px-4 py-3 dark:bg-white/2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <span className="flex-1 text-[0.9375rem]">
              {ex.en}
              <button className="ml-1 inline-flex shrink-0 items-center justify-center rounded-lg p-[0.375rem] text-muted hover:bg-black/4 hover:text-[--primary] dark:hover:bg-white/6" onClick={() => speak(ex.en)} title="Listen">
                <Speaker size={14} />
              </button>
            </span>
            <span className="text-sm text-muted">{ex.km}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function LessonContent({ lesson }: LessonContentProps) {
  const t = useBilingualText();
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-base leading-relaxed text-muted">{t(lesson.definition)}</p>
      </motion.div>

      <FormSection
        title={{ en: 'Affirmative', km: 'ទម្រង់បញ្ជាក់' }}
        icon={<CheckCircle2 size={18} />}
        color="var(--success)"
        structure={lesson.forms.affirmative.structure}
        examples={lesson.forms.affirmative.examples}
      />

      <FormSection
        title={{ en: 'Negative', km: 'ទម្រង់បដិសេធ' }}
        icon={<XCircle size={18} />}
        color="var(--danger)"
        structure={lesson.forms.negative.structure}
        examples={lesson.forms.negative.examples}
      />

      <FormSection
        title={{ en: 'Question', km: 'ទម្រង់សំណួរ' }}
        icon={<HelpCircle size={18} />}
        color="var(--primary)"
        structure={lesson.forms.question.structure}
        examples={lesson.forms.question.examples}
      />

      {lesson.commonMistakes.length > 0 && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle size={18} style={{ color: 'var(--warning)' }} />
            {language === 'en' ? 'Common Mistakes' : 'កំហុសទូទៅ'}
          </h3>
          <div className="flex flex-col gap-3">
            {lesson.commonMistakes.map((m, i) => (
              <motion.div
                key={i}
                className="rounded-lg border border-[--border] p-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="mb-1 text-[--danger] line-through">{m.mistake}</p>
                <p className="mb-2 font-medium text-[--success]">{m.correction}</p>
                <p className="text-sm leading-relaxed text-muted">{t(m.reason)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
