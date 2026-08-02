import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser, useAuth, UserButton } from "@clerk/clerk-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage, useBilingualText } from "../../contexts/LanguageContext";
import { useCurrentUser } from "../../api/users";
import {
  GraduationCap,
  BookOpen,
  BookMarked,
  BarChart3,
  Menu,
  X,
  Sun,
  Moon,
  Bookmark,
  RefreshCw,
  Shield,
  Loader2,
} from "lucide-react";

const studentLinks = [
  { to: "/learn", label: { en: "Home", km: "ទំព័រដើម" }, icon: GraduationCap },
  {
    to: "/learn/grammar",
    label: { en: "Grammar", km: "វេយ្យាករណ៍" },
    icon: BookOpen,
  },
  {
    to: "/learn/stories",
    label: { en: "Stories", km: "រឿង" },
    icon: BookMarked,
  },
  {
    to: "/learn/progress",
    label: { en: "Progress", km: "វឌ្ឍនភាព" },
    icon: BarChart3,
  },
  {
    to: "/learn/bookmarks",
    label: { en: "Bookmarks", km: "ចំណាំ" },
    icon: Bookmark,
  },
  {
    to: "/learn/vocabulary",
    label: { en: "Vocabulary", km: "វាក្យសព្ទ" },
    icon: BookMarked,
  },
  {
    to: "/learn/review",
    label: { en: "Review", km: "ពិនិត្យឡើងវិញ" },
    icon: RefreshCw,
  },
];

const publicLinks = studentLinks.slice(0, 2);

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = useBilingualText();
  const { isLoaded: authLoaded } = useAuth();
  const { user, isSignedIn } = useUser();
  const { has } = useAuth();
  const { data: currentUser } = useCurrentUser();
  const isAdmin = !!(
    (() => {
      try {
        return has?.({ permission: "org:admin" });
      } catch {
        return false;
      }
    })() ||
    user?.publicMetadata?.role === "admin" ||
    currentUser?.role === "admin"
  );

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/learn" && location.pathname.startsWith(path));

  if (!authLoaded) {
    return (
      <header className="sticky top-0 z-50 border-b border-[--border] bg-[--card]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2 text-lg font-bold text-[--foreground]">
            <GraduationCap size={24} className="text-[--primary]" />
            EnglishEase
          </div>
          <Loader2 size={18} className="animate-spin text-[--muted]" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[--border] bg-[--card]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-3">
        <Link
          to={isSignedIn ? "/learn" : "/"}
          className="flex cursor-pointer items-center gap-2 text-lg font-bold text-[--foreground] transition-opacity hover:opacity-85"
        >
          <GraduationCap size={24} className="text-[--primary]" />
          EnglishEase
        </Link>

        {isSignedIn ? (
          <>
            <nav className="hidden items-center gap-1.5 md:flex">
              {studentLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      active
                        ? "bg-black dark:bg-white text-white dark:text-black font-semibold shadow-sm"
                        : "text-[--foreground] hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                  >
                    <link.icon size={16} />
                    {t(link.label)}
                  </Link>
                );
              })}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    isActive("/admin")
                      ? "bg-black  dark:bg-white text-white dark:text-slate-950 font-semibold shadow-sm"
                      : "text-[--foreground] hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  <Shield size={16} />
                  Admin
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-xs font-bold uppercase text-[--foreground] transition-colors hover:bg-black/5 dark:hover:bg-white/10 active:scale-95"
                title={
                  language === "en" ? "Switch to Khmer" : "ប្តូរទៅអង់គ្លេស"
                }
              >
                {language}
              </button>
              <button
                onClick={toggleTheme}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[--foreground] transition-colors hover:bg-black/5 dark:hover:bg-white/10 active:scale-95"
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              <div className="flex items-center gap-2 border-l border-[--border] pl-2">
                <UserButton afterSignOutUrl="/" />
              </div>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[--foreground] transition-colors hover:bg-black/5 dark:hover:bg-white/10 md:hidden"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </>
        ) : (
          <>
            <nav className="hidden items-center gap-1.5 md:flex">
              {publicLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      active
                        ? "bg-[--primary] text-slate-950 font-semibold shadow-sm"
                        : "text-[--foreground] hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                  >
                    <link.icon size={16} />
                    {t(link.label)}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-xs font-bold uppercase text-[--foreground] transition-colors hover:bg-black/5 dark:hover:bg-white/10 active:scale-95"
              >
                {language}
              </button>
              <button
                onClick={toggleTheme}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[--foreground] transition-colors hover:bg-black/5 dark:hover:bg-white/10 active:scale-95"
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              <button
                onClick={() => navigate("/sign-in")}
                className="cursor-pointer rounded-lg bg-black px-4 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-black transition-all hover:bg-[--primary-hover] active:scale-95"
              >
                {language === "en" ? "Sign In" : "ចូល"}
              </button>
            </div>
          </>
        )}
      </div>

      {mobileOpen && (
        <div className="border-t border-[--border] bg-[--card] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {(isSignedIn ? studentLinks : publicLinks).map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-[--primary] text-slate-950 font-semibold"
                      : "text-[--foreground] hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  <link.icon size={16} />
                  {t(link.label)}
                </Link>
              );
            })}
            {isAdmin && isSignedIn && (
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive("/admin")
                    ? "bg-[--primary] text-slate-950 font-semibold"
                    : "text-[--foreground] hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                <Shield size={16} />
                Admin
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
