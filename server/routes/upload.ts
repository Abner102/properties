import { Router } from "express";
import { requireAuth } from "../lib/api-helpers";
import { createImageUpload, publicUploadUrl } from "../lib/upload";

const router = Router();
const teamUpload = createImageUpload("team");

router.post("/", async (req, res) => {
  const auth = await requireAuth(req, "team");
  if (auth.error) return res.status(auth.status).json({ error: auth.error });

  teamUpload.single("file")(req, res, (err: unknown) => {
    if (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      return res.status(400).json({ error: message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No image selected" });
    }
    return res.json({ url: publicUploadUrl("team", req.file.filename) });
  });
});

export default router;
