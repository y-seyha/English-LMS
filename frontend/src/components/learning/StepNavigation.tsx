import { BookOpen, PencilRuler, Home, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepType = "lesson" | "exercises" | "homework" | "quiz";

interface StepNavigationProps {
  currentStep: StepType;
  onStepChange: (step: StepType) => void;
  lessonLabel: string;
  exercisesLabel: string;
  homeworkLabel: string;
  quizLabel: string;
}

const steps: { key: StepType; icon: typeof BookOpen }[] = [
  { key: "lesson", icon: BookOpen },
  { key: "exercises", icon: PencilRuler },
  { key: "homework", icon: Home },
  { key: "quiz", icon: ListChecks },
];

export default function StepNavigation({
  currentStep,
  onStepChange,
  lessonLabel,
  exercisesLabel,
  homeworkLabel,
  quizLabel,
}: StepNavigationProps) {
  const labels: Record<StepType, string> = {
    lesson: lessonLabel,
    exercises: exercisesLabel,
    homework: homeworkLabel,
    quiz: quizLabel,
  };

  return (
    <div className="mt-8 flex flex-wrap items-center gap-1 rounded-xl bg-muted/20 p-1">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const isActive = currentStep === s.key;
        const isDone = steps.findIndex((st) => st.key === currentStep) > i;

        return (
          <button
            key={s.key}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 sm:flex-none",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : isDone
                  ? "bg-success/10 text-success hover:bg-success/15"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
            onClick={() => onStepChange(s.key)}
          >
            <Icon size={16} />
            <span>{labels[s.key]}</span>
          </button>
        );
      })}
    </div>
  );
}
