import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useBilingualText, useLanguage } from "../../contexts/LanguageContext";
import { useStories } from "../../api/stories";
import { useProgress } from "../../api/progress";
import { Clock, CheckCircle2, BookOpen, Check } from "lucide-react";
import SearchInput from "../../components/ui/SearchInput";
import Pagination from "../../components/ui/Pagination";
import Badge from "../../components/ui/Badge";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
  }),
};

export default function Stories() {
  const t = useBilingualText();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [page, setPage] = useState(1);

  const queryParams = useMemo(() => {
    const p: Record<string, string | number> = {
      page,
      pageSize: 12,
    };
    if (search) p.search = search;
    if (levelFilter) p.level = levelFilter;
    return p;
  }, [search, levelFilter, page]);

  const { data, isLoading, isFetching, isError } = useStories(queryParams);
  const { data: progressData } = useProgress();

  const completedStories = progressData?.progress?.completedStories ?? [];

  return (
    <div className="animate-[fadeIn_300ms_ease] py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-[1.875rem] font-bold text-[--foreground]">
          {language === "en" ? "Reading Stories" : "រឿងអាន"}
        </h1>
        <p className="text-[1.0625rem] dark:text-white">
          {language === "en"
            ? "Improve your reading with bilingual stories"
            : "បង្កើនការអានរបស់អ្នកជាមួយរឿងពីរភាសា"}
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        {/* Search Input Container with Scale Focus */}
        <div className="w-full max-w-xs transition-transform duration-200 focus-within:scale-[1.01]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={
              language === "en" ? "Search stories..." : "ស្វែងរករឿង..."
            }
          />
        </div>

        {/* Level Filter Buttons with Active Indicator & Animations */}
        <div className="flex flex-wrap gap-2">
          {(["", "A1", "A2", "B1"] as const).map((level) => {
            const isSelected =
              levelFilter === level || (!levelFilter && level === "");

            const labels: Record<
              "" | "A1" | "A2" | "B1",
              { en: string; km: string }
            > = {
              "": { en: "All", km: "ទាំងអស់" },
              A1: { en: "A1", km: "A1" },
              A2: { en: "A2", km: "A2" },
              B1: { en: "B1", km: "B1" },
            };

            return (
              <button
                key={level}
                type="button"
                onClick={() => {
                  setLevelFilter(level);
                  setPage(1);
                }}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 ease-out active:scale-95 ${
                  isSelected
                    ? "scale-105 bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-zinc-900"
                    : "border border-[--border] bg-[--bg-secondary] text-[--foreground] dark:text-white hover:border-blue-400/50 hover:bg-[--card]"
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

      {isError ? (
        <div className="py-12 text-center text-muted">
          {language === "en"
            ? "Failed to load stories. Try refreshing."
            : "មិនអាចផ្ទុករឿងបានទេ។"}
        </div>
      ) : isLoading ? (
        <div className="py-12 text-center text-muted">Loading stories...</div>
      ) : !data?.data?.length ? (
        <motion.div
          className="py-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <BookOpen
            size={48}
            className="mx-auto mb-4"
            style={{ color: "var(--muted)" }}
          />
          <p className="text-muted">
            {language === "en" ? "No stories found" : "រកមិនឃើញរឿងទេ"}
          </p>
        </motion.div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4"
            initial="hidden"
            animate="visible"
          >
            {data.data.map((story: any, i: number) => {
              const completed = completedStories.includes(story.id);
              return (
                <motion.div
                  key={story.id}
                  custom={i}
                  variants={cardVariants}
                  onClick={() => navigate(`/learn/stories/${story.id}`)}
                  className={`cursor-pointer rounded-xl border bg-[--card] p-6 shadow-[--shadow] transition-all hover:-translate-y-1 hover:shadow-[--shadow-md] ${
                    completed
                      ? "border-emerald-300 dark:border-emerald-700"
                      : "border-[--border]"
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <Badge variant={story.level}>{story.level}</Badge>
                    {completed && (
                      <CheckCircle2
                        size={18}
                        className="shrink-0 text-emerald-500"
                      />
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-[--foreground]">
                    {t(story.title)}
                  </h3>
                  <span className="flex items-center gap-1 text-sm text-muted">
                    <Clock size={14} /> {story.estimatedMinutes} min
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {isFetching && (
            <div className="flex justify-center py-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[--border] border-t-[--primary]" />
            </div>
          )}

          <Pagination
            page={data?.page ?? 1}
            totalPages={data?.totalPages ?? 1}
            total={data?.total ?? 0}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
