import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useLanguage } from "../contexts/LanguageContext";
import { GraduationCap, Sparkles, BookOpen, Brain, Trophy } from "lucide-react";
import Modal from "./ui/Modal";
import { Button } from "./ui/button";

const STORAGE_KEY = "welcome-dismissed";
const AUTO_CLOSE_MS = 7000;

function shouldShow(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return true;
    const dismissed = parseInt(stored, 10);
    if (isNaN(dismissed)) return true;
    return Date.now() - dismissed > 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const { language } = useLanguage();

  // Handle opening the modal
  useEffect(() => {
    if (!shouldShow()) return;
    const openTimer = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(openTimer);
  }, []);

  const handleClose = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
    setOpen(false);
  };

  // Continuous auto-close timer
  useEffect(() => {
    if (!open) return;

    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, AUTO_CLOSE_MS);

    return () => clearTimeout(autoCloseTimer);
  }, [open]);

  return (
    <Modal isOpen={open} onClose={handleClose} title="">
      {/* CSS Animation Keyframes for Countdown */}
      <style>{`
        @keyframes countdown {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      {/* Top Glow Accent Effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-44 w-44 -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl"
      />

      <div className="text-center pt-2">
        {/* Badge / Main Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-4 ring-primary/10">
          <GraduationCap size={32} />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          {language === "en"
            ? "Welcome to EnglishEase"
            : "សូមស្វាគមន៍មកកាន់ EnglishEase"}
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {language === "en"
            ? "Learn English grammar step by step with Khmer translations."
            : "រៀនវេយ្យាករណ៍ភាសាអង់គ្លេសជាជំហានៗជាមួយការបកប្រែជាភាសាខ្មែរ។"}
        </p>

        {/* Feature Highlights Grid */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[
            { icon: BookOpen, labelEn: "Lessons", labelKm: "មេរៀន" },
            { icon: Brain, labelEn: "Quizzes", labelKm: "សំណួរ" },
            { icon: Trophy, labelEn: "Progress", labelKm: "វឌ្ឍនភាព" },
          ].map(({ icon: Icon, labelEn, labelKm }) => (
            <div
              key={labelEn}
              className="flex flex-col items-center gap-2 rounded-xl border bg-card p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-md"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 hover:scale-110">
                <Icon size={18} />
              </div>
              <span className="text-xs font-semibold text-foreground">
                {language === "en" ? labelEn : labelKm}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {!isSignedIn && (
            <Button asChild className="h-auto w-full px-5 py-3">
              <a href="/sign-in">
                <Sparkles size={16} />
                {language === "en"
                  ? "Sign In to Start"
                  : "ចូលប្រើដើម្បីចាប់ផ្តើម"}
              </a>
            </Button>
          )}

          <Button
            variant="outline"
            onClick={handleClose}
            className="h-auto w-full px-5 py-3"
          >
            {language === "en" ? "Get Started" : "ចាប់ផ្តើម"}
          </Button>
        </div>
      </div>

      {/* Countdown Timer Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 w-full bg-muted/25">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          style={{
            animationName: "countdown",
            animationDuration: `${AUTO_CLOSE_MS}ms`,
            animationTimingFunction: "linear",
            animationFillMode: "forwards",
          }}
        />
      </div>
    </Modal>
  );
}
