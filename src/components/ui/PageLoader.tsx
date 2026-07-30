import { cn } from "@/lib/utils";

interface PageLoaderProps {
  variant?: "fullscreen" | "page" | "inline";
  label?: string;
  className?: string;
}

export default function PageLoader({
  variant = "page",
  label = "Loading",
  className,
}: PageLoaderProps) {
  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-6", className)}>
      <div className="page-loader-mark" aria-hidden>
        <span className="page-loader-ring" />
        <span className="page-loader-core" />
      </div>
      <div className="text-center">
        <p className="font-display text-2xl tracking-tight">
          Endless <span className="text-gold">Infinity</span>
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );

  if (variant === "fullscreen") {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        {content}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex items-center justify-center py-16" role="status" aria-live="polite">
        <div className="flex flex-col items-center gap-4">
          <div className="page-loader-mark page-loader-mark--sm" aria-hidden>
            <span className="page-loader-ring" />
            <span className="page-loader-core" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-24" role="status" aria-live="polite">
      {content}
    </div>
  );
}
