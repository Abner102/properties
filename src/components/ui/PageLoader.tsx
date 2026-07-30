import { cn } from "@/lib/utils";

interface PageLoaderProps {
  variant?: "fullscreen" | "page" | "inline";
  label?: string;
  className?: string;
}

const CODE_TOKENS = [
  "{ }",
  "</>",
  "=>",
  "fn()",
  "01",
  "API",
  "SQL",
  "npm",
  "git",
  "CSS",
  "tsx",
  "===",
];

function HouseCarMark({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? 120 : 168;

  return (
    <div
      className={cn("page-loader-scene", size === "sm" && "page-loader-scene--sm")}
      style={{ width: dim, height: dim }}
      aria-hidden
    >
      <div className="page-loader-orbit">
        {CODE_TOKENS.map((token, i) => (
          <span
            key={token + i}
            className="page-loader-code"
            style={{
              ["--i" as string]: i,
              ["--n" as string]: CODE_TOKENS.length,
            }}
          >
            {token}
          </span>
        ))}
      </div>

      <svg
        className="page-loader-car"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* House-car body */}
        <path
          className="page-loader-stroke"
          d="M22 58 L60 28 L98 58 V92 H22 Z"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Roof ridge / windshield */}
        <path
          className="page-loader-stroke"
          d="M38 58 L60 40 L82 58"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Door line */}
        <path className="page-loader-stroke" d="M60 58 V92" strokeWidth="1.5" />
        {/* Windows */}
        <rect className="page-loader-fill" x="34" y="62" width="18" height="14" rx="1.5" opacity="0.35" />
        <rect className="page-loader-fill" x="68" y="62" width="18" height="14" rx="1.5" opacity="0.35" />
        {/* Chimney / antenna */}
        <path className="page-loader-stroke" d="M74 42 V30 H82" strokeWidth="1.8" strokeLinecap="round" />
        {/* Wheels */}
        <circle className="page-loader-wheel" cx="38" cy="96" r="8" strokeWidth="2.2" />
        <circle className="page-loader-wheel" cx="82" cy="96" r="8" strokeWidth="2.2" />
        <circle className="page-loader-fill" cx="38" cy="96" r="2.5" />
        <circle className="page-loader-fill" cx="82" cy="96" r="2.5" />
        {/* Headlights */}
        <circle className="page-loader-fill" cx="26" cy="74" r="2" />
        <circle className="page-loader-fill" cx="94" cy="74" r="2" />
      </svg>

      <div className="page-loader-road" aria-hidden>
        <div className="page-loader-road-track">
          {"</> { } => const fn() API npm tsx === 01 SQL CSS git </> { } =>".split(" ").map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PageLoader({
  variant = "page",
  label = "Loading",
  className,
}: PageLoaderProps) {
  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-5", className)}>
      <HouseCarMark />
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
          <HouseCarMark size="sm" />
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
