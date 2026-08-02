import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export default function PageHeader({ title, description, children, className = "" }: PageHeaderProps) {
  return (
    <div className={`mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between ${className}`}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground sm:text-[0.9375rem]">
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}
