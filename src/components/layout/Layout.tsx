import type { ReactNode } from 'react'
import Header from './Header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-12">
        <div className="mx-auto max-w-[1120px] px-6">
          {children}
        </div>
      </main>
    </div>
  )
}
