import { cn } from "../../lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  className = "",
  indicatorClassName,
}: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-muted/25",
        className
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-primary transition-all duration-500",
          indicatorClassName
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
