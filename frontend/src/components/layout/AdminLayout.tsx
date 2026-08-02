import { useMemo, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, PanelLeftClose, PanelLeftOpen, LogOut } from "lucide-react";
import { useBilingualText, useLanguage } from "../../contexts/LanguageContext";
import { useUser, useClerk } from "@clerk/clerk-react";
import type { ReactNode } from "react";
import { adminNavItems } from "./SidebarNav";
import { Button } from "../ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "../../lib/utils";

const STORAGE_KEY = "elp-admin-sidebar-collapsed";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const t = useBilingualText();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "1"
  );

  const displayName = user?.fullName || user?.firstName || user?.username || "Admin";
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const initial = (user?.firstName?.[0] ?? user?.username?.[0] ?? "A").toUpperCase();

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  const toggleCollapsed = () => {
    setCollapsed(prev => {
      localStorage.setItem(STORAGE_KEY, prev ? "0" : "1");
      return !prev;
    });
  };

  const breadcrumbs = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return null;
    const last = parts[parts.length - 1]!;
    const item = adminNavItems.find(i => {
      const to = i.to.split("/").filter(Boolean);
      return to[to.length - 1] === last;
    });
    if (!item) return null;
    return { label: t(item.label) };
  }, [location.pathname, t]);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex h-full w-full gap-5">
        {/* Sidebar — fixed pane, own scroll, never moves with content */}
        <aside
          className={cn(
            "hidden h-full shrink-0 flex-col overflow-hidden rounded-xl border bg-sidebar transition-all duration-300 ease-in-out md:flex",
            collapsed ? "w-14" : "w-56"
          )}
        >
          <div
            className={cn(
              "flex shrink-0 items-center gap-2 border-b border-sidebar-border px-3 py-3",
              collapsed && "justify-center px-0"
            )}
          >
            {collapsed ? (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {initial}
              </span>
            ) : (
              <>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {initial}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{displayName}</p>
                  {email && (
                    <p className="truncate text-[11px] text-muted-foreground">{email}</p>
                  )}
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={toggleCollapsed}
                      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                      className="shrink-0 text-muted-foreground"
                    >
                      {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {collapsed
                      ? language === "en" ? "Expand sidebar" : "ពង្រីក"
                      : language === "en" ? "Collapse sidebar" : "បង្រួម"}
                  </TooltipContent>
                </Tooltip>
              </>
            )}
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
            <div className="flex flex-col gap-1">
              {adminNavItems.map(item => {
                const Icon = item.icon;
                const active = item.end
                  ? location.pathname === item.to
                  : location.pathname.startsWith(item.to);
                return (
                  <Tooltip key={item.to}>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={item.to}
                        className={cn(
                          "group flex items-center rounded-lg text-sm font-medium transition-all",
                          collapsed ? "justify-center px-0 py-2" : "gap-3 px-3 py-2",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                        )}
                      >
                        <Icon size={17} className="shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="truncate">{t(item.label)}</span>
                            {active && (
                              <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" sideOffset={8}>
                        {t(item.label)}
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </div>
          </nav>

          <div className="shrink-0 space-y-1 border-t border-sidebar-border p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size={collapsed ? "icon-sm" : "sm"}
                  className={cn(
                    "w-full text-muted-foreground",
                    collapsed && "px-0"
                  )}
                  onClick={() => navigate("/learn")}
                >
                  <ArrowLeft size={16} className="shrink-0" />
                  {!collapsed && (
                    <span className="truncate">
                      {language === "en" ? "Back to site" : "ត្រឡប់ទៅគេហទំព័រ"}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" sideOffset={8}>
                  {language === "en" ? "Back to site" : "ត្រឡប់ទៅគេហទំព័រ"}
                </TooltipContent>
              )}
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size={collapsed ? "icon-sm" : "sm"}
                  className={cn(
                    "w-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
                    collapsed && "px-0"
                  )}
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="shrink-0" />
                  {!collapsed && (
                    <span className="truncate">
                      {language === "en" ? "Log out" : "ចាកចេញ"}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" sideOffset={8}>
                  {language === "en" ? "Log out" : "ចាកចេញ"}
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </aside>

        {/* Content pane — own scroll */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {breadcrumbs && (
            <div className="mb-4 flex shrink-0 items-center border-b pb-2.5">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/admin">
                        {language === "en" ? "Dashboard" : "ផ្ទាំងគ្រប់គ្រង"}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumbs.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}

          {/* Mobile top nav — phones and small tablets */}
          <div className="mb-4 flex shrink-0 gap-1 overflow-x-auto pb-1 md:hidden">
            {adminNavItems.map(link => {
              const Icon = link.icon;
              const active =
                location.pathname === link.to ||
                (!link.end && location.pathname.startsWith(link.to));
              return (
                <button
                  key={link.to}
                  onClick={() => navigate(link.to)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon size={14} />
                  {t(link.label)}
                </button>
              );
            })}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto pb-6">
            <div className="min-w-0 animate-fade-in">{children}</div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
