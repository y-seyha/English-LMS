import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useClerk, useAuth, SignIn, SignUp } from "@clerk/clerk-react";
import Layout from "./components/layout/Layout";
import { setClerkInstance } from "./api/client";
import { useIsAdmin } from "./hooks/useIsAdmin";
import { Toaster } from "sonner";
import { Loader2, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "./components/ui/button";

import Home from "./pages/student/Home";
import Grammar from "./pages/student/Grammar";
import GrammarLesson from "./pages/student/GrammarLesson";
import Stories from "./pages/student/Stories";
import StoryReader from "./pages/student/StoryReader";
import Progress from "./pages/student/Progress";
import Bookmarks from "./pages/student/Bookmarks";
import Review from "./pages/student/Review";
import VocabularyPage from "./pages/student/Vocabulary";

import WelcomePopup from "./components/WelcomePopup";
import AdminDashboard from "./pages/admin/Dashboard";
import LessonsManager from "./pages/admin/LessonsManager";
import StoriesManager from "./pages/admin/StoriesManager";
import VocabularyManager from "./pages/admin/VocabularyManager";
import UsersManager from "./pages/admin/UsersManager";
import ReviewManager from "./pages/admin/ReviewManager";

function Loader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 size={32} className="animate-spin text-primary" />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, userId } = useAuth();
  if (!isLoaded) return <Loader />;
  if (!userId) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, userId } = useAuth();
  if (!isLoaded) return <Loader />;
  if (userId) return <Navigate to="/learn" replace />;
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, userId } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useIsAdmin();
  if (!isLoaded || roleLoading) return <Loader />;
  if (!userId) return <Navigate to="/" replace />;
  if (!isAdmin) return <Navigate to="/learn" replace />;
  return <>{children}</>;
}

function Landing() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <GraduationCap size={32} />
      </div>
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        EnglishEase
      </h1>
      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        Learn English step by step with Khmer translation
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" className="text-base" onClick={() => (window.location.href = "/sign-in")}>
          <Sparkles size={18} />
          Sign In to Start Learning
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="text-base"
          onClick={() => (window.location.href = "/sign-up")}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
}

// Clerk dynamic theme using shadcn CSS variables
// This automatically reacts to the dark class on <html>
const clerkAppearance = {
  variables: {
    colorBackground: "var(--card)",
    colorText: "var(--foreground)",
    colorTextSecondary: "var(--muted-foreground)",
    colorPrimary: "var(--primary)",
    colorTextOnPrimaryBackground: "var(--primary-foreground)",
    colorInputBackground: "var(--background)",
    colorInputText: "var(--foreground)",
    colorBorder: "var(--border)",
  },
  elements: {
    card: "shadow-2xl border border-border rounded-2xl",
    socialButtonsBlockButton: "border border-border",
    formButtonPrimary:
      "bg-primary text-primary-foreground hover:bg-primary-hover",
    formFieldInput: "border border-border",
    footerActionLink: "text-primary hover:underline font-semibold",
    identityPreviewEditButton: "text-primary hover:underline",
  },
};

export default function App() {
  const clerk = useClerk();

  useEffect(() => {
    setClerkInstance(clerk);
  }, [clerk]);

  return (
    <Layout>
      <Toaster position="bottom-right" richColors />
      <WelcomePopup />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />
          <Route
            path="/learn"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/learn/grammar" element={<Grammar />} />
          <Route
            path="/learn/grammar/:lessonId"
            element={
              <ProtectedRoute>
                <GrammarLesson />
              </ProtectedRoute>
            }
          />
          <Route path="/learn/stories" element={<Stories />} />
          <Route
            path="/learn/stories/:storyId"
            element={
              <ProtectedRoute>
                <StoryReader />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn/progress"
            element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn/bookmarks"
            element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn/vocabulary"
            element={
              <ProtectedRoute>
                <VocabularyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn/review"
            element={
              <ProtectedRoute>
                <Review />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/lessons"
            element={
              <AdminRoute>
                <LessonsManager />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/stories"
            element={
              <AdminRoute>
                <StoriesManager />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/vocabulary"
            element={
              <AdminRoute>
                <VocabularyManager />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UsersManager />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/review"
            element={
              <AdminRoute>
                <ReviewManager />
              </AdminRoute>
            }
          />
          <Route
            path="/sign-in/*"
            element={
              <PublicRoute>
                <div className="flex min-h-[75vh] w-full items-center justify-center py-8">
                  <SignIn
                    routing="path"
                    path="/sign-in"
                    signUpUrl="/sign-up"
                    fallbackRedirectUrl="/learn"
                    appearance={clerkAppearance}
                  />
                </div>
              </PublicRoute>
            }
          />
          <Route
            path="/sign-up/*"
            element={
              <PublicRoute>
                <div className="flex min-h-[75vh] w-full items-center justify-center py-8">
                  <SignUp
                    routing="path"
                    path="/sign-up"
                    signInUrl="/sign-in"
                    fallbackRedirectUrl="/learn"
                    appearance={clerkAppearance}
                  />
                </div>
              </PublicRoute>
            }
          />
        </Routes>
    </Layout>
  );
}
