import { Link, useNavigate } from "react-router-dom";
import { useUser, useAuth, UserButton } from "@clerk/clerk-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { GraduationCap, Menu, Sun, Moon, ChevronDown, Check } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "../../lib/utils";

interface HeaderProps {
  onMenuClick?: () => void;
  showMenu?: boolean;
}

const LANGUAGES = [
  { code: "en", name: "English", native: "English", flag: "🇬🇧" },
  { code: "km", name: "Khmer", native: "ភាសាខ្មែរ", flag: "🇰🇭" },
] as const;

export default function Header({ onMenuClick, showMenu }: HeaderProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { isLoaded: authLoaded } = useAuth();
  const { isSignedIn } = useUser();

  const current = LANGUAGES.find(l => l.code === language) ?? LANGUAGES[0];

  if (!authLoaded) {
    return (
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 text-lg font-bold text-foreground">
            <GraduationCap size={22} className="text-primary" />
            EnglishEase
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">{current.flag}</span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
        {showMenu && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu />
          </Button>
        )}

        <Link
          to={isSignedIn ? "/learn" : "/"}
          className="flex cursor-pointer items-center gap-2 text-lg font-bold text-foreground transition-opacity hover:opacity-85"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <GraduationCap size={20} />
          </span>
          <span className="hidden sm:inline">EnglishEase</span>
        </Link>

        <div className="ml-auto flex items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="group gap-1.5 px-2.5 text-foreground data-[state=open]:bg-accent"
                aria-label={language === "en" ? "Select language" : "ជ្រើសរើសភាសា"}
              >
                <span className="text-base leading-none">{current.flag}</span>
                <span className="text-xs font-semibold uppercase">{language}</span>
                <ChevronDown size={14} className="text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {LANGUAGES.map(lang => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    "gap-2.5",
                    language === lang.code && "bg-accent font-medium text-foreground"
                  )}
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="flex-1">
                    {lang.name}
                    <span className="ml-1.5 text-xs text-muted-foreground">{lang.native}</span>
                  </span>
                  {language === lang.code && <Check size={14} className="text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleTheme}
            title={theme === "light" ? "Switch to dark" : "Switch to light"}
          >
            {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          {isSignedIn ? (
            <div className="ml-1 border-l border-border pl-2">
              <UserButton
                afterSignOutUrl="/"
                appearance={{ elements: { avatarBox: "h-8 w-8 rounded-full" } }}
              />
            </div>
          ) : (
            <Button
              size="sm"
              className="ml-1"
              onClick={() => navigate("/sign-in")}
            >
              {language === "en" ? "Sign In" : "ចូល"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
