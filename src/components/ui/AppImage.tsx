import { cn } from "@/lib/utils";

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
  ...props
}: AppImageProps) {
  if (fill) {
    return (
      <img
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className={cn("absolute inset-0 h-full w-full", className)}
        {...props}
      />
    );
  }

  return (
    <img
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={className}
      {...props}
    />
  );
}
