import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  EyeOff,
  Languages,
  Volume2,
  Clock,
} from "lucide-react";
import { useBilingualText, useLanguage } from "../../contexts/LanguageContext";
import { useStory } from "../../api/stories";
import { useProgress, useCompleteStory } from "../../api/progress";
import { useSpeech } from "../../hooks/useSpeech";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "../../components/ui/Badge";

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
    return <Spinner />;
  }

  if (!story) {
    return (
      <EmptyState
        icon={<BookOpen size={24} />}
        title={language === "en" ? "Story not found" : "រកមិនឃើញរឿងទេ"}
        description={
          language === "en"
            ? "The story you are looking for does not exist."
            : "រឿងដែលអ្នកកំពុងស្វែងរក មិនមានទេ។"
        }
        action={
          <Button onClick={() => navigate("/learn/stories")}>
            {language === "en" ? "Back to Stories" : "ត្រឡប់ទៅរឿងវិញ"}
          </Button>
        }
      />
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
    <div className="space-y-8">
      <Button
        variant="ghost"
        className="-ml-2"
        onClick={() => navigate("/learn/stories")}
      >
        <ArrowLeft size={16} />
        {language === "en" ? "Back to Stories" : "ត្រឡប់ទៅរឿងវិញ"}
      </Button>

      <div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          {t(story.title)}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant={story.level}>{story.level}</Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock size={14} /> {story.estimatedMinutes} min
          </span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-sm text-success">
              <CheckCircle2 size={14} />
              {language === "en" ? "Completed" : "បានបញ្ចប់"}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setShowKhmer(!showKhmer)}
          className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
            showKhmer
              ? "bg-primary text-primary-foreground shadow-sm"
              : "border border-border bg-card text-foreground hover:bg-accent"
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

        <button
          type="button"
          onClick={() => speak(story.content?.en ?? "")}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-accent active:scale-95"
        >
          <Volume2 size={14} className="stroke-[2.5] text-primary" />
          <span>{language === "en" ? "Listen" : "ស្តាប់"}</span>
        </button>
      </div>

      <Card className="p-6 leading-relaxed text-foreground">
        <p>{story.content?.en}</p>
        {showKhmer && story.content?.km && (
          <div className="animate-fade-in">
            <Separator className="my-4" />
            <p className="text-muted-foreground">{story.content.km}</p>
          </div>
        )}
      </Card>

      {story.questions?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            {language === "en" ? "Comprehension Questions" : "សំណួរយល់ដឹង"}
          </h2>
          {story.questions.map((q: any, i: number) => {
            const selected = answers[q.id];
            const isCorrect = submitted && selected === q.correctAnswer;
            const isWrong =
              submitted && selected && selected !== q.correctAnswer;
            return (
              <Card
                key={q.id}
                className={`p-5 ${
                  isCorrect
                    ? "border-success/40 bg-success/10"
                    : isWrong
                      ? "border-destructive/40 bg-destructive/10"
                      : "bg-card"
                }`}
              >
                <p className="mb-3 font-medium text-foreground">
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
                        " border-success bg-success/10 text-foreground";
                    else if (submitted && optionSelected && !optionCorrect)
                      cls += " border-destructive bg-destructive/10";
                    else if (optionSelected)
                      cls += " border-primary bg-primary/10";
                    else
                      cls +=
                        " border-border bg-card hover:border-primary/50 hover:bg-accent";
                    return (
                      <label
                        key={j}
                        className={cls}
                        onClick={() => !submitted && handleAnswer(q.id, val)}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                            submitted && optionCorrect
                              ? "border-success"
                              : submitted && optionSelected && !optionCorrect
                                ? "border-destructive"
                                : optionSelected
                                  ? "border-primary"
                                  : "border-border"
                          }`}
                        >
                          {optionSelected && (
                            <span
                              className={`h-2 w-2 rounded-full ${
                                submitted && optionCorrect
                                  ? "bg-success"
                                  : submitted && optionSelected && !optionCorrect
                                    ? "bg-destructive"
                                    : "bg-primary"
                              }`}
                            />
                          )}
                        </span>
                        <span className="text-foreground">{val}</span>
                      </label>
                    );
                  })}
                </div>
                {submitted && (
                  <p
                    className={`mt-2 text-sm ${isCorrect ? "text-success" : "text-destructive"}`}
                  >
                    {isCorrect
                      ? `✓ ${t(q.explanation)}`
                      : `✗ ${t(q.explanation)}`}
                  </p>
                )}
              </Card>
            );
          })}
          {!submitted && (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={story.questions.some((q: any) => !answers[q.id])}
            >
              <CheckCircle2 size={16} className="stroke-[2.5]" />
              {language === "en" ? "Submit Answers" : "ដាក់ចម្លើយ"}
            </Button>
          )}
          {submitted && (
            <p
              className={`text-sm font-medium ${
                correctCount === story.questions.length
                  ? "text-success"
                  : "text-warning"
              }`}
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
