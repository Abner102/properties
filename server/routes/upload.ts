import { Router } from "express";
import { requireAuth } from "../lib/api-helpers";
import { createImageUpload, publicUploadUrl } from "../lib/upload";

const router = Router();

const ALLOWED_FOLDERS = ["team", "projects", "products", "portfolio"] as const;
type UploadFolder = (typeof ALLOWED_FOLDERS)[number];

function resolveFolder(raw: unknown): UploadFolder {
  const folder = typeof raw === "string" ? raw : "team";
  return ALLOWED_FOLDERS.includes(folder as UploadFolder) ? (folder as UploadFolder) : "team";
}

function uploadPermission(folder: UploadFolder): string {
  if (folder === "team") return "team";
  return "media";
}

router.post("/", async (req, res) => {
  const folder = resolveFolder(req.query.folder);
  const auth = await requireAuth(req, uploadPermission(folder));
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  const upload = createImageUpload(folder);
  upload.single("file")(req, res, (err: unknown) => {
    if (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      return res.status(400).json({ error: message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No image selected" });
    }
    return res.json({ url: publicUploadUrl(folder, req.file.filename) });
  });
});

export default router;

