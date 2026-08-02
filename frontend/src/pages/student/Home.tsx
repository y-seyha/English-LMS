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
  CheckCircle2,
  Flame,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";

export default function Home() {
  const t = useBilingualText();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { user } = useUser();
  const { data: progressData, isLoading: progressLoading } = useProgress();
  const { data: units, isLoading: unitsLoading } = useGrammarUnits();

  if (progressLoading || unitsLoading) {
    return (
      <div className="space-y-8">
        <div className="h-14 w-2/3 animate-pulse rounded-lg bg-muted/30" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
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
    <div className="space-y-8">
      <PageHeader
        title={
          language === "en"
            ? `Welcome back, ${user?.firstName ?? ""}`
            : "សូមស្វាគមន៍ មកកាន់ EnglishEase"
        }
        description={
          language === "en"
            ? "Continue your English learning journey"
            : "បន្តដំណើរការរៀនភាសាអង់គ្លេសរបស់អ្នក"
        }
      >
        <Button onClick={() => navigate("/learn/grammar")}>
          <BookOpen size={18} />
          {language === "en" ? "Start Learning" : "ចាប់ផ្តើមរៀន"}
        </Button>
      </PageHeader>

      <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-card sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {language === "en"
                ? "Keep your streak alive"
                : "បន្តការរៀនប្រចាំថ្ងៃរបស់អ្នក"}
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              {language === "en"
                ? "Practice a little every day — grammar, stories, and vocabulary are all one click away."
                : "អនុវត្តបន្តិចរាល់ថ្ងៃ — វេយ្យាករណ៍ រឿង និងវាក្យសព្ទ អាចចូលបានពីទីនេះតែមួយកន្លែង។"}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Flame size={18} />
            {progress?.streakCount ?? 0}{" "}
            {language === "en" ? "day streak" : "ថ្ងៃជាប់គ្នា"}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<CheckCircle2 size={22} />}
          label={language === "en" ? "Lessons Done" : "មេរៀនបានរៀន"}
          value={completedCount}
        />
        <StatCard
          icon={<BookOpen size={22} />}
          label={language === "en" ? "Total Lessons" : "មេរៀនសរុប"}
          value={totalLessons}
        />
        <StatCard
          icon={<BarChart3 size={22} />}
          label={language === "en" ? "Quiz Score" : "ពិន្ទុសំណួរ"}
          value={totalScore}
        />
        <StatCard
          icon={<Flame size={22} />}
          label={language === "en" ? "Day Streak" : "ថ្ងៃជាប់គ្នា"}
          value={progress?.streakCount ?? 0}
        />
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          {language === "en" ? "Quick Actions" : "សកម្មភាពរហ័ស"}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => navigate("/learn/grammar")}>
            <BookOpen size={18} />
            {language === "en" ? "Start Learning" : "ចាប់ផ្តើមរៀន"}
          </Button>
          <Button variant="outline" onClick={() => navigate("/learn/stories")}>
            <BookMarked size={18} />
            {language === "en" ? "Read Stories" : "អានរឿង"}
          </Button>
          <Button variant="outline" onClick={() => navigate("/learn/bookmarks")}>
            <Bookmark size={18} />
            {language === "en" ? "Bookmarks" : "ចំណាំ"}
          </Button>
          <Button variant="outline" onClick={() => navigate("/learn/review")}>
            <RefreshCw size={18} />
            {language === "en" ? "Review" : "ពិនិត្យឡើងវិញ"}
          </Button>
          <Button variant="outline" onClick={() => navigate("/learn/progress")}>
            <BarChart3 size={18} />
            {language === "en" ? "My Progress" : "វឌ្ឍនភាពរបស់ខ្ញុំ"}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          {language === "en" ? "Learning Units" : "មេរៀន"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(units) &&
            units.map((unit: any) => {
              const lessons =
                unit.chapters?.flatMap((c: any) => c.lessons ?? []) ?? [];
              return (
                <Card
                  key={unit.id}
                  onClick={() => navigate("/learn/grammar")}
                  className="cursor-pointer p-6 transition-all hover:-translate-y-0.5 hover:shadow-card-md"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <GraduationCap size={22} />
                    </div>
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-foreground">
                    {t(unit.title as any)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {lessons.length}{" "}
                    {language === "en" ? "lessons" : "មេរៀន"}
                  </p>
                </Card>
              );
            })}
        </div>
      </section>
    </div>
  );
}
