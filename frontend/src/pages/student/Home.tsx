import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useBilingualText, useLanguage } from "../../contexts/LanguageContext";
import { useProgress } from "../../api/progress";
import { useGrammarUnits } from "../../api/grammar";
import {
  BookOpen,
  BarChart3,
  BookMarked,
  Bookmark,
  RefreshCw,
  Loader2,
} from "lucide-react";

export default function Home() {
  const t = useBilingualText();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { user } = useUser();
  const { data: progressData, isLoading: progressLoading } = useProgress();
  const { data: units, isLoading: unitsLoading } = useGrammarUnits();

  if (progressLoading || unitsLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2
          size={32}
          className="animate-spin"
          style={{ color: "var(--primary)" }}
        />
      </div>
    );
  }

  const progress = progressData?.progress;
  const totalLessons = Array.isArray(units)
    ? units.reduce(
        (sum: number, u: any) =>
          sum +
          (u.chapters?.reduce(
            (cs: number, c: any) => cs + (c.lessons?.length ?? 0),
            0,
          ) ?? 0),
        0,
      )
    : 0;
  const completedCount = progress?.completedLessons?.length ?? 0;
  const totalScore = progress
    ? Object.values(progress.quizScores ?? {}).reduce(
        (a: number, b: unknown) => a + ((b as number) || 0),
        0,
      )
    : 0;

  return (
    <div className="animate-[fadeIn_300ms_ease] py-8">
      <div className="mb-8">
        <h1
          className="mb-2 text-[1.875rem] font-bold"
          style={{ color: "var(--foreground)" }}
        >
          {language === "en"
            ? `Welcome back, ${user?.firstName ?? ""}`
            : `សូមស្វាគមន៍ មកកាន់ EnglishEase`}
        </h1>
        <p className="text-[1.0625rem] dark:text-white">
          {language === "en"
            ? "Continue your English learning journey"
            : "បន្តដំណើរការរៀនភាសាអង់គ្លេសរបស់អ្នក"}
        </p>
      </div>

      <div className="mb-8 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">
            {completedCount}
          </div>
          <div className="text-sm dark:text-white">
            {language === "en" ? "Lessons Done" : "មេរៀនបានរៀន"}
          </div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">
            {totalLessons}
          </div>
          <div className="text-sm dark:text-white">
            {language === "en" ? "Total Lessons" : "មេរៀនសរុប"}
          </div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">
            {totalScore}
          </div>
          <div className="text-sm dark:text-white">
            {language === "en" ? "Quiz Score" : "ពិន្ទុសំណួរ"}
          </div>
        </div>
        <div className="rounded-xl border border-[--border] bg-[--card] p-6 text-center shadow-[--shadow]">
          <div className="mb-1 text-3xl font-bold text-[--primary]">
            {progress?.streakCount ?? 0}
          </div>
          <div className="text-sm dark:text-white">
            {language === "en" ? "Day Streak" : "ថ្ងៃជាប់គ្នា"}
          </div>
        </div>
      </div>

      <section className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {language === "en" ? "Quick Actions" : "សកម្មភាពរហ័ស"}
        </h2>

        <div className="flex flex-wrap gap-3">
          {/* Primary CTA (Solid Black in Light Mode, Solid White in Dark Mode) */}
          <button
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-900 bg-zinc-900 px-5 py-2.5 text-[0.9375rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0 active:scale-95 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            onClick={() => navigate("/learn/grammar")}
          >
            <BookOpen size={18} />
            <span>{language === "en" ? "Start Learning" : "ចាប់ផ្តើមរៀន"}</span>
          </button>

          {/* Secondary Buttons (Light BG, Crisp Border, Hover Inversion) */}
          <button
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50/80 px-5 py-2.5 text-[0.9375rem] font-medium text-zinc-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-900 hover:bg-zinc-100 hover:text-zinc-900 active:translate-y-0 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            onClick={() => navigate("/learn/stories")}
          >
            <BookMarked size={18} />
            <span>{language === "en" ? "Read Stories" : "អានរឿង"}</span>
          </button>

          <button
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50/80 px-5 py-2.5 text-[0.9375rem] font-medium text-zinc-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-900 hover:bg-zinc-100 hover:text-zinc-900 active:translate-y-0 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            onClick={() => navigate("/learn/bookmarks")}
          >
            <Bookmark size={18} />
            <span>{language === "en" ? "Bookmarks" : "ចំណាំ"}</span>
          </button>

          <button
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50/80 px-5 py-2.5 text-[0.9375rem] font-medium text-zinc-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-900 hover:bg-zinc-100 hover:text-zinc-900 active:translate-y-0 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            onClick={() => navigate("/learn/review")}
          >
            <RefreshCw size={18} />
            <span>{language === "en" ? "Review" : "ពិនិត្យឡើងវិញ"}</span>
          </button>

          <button
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50/80 px-5 py-2.5 text-[0.9375rem] font-medium text-zinc-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-900 hover:bg-zinc-100 hover:text-zinc-900 active:translate-y-0 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            onClick={() => navigate("/learn/progress")}
          >
            <BarChart3 size={18} />
            <span>
              {language === "en" ? "My Progress" : "វឌ្ឍនភាពរបស់ខ្ញុំ"}
            </span>
          </button>
        </div>
      </section>

      <section className="mb-8">
        <h2
          className="mb-4 text-xl font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {language === "en" ? "Learning Units" : "មេរៀន"}
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {Array.isArray(units) &&
            units.map((unit: any) => {
              const lessons =
                unit.chapters?.flatMap((c: any) => c.lessons ?? []) ?? [];
              return (
                <div
                  key={unit.id}
                  className="cursor-pointer rounded-xl border border-[--border] bg-[--card] p-6 shadow-[--shadow] transition-all hover:-translate-y-0.5 hover:shadow-[--shadow-md]"
                  onClick={() => navigate("/learn/grammar")}
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <BookOpen size={24} style={{ color: "var(--primary)" }} />
                  </div>
                  <h3
                    className="mb-1 text-lg font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {t(unit.title as any)}
                  </h3>
                  <p className="text-sm text-muted">
                    {lessons.length} {language === "en" ? "lessons" : "មេរៀន"}
                  </p>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}
