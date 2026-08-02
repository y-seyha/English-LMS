import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAdminUsers } from '../../api/admin'
import AdminLayout from '../../components/layout/AdminLayout'
import SearchInput from '../../components/ui/SearchInput'
import Pagination from '../../components/ui/Pagination'
import DataTable from '../../components/ui/DataTable'
import DetailModal from '../../components/ui/DetailModal'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/ui/PageHeader'
import { AlertCircle, Eye } from 'lucide-react'

export default function UsersManager() {
  const { language } = useLanguage()
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
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground" onClick={() => setDetailItem(item)}>
          <Eye size={14} />
        </Button>
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
      <PageHeader
        title={language === 'en' ? 'Users Manager' : 'គ្រប់គ្រងអ្នកប្រើ'}
        description={language === 'en' ? 'Manage student accounts and access' : 'គ្រប់គ្រងគណនី និងការចូលប្រើរបស់សិស្ស'}
      />

      <div className="mb-4 max-w-xs">
        <SearchInput value={search} onChange={setSearch} placeholder={language === 'en' ? 'Search users...' : 'ស្វែងរក...'} />
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{language === 'en' ? 'Failed to load users' : 'មិនអាចផ្ទុកអ្នកប្រើបានទេ'}</AlertTitle>
          <AlertDescription>
            {(error as any)?.response?.data?.message ?? 'Failed to load users'}
            <div className="mt-3">
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                {language === 'en' ? 'Reload' : 'ផ្ទុកឡើងវិញ'}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
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
