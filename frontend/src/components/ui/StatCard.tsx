import type { ReactNode } from "react";
import { Card, CardContent } from "./card";
import { cn } from "../../lib/utils";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  hint?: string;
  className?: string;
}

export default function StatCard({ icon, label, value, hint, className }: StatCardProps) {
  return (
    <Card className={cn("transition-all hover:shadow-card-md hover:-translate-y-0.5", className)}>
      <CardContent className="flex items-start gap-4 p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
          <div className="mt-0.5 text-xs font-medium text-muted-foreground">{label}</div>
          {hint && <div className="mt-1 text-[11px] text-muted-foreground/80">{hint}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
