import fs from "fs";
import path from "path";
import multer from "multer";

const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

export function ensureUploadDir(folder: string) {
  const dir = path.join(UPLOAD_ROOT, folder);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function createImageUpload(folder: string) {
  const dest = ensureUploadDir(folder);

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, dest),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
      const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext) ? ext : ".jpg";
      cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${safeExt}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 8 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed"));
      }
    },
  });
}

export function publicUploadUrl(folder: string, filename: string) {
  return `/uploads/${folder}/${filename}`;
}
