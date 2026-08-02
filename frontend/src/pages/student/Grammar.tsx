import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useBilingualText, useLanguage } from "../../contexts/LanguageContext";
import { useGrammarUnits } from "../../api/grammar";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/client";
import { CheckCircle2, Clock, Lock, GraduationCap, Check } from "lucide-react";
import SearchInput from "../../components/ui/SearchInput";

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
      <div className="py-12 text-center text-muted dark:text-white transition-opacity duration-300 animate-pulse">
        Loading lessons...
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
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 py-8">
      <div className="mb-6 transition-all duration-300">
        <h1
          className="mb-2 text-[1.875rem] font-bold dark:text-white transition-colors duration-200"
          style={{ color: "var(--foreground)" }}
        >
          {language === "en" ? "Grammar Lessons" : "មេរៀនវេយ្យាករណ៍"}
        </h1>
        <p className="text-[1.0625rem] dark:text-white transition-colors duration-200">
          {language === "en"
            ? "Learn English grammar step by step"
            : "រៀនវេយ្យាករណ៍ភាសាអង់គ្លេសជាជំហានៗ"}
        </p>
        {!isSignedIn && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2.5 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-300 transition-all duration-300 animate-in fade-in slide-in-from-top-1">
            <Lock size={14} className="animate-bounce" />
            {language === "en"
              ? "Sign in to track progress and save your learning"
              : "ចូលប្រើដើម្បីតាមដានវឌ្ឍនភាព និងរក្សាទុកការរៀនរបស់អ្នក"}
          </div>
        )}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="w-full max-w-xs transition-transform duration-200 focus-within:scale-[1.01]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={
              language === "en" ? "Search lessons..." : "ស្វែងរកមេរៀន..."
            }
          />
        </div>

        {/* Filter Buttons with Scale & Color Transitions */}
        <div className="flex flex-wrap gap-2">
          {(["", "beginner", "intermediate"] as const).map((level) => {
            const isSelected =
              levelFilter === level || (!levelFilter && level === "");

            const labels: Record<
              "" | "beginner" | "intermediate",
              { en: string; km: string }
            > = {
              "": { en: "All", km: "ទាំងអស់" },
              beginner: { en: "Beginner", km: "កម្រិតដំបូង" },
              intermediate: { en: "Intermediate", km: "កម្រិតមធ្យម" },
            };

            return (
              <button
                key={level}
                type="button"
                onClick={() => setLevelFilter(level)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 ease-out active:scale-95 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-zinc-900 scale-105"
                    : "border border-[--border] bg-[--bg-secondary] text-[--foreground] dark:text-white hover:bg-[--card] hover:border-blue-400/50"
                }`}
              >
                {isSelected && (
                  <Check
                    size={14}
                    className="stroke-[3] animate-in zoom-in-50 duration-200"
                  />
                )}
                <span>
                  {language === "en" ? labels[level].en : labels[level].km}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filteredUnits?.map((unit: any) => (
        <section key={unit.id} className="mb-8 transition-opacity duration-300">
          <h2
            className="mb-4 flex items-center gap-2 text-xl font-semibold dark:text-white"
            style={{ color: "var(--foreground)" }}
          >
            <GraduationCap
              size={20}
              className="transition-transform duration-300 hover:rotate-12"
              style={{ color: "var(--primary)" }}
            />
            {t(unit.title)}
          </h2>
          {unit.chapters.map((chapter: any) => (
            <div key={chapter.id} className="mb-4">
              <h3 className="mb-2 text-sm font-medium text-muted dark:text-white">
                {t(chapter.title)}
              </h3>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3">
                {chapter.lessons.map((lesson: any, index: number) => {
                  const completed = completedLessons.includes(lesson.id);
                  const isBeginner = lesson.level === "beginner";

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleLessonClick(lesson.id)}
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                      className={`cursor-pointer rounded-xl border bg-[--card] p-4 shadow-[--shadow] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg ${
                        completed
                          ? "border-emerald-300 dark:border-emerald-700 hover:border-emerald-400"
                          : "border-[--border] hover:border-blue-400/50"
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-2">
                        {/* Custom Colored Level Badges */}
                        <span
                          className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors duration-200 ${
                            isBeginner
                              ? "border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200"
                              : "border-sky-300 bg-sky-100 text-sky-800 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-200"
                          }`}
                        >
                          {isBeginner ? "Beginner" : "Intermediate"}
                        </span>

                        {completed && (
                          <CheckCircle2
                            size={18}
                            className="text-emerald-500 shrink-0 transition-transform duration-300 animate-in zoom-in-50"
                          />
                        )}
                      </div>
                      <h4
                        className="mb-1 font-semibold dark:text-white transition-colors duration-200"
                        style={{ color: "var(--foreground)" }}
                      >
                        {t(lesson.title)}
                      </h4>
                      <span className="flex items-center gap-1 text-xs text-muted dark:text-white opacity-80 transition-opacity duration-200 group-hover:opacity-100">
                        <Clock size={12} /> {lesson.estimatedMinutes} min
                      </span>
                    </div>
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
