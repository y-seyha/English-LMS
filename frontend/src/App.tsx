import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useClerk, useAuth, SignIn, SignUp } from "@clerk/clerk-react";
import Layout from "./components/layout/Layout";
import { setClerkInstance } from "./api/client";
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";

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

function Landing() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold text-foreground">EnglishEase</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Learn English step by step with Khmer translation
      </p>
      <a
        href="/sign-in"
        className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-primary/40 bg-black dark:bg-white px-6 py-3 dark:text-black  text-white font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg dark:border-primary/60 active:translate-y-0 active:scale-[0.98]"
      >
        Sign In to Start Learning
      </a>
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
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/lessons"
            element={
              <ProtectedRoute>
                <LessonsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/stories"
            element={
              <ProtectedRoute>
                <StoriesManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vocabulary"
            element={
              <ProtectedRoute>
                <VocabularyManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <UsersManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/review"
            element={
              <ProtectedRoute>
                <ReviewManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in/*"
            element={
              <PublicRoute>
                <div className="flex min-h-[calc(100vh-10rem)] w-full items-center justify-center p-4">
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
                <div className="flex min-h-[calc(100vh-10rem)] w-full items-center justify-center p-4">
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
