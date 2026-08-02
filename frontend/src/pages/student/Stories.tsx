import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useBilingualText, useLanguage } from "../../contexts/LanguageContext";
import { useStories } from "../../api/stories";
import { useProgress } from "../../api/progress";
import { Clock, CheckCircle2, BookOpen, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
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

const levelLabels: Record<"" | "A1" | "A2" | "B1", { en: string; km: string }> = {
  "": { en: "All", km: "ទាំងអស់" },
  A1: { en: "A1", km: "A1" },
  A2: { en: "A2", km: "A2" },
  B1: { en: "B1", km: "B1" },
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
    <div className="space-y-8">
      <PageHeader
        title={language === "en" ? "Reading Stories" : "រឿងអាន"}
        description={
          language === "en"
            ? "Improve your reading with bilingual stories"
            : "បង្កើនការអានរបស់អ្នកជាមួយរឿងពីរភាសា"}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-full max-w-xs">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={
              language === "en" ? "Search stories..." : "ស្វែងរករឿង..."
            }
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["", "A1", "A2", "B1"] as const).map((level) => {
            const isSelected =
              levelFilter === level || (!levelFilter && level === "");
            return (
              <button
                key={level}
                type="button"
                onClick={() => {
                  setLevelFilter(level);
                  setPage(1);
                }}
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

      {isError ? (
        <EmptyState
          icon={<BookOpen size={24} />}
          title={language === "en" ? "Failed to load stories" : "មិនអាចផ្ទុករឿងបានទេ"}
          description={
            language === "en"
              ? "Something went wrong. Try refreshing the page."
              : "មានបញ្ហាអ្វីមួយ។ សូមព្យាយាមផ្ទុកទំព័រឡើងវិញ។"}
        />
      ) : isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : !data?.data?.length ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <EmptyState
            icon={<BookOpen size={24} />}
            title={language === "en" ? "No stories found" : "រកមិនឃើញរឿងទេ"}
            description={
              language === "en"
                ? "Try a different search or level filter."
                : "សូមសាកល្បងស្វែងរក ឬត្រងកម្រិតផ្សេង។"}
          />
        </motion.div>
      ) : (
        <>
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
                >
                  <Card
                    onClick={() => navigate(`/learn/stories/${story.id}`)}
                    className={`h-full cursor-pointer p-6 transition-all hover:-translate-y-0.5 hover:shadow-card-md ${
                      completed ? "border-success/40" : "border-border"
                    }`}
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <Badge variant={story.level}>{story.level}</Badge>
                      {completed && (
                        <CheckCircle2
                          size={18}
                          className="shrink-0 text-success"
                        />
                      )}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {t(story.title)}
                    </h3>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock size={14} /> {story.estimatedMinutes} min
                    </span>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {isFetching && (
            <div className="flex justify-center py-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary" />
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
