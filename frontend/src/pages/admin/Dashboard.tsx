import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAdminDashboard, useAdminActivity, useAdminUsers } from '../../api/admin'
import { useAdminSocket } from '../../hooks/useAdminSocket'
import AdminLayout from '../../components/layout/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import PageHeader from '@/components/ui/PageHeader'
import StatCard from '@/components/ui/StatCard'
import Spinner from '@/components/ui/Spinner'
import {
  Users, BookOpen, BookMarked, LetterText, Target, Layers,
  TrendingUp, Activity, RefreshCw, Loader2, AlertCircle,
  ChevronLeft, ChevronRight, Wifi, SquarePen, BookPlus, FileText, ShieldCheck,
} from 'lucide-react'
import {
  LineChart, Line, Bar,
  ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'

const COLORS = [
  'var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)',
  'var(--chart-5)', 'var(--chart-6)', 'var(--chart-7)', 'var(--chart-8)',
]

type Period = 7 | 30 | 90

function PercentileBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted/25">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  )
}

export default function AdminDashboard() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [period, setPeriod] = useState<Period>(30)
  const [userPage, setUserPage] = useState(1)

  const { data: stats, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useAdminDashboard()
  const { data: activity, isLoading: activityLoading, refetch: refetchActivity } = useAdminActivity(period)
  const { data: userData, isLoading: usersLoading } = useAdminUsers({ page: userPage, pageSize: 10, sort: 'createdAt', order: 'desc' })
  const { isConnected, liveStats, liveActivity } = useAdminSocket()

  const displayStats = liveStats ?? stats
  const displayActivity = period === 30 ? (liveActivity ?? activity) : activity

  const loading = statsLoading
  const refreshing = statsLoading || activityLoading

  const handleRefresh = useCallback(() => {
    refetchStats()
    refetchActivity()
  }, [refetchStats, refetchActivity])

  const periodLabel = (p: Period) =>
    language === 'en' ? `${p}d` : `${p}ថ្ងៃ`

  const activeToday = displayStats?.activeToday ?? 0

  const kpiCards = [
    {
      icon: Users, label: 'Total Students', km: 'សិស្សសរុប',
      value: displayStats?.totalUsers ?? 0,
    },
    {
      icon: TrendingUp, label: 'New (30d)', km: 'ថ្មី (30d)',
      value: displayStats?.newUsersThisMonth ?? 0,
    },
    {
      icon: Activity, label: 'Active Today', km: 'សកម្មថ្ងៃនេះ',
      value: activeToday,
    },
    {
      icon: Target, label: 'Avg Quiz', km: 'មធ្យមសំណួរ',
      value: `${displayStats?.avgQuizScore ?? 0}%`,
    },
    {
      icon: BookOpen, label: 'Lessons', km: 'មេរៀន',
      value: displayStats?.totalLessons ?? 0,
    },
    {
      icon: BookMarked, label: 'Stories', km: 'រឿង',
      value: displayStats?.totalStories ?? 0,
    },
    {
      icon: LetterText, label: 'Words', km: 'ពាក្យ',
      value: displayStats?.totalVocab ?? 0,
    },
    {
      icon: Layers, label: 'Quiz Attempts', km: 'តេស្តសរុប',
      value: displayStats?.totalQuizAttempts ?? 0,
    },
  ]

  const userGrowthData = (displayActivity?.newUsers ?? []).map((d: any) => ({
    date: d._id,
    count: d.count ?? 0,
  }))
  const activeUserData = (displayActivity?.activeUsers ?? []).map((d: any) => ({
    date: d._id,
    count: d.count ?? 0,
  }))
  const quizActivityData = (displayActivity?.quizActivity ?? []).map((d: any) => ({
    date: d._id,
    attempts: d.attempts ?? 0,
    avgScore: Math.round(d.avgScore ?? 0),
  }))

  const topUsers = displayStats?.topUsers ?? []

  const renderTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
      <div className="rounded-lg border bg-card p-3 text-xs shadow-card-md">
        <p className="mb-1 font-medium text-foreground">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }

  if (statsError) {
    return (
      <AdminLayout>
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{language === 'en' ? 'Failed to load dashboard' : 'មិនអាចផ្ទុកផ្ទាំងគ្រប់គ្រងបានទេ'}</AlertTitle>
            <AlertDescription>{(statsError as any)?.response?.data?.message ?? 'Failed to load dashboard'}</AlertDescription>
          </Alert>
          <Button variant="outline" onClick={() => window.location.reload()}>
            {language === 'en' ? 'Reload' : 'ផ្ទុកឡើងវិញ'}
          </Button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <PageHeader
        title={language === 'en' ? 'Admin Dashboard' : 'ផ្ទាំងគ្រប់គ្រង'}
        description={language === 'en' ? 'Overview of your platform' : 'ទិដ្ឋភាពទូទៅនៃវេទិការបស់អ្នក'}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={isConnected ? 'success' : 'warning'} className="gap-1.5">
            <Wifi size={12} />
            {isConnected
              ? (language === 'en' ? 'Live' : 'ផ្ទាល់')
              : (language === 'en' ? 'Offline' : 'គ្មាន')}
          </Badge>
          <div className="flex items-center gap-1">
            {([7, 30, 90] as Period[]).map(p => (
              <Button
                key={p}
                size="sm"
                variant={period === p ? 'default' : 'outline'}
                onClick={() => { setPeriod(p); setUserPage(1) }}
              >
                {periodLabel(p)}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={refreshing}
            className="ml-1 text-muted-foreground"
          >
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          </Button>
        </div>
      </PageHeader>

      {loading && !displayStats ? (
        <Spinner />
      ) : (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {kpiCards.map((card, i) => (
              <div
                key={i}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
              >
                <StatCard
                  icon={<card.icon style={{ color: COLORS[i % COLORS.length]! }} />}
                  value={card.value}
                  label={language === 'en' ? card.label : card.km}
                />
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            {[
              { to: '/admin/lessons', icon: BookPlus, label: language === 'en' ? 'Manage Lessons' : 'គ្រប់គ្រងមេរៀន' },
              { to: '/admin/stories', icon: FileText, label: language === 'en' ? 'Manage Stories' : 'គ្រប់គ្រងរឿង' },
              { to: '/admin/vocabulary', icon: SquarePen, label: language === 'en' ? 'Manage Vocabulary' : 'គ្រប់គ្រងវាក្យសព្ទ' },
              { to: '/admin/users', icon: Users, label: language === 'en' ? 'Manage Users' : 'គ្រប់គ្រងអ្នកប្រើ' },
              { to: '/admin/review', icon: ShieldCheck, label: language === 'en' ? 'Review Queue' : 'ពិនិត្យ' },
            ].map(action => (
              <Button
                key={action.to}
                variant="outline"
                size="sm"
                onClick={() => navigate(action.to)}
                className="text-muted-foreground hover:text-foreground"
              >
                <action.icon size={15} />
                {action.label}
              </Button>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* User Growth Chart */}
            <ChartCard title={language === 'en' ? 'User Growth' : 'កំណើនអ្នកប្រើ'} loading={refreshing}>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/60" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} className="text-muted-foreground" />
                  <Tooltip content={renderTooltip} />
                  <Line type="monotone" dataKey="count" name="New Users" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Active Users Chart */}
            <ChartCard title={language === 'en' ? 'Active Users' : 'អ្នកប្រើសកម្ម'} loading={refreshing}>
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={activeUserData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/60" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} className="text-muted-foreground" />
                  <Tooltip content={renderTooltip} />
                  <Area type="monotone" dataKey="count" name="Active Users" fill="var(--chart-2)" fillOpacity={0.15} stroke="var(--chart-2)" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Quiz Activity Chart */}
            <ChartCard title={language === 'en' ? 'Quiz Activity' : 'សកម្មភាពតេស្ត'} className="lg:col-span-2" loading={refreshing}>
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={quizActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/60" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                  <YAxis yAxisId="left" allowDecimals={false} tick={{ fontSize: 11 }} className="text-muted-foreground" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fontSize: 11 }} className="text-muted-foreground" />
                  <Tooltip content={renderTooltip} />
                  <Bar yAxisId="left" dataKey="attempts" name="Attempts" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="avgScore" name="Avg Score %" stroke="var(--chart-4)" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Top Users */}
            <ChartCard title={language === 'en' ? 'Top Learners' : 'អ្នករៀនកំពូល'} className="lg:col-span-2" loading={refreshing}>
              <div className="space-y-3 pt-1">
                {topUsers.length === 0 && (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    {language === 'en' ? 'No data yet' : 'មិនទាន់មានទិន្នន័យទេ'}
                  </p>
                )}
                {topUsers.slice(0, 8).map((u: any, i: number) => (
                  <div key={u.userId ?? i} className="flex items-center gap-3">
                    <span className="w-5 text-right text-xs font-bold text-muted-foreground">
                      {i + 1}
                    </span>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                      {((u as any).name?.[0] ?? '?').toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-foreground">
                        {(u as any).name ?? 'Unknown'}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span title="Lessons">{u.completedLessons ?? 0}L</span>
                      <span title="Quizzes">{u.quizAttempts ?? 0}Q</span>
                      <span title="Streak">{u.streakCount ?? 0}🔥</span>
                    </div>
                    <PercentileBar
                      value={u.completedLessons ?? 0}
                      max={Math.max(...topUsers.map((x: any) => x.completedLessons ?? 0), 1)}
                      color={COLORS[i % COLORS.length]!}
                    />
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>

          {/* Recent Users with Pagination */}
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold">
                {language === 'en' ? 'Recent Users' : 'អ្នកប្រើថ្មី'}
                {usersLoading && <Loader2 size={14} className="ml-2 inline animate-spin text-muted-foreground" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userData?.data?.length > 0 ? (
                <>
                  <div className="space-y-2">
                    {userData.data.map((u: any) => (
                      <div key={u._id} className="flex items-center gap-3 rounded-lg border px-4 py-2.5 text-sm transition-colors hover:bg-accent/50">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {(u.name?.[0] ?? '?').toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-foreground">{u.name}</div>
                          <div className="truncate text-xs text-muted-foreground">{u.email}</div>
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  {userData.totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-between border-t pt-3">
                      <p className="text-xs text-muted-foreground">
                        Page {userData.page} of {userData.totalPages}
                      </p>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => setUserPage(Math.max(1, userPage - 1))}
                          disabled={userPage <= 1}
                          aria-label="Previous page"
                        >
                          <ChevronLeft size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => setUserPage(Math.min(userData.totalPages, userPage + 1))}
                          disabled={userPage >= userData.totalPages}
                          aria-label="Next page"
                        >
                          <ChevronRight size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'No users found' : 'រកមិនឃើញអ្នកប្រើទេ'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </AdminLayout>
  )
}

function ChartCard({
  title,
  children,
  className,
  loading,
}: {
  title: string
  children: React.ReactNode
  className?: string
  loading?: boolean
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {loading && <Loader2 size={14} className="animate-spin text-muted-foreground" />}
      </CardHeader>
      <CardContent className="p-5 pt-0">{children}</CardContent>
    </Card>
  )
}
