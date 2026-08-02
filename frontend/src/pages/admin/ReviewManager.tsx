import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAdminReviewItems } from "../../api/admin";
import AdminLayout from "../../components/layout/AdminLayout";
import Pagination from "../../components/ui/Pagination";
import DetailModal from "../../components/ui/DetailModal";
import { Loader2, CheckCircle2, XCircle, RefreshCw, Eye } from "lucide-react";

export default function ReviewManager() {
  const { language } = useLanguage();
  const [page, setPage] = useState(1);
  const [detailItem, setDetailItem] = useState<any>(null);
  const { data, isLoading } = useAdminReviewItems({ page, pageSize: 50 });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-[1.875rem] font-bold text-black dark:text-white">
          {language === "en" ? "Student Review Items" : "ពិនិត្យចម្លើយសិស្ស"}
        </h1>
        <p className="text-sm text-black/60 dark:text-white/60">
          {language === "en"
            ? "Monitor student wrong answers across all lessons"
            : "តាមដានចម្លើយខុសរបស់សិស្សគ្រប់មេរៀន"}
        </p>
      </div>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2
            size={32}
            className="animate-spin text-black/40 dark:text-white/40"
          />
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="py-12 text-center">
          <RefreshCw
            size={48}
            className="mx-auto mb-4 text-black/20 dark:text-white/20"
          />
          <p className="text-sm text-black/60 dark:text-white/60">
            {language === "en" ? "No review items yet" : "មិនទាន់មានទេ"}
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                    User
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                    Lesson
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white hidden md:table-cell">
                    Question
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                    Student Answer
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-black dark:text-white">
                    Correct
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-black dark:text-white">
                    Count
                  </th>
                  <th className="px-2 py-3 text-center font-medium text-black dark:text-white"></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((item: any) => (
                  <tr
                    key={item._id}
                    className="border-b border-black/10 last:border-0 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <td className="px-4 py-3 text-black dark:text-white">
                      {item.userId?.slice(0, 12)}..
                    </td>
                    <td className="px-4 py-3 text-black/60 dark:text-white/60">
                      {item.lessonId?.slice(0, 20)}
                    </td>
                    <td className="hidden max-w-[200px] truncate px-4 py-3 text-black/60 dark:text-white/60 md:table-cell">
                      {item.questionText}
                    </td>
                    <td className="px-4 py-3 text-red-500">
                      {item.selectedAnswer}
                    </td>
                    <td className="px-4 py-3 text-emerald-500">
                      {item.correctAnswer}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.reviewed ? (
                        <CheckCircle2
                          size={16}
                          className="inline text-emerald-500"
                        />
                      ) : (
                        <XCircle size={16} className="inline text-amber-500" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-black/60 dark:text-white/60">
                      {item.reviewCount}
                    </td>
                    <td className="px-2 py-3 text-center">
                      <button
                        onClick={() => setDetailItem(item)}
                        className="rounded-lg p-1.5 text-black/40 hover:bg-black/5 hover:text-black dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={data?.page ?? 1}
            totalPages={data?.totalPages ?? 1}
            total={data?.total ?? 0}
            onPageChange={setPage}
          />
        </>
      )}
      <DetailModal
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        title={language === "en" ? "Review Item Details" : "ព័ត៌មានលម្អិត"}
        data={detailItem as Record<string, unknown>}
      />
    </AdminLayout>
  );
}
