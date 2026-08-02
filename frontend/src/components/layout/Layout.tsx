import { useState, type ReactNode } from "react";
import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import SidebarNav, { studentNavItems } from "./SidebarNav";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import { useLanguage } from "../../contexts/LanguageContext";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";
import { LayoutDashboard, LogOut } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { isAdmin, isLoading: roleLoading } = useIsAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  const isAdminArea = location.pathname.startsWith("/admin");
  const showSidebar = !!isLoaded && !!isSignedIn && !isAdminArea;

  const t = (en: string, km: string) => (language === "en" ? en : km);
  const translate = (label: { en: string; km: string }) =>
    language === "en" ? label.en : label.km;

  const displayName =
    user?.fullName || user?.firstName || user?.username || "Learner";
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const initial = (user?.firstName?.[0] ?? user?.username?.[0] ?? "L").toUpperCase();

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  const sidebar = (
    <div className="flex h-full flex-col p-3">
      {/* User card — top */}
      <div className="flex items-center gap-3 rounded-xl border bg-card p-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{displayName}</p>
          {email && (
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <SidebarNav
          items={studentNavItems}
          label={t("Learning", "ការរៀន")}
          onNavigate={() => setMobileOpen(false)}
          translate={translate}
        />
      </div>

      {/* Admin entry — single button for admins */}
      {isAdmin && (
        <div className="mt-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 px-3 text-sm font-medium",
              isAdminArea && "bg-primary/10 text-primary"
            )}
            onClick={() => {
              navigate("/admin");
              setMobileOpen(false);
            }}
          >
            <LayoutDashboard size={17} className="shrink-0" />
            {t("Admin Dashboard", "ផ្ទាំងគ្រប់គ្រង")}
          </Button>
        </div>
      )}
      {roleLoading && (
        <div className="mt-4 space-y-2">
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      )}

      {/* Logout — bottom */}
      <div className="mt-auto pt-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut size={16} className="shrink-0" />
          {t("Log out", "ចាកចេញ")}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Header showMenu={showSidebar} onMenuClick={() => setMobileOpen(true)} />

      <div className="flex min-h-0 flex-1">
        {showSidebar && (
          <aside className="hidden w-60 shrink-0 overflow-y-auto border-r bg-sidebar md:block">
            {sidebar}
          </aside>
        )}

        <main
          className={cn(
            "min-w-0 flex-1",
            isAdminArea ? "overflow-hidden" : "overflow-y-auto",
          )}
          style={{ scrollbarGutter: "stable" }}
        >
          <div
            className={cn(
              "mx-auto px-4 py-6 sm:px-6",
              isAdminArea ? "h-full max-w-[1400px]" : "max-w-[1120px]",
            )}
          >
            {children}
          </div>
        </main>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">
            {t("Navigation menu", "ម៉ឺនុយនាវាចរណ៍")}
          </SheetTitle>
          {sidebar}
        </SheetContent>
      </Sheet>
    </div>
  );
}
