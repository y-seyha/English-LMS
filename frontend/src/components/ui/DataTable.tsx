import { ChevronUp, ChevronDown, Inbox } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'
import { Skeleton } from './skeleton'
import { cn } from '../../lib/utils'

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  sort?: string
  order?: 'asc' | 'desc'
  onSort?: (key: string) => void
  isLoading?: boolean
  emptyMessage?: string
}

export default function DataTable<T extends Record<string, unknown>>({
  columns, data, sort, order, onSort, isLoading, emptyMessage = 'No data found',
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border bg-card shadow-card">
        <div className="flex h-11 items-center gap-4 border-b bg-muted/30 px-4">
          {columns.map(col => (
            <Skeleton key={col.key} className="h-3.5 w-20" />
          ))}
        </div>
        <div className="divide-y">
          {[0, 1, 2, 3, 4].map(row => (
            <div key={row} className="flex items-center gap-4 px-4 py-3.5">
              {columns.map(col => (
                <Skeleton
                  key={col.key}
                  className={cn('h-3.5', col.key === '_actions' ? 'w-6' : 'w-24')}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-card shadow-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            {columns.map(col => (
              <TableHead
                key={col.key}
                className={cn(col.sortable && 'cursor-pointer select-none')}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && sort === col.key && (
                    order === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              {columns.map(col => (
                <TableCell key={col.key} className="text-foreground">
                  {col.render ? col.render(item) : String(item[col.key] ?? '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-14">
                <div className="flex flex-col items-center gap-2">
                  <Inbox size={28} className="text-muted-foreground/60" />
                  <p className="text-sm font-medium text-foreground">{emptyMessage}</p>
                  <p className="text-xs text-muted-foreground">No results to show here yet</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
