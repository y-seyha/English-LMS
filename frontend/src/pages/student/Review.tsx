import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useReviewItems, useCompleteReview } from '../../api/review'
import { RefreshCw, CheckCircle2, Loader2 } from 'lucide-react'
import Pagination from '../../components/ui/Pagination'

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-black">
      <div className="mb-3">
        <div className="mb-2 h-4 w-3/4 rounded bg-black/10 dark:bg-white/10" />
        <div className="flex gap-4">
          <div className="h-4 w-1/3 rounded bg-black/10 dark:bg-white/10" />
          <div className="h-4 w-1/3 rounded bg-black/10 dark:bg-white/10" />
        </div>
      </div>
      <div className="h-8 w-32 rounded-lg bg-black/10 dark:bg-white/10" />
    </div>
  )
}

export default function Review() {
  const { language } = useLanguage()
  const [page, setPage] = useState(1)
  const { data, isLoading } = useReviewItems({ page, pageSize: 20 })
  const completeReview = useCompleteReview()

  return (
    <div className="animate-[fadeIn_300ms_ease] py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-[1.875rem] font-bold" style={{ color: 'var(--foreground)' }}>
          {language === 'en' ? 'Review Wrong Answers' : 'ពិនិត្យចម្លើយខុស'}
        </h1>
        <p className="text-[1.0625rem] text-muted">
          {language === 'en' ? 'Review and practice questions you got wrong' : 'ពិនិត្យ និងអនុវត្តសំណួរដែលអ្នកឆ្លើយខុស'}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <SkeletonCard key="sk1" />
          <SkeletonCard key="sk2" />
          <SkeletonCard key="sk3" />
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="py-12 text-center">
          <RefreshCw size={48} className="mx-auto mb-4" style={{ color: 'var(--muted)' }} />
          <p className="text-muted">{language === 'en' ? 'No items to review. Great job!' : 'គ្មានអ្វីត្រូវពិនិត្យទេ'}</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {data?.data?.map((item: any) => (
              <div key={item._id} className="rounded-xl border border-[--border] bg-[--card] p-5 shadow-[--shadow]">
                <div className="mb-3">
                  <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{item.questionText || `Question: ${item.lessonId}`}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-red-500">
                      {language === 'en' ? 'Your answer:' : 'ចម្លើយអ្នក៖'} {item.selectedAnswer}
                    </span>
                    <span className="text-emerald-500">
                      {language === 'en' ? 'Correct:' : 'ត្រឹមត្រូវ៖'} {item.correctAnswer}
                    </span>
                  </div>
                </div>
                {!item.reviewed && (
                  <button
                    onClick={() => completeReview.mutate(item._id)}
                    disabled={completeReview.isPending && completeReview.variables === item._id}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 px-3 py-1.5 text-xs font-medium text-emerald-600 transition-all hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                  >
                    {completeReview.isPending && completeReview.variables === item._id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                    {language === 'en' ? 'Mark Reviewed' : 'សម្គាល់ថាបានពិនិត្យ'}
                  </button>
                )}
                {item.reviewed && (
                  <span className="text-xs text-muted">{language === 'en' ? 'Reviewed' : 'បានពិនិត្យ'}</span>
                )}
              </div>
            ))}
          </div>
          <Pagination
            page={data?.page ?? 1}
            totalPages={data?.totalPages ?? 1}
            total={data?.total ?? 0}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  )
}
