import { ChevronUp, ChevronDown } from 'lucide-react'

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
}

export default function DataTable<T extends Record<string, unknown>>({
  columns, data, sort, order, onSort, isLoading,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-black/10 bg-white p-12 text-center text-black dark:border-white/10 dark:bg-black dark:text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-black/10 bg-black/2 dark:border-white/10 dark:bg-white/4">
            {columns.map(col => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left font-medium text-black dark:text-white ${col.sortable ? 'cursor-pointer select-none hover:text-black dark:hover:text-white' : ''}`}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && sort === col.key && (
                    order === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
              <tr key={i} className="border-b border-black/10 last:border-0 hover:bg-black/2 dark:border-white/10 dark:hover:bg-white/4">
              {columns.map(col => (
                <td key={col.key} className="px-4 py-3 text-black dark:text-white">
                  {col.render ? col.render(item) : String(item[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-black dark:text-white">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
