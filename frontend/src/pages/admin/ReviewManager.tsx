import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAdminReviewItems } from "../../api/admin";
import AdminLayout from "../../components/layout/AdminLayout";
import Pagination from "../../components/ui/Pagination";
import DetailModal from "../../components/ui/DetailModal";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, RefreshCw, Eye } from "lucide-react";

export default function ReviewManager() {
  const { language } = useLanguage();
  const [page, setPage] = useState(1);
  const [detailItem, setDetailItem] = useState<any>(null);
  const { data, isLoading } = useAdminReviewItems({ page, pageSize: 50 });

  return (
    <AdminLayout>
      <PageHeader
        title={language === "en" ? "Student Review Items" : "ពិនិត្យចម្លើយសិស្ស"}
        description={
          language === "en"
            ? "Monitor student wrong answers across all lessons"
            : "តាមដានចម្លើយខុសរបស់សិស្សគ្រប់មេរៀន"
        }
      />

      {isLoading ? (
        <Spinner />
      ) : data?.data?.length === 0 ? (
        <EmptyState
          icon={<RefreshCw size={24} />}
          title={language === "en" ? "No review items yet" : "មិនទាន់មានទេ"}
          description={
            language === "en"
              ? "Student wrong answers will appear here once lessons are completed"
              : "ចម្លើយខុសរបស់សិស្សនឹងបង្ហាញនៅទីនេះ នៅពេលដែលសិស្សបំពេញមេរៀនរួច"
          }
        />
      ) : (
        <>
          <Card>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead>User</TableHead>
                  <TableHead>Lesson</TableHead>
                  <TableHead className="hidden md:table-cell">Question</TableHead>
                  <TableHead>Student Answer</TableHead>
                  <TableHead>Correct</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Count</TableHead>
                  <TableHead className="text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((item: any) => (
                  <TableRow key={item._id}>
                    <TableCell className="text-foreground">
                      {item.userId?.slice(0, 12)}..
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.lessonId?.slice(0, 20)}
                    </TableCell>
                    <TableCell className="hidden max-w-[200px] truncate text-muted-foreground md:table-cell">
                      {item.questionText}
                    </TableCell>
                    <TableCell className="text-destructive">
                      {item.selectedAnswer}
                    </TableCell>
                    <TableCell className="text-success">
                      {item.correctAnswer}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.reviewed ? (
                        <CheckCircle2
                          size={16}
                          className="inline text-success"
                        />
                      ) : (
                        <XCircle size={16} className="inline text-warning" />
                      )}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      {item.reviewCount}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground"
                        onClick={() => setDetailItem(item)}
                      >
                        <Eye size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
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
