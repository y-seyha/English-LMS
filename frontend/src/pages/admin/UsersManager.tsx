import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAdminUsers } from '../../api/admin'
import AdminLayout from '../../components/layout/AdminLayout'
import SearchInput from '../../components/ui/SearchInput'
import Pagination from '../../components/ui/Pagination'
import DataTable from '../../components/ui/DataTable'
import DetailModal from '../../components/ui/DetailModal'
import { ArrowLeft, Eye } from 'lucide-react'

export default function UsersManager() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('createdAt')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [detailItem, setDetailItem] = useState<any>(null)

  const { data, isLoading, error } = useAdminUsers({ search, page, pageSize: 20, sort, order })

  const columns = [
    { key: 'name', header: language === 'en' ? 'Name' : 'ឈ្មោះ', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: language === 'en' ? 'Role' : 'តួនាទី' },
    { key: 'createdAt', header: language === 'en' ? 'Joined' : 'ចូលរួម', sortable: true,
      render: (item: any) => new Date(item.createdAt).toLocaleDateString() },
    { key: 'isActive', header: language === 'en' ? 'Status' : 'ស្ថានភាព',
      render: (item: any) => item.isActive ? 'Active' : 'Inactive' },
    { key: '_actions', header: '',
      render: (item: any) => (
        <button onClick={() => setDetailItem(item)}
          className="rounded-lg p-1.5 text-black/30 hover:bg-black/5 hover:text-black dark:text-white/30 dark:hover:bg-white/10 dark:hover:text-white">
          <Eye size={14} />
        </button>
      ) },
  ]

  const handleSort = (key: string) => {
    if (sort === key) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setSort(key)
      setOrder('asc')
    }
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <button onClick={() => navigate('/admin')} className="mb-2 inline-flex items-center gap-1 text-sm text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white">
          <ArrowLeft size={14} /> {language === 'en' ? 'Back to Dashboard' : 'ត្រឡប់'}
        </button>
        <h1 className="text-[1.875rem] font-bold text-black dark:text-white">
          {language === 'en' ? 'Users Manager' : 'គ្រប់គ្រងអ្នកប្រើ'}
        </h1>
      </div>

      <div className="mb-4 max-w-xs">
        <SearchInput value={search} onChange={setSearch} placeholder={language === 'en' ? 'Search users...' : 'ស្វែងរក...'} />
      </div>

      {error ? (
        <div className="flex min-h-[30vh] flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 p-12 text-center dark:border-red-800 dark:bg-red-950/20">
          <p className="text-sm text-red-600 dark:text-red-400">{(error as any)?.response?.data?.message ?? 'Failed to load users'}</p>
          <button onClick={() => window.location.reload()} className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black">Reload</button>
        </div>
      ) : (
        <>
          <DataTable
            columns={columns as any}
            data={data?.data ?? []}
            sort={sort}
            order={order}
            onSort={handleSort}
            isLoading={isLoading}
          />

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
        title={detailItem ? `User: ${detailItem.name ?? detailItem.email ?? detailItem.id}` : ''}
        data={detailItem as Record<string, unknown>}
      />
    </AdminLayout>
  )
}
