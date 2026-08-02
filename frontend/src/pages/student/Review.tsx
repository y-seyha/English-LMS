import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useReviewItems, useCompleteReview } from '../../api/review'
import { RefreshCw, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import PageHeader from '@/components/ui/PageHeader'
import EmptyState from '@/components/ui/EmptyState'
import Pagination from '../../components/ui/Pagination'
import Badge from '../../components/ui/Badge'

function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-xl border bg-card p-5 shadow-card">
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-8 w-32 rounded-lg" />
    </div>
  )
}

export default function Review() {
  const { language } = useLanguage()
  const [page, setPage] = useState(1)
  const { data, isLoading } = useReviewItems({ page, pageSize: 20 })
  const completeReview = useCompleteReview()

  return (
    <div className="space-y-8">
      <PageHeader
        title={language === 'en' ? 'Review Wrong Answers' : 'ពិនិត្យចម្លើយខុស'}
        description={language === 'en' ? 'Review and practice questions you got wrong' : 'ពិនិត្យ និងអនុវត្តសំណួរដែលអ្នកឆ្លើយខុស'}
      />

      {isLoading ? (
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : data?.data?.length === 0 ? (
        <EmptyState
          icon={<RefreshCw size={24} />}
          title={language === 'en' ? 'Nothing to review' : 'គ្មានអ្វីត្រូវពិនិត្យទេ'}
          description={language === 'en' ? 'Great job! No items to review right now.' : 'ធ្វើបានល្អ! មិនមានអ្វីត្រូវពិនិត្យនៅពេលនេះទេ។'}
        />
      ) : (
        <>
          <div className="space-y-4">
            {data?.data?.map((item: any) => {
              const isPending = completeReview.isPending && completeReview.variables === item._id
              return (
                <Card key={item._id} className="p-5">
                  <p className="mb-2 text-sm font-semibold text-foreground">{item.questionText || `Question: ${item.lessonId}`}</p>
                  <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <span className="text-destructive">
                      {language === 'en' ? 'Your answer:' : 'ចម្លើយអ្នក៖'} {item.selectedAnswer}
                    </span>
                    <span className="text-success">
                      {language === 'en' ? 'Correct:' : 'ត្រឹមត្រូវ៖'} {item.correctAnswer}
                    </span>
                  </div>
                  {!item.reviewed && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => completeReview.mutate(item._id)}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <CheckCircle2 size={14} className="text-success" />
                      )}
                      {language === 'en' ? 'Mark Reviewed' : 'សម្គាល់ថាបានពិនិត្យ'}
                    </Button>
                  )}
                  {item.reviewed && (
                    <Badge variant="success">
                      {language === 'en' ? 'Reviewed' : 'បានពិនិត្យ'}
                    </Badge>
                  )}
                </Card>
              )
            })}
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
