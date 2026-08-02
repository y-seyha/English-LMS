import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  BookMarked,
  LetterText,
  Users,
  RefreshCw,
} from "lucide-react";
import { useBilingualText } from "../../contexts/LanguageContext";
import type { ReactNode } from "react";

const navLinks = [
  {
    to: "/admin",
    label: { en: "Dashboard", km: "ផ្ទាំងគ្រប់គ្រង" },
    icon: BarChart3,
  },
  {
    to: "/admin/lessons",
    label: { en: "Lessons", km: "មេរៀន" },
    icon: BookOpen,
  },
  {
    to: "/admin/stories",
    label: { en: "Stories", km: "រឿង" },
    icon: BookMarked,
  },
  {
    to: "/admin/vocabulary",
    label: { en: "Vocabulary", km: "វាក្យសព្ទ" },
    icon: LetterText,
  },
  { to: "/admin/users", label: { en: "Users", km: "អ្នកប្រើ" }, icon: Users },
  { to: "/admin/review", label: { en: "Review", km: "ពិនិត្យ" }, icon: RefreshCw },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const t = useBilingualText();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex w-full gap-6 py-6">
      {/* Fixed sidebar using sticky top */}
      <aside className="sticky top-6 hidden h-[fit-content] w-56 shrink-0 flex-col border-r border-slate-200 pr-6 dark:border-slate-800 md:flex">
        <nav className="space-y-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <button
                key={link.to}
                onClick={() => navigate(link.to)}
                className={`flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                <link.icon size={16} />
                {t(link.label)}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content flows naturally */}
      <div className="min-w-0 flex-1 animate-fade-in pb-12">{children}</div>
    </div>
  );
}
