import { motion } from "framer-motion";
import type { GrammarLesson } from "../../types";
import { useBilingualText, useLanguage } from "../../contexts/LanguageContext";
import { useSpeech } from "../../hooks/useSpeech";
import {
  Speaker,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LessonContentProps {
  lesson: GrammarLesson;
}

function FormSection({
  title,
  icon,
  color,
  structure,
  examples,
}: {
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
      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ color, backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)` }}
        >
          {icon}
        </span>
        {language === "en" ? title.en : title.km}
      </h3>
      <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
        <code className="font-mono text-[0.9375rem] leading-relaxed text-primary">{structure}</code>
        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0 text-primary/70 hover:text-primary"
          onClick={() => speak(structure)}
          title="Listen"
          aria-label="Listen to structure"
        >
          <Speaker size={15} />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {examples.map((ex, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-accent/40"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <span className="flex flex-1 items-center text-[0.9375rem] text-foreground">
              {ex.en}
              <Button
                variant="ghost"
                size="icon-sm"
                className="ml-1 text-muted-foreground hover:text-primary"
                onClick={() => speak(ex.en)}
                title="Listen"
                aria-label="Listen"
              >
                <Speaker size={14} />
              </Button>
            </span>
            <span className="rounded-md bg-muted/40 px-2 py-0.5 text-sm text-muted-foreground">{ex.km}</span>
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
        className="mb-8 rounded-xl border bg-card p-5 shadow-card"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-base leading-relaxed text-foreground">
          {t(lesson.definition)}
        </p>
      </motion.div>

      <FormSection
        title={{ en: "Affirmative", km: "ទម្រង់បញ្ជាក់" }}
        icon={<CheckCircle2 size={18} />}
        color="var(--success)"
        structure={lesson.forms.affirmative.structure}
        examples={lesson.forms.affirmative.examples}
      />

      <FormSection
        title={{ en: "Negative", km: "ទម្រង់បដិសេធ" }}
        icon={<XCircle size={18} />}
        color="var(--danger)"
        structure={lesson.forms.negative.structure}
        examples={lesson.forms.negative.examples}
      />

      <FormSection
        title={{ en: "Question", km: "ទម្រង់សំណួរ" }}
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
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
            <AlertTriangle size={18} className="text-warning" />
            {language === "en" ? "Common Mistakes" : "កំហុសទូទៅ"}
          </h3>
          <div className="flex flex-col gap-3">
            {lesson.commonMistakes.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="space-y-3 p-4">
                    <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 px-3.5 py-2.5">
                      <XCircle size={16} className="mt-0.5 shrink-0 text-destructive" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-destructive">
                          {language === "en" ? "Incorrect" : "មិនត្រឹមត្រូវ"}
                        </p>
                        <p className="mt-0.5 line-through opacity-80">{m.mistake}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 rounded-lg border border-success/30 bg-success/5 px-3.5 py-2.5">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-success">
                          {language === "en" ? "Correct" : "ត្រឹមត្រូវ"}
                        </p>
                        <p className="mt-0.5 font-medium">{m.correction}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{t(m.reason)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
