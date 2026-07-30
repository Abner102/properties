import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export default function ImageUpload({
  value = "",
  onChange,
  label = "Photo",
  folder = "team",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);

      const res = await fetch("/api/upload", {
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

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs text-muted-foreground block">{label}</label>

      {value ? (
        <div className="relative w-full max-w-[200px] aspect-[4/5] rounded-xl overflow-hidden border border-border">
          <AppImage src={value} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 flex items-center justify-center hover:text-red-400"
            aria-label="Remove photo"
          >
            <X size={16} />
          </button>
        </div>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
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
            <Upload size={16} /> {value ? "Change Photo" : "Pick from Gallery"}
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        Tap to choose a photo from your phone gallery or computer (max 8MB).
      </p>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
