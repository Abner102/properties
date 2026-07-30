import { cn } from "@/lib/utils";
import { resolveMediaUrl } from "@/lib/media-url";

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
  ...props
}: AppImageProps) {
  const resolvedSrc = resolveMediaUrl(typeof src === "string" ? src : undefined);

  if (fill) {
    return (
      <img
        alt={alt}
        src={resolvedSrc || undefined}
        loading={priority ? "eager" : "lazy"}
        className={cn("absolute inset-0 h-full w-full", className)}
        sizes={sizes}
        {...props}
      />
    );
  }

  return (
    <img
      alt={alt}
      src={resolvedSrc || undefined}
      loading={priority ? "eager" : "lazy"}
      className={className}
      sizes={sizes}
      {...props}
    />
  );
}
