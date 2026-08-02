import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  EyeOff,
  Languages,
  Volume2,
} from "lucide-react";
import { useBilingualText, useLanguage } from "../../contexts/LanguageContext";
import { useStory } from "../../api/stories";
import { useProgress, useCompleteStory } from "../../api/progress";
import { useSpeech } from "../../hooks/useSpeech";

export default function StoryReaderPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const t = useBilingualText();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { data: story, isLoading } = useStory(storyId ?? "");
  const { data: progressData } = useProgress();
  const completeStory = useCompleteStory();
  const { speak } = useSpeech();

  const [showKhmer, setShowKhmer] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const completedStories = progressData?.progress?.completedStories ?? [];
  const isCompleted = storyId ? completedStories.includes(storyId) : false;

  if (isLoading) {
    return <div className="py-12 text-center text-muted">Loading story...</div>;
  }

  if (!story) {
    return (
      <div className="py-12 text-center">
        <BookOpen
          size={48}
          className="mx-auto mb-4"
          style={{ color: "var(--muted)" }}
        />
        <h3
          className="mb-2 text-lg font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {language === "en" ? "Story not found" : "រកមិនឃើញរឿងទេ"}
        </h3>
        <button
          className="mt-4 rounded-lg bg-[--primary] px-5 py-[0.625rem] text-sm font-medium dark:text-white cursor-pointer"
          onClick={() => navigate("/learn/stories")}
        >
          {language === "en" ? "Back to Stories" : "ត្រឡប់ទៅរឿងវិញ"}
        </button>
      </div>
    );
  }

  const handleAnswer = (qId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const allCorrect = story.questions.every(
      (q: any) => answers[q.id] === q.correctAnswer,
    );
    if (allCorrect && storyId) {
      completeStory.mutate(storyId);
    }
  };

  const correctCount = story.questions.filter(
    (q: any) => answers[q.id] === q.correctAnswer,
  ).length;

  return (
    <div className="animate-[fadeIn_300ms_ease] py-8">
      <button
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium dark:text-white cursor-pointer transition-all hover:text-[--primary]"
        onClick={() => navigate("/learn/stories")}
      >
        <ArrowLeft size={16} />{" "}
        {language === "en" ? "Back to Stories" : "ត្រឡប់ទៅរឿងវិញ"}
      </button>
      <div className="mb-6">
        <h1
          className="mb-2 text-2xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          {t(story.title)}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[--primary]/10 px-3 py-0.5 text-xs font-medium text-[--primary]">
            {story.level}
          </span>
          <span className="text-sm text-muted">
            {story.estimatedMinutes} min
          </span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-sm text-emerald-500">
              <CheckCircle2 size={14} />{" "}
              {language === "en" ? "Completed" : "បានបញ្ចប់"}
            </span>
          )}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        {/* Toggle Khmer Button */}
        <button
          type="button"
          onClick={() => setShowKhmer(!showKhmer)}
          className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 ease-out active:scale-95 ${
            showKhmer
              ? "scale-105 bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-zinc-900"
              : "border border-[--border] bg-[--bg-secondary] text-[--foreground] dark:text-white hover:border-blue-400/50 hover:bg-[--card]"
          }`}
        >
          {showKhmer ? (
            <EyeOff size={14} className="stroke-[2.5]" />
          ) : (
            <Languages size={14} className="stroke-[2.5]" />
          )}
          <span>
            {showKhmer
              ? language === "en"
                ? "Hide Khmer"
                : "លាក់ខ្មែរ"
              : language === "en"
                ? "Show Khmer"
                : "បង្ហាញខ្មែរ"}
          </span>
        </button>

        {/* Listen / Audio Button */}
        <button
          type="button"
          onClick={() => speak(story.content?.en ?? "")}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[--border] bg-[--bg-secondary] px-4 py-1.5 text-xs font-bold text-[--foreground] transition-all duration-300 ease-out hover:border-blue-400/50 hover:bg-[--card] active:scale-95 dark:text-white"
        >
          <Volume2 size={14} className="stroke-[2.5] text-blue-500" />
          <span>{language === "en" ? "Listen" : "ស្តាប់"}</span>
        </button>
      </div>
      <div
        className="mb-8 rounded-xl border border-[--border] bg-[--card] p-6 leading-relaxed"
        style={{ color: "var(--foreground)" }}
      >
        <p>{story.content?.en}</p>
        {showKhmer && story.content?.km && (
          <div className="mt-4 border-t border-[--border] pt-4 text-muted">
            <p>{story.content.km}</p>
          </div>
        )}
      </div>
      {story.questions?.length > 0 && (
        <div className="mb-8">
          <h2
            className="mb-4 text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            {language === "en" ? "Comprehension Questions" : "សំណួរយល់ដឹង"}
          </h2>
          {story.questions.map((q: any, i: number) => {
            const selected = answers[q.id];
            const isCorrect = submitted && selected === q.correctAnswer;
            const isWrong =
              submitted && selected && selected !== q.correctAnswer;
            return (
              <div
                key={q.id}
                className={`mb-4 rounded-xl border p-5 ${
                  isCorrect
                    ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-700 dark:bg-emerald-950/20"
                    : isWrong
                      ? "border-red-300 bg-red-50/50 dark:border-red-700 dark:bg-red-950/20"
                      : "border-[--border] bg-[--card]"
                }`}
              >
                <p
                  className="mb-3 font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  {i + 1}. {t(q.question)}
                </p>
                <div className="flex flex-col gap-2">
                  {q.options.map((opt: any, j: number) => {
                    const val = t(opt);
                    const optionSelected = selected === val;
                    const optionCorrect = q.correctAnswer === val;
                    let cls =
                      "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm cursor-pointer transition-all";
                    if (submitted && optionCorrect)
                      cls +=
                        " border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30";
                    else if (submitted && optionSelected && !optionCorrect)
                      cls += " border-red-500 bg-red-50 dark:bg-red-900/30";
                    else if (optionSelected)
                      cls += " border-blue-500 bg-blue-50 dark:bg-sky-900/30";
                    else cls += " border-[--border] hover:border-[--primary]";
                    return (
                      <label
                        key={j}
                        className={cls}
                        onClick={() => !submitted && handleAnswer(q.id, val)}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                            optionSelected
                              ? "border-blue-500"
                              : "border-[--border]"
                          }`}
                        >
                          {optionSelected && (
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </span>
                        <span style={{ color: "var(--foreground)" }}>
                          {val}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {submitted && (
                  <p
                    className={`mt-2 text-sm ${isCorrect ? "text-emerald-600" : "text-red-500"}`}
                  >
                    {isCorrect
                      ? `✓ ${t(q.explanation)}`
                      : `✗ ${t(q.explanation)}`}
                  </p>
                )}
              </div>
            );
          })}
          {!submitted && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={story.questions.some((q: any) => !answers[q.id])}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all duration-300 ease-out hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:shadow-none disabled:active:scale-100 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600"
            >
              <CheckCircle2 size={16} className="stroke-[2.5]" />
              <span>{language === "en" ? "Submit Answers" : "ដាក់ចម្លើយ"}</span>
            </button>
          )}
          {submitted && (
            <p
              className="mt-3 text-sm font-medium"
              style={{
                color:
                  correctCount === story.questions.length
                    ? "var(--success)"
                    : "var(--warning)",
              }}
            >
              {correctCount}/{story.questions.length}{" "}
              {language === "en" ? "correct" : "ត្រឹមត្រូវ"}
              {correctCount === story.questions.length && " ✓"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
