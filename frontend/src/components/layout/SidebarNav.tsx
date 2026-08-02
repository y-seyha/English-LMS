import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  GraduationCap,
  BookOpen,
  BookMarked,
  BarChart3,
  Bookmark,
  LetterText,
  RefreshCw,
  Shield,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: { en: string; km: string };
  icon: LucideIcon;
  end?: boolean;
}

export const studentNavItems: NavItem[] = [
  {
    to: "/learn",
    label: { en: "Home", km: "ទំព័រដើម" },
    icon: GraduationCap,
    end: true,
  },
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
    to: "/learn/vocabulary",
    label: { en: "Vocabulary", km: "វាក្យសព្ទ" },
    icon: LetterText,
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
    to: "/learn/review",
    label: { en: "Review", km: "ពិនិត្យឡើងវិញ" },
    icon: RefreshCw,
  },
];

export const adminNavItems: NavItem[] = [
  {
    to: "/admin",
    label: { en: "Dashboard", km: "ផ្ទាំងគ្រប់គ្រង" },
    icon: BarChart3,
    end: true,
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
  {
    to: "/admin/users",
    label: { en: "Users", km: "អ្នកប្រើ" },
    icon: Shield,
  },
  {
    to: "/admin/review",
    label: { en: "Review", km: "ពិនិត្យ" },
    icon: RefreshCw,
  },
];

export type TranslateFn = (label: { en: string; km: string }) => string;

interface SidebarNavProps {
  items: NavItem[];
  onNavigate?: () => void;
  label?: string;
  className?: string;
  translate?: TranslateFn;
}

function NavItemLink({
  item,
  onNavigate,
  translate,
}: {
  item: NavItem;
  onNavigate?: () => void;
  translate?: TranslateFn;
}) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
          isActive
            ? "bg-primary/10 text-primary shadow-sm"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
        )
      }
    >
      <Icon size={17} className="shrink-0" />
      <span className="truncate">
        {typeof item.label === "string"
          ? item.label
          : translate
            ? translate(item.label)
            : item.label.en}
      </span>
    </NavLink>
  );
}

export default function SidebarNav({
  items,
  onNavigate,
  label,
  className,
  translate,
}: SidebarNavProps) {
  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {label && (
        <p className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      )}
      {items.map((item) => (
        <NavItemLink
          key={item.to}
          item={item}
          onNavigate={onNavigate}
          translate={translate}
        />
      ))}
    </nav>
  );
}
