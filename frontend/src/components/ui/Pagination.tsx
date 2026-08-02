import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'

interface PaginationProps {
  page: number
  totalPages: number
  total: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, total, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between pt-6">
      <span className="text-sm text-muted-foreground">
        {total} total items
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </Button>
        <span className="min-w-[4rem] text-center text-sm font-medium text-foreground">
          {page} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
