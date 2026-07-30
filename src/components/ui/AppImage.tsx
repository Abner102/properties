import { useState } from "react";
import { cn } from "@/lib/utils";
import { resolveMediaUrl } from "@/lib/media-url";

const FALLBACK_SRC = "/images/property-1.jpg";

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export default function AppImage({
  fill,
  className,
  alt = "",
  sizes,
  priority,
  src,
  onError,
  ...props
}: AppImageProps) {
  const resolvedSrc = resolveMediaUrl(typeof src === "string" ? src : undefined);
  const [failed, setFailed] = useState(false);
  const finalSrc = failed ? FALLBACK_SRC : resolvedSrc || FALLBACK_SRC;

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    if (!failed) setFailed(true);
    onError?.(e);
  };

  if (fill) {
    return (
      <img
        alt={alt}
        src={finalSrc}
        loading={priority ? "eager" : "lazy"}
        className={cn("absolute inset-0 h-full w-full", className)}
        sizes={sizes}
        onError={handleError}
        {...props}
      />
    );
  }

  return (
    <img
      alt={alt}
      src={finalSrc}
      loading={priority ? "eager" : "lazy"}
      className={className}
      sizes={sizes}
      onError={handleError}
      {...props}
    />
  );
}
