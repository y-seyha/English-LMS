import { BookOpen, PencilRuler, Home, ListChecks } from "lucide-react";

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
    <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-[--border] pt-6">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const isActive = currentStep === s.key;
        const isDone = steps.findIndex((st) => st.key === currentStep) > i;

        // Base classes: Added !text-white to active state to ensure contrast
        let btnCls =
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 border border-transparent ";

        if (isActive) {
          // Force text to white for the primary active button
          btnCls += " bg-black text-white shadow-md";
        } else if (isDone) {
          // Use a dark/muted text color for success to ensure it's not white
          btnCls += " bg-[--success] text-[--background] opacity-90";
        } else {
          // Explicitly set text to --foreground (or --muted) and background to a light/dark shade
          btnCls +=
            " bg-[--border] text-[--foreground] hover:bg-slate-300 dark:hover:bg-slate-700";
        }

        return (
          <button
            key={s.key}
            className={btnCls}
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
