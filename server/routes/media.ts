import { Router } from "express";
import fs from "fs";
import { uploadFilePath } from "../lib/paths";

const router = Router();

const ALLOWED_FOLDERS = new Set(["team", "projects", "products", "portfolio"]);

router.get("/:folder/:filename", (req, res) => {
  const { folder, filename } = req.params;

  if (!ALLOWED_FOLDERS.has(folder) || !filename || filename.includes("..")) {
    return res.status(400).json({ error: "Invalid path" });
  }

  const filePath = uploadFilePath(folder, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  return res.sendFile(filePath);
});

export default router;
