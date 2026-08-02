import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useBilingualText, useLanguage } from "../../contexts/LanguageContext";
import { useGrammarUnits } from "../../api/grammar";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/client";
import { CheckCircle2, Clock, Lock, GraduationCap, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "../../components/ui/SearchInput";
import Badge from "../../components/ui/Badge";

const levelLabels: Record<
  "" | "beginner" | "intermediate",
  { en: string; km: string }
> = {
  "": { en: "All", km: "ទាំងអស់" },
  beginner: { en: "Beginner", km: "កម្រិតដំបូង" },
  intermediate: { en: "Intermediate", km: "កម្រិតមធ្យម" },
};

export default function Grammar() {
  const t = useBilingualText();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { data: units, isLoading } = useGrammarUnits();
  const { data: progressData } = useQuery({
    queryKey: ["progress"],
    queryFn: () => apiClient.get("/progress").then((r) => r.data),
    enabled: !!isSignedIn,
    retry: false,
    staleTime: 30_000,
  });
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("");

  const completedLessons = progressData?.progress?.completedLessons ?? [];

  const handleLessonClick = (lessonId: string) => {
    if (isSignedIn) {
      navigate(`/learn/grammar/${lessonId}`);
    } else {
      navigate("/sign-in");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-56" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2].map((j) => (
                  <Skeleton key={j} className="h-36 rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const filteredUnits = units?.filter((unit: any) => {
    if (levelFilter && unit.level !== levelFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        unit.title.en.toLowerCase().includes(s) ||
        unit.title.km.includes(s) ||
        unit.chapters.some((c: any) =>
          c.lessons.some(
            (l: any) =>
              l.title.en.toLowerCase().includes(s) || l.title.km.includes(s),
          ),
        )
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title={
          language === "en" ? "Grammar Lessons" : "មេរៀនវេយ្យាករណ៍"
        }
        description={
          language === "en"
            ? "Learn English grammar step by step"
            : "រៀនវេយ្យាករណ៍ភាសាអង់គ្លេសជាជំហានៗ"
        }
      />

      {!isSignedIn && (
        <Alert variant="warning">
          <Lock size={16} className="animate-pulse" />
          <AlertDescription>
            {language === "en"
              ? "Sign in to track progress and save your learning"
              : "ចូលប្រើដើម្បីតាមដានវឌ្ឍនភាព និងរក្សាទុកការរៀនរបស់អ្នក"}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-full max-w-xs">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={
              language === "en" ? "Search lessons..." : "ស្វែងរកមេរៀន..."
            }
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["", "beginner", "intermediate"] as const).map((level) => {
            const isSelected =
              levelFilter === level || (!levelFilter && level === "");
            return (
              <button
                key={level}
                type="button"
                onClick={() => setLevelFilter(level)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {isSelected && (
                  <Check size={14} className="stroke-[3] animate-scale-in" />
                )}
                <span>
                  {language === "en" ? levelLabels[level].en : levelLabels[level].km}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filteredUnits?.map((unit: any) => (
        <section key={unit.id} className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <GraduationCap size={20} className="text-primary" />
            {t(unit.title)}
          </h2>
          {unit.chapters.map((chapter: any) => (
            <div key={chapter.id} className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                {t(chapter.title)}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {chapter.lessons.map((lesson: any, index: number) => {
                  const completed = completedLessons.includes(lesson.id);
                  const isBeginner = lesson.level === "beginner";

                  return (
                    <Card
                      key={lesson.id}
                      onClick={() => handleLessonClick(lesson.id)}
                      className={`cursor-pointer p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-md ${
                        completed
                          ? "border-success/40"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="mb-3 flex items-start justify-between gap-2">
                          <Badge variant={isBeginner ? "success" : "warning"}>
                            {isBeginner ? "Beginner" : "Intermediate"}
                          </Badge>
                          {completed && (
                            <CheckCircle2
                              size={18}
                              className="shrink-0 text-success animate-scale-in"
                            />
                          )}
                        </div>
                        <h4 className="mb-1 font-semibold text-foreground">
                          {t(lesson.title)}
                        </h4>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={12} /> {lesson.estimatedMinutes} min
                        </span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
