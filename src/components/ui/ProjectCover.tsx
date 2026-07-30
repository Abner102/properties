import { ImageIcon } from "lucide-react";
import AppImage from "@/components/ui/AppImage";
import { cn } from "@/lib/utils";

interface ProjectCoverProps {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ProjectCover({ src, alt, className, sizes, priority }: ProjectCoverProps) {
  if (!src) {
    return (
      <div className={cn("absolute inset-0 bg-muted flex items-center justify-center", className)}>
        <ImageIcon className="text-muted-foreground/40" size={40} />
      </div>
    );
  }

  return (
    <AppImage
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
