import { cn } from "@/lib/utils";

interface PageLoaderProps {
  variant?: "fullscreen" | "page" | "inline";
  /** Kept for callers; not shown visually */
  label?: string;
  className?: string;
}

const ROAD_CODES = [
  "</>", "{ }", "=>", "const", "fn()", "API", "npm", "tsx", "===", "01", "SQL", "CSS", "git",
  "</>", "{ }", "=>", "const", "fn()", "API", "npm", "tsx", "===", "01", "SQL", "CSS", "git",
];

function HouseCarMark({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <div
      className={cn("page-loader-scene", size === "sm" && "page-loader-scene--sm")}
      aria-hidden
    >
      <svg
        className="page-loader-car"
        viewBox="0 0 120 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="page-loader-stroke"
          d="M22 52 L60 22 L98 52 V86 H22 Z"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          className="page-loader-stroke"
          d="M38 52 L60 34 L82 52"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path className="page-loader-stroke" d="M60 52 V86" strokeWidth="1.5" />
        <rect className="page-loader-fill" x="34" y="56" width="18" height="14" rx="1.5" opacity="0.35" />
        <rect className="page-loader-fill" x="68" y="56" width="18" height="14" rx="1.5" opacity="0.35" />
        <path className="page-loader-stroke" d="M74 36 V24 H82" strokeWidth="1.8" strokeLinecap="round" />
        <g className="page-loader-wheel-group page-loader-wheel-group--left">
          <circle className="page-loader-wheel" cx="38" cy="94" r="8" strokeWidth="2.2" />
          <circle className="page-loader-fill" cx="38" cy="94" r="2.5" />
        </g>
        <g className="page-loader-wheel-group page-loader-wheel-group--right">
          <circle className="page-loader-wheel" cx="82" cy="94" r="8" strokeWidth="2.2" />
          <circle className="page-loader-fill" cx="82" cy="94" r="2.5" />
        </g>
        <circle className="page-loader-fill" cx="26" cy="68" r="2" />
        <circle className="page-loader-fill" cx="94" cy="68" r="2" />
      </svg>

      <div className="page-loader-road">
        <div className="page-loader-road-track">
          {ROAD_CODES.map((token, i) => (
            <span key={`${token}-${i}`}>{token}</span>
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
    <div
      className={cn("flex flex-col items-center justify-center gap-6", className)}
      role="status"
      aria-label={label}
    >
      <HouseCarMark />
      <p className="font-display text-2xl tracking-tight">
        Endless <span className="text-gold">Infinity</span>
      </p>
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
      <div className="flex items-center justify-center py-16" role="status" aria-label={label}>
        <HouseCarMark size="sm" />
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-24">
      {content}
    </div>
  );
}
