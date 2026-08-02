import { useState, useCallback } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAdminDashboard, useAdminActivity, useAdminUsers } from '../../api/admin'
import { useAdminSocket } from '../../hooks/useAdminSocket'
import AdminLayout from '../../components/layout/AdminLayout'
import {
  Users, BookOpen, BookMarked, LetterText, Target, Layers,
  TrendingUp, Activity, RefreshCw, Loader2, AlertCircle,
  ChevronLeft, ChevronRight, Wifi,
} from 'lucide-react'
import {
  LineChart, Line, Bar,
  ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#2563eb', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#f97316']

type Period = 7 | 30 | 90

function PercentileBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  )
}

export default function AdminDashboard() {
  const { language } = useLanguage()
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
      <div className="rounded-lg border border-black/10 bg-white p-3 text-xs shadow-lg dark:border-white/10 dark:bg-black">
        <p className="mb-1 font-medium text-black dark:text-white">{label}</p>
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
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
          <AlertCircle size={32} className="text-red-500" />
          <p className="text-sm text-red-500">{(statsError as any)?.response?.data?.message ?? 'Failed to load dashboard'}</p>
          <button onClick={() => window.location.reload()} className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black">
            Reload
          </button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[1.875rem] font-bold text-black dark:text-white">
              {language === 'en' ? 'Admin Dashboard' : 'ផ្ទាំងគ្រប់គ្រង'}
            </h1>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                isConnected
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
              }`}
            >
              <Wifi size={12} />
              {isConnected
                ? (language === 'en' ? 'Live' : 'ផ្ទាល់')
                : (language === 'en' ? 'Offline' : 'គ្មាន')}
            </span>
          </div>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            {language === 'en' ? 'Overview of your platform' : 'ទិដ្ឋភាពទូទៅនៃវេទិការបស់អ្នក'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {([7, 30, 90] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => { setPeriod(p); setUserPage(1) }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                period === p
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-black/5 text-black/60 hover:bg-black/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10'
              }`}
            >
              {periodLabel(p)}
            </button>
          ))}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="ml-1 rounded-lg p-1.5 text-black/60 hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/10"
          >
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {loading && !displayStats ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 size={32} className="animate-spin text-black/40 dark:text-white/40" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {kpiCards.map((card, i) => (
              <div
                key={i}
                className="animate-slide-up rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-black"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
              >
                <card.icon size={20} className="mb-2 text-black/60 dark:text-white/60" />
                <div className="text-2xl font-bold text-black dark:text-white">
                  {card.value}
                </div>
                <div className="text-xs text-black/60 dark:text-white/60">
                  {language === 'en' ? card.label : card.km}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* User Growth Chart */}
            <ChartCard title={language === 'en' ? 'User Growth' : 'កំណើនអ្នកប្រើ'} loading={refreshing}>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-black/10 dark:text-white/10" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} className="text-black/60 dark:text-white/60" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} className="text-black/60 dark:text-white/60" />
                  <Tooltip content={renderTooltip} />
                  <Line type="monotone" dataKey="count" name="New Users" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Active Users Chart */}
            <ChartCard title={language === 'en' ? 'Active Users' : 'អ្នកប្រើសកម្ម'} loading={refreshing}>
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={activeUserData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-black/10 dark:text-white/10" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} className="text-black/60 dark:text-white/60" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} className="text-black/60 dark:text-white/60" />
                  <Tooltip content={renderTooltip} />
                  <Area type="monotone" dataKey="count" name="Active Users" fill="#8b5cf6" fillOpacity={0.15} stroke="#8b5cf6" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Quiz Activity Chart */}
            <ChartCard title={language === 'en' ? 'Quiz Activity' : 'សកម្មភាពតេស្ត'} className="lg:col-span-2" loading={refreshing}>
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={quizActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-black/10 dark:text-white/10" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} className="text-black/60 dark:text-white/60" />
                  <YAxis yAxisId="left" allowDecimals={false} tick={{ fontSize: 11 }} className="text-black/60 dark:text-white/60" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fontSize: 11 }} className="text-black/60 dark:text-white/60" />
                  <Tooltip content={renderTooltip} />
                  <Bar yAxisId="left" dataKey="attempts" name="Attempts" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="avgScore" name="Avg Score %" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Top Users */}
            <ChartCard title={language === 'en' ? 'Top Learners' : 'អ្នករៀនកំពូល'} className="lg:col-span-2" loading={refreshing}>
              <div className="space-y-3 pt-1">
                {topUsers.length === 0 && (
                  <p className="py-6 text-center text-sm text-black/60 dark:text-white/60">
                    {language === 'en' ? 'No data yet' : 'មិនទាន់មានទិន្នន័យទេ'}
                  </p>
                )}
                {topUsers.slice(0, 8).map((u: any, i: number) => (
                  <div key={u.userId ?? i} className="flex items-center gap-3">
                    <span className="w-5 text-right text-xs font-bold text-black/40 dark:text-white/40">
                      {i + 1}
                    </span>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/10 text-[11px] font-bold text-black dark:bg-white/10 dark:text-white">
                      {((u as any).name?.[0] ?? '?').toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-black dark:text-white">
                        {(u as any).name ?? 'Unknown'}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-black/60 dark:text-white/60">
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
          <div className="animate-fade-in rounded-xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-black">
            <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
              {language === 'en' ? 'Recent Users' : 'អ្នកប្រើថ្មី'}
              {usersLoading && <Loader2 size={14} className="ml-2 inline animate-spin" />}
            </h2>
            {userData?.data?.length > 0 ? (
              <>
                <div className="space-y-2">
                  {userData.data.map((u: any) => (
                    <div key={u._id} className="flex items-center gap-3 rounded-lg border border-black/10 px-4 py-2.5 text-sm dark:border-white/10">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/10 text-xs font-bold text-black dark:bg-white/10 dark:text-white">
                        {(u.name?.[0] ?? '?').toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-black dark:text-white">{u.name}</div>
                        <div className="truncate text-xs text-black/60 dark:text-white/60">{u.email}</div>
                      </div>
                      <span className="shrink-0 text-xs text-black/60 dark:text-white/60">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
                {userData.totalPages > 1 && (
                  <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3 dark:border-white/10">
                    <p className="text-xs text-black/60 dark:text-white/60">
                      Page {userData.page} of {userData.totalPages}
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setUserPage(Math.max(1, userPage - 1))}
                        disabled={userPage <= 1}
                        className="rounded-lg p-1.5 text-black/60 hover:bg-black/5 disabled:opacity-30 dark:text-white/60 dark:hover:bg-white/10"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={() => setUserPage(Math.min(userData.totalPages, userPage + 1))}
                        disabled={userPage >= userData.totalPages}
                        className="rounded-lg p-1.5 text-black/60 hover:bg-black/5 disabled:opacity-30 dark:text-white/60 dark:hover:bg-white/10"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-black/60 dark:text-white/60">
                {language === 'en' ? 'No users found' : 'រកមិនឃើញអ្នកប្រើទេ'}
              </p>
            )}
          </div>
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
    <div className={`rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-black ${className ?? ''}`}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-black dark:text-white">{title}</h3>
        {loading && <Loader2 size={14} className="animate-spin text-black/40 dark:text-white/40" />}
      </div>
      {children}
    </div>
  )
}
