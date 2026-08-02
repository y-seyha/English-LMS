import { ChevronLeft, ChevronRight } from 'lucide-react'

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
      <span className="text-sm text-black/60 dark:text-white/60">
        {total} total items
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 transition-all hover:bg-black/4 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/6"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="min-w-[4rem] text-center text-sm font-medium">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 transition-all hover:bg-black/4 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/6"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
