import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/10 text-primary",
        secondary: "border-transparent bg-secondary/15 text-secondary-foreground",
        success: "border-transparent bg-success/10 text-success",
        warning: "border-transparent bg-warning/10 text-warning",
        destructive: "border-transparent bg-destructive/10 text-destructive",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

const levelVariantMap: Record<string, BadgeProps["variant"]> = {
  beginner: "success",
  A1: "success",
  intermediate: "secondary",
  A2: "secondary",
  B1: "warning",
};

function LevelBadge({
  variant = "default",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: string }) {
  const resolved = levelVariantMap[variant] ?? (variant as BadgeProps["variant"]);
  return (
    <div className={cn(badgeVariants({ variant: resolved }), className)} {...props} />
  );
}

export default LevelBadge;
