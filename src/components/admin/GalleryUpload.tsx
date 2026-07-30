import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";

interface GalleryUploadProps {
  value?: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  folder?: string;
}

async function uploadImage(file: File, folder: string): Promise<string> {
  const body = new FormData();
  body.append("file", file);

  const res = await fetch(`/api/upload?folder=${encodeURIComponent(folder)}`, {
    method: "POST",
    credentials: "include",
    body,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401) throw new Error("Please log in again to upload photos.");
    if (res.status === 404) throw new Error("Upload service unavailable. Restart the dev server (npm run dev).");
    throw new Error(data.error || `Upload failed (${res.status})`);
  }

  return data.url as string;
}

export default function GalleryUpload({
  value = [],
  onChange,
  label = "Project Images",
  folder = "projects",
}: GalleryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;

    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!imageFiles.length) {
      setError("Please choose image files.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const urls: string[] = [];
      for (const file of imageFiles) {
        urls.push(await uploadImage(file, folder));
      }
      onChange([...value, ...urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="text-xs text-muted-foreground block">{label}</label>

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((url, index) => (
            <div key={`${url}-${index}`} className="relative aspect-video rounded-xl overflow-hidden border border-border">
              <AppImage src={url} alt={`Project image ${index + 1}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 flex items-center justify-center hover:text-red-400"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-background/90 text-[10px] font-medium">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <Button
        type="button"
        variant="outline"
        className="w-full sm:w-auto min-h-[44px]"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Uploading...
          </>
        ) : (
          <>
            <Upload size={16} /> Upload Images
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        Upload screenshots or project photos from your gallery. The first image is used as the cover (max 8MB each).
      </p>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
