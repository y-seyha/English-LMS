import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { GraduationCap, Sun, Moon, Menu, X } from 'lucide-react'

const navItems = [
  { to: '/', label: { en: 'Home', km: 'ទំព័រដើម' } },
  { to: '/grammar', label: { en: 'Grammar', km: 'វេយ្យាករណ៍' } },
  { to: '/stories', label: { en: 'Stories', km: 'រឿង' } },
  { to: '/progress', label: { en: 'Progress', km: 'វឌ្ឍនភាព' } },
]

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[--border] bg-white/85 backdrop-blur-xl dark:bg-[--background]/85">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-8 px-6 max-lg:justify-between">
        <NavLink to="/" className="flex shrink-0 items-center gap-2 text-xl font-bold text-[--primary]" onClick={() => setMobileOpen(false)}>
          <GraduationCap size={28} />
          <span>EnglishEase</span>
        </NavLink>

        <button
          className="flex items-center justify-center rounded-lg p-2 text-[--foreground] lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          className={`flex flex-col
            ${mobileOpen ? 'max-lg:max-h-[400px] max-lg:opacity-100' : 'max-lg:max-h-0 max-lg:opacity-0'}
            max-lg:absolute max-lg:left-0 max-lg:right-0 max-lg:top-16 max-lg:z-60 max-lg:gap-1 max-lg:border-b max-lg:border-[--border] max-lg:bg-white max-lg:p-3 max-lg:shadow-lg max-lg:overflow-hidden max-lg:transition-all max-lg:duration-300 dark:max-lg:bg-gray-900
            lg:flex-row lg:flex-1 lg:items-center lg:gap-1 lg:static lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none lg:max-h-none lg:opacity-100 lg:overflow-visible`}
        >
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-muted transition-all hover:bg-black/4 hover:text-[--foreground] dark:hover:bg-white/6 max-lg:text-gray-700 max-lg:dark:text-gray-300 ${isActive ? 'bg-blue-100 text-blue-700 dark:bg-sky-900/40 dark:text-sky-300' : ''}`
              }
              end={item.to === '/'}
              onClick={() => setMobileOpen(false)}
            >
              {item.label[language]}
            </NavLink>
          ))}
          <div className="flex gap-2 border-t border-[--border] px-4 pb-1 pt-3 lg:hidden">
            <button onClick={toggleLanguage} className="rounded-lg bg-black/4 px-[0.625rem] py-[0.375rem] text-sm font-semibold text-muted hover:bg-black/8 hover:text-[--foreground] dark:bg-white/6 dark:hover:bg-white/10 max-lg:text-gray-700 max-lg:dark:text-gray-300" title="Toggle language">
              {language === 'en' ? 'KH' : 'EN'}
            </button>
            <button onClick={toggleTheme} className="flex items-center rounded-lg p-2 text-muted hover:bg-black/4 hover:text-[--foreground] dark:hover:bg-white/6 max-lg:text-gray-700 max-lg:dark:text-gray-300" title="Toggle theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button onClick={toggleLanguage} className="rounded-lg bg-black/4 px-[0.625rem] py-[0.375rem] text-sm font-semibold text-muted hover:bg-black/8 hover:text-[--foreground] dark:bg-white/6 dark:hover:bg-white/10" title="Toggle language">
            {language === 'en' ? 'KH' : 'EN'}
          </button>
          <button onClick={toggleTheme} className="flex items-center rounded-lg p-2 text-muted hover:bg-black/4 hover:text-[--foreground] dark:hover:bg-white/6" title="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
      {mobileOpen && <div className="fixed inset-0 top-16 z-55 bg-black/30" onClick={() => setMobileOpen(false)} />}
    </header>
  )
}
