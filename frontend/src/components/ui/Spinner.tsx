import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Spinner({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <div className={cn("flex min-h-[40vh] items-center justify-center", className)}>
      <Loader2 size={size} className="animate-spin text-primary" />
    </div>
  );
}
